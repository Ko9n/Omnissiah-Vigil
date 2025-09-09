import { Request, Response } from "express";
import { log } from "../lib/logger";
import { NetworkScannerService } from "../services/networkScanner";
import { NetworkScanRequestSchema } from "@monitoring/shared";
import { scanJobManager } from "../services/scanJobManager";
import { randomUUID } from "crypto";

const networkScanner = new NetworkScannerService();

/**
 * POST /api/devices/scan-network - сканировать сеть
 */
export const scanNetwork = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    log.monitoring("Starting network scan request");

    // Проверяем что ответ еще не был отправлен
    if (res.headersSent) {
      log.warn("Response already sent, skipping scan");
      return;
    }

    // Валидация входных данных
    const validation = NetworkScanRequestSchema.safeParse(req.body);
    if (!validation.success) {
      res.status(400).json({
        success: false,
        error:
          validation.error.errors[0]?.message || "Неверные параметры запроса",
      });
      return;
    }

    const {
      network,
      timeout = 30000,
      scanType = "ping",
      ports = "22,80,443,161",
    } = validation.data;

    // Анализируем сеть
    const networkParams = networkScanner.calculateNetworkParams(network);

    if (networkParams.isLargeNetwork) {
      res.status(400).json({
        success: false,
        error: `Сеть слишком большая (${networkParams.hostCount} адресов). Используйте подсеть меньше /22 (максимум 1024 адреса).`,
      });
      return;
    }

    log.monitoring(
      `Network scan: ${network} (${networkParams.hostCount} potential hosts, timeout: ${networkParams.adaptiveTimeout}ms, type: ${scanType})`
    );

    // Устанавливаем timeout для ответа
    const finalTimeout = Math.max(timeout, networkParams.adaptiveTimeout);
    const timeoutId = setTimeout(() => {
      if (!res.headersSent) {
        log.warn(`Network scan timeout after ${finalTimeout}ms`);
        res.status(408).json({
          success: false,
          error: `Сканирование превысило лимит времени (${finalTimeout}ms)`,
        });
      }
    }, finalTimeout);

    try {
      let scanResults;

      // Пытаемся использовать nmap
      try {
        scanResults = await networkScanner.scanWithNmap({
          network,
          timeout: finalTimeout - 5000, // Оставляем 5 секунд на обработку
          scanType,
          ports,
        });
        log.monitoring(
          `Nmap scan completed: found ${scanResults.length} hosts`
        );
      } catch (nmapError) {
        log.warn("Nmap scan failed, falling back to ping:", nmapError);

        // Fallback на простой ping
        scanResults = await networkScanner.fallbackPingScan(network);
        log.monitoring(
          `Fallback ping scan completed: found ${scanResults.length} hosts`
        );
      }

      // Очищаем timeout
      clearTimeout(timeoutId);

      // Проверяем что ответ еще не отправлен
      if (res.headersSent) {
        log.warn("Response already sent during scan");
        return;
      }

      // Фильтруем только живые хосты для отчета
      const aliveHosts = scanResults.filter((host) => host.isAlive);

      log.monitoring(
        `Network scan completed: ${network}, found ${aliveHosts.length}/${scanResults.length} alive hosts`
      );

      res.json({
        success: true,
        data: {
          network,
          scanType,
          totalScanned: networkParams.hostCount,
          aliveHosts: aliveHosts.length,
          results: aliveHosts,
          scanDuration: Date.now(), // Можно добавить точное время если нужно
          timestamp: new Date().toISOString(),
        },
      });
    } catch (scanError) {
      clearTimeout(timeoutId);

      if (res.headersSent) {
        log.error("Scan error but response already sent:", scanError);
        return;
      }

      throw scanError;
    }
  } catch (error) {
    log.error("Network scan error:", error);

    if (!res.headersSent) {
      res.status(500).json({
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Не удалось выполнить сканирование сети",
      });
    }
  }
};

/**
 * POST /api/network/start-scan - начать новое сканирование
 */
export const startNetworkScan = async (
  req: Request,
  res: Response
): Promise<void> => {
  const validation = NetworkScanRequestSchema.safeParse(req.body);
  if (!validation.success) {
    res.status(400).json({ success: false, error: "Неверные параметры" });
    return;
  }
  const {
    network,
    timeout = 30000,
    scanType = "ping",
    ports = "22,80,443,161",
  } = validation.data;

  const job = scanJobManager.createJob(network);
  res.json({ success: true, jobId: job.id });

  // запускаем фоново
  (async () => {
    try {
      scanJobManager.updateJob(job.id, { status: "running", progress: 0 });
      const results = await networkScanner.scanWithNmap({
        network,
        timeout,
        scanType,
        ports,
      });
      scanJobManager.updateJob(job.id, {
        status: "done",
        progress: 100,
        results,
      });
    } catch (err: any) {
      scanJobManager.updateJob(job.id, {
        status: "error",
        error: err?.message || String(err),
      });
    }
  })();
};

/**
 * GET /api/network/scan-status - получить статус текущего сканирования
 * (Можно добавить позже для отслеживания прогресса)
 */
export const getScanStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const job = scanJobManager.getJob(id);
  if (!job) {
    res.status(404).json({ success: false, error: "Job not found" });
    return;
  }
  res.json({ success: true, data: job });
};
