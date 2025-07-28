import { Router } from "express";
import {
  getPingHistory,
  getPingStats,
  getSystemMetricsHistory,
  cleanupOldData,
  getHistoryOverview,
} from "../controllers/historyController";

const router: Router = Router();

// История пингов
router.get("/ping/:deviceId", getPingHistory);
router.get("/ping/:deviceId/stats", getPingStats);

// История системных метрик
router.get("/system", getSystemMetricsHistory);

// Управление данными
router.get("/overview", getHistoryOverview);
router.delete("/cleanup", cleanupOldData);

export default router;
