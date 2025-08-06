import { Request, Response } from "express";
import * as ping from "ping";
import dbManager from "../utils/prisma";
import { log } from "../lib/logger";
import { deviceCache } from "../utils/cache";
import { exec } from "child_process";
import { promisify } from "util";
import net from "net";

const execAsync = promisify(exec);

// Функция проверки доступности через TCP порт
const checkTcpConnection = (
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

// Улучшенная функция проверки доступности
const checkDeviceAvailability = async (device: any) => {
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

  // 3. Попробуем TCP соединение на порт 80
  try {
    const tcpResult = await checkTcpConnection(device.ip, 80, 3000);
    methods.push({
      method: "tcp-80",
      alive: tcpResult,
      time: 0,
      success: true,
    });
  } catch (error) {
    methods.push({
      method: "tcp-80",
      alive: false,
      time: 0,
      success: false,
      error: error instanceof Error ? error.message : String(error),
    });
  }

  // Определяем лучший результат
  const successfulMethods = methods.filter((m) => m.success && m.alive);
  const bestMethod =
    successfulMethods.length > 0 ? successfulMethods[0] : methods[0];

  return {
    alive: bestMethod?.alive || false,
    responseTime: bestMethod?.time || 0,
    method: bestMethod?.method || "unknown",
    allMethods: methods,
  };
};

// GET /api/devices - получить все устройства
export const getAllDevices = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { page = 1, limit = 50, search, status, type, folderId } = req.query;

    // Проверяем кэш
    const cacheKey = `devices:${JSON.stringify(req.query)}`;
    const cached = deviceCache.get(cacheKey);
    if (cached) {
      log.debug("Serving devices from cache", { cacheKey });
      res.json(cached);
      return;
    }

    const prisma = dbManager.getClient();
    const skip = (Number(page) - 1) * Number(limit);

    // Строим условия фильтрации
    const where: any = {};

    if (search) {
      where.OR = [
        { name: { contains: search as string, mode: "insensitive" } },
        { ip: { contains: search as string, mode: "insensitive" } },
        { description: { contains: search as string, mode: "insensitive" } },
      ];
    }

    if (status) {
      where.status = status;
    }

    if (type) {
      where.type = type;
    }

    if (folderId) {
      where.folderId = folderId;
    }

    const [devices, total] = await Promise.all([
      prisma.device.findMany({
        where,
        skip,
        take: Number(limit),
        orderBy: { name: "asc" },
        include: {
          folder: true,
        },
      }),
      prisma.device.count({ where }),
    ]);

    const result = {
      success: true,
      data: devices,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        totalPages: Math.ceil(total / Number(limit)),
      },
    };

    // Сохраняем в кэш на 2 минуты
    deviceCache.set(cacheKey, result, 2 * 60 * 1000);

    log.api(`Retrieved ${devices.length} devices (total: ${total})`);
    res.json(result);
  } catch (error) {
    log.error("Error getting all devices", error);
    res.status(500).json({
      success: false,
      error: "Не удалось получить список устройств",
    });
  }
};

// GET /api/devices/:id - получить устройство по ID
export const getDeviceById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    // Проверяем кэш
    const cacheKey = `device:${id}`;
    const cached = deviceCache.get(cacheKey);
    if (cached) {
      log.debug("Serving device from cache", { deviceId: id });
      res.json(cached);
      return;
    }

    const prisma = dbManager.getClient();
    const device = await prisma.device.findUnique({
      where: { id },
      include: {
        folder: true,
        pingHistory: {
          take: 10,
          orderBy: { timestamp: "desc" },
        },
      },
    });

    if (!device) {
      res.status(404).json({
        success: false,
        error: "Устройство не найдено",
      });
      return;
    }

    const result = {
      success: true,
      data: device,
    };

    // Сохраняем в кэш на 5 минут
    deviceCache.set(cacheKey, result, 5 * 60 * 1000);

    log.api(`Retrieved device: ${device.name} (${device.ip})`);
    res.json(result);
  } catch (error) {
    log.error("Error getting device by ID", error);
    res.status(500).json({
      success: false,
      error: "Не удалось получить устройство",
    });
  }
};

