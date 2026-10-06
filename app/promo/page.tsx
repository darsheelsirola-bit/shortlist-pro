'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Logo from '@/components/Logo';
import confetti from 'canvas-confetti';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Download, 
  Volume2, 
  VolumeX, 
  Mic, 
  MicOff, 
  Sparkles, 
  CheckCircle2, 
  Copy, 
  Check, 
  Smartphone, 
  Monitor, 
  Share2, 
  ArrowLeft,
  QrCode,
  ShieldAlert,
  Zap,
  TrendingUp,
  FileText
} from 'lucide-react';

interface Scene {
  id: number;
  duration: number; // in seconds
  title: string;
  subtitle: string;
  voiceoverText: string;
}

const SCENES: Scene[] = [
  {
    id: 1,
    duration: 4.5,
    title: '98% Of Resumes Die In The ATS Algorithm.',
    subtitle: 'It is not your experience. It is the automated robot filtering you out.',
    voiceoverText: 'Did you know ninety-eight percent of resumes get rejected before any human ever sees them? It is not your skills. It is the automated applicant tracking system.'
  },
  {
    id: 2,
    duration: 4.5,
    title: 'Recruiters Don’t Read Resumes. Algorithms Do.',
    subtitle: 'Missing single keywords or vague bullets drops your score below the interview cutoff.',
    voiceoverText: 'Hiring algorithms filter for exact keywords and measurable impact. If your bullet points are generic, your application goes straight to the trash.'
  },
  {
    id: 3,
    duration: 5.5,
    title: 'Meet SHORTLIST.',
    subtitle: 'Watch your match score jump from 34% to 96% with Google X-Y-Z bullet rewrites.',
    voiceoverText: 'That is why we built Shortlist. In two seconds, it audits your resume against any job description, fixes missing keywords, and rewrites your bullets with executive impact.'
  },
  {
    id: 4,
    duration: 4.5,
    title: 'No $20 Monthly Subscriptions. Just ₹49.',
    subtitle: 'Zero subscriptions. Instant 100% direct UPI transfer with GPay, PhonePe & Paytm.',
    voiceoverText: 'Stop paying twenty dollars a month for bloated software. Shortlist is only forty-nine rupees. Pay once with Google Pay, PhonePe, or Paytm.'
  },
  {
    id: 5,
    duration: 3.5,
    title: 'Get On The Shortlist Today.',
    subtitle: 'Optimize your resume now. Link in bio & description below.',
    voiceoverText: 'Stop getting ghosted. Land three times more interviews this week. Try Shortlist now at the link below.'
  }
];

const TOTAL_DURATION = SCENES.reduce((acc, s) => acc + s.duration, 0);

