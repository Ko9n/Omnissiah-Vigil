import React from 'react';
import { useState } from 'react';
import { useNetworkData } from './hooks/useNetworkData';
import { MetricsCard } from './components/MetricsCard';
import { DeviceList } from './components/DeviceList';
import { FolderTree } from './components/FolderTree';
import { BandwidthChart } from './components/BandwidthChart';
import { SystemHealthCard } from './components/SystemHealthCard';
import { AlertsPanel } from './components/AlertsPanel';
import { NetworkTopology } from './components/NetworkTopology';
import { DeviceModal } from './components/DeviceModal';
import { FolderModal } from './components/FolderModal';
import { 
  Network, 
  Server, 
  Activity, 
  Zap,
  Shield,
  Clock,
  RefreshCw,
  Settings,
  FolderOpen,
  Download,
  Upload,
  AlertTriangle
} from 'lucide-react';

function App() {
  const { 
    devices, 
    folders, 
    metrics, 
    bandwidthHistory, 
    alerts, 
    systemHealth, 
    addDevice,
    updateFolder,
    addFolder,
    deleteFolder,
    updateDevice,
    deleteDevice,
    refreshData,
    exportData,
    createBackup
  } = useNetworkData();
  
  const [selectedFolderId, setSelectedFolderId] = useState<string>('root');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [deviceModalOpen, setDeviceModalOpen] = useState(false);
  const [folderModalOpen, setFolderModalOpen] = useState(false);
  const [editingDevice, setEditingDevice] = useState<string | null>(null);
  const [editingFolder, setEditingFolder] = useState<string | null>(null);
  const [folderParentId, setFolderParentId] = useState<string>('root');
  const [deviceFolderId, setDeviceFolderId] = useState<string>('root');

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
    if (confirm('Are you sure you want to delete this device?')) {
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
    if (confirm('Are you sure you want to delete this folder? All devices will be moved to the root folder.')) {
      deleteFolder(folderId);
    }
  };

  const getEditingDevice = () => {
    return editingDevice ? devices.find(d => d.id === editingDevice) : undefined;
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex">
      {/* Sidebar */}
      <div className={`${sidebarCollapsed ? 'w-16' : 'w-80'} transition-all duration-300 bg-gray-800/30 backdrop-blur-sm border-r border-gray-700/50 flex flex-col`}>
        <div className="p-4 border-b border-gray-700/50">
          <div className="flex items-center justify-between">
            {!sidebarCollapsed && (
              <div className="flex items-center space-x-2">
                <FolderOpen className="h-5 w-5 text-blue-400" />
                <h2 className="font-semibold text-white">Device Folders</h2>
              </div>
            )}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-colors"
            >
              <FolderOpen className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        {!sidebarCollapsed && (
          <div className="flex-1 p-4 overflow-y-auto">
            <FolderTree
              folders={folders}
              devices={devices}
              selectedFolderId={selectedFolderId}
              onFolderSelect={setSelectedFolderId}
              onFolderToggle={(folderId) => {
                const folder = folders.find(f => f.id === folderId);
                if (folder) {
                  updateFolder(folderId, { expanded: !folder.expanded });
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
      <div className="flex-1 flex flex-col">
      {/* Header */}
      <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700/50 sticky top-0 z-50">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <Network className="h-8 w-8 text-blue-400" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Network Monitor Pro</h1>
                <p className="text-sm text-gray-400">Real-time network monitoring dashboard</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Live</span>
              </div>
              <button
                onClick={refreshData}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-colors"
              >
                <RefreshCw className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-colors">
                <Settings className="h-5 w-5" />
              </button>
              <button
                onClick={createBackup}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-colors"
                title="Create backup"
              >
                <Download className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8 overflow-y-auto">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricsCard
            title="Total Devices"
            value={metrics.totalDevices}
            icon={Server}
            color="blue"
          />
          <MetricsCard
            title="Online Devices"
            value={metrics.onlineDevices}
            icon={Activity}
            color="green"
          />
          <MetricsCard
            title="Warning Devices"
            value={metrics.warningDevices}
            icon={AlertTriangle}
            color="yellow"
          />
          <MetricsCard
            title="Avg Response Time"
            value={`${metrics.averageResponseTime}ms`}
            icon={Clock}
            color="purple"
          />
          <MetricsCard
            title="Network Uptime"
            value={`${metrics.networkUptime}%`}
            icon={Shield}
            color="green"
          />
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Bandwidth Chart */}
          <div className="lg:col-span-2">
            <BandwidthChart data={bandwidthHistory} />
          </div>
          
          {/* System Health */}
          <div>
            <SystemHealthCard health={systemHealth} />
          </div>
        </div>

        {/* Network Topology */}
        <div className="mb-8">
          <NetworkTopology 
            devices={devices} 
            onUpdateDevice={updateDevice}
          />
        </div>

        {/* Devices and Alerts */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Device Grid */}
          <div className="xl:col-span-2">
            <DeviceList 
              devices={devices}
              selectedFolderId={selectedFolderId}
              onAddDevice={handleAddDevice}
              onEditDevice={handleEditDevice}
              onDeleteDevice={handleDeleteDevice}
            />
          </div>
          
          {/* Alerts Panel */}
          <div>
            <AlertsPanel alerts={alerts} />
          </div>
        </div>
      </main>
      </div>

      {/* Modals */}
      <DeviceModal
        isOpen={deviceModalOpen}
        onClose={() => setDeviceModalOpen(false)}
        onSave={(device) => {
          if (editingDevice) {
            updateDevice(editingDevice, device);
          } else {
            addDevice(device);
          }
        }}
        device={getEditingDevice()}
        folders={folders}
        defaultFolderId={deviceFolderId}
      />

      <FolderModal
        isOpen={folderModalOpen}
        onClose={() => setFolderModalOpen(false)}
        onSave={(folder) => {
          if (editingFolder) {
            updateFolder(editingFolder, folder);
          } else {
            addFolder(folder);
          }
        }}
        folder={getEditingFolder()}
        parentId={folderParentId}
        folders={folders}
      />
    </div>
  );
}

export default App;