import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy',
  description: 'How Modern Skill Lab handles account, requested-resource, newsletter, analytics, and advertising data.',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return (
    <div className="bg-white py-16 sm:py-20">
      <article className="mx-auto max-w-3xl px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">Privacy</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900">How Modern Skill Lab handles data</h1>
        <p className="mt-5 text-lg leading-8 text-slate-600">
          Modern Skill Lab collects only the information needed to run member accounts, deliver requested email updates,
          understand which content is useful, and support advertising when it is enabled.
        </p>

        <div className="mt-10 space-y-9 text-sm leading-7 text-slate-700">
          <section>
            <h2 className="text-xl font-semibold text-slate-900">Accounts</h2>
            <p className="mt-2">If you create an account, account and profile information is stored through Supabase. This can include your selected career interests, industries, work-style preferences, strengths, current goal, saved skills, and saved careers. Those answers are used to generate explainable content recommendations inside your private dashboard.</p>
            <p className="mt-2">Practice XP and activity completions are currently stored in the browser and separated by signed-in account identifier. They do not yet synchronize across devices.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900">Requested guides and resources</h2>
            <p className="mt-2">If you request the Career &amp; Life Map, Modern Skill Lab stores the email address, optional name, request source, delivery status, and time needed to send and troubleshoot that resource. The requested guide email is transactional and separate from newsletter consent.</p>
            <p className="mt-2">If you select the optional newsletter checkbox, that choice is also recorded and your email is added to the newsletter list. Leaving it unchecked does not affect guide delivery.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900">Email updates</h2>
            <p className="mt-2">If you join the newsletter, Modern Skill Lab stores your email address, signup source, subscription status, and signup time. You can unsubscribe from future emails when newsletter delivery is active.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900">Site analytics</h2>
            <p className="mt-2">The site uses Vercel Analytics and Speed Insights. Modern Skill Lab also records limited first-party content events such as the page or skill viewed, referral information, a temporary session identifier, and an account identifier when you are signed in. These signals help identify useful and trending content.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900">Advertising</h2>
            <p className="mt-2">Advertising is disabled unless it is deliberately configured. If Google AdSense or another advertising service is enabled later, that provider may use cookies or similar technologies according to its own policies and any consent requirements that apply to a visitor.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900">Service providers</h2>
            <p className="mt-2">Modern Skill Lab relies on infrastructure providers such as Vercel for hosting and analytics, Supabase for authentication and database services, and Resend for requested-resource and transactional email delivery. Data handled by those services is also subject to their applicable privacy and security practices.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900">Changes</h2>
            <p className="mt-2">This page may be updated as the product adds features or changes how data is used. Last updated: August 21, 2026.</p>
          </section>
        </div>

        <div className="mt-12 rounded-2xl bg-slate-50 p-5 text-sm text-slate-600">
          Looking for the public platform? <Link href="/skills" className="font-semibold text-blue-600 hover:text-blue-700">Explore skills</Link>.
        </div>
      </article>
    </div>
  );
}
