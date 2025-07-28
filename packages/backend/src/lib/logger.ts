import winston from "winston";

// Создаем логгер
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: "monitoring-backend" },
  transports: [
    // Записываем все логи с уровнем `error` и ниже в `error.log`
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
    // Записываем все логи с уровнем `info` и ниже в `combined.log`
    new winston.transports.File({
      filename: "logs/combined.log",
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
  ],
});

// Если мы не в production, то логируем в консоль
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    })
  );
}

// Создаем функции для удобного логирования
export const log = {
  info: (message: string, meta?: any) => {
    if (process.env.NODE_ENV === "development") {
      console.log(`ℹ️ ${message}`, meta || "");
    }
    logger.info(message, meta);
  },

  error: (message: string, error?: any) => {
    if (process.env.NODE_ENV === "development") {
      console.error(`❌ ${message}`, error || "");
    }
    logger.error(message, { error });
  },

  warn: (message: string, meta?: any) => {
    if (process.env.NODE_ENV === "development") {
      console.warn(`⚠️ ${message}`, meta || "");
    }
    logger.warn(message, meta);
  },

  debug: (message: string, meta?: any) => {
    if (process.env.NODE_ENV === "development") {
      console.log(`🔍 ${message}`, meta || "");
    }
    logger.debug(message, meta);
  },

  // Специальные функции для разных компонентов
  api: (message: string, meta?: any) => {
    log.info(`🌐 API: ${message}`, meta);
  },

  db: (message: string, meta?: any) => {
    log.info(`🗄️ DB: ${message}`, meta);
  },

  websocket: (message: string, meta?: any) => {
    log.info(`🔌 WebSocket: ${message}`, meta);
  },

  monitoring: (message: string, meta?: any) => {
    log.info(`📊 Monitoring: ${message}`, meta);
  },
};

export default logger;
