import { Request, Response } from "express";
import prisma from "../utils/prisma";

// GET /api/history/ping/:deviceId - получить историю пингов устройства
export const getPingHistory = async (req: Request, res: Response) => {
  try {
    const { deviceId } = req.params;
    const { days = "7", limit = "1000", page = "1" } = req.query;

    const daysNum = parseInt(days as string);
    const limitNum = parseInt(limit as string);
    const pageNum = parseInt(page as string);
    const offset = (pageNum - 1) * limitNum;

    // Получаем историю за последние N дней
    const since = new Date();
    since.setDate(since.getDate() - daysNum);

    const history = await prisma.pingHistory.findMany({
      where: {
        deviceId,
        timestamp: {
          gte: since,
        },
      },
      orderBy: {
        timestamp: "desc",
      },
      take: limitNum,
      skip: offset,
      include: {
        device: {
          select: {
            name: true,
            ip: true,
          },
        },
      },
    });

    // Получаем общее количество записей для пагинации
    const total = await prisma.pingHistory.count({
      where: {
        deviceId,
        timestamp: {
          gte: since,
        },
      },
    });

    res.json({
      success: true,
      data: {
        history,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          pages: Math.ceil(total / limitNum),
        },
        period: {
          days: daysNum,
          since: since.toISOString(),
        },
      },
    });
  } catch (error) {
    console.error("Ошибка получения истории пингов:", error);
    res.status(500).json({
      success: false,
      error: "Не удалось получить историю пингов",
    });
  }
};

// GET /api/history/ping/:deviceId/stats - статистика uptime устройства
export const getPingStats = async (req: Request, res: Response) => {
  try {
    const { deviceId } = req.params;
    const { days = "30" } = req.query;

    const daysNum = parseInt(days as string);
    const since = new Date();
    since.setDate(since.getDate() - daysNum);

    // Получаем статистику
    const stats = await prisma.pingHistory.groupBy({
      by: ["isAlive"],
      where: {
        deviceId,
        timestamp: {
          gte: since,
        },
      },
      _count: {
        id: true,
      },
      _avg: {
        responseTime: true,
      },
    });

    const totalPings = stats.reduce((sum, stat) => sum + stat._count.id, 0);
    const alivePings = stats.find((s) => s.isAlive)?._count.id || 0;
    const uptime = totalPings > 0 ? (alivePings / totalPings) * 100 : 0;
    const avgResponseTime =
      stats.find((s) => s.isAlive)?._avg.responseTime || 0;

    // Получаем последние статусы по дням
    const dailyStats = await prisma.$queryRaw`
      SELECT 
        DATE(timestamp) as date,
        COUNT(*) as total_pings,
        SUM(CASE WHEN "isAlive" = true THEN 1 ELSE 0 END) as successful_pings,
        AVG(CASE WHEN "isAlive" = true THEN "responseTime" ELSE NULL END) as avg_response_time
      FROM ping_history 
      WHERE "deviceId" = ${deviceId} 
        AND timestamp >= ${since.toISOString()}
      GROUP BY DATE(timestamp)
      ORDER BY DATE(timestamp) DESC
    `;

    res.json({
      success: true,
      data: {
        summary: {
          totalPings,
          uptime: Math.round(uptime * 100) / 100,
          avgResponseTime: Math.round((avgResponseTime || 0) * 100) / 100,
          period: daysNum,
        },
        dailyStats,
      },
    });
  } catch (error) {
    console.error("Ошибка получения статистики пингов:", error);
    res.status(500).json({
      success: false,
      error: "Не удалось получить статистику пингов",
    });
  }
};