// POST /api/devices - создать новое устройство
export const createDevice = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const prisma = dbManager.getClient();

    // Проверяем, не существует ли уже устройство с таким IP
    const existingDevice = await prisma.device.findUnique({
      where: { ip: req.body.ip },
    });

    if (existingDevice) {
      res.status(400).json({
        success: false,
        error: "Устройство с таким IP адресом уже существует",
      });
      return;
    }

    // Подготавливаем данные для создания
    const deviceData = { ...req.body };

    // Обрабатываем folderId
    if (
      deviceData.folderId === "root" ||
      deviceData.folderId === null ||
      deviceData.folderId === ""
    ) {
      deviceData.folderId = null;
    }

    // Обрабатываем monitoring объект
    if (deviceData.monitoring) {
      deviceData.monitoringPing = deviceData.monitoring.ping || true;
      deviceData.monitoringSnmp = deviceData.monitoring.snmp || false;
      deviceData.monitoringHttp = deviceData.monitoring.http || false;
      deviceData.monitoringSsh = deviceData.monitoring.ssh || false;
      delete deviceData.monitoring;
    }

    const device = await prisma.device.create({
      data: deviceData,
      include: {
        folder: true,
      },
    });

    // Очищаем кэш устройств
    deviceCache.delete("devices:*");

    // Очищаем кэш API
    const cacheManager = require("../utils/cache").default;
    cacheManager.clear();

    log.api(`Created new device: ${device.name} (${device.ip})`);
    res.status(201).json({
      success: true,
      data: device,
    });
  } catch (error) {
    log.error("Error creating device", error);
    res.status(500).json({
      success: false,
      error: "Не удалось создать устройство",
    });
  }
};

// PUT /api/devices/:id - обновить устройство
export const updateDevice = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const prisma = dbManager.getClient();

    // Проверяем существование устройства
    const existingDevice = await prisma.device.findUnique({
      where: { id },
    });

    if (!existingDevice) {
      res.status(404).json({
        success: false,
        error: "Устройство не найдено",
      });
      return;
    }

    // Если меняется IP, проверяем уникальность
    if (req.body.ip && req.body.ip !== existingDevice.ip) {
      const deviceWithSameIp = await prisma.device.findUnique({
        where: { ip: req.body.ip },
      });

      if (deviceWithSameIp) {
        res.status(400).json({
          success: false,
          error: "Устройство с таким IP адресом уже существует",
        });
        return;
      }
    }

    // Подготавливаем данные для обновления
    const updateData = { ...req.body };

    // Обрабатываем folderId
    if (
      updateData.folderId === "root" ||
      updateData.folderId === null ||
      updateData.folderId === ""
    ) {
      updateData.folderId = null;
    }

    // Обрабатываем monitoring объект
    if (updateData.monitoring) {
      updateData.monitoringPing = updateData.monitoring.ping || true;
      updateData.monitoringSnmp = updateData.monitoring.snmp || false;
      updateData.monitoringHttp = updateData.monitoring.http || false;
      updateData.monitoringSsh = updateData.monitoring.ssh || false;
      delete updateData.monitoring;
    }

    const device = await prisma.device.update({
      where: { id },
      data: updateData,
      include: {
        folder: true,
      },
    });

    // Очищаем кэш
    deviceCache.delete(`device:${id}`);
    deviceCache.delete("devices:*");

    // Очищаем кэш API
    const cacheManager = require("../utils/cache").default;
    cacheManager.clear();

    log.api(`Updated device: ${device.name} (${device.ip})`);
    res.json({
      success: true,
      data: device,
    });
  } catch (error) {
    log.error("Error updating device", error);
    res.status(500).json({
      success: false,
      error: "Не удалось обновить устройство",
    });
  }
};

