import express, { type Application } from "express";
import { createServer } from "http";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";

// Import routes
import deviceRoutes from "./routes/devices";
import metricsRoutes from "./routes/metrics";
import systemRoutes from "./routes/system";
import folderRoutes from "./routes/folders";
import historyRoutes from "./routes/history";

// Import WebSocket server
import { SocketServer } from "./websocket/socketServer";

// Import cleanup utilities
import { initAutoCleanup, getDataStats } from "./utils/cleanup";

// Import database manager
import dbManager from "./utils/prisma";

// Import middleware
import { sanitizeInput, rateLimit } from "./middleware/validation";
import { cacheMiddleware } from "./utils/cache";
import { log } from "./lib/logger";

// Load environment variables
dotenv.config({ path: ".env" });

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Initialize database connection
async function initializeDatabase() {
  try {
    await dbManager.connect();

    // Wait for database to be ready
    let attempts = 0;
    const maxAttempts = 10;

    while (attempts < maxAttempts) {
      if (await dbManager.healthCheck()) {
        log.info("Database is ready");
        break;
      }

      attempts++;
      log.info(`Waiting for database... (attempt ${attempts}/${maxAttempts})`);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    if (attempts >= maxAttempts) {
      throw new Error("Database connection timeout");
    }
  } catch (error) {
    log.error("Failed to initialize database", error);
    process.exit(1);
  }
}

// Security middleware
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https:"],
      },
    },
  })
);

// CORS configuration
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Logging middleware
app.use(
  morgan("combined", {
    stream: {
      write: (message: string) => {
        log.info(message.trim());
      },
    },
  })
);

// Body parsing middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Input sanitization
app.use(sanitizeInput);

// Rate limiting - более мягкие настройки для мониторинга
app.use((req, res, next) => {
  // Более мягкий rate limiting для API мониторинга
  if (req.path.startsWith("/api/")) {
    return rateLimit(2000, 15 * 60 * 1000)(req, res, next); // 2000 requests per 15 minutes for API
  }
  // Стандартный rate limiting для остальных запросов
  return rateLimit(500, 15 * 60 * 1000)(req, res, next); // 500 requests per 15 minutes
});

// Cache middleware for GET requests
app.use(cacheMiddleware(5 * 60 * 1000)); // 5 minutes cache

// Routes
app.use("/api/devices", deviceRoutes);
app.use("/api/metrics", metricsRoutes);
app.use("/api/system", systemRoutes);
app.use("/api/folders", folderRoutes);
app.use("/api/history", historyRoutes);

// Health check endpoint
app.get("/api/health", async (req, res) => {
  try {
    const dbHealth = await dbManager.healthCheck();

    res.status(200).json({
      status: "OK",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || "development",
      database: dbHealth ? "connected" : "disconnected",
      version: process.env.npm_package_version || "1.0.0",
    });
  } catch (error) {
    log.error("Health check failed", error);
    res.status(500).json({
      status: "ERROR",
      timestamp: new Date().toISOString(),
      error: "Health check failed",
    });
  }
});

// Cache stats endpoint
app.get("/api/cache/stats", (req, res) => {
  try {
    const cacheManager = require("./utils/cache").default;
    const stats = cacheManager.getStats();

    res.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    log.error("Error getting cache stats", error);
    res.status(500).json({
      success: false,
      error: "Failed to get cache stats",
    });
  }
});

// Error handling middleware
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    log.error("Unhandled error", {
      error: err.message,
      stack: err.stack,
      path: req.path,
      method: req.method,
      ip: req.ip,
    });

    res.status(500).json({
      success: false,
      error: "Internal Server Error",
      message:
        process.env.NODE_ENV === "development"
          ? err.message
          : "Something went wrong",
    });
  }
);

// 404 handler
app.use("*", (req, res) => {
  log.warn("Route not found", {
    path: req.originalUrl,
    method: req.method,
    ip: req.ip,
  });

  res.status(404).json({
    success: false,
    error: "Not Found",
    message: `Route ${req.originalUrl} not found`,
  });
});

// Create HTTP server
const httpServer = createServer(app);

// Initialize WebSocket server
const socketServer = new SocketServer(httpServer);

// Initialize auto cleanup on startup
initAutoCleanup();

// Show database stats on startup
getDataStats().then((stats) => {
  if (stats) {
    log.info("Database stats on startup", {
      records: stats.counts,
      size: `${stats.estimatedSize.total}MB`,
      retention: `${stats.retentionDays.pings}д/пинги, ${stats.retentionDays.metrics}д/метрики`,
    });
  }
});

// Start server
async function startServer() {
  try {
    // Initialize database first
    await initializeDatabase();

    // Start HTTP server
    httpServer.listen(PORT, () => {
      log.info(`Server started on port ${PORT}`);
      log.info(`API available at http://localhost:${PORT}/api`);
      log.info(`Health check: http://localhost:${PORT}/api/health`);
      log.info(`History: http://localhost:${PORT}/api/history/overview`);
      log.info(`WebSocket server active at ws://localhost:${PORT}`);
    });
  } catch (error) {
    log.error("Failed to start server", error);
    process.exit(1);
  }
}

startServer();

export default app;
