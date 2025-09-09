import { Request, Response } from "express";
import dbManager from "../utils/prisma";
import { log } from "../lib/logger";
import { deviceCache } from "../utils/cache";
import {
  BulkCreateDevicesSchema,
  NetworkDeviceInput,
} from "@monitoring/shared";

/**
 * POST /api/devices/bulk-create - массовое создание устройств
 */
export const bulkCreateDevices = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Валидация входных данных
    const validation = BulkCreateDevicesSchema.safeParse(req.body);
    if (!validation.success) {
      res.status(400).json({
        success: false,
        error:
          validation.error.errors[0]?.message || "Неверные параметры запроса",
      });
      return;
    }

    const { devices } = validation.data;
    const { folderId = null } = req.body;

    const prisma = dbManager.getClient();
    const createdDevices = [];
    const errors = [];

    log.api(`Starting bulk creation of ${devices.length} devices`);

    for (const deviceData of devices) {
      try {
        // Проверяем, не существует ли уже устройство с таким IP
        const existingDevice = await prisma.device.findUnique({
          where: { ip: deviceData.ip },
        });

        if (existingDevice) {
          errors.push({
            ip: deviceData.ip,
            name: deviceData.name,
            error: "Устройство с таким IP уже существует",
          });
          continue;
        }

        // Подготавливаем данные для создания
        const createData: any = {
          name: deviceData.name || `Device ${deviceData.ip}`,
          ip: deviceData.ip,
          type: deviceData.type || "workstation",
          status: deviceData.status || "offline",
          responseTime: 0,
          lastSeen: new Date(),
        };

        // Добавляем опциональные поля
        if (deviceData.mac) createData.mac = deviceData.mac;
        if (deviceData.description)
          createData.description = deviceData.description;
        if (deviceData.location) createData.location = deviceData.location;
        if (deviceData.vendor) createData.vendor = deviceData.vendor;
        if (deviceData.model) createData.model = deviceData.model;
        if (deviceData.osVersion) createData.osVersion = deviceData.osVersion;
        if (deviceData.snmpCommunity)
          createData.snmpCommunity = deviceData.snmpCommunity;
        if (deviceData.port) createData.port = deviceData.port;

        // Обрабатываем folderId
        const finalFolderId = deviceData.folderId || folderId;
        if (finalFolderId && finalFolderId !== "root") {
          createData.folderId = finalFolderId;
        }

        // Обрабатываем monitoring настройки
        if (deviceData.monitoring) {
          createData.monitoringPing = deviceData.monitoring.ping ?? true;
          createData.monitoringSnmp = deviceData.monitoring.snmp ?? false;
          createData.monitoringHttp = deviceData.monitoring.http ?? false;
          createData.monitoringSsh = deviceData.monitoring.ssh ?? false;
        } else {
          createData.monitoringPing = true;
          createData.monitoringSnmp = false;
          createData.monitoringHttp = false;
          createData.monitoringSsh = false;
        }

        // Обрабатываем credentials
        if (deviceData.credentials) {
          // В реальном проекте здесь должно быть шифрование паролей
          createData.credentials = deviceData.credentials;
        }

        // Создаем устройство
        const device = await prisma.device.create({
          data: createData,
          include: {
            folder: true,
          },
        });

        createdDevices.push(device);
        log.debug(`Created device: ${device.name} (${device.ip})`);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Неизвестная ошибка";
        errors.push({
          ip: deviceData.ip,
          name: deviceData.name,
          error: errorMessage,
        });
        log.error(`Failed to create device ${deviceData.ip}:`, error);
      }
    }

    // Очищаем кэш устройств
    deviceCache.delete("devices:*");

    const summary = {
      total: devices.length,
      created: createdDevices.length,
      errors: errors.length,
    };

    log.api(
      `Bulk creation completed: ${summary.created}/${summary.total} devices created, ${summary.errors} errors`
    );

    res.status(201).json({
      success: true,
      data: {
        created: createdDevices,
        errors,
        summary,
      },
    });
  } catch (error) {
    log.error("Error in bulk device creation:", error);
    res.status(500).json({
      success: false,
      error: "Не удалось создать устройства",
    });
  }
};

