import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Утилита для обрезки длинного текста
export function truncateText(text: string, maxLength: number): string {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

// Утилита для форматирования IPv6 адресов
export function formatIPv6(ip: string): string {
  if (!ip || !ip.includes(':')) return ip;

  // Если это IPv6 адрес
  if (ip.split(':').length > 4) {
    const parts = ip.split(':');
    if (parts.length >= 8) {
      return `${parts[0]}:${parts[1]}:${parts[2]}:${parts[3]}...${parts[parts.length - 2]}:${parts[parts.length - 1]}`;
    }
  }

  return ip;
}

// Утилита для округления процентов
export function formatPercentage(value: number): string {
  return `${Math.round(value * 10) / 10}%`;
}

// Утилита для форматирования времени отклика
export function formatResponseTime(value: number): string {
  return `${value}ms`;
}

// Форматирование времени "назад" (например "5 мин назад")
export function formatTimeAgo(date: Date | string): string {
  const now = new Date();
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  if (isNaN(dateObj.getTime())) return 'неизвестно';

  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);

  if (diffInSeconds < 60) return 'только что';
  if (diffInSeconds < 3600)
    return `${Math.floor(diffInSeconds / 60)} мин назад`;
  if (diffInSeconds < 86400)
    return `${Math.floor(diffInSeconds / 3600)} ч назад`;
  return `${Math.floor(diffInSeconds / 86400)} дн назад`;
}

// Детальное форматирование времени
export function formatTimeDetailed(timestamp: Date | string): string {
  const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp;
  if (isNaN(date.getTime())) return 'неизвестно';

  return date.toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

// Создание и скачивание файла
export function downloadFile(
  data: string,
  filename: string,
  type: string = 'application/json'
) {
  const blob = new Blob([data], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Создание backup файла с датой
export function createBackupFilename(prefix: string = 'backup'): string {
  const date = new Date().toISOString().split('T')[0];
  return `${prefix}-${date}.json`;
}

// Универсальная функция поиска в массиве объектов
export function searchInObjects<T>(
  items: T[],
  searchTerm: string,
  searchFields: (keyof T)[]
): T[] {
  if (!searchTerm.trim()) return items;

  const lowercaseSearch = searchTerm.toLowerCase();

  return items.filter((item) =>
    searchFields.some((field) => {
      const value = item[field];
      return value && String(value).toLowerCase().includes(lowercaseSearch);
    })
  );
}

// Debounce функция (уже была, оставляю как есть)
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Генерация случайного ID
export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

// Форматирование uptime
export function formatUptime(seconds: number): string {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (days > 0) return `${days}д ${hours}ч ${minutes}м`;
  if (hours > 0) return `${hours}ч ${minutes}м`;
  return `${minutes}м`;
}

export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'online':
      return 'text-green-500';
    case 'offline':
      return 'text-red-500';
    case 'warning':
      return 'text-yellow-500';
    default:
      return 'text-gray-500';
  }
}

export function getStatusBgColor(status: string): string {
  switch (status) {
    case 'online':
      return 'bg-green-500/10 border-green-500/20';
    case 'offline':
      return 'bg-red-500/10 border-red-500/20';
    case 'warning':
      return 'bg-yellow-500/10 border-yellow-500/20';
    default:
      return 'bg-gray-500/10 border-gray-500/20';
  }
}
