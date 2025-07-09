import React, { useState } from 'react';
import { DeviceFolder, NetworkDevice } from '../types/network';
import { 
  ChevronRight, 
  ChevronDown, 
  Folder, 
  FolderOpen,
  Plus,
  Edit,
  Trash2,
  UserPlus,
  Network,
  Server,
  Monitor,
  Printer,
  Smartphone,
  Globe,
  Database,
  Building
} from 'lucide-react';

interface FolderTreeProps {
  folders: DeviceFolder[];
  devices: NetworkDevice[];
  selectedFolderId?: string;
  onFolderSelect: (folderId: string) => void;
  onFolderToggle: (folderId: string) => void;
  onAddFolder: (parentId: string) => void;
  onEditFolder: (folderId: string) => void;
  onDeleteFolder: (folderId: string) => void;
  onAddDeviceToFolder: (folderId: string) => void;
}

const iconMap = {
  Network,
  Server,
  Monitor,
  Printer,
  Smartphone,
  Globe,
  Database,
  Building,
  Folder
};

export const FolderTree: React.FC<FolderTreeProps> = ({
  folders,
  devices,
  selectedFolderId,
  onFolderSelect,
  onFolderToggle,
  onAddFolder,
  onEditFolder,
  onDeleteFolder,
  onAddDeviceToFolder
}) => {
  const [hoveredFolder, setHoveredFolder] = useState<string | null>(null);

  const getDeviceCount = (folderId: string): number => {
    return devices.filter(device => device.folderId === folderId).length;
  };

  const getOnlineDeviceCount = (folderId: string): number => {
    return devices.filter(device => device.folderId === folderId && device.status === 'online').length;
  };

  const renderFolder = (folder: DeviceFolder, level: number = 0) => {
    const IconComponent = iconMap[folder.icon as keyof typeof iconMap] || Folder;
    const deviceCount = getDeviceCount(folder.id);
    const onlineCount = getOnlineDeviceCount(folder.id);
    const hasChildren = folder.children && folder.children.length > 0;

    return (
      <div key={folder.id} className="select-none">
        <div
          className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all duration-200 ${
            selectedFolderId === folder.id
              ? 'bg-blue-500/20 border border-blue-500/30'
              : 'hover:bg-gray-700/50'
          }`}
          style={{ paddingLeft: `${level * 20 + 8}px` }}
          onClick={() => onFolderSelect(folder.id)}
          onMouseEnter={() => setHoveredFolder(folder.id)}
          onMouseLeave={() => setHoveredFolder(null)}
        >
          <div className="flex items-center space-x-2 flex-1">
            {hasChildren && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onFolderToggle(folder.id);
                }}
                className="p-1 hover:bg-gray-600/50 rounded"
              >
                {folder.expanded ? (
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                )}
              </button>
            )}
            
            <div 
              className="p-1.5 rounded-lg border"
              style={{ 
                backgroundColor: `${folder.color}20`,
                borderColor: `${folder.color}40`,
                color: folder.color
              }}
            >
              {folder.expanded && hasChildren ? (
                <FolderOpen className="h-4 w-4" />
              ) : (
                <IconComponent className="h-4 w-4" />
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-white">{folder.name}</span>
                {deviceCount > 0 && (
                  <div className="flex items-center space-x-1 text-xs">
                    <span className="text-green-400">{onlineCount}</span>
                    <span className="text-gray-500">/</span>
                    <span className="text-gray-400">{deviceCount}</span>
                  </div>
                )}
              </div>
              {folder.description && (
                <p className="text-xs text-gray-500 truncate">{folder.description}</p>
              )}
            </div>
          </div>

          {hoveredFolder === folder.id && (
            <div className="flex items-center space-x-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onAddFolder(folder.id);
                }}
                className="p-1 hover:bg-gray-600/50 rounded text-gray-400 hover:text-white"
                title="Add subfolder"
              >
                <Plus className="h-3 w-3" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onAddDeviceToFolder(folder.id);
                }}
                className="p-1 hover:bg-gray-600/50 rounded text-gray-400 hover:text-green-400"
                title="Add device to this folder"
              >
                <UserPlus className="h-3 w-3" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEditFolder(folder.id);
                }}
                className="p-1 hover:bg-gray-600/50 rounded text-gray-400 hover:text-white"
                title="Edit folder"
              >
                <Edit className="h-3 w-3" />
              </button>
              {folder.id !== 'root' && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteFolder(folder.id);
                  }}
                  className="p-1 hover:bg-gray-600/50 rounded text-gray-400 hover:text-red-400"
                  title="Delete folder"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              )}
            </div>
          )}
        </div>

        {folder.expanded && hasChildren && (
          <div className="mt-1">
            {folder.children.map(child => renderFolder(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-1">
      {folders.map(folder => renderFolder(folder))}
    </div>
  );
};