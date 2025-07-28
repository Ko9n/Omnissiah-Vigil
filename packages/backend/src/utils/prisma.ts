import { PrismaClient } from "@prisma/client";
import { log } from "../lib/logger";

class DatabaseManager {
  private prisma: PrismaClient;
  private isConnected: boolean = false;
  private retryAttempts: number = 0;
  private maxRetryAttempts: number = 5;
  private retryDelay: number = 1000;

  constructor() {
    this.prisma = new PrismaClient({
      log:
        process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
    });
  }

  async connect(): Promise<void> {
    try {
      await this.prisma.$connect();
      this.isConnected = true;
      log.db("Database connection established");
    } catch (error) {
      log.error("Failed to connect to database", error);
      await this.handleConnectionError();
    }
  }

  private async handleConnectionError(): Promise<void> {
    if (this.retryAttempts < this.maxRetryAttempts) {
      this.retryAttempts++;
      const delay = this.retryDelay * Math.pow(2, this.retryAttempts - 1);

      log.warn(
        `Retrying database connection in ${delay}ms (attempt ${this.retryAttempts}/${this.maxRetryAttempts})`
      );

      setTimeout(async () => {
        try {
          await this.connect();
        } catch (error) {
          log.error(`Retry attempt ${this.retryAttempts} failed`, error);
        }
      }, delay);
    } else {
      log.error("Max retry attempts reached. Database connection failed.");
      process.exit(1);
    }
  }

  async disconnect(): Promise<void> {
    try {
      await this.prisma.$disconnect();
      this.isConnected = false;
      log.db("Database disconnected");
    } catch (error) {
      log.error("Error disconnecting from database", error);
    }
  }

  async healthCheck(): Promise<boolean> {
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      return true;
    } catch (error) {
      log.error("Database health check failed", error);
      return false;
    }
  }

  getClient(): PrismaClient {
    if (!this.isConnected) {
      throw new Error("Database not connected. Call connect() first.");
    }
    return this.prisma;
  }

  isDatabaseConnected(): boolean {
    return this.isConnected;
  }
}

const dbManager = new DatabaseManager();

// Graceful shutdown
process.on("SIGINT", async () => {
  log.info("Received SIGINT, shutting down gracefully...");
  await dbManager.disconnect();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  log.info("Received SIGTERM, shutting down gracefully...");
  await dbManager.disconnect();
  process.exit(0);
});

export default dbManager;
