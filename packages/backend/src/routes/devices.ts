import { Router, type Router as RouterType } from "express";
import {
  getAllDevices,
  getDeviceById,
  createDevice,
  updateDevice,
  deleteDevice,
  pingDevice,
  scanNetwork,
  bulkCreateDevices,
} from "../controllers/deviceController";

const router: RouterType = Router();

// GET /api/devices - получить все устройства
router.get("/", getAllDevices);

// GET /api/devices/:id - получить устройство по ID
router.get("/:id", getDeviceById);

// POST /api/devices - создать новое устройство
router.post("/", createDevice);

// PUT /api/devices/:id - обновить устройство
router.put("/:id", updateDevice);

// DELETE /api/devices/:id - удалить устройство
router.delete("/:id", deleteDevice);

// POST /api/devices/:id/ping - пинг устройства
router.post("/:id/ping", pingDevice);

// POST /api/devices/scan-network - сканировать сеть
router.post("/scan-network", scanNetwork);

// POST /api/devices/bulk-create - массовое создание устройств
router.post("/bulk-create", bulkCreateDevices);

export default router;