// DELETE /api/devices/:id - удалить устройство
export const deleteDevice = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const prisma = dbManager.getClient();

    const device = await prisma.device.delete({
      where: { id },
    });

    // Очищаем кэш
    deviceCache.delete(`device:${id}`);
    deviceCache.delete("devices:*");

    log.api(`Deleted device: ${device.name} (${device.ip})`);
    res.json({
      success: true,
      message: "Устройство успешно удалено",
    });
  } catch (error) {
    log.error("Error deleting device", error);
    res.status(500).json({
      success: false,
      error: "Не удалось удалить устройство",
    });
  }
};

// POST /api/devices/:id/ping - выполнить ping устройства
export const pingDevice = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const prisma = dbManager.getClient();

    const device = await prisma.device.findUnique({
      where: { id },
    });

    if (!device) {
      res.status(404).json({
        success: false,
        error: "Устройство не найдено",
      });
      return;
    }

    log.monitoring(
      `Manual ping request for device: ${device.name} (${device.ip})`
    );

    const result = await checkDeviceAvailability(device);

    // Обновляем статус устройства в БД
    await prisma.device.update({
      where: { id },
      data: {
        status: result.alive ? "online" : "offline",
        responseTime: result.responseTime,
        lastSeen: new Date(),
      },
    });

    // Сохраняем историю пинга
    await prisma.pingHistory.create({
      data: {
        deviceId: id as string,
        isAlive: result.alive,
        responseTime: result.responseTime,
        packetLoss: result.alive ? "0%" : "100%", // TODO: получать из результата ping
        timestamp: new Date(),
      },
    });

    // Очищаем кэш устройства
    deviceCache.delete(`device:${id}`);

    log.monitoring(
      `Ping result for ${device.name}: ${
        result.alive ? "online" : "offline"
      } (${result.responseTime}ms) via ${result.method}`
    );

    res.json({
      success: true,
      data: {
        deviceId: id,
        deviceName: device.name,
        ip: device.ip,
        alive: result.alive,
        responseTime: result.responseTime,
        method: result.method,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    log.error("Error pinging device", error);
    res.status(500).json({
      success: false,
      error: "Не удалось выполнить ping устройства",
    });
  }
};

// POST /api/devices/scan-network - сканировать сеть с помощью nmap
export const scanNetwork = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    log.monitoring("Starting network scan request");

    // Проверяем что ответ еще не был отправлен
    if (res.headersSent) {
      log.warn("Response already sent, skipping scan");
      return;
    }

    const {
      network,
      timeout = 30000, // Увеличиваем дефолтный timeout
      scanType = "ping", // ping, tcp, snmp
      ports = "22,80,443,161",
    } = req.body;

    if (!network) {
      res.status(400).json({
        success: false,
        error:
          "Необходимо указать сеть для сканирования (например: 192.168.1.0/24)",
      });
      return;
    }

    // Проверяем формат CIDR
    if (!/^\d+\.\d+\.\d+\.\d+\/\d+$/.test(network)) {
      res.status(400).json({
        success: false,
        error:
          "Неверный формат сети. Используйте CIDR формат (например: 192.168.1.0/24)",
      });
      return;
    }

    // Вычисляем размер сети и адаптируем timeout
    const cidr = parseInt(network.split("/")[1]);
    const hostCount = Math.pow(2, 32 - cidr);
    const adaptiveTimeout = Math.max(
      timeout,
      hostCount > 256 ? 300000 : hostCount > 64 ? 120000 : 60000 // Увеличиваем timeouts
    );

    log.monitoring(
      `Network scan: ${network} (${hostCount} potential hosts, timeout: ${adaptiveTimeout}ms)`
    );

    // Предупреждение для больших сетей
    if (hostCount > 1024) {
      res.status(400).json({
        success: false,
        error: `Сеть слишком большая (${hostCount} адресов). Используйте подсеть меньше /22 (максимум 1024 адреса).`,
      });
      return;
    }

    log.monitoring(`Starting nmap scan for: ${network} (type: ${scanType})`);

    // Проверяем доступность nmap
    let nmapPath = "nmap";
    let nmapAvailable = false;

    // Сначала пробуем стандартный путь
    try {
      await execAsync("nmap --version", { timeout: 5000 });
      nmapAvailable = true;
    } catch (error) {
      log.debug("Nmap not found in PATH, trying alternative paths");
    }

    // Если не найден в PATH, пробуем альтернативные пути
    if (!nmapAvailable) {
      const nmapPaths = [
        "C:\\Program Files (x86)\\Nmap\\nmap.exe",
        "C:\\Program Files\\Nmap\\nmap.exe",
        "C:\\Program Files (x86)\\Nmap\\nmap.exe",
      ];

      for (const path of nmapPaths) {
        try {
          await execAsync(`"${path}" --version`, { timeout: 5000 });
          nmapPath = path;
          nmapAvailable = true;
          log.debug(`Nmap found at: ${path}`);
          break;
        } catch (error) {
          log.debug(`Nmap not found at: ${path}`);
        }
      }
    }

    if (!nmapAvailable) {
      log.error("Nmap not available, falling back to ping scan");
      return await fallbackPingScan(req, res);
    }

    // Проверяем, можем ли мы запустить nmap (сначала простой тест)
    try {
      const testResult = await execAsync(`"${nmapPath}" --version`, {
        timeout: 5000,
      });
      log.monitoring(
        `Nmap version check successful: ${testResult.stdout.split("\n")[0]}`
      );
    } catch (error) {
      log.error("Cannot execute nmap, falling back to ping scan", error);
      return await fallbackPingScan(req, res);
    }

    // Формируем команду nmap в зависимости от типа сканирования
    let nmapCommand: string;

    switch (scanType) {
      case "ping":
        // Ping scan - быстрое обнаружение живых хостов (оптимизировано для Windows)
        nmapCommand = `"${nmapPath}" -sn -T4 --max-retries 1 --host-timeout 10s ${network}`;
        break;
      case "tcp":
        // TCP scan - сканирование портов с определением сервисов
        nmapCommand = `"${nmapPath}" -sT -sV -T4 -p ${ports} --open ${network}`;
        break;
      case "snmp":
        // SNMP scan - для сетевых устройств (без требования root прав)
        nmapCommand = `"${nmapPath}" -sT -T4 -p 161 ${network}`;
        break;
      case "full":
        // Полное сканирование - без требования root прав
        nmapCommand = `"${nmapPath}" -sT -sV -T4 -p 22,80,443,161,8080 ${network}`;
        break;
      default:
        // По умолчанию используем ping scan для быстрого обнаружения
        nmapCommand = `"${nmapPath}" -sn -T4 ${network}`;
    }

    log.monitoring(`Executing: ${nmapCommand}`);

    // Выполняем nmap сканирование
    let stdout = "";
    let stderr = "";

    try {
      const result = await execAsync(nmapCommand, {
        timeout: adaptiveTimeout + 10000, // добавляем 10 секунд запаса
      });
      stdout = result.stdout;
      stderr = result.stderr;
      log.monitoring(`Nmap stdout length: ${stdout.length}`);
      log.monitoring(`Nmap stdout sample: ${stdout.substring(0, 500)}...`);
      if (stderr) {
        log.monitoring(`Nmap stderr: ${stderr.substring(0, 500)}...`);
      }
    } catch (error: any) {
      log.error("Nmap scan failed", error);
      if (error?.stderr) {
        stderr = error.stderr;
        log.error(`Nmap error stderr: ${stderr}`);
      }
      if (error?.stdout) {
        stdout = error.stdout;
        log.monitoring(`Nmap error stdout: ${stdout.substring(0, 500)}...`);
      }

      // Если nmap был убит по timeout, но есть частичные результаты, используем их
      if (error?.code === 3221225725 && stdout && stdout.length > 50) {
        log.warn(
          "Nmap was killed by timeout but has partial results, using them"
        );
      } else if (!stdout && !stderr) {
        log.warn("Nmap completely failed, falling back to ping scan");
        return await fallbackPingScan(req, res);
      }
    }

    if (stderr && !stderr.includes("WARNING") && !stderr.includes("RTTVAR")) {
      log.error("Nmap scan error", stderr);
    }

    // Если nmap не вернул результатов, переключаемся на ping scan
    if (!stdout || stdout.length < 50) {
      log.warn("Nmap returned insufficient output, falling back to ping scan");
      log.monitoring(`Nmap output was: "${stdout}"`);
      return await fallbackPingScan(req, res);
    }

    // Парсим результаты nmap
    log.monitoring(`Parsing nmap output, length: ${stdout.length}`);
    const discoveredHosts = parseNmapOutput(stdout, scanType);
    log.monitoring(`Parsed ${discoveredHosts.length} hosts from nmap output`);

    // Если nmap не нашел устройства, используем ping scan как backup
    if (discoveredHosts.length === 0) {
      log.warn("Nmap found no hosts, falling back to ping scan");
      return await fallbackPingScan(req, res);
    }

    // Дополнительно получаем информацию через SNMP для найденных устройств
    if (scanType === "snmp" || scanType === "full") {
      await enrichWithSnmpData(discoveredHosts);
    }

    // Проверяем существующие устройства в базе
    const prisma = dbManager.getClient();
    const existingDevices = await prisma.device.findMany({
      where: {
        ip: {
          in: discoveredHosts.map((h) => h.ip),
        },
      },
      select: { ip: true, name: true },
    });

    const existingIps = new Set(existingDevices.map((d) => d.ip));
    const newDevices = discoveredHosts.filter(
      (host) => !existingIps.has(host.ip)
    );

    log.monitoring(
      `Nmap scan completed. Found ${discoveredHosts.length} hosts, ${newDevices.length} new devices`
    );

    // Проверяем что ответ еще не был отправлен
    if (!res.headersSent) {
      res.json({
        success: true,
        data: {
          scanType,
          totalHosts: discoveredHosts.length,
          discoveredHosts,
          newDevices,
          existingDevices,
        },
      });
    } else {
      log.warn("Response already sent, skipping final response");
    }
  } catch (error) {
    log.error("Error scanning network with nmap", error);
    if (!res.headersSent) {
      res.status(500).json({
        success: false,
        error: "Не удалось выполнить сканирование сети",
      });
    } else {
      log.warn("Response already sent, cannot send error response");
    }
  }
};

