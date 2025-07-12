import { Router, type Router as RouterType } from "express";
import {
  getSystemHealth,
  getBandwidthData,
  getNetworkStats,
} from "../controllers/metricsController";

const router: RouterType = Router();

// GET /api/metrics/system - получить здоровье системы
router.get("/system", getSystemHealth);

// GET /api/metrics/bandwidth - получить данные пропускной способности
router.get("/bandwidth", getBandwidthData);

// GET /api/metrics/network - получить статистику сети
router.get("/network", getNetworkStats);

export default router;
