import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PortraitIntroVideo } from '@/components/marketing/portrait-intro-video';
import { INTRO_VIDEO } from '@/lib/video-intro';
import { absoluteUrl, SITE_NAME } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Introduction Video: Practical Skills, Careers & Learning Paths',
  description: INTRO_VIDEO.description,
  alternates: { canonical: INTRO_VIDEO.watchPath },
  openGraph: {
    type: 'website',
    url: absoluteUrl(INTRO_VIDEO.watchPath),
    title: INTRO_VIDEO.title,
    description: INTRO_VIDEO.description,
    images: [{ url: absoluteUrl(INTRO_VIDEO.posterPath), width: 512, height: 910, alt: 'Modern Skill Lab introduction video thumbnail' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: INTRO_VIDEO.title,
    description: INTRO_VIDEO.description,
    images: [absoluteUrl(INTRO_VIDEO.posterPath)],
  },
};

const videoStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'VideoObject',
  '@id': `${absoluteUrl(INTRO_VIDEO.watchPath)}#video`,
  name: INTRO_VIDEO.title,
  description: INTRO_VIDEO.description,
  thumbnailUrl: [absoluteUrl(INTRO_VIDEO.posterPath)],
  uploadDate: INTRO_VIDEO.publishedAt,
  duration: INTRO_VIDEO.duration,
  contentUrl: absoluteUrl(INTRO_VIDEO.videoPath),
  isAccessibleForFree: true,
  inLanguage: 'en',
  publisher: { '@type': 'Organization', name: SITE_NAME, url: absoluteUrl('/') },
  mainEntityOfPage: absoluteUrl(INTRO_VIDEO.watchPath),
};

export default function ModernSkillLabIntroVideoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoStructuredData) }}
      />
      <article className="bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950 px-6 py-12 text-white sm:py-16">
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">Meet Modern Skill Lab</p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">Build skills that move you forward.</h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-200">{INTRO_VIDEO.description}</p>
          </div>
          <div className="mt-9 flex justify-center">
            <PortraitIntroVideo />
          </div>
          <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-white/15 bg-white/5 p-6 sm:p-8">
            <h2 className="text-xl font-semibold">What you can explore next</h2>
            <p className="mt-3 leading-7 text-slate-200">
              Modern Skill Lab connects practical skills to career paths and meaningful activities. Whether you are exploring a new direction or strengthening your abilities, you can take the next step at your own pace.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/skills" className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-100">Explore skills <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
              <Link href="/careers" className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/40 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10">Discover careers <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
              <Link href="/learn" className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/40 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10">Try the Practice Lab <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
