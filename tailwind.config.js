/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        apple: {
          bg: '#f5f5f7',
          card: '#ffffff',
          dark: '#1d1d1f',
          text: '#1d1d1f',
          secondary: '#86868b',
          blue: '#0071e3',
          blueHover: '#0077ed',
          border: '#d2d2d7',
          borderLight: '#e5e5ea',
        }
      },
      fontFamily: {
        sans: [
          '"Inter"',
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Display"',
          '"SF Pro Text"',
          '"Plus Jakarta Sans"',
          'system-ui',
          'sans-serif'
        ],
        mono: [
          '"SF Mono"',
          'ui-monospace',
          'Menlo',
          'monospace'
        ],
      },
      keyframes: {
        floatSlow: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) scale(1)' },
          '50%': { transform: 'translate3d(24px, -24px, 0) scale(1.08)' },
        },
        floatReverse: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) scale(1)' },
          '50%': { transform: 'translate3d(-28px, 18px, 0) scale(0.94)' },
        },
        liquidPulse: {
          '0%, 100%': { opacity: '0.45', transform: 'scale(1)' },
          '50%': { opacity: '0.65', transform: 'scale(1.06)' },
        },
        appleFadeUp: {
          '0%': { opacity: '0', transform: 'translate3d(0, 20px, 0)' },
          '100%': { opacity: '1', transform: 'translate3d(0, 0, 0)' },
        },
        appleScale: {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        }
      },
      animation: {
        floatSlow: 'floatSlow 9s ease-in-out infinite',
        floatReverse: 'floatReverse 11s ease-in-out infinite',
        liquidPulse: 'liquidPulse 7s ease-in-out infinite',
        appleFadeUp: 'appleFadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        appleScale: 'appleScale 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      }
    },
  },
  plugins: [],
}
