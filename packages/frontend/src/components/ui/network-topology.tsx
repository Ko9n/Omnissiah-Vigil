'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  Network,
  Settings,
  Maximize2,
  RotateCcw,
  Router,
  Wifi,
  Monitor,
  Server,
  Smartphone,
  Printer,
  Shield,
} from 'lucide-react';
import { useNetworkStore } from '@/store/network-store';
import { NetworkDevice } from '@/types/network';
import { DeviceContextMenu } from './context-menu';
import { ToastContainer, useToast } from './toast';

// Device type configuration
const deviceIcons = {
  router: Router,
  switch: Network,
  computer: Monitor,
  server: Server,
  mobile: Smartphone,
  wifi: Wifi,
  workstation: Monitor,
  printer: Printer,
  firewall: Shield,
  access_point: Wifi,
};

const deviceColors = {
  router: '#3B82F6',
  switch: '#10B981',
  computer: '#8B5CF6',
  server: '#F59E0B',
  mobile: '#EF4444',
  wifi: '#06B6D4',
  workstation: '#6B7280',
  printer: '#F97316',
  firewall: '#DC2626',
  access_point: '#10B981',
};

interface Connection {
  id: string;
  sourceId: string;
  targetId: string;
}

interface DragState {
  isDragging: boolean;
  deviceId: string | null;
  offset: { x: number; y: number };
}

interface ConnectionState {
  isConnecting: boolean;
  sourceId: string | null;
  tempLine: { x1: number; y1: number; x2: number; y2: number } | null;
}

interface ContextMenuState {
  isVisible: boolean;
  device: any | null;
  position: { x: number; y: number };
}

interface Position {
  x: number;
  y: number;
}

interface DeviceWithPosition extends NetworkDevice {
  position?: Position;
}

interface NetworkTopologyProps {
  isFullscreen?: boolean;
}

