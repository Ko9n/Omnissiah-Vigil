import { z } from 'zod';

// Device status enum
export const DeviceStatus = z.enum(['online', 'offline', 'warning']);

// Device type enum
export const DeviceType = z.enum([
  'router',
  'switch',
  'server',
  'workstation',
  'printer',
  'mobile',
  'firewall',
  'access_point',
]);

// Alert type enum
export const AlertType = z.enum(['critical', 'warning', 'info']);

// Connection type enum
export const ConnectionType = z.enum(['ethernet', 'wifi', 'fiber', 'serial']);

// Position schema
export const PositionSchema = z.object({
  x: z.number(),
  y: z.number(),
});

// Credentials schema
export const CredentialsSchema = z.object({
  username: z.string().optional(),
  password: z.string().optional(),
});

// Monitoring configuration schema
export const MonitoringSchema = z.object({
  ping: z.boolean(),
  snmp: z.boolean(),
  http: z.boolean(),
  ssh: z.boolean(),
});

// Network device schema
export const NetworkDeviceSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Имя устройства обязательно'),
  ip: z.string().ip('Неверный формат IP-адреса'),
  mac: z.string().optional(),
  type: DeviceType,
  status: DeviceStatus,
  lastSeen: z.date(),
  responseTime: z.number().min(0),
  uptime: z.number().min(0).max(100),
  location: z.string().optional(),
  folderId: z.string(),
  parentDeviceId: z.string().optional(),
  port: z.number().optional(),
  vendor: z.string().optional(),
  model: z.string().optional(),
  osVersion: z.string().optional(),
  snmpCommunity: z.string().optional(),
  credentials: CredentialsSchema.optional(),
  monitoring: MonitoringSchema,
  position: PositionSchema.optional(),
});

// Device folder schema - with proper typing for circular reference
export const DeviceFolderSchema: z.ZodType<{
  id: string;
  name: string;
  parentId?: string;
  color: string;
  icon: string;
  description?: string;
  expanded: boolean;
  children: any[];
}> = z.lazy(() =>
  z.object({
    id: z.string(),
    name: z.string().min(1, 'Имя папки обязательно'),
    parentId: z.string().optional(),
    color: z.string(),
    icon: z.string(),
    description: z.string().optional(),
    expanded: z.boolean(),
    children: z.array(DeviceFolderSchema),
  })
);

// Network metrics schema
export const NetworkMetricsSchema = z.object({
  totalDevices: z.number().min(0),
  onlineDevices: z.number().min(0),
  offlineDevices: z.number().min(0),
  warningDevices: z.number().min(0),
  averageResponseTime: z.number().min(0),
  totalBandwidth: z.number().min(0),
  usedBandwidth: z.number().min(0),
  packetLoss: z.number().min(0).max(100),
  networkUptime: z.number().min(0).max(100),
  lastUpdate: z.date(),
});

// Bandwidth data schema
export const BandwidthDataSchema = z.object({
  timestamp: z.date(),
  upload: z.number().min(0),
  download: z.number().min(0),
  total: z.number().min(0),
  deviceId: z.string().optional(),
});

// Alert message schema
export const AlertMessageSchema = z.object({
  id: z.string(),
  type: AlertType,
  message: z.string().min(1, 'Сообщение обязательно'),
  timestamp: z.date(),
  deviceId: z.string().optional(),
  folderId: z.string().optional(),
  resolved: z.boolean(),
  acknowledgedBy: z.string().optional(),
  acknowledgedAt: z.date().optional(),
});

// System health schema
export const SystemHealthSchema = z.object({
  cpu: z.number().min(0).max(100),
  memory: z.number().min(0).max(100),
  disk: z.number().min(0).max(100),
  network: z.number().min(0).max(100),
  temperature: z.number().min(0),
  processes: z.number().min(0).optional(),
  uptime: z.number().min(0).optional(),
  lastUpdate: z.date(),
});

// Network connection schema
export const NetworkConnectionSchema = z.object({
  id: z.string(),
  sourceDeviceId: z.string(),
  targetDeviceId: z.string(),
  sourcePort: z.string().optional(),
  targetPort: z.string().optional(),
  connectionType: ConnectionType,
  bandwidth: z.number().min(0),
  status: z.enum(['active', 'inactive', 'error']),
});

// Monitoring config schema
export const MonitoringConfigSchema = z.object({
  pingInterval: z.number().min(1000),
  snmpInterval: z.number().min(1000),
  httpTimeout: z.number().min(1000),
  retryAttempts: z.number().min(1).max(10),
  alertThresholds: z.object({
    responseTime: z.number().min(0),
    packetLoss: z.number().min(0).max(100),
    cpuUsage: z.number().min(0).max(100),
    memoryUsage: z.number().min(0).max(100),
    diskUsage: z.number().min(0).max(100),
  }),
});

// Complete network data schema
export const NetworkDataSchema = z.object({
  devices: z.array(NetworkDeviceSchema),
  folders: z.array(DeviceFolderSchema),
  connections: z.array(NetworkConnectionSchema),
  config: MonitoringConfigSchema,
  lastBackup: z.date(),
});

// Export TypeScript types inferred from schemas
export type NetworkDevice = z.infer<typeof NetworkDeviceSchema>;
export type DeviceFolder = z.infer<typeof DeviceFolderSchema>;
export type NetworkMetrics = z.infer<typeof NetworkMetricsSchema>;
export type BandwidthData = z.infer<typeof BandwidthDataSchema>;
export type AlertMessage = z.infer<typeof AlertMessageSchema>;
export type SystemHealth = z.infer<typeof SystemHealthSchema>;
export type NetworkConnection = z.infer<typeof NetworkConnectionSchema>;
export type MonitoringConfig = z.infer<typeof MonitoringConfigSchema>;
export type NetworkData = z.infer<typeof NetworkDataSchema>;

// Form schemas for editing
export const DeviceFormSchema = NetworkDeviceSchema.omit({
  id: true,
  lastSeen: true,
  status: true,
});

export const FolderFormSchema = z.object({
  name: z.string().min(1, 'Имя папки обязательно'),
  parentId: z.string().optional(),
  color: z.string(),
  icon: z.string(),
  description: z.string().optional(),
});

export type DeviceFormData = z.infer<typeof DeviceFormSchema>;
export type FolderFormData = z.infer<typeof FolderFormSchema>;
