"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authApi } from "@/lib/api/auth.api";
import { storage } from "@/lib/utils/storage";
import { User } from "@/types";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Check for existing auth on mount
  useEffect(() => {
    const initAuth = () => {
      const token = storage.getAccessToken();
      const savedUser = storage.getUser();

      if (token && savedUser) {
        setUser(savedUser);
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await authApi.login(email, password);

      storage.setTokens(response.accessToken, response.refreshToken);
      storage.setUser(response.user);
      setUser(response.user);

      router.push("/dashboard");
    } catch (error: any) {
      throw new Error(
        error.response?.data?.error || "Login failed. Please try again."
      );
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      const response = await authApi.register(email, password, name);

      storage.setTokens(response.accessToken, response.refreshToken);
      storage.setUser(response.user);
      setUser(response.user);

      router.push("/dashboard");
    } catch (error: any) {
      throw new Error(
        error.response?.data?.error || "Registration failed. Please try again."
      );
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      storage.clearAuth();
      setUser(null);
      router.push("/auth/login");
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
