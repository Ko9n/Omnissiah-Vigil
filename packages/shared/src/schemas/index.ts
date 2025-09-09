import { z } from "zod";

// Device status enum
export const DeviceStatus = z.enum(["online", "offline", "warning"]);

// Device type enum
export const DeviceType = z.enum([
  "router",
  "switch",
  "server",
  "workstation",
  "printer",
  "mobile",
  "firewall",
  "access_point",
]);

// Alert type enum
export const AlertType = z.enum(["critical", "warning", "info"]);

// Connection type enum
export const ConnectionType = z.enum(["ethernet", "wifi", "fiber", "serial"]);

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
  id: z.string().optional(),
  name: z.string().min(1, "Имя устройства обязательно"),
  ip: z.string().ip("Неверный формат IP-адреса"),
  mac: z.string().optional(),
  type: DeviceType,
  status: DeviceStatus.optional().default("offline"),
  port: z.number().min(1).max(65535).optional(),
  description: z.string().optional(),
  location: z.string().optional(),
  vendor: z.string().optional(),
  model: z.string().optional(),
  osVersion: z.string().optional(),
  snmpCommunity: z.string().optional(),
  folderId: z.string().optional(),
  parentDeviceId: z.string().optional(),
  credentials: CredentialsSchema.optional(),
  monitoring: MonitoringSchema.optional(),
  position: PositionSchema.optional(),
});

// Device folder schema
export const DeviceFolderSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Имя папки обязательно"),
  parentId: z.string().optional(),
  color: z.string().default("#3b82f6"),
  icon: z.string().default("folder"),
  description: z.string().optional(),
  expanded: z.boolean().default(true),
});

// Network scan request schema
export const NetworkScanRequestSchema = z.object({
  network: z
    .string()
    .regex(/^\d+\.\d+\.\d+\.\d+\/\d+$/, "Неверный формат CIDR"),
  timeout: z.number().min(1000).max(300000).optional().default(30000),
  scanType: z.enum(["ping", "tcp", "snmp"]).optional().default("ping"),
  ports: z.string().optional().default("22,80,443,161"),
});

// Ping device request schema
export const PingDeviceRequestSchema = z.object({
  deviceId: z.string().uuid("Неверный формат ID устройства"),
});

// Bulk create devices schema
export const BulkCreateDevicesSchema = z.object({
  devices: z
    .array(NetworkDeviceSchema)
    .min(1, "Необходимо указать хотя бы одно устройство"),
});

// System metrics schema
export const SystemMetricsSchema = z.object({
  cpu: z.number().min(0).max(100),
  memory: z.number().min(0).max(100),
  disk: z.number().min(0).max(100),
  network: z.number().min(0),
  temperature: z.number().optional(),
  processes: z.number().min(0),
  uptime: z.number().min(0),
});

// Alert schema
export const AlertSchema = z.object({
  id: z.string().optional(),
  type: AlertType,
  message: z.string().min(1, "Сообщение обязательно"),
  deviceId: z.string().optional(),
  folderId: z.string().optional(),
  resolved: z.boolean().default(false),
  acknowledgedBy: z.string().optional(),
  acknowledgedAt: z.date().optional(),
});

// Export types
export type DeviceStatusType = z.infer<typeof DeviceStatus>;
export type DeviceTypeType = z.infer<typeof DeviceType>;
export type AlertTypeType = z.infer<typeof AlertType>;
export type ConnectionTypeType = z.infer<typeof ConnectionType>;
export type NetworkDeviceInput = z.infer<typeof NetworkDeviceSchema>;
export type DeviceFolderInput = z.infer<typeof DeviceFolderSchema>;
export type NetworkScanRequestInput = z.infer<typeof NetworkScanRequestSchema>;
export type SystemMetricsInput = z.infer<typeof SystemMetricsSchema>;
export type AlertInput = z.infer<typeof AlertSchema>;
