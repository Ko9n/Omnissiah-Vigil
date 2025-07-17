'use client';

import React, { useState } from 'react';
import { DeviceFolder, NetworkDevice } from '@/types/schemas';
import { useNetworkStore } from '@/store/network-store';
import {
  ChevronRight,
  ChevronDown,
  Folder,
  FolderOpen,
  Plus,
  Edit,
  Trash2,
  UserPlus,
  Network,
  Server,
  Monitor,
  Printer,
  Smartphone,
  Globe,
  Database,
  Building,
  Shield,
} from 'lucide-react';

interface FolderTreeProps {
  folders: DeviceFolder[];
  devices: NetworkDevice[];
  selectedFolderId?: string;
  rootFolderExpanded: boolean;

  onFolderSelect: (folderId: string) => void;
  onFolderToggle: (folderId: string) => void;
  onAddFolder: (parentId: string) => void;
  onEditFolder: (folderId: string) => void;
  onDeleteFolder: (folderId: string) => void;
  onAddDeviceToFolder: (folderId: string) => void;
  onEditDevice?: (deviceId: string) => void;
  onDeleteDevice?: (deviceId: string) => void;
}

const iconMap = {
  Network,
  Server,
  Monitor,
  Printer,
  Smartphone,
  Globe,
  Database,
  Building,
  Folder,
  Shield,
};

