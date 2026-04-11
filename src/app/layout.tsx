import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { SupabaseProvider } from '@/components/providers/supabase-provider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Modern Skill Lab | Practical Skills for Modern Work',
  description:
    'Build practical, high-value skills for modern work. Explore career strategy, AI literacy, communication, and digital growth with Modern Skill Lab.',
  keywords:
    'modern skills, practical skills, career strategy, AI literacy, professional development, digital skills, communication skills',
  authors: [{ name: 'Modern Skill Lab Editorial Team' }],
  metadataBase: new URL('https://modernskilllab.space'),
  verification: {
    google: 'YKFnLTH8rZsMZoTpmT_sUapo_ROnt8Kg4MfQmMIJZ68',
  },
  openGraph: {
    title: 'Modern Skill Lab | Practical Skills for Modern Work',
    description:
      'Practical skills, sharper judgment, and career-relevant growth for the modern economy.',
    type: 'website',
    locale: 'en_US',
    url: 'https://modernskilllab.space',
    siteName: 'Modern Skill Lab',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Modern Skill Lab | Practical Skills for Modern Work',
    description:
      'Practical skills, sharper judgment, and career-relevant growth for the modern economy.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-slate-900">
        <SupabaseProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </SupabaseProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}