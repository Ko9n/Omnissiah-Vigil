-- AddDeviceFields
-- Добавляем дополнительные поля для устройств

-- Добавляем новые колонки в таблицу devices
ALTER TABLE "devices" ADD COLUMN "mac" TEXT;
ALTER TABLE "devices" ADD COLUMN "vendor" TEXT;
ALTER TABLE "devices" ADD COLUMN "model" TEXT;
ALTER TABLE "devices" ADD COLUMN "osVersion" TEXT;

-- Добавляем поля для настроек мониторинга
ALTER TABLE "devices" ADD COLUMN "monitoringPing" BOOLEAN DEFAULT true;
ALTER TABLE "devices" ADD COLUMN "monitoringSnmp" BOOLEAN DEFAULT false;
ALTER TABLE "devices" ADD COLUMN "monitoringHttp" BOOLEAN DEFAULT false;
ALTER TABLE "devices" ADD COLUMN "monitoringSsh" BOOLEAN DEFAULT false; 