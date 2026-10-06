'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Logo from '@/components/Logo';
import { useAuth } from '@/components/AuthContext';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  Copy, 
  Check, 
  FileText, 
  Download, 
  Sparkles, 
  X, 
  Search, 
  ChevronDown, 
  ChevronRight, 
  Trash2, 
  Smartphone, 
  QrCode, 
  ExternalLink, 
  ShieldCheck, 
  ArrowRight, 
  SlidersHorizontal, 
  CheckCheck,
  User as UserIcon,
  LogOut,
  ArrowLeft,
  Info,
  CreditCard,
  Lock,
  Loader2,
  AlertCircle
} from 'lucide-react';

export default function WorkstationPage() {
  const router = useRouter();
  const { user, logout, addCredits, useCredit } = useAuth();

  const [jobDescription, setJobDescription] = useState('');
  const [resume, setResume] = useState('');
  const [loading, setLoading] = useState(false);
  const [enhanceLoading, setEnhanceLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'bullets' | 'comparison' | 'fullResume' | 'coverLetter'>('bullets');
  const [enhanceGoal, setEnhanceGoal] = useState<'metrics' | 'executive' | 'concise'>('metrics');
  
  // Animated Score state
  const [animatedScore, setAnimatedScore] = useState<number>(0);

  // Progressive Loading State
  const [loadingStage, setLoadingStage] = useState<string>('Auditing ATS Match...');

  // Track Injected Keywords for Instant Visual Feedback
  const [addedKeywords, setAddedKeywords] = useState<string[]>([]);

  // Active Preset Sample
  const [activeSample, setActiveSample] = useState<'engineering' | 'product' | 'growth'>('engineering');

  // Copy Feedback for UPI ID
  const [upiCopied, setUpiCopied] = useState<boolean>(false);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // UPI Payment Configuration State
  const [merchantUpiId, setMerchantUpiId] = useState<string>('darsheel.sirola@fam');
  const [editingUpiId, setEditingUpiId] = useState<boolean>(false);
  const [tempUpiInput, setTempUpiInput] = useState<string>('darsheel.sirola@fam');

  // Checkout Modal State
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [paymentMethodTab, setPaymentMethodTab] = useState<'razorpay' | 'upi'>('razorpay');
  const [razorpayLoading, setRazorpayLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationFeedback, setVerificationFeedback] = useState<{
    type: 'idle' | 'loading' | 'success' | 'error';
    message?: string;
  }>({ type: 'idle' });
  const [utrNumber, setUtrNumber] = useState<string>('');
  const [agreedToTerms, setAgreedToTerms] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<{ name: string; price: string; amount: number; credits: number }>({
    name: 'Shortlist Pass (15 Audits)',
    price: '₹49',
    amount: 49,
    credits: 15
  });

  // User Profile Dropdown state
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const credits = user?.credits ?? 3;

  useEffect(() => {
    const envMerchant = process.env.NEXT_PUBLIC_MERCHANT_UPI_ID;
    if (envMerchant) {
      setMerchantUpiId(envMerchant);
      setTempUpiInput(envMerchant);
    }
  }, []);

  // Animate score whenever result arrives
  useEffect(() => {
    if (!result?.matchScore) {
      setAnimatedScore(0);
      return;
    }
    const target = result.matchScore;
    let current = 0;
    const increment = Math.ceil(target / 30);
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setAnimatedScore(target);
        clearInterval(timer);
      } else {
        setAnimatedScore(current);
      }
    }, 20);
    return () => clearInterval(timer);
  }, [result?.matchScore]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#0071e3', '#34c759', '#1d1d1f']
    });
  };

  const SAMPLES = {
    engineering: {
      label: 'Cloud / SDE',
      toast: 'Senior Fullstack & Cloud Engineer sample loaded.',
      job: `Role: Senior Fullstack Engineer
Company: Apex Cloud Technologies
Location: Remote (India / Worldwide)

Core Responsibilities:
• Architect, scale, and maintain high-throughput distributed microservices using Next.js, Node.js, and TypeScript.
• Lead cloud infrastructure operations across AWS and GCP, using Docker and Kubernetes to ensure 99.99% system availability.
• Drive database performance tuning and caching strategies across PostgreSQL, Redis, and BigQuery.
• Lead sprint planning, conduct architecture design reviews, and establish CI/CD deployment pipelines using GitHub Actions.
• Partner with product managers and UX designers to reduce page latency and improve Core Web Vitals.
• Direct accountability for customer retention, CAC reduction, and quarterly revenue KPIs.`,
      resume: `Alex Morgan — Software Engineer
Professional Experience:
• Managed software releases for enterprise business tools.
• Worked with engineering and design leads to coordinate product feature roadmaps.
• Tracked product usage data using spreadsheets and basic analytics reporting.
• Organized weekly team sprint reviews and daily standup syncs.
• Communicated quarterly release updates to department leaders and stakeholders.`
    },
    product: {
      label: 'Product Mgr',
      toast: 'Principal Product Manager sample loaded.',
      job: `Role: Principal Product Manager (B2B SaaS)
Company: Horizon Cloud Platforms
Location: Bengaluru / Remote

Key Responsibilities:
• Own end-to-end product vision, sprint prioritization, and roadmap execution for core $14M ARR revenue stream.
• Partner with Engineering and Design to define PRDs, user stories, acceptance criteria, and quarterly OKRs.
• Conduct qualitative customer discovery interviews, instrument Mixpanel event tracking, and optimize PLG conversion funnels.
• Drive cross-functional go-to-market strategies with Sales, Marketing, and Customer Success to compress customer churn below 1.5%.
• Proven proficiency with SQL queries, data warehousing, and iterative A/B testing methodologies.`,
      resume: `Jordan Lee — Associate Product Manager
Experience:
• Handled feature requests from customer support and internal stakeholders.
• Attended daily standup meetings with software developers and design teams.
• Created presentation slides for leadership quarterly feature roadmaps.
• Monitored user feedback tickets and helped test sprint releases before launch.`
    },
    growth: {
      label: 'Growth Lead',
      toast: 'Growth Marketing Lead sample loaded.',
      job: `Role: Growth Marketing Lead
Company: HyperScale Commerce
Location: Remote

Responsibilities:
• Manage and allocate $120,000 monthly paid performance media budget across Google Ads, Meta Ads, and LinkedIn Campaign Manager.
• Architect data-driven conversion rate optimization (CRO) experiments across landing pages, lifting ROAS from 2.1x to 3.8x.
• Lead technical and programmatic SEO initiatives, page-speed optimizations, and high-intent keyword clustering.
• Instrument multi-touch attribution modeling across GA4, Segment, and PostHog to isolate high-LTV customer cohorts.`,
      resume: `Samir Patel — Digital Marketing Specialist
Experience:
• Ran digital ad campaigns across social media channels and search engines.
• Wrote company blog posts and assisted with weekly email newsletters.
• Monitored weekly visitor traffic metrics in Google Analytics.
• Prepared monthly reporting slide decks for marketing leadership.`
    }
  };

  const loadSample = (role: 'engineering' | 'product' | 'growth' = 'engineering') => {
    setActiveSample(role);
    setJobDescription(SAMPLES[role].job);
    setResume(SAMPLES[role].resume);
    setAddedKeywords([]);
    showToast(SAMPLES[role].toast);
  };

  // Progressive Loading State Stages
  useEffect(() => {
    if (!loading && !enhanceLoading) return;
    const stages = loading
      ? [
          'Tokenizing job description hard skills...',
          'Scanning candidate lexical competencies...',
          'Computing deterministic ATS match ratio...',
          'Synthesizing missing keyword radar...'
        ]
      : [
          'Extracting passive verbs from candidate bullets...',
          'Mapping to Google X-Y-Z achievement formulas...',
          'Injecting quantifiable metrics and percentages...',
          'Polishing executive leadership syntax...'
        ];
    let i = 0;
    setLoadingStage(stages[0]);
    const timer = setInterval(() => {
      i = (i + 1) % stages.length;
      setLoadingStage(stages[i]);
    }, 600);
    return () => clearInterval(timer);
  }, [loading, enhanceLoading]);

  // Global Keyboard Shortcut: ⌘+Enter / Ctrl+Enter
  useEffect(() => {
    const onGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        e.preventDefault();
        handleAnalyze();
      }
    };
    window.addEventListener('keydown', onGlobalKeyDown);
    return () => window.removeEventListener('keydown', onGlobalKeyDown);
  }, [jobDescription, resume, credits]);

  const clearForm = () => {
    setJobDescription('');
    setResume('');
    setResult(null);
    showToast('Workstation cleared.');
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

    if (credits <= 0) {
      openCheckout('Shortlist Pass (15 Audits)', '₹49', 49, 15);
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
        useCredit();
        showToast('ATS audit complete.');
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

    if (credits <= 0) {
      openCheckout('Shortlist Pass (15 Audits)', '₹49', 49, 15);
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
        useCredit();
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

    setResume(prev => {
      const skillsHeaderMatch = prev.match(/(Technical Skills|Core Competencies|Key Skills|Skills|Competencies):/i);
      if (skillsHeaderMatch) {
        return prev.replace(skillsHeaderMatch[0], `${skillsHeaderMatch[0]} ${toInject.join(', ')},`);
      } else {
        return prev + `\n\nCORE COMPETENCIES & KEYWORDS:\n${toInject.join(' • ')}`;
      }
    });

    setAddedKeywords(prev => Array.from(new Set([...prev, ...toInject])));
    setAnimatedScore(prev => Math.min(98, prev + (kw ? 6 : 18)));
    showToast(kw ? `Injected "${kw}" into draft! Score recalculated.` : `Injected ${toInject.length} keywords! Score recalculated.`);
  };

  const openCheckout = (name: string, price: string, amount: number, planCredits: number) => {
    setSelectedPlan({ name, price, amount, credits: planCredits });
    setUtrNumber('');
    setVerificationFeedback({ type: 'idle' });
    setCheckoutModalOpen(true);
  };

  const switchPlan = (planType: 'starter' | 'unlimited') => {
    if (planType === 'starter') {
      setSelectedPlan({
        name: 'Shortlist Pass (15 Audits)',
        price: '₹49',
        amount: 49,
        credits: 15,
      });
    } else {
      setSelectedPlan({
        name: 'Shortlist Unlimited (Monthly)',
        price: '₹99',
        amount: 99,
        credits: 100,
      });
    }
    setVerificationFeedback({ type: 'idle' });
  };

  const loadRazorpayScript = () => {
    return new Promise<boolean>((resolve) => {
      if (typeof window === 'undefined') return resolve(false);
      if ((window as any).Razorpay) return resolve(true);
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleRazorpayCheckout = async () => {
    if (!agreedToTerms) {
      alert('Please agree to the Terms of Service to proceed.');
      return;
    }

    setRazorpayLoading(true);
    setVerificationFeedback({ type: 'loading', message: 'Initializing secure Razorpay order...' });

    try {
      // Step 1: Create order on server
      const res = await fetch('/api/razorpay/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plan: selectedPlan.amount === 99 ? 'unlimited' : 'starter',
          amount: selectedPlan.amount,
          credits: selectedPlan.credits,
        }),
      });

      const orderData = await res.json();
      if (!res.ok || !orderData.success) {
        throw new Error(orderData.error || 'Failed to initialize payment order');
      }

      // Step 1.1: If in sandbox test mode without live keys yet
      if (orderData.mock && (!orderData.keyId || orderData.keyId === 'rzp_test_placeholder')) {
        setIsVerifying(true);
        setVerificationFeedback({ type: 'loading', message: 'Verifying test transaction with sandbox engine...' });
        
        const verifyRes = await fetch('/api/razorpay/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            razorpay_order_id: orderData.orderId,
            razorpay_payment_id: `pay_test_${Date.now()}`,
            razorpay_signature: 'test_signature_valid',
            plan: selectedPlan.amount === 99 ? 'unlimited' : 'starter',
            credits: selectedPlan.credits,
          }),
        });

        const verifyData = await verifyRes.json();
        setIsVerifying(false);
        setRazorpayLoading(false);

        if (verifyData.verified) {
          addCredits(selectedPlan.credits);
          setVerificationFeedback({
            type: 'success',
            message: `Sandbox Verified! +${selectedPlan.credits} credits activated.`,
          });
          triggerConfetti();
          showToast(`Razorpay Verified! +${selectedPlan.credits} credits activated.`);
          setTimeout(() => {
            setCheckoutModalOpen(false);
            setVerificationFeedback({ type: 'idle' });
          }, 1800);
          return;
        } else {
          throw new Error(verifyData.error || 'Sandbox verification failed');
        }
      }

      // Step 2: Ensure Razorpay Checkout script is loaded
      const scriptReady = await loadRazorpayScript();
      if (!scriptReady) {
        throw new Error('Razorpay SDK could not be loaded. Please check your network connection.');
      }

      // Step 3: Open Razorpay official checkout
      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency || 'INR',
        name: 'Shortlist',
        description: selectedPlan.name,
        order_id: orderData.orderId,
        handler: async function (response: any) {
          setIsVerifying(true);
          setVerificationFeedback({ type: 'loading', message: 'Validating cryptographic payment signature...' });

          try {
            const verifyRes = await fetch('/api/razorpay/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                plan: selectedPlan.amount === 99 ? 'unlimited' : 'starter',
                credits: selectedPlan.credits,
              }),
            });

            const verifyData = await verifyRes.json();
            if (verifyData.verified) {
              addCredits(selectedPlan.credits);
              setVerificationFeedback({
                type: 'success',
                message: `Payment Verified! Ref: ${response.razorpay_payment_id.slice(-6)}. +${selectedPlan.credits} credits activated.`,
              });
              triggerConfetti();
              showToast(`Payment Verified! +${selectedPlan.credits} credits activated.`);
              setTimeout(() => {
                setCheckoutModalOpen(false);
                setVerificationFeedback({ type: 'idle' });
              }, 2000);
            } else {
              setVerificationFeedback({
                type: 'error',
                message: verifyData.error || 'Payment verification failed. Please contact support.',
              });
            }
          } catch (err: any) {
            setVerificationFeedback({
              type: 'error',
              message: 'Verification request failed: ' + err.message,
            });
          } finally {
            setIsVerifying(false);
          }
        },
        prefill: {
          name: user?.name || '',
          email: user?.email || '',
        },
        theme: {
          color: '#0071e3',
        },
        modal: {
          ondismiss: function () {
            setRazorpayLoading(false);
            setVerificationFeedback({ type: 'idle' });
          },
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on('payment.failed', function (resp: any) {
        setVerificationFeedback({
          type: 'error',
          message: resp.error?.description || 'Transaction declined by bank.',
        });
        setRazorpayLoading(false);
      });
      rzp.open();
    } catch (err: any) {
      setVerificationFeedback({
        type: 'error',
        message: err.message || 'Payment initiation failed.',
      });
      setRazorpayLoading(false);
    }
  };

  const verifyManualPayment = async () => {
    if (!agreedToTerms) {
      alert('Please agree to the Terms of Service to proceed.');
      return;
    }
    const ref = utrNumber.trim();
    if (!ref || ref.length < 6) {
      alert('Please enter your Razorpay Payment ID (e.g. pay_...) or 12-digit UPI UTR number.');
      return;
    }

    setIsVerifying(true);
    setVerificationFeedback({ type: 'loading', message: 'Checking transaction status with Razorpay...' });

    try {
      const res = await fetch('/api/razorpay/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          razorpay_payment_id: ref.startsWith('pay_') ? ref : `pay_upi_${ref}`,
          razorpay_order_id: null,
          plan: selectedPlan.amount === 99 ? 'unlimited' : 'starter',
          credits: selectedPlan.credits,
        }),
      });

      const data = await res.json();
      if (data.verified) {
        addCredits(selectedPlan.credits);
        setVerificationFeedback({
          type: 'success',
          message: `Payment Verified! +${selectedPlan.credits} credits activated.`,
        });
        triggerConfetti();
        showToast(`Payment Verified! +${selectedPlan.credits} credits activated.`);
        setTimeout(() => {
          setCheckoutModalOpen(false);
          setVerificationFeedback({ type: 'idle' });
        }, 1800);
      } else {
        setVerificationFeedback({
          type: 'error',
          message: data.error || 'Payment not found or not yet captured. Please allow 30 seconds for bank settlement.',
        });
      }
    } catch (err: any) {
      setVerificationFeedback({
        type: 'error',
        message: 'Could not connect to payment verification server: ' + err.message,
      });
    } finally {
      setIsVerifying(false);
    }
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
      
      {/* Background Liquid Ambient Light Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-[10%] left-[15%] w-[550px] h-[550px] rounded-full bg-gradient-to-tr from-[#cce5ff]/50 to-[#99ccff]/35 blur-[130px] animate-floatSlow" />
        <div className="absolute top-[35%] right-[10%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[#ebd4fd]/45 to-[#d6b4fc]/30 blur-[140px] animate-floatReverse" />
      </div>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-7 left-1/2 -translate-x-1/2 z-50 bg-[#1d1d1f]/90 backdrop-blur-xl text-white px-5 py-2.5 rounded-full shadow-2xl flex items-center gap-2.5 text-xs font-medium animate-appleScale border border-white/15">
          <CheckCircle2 className="w-4 h-4 text-[#34c759] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Apple Workstation Navigation Bar */}
      <header className="apple-nav sticky top-0 z-40 transition-all duration-300">
        <div className="max-w-6xl mx-auto px-6 h-14 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/" className="group flex items-center gap-2">
              <Logo size="sm" showTagline={false} />
            </Link>
            <div className="h-4 w-px bg-[#d2d2d7]" />
            <span className="text-xs font-semibold uppercase tracking-wider text-[#86868b] hidden sm:inline-block">
              Executive Workstation
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Credits Counter Pill */}
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-[#d2d2d7]/70 shadow-2xs text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-[#34c759] animate-pulse" />
              <span className="font-semibold text-[#1d1d1f]">{credits}</span>
              <span className="text-[#86868b] text-[11px]">Audits Left</span>
            </div>

            {/* Quick Top-Up Button */}
            <button
              onClick={() => openCheckout('Shortlist Pass (15 Audits)', '₹49', 49, 15)}
              className="apple-btn-primary px-3 py-1 text-xs shadow-xs hidden sm:flex items-center gap-1"
            >
              <span>+ Add (₹49)</span>
            </button>

            {/* User Profile Pill & Dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="px-3 py-1 rounded-full bg-white/80 hover:bg-white border border-[#d2d2d7]/80 text-xs font-medium flex items-center gap-1.5 text-[#1d1d1f] transition-all shadow-2xs"
              >
                <div className="w-4 h-4 rounded-full bg-[#1d1d1f] text-white flex items-center justify-center text-[9px] font-bold">
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
                </div>
                <span className="max-w-[90px] truncate">{user?.name || 'Account'}</span>
                <ChevronDown className="w-3 h-3 text-[#86868b]" />
              </button>

              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white/95 backdrop-blur-xl border border-[#d2d2d7]/80 shadow-2xl p-2 z-50 text-xs animate-appleScale">
                  <div className="p-2 border-b border-[#f0f0f2] mb-1">
                    <p className="font-semibold text-[#1d1d1f] truncate">{user?.name}</p>
                    <p className="text-[10px] text-[#86868b] truncate">{user?.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      openCheckout('Unlimited Monthly Subscription', '₹99', 99, 100);
                    }}
                    className="w-full text-left p-2 rounded-xl hover:bg-[#f5f5f7] text-[#0071e3] font-medium flex items-center justify-between"
                  >
                    <span>Upgrade to Unlimited (₹99/mo)</span>
                    <Sparkles className="w-3.5 h-3.5" />
                  </button>
                  <Link
                    href="/"
                    className="w-full text-left p-2 rounded-xl hover:bg-[#f5f5f7] text-[#1d1d1f] block"
                  >
                    Back to Product Home
                  </Link>
                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      logout();
                      showToast('Signed out.');
                    }}
                    className="w-full text-left p-2 rounded-xl hover:bg-red-50 text-red-600 flex items-center justify-between"
                  >
                    <span>Sign Out</span>
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Dual-Workstation Workspace */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 py-8 flex-1 w-full space-y-8">
        
        {/* Workspace Top Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1d1d1f]">
              Applicant Tracking System Workstation
            </h1>
            <p className="text-xs text-[#86868b]">
              Deterministic lexical parser • Google X-Y-Z achievement formulas
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] text-[#86868b] font-medium hidden sm:inline">Try Pre-Loaded Sample:</span>
            <div className="apple-segmented flex gap-1 text-xs">
              {(['engineering', 'product', 'growth'] as const).map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => loadSample(role)}
                  className={`px-3 py-1 rounded-full text-xs transition-all ${
                    activeSample === role && jobDescription.length > 0
                      ? 'bg-white text-[#1d1d1f] font-semibold shadow-2xs'
                      : 'text-[#86868b] hover:text-[#1d1d1f]'
                  }`}
                >
                  {SAMPLES[role].label}
                </button>
              ))}
            </div>
            <button
              onClick={clearForm}
              className="p-1.5 rounded-full bg-white/80 hover:bg-white text-[#86868b] hover:text-red-600 border border-[#d2d2d7]/70 transition-all shadow-2xs ml-1"
              title="Clear Workstation"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Symmetrical 1:1 Input Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Workstation Card 1: Target Job Description */}
          <div className="liquid-glass p-6 rounded-[28px] flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-[#1d1d1f] uppercase tracking-wider flex items-center gap-1.5">
                  <Search className="w-3.5 h-3.5 text-[#0071e3]" />
                  <span>1. Target Job Description</span>
                </span>
                <span className="text-[11px] font-mono text-[#86868b]">
                  {wordCount(jobDescription)} words
                </span>
              </div>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Paste the employer's exact job requirements, responsibilities, and qualifications..."
                rows={11}
                className="w-full p-4 rounded-2xl bg-white/90 border border-[#d2d2d7]/70 text-xs focus:outline-none focus:border-[#0071e3] transition-colors resize-none leading-relaxed text-[#1d1d1f] shadow-2xs"
              />
            </div>
            <div className="mt-3 flex items-center justify-between text-[11px] text-[#86868b]">
              <span>Extracts hard skills & credentials</span>
              <span>Min. 40 characters</span>
            </div>
          </div>

          {/* Workstation Card 2: Current Resume Draft */}
          <div className="liquid-glass p-6 rounded-[28px] flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-[#1d1d1f] uppercase tracking-wider flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-[#34c759]" />
                  <span>2. Current Resume Draft</span>
                </span>
                <span className="text-[11px] font-mono text-[#86868b]">
                  {wordCount(resume)} words
                </span>
              </div>
              <textarea
                value={resume}
                onChange={(e) => setResume(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Paste your existing resume summary, experience bullet points, and technical skills..."
                rows={11}
                className="w-full p-4 rounded-2xl bg-white/90 border border-[#d2d2d7]/70 text-xs focus:outline-none focus:border-[#0071e3] transition-colors resize-none leading-relaxed text-[#1d1d1f] shadow-2xs"
              />
            </div>
            <div className="mt-3 flex items-center justify-between text-[11px] text-[#86868b]">
              <span className="flex items-center gap-1">
                Press <kbd className="kbd-shortcut">⌘↵</kbd> or <kbd className="kbd-shortcut">Ctrl+↵</kbd> to Audit
              </span>
              <span>Plain-text preferred</span>
            </div>
          </div>
        </div>

        {/* Action Controls Toolbar */}
        <div className="liquid-glass-subtle p-4 rounded-2xl flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#86868b]">Metric Rewrite Focus:</span>
            <div className="apple-segmented flex gap-1 text-[11px]">
              {(['metrics', 'executive', 'concise'] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setEnhanceGoal(mode)}
                  className={`px-3 py-1 rounded-full capitalize transition-all ${
                    enhanceGoal === mode
                      ? 'bg-white text-[#1d1d1f] font-semibold shadow-2xs'
                      : 'text-[#86868b] hover:text-[#1d1d1f]'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleAnalyze}
              disabled={loading || enhanceLoading}
              className="apple-btn-dark px-5 py-2.5 text-xs flex items-center gap-2 shadow-xs disabled:opacity-50"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span className="font-mono text-[11px]">{loadingStage}</span>
                </div>
              ) : (
                <>
                  <Search className="w-3.5 h-3.5" />
                  <span>Audit ATS Match</span>
                  <kbd className="kbd-shortcut bg-white/10 text-white/70 border-white/20 ml-1 hidden sm:inline-flex">⌘↵</kbd>
                </>
              )}
            </button>

            <button
              onClick={handleDeepEnhance}
              disabled={loading || enhanceLoading}
              className="apple-btn-primary px-5 py-2.5 text-xs flex items-center gap-2 shadow-sm disabled:opacity-50"
            >
              {enhanceLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span className="font-mono text-[11px]">{loadingStage}</span>
                </div>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Rewrite Bullets (Google X-Y-Z)</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Results Workspace Panel */}
        {result && (
          <div className="liquid-glass p-8 rounded-[32px] space-y-8 animate-appleFadeUp shadow-lg">
            
            {/* Activity Ring & Verdict Top Banner */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center border-b border-[#e5e5ea] pb-8">
              
              {/* Apple Health-style Circular Activity Ring */}
              <div className="md:col-span-4 flex items-center justify-center">
                <div className="relative w-36 h-36 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" stroke="#e5e5ea" strokeWidth="8" fill="none" />
                    <circle 
                      cx="50" 
                      cy="50" 
                      r="40" 
                      stroke={animatedScore >= 80 ? '#34c759' : animatedScore >= 60 ? '#0071e3' : '#ff9500'}
                      strokeWidth="8" 
                      strokeDasharray={251.2}
                      strokeDashoffset={251.2 * (1 - (animatedScore / 100))}
                      strokeLinecap="round" 
                      fill="none" 
                      className="transition-all duration-500 ease-out"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold tracking-tight text-[#1d1d1f]">
                      {animatedScore}%
                    </span>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#86868b]">
                      ATS MATCH
                    </span>
                  </div>
                </div>
              </div>

              {/* Verdict Text & Target Job Title */}
              <div className="md:col-span-8 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#0071e3]/10 text-[#0071e3] text-[11px] font-semibold">
                    Target: {result.targetJobTitle || 'Identified Role'}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#1d1d1f]">
                  {result.verdict}
                </h3>
                <p className="text-xs text-[#86868b] leading-relaxed">
                  Based on keyword frequency, technical requirements, and chronological competency placement.
                </p>

                {/* Missing Keywords Injection Pill */}
                {result.missingKeywords?.length > 0 && (
                  <div className="pt-2 flex flex-wrap items-center gap-1.5">
                    <span className="text-[11px] text-[#86868b] font-medium mr-1">
                      Missing keywords:
                    </span>
                    {result.missingKeywords.map((kw: string, i: number) => {
                      const isAdded = addedKeywords.includes(kw);
                      return (
                        <button
                          key={i}
                          onClick={() => !isAdded && injectKeywords(kw)}
                          disabled={isAdded}
                          className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium transition-all flex items-center gap-1 ${
                            isAdded
                              ? 'bg-emerald-500/15 text-emerald-700 border border-emerald-500/30 opacity-80 cursor-default'
                              : 'bg-red-500/10 hover:bg-red-500/20 text-red-700 border border-red-500/20 hover:scale-105 active:scale-95 shadow-2xs'
                          }`}
                          title={isAdded ? 'Already added to resume draft' : 'Click to append keyword to resume draft'}
                        >
                          <span>{isAdded ? '✓' : '+'} {kw}</span>
                        </button>
                      );
                    })}
                    <button
                      onClick={() => injectKeywords()}
                      className="text-[11px] text-[#0071e3] font-semibold hover:underline ml-2"
                    >
                      Append all
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Results Segmented Tab Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#e5e5ea] pb-3">
              <div className="apple-segmented flex gap-1 text-xs">
                <button
                  onClick={() => setActiveTab('bullets')}
                  className={`px-4 py-1.5 rounded-full font-medium transition ${
                    activeTab === 'bullets' ? 'bg-white text-[#1d1d1f] shadow-xs font-semibold' : 'text-[#86868b] hover:text-[#1d1d1f]'
                  }`}
                >
                  Quantified Bullets
                </button>
                <button
                  onClick={() => setActiveTab('comparison')}
                  className={`px-4 py-1.5 rounded-full font-medium transition ${
                    activeTab === 'comparison' ? 'bg-white text-[#1d1d1f] shadow-xs font-semibold' : 'text-[#86868b] hover:text-[#1d1d1f]'
                  }`}
                >
                  Before & After Diff
                </button>
                <button
                  onClick={() => setActiveTab('fullResume')}
                  className={`px-4 py-1.5 rounded-full font-medium transition ${
                    activeTab === 'fullResume' ? 'bg-white text-[#1d1d1f] shadow-xs font-semibold' : 'text-[#86868b] hover:text-[#1d1d1f]'
                  }`}
                >
                  Full Resume Text
                </button>
                <button
                  onClick={() => setActiveTab('coverLetter')}
                  className={`px-4 py-1.5 rounded-full font-medium transition ${
                    activeTab === 'coverLetter' ? 'bg-white text-[#1d1d1f] shadow-xs font-semibold' : 'text-[#86868b] hover:text-[#1d1d1f]'
                  }`}
                >
                  Cover Letter Hook
                </button>
              </div>

              {/* Action Export Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => copyToClipboard(result.fullOptimizedResume, 'full')}
                  className="px-3 py-1.5 rounded-full bg-white hover:bg-neutral-50 border border-[#d2d2d7]/80 text-xs font-medium text-[#1d1d1f] flex items-center gap-1.5 shadow-2xs"
                >
                  {copiedSection === 'full' ? <Check className="w-3.5 h-3.5 text-[#34c759]" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSection === 'full' ? 'Copied' : 'Copy All'}</span>
                </button>

                <button
                  onClick={downloadResume}
                  className="px-3.5 py-1.5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-medium flex items-center gap-1.5 shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download .txt</span>
                </button>
              </div>
            </div>

            {/* Tab 1: Quantified Bullets */}
            {activeTab === 'bullets' && (
              <div className="space-y-3">
                {result.optimizedExperienceBullets?.map((bullet: string, idx: number) => (
                  <div key={idx} className="p-4 rounded-2xl bg-white/90 border border-white flex items-start justify-between gap-4 shadow-2xs">
                    <p className="text-xs text-[#1d1d1f] leading-relaxed">
                      • {bullet}
                    </p>
                    <button
                      onClick={() => copyToClipboard(bullet, `bullet-${idx}`)}
                      className="p-1.5 rounded-lg text-[#86868b] hover:text-[#1d1d1f] hover:bg-neutral-100 transition-colors shrink-0"
                      title="Copy bullet"
                    >
                      {copiedSection === `bullet-${idx}` ? <Check className="w-3.5 h-3.5 text-[#34c759]" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 2: Before & After Diff Comparison */}
            {activeTab === 'comparison' && (
              <div className="space-y-4">
                {result.optimizedExperienceBullets?.map((newBullet: string, idx: number) => {
                  const original = originalBullets[idx] || 'Original candidate responsibility statement.';
                  return (
                    <div key={idx} className="p-4 rounded-2xl bg-white/90 border border-white shadow-2xs space-y-2.5">
                      <div className="p-3 rounded-xl bg-red-50/50 border border-red-500/20">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-red-600 block mb-1">Before (Passive / Unquantified)</span>
                        <p className="text-xs text-[#86868b] line-through">{original}</p>
                      </div>
                      <div className="p-3 rounded-xl bg-emerald-50/50 border border-emerald-500/20">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block mb-1">After (Google X-Y-Z Quantified Impact)</span>
                        <p className="text-xs text-[#1d1d1f] font-medium">{newBullet}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Tab 3: Full Resume Text */}
            {activeTab === 'fullResume' && (
              <div className="bg-white/90 p-5 rounded-2xl border border-white font-mono text-xs text-[#1d1d1f] whitespace-pre-wrap leading-relaxed shadow-2xs max-h-96 overflow-y-auto">
                {result.fullOptimizedResume}
              </div>
            )}

            {/* Tab 4: Cover Letter Hook */}
            {activeTab === 'coverLetter' && (
              <div className="bg-white/90 p-5 rounded-2xl border border-white text-xs text-[#1d1d1f] leading-relaxed shadow-2xs space-y-3">
                <span className="text-[11px] font-semibold text-[#86868b] uppercase tracking-wider block">
                  Tailored Opening Paragraph
                </span>
                <p className="italic">
                  "{result.coverLetterSnippet}"
                </p>
                <button
                  onClick={() => copyToClipboard(result.coverLetterSnippet, 'cover')}
                  className="px-3 py-1.5 rounded-full bg-white border border-[#d2d2d7] text-xs text-[#1d1d1f] font-medium inline-flex items-center gap-1.5 mt-2"
                >
                  {copiedSection === 'cover' ? <Check className="w-3.5 h-3.5 text-[#34c759]" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>Copy Hook</span>
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Razorpay & UPI Verified Payment Modal */}
      {checkoutModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md flex items-center justify-center p-4 animate-appleFadeUp">
          <div className="liquid-glass rounded-[32px] max-w-md w-full p-6 sm:p-7 shadow-2xl relative max-h-[92vh] overflow-y-auto">
            {/* Close Button */}
            <button 
              onClick={() => {
                setCheckoutModalOpen(false);
                setVerificationFeedback({ type: 'idle' });
              }}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/70 hover:bg-white text-[#86868b] hover:text-[#1d1d1f] flex items-center justify-center transition shadow-2xs"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Header */}
            <div className="text-center mb-5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0071e3]/10 text-[#0071e3] text-[11px] font-semibold mb-2">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified Payment Gateway</span>
              </div>
              <h3 className="text-xl font-extrabold text-[#1d1d1f] tracking-tight">Instant Credit Activation</h3>
              <p className="text-xs text-[#86868b] mt-0.5">Automated verification powered by Razorpay</p>
            </div>

            {/* Plan Switcher Pills */}
            <div className="grid grid-cols-2 gap-2 bg-neutral-200/50 p-1 rounded-2xl mb-5">
              <button
                type="button"
                onClick={() => switchPlan('starter')}
                className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all ${
                  selectedPlan.amount === 49
                    ? 'bg-white text-[#1d1d1f] shadow-xs'
                    : 'text-[#86868b] hover:text-[#1d1d1f]'
                }`}
              >
                <span>15 Audits • ₹49</span>
              </button>
              <button
                type="button"
                onClick={() => switchPlan('unlimited')}
                className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all ${
                  selectedPlan.amount === 99
                    ? 'bg-white text-[#0071e3] shadow-xs'
                    : 'text-[#86868b] hover:text-[#1d1d1f]'
                }`}
              >
                <span>Unlimited • ₹99</span>
              </button>
            </div>

            {/* Payment Method Segmented Tabs */}
            <div className="flex border-b border-[#e5e5ea] mb-4">
              <button
                type="button"
                onClick={() => setPaymentMethodTab('razorpay')}
                className={`flex-1 pb-2.5 text-xs font-semibold text-center border-b-2 transition-all flex items-center justify-center gap-1.5 ${
                  paymentMethodTab === 'razorpay'
                    ? 'border-[#0071e3] text-[#0071e3]'
                    : 'border-transparent text-[#86868b] hover:text-[#1d1d1f]'
                }`}
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>Razorpay (Instant)</span>
                <span className="text-[9px] bg-blue-100 text-[#0071e3] px-1.5 py-0.2 rounded-full font-bold">Fast</span>
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethodTab('upi')}
                className={`flex-1 pb-2.5 text-xs font-semibold text-center border-b-2 transition-all flex items-center justify-center gap-1.5 ${
                  paymentMethodTab === 'upi'
                    ? 'border-[#1d1d1f] text-[#1d1d1f]'
                    : 'border-transparent text-[#86868b] hover:text-[#1d1d1f]'
                }`}
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>Direct UPI QR / Ref</span>
              </button>
            </div>

            {/* TAB 1: Razorpay Instant Verification (RECOMMENDED) */}
            {paymentMethodTab === 'razorpay' && (
              <div className="space-y-4">
                {/* Order Summary Box */}
                <div className="liquid-glass-subtle p-4 rounded-2xl border border-white space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-sm text-[#1d1d1f]">{selectedPlan.name}</h4>
                      <p className="text-[11px] text-[#86868b]">
                        {selectedPlan.amount === 99 ? 'Unlimited ATS scans & enhancements for 30 days' : '15 high-signal ATS resume audits'}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-black text-[#1d1d1f]">{selectedPlan.price}</span>
                      <span className="text-[10px] text-emerald-600 font-medium block">0% Extra Fee</span>
                    </div>
                  </div>

                  {/* Payment Method Logos / Badges */}
                  <div className="pt-2 border-t border-[#f0f0f2] flex flex-wrap items-center gap-1.5">
                    <span className="text-[10px] font-medium text-[#86868b] mr-1">Accepted:</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-white border border-[#e5e5ea] text-[#1d1d1f] font-medium shadow-2xs">Google Pay</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-white border border-[#e5e5ea] text-[#1d1d1f] font-medium shadow-2xs">PhonePe</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-white border border-[#e5e5ea] text-[#1d1d1f] font-medium shadow-2xs">Paytm</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-white border border-[#e5e5ea] text-[#1d1d1f] font-medium shadow-2xs">Cards</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-white border border-[#e5e5ea] text-[#1d1d1f] font-medium shadow-2xs">Netbanking</span>
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-1.5 text-[11px] text-[#1d1d1f] px-1">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Instant automatic verification & immediate credit top-up</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>End-to-end 256-bit cryptographic HMAC verification</span>
                  </div>
                </div>

                {/* Terms Agreement */}
                <div className="flex items-start gap-2 liquid-glass-subtle p-2.5 rounded-xl">
                  <input 
                    type="checkbox" 
                    id="legalAgreementRazorpay" 
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="mt-0.5 rounded border-[#d2d2d7] text-[#0071e3] focus:ring-[#0071e3]"
                  />
                  <label htmlFor="legalAgreementRazorpay" className="text-[11px] text-[#86868b] leading-snug">
                    I agree to the <Link href="/terms" target="_blank" className="text-[#0071e3] underline">Terms of Service</Link>.
                  </label>
                </div>

                {/* Main Razorpay Trigger Button */}
                <button
                  type="button"
                  onClick={handleRazorpayCheckout}
                  disabled={razorpayLoading || isVerifying || !agreedToTerms}
                  className="apple-btn-primary w-full py-3.5 text-xs font-semibold flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99] disabled:opacity-50"
                >
                  {razorpayLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>Connecting to Razorpay...</span>
                    </>
                  ) : isVerifying ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>Verifying Cryptographic Signature...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-3.5 h-3.5 text-white" />
                      <span>Pay {selectedPlan.price} with Razorpay (Instant Verify)</span>
                    </>
                  )}
                </button>
              </div>
            )}

            {/* TAB 2: Direct UPI QR with Real Server Verification */}
            {paymentMethodTab === 'upi' && (
              <div className="space-y-4">
                {/* QR Code & UPI ID Card */}
                <div className="liquid-glass-subtle p-4 rounded-2xl text-center flex flex-col items-center">
                  <span className="text-[10px] font-semibold text-[#86868b] uppercase tracking-wider block mb-1">
                    Scan with any UPI App
                  </span>
                  
                  {/* Real Scannable UPI QR Code */}
                  <div className="bg-white p-2.5 rounded-2xl border border-white shadow-xs my-2">
                    <img 
                      src={qrCodeUrl} 
                      alt="UPI QR Code" 
                      className="w-32 h-32 object-contain mx-auto"
                    />
                  </div>

                  <div className="text-2xl font-black tracking-tight text-[#1d1d1f] my-1">
                    {selectedPlan.price}
                  </div>

                  {/* Merchant UPI ID with Copy Button */}
                  <div className="flex items-center gap-2 bg-white/90 px-3 py-1.5 rounded-full border border-white text-xs font-mono mt-1 shadow-2xs">
                    <span className="text-[#1d1d1f] font-semibold">{merchantUpiId}</span>
                    <button 
                      type="button"
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
                    <span>Tap to Pay on Mobile UPI App</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                {/* Reference Input for Verification */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[#1d1d1f] block">
                    Razorpay Payment ID / 12-Digit UPI UTR:
                  </label>
                  <input
                    type="text"
                    value={utrNumber}
                    onChange={(e) => setUtrNumber(e.target.value)}
                    placeholder="e.g. pay_N2k9b4x or 428190123456"
                    className="w-full bg-white/90 border border-[#d2d2d7]/80 rounded-xl p-2.5 text-xs focus:outline-none focus:border-[#0071e3] font-mono text-[#1d1d1f]"
                  />
                  <p className="text-[10px] text-[#86868b] leading-relaxed">
                    Enter your Razorpay payment ID or bank UTR for automated gateway verification.
                  </p>
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

                {/* Verify Manual Payment Button */}
                <button
                  type="button"
                  onClick={verifyManualPayment}
                  disabled={isVerifying || !agreedToTerms || !utrNumber.trim()}
                  className="apple-btn-dark w-full py-3 text-xs flex items-center justify-center gap-1.5 shadow-sm disabled:opacity-50"
                >
                  {isVerifying ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>Verifying with Razorpay...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>Verify Payment ({selectedPlan.price})</span>
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Verification Status Feedback Alert */}
            {verificationFeedback.type !== 'idle' && (
              <div
                className={`mt-4 p-3 rounded-xl text-xs flex items-center gap-2 ${
                  verificationFeedback.type === 'loading'
                    ? 'bg-blue-50 text-[#0071e3] border border-blue-200'
                    : verificationFeedback.type === 'success'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-red-50 text-red-700 border border-red-200'
                }`}
              >
                {verificationFeedback.type === 'loading' && <Loader2 className="w-4 h-4 animate-spin shrink-0" />}
                {verificationFeedback.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                {verificationFeedback.type === 'error' && <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />}
                <span className="leading-snug">{verificationFeedback.message}</span>
              </div>
            )}

            <p className="text-[10px] text-[#86868b] text-center mt-4">
              Protected by 256-bit SSL encryption • Verified by Razorpay
            </p>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="relative z-10 border-t border-[#d2d2d7] py-6 px-6 text-xs text-[#86868b] text-center">
        <span>SHORTLIST Executive Workstation • Direct UPI payments to <strong>{merchantUpiId}</strong> • </span>
        <Link href="/terms" className="hover:underline">Terms</Link> • <Link href="/privacy" className="hover:underline">Privacy</Link>
      </footer>
    </div>
  );
}
