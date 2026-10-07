'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Logo from '@/components/Logo';
import { useAuth } from '@/components/AuthContext';
import { 
  ArrowLeft, 
  UserPlus, 
  Mail, 
  Lock, 
  User, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2 
} from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();
  const { signup } = useAuth();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!fullName.trim() || !email.trim() || !password.trim()) {
      setError('Please fill in all required fields.');
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

    if (!agreeTerms) {
      setError('Please agree to the Terms of Service to create an account.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      signup(fullName, email);
      setLoading(false);
      router.push('/app');
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f] flex flex-col font-sans relative overflow-hidden selection:bg-[#1d1d1f] selection:text-white">
      {/* Background Ambient Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-[10%] left-[25%] w-[550px] h-[550px] rounded-full bg-gradient-to-tr from-[#cce5ff]/50 to-[#99ccff]/30 blur-[130px] animate-floatSlow" />
        <div className="absolute top-[40%] right-[15%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[#ebd4fd]/40 to-[#d6b4fc]/25 blur-[140px] animate-floatReverse" />
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

      {/* Main Registration Card */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-12">
        <div className="liquid-glass max-w-md w-full p-8 sm:p-10 rounded-[32px] shadow-2xl relative">
          {/* Card Header */}
          <div className="text-center mb-8 space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-[#0071e3]/10 border border-[#0071e3]/20 flex items-center justify-center mx-auto mb-3">
              <UserPlus className="w-5 h-5 text-[#0071e3]" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1d1d1f]">
              Create Your Account
            </h1>
            <p className="text-xs sm:text-sm text-[#86868b]">
              Get 5 free ATS audits upon registration
            </p>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="mb-5 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 text-xs">
              {error}
            </div>
          )}

          {/* Sign Up Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#1d1d1f] block">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-[#86868b] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Alex Morgan"
                  required
                  className="w-full bg-white/90 border border-[#d2d2d7]/80 rounded-2xl pl-10 pr-4 py-3 text-xs focus:outline-none focus:border-[#0071e3] text-[#1d1d1f] transition-colors shadow-2xs"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#1d1d1f] block">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#86868b] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  className="w-full bg-white/90 border border-[#d2d2d7]/80 rounded-2xl pl-10 pr-4 py-3 text-xs focus:outline-none focus:border-[#0071e3] text-[#1d1d1f] transition-colors shadow-2xs"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#1d1d1f] block">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#86868b] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  required
                  className="w-full bg-white/90 border border-[#d2d2d7]/80 rounded-2xl pl-10 pr-4 py-3 text-xs focus:outline-none focus:border-[#0071e3] text-[#1d1d1f] transition-colors shadow-2xs font-mono"
                />
              </div>
            </div>

            <div className="pt-2">
              <label className="flex items-start gap-2 cursor-pointer text-xs text-[#86868b] leading-snug">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-0.5 rounded border-[#d2d2d7] text-[#0071e3] focus:ring-[#0071e3]"
                />
                <span>
                  I agree to the{' '}
                  <Link href="/terms" target="_blank" className="text-[#0071e3] underline">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" target="_blank" className="text-[#0071e3] underline">
                    Privacy Policy
                  </Link>.
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="apple-btn-primary w-full py-3.5 text-xs font-semibold flex items-center justify-center gap-2 shadow-md mt-4 disabled:opacity-50"
            >
              {loading ? (
                <span>Creating Account...</span>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Create Account & Get 5 Audits</span>
                </>
              )}
            </button>
          </form>

          {/* Bottom Switch to Sign In */}
          <div className="text-center mt-6 pt-5 border-t border-[#d2d2d7]/40 text-xs text-[#86868b]">
            <span>Already have an account? </span>
            <Link href="/login" className="text-[#0071e3] font-semibold hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-6 text-center text-[11px] text-[#86868b]">
        <span>Zero spam guarantee • Direct Indian UPI payments to darsheel.sirola@fam</span>
      </footer>
    </div>
  );
}
