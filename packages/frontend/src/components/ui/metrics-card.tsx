'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { Card } from './card';

interface MetricsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: 'blue' | 'green' | 'yellow' | 'red' | 'purple' | 'indigo';
  trend?: {
    value: number;
    isPositive: boolean;
  };
  loading?: boolean;
}

const colorClasses = {
  blue: 'text-blue-400 bg-blue-500/10',
  green: 'text-green-400 bg-green-500/10',
  yellow: 'text-yellow-400 bg-yellow-500/10',
  red: 'text-red-400 bg-red-500/10',
  purple: 'text-purple-400 bg-purple-500/10',
  indigo: 'text-indigo-400 bg-indigo-500/10',
};

const MetricsCard = React.memo<MetricsCardProps>(
  ({ title, value, icon: Icon, color, trend, loading = false }) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Card className="border-slate-700 bg-slate-800/50 transition-all duration-200 hover:bg-slate-800/70">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`rounded-lg p-2 ${colorClasses[color]}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-400">{title}</p>
                  <div className="flex items-baseline space-x-2">
                    {loading ? (
                      <div className="h-6 w-16 animate-pulse rounded bg-slate-700" />
                    ) : (
                      <motion.p
                        className="text-2xl font-bold text-white"
                        key={value} // Re-animate when value changes
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        {value}
                      </motion.p>
                    )}

                    {trend && !loading && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`text-xs font-medium ${
                          trend.isPositive ? 'text-green-400' : 'text-red-400'
                        }`}
                      >
                        {trend.isPositive ? '+' : ''}
                        {trend.value}%
                      </motion.span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    );
  }
);

MetricsCard.displayName = 'MetricsCard';

export { MetricsCard };
