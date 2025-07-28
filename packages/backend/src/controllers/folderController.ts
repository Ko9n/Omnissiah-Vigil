import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET /api/folders - получить все папки
export const getAllFolders = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    console.log("📁 Запрос всех папок");

    // Сначала проверим, есть ли вообще папки в базе
    const totalFolders = await prisma.deviceFolder.count();
    console.log(`📊 Всего папок в базе: ${totalFolders}`);

    const folders = await prisma.deviceFolder.findMany({
      include: {
        children: {
          include: {
            children: true, // Вложенные папки 2-го уровня
          },
        },
        devices: true, // Устройства в папке
      },
      where: {
        parentId: null, // Только корневые папки
      },
    });

    console.log(`📁 Найдено корневых папок: ${folders.length}`);

    // Рекурсивно строим дерево папок
    const buildFolderTree = (folder: any): any => ({
      id: folder.id,
      name: folder.name,
      parentId: folder.parentId,
      color: folder.color || "#3B82F6",
      icon: "Folder",
      description: "",
      expanded: true,
      children: folder.children ? folder.children.map(buildFolderTree) : [],
    });

    const folderTree = folders.map(buildFolderTree);

    console.log(`✅ Отправляем ${folderTree.length} папок`);

    res.json({
      success: true,
      data: folderTree,
      count: folderTree.length,
    });
  } catch (error) {
    console.error("❌ Ошибка получения папок:", error);
    res.status(500).json({
      success: false,
      error: "Не удалось получить список папок",
    });
  }
};

// GET /api/folders/:id - получить папку по ID
export const getFolderById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const folder = await prisma.deviceFolder.findUnique({
      where: { id },
      include: {
        children: true,
        devices: true,
      },
    });

    if (!folder) {
      res.status(404).json({
        success: false,
        error: "Папка не найдена",
      });
      return;
    }

    console.log(`📁 Запрос папки: ${folder.name}`);
    res.json({
      success: true,
      data: folder,
    });
  } catch (error) {
    console.error("Ошибка получения папки:", error);
    res.status(500).json({
      success: false,
      error: "Не удалось получить папку",
    });
  }
};

// POST /api/folders - создать новую папку
export const createFolder = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const folderData = req.body;

    console.log(`📁 Создаем папку с данными:`, folderData);

    const createData: any = {
      name: folderData.name,
      color: folderData.color || "#3B82F6",
    };

    // Связь с родительской папкой
    if (folderData.parentId && folderData.parentId !== "root") {
      createData.parent = { connect: { id: folderData.parentId } };
    }

    const newFolder = await prisma.deviceFolder.create({
      data: createData,
      include: {
        children: true,
        devices: true,
      },
    });

    console.log(`➕ Создана папка: ${newFolder.name}`);
    res.status(201).json({
      success: true,
      data: newFolder,
      message: "Папка успешно создана",
    });
  } catch (error) {
    console.error("Ошибка создания папки:", error);
    res.status(500).json({
      success: false,
      error: "Не удалось создать папку",
    });
  }
};

// PUT /api/folders/:id - обновить папку
export const updateFolder = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Подготавливаем данные для обновления
    const updateFields: any = {};

    if (updateData.name !== undefined) updateFields.name = updateData.name;
    if (updateData.color !== undefined) updateFields.color = updateData.color;

    // Связь с родительской папкой
    if (updateData.parentId !== undefined) {
      if (updateData.parentId === null || updateData.parentId === "root") {
        updateFields.parent = { disconnect: true };
      } else {
        updateFields.parent = { connect: { id: updateData.parentId } };
      }
    }

    console.log(`🔄 Обновляем папку ${id} с данными:`, updateFields);

    const updatedFolder = await prisma.deviceFolder.update({
      where: { id },
      data: updateFields,
      include: {
        children: true,
        devices: true,
      },
    });

    console.log(`✏️ Обновлена папка: ${updatedFolder.name}`);
    res.json({
      success: true,
      data: updatedFolder,
      message: "Папка успешно обновлена",
    });
  } catch (error) {
    console.error("Ошибка обновления папки:", error);
    res.status(500).json({
      success: false,
      error: "Не удалось обновить папку",
    });
  }
};

// DELETE /api/folders/:id - удалить папку
export const deleteFolder = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    // Перемещаем все устройства из удаляемой папки в корень
    await prisma.device.updateMany({
      where: { folderId: id },
      data: {
        folderId: null,
      },
    });

    const deletedFolder = await prisma.deviceFolder.delete({
      where: { id },
      include: {
        devices: true,
      },
    });

    console.log(`🗑️ Удалена папка: ${deletedFolder.name}`);
    res.json({
      success: true,
      data: deletedFolder,
      message: "Папка успешно удалена",
    });
  } catch (error) {
    console.error("Ошибка удаления папки:", error);
    res.status(500).json({
      success: false,
      error: "Не удалось удалить папку",
    });
  }
};
