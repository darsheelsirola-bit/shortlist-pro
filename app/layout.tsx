import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shortlist — Get on the Shortlist with Precision ATS Optimization',
  description: 'Every job opening receives 250+ resumes. Only 5 get shortlisted. Shortlist audits your resume against target ATS algorithms and upgrades your metrics to guarantee recruiter visibility.',
};

import { AuthProvider } from '@/components/AuthContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth bg-[#FBFBFA] text-neutral-900">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" 
          rel="stylesheet" 
        />
        {/* Smooth Monogram SVG Favicon */}
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' fill='none'><rect width='32' height='32' rx='10' fill='%230a0a0a'/><path d='M21 11C21 9.34 19.65 8 18 8H13C10.79 8 9 9.79 9 12C9 14.2 10.79 16 13 16H19C21.2 16 23 17.79 23 20C23 22.2 21.2 24 19 24H14C12.34 24 11 22.65 11 21' stroke='white' stroke-width='2.6' stroke-linecap='round' stroke-linejoin='round'/><circle cx='21' cy='9' r='1.5' fill='white'/><circle cx='11' cy='23' r='1.5' fill='white'/></svg>" />
      </head>
      <body className="antialiased selection:bg-neutral-950 selection:text-white font-sans bg-[#FBFBFA] text-neutral-900 min-h-screen">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
