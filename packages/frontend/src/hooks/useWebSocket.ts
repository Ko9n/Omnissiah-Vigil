'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import { useNetworkStore } from '@/store/network-store';

interface UseWebSocketReturn {
  socket: Socket | null;
  connected: boolean;
  connect: () => void;
  disconnect: () => void;
}

export const useWebSocket = (): UseWebSocketReturn => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState(false);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout>();
  const reconnectAttempts = useRef(0);
  const maxReconnectAttempts = 5;

  const updateDeviceStatus = useNetworkStore(
    (state) => state.updateDeviceStatus
  );
  const updateMetrics = useNetworkStore((state) => state.updateMetrics);
  const updateSystemHealth = useNetworkStore(
    (state) => state.updateSystemHealth
  );
  const addBandwidthData = useNetworkStore((state) => state.addBandwidthData);
  const addSystemLog = useNetworkStore((state) => state.addSystemLog);

  const connect = useCallback(() => {
    if (socket?.connected) {
      console.log('⚠️ WebSocket уже подключен, пропускаем');
      return;
    }

    console.log(
      '🔌 Подключение к WebSocket серверу (http://localhost:5000)...'
    );

    const newSocket = io('http://localhost:5000', {
      transports: ['websocket', 'polling'], // Добавляем polling как fallback
      reconnection: false, // Управляем переподключением вручную
      timeout: 5000,
      forceNew: true,
    });

    // Обработчики подключения
    newSocket.on('connect', () => {
      console.log('✅ WebSocket подключен');
      setConnected(true);
      reconnectAttempts.current = 0;

      addSystemLog({
        type: 'info',
        message: 'WebSocket соединение установлено',
      });
    });

    newSocket.on('disconnect', (reason) => {
      console.log('❌ WebSocket отключен:', reason);
      setConnected(false);

      addSystemLog({
        type: 'warning',
        message: `WebSocket соединение разорвано: ${reason}`,
      });

      // Автоматическое переподключение
      if (reconnectAttempts.current < maxReconnectAttempts) {
        const delay = Math.min(
          1000 * Math.pow(2, reconnectAttempts.current),
          30000
        );
        console.log(
          `🔄 Переподключение через ${delay}ms (попытка ${reconnectAttempts.current + 1}/${maxReconnectAttempts})`
        );

        reconnectTimeoutRef.current = setTimeout(() => {
          reconnectAttempts.current++;
          newSocket.connect();
        }, delay);
      }
    });

    newSocket.on('connect_error', (error) => {
      console.error('❌ Ошибка подключения WebSocket:', error);
      setConnected(false);

      addSystemLog({
        type: 'error',
        message: `Ошибка WebSocket подключения: ${error.message}`,
      });
    });

    // Обработчики событий данных
    newSocket.on(
      'device:ping:result',
      (data: {
        deviceId: string;
        success: boolean;
        responseTime?: number;
        error?: string;
      }) => {
        console.log('📡 Получен результат ping:', data);

        updateDeviceStatus(data.deviceId, {
          status: data.success ? 'online' : 'offline',
          responseTime: data.responseTime || 0,
          lastSeen: new Date(),
        });

        if (!data.success && data.error) {
          addSystemLog({
            type: 'warning',
            message: `Устройство ${data.deviceId} недоступно: ${data.error}`,
          });
        }
      }
    );

    // Обработчик для старого формата events
    newSocket.on(
      'metrics:update',
      (data: {
        systemHealth?: any;
        bandwidth?: any;
        networkStats?: any;
        metrics?: any;
      }) => {
        console.log('📊 Получены обновленные метрики (старый формат):', data);

        if (data.metrics) {
          updateMetrics(data.metrics);
        }
        if (data.systemHealth) {
          updateSystemHealth(data.systemHealth);
        }
      }
    );

    // Обработчик для нового формата от бэкенда
    newSocket.on(
      'metrics_update',
      (data: {
        timestamp: string;
        deviceMetrics: Array<{
          deviceId: string;
          deviceName: string;
          ip: string;
          status: 'online' | 'offline';
          responseTime: number;
          packetLoss: string;
        }>;
        systemHealth: {
          cpu: number;
          memory: number;
          disk: number;
          network: number;
          temperature: number;
          uptime: number;
          processes: number;
        };
        networkMetrics: {
          totalDevices: number;
          onlineDevices: number;
          offlineDevices: number;
          averageResponseTime: number;
        };
      }) => {
        console.log('📊 Получены real-time метрики от бэкенда:', data);

        // Обновляем статусы устройств
        data.deviceMetrics.forEach((device) => {
          updateDeviceStatus(device.deviceId, {
            status: device.status,
            responseTime: device.responseTime,
            lastSeen: new Date(),
          });
        });

        // Обновляем системные метрики
        updateSystemHealth({
          ...data.systemHealth,
          lastUpdate: new Date(),
        });

        // Обновляем общие метрики сети
        updateMetrics({
          totalDevices: data.networkMetrics.totalDevices,
          onlineDevices: data.networkMetrics.onlineDevices,
          offlineDevices: data.networkMetrics.offlineDevices,
          averageResponseTime: data.networkMetrics.averageResponseTime,
          lastUpdate: new Date(),
        });

        // Симулируем данные пропускной способности для графика
        const bandwidthData = {
          timestamp: new Date(),
          upload: 50 + Math.random() * 100, // Mbps
          download: 100 + Math.random() * 200, // Mbps
          total: 150 + Math.random() * 300, // Mbps
        };
        addBandwidthData(bandwidthData);

        addSystemLog({
          type: 'info',
          message: `Обновлены метрики: ${data.networkMetrics.onlineDevices}/${data.networkMetrics.totalDevices} устройств онлайн`,
        });
      }
    );

    newSocket.on(
      'device:monitoring:update',
      (data: {
        deviceId: string;
        status: 'online' | 'offline' | 'warning';
        responseTime: number;
        timestamp: string;
      }) => {
        console.log('🔄 Обновление мониторинга устройства:', data);

        updateDeviceStatus(data.deviceId, {
          status: data.status,
          responseTime: data.responseTime,
          lastSeen: new Date(data.timestamp),
        });
      }
    );

    setSocket(newSocket);
  }, [
    socket,
    addSystemLog,
    updateDeviceStatus,
    updateMetrics,
    updateSystemHealth,
    addBandwidthData,
  ]);

  const disconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }

    if (socket) {
      console.log('🔌 Отключение от WebSocket сервера...');
      socket.disconnect();
      setSocket(null);
      setConnected(false);
    }
  }, [socket]);

  // Очистка при размонтировании
  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [disconnect]);

  return {
    socket,
    connected,
    connect,
    disconnect,
  };
};
