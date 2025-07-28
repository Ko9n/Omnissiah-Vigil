'use client';

import { useNetworkStore } from '@/store/network-store';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FolderOpen,
  FolderClosed,
  Plus,
  Settings,
  ChevronRight,
  ChevronDown,
  Network,
  Server,
  Monitor,
  Printer,
  Smartphone,
  Shield,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export function Sidebar() {
  const {
    folders,
    devices,
    selectedFolderId,
    sidebarCollapsed,
    setSelectedFolder,
    setSidebarCollapsed,
    updateFolder,
  } = useNetworkStore();

  const getDeviceCountInFolder = (folderId: string): number => {
    return devices.filter((device) => device.folderId === folderId).length;
  };

  const getIconForFolder = (iconName: string) => {
    const icons = {
      Network,
      Server,
      Monitor,
      Printer,
      Smartphone,
      Shield,
      FolderOpen,
    };
    const Icon = icons[iconName as keyof typeof icons] || FolderOpen;
    return Icon;
  };

  const FolderItem = ({
    folder,
    level = 0,
  }: {
    folder: any;
    level?: number;
  }) => {
    const Icon = getIconForFolder(folder.icon);
    const deviceCount = getDeviceCountInFolder(folder.id);
    const hasChildren = folder.children && folder.children.length > 0;

    return (
      <motion.div
        layout
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="w-full"
      >
        <div
          className={cn(
            'group flex w-full cursor-pointer items-center rounded-lg px-3 py-2 text-sm transition-all duration-200',
            selectedFolderId === folder.id
              ? 'border-r-2 border-blue-500 bg-blue-500/20 text-blue-400'
              : 'text-slate-300 hover:bg-slate-700/50 hover:text-white',
            level > 0 && 'ml-4'
          )}
          style={{ paddingLeft: `${12 + level * 16}px` }}
          onClick={() => setSelectedFolder(folder.id)}
        >
          {hasChildren && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                updateFolder(folder.id, { expanded: !folder.expanded });
              }}
              className="mr-2 rounded p-0.5 hover:bg-slate-600/50"
            >
              {folder.expanded ? (
                <ChevronDown className="h-3 w-3" />
              ) : (
                <ChevronRight className="h-3 w-3" />
              )}
            </button>
          )}

          <div
            className="mr-3 h-2 w-2 flex-shrink-0 rounded-full"
            style={{ backgroundColor: folder.color }}
          />

          {!sidebarCollapsed && (
            <>
              <Icon className="mr-3 h-4 w-4 flex-shrink-0" />
              <span className="flex-1 truncate">{folder.name}</span>
              {deviceCount > 0 && (
                <Badge variant="secondary" className="ml-2 text-xs">
                  {deviceCount}
                </Badge>
              )}
            </>
          )}
        </div>

        <AnimatePresence>
          {hasChildren && folder.expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              {folder.children.map((child: any) => (
                <FolderItem key={child.id} folder={child} level={level + 1} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  return (
    <motion.aside
      animate={{ width: sidebarCollapsed ? 64 : 320 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed left-0 top-0 z-40 h-screen border-r border-slate-700/50 bg-slate-800/80 backdrop-blur-sm"
    >
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="flex h-16 items-center justify-between border-b border-slate-700/50 px-4">
          {!sidebarCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center space-x-2"
            >
              <FolderOpen className="h-5 w-5 text-blue-400" />
              <span className="font-semibold text-white">Устройства</span>
            </motion.div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="text-slate-400 hover:text-white"
          >
            <FolderOpen className="h-4 w-4" />
          </Button>
        </div>

        {/* Folders */}
        <div className="flex-1 overflow-y-auto p-2">
          <div className="space-y-1">
            {/* "Все устройства" опция */}
            <div
              className={cn(
                'group flex w-full cursor-pointer items-center rounded-lg px-3 py-2 text-sm transition-all duration-200',
                selectedFolderId === 'root'
                  ? 'border-r-2 border-blue-500 bg-blue-500/20 text-blue-400'
                  : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
              )}
              onClick={() => setSelectedFolder('root')}
            >
              <div className="mr-3 h-2 w-2 flex-shrink-0 rounded-full bg-blue-400" />
              {!sidebarCollapsed && (
                <>
                  <Network className="mr-3 h-4 w-4 flex-shrink-0" />
                  <span className="flex-1 truncate">Все устройства</span>
                  <Badge variant="secondary" className="ml-2 text-xs">
                    {devices.length}
                  </Badge>
                </>
              )}
            </div>

            {folders.map((folder) => (
              <FolderItem key={folder.id} folder={folder} />
            ))}
          </div>
        </div>

        {/* Footer */}
        {!sidebarCollapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="border-t border-slate-700/50 p-4"
          >
            <div className="space-y-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start border-slate-600 text-slate-300"
              >
                <Plus className="mr-2 h-4 w-4" />
                Добавить папку
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start text-slate-400"
              >
                <Settings className="mr-2 h-4 w-4" />
                Настройки
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.aside>
  );
}