export function NetworkTopology({
  isFullscreen = false,
}: NetworkTopologyProps) {
  const { devices, updateDevice, selectedFolderId } = useNetworkStore();
  const { toasts, removeToast, success, error, warning, info } = useToast();
  const router = useRouter();

  const [isEditMode, setIsEditMode] = useState(false);

  // Инициализируем соединения из localStorage сразу
  const [connections, setConnections] = useState<Connection[]>(() => {
    if (typeof window !== 'undefined') {
      const savedConnections = localStorage.getItem('topology-connections');
      if (savedConnections) {
        try {
          return JSON.parse(savedConnections);
        } catch (e) {
          console.error('Failed to load connections:', e);
        }
      }
    }
    return [];
  });

  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    deviceId: null,
    offset: { x: 0, y: 0 },
  });
  const [connectionState, setConnectionState] = useState<ConnectionState>({
    isConnecting: false,
    sourceId: null,
    tempLine: null,
  });
  const [contextMenu, setContextMenu] = useState<ContextMenuState>({
    isVisible: false,
    device: null,
    position: { x: 0, y: 0 },
  });

  // Инициализируем позиции устройств из localStorage сразу
  const [devicePositions, setDevicePositions] = useState<
    Record<string, Position>
  >(() => {
    if (typeof window !== 'undefined') {
      const savedPositions = localStorage.getItem('topology-positions');
      if (savedPositions) {
        try {
          return JSON.parse(savedPositions);
        } catch (e) {
          console.error('Failed to load positions:', e);
        }
      }
    }
    return {};
  });

  const svgRef = useRef<SVGSVGElement>(null);

  // Generate default positions for devices
  const generateDefaultPositions = useCallback(
    (devices: NetworkDevice[]): Record<string, Position> => {
      const positions: Record<string, Position> = {};
      const gridCols = 4;
      const spacing = { x: 200, y: 150 };
      const offset = { x: 100, y: 80 };

      devices.forEach((device, index) => {
        const col = index % gridCols;
        const row = Math.floor(index / gridCols);
        positions[device.id] = {
          x: offset.x + col * spacing.x,
          y: offset.y + row * spacing.y,
        };
      });

      return positions;
    },
    []
  );

  // Генерируем позиции по умолчанию для новых устройств
  useEffect(() => {
    setDevicePositions((prev) => {
      // Если позиции уже есть для всех устройств, не изменяем
      const hasAllPositions = devices.every((device) => prev[device.id]);
      if (hasAllPositions && Object.keys(prev).length > 0) {
        return prev;
      }

      // Генерируем позиции только для новых устройств
      const newPositions = { ...prev };
      const defaultPositions = generateDefaultPositions(devices);

      devices.forEach((device) => {
        if (!newPositions[device.id]) {
          newPositions[device.id] = defaultPositions[device.id];
        }
      });

      return newPositions;
    });
  }, [devices, generateDefaultPositions]);

  // Save positions when they change
  useEffect(() => {
    if (Object.keys(devicePositions).length > 0) {
      localStorage.setItem(
        'topology-positions',
        JSON.stringify(devicePositions)
      );
    }
  }, [devicePositions]);

  // Save connections when they change
  useEffect(() => {
    localStorage.setItem('topology-connections', JSON.stringify(connections));
  }, [connections]);

  // Combine devices with positions
  const devicesWithPositions: DeviceWithPosition[] = devices.map((device) => ({
    ...device,
    position: devicePositions[device.id] || { x: 100, y: 100 },
  }));

  // Reset layout function
  const resetLayout = () => {
    const defaultPositions = generateDefaultPositions(devices);
    setDevicePositions(defaultPositions);
    setConnections([]);
    localStorage.removeItem('topology-positions');
    localStorage.removeItem('topology-connections');
    success(
      'Макет сброшен',
      'Расположение устройств и соединения сброшены к настройкам по умолчанию'
    );
  };

  // Mouse handlers for dragging
  const handleMouseDown = (e: React.MouseEvent, deviceId: string) => {
    if (!isEditMode) return;

    e.preventDefault();
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;

    const device = devicesWithPositions.find((d) => d.id === deviceId);
    if (!device?.position) return;

    setDragState({
      isDragging: true,
      deviceId,
      offset: {
        x: e.clientX - rect.left - device.position.x,
        y: e.clientY - rect.top - device.position.y,
      },
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isEditMode) return;

    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;

    if (dragState.isDragging && dragState.deviceId) {
      const newX = e.clientX - rect.left - dragState.offset.x;
      const newY = e.clientY - rect.top - dragState.offset.y;

      setDevicePositions((prev) => ({
        ...prev,
        [dragState.deviceId!]: { x: newX, y: newY },
      }));
    }

    if (connectionState.isConnecting && connectionState.sourceId) {
      setConnectionState((prev) => ({
        ...prev,
        tempLine: {
          ...prev.tempLine!,
          x2: e.clientX - rect.left,
          y2: e.clientY - rect.top,
        },
      }));
    }
  };

  const handleMouseUp = () => {
    setDragState({
      isDragging: false,
      deviceId: null,
      offset: { x: 0, y: 0 },
    });
  };

  // Device click handler
  const handleDeviceClick = (deviceId: string) => {
    if (!isEditMode) return;

    if (connectionState.isConnecting) {
      if (connectionState.sourceId === deviceId) {
        // Cancel connection
        setConnectionState({
          isConnecting: false,
          sourceId: null,
          tempLine: null,
        });
        info('Отменено', 'Создание соединения отменено');
      } else {
        // Create connection
        const newConnection: Connection = {
          id: `${connectionState.sourceId}-${deviceId}`,
          sourceId: connectionState.sourceId!,
          targetId: deviceId,
        };

        setConnections((prev) => [...prev, newConnection]);
        setConnectionState({
          isConnecting: false,
          sourceId: null,
          tempLine: null,
        });
        success('Соединение создано', 'Новое соединение успешно добавлено');
      }
    } else {
      // Start connection
      const device = devicesWithPositions.find((d) => d.id === deviceId);
      if (device?.position) {
        setConnectionState({
          isConnecting: true,
          sourceId: deviceId,
          tempLine: {
            x1: device.position.x,
            y1: device.position.y,
            x2: device.position.x,
            y2: device.position.y,
          },
        });
        info(
          'Режим соединения',
          'Кликните на другое устройство для создания соединения'
        );
      }
    }
  };

  // Connection deletion
  const handleDeleteConnection = (connectionId: string) => {
    setConnections((prev) => prev.filter((c) => c.id !== connectionId));
    warning('Соединение удалено', 'Соединение между устройствами удалено');
  };

  // Context menu handlers
  const handleContextMenu = (e: React.MouseEvent, device: NetworkDevice) => {
    e.preventDefault();
    setContextMenu({
      isVisible: true,
      device,
      position: { x: e.clientX, y: e.clientY },
    });
  };

  const handleCloseContextMenu = () => {
    setContextMenu({
      isVisible: false,
      device: null,
      position: { x: 0, y: 0 },
    });
  };

  const handleContextAction = (action: string, device: NetworkDevice) => {
    handleCloseContextMenu();

    switch (action) {
      case 'ping':
        if (device.status === 'online') {
          success('Ping успешен', `Устройство ${device.name} отвечает`);
        } else {
          error('Ping неудачен', `Устройство ${device.name} не отвечает`);
        }
        break;
      case 'ssh':
        if (device.status === 'online') {
          info('SSH соединение', `Подключение к ${device.name} через SSH...`);
        } else {
          error('SSH недоступен', `Устройство ${device.name} офлайн`);
        }
        break;
      case 'web':
        if (device.status === 'online') {
          info('Веб-интерфейс', `Открытие веб-интерфейса ${device.name}...`);
        } else {
          error('Веб-интерфейс недоступен', `Устройство ${device.name} офлайн`);
        }
        break;
      case 'edit':
        info('Редактирование', `Редактирование настроек ${device.name}...`);
        break;
      case 'delete':
        warning(
          'Удаление устройства',
          `Устройство ${device.name} помечено для удаления`
        );
        break;
      default:
        info(action, `Действие "${action}" для устройства ${device.name}`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-xl border border-slate-700/50 bg-slate-800/50 p-6 backdrop-blur-sm"
    >
      {/* Header */}
      {!isFullscreen && (
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="rounded-lg bg-slate-700/50 p-2">
              <Network className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">
                Сетевая топология
              </h3>
              <p className="text-sm text-slate-400">Интерактивная карта сети</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsEditMode(!isEditMode)}
              className={`rounded-lg px-4 py-2 transition-colors ${
                isEditMode
                  ? 'border border-green-500/30 bg-green-500/20 text-green-400'
                  : 'bg-slate-700/50 text-slate-400 hover:bg-slate-700 hover:text-white'
              }`}
            >
              {isEditMode ? 'Выйти из редактора' : 'Режим редактирования'}
            </button>
            {isEditMode && (
              <>
                <button
                  onClick={resetLayout}
                  className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-700/50 hover:text-white"
                  title="Сбросить расположение"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
                <button
                  onClick={() => {
                    const positions =
                      localStorage.getItem('topology-positions');
                    const savedConnections = localStorage.getItem(
                      'topology-connections'
                    );
                    // Debug info только для разработки
                    if (process.env.NODE_ENV === 'development') {
                      console.log('=== DEBUG localStorage ===');
                      console.log(
                        'Positions:',
                        positions ? JSON.parse(positions) : 'Not found'
                      );
                      console.log(
                        'Saved Connections:',
                        savedConnections
                          ? JSON.parse(savedConnections)
                          : 'Not found'
                      );
                      console.log('Current devices:', devices.length);
                      console.log(
                        'Current connections count:',
                        connections.length
                      );
                      info('Debug info', 'Проверьте консоль браузера (F12)');
                    }
                  }}
                  className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-700/50 hover:text-white"
                  title="Отладка localStorage"
                >
                  🐛
                </button>
              </>
            )}
            <button className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-700/50 hover:text-white">
              <Settings className="h-4 w-4" />
            </button>
            <button
              onClick={() => router.push('/topology-fullscreen')}
              className="flex items-center space-x-2 rounded-lg border border-blue-500/30 bg-blue-500/20 px-4 py-2 text-blue-400 transition-colors hover:bg-blue-500/30"
              title="Открыть в полноэкранном режиме"
            >
              <Maximize2 className="h-4 w-4" />
              <span>Полный экран</span>
            </button>
          </div>
        </div>
      )}

      {isEditMode && (
        <div className="mb-4 rounded-lg border border-blue-500/20 bg-blue-500/10 p-3">
          <p className="text-sm text-blue-400">
            <strong>Режим редактирования:</strong> Перетаскивайте устройства для
            их перемещения. Кликайте по устройствам для создания соединений.
            {connectionState.isConnecting && (
              <span className="ml-2 text-yellow-400">
                Кликните на другое устройство для подключения, или на то же для
                отмены.
              </span>
            )}
          </p>
        </div>
      )}

      {/* Topology Area */}
      <div
        className="relative w-full rounded-lg border border-slate-700/30 bg-slate-900/50"
        style={{ height: isFullscreen ? 'calc(100vh - 120px)' : '700px' }}
      >
        <svg
          ref={svgRef}
          width="100%"
          height="100%"
          className="overflow-visible"
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/* Background grid */}
          <defs>
            <pattern
              id="topology-grid"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 20 0 L 0 0 0 20"
                fill="none"
                stroke="#475569"
                strokeWidth="0.5"
                opacity="0.3"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#topology-grid)" />

          {/* Connections */}
          {connections.map((connection) => {
            const sourceDevice = devicesWithPositions.find(
              (d) => d.id === connection.sourceId
            );
            const targetDevice = devicesWithPositions.find(
              (d) => d.id === connection.targetId
            );

            if (!sourceDevice || !targetDevice) return null;

            return (
              <g key={connection.id}>
                <line
                  x1={sourceDevice.position!.x}
                  y1={sourceDevice.position!.y}
                  x2={targetDevice.position!.x}
                  y2={targetDevice.position!.y}
                  stroke="#6B7280"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                />
                {isEditMode && (
                  <circle
                    cx={
                      (sourceDevice.position!.x + targetDevice.position!.x) / 2
                    }
                    cy={
                      (sourceDevice.position!.y + targetDevice.position!.y) / 2
                    }
                    r="8"
                    fill="#EF4444"
                    className="cursor-pointer hover:fill-red-600"
                    onClick={() => handleDeleteConnection(connection.id)}
                  >
                    <title>Кликните для удаления соединения</title>
                  </circle>
                )}
              </g>
            );
          })}

          {/* Temporary connection line */}
          {connectionState.tempLine && (
            <line
              x1={connectionState.tempLine.x1}
              y1={connectionState.tempLine.y1}
              x2={connectionState.tempLine.x2}
              y2={connectionState.tempLine.y2}
              stroke="#3B82F6"
              strokeWidth="2"
              strokeDasharray="3,3"
              opacity="0.7"
            />
          )}

          {/* Devices */}
          {devicesWithPositions.map((device) => {
            const Icon =
              deviceIcons[device.type as keyof typeof deviceIcons] || Monitor; // Fallback to Monitor icon
            const color =
              deviceColors[device.type as keyof typeof deviceColors] ||
              '#6B7280'; // Fallback to gray
            const isConnecting = connectionState.sourceId === device.id;

            // Определяем, выделено ли устройство (принадлежит выбранной папке)
            const isHighlighted =
              !selectedFolderId ||
              selectedFolderId === 'root' ||
              device.folderId === selectedFolderId;
            const opacity = isHighlighted ? 1 : 0.3;

            return (
              <g
                key={device.id}
                transform={`translate(${device.position!.x}, ${device.position!.y})`}
                className="cursor-pointer"
                style={{ opacity }}
                onMouseDown={(e) => handleMouseDown(e, device.id)}
                onClick={() => handleDeviceClick(device.id)}
                onContextMenu={(e) => handleContextMenu(e, device)}
              >
                {/* Device background */}
                <circle
                  r={isConnecting ? '28' : '25'}
                  fill={device.status === 'online' ? color : '#6B7280'}
                  opacity="0.2"
                  stroke={isConnecting ? '#3B82F6' : 'transparent'}
                  strokeWidth="2"
                />
                <circle
                  r="20"
                  fill={device.status === 'online' ? color : '#6B7280'}
                  opacity="0.3"
                />

                {/* Device icon */}
                <foreignObject x="-12" y="-12" width="24" height="24">
                  <Icon className="h-6 w-6 text-white" />
                </foreignObject>

                {/* Device name */}
                <text
                  x="0"
                  y="40"
                  textAnchor="middle"
                  className="fill-white text-xs font-medium"
                >
                  {device.name}
                </text>

                {/* Status indicator */}
                <circle
                  cx="15"
                  cy="-15"
                  r="4"
                  fill={
                    device.status === 'online'
                      ? '#10B981'
                      : device.status === 'warning'
                        ? '#F59E0B'
                        : '#EF4444'
                  }
                />

                {/* Edit mode overlay */}
                {isEditMode && (
                  <circle
                    r="25"
                    fill="transparent"
                    stroke="#3B82F6"
                    strokeWidth="1"
                    strokeDasharray="2,2"
                    opacity="0.5"
                  />
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Controls */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <div className="h-3 w-3 rounded-full bg-green-500 opacity-60"></div>
            <span className="text-slate-400">Онлайн</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-3 w-3 rounded-full bg-yellow-500 opacity-60"></div>
            <span className="text-slate-400">Предупреждение</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-3 w-3 rounded-full bg-red-500 opacity-60"></div>
            <span className="text-slate-400">Офлайн</span>
          </div>
        </div>

        <div className="text-sm text-slate-500">
          {devicesWithPositions.length} устройств • {connections.length}{' '}
          соединений
        </div>
      </div>

      {/* Context Menu */}
      {contextMenu.isVisible && contextMenu.device && (
        <div
          className="fixed z-50 min-w-[200px] rounded-lg border border-slate-600 bg-slate-800 p-2 shadow-xl"
          style={{
            left: contextMenu.position.x,
            top: contextMenu.position.y,
          }}
        >
          <div className="mb-2 border-b border-slate-600 pb-2">
            <p className="font-semibold text-white">
              {contextMenu.device.name}
            </p>
            <p className="text-sm text-slate-400">{contextMenu.device.ip}</p>
          </div>

          <button
            onClick={async () => {
              const { pingDevice } = useNetworkStore.getState();
              try {
                success(
                  'Ping запущен',
                  `Выполняется ping устройства ${contextMenu.device?.name}`
                );
                await pingDevice(contextMenu.device!.id);
                success(
                  'Ping выполнен',
                  `Устройство ${contextMenu.device?.name} успешно пропинговано`
                );
              } catch (err) {
                error(
                  'Ошибка ping',
                  `Не удалось выполнить ping устройства ${contextMenu.device?.name}`
                );
              }
              setContextMenu({
                isVisible: false,
                device: null,
                position: { x: 0, y: 0 },
              });
            }}
            className="flex w-full items-center space-x-2 rounded px-3 py-2 text-left text-sm text-slate-300 hover:bg-slate-700"
          >
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
            <span>🏓 Ping устройство</span>
          </button>

          <button
            onClick={() => {
              info(
                'Информация об устройстве',
                `${contextMenu.device?.name}\nIP: ${contextMenu.device?.ip}\nСтатус: ${contextMenu.device?.status}\nПоследний ответ: ${contextMenu.device?.responseTime}ms`
              );
              setContextMenu({
                isVisible: false,
                device: null,
                position: { x: 0, y: 0 },
              });
            }}
            className="flex w-full items-center space-x-2 rounded px-3 py-2 text-left text-sm text-slate-300 hover:bg-slate-700"
          >
            <div className="h-2 w-2 rounded-full bg-blue-500"></div>
            <span>ℹ️ Информация</span>
          </button>

          <button
            onClick={() => {
              warning(
                'Редактирование устройства',
                'Функция будет реализована в следующей версии'
              );
              setContextMenu({
                isVisible: false,
                device: null,
                position: { x: 0, y: 0 },
              });
            }}
            className="flex w-full items-center space-x-2 rounded px-3 py-2 text-left text-sm text-slate-300 hover:bg-slate-700"
          >
            <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
            <span>✏️ Редактировать</span>
          </button>
        </div>
      )}

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </motion.div>
  );
}
