'use client';

import { useNetworkStore } from '@/store/network-store';
import { motion } from 'framer-motion';
import {
  Network,
  RefreshCw,
  Settings,
  Download,
  Bell,
  Search,
  Upload,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ConnectionStatus } from '@/components/ui/connection-status';
import { downloadFile, createBackupFilename } from '@/lib/utils';

export function Header() {
  const {
    metrics,
    alerts,
    refreshData,
    exportData,
    importData,
    loading,
    useApi,
    apiConnected,
    webSocketConnected,
  } = useNetworkStore();

  const unreadAlerts = alerts.filter((alert) => !alert.resolved).length;

  // Определяем статус подключения
  const getConnectionStatus = () => {
    if (useApi && apiConnected) {
      return {
        text: 'API Подключен',
        color: 'bg-green-500',
        title: 'Подключен к бэкенду на http://localhost:5000',
      };
    } else if (useApi && !apiConnected) {
      return {
        text: 'API Недоступен',
        color: 'bg-red-500',
        title: 'Бэкенд недоступен, используются моковые данные',
      };
    } else {
      return {
        text: 'Демо режим',
        color: 'bg-yellow-500',
        title: 'Используются демонстрационные данные',
      };
    }
  };

  const status = getConnectionStatus();

  const handleExport = () => {
    const data = exportData();
    downloadFile(data, createBackupFilename('network-monitor-backup'));
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const data = e.target?.result as string;
            const success = importData(data);
            if (success) {
              alert('Данные успешно импортированы!');
            } else {
              alert('Ошибка при импорте данных. Проверьте формат файла.');
            }
          } catch (error) {
            console.error('Ошибка импорта:', error);
            alert('Ошибка при импорте данных.');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-700/50 bg-slate-800/50 backdrop-blur-sm">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="rounded-lg border border-blue-500/20 bg-blue-500/10 p-2"
            >
              <Network className="h-8 w-8 text-blue-400" />
            </motion.div>
            <div>
              <h1 className="text-xl font-bold text-white">
                Network Monitor Pro
              </h1>
              <p className="text-sm text-slate-400">
                Панель мониторинга сети в реальном времени
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Connection Status */}
            <div className="flex items-center space-x-3">
              <ConnectionStatus
                connected={webSocketConnected}
                apiConnected={apiConnected}
              />

              <button
                onClick={() => {
                  const store = useNetworkStore.getState();
                  if (apiConnected) {
                    // Обновляем данные принудительно
                    store.loadDevices();
                    store.loadSystemHealth();
                    store.loadBandwidthData();
                    store.loadNetworkMetrics();
                  } else {
                    // Пытаемся переподключиться
                    store.initializeApi();
                  }
                }}
                className="rounded px-2 py-1 text-xs text-slate-400 transition-colors hover:bg-slate-700 hover:text-white"
                title={
                  apiConnected ? 'Обновить данные' : 'Переподключиться к API'
                }
              >
                🔄 {apiConnected ? 'Обновить' : 'Подключить'}
              </button>

              <button
                onClick={() => {
                  const store = useNetworkStore.getState();
                  store.setUseApi(!useApi);
                }}
                className="rounded px-2 py-1 text-xs text-slate-400 transition-colors hover:bg-slate-700 hover:text-white"
                title={
                  useApi ? 'Переключиться в демо режим' : 'Включить API режим'
                }
              >
                {useApi ? '🔌 API' : '🧪 Demo'}
              </button>
            </div>

            {/* Search */}
            <div className="hidden md:flex">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-slate-400" />
                <input
                  type="text"
                  placeholder="Поиск устройств..."
                  className="w-64 rounded-lg border border-slate-600 bg-slate-700/50 py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Alerts */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-700/50 hover:text-white"
            >
              <Bell className="h-5 w-5" />
              {unreadAlerts > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center p-0 text-xs"
                >
                  {unreadAlerts}
                </Badge>
              )}
            </motion.button>

            {/* Refresh */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={refreshData}
              disabled={loading}
              className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-700/50 hover:text-white disabled:opacity-50"
              title="Обновить данные"
            >
              <RefreshCw
                className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`}
              />
            </motion.button>

            {/* Export */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleExport}
              className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-700/50 hover:text-white"
              title="Экспорт данных"
            >
              <Download className="h-5 w-5" />
            </motion.button>

            {/* Import */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleImport}
              className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-700/50 hover:text-white"
              title="Импорт данных"
            >
              <Upload className="h-5 w-5" />
            </motion.button>

            {/* Settings */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-700/50 hover:text-white"
              title="Настройки"
            >
              <Settings className="h-5 w-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </header>
  );
}
