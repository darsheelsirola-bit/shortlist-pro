'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  name: string;
  email: string;
  credits: number;
  isPro?: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, name?: string) => void;
  loginAsGuest: () => void;
  signup: (name: string, email: string) => void;
  logout: () => void;
  addCredits: (amount: number) => void;
  useCredit: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'shortlist_auth_user_v1';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Restore session from localStorage on client mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      } else {
        // Default guest with 3 free audits
        const guestUser: User = {
          name: 'Guest Applicant',
          email: 'guest@shortlist.internal',
          credits: 3,
        };
        setUser(guestUser);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(guestUser));
      }
    } catch {
      // Fallback
    } finally {
      setLoading(false);
    }
  }, []);

  const saveUser = (newUser: User | null) => {
    setUser(newUser);
    if (newUser) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const login = (email: string, name?: string) => {
    const existing = user;
    const updated: User = {
      name: name || (email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1)),
      email,
      credits: existing?.credits && existing.credits > 3 ? existing.credits : 15,
      isPro: false,
    };
    saveUser(updated);
  };

  const loginAsGuest = () => {
    const demoUser: User = {
      name: 'Alex Morgan',
      email: 'alex.morgan@example.com',
      credits: 15,
      isPro: true,
    };
    saveUser(demoUser);
  };

  const signup = (name: string, email: string) => {
    const newUser: User = {
      name: name.trim() || 'Candidate',
      email: email.trim(),
      credits: 5, // 5 free welcome credits for registering
      isPro: false,
    };
    saveUser(newUser);
  };

  const logout = () => {
    const guestUser: User = {
      name: 'Guest Applicant',
      email: 'guest@shortlist.internal',
      credits: 3,
    };
    saveUser(guestUser);
  };

  const addCredits = (amount: number) => {
    if (!user) return;
    const updated: User = {
      ...user,
      credits: user.credits + amount,
      isPro: amount >= 50 || user.isPro,
    };
    saveUser(updated);
  };

  const useCredit = (): boolean => {
    if (!user || user.credits <= 0) return false;
    const updated: User = {
      ...user,
      credits: user.credits - 1,
    };
    saveUser(updated);
    return true;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        loginAsGuest,
        signup,
        logout,
        addCredits,
        useCredit,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
