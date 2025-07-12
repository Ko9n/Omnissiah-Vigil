import { Router, type Router as RouterType } from "express";
import {
  getSystemInfo,
  restartService,
  getConfiguration,
} from "../controllers/systemController";

const router: RouterType = Router();

// GET /api/system/info - получить информацию о системе
router.get("/info", getSystemInfo);

// POST /api/system/restart - перезапустить сервис
router.post("/restart", restartService);

// GET /api/system/config - получить конфигурацию
router.get("/config", getConfiguration);

export default router;
