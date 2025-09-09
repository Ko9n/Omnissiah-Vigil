import * as ping from "ping";
import { exec } from "child_process";
import { promisify } from "util";
import net from "net";

const execAsync = promisify(exec);

/**
 * Проверка доступности через TCP порт
 */
export const checkTcpConnection = (
  host: string,
  port: number = 80,
  timeout: number = 3000
): Promise<boolean> => {
  return new Promise((resolve) => {
    const socket = new net.Socket();

    socket.setTimeout(timeout);

    socket.on("connect", () => {
      socket.destroy();
      resolve(true);
    });

    socket.on("timeout", () => {
      socket.destroy();
      resolve(false);
    });

    socket.on("error", () => {
      resolve(false);
    });

    socket.connect(port, host);
  });
};

/**
 * Проверка через системный ping
 */
export const systemPing = async (
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

/**
 * Улучшенная функция проверки доступности устройства
 */
export const checkDeviceAvailability = async (device: any) => {
  const methods = [];

  // 1. Попробуем Node.js ping
  try {
    const pingResult = await ping.promise.probe(device.ip, {
      timeout: 3,
      extra: ["-c", "1"],
    });
    methods.push({
      method: "node-ping",
      alive: pingResult.alive,
      time: Math.round(Number(pingResult.time) || 0),
      success: true,
    });
  } catch (error) {
    methods.push({
      method: "node-ping",
      alive: false,
      time: 0,
      success: false,
      error: error instanceof Error ? error.message : String(error),
    });
  }

  // 2. Попробуем системный ping
  try {
    const systemResult = await systemPing(device.ip);
    methods.push({
      method: "system-ping",
      alive: systemResult.alive,
      time: systemResult.time,
      success: true,
      error: systemResult.error,
    });
  } catch (error) {
    methods.push({
      method: "system-ping",
      alive: false,
      time: 0,
      success: false,
      error: error instanceof Error ? error.message : String(error),
    });
  }

  // 3. Если есть порт, проверим TCP подключение
  if (device.port) {
    try {
      const tcpResult = await checkTcpConnection(device.ip, device.port);
      methods.push({
        method: "tcp-connect",
        alive: tcpResult,
        time: 0,
        success: true,
      });
    } catch (error) {
      methods.push({
        method: "tcp-connect",
        alive: false,
        time: 0,
        success: false,
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }

  // Определяем общий статус устройства
  const anyAlive = methods.some((m) => m.alive);
  const bestTime =
    methods
      .filter((m) => m.alive && m.time > 0)
      .sort((a, b) => a.time - b.time)[0]?.time || 0;

  return {
    device: {
      id: device.id,
      name: device.name,
      ip: device.ip,
      type: device.type,
    },
    isOnline: anyAlive,
    responseTime: bestTime,
    methods,
    timestamp: new Date().toISOString(),
  };
};
