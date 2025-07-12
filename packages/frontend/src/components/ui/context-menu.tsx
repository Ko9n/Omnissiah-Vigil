'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Zap,
  Settings,
  Terminal,
  Wifi,
  AlertCircle,
  Trash2,
  Edit3,
  Activity,
  Globe,
  Shield,
  MoreHorizontal,
} from 'lucide-react';
import { NetworkDevice } from '@/types/network';

interface ContextMenuProps {
  device: NetworkDevice;
  position: { x: number; y: number };
  isVisible: boolean;
  onClose: () => void;
  onAction: (action: string, device: NetworkDevice) => void;
}

export const DeviceContextMenu: React.FC<ContextMenuProps> = ({
  device,
  position,
  isVisible,
  onClose,
  onAction,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const menuItems = [
    {
      icon: Activity,
      label: 'Пинг устройства',
      action: 'ping',
      color: 'text-green-400 hover:text-green-300',
      disabled: device.status === 'offline',
    },
    {
      icon: Terminal,
      label: 'SSH подключение',
      action: 'ssh',
      color: 'text-blue-400 hover:text-blue-300',
      disabled: device.status === 'offline',
    },
    {
      icon: Globe,
      label: 'Веб-интерфейс',
      action: 'web',
      color: 'text-purple-400 hover:text-purple-300',
      disabled: device.status === 'offline',
    },
    { divider: true },
    {
      icon: Settings,
      label: 'Настройки',
      action: 'settings',
      color: 'text-slate-400 hover:text-white',
    },
    {
      icon: Edit3,
      label: 'Редактировать',
      action: 'edit',
      color: 'text-slate-400 hover:text-white',
    },
    {
      icon: Wifi,
      label: 'Сканировать порты',
      action: 'scan',
      color: 'text-cyan-400 hover:text-cyan-300',
    },
    { divider: true },
    {
      icon: AlertCircle,
      label: 'Просмотр логов',
      action: 'logs',
      color: 'text-yellow-400 hover:text-yellow-300',
    },
    {
      icon: Shield,
      label: 'Безопасность',
      action: 'security',
      color: 'text-orange-400 hover:text-orange-300',
    },
    { divider: true },
    {
      icon: Trash2,
      label: 'Удалить устройство',
      action: 'delete',
      color: 'text-red-400 hover:text-red-300',
      dangerous: true,
    },
  ];

  // Проверяем, чтобы меню не выходило за границы экрана
  const adjustedPosition = {
    x: Math.min(
      position.x,
      (typeof window !== 'undefined' ? window.innerWidth : 1920) - 250
    ),
    y: Math.min(
      position.y,
      (typeof window !== 'undefined' ? window.innerHeight : 1080) -
        menuItems.length * 40
    ),
  };

  return (
    <div
      ref={menuRef}
      className="fixed z-50 min-w-[240px] rounded-lg border border-slate-600/50 bg-slate-800/95 py-2 shadow-xl backdrop-blur-sm"
      style={{
        left: adjustedPosition.x,
        top: adjustedPosition.y,
      }}
    >
      {/* Заголовок меню */}
      <div className="border-b border-slate-600/50 px-4 py-2">
        <div className="flex items-center space-x-3">
          <div
            className={`h-3 w-3 rounded-full ${
              device.status === 'online'
                ? 'bg-green-500'
                : device.status === 'warning'
                  ? 'bg-yellow-500'
                  : 'bg-red-500'
            }`}
          />
          <div>
            <div className="text-sm font-medium text-white">{device.name}</div>
            <div className="text-xs text-slate-400">{device.ip}</div>
          </div>
        </div>
      </div>

      {/* Элементы меню */}
      <div className="py-1">
        {menuItems.map((item, index) => {
          if ('divider' in item) {
            return (
              <div key={index} className="mx-2 my-1 h-px bg-slate-600/30" />
            );
          }

          const Icon = item.icon;
          return (
            <button
              key={index}
              onClick={() => {
                onAction(item.action, device);
                onClose();
              }}
              disabled={item.disabled}
              className={`flex w-full items-center space-x-3 px-4 py-2 text-sm transition-colors ${
                item.disabled
                  ? 'cursor-not-allowed text-slate-500'
                  : `${item.color} cursor-pointer hover:bg-slate-700/50`
              } ${item.dangerous ? 'hover:bg-red-500/10' : ''}`}
            >
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
              {item.disabled && (
                <span className="ml-auto text-xs text-slate-500">(офлайн)</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Информация об устройстве */}
      <div className="border-t border-slate-600/50 px-4 py-2 text-xs text-slate-400">
        <div className="flex justify-between">
          <span>Тип: {device.type}</span>
          <span>Время отклика: {device.responseTime}ms</span>
        </div>
        <div className="mt-1 flex justify-between">
          <span>Uptime: {device.uptime.toFixed(1)}%</span>
          <span>
            Последний: {new Date(device.lastSeen).toLocaleTimeString()}
          </span>
        </div>
      </div>
    </div>
  );
};
