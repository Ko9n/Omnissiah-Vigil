import { Server as SocketIOServer } from "socket.io";
import { Server } from "http";
import * as ping from "ping";
import dbManager from "../utils/prisma";
import { log } from "../lib/logger";
import { authMiddleware, requireAuth, WebSocketAuth } from "../middleware/auth";
import { exec } from "child_process";
import { promisify } from "util";
import net from "net";

const execAsync = promisify(exec);

// Функция проверки через системный ping
const systemPing = async (
  host: string
): Promise<{ alive: boolean; time: number; error?: string }> => {
  try {
    const isWindows = process.platform === "win32";
    const command = isWindows
      ? `ping -n 1 -w 3000 ${host}`
      : `ping -c 1 -W 3 ${host}`;

    const { stdout, stderr } = await execAsync(command);

    if (stderr) {
      return { alive: false, time: 0, error: stderr };
    }

    // Парсим время отклика
    const timeMatch = isWindows
      ? stdout.match(/время[=<]\s*(\d+)мс/i) ||
        stdout.match(/time[=<]\s*(\d+)ms/i)
      : stdout.match(/time=(\d+\.?\d*)/);

    const time = timeMatch && timeMatch[1] ? parseInt(timeMatch[1]) : 0;
    const isAlive =
      !stdout.includes("недостижим") &&
      !stdout.includes("unreachable") &&
      !stdout.includes("Превышен интервал") &&
      !stdout.includes("timeout");

    return { alive: isAlive, time };
  } catch (error) {
    return {
      alive: false,
      time: 0,
      error: error instanceof Error ? error.message : String(error),
    };
  }
};

export interface RealtimeMetrics {
  timestamp: string;
  deviceMetrics: Array<{
    deviceId: string;
    deviceName: string;
    ip: string;
    status: "online" | "offline";
    responseTime: number;
    packetLoss: string;
  }>;
  systemHealth: {
    cpu: number;
    memory: number;
    disk: number;
    network: number;
    temperature: number;
    uptime: number;
    processes: number;
  };
  networkMetrics: {
    totalDevices: number;
    onlineDevices: number;
    offlineDevices: number;
    averageResponseTime: number;
  };
}

export class SocketServer {
  private io: SocketIOServer;
  private monitoringInterval: NodeJS.Timeout | null = null;
  private devices: any[] = []; // Будем получать из главного массива устройств

  constructor(httpServer: Server) {
    this.io = new SocketIOServer(httpServer, {
      cors: {
        origin: [
          "http://localhost:3000",
          "http://localhost:3001",
          "http://127.0.0.1:3000",
          "http://127.0.0.1:3001",
        ],
        methods: ["GET", "POST"],
        credentials: true,
      },
    });

    // Добавляем middleware для аутентификации
    // this.io.use(authMiddleware);

    // Загружаем устройства из базы при старте
    this.loadDevicesFromDB();

    this.setupSocketHandlers();
  }

  private async loadDevicesFromDB() {
    try {
      const prisma = dbManager.getClient();
      this.devices = await prisma.device.findMany();
      log.websocket(`Loaded ${this.devices.length} devices from database`);
    } catch (error) {
      log.error("Error loading devices from database", error);
      this.devices = [];
    }
  }

