import React from 'react';
import Link from 'next/link';
import Logo from '@/components/Logo';
import { ArrowLeft, Scale } from 'lucide-react';

export const metadata = {
  title: 'Terms of Service — Shortlist',
  description: 'Terms of Service, Legal Disclaimers, and Limitation of Liability for Shortlist.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#FBFBFA] text-neutral-900 py-12 px-4 sm:px-6 font-sans">
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
            Legal Agreement
          </span>
          <h1 className="text-3xl font-extrabold text-neutral-950">Terms of Service</h1>
          <p className="text-xs text-neutral-500 mt-2">Effective Date: October 5, 2026 • Version 1.4 (INR UPI Pricing)</p>
        </div>

        {/* Critical Disclaimer Notice */}
        <div className="bg-[#F8F8F7] border-l-4 border-neutral-950 p-4 rounded-r-xl mb-8">
          <div className="flex items-start gap-3">
            <Scale className="w-5 h-5 text-neutral-950 shrink-0 mt-0.5" />
            <div className="text-xs leading-relaxed text-neutral-800">
              <strong className="block text-neutral-950 mb-1">IMPORTANT EMPLOYMENT & WARRANTY DISCLAIMER:</strong>
              Shortlist is an automated text auditing and document formatting software utility. We do NOT guarantee employment, interview callbacks, hiring decisions, or specific compensation outcomes. Shortlist does NOT verify the underlying factual truth of your employment history. You remain solely responsible for the accuracy of all representations made on your applications.
            </div>
          </div>
        </div>

        <div className="space-y-8 text-xs text-neutral-700 leading-relaxed">
          
          <section>
            <h2 className="text-sm font-bold text-neutral-950 uppercase tracking-wider mb-2">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing, browsing, or purchasing evaluation credits on Shortlist ("the Service"), you ("the User") agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, you must discontinue using the Service immediately.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-bold text-neutral-950 uppercase tracking-wider mb-2">
              2. Nature of Service & User Representations
            </h2>
            <p className="mb-2">
              Shortlist provides text-based keyword matching, applicant tracking system (ATS) format checks, and stylistic rewriting suggestions. You represent and warrant that:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>All work experience, qualifications, certifications, and academic degrees you submit are truthful and factual.</li>
              <li>You will not misrepresent your experience or submit fabricated employment claims to employers.</li>
              <li>You own or have full legal permission to process the resume text submitted to the Service.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-sm font-bold text-neutral-950 uppercase tracking-wider mb-2">
              3. No Employment Guarantee & Absolute Warranty Disclaimer
            </h2>
            <p className="mb-2">
              THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
            </p>
            <p>
              SHORTLIST EXPRESSLY DISCLAIMS ANY GUARANTEE THAT THE USE OF THIS SERVICE WILL LEAD TO JOB INTERVIEWS, HIRING OFFERS, ADVANCEMENT, OR BYPASSING SPECIFIC EMPLOYER SCREENING POLICIES. HIRING DECISIONS REMAIN THE SOLE AND EXCLUSIVE DISCRETION OF PROSPECTIVE EMPLOYERS.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-bold text-neutral-950 uppercase tracking-wider mb-2">
              4. Limitation of Liability
            </h2>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL SHORTLIST, ITS OPERATORS, EMPLOYEES, OR AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, CONSEQUENTIAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF EMPLOYMENT OPPORTUNITIES, LOSS OF REVENUE, LOSS OF PROFITS, OR DATA LOSS. IN ALL CASES, OUR TOTAL AGGREGATE LIABILITY SHALL NOT EXCEED THE ACTUAL AMOUNT PAID BY YOU TO SHORTLIST IN THE PRECEDING THIRTY (30) DAYS (MAXIMUM ₹99.00 INR).
            </p>
          </section>

          <section>
            <h2 className="text-sm font-bold text-neutral-950 uppercase tracking-wider mb-2">
              5. UPI Payments & Refund Policy
            </h2>
            <p className="mb-2">
              All transactions are processed in Indian Rupees (INR) via direct Unified Payments Interface (UPI) or payment gateways. Because Shortlist delivers immediate digital computing resources and instant document processing upon purchase, evaluations and subscription fees are non-refundable once consumed.
            </p>
            <p>
              If you experience a technical failure where an evaluation was deducted without output, provide your 12-digit UPI UTR / Reference number for instant credit restoration.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-bold text-neutral-950 uppercase tracking-wider mb-2">
              6. Third-Party Trademarks
            </h2>
            <p>
              Workday, Taleo, Greenhouse, Lever, LinkedIn, Google, and any other company or software product names referenced on this site are registered trademarks of their respective owners. Shortlist is an independent productivity tool and has no affiliation, endorsement, partnership, or sponsorship with any of these trademark holders.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-bold text-neutral-950 uppercase tracking-wider mb-2">
              7. Indemnification
            </h2>
            <p>
              You agree to defend, indemnify, and hold harmless Shortlist and its operators from and against any claims, liabilities, damages, judgments, awards, losses, costs, or expenses (including reasonable attorney's fees) arising out of or relating to your violation of these Terms, your use of the generated resume, or any misrepresentation made to a third-party employer.
            </p>
          </section>

        </div>

        <div className="border-t border-neutral-200 mt-10 pt-6 flex justify-between items-center text-xs text-neutral-500">
          <span>Shortlist Legal Operations (India)</span>
          <Link href="/" className="text-neutral-950 font-bold hover:underline">
            Return to Application
          </Link>
        </div>

      </div>
    </div>
  );
}
