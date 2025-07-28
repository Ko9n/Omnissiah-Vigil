import dbManager from "./prisma";
import cron from "node-cron";

// Retention policies (в днях)
const PING_HISTORY_RETENTION_DAYS = parseInt(
  process.env.PING_HISTORY_RETENTION_DAYS || "90"
);
const SYSTEM_METRICS_RETENTION_DAYS = parseInt(
  process.env.SYSTEM_METRICS_RETENTION_DAYS || "30"
);

/**
 * Очистка старых записей истории пингов
 */
export async function cleanupPingHistory(): Promise<number> {
  try {
    const prisma = dbManager.getClient();
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - PING_HISTORY_RETENTION_DAYS);

    const result = await prisma.pingHistory.deleteMany({
      where: {
        timestamp: {
          lt: cutoffDate,
        },
      },
    });

    console.log(
      `🧹 Очистка ping_history: удалено ${result.count} записей старше ${PING_HISTORY_RETENTION_DAYS} дней`
    );
    return result.count;
  } catch (error) {
    console.error("❌ Ошибка очистки ping_history:", error);
    return 0;
  }
}

/**
 * Очистка старых системных метрик
 */
export async function cleanupSystemMetrics(): Promise<number> {
  try {
    const prisma = dbManager.getClient();
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - SYSTEM_METRICS_RETENTION_DAYS);

    const result = await prisma.systemMetrics.deleteMany({
      where: {
        timestamp: {
          lt: cutoffDate,
        },
      },
    });

    console.log(
      `🧹 Очистка system_metrics: удалено ${result.count} записей старше ${SYSTEM_METRICS_RETENTION_DAYS} дней`
    );
    return result.count;
  } catch (error) {
    console.error("❌ Ошибка очистки system_metrics:", error);
    return 0;
  }
}

/**
 * Полная очистка старых данных
 */
export async function cleanupOldData(): Promise<{
  pings: number;
  metrics: number;
}> {
  console.log("🧹 Запуск автоматической очистки старых данных...");

  const [deletedPings, deletedMetrics] = await Promise.all([
    cleanupPingHistory(),
    cleanupSystemMetrics(),
  ]);

  const total = deletedPings + deletedMetrics;
  if (total > 0) {
    console.log(
      `✅ Очистка завершена: удалено ${total} записей (pings: ${deletedPings}, metrics: ${deletedMetrics})`
    );
  } else {
    console.log("ℹ️ Нет данных для очистки");
  }

  return { pings: deletedPings, metrics: deletedMetrics };
}

/**
 * Получение статистики по объему данных
 */
export async function getDataStats() {
  try {
    const prisma = dbManager.getClient();
    const [
      totalPings,
      totalMetrics,
      oldestPing,
      oldestMetric,
      newestPing,
      newestMetric,
    ] = await Promise.all([
      prisma.pingHistory.count(),
      prisma.systemMetrics.count(),
      prisma.pingHistory.findFirst({
        orderBy: { timestamp: "asc" },
        select: { timestamp: true },
      }),
      prisma.systemMetrics.findFirst({
        orderBy: { timestamp: "asc" },
        select: { timestamp: true },
      }),
      prisma.pingHistory.findFirst({
        orderBy: { timestamp: "desc" },
        select: { timestamp: true },
      }),
      prisma.systemMetrics.findFirst({
        orderBy: { timestamp: "desc" },
        select: { timestamp: true },
      }),
    ]);

    const estimatedSize = {
      pings: Math.round(((totalPings * 150) / 1024 / 1024) * 100) / 100, // MB
      metrics: Math.round(((totalMetrics * 200) / 1024 / 1024) * 100) / 100, // MB
      total:
        Math.round(
          ((totalPings * 150 + totalMetrics * 200) / 1024 / 1024) * 100
        ) / 100, // MB
    };

    return {
      counts: { totalPings, totalMetrics },
      dateRange: {
        pings: {
          oldest: oldestPing?.timestamp,
          newest: newestPing?.timestamp,
        },
        metrics: {
          oldest: oldestMetric?.timestamp,
          newest: newestMetric?.timestamp,
        },
      },
      estimatedSize,
      retentionDays: {
        pings: PING_HISTORY_RETENTION_DAYS,
        metrics: SYSTEM_METRICS_RETENTION_DAYS,
      },
    };
  } catch (error) {
    console.error("❌ Ошибка получения статистики данных:", error);
    return null;
  }
}

/**
 * Инициализация автоматической очистки
 * Запускается каждый день в 3:00 AM
 */
export function initAutoCleanup(): void {
  console.log("⏰ Инициализация автоматической очистки данных...");
  console.log(
    `📊 Retention policy: ping_history=${PING_HISTORY_RETENTION_DAYS}д, system_metrics=${SYSTEM_METRICS_RETENTION_DAYS}д`
  );

  // Запуск каждый день в 3:00 AM
  cron.schedule("0 3 * * *", async () => {
    console.log("⏰ Запуск ежедневной очистки данных (3:00 AM)");
    await cleanupOldData();
  });

  // Опционально: запуск каждые 6 часов в production
  if (process.env.NODE_ENV === "production") {
    cron.schedule("0 */6 * * *", async () => {
      const stats = await getDataStats();
      if (stats && stats.estimatedSize.total > 100) {
        // Если размер > 100MB
        console.log(
          "⚠️ Размер БД превышает 100MB, запуск дополнительной очистки"
        );
        await cleanupOldData();
      }
    });
  }

  console.log("✅ Автоматическая очистка настроена");
}

/**
 * Ручной запуск очистки с логированием
 */
export async function manualCleanup(): Promise<void> {
  console.log("🧹 Ручной запуск очистки данных");

  // Показать статистику до очистки
  const statsBefore = await getDataStats();
  if (statsBefore) {
    console.log("📊 До очистки:", {
      records: statsBefore.counts,
      size: `${statsBefore.estimatedSize.total}MB`,
    });
  }

  // Выполнить очистку
  const result = await cleanupOldData();

  // Показать статистику после очистки
  const statsAfter = await getDataStats();
  if (statsAfter) {
    console.log("📊 После очистки:", {
      records: statsAfter.counts,
      size: `${statsAfter.estimatedSize.total}MB`,
      deleted: result,
    });
  }
}
