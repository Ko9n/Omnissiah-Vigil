'use client';

import React, { useState, useEffect } from 'react';
import { Card } from './card';
import { Badge } from './badge';
import { useWebSocket } from '@/hooks/useWebSocket';
import { useNetworkStore } from '@/store/network-store';
import { Button } from './button';

export const WebSocketDebug: React.FC = () => {
  const { socket, connected, connect, disconnect } = useWebSocket();
  const { webSocketConnected, apiConnected } = useNetworkStore();
  const [logs, setLogs] = useState<string[]>([]);

  // Перехватываем console.log для отображения логов WebSocket
  useEffect(() => {
    const originalLog = console.log;
    const originalError = console.error;

    console.log = (...args) => {
      const message = args.join(' ');
      if (
        message.includes('WebSocket') ||
        message.includes('🔌') ||
        message.includes('📡')
      ) {
        setLogs((prev) => [
          `${new Date().toLocaleTimeString()} | ${message}`,
          ...prev.slice(0, 9),
        ]);
      }
      originalLog(...args);
    };

    console.error = (...args) => {
      const message = args.join(' ');
      if (message.includes('WebSocket') || message.includes('❌')) {
        setLogs((prev) => [
          `${new Date().toLocaleTimeString()} | ERROR: ${message}`,
          ...prev.slice(0, 9),
        ]);
      }
      originalError(...args);
    };

    return () => {
      console.log = originalLog;
      console.error = originalError;
    };
  }, []);

  const handleConnect = () => {
    console.log('🔧 Ручное подключение WebSocket...');
    connect();
  };

  const handleDisconnect = () => {
    console.log('🔧 Ручное отключение WebSocket...');
    disconnect();
  };

  const testConnection = async () => {
    try {
      console.log('🧪 Тестирование подключения к localhost:5000...');
      const response = await fetch('http://localhost:5000/api/health');
      if (response.ok) {
        const data = await response.text();
        console.log('✅ Бэкенд доступен:', data);
      } else {
        console.log('❌ Бэкенд недоступен, статус:', response.status);
      }
    } catch (error) {
      console.log('❌ Ошибка подключения к бэкенду:', error);
    }
  };

  return (
    <Card className="border-slate-700 bg-slate-800/50">
      <div className="p-4">
        <h3 className="mb-4 text-lg font-semibold text-white">
          WebSocket Debug
        </h3>

        {/* Статусы */}
        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <span className="text-sm text-slate-400">Socket Connected:</span>
            <Badge
              className={
                connected
                  ? 'ml-2 bg-green-500/20 text-green-400'
                  : 'ml-2 bg-red-500/20 text-red-400'
              }
            >
              {connected ? 'Да' : 'Нет'}
            </Badge>
          </div>

          <div>
            <span className="text-sm text-slate-400">Store WebSocket:</span>
            <Badge
              className={
                webSocketConnected
                  ? 'ml-2 bg-green-500/20 text-green-400'
                  : 'ml-2 bg-red-500/20 text-red-400'
              }
            >
              {webSocketConnected ? 'Да' : 'Нет'}
            </Badge>
          </div>

          <div>
            <span className="text-sm text-slate-400">API Connected:</span>
            <Badge
              className={
                apiConnected
                  ? 'ml-2 bg-green-500/20 text-green-400'
                  : 'ml-2 bg-red-500/20 text-red-400'
              }
            >
              {apiConnected ? 'Да' : 'Нет'}
            </Badge>
          </div>

          <div>
            <span className="text-sm text-slate-400">Socket ID:</span>
            <span className="ml-2 font-mono text-xs text-white">
              {socket?.id || 'N/A'}
            </span>
          </div>
        </div>

        {/* Кнопки управления */}
        <div className="mb-4 flex space-x-2">
          <Button size="sm" onClick={handleConnect} disabled={connected}>
            Подключить
          </Button>
          <Button size="sm" onClick={handleDisconnect} disabled={!connected}>
            Отключить
          </Button>
          <Button size="sm" onClick={testConnection} variant="outline">
            Тест API
          </Button>
        </div>

        {/* Логи */}
        <div className="h-48 overflow-y-auto rounded bg-slate-900/50 p-3">
          <div className="font-mono text-xs text-slate-300">
            {logs.length === 0 ? (
              <div className="text-slate-500">
                Логи WebSocket появятся здесь...
              </div>
            ) : (
              logs.map((log, index) => (
                <div key={index} className="mb-1">
                  {log}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};
