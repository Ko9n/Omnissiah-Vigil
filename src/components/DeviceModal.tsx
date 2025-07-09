import React, { useState, useEffect } from 'react';
import { NetworkDevice, DeviceFolder } from '../types/network';
import { 
  X, 
  Router, 
  Server, 
  Monitor, 
  Printer, 
  Smartphone, 
  Network,
  Wifi,
  Shield
} from 'lucide-react';

interface DeviceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (device: NetworkDevice) => void;
  device?: NetworkDevice;
  folders: DeviceFolder[];
  defaultFolderId?: string;
}

const deviceTypes = [
  { value: 'router', label: 'Router', icon: Router },
  { value: 'switch', label: 'Switch', icon: Network },
  { value: 'server', label: 'Server', icon: Server },
  { value: 'workstation', label: 'Workstation', icon: Monitor },
  { value: 'printer', label: 'Printer', icon: Printer },
  { value: 'mobile', label: 'Mobile Device', icon: Smartphone },
  { value: 'firewall', label: 'Firewall', icon: Shield },
  { value: 'access_point', label: 'Access Point', icon: Wifi }
];

export const DeviceModal: React.FC<DeviceModalProps> = ({
  isOpen,
  onClose,
  onSave,
  device,
  folders,
  defaultFolderId
}) => {
  const [formData, setFormData] = useState<Partial<NetworkDevice>>({
    name: '',
    ip: '',
    mac: '',
    type: 'workstation',
    status: 'offline',
    location: '',
    folderId: 'root',
    vendor: '',
    model: '',
    osVersion: '',
    monitoring: {
      ping: true,
      snmp: false,
      http: false,
      ssh: false
    }
  });

  useEffect(() => {
    if (device) {
      setFormData(device);
    } else {
      setFormData({
        name: '',
        ip: '',
        mac: '',
        type: 'workstation',
        status: 'offline',
        location: '',
        folderId: defaultFolderId || 'root',
        vendor: '',
        model: '',
        osVersion: '',
        monitoring: {
          ping: true,
          snmp: false,
          http: false,
          ssh: false
        }
      });
    }
  }, [device, isOpen, defaultFolderId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newDevice: NetworkDevice = {
      id: device?.id || `device-${Date.now()}`,
      name: formData.name || '',
      ip: formData.ip || '',
      mac: formData.mac,
      type: formData.type as NetworkDevice['type'],
      status: 'offline',
      lastSeen: new Date(),
      responseTime: 0,
      uptime: 0,
      location: formData.location,
      folderId: formData.folderId || 'root',
      vendor: formData.vendor,
      model: formData.model,
      osVersion: formData.osVersion,
      monitoring: formData.monitoring || {
        ping: true,
        snmp: false,
        http: false,
        ssh: false
      }
    };

    onSave(newDevice);
    onClose();
  };

  const getAllFolders = (folders: DeviceFolder[], prefix = ''): Array<{id: string, name: string}> => {
    let result: Array<{id: string, name: string}> = [];
    
    folders.forEach(folder => {
      result.push({
        id: folder.id,
        name: prefix + folder.name
      });
      
      if (folder.children && folder.children.length > 0) {
        result = result.concat(getAllFolders(folder.children, prefix + folder.name + ' / '));
      }
    });
    
    return result;
  };

  if (!isOpen) return null;

  const flatFolders = getAllFolders(folders);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">
            {device ? 'Edit Device' : 'Add New Device'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Device Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter device name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                IP Address *
              </label>
              <input
                type="text"
                required
                value={formData.ip}
                onChange={(e) => setFormData(prev => ({ ...prev, ip: e.target.value }))}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="192.168.1.100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                MAC Address
              </label>
              <input
                type="text"
                value={formData.mac || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, mac: e.target.value }))}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="00:1B:44:11:3A:B7"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Device Type *
              </label>
              <select
                required
                value={formData.type}
                onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as NetworkDevice['type'] }))}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {deviceTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Location
              </label>
              <input
                type="text"
                value={formData.location || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Server Room, Floor 1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Folder *
              </label>
              <select
                required
                value={formData.folderId}
                onChange={(e) => setFormData(prev => ({ ...prev, folderId: e.target.value }))}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {flatFolders.map(folder => (
                  <option key={folder.id} value={folder.id}>
                    {folder.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Device Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Vendor
              </label>
              <input
                type="text"
                value={formData.vendor || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, vendor: e.target.value }))}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Cisco, HP, Dell"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Model
              </label>
              <input
                type="text"
                value={formData.model || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, model: e.target.value }))}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Model number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                OS Version
              </label>
              <input
                type="text"
                value={formData.osVersion || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, osVersion: e.target.value }))}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Windows 10, Ubuntu 22.04"
              />
            </div>
          </div>

          {/* Monitoring Options */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Monitoring Options
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(formData.monitoring || {}).map(([key, value]) => (
                <label key={key} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      monitoring: {
                        ...prev.monitoring!,
                        [key]: e.target.checked
                      }
                    }))}
                    className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-300 capitalize">{key}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-4 pt-4 border-t border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            >
              {device ? 'Update Device' : 'Add Device'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};