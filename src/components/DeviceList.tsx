import React, { useState } from 'react';
import { NetworkDevice } from '../types/network';
import { DeviceCard } from './DeviceCard';
import { 
  Search, 
  Filter, 
  Plus, 
  Download, 
  Upload,
  Grid3X3,
  List,
  SortAsc,
  SortDesc
} from 'lucide-react';

interface DeviceListProps {
  devices: NetworkDevice[];
  selectedFolderId?: string;
  onAddDevice: () => void;
  onEditDevice: (deviceId: string) => void;
  onDeleteDevice: (deviceId: string) => void;
}

type SortField = 'name' | 'ip' | 'status' | 'responseTime' | 'uptime' | 'lastSeen';
type ViewMode = 'grid' | 'list';

export const DeviceList: React.FC<DeviceListProps> = ({
  devices,
  selectedFolderId,
  onAddDevice,
  onEditDevice,
  onDeleteDevice
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  // Filter devices
  const filteredDevices = devices.filter(device => {
    const matchesSearch = device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         device.ip.includes(searchTerm) ||
                         (device.location && device.location.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || device.status === statusFilter;
    const matchesType = typeFilter === 'all' || device.type === typeFilter;
    const matchesFolder = !selectedFolderId || selectedFolderId === 'root' || device.folderId === selectedFolderId;

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

  const deviceTypes = [...new Set(devices.map(d => d.type))];
  const onlineCount = filteredDevices.filter(d => d.status === 'online').length;
  const offlineCount = filteredDevices.filter(d => d.status === 'offline').length;
  const warningCount = filteredDevices.filter(d => d.status === 'warning').length;

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white">Network Devices</h3>
          <div className="flex items-center space-x-4 text-sm mt-1">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-gray-400">Online: {onlineCount}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-gray-400">Offline: {offlineCount}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-gray-400">Warning: {warningCount}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-colors"
            title={`Switch to ${viewMode === 'grid' ? 'list' : 'grid'} view`}
          >
            {viewMode === 'grid' ? <List className="h-5 w-5" /> : <Grid3X3 className="h-5 w-5" />}
          </button>
          <button
            onClick={onAddDevice}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Add Device</span>
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search devices..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
        >
          <option value="all">All Status</option>
          <option value="online">Online</option>
          <option value="offline">Offline</option>
          <option value="warning">Warning</option>
        </select>

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="px-4 py-2 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
        >
          <option value="all">All Types</option>
          {deviceTypes.map(type => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>

        <div className="flex items-center space-x-2">
          <select
            value={sortField}
            onChange={(e) => setSortField(e.target.value as SortField)}
            className="flex-1 px-4 py-2 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          >
            <option value="name">Name</option>
            <option value="ip">IP Address</option>
            <option value="status">Status</option>
            <option value="responseTime">Response Time</option>
            <option value="uptime">Uptime</option>
            <option value="lastSeen">Last Seen</option>
          </select>
          <button
            onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-colors"
          >
            {sortDirection === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Device Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
          {sortedDevices.map((device) => (
            <DeviceCard 
              key={device.id} 
              device={device}
              onEdit={onEditDevice}
              onDelete={onDeleteDevice}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 p-3 bg-gray-700/30 rounded-lg text-sm font-medium text-gray-300">
            <div className="col-span-3 cursor-pointer" onClick={() => handleSort('name')}>
              Name {sortField === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
            </div>
            <div className="col-span-2 cursor-pointer" onClick={() => handleSort('ip')}>
              IP Address {sortField === 'ip' && (sortDirection === 'asc' ? '↑' : '↓')}
            </div>
            <div className="col-span-1 cursor-pointer" onClick={() => handleSort('status')}>
              Status {sortField === 'status' && (sortDirection === 'asc' ? '↑' : '↓')}
            </div>
            <div className="col-span-1">Type</div>
            <div className="col-span-2 cursor-pointer" onClick={() => handleSort('responseTime')}>
              Response {sortField === 'responseTime' && (sortDirection === 'asc' ? '↑' : '↓')}
            </div>
            <div className="col-span-2 cursor-pointer" onClick={() => handleSort('uptime')}>
              Uptime {sortField === 'uptime' && (sortDirection === 'asc' ? '↑' : '↓')}
            </div>
            <div className="col-span-1">Actions</div>
          </div>

          {/* Table Rows */}
          {sortedDevices.map((device) => (
            <div key={device.id} className="grid grid-cols-12 gap-4 p-3 bg-gray-800/30 hover:bg-gray-700/30 rounded-lg text-sm transition-colors">
              <div className="col-span-3 text-white font-medium">{device.name}</div>
              <div className="col-span-2 text-gray-300">{device.ip}</div>
              <div className="col-span-1">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  device.status === 'online' ? 'bg-green-500/20 text-green-400' :
                  device.status === 'offline' ? 'bg-red-500/20 text-red-400' :
                  'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {device.status}
                </span>
              </div>
              <div className="col-span-1 text-gray-300 capitalize">{device.type}</div>
              <div className="col-span-2 text-gray-300">{device.responseTime}ms</div>
              <div className="col-span-2 text-gray-300">{device.uptime.toFixed(1)}%</div>
              <div className="col-span-1">
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => onEditDevice(device.id)}
                    className="p-1 text-gray-400 hover:text-white hover:bg-gray-600/50 rounded"
                  >
                    <Edit className="h-3 w-3" />
                  </button>
                  <button
                    onClick={() => onDeleteDevice(device.id)}
                    className="p-1 text-gray-400 hover:text-red-400 hover:bg-gray-600/50 rounded"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {sortedDevices.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-2">No devices found</div>
          <div className="text-sm text-gray-500">
            {searchTerm || statusFilter !== 'all' || typeFilter !== 'all' 
              ? 'Try adjusting your filters' 
              : 'Add your first device to get started'
            }
          </div>
        </div>
      )}
    </div>
  );
};