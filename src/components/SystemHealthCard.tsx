import React from 'react';
import { SystemHealth } from '../types/network';
import { Cpu, HardDrive, MemoryStick, Thermometer, Network } from 'lucide-react';

interface SystemHealthCardProps {
  health: SystemHealth;
}

const healthItems = [
  { key: 'cpu' as keyof SystemHealth, label: 'CPU Usage', icon: Cpu, unit: '%' },
  { key: 'memory' as keyof SystemHealth, label: 'Memory', icon: MemoryStick, unit: '%' },
  { key: 'disk' as keyof SystemHealth, label: 'Disk Usage', icon: HardDrive, unit: '%' },
  { key: 'network' as keyof SystemHealth, label: 'Network', icon: Network, unit: '%' },
  { key: 'temperature' as keyof SystemHealth, label: 'Temperature', icon: Thermometer, unit: '°C' }
];

const getHealthColor = (value: number, isTemperature = false) => {
  if (isTemperature) {
    if (value < 40) return 'text-green-400 bg-green-500/10';
    if (value < 60) return 'text-yellow-400 bg-yellow-500/10';
    return 'text-red-400 bg-red-500/10';
  } else {
    if (value < 50) return 'text-green-400 bg-green-500/10';
    if (value < 80) return 'text-yellow-400 bg-yellow-500/10';
    return 'text-red-400 bg-red-500/10';
  }
};

export const SystemHealthCard: React.FC<SystemHealthCardProps> = ({ health }) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-white mb-6">System Health</h3>
      
      <div className="space-y-4">
        {healthItems.map(({ key, label, icon: Icon, unit }) => {
          const value = health[key];
          const isTemperature = key === 'temperature';
          const colorClass = getHealthColor(value, isTemperature);
          
          return (
            <div key={key} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${colorClass}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium text-gray-300">{label}</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-24 bg-gray-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      isTemperature 
                        ? value < 40 ? 'bg-green-500' : value < 60 ? 'bg-yellow-500' : 'bg-red-500'
                        : value < 50 ? 'bg-green-500' : value < 80 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${isTemperature ? (value / 80) * 100 : value}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-white w-12 text-right">
                  {Math.round(value)}{unit}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};