// Функция парсинга вывода nmap
const parseNmapOutput = (
  output: string,
  scanType: string
): Array<{
  ip: string;
  hostname?: string;
  mac?: string;
  vendor?: string;
  status: "up" | "down";
  ports?: string[];
  os?: string;
  services?: string[];
}> => {
  const hosts: Array<{
    ip: string;
    hostname?: string;
    mac?: string;
    vendor?: string;
    status: "up" | "down";
    ports?: string[];
    os?: string;
    services?: string[];
  }> = [];

  const lines = output.split("\n");
  let currentHost: any = null;

  log.monitoring(
    `Parsing ${lines.length} lines from nmap output (scanType: ${scanType})`
  );

  for (const line of lines) {
    const trimmedLine = line.trim();

    // Nmap scan report для IP или hostname
    const hostMatch = trimmedLine.match(/Nmap scan report for (.+)/);
    if (hostMatch) {
      if (currentHost && currentHost.ip) {
        hosts.push(currentHost);
      }

      const target = hostMatch[1];
      // Проверяем, является ли target IP адресом или hostname
      const ipMatch = target.match(/([\d.]+)/);
      const hostnameMatch = target.match(/(.+) \(([\d.]+)\)/);

      currentHost = {
        status: "up" as const,
        ports: [],
        services: [],
      };

      if (hostnameMatch) {
        // Формат: "hostname (IP)"
        currentHost.hostname = hostnameMatch[1];
        currentHost.ip = hostnameMatch[2];
      } else if (ipMatch) {
        // Только IP адрес
        currentHost.ip = target;
      }
      continue;
    }

    if (!currentHost) continue;

    // MAC Address и Vendor
    const macMatch = trimmedLine.match(
      /MAC Address: ([A-Fa-f0-9:]{17})\s*(\(.+\))?/
    );
    if (macMatch) {
      currentHost.mac = macMatch[1].toUpperCase();
      if (macMatch[2]) {
        currentHost.vendor = macMatch[2].replace(/[()]/g, "").trim();
      }
      continue;
    }

    // Ports и Services
    const portMatch = trimmedLine.match(/^(\d+)\/(\w+)\s+(\w+)\s+(.+)/);
    if (portMatch) {
      const port = portMatch[1];
      const protocol = portMatch[2];
      const state = portMatch[3];
      const service = portMatch[4].trim();

      // Добавляем только открытые порты или если scanType требует все порты
      if (state === "open" || scanType === "full") {
        currentHost.ports?.push(`${port}/${protocol}`);
        currentHost.services?.push(service);
      }
      continue;
    }

    // OS Detection
    const osMatch = trimmedLine.match(/OS details: (.+)/);
    if (osMatch) {
      currentHost.os = osMatch[1].trim();
      continue;
    }

    // Device type detection
    const deviceMatch = trimmedLine.match(/Device type: (.+)/);
    if (deviceMatch && !currentHost.os) {
      currentHost.os = deviceMatch[1].trim();
      continue;
    }

    // Running detection
    const runningMatch = trimmedLine.match(/Running: (.+)/);
    if (runningMatch && !currentHost.os) {
      currentHost.os = runningMatch[1].trim();
      continue;
    }

    // SNMP info для сетевых устройств
    const snmpSysDescrMatch = trimmedLine.match(/sysDescr: (.+)/);
    if (snmpSysDescrMatch) {
      currentHost.os = snmpSysDescrMatch[1].trim();
      continue;
    }
  }

  // Добавляем последний хост
  if (currentHost && currentHost.ip) {
    hosts.push(currentHost);
  }

  // Фильтруем результаты в зависимости от типа сканирования
  let filteredHosts = hosts;

  if (scanType === "ping") {
    // Для ping scan показываем все найденные хосты
    filteredHosts = hosts.filter((host) => host.ip);
  } else if (scanType === "tcp") {
    // Для TCP scan показываем только хосты с открытыми портами
    filteredHosts = hosts.filter((host) => host.ports && host.ports.length > 0);
  }

  log.monitoring(`Parsed ${filteredHosts.length} valid hosts from nmap output`);

  return filteredHosts;
};

