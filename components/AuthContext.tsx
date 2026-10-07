'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export interface User {
  id?: string;
  name: string;
  email: string;
  avatar?: string;
  credits: number;
  isPro?: boolean;
}

interface AuthResponse {
  success: boolean;
  error?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isSupabaseConnected: boolean;
  login: (email: string, password?: string) => Promise<AuthResponse>;
  loginWithGoogle: () => Promise<AuthResponse>;
  loginWithGithub: () => Promise<AuthResponse>;
  loginAsGuest: () => void;
  signup: (name: string, email: string, password?: string) => Promise<AuthResponse>;
  logout: () => Promise<void>;
  addCredits: (amount: number) => void;
  useCredit: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'shortlist_auth_user_v1';
const CREDITS_STORAGE_KEY_PREFIX = 'shortlist_credits_';

function getStoredCreditsForEmail(email: string, defaultCredits: number = 5): number {
  try {
    const key = `${CREDITS_STORAGE_KEY_PREFIX}${email.toLowerCase()}`;
    const stored = localStorage.getItem(key);
    if (stored !== null) {
      const parsed = parseInt(stored, 10);
      return isNaN(parsed) ? defaultCredits : parsed;
    }
  } catch {
    // LocalStorage access failure fallback
  }
  return defaultCredits;
}

function saveStoredCreditsForEmail(email: string, credits: number) {
  try {
    const key = `${CREDITS_STORAGE_KEY_PREFIX}${email.toLowerCase()}`;
    localStorage.setItem(key, credits.toString());
  } catch {
    // LocalStorage access failure fallback
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const saveUserToStateAndStorage = useCallback((newUser: User | null) => {
    setUser(newUser);
    if (newUser) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
        if (newUser.email && !newUser.email.endsWith('.internal')) {
          saveStoredCreditsForEmail(newUser.email, newUser.credits);
        }
      } catch {
        // Fallback
      }
    } else {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        // Fallback
      }
    }
  }, []);

  // Format Supabase user to our internal User format
  const formatSupabaseUser = useCallback((sbUser: any): User => {
    const email = sbUser.email || 'user@shortlist.io';
    const metadata = sbUser.user_metadata || {};
    const name = metadata.full_name || metadata.name || (email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1));
    const avatar = metadata.avatar_url || metadata.picture;
    const credits = getStoredCreditsForEmail(email, 15);

    return {
      id: sbUser.id,
      name,
      email,
      avatar,
      credits,
      isPro: credits >= 50,
    };
  }, []);

  // Initialize and listen to auth state changes
  useEffect(() => {
    let mounted = true;

    async function initAuth() {
      if (isSupabaseConfigured) {
        try {
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user && mounted) {
            const formatted = formatSupabaseUser(session.user);
            saveUserToStateAndStorage(formatted);
            setLoading(false);
            return;
          }
        } catch (e) {
          console.warn('Supabase session initialization warning:', e);
        }

        // Listen for realtime auth changes
        const { data: authListener } = supabase.auth.onAuthStateChange(
          async (event, session) => {
            if (!mounted) return;
            if (session?.user) {
              const formatted = formatSupabaseUser(session.user);
              saveUserToStateAndStorage(formatted);
            } else if (event === 'SIGNED_OUT') {
              // Revert to guest applicant
              const guestUser: User = {
                name: 'Guest Applicant',
                email: 'guest@shortlist.internal',
                credits: 3,
              };
              saveUserToStateAndStorage(guestUser);
            }
          }
        );

        // Fallback to local storage if no active Supabase session
        if (mounted) {
          try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
              setUser(JSON.parse(stored));
            } else {
              const guestUser: User = {
                name: 'Guest Applicant',
                email: 'guest@shortlist.internal',
                credits: 3,
              };
              saveUserToStateAndStorage(guestUser);
            }
          } catch {
            // Storage access failure
          }
          setLoading(false);
        }

        return () => {
          authListener.subscription.unsubscribe();
        };
      } else {
        // Supabase not configured: load from localStorage or set guest applicant
        try {
          const stored = localStorage.getItem(STORAGE_KEY);
          if (stored) {
            setUser(JSON.parse(stored));
          } else {
            const guestUser: User = {
              name: 'Guest Applicant',
              email: 'guest@shortlist.internal',
              credits: 3,
            };
            saveUserToStateAndStorage(guestUser);
          }
        } catch {
          // Fallback
        }
        setLoading(false);
      }
    }

    initAuth();

    return () => {
      mounted = false;
    };
  }, [formatSupabaseUser, saveUserToStateAndStorage]);

  const login = async (email: string, password?: string): Promise<AuthResponse> => {
    if (isSupabaseConfigured && password) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

        if (error) {
          return { success: false, error: error.message };
        }

        if (data.user) {
          const formatted = formatSupabaseUser(data.user);
          saveUserToStateAndStorage(formatted);
          return { success: true };
        }
      } catch (err: any) {
        return { success: false, error: err.message || 'Login failed' };
      }
    }

    // Local / fallback mode
    const cleanEmail = email.trim();
    const existingCredits = getStoredCreditsForEmail(cleanEmail, 15);
    const updated: User = {
      name: cleanEmail.split('@')[0].charAt(0).toUpperCase() + cleanEmail.split('@')[0].slice(1),
      email: cleanEmail,
      credits: existingCredits,
      isPro: existingCredits >= 50,
    };
    saveUserToStateAndStorage(updated);
    return { success: true };
  };

  const loginWithGoogle = async (): Promise<AuthResponse> => {
    if (isSupabaseConfigured) {
      try {
        const origin = typeof window !== 'undefined' ? window.location.origin : '';
        const { error } = await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo: `${origin}/auth/callback?next=/app`,
            queryParams: {
              access_type: 'offline',
              prompt: 'consent',
            },
          },
        });

        if (error) {
          return { success: false, error: error.message };
        }
        return { success: true };
      } catch (err: any) {
        return { success: false, error: err.message || 'Failed to initiate Google sign-in' };
      }
    }

    // Instant simulation when keys not configured yet
    const demoGoogleUser: User = {
      name: 'Google Executive',
      email: 'executive.applicant@gmail.com',
      credits: 15,
      isPro: true,
    };
    saveUserToStateAndStorage(demoGoogleUser);
    return { success: true };
  };

  const loginWithGithub = async (): Promise<AuthResponse> => {
    if (isSupabaseConfigured) {
      try {
        const origin = typeof window !== 'undefined' ? window.location.origin : '';
        const { error } = await supabase.auth.signInWithOAuth({
          provider: 'github',
          options: {
            redirectTo: `${origin}/auth/callback?next=/app`,
          },
        });

        if (error) {
          return { success: false, error: error.message };
        }
        return { success: true };
      } catch (err: any) {
        return { success: false, error: err.message || 'Failed to initiate GitHub sign-in' };
      }
    }

    // Instant simulation when keys not configured yet
    const demoGithubUser: User = {
      name: 'GitHub Engineer',
      email: 'dev.applicant@github.com',
      credits: 15,
      isPro: true,
    };
    saveUserToStateAndStorage(demoGithubUser);
    return { success: true };
  };

  const loginAsGuest = () => {
    const demoUser: User = {
      name: 'Alex Morgan',
      email: 'alex.morgan@example.com',
      credits: 15,
      isPro: true,
    };
    saveUserToStateAndStorage(demoUser);
  };

  const signup = async (name: string, email: string, password?: string): Promise<AuthResponse> => {
    const cleanName = name.trim() || 'Candidate';
    const cleanEmail = email.trim();

    if (isSupabaseConfigured && password) {
      try {
        const origin = typeof window !== 'undefined' ? window.location.origin : '';
        const { data, error } = await supabase.auth.signUp({
          email: cleanEmail,
          password,
          options: {
            data: {
              full_name: cleanName,
            },
            emailRedirectTo: `${origin}/auth/callback?next=/app`,
          },
        });

        if (error) {
          return { success: false, error: error.message };
        }

        if (data.user) {
          const formatted = formatSupabaseUser(data.user);
          saveUserToStateAndStorage(formatted);
          return { success: true };
        }
      } catch (err: any) {
        return { success: false, error: err.message || 'Sign up failed' };
      }
    }

    // Local / fallback mode
    const newUser: User = {
      name: cleanName,
      email: cleanEmail,
      credits: 5,
      isPro: false,
    };
    saveStoredCreditsForEmail(cleanEmail, 5);
    saveUserToStateAndStorage(newUser);
    return { success: true };
  };

  const logout = async () => {
    if (isSupabaseConfigured) {
      try {
        await supabase.auth.signOut();
      } catch {
        // Fallback
      }
    }

    const guestUser: User = {
      name: 'Guest Applicant',
      email: 'guest@shortlist.internal',
      credits: 3,
    };
    saveUserToStateAndStorage(guestUser);
  };

  const addCredits = (amount: number) => {
    if (!user) return;
    const newTotal = user.credits + amount;
    const updated: User = {
      ...user,
      credits: newTotal,
      isPro: amount >= 50 || user.isPro || newTotal >= 50,
    };
    saveUserToStateAndStorage(updated);
  };

  const useCredit = (): boolean => {
    if (!user || user.credits <= 0) return false;
    const updated: User = {
      ...user,
      credits: user.credits - 1,
    };
    saveUserToStateAndStorage(updated);
    return true;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isSupabaseConnected: isSupabaseConfigured,
        login,
        loginWithGoogle,
        loginWithGithub,
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
