-- CreateTable
CREATE TABLE "devices" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "ip" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "location" TEXT,
    "description" TEXT,
    "status" TEXT NOT NULL DEFAULT 'unknown',
    "responseTime" INTEGER DEFAULT 0,
    "uptime" DOUBLE PRECISION DEFAULT 0,
    "folderId" TEXT,
    "mac" TEXT,
    "vendor" TEXT,
    "model" TEXT,
    "osVersion" TEXT,
    "monitoringPing" BOOLEAN DEFAULT true,
    "monitoringSnmp" BOOLEAN DEFAULT false,
    "monitoringHttp" BOOLEAN DEFAULT false,
    "monitoringSsh" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lastSeen" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "devices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "device_folders" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT,
    "parentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "device_folders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ping_history" (
    "id" TEXT NOT NULL,
    "deviceId" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isAlive" BOOLEAN NOT NULL,
    "responseTime" INTEGER,
    "packetLoss" TEXT,
    "errorMessage" TEXT,

    CONSTRAINT "ping_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "system_metrics" (
    "id" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cpuUsage" DOUBLE PRECISION NOT NULL,
    "cpuCores" INTEGER,
    "cpuModel" TEXT,
    "memoryUsage" DOUBLE PRECISION NOT NULL,
    "memoryUsed" DOUBLE PRECISION NOT NULL,
    "memoryTotal" DOUBLE PRECISION NOT NULL,
    "networkInterfaces" INTEGER,
    "totalRx" DOUBLE PRECISION,
    "totalTx" DOUBLE PRECISION,
    "uptime" INTEGER,
    "temperature" DOUBLE PRECISION,
    "processes" INTEGER,

    CONSTRAINT "system_metrics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'viewer',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "firstName" TEXT,
    "lastName" TEXT,
    "avatar" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lastLogin" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_sessions" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "userAgent" TEXT,
    "ipAddress" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_settings" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "theme" TEXT NOT NULL DEFAULT 'dark',
    "language" TEXT NOT NULL DEFAULT 'ru',
    "timezone" TEXT NOT NULL DEFAULT 'Europe/Moscow',
    "emailNotifications" BOOLEAN NOT NULL DEFAULT true,
    "pushNotifications" BOOLEAN NOT NULL DEFAULT true,
    "alertThreshold" INTEGER NOT NULL DEFAULT 5000,
    "refreshInterval" INTEGER NOT NULL DEFAULT 30000,
    "defaultView" TEXT NOT NULL DEFAULT 'grid',
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "app_settings" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'string',
    "description" TEXT,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedBy" TEXT,

    CONSTRAINT "app_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "alerts" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "severity" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "deviceId" TEXT,
    "isResolved" BOOLEAN NOT NULL DEFAULT false,
    "resolvedAt" TIMESTAMP(3),
    "resolvedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "alerts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "devices_ip_key" ON "devices"("ip");

-- CreateIndex
CREATE INDEX "ping_history_deviceId_timestamp_idx" ON "ping_history"("deviceId", "timestamp" DESC);

-- CreateIndex
CREATE INDEX "ping_history_timestamp_idx" ON "ping_history"("timestamp" DESC);

-- CreateIndex
CREATE INDEX "ping_history_deviceId_isAlive_idx" ON "ping_history"("deviceId", "isAlive");

-- CreateIndex
CREATE INDEX "system_metrics_timestamp_idx" ON "system_metrics"("timestamp" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "user_sessions_token_key" ON "user_sessions"("token");

-- CreateIndex
CREATE INDEX "user_sessions_userId_idx" ON "user_sessions"("userId");

-- CreateIndex
CREATE INDEX "user_sessions_token_idx" ON "user_sessions"("token");

-- CreateIndex
CREATE INDEX "user_sessions_expiresAt_idx" ON "user_sessions"("expiresAt");

-- CreateIndex
CREATE UNIQUE INDEX "user_settings_userId_key" ON "user_settings"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "app_settings_key_key" ON "app_settings"("key");

-- CreateIndex
CREATE INDEX "alerts_createdAt_idx" ON "alerts"("createdAt" DESC);

-- CreateIndex
CREATE INDEX "alerts_deviceId_idx" ON "alerts"("deviceId");

-- CreateIndex
CREATE INDEX "alerts_isResolved_severity_idx" ON "alerts"("isResolved", "severity");

-- AddForeignKey
ALTER TABLE "devices" ADD CONSTRAINT "devices_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "device_folders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "device_folders" ADD CONSTRAINT "device_folders_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "device_folders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ping_history" ADD CONSTRAINT "ping_history_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "devices"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_sessions" ADD CONSTRAINT "user_sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_settings" ADD CONSTRAINT "user_settings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alerts" ADD CONSTRAINT "alerts_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "devices"("id") ON DELETE SET NULL ON UPDATE CASCADE;
