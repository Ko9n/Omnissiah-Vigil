import React from 'react';
import { AlertMessage } from '../types/network';
import { AlertTriangle, Info, XCircle, CheckCircle, Clock } from 'lucide-react';

interface AlertsPanelProps {
  alerts: AlertMessage[];
}

const alertIcons = {
  critical: XCircle,
  warning: AlertTriangle,
  info: Info
};

const alertColors = {
  critical: 'text-red-400 bg-red-500/10 border-red-500/20',
  warning: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
  info: 'text-blue-400 bg-blue-500/10 border-blue-500/20'
};

export const AlertsPanel: React.FC<AlertsPanelProps> = ({ alerts }) => {
  const recentAlerts = alerts.slice(0, 5);
  
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Recent Alerts</h3>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-gray-400">Live</span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {recentAlerts.map((alert) => {
          const Icon = alertIcons[alert.type];
          
          return (
            <div key={alert.id} className="flex items-start space-x-3 p-3 bg-gray-700/30 rounded-lg">
              <div className={`p-2 rounded-lg border ${alertColors[alert.type]}`}>
                <Icon className="h-4 w-4" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-white truncate">
                    {alert.message}
                  </p>
                  {alert.resolved && (
                    <CheckCircle className="h-4 w-4 text-green-400 ml-2" />
                  )}
                </div>
                
                <div className="flex items-center space-x-2 mt-1">
                  <Clock className="h-3 w-3 text-gray-400" />
                  <span className="text-xs text-gray-400">
                    {alert.timestamp.toLocaleTimeString()}
                  </span>
                  {alert.deviceId && (
                    <span className="text-xs text-gray-500">
                      • {alert.deviceId}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {alerts.length === 0 && (
        <div className="text-center py-8">
          <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-3" />
          <p className="text-gray-400">No alerts at this time</p>
          <p className="text-xs text-gray-500 mt-1">All systems operational</p>
        </div>
      )}
    </div>
  );
};