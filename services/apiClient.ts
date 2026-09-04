import { API_CONFIG } from '@/config/api';

export class AppError extends Error {
  public statusCode: number;
  public data?: unknown;

  constructor(message: string, statusCode = 500, data?: unknown) {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
    this.data = data;
  }
}

interface RequestOptions extends RequestInit {
  timeout?: number;
  params?: Record<string, string>;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl.replace(/\/$/, '');
  }

  private getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(API_CONFIG.STORAGE_KEYS.TOKEN);
    }
    return null;
  }

  public async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { timeout = API_CONFIG.TIMEOUT_MS, params, headers, ...customConfig } = options;

    let url = `${this.baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
    if (params) {
      const searchParams = new URLSearchParams(params);
      url += `?${searchParams.toString()}`;
    }

    const token = this.getToken();

    const defaultHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    if (token) {
      defaultHeaders['Authorization'] = `Bearer ${token}`;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        ...customConfig,
        headers: {
          ...defaultHeaders,
          ...headers,
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      let responseData: any;
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        responseData = await response.json();
      } else {
        responseData = await response.text();
      }

      if (!response.ok) {
        const errorMessage =
          responseData?.message ||
          responseData?.error ||
          `Request failed with status ${response.status}`;
        throw new AppError(errorMessage, response.status, responseData);
      }

      return responseData as T;
    } catch (error: any) {
      clearTimeout(timeoutId);

      if (error instanceof AppError) {
        throw error;
      }

      if (error.name === 'AbortError') {
        throw new AppError('Request timed out. Please check your network or server status.', 408);
      }

      // Network / connection refused error
      const message =
        error.message === 'Failed to fetch' || error.message.includes('fetch')
          ? 'Cannot connect to backend server. Please verify the backend is running on ' + this.baseUrl
          : error.message || 'An unexpected network error occurred.';

      throw new AppError(message, 500, error);
    }
  }

  public get<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }

  public post<T>(endpoint: string, body?: unknown, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  public put<T>(endpoint: string, body?: unknown, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  public delete<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  }
}

export const apiClient = new ApiClient(API_CONFIG.BASE_URL);
