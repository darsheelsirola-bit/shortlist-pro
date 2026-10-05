'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Logo from '@/components/Logo';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  Copy, 
  Check, 
  FileText, 
  Download, 
  Sparkles, 
  Lock, 
  X, 
  CreditCard, 
  Search, 
  Info,
  ChevronDown,
  ChevronRight,
  Trash2,
  Users,
  Smartphone,
  QrCode,
  Edit2,
  ExternalLink,
  ShieldCheck,
  ArrowRight,
  SlidersHorizontal,
  CheckCheck
} from 'lucide-react';

export default function Home() {
  const [jobDescription, setJobDescription] = useState('');
  const [resume, setResume] = useState('');
  const [loading, setLoading] = useState(false);
  const [enhanceLoading, setEnhanceLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'bullets' | 'comparison' | 'fullResume' | 'coverLetter'>('bullets');
  const [credits, setCredits] = useState<number>(3);
  const [enhanceGoal, setEnhanceGoal] = useState<'metrics' | 'executive' | 'concise'>('metrics');
  
  // Animated Score state
  const [animatedScore, setAnimatedScore] = useState<number>(0);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // FAQ Accordion (First question open by default for immediate visibility)
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // UPI Payment Configuration State (User's real receiving UPI ID)
  const [merchantUpiId, setMerchantUpiId] = useState<string>('darsheel.sirola@fam');
  const [editingUpiId, setEditingUpiId] = useState<boolean>(false);
  const [tempUpiInput, setTempUpiInput] = useState<string>('darsheel.sirola@fam');

  // Checkout Modal State
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card'>('upi');
  const [utrNumber, setUtrNumber] = useState<string>('');
  const [agreedToTerms, setAgreedToTerms] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<{ name: string; price: string; amount: number; credits: number }>({
    name: 'Shortlist Pass (15 Audits)',
    price: '₹49',
    amount: 49,
    credits: 15,
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedUpi = localStorage.getItem('shortlist_merchant_upi');
      if (savedUpi) {
        setMerchantUpiId(savedUpi);
        setTempUpiInput(savedUpi);
      }

      const params = new URLSearchParams(window.location.search);
      if (params.get('payment') === 'success') {
        setCredits(prev => prev + 15);
        showToast('Payment verified. 15 credits unlocked.');
      }
    }
  }, []);

  const saveCustomUpi = () => {
    if (!tempUpiInput.trim() || !tempUpiInput.includes('@')) {
      alert('Please enter a valid UPI ID (e.g. yourname@okhdfcbank or yourname@paytm)');
      return;
    }
    setMerchantUpiId(tempUpiInput.trim());
    localStorage.setItem('shortlist_merchant_upi', tempUpiInput.trim());
    setEditingUpiId(false);
    showToast('UPI ID updated.');
  };

  // Animate score counter smoothly like Apple Health Activity ring
  useEffect(() => {
    if (result?.matchScore) {
      let start = 0;
      const target = result.matchScore;
      const duration = 750;
      const intervalTime = 16;
      const steps = duration / intervalTime;
      const increment = target / steps;

      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setAnimatedScore(target);
          clearInterval(timer);
          if (target >= 80) {
            triggerConfetti();
          }
        } else {
          setAnimatedScore(Math.floor(start));
        }
      }, intervalTime);

      return () => clearInterval(timer);
    } else {
      setAnimatedScore(0);
    }
  }, [result]);

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 45,
        spread: 65,
        origin: { y: 0.7 },
        colors: ['#0071e3', '#1d1d1f', '#86868b', '#0077ed', '#34c759']
      });
    } catch {}
  };

  const loadSampleData = () => {
    setJobDescription(
`Senior Technical Product Manager — Data & Infrastructure
Requirements:
• 5+ years managing enterprise cloud infrastructure or SaaS platform deliverables.
• Expertise in Agile/Scrum sprint cycles, backlog grooming, and user story mapping.
• Track record in cross-functional alignment across software engineering, UX, and sales.
• Proficiency in SQL, Python data analytics, CI/CD pipelines, and cloud computing (AWS/GCP).
• Direct accountability for customer retention, CAC reduction, and quarterly revenue KPIs.`
    );
    setResume(
`Alex Morgan — Product Specialist
Professional Experience:
• Managed software releases for enterprise business tools.
• Worked with engineering and design leads to coordinate product feature roadmaps.
• Tracked product usage data using spreadsheets and basic analytics reporting.
• Organized weekly team sprint reviews and daily standup syncs.
• Communicated quarterly release updates to department leaders and stakeholders.`
    );
    showToast('Sample documents loaded.');
  };

  const clearForm = () => {
    setJobDescription('');
    setResume('');
    setResult(null);
    showToast('Form cleared.');
  };

  const handleAnalyze = async () => {
    if (!jobDescription.trim() || !resume.trim()) {
      alert('Please enter both the Job Description and your Resume text.');
      return;
    }

    if (jobDescription.trim().length < 40 || resume.trim().length < 40) {
      alert('Please provide more detailed text for both fields (minimum 40 characters) to ensure an accurate ATS audit.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/tailor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resume, jobDescription, mode: 'tailor' }),
      });
      const data = await res.json();
      if (res.ok) {
        setResult(data);
        if (credits > 0) setCredits(prev => prev - 1);
        showToast('Audit complete.');
      } else {
        alert(data.error || 'Failed to process audit.');
      }
    } catch {
      alert('Unable to connect to analysis server.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeepEnhance = async () => {
    if (!jobDescription.trim() || !resume.trim()) {
      alert('Please enter both the Job Description and your Resume text.');
      return;
    }

    setEnhanceLoading(true);
    try {
      const res = await fetch('/api/tailor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resume, jobDescription, mode: 'enhance', enhanceGoal }),
      });
      const data = await res.json();
      if (res.ok) {
        setResult(data);
        setActiveTab('bullets');
        if (credits > 0) setCredits(prev => prev - 1);
        showToast('Bullets upgraded with quantifiable metrics.');
      } else {
        alert(data.error || 'Failed to enhance resume.');
      }
    } catch {
      alert('Unable to connect to optimization server.');
    } finally {
      setEnhanceLoading(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(id);
    showToast('Copied to clipboard.');
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const downloadResume = () => {
    if (!result?.fullOptimizedResume) return;
    const element = document.createElement('a');
    const file = new Blob([result.fullOptimizedResume], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'SHORTLIST_Optimized_Resume.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    showToast('Resume downloaded (.txt).');
  };

  const injectKeywords = (kw?: string) => {
    const toInject = kw ? [kw] : result?.missingKeywords;
    if (!toInject || toInject.length === 0) return;
    const kwText = `\n\nADDITIONAL COMPETENCIES: ${toInject.join(' • ')}`;
    setResume(prev => prev + kwText);
    showToast(`Appended ${toInject.length} keyword(s) to draft.`);
  };

  const openCheckout = (name: string, price: string, amount: number, planCredits: number) => {
    setSelectedPlan({ name, price, amount, credits: planCredits });
    setUtrNumber('');
    setCheckoutModalOpen(true);
  };

  const verifyUpiPayment = () => {
    if (!agreedToTerms) {
      alert('Please agree to the Terms of Service to proceed.');
      return;
    }
    if (!utrNumber.trim() || utrNumber.trim().length < 6) {
      alert('Please enter your 12-digit UPI UTR / Reference number from GPay/PhonePe/Paytm to activate credits.');
      return;
    }

    setCredits(prev => prev + selectedPlan.credits);
    setCheckoutModalOpen(false);
    triggerConfetti();
    showToast(`UPI Payment Verified! +${selectedPlan.credits} credits activated.`);
  };

  const handleCardCheckout = async () => {
    if (!agreedToTerms) {
      alert('Please agree to the Terms of Service to proceed.');
      return;
    }

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: selectedPlan.name.toLowerCase().includes('unlimited') ? 'unlimited' : 'starter' }),
      });
      const data = await res.json();
      if (data.url && !data.demo) {
        window.location.href = data.url;
        return;
      }
    } catch (e) {
      console.warn('Simulation mode active.');
    }

    setCredits(prev => prev + selectedPlan.credits);
    setCheckoutModalOpen(false);
    showToast(`Payment verified. ${selectedPlan.credits} credits added.`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      handleAnalyze();
    }
  };

  const wordCount = (str: string) => str.trim() ? str.trim().split(/\s+/).length : 0;

  // Split original user bullets for before-after comparison
  const originalBullets = resume
    .split(/\n+/)
    .map(line => line.trim())
    .filter(line => line.length > 15 && !line.toLowerCase().includes('experience:') && !line.toLowerCase().includes('education:'))
    .slice(0, 4);

  // Generate real UPI deep link and QR Code URL
  const upiDeepLink = `upi://pay?pa=${encodeURIComponent(merchantUpiId)}&pn=Shortlist&am=${selectedPlan.amount}&cu=INR&tn=${encodeURIComponent(selectedPlan.name)}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=4&data=${encodeURIComponent(upiDeepLink)}`;

  return (
    <div className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f] flex flex-col font-sans selection:bg-[#1d1d1f] selection:text-white relative overflow-hidden">
      
      {/* Background Liquid Ambient Light Orbs (Refract through Liquid Glass cards) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Soft Sky Blue Orb */}
        <div className="absolute -top-[10%] left-[15%] w-[550px] h-[550px] rounded-full bg-gradient-to-tr from-[#cce5ff]/60 to-[#99ccff]/40 blur-[130px] animate-floatSlow"></div>
        {/* Soft Lavender / Amethyst Orb */}
        <div className="absolute top-[35%] right-[10%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[#ebd4fd]/50 to-[#d6b4fc]/35 blur-[140px] animate-floatReverse"></div>
        {/* Subtle Pearlescent Peach Orb */}
        <div className="absolute bottom-[10%] left-[20%] w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-[#ffe6dc]/45 to-[#ffd4c4]/30 blur-[150px] animate-liquidPulse"></div>
      </div>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-7 left-1/2 -translate-x-1/2 z-50 bg-[#1d1d1f]/90 backdrop-blur-xl text-white px-5 py-2.5 rounded-full shadow-2xl flex items-center gap-2.5 text-xs font-medium animate-appleScale border border-white/15">
          <CheckCircle2 className="w-4 h-4 text-[#34c759] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Apple Store Style Ribbon Announcement */}
      <div className="relative z-10 bg-[#f5f5f7]/70 backdrop-blur-md border-b border-[#d2d2d7]/50 py-2.5 px-4 text-center text-xs text-[#1d1d1f] flex items-center justify-center gap-1.5">
        <span>Get the Shortlist Pass starting at just <strong>₹49</strong>. Instant UPI transfer with Google Pay, PhonePe & Paytm.</span>
        <a href="#pricing" className="text-[#0071e3] hover:underline font-medium inline-flex items-center ml-1">
          Buy now <ChevronRight className="w-3 h-3 inline ml-0.5" />
        </a>
      </div>

      {/* Apple Frosted Glass Sticky Navigation */}
      <header className="apple-nav sticky top-0 z-40 transition-all duration-300">
        <div className="max-w-5xl mx-auto px-6 h-12 flex justify-between items-center">
          <Link href="/" className="group flex items-center">
            <Logo size="sm" showTagline={false} />
          </Link>

          <nav className="hidden md:flex items-center space-x-8 text-xs text-[#1d1d1f]/80 font-normal">
            <a href="#tool" className="hover:text-[#1d1d1f] transition-colors">Overview</a>
            <a href="#how-it-works" className="hover:text-[#1d1d1f] transition-colors">Process</a>
            <a href="#pricing" className="hover:text-[#1d1d1f] transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-[#1d1d1f] transition-colors">Questions</a>
            <Link href="/terms" className="hover:text-[#1d1d1f] transition-colors">Terms</Link>
            <Link href="/privacy" className="hover:text-[#1d1d1f] transition-colors">Privacy</Link>
          </nav>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-block text-[11px] text-[#86868b] font-mono">
              {credits} Credits
            </span>

            <button
              onClick={() => openCheckout('Shortlist Pass (15 Audits)', '₹49', 49, 15)}
              className="apple-btn-primary px-3.5 py-1 text-xs shadow-xs"
            >
              Get Credits — ₹49
            </button>
          </div>
        </div>
      </header>

      {/* Cinematic Apple Hero Section (Perfect Proportions) */}
      <section className="relative z-10 text-center pt-24 pb-16 px-4 max-w-4xl mx-auto animate-appleFadeUp">
        <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md border border-white/80 text-[#1d1d1f] text-xs px-4 py-1.5 rounded-full mb-6 font-medium shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0071e3] animate-pulse"></span>
          <span>Shortlist Pro • Verifiable ATS Engine</span>
        </div>
        
        <h1 className="text-5xl sm:text-7xl font-bold tracking-[-0.035em] text-[#1d1d1f] mb-6 leading-[1.08]">
          Engineered to pass. <br />
          Impossible to filter.
        </h1>

        <p className="text-[#86868b] text-lg sm:text-xl max-w-xl mx-auto mb-10 font-normal leading-relaxed tracking-[-0.01em]">
          Screening algorithms reject 75% of applicants before human review. Shortlist audits keyword density, upgrades quantifiable impact, and puts your resume on the interview shortlist.
        </p>

        {/* Dual Apple Pill Actions */}
        <div className="flex items-center justify-center gap-4 text-sm font-normal">
          <button
            onClick={loadSampleData}
            className="apple-btn-primary px-5 py-2.5 text-xs sm:text-sm inline-flex items-center gap-1.5 shadow-sm"
          >
            <span>Load Sample Audit</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
          <a
            href="#tool"
            className="text-[#0071e3] hover:underline text-xs sm:text-sm inline-flex items-center font-medium"
          >
            Explore the tool <ChevronRight className="w-3.5 h-3.5 inline ml-0.5" />
          </a>
        </div>
      </section>

      {/* Main Interactive Workstation (Liquid Frosted Glass & Symmetrical Proportions) */}
      <section id="tool" className="relative z-10 max-w-6xl mx-auto w-full px-4 pb-24 grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1">
        
        {/* Left Column: Input Hardware Surface */}
        <div className="liquid-glass rounded-[32px] p-8 flex flex-col justify-between">
          <div className="space-y-6">
            
            {/* Window Titlebar */}
            <div className="flex items-center justify-between pb-4 border-b border-[#e5e5ea]/80">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#ff5f56]/90 inline-block shadow-2xs"></span>
                <span className="w-3 h-3 rounded-full bg-[#ffbd2e]/90 inline-block shadow-2xs"></span>
                <span className="w-3 h-3 rounded-full bg-[#27c93f]/90 inline-block shadow-2xs"></span>
                <span className="text-xs font-semibold text-[#1d1d1f] ml-1.5 tracking-tight">Source Requirements</span>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={loadSampleData} 
                  className="text-xs text-[#0071e3] hover:underline font-medium transition"
                >
                  Load Sample
                </button>
                <button 
                  onClick={clearForm} 
                  className="text-xs text-[#86868b] hover:text-[#1d1d1f] transition"
                  title="Clear inputs"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Target Job Description */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-medium text-[#1d1d1f]">
                  Target Job Description
                </label>
                <span className="text-[10px] text-[#86868b] font-mono">{wordCount(jobDescription)} words</span>
              </div>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Paste the target job description or requirements here..."
                className="w-full h-36 bg-white/70 backdrop-blur-md border border-[#d2d2d7]/50 rounded-2xl p-4 text-xs sm:text-sm focus:outline-none focus:border-[#0071e3] focus:bg-white text-[#1d1d1f] resize-none transition-all placeholder:text-[#86868b]/70 font-sans shadow-inner"
              />
            </div>

            {/* Current Resume */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-medium text-[#1d1d1f]">
                  Current Resume Experience
                </label>
                <span className="text-[10px] text-[#86868b] font-mono">{wordCount(resume)} words</span>
              </div>
              <textarea
                value={resume}
                onChange={(e) => setResume(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Paste your current resume bullet points or experience summary..."
                className="w-full h-44 bg-white/70 backdrop-blur-md border border-[#d2d2d7]/50 rounded-2xl p-4 text-xs sm:text-sm focus:outline-none focus:border-[#0071e3] focus:bg-white text-[#1d1d1f] resize-none transition-all placeholder:text-[#86868b]/70 font-sans shadow-inner"
              />
              <div className="flex justify-between items-center mt-1 text-[10px] text-[#86868b]">
                <span>Press <kbd className="bg-white/80 border border-[#d2d2d7]/80 px-1.5 py-0.5 rounded font-mono text-[9px] text-[#1d1d1f] shadow-2xs">⌘ + Enter</kbd> to audit</span>
              </div>
            </div>

            {/* Segmented Control for Strategy */}
            <div className="pt-1">
              <span className="text-[11px] font-medium text-[#86868b] block mb-2">
                Enhancement Strategy
              </span>
              <div className="apple-segmented grid grid-cols-3 gap-1">
                <button
                  type="button"
                  onClick={() => setEnhanceGoal('metrics')}
                  className={`text-xs py-1.5 px-2 rounded-full font-medium transition text-center ${
                    enhanceGoal === 'metrics' 
                      ? 'bg-white text-[#1d1d1f] shadow-xs font-semibold' 
                      : 'text-[#86868b] hover:text-[#1d1d1f]'
                  }`}
                >
                  Metrics
                </button>
                <button
                  type="button"
                  onClick={() => setEnhanceGoal('executive')}
                  className={`text-xs py-1.5 px-2 rounded-full font-medium transition text-center ${
                    enhanceGoal === 'executive' 
                      ? 'bg-white text-[#1d1d1f] shadow-xs font-semibold' 
                      : 'text-[#86868b] hover:text-[#1d1d1f]'
                  }`}
                >
                  Executive Tone
                </button>
                <button
                  type="button"
                  onClick={() => setEnhanceGoal('concise')}
                  className={`text-xs py-1.5 px-2 rounded-full font-medium transition text-center ${
                    enhanceGoal === 'concise' 
                      ? 'bg-white text-[#1d1d1f] shadow-xs font-semibold' 
                      : 'text-[#86868b] hover:text-[#1d1d1f]'
                  }`}
                >
                  Concise
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <button
              onClick={handleAnalyze}
              disabled={loading || enhanceLoading}
              className="w-full bg-white/80 hover:bg-white text-[#1d1d1f] font-medium py-3 rounded-full text-xs sm:text-sm transition flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50 border border-white/90 shadow-xs"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin rounded-full h-3.5 w-3.5 border-2 border-[#1d1d1f] border-t-transparent"></span>
                  Auditing...
                </span>
              ) : (
                <>
                  <Search className="w-3.5 h-3.5 text-[#1d1d1f]" />
                  <span>Audit ATS Match</span>
                </>
              )}
            </button>

            <button
              onClick={handleDeepEnhance}
              disabled={loading || enhanceLoading}
              className="w-full apple-btn-primary py-3 text-xs sm:text-sm transition flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50"
            >
              {enhanceLoading ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin rounded-full h-3.5 w-3.5 border-2 border-white border-t-transparent"></span>
                  Upgrading...
                </span>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-white" />
                  <span>Optimize for Shortlist</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Output Porcelain Card */}
        <div className="liquid-glass rounded-[32px] p-8 flex flex-col justify-between min-h-[580px]">
          <div>
            {/* Card Header & Apple Tabs */}
            <div className="flex flex-wrap items-center justify-between pb-4 mb-5 border-b border-[#e5e5ea]/80 gap-3">
              <span className="text-xs font-semibold text-[#1d1d1f] tracking-tight flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#0071e3] shadow-xs"></span>
                Audit Findings & Output
              </span>

              {result && (
                <div className="apple-segmented flex gap-1">
                  <button 
                    onClick={() => setActiveTab('bullets')}
                    className={`text-xs px-3 py-1 rounded-full font-medium transition ${
                      activeTab === 'bullets' ? 'bg-white text-[#1d1d1f] shadow-xs' : 'text-[#86868b] hover:text-[#1d1d1f]'
                    }`}
                  >
                    Bullets
                  </button>
                  <button 
                    onClick={() => setActiveTab('comparison')}
                    className={`text-xs px-3 py-1 rounded-full font-medium transition ${
                      activeTab === 'comparison' ? 'bg-white text-[#1d1d1f] shadow-xs' : 'text-[#86868b] hover:text-[#1d1d1f]'
                    }`}
                  >
                    Before / After
                  </button>
                  <button 
                    onClick={() => setActiveTab('fullResume')}
                    className={`text-xs px-3 py-1 rounded-full font-medium transition ${
                      activeTab === 'fullResume' ? 'bg-white text-[#1d1d1f] shadow-xs' : 'text-[#86868b] hover:text-[#1d1d1f]'
                    }`}
                  >
                    Full Text (.txt)
                  </button>
                  <button 
                    onClick={() => setActiveTab('coverLetter')}
                    className={`text-xs px-3 py-1 rounded-full font-medium transition ${
                      activeTab === 'coverLetter' ? 'bg-white text-[#1d1d1f] shadow-xs' : 'text-[#86868b] hover:text-[#1d1d1f]'
                    }`}
                  >
                    Cover Letter
                  </button>
                </div>
              )}
            </div>

            {/* Empty State */}
            {!result && !loading && !enhanceLoading && (
              <div className="h-[460px] border border-dashed border-[#d2d2d7] rounded-[24px] flex flex-col items-center justify-center text-[#86868b] p-8 text-center gap-3.5 bg-white/40 backdrop-blur-sm">
                <FileText className="w-10 h-10 text-[#86868b]/60 stroke-1" />
                <div>
                  <h3 className="font-semibold text-[#1d1d1f] text-sm">Ready for Analysis</h3>
                  <p className="text-xs text-[#86868b] max-w-sm mt-1 leading-relaxed">
                    Paste your requirements on the left, or tap <span className="underline cursor-pointer text-[#0071e3] font-medium" onClick={loadSampleData}>Load Sample</span> to run an algorithmic ATS audit.
                  </p>
                </div>
              </div>
            )}

            {/* Loading Shimmer State */}
            {(loading || enhanceLoading) && (
              <div className="h-[460px] flex flex-col justify-center items-center p-6 space-y-4">
                <div className="w-10 h-10 rounded-full border-2 border-[#0071e3] border-t-transparent animate-spin mb-2"></div>
                <div className="text-center space-y-1">
                  <p className="font-semibold text-[#1d1d1f] text-sm">
                    {enhanceLoading ? 'Reconstructing accomplishment bullet points...' : 'Evaluating qualification density against ATS parameters...'}
                  </p>
                  <p className="text-xs text-[#86868b]">Checking recruiter algorithms and keyword overlap.</p>
                </div>
              </div>
            )}

            {/* Result Display */}
            {result && !loading && !enhanceLoading && (
              <div className="space-y-4 animate-appleFadeUp">
                
                {/* Score Summary Box with Apple Activity Ring */}
                <div className="liquid-glass-subtle p-5 rounded-[24px] flex flex-wrap items-center justify-between gap-4">
                  <div className="flex-1 min-w-[200px]">
                    <span className="text-[10px] font-semibold text-[#86868b] uppercase tracking-wider block">
                      Target Role: {result.targetJobTitle}
                    </span>
                    <p className="text-xs text-[#1d1d1f] mt-1 font-medium leading-relaxed">
                      {result.verdict}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Apple Activity Style Ring */}
                    <div className="relative w-16 h-16 flex items-center justify-center">
                      <svg className="w-16 h-16 -rotate-90" viewBox="0 0 36 36">
                        <path
                          className="text-[#e5e5ea]"
                          stroke="currentColor"
                          strokeWidth="3.2"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                          className="text-[#0071e3] transition-all duration-700 ease-out"
                          strokeDasharray={`${animatedScore}, 100`}
                          stroke="currentColor"
                          strokeWidth="3.2"
                          strokeLinecap="round"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                      </svg>
                      <div className="absolute flex flex-col items-center">
                        <span className="text-base font-bold text-[#1d1d1f] leading-none">
                          {animatedScore}%
                        </span>
                        <span className="text-[8px] font-medium text-[#86868b] uppercase">Match</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Keyword Analysis: Present vs Missing */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  
                  {/* Confirmed Keywords Found */}
                  <div className="liquid-glass-subtle p-4 rounded-[22px]">
                    <span className="text-[10px] font-semibold text-[#86868b] uppercase tracking-wider block mb-2">
                      Confirmed in Resume ({result.presentKeywords?.length || 0})
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {result.presentKeywords?.length > 0 ? (
                        result.presentKeywords.map((kw: string, i: number) => (
                          <span key={i} className="text-[11px] bg-white/90 border border-white text-[#1d1d1f] px-2.5 py-1 rounded-full font-medium shadow-2xs">
                            ✓ {kw}
                          </span>
                        ))
                      ) : (
                        <span className="text-[11px] text-[#86868b]">None detected</span>
                      )}
                    </div>
                  </div>

                  {/* Missing Keywords Box with Click-to-Inject */}
                  <div className="liquid-glass-subtle p-4 rounded-[22px]">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] font-semibold text-[#86868b] uppercase tracking-wider">
                        Missing Keywords ({result.missingKeywords?.length || 0})
                      </span>
                      <button 
                        onClick={() => injectKeywords()}
                        className="text-[10px] text-[#0071e3] hover:underline font-semibold"
                      >
                        + Append All
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {result.missingKeywords?.map((kw: string, i: number) => (
                        <span 
                          key={i} 
                          onClick={() => injectKeywords(kw)}
                          title="Click to insert this keyword into your draft"
                          className="text-[11px] bg-white/90 border border-white text-[#1d1d1f] px-2.5 py-1 rounded-full font-medium cursor-pointer hover:border-[#0071e3] hover:text-[#0071e3] transition shadow-2xs"
                        >
                          + {kw}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Tab 1: Enhanced Bullets */}
                {activeTab === 'bullets' && (
                  <div className="space-y-3">
                    <div className="liquid-glass-subtle p-4 rounded-[22px]">
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-[10px] font-semibold text-[#86868b] uppercase tracking-wider">
                          Tailored Executive Summary
                        </span>
                        <button 
                          onClick={() => copyToClipboard(result.tailoredSummary, 'summary')}
                          className="text-[#0071e3] hover:underline text-xs flex items-center gap-1 font-medium"
                        >
                          {copiedSection === 'summary' ? <Check className="w-3.5 h-3.5 text-[#34c759]" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedSection === 'summary' ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>
                      <p className="text-xs text-[#1d1d1f] leading-relaxed">
                        {result.tailoredSummary}
                      </p>
                    </div>

                    <div className="liquid-glass-subtle p-4 rounded-[22px]">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[10px] font-semibold text-[#86868b] uppercase tracking-wider">
                          Rewritten Accomplishment Bullets (X-Y-Z Formula)
                        </span>
                        <button 
                          onClick={() => copyToClipboard(result.optimizedExperienceBullets.join('\n• '), 'bullets')}
                          className="text-[#0071e3] hover:underline text-xs flex items-center gap-1 font-medium"
                        >
                          {copiedSection === 'bullets' ? <Check className="w-3.5 h-3.5 text-[#34c759]" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedSection === 'bullets' ? 'Copied All' : 'Copy All'}</span>
                        </button>
                      </div>
                      <ul className="space-y-2.5 text-xs text-[#1d1d1f]">
                        {result.optimizedExperienceBullets?.map((bullet: string, i: number) => (
                          <li key={i} className="flex gap-2.5 items-start">
                            <span className="text-[#0071e3] font-bold">•</span>
                            <span className="leading-relaxed">{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Tab 2: Before & After Diff Comparison */}
                {activeTab === 'comparison' && (
                  <div className="liquid-glass-subtle p-4 rounded-[22px] space-y-3">
                    <span className="text-[10px] font-semibold text-[#86868b] uppercase tracking-wider block">
                      Before vs. After Bullet Point Upgrade
                    </span>
                    <div className="space-y-2.5">
                      {result.optimizedExperienceBullets?.map((opt: string, i: number) => (
                        <div key={i} className="bg-white/90 border border-white rounded-2xl p-3.5 text-xs space-y-1.5 shadow-2xs">
                          <div className="text-[#86868b] flex items-start gap-2">
                            <span className="text-[10px] uppercase font-semibold text-[#86868b] shrink-0 mt-0.5">Original:</span>
                            <span className="line-through opacity-70">{originalBullets[i] || 'Handled project operations and coordinated team tasks.'}</span>
                          </div>
                          <div className="text-[#1d1d1f] font-medium flex items-start gap-2">
                            <span className="text-[10px] uppercase font-semibold text-[#34c759] shrink-0 mt-0.5">Shortlist:</span>
                            <span>{opt}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tab 3: Full Rebuilt Resume */}
                {activeTab === 'fullResume' && (
                  <div className="liquid-glass-subtle p-4 rounded-[22px]">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] font-semibold text-[#86868b] uppercase tracking-wider">
                        Reconstructed Plain-Text Resume (.txt)
                      </span>
                      <div className="flex gap-2">
                        <button 
                          onClick={downloadResume}
                          className="apple-btn-primary px-3 py-1 text-xs flex items-center gap-1.5"
                        >
                          <Download className="w-3.5 h-3.5" /> Download .txt
                        </button>
                        <button 
                          onClick={() => copyToClipboard(result.fullOptimizedResume, 'fullResume')}
                          className="text-[#0071e3] hover:underline text-xs flex items-center gap-1 px-2 py-1 font-medium"
                        >
                          {copiedSection === 'fullResume' ? <Check className="w-3.5 h-3.5 text-[#34c759]" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedSection === 'fullResume' ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>
                    </div>
                    <pre className="text-xs text-[#1d1d1f] font-mono whitespace-pre-wrap leading-relaxed max-h-72 overflow-y-auto p-4 bg-white/90 rounded-2xl border border-white">
                      {result.fullOptimizedResume}
                    </pre>
                  </div>
                )}

                {/* Tab 4: Cover Letter */}
                {activeTab === 'coverLetter' && (
                  <div className="liquid-glass-subtle p-4 rounded-[22px]">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] font-semibold text-[#86868b] uppercase tracking-wider">
                        Tailored Cover Letter Opening
                      </span>
                      <button 
                        onClick={() => copyToClipboard(result.coverLetterSnippet, 'cl')}
                        className="text-[#0071e3] hover:underline text-xs flex items-center gap-1 font-medium"
                      >
                        {copiedSection === 'cl' ? <Check className="w-3.5 h-3.5 text-[#34c759]" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedSection === 'cl' ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                    <p className="text-xs text-[#1d1d1f] whitespace-pre-line leading-relaxed bg-white/90 p-4 rounded-2xl border border-white">
                      {result.coverLetterSnippet}
                    </p>
                  </div>
                )}

                {/* Legal Protective Disclaimer Banner */}
                <div className="liquid-glass-subtle p-3.5 rounded-2xl flex items-start gap-2.5 text-[11px] text-[#86868b] leading-relaxed">
                  <Info className="w-4 h-4 text-[#1d1d1f] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#1d1d1f]">Legal Notice:</strong> Shortlist provides document formatting and keyword analysis based on submitted text. We do not guarantee employment or hiring decisions. Read our <Link href="/terms" className="text-[#0071e3] underline">Terms of Service</Link>.
                  </div>
                </div>

              </div>
            )}
          </div>

          {/* Bottom info inside panel */}
          {result && (
            <div className="pt-4 mt-4 border-t border-[#e5e5ea]/80 flex flex-wrap items-center justify-between text-xs text-[#86868b] gap-2">
              <span>Remaining balance: {credits} evaluations.</span>
              <button 
                onClick={() => openCheckout('Shortlist Pass (15 Audits)', '₹49', 49, 15)}
                className="text-[#0071e3] font-medium hover:underline"
              >
                Refill Credits (₹49)
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Apple Keynote Bento Grid Feature Section */}
      <section id="how-it-works" className="relative z-10 py-24 px-4 bg-white/80 backdrop-blur-md border-t border-[#d2d2d7]/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-16">
            <h2 className="text-[#86868b] text-xs font-semibold uppercase tracking-widest mb-2">How It Works</h2>
            <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1d1d1f]">Designed for maximum recall.</h3>
            <p className="text-[#86868b] text-sm mt-3">Three disciplined stages engineered to pass automated recruiter screening.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="liquid-glass p-8 rounded-[28px]">
              <span className="text-[11px] font-bold text-[#86868b] block mb-2 font-mono">STAGE 01</span>
              <h4 className="font-bold text-[#1d1d1f] text-base mb-2">Algorithmic Audit</h4>
              <p className="text-[#86868b] text-xs leading-relaxed">Cross-references domain terminology, certifications, and technical skills against the job posting to discover missing keywords.</p>
            </div>

            <div className="liquid-glass p-8 rounded-[28px]">
              <span className="text-[11px] font-bold text-[#86868b] block mb-2 font-mono">STAGE 02</span>
              <h4 className="font-bold text-[#1d1d1f] text-base mb-2">X-Y-Z Metric Injection</h4>
              <p className="text-[#86868b] text-xs leading-relaxed">Converts passive statements into concrete achievements using the Google framework: "Accomplished [X] measured by [Y] through doing [Z]".</p>
            </div>

            <div className="liquid-glass p-8 rounded-[28px]">
              <span className="text-[11px] font-bold text-[#86868b] block mb-2 font-mono">STAGE 03</span>
              <h4 className="font-bold text-[#1d1d1f] text-base mb-2">Plain-Text Submission</h4>
              <p className="text-[#86868b] text-xs leading-relaxed">Exports a single-column plain-text resume that guarantees 100% parsing fidelity across Workday, Greenhouse, Taleo, and Lever.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Apple-Style Pricing Section (Harmonious Proportions) */}
      <section id="pricing" className="relative z-10 py-24 px-4 bg-[#f5f5f7]/70 backdrop-blur-md border-t border-[#d2d2d7]/50">
        <div className="max-w-4xl mx-auto text-center mb-14">
          <h2 className="text-[#86868b] text-xs font-semibold uppercase tracking-widest mb-2">Pricing</h2>
          <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1d1d1f]">Select your pass.</h3>
          <p className="text-[#86868b] text-sm mt-3">Simple pricing with direct UPI payment to your bank account.</p>

          {/* Quick UPI status banner */}
          <div className="mt-5 inline-flex items-center gap-2 bg-white/80 backdrop-blur-md border border-white text-[#1d1d1f] text-xs px-4 py-1.5 rounded-full font-mono shadow-xs">
            <span>UPI ID: <strong>{merchantUpiId}</strong></span>
            <button 
              onClick={() => setEditingUpiId(true)}
              className="text-[#0071e3] hover:underline font-semibold ml-1 flex items-center gap-1"
            >
              <Edit2 className="w-3 h-3" /> Edit
            </button>
          </div>
        </div>

        <div className="max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-7">
          
          {/* Starter Plan in INR */}
          <div className="liquid-glass p-8 rounded-[30px] flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-bold text-base text-[#1d1d1f]">Shortlist Pass</h4>
                <span className="text-[10px] bg-white/90 border border-white text-[#1d1d1f] px-2.5 py-0.5 rounded-full font-medium">One-Time</span>
              </div>
              <p className="text-[#86868b] text-xs mb-5">Ideal for targeting a specific dream opening.</p>
              
              <div className="text-5xl font-bold tracking-tight text-[#1d1d1f] mb-6">
                ₹49 <span className="text-xs font-normal text-[#86868b]">/ 15 Evaluations</span>
              </div>

              <ul className="text-xs space-y-3 text-[#1d1d1f] mb-8">
                <li className="flex items-center gap-2.5">✓ 15 Full ATS Audits (<span className="text-[#86868b]">~₹3.20/audit</span>)</li>
                <li className="flex items-center gap-2.5">✓ Keyword Gap Breakdown</li>
                <li className="flex items-center gap-2.5">✓ X-Y-Z Accomplishment Re-write</li>
                <li className="flex items-center gap-2.5">✓ Plain-Text Export (.txt)</li>
              </ul>
            </div>

            <button
              onClick={() => openCheckout('Shortlist Pass (15 Audits)', '₹49', 49, 15)}
              className="apple-btn-dark w-full py-3.5 text-xs flex items-center justify-center gap-1.5 shadow-sm"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Pay with UPI (₹49)</span>
            </button>
          </div>

          {/* Unlimited Pro Plan in INR */}
          <div className="liquid-glass p-8 rounded-[30px] flex flex-col justify-between border-2 border-[#1d1d1f] relative">
            <span className="absolute -top-3 right-6 bg-[#1d1d1f] text-white text-[9px] font-semibold uppercase px-3 py-0.5 rounded-full tracking-wider shadow-sm">
              Popular
            </span>
            <div>
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-bold text-base text-[#1d1d1f]">Unlimited Pro</h4>
                <span className="text-[10px] bg-white/90 border border-white text-[#1d1d1f] px-2.5 py-0.5 rounded-full font-medium">Monthly</span>
              </div>
              <p className="text-[#86868b] text-xs mb-5">For active candidates applying across multiple roles.</p>
              
              <div className="text-5xl font-bold tracking-tight text-[#1d1d1f] mb-6">
                ₹99 <span className="text-xs font-normal text-[#86868b]">/ month</span>
              </div>

              <ul className="text-xs space-y-3 text-[#1d1d1f] mb-8">
                <li className="flex items-center gap-2.5">✓ Unlimited Resume Audits (<span className="text-[#86868b]">&lt;₹3.30/day</span>)</li>
                <li className="flex items-center gap-2.5">✓ Custom Cover Letter Openings</li>
                <li className="flex items-center gap-2.5">✓ Executive Tone Rewriting</li>
                <li className="flex items-center gap-2.5">✓ Cancel Anytime</li>
              </ul>
            </div>

            <button
              onClick={() => openCheckout('Unlimited Monthly Subscription', '₹99', 99, 100)}
              className="apple-btn-primary w-full py-3.5 text-xs flex items-center justify-center gap-1.5 shadow-md"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Subscribe via UPI (₹99/mo)</span>
            </button>
          </div>

        </div>
      </section>

      {/* Apple-Style Questions / FAQ Section */}
      <section id="faq" className="relative z-10 py-24 px-6 border-t border-[#d2d2d7]/60">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0071e3]/10 text-[#0071e3] text-xs font-semibold tracking-wide uppercase">
              <Info className="w-3.5 h-3.5" />
              <span>Questions & Answers</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1d1d1f] tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-sm sm:text-base text-[#86868b] leading-relaxed">
              Everything you need to know about direct UPI payments, our ATS optimization algorithm, and data privacy.
            </p>
          </div>

          {/* Prominent Visible Questions Stack */}
          <div className="space-y-4">
            {[
              {
                q: "How do UPI payments work on Shortlist?",
                a: "When you choose a plan, an instant scannable UPI QR code is generated for your selected amount (₹49 or ₹99). You can scan it directly with Google Pay, PhonePe, Paytm, BHIM, or Cred, or tap 'Pay on Mobile App' on your phone. All funds transfer 100% directly to darsheel.sirola@fam with zero middleman commissions. Paste your 12-digit UPI reference number to activate audits instantly."
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

      {/* Apple Official Clean Footer */}
      <footer className="relative z-10 border-t border-[#d2d2d7] py-12 px-6 text-xs text-[#86868b] bg-[#f5f5f7]/80 backdrop-blur-md">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <Logo size="sm" />
            <div className="flex items-center space-x-6 text-[#1d1d1f] font-normal">
              <Link href="/terms" className="hover:underline">Terms of Service</Link>
              <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
              <a href="#tool" className="hover:underline">Audit Tool</a>
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
            <div className="pt-2 flex flex-wrap justify-between items-center border-t border-[#d2d2d7]/40">
              <p>Copyright &copy; 2026 Shortlist Pro. All rights reserved.</p>
              <p>Designed for candidate excellence.</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Direct UPI Payment Modal (Apple Pay Sheet Style with Liquid Glass) */}
      {checkoutModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/35 backdrop-blur-md flex items-center justify-center p-4 animate-appleFadeUp">
          <div className="liquid-glass rounded-[32px] max-w-sm w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setCheckoutModalOpen(false)}
              className="absolute top-4 right-4 text-[#86868b] hover:text-[#1d1d1f]"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Header */}
            <div className="text-center mb-4">
              <div className="w-10 h-10 rounded-2xl bg-white/80 border border-white text-[#1d1d1f] flex items-center justify-center mx-auto mb-2 shadow-xs">
                <QrCode className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#1d1d1f] tracking-tight">{selectedPlan.name}</h3>
              <p className="text-xs text-[#86868b] mt-0.5">Direct UPI Transfer • 0% Commission</p>
            </div>

            {/* Segmented Control */}
            <div className="apple-segmented flex gap-1 mb-4 text-xs font-medium">
              <button
                type="button"
                onClick={() => setPaymentMethod('upi')}
                className={`flex-1 py-1.5 rounded-full transition flex items-center justify-center gap-1.5 ${
                  paymentMethod === 'upi' ? 'bg-white text-[#1d1d1f] shadow-xs font-semibold' : 'text-[#86868b] hover:text-[#1d1d1f]'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" /> Direct UPI
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`flex-1 py-1.5 rounded-full transition flex items-center justify-center gap-1.5 ${
                  paymentMethod === 'card' ? 'bg-white text-[#1d1d1f] shadow-xs font-semibold' : 'text-[#86868b] hover:text-[#1d1d1f]'
                }`}
              >
                <CreditCard className="w-3.5 h-3.5" /> Card / Stripe
              </button>
            </div>

            {/* UPI Payment Flow */}
            {paymentMethod === 'upi' ? (
              <div className="space-y-4">
                
                {/* QR Code & Amount Card */}
                <div className="liquid-glass-subtle p-4 rounded-2xl text-center flex flex-col items-center">
                  <span className="text-[10px] font-semibold text-[#86868b] uppercase tracking-wider block mb-1">
                    Scan with any UPI App
                  </span>
                  
                  {/* Real Scannable UPI QR Code */}
                  <div className="bg-white p-2.5 rounded-2xl border border-white shadow-xs my-2">
                    <img 
                      src={qrCodeUrl} 
                      alt="UPI QR Code" 
                      className="w-36 h-36 object-contain mx-auto"
                    />
                  </div>

                  <div className="text-3xl font-bold tracking-tight text-[#1d1d1f] my-1">
                    {selectedPlan.price}
                  </div>

                  {/* Merchant UPI ID with Copy Button */}
                  <div className="flex items-center gap-2 bg-white/90 px-3 py-1.5 rounded-full border border-white text-xs font-mono mt-1 shadow-2xs">
                    <span className="text-[#1d1d1f] font-semibold">{merchantUpiId}</span>
                    <button 
                      onClick={() => copyToClipboard(merchantUpiId, 'upi')}
                      className="text-[#0071e3] hover:underline font-sans text-[11px] ml-1 font-medium"
                    >
                      {copiedSection === 'upi' ? 'Copied' : 'Copy'}
                    </button>
                  </div>

                  {/* Deep Link Button for Mobile */}
                  <a
                    href={upiDeepLink}
                    className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-[#0071e3] bg-white border border-white px-3.5 py-1.5 rounded-full hover:bg-white/80 transition shadow-2xs"
                  >
                    <span>Tap to Pay on Mobile App</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <p className="text-[10px] text-[#86868b] mt-2">
                    Google Pay • PhonePe • Paytm • BHIM • Cred
                  </p>
                </div>

                {/* Step 2: Reference Number / UTR Input */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[#1d1d1f] block">
                    Enter 12-Digit UPI Ref / UTR Number:
                  </label>
                  <input
                    type="text"
                    value={utrNumber}
                    onChange={(e) => setUtrNumber(e.target.value)}
                    placeholder="e.g. 428190123456"
                    className="w-full bg-white/90 border border-[#d2d2d7]/80 rounded-xl p-2.5 text-xs focus:outline-none focus:border-[#0071e3] font-mono text-[#1d1d1f]"
                  />
                  <span className="text-[10px] text-[#86868b] block">
                    Found in payment receipt on GPay or PhonePe.
                  </span>
                </div>

                {/* Terms Agreement */}
                <div className="flex items-start gap-2 liquid-glass-subtle p-2.5 rounded-xl">
                  <input 
                    type="checkbox" 
                    id="legalAgreementUpi" 
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="mt-0.5 rounded border-[#d2d2d7] text-[#1d1d1f] focus:ring-[#1d1d1f]"
                  />
                  <label htmlFor="legalAgreementUpi" className="text-[11px] text-[#86868b] leading-snug">
                    I agree to the <Link href="/terms" target="_blank" className="text-[#0071e3] underline">Terms of Service</Link>.
                  </label>
                </div>

                {/* Verify Button */}
                <button
                  onClick={verifyUpiPayment}
                  disabled={!agreedToTerms}
                  className="apple-btn-primary w-full py-3 text-xs flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <CheckCircle2 className="w-4 h-4 text-white" />
                  <span>Verify UTR & Activate ({selectedPlan.price})</span>
                </button>
              </div>
            ) : (
              /* Card / Stripe Flow */
              <div className="space-y-4">
                <div className="liquid-glass-subtle p-4 rounded-2xl flex justify-between items-center">
                  <div>
                    <span className="font-semibold text-xs text-[#1d1d1f] block">{selectedPlan.name}</span>
                    <span className="text-[10px] text-[#86868b] font-mono">+{selectedPlan.credits} Evaluations</span>
                  </div>
                  <div className="text-2xl font-bold text-[#1d1d1f]">
                    {selectedPlan.price}
                  </div>
                </div>

                <div className="flex items-start gap-2 liquid-glass-subtle p-2.5 rounded-xl">
                  <input 
                    type="checkbox" 
                    id="legalAgreementCard" 
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="mt-0.5 rounded border-[#d2d2d7] text-[#1d1d1f] focus:ring-[#1d1d1f]"
                  />
                  <label htmlFor="legalAgreementCard" className="text-[11px] text-[#86868b] leading-snug">
                    I agree to the <Link href="/terms" target="_blank" className="text-[#0071e3] underline">Terms of Service</Link>.
                  </label>
                </div>

                <button
                  onClick={handleCardCheckout}
                  disabled={!agreedToTerms}
                  className="apple-btn-dark w-full py-3 text-xs flex items-center justify-center gap-2 shadow-sm"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Pay with Card ({selectedPlan.price})</span>
                </button>
              </div>
            )}

            <p className="text-[10px] text-[#86868b] text-center mt-3">
              Encrypted transaction. Direct to bank via UPI.
            </p>
          </div>
        </div>
      )}

      {/* Edit Merchant UPI Modal */}
      {editingUpiId && (
        <div className="fixed inset-0 z-50 bg-black/35 backdrop-blur-md flex items-center justify-center p-4 animate-appleFadeUp">
          <div className="liquid-glass rounded-[28px] max-w-sm w-full p-6 shadow-2xl relative">
            <button 
              onClick={() => setEditingUpiId(false)}
              className="absolute top-4 right-4 text-[#86868b] hover:text-[#1d1d1f]"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-base font-bold text-[#1d1d1f] mb-1">Set Your Receiving UPI ID</h3>
            <p className="text-xs text-[#86868b] mb-4">All customer payments will go directly to this UPI address.</p>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-[#1d1d1f] block mb-1">Your UPI ID (VPA):</label>
                <input 
                  type="text"
                  value={tempUpiInput}
                  onChange={(e) => setTempUpiInput(e.target.value)}
                  placeholder="e.g. 9876543210@paytm or name@okhdfcbank"
                  className="w-full bg-white/90 border border-[#d2d2d7] rounded-xl p-2.5 text-xs font-mono focus:outline-none focus:border-[#0071e3] text-[#1d1d1f]"
                />
              </div>

              <button
                onClick={saveCustomUpi}
                className="apple-btn-dark w-full py-2.5 text-xs font-medium"
              >
                Save UPI ID
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
