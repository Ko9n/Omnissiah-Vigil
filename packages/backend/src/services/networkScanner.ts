import { exec } from "child_process";
import { promisify } from "util";
import { log } from "../lib/logger";
import { NetworkScanRequest, NetworkScanResult } from "@monitoring/shared";

const execAsync = promisify(exec);

export interface ScanOptions {
  network: string;
  timeout?: number;
  scanType?: "ping" | "tcp" | "snmp";
  ports?: string;
}

export interface ScanProgress {
  currentHost: string;
  hostsScanned: number;
  totalHosts: number;
  estimatedTimeRemaining: number;
}

export class NetworkScannerService {
  private isNmapAvailable = false;
  private nmapPath = "nmap";

  constructor() {
    this.checkNmapAvailability();
  }

  /**
   * Проверяет доступность nmap
   */
  private async checkNmapAvailability(): Promise<void> {
    try {
      await execAsync("nmap --version", { timeout: 5000 });
      this.isNmapAvailable = true;
      log.debug("Nmap is available in PATH");
    } catch (error) {
      log.debug("Nmap not found in PATH, trying alternative paths");
      await this.findNmapInAlternativePaths();
    }
  }

  /**
   * Ищет nmap в альтернативных путях (Windows)
   */
  private async findNmapInAlternativePaths(): Promise<void> {
    const nmapPaths = [
      "C:\\Program Files (x86)\\Nmap\\nmap.exe",
      "C:\\Program Files\\Nmap\\nmap.exe",
    ];

    for (const path of nmapPaths) {
      try {
        await execAsync(`"${path}" --version`, { timeout: 5000 });
        this.nmapPath = path;
        this.isNmapAvailable = true;
        log.debug(`Nmap found at: ${path}`);
        return;
      } catch (error) {
        continue;
      }
    }

    log.warn("Nmap not found. Network scanning will use fallback ping method.");
  }

  /**
   * Вычисляет параметры сети по CIDR
   */
  public calculateNetworkParams(network: string) {
    const [baseIP, cidrStr] = network.split("/");
    if (!baseIP || !cidrStr) {
      throw new Error("Invalid network format");
    }
    const cidr = parseInt(cidrStr);
    const hostCount = Math.pow(2, 32 - cidr);

    return {
      baseIP,
      cidr,
      hostCount,
      isLargeNetwork: hostCount > 1024,
      adaptiveTimeout: this.calculateTimeout(hostCount),
    };
  }

  /**
   * Вычисляет адаптивный timeout на основе размера сети
   */
  private calculateTimeout(hostCount: number): number {
    if (hostCount > 256) return 300000; // 5 минут
    if (hostCount > 64) return 120000; // 2 минуты
    return 60000; // 1 минута
  }

  /**
   * Выполняет сканирование сети с помощью nmap
   */
  public async scanWithNmap(
    options: ScanOptions
  ): Promise<NetworkScanResult[]> {
    if (!this.isNmapAvailable) {
      throw new Error("Nmap is not available");
    }

    const {
      network,
      scanType = "ping",
      ports = "22,80,443,161",
      timeout = 60000,
    } = options;

    let nmapCommand = `"${this.nmapPath}"`;

    // Базовые параметры
    nmapCommand += ` --privileged -n --host-timeout 3s --max-retries 1`;

    // Тип сканирования
    switch (scanType) {
      case "ping":
        nmapCommand += ` -sn`; // Ping scan only
        break;
      case "tcp":
        nmapCommand += ` -sS -p ${ports}`; // TCP SYN scan
        break;
      case "snmp":
        nmapCommand += ` -sU -p 161`; // UDP scan for SNMP
        break;
    }

    // Вывод в XML формате для парсинга
    nmapCommand += ` -oX - ${network}`;

    log.monitoring(
      `Executing nmap command: ${nmapCommand.replace(this.nmapPath, "nmap")}`
    );

    try {
      const { stdout, stderr } = await execAsync(nmapCommand, {
        timeout,
        maxBuffer: 1024 * 1024 * 10, // 10MB buffer
      });

      if (stderr && !stderr.includes("Warning")) {
        log.warn("Nmap stderr output:", stderr);
      }

      return this.parseNmapXmlOutput(stdout);
    } catch (error) {
      if (error instanceof Error && error.message.includes("timeout")) {
        throw new Error(`Сканирование превысило лимит времени (${timeout}ms)`);
      }
      throw error;
    }
  }

  /**
   * Парсит XML вывод nmap
   */
  private parseNmapXmlOutput(xmlOutput: string): NetworkScanResult[] {
    const results: NetworkScanResult[] = [];

    try {
      // Простой парсинг XML без библиотек
      const hostMatches = xmlOutput.match(/<host[^>]*>.*?<\/host>/gs) || [];

      for (const hostMatch of hostMatches) {
        const result = this.parseHostXml(hostMatch);
        if (result) {
          results.push(result);
        }
      }
    } catch (error) {
      log.error("Error parsing nmap XML output:", error);
    }

    return results;
  }