  private setupSocketHandlers() {
    this.io.on("connection", (socket) => {
      log.websocket(
        `Client connected: ${socket.id} (total clients: ${this.io.engine.clientsCount})`
      );

      // Отправляем текущие метрики сразу при подключении
      this.sendCurrentMetrics(socket);

      // Автоматически запускаем мониторинг при первом подключении
      if (this.io.engine.clientsCount === 1) {
        log.monitoring("First client connected, starting automatic monitoring");
        this.startMonitoring();
      }

      // Ручное управление мониторингом (требует аутентификации)
      socket.on(
        "start_monitoring",
        // requireAuth(socket, "start_monitoring", () => {
        () => {
          log.monitoring("Client requested monitoring start");
          this.startMonitoring();
        }
        // )
      );

      socket.on(
        "stop_monitoring",
        // requireAuth(socket, "stop_monitoring", () => {
        () => {
          log.monitoring("Client requested monitoring stop");
          this.stopMonitoring();
        }
        // )
      );

      // Ручной ping устройства (требует аутентификации)
      socket.on(
        "ping_device",
        // requireAuth(socket, "ping_device", async (deviceId: string) => {
        async (deviceId: string) => {
          log.monitoring(`WebSocket ping request for device: ${deviceId}`);
          await this.pingSingleDevice(deviceId, socket);
        }
        // )
      );

      // Добавление устройства для мониторинга (требует аутентификации)
      socket.on(
        "add_device",
        // requireAuth(socket, "add_device", (device: any) => {
        (device: any) => {
          log.monitoring(`Adding device for monitoring: ${device.name}`);
          if (!this.devices.find((d) => d.id === device.id)) {
            this.devices.push(device);
            this.io.emit("devices_updated", this.devices);
          }
        }
        // )
      );

      // Удаление устройства из мониторинга (требует аутентификации)
      socket.on(
        "remove_device",
        // requireAuth(socket, "remove_device", (deviceId: string) => {
        (deviceId: string) => {
          log.monitoring(`Removing device from monitoring: ${deviceId}`);
          this.devices = this.devices.filter((d) => d.id !== deviceId);
          this.io.emit("devices_updated", this.devices);
        }
        // )
      );

      socket.on("disconnect", () => {
        log.websocket(
          `Client disconnected: ${socket.id} (remaining clients: ${
            this.io.engine.clientsCount - 1
          })`
        );

        // Если больше нет подключений, останавливаем мониторинг
        if (this.io.engine.clientsCount === 1) {
          // 1 потому что disconnect еще не завершен
          log.monitoring("Last client disconnected, stopping monitoring");
          this.stopMonitoring();
        }
      });
    });
  }

  // Обновляем список устройств из основного приложения
  public updateDevices(devices: any[]) {
    this.devices = devices;
  }

  private async sendCurrentMetrics(socket?: any) {
    try {
      const metrics = await this.collectMetrics();

      // Сохраняем системные метрики в БД
      try {
        const prisma = dbManager.getClient();
        await prisma.systemMetrics.create({
          data: {
            cpuUsage: metrics.systemHealth.cpu,
            memoryUsage: metrics.systemHealth.memory,
            memoryUsed: 0, // TODO: Получать реальные значения из systeminformation
            memoryTotal: 0, // TODO: Получать реальные значения из systeminformation
            uptime: metrics.systemHealth.uptime,
            temperature: metrics.systemHealth.temperature,
            processes: metrics.systemHealth.processes,
            timestamp: new Date(),
          },
        });
      } catch (dbError) {
        log.error("Error saving system metrics", dbError);
      }

      const target = socket || this.io;
      target.emit("metrics_update", metrics);

      log.monitoring(
        `Metrics saved and sent to ${
          socket
            ? "single client"
            : `all clients (${this.io.engine.clientsCount})`
        }: ${metrics.deviceMetrics.length} devices`
      );
    } catch (error) {
      log.error("Error collecting metrics", error);
    }
  }

