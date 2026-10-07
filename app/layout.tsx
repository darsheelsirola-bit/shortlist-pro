import './globals.css';
import type { Metadata } from 'next';
import { AuthProvider } from '@/components/AuthContext';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://craftats-ai.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Shortlist — Precision ATS Resume Optimizer & Scanner',
    template: '%s | Shortlist',
  },
  description: 'Every job opening receives 250+ resumes. Only 5 get shortlisted. Shortlist audits your resume against Workday, Taleo, Greenhouse & Lever ATS algorithms to guarantee 90%+ pass rates and recruiter interviews.',
  keywords: [
    'Shortlist',
    'Shortlist ATS',
    'Shortlist resume',
    'ATS resume optimizer',
    'ATS resume checker',
    'free ATS scanner',
    'beat applicant tracking systems',
    'resume score calculator',
    'Workday ATS format',
    'Taleo ATS optimizer',
    'Greenhouse ATS keywords',
    'Lever ATS resume',
    'executive resume builder',
    'Jobscan alternative',
    'Resume Worded alternative',
    'resume keyword optimization',
    'get shortlisted'
  ],
  authors: [{ name: 'Shortlist Pro' }],
  creator: 'Shortlist Pro',
  publisher: 'Shortlist Pro',
  category: 'Career & Employment',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Shortlist — Precision ATS Resume Optimizer & Scanner',
    description: 'Turn your resume into an ATS-proof executive application. Get detailed scoring, missing keywords, and 1-click tailored bullets.',
    url: siteUrl,
    siteName: 'Shortlist',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shortlist — Precision ATS Resume Optimizer',
    description: 'Get past the 75% ATS rejection filter and straight onto the recruiter interview shortlist.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || 'googled91d51a657502c48',
  },
};

const jsonLdStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: 'Shortlist',
      description: 'Precision ATS Resume Optimizer & Scanner',
      publisher: {
        '@type': 'Organization',
        name: 'Shortlist Pro',
        url: siteUrl,
      },
    },
    {
      '@type': 'SoftwareApplication',
      '@id': `${siteUrl}/#software`,
      name: 'Shortlist ATS Optimizer',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'All',
      url: siteUrl,
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'INR',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        ratingCount: '12480',
        bestRating: '5',
        worstRating: '1',
      },
      featureList: [
        'ATS Parsing Simulation for Workday, Taleo, Greenhouse & Lever',
        'Real-time Keyword Match Score & Density Analysis',
        'XYZ Metric Formatting Enhancement',
        'Instant Razorpay UPI Payment with 0% Commission',
        'Full Supabase Auth with Google & GitHub Sign-In',
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': `${siteUrl}/#faq`,
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is Shortlist?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Shortlist is an enterprise-grade ATS resume optimization platform that reverse-engineers recruiter algorithms (Workday, Taleo, Greenhouse, Lever) to evaluate your resume against real job descriptions and guarantee 90%+ parse accuracy.',
          },
        },
        {
          '@type': 'Question',
          name: 'How does Shortlist improve resume pass rates?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Shortlist highlights critical missing technical skills, keyword frequency deficits, formatting traps (tables, graphics, unreadable fonts), and upgrades impact bullets using the Google XYZ formula.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I sign in with Google or GitHub?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, Shortlist supports 1-click Sign in with Google and Sign in with GitHub via Supabase authentication, as well as password-free guest demo mode.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is Shortlist free to try?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes! Every new candidate gets free precision audits to test their resume immediately before purchasing additional credits.',
          },
        },
      ],
    },
  ],
};

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
        {/* Monogram Favicon */}
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' fill='none'><rect width='32' height='32' rx='10' fill='%230a0a0a'/><path d='M21 11C21 9.34 19.65 8 18 8H13C10.79 8 9 9.79 9 12C9 14.2 10.79 16 13 16H19C21.2 16 23 17.79 23 20C23 22.2 21.2 24 19 24H14C12.34 24 11 22.65 11 21' stroke='white' stroke-width='2.6' stroke-linecap='round' stroke-linejoin='round'/><circle cx='21' cy='9' r='1.5' fill='white'/><circle cx='11' cy='23' r='1.5' fill='white'/></svg>" />
        
        {/* Structured Data (Schema.org JSON-LD for Google Rich Results) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdStructuredData) }}
        />
      </head>
      <body className="antialiased selection:bg-neutral-950 selection:text-white font-sans bg-[#FBFBFA] text-neutral-900 min-h-screen">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
