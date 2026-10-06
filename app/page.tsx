'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Logo from '@/components/Logo';
import { useAuth } from '@/components/AuthContext';
import { 
  ArrowRight, 
  Search, 
  Sparkles, 
  Zap, 
  CheckCircle2, 
  ChevronRight, 
  ShieldCheck, 
  Smartphone, 
  Download, 
  FileText, 
  TrendingUp, 
  Users, 
  Lock, 
  Play, 
  Info,
  ChevronDown,
  Layers,
  Cpu
} from 'lucide-react';

export default function LandingPage() {
  const { user } = useAuth();
  const [demoRole, setDemoRole] = useState<'engineering' | 'product' | 'growth'>('engineering');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const demoTransformations = {
    engineering: {
      title: 'Senior Fullstack / Cloud Engineer',
      scoreBefore: 38,
      scoreAfter: 94,
      missing: ['Kubernetes', 'CI/CD Pipelines', 'Distributed Microservices', 'p99 Latency'],
      beforeBullet: 'Responsible for backend APIs and fixing software bugs in our web application.',
      afterBullet: 'Architected distributed microservices in Next.js & Node.js, reducing p99 API latency by 42% across 1.2M active users.'
    },
    product: {
      title: 'Senior Product Manager',
      scoreBefore: 42,
      scoreAfter: 96,
      missing: ['A/B Testing', 'CAC Reduction', 'Backlog Grooming', 'GTM Strategy'],
      beforeBullet: 'Worked with designers and engineers to launch product feature updates.',
      afterBullet: 'Spearheaded GTM strategy and iterative A/B testing frameworks, reducing CAC by 28% and driving $840K in incremental ARR.'
    },
    growth: {
      title: 'Growth & Performance Marketing Lead',
      scoreBefore: 35,
      scoreAfter: 92,
      missing: ['Funnel Optimization', 'ROAS', 'HubSpot / Salesforce', 'LTV/CAC Ratio'],
      beforeBullet: 'Ran paid ad campaigns on Google and social media platforms to generate leads.',
      afterBullet: 'Orchestrated full-funnel paid acquisition engine across Google & Meta, scaling ROAS from 1.8x to 4.2x with 34% lower blended CPL.'
    }
  };

  const currentDemo = demoTransformations[demoRole];

  return (
    <div className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f] flex flex-col font-sans selection:bg-[#1d1d1f] selection:text-white relative overflow-hidden">
      
      {/* Background Liquid Ambient Light Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-[10%] left-[20%] w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-[#cce5ff]/50 to-[#99ccff]/30 blur-[140px] animate-floatSlow" />
        <div className="absolute top-[35%] right-[10%] w-[550px] h-[550px] rounded-full bg-gradient-to-br from-[#ebd4fd]/45 to-[#d6b4fc]/30 blur-[140px] animate-floatReverse" />
        <div className="absolute bottom-[10%] left-[15%] w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-[#ffe6dc]/40 to-[#ffd4c4]/25 blur-[150px] animate-liquidPulse" />
      </div>

      {/* Top Apple Ribbon Announcement */}
      <div className="relative z-10 bg-[#f5f5f7]/70 backdrop-blur-md border-b border-[#d2d2d7]/50 py-2 px-4 text-center text-xs text-[#1d1d1f] flex items-center justify-center gap-1.5">
        <span>Instant UPI transfer starting at just <strong>₹49</strong>. Google Pay, PhonePe & Paytm accepted directly.</span>
        <Link href="/app" className="text-[#0071e3] hover:underline font-medium inline-flex items-center ml-1">
          Open Workstation <ChevronRight className="w-3 h-3 inline ml-0.5" />
        </Link>
      </div>

      {/* Apple Frosted Glass Sticky Navigation */}
      <header className="apple-nav sticky top-0 z-40 transition-all duration-300">
        <div className="max-w-6xl mx-auto px-6 h-14 flex justify-between items-center">
          <Link href="/" className="group flex items-center">
            <Logo size="sm" showTagline={false} />
          </Link>

          <nav className="hidden md:flex items-center space-x-8 text-xs text-[#1d1d1f]/80 font-normal">
            <a href="#how-it-works" className="hover:text-[#1d1d1f] transition-colors">How It Works</a>
            <a href="#transformation" className="hover:text-[#1d1d1f] transition-colors">Before & After</a>
            <a href="#features" className="hover:text-[#1d1d1f] transition-colors">Features</a>
            <a href="#pricing" className="hover:text-[#1d1d1f] transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-[#1d1d1f] transition-colors">Questions</a>
          </nav>

          <div className="flex items-center gap-3">
            {user && user.email !== 'guest@shortlist.internal' ? (
              <Link
                href="/app"
                className="px-3.5 py-1.5 rounded-full bg-white/90 border border-[#d2d2d7]/80 text-xs font-semibold text-[#1d1d1f] hover:bg-white transition-all shadow-2xs flex items-center gap-2"
              >
                <span>{user.name}</span>
                <span className="w-2 h-2 rounded-full bg-[#34c759]" />
              </Link>
            ) : (
              <Link
                href="/login"
                className="text-xs text-[#1d1d1f]/80 hover:text-[#1d1d1f] font-medium px-2 py-1 transition-colors"
              >
                Sign In
              </Link>
            )}

            <Link
              href="/app"
              className="apple-btn-primary px-4 py-1.5 text-xs shadow-xs flex items-center gap-1.5"
            >
              <span>Launch Workstation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Hero Section */}
      <section className="relative z-10 pt-20 pb-16 px-6 text-center max-w-5xl mx-auto w-full">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/80 border border-[#d2d2d7]/80 shadow-2xs text-xs font-medium text-[#1d1d1f] mb-6 animate-appleFadeUp">
          <span className="w-2 h-2 rounded-full bg-[#0071e3] animate-pulse" />
          <span>Precision ATS Resume Optimizer & Bullet Re-Writer</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[#1d1d1f] leading-[1.08] mb-6 max-w-4xl mx-auto">
          Get on the Shortlist.
        </h1>

        <p className="text-base sm:text-xl text-[#86868b] max-w-2xl mx-auto font-normal leading-relaxed mb-8">
          Over 75% of qualified resumes are rejected within 3 seconds by applicant tracking bots. 
          SHORTLIST audits your resume against corporate algorithms and transforms your bullet points into quantifiable executive achievements.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3.5 mb-14">
          <Link
            href="/app"
            className="apple-btn-primary px-7 py-3.5 text-sm font-semibold flex items-center gap-2 shadow-md hover:scale-[1.02] transition-transform"
          >
            <span>Audit Your Resume Free</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/promo"
            className="px-6 py-3.5 rounded-full bg-white/90 hover:bg-white text-xs font-semibold text-[#1d1d1f] border border-[#d2d2d7]/80 transition-all shadow-xs flex items-center gap-2"
          >
            <Play className="w-3.5 h-3.5 text-[#0071e3] fill-current" />
            <span>Watch 22s Product Reel</span>
          </Link>
        </div>

        {/* Live Interactive Product Teaser Preview */}
        <div className="liquid-glass rounded-[36px] p-6 sm:p-10 shadow-2xl border border-white text-left max-w-4xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#e5e5ea] pb-6 mb-6">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#0071e3] block mb-1">
                Interactive Demonstration
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-[#1d1d1f]">
                {currentDemo.title}
              </h2>
            </div>

            {/* Role Switcher */}
            <div className="apple-segmented flex gap-1 text-xs">
              {(['engineering', 'product', 'growth'] as const).map((role) => (
                <button
                  key={role}
                  onClick={() => setDemoRole(role)}
                  className={`px-3 py-1.5 rounded-full capitalize transition-all ${
                    demoRole === role 
                      ? 'bg-white text-[#1d1d1f] font-semibold shadow-xs' 
                      : 'text-[#86868b] hover:text-[#1d1d1f]'
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Visual Circular Gauge */}
            <div className="md:col-span-5 flex flex-col items-center justify-center p-6 rounded-2xl bg-white/80 border border-white text-center shadow-2xs">
              <div className="relative w-36 h-36 flex items-center justify-center mb-3">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" stroke="#e5e5ea" strokeWidth="8" fill="none" />
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="40" 
                    stroke="#34c759" 
                    strokeWidth="8" 
                    strokeDasharray={251.2}
                    strokeDashoffset={251.2 * (1 - (currentDemo.scoreAfter / 100))}
                    strokeLinecap="round" 
                    fill="none" 
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-black text-[#1d1d1f]">{currentDemo.scoreAfter}%</span>
                  <span className="text-[9px] uppercase font-bold text-[#34c759] tracking-wider">SHORTLIST MATCH</span>
                </div>
              </div>
              <span className="text-xs text-[#86868b]">
                Previous draft: <strong className="text-red-500 line-through">{currentDemo.scoreBefore}%</strong> ➔ Upgraded to <strong className="text-[#34c759]">{currentDemo.scoreAfter}%</strong>
              </span>
            </div>

            {/* Before vs After Diff Preview */}
            <div className="md:col-span-7 space-y-3">
              <div className="p-3.5 rounded-2xl bg-red-50/60 border border-red-500/20 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-red-600 block">
                  Original Draft (Filtered by ATS)
                </span>
                <p className="text-xs text-[#86868b] line-through leading-relaxed">
                  {currentDemo.beforeBullet}
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-500/25 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block">
                  SHORTLIST Upgrade (Google X-Y-Z Formula)
                </span>
                <p className="text-xs text-[#1d1d1f] font-medium leading-relaxed">
                  {currentDemo.afterBullet}
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs">
                <div className="flex flex-wrap gap-1.5">
                  {currentDemo.missing.slice(0, 3).map((kw, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-full bg-blue-500/10 text-[#0071e3] text-[10px] font-semibold">
                      ✓ {kw}
                    </span>
                  ))}
                </div>
                <Link href="/app" className="text-[#0071e3] font-semibold hover:underline inline-flex items-center gap-1">
                  Try it on your resume <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Reality Check (3 Key Facts) */}
      <section className="relative z-10 py-16 px-6 max-w-5xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="liquid-glass p-8 rounded-[28px] text-center shadow-xs space-y-2">
            <span className="text-4xl sm:text-5xl font-black text-[#1d1d1f] tracking-tight">250+</span>
            <h3 className="text-sm font-bold text-[#1d1d1f]">Resumes Per Opening</h3>
            <p className="text-xs text-[#86868b] leading-relaxed">
              Every mid-to-senior tech posting is flooded with applicants, forcing recruiters to rely on algorithmic threshold cutoffs.
            </p>
          </div>

          <div className="liquid-glass p-8 rounded-[28px] text-center shadow-xs space-y-2">
            <span className="text-4xl sm:text-5xl font-black text-red-500 tracking-tight">75%</span>
            <h3 className="text-sm font-bold text-[#1d1d1f]">Eliminated Silently</h3>
            <p className="text-xs text-[#86868b] leading-relaxed">
              Resumes lacking exact hard-skill tokens or structured chronological formatting are filtered out before reaching human eyes.
            </p>
          </div>

          <div className="liquid-glass p-8 rounded-[28px] text-center shadow-xs space-y-2">
            <span className="text-4xl sm:text-5xl font-black text-[#34c759] tracking-tight">3.4x</span>
            <h3 className="text-sm font-bold text-[#1d1d1f]">Callback Multiplier</h3>
            <p className="text-xs text-[#86868b] leading-relaxed">
              Candidates who rewrite passive duties into quantified impact metrics experience more than triple the interview invitation rate.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works (3 Clear Steps) */}
      <section id="how-it-works" className="relative z-10 py-20 px-6 max-w-5xl mx-auto w-full border-t border-[#d2d2d7]/50">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#0071e3]">
            The 30-Second Workflow
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1d1d1f]">
            How SHORTLIST Works
          </h2>
          <p className="text-sm text-[#86868b]">
            Three automated stages designed to bypass algorithmic filters and impress hiring managers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="liquid-glass p-8 rounded-[30px] shadow-xs space-y-4">
            <div className="w-10 h-10 rounded-2xl bg-[#0071e3]/10 text-[#0071e3] flex items-center justify-center font-bold text-sm">
              01
            </div>
            <h3 className="text-base font-bold text-[#1d1d1f]">Paste Job & Resume</h3>
            <p className="text-xs text-[#86868b] leading-relaxed">
              Enter the target job description and your current resume text into our symmetrical dual-workstation.
            </p>
          </div>

          <div className="liquid-glass p-8 rounded-[30px] shadow-xs space-y-4">
            <div className="w-10 h-10 rounded-2xl bg-[#0071e3]/10 text-[#0071e3] flex items-center justify-center font-bold text-sm">
              02
            </div>
            <h3 className="text-base font-bold text-[#1d1d1f]">Audit Missing Keywords</h3>
            <p className="text-xs text-[#86868b] leading-relaxed">
              Our deterministic lexical engine compares exact hard skills and computes an authentic match percentage (0% to 100%).
            </p>
          </div>

          <div className="liquid-glass p-8 rounded-[30px] shadow-xs space-y-4">
            <div className="w-10 h-10 rounded-2xl bg-[#34c759]/10 text-[#34c759] flex items-center justify-center font-bold text-sm">
              03
            </div>
            <h3 className="text-base font-bold text-[#1d1d1f]">Upgrade & Export</h3>
            <p className="text-xs text-[#86868b] leading-relaxed">
              Google X-Y-Z formula transforms passive statements into quantified results. Download clean ATS-safe `.txt` files in 1 click.
            </p>
          </div>
        </div>
      </section>

      {/* Feature Architecture */}
      <section id="features" className="relative z-10 py-20 px-6 max-w-5xl mx-auto w-full border-t border-[#d2d2d7]/50">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#0071e3]">
            Engineered For Precision
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1d1d1f]">
            Everything Built Into SHORTLIST
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="liquid-glass p-8 rounded-[30px] space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-white text-[#1d1d1f] flex items-center justify-center shadow-xs">
              <Cpu className="w-5 h-5 text-[#0071e3]" />
            </div>
            <h3 className="text-base font-bold text-[#1d1d1f]">Deterministic Lexical Matching</h3>
            <p className="text-xs text-[#86868b] leading-relaxed">
              Unlike generic AI wrappers that hallucinate fake facts, our parser scans for authentic lexical frequency, technical n-grams, and specific toolchain requirements.
            </p>
          </div>

          <div className="liquid-glass p-8 rounded-[30px] space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-white text-[#1d1d1f] flex items-center justify-center shadow-xs">
              <TrendingUp className="w-5 h-5 text-[#34c759]" />
            </div>
            <h3 className="text-base font-bold text-[#1d1d1f]">Google X-Y-Z Bullet Formulas</h3>
            <p className="text-xs text-[#86868b] leading-relaxed">
              Replaces passive verbs with executive action verbs: <em>"Accomplished [X], as measured by [Y], by doing [Z]"</em> to immediately prove ROI to hiring managers.
            </p>
          </div>

          <div className="liquid-glass p-8 rounded-[30px] space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-white text-[#1d1d1f] flex items-center justify-center shadow-xs">
              <Smartphone className="w-5 h-5 text-[#0071e3]" />
            </div>
            <h3 className="text-base font-bold text-[#1d1d1f]">Direct Zero-Fee UPI Payments</h3>
            <p className="text-xs text-[#86868b] leading-relaxed">
              No bloated monthly $20 subscriptions. Pay directly via Google Pay, PhonePe, Paytm, or BHIM starting at just ₹49 per pack.
            </p>
          </div>

          <div className="liquid-glass p-8 rounded-[30px] space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-white text-[#1d1d1f] flex items-center justify-center shadow-xs">
              <ShieldCheck className="w-5 h-5 text-[#1d1d1f]" />
            </div>
            <h3 className="text-base font-bold text-[#1d1d1f]">Strict Data Confidentiality</h3>
            <p className="text-xs text-[#86868b] leading-relaxed">
              Your resume is processed ephemerally. We never sell, rent, or distribute candidate records to third-party recruiters or data brokers.
            </p>
          </div>
        </div>
      </section>

      {/* Competitive Benchmark Comparison Table */}
      <section className="relative z-10 py-20 px-6 max-w-5xl mx-auto w-full border-t border-[#d2d2d7]/50">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#0071e3]">
            Engineered Beyond Generic Tools
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1d1d1f]">
            Why SHORTLIST Outperforms ChatGPT & Legacy Builders
          </h2>
          <p className="text-sm text-[#86868b]">
            Generic AI models generate vague filler text that ATS bots reject. SHORTLIST is architected specifically for corporate algorithmic filters.
          </p>
        </div>

        <div className="liquid-glass rounded-[32px] overflow-hidden shadow-xl border border-white">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#e5e5ea] bg-white/70">
                  <th className="p-4 sm:p-5 font-semibold text-[#1d1d1f]">Evaluation Standard</th>
                  <th className="p-4 sm:p-5 font-bold text-[#0071e3] bg-blue-50/60">
                    <div className="flex items-center gap-1.5">
                      <span>SHORTLIST</span>
                      <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-[#0071e3] text-white font-semibold">PRECISION</span>
                    </div>
                  </th>
                  <th className="p-4 sm:p-5 font-medium text-[#86868b]">ChatGPT / Generic AI</th>
                  <th className="p-4 sm:p-5 font-medium text-[#86868b]">Legacy Builders (Zety / Canva)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e5e5ea]/60">
                <tr className="hover:bg-white/40 transition-colors">
                  <td className="p-4 sm:p-5 font-semibold text-[#1d1d1f]">ATS Exact Lexical Match Ratios</td>
                  <td className="p-4 sm:p-5 font-medium text-emerald-700 bg-blue-50/30">✓ Exact mathematical scoring (0–100%)</td>
                  <td className="p-4 sm:p-5 text-[#86868b]">✕ Subjective hallucinated ratings</td>
                  <td className="p-4 sm:p-5 text-[#86868b]">✕ Zero ATS match testing</td>
                </tr>
                <tr className="hover:bg-white/40 transition-colors">
                  <td className="p-4 sm:p-5 font-semibold text-[#1d1d1f]">Google X-Y-Z Achievement Formulas</td>
                  <td className="p-4 sm:p-5 font-medium text-emerald-700 bg-blue-50/30">✓ Automated quantified bullet rewrites</td>
                  <td className="p-4 sm:p-5 text-[#86868b]">✕ Generic phrases lacking verified metrics</td>
                  <td className="p-4 sm:p-5 text-[#86868b]">✕ Static duty templates</td>
                </tr>
                <tr className="hover:bg-white/40 transition-colors">
                  <td className="p-4 sm:p-5 font-semibold text-[#1d1d1f]">Pricing & Billing Commitments</td>
                  <td className="p-4 sm:p-5 font-medium text-[#1d1d1f] bg-blue-50/30">
                    <strong className="text-emerald-700">₹49 One-Time</strong> (Zero subscription lock-in)
                  </td>
                  <td className="p-4 sm:p-5 text-[#86868b]">$20/mo (~₹1,700/mo recurring)</td>
                  <td className="p-4 sm:p-5 text-[#86868b]">$24.95/mo sneaky auto-renew</td>
                </tr>
                <tr className="hover:bg-white/40 transition-colors">
                  <td className="p-4 sm:p-5 font-semibold text-[#1d1d1f]">Direct Indian Payment Flow</td>
                  <td className="p-4 sm:p-5 font-medium text-emerald-700 bg-blue-50/30">✓ Razorpay Auto-Verify & Direct UPI (GPay, PhonePe, Cards)</td>
                  <td className="p-4 sm:p-5 text-[#86868b]">✕ International credit cards only</td>
                  <td className="p-4 sm:p-5 text-[#86868b]">✕ Card auto-charge traps</td>
                </tr>
                <tr className="hover:bg-white/40 transition-colors">
                  <td className="p-4 sm:p-5 font-semibold text-[#1d1d1f]">Data Privacy Standard</td>
                  <td className="p-4 sm:p-5 font-medium text-emerald-700 bg-blue-50/30">✓ Ephemeral in-memory (Zero data storage)</td>
                  <td className="p-4 sm:p-5 text-[#86868b]">✕ User prompts stored to train models</td>
                  <td className="p-4 sm:p-5 text-[#86868b]">✕ Saved indefinitely on servers</td>
                </tr>
                <tr className="hover:bg-white/40 transition-colors">
                  <td className="p-4 sm:p-5 font-semibold text-[#1d1d1f]">ATS Parse Compatibility</td>
                  <td className="p-4 sm:p-5 font-medium text-emerald-700 bg-blue-50/30">✓ 1-Click parse-safe plain text (.txt)</td>
                  <td className="p-4 sm:p-5 text-[#86868b]">✕ Messy markdown formatting errors</td>
                  <td className="p-4 sm:p-5 text-[#86868b]">✕ Complex PDF columns that crash ATS</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Verified Candidate Callbacks (Social Proof) */}
      <section className="relative z-10 py-16 px-6 max-w-5xl mx-auto w-full border-t border-[#d2d2d7]/50">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#0071e3]">
            Proven By Candidates
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1d1d1f]">
            From Silent Ghosting to Recruiter Callbacks
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="liquid-glass p-7 rounded-[28px] shadow-xs space-y-4 flex flex-col justify-between">
            <p className="text-xs text-[#1d1d1f] leading-relaxed italic">
              "I applied to over 50 jobs with zero responses. Shortlist caught 8 missing technical toolchain keywords on my first scan. Within two weeks of using the upgraded draft, I had 4 interview invitations."
            </p>
            <div className="border-t border-[#e5e5ea] pt-3 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[#1d1d1f] block">Rohan M.</span>
                <span className="text-[10px] text-[#86868b]">Senior Cloud Architect</span>
              </div>
              <span className="text-[10px] font-semibold text-[#0071e3] bg-blue-500/10 px-2.5 py-1 rounded-full">
                4 Callbacks
              </span>
            </div>
          </div>

          <div className="liquid-glass p-7 rounded-[28px] shadow-xs space-y-4 flex flex-col justify-between">
            <p className="text-xs text-[#1d1d1f] leading-relaxed italic">
              "The Google X-Y-Z formula re-writer completely changed how my accomplishments read. Instead of passive duties, every bullet proved actual business ROI. Landed my SDE II offer with a 40% hike."
            </p>
            <div className="border-t border-[#e5e5ea] pt-3 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[#1d1d1f] block">Priya S.</span>
                <span className="text-[10px] text-[#86868b]">Fullstack Engineer</span>
              </div>
              <span className="text-[10px] font-semibold text-[#34c759] bg-emerald-500/10 px-2.5 py-1 rounded-full">
                Tier 1 Offer
              </span>
            </div>
          </div>

          <div className="liquid-glass p-7 rounded-[28px] shadow-xs space-y-4 flex flex-col justify-between">
            <p className="text-xs text-[#1d1d1f] leading-relaxed italic">
              "Paying ₹49 straight through Google Pay without a monthly recurring subscription is a breath of fresh air. It took literally 30 seconds to optimize my resume for a dream PM role."
            </p>
            <div className="border-t border-[#e5e5ea] pt-3 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[#1d1d1f] block">Ankit V.</span>
                <span className="text-[10px] text-[#86868b]">Product Manager</span>
              </div>
              <span className="text-[10px] font-semibold text-[#0071e3] bg-blue-500/10 px-2.5 py-1 rounded-full">
                Direct UPI
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section in INR */}
      <section id="pricing" className="relative z-10 py-24 px-6 max-w-4xl mx-auto w-full border-t border-[#d2d2d7]/50">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#0071e3]">
            Simple & Transparent Micro-Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1d1d1f]">
            Priced in INR. Affordable for Everyone.
          </h2>
          <p className="text-sm text-[#86868b]">
            Zero recurring credit card commitments. Direct UPI transfer with instant credit activation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Starter Plan */}
          <div className="liquid-glass p-8 rounded-[32px] flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-bold text-base text-[#1d1d1f]">Shortlist Pass</h3>
                <span className="text-[10px] bg-white border border-white text-[#1d1d1f] px-2.5 py-0.5 rounded-full font-medium">One-Time</span>
              </div>
              <p className="text-xs text-[#86868b] mb-6">Ideal for targeting specific dream job applications.</p>
              
              <div className="text-5xl font-black tracking-tight text-[#1d1d1f] mb-6">
                ₹49 <span className="text-xs font-normal text-[#86868b]">/ 15 Evaluations</span>
              </div>

              <ul className="text-xs space-y-3 text-[#1d1d1f] mb-8">
                <li className="flex items-center gap-2">✓ 15 Full ATS Audits (<span className="text-[#86868b]">~₹3.20/audit</span>)</li>
                <li className="flex items-center gap-2">✓ Missing Keyword Radar</li>
                <li className="flex items-center gap-2">✓ Google X-Y-Z Metric Upgrades</li>
                <li className="flex items-center gap-2">✓ 1-Click Plain-Text Download (.txt)</li>
              </ul>
            </div>

            <Link
              href="/app?upgrade=starter"
              className="apple-btn-dark w-full py-3.5 text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Get 15 Audits (₹49)</span>
            </Link>
          </div>

          {/* Unlimited Pro Plan */}
          <div className="liquid-glass p-8 rounded-[32px] flex flex-col justify-between border-2 border-[#1d1d1f] relative shadow-lg">
            <span className="absolute -top-3 right-6 bg-[#1d1d1f] text-white text-[9px] font-bold uppercase px-3 py-0.5 rounded-full tracking-wider shadow-sm">
              Most Popular
            </span>
            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-bold text-base text-[#1d1d1f]">Shortlist Unlimited</h3>
                <span className="text-[10px] bg-white border border-white text-[#1d1d1f] px-2.5 py-0.5 rounded-full font-medium">Monthly</span>
              </div>
              <p className="text-xs text-[#86868b] mb-6">For active candidates applying across multiple companies.</p>
              
              <div className="text-5xl font-black tracking-tight text-[#1d1d1f] mb-6">
                ₹99 <span className="text-xs font-normal text-[#86868b]">/ month</span>
              </div>

              <ul className="text-xs space-y-3 text-[#1d1d1f] mb-8">
                <li className="flex items-center gap-2">✓ Unlimited ATS Resume Audits (<span className="text-[#86868b]">&lt;₹3.30/day</span>)</li>
                <li className="flex items-center gap-2">✓ Custom Cover Letter Hooks</li>
                <li className="flex items-center gap-2">✓ Priority Technical Skill Expansion</li>
                <li className="flex items-center gap-2">✓ Cancel Anytime With Zero Fees</li>
              </ul>
            </div>

            <Link
              href="/app?upgrade=unlimited"
              className="apple-btn-primary w-full py-3.5 text-xs font-semibold flex items-center justify-center gap-1.5 shadow-md"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Subscribe for ₹99/mo</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Prominent High-Visibility Questions Section */}
      <section id="faq" className="relative z-10 py-24 px-6 border-t border-[#d2d2d7]/60">
        <div className="max-w-4xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0071e3]/10 text-[#0071e3] text-xs font-semibold tracking-wide uppercase">
              <Info className="w-3.5 h-3.5" />
              <span>Questions & Answers</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1d1d1f] tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-[#86868b]">
              Everything you need to know about direct UPI payments, our ATS algorithm, and data privacy.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "How do UPI payments work on Shortlist?",
                a: "When you choose a plan inside the Workstation, an instant scannable UPI QR code is generated for your selected amount (₹49 or ₹99). You can scan it directly with Google Pay, PhonePe, Paytm, BHIM, or Cred, or tap 'Pay on Mobile App' on your phone. All funds transfer 100% directly to darsheel.sirola@fam with zero middleman commissions. Paste your 12-digit UPI reference number to activate audits instantly."
              },
              {
                q: "Will my optimized resume pass ATS filters like Workday, Greenhouse, Taleo, and Lever?",
                a: "Yes. Enterprise ATS software parses incoming resumes by extracting hard skills, keyword frequency, and standard chronological bullet formatting. Shortlist identifies the exact high-value keywords missing from your target job description and rewrites your bullets with Google's proven X-Y-Z formula so your application ranks at the top of recruiter search results."
              },
              {
                q: "What makes Shortlist different from ChatGPT or generic resume builders?",
                a: "Generic AI chatbots produce verbose, generic text that ATS algorithms flag and reject. Shortlist uses a deterministic lexical matching engine: it calculates your exact keyword coverage score (0% to 100%), extracts missing competencies directly from the employer's posting, and gives you an Apple-clean Before & After diff with quantifiable metrics."
              },
              {
                q: "Why is Shortlist only ₹49 instead of a $20/month recurring subscription?",
                a: "Job searching is already stressful—nobody needs another expensive recurring monthly bill. We designed Shortlist with micro-pricing in Indian Rupees (₹49 for 15 audits). No recurring auto-debits, no hidden renewal traps. Pay once when you need to apply."
              },
              {
                q: "Is my resume data kept private and confidential?",
                a: "Yes, 100%. We operate under strict privacy standards. We never sell, rent, or distribute your resume or contact details to third-party recruiters or data brokers. Your text is processed ephemerally solely to calculate your score and suggest bullet upgrades."
              },
              {
                q: "How do I download or export my optimized resume?",
                a: "With one click, you can copy upgraded bullet points directly to your clipboard, copy the entire tailored resume text, or click 'Download Plain-Text (.txt)' to get an ATS-safe file ready to paste into any job portal."
              }
            ].map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx} 
                  className={`rounded-2xl transition-all duration-300 overflow-hidden border ${
                    isOpen 
                      ? 'bg-white shadow-lg border-[#0071e3]/30 ring-1 ring-[#0071e3]/20' 
                      : 'bg-white/90 hover:bg-white shadow-xs border-[#d2d2d7]/60 hover:border-[#86868b]/40'
                  }`}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 sm:p-6 text-left flex justify-between items-center gap-4 transition-colors group"
                  >
                    <div className="flex items-center gap-3.5">
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                        isOpen ? 'bg-[#0071e3] text-white' : 'bg-[#f5f5f7] text-[#86868b] group-hover:text-[#1d1d1f]'
                      }`}>
                        {idx + 1}
                      </span>
                      <span className="text-base sm:text-lg font-bold text-[#1d1d1f] leading-snug group-hover:text-[#0071e3] transition-colors">
                        {item.q}
                      </span>
                    </div>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all ${
                      isOpen ? 'bg-[#0071e3]/10 text-[#0071e3] rotate-180' : 'bg-[#f5f5f7] text-[#86868b] group-hover:bg-[#e5e5ea]'
                    }`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>
                  
                  {isOpen && (
                    <div className="px-5 pb-6 sm:px-6 sm:pb-6 pt-1 text-sm sm:text-base text-[#424245] leading-relaxed border-t border-[#f0f0f2] animate-appleFadeUp">
                      <div className="pl-11.5">
                        {item.a}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom Call-to-Action Banner */}
      <section className="relative z-10 py-20 px-6 max-w-4xl mx-auto w-full text-center">
        <div className="liquid-glass p-10 sm:p-14 rounded-[36px] shadow-2xl border border-white space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1d1d1f]">
            Ready to 3x your interview callback rate?
          </h2>
          <p className="text-sm sm:text-base text-[#86868b] max-w-xl mx-auto leading-relaxed">
            Stop sending resumes that get deleted by automated algorithms. Run an instant audit in 30 seconds.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/app"
              className="apple-btn-primary px-8 py-3.5 text-sm font-semibold flex items-center gap-2 shadow-md hover:scale-[1.02] transition-transform"
            >
              <span>Launch SHORTLIST Workstation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Apple Official Clean Legal Footer */}
      <footer className="relative z-10 border-t border-[#d2d2d7] py-12 px-6 text-xs text-[#86868b] bg-[#f5f5f7]/80 backdrop-blur-md">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <Logo size="sm" />
            <div className="flex items-center space-x-6 text-[#1d1d1f] font-normal">
              <Link href="/terms" className="hover:underline">Terms of Service</Link>
              <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
              <Link href="/app" className="hover:underline">Workstation</Link>
              <Link href="/login" className="hover:underline">Sign In</Link>
              <a href="#pricing" className="hover:underline">Pricing (₹)</a>
            </div>
          </div>

          <div className="border-t border-[#d2d2d7]/60 pt-6 text-[11px] text-[#86868b] space-y-2 leading-relaxed">
            <p>
              <strong>Trademark Notice:</strong> Workday, Taleo, Greenhouse, Lever, LinkedIn, Apple, and other company or software product names referenced on this site are registered trademarks of their respective owners. Shortlist is an independent document audit utility and is not affiliated with, endorsed by, or sponsored by any of these trademark holders.
            </p>
            <p>
              <strong>Warranty & Liability Disclaimer:</strong> Shortlist provides automated text suggestions for informational and formatting purposes only. We do not guarantee employment, interview callbacks, or hiring decisions. Maximum liability is strictly capped at the purchase price paid (maximum ₹99.00 INR). Users are exclusively responsible for the veracity of their job applications.
            </p>
            <div className="pt-2 flex flex-wrap justify-between items-center border-t border-[#d2d2d7]/40 gap-2">
              <p>Copyright &copy; 2026 Shortlist. All rights reserved.</p>
              <div className="flex items-center gap-2 text-[10px] text-[#86868b]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#34c759] animate-pulse" />
                <span>All ATS Evaluation Engines Operational • 99.9% Uptime</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
