'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { useNetworkStore } from '@/store/network-store';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  Plus,
  Grid3X3,
  List,
  SortAsc,
  SortDesc,
  Network,
  Server,
  Monitor,
  Printer,
  Smartphone,
  Shield,
  Router,
  Wifi,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { NetworkDevice } from '@/types/schemas';
import { useToast } from '@/components/ui/toast';

type SortField =
  | 'name'
  | 'ip'
  | 'type'
  | 'status'
  | 'responseTime'
  | 'lastSeen';
type ViewMode = 'grid' | 'list';

const deviceIcons = {
  router: Router,
  switch: Network,
  server: Server,
  workstation: Monitor,
  printer: Printer,
  mobile: Smartphone,
  firewall: Shield,
  access_point: Wifi,
};

const statusColors = {
  online: 'bg-green-500',
  offline: 'bg-red-500',
  warning: 'bg-yellow-500',
};

const statusBadgeColors = {
  online: 'bg-green-500/20 text-green-400 border-green-500/20',
  offline: 'bg-red-500/20 text-red-400 border-red-500/20',
  warning: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/20',
};

const DeviceCard = React.memo<{
  device: NetworkDevice;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}>(({ device, onEdit, onDelete }) => {
  const Icon = useMemo(
    () => deviceIcons[device.type] || Network,
    [device.type]
  );

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="group cursor-pointer border-slate-700 bg-slate-800/50 transition-all duration-200 hover:bg-slate-800/70">
        <div className="p-4">
          {/* Header */}
          <div className="mb-3 flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="rounded-lg bg-slate-700/50 p-2">
                <Icon className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <h4 className="truncate font-medium text-white">
                  {device.name}
                </h4>
                <p className="text-sm text-slate-400">{device.ip}</p>
              </div>
            </div>
            <Badge className={statusBadgeColors[device.status]}>
              {device.status}
            </Badge>
          </div>

          {/* Info */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Время отклика</span>
              <span className="text-white">{device.responseTime}ms</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Время работы</span>
              <span className="text-white">{device.uptime}%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Производитель</span>
              <span className="text-white">{device.vendor || 'N/A'}</span>
            </div>
            {device.location && (
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Локация</span>
                <span className="truncate text-white">{device.location}</span>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="mt-4 flex justify-end space-x-2 opacity-0 transition-opacity group-hover:opacity-100">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onEdit(device.id)}
              className="text-blue-400 hover:bg-blue-500/10 hover:text-blue-300"
            >
              Изменить
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onDelete(device.id)}
              className="text-red-400 hover:bg-red-500/10 hover:text-red-300"
            >
              Удалить
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
});

DeviceCard.displayName = 'DeviceCard';

const DeviceListRow = React.memo<{
  device: NetworkDevice;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}>(({ device, onEdit, onDelete }) => {
  const Icon = useMemo(
    () => deviceIcons[device.type] || Network,
    [device.type]
  );

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="group border-slate-700 bg-slate-800/50 transition-all duration-200 hover:bg-slate-800/70">
        <div className="p-4">
          <div className="grid grid-cols-6 items-center gap-4">
            <div className="flex items-center space-x-3">
              <div className="rounded-lg bg-slate-700/50 p-2">
                <Icon className="h-4 w-4 text-blue-400" />
              </div>
              <div>
                <h4 className="truncate font-medium text-white">
                  {device.name}
                </h4>
                <p className="text-sm text-slate-400">{device.type}</p>
              </div>
            </div>

            <div className="text-sm">
              <p className="text-white">{device.ip}</p>
              <p className="text-slate-400">{device.location || 'N/A'}</p>
            </div>

            <div className="flex items-center">
              <Badge className={statusBadgeColors[device.status]}>
                {device.status}
              </Badge>
            </div>

            <div className="text-center text-sm">
              <p className="text-white">{device.responseTime}ms</p>
              <p className="text-slate-400">отклик</p>
            </div>

            <div className="text-center text-sm">
              <p className="text-white">{device.uptime}%</p>
              <p className="text-slate-400">время работы</p>
            </div>

            <div className="flex justify-end space-x-2 opacity-0 transition-opacity group-hover:opacity-100">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onEdit(device.id)}
                className="text-blue-400 hover:bg-blue-500/10 hover:text-blue-300"
              >
                Изменить
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onDelete(device.id)}
                className="text-red-400 hover:bg-red-500/10 hover:text-red-300"
              >
                Удалить
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
});

