'use client';

import { useEffect } from 'react';
import { useWebSocket } from '@/hooks/useWebSocket';
import { useNetworkStore } from '@/store/network-store';

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { socket, connected, connect, disconnect } = useWebSocket();
  const apiConnected = useNetworkStore((state) => state.apiConnected);
  const setWebSocketConnected = useNetworkStore(
    (state) => state.setWebSocketConnected
  );

  // Автоматическое подключение при доступности API
  useEffect(() => {
    if (apiConnected && !connected) {
      console.log('🔌 API доступен, подключаемся к WebSocket...');
      connect();
    } else if (!apiConnected && connected) {
      console.log('❌ API недоступен, отключаемся от WebSocket...');
      disconnect();
    }
  }, [apiConnected, connected]); // Убираем connect/disconnect из зависимостей

  // Обновляем состояние подключения в store
  useEffect(() => {
    setWebSocketConnected(connected);
  }, [connected]); // Убираем setWebSocketConnected из зависимостей

  // Очистка при размонтировании
  useEffect(() => {
    return () => {
      if (connected) {
        disconnect();
      }
    };
  }, []); // Убираем все зависимости для cleanup эффекта

  return <>{children}</>;
};