/**
 * PUT /api/devices/bulk-update - массовое обновление устройств
 */
export const bulkUpdateDevices = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { deviceIds, updateData } = req.body;

    if (!Array.isArray(deviceIds) || deviceIds.length === 0) {
      res.status(400).json({
        success: false,
        error: "Необходимо передать массив ID устройств",
      });
      return;
    }

    if (!updateData || typeof updateData !== "object") {
      res.status(400).json({
        success: false,
        error: "Необходимо передать данные для обновления",
      });
      return;
    }

    const prisma = dbManager.getClient();
    const updatedDevices = [];
    const errors = [];

    log.api(`Starting bulk update of ${deviceIds.length} devices`);

    for (const deviceId of deviceIds) {
      try {
        const device = await prisma.device.update({
          where: { id: deviceId },
          data: updateData,
          include: {
            folder: true,
          },
        });

        updatedDevices.push(device);
        log.debug(`Updated device: ${device.name} (${device.ip})`);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Неизвестная ошибка";
        errors.push({
          deviceId,
          error: errorMessage,
        });
        log.error(`Failed to update device ${deviceId}:`, error);
      }
    }

    // Очищаем кэш устройств
    deviceCache.delete("devices:*");
    deviceIds.forEach((id) => deviceCache.delete(`device:${id}`));

    const summary = {
      total: deviceIds.length,
      updated: updatedDevices.length,
      errors: errors.length,
    };

    log.api(
      `Bulk update completed: ${summary.updated}/${summary.total} devices updated, ${summary.errors} errors`
    );

    res.json({
      success: true,
      data: {
        updated: updatedDevices,
        errors,
        summary,
      },
    });
  } catch (error) {
    log.error("Error in bulk device update:", error);
    res.status(500).json({
      success: false,
      error: "Не удалось обновить устройства",
    });
  }
};

/**
 * DELETE /api/devices/bulk-delete - массовое удаление устройств
 */
export const bulkDeleteDevices = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { deviceIds } = req.body;

    if (!Array.isArray(deviceIds) || deviceIds.length === 0) {
      res.status(400).json({
        success: false,
        error: "Необходимо передать массив ID устройств",
      });
      return;
    }

    const prisma = dbManager.getClient();
    const deletedDevices = [];
    const errors = [];

    log.api(`Starting bulk deletion of ${deviceIds.length} devices`);

    for (const deviceId of deviceIds) {
      try {
        const device = await prisma.device.findUnique({
          where: { id: deviceId },
        });

        if (!device) {
          errors.push({
            deviceId,
            error: "Устройство не найдено",
          });
          continue;
        }

        await prisma.device.delete({
          where: { id: deviceId },
        });

        deletedDevices.push({ id: deviceId, name: device.name, ip: device.ip });
        log.debug(`Deleted device: ${device.name} (${device.ip})`);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Неизвестная ошибка";
        errors.push({
          deviceId,
          error: errorMessage,
        });
        log.error(`Failed to delete device ${deviceId}:`, error);
      }
    }

    // Очищаем кэш устройств
    deviceCache.delete("devices:*");
    deviceIds.forEach((id) => deviceCache.delete(`device:${id}`));

    const summary = {
      total: deviceIds.length,
      deleted: deletedDevices.length,
      errors: errors.length,
    };

    log.api(
      `Bulk deletion completed: ${summary.deleted}/${summary.total} devices deleted, ${summary.errors} errors`
    );

    res.json({
      success: true,
      data: {
        deleted: deletedDevices,
        errors,
        summary,
      },
    });
  } catch (error) {
    log.error("Error in bulk device deletion:", error);
    res.status(500).json({
      success: false,
      error: "Не удалось удалить устройства",
    });
  }
};
