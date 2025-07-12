'use client';

import { useNetworkStore } from '@/store/network-store';
import { motion } from 'framer-motion';
import {
  Server,
  Activity,
  AlertTriangle,
  Clock,
  Shield,
  Zap,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: React.ElementType;
  color: 'blue' | 'green' | 'yellow' | 'red' | 'purple' | 'orange';
  description?: string;
}

function MetricCard({
  title,
  value,
  change,
  icon: Icon,
  color,
  description,
}: MetricCardProps) {
  const colorClasses = {
    blue: 'from-blue-500/20 to-blue-600/20 border-blue-500/30 text-blue-400',
    green:
      'from-green-500/20 to-green-600/20 border-green-500/30 text-green-400',
    yellow:
      'from-yellow-500/20 to-yellow-600/20 border-yellow-500/30 text-yellow-400',
    red: 'from-red-500/20 to-red-600/20 border-red-500/30 text-red-400',
    purple:
      'from-purple-500/20 to-purple-600/20 border-purple-500/30 text-purple-400',
    orange:
      'from-orange-500/20 to-orange-600/20 border-orange-500/30 text-orange-400',
  };

  const bgColorClasses = {
    blue: 'bg-blue-500/10',
    green: 'bg-green-500/10',
    yellow: 'bg-yellow-500/10',
    red: 'bg-red-500/10',
    purple: 'bg-purple-500/10',
    orange: 'bg-orange-500/10',
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <Card
        className={cn(
          'relative overflow-hidden border bg-gradient-to-br backdrop-blur-sm transition-all duration-300',
          colorClasses[color]
        )}
      >
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-slate-400">{title}</p>
              <div className="flex items-baseline space-x-2">
                <p className="text-2xl font-bold text-white">{value}</p>
                {change !== undefined && (
                  <div
                    className={cn(
                      'flex items-center text-xs font-medium',
                      change >= 0 ? 'text-green-400' : 'text-red-400'
                    )}
                  >
                    {change >= 0 ? (
                      <TrendingUp className="mr-1 h-3 w-3" />
                    ) : (
                      <TrendingDown className="mr-1 h-3 w-3" />
                    )}
                    {Math.abs(change)}%
                  </div>
                )}
              </div>
              {description && (
                <p className="text-xs text-slate-500">{description}</p>
              )}
            </div>
            <div className={cn('rounded-lg p-3', bgColorClasses[color])}>
              <Icon className="h-6 w-6" />
            </div>
          </div>
        </div>

        {/* Decorative gradient overlay */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </Card>
    </motion.div>
  );
}

export function MetricsGrid() {
  const { metrics } = useNetworkStore();

  const metricsData = [
    {
      title: 'Всего устройств',
      value: metrics.totalDevices,
      icon: Server,
      color: 'blue' as const,
      description: 'Общее количество устройств в сети',
    },
    {
      title: 'Устройства онлайн',
      value: metrics.onlineDevices,
      change: 2.5,
      icon: Activity,
      color: 'green' as const,
      description: 'Активные устройства',
    },
    {
      title: 'Предупреждения',
      value: metrics.warningDevices,
      icon: AlertTriangle,
      color: 'yellow' as const,
      description: 'Устройства с предупреждениями',
    },
    {
      title: 'Время отклика',
      value: `${metrics.averageResponseTime}ms`,
      change: -1.2,
      icon: Clock,
      color: 'purple' as const,
      description: 'Среднее время отклика',
    },
    {
      title: 'Время работы',
      value: `${metrics.networkUptime}%`,
      change: 0.1,
      icon: Shield,
      color: 'green' as const,
      description: 'Время работы сети',
    },
    {
      title: 'Пропускная способность',
      value: `${Math.round((metrics.usedBandwidth / metrics.totalBandwidth) * 100)}%`,
      change: 5.3,
      icon: Zap,
      color: 'orange' as const,
      description: `${metrics.usedBandwidth} / ${metrics.totalBandwidth} Mbps`,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Обзор метрик</h2>
        <div className="text-sm text-slate-400">
          Обновлено: {new Date(metrics.lastUpdate).toLocaleTimeString('ru-RU')}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {metricsData.map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <MetricCard {...metric} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