  private async collectMetrics(): Promise<RealtimeMetrics> {
    // Собираем метрики устройств
    const deviceMetrics = await Promise.all(
      this.devices.map(async (device) => {
        try {
          // Пробуем сначала системный ping, затем Node.js ping
          let result = await systemPing(device.ip);

          if (!result.alive) {
            // Если системный ping не сработал, пробуем Node.js ping
            try {
              const nodePingResult = await ping.promise.probe(device.ip, {
                timeout: 3,
                extra: ["-c", "1"],
              });
              if (nodePingResult.alive) {
                result = {
                  alive: true,
                  time: Math.round(Number(nodePingResult.time) || 0),
                };
              }
            } catch (nodePingError) {
              log.debug(`Node.js ping also failed for ${device.name}`);
            }
          }

          const status = result.alive
            ? ("online" as const)
            : ("offline" as const);
          const responseTime = result.time || 0;

          // Обновляем статус устройства в БД
          try {
            const prisma = dbManager.getClient();
            await prisma.device.update({
              where: { id: device.id },
              data: {
                status,
                responseTime,
                lastSeen: new Date(),
              },
            });

            // Сохраняем историю пинга
            await prisma.pingHistory.create({
              data: {
                deviceId: device.id,
                isAlive: result.alive,
                responseTime: result.time,
                packetLoss: result.alive ? "0%" : "100%",
                timestamp: new Date(),
              },
            });
          } catch (dbError) {
            log.error(
              `Error updating device ${device.name} in database`,
              dbError
            );
          }

          log.debug(
            `${device.name} (${device.ip}): ${status} - ${responseTime}ms`
          );

          return {
            deviceId: device.id,
            deviceName: device.name,
            ip: device.ip,
            status,
            responseTime,
            packetLoss: result.alive ? "0%" : "100%",
          };
        } catch (error) {
          // Обновляем статус как offline в БД при ошибке ping
          try {
            const prisma = dbManager.getClient();
            await prisma.device.update({
              where: { id: device.id },
              data: {
                status: "offline",
                responseTime: 0,
                lastSeen: new Date(),
              },
            });

            // Сохраняем историю пинга об ошибке
            await prisma.pingHistory.create({
              data: {
                deviceId: device.id,
                isAlive: false,
                responseTime: 0,
                packetLoss: "100%",
                errorMessage:
                  error instanceof Error ? error.message : String(error),
                timestamp: new Date(),
              },
            });
          } catch (dbError) {
            log.error(
              `Error updating device ${device.name} in database`,
              dbError
            );
          }

          log.error(`${device.name} (${device.ip}): PING CHECK ERROR`);

          return {
            deviceId: device.id,
            deviceName: device.name,
            ip: device.ip,
            status: "offline" as const,
            responseTime: 0,
            packetLoss: "100%",
          };
        }
      })
    );

    // Собираем системные метрики (симуляция)
    const systemHealth = {
      cpu: Math.random() * 100,
      memory: Math.random() * 100,
      disk: Math.random() * 100,
      network: Math.random() * 100,
      temperature: 35 + Math.random() * 30,
      uptime: Math.floor(Date.now() / 1000),
      processes: Math.floor(100 + Math.random() * 200),
    };

    // Рассчитываем сетевые метрики
    const onlineDevices = deviceMetrics.filter(
      (d) => d.status === "online"
    ).length;
    const averageResponseTime =
      deviceMetrics
        .filter((d) => d.status === "online" && d.responseTime > 0)
        .reduce((sum, d) => sum + d.responseTime, 0) / onlineDevices || 0;

    const networkMetrics = {
      totalDevices: this.devices.length,
      onlineDevices,
      offlineDevices: this.devices.length - onlineDevices,
      averageResponseTime: Math.round(averageResponseTime),
    };

    return {
      timestamp: new Date().toISOString(),
      deviceMetrics,
      systemHealth,
      networkMetrics,
    };
  }

  private async pingSingleDevice(deviceId: string, socket: any) {
    const device = this.devices.find((d) => d.id === deviceId);
    if (!device) {
      socket.emit("ping_result", {
        error: "Устройство не найдено",
        deviceId,
      });
      return;
    }

    try {
      const result = await ping.promise.probe(device.ip, {
        timeout: 5,
        extra: ["-c", "3"],
      });

      const pingResult = {
        deviceId,
        deviceName: device.name,
        ip: device.ip,
        alive: result.alive,
        responseTime: Math.round(Number(result.time) || 0),
        packetLoss: result.alive ? "0%" : "100%",
        timestamp: new Date().toISOString(),
      };

      socket.emit("ping_result", pingResult);
      log.monitoring(
        `Ping result: ${device.name} - ${
          result.alive ? "online" : "offline"
        } (${result.time}ms)`
      );
    } catch (error) {
      socket.emit("ping_result", {
        error: "Ошибка выполнения ping",
        deviceId,
        deviceName: device.name,
      });
    }
  }

  public startMonitoring() {
    if (this.monitoringInterval) {
      log.warn("Monitoring already started");
      return;
    }

    log.monitoring("Starting real-time monitoring (interval: 30 sec)");
    this.monitoringInterval = setInterval(async () => {
      // Обновляем список устройств из БД перед каждым циклом мониторинга
      await this.loadDevicesFromDB();
      await this.sendCurrentMetrics();
    }, 30000); // Каждые 30 секунд

    // Отправляем метрики сразу
    this.sendCurrentMetrics();
  }

  public stopMonitoring() {
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
      this.monitoringInterval = null;
      log.monitoring("Monitoring stopped");
    }
  }

  public getIO() {
    return this.io;
  }
}
