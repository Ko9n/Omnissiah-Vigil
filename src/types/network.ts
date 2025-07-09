export interface NetworkDevice {
  id: string;
  name: string;
  ip: string;
  mac?: string;
  type: 'router' | 'switch' | 'server' | 'workstation' | 'printer' | 'mobile' | 'firewall' | 'access_point';
  status: 'online' | 'offline' | 'warning';
  lastSeen: Date;
  responseTime: number;
  uptime: number;
  location?: string;
  folderId: string;
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
  monitoring: {
    ping: boolean;
    snmp: boolean;
    http: boolean;
    ssh: boolean;
  };
  position?: {
    x: number;
    y: number;
  };
}

export interface DeviceFolder {
  id: string;
  name: string;
  parentId?: string;
  color: string;
  icon: string;
  description?: string;
  expanded: boolean;
  children: DeviceFolder[];
}

export interface NetworkMetrics {
  totalDevices: number;
  onlineDevices: number;
  offlineDevices: number;
  warningDevices: number;
  averageResponseTime: number;
  totalBandwidth: number;
  usedBandwidth: number;
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
  type: 'critical' | 'warning' | 'info';
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
  temperature: number;
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
  connectionType: 'ethernet' | 'wifi' | 'fiber' | 'serial';
  bandwidth: number;
  status: 'active' | 'inactive' | 'error';
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