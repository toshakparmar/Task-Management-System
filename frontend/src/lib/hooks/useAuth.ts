
'use client';

import { useRouter } from 'next/navigation';
import { storage } from '@/lib/utils/storage';

/**
 * Custom hook providing authentication helper functions
 * @returns Auth helper methods
 */
export const useAuthHelpers = () => {
  const router = useRouter();

  const checkAuth = (): boolean => {
    const token = storage.getAccessToken();
    const user = storage.getUser();
    return !!(token && user);
  };

  const requireAuth = () => {
    if (!checkAuth()) {
      router.push('/auth/login');
      return false;
    }
    return true;
  };

  const clearAuthAndRedirect = () => {
    storage.clearAuth();
    router.push('/auth/login');
  };

  const getAuthHeaders = () => {
    const token = storage.getAccessToken();
    if (!token) return {};
    
    return {
      'Authorization': `Bearer ${token}`
    };
  };

  return {
    checkAuth,
    requireAuth,
    clearAuthAndRedirect,
    getAuthHeaders,
  };
};

import { useAuth as useAuthContext } from '@/context/AuthContext';
export const useAuth = useAuthContext;