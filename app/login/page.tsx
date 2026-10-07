'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Logo from '@/components/Logo';
import { useAuth } from '@/components/AuthContext';
import { 
  ArrowLeft, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  Zap, 
  ShieldCheck, 
  AlertCircle,
  Loader2
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login, loginWithGoogle, loginWithGithub, loginAsGuest, isSupabaseConnected } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<'google' | 'github' | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password.trim()) {
      setError('Please provide both your email address and password.');
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    try {
      const res = await login(email, password);
      if (res && !res.success && res.error) {
        setError(res.error);
        setLoading(false);
        return;
      }
      router.push('/app');
    } catch (err: any) {
      setError(err?.message || 'Login failed. Please verify your credentials.');
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    setOauthLoading('google');
    try {
      const res = await loginWithGoogle();
      if (res && !res.success && res.error) {
        setError(res.error);
        setOauthLoading(null);
        return;
      }
      if (!isSupabaseConnected) {
        router.push('/app');
      }
    } catch (err: any) {
      setError(err?.message || 'Google sign in failed');
      setOauthLoading(null);
    }
  };

  const handleGithubSignIn = async () => {
    setError(null);
    setOauthLoading('github');
    try {
      const res = await loginWithGithub();
      if (res && !res.success && res.error) {
        setError(res.error);
        setOauthLoading(null);
        return;
      }
      if (!isSupabaseConnected) {
        router.push('/app');
      }
    } catch (err: any) {
      setError(err?.message || 'GitHub sign in failed');
      setOauthLoading(null);
    }
  };

  const handleDemoLogin = () => {
    setLoading(true);
    setTimeout(() => {
      loginAsGuest();
      setLoading(false);
      router.push('/app');
    }, 250);
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f] flex flex-col font-sans relative overflow-hidden selection:bg-[#1d1d1f] selection:text-white">
      {/* Background Ambient Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-[10%] left-[20%] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#cce5ff]/50 to-[#99ccff]/30 blur-[130px] animate-floatSlow" />
        <div className="absolute top-[40%] right-[15%] w-[450px] h-[450px] rounded-full bg-gradient-to-br from-[#ebd4fd]/40 to-[#d6b4fc]/25 blur-[140px] animate-floatReverse" />
      </div>

      {/* Top Header */}
      <header className="relative z-10 max-w-5xl mx-auto w-full px-6 py-6 flex items-center justify-between">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-xs font-medium text-[#86868b] hover:text-[#1d1d1f] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Shortlist</span>
        </Link>
        <Logo size="sm" showTagline={false} />
      </header>

      {/* Main Authentication Card */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-8">
        <div className="liquid-glass max-w-md w-full p-8 sm:p-10 rounded-[32px] shadow-2xl relative border border-white/60">
          {/* Card Header */}
          <div className="text-center mb-6 space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-white shadow-xs border border-neutral-100 flex items-center justify-center mx-auto mb-3">
              <Lock className="w-5 h-5 text-[#1d1d1f]" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1d1d1f]">
              Welcome Back
            </h1>
            <p className="text-xs sm:text-sm text-[#86868b]">
              Sign in to your Shortlist Executive Workstation
            </p>
          </div>

          {/* Social OAuth Providers (Google & GitHub) */}
          <div className="space-y-2.5 mb-6">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={Boolean(oauthLoading) || loading}
              className="w-full py-3 px-4 rounded-2xl bg-white hover:bg-neutral-50/90 border border-[#d2d2d7]/70 hover:border-neutral-400 text-xs font-semibold text-[#1d1d1f] flex items-center justify-center gap-3 transition-all shadow-2xs hover:shadow-xs group disabled:opacity-60"
            >
              {oauthLoading === 'google' ? (
                <Loader2 className="w-4 h-4 animate-spin text-[#0071e3]" />
              ) : (
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                  />
                </svg>
              )}
              <span>Continue with Google</span>
            </button>

            <button
              type="button"
              onClick={handleGithubSignIn}
              disabled={Boolean(oauthLoading) || loading}
              className="w-full py-3 px-4 rounded-2xl bg-[#24292f] hover:bg-[#1a1e22] text-white text-xs font-semibold flex items-center justify-center gap-3 transition-all shadow-xs group disabled:opacity-60"
            >
              {oauthLoading === 'github' ? (
                <Loader2 className="w-4 h-4 animate-spin text-white" />
              ) : (
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              )}
              <span>Continue with GitHub</span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative my-6 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#d2d2d7]/60" />
            </div>
            <span className="relative bg-[#f5f5f7]/95 px-3 text-[11px] text-[#86868b] uppercase tracking-wider font-medium rounded-full">
              Or with email & password
            </span>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="mb-5 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Email / Password Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#1d1d1f] block">
                Work or Personal Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#86868b] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  required
                  className="w-full bg-white/90 border border-[#d2d2d7]/80 rounded-2xl pl-10 pr-4 py-3 text-xs focus:outline-none focus:border-[#0071e3] text-[#1d1d1f] transition-colors shadow-2xs"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-[#1d1d1f]">
                  Password
                </label>
                <a 
                  href="#reset" 
                  onClick={(e) => { 
                    e.preventDefault(); 
                    alert('Password reset link sent to ' + (email || 'your email')); 
                  }} 
                  className="text-[11px] text-[#0071e3] hover:underline font-medium"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#86868b] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-white/90 border border-[#d2d2d7]/80 rounded-2xl pl-10 pr-10 py-3 text-xs focus:outline-none focus:border-[#0071e3] text-[#1d1d1f] transition-colors shadow-2xs font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#86868b] hover:text-[#1d1d1f]"
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-[#86868b]">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-[#d2d2d7] text-[#0071e3] focus:ring-[#0071e3]"
                />
                <span>Remember this device</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading || Boolean(oauthLoading)}
              className="apple-btn-primary w-full py-3.5 text-xs font-semibold flex items-center justify-center gap-2 shadow-md mt-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign In with Email</span>
                  <ShieldCheck className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Access Button */}
          <div className="mt-5 pt-5 border-t border-[#d2d2d7]/40">
            <button
              type="button"
              onClick={handleDemoLogin}
              disabled={loading || Boolean(oauthLoading)}
              className="w-full py-2.5 px-4 rounded-2xl bg-white/70 hover:bg-white border border-dashed border-[#d2d2d7] hover:border-[#0071e3]/40 text-xs font-semibold text-[#86868b] hover:text-[#1d1d1f] flex items-center justify-center gap-2 transition-all group"
            >
              <Zap className="w-3.5 h-3.5 text-[#0071e3] group-hover:scale-110 transition-transform" />
              <span>Instant Guest Mode (3 Free Audits)</span>
            </button>
          </div>

          {/* Bottom Switch to Sign Up */}
          <div className="text-center mt-5 pt-4 text-xs text-[#86868b]">
            <span>Don't have an account? </span>
            <Link href="/signup" className="text-[#0071e3] font-semibold hover:underline">
              Create an account (+5 Free Credits)
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-6 text-center text-[11px] text-[#86868b]">
        <span>Protected by Supabase Auth & 256-bit SSL • Direct UPI payments to darsheel.sirola@fam</span>
      </footer>
    </div>
  );
}
