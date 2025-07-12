'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNetworkStore } from '@/store/network-store';
import { AlertMessage } from '@/types/schemas';
import {
  AlertTriangle,
  Info,
  XCircle,
  CheckCircle,
  Clock,
  Bell,
  X,
  Trash2,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatTimeAgo, formatTimeDetailed } from '@/lib/utils';

const alertIcons = {
  critical: XCircle,
  warning: AlertTriangle,
  info: Info,
  error: XCircle,
};

const alertColors = {
  critical: 'text-red-400 bg-red-500/10 border-red-500/20',
  warning: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
  info: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
  error: 'text-red-400 bg-red-500/10 border-red-500/20',
};

const alertBorderColors = {
  critical: 'border-l-red-500',
  warning: 'border-l-yellow-500',
  info: 'border-l-blue-500',
  error: 'border-l-red-500',
};

export function AlertsPanel() {
  const { alerts, markAlertResolved, clearAlerts } = useNetworkStore();

  const recentAlerts = alerts.slice(0, 10);
  const unresolvedCount = alerts.filter((alert) => !alert.resolved).length;
  const criticalCount = alerts.filter(
    (alert) => alert.type === 'critical' && !alert.resolved
  ).length;
  const totalAlerts = alerts.length;

  const handleResolveAlert = (alertId: string) => {
    markAlertResolved(alertId);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-xl border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm"
    >
      <div className="p-6">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="rounded-lg bg-slate-700/50 p-2">
              <Bell className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Уведомления</h3>
              <div className="mt-1 flex items-center space-x-3">
                <div className="flex items-center space-x-1">
                  <div className="h-2 w-2 animate-pulse rounded-full bg-red-500"></div>
                  <span className="text-xs text-slate-400">Live</span>
                </div>
                {unresolvedCount > 0 && (
                  <div className="flex items-center space-x-1 rounded-full border border-red-500/20 bg-red-500/20 px-2 py-1">
                    <span className="text-xs font-medium text-red-400">
                      {unresolvedCount} активных
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {alerts.length > 0 && (
            <button
              onClick={clearAlerts}
              className="flex items-center space-x-2 rounded-lg px-3 py-2 text-slate-400 transition-colors hover:bg-slate-700/50 hover:text-white"
            >
              <Trash2 className="h-4 w-4" />
              <span className="text-sm">Очистить</span>
            </button>
          )}
        </div>

        {/* Statistics */}
        <div className="mb-6 grid grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="rounded-lg bg-slate-700/30 p-3 text-center"
          >
            <div className="text-2xl font-bold text-white">{totalAlerts}</div>
            <div className="text-xs text-slate-400">Всего</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="rounded-lg bg-slate-700/30 p-3 text-center"
          >
            <div className="text-2xl font-bold text-red-400">
              {criticalCount}
            </div>
            <div className="text-xs text-slate-400">Критические</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="rounded-lg bg-slate-700/30 p-3 text-center"
          >
            <div className="text-2xl font-bold text-green-400">
              {totalAlerts - unresolvedCount}
            </div>
            <div className="text-xs text-slate-400">Решены</div>
          </motion.div>
        </div>

        {/* Alerts List */}
        <div className="custom-scrollbar max-h-96 space-y-3 overflow-y-auto">
          <AnimatePresence>
            {recentAlerts.map((alert, index) => {
              const Icon = alertIcons[alert.type];

              return (
                <motion.div
                  key={alert.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`group relative border-l-4 bg-slate-700/30 backdrop-blur-sm ${alertBorderColors[alert.type]} rounded-lg p-4 transition-all duration-300 hover:bg-slate-700/50`}
                >
                  <div className="flex items-start space-x-3">
                    <div
                      className={`rounded-lg border p-2 ${alertColors[alert.type]} flex-shrink-0`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p
                            className={`text-sm font-medium ${alert.resolved ? 'text-slate-400 line-through' : 'text-white'} leading-relaxed`}
                          >
                            {alert.message}
                          </p>

                          <div className="mt-2 flex items-center space-x-3">
                            <div className="flex items-center space-x-1">
                              <Clock className="h-3 w-3 text-slate-400" />
                              <span
                                className="text-xs text-slate-400"
                                title={formatTimeDetailed(alert.timestamp)}
                              >
                                {formatTimeAgo(alert.timestamp)}
                              </span>
                            </div>

                            {alert.deviceId && (
                              <div className="text-xs text-slate-500">
                                Устройство: {alert.deviceId}
                              </div>
                            )}

                            <div
                              className={`rounded-full px-2 py-1 text-xs font-medium ${alertColors[alert.type]}`}
                            >
                              {alert.type === 'critical'
                                ? 'Критическое'
                                : alert.type === 'warning'
                                  ? 'Предупреждение'
                                  : 'Информация'}
                            </div>
                          </div>
                        </div>

                        {alert.resolved ? (
                          <div className="ml-3 flex items-center space-x-1 text-green-400">
                            <CheckCircle className="h-4 w-4" />
                            <span className="text-xs">Решено</span>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleResolveAlert(alert.id)}
                            className="ml-3 rounded p-1 text-slate-400 opacity-0 transition-all hover:bg-slate-600/50 hover:text-green-400 group-hover:opacity-100"
                            title="Отметить как решенное"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Severity indicator */}
                  <div className="absolute right-2 top-2">
                    {alert.type === 'critical' && (
                      <div className="h-2 w-2 animate-pulse rounded-full bg-red-500"></div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* No alerts state */}
        {alerts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-8 text-center"
          >
            <CheckCircle className="mx-auto mb-3 h-12 w-12 text-green-400" />
            <p className="font-medium text-slate-300">Нет уведомлений</p>
            <p className="mt-1 text-xs text-slate-500">
              Все системы работают штатно
            </p>
          </motion.div>
        )}

        {/* Load more */}
        {alerts.length > 10 && (
          <div className="mt-4 text-center">
            <button className="text-sm text-blue-400 transition-colors hover:text-blue-300">
              Показать все уведомления ({alerts.length})
            </button>
          </div>
        )}
      </div>

      {/* Live indicator animation */}
      {unresolvedCount > 0 && (
        <div className="absolute -right-1 -top-1">
          <div className="h-3 w-3 animate-ping rounded-full bg-red-500"></div>
          <div className="absolute top-0 h-3 w-3 rounded-full bg-red-500"></div>
        </div>
      )}
    </motion.div>
  );
}
