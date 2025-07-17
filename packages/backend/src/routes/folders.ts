import { Router } from "express";
import {
  getAllFolders,
  getFolderById,
  createFolder,
  updateFolder,
  deleteFolder,
} from "../controllers/folderController";

const router = Router();

// GET /api/folders - получить все папки
router.get("/", getAllFolders);

// GET /api/folders/:id - получить папку по ID
router.get("/:id", getFolderById);

// POST /api/folders - создать новую папку
router.post("/", createFolder);

// PUT /api/folders/:id - обновить папку
router.put("/:id", updateFolder);

// DELETE /api/folders/:id - удалить папку
router.delete("/:id", deleteFolder);

export default router;
