import { Server as SocketIOServer } from "socket.io";
import { Server } from "http";
import * as ping from "ping";
import prisma from "../utils/prisma";
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

    // Загружаем устройства из базы при старте
    this.loadDevicesFromDB();

    this.setupSocketHandlers();
  }

  private async loadDevicesFromDB() {
    try {
      this.devices = await prisma.device.findMany();
      console.log(
        `🔄 WebSocket: загружено устройств из БД: ${this.devices.length}`
      );
    } catch (error) {
      console.error("❌ WebSocket: ошибка загрузки устройств из БД:", error);
      this.devices = [];
    }
  }

  private setupSocketHandlers() {
    this.io.on("connection", (socket) => {
      console.log(
        `📡 WebSocket подключен: ${socket.id} (всего клиентов: ${this.io.engine.clientsCount})`
      );

      // Отправляем текущие метрики сразу при подключении
      this.sendCurrentMetrics(socket);

      // Автоматически запускаем мониторинг при первом подключении
      if (this.io.engine.clientsCount === 1) {
        console.log(
          "🚀 Первый клиент подключен, запускаем автоматический мониторинг"
        );
        this.startMonitoring();
      }

      // Ручное управление мониторингом
      socket.on("start_monitoring", () => {
        console.log("🔄 Клиент запросил начало мониторинга");
        this.startMonitoring();
      });

      socket.on("stop_monitoring", () => {
        console.log("⏹️ Клиент запросил остановку мониторинга");
        this.stopMonitoring();
      });

      // Ручной ping устройства
      socket.on("ping_device", async (deviceId: string) => {
        console.log(`🏓 WebSocket ping запрос для устройства: ${deviceId}`);
        await this.pingSingleDevice(deviceId, socket);
      });

      // Добавление устройства для мониторинга
      socket.on("add_device", (device: any) => {
        console.log(`➕ Добавление устройства для мониторинга: ${device.name}`);
        if (!this.devices.find((d) => d.id === device.id)) {
          this.devices.push(device);
          this.io.emit("devices_updated", this.devices);
        }
      });

      // Удаление устройства из мониторинга
      socket.on("remove_device", (deviceId: string) => {
        console.log(`➖ Удаление устройства из мониторинга: ${deviceId}`);
        this.devices = this.devices.filter((d) => d.id !== deviceId);
        this.io.emit("devices_updated", this.devices);
      });

      socket.on("disconnect", () => {
        console.log(
          `📡 WebSocket отключен: ${socket.id} (осталось клиентов: ${this.io.engine.clientsCount - 1})`
        );

        // Если больше нет подключений, останавливаем мониторинг
        if (this.io.engine.clientsCount === 1) {
          // 1 потому что disconnect еще не завершен
          console.log("⏸️ Последний клиент отключен, останавливаем мониторинг");
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
      const target = socket || this.io;
      target.emit("metrics_update", metrics);
    } catch (error) {
      console.error("❌ Ошибка сбора метрик:", error);
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
                  time: Math.round(nodePingResult.time || 0),
                };
              }
            } catch (nodePingError) {
              console.log(
                `⚠️ Node.js ping также не сработал для ${device.name}`
              );
            }
          }

          const status = result.alive
            ? ("online" as const)
            : ("offline" as const);
          const responseTime = result.time || 0;

          // Обновляем статус устройства в БД
          try {
            await prisma.device.update({
              where: { id: device.id },
              data: {
                status,
                responseTime,
              },
            });
          } catch (dbError) {
            console.error(
              `❌ Ошибка обновления устройства ${device.name} в БД:`,
              dbError
            );
          }

          console.log(
            `🔍 ${device.name} (${device.ip}): ${status} - ${responseTime}ms`
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
            await prisma.device.update({
              where: { id: device.id },
              data: {
                status: "offline",
                responseTime: 0,
              },
            });
          } catch (dbError) {
            console.error(
              `❌ Ошибка обновления устройства ${device.name} в БД:`,
              dbError
            );
          }

          console.log(`❌ ${device.name} (${device.ip}): ОШИБКА ПРОВЕРКИ`);

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
        responseTime: Math.round(result.time || 0),
        packetLoss: result.packetLoss || "0%",
        timestamp: new Date().toISOString(),
      };

      socket.emit("ping_result", pingResult);
      console.log(
        `🏓 Ping результат: ${device.name} - ${result.alive ? "онлайн" : "офлайн"} (${result.time}ms)`
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
      console.log("⚠️ Мониторинг уже запущен");
      return;
    }

    console.log("🚀 Запуск мониторинга в реальном времени (интервал: 30 сек)");
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
      console.log("⏹️ Мониторинг остановлен");
    }
  }

  public getIO() {
    return this.io;
  }
}
