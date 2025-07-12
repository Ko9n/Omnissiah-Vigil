'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DeviceFolder } from '@/types/schemas';
import { 
  X, 
  Network,
  Server,
  Monitor,
  Printer,
  Smartphone,
  Globe,
  Database,
  Building,
  Folder,
  Shield,
  Wifi,
  Check
} from 'lucide-react';

interface FolderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (folder: Omit<DeviceFolder, 'id' | 'children'>) => void;
  folder?: DeviceFolder;
  parentId?: string;
  folders: DeviceFolder[];
}

const iconOptions = [
  { value: 'Network', label: 'Сеть', icon: Network },
  { value: 'Server', label: 'Сервер', icon: Server },
  { value: 'Monitor', label: 'Монитор', icon: Monitor },
  { value: 'Printer', label: 'Принтер', icon: Printer },
  { value: 'Smartphone', label: 'Мобильные', icon: Smartphone },
  { value: 'Globe', label: 'Интернет', icon: Globe },
  { value: 'Database', label: 'База данных', icon: Database },
  { value: 'Building', label: 'Здание', icon: Building },
  { value: 'Shield', label: 'Безопасность', icon: Shield },
  { value: 'Wifi', label: 'WiFi', icon: Wifi },
  { value: 'Folder', label: 'Папка', icon: Folder }
];

const colorOptions = [
  { value: '#3B82F6', label: 'Синий' },
  { value: '#10B981', label: 'Зеленый' },
  { value: '#EF4444', label: 'Красный' },
  { value: '#F59E0B', label: 'Желтый' },
  { value: '#8B5CF6', label: 'Фиолетовый' },
  { value: '#06B6D4', label: 'Голубой' },
  { value: '#F97316', label: 'Оранжевый' },
  { value: '#EC4899', label: 'Розовый' },
  { value: '#84CC16', label: 'Лайм' },
  { value: '#6B7280', label: 'Серый' }
];

export function FolderModal({
  isOpen,
  onClose,
  onSave,
  folder,
  parentId,
  folders
}: FolderModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    color: '#3B82F6',
    icon: 'Folder',
    parentId: parentId || 'root'
  });

  useEffect(() => {
    if (folder) {
      setFormData({
        name: folder.name,
        description: folder.description || '',
        color: folder.color,
        icon: folder.icon,
        parentId: folder.parentId || 'root'
      });
    } else {
      setFormData({
        name: '',
        description: '',
        color: '#3B82F6',
        icon: 'Folder',
        parentId: parentId || 'root'
      });
    }
  }, [folder, parentId, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const folderData: Omit<DeviceFolder, 'id' | 'children'> = {
      name: formData.name,
      parentId: formData.parentId === 'root' ? undefined : formData.parentId,
      color: formData.color,
      icon: formData.icon,
      description: formData.description || '',
      expanded: true
    };

    onSave(folderData);
    onClose();
  };

  const getAllFolders = (folders: DeviceFolder[], prefix = '', excludeId?: string): Array<{id: string, name: string}> => {
    let result: Array<{id: string, name: string}> = [];
    
    folders.forEach(folder => {
      if (folder.id !== excludeId) {
        result.push({
          id: folder.id,
          name: prefix + folder.name
        });
        
        if (folder.children && folder.children.length > 0) {
          result = result.concat(getAllFolders(folder.children, prefix + folder.name + ' / ', excludeId));
        }
      }
    });
    
    return result;
  };

  if (!isOpen) return null;

  const availableFolders = getAllFolders(folders, '', folder?.id);

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
          className="bg-slate-800 border border-slate-700 rounded-xl p-6 w-full max-w-2xl mx-4"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">
              {folder ? 'Редактировать папку' : 'Создать новую папку'}
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Название папки *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Введите название папки"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Родительская папка
                </label>
                <select
                  value={formData.parentId}
                  onChange={(e) => setFormData(prev => ({ ...prev, parentId: e.target.value }))}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="root">Корневая папка</option>
                  {availableFolders.map(folder => (
                    <option key={folder.id} value={folder.id}>
                      {folder.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Описание
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Необязательное описание"
                rows={3}
              />
            </div>

            {/* Icon Selection */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-3">
                Иконка
              </label>
              <div className="grid grid-cols-6 md:grid-cols-11 gap-2">
                {iconOptions.map(option => {
                  const IconComponent = option.icon;
                  const isSelected = formData.icon === option.value;
                  
                  return (
                    <motion.button
                      key={option.value}
                      type="button"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setFormData(prev => ({ ...prev, icon: option.value }))}
                      className={`relative p-3 rounded-lg border-2 transition-all ${
                        isSelected 
                          ? 'border-blue-500 bg-blue-500/20 text-blue-400' 
                          : 'border-slate-600 bg-slate-700/50 text-slate-300 hover:border-slate-500'
                      }`}
                      title={option.label}
                    >
                      <IconComponent className="h-6 w-6 mx-auto" />
                      {isSelected && (
                        <div className="absolute -top-1 -right-1">
                          <Check className="h-4 w-4 text-blue-400 bg-blue-500 rounded-full p-0.5" />
                        </div>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-3">
                Цвет
              </label>
              <div className="grid grid-cols-5 md:grid-cols-10 gap-3">
                {colorOptions.map(color => {
                  const isSelected = formData.color === color.value;
                  
                  return (
                    <motion.button
                      key={color.value}
                      type="button"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setFormData(prev => ({ ...prev, color: color.value }))}
                      className={`relative w-12 h-12 rounded-lg border-2 transition-all ${
                        isSelected ? 'border-white' : 'border-slate-600'
                      }`}
                      style={{ backgroundColor: color.value }}
                      title={color.label}
                    >
                      {isSelected && (
                        <Check className="h-5 w-5 text-white mx-auto" />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Preview */}
            <div className="bg-slate-700/50 rounded-lg p-4">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Предварительный просмотр
              </label>
              <div className="flex items-center space-x-3">
                {React.createElement(
                  iconOptions.find(icon => icon.value === formData.icon)?.icon || Folder,
                  {
                    className: "h-6 w-6",
                    style: { color: formData.color }
                  }
                )}
                <span className="text-white font-medium">
                  {formData.name || 'Название папки'}
                </span>
              </div>
              {formData.description && (
                <p className="text-slate-400 text-sm mt-2">{formData.description}</p>
              )}
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
                {folder ? 'Сохранить изменения' : 'Создать папку'}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
} 