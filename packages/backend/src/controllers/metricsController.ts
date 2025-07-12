import { Request, Response } from "express";
import * as si from "systeminformation";

// GET /api/metrics/system - получить здоровье системы
export const getSystemHealth = async (req: Request, res: Response) => {
  try {
    console.log("💻 Запрос метрик системы");

    // Получаем данные о системе
    const [cpu, memory, load, uptime, networkStats] = await Promise.all([
      si.cpu(),
      si.mem(),
      si.currentLoad(),
      si.time(),
      si.networkStats(),
    ]);

    const systemHealth = {
      cpu: {
        usage: Math.round(load.currentLoad),
        cores: cpu.cores,
        model: cpu.manufacturer + " " + cpu.brand,
        speed: cpu.speed,
      },
      memory: {
        usage: Math.round((memory.used / memory.total) * 100),
        used: Math.round(memory.used / 1024 / 1024 / 1024), // GB
        total: Math.round(memory.total / 1024 / 1024 / 1024), // GB
        available: Math.round(memory.available / 1024 / 1024 / 1024), // GB
      },
      uptime: {
        seconds: uptime.uptime,
        formatted: formatUptime(uptime.uptime),
      },
      network: {
        interfaces: networkStats.length,
        totalRx: networkStats.reduce(
          (sum, iface) => sum + (iface.rx_bytes || 0),
          0
        ),
        totalTx: networkStats.reduce(
          (sum, iface) => sum + (iface.tx_bytes || 0),
          0
        ),
      },
      timestamp: new Date().toISOString(),
    };

    res.json({
      success: true,
      data: systemHealth,
    });
  } catch (error) {
    console.error("Ошибка получения метрик системы:", error);
    res.status(500).json({
      success: false,
      error: "Не удалось получить метрики системы",
    });
  }
};

// GET /api/metrics/bandwidth - получить данные пропускной способности
export const getBandwidthData = async (req: Request, res: Response) => {
  try {
    console.log("📊 Запрос данных пропускной способности");

    // Генерируем тестовые данные (в реальности здесь будет мониторинг сети)
    const bandwidthData = Array.from({ length: 20 }, (_, i) => {
      const timestamp = new Date(Date.now() - (19 - i) * 5 * 60 * 1000);
      const upload = Math.floor(Math.random() * 300) + 50;
      const download = Math.floor(Math.random() * 800) + 100;

      return {
        timestamp,
        upload,
        download,
        total: upload + download,
      };
    });

    res.json({
      success: true,
      data: bandwidthData,
      count: bandwidthData.length,
    });
  } catch (error) {
    console.error("Ошибка получения данных пропускной способности:", error);
    res.status(500).json({
      success: false,
      error: "Не удалось получить данные пропускной способности",
    });
  }
};

// GET /api/metrics/network - получить статистику сети
export const getNetworkStats = async (req: Request, res: Response) => {
  try {
    console.log("🌐 Запрос статистики сети");

    // Здесь будет реальная статистика сети
    const networkStats = {
      totalDevices: 9,
      onlineDevices: 7,
      offlineDevices: 1,
      warningDevices: 1,
      averageResponseTime: 5.2,
      networkUptime: 99.8,
      totalPackets: 1234567,
      errorPackets: 23,
      timestamp: new Date().toISOString(),
    };

    res.json({
      success: true,
      data: networkStats,
    });
  } catch (error) {
    console.error("Ошибка получения статистики сети:", error);
    res.status(500).json({
      success: false,
      error: "Не удалось получить статистику сети",
    });
  }
};

// Утилитарная функция для форматирования времени работы
function formatUptime(seconds: number): string {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (days > 0) {
    return `${days}д ${hours}ч ${minutes}м`;
  } else if (hours > 0) {
    return `${hours}ч ${minutes}м`;
  } else {
    return `${minutes}м`;
  }
}