  /**
   * Парсит XML данные одного хоста
   */
  private parseHostXml(hostXml: string): NetworkScanResult | null {
    try {
      // Извлекаем IP адрес
      const ipMatch = hostXml.match(
        /<address\s+addr="([^"]+)"\s+addrtype="ipv4"/
      );
      if (!ipMatch || !ipMatch[1]) return null;

      const ip = ipMatch[1];

      // Проверяем статус хоста
      const statusMatch = hostXml.match(/<status\s+state="([^"]+)"/);
      const isAlive = statusMatch ? statusMatch[1] === "up" : false;

      // Извлекаем hostname
      const hostnameMatch = hostXml.match(/<hostname\s+name="([^"]+)"/);
      const hostname = hostnameMatch ? hostnameMatch[1] : undefined;

      // Извлекаем MAC адрес
      const macMatch = hostXml.match(
        /<address\s+addr="([^"]+)"\s+addrtype="mac"/
      );
      const mac = macMatch ? macMatch[1] : undefined;

      // Извлекаем vendor
      const vendorMatch = hostXml.match(
        /<address\s+addr="[^"]+"\s+addrtype="mac"\s+vendor="([^"]*)"/
      );
      const vendor = vendorMatch ? vendorMatch[1] : undefined;

      // Извлекаем открытые порты
      const portMatches =
        hostXml.match(
          /<port\s+protocol="tcp"\s+portid="(\d+)".*?state="open"/g
        ) || [];
      const ports = portMatches
        .map((match) => {
          const portMatch = match.match(/portid="(\d+)"/);
          return portMatch && portMatch[1] ? parseInt(portMatch[1]) : 0;
        })
        .filter((port) => port > 0);

      // Время отклика (если есть)
      const responseTime = 0; // nmap не всегда предоставляет это в XML

      return {
        ip,
        hostname,
        mac,
        vendor,
        ports,
        responseTime,
        isAlive,
      };
    } catch (error) {
      log.error("Error parsing host XML:", error);
      return null;
    }
  }

  /**
   * Fallback сканирование с помощью ping
   */
  public async fallbackPingScan(network: string): Promise<NetworkScanResult[]> {
    const [baseIP] = network.split("/");
    if (!baseIP) {
      throw new Error("Invalid network format");
    }
    const parts = baseIP.split(".").map(Number);
    if (parts.length !== 4) {
      throw new Error("Invalid IP format");
    }
    const [part1, part2, part3] = parts;

    const results: NetworkScanResult[] = [];
    const promises: Promise<void>[] = [];

    // Сканируем только последний октет (254 адреса максимум)
    for (let i = 1; i <= 254; i++) {
      const ip = `${part1}.${part2}.${part3}.${i}`;

      const promise = this.pingHost(ip)
        .then((result) => {
          if (result.isAlive) {
            results.push(result);
          }
        })
        .catch((error) => {
          log.debug(`Ping failed for ${ip}:`, error);
        });

      promises.push(promise);
    }

    // Выполняем ping с ограничением параллелизма
    const batchSize = 20;
    for (let i = 0; i < promises.length; i += batchSize) {
      const batch = promises.slice(i, i + batchSize);
      await Promise.all(batch);
    }

    return results.sort((a, b) => {
      const aOctets = a.ip.split(".").map(Number);
      const bOctets = b.ip.split(".").map(Number);

      for (let i = 0; i < 4; i++) {
        const aOctet = aOctets[i];
        const bOctet = bOctets[i];
        if (aOctet !== undefined && bOctet !== undefined && aOctet !== bOctet) {
          return aOctet - bOctet;
        }
      }
      return 0;
    });
  }

  /**
   * Ping одного хоста
   */
  private async pingHost(ip: string): Promise<NetworkScanResult> {
    const isWindows = process.platform === "win32";
    const command = isWindows
      ? `ping -n 1 -w 1000 ${ip}`
      : `ping -c 1 -W 1 ${ip}`;

    try {
      const { stdout } = await execAsync(command, { timeout: 3000 });

      // Парсим время отклика
      const timeMatch = isWindows
        ? stdout.match(/время[=<]\s*(\d+)мс/i) ||
          stdout.match(/time[=<]\s*(\d+)ms/i)
        : stdout.match(/time=(\d+\.?\d*)/);

      const responseTime =
        timeMatch && timeMatch[1] ? parseFloat(timeMatch[1]) : 0;

      const isAlive =
        !stdout.includes("недостижим") &&
        !stdout.includes("unreachable") &&
        !stdout.includes("Превышен интервал") &&
        !stdout.includes("timeout");

      return {
        ip,
        responseTime,
        isAlive,
        ports: [],
      };
    } catch (error) {
      return {
        ip,
        responseTime: 0,
        isAlive: false,
        ports: [],
      };
    }
  }
}
