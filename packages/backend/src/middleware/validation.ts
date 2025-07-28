import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";
import { log } from "../lib/logger";

// Схемы валидации
export const deviceSchema = z.object({
  name: z
    .string()
    .min(1, "Имя устройства обязательно")
    .max(100, "Имя слишком длинное"),
  ip: z.string().ip("Неверный формат IP адреса"),
  type: z.enum([
    "router",
    "switch",
    "server",
    "workstation",
    "printer",
    "mobile",
    "firewall",
    "access_point",
  ]),
  location: z.string().optional(),
  description: z.string().optional(),
  mac: z
    .string()
    .regex(
      /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/,
      "Неверный формат MAC адреса"
    )
    .optional(),
  vendor: z.string().optional(),
  model: z.string().optional(),
  osVersion: z.string().optional(),
  folderId: z.string().optional(),
  monitoringPing: z.boolean().default(true),
  monitoringSnmp: z.boolean().default(false),
  monitoringHttp: z.boolean().default(false),
  monitoringSsh: z.boolean().default(false),
});

export const deviceUpdateSchema = deviceSchema.partial();

export const folderSchema = z.object({
  name: z
    .string()
    .min(1, "Имя папки обязательно")
    .max(50, "Имя слишком длинное"),
  color: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/, "Неверный формат цвета")
    .optional(),
  parentId: z.string().optional(),
});

export const folderUpdateSchema = folderSchema.partial();

export const metricsQuerySchema = z.object({
  period: z.enum(["1h", "6h", "24h", "7d", "30d"]).optional(),
  deviceId: z.string().optional(),
  limit: z.number().min(1).max(1000).optional(),
});

export const paginationSchema = z.object({
  page: z.number().min(1).optional(),
  limit: z.number().min(1).max(100).optional(),
  search: z.string().optional(),
  status: z.enum(["online", "offline", "unknown"]).optional(),
  type: z.string().optional(),
});

export const deviceQuerySchema = paginationSchema.extend({
  folderId: z.string().optional(),
});

// Middleware для валидации тела запроса
export const validateBody = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedData = schema.parse(req.body);
      req.body = validatedData;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.errors.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        }));

        log.warn("Validation error", {
          path: req.path,
          method: req.method,
          errors,
        });

        return res.status(400).json({
          success: false,
          error: "Validation failed",
          details: errors,
        });
      }

      log.error("Unexpected validation error", error);
      return res.status(500).json({
        success: false,
        error: "Internal validation error",
      });
    }
  };
};

// Middleware для валидации query параметров
export const validateQuery = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedData = schema.parse(req.query);
      req.query = validatedData;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.errors.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        }));

        log.warn("Query validation error", {
          path: req.path,
          method: req.method,
          errors,
        });

        return res.status(400).json({
          success: false,
          error: "Invalid query parameters",
          details: errors,
        });
      }

      log.error("Unexpected query validation error", error);
      return res.status(500).json({
        success: false,
        error: "Internal validation error",
      });
    }
  };
};

// Middleware для валидации параметров пути
export const validateParams = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedData = schema.parse(req.params);
      req.params = validatedData;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.errors.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        }));

        log.warn("Params validation error", {
          path: req.path,
          method: req.method,
          errors,
        });

        return res.status(400).json({
          success: false,
          error: "Invalid path parameters",
          details: errors,
        });
      }

      log.error("Unexpected params validation error", error);
      return res.status(500).json({
        success: false,
        error: "Internal validation error",
      });
    }
  };
};

// Специализированные middleware
export const validateDevice = validateBody(deviceSchema);
export const validateDeviceUpdate = validateBody(deviceUpdateSchema);
export const validateFolder = validateBody(folderSchema);
export const validateFolderUpdate = validateBody(folderUpdateSchema);
export const validateMetricsQuery = validateQuery(metricsQuerySchema);
export const validateDeviceQuery = validateQuery(deviceQuerySchema);

// Валидация ID устройства
export const validateDeviceId = validateParams(
  z.object({
    id: z.string().min(1, "ID устройства обязателен"),
  })
);

// Валидация ID папки
export const validateFolderId = validateParams(
  z.object({
    id: z.string().min(1, "ID папки обязателен"),
  })
);

// Sanitize middleware для очистки входных данных
export const sanitizeInput = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Очистка строковых полей
  const sanitizeString = (str: string): string => {
    return str
      .trim()
      .replace(/[<>]/g, "") // Удаляем потенциально опасные символы
      .replace(/\s+/g, " "); // Нормализуем пробелы
  };

  // Очистка тела запроса
  if (req.body) {
    Object.keys(req.body).forEach((key) => {
      if (typeof req.body[key] === "string") {
        req.body[key] = sanitizeString(req.body[key]);
      }
    });
  }

  // Очистка query параметров
  if (req.query) {
    Object.keys(req.query).forEach((key) => {
      if (typeof req.query[key] === "string") {
        req.query[key] = sanitizeString(req.query[key] as string);
      }
    });
  }

  next();
};

// Rate limiting middleware
export const rateLimit = (
  maxRequests: number = 100,
  windowMs: number = 15 * 60 * 1000
) => {
  const requests = new Map<string, { count: number; resetTime: number }>();

  return (req: Request, res: Response, next: NextFunction) => {
    const ip = req.ip || req.connection.remoteAddress || "unknown";
    const now = Date.now();

    const userRequests = requests.get(ip);

    if (!userRequests || now > userRequests.resetTime) {
      requests.set(ip, { count: 1, resetTime: now + windowMs });
    } else {
      userRequests.count++;

      if (userRequests.count > maxRequests) {
        log.warn("Rate limit exceeded", { ip, count: userRequests.count });
        return res.status(429).json({
          success: false,
          error: "Too many requests",
          retryAfter: Math.ceil((userRequests.resetTime - now) / 1000),
        });
      }
    }

    next();
  };
};
