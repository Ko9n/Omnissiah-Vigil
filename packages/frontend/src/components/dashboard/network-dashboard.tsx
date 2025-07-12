'use client';

import { useState, useEffect } from 'react';
import { useNetworkStore } from '@/store/network-store';
import { motion } from 'framer-motion';
import {
  Network,
  Server,
  Activity,
  Shield,
  Clock,
  RefreshCw,
  Settings,
  FolderOpen,
  Download,
  AlertTriangle,
  Monitor,
  Plus,
} from 'lucide-react';
import { FolderTree } from '../ui/folder-tree';
import { MetricsCard } from '../ui/metrics-card';
import { BandwidthChart } from '../ui/bandwidth-chart';
import { DevicesSection } from './devices-section';
import { AlertsPanel } from '../ui/alerts-panel';
import { SystemHealthCard } from '../ui/system-health-card';
import { NetworkTopology } from '../ui/network-topology';
import { DeviceModal } from '../ui/device-modal';
import { FolderModal } from '../ui/folder-modal';
import { RealtimeMonitor } from '../ui/realtime-monitor';
import { WebSocketDebug } from '../ui/websocket-debug';
import { SystemStatus } from '../ui/system-status';

export function NetworkDashboard() {
  const [mounted, setMounted] = useState(false);

  const {
    devices,
    folders,
    metrics,
    bandwidthHistory,
    alerts,
    systemHealth,
    selectedFolderId,
    sidebarCollapsed,
    rootFolderExpanded,
    othersExpanded,
    useApi,
    apiConnected,
    setSidebarCollapsed,
    setSelectedFolder,
    addDevice,
    updateDevice,
    deleteDevice,
    addFolder,
    updateFolder,
    deleteFolder,
    refreshData,
    exportData,
    resetToMockData,
    initializeApi,
  } = useNetworkStore();

  const [deviceModalOpen, setDeviceModalOpen] = useState(false);
  const [folderModalOpen, setFolderModalOpen] = useState(false);
  const [editingDevice, setEditingDevice] = useState<string | null>(null);
  const [editingFolder, setEditingFolder] = useState<string | null>(null);
  const [folderParentId, setFolderParentId] = useState<string>('root');
  const [deviceFolderId, setDeviceFolderId] = useState<string>('root');

  // Исправление hydration error и инициализация API
  useEffect(() => {
    setMounted(true);

    // Пробуем подключиться к API при загрузке
    const initApi = async () => {
      try {
        await initializeApi();
      } catch (error) {
        console.error('Ошибка инициализации API:', error);
      }
    };

    initApi();
  }, [initializeApi]);

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="text-white">Загрузка...</div>
      </div>
    );
  }

  const handleAddDevice = () => {
    setEditingDevice(null);
    setDeviceFolderId(selectedFolderId || 'root');
    setDeviceModalOpen(true);
  };

  const handleAddDeviceToFolder = (folderId: string) => {
    setEditingDevice(null);
    setDeviceFolderId(folderId);
    setDeviceModalOpen(true);
  };

  const handleEditDevice = (deviceId: string) => {
    setEditingDevice(deviceId);
    setDeviceModalOpen(true);
  };

  const handleDeleteDevice = (deviceId: string) => {
    if (confirm('Вы уверены, что хотите удалить это устройство?')) {
      deleteDevice(deviceId);
    }
  };

  const handleAddFolder = (parentId: string) => {
    setEditingFolder(null);
    setFolderParentId(parentId);
    setFolderModalOpen(true);
  };

  const handleEditFolder = (folderId: string) => {
    setEditingFolder(folderId);
    setFolderModalOpen(true);
  };

  const handleDeleteFolder = (folderId: string) => {
    if (
      confirm(
        'Вы уверены, что хотите удалить эту папку? Все устройства будут перемещены в корневую папку.'
      )
    ) {
      deleteFolder(folderId);
    }
  };

  const handleRefreshData = () => {
    refreshData();
  };

  const handleCreateBackup = () => {
    const data = exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `network-monitor-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getEditingDevice = () => {
    return editingDevice
      ? devices.find((d) => d.id === editingDevice)
      : undefined;
  };

  const getEditingFolder = () => {
    if (!editingFolder) return undefined;

    const findFolder = (folders: any[]): any => {
      for (const folder of folders) {
        if (folder.id === editingFolder) return folder;
        if (folder.children) {
          const found = findFolder(folder.children);
          if (found) return found;
        }
      }
      return undefined;
    };

    return findFolder(folders);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Sidebar */}
      <div
        className={`${sidebarCollapsed ? 'w-16' : 'w-80'} flex flex-col border-r border-slate-700/50 bg-slate-800/30 backdrop-blur-sm transition-all duration-300`}
      >
        <div className="border-b border-slate-700/50 p-4">
          <div className="flex items-center justify-between">
            {!sidebarCollapsed && (
              <div className="flex min-w-0 flex-1 items-center space-x-2">
                <FolderOpen className="h-4 w-4 flex-shrink-0 text-blue-400" />
                <h2 className="truncate text-sm font-semibold text-white">
                  Папки устройств
                </h2>
              </div>
            )}
            <div className="flex flex-shrink-0 items-center space-x-0.5">
              {!sidebarCollapsed && (
                <>
                  <button
                    onClick={handleAddDevice}
                    className="rounded p-1 text-slate-400 transition-colors hover:bg-slate-700/50 hover:text-green-400"
                    title="Добавить устройство"
                  >
                    <Monitor className="h-3 w-3" />
                  </button>
                  <button
                    onClick={() => handleAddFolder('root')}
                    className="rounded p-1 text-slate-400 transition-colors hover:bg-slate-700/50 hover:text-blue-400"
                    title="Добавить папку"
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                  <button
                    onClick={resetToMockData}
                    className="rounded p-1 text-slate-400 transition-colors hover:bg-slate-700/50 hover:text-yellow-400"
                    title="Сбросить к исходным данным"
                  >
                    <RefreshCw className="h-3 w-3" />
                  </button>
                </>
              )}
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className={`rounded p-1.5 transition-colors ${
                  sidebarCollapsed
                    ? 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30'
                    : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
                }`}
                title={sidebarCollapsed ? 'Развернуть папки' : 'Свернуть папки'}
              >
                <FolderOpen className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {!sidebarCollapsed && (
          <div className="flex-1 overflow-y-auto p-4">
            <FolderTree
              folders={folders}
              devices={devices}
              selectedFolderId={selectedFolderId}
              rootFolderExpanded={rootFolderExpanded}
              othersExpanded={othersExpanded}
              onFolderSelect={setSelectedFolder}
              onFolderToggle={(folderId) => {
                if (folderId === 'root') {
                  updateFolder('root', { expanded: !rootFolderExpanded });
                } else if (folderId === 'others') {
                  updateFolder('others', { expanded: !othersExpanded });
                } else {
                  // Рекурсивный поиск папки
                  const findFolder = (folders: any[]): any => {
                    for (const folder of folders) {
                      if (folder.id === folderId) return folder;
                      if (folder.children && folder.children.length > 0) {
                        const found = findFolder(folder.children);
                        if (found) return found;
                      }
                    }
                    return null;
                  };

                  const folder = findFolder(folders);
                  if (folder) {
                    updateFolder(folderId, { expanded: !folder.expanded });
                  }
                }
              }}
              onAddFolder={handleAddFolder}
              onEditFolder={handleEditFolder}
              onDeleteFolder={handleDeleteFolder}
              onAddDeviceToFolder={handleAddDeviceToFolder}
            />
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <header className="sticky top-0 z-50 border-b border-slate-700/50 bg-slate-800/50 backdrop-blur-sm">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="rounded-lg border border-blue-500/20 bg-blue-500/10 p-2">
                  <Network className="h-8 w-8 text-blue-400" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">
                    Network Monitor Pro
                  </h1>
                  <p className="text-sm text-slate-400">
                    Панель мониторинга сети в реальном времени
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-sm text-slate-400">
                  <div className="h-2 w-2 animate-pulse rounded-full bg-green-500"></div>
                  <span>Live</span>
                </div>
                <button
                  onClick={handleRefreshData}
                  className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-700/50 hover:text-white"
                >
                  <RefreshCw className="h-5 w-5" />
                </button>
                <button className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-700/50 hover:text-white">
                  <Settings className="h-5 w-5" />
                </button>
                <button
                  onClick={handleCreateBackup}
                  className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-700/50 hover:text-white"
                  title="Создать резервную копию"
                >
                  <Download className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto px-2 py-6 sm:px-4 lg:px-6">
          {/* Key Metrics */}
          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
            <MetricsCard
              title="Всего устройств"
              value={metrics.totalDevices}
              icon={Server}
              color="blue"
            />
            <MetricsCard
              title="Устройства онлайн"
              value={metrics.onlineDevices}
              icon={Activity}
              color="green"
            />
            <MetricsCard
              title="Предупреждения"
              value={metrics.warningDevices}
              icon={AlertTriangle}
              color="yellow"
            />
            <MetricsCard
              title="Время отклика"
              value={`${metrics.averageResponseTime}ms`}
              icon={Clock}
              color="purple"
            />
            <MetricsCard
              title="Время работы сети"
              value={`${metrics.networkUptime}%`}
              icon={Shield}
              color="green"
            />
          </div>

          {/* Real-time Monitor and Debug */}
          <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
            <RealtimeMonitor />
            <WebSocketDebug />
            <SystemStatus />
          </div>

          {/* Main Dashboard Grid */}
          <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Bandwidth Chart */}
            <div className="lg:col-span-2">
              <BandwidthChart />
            </div>

            {/* System Health */}
            <div>
              <SystemHealthCard />
            </div>
          </div>

          {/* Network Topology */}
          <div className="mb-6">
            <NetworkTopology />
          </div>

          {/* Devices and Alerts */}
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-4">
            {/* Device Grid */}
            <div className="xl:col-span-3">
              <DevicesSection
                onAddDevice={handleAddDevice}
                onEditDevice={handleEditDevice}
                onDeleteDevice={handleDeleteDevice}
              />
            </div>

            {/* Alerts Panel */}
            <div className="xl:col-span-1">
              <AlertsPanel />
            </div>
          </div>
        </main>
      </div>

      {/* Modals */}
      <DeviceModal
        isOpen={deviceModalOpen}
        onClose={() => setDeviceModalOpen(false)}
        onSave={(deviceData) => {
          if (editingDevice) {
            updateDevice(editingDevice, deviceData);
          } else {
            addDevice(deviceData);
          }
          setEditingDevice(null);
        }}
        device={getEditingDevice()}
        folders={folders}
        defaultFolderId={deviceFolderId}
      />

      <FolderModal
        isOpen={folderModalOpen}
        onClose={() => setFolderModalOpen(false)}
        onSave={(folderData) => {
          if (editingFolder) {
            updateFolder(editingFolder, folderData);
          } else {
            addFolder(folderData);
          }
          setEditingFolder(null);
        }}
        folder={getEditingFolder()}
        parentId={folderParentId}
        folders={folders}
      />
    </div>
  );
}
