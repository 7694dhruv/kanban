'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User, LoginCredentials, RegisterCredentials, AuthState } from '@/types/auth';
import { authService } from '@/services/authService';
import { API_CONFIG } from '@/config/api';
import { AppError } from '@/services/apiClient';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<boolean>;
  register: (credentials: RegisterCredentials) => Promise<boolean>;
  logout: () => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Restore session from localStorage on initial load
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedToken = localStorage.getItem(API_CONFIG.STORAGE_KEYS.TOKEN);
        const storedUser = localStorage.getItem(API_CONFIG.STORAGE_KEYS.USER);

        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));

          // Optionally re-validate token with backend
          try {
            const res = await authService.getCurrentUser();
            if (res.user) {
              setUser(res.user);
              localStorage.setItem(API_CONFIG.STORAGE_KEYS.USER, JSON.stringify(res.user));
            }
          } catch (verifyError: any) {
            // If token expired or unauthorized (401), clean up
            if (verifyError?.statusCode === 401) {
              localStorage.removeItem(API_CONFIG.STORAGE_KEYS.TOKEN);
              localStorage.removeItem(API_CONFIG.STORAGE_KEYS.USER);
              setToken(null);
              setUser(null);
            }
          }
        }
      } catch (e) {
        console.error('Failed to parse stored auth session:', e);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const login = useCallback(async (credentials: LoginCredentials): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authService.login(credentials);

      if (response.token && response.user) {
        setToken(response.token);
        setUser(response.user);

        localStorage.setItem(API_CONFIG.STORAGE_KEYS.TOKEN, response.token);
        localStorage.setItem(API_CONFIG.STORAGE_KEYS.USER, JSON.stringify(response.user));
        return true;
      }
      return false;
    } catch (err: any) {
      const errorMessage =
        err instanceof AppError
          ? err.message
          : err?.message || 'Login failed. Please check your credentials.';
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (credentials: RegisterCredentials): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authService.register(credentials);

      if (response.token && response.user) {
        setToken(response.token);
        setUser(response.user);

        localStorage.setItem(API_CONFIG.STORAGE_KEYS.TOKEN, response.token);
        localStorage.setItem(API_CONFIG.STORAGE_KEYS.USER, JSON.stringify(response.user));
        return true;
      }
      return false;
    } catch (err: any) {
      const errorMessage =
        err instanceof AppError
          ? err.message
          : err?.message || 'Registration failed. Please try again.';
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(API_CONFIG.STORAGE_KEYS.TOKEN);
    localStorage.removeItem(API_CONFIG.STORAGE_KEYS.USER);
    setToken(null);
    setUser(null);
    setError(null);
  }, []);

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated: !!user && !!token,
    isLoading,
    error,
    login,
    register,
    logout,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}
