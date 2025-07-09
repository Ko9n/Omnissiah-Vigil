import React, { useState, useRef, useCallback } from 'react';
import { NetworkDevice } from '../types/network';
import { Router, Server, Monitor, Printer, Smartphone, Network, Plus, Save, RotateCcw } from 'lucide-react';

interface NetworkTopologyProps {
  devices: NetworkDevice[];
  onUpdateDevice?: (deviceId: string, updates: Partial<NetworkDevice>) => void;
}

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

const deviceIcons = {
  router: Router,
  switch: Network,
  server: Server,
  workstation: Monitor,
  printer: Printer,
  mobile: Smartphone,
  firewall: Router,
  access_point: Network
};

const deviceColors = {
  router: '#EF4444',
  switch: '#3B82F6',
  server: '#8B5CF6',
  workstation: '#6B7280',
  printer: '#F97316',
  mobile: '#EC4899',
  firewall: '#DC2626',
  access_point: '#10B981'
};

export const NetworkTopology: React.FC<NetworkTopologyProps> = ({ 
  devices, 
  onUpdateDevice 
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    deviceId: null,
    offset: { x: 0, y: 0 }
  });
  const [connectionState, setConnectionState] = useState<ConnectionState>({
    isConnecting: false,
    sourceId: null,
    tempLine: null
  });
  const [isEditMode, setIsEditMode] = useState(false);

  // Initialize device positions if they don't exist
  const devicesWithPositions = devices.map((device, index) => ({
    ...device,
    position: device.position || {
      x: 100 + (index % 5) * 150,
      y: 100 + Math.floor(index / 5) * 120
    }
  }));

  const handleMouseDown = useCallback((e: React.MouseEvent, deviceId: string) => {
    if (!isEditMode) return;
    
    e.preventDefault();
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;

    const device = devicesWithPositions.find(d => d.id === deviceId);
    if (!device) return;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    setDragState({
      isDragging: true,
      deviceId,
      offset: {
        x: mouseX - device.position!.x,
        y: mouseY - device.position!.y
      }
    });
  }, [isEditMode, devicesWithPositions]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    if (dragState.isDragging && dragState.deviceId && onUpdateDevice) {
      const newX = mouseX - dragState.offset.x;
      const newY = mouseY - dragState.offset.y;
      
      onUpdateDevice(dragState.deviceId, {
        position: { x: Math.max(50, Math.min(750, newX)), y: Math.max(50, Math.min(350, newY)) }
      });
    }

    if (connectionState.isConnecting && connectionState.sourceId) {
      const sourceDevice = devicesWithPositions.find(d => d.id === connectionState.sourceId);
      if (sourceDevice) {
        setConnectionState(prev => ({
          ...prev,
          tempLine: {
            x1: sourceDevice.position!.x,
            y1: sourceDevice.position!.y,
            x2: mouseX,
            y2: mouseY
          }
        }));
      }
    }
  }, [dragState, connectionState, devicesWithPositions, onUpdateDevice]);

  const handleMouseUp = useCallback(() => {
    setDragState({
      isDragging: false,
      deviceId: null,
      offset: { x: 0, y: 0 }
    });
  }, []);

  const handleDeviceClick = useCallback((deviceId: string) => {
    if (!isEditMode) return;

    if (connectionState.isConnecting) {
      if (connectionState.sourceId && connectionState.sourceId !== deviceId) {
        // Create connection
        const newConnection: Connection = {
          id: `conn-${Date.now()}`,
          sourceId: connectionState.sourceId,
          targetId: deviceId
        };
        setConnections(prev => [...prev, newConnection]);
      }
      
      setConnectionState({
        isConnecting: false,
        sourceId: null,
        tempLine: null
      });
    } else {
      // Start connection
      setConnectionState({
        isConnecting: true,
        sourceId: deviceId,
        tempLine: null
      });
    }
  }, [isEditMode, connectionState]);

  const handleDeleteConnection = useCallback((connectionId: string) => {
    setConnections(prev => prev.filter(c => c.id !== connectionId));
  }, []);

  const resetLayout = useCallback(() => {
    devicesWithPositions.forEach((device, index) => {
      if (onUpdateDevice) {
        onUpdateDevice(device.id, {
          position: {
            x: 100 + (index % 5) * 150,
            y: 100 + Math.floor(index / 5) * 120
          }
        });
      }
    });
    setConnections([]);
  }, [devicesWithPositions, onUpdateDevice]);

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Network Topology</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsEditMode(!isEditMode)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              isEditMode 
                ? 'bg-green-500 hover:bg-green-600 text-white' 
                : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
            }`}
          >
            {isEditMode ? 'Exit Edit' : 'Edit Mode'}
          </button>
          {isEditMode && (
            <>
              <button
                onClick={resetLayout}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                title="Reset layout"
              >
                <RotateCcw className="h-5 w-5" />
              </button>
            </>
          )}
        </div>
      </div>

      {isEditMode && (
        <div className="mb-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <p className="text-sm text-blue-400">
            <strong>Edit Mode:</strong> Drag devices to move them. Click devices to create connections.
            {connectionState.isConnecting && (
              <span className="ml-2 text-yellow-400">
                Click another device to connect, or click the same device to cancel.
              </span>
            )}
          </p>
        </div>
      )}
      
      <div className="relative bg-gray-900/50 rounded-lg border border-gray-700/30" style={{ height: '400px' }}>
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
            <pattern id="topology-grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#374151" strokeWidth="0.5" opacity="0.3"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#topology-grid)" />
          
          {/* Connections */}
          {connections.map((connection) => {
            const sourceDevice = devicesWithPositions.find(d => d.id === connection.sourceId);
            const targetDevice = devicesWithPositions.find(d => d.id === connection.targetId);
            
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
                    cx={(sourceDevice.position!.x + targetDevice.position!.x) / 2}
                    cy={(sourceDevice.position!.y + targetDevice.position!.y) / 2}
                    r="8"
                    fill="#EF4444"
                    className="cursor-pointer hover:fill-red-600"
                    onClick={() => handleDeleteConnection(connection.id)}
                  >
                    <title>Click to delete connection</title>
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
            const Icon = deviceIcons[device.type];
            const color = deviceColors[device.type];
            const isConnecting = connectionState.sourceId === device.id;
            
            return (
              <g 
                key={device.id} 
                transform={`translate(${device.position!.x}, ${device.position!.y})`}
                className={isEditMode ? 'cursor-pointer' : ''}
                onMouseDown={(e) => handleMouseDown(e, device.id)}
                onClick={() => handleDeviceClick(device.id)}
              >
                {/* Device background */}
                <circle
                  r={isConnecting ? "28" : "25"}
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
                    device.status === 'online' ? '#10B981' :
                    device.status === 'warning' ? '#F59E0B' : '#EF4444'
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
      
      <div className="mt-4 flex items-center justify-between text-sm">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full opacity-60"></div>
            <span className="text-gray-400">Online</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full opacity-60"></div>
            <span className="text-gray-400">Warning</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full opacity-60"></div>
            <span className="text-gray-400">Offline</span>
          </div>
        </div>
        
        <div className="text-gray-500">
          {devicesWithPositions.length} devices • {connections.length} connections
        </div>
      </div>
    </div>
  );
};