import { NetworkData, NetworkDevice, DeviceFolder, SystemHealth } from '../types/network';
import networkDataJson from '../data/networkData.json';

class DataService {
  private networkData!: NetworkData;
  private storageKey = 'network-monitor-data';

  constructor() {
    this.loadData();
  }

  async loadData() {
    try {
      const response = await fetch('/api/network-data');
      if (!response.ok) {
        throw new Error('Failed to fetch network data');
      }
      const data = await response.json();
      
      // Преобразуем строки дат в объекты Date
      if (data.devices) {
        data.devices = data.devices.map((device: any) => ({
          ...device,
          lastSeen: device.lastSeen ? new Date(device.lastSeen) : new Date()
        }));
      }
      
      this.networkData = data as NetworkData;
    } catch (error) {
      console.error('Error loading data:', error);
      // Fallback to local data with date conversion
      const localData = { ...networkDataJson };
      
      if (localData.devices) {
        localData.devices = localData.devices.map((device: any) => ({
          ...device,
          lastSeen: device.lastSeen ? new Date(device.lastSeen) : new Date()
        }));
      }
      
      this.networkData = localData as unknown as NetworkData;
    }
  }

  private saveData() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.networkData));
    } catch (error) {
      console.error('Error saving data:', error);
    }
  }

  // Device management
  getDevices(): NetworkDevice[] {
    return this.networkData.devices;
  }

  getDevicesByFolder(folderId: string): NetworkDevice[] {
    return this.networkData.devices.filter(device => device.folderId === folderId);
  }

  addDevice(device: NetworkDevice) {
    this.networkData.devices.push(device);
    this.saveData();
  }

  updateDevice(deviceId: string, updates: Partial<NetworkDevice>) {
    const deviceIndex = this.networkData.devices.findIndex(d => d.id === deviceId);
    if (deviceIndex !== -1) {
      this.networkData.devices[deviceIndex] = { 
        ...this.networkData.devices[deviceIndex], 
        ...updates 
      };
      this.saveData();
    }
  }

  deleteDevice(deviceId: string) {
    this.networkData.devices = this.networkData.devices.filter(d => d.id !== deviceId);
    this.saveData();
  }

  // Folder management
  getFolders(): DeviceFolder[] {
    return this.networkData.folders;
  }

  findFolderById(folderId: string, folders: DeviceFolder[] = this.networkData.folders): DeviceFolder | null {
    for (const folder of folders) {
      if (folder.id === folderId) {
        return folder;
      }
      if (folder.children) {
        const found = this.findFolderById(folderId, folder.children);
        if (found) return found;
      }
    }
    return null;
  }
  addFolder(folder: DeviceFolder) {
    if (!folder.parentId || folder.parentId === 'root') {
      // Add to root level
      this.networkData.folders.push(folder);
    } else {
      // Add to parent folder
      const parent = this.findFolderById(folder.parentId);
      if (parent) {
        if (!parent.children) parent.children = [];
        parent.children.push(folder);
      }
    }
    this.saveData();
  }

  deleteFolder(folderId: string) {
    const deleteFolderRecursive = (folders: DeviceFolder[]): boolean => {
      for (let i = 0; i < folders.length; i++) {
        if (folders[i].id === folderId) {
          // Move devices to root folder before deleting
          this.networkData.devices.forEach(device => {
            if (device.folderId === folderId) {
              device.folderId = 'root';
            }
          });
          folders.splice(i, 1);
          return true;
        }
        if (folders[i].children && deleteFolderRecursive(folders[i].children)) {
          return true;
        }
      }
      return false;
    };

    if (deleteFolderRecursive(this.networkData.folders)) {
      this.saveData();
    }
  }
  updateFolder(folderId: string, updates: Partial<DeviceFolder>) {
    const updateFolderRecursive = (folders: DeviceFolder[]): boolean => {
      for (let folder of folders) {
        if (folder.id === folderId) {
          Object.assign(folder, updates);
          return true;
        }
        if (folder.children && updateFolderRecursive(folder.children)) {
          return true;
        }
      }
      return false;
    };

    if (updateFolderRecursive(this.networkData.folders)) {
      this.saveData();
    }
  }

  // System Health simulation (в реальном приложении это будет API)
  async getSystemHealth(): Promise<SystemHealth> {
    // Симуляция получения данных от системы мониторинга
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          cpu: Math.random() * 100,
          memory: Math.random() * 100,
          disk: Math.random() * 100,
          network: Math.random() * 100,
          temperature: 30 + Math.random() * 40,
          processes: Math.floor(Math.random() * 200) + 50,
          uptime: Math.random() * 30 * 24 * 60 * 60, // up to 30 days in seconds
          lastUpdate: new Date()
        });
      }, 100);
    });
  }

  // Device monitoring simulation
  async pingDevice(deviceId: string): Promise<{ success: boolean; responseTime: number }> {
    const device = this.networkData.devices.find(d => d.id === deviceId);
    if (!device) {
      return { success: false, responseTime: 0 };
    }

    // Simulate ping based on device status
    return new Promise((resolve) => {
      setTimeout(() => {
        const success = device.status === 'online' || (device.status === 'warning' && Math.random() > 0.3);
        const responseTime = success ? Math.random() * 50 + 1 : 0;
        
        if (success) {
          this.updateDevice(deviceId, { 
            responseTime: Math.round(responseTime),
            lastSeen: new Date(),
            status: responseTime > 30 ? 'warning' : 'online'
          });
        } else {
          this.updateDevice(deviceId, { 
            status: 'offline',
            responseTime: 0
          });
        }

        resolve({ success, responseTime: Math.round(responseTime) });
      }, Math.random() * 1000 + 100);
    });
  }

  // SNMP data simulation
  async getSnmpData(deviceId: string): Promise<any> {
    const device = this.networkData.devices.find(d => d.id === deviceId);
    if (!device || !device.monitoring.snmp) {
      return null;
    }

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          sysName: device.name,
          sysDescr: `${device.vendor} ${device.model}`,
          sysUpTime: Math.floor(Math.random() * 1000000),
          ifInOctets: Math.floor(Math.random() * 1000000),
          ifOutOctets: Math.floor(Math.random() * 1000000),
          cpuUsage: Math.random() * 100,
          memoryUsage: Math.random() * 100
        });
      }, 200);
    });
  }

  // Export/Import functionality
  exportData(): string {
    return JSON.stringify(this.networkData, null, 2);
  }

  importData(jsonData: string): boolean {
    try {
      const data = JSON.parse(jsonData);
      this.networkData = data;
      this.saveData();
      return true;
    } catch (error) {
      console.error('Error importing data:', error);
      return false;
    }
  }

  // Backup functionality
  createBackup(): void {
    const backup = {
      ...this.networkData,
      backupDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `network-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}

export const dataService = new DataService();