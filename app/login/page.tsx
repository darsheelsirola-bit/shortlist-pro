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
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login, loginAsGuest, user } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
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
    setTimeout(() => {
      login(email);
      setLoading(false);
      router.push('/app');
    }, 400);
  };

  const handleDemoLogin = () => {
    setLoading(true);
    setTimeout(() => {
      loginAsGuest();
      setLoading(false);
      router.push('/app');
    }, 300);
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f] flex flex-col font-sans relative overflow-hidden selection:bg-[#1d1d1f] selection:text-white">
      {/* Background Liquid Ambient Light Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-[10%] left-[20%] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#cce5ff]/50 to-[#99ccff]/30 blur-[130px] animate-floatSlow" />
        <div className="absolute top-[40%] right-[15%] w-[450px] h-[450px] rounded-full bg-gradient-to-br from-[#ebd4fd]/40 to-[#d6b4fc]/25 blur-[140px] animate-floatReverse" />
      </div>

      {/* Top Minimal Navigation */}
      <header className="relative z-10 max-w-5xl mx-auto w-full px-6 py-6 flex items-center justify-between">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-xs font-medium text-[#86868b] hover:text-[#1d1d1f] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to SHORTLIST</span>
        </Link>
        <Logo size="sm" showTagline={false} />
      </header>

      {/* Main Authentication Card */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-12">
        <div className="liquid-glass max-w-md w-full p-8 sm:p-10 rounded-[32px] shadow-2xl relative">
          {/* Card Header */}
          <div className="text-center mb-8 space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-white shadow-xs border border-white flex items-center justify-center mx-auto mb-3">
              <Lock className="w-5 h-5 text-[#1d1d1f]" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1d1d1f]">
              Welcome Back
            </h1>
            <p className="text-xs sm:text-sm text-[#86868b]">
              Sign in to your SHORTLIST Executive Workstation
            </p>
          </div>

          {/* Quick Demo Access Button */}
          <div className="mb-6">
            <button
              type="button"
              onClick={handleDemoLogin}
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-2xl bg-white/90 hover:bg-white border border-[#d2d2d7]/70 hover:border-[#0071e3]/40 text-xs font-semibold text-[#1d1d1f] flex items-center justify-center gap-2 transition-all shadow-xs group"
            >
              <Zap className="w-3.5 h-3.5 text-[#0071e3] group-hover:scale-110 transition-transform" />
              <span>1-Click Instant Demo Login (15 Credits)</span>
            </button>
            <div className="relative my-5 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#d2d2d7]/50" />
              </div>
              <span className="relative bg-white/80 px-3 text-[11px] text-[#86868b] uppercase tracking-wider font-medium">
                Or with email
              </span>
            </div>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="mb-5 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 text-xs">
              {error}
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
                <a href="#reset" onClick={(e) => { e.preventDefault(); alert('Password reset link sent to ' + (email || 'your email')); }} className="text-[11px] text-[#0071e3] hover:underline font-medium">
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
                <span>Remember on this device</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="apple-btn-primary w-full py-3.5 text-xs font-semibold flex items-center justify-center gap-2 shadow-md mt-2 disabled:opacity-50"
            >
              {loading ? (
                <span>Signing in...</span>
              ) : (
                <>
                  <span>Sign In</span>
                  <ShieldCheck className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

          {/* Bottom Switch to Sign Up */}
          <div className="text-center mt-6 pt-5 border-t border-[#d2d2d7]/40 text-xs text-[#86868b]">
            <span>Don't have an account? </span>
            <Link href="/signup" className="text-[#0071e3] font-semibold hover:underline">
              Create an account (+5 Free Credits)
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-6 text-center text-[11px] text-[#86868b]">
        <span>Protected by 256-bit encryption • Direct UPI payments to darsheel.sirola@fam</span>
      </footer>
    </div>
  );
}
