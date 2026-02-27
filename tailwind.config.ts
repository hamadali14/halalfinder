import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        body: ['var(--font-body)', 'sans-serif'],
      },
      colors: {
        glass: {
          white: 'rgba(255,255,255,0.12)',
          'white-strong': 'rgba(255,255,255,0.22)',
          border: 'rgba(255,255,255,0.18)',
          'border-strong': 'rgba(255,255,255,0.32)',
          dark: 'rgba(0,0,0,0.08)',
        },
        halal: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        accent: {
          gold: '#d4af37',
          'gold-light': '#f5d769',
          'gold-dark': '#b8962e',
        },
      },
      backdropBlur: {
        glass: '20px',
        'glass-sm': '12px',
      },
      boxShadow: {
        glass: '0 8px 32px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.2)',
        'glass-lg': '0 20px 60px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.25)',
        'glass-hover': '0 16px 48px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.3)',
        glow: '0 0 24px rgba(34,197,94,0.3)',
        'glow-gold': '0 0 24px rgba(212,175,55,0.4)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.4s ease-out forwards',
        shimmer: 'shimmer 1.5s infinite',
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
