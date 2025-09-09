import { Request, Response } from "express";
import dbManager from "../utils/prisma";
import { log } from "../lib/logger";
import { deviceCache } from "../utils/cache";
import { checkDeviceAvailability } from "../utils/pingUtils";

/**
 * POST /api/devices/:id/ping - выполнить ping устройства
 */
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
        status: result.isOnline ? "online" : "offline",
        responseTime: result.responseTime,
        lastSeen: new Date(),
      },
    });

    // Сохраняем историю пинга
    await prisma.pingHistory.create({
      data: {
        deviceId: id as string,
        isAlive: result.isOnline,
        responseTime: result.responseTime,
        packetLoss: result.isOnline ? "0%" : "100%",
        timestamp: new Date(),
      },
    });

    // Очищаем кэш устройства
    deviceCache.delete(`device:${id}`);

    log.monitoring(
      `Ping result for ${device.name}: ${
        result.isOnline ? "online" : "offline"
      } (${result.responseTime}ms)`
    );

    res.json({
      success: true,
      data: {
        deviceId: id,
        deviceName: device.name,
        ip: device.ip,
        alive: result.isOnline,
        responseTime: result.responseTime,
        methods: result.methods,
        timestamp: result.timestamp,
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
