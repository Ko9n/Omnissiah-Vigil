import { Request, Response } from "express";
import * as ping from "ping";
import dbManager from "../utils/prisma";
import { log } from "../lib/logger";
import { deviceCache } from "../utils/cache";
import { exec } from "child_process";
import { promisify } from "util";
import net from "net";

const execAsync = promisify(exec);

// Функция проверки доступности через TCP порт
const checkTcpConnection = (
  host: string,
  port: number = 80,
  timeout: number = 3000
): Promise<boolean> => {
  return new Promise((resolve) => {
    const socket = new net.Socket();

    socket.setTimeout(timeout);

    socket.on("connect", () => {
      socket.destroy();
      resolve(true);
    });

    socket.on("timeout", () => {
      socket.destroy();
      resolve(false);
    });

    socket.on("error", () => {
      resolve(false);
    });

    socket.connect(port, host);
  });
};

// Функция проверки через системный ping
const systemPing = async (
  host: string
): Promise<{ alive: boolean; time: number; error?: string }> => {
  try {
    const isWindows = process.platform === "win32";
    const command = isWindows
      ? `ping -n 1 -w 3000 ${host}`
      : `ping -c 1 -W 3 ${host}`;

    const { stdout, stderr } = await execAsync(command);

    if (stderr) {
      return { alive: false, time: 0, error: stderr };
    }

    // Парсим время отклика
    const timeMatch = isWindows
      ? stdout.match(/время[=<]\s*(\d+)мс/i) ||
        stdout.match(/time[=<]\s*(\d+)ms/i)
      : stdout.match(/time=(\d+\.?\d*)/);

    const time = timeMatch && timeMatch[1] ? parseInt(timeMatch[1]) : 0;
    const isAlive =
      !stdout.includes("недостижим") &&
      !stdout.includes("unreachable") &&
      !stdout.includes("Превышен интервал") &&
      !stdout.includes("timeout");

    return { alive: isAlive, time };
  } catch (error) {
    return {
      alive: false,
      time: 0,
      error: error instanceof Error ? error.message : String(error),
    };
  }
};

// Улучшенная функция проверки доступности
const checkDeviceAvailability = async (device: any) => {
  const methods = [];

  // 1. Попробуем Node.js ping
  try {
    const pingResult = await ping.promise.probe(device.ip, {
      timeout: 3,
      extra: ["-c", "1"],
    });
    methods.push({
      method: "node-ping",
      alive: pingResult.alive,
      time: Math.round(Number(pingResult.time) || 0),
      success: true,
    });
  } catch (error) {
    methods.push({
      method: "node-ping",
      alive: false,
      time: 0,
      success: false,
      error: error instanceof Error ? error.message : String(error),
    });
  }

  // 2. Попробуем системный ping
  try {
    const systemResult = await systemPing(device.ip);
    methods.push({
      method: "system-ping",
      alive: systemResult.alive,
      time: systemResult.time,
      success: true,
      error: systemResult.error,
    });
  } catch (error) {
    methods.push({
      method: "system-ping",
      alive: false,
      time: 0,
      success: false,
      error: error instanceof Error ? error.message : String(error),
    });
  }

  // 3. Попробуем TCP соединение на порт 80
  try {
    const tcpResult = await checkTcpConnection(device.ip, 80, 3000);
    methods.push({
      method: "tcp-80",
      alive: tcpResult,
      time: 0,
      success: true,
    });
  } catch (error) {
    methods.push({
      method: "tcp-80",
      alive: false,
      time: 0,
      success: false,
      error: error instanceof Error ? error.message : String(error),
    });
  }

  // Определяем лучший результат
  const successfulMethods = methods.filter((m) => m.success && m.alive);
  const bestMethod =
    successfulMethods.length > 0 ? successfulMethods[0] : methods[0];

  return {
    alive: bestMethod?.alive || false,
    responseTime: bestMethod?.time || 0,
    method: bestMethod?.method || "unknown",
    allMethods: methods,
  };
};

// GET /api/devices - получить все устройства
export const getAllDevices = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { page = 1, limit = 50, search, status, type, folderId } = req.query;

    // Проверяем кэш
    const cacheKey = `devices:${JSON.stringify(req.query)}`;
    const cached = deviceCache.get(cacheKey);
    if (cached) {
      log.debug("Serving devices from cache", { cacheKey });
      res.json(cached);
      return;
    }

    const prisma = dbManager.getClient();
    const skip = (Number(page) - 1) * Number(limit);

    // Строим условия фильтрации
    const where: any = {};

    if (search) {
      where.OR = [
        { name: { contains: search as string, mode: "insensitive" } },
        { ip: { contains: search as string, mode: "insensitive" } },
        { description: { contains: search as string, mode: "insensitive" } },
      ];
    }

    if (status) {
      where.status = status;
    }

    if (type) {
      where.type = type;
    }

    if (folderId) {
      where.folderId = folderId;
    }

    const [devices, total] = await Promise.all([
      prisma.device.findMany({
        where,
        skip,
        take: Number(limit),
        orderBy: { name: "asc" },
        include: {
          folder: true,
        },
      }),
      prisma.device.count({ where }),
    ]);

    const result = {
      success: true,
      data: devices,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        totalPages: Math.ceil(total / Number(limit)),
      },
    };

    // Сохраняем в кэш на 2 минуты
    deviceCache.set(cacheKey, result, 2 * 60 * 1000);

    log.api(`Retrieved ${devices.length} devices (total: ${total})`);
    res.json(result);
  } catch (error) {
    log.error("Error getting all devices", error);
    res.status(500).json({
      success: false,
      error: "Не удалось получить список устройств",
    });
  }
};