// Функция обогащения данных через SNMP
const enrichWithSnmpData = async (hosts: Array<any>): Promise<void> => {
  // TODO: Реализовать SNMP запросы для получения дополнительной информации
  // Например: sysName, sysDescr, sysLocation, sysContact

  for (const host of hosts) {
    try {
      // Базовый SNMP запрос для получения system description
      const snmpCommand = `snmpget -v2c -c public ${host.ip} 1.3.6.1.2.1.1.1.0`;
      const { stdout } = await execAsync(snmpCommand, { timeout: 3000 });

      if (stdout && stdout.includes("STRING:")) {
        const descMatch = stdout.match(/STRING:\s*"?([^"]+)"?/);
        if (descMatch) {
          host.snmpSysDescr = descMatch[1]?.trim();
        }
      }
    } catch (error) {
      // SNMP недоступен для этого хоста
      continue;
    }
  }
};

// Fallback функция для ping сканирования (если nmap недоступен)
const fallbackPingScan = async (req: Request, res: Response): Promise<void> => {
  const { network } = req.body;

  log.monitoring(`Fallback to ping scan for: ${network}`);

  try {
    // Извлекаем базовый IP из CIDR
    const baseIp = network.split("/")[0];
    const parts = baseIp.split(".");
    const baseNetwork = `${parts[0]}.${parts[1]}.${parts[2]}`;

    const discoveredHosts: Array<{
      ip: string;
      status: "up";
      responseTime: number;
    }> = [];

    // Сканируем диапазон IP (например, 192.168.1.1-254)
    // Ограничиваем количество одновременных запросов для стабильности
    const batchSize = 20; // Увеличиваем размер батча для скорости
    log.monitoring(
      `Starting ping scan for ${baseNetwork}.1-254 in batches of ${batchSize}`
    );

    for (let i = 1; i <= 254; i += batchSize) {
      const batch = [];
      for (let j = 0; j < batchSize && i + j <= 254; j++) {
        const ip = `${baseNetwork}.${i + j}`;
        batch.push(
          systemPing(ip)
            .then((result) => {
              if (result.alive) {
                return {
                  ip,
                  status: "up" as const,
                  responseTime: result.time,
                };
              }
              return null;
            })
            .catch(() => null)
        );
      }

      // Ждем завершения батча перед следующим
      const batchResults = await Promise.allSettled(batch);
      const batchFound = batchResults.filter(
        (result) => result.status === "fulfilled" && result.value
      ).length;

      batchResults.forEach((result) => {
        if (result.status === "fulfilled" && result.value) {
          discoveredHosts.push(result.value);
        }
      });

      log.monitoring(
        `Batch ${Math.ceil(i / batchSize)}: found ${batchFound} hosts (total: ${
          discoveredHosts.length
        })`
      );
    }

    // Проверяем существующие устройства в базе
    const prisma = dbManager.getClient();
    const existingDevices = await prisma.device.findMany({
      where: {
        ip: {
          in: discoveredHosts.map((h) => h.ip),
        },
      },
      select: { ip: true, name: true },
    });

    const existingIps = new Set(existingDevices.map((d) => d.ip));
    const newDevices = discoveredHosts.filter(
      (host) => !existingIps.has(host.ip)
    );

    log.monitoring(
      `Ping scan completed. Found ${discoveredHosts.length} hosts, ${newDevices.length} new devices`
    );

    res.json({
      success: true,
      data: {
        scanType: "ping",
        totalHosts: discoveredHosts.length,
        discoveredHosts,
        newDevices,
        existingDevices,
      },
    });
  } catch (error) {
    log.error("Error in fallback ping scan", error);
    res.status(500).json({
      success: false,
      error: "Не удалось выполнить ping сканирование",
    });
  }
};