// GET /api/history/system - получить историю системных метрик
export const getSystemMetricsHistory = async (req: Request, res: Response) => {
  try {
    const {
      hours = "24",
      limit = "288", // 24 часа * 12 записей в час (каждые 5 мин)
    } = req.query;

    const hoursNum = parseInt(hours as string);
    const limitNum = parseInt(limit as string);

    const since = new Date();
    since.setHours(since.getHours() - hoursNum);

    const metrics = await prisma.systemMetrics.findMany({
      where: {
        timestamp: {
          gte: since,
        },
      },
      orderBy: {
        timestamp: "desc",
      },
      take: limitNum,
    });

    res.json({
      success: true,
      data: {
        metrics,
        period: {
          hours: hoursNum,
          since: since.toISOString(),
        },
      },
    });
  } catch (error) {
    console.error("Ошибка получения истории системных метрик:", error);
    res.status(500).json({
      success: false,
      error: "Не удалось получить историю системных метрик",
    });
  }
};

// DELETE /api/history/cleanup - очистка старых данных
export const cleanupOldData = async (req: Request, res: Response) => {
  try {
    const { pingRetentionDays = "90", metricsRetentionDays = "30" } = req.query;

    const pingDays = parseInt(pingRetentionDays as string);
    const metricsDays = parseInt(metricsRetentionDays as string);

    const pingCutoff = new Date();
    pingCutoff.setDate(pingCutoff.getDate() - pingDays);

    const metricsCutoff = new Date();
    metricsCutoff.setDate(metricsCutoff.getDate() - metricsDays);

    // Удаляем старые записи
    const [deletedPings, deletedMetrics] = await Promise.all([
      prisma.pingHistory.deleteMany({
        where: {
          timestamp: {
            lt: pingCutoff,
          },
        },
      }),
      prisma.systemMetrics.deleteMany({
        where: {
          timestamp: {
            lt: metricsCutoff,
          },
        },
      }),
    ]);

    console.log(
      `🧹 Очистка завершена: удалено ${deletedPings.count} записей пингов и ${deletedMetrics.count} системных метрик`
    );

    res.json({
      success: true,
      data: {
        deletedPings: deletedPings.count,
        deletedMetrics: deletedMetrics.count,
        cutoffDates: {
          pings: pingCutoff.toISOString(),
          metrics: metricsCutoff.toISOString(),
        },
      },
      message: `Удалено ${deletedPings.count + deletedMetrics.count} старых записей`,
    });
  } catch (error) {
    console.error("Ошибка очистки старых данных:", error);
    res.status(500).json({
      success: false,
      error: "Не удалось очистить старые данные",
    });
  }
};

// GET /api/history/overview - общий обзор истории
export const getHistoryOverview = async (req: Request, res: Response) => {
  try {
    // Получаем общую статистику
    const [totalPings, totalMetrics, recentDevices, oldestPing] =
      await Promise.all([
        prisma.pingHistory.count(),
        prisma.systemMetrics.count(),
        prisma.device.count(),
        prisma.pingHistory.findFirst({
          orderBy: { timestamp: "asc" },
          select: { timestamp: true },
        }),
      ]);

    // Размер БД (приблизительный расчет)
    const estimatedSize = {
      pings: totalPings * 150, // байт на запись
      metrics: totalMetrics * 200, // байт на запись
      total: (totalPings * 150 + totalMetrics * 200) / 1024 / 1024, // MB
    };

    const dataAge = oldestPing
      ? Math.ceil(
          (Date.now() - oldestPing.timestamp.getTime()) / (1000 * 60 * 60 * 24)
        )
      : 0;

    res.json({
      success: true,
      data: {
        counts: {
          totalPings,
          totalMetrics,
          recentDevices,
        },
        dataAge: {
          days: dataAge,
          oldestRecord: oldestPing?.timestamp,
        },
        estimatedSize,
        recommendations: {
          shouldCleanup: totalPings > 100000,
          shouldMigrate: estimatedSize.total > 100,
          retentionPolicy:
            dataAge > 90
              ? "Рекомендуется настроить автоочистку"
              : "Возраст данных приемлемый",
        },
      },
    });
  } catch (error) {
    console.error("Ошибка получения обзора истории:", error);
    res.status(500).json({
      success: false,
      error: "Не удалось получить обзор истории",
    });
  }
};
