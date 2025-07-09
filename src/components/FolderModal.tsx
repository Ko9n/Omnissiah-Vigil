import React, { useState, useEffect } from 'react';
import { DeviceFolder } from '../types/network';
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
  Wifi
} from 'lucide-react';

interface FolderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (folder: DeviceFolder) => void;
  folder?: DeviceFolder;
  parentId?: string;
  folders: DeviceFolder[];
}

const iconOptions = [
  { value: 'Network', label: 'Network', icon: Network },
  { value: 'Server', label: 'Server', icon: Server },
  { value: 'Monitor', label: 'Monitor', icon: Monitor },
  { value: 'Printer', label: 'Printer', icon: Printer },
  { value: 'Smartphone', label: 'Mobile', icon: Smartphone },
  { value: 'Globe', label: 'Globe', icon: Globe },
  { value: 'Database', label: 'Database', icon: Database },
  { value: 'Building', label: 'Building', icon: Building },
  { value: 'Shield', label: 'Shield', icon: Shield },
  { value: 'Wifi', label: 'WiFi', icon: Wifi },
  { value: 'Folder', label: 'Folder', icon: Folder }
];

const colorOptions = [
  '#3B82F6', // Blue
  '#10B981', // Green
  '#EF4444', // Red
  '#F59E0B', // Yellow
  '#8B5CF6', // Purple
  '#06B6D4', // Cyan
  '#F97316', // Orange
  '#EC4899', // Pink
  '#84CC16', // Lime
  '#6B7280'  // Gray
];

export const FolderModal: React.FC<FolderModalProps> = ({
  isOpen,
  onClose,
  onSave,
  folder,
  parentId,
  folders
}) => {
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
    
    const newFolder: DeviceFolder = {
      id: folder?.id || `folder-${Date.now()}`,
      name: formData.name,
      parentId: formData.parentId === 'root' ? undefined : formData.parentId,
      color: formData.color,
      icon: formData.icon,
      description: formData.description,
      expanded: true,
      children: folder?.children || []
    };

    onSave(newFolder);
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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 w-full max-w-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">
            {folder ? 'Edit Folder' : 'Create New Folder'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Folder Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter folder name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Optional description"
              rows={2}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Parent Folder
            </label>
            <select
              value={formData.parentId}
              onChange={(e) => setFormData(prev => ({ ...prev, parentId: e.target.value }))}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="root">Root (Top Level)</option>
              {availableFolders.map(folder => (
                <option key={folder.id} value={folder.id}>
                  {folder.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Icon
            </label>
            <div className="grid grid-cols-6 gap-2">
              {iconOptions.map(option => {
                const IconComponent = option.icon;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, icon: option.value }))}
                    className={`p-3 rounded-lg border transition-colors ${
                      formData.icon === option.value
                        ? 'border-blue-500 bg-blue-500/20'
                        : 'border-gray-600 hover:border-gray-500'
                    }`}
                  >
                    <IconComponent className="h-5 w-5 text-white mx-auto" />
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Color
            </label>
            <div className="grid grid-cols-10 gap-2">
              {colorOptions.map(color => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, color }))}
                  className={`w-8 h-8 rounded-lg border-2 transition-all ${
                    formData.color === color
                      ? 'border-white scale-110'
                      : 'border-gray-600 hover:border-gray-400'
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          {/* Preview */}
          <div className="p-4 bg-gray-700/50 rounded-lg">
            <p className="text-sm text-gray-400 mb-2">Preview:</p>
            <div className="flex items-center space-x-3">
              <div 
                className="p-2 rounded-lg border"
                style={{ 
                  backgroundColor: `${formData.color}20`,
                  borderColor: `${formData.color}40`,
                  color: formData.color
                }}
              >
                {React.createElement(iconOptions.find(i => i.value === formData.icon)?.icon || Folder, {
                  className: "h-5 w-5"
                })}
              </div>
              <div>
                <p className="text-white font-medium">{formData.name || 'Folder Name'}</p>
                {formData.description && (
                  <p className="text-xs text-gray-400">{formData.description}</p>
                )}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-4 pt-4 border-t border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            >
              {folder ? 'Update Folder' : 'Create Folder'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};