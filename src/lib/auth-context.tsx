'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@/types';
import { authClient, useSession, signIn, signOut } from './auth-client';
import api, { setAccessToken } from './api';

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: any) => Promise<any>;
  register: (credentials: any) => Promise<any>;
  loginWithGoogle: () => Promise<any>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, isPending } = useSession();
  const [user, setUser] = useState<User | null>(null);

  // Sync better-auth session with our local user state format
  useEffect(() => {
    if (session?.user) {
      // Map BetterAuth user to our User type
      setUser({
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        role: 'role' in session.user && typeof session.user.role === 'string' ? session.user.role : 'buyer',
        avatarUrl: session.user.image || undefined,
        provider: 'local',
        createdAt: session.user.createdAt.toISOString(),
      });
      // BetterAuth handles cookies securely. We don't need access token headers anymore.
      setAccessToken(null); 
    } else if (!isPending) {
      setUser(null);
    }
  }, [session, isPending]);

  const login = async (credentials: any) => {
    const { email, password } = credentials;
    const { data, error } = await authClient.signIn.email({
      email,
      password,
    });
    if (error) throw error;
    return data;
  };

  const register = async (credentials: any) => {
    const { name, email, password } = credentials;
    const { data, error } = await authClient.signUp.email({
      email,
      password,
      name,
    });
    if (error) throw error;
    return data;
  };

  const loginWithGoogle = async () => {
    const { data, error } = await authClient.signIn.social({
      provider: 'google',
    });
    if (error) throw error;
    return data;
  };

  const logout = async () => {
    await authClient.signOut();
  };

  const refreshToken = async () => {
    // BetterAuth handles session refresh automatically via cookies
    return Promise.resolve();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken: null, // BetterAuth uses HttpOnly cookies, no raw token needed
        isLoading: isPending,
        isAuthenticated: !!session?.user,
        login,
        register,
        loginWithGoogle,
        logout,
        refreshToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
