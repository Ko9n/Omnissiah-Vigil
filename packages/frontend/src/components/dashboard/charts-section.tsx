'use client';

import { useNetworkStore } from '@/store/network-store';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  Activity,
  Cpu,
  HardDrive,
  MemoryStick,
  Thermometer,
  Zap
} from 'lucide-react';
import { Card } from '@/components/ui/card';
// Simple Progress component
function Progress({ value, className }: { value: number; className?: string }) {
  return (
    <div className={`w-full bg-slate-600/30 rounded-full overflow-hidden ${className}`}>
      <div 
        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 ease-out"
        style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }}
      />
    </div>
  );
}

function BandwidthChart() {
  const { bandwidthHistory } = useNetworkStore();
  
  if (bandwidthHistory.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-slate-400">
        Загрузка данных графика...
      </div>
    );
  }

  const maxValue = Math.max(...bandwidthHistory.map(d => Math.max(d.upload, d.download, d.total)));
  const chartHeight = 200;

  const currentData = bandwidthHistory[bandwidthHistory.length - 1];
  const previousData = bandwidthHistory[bandwidthHistory.length - 2];
  
  const uploadTrend = currentData && previousData ? 
    currentData.upload - previousData.upload : 0;
  const downloadTrend = currentData && previousData ? 
    currentData.download - previousData.download : 0;

  return (
    <div className="space-y-6">
      {/* Header with Legend */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Пропускная способность</h3>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-slate-400">Загрузка</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-slate-400">Скачивание</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
            <span className="text-slate-400">Общий</span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="relative bg-slate-700/20 rounded-lg p-4" style={{ height: chartHeight + 40 }}>
        <svg width="100%" height="100%" className="overflow-visible">
          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => (
            <line
              key={index}
              x1="0%"
              y1={chartHeight * ratio}
              x2="100%"
              y2={chartHeight * ratio}
              stroke="#374151"
              strokeWidth="1"
              opacity="0.3"
            />
          ))}
          
          {/* Data lines */}
          {bandwidthHistory.map((point, index) => {
            if (index === 0) return null;
            
            const x = (index / (bandwidthHistory.length - 1)) * 100;
            const prevX = ((index - 1) / (bandwidthHistory.length - 1)) * 100;
            
            const uploadY = chartHeight - (point.upload / maxValue) * chartHeight;
            const downloadY = chartHeight - (point.download / maxValue) * chartHeight;
            const totalY = chartHeight - (point.total / maxValue) * chartHeight;
            
            const prevUploadY = chartHeight - (bandwidthHistory[index - 1].upload / maxValue) * chartHeight;
            const prevDownloadY = chartHeight - (bandwidthHistory[index - 1].download / maxValue) * chartHeight;
            const prevTotalY = chartHeight - (bandwidthHistory[index - 1].total / maxValue) * chartHeight;

            return (
              <g key={index}>
                {/* Upload line */}
                <line
                  x1={`${prevX}%`}
                  y1={prevUploadY}
                  x2={`${x}%`}
                  y2={uploadY}
                  stroke="#3B82F6"
                  strokeWidth="2"
                  className="opacity-80"
                />
                {/* Download line */}
                <line
                  x1={`${prevX}%`}
                  y1={prevDownloadY}
                  x2={`${x}%`}
                  y2={downloadY}
                  stroke="#10B981"
                  strokeWidth="2"
                  className="opacity-80"
                />
                {/* Total line */}
                <line
                  x1={`${prevX}%`}
                  y1={prevTotalY}
                  x2={`${x}%`}
                  y2={totalY}
                  stroke="#8B5CF6"
                  strokeWidth="2"
                  className="opacity-80"
                />
              </g>
            );
          })}
          
          {/* Data points */}
          {bandwidthHistory.map((point, index) => {
            const x = (index / (bandwidthHistory.length - 1)) * 100;
            const uploadY = chartHeight - (point.upload / maxValue) * chartHeight;
            const downloadY = chartHeight - (point.download / maxValue) * chartHeight;
            const totalY = chartHeight - (point.total / maxValue) * chartHeight;

            return (
              <g key={`points-${index}`}>
                <circle
                  cx={`${x}%`}
                  cy={uploadY}
                  r="3"
                  fill="#3B82F6"
                  className="opacity-80 hover:opacity-100 transition-opacity"
                />
                <circle
                  cx={`${x}%`}
                  cy={downloadY}
                  r="3"
                  fill="#10B981"
                  className="opacity-80 hover:opacity-100 transition-opacity"
                />
                <circle
                  cx={`${x}%`}
                  cy={totalY}
                  r="3"
                  fill="#8B5CF6"
                  className="opacity-80 hover:opacity-100 transition-opacity"
                />
              </g>
            );
          })}
        </svg>
      </div>

      {/* Current Values */}
      <div className="grid grid-cols-3 gap-4">
        <motion.div 
          className="bg-slate-700/30 rounded-lg p-4 text-center"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center justify-center space-x-2 mb-2">
            <TrendingUp className="h-4 w-4 text-blue-400" />
            <span className="text-slate-400 text-sm">Загрузка</span>
          </div>
          <p className="text-xl font-semibold text-blue-400">
            {currentData?.upload || 0} Mbps
          </p>
          {uploadTrend !== 0 && (
            <div className={`flex items-center justify-center space-x-1 text-xs mt-1 ${
              uploadTrend > 0 ? 'text-green-400' : 'text-red-400'
            }`}>
              {uploadTrend > 0 ? 
                <TrendingUp className="h-3 w-3" /> : 
                <TrendingDown className="h-3 w-3" />
              }
              <span>{Math.abs(uploadTrend).toFixed(1)}</span>
            </div>
          )}
        </motion.div>

        <motion.div 
          className="bg-slate-700/30 rounded-lg p-4 text-center"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center justify-center space-x-2 mb-2">
            <TrendingDown className="h-4 w-4 text-green-400" />
            <span className="text-slate-400 text-sm">Скачивание</span>
          </div>
          <p className="text-xl font-semibold text-green-400">
            {currentData?.download || 0} Mbps
          </p>
          {downloadTrend !== 0 && (
            <div className={`flex items-center justify-center space-x-1 text-xs mt-1 ${
              downloadTrend > 0 ? 'text-green-400' : 'text-red-400'
            }`}>
              {downloadTrend > 0 ? 
                <TrendingUp className="h-3 w-3" /> : 
                <TrendingDown className="h-3 w-3" />
              }
              <span>{Math.abs(downloadTrend).toFixed(1)}</span>
            </div>
          )}
        </motion.div>

        <motion.div 
          className="bg-slate-700/30 rounded-lg p-4 text-center"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Activity className="h-4 w-4 text-purple-400" />
            <span className="text-slate-400 text-sm">Общий трафик</span>
          </div>
          <p className="text-xl font-semibold text-purple-400">
            {currentData?.total || 0} Mbps
          </p>
          <div className="text-xs text-slate-500 mt-1">
            Максимум: {maxValue.toFixed(1)} Mbps
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function SystemHealthCard() {
  const { systemHealth } = useNetworkStore();

  const healthItems = [
    {
      label: 'Процессор',
      value: systemHealth.cpu,
      icon: Cpu,
      color: systemHealth.cpu > 80 ? 'bg-red-500' : systemHealth.cpu > 60 ? 'bg-yellow-500' : 'bg-green-500',
      textColor: systemHealth.cpu > 80 ? 'text-red-400' : systemHealth.cpu > 60 ? 'text-yellow-400' : 'text-green-400',
    },
    {
      label: 'Память',
      value: systemHealth.memory,
      icon: MemoryStick,
      color: systemHealth.memory > 85 ? 'bg-red-500' : systemHealth.memory > 70 ? 'bg-yellow-500' : 'bg-green-500',
      textColor: systemHealth.memory > 85 ? 'text-red-400' : systemHealth.memory > 70 ? 'text-yellow-400' : 'text-green-400',
    },
    {
      label: 'Диск',
      value: systemHealth.disk,
      icon: HardDrive,
      color: systemHealth.disk > 90 ? 'bg-red-500' : systemHealth.disk > 75 ? 'bg-yellow-500' : 'bg-green-500',
      textColor: systemHealth.disk > 90 ? 'text-red-400' : systemHealth.disk > 75 ? 'text-yellow-400' : 'text-green-400',
    },
    {
      label: 'Сеть',
      value: systemHealth.network,
      icon: Activity,
      color: systemHealth.network > 80 ? 'bg-red-500' : systemHealth.network > 60 ? 'bg-yellow-500' : 'bg-green-500',
      textColor: systemHealth.network > 80 ? 'text-red-400' : systemHealth.network > 60 ? 'text-yellow-400' : 'text-green-400',
    },
  ];

  if (systemHealth.temperature) {
    healthItems.push({
      label: 'Температура',
      value: systemHealth.temperature,
      icon: Thermometer,
      color: systemHealth.temperature > 70 ? 'bg-red-500' : systemHealth.temperature > 50 ? 'bg-yellow-500' : 'bg-green-500',
      textColor: systemHealth.temperature > 70 ? 'text-red-400' : systemHealth.temperature > 50 ? 'text-yellow-400' : 'text-green-400',
    });
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-white">Состояние системы</h3>
      
      <div className="space-y-4">
        {healthItems.map((item) => {
          const Icon = item.icon;
          return (
            <motion.div 
              key={item.label}
              className="space-y-2"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Icon className={`h-4 w-4 ${item.textColor}`} />
                  <span className="text-sm text-slate-400">{item.label}</span>
                </div>
                <span className={`text-sm font-medium ${item.textColor}`}>
                  {item.value}{item.label === 'Температура' ? '°C' : '%'}
                </span>
              </div>
              <Progress 
                value={item.value} 
                className="h-2"
              />
            </motion.div>
          );
        })}
      </div>

      {/* Additional Info */}
      <div className="bg-slate-700/20 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-2">
          <Zap className="h-4 w-4 text-blue-400" />
          <span className="text-sm text-slate-400">Дополнительная информация</span>
        </div>
        <div className="space-y-1 text-xs text-slate-500">
          {systemHealth.processes && (
            <div>Процессов: {systemHealth.processes}</div>
          )}
          {systemHealth.uptime && (
            <div>Время работы: {Math.floor(systemHealth.uptime / 3600)} часов</div>
          )}
          <div>Последнее обновление: {systemHealth.lastUpdate?.toLocaleTimeString() || 'N/A'}</div>
        </div>
      </div>
    </div>
  );
}

export function ChartsSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Bandwidth Chart */}
      <div className="lg:col-span-2">
        <Card className="bg-slate-800/50 border-slate-700 p-6">
          <BandwidthChart />
        </Card>
      </div>
      
      {/* System Health */}
      <div>
        <Card className="bg-slate-800/50 border-slate-700 p-6">
          <SystemHealthCard />
        </Card>
      </div>
    </div>
  );
} 