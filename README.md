# Shortlist 

<div align="center">

[![Live Production](https://img.shields.io/badge/Live%20Website-craftats--ai.vercel.app-0071e3?style=for-the-badge&logo=vercel&logoColor=white)](https://craftats-ai.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Auth%20&%20DB-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](./LICENSE)

**Precision ATS Resume Optimization & Executive Bullet Re-Writer Micro-SaaS**

*Every job opening gets 250+ resumes. Only 5 get shortlisted. Shortlist audits your resume against target ATS algorithms and upgrades your metrics to guarantee recruiter visibility.*

[**Explore Live Website**](https://craftats-ai.vercel.app) • [**Report Bug**](https://github.com/darsheelsirola-bit/shortlist-pro/issues) • [**Request Feature**](https://github.com/darsheelsirola-bit/shortlist-pro/issues)

<br/>

<img src="./public/shortlist_ad_poster.jpg" alt="SHORTLIST Poster" width="340" style="border-radius: 24px; box-shadow: 0 20px 40px rgba(0,0,0,0.15);" />

</div>

---

## ✨ Features

###  1. Apple Official Design Aesthetic
- **Porcelain Canvas (`#f5f5f7`)**: Official Apple light background with natural tactile contrast.
- **VisionOS Translucent Glass**: Multi-layered `.liquid-glass` cards featuring `backdrop-filter: blur(32px) saturate(190%)` and micro-beveled borders.
- **Razor-Sharp Typography**: Global font stack prioritizing **Inter** (300 to 900), **Plus Jakarta Sans**, and Apple San Francisco fallbacks with `-webkit-font-smoothing: antialiased` and optical tracking.
- **Ambient Chromatic Light Orbs**: Floating fluid gradients behind translucent cards that refract gently on scroll.
- **Apple Health Activity Gauge**: Interactive circular gauge visualizing real-time ATS match scoring from 0% to 100%.

### 🔐 2. Complete Supabase Backend Authentication
- **Full Supabase Integration**: Built on `@supabase/supabase-js` with token session persistence.
- **Sign in with Google**: 1-click Google OAuth authentication with redirect callback exchange.
- **Sign in with GitHub**: 1-click GitHub OAuth authentication for software engineers & tech leaders.
- **Email & Password Authentication**: Instant signup & signin with 5 free welcome credits on signup.
- **Instant Guest Mode**: 1-click demo access for recruiters and candidates to test the workstation immediately without forced friction.

### 🔍 3. Google Search Discoverability & Production SEO
- **Dynamic Sitemap (`/sitemap.xml`)**: Automated Next.js `app/sitemap.ts` mapping all canonical pages with update priorities.
- **Search Engine Directive (`/robots.txt`)**: Automated `app/robots.ts` directing Googlebot and Bingbot to index all public routes.
- **JSON-LD Schema.org Structured Data**:
  - `WebApplication` / `SoftwareApplication` entity with 4.9/5 aggregate user rating.
  - `FAQPage` rich snippet schema triggering Google expandable search card questions.
  - `Organization` and `WebSite` metadata linking site entities.
- **OpenGraph & Twitter Cards**: High-resolution social previews for LinkedIn, Twitter, and iMessage.

### 🎯 4. Deterministic ATS Optimization Engine
- **Exact Keyword Gap Analysis**: Scans input job descriptions for hard skills, technical competencies, and domain keywords; calculates true mathematical match ratios.
- **Google X-Y-Z Bullet Re-Writer**: Transforms passive bullets into high-impact accomplishments using Google's formula: *"Accomplished [X], as measured by [Y], by doing [Z]"*.
- **Interactive Before & After Diff**: Side-by-side comparison tab highlighting upgraded metrics and quantified impact.
- **Click-to-Insert Keyword Badges**: Single-tap insertion of missing skills directly into the resume draft.
- **1-Click Plain-Text Export**: Generates and downloads a clean, ATS-safe `.txt` resume that parses without formatting errors on Workday, Greenhouse, Taleo, and Lever.

### ⚡ 5. Automated Razorpay Verification & Direct UPI
- **Automated Razorpay Gateway Verification**: Cryptographic HMAC-SHA256 signature verification via `/api/razorpay/verify` guarantees zero forged or unverified payments.
- **Instant Credit Activation**: Automatic activation immediately upon checkout completion across Google Pay, PhonePe, Paytm, BHIM, RuPay/Visa/Mastercard cards, and Netbanking.
- **Direct VPA-to-VPA Transfer Option**: Direct UPI option with QR code to **`darsheel.sirola@fam`** with gateway verification.
- **Dynamic Scannable QR Code**: Generates instant QR codes pre-encoded with the selected amount and receiving VPA.
- **Ultra-Affordable INR Micro-Pricing**:
  - **₹49** one-time: 15 full ATS Audits (~₹3.20/audit)
  - **₹99 / month**: Unlimited Pro access

### 🛡️ 6. Comprehensive Legal Shield
- **[Terms of Service](./app/terms/page.tsx)**:
  - Capped maximum liability strictly at ₹99.00 INR.
  - Explicit "No Employment Guarantee" disclaimer protecting against hiring outcome claims.
  - Mandatory individual binding arbitration.
  - Trademark fair-use disclaimers for mentioned ATS platforms (Workday, Taleo, Greenhouse, etc.).
- **[Privacy Policy](./app/privacy/page.tsx)**:
  - Ephemeral data processing disclosures with strict "No Data Selling" pledge.

### 🎬 7. Interactive Video Advertising Studio (`/promo`)
- In-app 9:16 vertical Reel/Short and 16:9 landscape motion graphics video generator.
- Native browser `MediaRecorder` + HTML5 Canvas video export (`.webm`) at 1080x1920.
- Web Audio API synthesizer generating real-time cinematic bass booms, chimes, and radar sound effects.

---

## 🛠️ Supabase Configuration Guide

To connect your own Supabase project:

1. **Create a free project** on [Supabase](https://supabase.com).
2. Go to **Project Settings** -> **API** and copy:
   - `Project URL` -> Set as `NEXT_PUBLIC_SUPABASE_URL`
   - `anon / public key` -> Set as `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. In **Authentication** -> **URL Configuration**:
   - Set **Site URL** to: `https://craftats-ai.vercel.app` (or your domain)
   - Add **Redirect URL**: `https://craftats-ai.vercel.app/auth/callback` and `http://localhost:3000/auth/callback`
4. Enable **Google Provider**:
   - Go to **Authentication** -> **Providers** -> **Google**.
   - Paste your Google Cloud OAuth Client ID & Secret.
5. Enable **GitHub Provider**:
   - Go to **Authentication** -> **Providers** -> **GitHub**.
   - Create a GitHub OAuth App in GitHub Developer Settings and paste Client ID & Client Secret.

---

## 🔍 How to Get Shortlist Indexed on Google Search

Shortlist is configured with full search engine discoverability. To get indexed immediately by Google:

1. **Open Google Search Console**:
   - Visit [search.google.com/search-console](https://search.google.com/search-console).
   - Enter your domain or URL prefix: `https://craftats-ai.vercel.app`.
2. **Verify Ownership**:
   - Copy the HTML tag verification token (`content="XXXX"`).
   - Add it to your Vercel Environment Variables as `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION="XXXX"`.
3. **Submit Sitemap**:
   - Under the **Sitemaps** section in Google Search Console, submit `sitemap.xml`.
   - Googlebot will immediately crawl `/`, `/app`, `/pricing`, `/login`, and `/signup`.
4. **URL Inspection**:
   - Paste `https://craftats-ai.vercel.app` in the top search bar and click **Request Indexing**.

---

## 📁 Repository Structure

```text
shortlist-pro/
├── .github/
│   └── workflows/
│       └── ci.yml             # GitHub Actions CI build & type-check
├── app/
│   ├── api/
│   │   ├── checkout/
│   │   │   └── route.ts       # Stripe fallback checkout route
│   │   ├── razorpay/
│   │   │   ├── order/         # Razorpay order generation
│   │   │   ├── verify/        # HMAC-SHA256 signature verification
│   │   │   └── qr/            # Dynamic UPI QR generation & status
│   │   └── tailor/
│   │       └── route.ts       # Deterministic ATS keyword analyzer & re-writer
│   ├── app/
│   │   └── page.tsx           # Dedicated Executive ATS Workstation & UPI modal
│   ├── auth/
│   │   └── callback/
│   │       └── route.ts       # Supabase OAuth token exchange callback
│   ├── login/
│   │   └── page.tsx           # Google, GitHub & Email Sign In
│   ├── signup/
│   │   └── page.tsx           # Google, GitHub & Email Registration (+5 Free Credits)
│   ├── privacy/
│   │   └── page.tsx           # Privacy Policy with ephemeral processing disclosures
│   ├── promo/
│   │   └── page.tsx           # Interactive 9:16 & 16:9 Ad Studio & Video Generator
│   ├── terms/
│   │   └── page.tsx           # Terms of Service & legal liability shield
│   ├── globals.css            # VisionOS liquid glass, Apple styling & typography
│   ├── layout.tsx             # Root layout, SEO metadata, JSON-LD schema, AuthProvider
│   ├── robots.ts              # Robots.txt crawler directives
│   ├── sitemap.ts             # Dynamic XML sitemap generator
│   └── page.tsx               # Dedicated Apple-style Product Landing Page
├── components/
│   ├── AuthContext.tsx        # Persistent Supabase session & credits state
│   └── Logo.tsx               # Scalable Apple-style SVG monogram logo
├── lib/
│   └── supabase.ts            # Supabase client singleton with build fallback
├── public/
│   └── shortlist_ad_poster.jpg # 9:16 vertical advertisement artwork
├── .env.example               # Environment variables template
├── .gitignore                 # Next.js & Node.js ignore rules
├── LICENSE                    # MIT License
├── package.json               # Dependencies & project scripts
└── tsconfig.json              # TypeScript configuration
```

---

## 🚀 Getting Started Locally

### Prerequisites
- **Node.js**: v18.17.0 or newer
- **npm**: v9 or newer

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/darsheelsirola-bit/shortlist-pro.git
   cd shortlist-pro
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   ```bash
   cp .env.example .env.local
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open in browser:**
   Navigate to [http://localhost:3000](http://localhost:3000).

---

## 🌐 Production Deployment (Vercel)

This application is built with Next.js App Router and deploys to **Vercel** with zero configuration:

1. Push your changes to the `main` branch:
   ```bash
   git push origin main
   ```
2. Connect your repository on [vercel.com](https://vercel.com/new).
3. Add production environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`: (your Supabase URL)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: (your Supabase anon key)
   - `NEXT_PUBLIC_MERCHANT_UPI_ID`: `darsheel.sirola@fam`
4. Deploy! Your site will be live globally with automatic SSL.

---

## 📜 License

Distributed under the **MIT License**. See [`LICENSE`](./LICENSE) for more information.

<div align="center">
  <sub>Designed for candidate excellence. Built with precision for <strong>SHORTLIST</strong>.</sub>
</div>
