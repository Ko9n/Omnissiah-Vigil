import { Request, Response } from "express";
import dbManager from "../utils/prisma";
import { log } from "../lib/logger";
import { deviceCache } from "../utils/cache";

/**
 * GET /api/devices - получить все устройства
 */
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

/**
 * GET /api/devices/:id - получить устройство по ID
 */
export const getDeviceById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const prisma = dbManager.getClient();

    // Проверяем кэш
    const cacheKey = `device:${id}`;
    const cached = deviceCache.get(cacheKey);
    if (cached) {
      log.debug("Serving device from cache", { deviceId: id });
      res.json(cached);
      return;
    }

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

    // Сохраняем в кэш на 1 минуту
    deviceCache.set(cacheKey, result, 60 * 1000);

    res.json(result);
  } catch (error) {
    log.error("Error getting device by id", error);
    res.status(500).json({
      success: false,
      error: "Не удалось получить устройство",
    });
  }
};

/**
 * POST /api/devices - создать новое устройство
 */
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

    // Подготавливаем данные для создания
    const deviceData = { ...req.body };

    // Обрабатываем folderId
    if (
      deviceData.folderId === "root" ||
      deviceData.folderId === null ||
      deviceData.folderId === ""
    ) {
      deviceData.folderId = null;
    }

    // Обрабатываем monitoring объект
    if (deviceData.monitoring) {
      deviceData.monitoringPing = deviceData.monitoring.ping || true;
      deviceData.monitoringSnmp = deviceData.monitoring.snmp || false;
      deviceData.monitoringHttp = deviceData.monitoring.http || false;
      deviceData.monitoringSsh = deviceData.monitoring.ssh || false;
      delete deviceData.monitoring;
    }

    const device = await prisma.device.create({
      data: deviceData,
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

/**
 * PUT /api/devices/:id - обновить устройство
 */
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

    // Если изменяется IP, проверяем на уникальность
    if (req.body.ip && req.body.ip !== existingDevice.ip) {
      const deviceWithSameIP = await prisma.device.findUnique({
        where: { ip: req.body.ip },
      });

      if (deviceWithSameIP) {
        res.status(400).json({
          success: false,
          error: "Устройство с таким IP адресом уже существует",
        });
        return;
      }
    }

    // Подготавливаем данные для обновления
    const updateData = { ...req.body };

    // Обрабатываем folderId
    if (
      updateData.folderId === "root" ||
      updateData.folderId === null ||
      updateData.folderId === ""
    ) {
      updateData.folderId = null;
    }

    // Обрабатываем monitoring объект
    if (updateData.monitoring) {
      updateData.monitoringPing = updateData.monitoring.ping || true;
      updateData.monitoringSnmp = updateData.monitoring.snmp || false;
      updateData.monitoringHttp = updateData.monitoring.http || false;
      updateData.monitoringSsh = updateData.monitoring.ssh || false;
      delete updateData.monitoring;
    }

    const device = await prisma.device.update({
      where: { id },
      data: updateData,
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

/**
 * DELETE /api/devices/:id - удалить устройство
 */
export const deleteDevice = async (
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

    await prisma.device.delete({
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
