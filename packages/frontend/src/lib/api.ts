import {
  NetworkDevice,
  DeviceFolder,
  NetworkMetrics,
  AlertMessage,
  SystemHealth,
  BandwidthData,
} from '@/types/schemas';

// API Response types
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// API Error class
export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Base API configuration
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
const API_TIMEOUT = 30000; // 30 seconds

// HTTP client configuration
class HttpClient {
  private baseURL: string;
  private timeout: number;
  private defaultHeaders: Record<string, string>;

  constructor(baseURL: string, timeout: number = API_TIMEOUT) {
    this.baseURL = baseURL;
    this.timeout = timeout;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
  }

  // Add authentication token
  setAuthToken(token: string) {
    this.defaultHeaders.Authorization = `Bearer ${token}`;
  }

  // Remove authentication token
  clearAuthToken() {
    delete this.defaultHeaders.Authorization;
  }

  // Generic request method
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;

    const config: RequestInit = {
      ...options,
      headers: {
        ...this.defaultHeaders,
        ...options.headers,
      },
      signal: AbortSignal.timeout(this.timeout),
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new ApiError(
          errorData.message ||
            `HTTP ${response.status}: ${response.statusText}`,
          response.status,
          errorData.code
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }

      if (error instanceof DOMException && error.name === 'TimeoutError') {
        throw new ApiError('Request timeout', 408, 'TIMEOUT');
      }

      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new ApiError(
          'Network error - server unavailable',
          0,
          'NETWORK_ERROR'
        );
      }

      throw new ApiError('Unknown error occurred', 500, 'UNKNOWN_ERROR');
    }
  }

  // HTTP methods
  async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    const url = new URL(endpoint, this.baseURL);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      });
    }

    return this.request<T>(url.pathname + url.search);
  }

  async post<T>(endpoint: string, data?: any): Promise<T> {
    console.log('🌐 API POST запрос к:', endpoint, 'с данными:', data);
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(endpoint: string, data?: any): Promise<T> {
    console.log('🌐 API PUT запрос к:', endpoint, 'с данными:', data);
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async patch<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
    });
  }
}

// Create HTTP client instance
const httpClient = new HttpClient(API_BASE_URL);

