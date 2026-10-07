import React from 'react';
import Link from 'next/link';
import Logo from '@/components/Logo';
import { ArrowLeft, Lock } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy — Shortlist',
  description: 'Privacy Policy and Data Protection standards for Shortlist.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 py-12 px-4 sm:px-6 font-sans">
      <div className="max-w-3xl mx-auto bg-white border border-neutral-200 p-8 sm:p-12 rounded-2xl shadow-sm">
        
        <div className="flex justify-between items-center mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-600 hover:text-neutral-950 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Application
          </Link>
          <Logo size="sm" showTagline={false} />
        </div>

        <div className="border-b border-neutral-200 pb-6 mb-8">
          <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 block mb-1">
            Data Governance
          </span>
          <h1 className="text-3xl font-extrabold text-neutral-950">Privacy Policy</h1>
          <p className="text-xs text-neutral-500 mt-2">Effective Date: October 5, 2026 • Version 1.2</p>
        </div>

        {/* Highlight badge */}
        <div className="bg-neutral-100 border-l-4 border-neutral-950 p-4 rounded-r-xl mb-8">
          <div className="flex items-start gap-3">
            <Lock className="w-5 h-5 text-neutral-950 shrink-0 mt-0.5" />
            <div className="text-xs leading-relaxed text-neutral-800">
              <strong className="block text-neutral-950 mb-1">OUR CORE PRIVACY PROMISE:</strong>
              We do NOT sell, rent, or monetize your resume or personal information to recruitment agencies, data brokers, or advertisers. Your documents are used strictly to execute real-time ATS optimization requested by you.
            </div>
          </div>
        </div>

        <div className="space-y-8 text-xs text-neutral-700 leading-relaxed">
          
          <section>
            <h2 className="text-sm font-bold text-neutral-950 uppercase tracking-wider mb-2">
              1. Information We Collect
            </h2>
            <p className="mb-2">We collect only information required to provide the audit service:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Submitted Content:</strong> Resume text and job description snippets provided in input fields.</li>
              <li><strong>Billing Data:</strong> Transaction tokens processed through our PCI-DSS compliant payment provider (Stripe). We never store raw credit card numbers on our servers.</li>
              <li><strong>Technical Logs:</strong> IP address, browser user-agent, and anonymized access timestamps for server security and rate-limiting.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-sm font-bold text-neutral-950 uppercase tracking-wider mb-2">
              2. How Your Information Is Processed
            </h2>
            <p className="mb-2">Your data is processed exclusively for the following purposes:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Executing ATS keyword parsing, density checks, and accomplishment restructuring.</li>
              <li>Fulfilling credit allocation and digital orders.</li>
              <li>Preventing malicious misuse, DDOS attacks, and unauthorized automated scraping.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-sm font-bold text-neutral-950 uppercase tracking-wider mb-2">
              3. No Permanent Document Storage
            </h2>
            <p>
              Shortlist treats text evaluations as ephemeral computational requests. We do not maintain an indexed searchable database of your career history. You can clear your session at any time using the "Clear" control in the application interface.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-bold text-neutral-950 uppercase tracking-wider mb-2">
              4. Third-Party Service Providers
            </h2>
            <p className="mb-2">
              We may utilize vetted, industry-standard third-party sub-processors:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Payment Infrastructure:</strong> Stripe Inc. (governed by Stripe Privacy Policy).</li>
              <li><strong>Cloud Hosting & CDN:</strong> Vercel / Amazon Web Services (SOC2 and ISO27001 certified).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-sm font-bold text-neutral-950 uppercase tracking-wider mb-2">
              5. User Rights (GDPR & CCPA Compliance)
            </h2>
            <p className="mb-2">
              Depending on your jurisdiction, you maintain standard data rights:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>The right to request disclosure of information processed about you.</li>
              <li>The right to request immediate deletion of any residual server log entries containing your IP.</li>
              <li>The right to opt-out of cookies and local storage state.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-sm font-bold text-neutral-950 uppercase tracking-wider mb-2">
              6. Security Safeguards
            </h2>
            <p>
              All transmission between your browser and Shortlist is encrypted in transit using 256-bit Transport Layer Security (TLS 1.3 / SSL).
            </p>
          </section>

        </div>

        <div className="border-t border-neutral-200 mt-10 pt-6 flex justify-between items-center text-xs text-neutral-500">
          <span>Shortlist Compliance Desk</span>
          <Link href="/" className="text-neutral-950 font-bold hover:underline">
            Return to Application
          </Link>
        </div>

      </div>
    </div>
  );
}
