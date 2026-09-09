import type { Metadata } from 'next';
import Script from 'next/script';
import { Geist, Geist_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { SupabaseProvider } from '@/components/providers/supabase-provider';
import { CartesiaNavigationBridge } from '@/components/voice/cartesia-navigation-bridge';
import { NavigationRecovery } from '@/components/voice/navigation-recovery';
import { ResolvedNavigationFallback } from '@/components/voice/resolved-navigation-fallback';
import { SkillGuideOrb } from '@/components/voice/skill-guide-orb';
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/site';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: 'Modern Skill Lab | Practical Skills for Modern Work', template: '%s | Modern Skill Lab' },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: 'Modern Skill Lab Editorial Team' }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: 'education',
  keywords: ['modern skills','practical skills','career skills','professional development','AI literacy','digital skills','communication skills','critical thinking','career development'],
  alternates: { canonical: '/' },
  verification: { google: 'YKFnLTH8rZsMZoTpmT_sUapo_ROnt8Kg4MfQmMIJZ68' },
  openGraph: { title: 'Modern Skill Lab | Practical Skills for Modern Work', description: SITE_DESCRIPTION, type: 'website', locale: 'en_US', url: SITE_URL, siteName: SITE_NAME },
  twitter: { card: 'summary_large_image', title: 'Modern Skill Lab | Practical Skills for Modern Work', description: SITE_DESCRIPTION },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'Organization', '@id': `${SITE_URL}/#organization`, name: SITE_NAME, url: SITE_URL },
    { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, url: SITE_URL, name: SITE_NAME, description: SITE_DESCRIPTION, publisher: { '@id': `${SITE_URL}/#organization` }, inLanguage: 'en' },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-slate-900">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        {adsenseClient && <Script id="adsense-script" async strategy="afterInteractive" crossOrigin="anonymous" src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`} />}
        <SupabaseProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <ResolvedNavigationFallback />
          <CartesiaNavigationBridge />
          <NavigationRecovery />
          <SkillGuideOrb />
        </SupabaseProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
