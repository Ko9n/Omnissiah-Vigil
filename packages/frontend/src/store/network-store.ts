import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { persist } from 'zustand/middleware';
import {
  NetworkDevice,
  DeviceFolder,
  NetworkMetrics,
  BandwidthData,
  AlertMessage,
  SystemHealth,
  NetworkConnection,
  MonitoringConfig,
} from '../types/schemas';

interface SystemLog {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  message: string;
  timestamp: Date;
}
import {
  mockDevices,
  mockFolders,
  mockAlerts,
  initialMetrics,
  initialSystemHealth,
  initialBandwidthHistory,
  initialConfig,
} from '../data/mock-data';
import api from '../lib/api';

interface NetworkStore {
  // State
  devices: NetworkDevice[];
  folders: DeviceFolder[];
  metrics: NetworkMetrics;
  bandwidthHistory: BandwidthData[];
  alerts: AlertMessage[];
  systemHealth: SystemHealth;
  connections: NetworkConnection[];
  config: MonitoringConfig;
  systemLogs: SystemLog[];

  // UI State
  selectedFolderId: string;
  sidebarCollapsed: boolean;
  loading: boolean;
  error: string | null;
  rootFolderExpanded: boolean;
  othersExpanded: boolean;

  // API integration flags
  useApi: boolean;
  apiConnected: boolean;

  // WebSocket state
  webSocketConnected: boolean;

  // Device actions
  addDevice: (
    device: Omit<NetworkDevice, 'id' | 'lastSeen' | 'status'>
  ) => Promise<void>;
  updateDevice: (
    deviceId: string,
    updates: Partial<NetworkDevice>
  ) => Promise<void>;
  deleteDevice: (deviceId: string) => Promise<void>;
  pingDevice: (deviceId: string) => Promise<void>;

  // Folder actions
  addFolder: (folder: Omit<DeviceFolder, 'id' | 'children'>) => Promise<void>;
  updateFolder: (
    folderId: string,
    updates: Partial<DeviceFolder>
  ) => Promise<void>;
  deleteFolder: (folderId: string) => Promise<void>;

  // Alert actions
  addAlert: (alert: Omit<AlertMessage, 'id' | 'timestamp'>) => void;
  markAlertResolved: (alertId: string) => void;
  acknowledgeAlert: (alertId: string, userId: string) => void;
  clearAlerts: () => void;

  // System log actions
  addSystemLog: (log: Omit<SystemLog, 'id' | 'timestamp'>) => void;
  clearSystemLogs: () => void;

  // WebSocket actions
  setWebSocketConnected: (connected: boolean) => void;
  updateDeviceStatus: (
    deviceId: string,
    updates: Partial<NetworkDevice>
  ) => void;

  // Data actions
  setBandwidthData: (data: BandwidthData[]) => void;
  addBandwidthData: (data: BandwidthData) => void;
  updateSystemHealth: (health: SystemHealth) => void;
  updateMetrics: (metrics: Partial<NetworkMetrics>) => void;
  loadDevices: () => Promise<void>;
  loadSystemHealth: () => Promise<void>;
  loadBandwidthData: () => Promise<void>;
  loadNetworkMetrics: () => Promise<void>;

  // UI actions
  setSelectedFolder: (folderId: string) => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setUseApi: (useApi: boolean) => void;

  // Data management
  refreshData: () => Promise<void>;
  exportData: () => string;
  importData: (jsonData: string) => boolean;
  resetData: () => void;
  resetToMockData: () => void;
  setRootFolderExpanded: (expanded: boolean) => void;
  setOthersExpanded: (expanded: boolean) => void;
  initializeApi: () => Promise<void>;
}

