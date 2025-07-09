import React from 'react';
import { NetworkDevice } from '../types/network';
import { 
  Router, 
  Server, 
  Monitor, 
  Printer, 
  Smartphone, 
  Network,
  Wifi,
  Shield,
  Circle,
  AlertTriangle,
  Edit,
  Trash2,
  MoreVertical
} from 'lucide-react';

interface DeviceCardProps {
  device: NetworkDevice;
  onEdit: (deviceId: string) => void;
  onDelete: (deviceId: string) => void;
}

const deviceIcons = {
  router: Router,
  switch: Network,
  server: Server,
  workstation: Monitor,
  printer: Printer,
  mobile: Smartphone,
  firewall: Shield,
  access_point: Wifi
};

const statusColors = {
  online: 'text-green-400 bg-green-500/10 border-green-500/20',
  offline: 'text-red-400 bg-red-500/10 border-red-500/20',
  warning: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20'
};

export const DeviceCard: React.FC<DeviceCardProps> = ({ device, onEdit, onDelete }) => {
  const Icon = deviceIcons[device.type];
  const [showActions, setShowActions] = React.useState(false);
  
  return (
    <div 
      className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 hover:bg-gray-800/70 transition-all duration-300 relative"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg border ${statusColors[device.status]}`}>
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-medium text-white">{device.name}</h3>
            <p className="text-sm text-gray-400">{device.ip}</p>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <Circle className={`h-3 w-3 ${
            device.status === 'online' ? 'text-green-400 fill-green-400' :
            device.status === 'offline' ? 'text-red-400 fill-red-400' :
            'text-yellow-400 fill-yellow-400'
          }`} />
          {device.status === 'warning' && (
            <AlertTriangle className="h-4 w-4 text-yellow-400" />
          )}
        </div>
      </div>

      {/* Actions Menu */}
      {showActions && (
        <div className="absolute top-2 right-2 bg-gray-700/90 backdrop-blur-sm rounded-lg border border-gray-600/50 p-1">
          <div className="flex items-center space-x-1">
            <button
              onClick={() => onEdit(device.id)}
              className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-600/50 rounded transition-colors"
              title="Edit device"
            >
              <Edit className="h-3 w-3" />
            </button>
            <button
              onClick={() => onDelete(device.id)}
              className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-gray-600/50 rounded transition-colors"
              title="Delete device"
            >
              <Trash2 className="h-3 w-3" />
            </button>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <p className="text-gray-400">Response Time</p>
          <p className="font-medium text-white">{device.responseTime}ms</p>
        </div>
        <div>
          <p className="text-gray-400">Uptime</p>
          <p className="font-medium text-white">{device.uptime.toFixed(1)}%</p>
        </div>
        <div>
          <p className="text-gray-400">Location</p>
          <p className="font-medium text-white">{device.location || 'Unknown'}</p>
        </div>
        <div>
          <p className="text-gray-400">Vendor</p>
          <p className="font-medium text-white">{device.vendor || 'Unknown'}</p>
        </div>
        <div>
          <p className="text-gray-400">Model</p>
          <p className="font-medium text-white">{device.location || 'Unknown'}</p>
        </div>
        <div>
          <p className="text-gray-400">Last Seen</p>
          <p className="font-medium text-white">
            {device.lastSeen.toLocaleTimeString()}
          </p>
        </div>
      </div>
    </div>
  );
};