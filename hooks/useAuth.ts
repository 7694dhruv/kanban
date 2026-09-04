'use client';

import { useAuthContext } from '@/context/AuthContext';

/**
 * Custom hook providing clean access to authentication state and methods
 */
export function useAuth() {
  return useAuthContext();
}
