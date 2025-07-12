'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Clock, Wifi, Server, Zap, Pause, Play } from 'lucide-react';
import { Card } from './card';
import { Badge } from './badge';
import { useNetworkStore } from '@/store/network-store';

interface RealtimeMonitorProps {
  className?: string;
}

export const RealtimeMonitor: React.FC<RealtimeMonitorProps> = ({
  className = '',
}) => {
  const { webSocketConnected, devices, metrics, systemLogs } =
    useNetworkStore();
  const [secondsUntilNext, setSecondsUntilNext] = useState(30);
  const [isActive, setIsActive] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [updateCount, setUpdateCount] = useState(0);

  // Симулируем 30-секундный цикл для отображения
  useEffect(() => {
    if (!webSocketConnected) {
      setIsActive(false);
      return;
    }

    setIsActive(true);
    setLastUpdate(new Date());

    const interval = setInterval(() => {
      setSecondsUntilNext((prev) => {
        if (prev <= 1) {
          setLastUpdate(new Date());
          return 30; // Сброс до 30 секунд
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [webSocketConnected]);

  // Обновляем последнее время при изменении метрик
  useEffect(() => {
    if (metrics.lastUpdate) {
      setLastUpdate(metrics.lastUpdate);
    }
  }, [metrics.lastUpdate]);

  // Отслеживаем обновления через системные логи
  useEffect(() => {
    const recentLogs = systemLogs.filter(
      (log) =>
        log.message.includes('Обновлены метрики') &&
        log.timestamp &&
        Date.now() - log.timestamp.getTime() < 2000 // последние 2 секунды
    );

    if (recentLogs.length > 0) {
      setUpdateCount((prev) => prev + 1);
      setLastUpdate(new Date());
    }
  }, [systemLogs]);

  const formatTime = (date: Date | null) => {
    if (!date) return '--:--:--';
    return date.toLocaleTimeString();
  };

  const getStatusColor = () => {
    if (!webSocketConnected) return 'text-red-400';
    if (isActive) return 'text-green-400';
    return 'text-yellow-400';
  };

  const getStatusText = () => {
    if (!webSocketConnected) return 'WebSocket отключен';
    if (isActive) return 'Активный мониторинг';
    return 'Мониторинг приостановлен';
  };

  return (
    <Card className={`border-slate-700 bg-slate-800/50 ${className}`}>
      <div className="p-4">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <motion.div
              animate={
                isActive
                  ? {
                      scale: [1, 1.1, 1],
                      rotate: [0, 180, 360],
                    }
                  : {}
              }
              transition={{
                duration: 2,
                repeat: isActive ? Infinity : 0,
                ease: 'easeInOut',
              }}
            >
              <Activity className={`h-5 w-5 ${getStatusColor()}`} />
            </motion.div>
            <h3 className="text-lg font-semibold text-white">
              Real-time Monitor
            </h3>
          </div>

          <Badge
            className={`${
              webSocketConnected
                ? 'border-green-500/20 bg-green-500/20 text-green-400'
                : 'border-red-500/20 bg-red-500/20 text-red-400'
            }`}
          >
            {webSocketConnected ? 'Подключен' : 'Отключен'}
          </Badge>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Статус мониторинга */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Статус:</span>
              <span className={`text-sm font-medium ${getStatusColor()}`}>
                {getStatusText()}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Устройств:</span>
              <span className="text-sm font-medium text-white">
                {devices.length} под мониторингом
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Онлайн:</span>
              <span className="text-sm font-medium text-green-400">
                {devices.filter((d) => d.status === 'online').length}
              </span>
            </div>
          </div>

          {/* Таймер и обновления */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">До обновления:</span>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-blue-400" />
                <motion.span
                  className="font-mono text-sm text-blue-400"
                  animate={
                    secondsUntilNext <= 5
                      ? {
                          color: ['#60a5fa', '#ef4444', '#60a5fa'],
                        }
                      : {}
                  }
                  transition={{
                    duration: 0.5,
                    repeat: secondsUntilNext <= 5 ? Infinity : 0,
                  }}
                >
                  {secondsUntilNext}с
                </motion.span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Последнее:</span>
              <span className="font-mono text-sm text-white">
                {formatTime(lastUpdate)}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Интервал:</span>
              <span className="text-sm font-medium text-white">30 секунд</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Обновлений:</span>
              <motion.span
                className="text-sm font-medium text-blue-400"
                animate={updateCount > 0 ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                {updateCount}
              </motion.span>
            </div>
          </div>
        </div>

        {/* Прогресс бар */}
        {webSocketConnected && (
          <div className="mt-4">
            <div className="mb-2 flex items-center justify-between text-xs text-slate-400">
              <span>Прогресс цикла</span>
              <span>{Math.round(((30 - secondsUntilNext) / 30) * 100)}%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-slate-700">
              <motion.div
                className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-green-500"
                animate={{
                  width: `${((30 - secondsUntilNext) / 30) * 100}%`,
                }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            </div>
          </div>
        )}

        {/* Активность в реальном времени */}
        {webSocketConnected && isActive && (
          <div className="mt-4 flex items-center space-x-4 text-xs text-slate-400">
            <div className="flex items-center space-x-2">
              <motion.div
                className="h-2 w-2 rounded-full bg-green-400"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
              <span>Пингуем устройства</span>
            </div>

            <div className="flex items-center space-x-2">
              <Wifi className="h-3 w-3" />
              <span>WebSocket активен</span>
            </div>

            <div className="flex items-center space-x-2">
              <Server className="h-3 w-3" />
              <span>Сервер: localhost:5000</span>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
