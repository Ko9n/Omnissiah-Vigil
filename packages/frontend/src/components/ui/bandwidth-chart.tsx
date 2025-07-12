'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNetworkStore } from '@/store/network-store';
import { BandwidthData } from '@/types/schemas';

interface BandwidthChartProps {
  data?: BandwidthData[];
}

export function BandwidthChart({ data }: BandwidthChartProps) {
  const { bandwidthHistory } = useNetworkStore();
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  const chartData = data || bandwidthHistory;
  const maxValue = Math.max(
    ...chartData.map((d) => Math.max(d.upload, d.download, d.total)),
    1
  );
  const chartHeight = 200;
  const chartWidth = 100; // percentage

  const generatePath = (values: number[]) => {
    const points = values.map((value, index) => {
      const x = (index / Math.max(values.length - 1, 1)) * chartWidth;
      const y = chartHeight - (value / maxValue) * chartHeight;
      return `${x},${y}`;
    });

    if (points.length === 0) return '';
    if (points.length === 1) return `M${points[0]} L${points[0]}`;

    return `M${points.join(' L')}`;
  };

  const uploadPath = generatePath(chartData.map((d) => d.upload));
  const downloadPath = generatePath(chartData.map((d) => d.download));
  const totalPath = generatePath(chartData.map((d) => d.total));

  const formatBandwidth = (value: number) => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)} Gbps`;
    }
    return `${value.toFixed(1)} Mbps`;
  };

  const currentData = chartData[chartData.length - 1] || {
    upload: 0,
    download: 0,
    total: 0,
    timestamp: new Date(),
  };

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
            Общий сетевой трафик
          </h3>
          <p className="mt-1 text-xs text-slate-400">
            📡 Суммарная полоса пропускания всех устройств сети
          </p>
        </div>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="h-3 w-3 rounded-full bg-blue-500"></div>
            <span className="text-slate-400">Отправка</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-3 w-3 rounded-full bg-green-500"></div>
            <span className="text-slate-400">Загрузка</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-3 w-3 rounded-full bg-purple-500"></div>
            <span className="text-slate-400">Общий</span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="relative mb-6" style={{ height: chartHeight }}>
        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          className="overflow-visible"
          preserveAspectRatio="none"
        >
          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio) => (
            <g key={ratio}>
              <line
                x1="0"
                y1={chartHeight * ratio}
                x2={chartWidth}
                y2={chartHeight * ratio}
                stroke="#475569"
                strokeWidth="0.5"
                opacity="0.3"
              />
              <text
                x="-5"
                y={chartHeight * ratio + 3}
                fill="#64748b"
                fontSize="10"
                textAnchor="end"
              >
                {formatBandwidth(maxValue * (1 - ratio))}
              </text>
            </g>
          ))}

          {/* Chart lines */}
          {chartData.length > 1 && (
            <>
              {/* Upload line */}
              <motion.path
                d={uploadPath}
                fill="none"
                stroke="#3B82F6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, ease: 'easeInOut' }}
                className="opacity-80"
              />

              {/* Download line */}
              <motion.path
                d={downloadPath}
                fill="none"
                stroke="#10B981"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 0.2, ease: 'easeInOut' }}
                className="opacity-80"
              />

              {/* Total line */}
              <motion.path
                d={totalPath}
                fill="none"
                stroke="#8B5CF6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 0.4, ease: 'easeInOut' }}
                className="opacity-80"
              />
            </>
          )}

          {/* Data points */}
          {chartData.map((point, index) => {
            const x = (index / Math.max(chartData.length - 1, 1)) * chartWidth;
            const uploadY =
              chartHeight - (point.upload / maxValue) * chartHeight;
            const downloadY =
              chartHeight - (point.download / maxValue) * chartHeight;
            const totalY = chartHeight - (point.total / maxValue) * chartHeight;

            return (
              <g key={index}>
                <motion.circle
                  cx={x}
                  cy={uploadY}
                  r={hoveredPoint === index ? '4' : '3'}
                  fill="#3B82F6"
                  className="cursor-pointer opacity-80"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  onMouseEnter={() => setHoveredPoint(index)}
                  onMouseLeave={() => setHoveredPoint(null)}
                />
                <motion.circle
                  cx={x}
                  cy={downloadY}
                  r={hoveredPoint === index ? '4' : '3'}
                  fill="#10B981"
                  className="cursor-pointer opacity-80"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 + 0.1 }}
                  onMouseEnter={() => setHoveredPoint(index)}
                  onMouseLeave={() => setHoveredPoint(null)}
                />
                <motion.circle
                  cx={x}
                  cy={totalY}
                  r={hoveredPoint === index ? '4' : '3'}
                  fill="#8B5CF6"
                  className="cursor-pointer opacity-80"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 + 0.2 }}
                  onMouseEnter={() => setHoveredPoint(index)}
                  onMouseLeave={() => setHoveredPoint(null)}
                />
              </g>
            );
          })}
        </svg>

        {/* Hover tooltip */}
        {hoveredPoint !== null && chartData[hoveredPoint] && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="pointer-events-none absolute z-10 rounded-lg border border-slate-600 bg-slate-900/90 p-3 text-sm backdrop-blur-sm"
            style={{
              left: `${(hoveredPoint / Math.max(chartData.length - 1, 1)) * 100}%`,
              top: '10px',
              transform: 'translateX(-50%)',
            }}
          >
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                <span className="text-blue-400">
                  Отправка: {formatBandwidth(chartData[hoveredPoint].upload)}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span className="text-green-400">
                  Загрузка: {formatBandwidth(chartData[hoveredPoint].download)}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                <span className="text-purple-400">
                  Общий: {formatBandwidth(chartData[hoveredPoint].total)}
                </span>
              </div>
              <div className="mt-1 border-t border-slate-600 pt-1 text-xs text-slate-400">
                {new Date(
                  chartData[hoveredPoint].timestamp
                ).toLocaleTimeString()}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Current Stats */}
      <div className="grid grid-cols-3 gap-4 text-sm">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="rounded-lg bg-slate-700/30 p-3 text-center"
        >
          <p className="mb-1 text-slate-400">Текущая отправка</p>
          <p className="text-lg font-medium text-blue-400">
            {formatBandwidth(currentData.upload)}
          </p>
          <div className="mt-1 text-xs text-slate-500">
            ↑ {((currentData.upload / Math.max(maxValue, 1)) * 100).toFixed(1)}%
            от пика
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="rounded-lg bg-slate-700/30 p-3 text-center"
        >
          <p className="mb-1 text-slate-400">Текущая загрузка</p>
          <p className="text-lg font-medium text-green-400">
            {formatBandwidth(currentData.download)}
          </p>
          <div className="mt-1 text-xs text-slate-500">
            ↓{' '}
            {((currentData.download / Math.max(maxValue, 1)) * 100).toFixed(1)}%
            от пика
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="rounded-lg bg-slate-700/30 p-3 text-center"
        >
          <p className="mb-1 text-slate-400">Общее использование</p>
          <p className="text-lg font-medium text-purple-400">
            {formatBandwidth(currentData.total)}
          </p>
          <div className="mt-1 text-xs text-slate-500">
            ⚡ {((currentData.total / Math.max(maxValue, 1)) * 100).toFixed(1)}%
            от пика
          </div>
        </motion.div>
      </div>

      {/* No data state */}
      {chartData.length === 0 && (
        <div className="py-8 text-center text-slate-400">
          <div className="mb-2 text-4xl">📊</div>
          <p>Нет данных о полосе пропускания</p>
          <p className="mt-1 text-sm text-slate-500">
            Данные появятся после начала мониторинга
          </p>
        </div>
      )}
    </motion.div>
  );
}
