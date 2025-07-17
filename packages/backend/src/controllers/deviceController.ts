import { Request, Response } from "express";
import * as ping from "ping";
import prisma from "../utils/prisma";
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
      time: Math.round(pingResult.time || 0),
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
  const systemResult = await systemPing(device.ip);
  methods.push({
    method: "system-ping",
    alive: systemResult.alive,
    time: systemResult.time,
    success: !systemResult.error,
  });

  // 3. Попробуем TCP подключение (если настроен HTTP)
  if (device.monitoring?.http) {
    const tcpResult = await checkTcpConnection(device.ip, 80);
    methods.push({
      method: "tcp-80",
      alive: tcpResult,
      time: tcpResult ? 50 : 0, // примерное время для TCP
      success: true,
    });
  }

  // Выбираем лучший результат
  const aliveMethod = methods.find((m) => m.alive && m.success);
  if (aliveMethod) {
    return {
      alive: true,
      time: aliveMethod.time,
      method: aliveMethod.method,
      allMethods: methods,
    };
  }

  return {
    alive: false,
    time: 0,
    method: "all-failed",
    allMethods: methods,
  };
};

// GET /api/devices - получить все устройства
export const getAllDevices = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    console.log("📡 Запрос всех устройств (Prisma)");
    const rawDevices = await prisma.device.findMany();

    // Преобразуем данные для фронтенда
    const devices = rawDevices.map((device: any) => ({
      ...device,
      folderId: device.folderId || null, // Если нет папки, то null (не "root")
      monitoring: {
        ping: device.monitoringPing ?? true,
        snmp: device.monitoringSnmp ?? false,
        http: device.monitoringHttp ?? false,
        ssh: device.monitoringSsh ?? false,
      },
    }));

    res.json({
      success: true,
      data: devices,
      count: devices.length,
    });
  } catch (error) {
    console.error("Ошибка получения устройств:", error);
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
    const device = await prisma.device.findUnique({ where: { id } });
    if (!device) {
      res.status(404).json({
        success: false,
        error: "Устройство не найдено",
      });
      return;
    }
    console.log(`📱 Запрос устройства: ${device.name}`);
    res.json({
      success: true,
      data: device,
    });
  } catch (error) {
    console.error("Ошибка получения устройства:", error);
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
    const deviceData = req.body;

    console.log(`🔄 Создаем устройство с данными:`, deviceData);

    const createData: any = {
      name: deviceData.name,
      ip: deviceData.ip,
      type: deviceData.type || "unknown",
      status: deviceData.status || "online",
      responseTime: deviceData.responseTime || 0,
      uptime: deviceData.uptime || 100,
      location: deviceData.location || "",
      description: deviceData.description || "",
      // Дополнительные поля
      mac: deviceData.mac || "",
      vendor: deviceData.vendor || "",
      model: deviceData.model || "",
      osVersion: deviceData.osVersion || "",
      // Настройки мониторинга
      monitoringPing: deviceData.monitoring?.ping ?? true,
      monitoringSnmp: deviceData.monitoring?.snmp ?? false,
      monitoringHttp: deviceData.monitoring?.http ?? false,
      monitoringSsh: deviceData.monitoring?.ssh ?? false,
    };

    // Связь с папкой - используем правильный синтаксис Prisma
    if (
      deviceData.folderId &&
      deviceData.folderId !== "root" &&
      deviceData.folderId !== null
    ) {
      createData.folder = { connect: { id: deviceData.folderId } };
    }
    // Если folderId === "root" или null, то оставляем folderId как null в базе

    const newDevice = await prisma.device.create({
      data: createData,
    });
    console.log(`➕ Создано устройство: ${newDevice.name}`);
    res.status(201).json({
      success: true,
      data: newDevice,
      message: "Устройство успешно создано",
    });
  } catch (error) {
    console.error("Ошибка создания устройства:", error);
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
    const updateData = req.body;

    // Подготавливаем данные для обновления
    const updateFields: any = {};

    // Простые поля
    if (updateData.name !== undefined) updateFields.name = updateData.name;
    if (updateData.ip !== undefined) updateFields.ip = updateData.ip;
    if (updateData.type !== undefined) updateFields.type = updateData.type;
    if (updateData.location !== undefined)
      updateFields.location = updateData.location;
    if (updateData.description !== undefined)
      updateFields.description = updateData.description;
    if (updateData.status !== undefined)
      updateFields.status = updateData.status;
    if (updateData.responseTime !== undefined)
      updateFields.responseTime = updateData.responseTime;
    if (updateData.uptime !== undefined)
      updateFields.uptime = updateData.uptime;
    if (updateData.mac !== undefined) updateFields.mac = updateData.mac;
    if (updateData.vendor !== undefined)
      updateFields.vendor = updateData.vendor;
    if (updateData.model !== undefined) updateFields.model = updateData.model;
    if (updateData.osVersion !== undefined)
      updateFields.osVersion = updateData.osVersion;

    // Мониторинг настройки
    if (updateData.monitoring?.ping !== undefined)
      updateFields.monitoringPing = updateData.monitoring.ping;
    if (updateData.monitoring?.snmp !== undefined)
      updateFields.monitoringSnmp = updateData.monitoring.snmp;
    if (updateData.monitoring?.http !== undefined)
      updateFields.monitoringHttp = updateData.monitoring.http;
    if (updateData.monitoring?.ssh !== undefined)
      updateFields.monitoringSsh = updateData.monitoring.ssh;

    // Связь с папкой - используем правильный синтаксис Prisma
    if (updateData.folderId !== undefined) {
      if (updateData.folderId === null || updateData.folderId === "root") {
        updateFields.folder = { disconnect: true };
      } else {
        updateFields.folder = { connect: { id: updateData.folderId } };
      }
    }

    console.log(`🔄 Обновляем устройство ${id} с данными:`, updateFields);

    const updatedDevice = await prisma.device.update({
      where: { id },
      data: updateFields,
    });

    console.log(`✏️ Обновлено устройство: ${updatedDevice.name}`);
    res.json({
      success: true,
      data: updatedDevice,
      message: "Устройство успешно обновлено",
    });
  } catch (error) {
    console.error("Ошибка обновления устройства:", error);
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
    const deletedDevice = await prisma.device.delete({ where: { id } });
    console.log(`🗑️ Удалено устройство: ${deletedDevice.name}`);
    res.json({
      success: true,
      data: deletedDevice,
      message: "Устройство успешно удалено",
    });
  } catch (error) {
    console.error("Ошибка удаления устройства:", error);
    res.status(500).json({
      success: false,
      error: "Не удалось удалить устройство",
    });
  }
};

// POST /api/devices/:id/ping - пинг устройства
export const pingDevice = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const device = await prisma.device.findUnique({ where: { id } });

    if (!device) {
      res.status(404).json({
        success: false,
        error: "Устройство не найдено",
      });
      return;
    }

    console.log(`🏓 Пинг устройства: ${device.name} (${device.ip})`);

    // Используем улучшенную проверку доступности
    const result = await checkDeviceAvailability(device);

    // Обновляем статус устройства
    const updatedDevice = await prisma.device.update({
      where: { id },
      data: {
        status: result.alive ? "online" : "offline",
        responseTime: result.time,
      },
    });

    res.json({
      success: true,
      data: {
        deviceId: id,
        deviceName: updatedDevice.name,
        ip: updatedDevice.ip,
        alive: result.alive,
        responseTime: result.time,
        packetLoss: "0%", // TODO: получать из результата ping
        timestamp: new Date().toISOString(),
        method: result.method,
        allMethods: result.allMethods,
      },
      message: result.alive
        ? `Устройство доступно (${result.method})`
        : "Устройство недоступно",
    });
  } catch (error) {
    console.error("Ошибка ping устройства:", error);
    res.status(500).json({
      success: false,
      error: "Не удалось выполнить ping устройства",
    });
  }
};
