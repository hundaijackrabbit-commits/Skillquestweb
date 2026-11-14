import type { Metadata } from 'next';
import Link from 'next/link';
import { TranslatedText as T } from '@/components/providers/learning-language-provider';
import { notFound } from 'next/navigation';
import { ArrowLeft, Clock3, FileText, Sparkles } from 'lucide-react';
import { getAllWorkshops, getWorkshop } from '@/lib/workshops';
import { GamificationAccessGate } from '@/components/learning/gamification-access-gate';
import { WorkshopRunner } from '@/components/learning/workshop-runner';
import { LearningTranslationPanel } from '@/components/learning/learning-translation-panel';

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return getAllWorkshops().map((workshop) => ({ slug: workshop.slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const workshop = getWorkshop(slug);
  if (!workshop) return { title: 'Workshop Not Found' };
  return {
    title: `${workshop.title} | Practice Lab`,
    description: workshop.description,
    alternates: { canonical: `/learn/workshops/${slug}` },
  };
}
export default async function WorkshopPage({ params }: Props) {
  const { slug } = await params;
  const workshop = getWorkshop(slug);
  if (!workshop) notFound();
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50/50 to-white py-10">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <Link href="/learn#workshops" className="inline-flex items-center gap-2 text-sm font-bold text-indigo-700 hover:text-indigo-900"><ArrowLeft className="h-4 w-4" /> <T text="All guided workshops" /></Link>
        <header className="mt-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-3 py-1.5 text-xs font-bold text-violet-800"><Sparkles className="h-4 w-4" /> <T text="Guided workshop" /></span>
            <span className="inline-flex items-center gap-1.5 text-sm text-slate-600"><Clock3 className="h-4 w-4" /> About {workshop.estimatedMinutes} minutes</span>
            <span className="text-sm font-semibold text-slate-500">{workshop.skillName}</span>
          </div>
          <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-950 sm:text-5xl">{workshop.title}</h1>
          <p className="mt-4 text-lg leading-8 text-slate-600">{workshop.description}</p>
        </header>
        <section className="my-9 rounded-3xl bg-slate-950 p-6 text-white sm:p-8">
          <p className="text-xs font-bold uppercase tracking-wider text-cyan-300"><T text="The situation" /></p>
          <p className="mt-3 text-base leading-7 text-slate-100">{workshop.scenario}</p>
          <LearningTranslationPanel material={[
            `Workshop: ${workshop.title}`,
            `Description: ${workshop.description}`,
            `Situation: ${workshop.scenario}`,
            `Deliverable: ${workshop.deliverable}`,
          ].join('\n\n')} />
          <div className="mt-5 flex items-start gap-3 rounded-2xl bg-white/10 p-4">
            <FileText className="mt-1 h-5 w-5 shrink-0 text-cyan-300" />
            <div><div className="text-sm font-bold"><T text="What you will create" /></div><p className="mt-1 text-sm leading-6 text-slate-200">{workshop.deliverable}</p></div>
          </div>
        </section>
        <GamificationAccessGate featureName={workshop.title} description="Create a free account to draft a work sample, revisit it, and earn a single self-assessed workshop completion. Drafts stay in this browser.">
          <WorkshopRunner workshop={workshop} />
        </GamificationAccessGate>
        <footer className="mt-10 border-t border-slate-200 pt-6 text-xs leading-6 text-slate-600">
          <p><strong>Workshop method:</strong> create, compare, reflect, then revisit. Examples are illustrative, and self-review criteria are not automatically graded. For research on active practice and feedback, see the <a className="text-indigo-700 underline" href="https://www.cdc.gov/training-development/php/qts/">CDC Quality Training Standards</a> and the <a className="text-indigo-700 underline" href="https://doi.org/10.1038/s44159-022-00089-1">review on retrieval and spaced practice</a>.</p>
        </footer>
      </div>
    </div>
  );
}
