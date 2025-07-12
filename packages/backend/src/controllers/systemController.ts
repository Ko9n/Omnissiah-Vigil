import { Request, Response } from "express";
import * as si from "systeminformation";

// GET /api/system/info - получить информацию о системе
export const getSystemInfo = async (req: Request, res: Response) => {
  try {
    console.log("ℹ️ Запрос информации о системе");

    const [osInfo, system, versions] = await Promise.all([
      si.osInfo(),
      si.system(),
      si.versions(),
    ]);

    const systemInfo = {
      os: {
        platform: osInfo.platform,
        distro: osInfo.distro,
        release: osInfo.release,
        arch: osInfo.arch,
        hostname: osInfo.hostname,
      },
      system: {
        manufacturer: system.manufacturer,
        model: system.model,
        version: system.version,
        serial: system.serial,
      },
      runtime: {
        node: versions.node,
        npm: versions.npm,
        pid: process.pid,
        uptime: process.uptime(),
        memory: process.memoryUsage(),
      },
      timestamp: new Date().toISOString(),
    };

    res.json({
      success: true,
      data: systemInfo,
    });
  } catch (error) {
    console.error("Ошибка получения информации о системе:", error);
    res.status(500).json({
      success: false,
      error: "Не удалось получить информацию о системе",
    });
  }
};

// POST /api/system/restart - перезапустить сервис
export const restartService = async (req: Request, res: Response) => {
  try {
    console.log("🔄 Запрос перезапуска сервиса");

    // В реальном приложении здесь была бы логика для безопасного перезапуска
    // Например, graceful shutdown текущих соединений

    res.json({
      success: true,
      message: "Сервис будет перезапущен через 5 секунд",
      timestamp: new Date().toISOString(),
    });

    // Перезапуск через 5 секунд
    setTimeout(() => {
      console.log("🔄 Перезапуск сервиса...");
      process.exit(0);
    }, 5000);
  } catch (error) {
    console.error("Ошибка перезапуска сервиса:", error);
    res.status(500).json({
      success: false,
      error: "Не удалось перезапустить сервис",
    });
  }
};

// GET /api/system/config - получить конфигурацию
export const getConfiguration = async (req: Request, res: Response) => {
  try {
    console.log("⚙️ Запрос конфигурации системы");

    const config = {
      server: {
        port: process.env.PORT || 5000,
        environment: process.env.NODE_ENV || "development",
        frontendUrl: process.env.FRONTEND_URL || "http://localhost:3000",
      },
      monitoring: {
        pingTimeout: process.env.PING_TIMEOUT || 5000,
        pingInterval: process.env.PING_INTERVAL || 30000,
        systemCheckInterval: process.env.SYSTEM_CHECK_INTERVAL || 10000,
      },
      features: {
        realTimeUpdates: false, // WebSocket пока не реализован
        database: false, // БД пока не подключена
        authentication: false, // Авторизация пока не реализована
        logging: true,
        ping: true,
        systemMetrics: true,
      },
      version: {
        api: "1.0.0",
        node: process.version,
        uptime: Math.floor(process.uptime()),
      },
      timestamp: new Date().toISOString(),
    };

    res.json({
      success: true,
      data: config,
    });
  } catch (error) {
    console.error("Ошибка получения конфигурации:", error);
    res.status(500).json({
      success: false,
      error: "Не удалось получить конфигурацию",
    });
  }
};
