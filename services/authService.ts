import { apiClient } from './apiClient';
import { API_CONFIG } from '@/config/api';
import { AuthResponse, LoginCredentials, RegisterCredentials } from '@/types/auth';

export interface IAuthService {
  login(credentials: LoginCredentials): Promise<AuthResponse>;
  register(credentials: RegisterCredentials): Promise<AuthResponse>;
  getCurrentUser(): Promise<AuthResponse>;
}

export class AuthService implements IAuthService {
  public async login(credentials: LoginCredentials): Promise<AuthResponse> {
    return apiClient.post<AuthResponse>(API_CONFIG.ENDPOINTS.AUTH.LOGIN, credentials);
  }

  public async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    return apiClient.post<AuthResponse>(API_CONFIG.ENDPOINTS.AUTH.REGISTER, credentials);
  }

  public async getCurrentUser(): Promise<AuthResponse> {
    return apiClient.get<AuthResponse>(API_CONFIG.ENDPOINTS.AUTH.ME);
  }
}

export const authService = new AuthService();
