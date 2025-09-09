'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Wifi,
  Check,
  X,
  Loader2,
  Plus,
  AlertCircle,
} from 'lucide-react';
import { NetworkDevice, DeviceFolder } from '@/types/schemas';
import { api } from '@/lib/api';

interface ScannedDevice {
  ip: string;
  hostname?: string;
  mac?: string;
  vendor?: string;
  status: 'up' | 'down';
}

interface NetworkScannerProps {
  isOpen: boolean;
  onClose: () => void;
  onDevicesSelected: (
    devices: Omit<NetworkDevice, 'id' | 'lastSeen' | 'status'>[]
  ) => void;
  folders: DeviceFolder[];
  defaultFolderId?: string;
}

export function NetworkScanner({
  isOpen,
  onClose,
  onDevicesSelected,
  folders,
  defaultFolderId,
}: NetworkScannerProps) {
  const [network, setNetwork] = useState('192.168.1.0/24');
  const [scanType, setScanType] = useState('ping');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResults, setScanResults] = useState<{
    totalHosts: number;
    newDevices: ScannedDevice[];
    existingDevices: Array<{ ip: string; name: string }>;
    discoveredHosts: ScannedDevice[];
  } | null>(null);
  const [scanJob, setScanJob] = useState<{
    jobId: string;
    status: 'pending' | 'running' | 'done' | 'error';
    progress: number;
    error?: string;
  } | null>(null);
  const [pollingIntervalId, setPollingIntervalId] =
    useState<NodeJS.Timeout | null>(null);
  const [selectedDevices, setSelectedDevices] = useState<Set<string>>(
    new Set()
  );
  const [error, setError] = useState<string | null>(null);
  const [selectedFolderId, setSelectedFolderId] = useState(
    defaultFolderId || 'root'
  );

  const getAllFolders = (
    folders: DeviceFolder[],
    prefix = ''
  ): Array<{ id: string; name: string }> => {
    let result: Array<{ id: string; name: string }> = [];

    folders.forEach((folder) => {
      result.push({
        id: folder.id,
        name: prefix + folder.name,
      });

      if (folder.children && folder.children.length > 0) {
        result = result.concat(
          getAllFolders(folder.children, prefix + folder.name + ' / ')
        );
      }
    });

    return result;
  };

  const handleScan = async () => {
    if (!network.trim()) {
      setError('Введите адрес сети для сканирования');
      return;
    }

    setIsScanning(true);
    setError(null);
    setScanResults(null);
    setSelectedDevices(new Set());

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/devices/scan-network`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            network: network.trim(),
            timeout: 30000,
            scanType: scanType,
          }),
        }
      );

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Ошибка запуска сканирования');
      }

      const { jobId } = result;
      setScanJob({ jobId, status: 'pending', progress: 0 });

      // Начинаем опрос прогресса
      const id = setInterval(async () => {
        try {
          const statusResp = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/devices/scan-progress/${jobId}`
          );
          const statusJson = await statusResp.json();
          if (!statusJson.success) {
            throw new Error(statusJson.error || 'Ошибка получения статуса');
          }
          const data = statusJson.data as {
            status: 'pending' | 'running' | 'done' | 'error';
            progress: number;
            results: ScannedDevice[];
            error?: string;
          };
          setScanJob({
            jobId,
            status: data.status,
            progress: data.progress,
            error: data.error,
          });

          if (data.status === 'done') {
            clearInterval(id);
            setPollingIntervalId(null);

            // Трансформация результатов
            const transformed = {
              totalHosts: data.results.length,
              newDevices: data.results,
              existingDevices: [] as Array<{ ip: string; name: string }>,
              discoveredHosts: data.results,
            };
            setScanResults(transformed);
            setIsScanning(false);
          }
          if (data.status === 'error') {
            clearInterval(id);
            setPollingIntervalId(null);
            setError(data.error || 'Ошибка сканирования');
            setIsScanning(false);
          }
        } catch (pollErr) {
          clearInterval(id);
          setPollingIntervalId(null);
          setError(
            pollErr instanceof Error ? pollErr.message : 'Ошибка опроса'
          );
          setIsScanning(false);
        }
      }, 2000);
      setPollingIntervalId(id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
      setIsScanning(false);
    }
  };

  // Очистка интервала при закрытии
  React.useEffect(() => {
    return () => {
      if (pollingIntervalId) clearInterval(pollingIntervalId);
    };
  }, [pollingIntervalId]);

  const handleDeviceToggle = (ip: string) => {
    const newSelected = new Set(selectedDevices);
    if (newSelected.has(ip)) {
      newSelected.delete(ip);
    } else {
      newSelected.add(ip);
    }
    setSelectedDevices(newSelected);
  };

  const handleSelectAll = () => {
    if (scanResults) {
      const allNewDeviceIps = scanResults.newDevices.map((d) => d.ip);
      setSelectedDevices(new Set(allNewDeviceIps));
    }
  };

  const handleDeselectAll = () => {
    setSelectedDevices(new Set());
  };

  const handleAddSelected = async () => {
    if (!scanResults || selectedDevices.size === 0) return;

    const devicesToAdd = scanResults.newDevices
      .filter((device) => selectedDevices.has(device.ip))
      .map((device) => ({
        name: device.hostname || `Device ${device.ip}`,
        ip: device.ip,
        mac: device.mac || '',
        type: 'workstation' as const,
        responseTime: 0,
        uptime: 100,
        location: '',
        folderId: selectedFolderId,
        vendor: device.vendor || '',
        model: '',
        osVersion: '',
        monitoring: {
          ping: true,
          snmp: false,
          http: false,
          ssh: false,
        },
        position: undefined,
      }));

    try {
      // вызов bulk API
      await api.devices.bulkCreateDevices(devicesToAdd, selectedFolderId);
      // уведомление можно заменить на toast
      alert(`Добавлено устройств: ${devicesToAdd.length}`);
      onDevicesSelected(devicesToAdd);
      onClose();
    } catch (err: any) {
      console.error('Bulk create error', err);
      setError(err.message || 'Ошибка добавления устройств');
    }
  };

  const flatFolders = getAllFolders(folders);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3 }}
          className="mx-4 max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-xl border border-slate-700 bg-slate-800 p-6"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Wifi className="h-6 w-6 text-blue-400" />
              <h2 className="text-xl font-semibold text-white">Сканер сети</h2>
            </div>
            <button
              onClick={onClose}
              className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-700 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Network Input */}
          <div className="mb-6 space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Адрес сети для сканирования
              </label>
              <div className="flex space-x-3">
                <input
                  type="text"
                  value={network}
                  onChange={(e) => setNetwork(e.target.value)}
                  className="flex-1 rounded-lg border border-slate-600 bg-slate-700 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="192.168.1.0/24"
                />
                <motion.button
                  onClick={handleScan}
                  disabled={isScanning}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center space-x-2 rounded-lg bg-blue-500 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-600 disabled:opacity-50"
                >
                  {isScanning ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Search className="h-5 w-5" />
                  )}
                  <span>{isScanning ? 'Сканирование...' : 'Сканировать'}</span>
                </motion.button>
              </div>
              <p className="mt-2 text-xs text-slate-400">
                Примеры: 192.168.1.0/24, 10.0.0.0/16, 172.16.0.0/12
              </p>
            </div>

            {/* Scan Type Selection */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Тип сканирования
              </label>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                {[
                  { value: 'ping', label: 'Ping', desc: 'Быстрое обнаружение' },
                  { value: 'tcp', label: 'TCP', desc: 'Сканирование портов' },
                  { value: 'snmp', label: 'SNMP', desc: 'Сетевые устройства' },
                  { value: 'full', label: 'Полное', desc: 'OS + сервисы' },
                ].map((type) => (
                  <motion.button
                    key={type.value}
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setScanType(type.value)}
                    className={`rounded-lg border-2 p-3 text-center transition-all ${
                      scanType === type.value
                        ? 'border-blue-500 bg-blue-500/20 text-blue-400'
                        : 'border-slate-600 bg-slate-700/50 text-slate-300 hover:border-slate-500'
                    }`}
                  >
                    <div className="font-medium">{type.label}</div>
                    <div className="text-xs opacity-75">{type.desc}</div>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 flex items-center space-x-2 rounded-lg border border-red-500/50 bg-red-500/20 p-4 text-red-400"
            >
              <AlertCircle className="h-5 w-5" />
              <span>{error}</span>
            </motion.div>
          )}

          {/* Scan Results */}
          {scanResults && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Summary */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="rounded-lg bg-slate-700/50 p-4">
                  <div className="text-2xl font-bold text-white">
                    {scanResults.totalHosts}
                  </div>
                  <div className="text-sm text-slate-400">Всего найдено</div>
                </div>
                <div className="rounded-lg border border-green-500/50 bg-green-500/20 p-4">
                  <div className="text-2xl font-bold text-green-400">
                    {scanResults.newDevices.length}
                  </div>
                  <div className="text-sm text-slate-400">Новых устройств</div>
                </div>
                <div className="rounded-lg border border-yellow-500/50 bg-yellow-500/20 p-4">
                  <div className="text-2xl font-bold text-yellow-400">
                    {scanResults.existingDevices.length}
                  </div>
                  <div className="text-sm text-slate-400">Уже в системе</div>
                </div>
              </div>

              {/* Folder Selection */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Папка для новых устройств
                </label>
                <select
                  value={selectedFolderId}
                  onChange={(e) => setSelectedFolderId(e.target.value)}
                  className="w-full rounded-lg border border-slate-600 bg-slate-700 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="root">Корневая папка</option>
                  {flatFolders.map((folder) => (
                    <option key={folder.id} value={folder.id}>
                      {folder.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* New Devices List */}
              {scanResults.newDevices.length > 0 && (
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-medium text-white">
                      Новые устройства ({scanResults.newDevices.length})
                    </h3>
                    <div className="flex space-x-2">
                      <button
                        onClick={handleSelectAll}
                        className="text-sm text-blue-400 hover:text-blue-300"
                      >
                        Выбрать все
                      </button>
                      <button
                        onClick={handleDeselectAll}
                        className="text-sm text-slate-400 hover:text-slate-300"
                      >
                        Снять выбор
                      </button>
                    </div>
                  </div>

                  <div className="max-h-96 overflow-y-auto rounded-lg border border-slate-600">
                    {scanResults.newDevices.map((device) => (
                      <motion.div
                        key={device.ip}
                        whileHover={{
                          backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        }}
                        className={`flex cursor-pointer items-center justify-between border-b border-slate-600 p-4 last:border-b-0 ${
                          selectedDevices.has(device.ip)
                            ? 'border-blue-500/50 bg-blue-500/10'
                            : ''
                        }`}
                        onClick={() => handleDeviceToggle(device.ip)}
                      >
                        <div className="flex-1">
                          <div className="flex items-center space-x-3">
                            <div
                              className={`h-3 w-3 rounded-full ${
                                device.status === 'up'
                                  ? 'bg-green-500'
                                  : 'bg-red-500'
                              }`}
                            />
                            <div>
                              <div className="font-medium text-white">
                                {device.ip}
                              </div>
                              {device.hostname && (
                                <div className="text-sm text-slate-400">
                                  {device.hostname}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="mt-2 flex items-center space-x-4 text-xs text-slate-500">
                            {device.mac && <span>MAC: {device.mac}</span>}
                            {device.vendor && (
                              <span>Производитель: {device.vendor}</span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {selectedDevices.has(device.ip) ? (
                            <Check className="h-5 w-5 text-blue-400" />
                          ) : (
                            <Plus className="h-5 w-5 text-slate-400" />
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Existing Devices */}
              {scanResults.existingDevices.length > 0 && (
                <div>
                  <h3 className="mb-4 text-lg font-medium text-white">
                    Уже в системе ({scanResults.existingDevices.length})
                  </h3>
                  <div className="max-h-48 overflow-y-auto rounded-lg border border-slate-600 bg-slate-700/30">
                    {scanResults.existingDevices.map((device) => (
                      <div
                        key={device.ip}
                        className="flex items-center justify-between border-b border-slate-600 p-3 last:border-b-0"
                      >
                        <div>
                          <div className="font-medium text-white">
                            {device.ip}
                          </div>
                          <div className="text-sm text-slate-400">
                            {device.name}
                          </div>
                        </div>
                        <div className="text-xs text-slate-500">
                          Уже добавлено
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              {scanResults.newDevices.length > 0 && (
                <div className="flex items-center justify-end space-x-4 border-t border-slate-700 pt-6">
                  <button
                    onClick={onClose}
                    className="px-6 py-3 text-slate-300 transition-colors hover:text-white"
                  >
                    Отмена
                  </button>
                  <motion.button
                    onClick={handleAddSelected}
                    disabled={selectedDevices.size === 0}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="rounded-lg bg-green-500 px-6 py-3 font-medium text-white transition-colors hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Добавить выбранные ({selectedDevices.size})
                  </motion.button>
                </div>
              )}
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
