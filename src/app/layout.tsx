import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SupabaseProvider } from "@/components/providers/supabase-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SkillQuest - Professional Skills Repository & Career Intelligence",
  description:
    "Evidence-backed skill development and career intelligence for ambitious professionals. Navigate your career with confidence in today's evolving economy.",
  keywords:
    "professional skills, career development, skill building, job skills, career intelligence, professional development",
  authors: [{ name: "SkillQuest Team" }],
  verification: {
    google: "YKFnLTH8rZsMZoTpmT_sUapo_ROnt8Kg4MfQmMIJZ68",
  },
  openGraph: {
    title: "SkillQuest - Professional Skills Repository",
    description: "Evidence-backed skill development for today's economy",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "SkillQuest - Professional Skills Repository",
    description: "Evidence-backed skill development for today's economy",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
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