export function FolderTree({
  folders,
  devices,
  selectedFolderId,
  rootFolderExpanded,
  onFolderSelect,
  onFolderToggle,
  onAddFolder,
  onEditFolder,
  onDeleteFolder,
  onAddDeviceToFolder,
  onEditDevice,
  onDeleteDevice,
}: FolderTreeProps) {
  const getFolderExpandedState = useNetworkStore(
    (state) => state.getFolderExpandedState
  );
  const getDeviceCount = (folderId: string): number => {
    if (folderId === 'root') {
      // Корневая папка показывает только устройства БЕЗ папки
      return devices.filter(
        (device) => !device.folderId || device.folderId === 'root'
      ).length;
    }
    return devices.filter((device) => device.folderId === folderId).length;
  };

  const getOnlineDeviceCount = (folderId: string): number => {
    if (folderId === 'root') {
      // Корневая папка показывает только устройства БЕЗ папки
      return devices.filter(
        (device) =>
          (!device.folderId || device.folderId === 'root') &&
          device.status === 'online'
      ).length;
    }
    return devices.filter(
      (device) => device.folderId === folderId && device.status === 'online'
    ).length;
  };

  // Функция обработки клика на папку
  const handleFolderClick = (folder: DeviceFolder) => {
    const hasChildren = folder.children && folder.children.length > 0;
    const folderDevices = devices.filter(
      (device) => device.folderId === folder.id
    );
    const hasDevices = folderDevices.length > 0;
    const shouldExpand = hasChildren || hasDevices;
    const isExpanded = getFolderExpandedState(folder.id);

    if (selectedFolderId === folder.id) {
      // Если папка уже выбрана, только переключаем её состояние (развернуть/свернуть)
      if (shouldExpand) {
        onFolderToggle(folder.id);
      }
    } else {
      // Если папка не выбрана, выбираем её и разворачиваем (если есть содержимое)
      onFolderSelect(folder.id);
      if (shouldExpand && !isExpanded) {
        onFolderToggle(folder.id);
      }
    }
  };

  // Функция для рендеринга устройства
  const renderDevice = (device: NetworkDevice, level: number = 0) => {
    return (
      <div
        key={device.id}
        className="select-none"
        draggable
        onDragStart={(e) => {
          e.dataTransfer.setData('text/plain', device.id);
          e.dataTransfer.setData('device-id', device.id);
        }}
      >
        <div
          className={`group flex cursor-pointer items-center justify-between rounded-lg p-2 transition-all duration-200 ${
            selectedFolderId === device.id
              ? 'border border-green-500/30 bg-green-500/20'
              : 'hover:bg-slate-700/50'
          }`}
          style={{ paddingLeft: `${level * 20 + 28}px` }}
          onClick={() => {
            console.log('Device clicked:', device.id, device.name);
            onFolderSelect(device.id);
          }}
        >
          <div className="flex flex-1 items-center space-x-2">
            <div
              className="rounded-lg border p-1.5"
              style={{
                backgroundColor:
                  device.status === 'online'
                    ? '#10B98120'
                    : device.status === 'warning'
                      ? '#F59E0B20'
                      : '#EF444420',
                borderColor:
                  device.status === 'online'
                    ? '#10B98140'
                    : device.status === 'warning'
                      ? '#F59E0B40'
                      : '#EF444440',
                color:
                  device.status === 'online'
                    ? '#10B981'
                    : device.status === 'warning'
                      ? '#F59E0B'
                      : '#EF4444',
              }}
            >
              {(() => {
                const deviceIcons = {
                  router: Network,
                  switch: Network,
                  server: Server,
                  workstation: Monitor,
                  printer: Printer,
                  mobile: Smartphone,
                  firewall: Shield,
                  access_point: Globe,
                };
                const DeviceIcon =
                  deviceIcons[device.type as keyof typeof deviceIcons] ||
                  Monitor;
                return <DeviceIcon className="h-4 w-4" />;
              })()}
            </div>

            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-white">
                  {device.name}
                </span>
                <div className="flex items-center space-x-1 text-xs">
                  <span
                    className={
                      device.status === 'online'
                        ? 'text-green-400'
                        : device.status === 'warning'
                          ? 'text-yellow-400'
                          : 'text-red-400'
                    }
                  >
                    {device.status}
                  </span>
                </div>
              </div>
              <p className="truncate text-xs text-slate-500">{device.ip}</p>
            </div>
          </div>

          <div className="flex items-center space-x-1 opacity-0 transition-opacity group-hover:opacity-100">
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (onEditDevice) {
                  onEditDevice(device.id);
                }
              }}
              className="rounded p-1 text-slate-400 hover:bg-slate-600/50 hover:text-white"
              title="Редактировать устройство"
            >
              <Edit className="h-3 w-3" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (onDeleteDevice) {
                  onDeleteDevice(device.id);
                }
              }}
              className="rounded p-1 text-slate-400 hover:bg-slate-600/50 hover:text-red-400"
              title="Удалить устройство"
            >
              <Trash2 className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderFolder = (folder: DeviceFolder, level: number = 0) => {
    const IconComponent =
      iconMap[folder.icon as keyof typeof iconMap] || Folder;
    const deviceCount = getDeviceCount(folder.id);
    const onlineCount = getOnlineDeviceCount(folder.id);
    const hasChildren = folder.children && folder.children.length > 0;
    const folderDevices = devices.filter(
      (device) => device.folderId === folder.id
    );
    const hasDevices = folderDevices.length > 0;
    // Папки ВСЕГДА должны иметь кнопку expand (кроме возможно пустых, но лучше показывать всегда)
    const shouldShowExpandButton = true;
    // Используем локальное состояние раскрытия вместо folder.expanded
    const isExpanded = getFolderExpandedState(folder.id);

    return (
      <div key={folder.id} className="select-none">
        <div
          className={`group flex cursor-pointer items-center justify-between rounded-lg p-2 transition-all duration-200 ${
            selectedFolderId === folder.id
              ? 'border border-blue-500/30 bg-blue-500/20'
              : 'hover:bg-slate-700/50'
          }`}
          style={{ paddingLeft: `${level * 20 + 8}px` }}
          onClick={() => {
            console.log('Folder clicked:', folder.id, folder.name);
            handleFolderClick(folder);
          }}
          onDragOver={(e) => {
            e.preventDefault();
            e.currentTarget.classList.add('bg-blue-500/10');
          }}
          onDragLeave={(e) => {
            e.currentTarget.classList.remove('bg-blue-500/10');
          }}
          onDrop={(e) => {
            e.preventDefault();
            e.currentTarget.classList.remove('bg-blue-500/10');
            const deviceId = e.dataTransfer.getData('device-id');
            if (deviceId) {
              console.log('Moving device', deviceId, 'to folder', folder.id);
              // TODO: Implement device move logic
            }
          }}
        >
          <div className="flex flex-1 items-center space-x-2">
            {shouldShowExpandButton && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  console.log(
                    'Toggle folder:',
                    folder.id,
                    'current expanded:',
                    isExpanded
                  );
                  onFolderToggle(folder.id);
                }}
                className="rounded p-1 hover:bg-slate-600/50"
              >
                {isExpanded ? (
                  <ChevronDown className="h-4 w-4 text-slate-400" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-slate-400" />
                )}
              </button>
            )}

            <div
              className="rounded-lg border p-1.5"
              style={{
                backgroundColor: `${folder.color}20`,
                borderColor: `${folder.color}40`,
                color: folder.color,
              }}
            >
              {isExpanded && shouldShowExpandButton ? (
                <FolderOpen className="h-4 w-4" />
              ) : (
                <IconComponent className="h-4 w-4" />
              )}
            </div>

            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-white">
                  {folder.name}
                </span>
                {deviceCount > 0 && (
                  <div className="flex items-center space-x-1 text-xs">
                    <span className="text-green-400">{onlineCount}</span>
                    <span className="text-slate-500">/</span>
                    <span className="text-slate-400">{deviceCount}</span>
                  </div>
                )}
              </div>
              {folder.description && (
                <p className="truncate text-xs text-slate-500">
                  {folder.description}
                </p>
              )}
            </div>
          </div>

          {/* Всегда видимые кнопки действий */}
          <div className="flex items-center space-x-1 opacity-0 transition-opacity group-hover:opacity-100">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddDeviceToFolder(folder.id);
              }}
              className="rounded p-1 text-slate-400 hover:bg-slate-600/50 hover:text-green-400"
              title="Добавить устройство в эту папку"
            >
              <Monitor className="h-3 w-3" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddFolder(folder.id);
              }}
              className="rounded p-1 text-slate-400 hover:bg-slate-600/50 hover:text-blue-400"
              title="Добавить подпапку"
            >
              <Plus className="h-3 w-3" />
            </button>
            {folder.id !== 'root' && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEditFolder(folder.id);
                  }}
                  className="rounded p-1 text-slate-400 hover:bg-slate-600/50 hover:text-white"
                  title="Редактировать папку"
                >
                  <Edit className="h-3 w-3" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteFolder(folder.id);
                  }}
                  className="rounded p-1 text-slate-400 hover:bg-slate-600/50 hover:text-red-400"
                  title="Удалить папку"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </>
            )}
          </div>
        </div>

        {isExpanded && (
          <div className="mt-1">
            {/* Подпапки */}
            {hasChildren &&
              folder.children.map((child: DeviceFolder) =>
                renderFolder(child, level + 1)
              )}

            {/* Устройства в этой папке */}
            {folderDevices.length > 0 &&
              folderDevices.map((device) => renderDevice(device, level + 1))}
          </div>
        )}
      </div>
    );
  };

  // Создаем виртуальную корневую папку
  const rootFolder: DeviceFolder = {
    id: 'root',
    name: 'Корневые устройства',
    description: 'Устройства без папки',
    parentId: undefined,
    color: '#3B82F6',
    icon: 'Network',
    expanded: rootFolderExpanded,
    children: folders,
  };

  const totalDevices = devices.length;
  const totalOnline = devices.filter((d) => d.status === 'online').length;

  return (
    <div className="space-y-1">
      {/* Корневая папка "Корневые устройства" */}
      <div className="select-none">
        <div
          className={`group flex cursor-pointer items-center justify-between rounded-lg p-2 transition-all duration-200 ${
            selectedFolderId === 'root' || !selectedFolderId
              ? 'border border-blue-500/30 bg-blue-500/20'
              : 'hover:bg-slate-700/50'
          }`}
          onClick={() => {
            console.log('Root folder clicked');
            handleFolderClick(rootFolder);
          }}
        >
          <div className="flex flex-1 items-center space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onFolderToggle('root');
              }}
              className="rounded p-1 hover:bg-slate-600/50"
            >
              {rootFolder.expanded ? (
                <ChevronDown className="h-4 w-4 text-slate-400" />
              ) : (
                <ChevronRight className="h-4 w-4 text-slate-400" />
              )}
            </button>

            <div
              className="rounded-lg border p-1.5"
              style={{
                backgroundColor: '#3B82F620',
                borderColor: '#3B82F640',
                color: '#3B82F6',
              }}
            >
              {rootFolder.expanded ? (
                <FolderOpen className="h-4 w-4" />
              ) : (
                <Network className="h-4 w-4" />
              )}
            </div>

            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-white">
                  Корневые устройства
                </span>
                <div className="flex items-center space-x-1 text-xs">
                  <span className="text-green-400">
                    {getOnlineDeviceCount('root')}
                  </span>
                  <span className="text-slate-500">/</span>
                  <span className="text-slate-400">
                    {getDeviceCount('root')}
                  </span>
                </div>
              </div>
              <p className="truncate text-xs text-slate-500">
                Устройства без папки
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-1 opacity-0 transition-opacity group-hover:opacity-100">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddDeviceToFolder('root');
              }}
              className="rounded p-1 text-slate-400 hover:bg-slate-600/50 hover:text-green-400"
              title="Добавить устройство в корень"
            >
              <Monitor className="h-3 w-3" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddFolder('root');
              }}
              className="rounded p-1 text-slate-400 hover:bg-slate-600/50 hover:text-blue-400"
              title="Добавить папку"
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>
        </div>

        {/* Корневые устройства и папки */}
        {rootFolder.expanded && (
          <div className="mt-1">
            {/* СНАЧАЛА корневые устройства (ТОЛЬКО без папки) */}
            {(() => {
              const rootDevices = devices.filter(
                (device) => !device.folderId || device.folderId === 'root'
              );

              return rootDevices.map((device) => renderDevice(device, 1));
            })()}

            {/* ПОТОМ все папки */}
            {folders.map((folder) => renderFolder(folder, 1))}
          </div>
        )}
      </div>
    </div>
  );
}
