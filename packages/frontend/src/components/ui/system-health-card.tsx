'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useNetworkStore } from '@/store/network-store';
import {
  Cpu,
  MemoryStick,
  HardDrive,
  Activity,
  Thermometer,
  Clock,
  Zap,
} from 'lucide-react';

interface ProgressBarProps {
  value: number;
  color: string;
  label: string;
  icon: React.ComponentType<any>;
  unit?: string;
}

function ProgressBar({
  value,
  color,
  label,
  icon: Icon,
  unit = '%',
}: ProgressBarProps) {
  const getColorClasses = (value: number, type: string) => {
    if (type === 'temperature') {
      if (value > 70) return 'bg-red-500 text-red-400';
      if (value > 50) return 'bg-yellow-500 text-yellow-400';
      return 'bg-green-500 text-green-400';
    }

    if (value > 90) return 'bg-red-500 text-red-400';
    if (value > 75) return 'bg-yellow-500 text-yellow-400';
    return 'bg-green-500 text-green-400';
  };

  const colorClasses = getColorClasses(value, label.toLowerCase());
  const bgColor = colorClasses.includes('red')
    ? 'bg-red-500/20'
    : colorClasses.includes('yellow')
      ? 'bg-yellow-500/20'
      : 'bg-green-500/20';

  // Округляем проценты, кроме температуры
  const displayValue = unit === '%' ? Math.round(value) : value;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-3"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Icon className={`h-4 w-4 ${colorClasses.split(' ')[1]}`} />
          <span className="text-sm font-medium text-slate-300">{label}</span>
        </div>
        <span className={`text-sm font-bold ${colorClasses.split(' ')[1]}`}>
          {displayValue}
          {unit}
        </span>
      </div>

      <div className={`relative h-2 rounded-full ${bgColor}`}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(value, 100)}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className={`h-full rounded-full ${colorClasses.split(' ')[0]}`}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent to-white/10" />
      </div>
    </motion.div>
  );
}

export function SystemHealthCard() {
  const { systemHealth } = useNetworkStore();

  const formatUptime = (seconds: number) => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    if (days > 0) return `${days}д ${hours}ч`;
    if (hours > 0) return `${hours}ч ${minutes}м`;
    return `${minutes}м`;
  };

  const getOverallStatus = () => {
    const values = [
      systemHealth.cpu,
      systemHealth.memory,
      systemHealth.disk,
      systemHealth.network,
    ];

    const maxValue = Math.max(...values);

    if (maxValue > 90)
      return { status: 'critical', color: 'text-red-400', bg: 'bg-red-500/10' };
    if (maxValue > 75)
      return {
        status: 'warning',
        color: 'text-yellow-400',
        bg: 'bg-yellow-500/10',
      };
    return {
      status: 'healthy',
      color: 'text-green-400',
      bg: 'bg-green-500/10',
    };
  };

  const overallStatus = getOverallStatus();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-xl border border-slate-700/50 bg-slate-800/50 p-6 backdrop-blur-sm"
    >
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">
            Сервер мониторинга
          </h3>
          <p className="mt-1 text-xs text-slate-400">
            🖥️ Состояние системы, на которой запущен мониторинг сети
          </p>
        </div>
        <div
          className={`flex items-center space-x-2 rounded-full px-3 py-1 ${overallStatus.bg}`}
        >
          <div
            className={`h-2 w-2 rounded-full ${overallStatus.color.replace('text-', 'bg-')} animate-pulse`}
          ></div>
          <span className={`text-xs font-medium ${overallStatus.color}`}>
            {overallStatus.status === 'critical'
              ? 'Критическое'
              : overallStatus.status === 'warning'
                ? 'Предупреждение'
                : 'Норма'}
          </span>
        </div>
      </div>

      {/* Resource Monitoring */}
      <div className="mb-6 space-y-4">
        <ProgressBar
          value={systemHealth.cpu}
          color="blue"
          label="Процессор"
          icon={Cpu}
        />

        <ProgressBar
          value={systemHealth.memory}
          color="purple"
          label="Память"
          icon={MemoryStick}
        />

        <ProgressBar
          value={systemHealth.disk}
          color="orange"
          label="Диск"
          icon={HardDrive}
        />

        <ProgressBar
          value={systemHealth.network}
          color="green"
          label="Сеть"
          icon={Activity}
        />

        {systemHealth.temperature && (
          <ProgressBar
            value={systemHealth.temperature}
            color="red"
            label="Температура"
            icon={Thermometer}
            unit="°C"
          />
        )}
      </div>

      {/* Additional System Info */}
      <div className="grid grid-cols-2 gap-4 border-t border-slate-700/50 pt-4">
        {systemHealth.uptime && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-lg bg-slate-700/30 p-3 text-center"
          >
            <div className="mb-2 flex items-center justify-center">
              <Clock className="mr-2 h-4 w-4 text-blue-400" />
              <span className="text-xs text-slate-400">Время работы</span>
            </div>
            <div className="text-sm font-bold text-blue-400">
              {formatUptime(systemHealth.uptime)}
            </div>
          </motion.div>
        )}

        {systemHealth.processes && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="rounded-lg bg-slate-700/30 p-3 text-center"
          >
            <div className="mb-2 flex items-center justify-center">
              <Zap className="mr-2 h-4 w-4 text-purple-400" />
              <span className="text-xs text-slate-400">Процессы</span>
            </div>
            <div className="text-sm font-bold text-purple-400">
              {systemHealth.processes}
            </div>
          </motion.div>
        )}
      </div>

      {/* Last Update */}
      {systemHealth.lastUpdate && (
        <div className="mt-4 text-center">
          <div className="text-xs text-slate-500">
            Обновлено: {new Date(systemHealth.lastUpdate).toLocaleTimeString()}
          </div>
        </div>
      )}

      {/* Performance Indicator */}
      <div className="mt-4">
        <div className="mb-2 flex items-center justify-between text-xs text-slate-400">
          <span>Общая производительность</span>
          <span>
            {100 -
              Math.max(
                systemHealth.cpu,
                systemHealth.memory,
                systemHealth.disk
              )}
            %
          </span>
        </div>
        <div className="h-1 rounded-full bg-slate-700/50">
          <motion.div
            initial={{ width: 0 }}
            animate={{
              width: `${100 - Math.max(systemHealth.cpu, systemHealth.memory, systemHealth.disk)}%`,
            }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className={`h-full rounded-full ${
              100 -
                Math.max(
                  systemHealth.cpu,
                  systemHealth.memory,
                  systemHealth.disk
                ) >
              75
                ? 'bg-green-500'
                : 100 -
                      Math.max(
                        systemHealth.cpu,
                        systemHealth.memory,
                        systemHealth.disk
                      ) >
                    50
                  ? 'bg-yellow-500'
                  : 'bg-red-500'
            }`}
          />
        </div>
      </div>
    </motion.div>
  );
}
