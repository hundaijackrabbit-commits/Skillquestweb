import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2 } from 'lucide-react';
import { GLOSSARY_ENTRIES, getGlossaryEntry } from '@/lib/glossary';
import { absoluteUrl } from '@/lib/site';
import { breadcrumbList } from '@/lib/seo';

type Props = { params: Promise<{ slug: string }> };
const nextResources: Record<string, { href: string; label: string }> = {
  'Learning science': { href: '/learn', label: 'Practise in the Learning Lab' },
  'Skills & careers': { href: '/skills', label: 'Explore practical skill guides' },
  'AI & technology': { href: '/topics/ai-era', label: 'Explore AI and automation skills' },
  'Reasoning & work': { href: '/topics/critical-thinking', label: 'Explore critical thinking skills' },
};

export function generateStaticParams() {
  return GLOSSARY_ENTRIES.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const entry = getGlossaryEntry(slug);
  if (!entry) return { title: 'Term Not Found' };
  return {
    title: `What Is ${entry.title}? Definition and Example`,
    description: entry.definition,
    alternates: { canonical: `/glossary/${slug}` },
    openGraph: { title: `${entry.title} | Knowledge Dictionary`, description: entry.definition, url: absoluteUrl(`/glossary/${slug}`), type: 'article' },
  };
}

export default async function GlossaryDetailPage({ params }: Props) {
  const { slug } = await params;
  const entry = getGlossaryEntry(slug);
  if (!entry) notFound();
  const url = absoluteUrl(`/glossary/${entry.slug}`);
  const related = GLOSSARY_ENTRIES.filter((candidate) => candidate.slug !== entry.slug && candidate.category === entry.category).slice(0, 4);
  const resource = nextResources[entry.category];
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'DefinedTerm', name: entry.title, description: entry.definition, url, inDefinedTermSet: absoluteUrl('/glossary') },
      breadcrumbList([
        { name: 'Modern Skill Lab', url: absoluteUrl('/') },
        { name: 'Knowledge Dictionary', url: absoluteUrl('/glossary') },
        { name: entry.title, url },
      ]),
    ],
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50/70 to-white py-10 sm:py-14">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="text-sm text-slate-600">
          <Link href="/" className="text-indigo-700 hover:underline">Home</Link> / <Link href="/glossary" className="text-indigo-700 hover:underline">Dictionary</Link> / {entry.title}
        </nav>
        <div className="mt-8">
          <p className="text-xs font-bold uppercase tracking-widest text-indigo-700">{entry.category}</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">{entry.title}</h1>
          <p className="mt-6 rounded-2xl border border-indigo-200 bg-white p-6 text-xl leading-8 text-slate-900 shadow-sm">{entry.definition}</p>
        </div>

        <section className="mt-9" aria-labelledby="why-it-matters">
          <h2 id="why-it-matters" className="text-xl font-bold text-slate-950">Why it matters</h2>
          <p className="mt-3 text-base leading-8 text-slate-700">{entry.whyItMatters}</p>
        </section>
        <section className="mt-9 rounded-2xl bg-emerald-50 p-6" aria-labelledby="example">
          <h2 id="example" className="flex items-center gap-2 text-xl font-bold text-emerald-950">
            <CheckCircle2 className="h-5 w-5" aria-hidden="true" /> Example in practice
          </h2>
          <p className="mt-3 leading-8 text-emerald-950">{entry.example}</p>
        </section>
        {entry.aliases.length > 0 && (
          <p className="mt-6 text-sm leading-6 text-slate-600"><strong>Also described as:</strong> {entry.aliases.join(', ')}.</p>
        )}
        {entry.sourceUrl && (
          <p className="mt-5 text-sm leading-6 text-slate-600">
            Further reading: <a href={entry.sourceUrl} target="_blank" rel="noopener noreferrer"
              className="font-semibold text-indigo-700 underline underline-offset-2">External research or terminology reference</a>.
          </p>
        )}
        <div className="mt-10 flex flex-wrap gap-3 border-t border-slate-200 pt-7">
          <Link href={resource.href} className="inline-flex items-center gap-2 rounded-xl bg-indigo-700 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-800">
            <BookOpen className="h-4 w-4" aria-hidden="true" /> {resource.label}
          </Link>
          <Link href="/glossary" className="inline-flex items-center gap-2 rounded-xl border border-indigo-200 px-4 py-3 text-sm font-semibold text-indigo-700 hover:bg-indigo-50">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> All terms
          </Link>
        </div>
        {related.length > 0 && (
          <section className="mt-12" aria-labelledby="related-terms">
            <h2 id="related-terms" className="text-xl font-bold text-slate-950">Related concepts</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {related.map((item) => (
                <Link key={item.slug} href={`/glossary/${item.slug}`}
                  className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-indigo-800 hover:border-indigo-300 hover:bg-indigo-50">
                  {item.title} <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
