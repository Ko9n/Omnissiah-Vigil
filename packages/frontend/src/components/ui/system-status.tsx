'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, Zap, Activity } from 'lucide-react';
import { Card } from './card';
import { Badge } from './badge';
import { useNetworkStore } from '@/store/network-store';

export const SystemStatus: React.FC = () => {
  const { webSocketConnected, apiConnected, devices, metrics } =
    useNetworkStore();

  const getOverallStatus = () => {
    if (webSocketConnected && apiConnected) {
      return {
        status: 'Real-time Active',
        color: 'text-green-400',
        bg: 'bg-green-500/20 border-green-500/20',
        icon: CheckCircle,
      };
    } else if (apiConnected) {
      return {
        status: 'API Only',
        color: 'text-yellow-400',
        bg: 'bg-yellow-500/20 border-yellow-500/20',
        icon: Clock,
      };
    } else {
      return {
        status: 'Demo Mode',
        color: 'text-red-400',
        bg: 'bg-red-500/20 border-red-500/20',
        icon: Activity,
      };
    }
  };

  const status = getOverallStatus();
  const StatusIcon = status.icon;

  const onlineDevices = devices.filter((d) => d.status === 'online').length;
  const offlineDevices = devices.filter((d) => d.status === 'offline').length;

  return (
    <Card className="border-slate-700 bg-slate-800/50">
      <div className="p-4">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">Статус системы</h3>
          <Badge className={status.bg}>
            <StatusIcon className="mr-2 h-4 w-4" />
            {status.status}
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Подключения */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-slate-300">Подключения</h4>

            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">WebSocket:</span>
              <div className="flex items-center space-x-1">
                <div
                  className={`h-2 w-2 rounded-full ${webSocketConnected ? 'bg-green-400' : 'bg-red-400'}`}
                />
                <span className="text-xs text-white">
                  {webSocketConnected ? 'Активен' : 'Отключен'}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">API:</span>
              <div className="flex items-center space-x-1">
                <div
                  className={`h-2 w-2 rounded-full ${apiConnected ? 'bg-green-400' : 'bg-red-400'}`}
                />
                <span className="text-xs text-white">
                  {apiConnected ? 'Подключен' : 'Недоступен'}
                </span>
              </div>
            </div>
          </div>

          {/* Устройства */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-slate-300">Устройства</h4>

            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">Онлайн:</span>
              <motion.span
                className="text-xs font-medium text-green-400"
                animate={onlineDevices > 0 ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.5 }}
              >
                {onlineDevices}
              </motion.span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">Офлайн:</span>
              <span className="text-xs font-medium text-red-400">
                {offlineDevices}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">Всего:</span>
              <span className="text-xs font-medium text-white">
                {devices.length}
              </span>
            </div>
          </div>
        </div>

        {/* Возможности */}
        <div className="mt-4 border-t border-slate-700 pt-3">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center space-x-2">
              <div
                className={`h-2 w-2 rounded-full ${webSocketConnected ? 'animate-pulse bg-green-400' : 'bg-slate-600'}`}
              />
              <span className="text-slate-400">Real-time пинг</span>
            </div>

            <div className="flex items-center space-x-2">
              <div
                className={`h-2 w-2 rounded-full ${webSocketConnected ? 'animate-pulse bg-blue-400' : 'bg-slate-600'}`}
              />
              <span className="text-slate-400">Live графики</span>
            </div>

            <div className="flex items-center space-x-2">
              <div
                className={`h-2 w-2 rounded-full ${apiConnected ? 'bg-purple-400' : 'bg-slate-600'}`}
              />
              <span className="text-slate-400">API интеграция</span>
            </div>

            <div className="flex items-center space-x-2">
              <div
                className={`h-2 w-2 rounded-full ${webSocketConnected ? 'animate-pulse bg-orange-400' : 'bg-slate-600'}`}
              />
              <span className="text-slate-400">Auto мониторинг</span>
            </div>
          </div>
        </div>

        {/* Индикатор активности */}
        {webSocketConnected && (
          <div className="mt-3 flex items-center justify-center">
            <motion.div
              className="flex items-center space-x-2 text-xs text-green-400"
              animate={{ opacity: [1, 0.6, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Zap className="h-3 w-3" />
              <span>Система активна</span>
            </motion.div>
          </div>
        )}
      </div>
    </Card>
  );
};
