export interface NetworkDevice {
  id: string;
  name: string;
  ip: string;
  mac?: string;
  type:
    | "router"
    | "switch"
    | "server"
    | "workstation"
    | "printer"
    | "mobile"
    | "firewall"
    | "access_point";
  status: "online" | "offline" | "warning";
  lastSeen: Date;
  responseTime: number;
  uptime?: number;
  location?: string;
  folderId?: string;
  parentDeviceId?: string; // For topology connections
  port?: number; // Port on parent device
  vendor?: string;
  model?: string;
  osVersion?: string;
  snmpCommunity?: string;
  credentials?: {
    username?: string;
    password?: string;
  };
  monitoring?: {
    ping: boolean;
    snmp: boolean;
    http: boolean;
    ssh: boolean;
  };
  position?: {
    x: number;
    y: number;
  };
  description?: string;
  // Prisma fields
  createdAt?: Date;
  updatedAt?: Date;
  // Monitoring flags
  monitoringPing?: boolean;
  monitoringSnmp?: boolean;
  monitoringHttp?: boolean;
  monitoringSsh?: boolean;
}

export interface DeviceFolder {
  id: string;
  name: string;
  parentId?: string;
  color: string;
  icon: string;
  description?: string;
  expanded?: boolean;
  children?: DeviceFolder[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface NetworkMetrics {
  totalDevices: number;
  onlineDevices: number;
  offlineDevices: number;
  warningDevices: number;
  averageResponseTime: number;
  totalBandwidth?: number;
  usedBandwidth?: number;
  packetLoss: number;
  networkUptime: number;
  lastUpdate: Date;
}

export interface BandwidthData {
  timestamp: Date;
  upload: number;
  download: number;
  total: number;
  deviceId?: string;
}

export interface AlertMessage {
  id: string;
  type: "critical" | "warning" | "info";
  message: string;
  timestamp: Date;
  deviceId?: string;
  folderId?: string;
  resolved: boolean;
  acknowledgedBy?: string;
  acknowledgedAt?: Date;
}

export interface SystemHealth {
  cpu: number;
  memory: number;
  disk: number;
  network: number;
  temperature?: number;
  processes: number;
  uptime: number;
  lastUpdate: Date;
}

export interface NetworkConnection {
  id: string;
  sourceDeviceId: string;
  targetDeviceId: string;
  sourcePort?: string;
  targetPort?: string;
  connectionType: "ethernet" | "wifi" | "fiber" | "serial";
  bandwidth: number;
  status: "active" | "inactive" | "error";
}

export interface MonitoringConfig {
  pingInterval: number;
  snmpInterval: number;
  httpTimeout: number;
  retryAttempts: number;
  alertThresholds: {
    responseTime: number;
    packetLoss: number;
    cpuUsage: number;
    memoryUsage: number;
    diskUsage: number;
  };
}

export interface NetworkData {
  devices: NetworkDevice[];
  folders: DeviceFolder[];
  connections: NetworkConnection[];
  config: MonitoringConfig;
  lastBackup: Date;
}

// Ping related types
export interface PingResult {
  deviceId: string;
  deviceName: string;
  ip: string;
  isOnline: boolean;
  responseTime: number;
  methods: PingMethod[];
  timestamp: string;
}

export interface PingMethod {
  method: "node-ping" | "system-ping" | "tcp-connect";
  alive: boolean;
  time: number;
  success: boolean;
  error?: string;
}

export interface PingHistory {
  id: string;
  deviceId: string;
  isAlive: boolean;
  responseTime: number;
  packetLoss: string;
  timestamp: Date;
  createdAt?: Date;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T = any> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Scan types
export interface NetworkScanRequest {
  network: string;
  timeout?: number;
  scanType?: "ping" | "tcp" | "snmp";
  ports?: string;
}

export interface NetworkScanResult {
  ip: string;
  hostname?: string;
  mac?: string;
  vendor?: string;
  ports?: number[];
  responseTime: number;
  isAlive: boolean;
  osDetection?: string;
}
