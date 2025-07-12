import { Request, Response } from "express";
import ping from "ping";
import prisma from "../utils/prisma";

// GET /api/devices - получить все устройства
export const getAllDevices = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    console.log("📡 Запрос всех устройств (Prisma)");
    const devices = await prisma.device.findMany();
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
    const newDevice = await prisma.device.create({
      data: {
        name: deviceData.name,
        ip: deviceData.ip,
        type: deviceData.type || "unknown",
        status: deviceData.status || "online",
        responseTime: deviceData.responseTime || 0,
        uptime: deviceData.uptime || 100,
        location: deviceData.location || "",
        description: deviceData.description || "",
        folderId: deviceData.folderId || null,
      },
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
    const updatedDevice = await prisma.device.update({
      where: { id },
      data: updateData,
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

    // Выполняем ping
    const result = await ping.promise.probe(device.ip, {
      timeout: 5,
      extra: ["-c", "3"], // 3 пакета для более точного результата
    });

    // Обновляем статус устройства
    const updatedDevice = await prisma.device.update({
      where: { id },
      data: {
        status: result.alive ? "online" : "offline",
        responseTime: Math.round(result.time || 0),
      },
    });

    res.json({
      success: true,
      data: {
        deviceId: id,
        deviceName: updatedDevice.name,
        ip: updatedDevice.ip,
        alive: result.alive,
        responseTime: Math.round(result.time || 0),
        packetLoss: result.packetLoss || "0%",
        timestamp: new Date().toISOString(),
      },
      message: result.alive ? "Устройство доступно" : "Устройство недоступно",
    });
  } catch (error) {
    console.error("Ошибка ping устройства:", error);
    res.status(500).json({
      success: false,
      error: "Не удалось выполнить ping устройства",
    });
  }
};
