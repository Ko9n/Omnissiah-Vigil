import { log } from "../lib/logger";

interface CacheItem<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

interface CacheStats {
  hits: number;
  misses: number;
  size: number;
  keys: string[];
}

class CacheManager {
  private cache = new Map<string, CacheItem<any>>();
  private stats = {
    hits: 0,
    misses: 0,
  };
  private defaultTTL = 5 * 60 * 1000; // 5 минут по умолчанию

  constructor() {
    // Очистка устаревших записей каждые 10 минут
    setInterval(() => {
      this.cleanup();
    }, 10 * 60 * 1000);
  }

  /**
   * Сохранить данные в кэш
   */
  set<T>(key: string, data: T, ttl: number = this.defaultTTL): void {
    try {
      this.cache.set(key, {
        data,
        timestamp: Date.now(),
        ttl,
      });
      log.debug(`Cache set: ${key} (TTL: ${ttl}ms)`);
    } catch (error) {
      log.error("Error setting cache item", error);
    }
  }

  /**
   * Получить данные из кэша
   */
  get<T>(key: string): T | null {
    try {
      const item = this.cache.get(key);

      if (!item) {
        this.stats.misses++;
        return null;
      }

      // Проверяем, не истек ли TTL
      if (Date.now() - item.timestamp > item.ttl) {
        this.cache.delete(key);
        this.stats.misses++;
        return null;
      }

      this.stats.hits++;
      return item.data as T;
    } catch (error) {
      log.error("Error getting cache item", error);
      return null;
    }
  }

  /**
   * Проверить, есть ли ключ в кэше
   */
  has(key: string): boolean {
    const item = this.cache.get(key);
    if (!item) return false;

    // Проверяем TTL
    if (Date.now() - item.timestamp > item.ttl) {
      this.cache.delete(key);
      return false;
    }

    return true;
  }

  /**
   * Удалить элемент из кэша
   */
  delete(key: string): boolean {
    try {
      const deleted = this.cache.delete(key);
      if (deleted) {
        log.debug(`Cache delete: ${key}`);
      }
      return deleted;
    } catch (error) {
      log.error("Error deleting cache item", error);
      return false;
    }
  }

  /**
   * Очистить весь кэш
   */
  clear(): void {
    try {
      this.cache.clear();
      this.stats.hits = 0;
      this.stats.misses = 0;
      log.info("Cache cleared");
    } catch (error) {
      log.error("Error clearing cache", error);
    }
  }

  /**
   * Очистка устаревших записей
   */
  private cleanup(): void {
    try {
      const now = Date.now();
      let deletedCount = 0;

      for (const [key, item] of this.cache.entries()) {
        if (now - item.timestamp > item.ttl) {
          this.cache.delete(key);
          deletedCount++;
        }
      }

      if (deletedCount > 0) {
        log.debug(`Cache cleanup: deleted ${deletedCount} expired items`);
      }
    } catch (error) {
      log.error("Error during cache cleanup", error);
    }
  }

  /**
   * Получить статистику кэша
   */
  getStats(): CacheStats {
    const keys = Array.from(this.cache.keys());
    const totalRequests = this.stats.hits + this.stats.misses;
    const hitRate =
      totalRequests > 0 ? (this.stats.hits / totalRequests) * 100 : 0;

    log.debug(
      `Cache stats: ${this.stats.hits} hits, ${
        this.stats.misses
      } misses, ${hitRate.toFixed(2)}% hit rate`
    );

    return {
      hits: this.stats.hits,
      misses: this.stats.misses,
      size: this.cache.size,
      keys,
    };
  }

  /**
   * Получить размер кэша
   */
  size(): number {
    return this.cache.size;
  }
}

// Создаем глобальный экземпляр кэша
const cacheManager = new CacheManager();

// Специализированные кэши для разных типов данных
export const deviceCache = {
  get: (key: string) => cacheManager.get(`device:${key}`),
  set: (key: string, data: any, ttl?: number) =>
    cacheManager.set(`device:${key}`, data, ttl),
  delete: (key: string) => cacheManager.delete(`device:${key}`),
  has: (key: string) => cacheManager.has(`device:${key}`),
};

export const metricsCache = {
  get: (key: string) => cacheManager.get(`metrics:${key}`),
  set: (key: string, data: any, ttl?: number) =>
    cacheManager.set(`metrics:${key}`, data, ttl),
  delete: (key: string) => cacheManager.delete(`metrics:${key}`),
  has: (key: string) => cacheManager.has(`metrics:${key}`),
};

export const systemCache = {
  get: (key: string) => cacheManager.get(`system:${key}`),
  set: (key: string, data: any, ttl?: number) =>
    cacheManager.set(`system:${key}`, data, ttl),
  delete: (key: string) => cacheManager.delete(`system:${key}`),
  has: (key: string) => cacheManager.has(`system:${key}`),
};

// Middleware для кэширования API ответов
export const cacheMiddleware = (ttl: number = 5 * 60 * 1000) => {
  return (req: any, res: any, next: any) => {
    const key = `api:${req.method}:${req.originalUrl}`;

    // Пропускаем кэширование для POST, PUT, DELETE запросов
    if (["POST", "PUT", "DELETE", "PATCH"].includes(req.method)) {
      return next();
    }

    const cached = cacheManager.get(key);
    if (cached) {
      return res.json(cached);
    }

    // Перехватываем res.json для кэширования ответа
    const originalJson = res.json;
    res.json = function (data: any) {
      cacheManager.set(key, data, ttl);
      return originalJson.call(this, data);
    };

    next();
  };
};

export default cacheManager;
