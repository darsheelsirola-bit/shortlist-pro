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
  AlertCircle,
  Loader2 
} from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();
  const { signup, loginWithGoogle, loginWithGithub, isSupabaseConnected } = useAuth();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<'google' | 'github' | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
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
    try {
      const res = await signup(fullName, email, password);
      if (res && !res.success && res.error) {
        setError(res.error);
        setLoading(false);
        return;
      }
      router.push('/app');
    } catch (err: any) {
      setError(err?.message || 'Failed to create account. Please try again.');
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
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
      setError(err?.message || 'Google sign-up failed');
      setOauthLoading(null);
    }
  };

  const handleGithubSignUp = async () => {
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
      setError(err?.message || 'GitHub sign-up failed');
      setOauthLoading(null);
    }
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
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-8">
        <div className="liquid-glass max-w-md w-full p-8 sm:p-10 rounded-[32px] shadow-2xl relative border border-white/60">
          {/* Card Header */}
          <div className="text-center mb-6 space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-[#0071e3]/10 border border-[#0071e3]/20 flex items-center justify-center mx-auto mb-3">
              <UserPlus className="w-5 h-5 text-[#0071e3]" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1d1d1f]">
              Create Your Account
            </h1>
            <p className="text-xs sm:text-sm text-[#86868b]">
              Get 5 free precision ATS audits instantly upon signup
            </p>
          </div>

          {/* Social OAuth Providers (Google & GitHub) */}
          <div className="space-y-2.5 mb-6">
            <button
              type="button"
              onClick={handleGoogleSignUp}
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
              <span>Sign up with Google</span>
            </button>

            <button
              type="button"
              onClick={handleGithubSignUp}
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
              <span>Sign up with GitHub</span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative my-6 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#d2d2d7]/60" />
            </div>
            <span className="relative bg-[#f5f5f7]/95 px-3 text-[11px] text-[#86868b] uppercase tracking-wider font-medium rounded-full">
              Or create with email
            </span>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="mb-5 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
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
              disabled={loading || Boolean(oauthLoading)}
              className="apple-btn-primary w-full py-3.5 text-xs font-semibold flex items-center justify-center gap-2 shadow-md mt-4 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Create Account & Get 5 Free Audits</span>
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