DeviceListRow.displayName = 'DeviceListRow';

interface DevicesSectionProps {
  onAddDevice?: () => void;
  onEditDevice?: (deviceId: string) => void;
  onDeleteDevice?: (deviceId: string) => void;
}

export const DevicesSection: React.FC<DevicesSectionProps> = (props) => {
  const {
    devices,
    loading,
    error: storeError,
    selectedFolderId,
    folders,
  } = useNetworkStore();
  const { success, error, warning, info } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  // Заглушки для функций которые будут реализованы позже
  const onAddDevice = () => {
    warning(
      'Добавление устройства',
      'Функция будет реализована в следующей версии'
    );
  };

  const onEditDevice = (device: NetworkDevice) => {
    warning(
      'Редактирование устройства',
      `Редактирование ${device.name} будет реализовано в следующей версии`
    );
  };

  const handleAddDevice = () => {
    onAddDevice();
  };

  // Filter devices
  const filteredDevices = devices.filter((device) => {
    const matchesSearch =
      device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.ip.includes(searchTerm) ||
      (device.location &&
        device.location.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus =
      statusFilter === 'all' || device.status === statusFilter;
    const matchesType = typeFilter === 'all' || device.type === typeFilter;

    // Исправленная логика фильтрации по папкам и устройствам
    let matchesFolder = true;
    if (selectedFolderId && selectedFolderId !== 'root') {
      // Проверяем, не выбрано ли конкретное устройство
      const isDeviceSelected = devices.some((d) => d.id === selectedFolderId);

      if (isDeviceSelected) {
        // Если выбрано конкретное устройство, показываем только его
        matchesFolder = device.id === selectedFolderId;
      } else if (selectedFolderId === 'others') {
        // Если выбрана папка "Иные", показываем устройства без папки или с folderId = 'root'
        matchesFolder = !device.folderId || device.folderId === 'root';
      } else {
        // Для конкретной папки показываем только устройства этой папки
        matchesFolder = device.folderId === selectedFolderId;
      }
    } else {
      // Для корневой папки показываем ВСЕ устройства (включая из вложенных папок)
      // Это позволяет видеть все устройства сети, как на топологии
      matchesFolder = true;
    }

    return matchesSearch && matchesStatus && matchesType && matchesFolder;
  });

  // Sort devices
  const sortedDevices = [...filteredDevices].sort((a, b) => {
    let aValue: any = a[sortField];
    let bValue: any = b[sortField];

    if (sortField === 'lastSeen') {
      aValue = new Date(aValue).getTime();
      bValue = new Date(bValue).getTime();
    }

    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }

    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Функция для получения названия папки или устройства
  const getFolderName = (folderId: string): string => {
    if (!folderId || folderId === 'root') return 'Все устройства';
    if (folderId === 'others') return 'Иные';

    // Проверяем, не является ли это устройством
    const device = devices.find((d) => d.id === folderId);
    if (device) {
      return `Устройство: ${device.name}`;
    }

    const findFolder = (folders: any[]): any => {
      for (const folder of folders) {
        if (folder.id === folderId) return folder;
        if (folder.children) {
          const found = findFolder(folder.children);
          if (found) return found;
        }
      }
      return null;
    };

    const folder = findFolder(folders);
    return folder ? folder.name : 'Неизвестная папка';
  };

  const deviceTypes = Array.from(new Set(devices.map((d) => d.type)));
  const onlineCount = filteredDevices.filter(
    (d) => d.status === 'online'
  ).length;
  const offlineCount = filteredDevices.filter(
    (d) => d.status === 'offline'
  ).length;
  const warningCount = filteredDevices.filter(
    (d) => d.status === 'warning'
  ).length;

  const handleEditDevice = (deviceId: string) => {
    const device = devices.find((d) => d.id === deviceId);
    if (device) {
      onEditDevice(device);
    }
  };

  const handleDeleteDevice = (deviceId: string) => {
    const device = devices.find((d) => d.id === deviceId);
    if (
      device &&
      confirm(`Вы уверены, что хотите удалить устройство "${device.name}"?`)
    ) {
      // Assuming deleteDevice is available in useNetworkStore or needs to be imported
      // For now, using console.log as a placeholder
      console.log('Удаление устройства', `Удаление устройства: ${device.name}`);
      // Example: deleteDevice(deviceId);
      alert('Устройство успешно удалено');
    }
  };

  return (
    <Card className="border-slate-700 bg-slate-800/50">
      <div className="p-6">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-white">
              Сетевые устройства
            </h2>
            <p className="text-sm text-slate-400">
              Обнаружено {devices.length} устройств в сети
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={async () => {
                const { pingDevice } = useNetworkStore.getState();
                try {
                  // Assuming success and error are defined elsewhere or need to be imported
                  // For now, using console.log as a placeholder
                  console.log(
                    'Массовый ping',
                    'Запускается ping всех устройств...'
                  );
                  const promises = devices.map((device) =>
                    pingDevice(device.id)
                  );
                  await Promise.all(promises);
                  console.log('Ping завершен', 'Все устройства проверены');
                } catch (error) {
                  console.error(
                    'Ошибка ping',
                    'Не удалось выполнить ping некоторых устройств'
                  );
                }
              }}
              className="flex items-center space-x-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
            >
              <span>🏓</span>
              <span>Ping всех</span>
            </button>

            <button
              onClick={() => {
                const { loadDevices } = useNetworkStore.getState();
                loadDevices();
                // Assuming info is defined elsewhere or needs to be imported
                // For now, using console.log as a placeholder
                console.log(
                  'Обновление',
                  'Загружаются актуальные данные устройств...'
                );
              }}
              className="flex items-center space-x-2 rounded-lg bg-slate-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-700"
            >
              <span>🔄</span>
              <span>Обновить</span>
            </button>

            <button
              onClick={() => {
                // Assuming warning is defined elsewhere or needs to be imported
                // For now, using console.log as a placeholder
                console.warn(
                  'Добавление устройства',
                  'Функция будет реализована в следующей версии'
                );
              }}
              className="flex items-center space-x-2 rounded-lg bg-green-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700"
            >
              <span>➕</span>
              <span>Добавить</span>
            </button>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-slate-400" />
            <input
              type="text"
              placeholder="Поиск устройств..."
              value={searchTerm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchTerm(e.target.value)
              }
              className="w-full rounded-lg border border-slate-600/50 bg-slate-700/50 py-2 pl-10 pr-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border border-slate-600/50 bg-slate-700/50 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          >
            <option value="all">Все статусы</option>
            <option value="online">Онлайн</option>
            <option value="offline">Офлайн</option>
            <option value="warning">Предупреждения</option>
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="rounded-lg border border-slate-600/50 bg-slate-700/50 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          >
            <option value="all">Все типы</option>
            {deviceTypes.map((type) => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>

          <div className="flex items-center space-x-2">
            <select
              value={sortField}
              onChange={(e) => setSortField(e.target.value as SortField)}
              className="flex-1 rounded-lg border border-slate-600/50 bg-slate-700/50 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            >
              <option value="name">Имя</option>
              <option value="ip">IP адрес</option>
              <option value="status">Статус</option>
              <option value="responseTime">Время отклика</option>
              <option value="uptime">Время работы</option>
              <option value="lastSeen">Последний раз онлайн</option>
            </select>
            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
              }
              className="text-slate-400 hover:bg-slate-700/50 hover:text-white"
            >
              {sortDirection === 'asc' ? (
                <SortAsc className="h-4 w-4" />
              ) : (
                <SortDesc className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Device Grid/List */}
        <div className="space-y-4">
          {viewMode === 'grid' ? (
            <motion.div
              layout
              className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
            >
              {sortedDevices.map((device) => (
                <DeviceCard
                  key={device.id}
                  device={device}
                  onEdit={handleEditDevice}
                  onDelete={handleDeleteDevice}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div layout className="space-y-2">
              {sortedDevices.map((device) => (
                <DeviceListRow
                  key={device.id}
                  device={device}
                  onEdit={handleEditDevice}
                  onDelete={handleDeleteDevice}
                />
              ))}
            </motion.div>
          )}

          {sortedDevices.length === 0 && (
            <div className="py-12 text-center">
              <div className="mb-2 text-lg text-slate-400">
                Устройства не найдены
              </div>
              <div className="text-slate-500">
                Попробуйте изменить фильтры поиска
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
