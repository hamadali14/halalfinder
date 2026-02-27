import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'HalalFinder — Discover Verified Halal Restaurants',
  description: 'Find certified halal restaurants near you. Community-trusted, verified, and always up to date.',
  keywords: 'halal restaurant, halal food, halal certified, muslim friendly restaurant',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script dangerouslySetInnerHTML={{
          __html: `
            try {
              const theme = localStorage.getItem('theme');
              if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                document.documentElement.classList.add('dark');
              }
            } catch(e) {}
          `
        }} />
      </head>
      <body className="mesh-bg min-h-screen">
        <Header />
        <main className="relative z-10 pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
