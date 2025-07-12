import { Router, type Router as RouterType } from "express";
import {
  getAllDevices,
  getDeviceById,
  createDevice,
  updateDevice,
  deleteDevice,
  pingDevice,
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

export default router;