export const useNetworkStore = create<NetworkStore>()(
  subscribeWithSelector(
    persist(
      (set, get) => ({
        // Initial state (devices и folders пустые, useApi всегда true)
        devices: [],
        folders: [],
        metrics: initialMetrics,
        bandwidthHistory: initialBandwidthHistory,
        alerts: [],
        systemHealth: initialSystemHealth,
        connections: [],
        config: initialConfig,
        systemLogs: [],

        // UI state
        selectedFolderId: 'root',
        sidebarCollapsed: false,
        loading: false,
        error: null,
        rootFolderExpanded: true,
        othersExpanded: false,

        // API integration flags
        useApi: true,
        apiConnected: false,

        // WebSocket state
        webSocketConnected: false,

        // Device actions
        addDevice: async (deviceData) => {
          try {
            const response = await api.devices.createDevice(deviceData);
            console.log('✅ Устройство создано через API:', response);
            await get().loadDevices();
          } catch (error) {
            set({ error: 'Ошибка создания устройства через API' });
          }
        },
        updateDevice: async (deviceId, updates) => {
          try {
            const response = await api.devices.updateDevice(deviceId, updates);
            console.log('✅ Устройство обновлено через API:', response);
            await get().loadDevices();
          } catch (error) {
            set({ error: 'Ошибка обновления устройства через API' });
          }
        },
        deleteDevice: async (deviceId) => {
          try {
            await api.devices.deleteDevice(deviceId);
            console.log('✅ Устройство удалено через API');
            await get().loadDevices();
          } catch (error) {
            set({ error: 'Ошибка удаления устройства через API' });
          }
        },
        pingDevice: async (deviceId) => {
          try {
            const response = await api.devices.pingDevice(deviceId);
            console.log('🏓 Ping выполнен через API:', response);
            if (response && response.data) {
              const pingData = response.data as any;
              const alive = pingData.alive;
              const responseTime = pingData.responseTime || 0;
              await get().updateDevice(deviceId, {
                status: alive ? 'online' : 'offline',
                responseTime: responseTime,
                lastSeen: new Date(),
              });
            }
          } catch (error) {
            set({ error: 'Ошибка ping через API' });
          }
        },

        // Folder actions
        addFolder: async (folderData) => {
          const folder: DeviceFolder = {
            ...folderData,
            id: Math.random().toString(36).substr(2, 9),
            children: [],
          };

          const addFolderRecursive = (
            folders: DeviceFolder[]
          ): DeviceFolder[] => {
            return folders.map((f) =>
              f.id === (folder.parentId || 'root')
                ? { ...f, children: [...f.children, folder] }
                : { ...f, children: addFolderRecursive(f.children) }
            );
          };

          if (!folder.parentId || folder.parentId === 'root') {
            set((state) => ({
              folders: [...state.folders, folder],
            }));
          } else {
            set((state) => ({
              folders: addFolderRecursive(state.folders),
            }));
          }
        },

        updateFolder: async (folderId, updates) => {
          // Специальная обработка для корневой папки
          if (folderId === 'root') {
            set((state) => ({
              rootFolderExpanded:
                updates.expanded !== undefined
                  ? updates.expanded
                  : state.rootFolderExpanded,
            }));
            return;
          }

          // Специальная обработка для папки "Иные"
          if (folderId === 'others') {
            set((state) => ({
              othersExpanded:
                updates.expanded !== undefined
                  ? updates.expanded
                  : state.othersExpanded,
            }));
            return;
          }

          const updateFolderRecursive = (
            folders: DeviceFolder[]
          ): DeviceFolder[] => {
            return folders.map((folder) =>
              folder.id === folderId
                ? { ...folder, ...updates }
                : {
                    ...folder,
                    children: updateFolderRecursive(folder.children),
                  }
            );
          };

          set((state) => ({
            folders: updateFolderRecursive(state.folders),
          }));
        },

        deleteFolder: async (folderId) => {
          const removeFolderRecursive = (
            folders: DeviceFolder[]
          ): DeviceFolder[] => {
            return folders
              .filter((folder) => folder.id !== folderId)
              .map((folder) => ({
                ...folder,
                children: removeFolderRecursive(folder.children),
              }));
          };

          set((state) => ({
            folders: removeFolderRecursive(state.folders),
            devices: state.devices.map((device) =>
              device.folderId === folderId
                ? { ...device, folderId: 'root' }
                : device
            ),
          }));
        },

        // Alert actions
        addAlert: (alertData) => {
          const alert: AlertMessage = {
            ...alertData,
            id: Math.random().toString(36).substr(2, 9),
            timestamp: new Date(),
          };

          set((state) => ({
            alerts: [alert, ...state.alerts].slice(0, 50), // Keep only last 50 alerts
          }));
        },

        markAlertResolved: (alertId) => {
          set((state) => ({
            alerts: state.alerts.map((alert) =>
              alert.id === alertId ? { ...alert, resolved: true } : alert
            ),
          }));
        },

        acknowledgeAlert: (alertId, userId) => {
          set((state) => ({
            alerts: state.alerts.map((alert) =>
              alert.id === alertId
                ? {
                    ...alert,
                    acknowledgedBy: userId,
                    acknowledgedAt: new Date(),
                  }
                : alert
            ),
          }));
        },

        clearAlerts: () => {
          set({ alerts: [] });
        },

        // Data actions
        setBandwidthData: (data) => {
          set({ bandwidthHistory: data });
        },

        addBandwidthData: (data) => {
          set((state) => ({
            bandwidthHistory: [...state.bandwidthHistory.slice(-19), data],
          }));
        },

        updateSystemHealth: (health) => {
          set({ systemHealth: health });
        },

        updateMetrics: (metricsUpdate) => {
          const state = get();
          const devices = state.devices;

          const totalDevices = devices.length;
          const onlineDevices = devices.filter(
            (d) => d.status === 'online'
          ).length;
          const offlineDevices = devices.filter(
            (d) => d.status === 'offline'
          ).length;
          const warningDevices = devices.filter(
            (d) => d.status === 'warning'
          ).length;
          const averageResponseTime =
            totalDevices > 0
              ? Math.round(
                  devices.reduce((sum, d) => sum + d.responseTime, 0) /
                    totalDevices
                )
              : 0;

          set({
            metrics: {
              ...state.metrics,
              totalDevices,
              onlineDevices,
              offlineDevices,
              warningDevices,
              averageResponseTime,
              lastUpdate: new Date(),
              ...metricsUpdate,
            },
          });
        },

        loadDevices: async () => {
          set({ loading: true, error: null });
          try {
            const response = await api.devices.getDevices();
            console.log('✅ API Response devices:', response);

            // Проверяем формат ответа API
            let devices = [];
            if (response && response.data) {
              // Если ответ в формате { data: [], success: true }
              devices = Array.isArray(response.data) ? response.data : [];
            } else if (Array.isArray(response)) {
              // Если ответ - это просто массив устройств
              devices = response;
            } else {
              console.warn('Неожиданный формат ответа API, используем моки');
              devices = mockDevices;
            }

            console.log('📱 Загружено устройств:', devices.length);
            set({
              devices: devices.length > 0 ? devices : mockDevices,
              loading: false,
              apiConnected: true,
              error: null,
            });
            get().updateMetrics({});
          } catch (error) {
            console.error(
              '❌ API недоступен, используем моковые данные:',
              error
            );
            set({
              devices: mockDevices,
              loading: false,
              error: 'API недоступен, показаны демо-данные',
              apiConnected: false,
            });
            get().updateMetrics({});
          }
        },

        loadSystemHealth: async () => {
          try {
            const response = await api.metrics.getSystemHealth();
            console.log('✅ API Response system health:', response);

            // Простая обработка - пока используем initialSystemHealth и обновляем apiConnected
            set({
              systemHealth: {
                ...initialSystemHealth,
                lastUpdate: new Date(),
              },
              apiConnected: true,
              error: null,
            });

            console.log('💻 Системные метрики обновлены (API подключен)');
          } catch (error) {
            console.error('❌ API недоступен для системного здоровья:', error);
            set({
              systemHealth: initialSystemHealth,
              apiConnected: false,
              error: 'Метрики системы недоступны',
            });
          }
        },

        loadBandwidthData: async () => {
          try {
            const response = await api.metrics.getBandwidthHistory();
            console.log('✅ API Response bandwidth:', response);

            // Обрабатываем данные пропускной способности
            let bandwidthData = initialBandwidthHistory;
            if (response && response.data && Array.isArray(response.data)) {
              bandwidthData = response.data;
            }

            set({
              bandwidthHistory: bandwidthData,
              apiConnected: true,
            });
            console.log('📊 Данные пропускной способности обновлены');
          } catch (error) {
            console.error(
              '❌ API недоступен для данных пропускной способности:',
              error
            );
            set({
              bandwidthHistory: initialBandwidthHistory,
              apiConnected: false,
            });
          }
        },

        loadNetworkMetrics: async () => {
          try {
            const response = await api.metrics.getNetworkMetrics();
            console.log('✅ API Response network metrics:', response);

            // Обрабатываем метрики сети
            let metrics = initialMetrics;
            if (response && response.data) {
              metrics = {
                ...initialMetrics,
                ...response.data,
                lastUpdate: new Date(),
              };
            }

            set({
              metrics,
              apiConnected: true,
            });
            console.log('🌐 Метрики сети обновлены');
          } catch (error) {
            console.error('❌ API недоступен для метрик сети:', error);
            set({
              metrics: initialMetrics,
              apiConnected: false,
            });
          }
        },

        // UI actions
        setSelectedFolder: (folderId) => {
          set({ selectedFolderId: folderId });
        },

        setSidebarCollapsed: (collapsed) => {
          set({ sidebarCollapsed: collapsed });
        },

        setLoading: (loading) => {
          set({ loading });
        },

        setError: (error) => {
          set({ error });
        },

        setUseApi: (useApi) => {
          set({ useApi });
        },

        // Data management
        refreshData: async () => {
          set({ loading: true, error: null });
          try {
            const { useApi } = get();
            if (useApi) {
              // Пробуем загрузить данные с API
              await Promise.allSettled([
                get().loadDevices(),
                get().loadSystemHealth(),
                get().loadBandwidthData(),
                get().loadNetworkMetrics(),
              ]);
            } else {
              // Используем моковые данные
              await new Promise((resolve) => setTimeout(resolve, 500));
              get().updateMetrics({});
            }
            set({ loading: false });
          } catch (error) {
            set({
              loading: false,
              error:
                error instanceof Error
                  ? error.message
                  : 'Ошибка обновления данных',
            });
          }
        },

        // Инициализация API подключения
        initializeApi: async () => {
          console.log('🔌 Попытка подключения к API...');
          try {
            // Проверяем доступность API
            const response = await fetch('http://localhost:5000/api/health');
            if (response.ok) {
              console.log('✅ API доступен! Включаем API режим');
              set({ useApi: true, apiConnected: true });
              await get().refreshData();
            } else {
              console.log('❌ API недоступен, используем моковые данные');
              set({ useApi: false, apiConnected: false });
            }
          } catch (error) {
            console.log('❌ API недоступен, используем моковые данные');
            set({ useApi: false, apiConnected: false });
          }
        },

        exportData: () => {
          const state = get();
          const exportData = {
            devices: state.devices,
            folders: state.folders,
            connections: state.connections,
            config: state.config,
            exportTimestamp: new Date().toISOString(),
          };
          return JSON.stringify(exportData, null, 2);
        },

        importData: (jsonData) => {
          try {
            const data = JSON.parse(jsonData);
            set({
              devices: data.devices || [],
              folders: data.folders || [],
              connections: data.connections || [],
              config: data.config || initialConfig,
            });
            get().updateMetrics({});
            return true;
          } catch {
            return false;
          }
        },

        resetData: () => {
          set({
            devices: [],
            folders: [],
            metrics: initialMetrics,
            bandwidthHistory: [],
            alerts: [],
            systemHealth: initialSystemHealth,
            connections: [],
            selectedFolderId: 'root',
            loading: false,
            error: null,
          });
        },

        resetToMockData: () => {
          set({
            devices: mockDevices,
            folders: mockFolders,
            metrics: initialMetrics,
            bandwidthHistory: initialBandwidthHistory,
            alerts: mockAlerts,
            systemHealth: initialSystemHealth,
            connections: [],
            selectedFolderId: 'root',
            loading: false,
            error: null,
            rootFolderExpanded: true,
            othersExpanded: false,
          });
          get().updateMetrics({});
        },

        setRootFolderExpanded: (expanded) => {
          set({ rootFolderExpanded: expanded });
        },

        setOthersExpanded: (expanded) => {
          set({ othersExpanded: expanded });
        },

        // System log actions
        addSystemLog: (log) => {
          const systemLog: SystemLog = {
            ...log,
            id: Date.now().toString(),
            timestamp: new Date(),
          };

          set((state) => ({
            systemLogs: [systemLog, ...state.systemLogs].slice(0, 100), // Keep only last 100 logs
          }));
        },

        clearSystemLogs: () => {
          set({ systemLogs: [] });
        },

        // WebSocket actions
        setWebSocketConnected: (connected) => {
          set({ webSocketConnected: connected });
        },

        updateDeviceStatus: (deviceId, updates) => {
          set((state) => ({
            devices: state.devices.map((device) =>
              device.id === deviceId
                ? { ...device, ...updates, lastSeen: new Date() }
                : device
            ),
          }));
          get().updateMetrics({});
        },
      }),
      {
        name: 'network-monitor-storage',
        partialize: (state) => ({
          selectedFolderId: state.selectedFolderId,
          sidebarCollapsed: state.sidebarCollapsed,
          rootFolderExpanded: state.rootFolderExpanded,
          othersExpanded: state.othersExpanded,
        }),
      }
    )
  )
);