// POST /api/devices/bulk-create - массовое создание устройств
export const bulkCreateDevices = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { devices, folderId = null } = req.body;

    if (!Array.isArray(devices) || devices.length === 0) {
      res.status(400).json({
        success: false,
        error: "Необходимо передать массив устройств",
      });
      return;
    }

    const prisma = dbManager.getClient();
    const createdDevices = [];
    const errors = [];

    for (const deviceData of devices) {
      try {
        // Проверяем, не существует ли уже устройство с таким IP
        const existingDevice = await prisma.device.findUnique({
          where: { ip: deviceData.ip },
        });

        if (existingDevice) {
          errors.push({
            ip: deviceData.ip,
            error: "Устройство с таким IP уже существует",
          });
          continue;
        }

        // Создаем устройство
        const device = await prisma.device.create({
          data: {
            name: deviceData.name || `Device ${deviceData.ip}`,
            ip: deviceData.ip,
            mac: deviceData.mac || "",
            type: deviceData.type || "workstation",
            location: deviceData.location || "",
            folderId: deviceData.folderId || folderId,
            vendor: deviceData.vendor || "",
            model: deviceData.model || "",
            osVersion: deviceData.osVersion || "",
            monitoringPing: true,
            monitoringSnmp: false,
            monitoringHttp: false,
            monitoringSsh: false,
          },
          include: {
            folder: true,
          },
        });

        createdDevices.push(device);
      } catch (error) {
        errors.push({
          ip: deviceData.ip,
          error: error instanceof Error ? error.message : "Неизвестная ошибка",
        });
      }
    }

    // Очищаем кэш устройств
    deviceCache.delete("devices:*");

    log.api(
      `Bulk created ${createdDevices.length} devices, ${errors.length} errors`
    );

    res.status(201).json({
      success: true,
      data: {
        created: createdDevices,
        errors,
        summary: {
          total: devices.length,
          created: createdDevices.length,
          errors: errors.length,
        },
      },
    });
  } catch (error) {
    log.error("Error bulk creating devices", error);
    res.status(500).json({
      success: false,
      error: "Не удалось создать устройства",
    });
  }
};
