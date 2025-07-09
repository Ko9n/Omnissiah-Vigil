import React from 'react';
import { BandwidthData } from '../types/network';

interface BandwidthChartProps {
  data: BandwidthData[];
}

export const BandwidthChart: React.FC<BandwidthChartProps> = ({ data }) => {
  const maxValue = Math.max(...data.map(d => Math.max(d.upload, d.download, d.total)));
  const chartHeight = 200;

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Bandwidth Usage</h3>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-gray-400">Upload</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-gray-400">Download</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
            <span className="text-gray-400">Total</span>
          </div>
        </div>
      </div>

      <div className="relative" style={{ height: chartHeight }}>
        <svg width="100%" height="100%" className="overflow-visible">
          {data.map((point, index) => {
            const x = (index / (data.length - 1)) * 100;
            const uploadHeight = (point.upload / maxValue) * chartHeight;
            const downloadHeight = (point.download / maxValue) * chartHeight;
            const totalHeight = (point.total / maxValue) * chartHeight;

            return (
              <g key={index}>
                <circle
                  cx={`${x}%`}
                  cy={chartHeight - uploadHeight}
                  r="3"
                  fill="#3B82F6"
                  className="opacity-80"
                />
                <circle
                  cx={`${x}%`}
                  cy={chartHeight - downloadHeight}
                  r="3"
                  fill="#10B981"
                  className="opacity-80"
                />
                <circle
                  cx={`${x}%`}
                  cy={chartHeight - totalHeight}
                  r="3"
                  fill="#8B5CF6"
                  className="opacity-80"
                />
                
                {index > 0 && (
                  <>
                    <line
                      x1={`${((index - 1) / (data.length - 1)) * 100}%`}
                      y1={chartHeight - (data[index - 1].upload / maxValue) * chartHeight}
                      x2={`${x}%`}
                      y2={chartHeight - uploadHeight}
                      stroke="#3B82F6"
                      strokeWidth="2"
                      className="opacity-70"
                    />
                    <line
                      x1={`${((index - 1) / (data.length - 1)) * 100}%`}
                      y1={chartHeight - (data[index - 1].download / maxValue) * chartHeight}
                      x2={`${x}%`}
                      y2={chartHeight - downloadHeight}
                      stroke="#10B981"
                      strokeWidth="2"
                      className="opacity-70"
                    />
                    <line
                      x1={`${((index - 1) / (data.length - 1)) * 100}%`}
                      y1={chartHeight - (data[index - 1].total / maxValue) * chartHeight}
                      x2={`${x}%`}
                      y2={chartHeight - totalHeight}
                      stroke="#8B5CF6"
                      strokeWidth="2"
                      className="opacity-70"
                    />
                  </>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
        <div className="text-center">
          <p className="text-gray-400">Current Upload</p>
          <p className="font-medium text-blue-400">{data[data.length - 1]?.upload || 0} Mbps</p>
        </div>
        <div className="text-center">
          <p className="text-gray-400">Current Download</p>
          <p className="font-medium text-green-400">{data[data.length - 1]?.download || 0} Mbps</p>
        </div>
        <div className="text-center">
          <p className="text-gray-400">Total Usage</p>
          <p className="font-medium text-purple-400">{data[data.length - 1]?.total || 0} Mbps</p>
        </div>
      </div>
    </div>
  );
};