// API Service classes
export class DevicesApi {
  // Get all devices with optional filtering
  static async getDevices(params?: {
    folderId?: string;
    status?: string;
    type?: string;
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<PaginatedResponse<NetworkDevice>> {
    return httpClient.get<PaginatedResponse<NetworkDevice>>('/devices', params);
  }

  // Get single device by ID
  static async getDevice(id: string): Promise<ApiResponse<NetworkDevice>> {
    return httpClient.get<ApiResponse<NetworkDevice>>(`/devices/${id}`);
  }

  // Create new device
  static async createDevice(
    device: Omit<NetworkDevice, 'id' | 'lastSeen' | 'status'>
  ): Promise<ApiResponse<NetworkDevice>> {
    return httpClient.post<ApiResponse<NetworkDevice>>('/devices', device);
  }

  // Update device
  static async updateDevice(
    id: string,
    updates: Partial<NetworkDevice>
  ): Promise<ApiResponse<NetworkDevice>> {
    return httpClient.put<ApiResponse<NetworkDevice>>(
      `/devices/${id}`,
      updates
    );
  }

  // Delete device
  static async deleteDevice(id: string): Promise<ApiResponse<void>> {
    return httpClient.delete<ApiResponse<void>>(`/devices/${id}`);
  }

  // Ping device
  static async pingDevice(
    id: string
  ): Promise<ApiResponse<{ responseTime: number; status: string }>> {
    return httpClient.post<
      ApiResponse<{ responseTime: number; status: string }>
    >(`/devices/${id}/ping`);
  }

  // Get device metrics
  static async getDeviceMetrics(
    id: string,
    period?: string
  ): Promise<ApiResponse<BandwidthData[]>> {
    return httpClient.get<ApiResponse<BandwidthData[]>>(
      `/devices/${id}/metrics`,
      { period }
    );
  }
}

export class FoldersApi {
  // Get all folders
  static async getFolders(): Promise<ApiResponse<DeviceFolder[]>> {
    return httpClient.get<ApiResponse<DeviceFolder[]>>('/folders');
  }

  // Create new folder
  static async createFolder(
    folder: Omit<DeviceFolder, 'id' | 'children'>
  ): Promise<ApiResponse<DeviceFolder>> {
    return httpClient.post<ApiResponse<DeviceFolder>>('/folders', folder);
  }

  // Update folder
  static async updateFolder(
    id: string,
    updates: Partial<DeviceFolder>
  ): Promise<ApiResponse<DeviceFolder>> {
    return httpClient.put<ApiResponse<DeviceFolder>>(`/folders/${id}`, updates);
  }

  // Delete folder
  static async deleteFolder(id: string): Promise<ApiResponse<void>> {
    return httpClient.delete<ApiResponse<void>>(`/folders/${id}`);
  }
}

export class MetricsApi {
  // Get network metrics
  static async getNetworkMetrics(): Promise<ApiResponse<NetworkMetrics>> {
    return httpClient.get<ApiResponse<NetworkMetrics>>('/metrics/network');
  }

  // Get system health
  static async getSystemHealth(): Promise<ApiResponse<SystemHealth>> {
    return httpClient.get<ApiResponse<SystemHealth>>('/metrics/system');
  }

  // Get bandwidth history
  static async getBandwidthHistory(params?: {
    deviceId?: string;
    period?: string;
    limit?: number;
  }): Promise<ApiResponse<BandwidthData[]>> {
    return httpClient.get<ApiResponse<BandwidthData[]>>(
      '/metrics/bandwidth',
      params
    );
  }
}

export class AlertsApi {
  // Get all alerts
  static async getAlerts(params?: {
    resolved?: boolean;
    type?: string;
    deviceId?: string;
    page?: number;
    limit?: number;
  }): Promise<PaginatedResponse<AlertMessage>> {
    return httpClient.get<PaginatedResponse<AlertMessage>>('/alerts', params);
  }

  // Create new alert
  static async createAlert(
    alert: Omit<AlertMessage, 'id' | 'timestamp'>
  ): Promise<ApiResponse<AlertMessage>> {
    return httpClient.post<ApiResponse<AlertMessage>>('/alerts', alert);
  }

  // Mark alert as resolved
  static async resolveAlert(id: string): Promise<ApiResponse<AlertMessage>> {
    return httpClient.patch<ApiResponse<AlertMessage>>(`/alerts/${id}/resolve`);
  }

  // Acknowledge alert
  static async acknowledgeAlert(
    id: string,
    userId: string
  ): Promise<ApiResponse<AlertMessage>> {
    return httpClient.patch<ApiResponse<AlertMessage>>(
      `/alerts/${id}/acknowledge`,
      { userId }
    );
  }

  // Delete alert
  static async deleteAlert(id: string): Promise<ApiResponse<void>> {
    return httpClient.delete<ApiResponse<void>>(`/alerts/${id}`);
  }
}

// WebSocket connection for real-time updates
export class RealtimeApi {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;

  connect(onMessage: (data: any) => void, onError?: (error: Event) => void) {
    const wsUrl = API_BASE_URL.replace(/^https?/, 'ws') + '/ws';

    try {
      this.ws = new WebSocket(wsUrl);

      this.ws.onopen = () => {
        console.log('WebSocket connected');
        this.reconnectAttempts = 0;
      };

      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          onMessage(data);
        } catch (error) {
          console.error('Failed to parse WebSocket message:', error);
        }
      };

      this.ws.onclose = () => {
        console.log('WebSocket disconnected');
        this.reconnect(onMessage, onError);
      };

      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        if (onError) {
          onError(error);
        }
      };
    } catch (error) {
      console.error('Failed to connect WebSocket:', error);
      if (onError) {
        onError(error as Event);
      }
    }
  }

  private reconnect(
    onMessage: (data: any) => void,
    onError?: (error: Event) => void
  ) {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      const delay =
        this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1);

      console.log(
        `Reconnecting WebSocket in ${delay}ms (attempt ${this.reconnectAttempts})`
      );

      setTimeout(() => {
        this.connect(onMessage, onError);
      }, delay);
    } else {
      console.error('Max WebSocket reconnection attempts reached');
    }
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  send(data: any) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data));
    } else {
      console.error('WebSocket is not connected');
    }
  }
}

// Export configured instances
export const api = {
  devices: DevicesApi,
  folders: FoldersApi,
  metrics: MetricsApi,
  alerts: AlertsApi,
  realtime: new RealtimeApi(),

  // Auth methods
  setAuthToken: (token: string) => httpClient.setAuthToken(token),
  clearAuthToken: () => httpClient.clearAuthToken(),
};

// Default export
export default api;