// GET /api/devices/:id - получить устройство по ID
export const getDeviceById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    // Проверяем кэш
    const cacheKey = `device:${id}`;
    const cached = deviceCache.get(cacheKey);
    if (cached) {
      log.debug("Serving device from cache", { deviceId: id });
      res.json(cached);
      return;
    }

    const prisma = dbManager.getClient();
    const device = await prisma.device.findUnique({
      where: { id },
      include: {
        folder: true,
        pingHistory: {
          take: 10,
          orderBy: { timestamp: "desc" },
        },
      },
    });

    if (!device) {
      res.status(404).json({
        success: false,
        error: "Устройство не найдено",
      });
      return;
    }

    const result = {
      success: true,
      data: device,
    };

    // Сохраняем в кэш на 5 минут
    deviceCache.set(cacheKey, result, 5 * 60 * 1000);

    log.api(`Retrieved device: ${device.name} (${device.ip})`);
    res.json(result);
  } catch (error) {
    log.error("Error getting device by ID", error);
    res.status(500).json({
      success: false,
      error: "Не удалось получить устройство",
    });
  }
};

// POST /api/devices - создать новое устройство
export const createDevice = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const prisma = dbManager.getClient();

    // Проверяем, не существует ли уже устройство с таким IP
    const existingDevice = await prisma.device.findUnique({
      where: { ip: req.body.ip },
    });

    if (existingDevice) {
      res.status(400).json({
        success: false,
        error: "Устройство с таким IP адресом уже существует",
      });
      return;
    }

    const device = await prisma.device.create({
      data: req.body,
      include: {
        folder: true,
      },
    });

    // Очищаем кэш устройств
    deviceCache.delete("devices:*");

    log.api(`Created new device: ${device.name} (${device.ip})`);
    res.status(201).json({
      success: true,
      data: device,
    });
  } catch (error) {
    log.error("Error creating device", error);
    res.status(500).json({
      success: false,
      error: "Не удалось создать устройство",
    });
  }
};

// PUT /api/devices/:id - обновить устройство
export const updateDevice = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const prisma = dbManager.getClient();

    // Проверяем существование устройства
    const existingDevice = await prisma.device.findUnique({
      where: { id },
    });

    if (!existingDevice) {
      res.status(404).json({
        success: false,
        error: "Устройство не найдено",
      });
      return;
    }

    // Если меняется IP, проверяем уникальность
    if (req.body.ip && req.body.ip !== existingDevice.ip) {
      const deviceWithSameIp = await prisma.device.findUnique({
        where: { ip: req.body.ip },
      });

      if (deviceWithSameIp) {
        res.status(400).json({
          success: false,
          error: "Устройство с таким IP адресом уже существует",
        });
        return;
      }
    }

    const device = await prisma.device.update({
      where: { id },
      data: req.body,
      include: {
        folder: true,
      },
    });

    // Очищаем кэш
    deviceCache.delete(`device:${id}`);
    deviceCache.delete("devices:*");

    log.api(`Updated device: ${device.name} (${device.ip})`);
    res.json({
      success: true,
      data: device,
    });
  } catch (error) {
    log.error("Error updating device", error);
    res.status(500).json({
      success: false,
      error: "Не удалось обновить устройство",
    });
  }
};

// DELETE /api/devices/:id - удалить устройство
export const deleteDevice = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const prisma = dbManager.getClient();

    const device = await prisma.device.delete({
      where: { id },
    });

    // Очищаем кэш
    deviceCache.delete(`device:${id}`);
    deviceCache.delete("devices:*");

    log.api(`Deleted device: ${device.name} (${device.ip})`);
    res.json({
      success: true,
      message: "Устройство успешно удалено",
    });
  } catch (error) {
    log.error("Error deleting device", error);
    res.status(500).json({
      success: false,
      error: "Не удалось удалить устройство",
    });
  }
};

// POST /api/devices/:id/ping - выполнить ping устройства
export const pingDevice = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const prisma = dbManager.getClient();

    const device = await prisma.device.findUnique({
      where: { id },
    });

    if (!device) {
      res.status(404).json({
        success: false,
        error: "Устройство не найдено",
      });
      return;
    }

    log.monitoring(
      `Manual ping request for device: ${device.name} (${device.ip})`
    );

    const result = await checkDeviceAvailability(device);

    // Обновляем статус устройства в БД
    await prisma.device.update({
      where: { id },
      data: {
        status: result.alive ? "online" : "offline",
        responseTime: result.responseTime,
        lastSeen: new Date(),
      },
    });

    // Сохраняем историю пинга
    await prisma.pingHistory.create({
      data: {
        deviceId: id as string,
        isAlive: result.alive,
        responseTime: result.responseTime,
        packetLoss: result.alive ? "0%" : "100%", // TODO: получать из результата ping
        timestamp: new Date(),
      },
    });

    // Очищаем кэш устройства
    deviceCache.delete(`device:${id}`);

    log.monitoring(
      `Ping result for ${device.name}: ${
        result.alive ? "online" : "offline"
      } (${result.responseTime}ms) via ${result.method}`
    );

    res.json({
      success: true,
      data: {
        deviceId: id,
        deviceName: device.name,
        ip: device.ip,
        alive: result.alive,
        responseTime: result.responseTime,
        method: result.method,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    log.error("Error pinging device", error);
    res.status(500).json({
      success: false,
      error: "Не удалось выполнить ping устройства",
    });
  }
};
