'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Wifi, WifiOff, AlertCircle } from 'lucide-react';
import { Badge } from './badge';

interface ConnectionStatusProps {
  connected: boolean;
  apiConnected: boolean;
  className?: string;
}

export const ConnectionStatus: React.FC<ConnectionStatusProps> = ({
  connected,
  apiConnected,
  className = '',
}) => {
  const getStatus = () => {
    if (connected && apiConnected) {
      return {
        label: 'Real-time',
        icon: Wifi,
        color: 'bg-green-500/20 text-green-400 border-green-500/20',
        iconColor: 'text-green-400',
        pulse: true,
      };
    } else if (apiConnected) {
      return {
        label: 'API Only',
        icon: AlertCircle,
        color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/20',
        iconColor: 'text-yellow-400',
        pulse: false,
      };
    } else {
      return {
        label: 'Demo Mode',
        icon: WifiOff,
        color: 'bg-red-500/20 text-red-400 border-red-500/20',
        iconColor: 'text-red-400',
        pulse: false,
      };
    }
  };

  const status = getStatus();
  const Icon = status.icon;

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className="relative">
        <Icon className={`h-4 w-4 ${status.iconColor}`} />
        {status.pulse && (
          <motion.div
            className="absolute inset-0 rounded-full bg-green-400"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.7, 0, 0.7],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        )}
      </div>

      <Badge className={`${status.color} text-xs font-medium`}>
        {status.label}
      </Badge>

      {connected && (
        <motion.div
          className="h-2 w-2 rounded-full bg-green-400"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      )}
    </div>
  );
};

// Расширенный компонент с дополнительной информацией
export const DetailedConnectionStatus: React.FC<{
  connected: boolean;
  apiConnected: boolean;
  lastUpdate?: Date;
  className?: string;
}> = ({ connected, apiConnected, lastUpdate, className = '' }) => {
  const getStatusText = () => {
    if (connected && apiConnected) {
      return 'Подключен к серверу в реальном времени';
    } else if (apiConnected) {
      return 'Подключен к API, WebSocket недоступен';
    } else {
      return 'Работает в демо режиме';
    }
  };

  const formatLastUpdate = () => {
    if (!lastUpdate) return '';

    const now = new Date();
    const diff = now.getTime() - lastUpdate.getTime();
    const seconds = Math.floor(diff / 1000);

    if (seconds < 60) return `${seconds}с назад`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}м назад`;
    return lastUpdate.toLocaleTimeString();
  };

  return (
    <div className={`rounded-lg bg-slate-700/30 p-3 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <ConnectionStatus connected={connected} apiConnected={apiConnected} />
          <div>
            <p className="text-sm font-medium text-white">{getStatusText()}</p>
            {lastUpdate && (
              <p className="text-xs text-slate-400">
                Обновлено: {formatLastUpdate()}
              </p>
            )}
          </div>
        </div>

        <div className="flex space-x-2">
          <div
            className={`h-2 w-2 rounded-full ${
              connected ? 'bg-green-400' : 'bg-slate-600'
            }`}
            title="WebSocket"
          />
          <div
            className={`h-2 w-2 rounded-full ${
              apiConnected ? 'bg-blue-400' : 'bg-slate-600'
            }`}
            title="API"
          />
        </div>
      </div>
    </div>
  );
};
