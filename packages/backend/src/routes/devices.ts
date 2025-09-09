import { Router, type Router as RouterType } from "express";
import {
  getAllDevices,
  getDeviceById,
  createDevice,
  updateDevice,
  deleteDevice,
} from "../controllers/deviceCrudController";
import { pingDevice } from "../controllers/pingController";
import {
  scanNetwork as scanNetworkOld,
  startNetworkScan,
  getScanStatus,
} from "../controllers/networkController";
import {
  bulkCreateDevices,
  bulkUpdateDevices,
  bulkDeleteDevices,
} from "../controllers/bulkController";

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
router.post("/scan-network", startNetworkScan);
router.get("/scan-progress/:id", getScanStatus);

// POST /api/devices/bulk-create - массовое создание устройств
router.post("/bulk-create", bulkCreateDevices);

// PUT /api/devices/bulk-update - массовое обновление устройств
router.put("/bulk-update", bulkUpdateDevices);

// DELETE /api/devices/bulk-delete - массовое удаление устройств
router.delete("/bulk-delete", bulkDeleteDevices);

export default router;