export default function PromoVideoPage() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [aspectRatio, setAspectRatio] = useState<'vertical' | 'horizontal'>('vertical');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [voiceoverEnabled, setVoiceoverEnabled] = useState<boolean>(true);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordProgress, setRecordProgress] = useState<number>(0);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lastTimestampRef = useRef<number | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const currentSceneIndexRef = useRef<number>(-1);

  // Determine current active scene
  const getCurrentScene = (time: number) => {
    let accumulated = 0;
    for (let i = 0; i < SCENES.length; i++) {
      accumulated += SCENES[i].duration;
      if (time <= accumulated || i === SCENES.length - 1) {
        return { scene: SCENES[i], index: i, sceneProgress: (time - (accumulated - SCENES[i].duration)) / SCENES[i].duration };
      }
    }
    return { scene: SCENES[0], index: 0, sceneProgress: 0 };
  };

  const { scene: currentScene, index: currentSceneIdx, sceneProgress } = getCurrentScene(currentTime);

  // Initialize Web Audio synthesizer for effects
  const playSoundEffect = (type: 'boom' | 'chime' | 'tick' | 'success') => {
    if (!soundEnabled || typeof window === 'undefined') return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const now = ctx.currentTime;
      if (type === 'boom') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(120, now);
        osc.frequency.exponentialRampToValueAtTime(30, now + 0.6);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.6);
      } else if (type === 'chime') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(587.33, now); // D5
        osc.frequency.setValueAtTime(880, now + 0.1); // A5
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.5);
      } else if (type === 'success') {
        // Apple style major chord chime
        [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.08);
          gain.gain.setValueAtTime(0.18, now + idx * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.08);
          osc.stop(now + 0.7);
        });
      } else if (type === 'tick') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(1000, now);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.05);
      }
    } catch {
      // Audio fallback silent
    }
  };

  // Trigger SpeechSynthesis voiceover for the scene
  const triggerVoiceover = (text: string) => {
    if (!voiceoverEnabled || typeof window === 'undefined' || !window.speechSynthesis) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.08;
      utterance.pitch = 1.0;
      utterance.lang = 'en-US';
      const voices = window.speechSynthesis.getVoices();
      const preferred = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Daniel')));
      if (preferred) utterance.voice = preferred;
      window.speechSynthesis.speak(utterance);
    } catch {
      // speech synthesis error catch
    }
  };

  // Playback loop
  useEffect(() => {
    if (!isPlaying) {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.pause();
      }
      return;
    }

    if (typeof window !== 'undefined' && window.speechSynthesis) {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }
    }

    const step = (timestamp: number) => {
      if (!lastTimestampRef.current) lastTimestampRef.current = timestamp;
      const delta = (timestamp - lastTimestampRef.current) / 1000;
      lastTimestampRef.current = timestamp;

      setCurrentTime(prev => {
        const next = prev + delta;
        if (next >= TOTAL_DURATION) {
          setIsPlaying(false);
          lastTimestampRef.current = null;
          return TOTAL_DURATION;
        }
        return next;
      });

      animationFrameRef.current = requestAnimationFrame(step);
    };

    animationFrameRef.current = requestAnimationFrame(step);

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isPlaying]);

  // Handle scene change sound and voiceover
  useEffect(() => {
    if (currentSceneIdx !== currentSceneIndexRef.current) {
      currentSceneIndexRef.current = currentSceneIdx;
      if (isPlaying) {
        if (currentSceneIdx === 0) playSoundEffect('boom');
        else if (currentSceneIdx === 2) {
          playSoundEffect('success');
          confetti({ particleCount: 35, spread: 60, origin: { y: 0.6 } });
        } else if (currentSceneIdx === 3) playSoundEffect('chime');

        triggerVoiceover(currentScene.voiceoverText);
      }
    }
  }, [currentSceneIdx, isPlaying]);

  const handlePlay = () => {
    if (currentTime >= TOTAL_DURATION) {
      setCurrentTime(0);
      currentSceneIndexRef.current = -1;
    }
    lastTimestampRef.current = null;
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
    lastTimestampRef.current = null;
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  };

  const handleRestart = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    currentSceneIndexRef.current = -1;
    lastTimestampRef.current = null;
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setCurrentTime(val);
    currentSceneIndexRef.current = -1;
    if (isPlaying) {
      lastTimestampRef.current = null;
    }
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  // Video recording engine using HTML5 Canvas & MediaRecorder
  const handleExportVideo = async () => {
    if (isRecording) return;
    setIsRecording(true);
    setRecordProgress(0);
    handleRestart();

    const canvas = document.createElement('canvas');
    const width = aspectRatio === 'vertical' ? 1080 : 1920;
    const height = aspectRatio === 'vertical' ? 1920 : 1080;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      alert('Canvas context unavailable');
      setIsRecording(false);
      return;
    }

    let stream: MediaStream;
    try {
      stream = canvas.captureStream(30);
    } catch {
      alert('Your browser does not support canvas video capture.');
      setIsRecording(false);
      return;
    }

    const mimeType = MediaRecorder.isTypeSupported('video/webm;codecs=vp9')
      ? 'video/webm;codecs=vp9'
      : MediaRecorder.isTypeSupported('video/webm')
      ? 'video/webm'
      : 'video/mp4';

    const recorder = new MediaRecorder(stream, { mimeType, videoBitsPerSecond: 6000000 });
    const chunks: Blob[] = [];

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunks.push(e.data);
    };

    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: mimeType });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `shortlist-ad-video-${aspectRatio}.webm`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setIsRecording(false);
      setRecordProgress(100);
      confetti({ particleCount: 70, spread: 80 });
    };

    recorder.start();

    // Render frame by frame
    const fps = 30;
    const totalFrames = Math.floor(TOTAL_DURATION * fps);
    let currentFrame = 0;

    const renderLoop = () => {
      if (currentFrame >= totalFrames) {
        recorder.stop();
        return;
      }

      const simTime = (currentFrame / totalFrames) * TOTAL_DURATION;
      const { scene, index, sceneProgress } = getCurrentScene(simTime);

      // Draw background
      ctx.fillStyle = '#0a0a0c';
      ctx.fillRect(0, 0, width, height);

      // Background ambient gradient orb
      const orbGrad = ctx.createRadialGradient(
        width * 0.5, height * (0.3 + Math.sin(simTime) * 0.1), 50,
        width * 0.5, height * 0.5, width * 0.7
      );
      if (index === 0) {
        orbGrad.addColorStop(0, 'rgba(255, 69, 58, 0.25)'); // Red ATS fail
      } else if (index === 2) {
        orbGrad.addColorStop(0, 'rgba(52, 199, 89, 0.28)'); // Apple green success
      } else {
        orbGrad.addColorStop(0, 'rgba(0, 113, 227, 0.25)'); // Apple electric blue
      }
      orbGrad.addColorStop(1, 'rgba(10, 10, 12, 1)');
      ctx.fillStyle = orbGrad;
      ctx.fillRect(0, 0, width, height);

      // Top Monogram & Brand
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 36px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('SHORTLIST', width * 0.5, height * 0.08);

      ctx.fillStyle = '#86868b';
      ctx.font = '22px sans-serif';
      ctx.fillText('PRECISION ATS OPTIMIZER', width * 0.5, height * 0.11);

      // Scene specific illustrations
      if (index === 0) {
        // Red Rejection Badge
        ctx.save();
        ctx.translate(width * 0.5, height * 0.38);
        ctx.strokeStyle = '#ff453a';
        ctx.lineWidth = 6;
        ctx.strokeRect(-220, -70, 440, 140);
        ctx.fillStyle = 'rgba(255, 69, 58, 0.15)';
        ctx.fillRect(-220, -70, 440, 140);

        ctx.fillStyle = '#ff453a';
        ctx.font = '900 48px sans-serif';
        ctx.fillText('ATS REJECTED', 0, 15);
        ctx.restore();

        // Warning Text
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 54px sans-serif';
        ctx.fillText('98% of Resumes Die Here.', width * 0.5, height * 0.58);

        ctx.fillStyle = '#a1a1a6';
        ctx.font = '32px sans-serif';
        ctx.fillText('Filtered out before human eyes see them.', width * 0.5, height * 0.65);

      } else if (index === 1) {
        // Missing keywords scanner
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 50px sans-serif';
        ctx.fillText('The Problem: Missing Keywords', width * 0.5, height * 0.32);

        // Radar tags
        const keywords = ['Kafka: MISSING', 'Kubernetes: MISSING', 'System Design: 0%', 'Metrics: Vague'];
        keywords.forEach((kw, kIdx) => {
          const y = height * 0.44 + kIdx * 80;
          ctx.fillStyle = '#1c1c1e';
          ctx.beginPath();
          ctx.roundRect(width * 0.5 - 280, y - 35, 560, 60, 16);
          ctx.fill();
          ctx.strokeStyle = '#ff453a';
          ctx.lineWidth = 2;
          ctx.stroke();

          ctx.fillStyle = '#ff453a';
          ctx.font = 'bold 28px sans-serif';
          ctx.fillText(`✕ ${kw}`, width * 0.5, y + 8);
        });

      } else if (index === 2) {
        // Score jumping from 34% to 96%
        const scoreVal = Math.min(96, Math.floor(34 + sceneProgress * 62));

        // Activity Circle
        ctx.save();
        ctx.translate(width * 0.5, height * 0.36);
        ctx.lineWidth = 24;
        ctx.strokeStyle = '#2c2c2e';
        ctx.beginPath();
        ctx.arc(0, 0, 140, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = '#34c759';
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.arc(0, 0, 140, -Math.PI / 2, -Math.PI / 2 + (Math.PI * 2 * (scoreVal / 100)));
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 84px sans-serif';
        ctx.fillText(`${scoreVal}%`, 0, 24);

        ctx.fillStyle = '#34c759';
        ctx.font = '600 24px sans-serif';
        ctx.fillText('SHORTLIST MATCH', 0, 65);
        ctx.restore();

        // Bullet Upgrade
        ctx.fillStyle = '#34c759';
        ctx.font = 'bold 42px sans-serif';
        ctx.fillText('Google X-Y-Z Formula', width * 0.5, height * 0.62);

        ctx.fillStyle = '#f5f5f7';
        ctx.font = '28px sans-serif';
        ctx.fillText('Rewrites weak bullets into quantified results.', width * 0.5, height * 0.68);

      } else if (index === 3) {
        // Pricing & UPI
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 72px sans-serif';
        ctx.fillText('₹49 Only.', width * 0.5, height * 0.34);

        ctx.fillStyle = '#86868b';
        ctx.font = '32px sans-serif';
        ctx.fillText('No $20/month subscription traps.', width * 0.5, height * 0.40);

        // UPI Pill
        ctx.fillStyle = '#0071e3';
        ctx.beginPath();
        ctx.roundRect(width * 0.5 - 320, height * 0.47, 640, 100, 30);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 36px sans-serif';
        ctx.fillText('GPay • PhonePe • Paytm • UPI', width * 0.5, height * 0.535);

        ctx.fillStyle = '#a1a1a6';
        ctx.font = '26px sans-serif';
        ctx.fillText('Instant 100% direct transfer to darsheel.sirola@fam', width * 0.5, height * 0.64);

      } else if (index === 4) {
        // Call to action
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 64px sans-serif';
        ctx.fillText('Land 3x More Interviews.', width * 0.5, height * 0.38);

        ctx.fillStyle = '#0071e3';
        ctx.font = 'bold 44px sans-serif';
        ctx.fillText('shortlistcv.com', width * 0.5, height * 0.46);

        ctx.fillStyle = '#86868b';
        ctx.font = '30px sans-serif';
        ctx.fillText('Link in bio & description', width * 0.5, height * 0.53);
      }

      // Bottom Progress Bar
      ctx.fillStyle = 'rgba(255,255,255,0.2)';
      ctx.fillRect(40, height - 30, width - 80, 8);
      ctx.fillStyle = '#0071e3';
      ctx.fillRect(40, height - 30, (width - 80) * (simTime / TOTAL_DURATION), 8);

      currentFrame++;
      setRecordProgress(Math.floor((currentFrame / totalFrames) * 100));
      requestAnimationFrame(renderLoop);
    };

    renderLoop();
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white selection:bg-[#0071e3] selection:text-white">
      {/* Top Header */}
      <header className="border-b border-white/10 bg-[#0a0a0c]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              href="/" 
              className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to App
            </Link>
            <div className="h-4 w-px bg-white/15" />
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-xs font-semibold tracking-wide uppercase text-neutral-300">
                Ad Studio & Video Generator
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setAspectRatio(prev => prev === 'vertical' ? 'horizontal' : 'vertical')}
              className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/15 text-xs font-medium flex items-center gap-1.5 transition-all text-neutral-200"
            >
              {aspectRatio === 'vertical' ? (
                <>
                  <Smartphone className="w-3.5 h-3.5 text-blue-400" />
                  <span>9:16 Reel / Short</span>
                </>
              ) : (
                <>
                  <Monitor className="w-3.5 h-3.5 text-blue-400" />
                  <span>16:9 Landscape</span>
                </>
              )}
            </button>

            <button
              onClick={handleExportVideo}
              disabled={isRecording}
              className="px-4 py-1.5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-medium flex items-center gap-1.5 transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isRecording ? `Rendering ${recordProgress}%` : 'Export Video (.webm)'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Studio Viewport */}
      <main className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: The Interactive Live Video Player */}
        <div className="lg:col-span-7 flex flex-col items-center">
          {/* Device Frame */}
          <div 
            className={`relative rounded-[36px] border border-white/20 shadow-2xl overflow-hidden bg-neutral-950 flex flex-col justify-between transition-all duration-500 ${
              aspectRatio === 'vertical' 
                ? 'w-[340px] sm:w-[380px] h-[640px] sm:h-[680px]' 
                : 'w-full max-w-[620px] h-[360px]'
            }`}
          >
            {/* Dynamic Ambient Background Glow */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div 
                className={`absolute w-72 h-72 rounded-full blur-[100px] transition-all duration-700 ${
                  currentSceneIdx === 0 
                    ? 'bg-red-500/30 top-1/4 left-1/4' 
                    : currentSceneIdx === 2 
                    ? 'bg-emerald-500/30 top-1/3 right-1/4' 
                    : 'bg-blue-500/30 top-1/4 left-1/3'
                }`} 
              />
            </div>

            {/* Video Canvas Top Bar / Branding */}
            <div className="relative z-10 px-6 pt-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center border border-white/20">
                  <span className="font-black text-xs">S</span>
                </div>
                <span className="text-[11px] font-bold tracking-widest text-neutral-300 uppercase">
                  SHORTLIST
                </span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-neutral-400">
                {currentTime.toFixed(1)}s / {TOTAL_DURATION.toFixed(1)}s
              </span>
            </div>

            {/* Middle Kinetic Animated Content */}
            <div className="relative z-10 px-6 py-4 flex-1 flex flex-col justify-center text-center">
              {/* Scene 1: Rejection Hook */}
              {currentSceneIdx === 0 && (
                <div className="space-y-5 animate-fadeIn">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/20 border border-red-500/50 text-red-400 text-sm font-extrabold tracking-wider uppercase animate-bounce">
                    <ShieldAlert className="w-4 h-4" />
                    <span>ATS Filter: REJECTED</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
                    98% of Resumes Die In The ATS Algorithm.
                  </h2>

                  <p className="text-xs sm:text-sm text-neutral-400 max-w-xs mx-auto leading-relaxed">
                    It is not your experience. It is the automated robot scanning you out in 2 seconds.
                  </p>
                </div>
              )}

              {/* Scene 2: The Problem */}
              {currentSceneIdx === 1 && (
                <div className="space-y-4 animate-fadeIn">
                  <span className="text-xs font-semibold text-red-400 uppercase tracking-widest">
                    The Silent Filter
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-white">
                    Recruiters Don’t Read Resumes.
                  </h2>
                  
                  {/* Missing keyword badges */}
                  <div className="space-y-2 max-w-xs mx-auto pt-2">
                    <div className="flex items-center justify-between p-2 rounded-xl bg-neutral-900 border border-red-500/30 text-xs text-neutral-300">
                      <span>Kafka / Microservices</span>
                      <span className="text-red-400 font-bold">MISSING</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-xl bg-neutral-900 border border-red-500/30 text-xs text-neutral-300">
                      <span>Quantified ROI / Metrics</span>
                      <span className="text-red-400 font-bold">0% FOUND</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-xl bg-neutral-900 border border-red-500/30 text-xs text-neutral-300">
                      <span>Executive Action Verbs</span>
                      <span className="text-red-400 font-bold">WEAK</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Scene 3: The Fix & Score Leap */}
              {currentSceneIdx === 2 && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/40">
                    <Zap className="w-3.5 h-3.5" />
                    <span>Instant Optimization</span>
                  </div>

                  {/* Circular Activity Score Ring */}
                  <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="40" stroke="rgba(255,255,255,0.1)" strokeWidth="8" fill="none" />
                      <circle 
                        cx="50" 
                        cy="50" 
                        r="40" 
                        stroke="#34c759" 
                        strokeWidth="8" 
                        strokeDasharray={251.2}
                        strokeDashoffset={251.2 * (1 - (0.34 + sceneProgress * 0.62))}
                        strokeLinecap="round" 
                        fill="none" 
                        className="transition-all duration-300"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-2xl font-black text-white">
                        {Math.min(96, Math.floor(34 + sceneProgress * 62))}%
                      </span>
                      <span className="text-[9px] uppercase tracking-wider text-emerald-400 font-bold">
                        MATCH
                      </span>
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-left max-w-xs mx-auto">
                    <p className="text-[10px] text-red-400 line-through">
                      Worked on backend APIs and bugs.
                    </p>
                    <p className="text-[11px] text-emerald-300 font-medium mt-1">
                      Architected microservices reducing p99 latency by 42% across 1.2M users.
                    </p>
                  </div>
                </div>
              )}

              {/* Scene 4: ₹49 & Instant UPI */}
              {currentSceneIdx === 3 && (
                <div className="space-y-4 animate-fadeIn">
                  <span className="text-xs font-semibold text-blue-400 uppercase tracking-widest">
                    Ultra-Affordable Micro SaaS
                  </span>
                  <div className="text-4xl sm:text-5xl font-black tracking-tight text-white">
                    ₹49 <span className="text-lg font-normal text-neutral-400">Only</span>
                  </div>
                  <p className="text-xs text-neutral-400">
                    No $20 monthly recurring subscriptions.
                  </p>

                  <div className="p-3.5 rounded-2xl bg-blue-600/20 border border-blue-500/40 text-center max-w-xs mx-auto space-y-2">
                    <div className="flex items-center justify-center gap-2 text-xs font-bold text-blue-300">
                      <Smartphone className="w-4 h-4" />
                      <span>Instant Direct UPI Transfer</span>
                    </div>
                    <p className="text-[11px] text-neutral-300 font-mono">
                      GPay • PhonePe • Paytm • BHIM
                    </p>
                    <div className="text-[10px] text-blue-400">
                      Direct to darsheel.sirola@fam
                    </div>
                  </div>
                </div>
              )}

              {/* Scene 5: Call to Action */}
              {currentSceneIdx === 4 && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 mx-auto flex items-center justify-center border border-white/20">
                    <Sparkles className="w-6 h-6 text-yellow-400" />
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                    Get On The Shortlist.
                  </h2>

                  <p className="text-xs sm:text-sm text-neutral-300 max-w-xs mx-auto">
                    Land 3x more interviews this week. Stop letting algorithms reject you.
                  </p>

                  <div className="pt-2">
                    <span className="px-5 py-2.5 rounded-full bg-[#0071e3] text-white text-xs font-bold shadow-lg shadow-blue-500/30 inline-block">
                      shortlistcv.com • Link in Bio
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Video Bottom Subtitle Bar & Progress */}
            <div className="relative z-10 px-6 pb-6 space-y-3">
              {/* Dynamic Voiceover Subtitle */}
              <div className="p-2.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-center">
                <p className="text-[11px] text-neutral-200 font-medium italic">
                  "{currentScene.voiceoverText}"
                </p>
              </div>

              {/* Segmented Timeline Tracker */}
              <div className="flex items-center gap-1.5">
                {SCENES.map((s, idx) => {
                  let progress = 0;
                  if (idx < currentSceneIdx) progress = 100;
                  else if (idx === currentSceneIdx) progress = sceneProgress * 100;
                  return (
                    <div key={s.id} className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-white transition-all duration-100" 
                        style={{ width: `${progress}%` }} 
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Interactive Player Controls */}
          <div className="w-full max-w-[420px] mt-6 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl flex flex-col gap-3">
            {/* Play/Pause & Audio Toggles */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {isPlaying ? (
                  <button
                    onClick={handlePause}
                    className="w-10 h-10 rounded-full bg-white text-neutral-900 flex items-center justify-center hover:bg-neutral-200 transition-colors shadow-md"
                  >
                    <Pause className="w-4 h-4 fill-current" />
                  </button>
                ) : (
                  <button
                    onClick={handlePlay}
                    className="w-10 h-10 rounded-full bg-[#0071e3] text-white flex items-center justify-center hover:bg-blue-600 transition-colors shadow-md"
                  >
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                  </button>
                )}

                <button
                  onClick={handleRestart}
                  className="w-8 h-8 rounded-full bg-white/10 text-neutral-300 flex items-center justify-center hover:bg-white/20 transition-colors"
                  title="Restart"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Audio and Voiceover Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setVoiceoverEnabled(!voiceoverEnabled)}
                  className={`px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 transition-colors ${
                    voiceoverEnabled ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40' : 'bg-white/5 text-neutral-500'
                  }`}
                  title="Toggle AI Speech Voiceover"
                >
                  {voiceoverEnabled ? <Mic className="w-3.5 h-3.5" /> : <MicOff className="w-3.5 h-3.5" />}
                  <span>Voiceover</span>
                </button>

                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className={`p-1.5 rounded-full transition-colors ${
                    soundEnabled ? 'text-blue-400 bg-blue-500/10' : 'text-neutral-500 bg-white/5'
                  }`}
                  title="Toggle Sound Effects"
                >
                  {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Scrub Slider */}
            <div className="space-y-1">
              <input
                type="range"
                min="0"
                max={TOTAL_DURATION}
                step="0.05"
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#0071e3]"
              />
              <div className="flex justify-between text-[10px] text-neutral-400 font-mono">
                <span>Scene {currentSceneIdx + 1} of {SCENES.length}</span>
                <span>{currentTime.toFixed(1)}s / {TOTAL_DURATION}s</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Viral Marketing Toolkit & Storyboard */}
        <div className="lg:col-span-5 space-y-6">
          {/* Kit 1: 1-Click Copy Instagram / Shorts Caption */}
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Share2 className="w-4 h-4 text-pink-400" />
                <h3 className="text-sm font-bold text-white">Instagram & YouTube Shorts Kit</h3>
              </div>
              <button
                onClick={() => copyToClipboard(
`Why are 98% of resumes rejected in 2 seconds? 🛑

It’s NOT your experience. It’s the ATS algorithm.
Algorithms filter out your resume before human recruiters ever lay eyes on it.

We built SHORTLIST to fix this.
✅ 1-click ATS Keyword Gap Audit
✅ Google X-Y-Z Quantified Bullet Rewrites
✅ Boost your match score from 34% to 94%+

💸 No $20/month subscriptions. Just ₹49 via UPI (Google Pay, PhonePe, Paytm).
👉 Try it today: link in bio!

#resumetips #jobsearch #careers #interviews #techjobs #softwareengineer #freshersjobs #indiajobs #atsresume #careeradvice`,
                  'caption'
                )}
                className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/15 text-xs text-neutral-200 flex items-center gap-1 transition-colors"
              >
                {copiedKey === 'caption' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'caption' ? 'Copied!' : 'Copy Caption'}</span>
              </button>
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed">
              Tested high-conversion caption tailored for Indian tech job seekers and college grads.
            </p>

            <div className="bg-black/40 p-3 rounded-xl border border-white/5 text-[11px] text-neutral-300 font-mono max-h-36 overflow-y-auto">
              <p>Why are 98% of resumes rejected in 2 seconds? 🛑</p>
              <p className="mt-1">It’s NOT your experience. It’s the ATS algorithm...</p>
              <p className="mt-1 text-blue-400">#resumetips #jobsearch #techjobs #careers</p>
            </div>
          </div>

          {/* Kit 2: Word-for-Word Audio Script */}
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Mic className="w-4 h-4 text-purple-400" />
                <h3 className="text-sm font-bold text-white">Voiceover Script (22 Seconds)</h3>
              </div>
              <button
                onClick={() => copyToClipboard(
                  SCENES.map((s, i) => `[Scene ${i+1} (${s.duration}s)]: ${s.voiceoverText}`).join('\n\n'),
                  'script'
                )}
                className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/15 text-xs text-neutral-200 flex items-center gap-1 transition-colors"
              >
                {copiedKey === 'script' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'script' ? 'Copied!' : 'Copy Script'}</span>
              </button>
            </div>

            <div className="space-y-2.5">
              {SCENES.map((s, i) => (
                <div 
                  key={s.id} 
                  className={`p-2.5 rounded-xl border text-xs transition-colors ${
                    currentSceneIdx === i 
                      ? 'bg-blue-500/10 border-blue-500/40 text-white' 
                      : 'bg-black/30 border-white/5 text-neutral-400'
                  }`}
                >
                  <div className="flex justify-between font-mono text-[10px] text-neutral-400 mb-1">
                    <span>Scene {i+1} ({s.duration}s)</span>
                    <span>{s.title}</span>
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    {s.voiceoverText}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Kit 3: High Conversion Growth Tips */}
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl space-y-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-bold text-white">How To Get Your First 50 Paid Users</h3>
            </div>
            <ul className="text-xs text-neutral-300 space-y-2 list-disc pl-4">
              <li>
                <strong>Post as an Instagram Reel:</strong> Use trending audio quietly in the background (5% volume) with this voiceover at 100% volume.
              </li>
              <li>
                <strong>Share on LinkedIn:</strong> "I spent the weekend analyzing 100 tech resumes. 98 were missing these 3 keywords..."
              </li>
              <li>
                <strong>Target Indian Reddit:</strong> Share an educational breakdown in <code className="text-blue-300 bg-white/10 px-1 py-0.5 rounded">r/developersIndia</code> offering 5 free audits, with UPI link for more.
              </li>
              <li>
                <strong>Direct UPI:</strong> Every ₹49 or ₹99 goes straight to <code className="text-blue-300">darsheel.sirola@fam</code> with zero deductions.
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
