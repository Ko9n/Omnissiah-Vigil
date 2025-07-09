import { useState, useEffect } from 'react';
import { NetworkDevice, NetworkMetrics, BandwidthData, AlertMessage, SystemHealth, DeviceFolder } from '../types/network';
import { dataService } from '../services/dataService';

const generateBandwidthData = (): BandwidthData => ({
  timestamp: new Date(),
  upload: Math.floor(Math.random() * 100) + 20,
  download: Math.floor(Math.random() * 200) + 50,
  total: Math.floor(Math.random() * 300) + 100
});

const generateAlert = (id: string): AlertMessage => {
  const types: AlertMessage['type'][] = ['critical', 'warning', 'info'];
  const messages = [
    'High bandwidth usage detected',
    'Device connection lost',
    'System update available',
    'Network latency increased',
    'Security scan completed'
  ];
  
  return {
    id,
    type: types[Math.floor(Math.random() * types.length)],
    message: messages[Math.floor(Math.random() * messages.length)],
    timestamp: new Date(),
    resolved: Math.random() > 0.7
  };
};

export const useNetworkData = () => {
  const [devices, setDevices] = useState<NetworkDevice[]>([]);
  const [folders, setFolders] = useState<DeviceFolder[]>([]);
  const [metrics, setMetrics] = useState<NetworkMetrics>({
    totalDevices: 0,
    onlineDevices: 0,
    offlineDevices: 0,
    warningDevices: 0,
    averageResponseTime: 0,
    totalBandwidth: 1000,
    usedBandwidth: 0,
    packetLoss: 0,
    networkUptime: 99.9,
    lastUpdate: new Date()
  });
  const [bandwidthHistory, setBandwidthHistory] = useState<BandwidthData[]>([]);
  const [alerts, setAlerts] = useState<AlertMessage[]>([]);
  const [systemHealth, setSystemHealth] = useState<SystemHealth>({
    cpu: 45,
    memory: 62,
    disk: 78,
    network: 34,
    temperature: 42
  });

  // Initialize data
  useEffect(() => {
    // Load data from service
    setDevices(dataService.getDevices());
    setFolders(dataService.getFolders());

    const initialBandwidth = Array.from({ length: 20 }, () => generateBandwidthData());
    setBandwidthHistory(initialBandwidth);

    const initialAlerts = Array.from({ length: 8 }, (_, i) => generateAlert(`alert-${i}`));
    setAlerts(initialAlerts);
  }, []);

  // Update metrics based on devices
  useEffect(() => {
    if (devices.length > 0) {
      const onlineDevices = devices.filter(d => d.status === 'online').length;
      const offlineDevices = devices.filter(d => d.status === 'offline').length;
      const warningDevices = devices.filter(d => d.status === 'warning').length;
      const avgResponseTime = devices.reduce((sum, d) => sum + d.responseTime, 0) / devices.length;

      setMetrics(prev => ({
        ...prev,
        totalDevices: devices.length,
        onlineDevices,
        offlineDevices,
        warningDevices,
        averageResponseTime: Math.round(avgResponseTime),
        usedBandwidth: Math.floor(Math.random() * 800) + 200,
        packetLoss: Math.random() * 2,
        lastUpdate: new Date()
      }));
    }
  }, [devices]);

  // Real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Update system health from service
      dataService.getSystemHealth().then(setSystemHealth);

      // Update bandwidth data
      setBandwidthHistory(prev => {
        const newData = [...prev.slice(1), generateBandwidthData()];
        return newData;
      });

      // Occasionally update device status
      if (Math.random() < 0.1) {
        // Ping random devices
        const randomDevice = devices[Math.floor(Math.random() * devices.length)];
        if (randomDevice) {
          dataService.pingDevice(randomDevice.id).then(() => {
            setDevices(dataService.getDevices());
          });
        }
      }

      // Add new alerts occasionally
      if (Math.random() < 0.05) {
        const newAlert = generateAlert(`alert-${Date.now()}`);
        setAlerts(prev => [newAlert, ...prev].slice(0, 10));
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [devices]);

  return {
    devices,
    folders,
    metrics,
    bandwidthHistory,
    alerts,
    systemHealth,
    // Device management functions
    addDevice: (device: NetworkDevice) => {
      dataService.addDevice(device);
      setDevices(dataService.getDevices());
    },
    updateDevice: (deviceId: string, updates: Partial<NetworkDevice>) => {
      dataService.updateDevice(deviceId, updates);
      setDevices(dataService.getDevices());
    },
    deleteDevice: (deviceId: string) => {
      dataService.deleteDevice(deviceId);
      setDevices(dataService.getDevices());
    },
    // Folder management functions
    addFolder: (folder: DeviceFolder) => {
      dataService.addFolder(folder);
      setFolders(dataService.getFolders());
    },
    deleteFolder: (folderId: string) => {
      dataService.deleteFolder(folderId);
      setFolders(dataService.getFolders());
      setDevices(dataService.getDevices());
    },
    updateFolder: (folderId: string, updates: Partial<DeviceFolder>) => {
      dataService.updateFolder(folderId, updates);
      setFolders(dataService.getFolders());
    },
    refreshData: () => {
      setDevices(dataService.getDevices());
      setFolders(dataService.getFolders());
    },
    // Data management
    exportData: () => dataService.exportData(),
    importData: (jsonData: string) => {
      if (dataService.importData(jsonData)) {
        setDevices(dataService.getDevices());
        setFolders(dataService.getFolders());
        return true;
      }
      return false;
    },
    createBackup: () => dataService.createBackup()
  };
};