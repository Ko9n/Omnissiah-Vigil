'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NetworkDevice, DeviceFolder } from '@/types/schemas';
import { 
  X, 
  Router, 
  Server, 
  Monitor, 
  Printer, 
  Smartphone, 
  Network,
  Wifi,
  Shield,
  Check
} from 'lucide-react';

interface DeviceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (device: Omit<NetworkDevice, 'id' | 'lastSeen' | 'status'>) => void;
  device?: NetworkDevice;
  folders: DeviceFolder[];
  defaultFolderId?: string;
}

const deviceTypes = [
  { value: 'router', label: 'Роутер', icon: Router },
  { value: 'switch', label: 'Коммутатор', icon: Network },
  { value: 'server', label: 'Сервер', icon: Server },
  { value: 'workstation', label: 'Рабочая станция', icon: Monitor },
  { value: 'printer', label: 'Принтер', icon: Printer },
  { value: 'mobile', label: 'Мобильное устройство', icon: Smartphone },
  { value: 'firewall', label: 'Firewall', icon: Shield },
  { value: 'access_point', label: 'Точка доступа', icon: Wifi }
] as const;

type DeviceType = typeof deviceTypes[number]['value'];

export function DeviceModal({
  isOpen,
  onClose,
  onSave,
  device,
  folders,
  defaultFolderId
}: DeviceModalProps) {
  const [formData, setFormData] = useState<{
    name: string;
    ip: string;
    mac?: string;
    type: DeviceType;
    location?: string;
    folderId: string;
    vendor?: string;
    model?: string;
    osVersion?: string;
    monitoring: {
      ping: boolean;
      snmp: boolean;
      http: boolean;
      ssh: boolean;
    };
  }>({
    name: '',
    ip: '',
    mac: '',
    type: 'workstation',
    location: '',
    folderId: 'root',
    vendor: '',
    model: '',
    osVersion: '',
    monitoring: {
      ping: true,
      snmp: false,
      http: false,
      ssh: false
    }
  });

  useEffect(() => {
    if (device) {
      setFormData({
        name: device.name,
        ip: device.ip,
        mac: device.mac,
        type: device.type as DeviceType,
        location: device.location,
        folderId: device.folderId || 'root',
        vendor: device.vendor,
        model: device.model,
        osVersion: device.osVersion,
        monitoring: device.monitoring || {
          ping: true,
          snmp: false,
          http: false,
          ssh: false
        }
      });
    } else {
      setFormData({
        name: '',
        ip: '',
        mac: '',
        type: 'workstation',
        location: '',
        folderId: defaultFolderId || 'root',
        vendor: '',
        model: '',
        osVersion: '',
        monitoring: {
          ping: true,
          snmp: false,
          http: false,
          ssh: false
        }
      });
    }
  }, [device, isOpen, defaultFolderId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const deviceData: Omit<NetworkDevice, 'id' | 'lastSeen' | 'status'> = {
      name: formData.name,
      ip: formData.ip,
      mac: formData.mac || '',
      type: formData.type,
      responseTime: device?.responseTime || 0,
      uptime: device?.uptime || 0,
      location: formData.location || '',
      folderId: formData.folderId || 'root',
      vendor: formData.vendor || '',
      model: formData.model || '',
      osVersion: formData.osVersion || '',
      monitoring: formData.monitoring,
      position: device?.position
    };

    onSave(deviceData);
    onClose();
  };

  const getAllFolders = (folders: DeviceFolder[], prefix = ''): Array<{id: string, name: string}> => {
    let result: Array<{id: string, name: string}> = [];
    
    folders.forEach(folder => {
      result.push({
        id: folder.id,
        name: prefix + folder.name
      });
      
      if (folder.children && folder.children.length > 0) {
        result = result.concat(getAllFolders(folder.children, prefix + folder.name + ' / '));
      }
    });
    
    return result;
  };

  if (!isOpen) return null;

  const flatFolders = getAllFolders(folders);

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3 }}
          className="bg-slate-800 border border-slate-700 rounded-xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto mx-4"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">
              {device ? 'Редактировать устройство' : 'Добавить новое устройство'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div>
              <h3 className="text-lg font-medium text-white mb-4">Основная информация</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Название устройства *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Введите название устройства"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    IP адрес *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.ip}
                    onChange={(e) => setFormData(prev => ({ ...prev, ip: e.target.value }))}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="192.168.1.100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    MAC адрес
                  </label>
                  <input
                    type="text"
                    value={formData.mac || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, mac: e.target.value }))}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="00:1B:44:11:3A:B7"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Расположение
                  </label>
                  <input
                    type="text"
                    value={formData.location || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Серверная, 1 этаж"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Папка *
                  </label>
                  <select
                    required
                    value={formData.folderId}
                    onChange={(e) => setFormData(prev => ({ ...prev, folderId: e.target.value }))}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="root">Корневая папка</option>
                    {flatFolders.map(folder => (
                      <option key={folder.id} value={folder.id}>
                        {folder.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Device Type */}
            <div>
              <h3 className="text-lg font-medium text-white mb-4">Тип устройства *</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {deviceTypes.map(type => {
                  const Icon = type.icon;
                  const isSelected = formData.type === type.value;
                  
                  return (
                    <motion.button
                      key={type.value}
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setFormData(prev => ({ ...prev, type: type.value }))}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        isSelected 
                          ? 'border-blue-500 bg-blue-500/20 text-blue-400' 
                          : 'border-slate-600 bg-slate-700/50 text-slate-300 hover:border-slate-500'
                      }`}
                    >
                      <Icon className="h-8 w-8 mx-auto mb-2" />
                      <div className="text-sm font-medium">{type.label}</div>
                      {isSelected && (
                        <div className="absolute top-2 right-2">
                          <Check className="h-4 w-4 text-blue-400" />
                        </div>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Device Details */}
            <div>
              <h3 className="text-lg font-medium text-white mb-4">Дополнительные сведения</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Производитель
                  </label>
                  <input
                    type="text"
                    value={formData.vendor || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, vendor: e.target.value }))}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Cisco, HP, Dell"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Модель
                  </label>
                  <input
                    type="text"
                    value={formData.model || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, model: e.target.value }))}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Номер модели"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Версия ОС
                  </label>
                  <input
                    type="text"
                    value={formData.osVersion || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, osVersion: e.target.value }))}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Windows 11, Ubuntu 22.04"
                  />
                </div>
              </div>
            </div>

            {/* Monitoring Settings */}
            <div>
              <h3 className="text-lg font-medium text-white mb-4">Настройки мониторинга</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { key: 'ping', label: 'PING', description: 'Проверка доступности' },
                  { key: 'snmp', label: 'SNMP', description: 'Мониторинг через SNMP' },
                  { key: 'http', label: 'HTTP', description: 'Веб-сервисы' },
                  { key: 'ssh', label: 'SSH', description: 'Удаленный доступ' }
                ].map(monitor => (
                  <motion.div
                    key={monitor.key}
                    whileHover={{ scale: 1.02 }}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      formData.monitoring[monitor.key as keyof typeof formData.monitoring]
                        ? 'border-green-500 bg-green-500/20 text-green-400'
                        : 'border-slate-600 bg-slate-700/50 text-slate-300 hover:border-slate-500'
                    }`}
                    onClick={() => setFormData(prev => ({
                      ...prev,
                      monitoring: {
                        ...prev.monitoring,
                        [monitor.key]: !prev.monitoring[monitor.key as keyof typeof prev.monitoring]
                      }
                    }))}
                  >
                    <div className="text-center">
                      <div className="font-semibold mb-1">{monitor.label}</div>
                      <div className="text-xs opacity-75">{monitor.description}</div>
                      {formData.monitoring[monitor.key as keyof typeof formData.monitoring] && (
                        <div className="mt-2">
                          <Check className="h-4 w-4 mx-auto text-green-400" />
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end space-x-4 pt-6 border-t border-slate-700">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 text-slate-300 hover:text-white transition-colors"
              >
                Отмена
              </button>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors font-medium"
              >
                {device ? 'Сохранить изменения' : 'Добавить устройство'}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
} 