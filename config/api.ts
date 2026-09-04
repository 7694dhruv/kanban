export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  TIMEOUT_MS: 15000,
  STORAGE_KEYS: {
    TOKEN: 'kanban_token',
    USER: 'kanban_user',
  },
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/register',
      ME: '/auth/me',
    },
  },
} as const;
