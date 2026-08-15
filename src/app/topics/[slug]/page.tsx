import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, BookOpen, Briefcase, Building2, Compass, FileText, Route } from 'lucide-react';
import { Breadcrumbs } from '@/components/navigation/breadcrumbs';
import { SkillDirectoryCard } from '@/components/skills/skill-directory-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { absoluteUrl } from '@/lib/site';
import { breadcrumbList } from '@/lib/seo';
import { getTopicBySlug, getTopicContent, TOPICS } from '@/lib/topics';
import { KnowledgeCheckCard } from '@/components/learning/knowledge-check-card';
import { buildDefinitionKnowledgeCheck } from '@/lib/knowledge-checks';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return TOPICS.map((topic) => ({ slug: topic.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const topic = getTopicBySlug((await params).slug);
  if (!topic) return { title: 'Topic Not Found' };
  return {
    title: `${topic.name} Skills, Paths & Careers`,
    description: topic.description,
    alternates: { canonical: `/topics/${topic.slug}` },
    openGraph: {
      title: `${topic.name} Skills | Modern Skill Lab`,
      description: topic.description,
      url: absoluteUrl(`/topics/${topic.slug}`),
    },
  };
}

export default async function TopicHubPage({ params }: Props) {
  const topic = getTopicBySlug((await params).slug);
  if (!topic) notFound();
  const content = await getTopicContent(topic.slug);
  const canonicalUrl = absoluteUrl(`/topics/${topic.slug}`);
  const topicCheck = buildDefinitionKnowledgeCheck(
    { type: 'topic', slug: topic.slug, name: topic.name },
    content.skills,
  );
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        name: `${topic.name} skills`,
        description: topic.description,
        url: canonicalUrl,
        mainEntity: {
          '@type': 'ItemList',
          numberOfItems: content.skills.length,
          itemListElement: content.skills.slice(0, 20).map((skill, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: skill.name,
            url: absoluteUrl(`/skills/${skill.slug}`),
          })),
        },
      },
      breadcrumbList([
        { name: 'Modern Skill Lab', url: absoluteUrl('/') },
        { name: 'Topics', url: absoluteUrl('/topics') },
        { name: topic.name, url: canonicalUrl },
      ]),
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50/50 via-white to-white py-10 sm:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Topics', href: '/topics' }, { label: topic.name }]} />

        <header className="mt-9 overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-950 via-indigo-950 to-blue-950 p-8 text-white shadow-xl sm:p-11">
          <div className="inline-flex items-center rounded-full bg-white/10 px-3 py-1.5 text-sm font-semibold text-indigo-100">
            <Compass aria-hidden="true" className="mr-2 h-4 w-4" /> Connected topic hub
          </div>
          <h1 className="mt-5 max-w-4xl text-4xl font-bold tracking-tight sm:text-6xl">{topic.name}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-indigo-100">{topic.description}</p>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-indigo-200">{topic.startingPoint}</p>
          <div className="mt-7 flex flex-wrap gap-3 text-sm font-semibold text-indigo-100">
            <span className="rounded-full bg-white/10 px-3 py-1.5">Practical skill guides</span>
            <span className="rounded-full bg-white/10 px-3 py-1.5">Connected learning paths</span>
            <span className="rounded-full bg-white/10 px-3 py-1.5">Career applications</span>
          </div>
        </header>

        <main>
          {topicCheck && <KnowledgeCheckCard check={topicCheck} className="mt-12" />}

          <section className="mt-14" aria-labelledby="topic-skills">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-indigo-700">Build the foundation</p>
                <h2 id="topic-skills" className="mt-2 text-3xl font-bold text-slate-950">Skills worth starting with</h2>
              </div>
              <Link href={`/skills/search?category=${topic.slug}`} className="text-sm font-semibold text-indigo-700">Browse every guide in this topic →</Link>
            </div>
            <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {content.skills.slice(0, 12).map((skill) => <SkillDirectoryCard key={skill.slug} skill={skill} />)}
            </div>
          </section>

          {content.paths.length > 0 && (
            <section className="mt-16" aria-labelledby="topic-paths">
              <div className="flex items-center gap-3"><Route aria-hidden="true" className="h-6 w-6 text-blue-700" /><h2 id="topic-paths" className="text-3xl font-bold text-slate-950">Follow a learning path</h2></div>
              <div className="mt-7 grid gap-5 lg:grid-cols-2">
                {content.paths.map((path) => (
                  <Card key={path.id} className="rounded-2xl border-slate-200">
                    <CardHeader>
                      <div className="flex items-center justify-between gap-3"><Badge variant="outline" className="capitalize">{path.difficulty}</Badge><span className="text-sm text-slate-500">{path.estimatedTime}</span></div>
                      <CardTitle className="text-2xl">{path.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm leading-6 text-slate-600">{path.description}</p>
                      <Link href={`/paths/${path.id}`} className="mt-5 inline-flex items-center text-sm font-semibold text-blue-700">Open path <ArrowRight aria-hidden="true" className="ml-1.5 h-4 w-4" /></Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}

          <div className="mt-16 grid gap-10 lg:grid-cols-2">
            {content.careers.length > 0 && (
              <section aria-labelledby="topic-careers">
                <div className="flex items-center gap-3"><Briefcase aria-hidden="true" className="h-6 w-6 text-violet-700" /><h2 id="topic-careers" className="text-3xl font-bold text-slate-950">Careers using this stack</h2></div>
                <div className="mt-6 space-y-3">
                  {content.careers.map((career) => (
                    <Link key={career.slug} href={`/careers/${career.slug}`} className="block rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-violet-300 hover:shadow-sm">
                      <h3 className="font-bold text-slate-950">{career.title}</h3>
                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">{career.summary}</p>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {content.industries.length > 0 && (
              <section aria-labelledby="topic-industries">
                <div className="flex items-center gap-3"><Building2 aria-hidden="true" className="h-6 w-6 text-emerald-700" /><h2 id="topic-industries" className="text-3xl font-bold text-slate-950">Where the skills are applied</h2></div>
                <div className="mt-6 space-y-3">
                  {content.industries.map((industry) => (
                    <Link key={industry.slug} href={`/industries/${industry.slug}`} className="block rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-emerald-300 hover:shadow-sm">
                      <h3 className="font-bold text-slate-950">{industry.name}</h3>
                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">{industry.description}</p>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>

          {content.posts.length > 0 && (
            <section className="mt-16" aria-labelledby="topic-articles">
              <div className="flex items-center gap-3"><FileText aria-hidden="true" className="h-6 w-6 text-amber-700" /><h2 id="topic-articles" className="text-3xl font-bold text-slate-950">Go deeper with an article</h2></div>
              <div className="mt-7 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {content.posts.map((post) => (
                  <Link key={post.slug} href={`/blog/${post.slug}`} className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-amber-300 hover:shadow-sm">
                    <span className="text-xs font-semibold uppercase tracking-wide text-amber-700">{post.readTime} min read</span>
                    <h3 className="mt-2 text-lg font-bold text-slate-950">{post.title}</h3>
                    <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">{post.excerpt}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <section className="mt-16 flex flex-col gap-5 rounded-3xl border border-indigo-200 bg-indigo-50 p-7 sm:p-9 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl"><h2 className="text-2xl font-bold text-slate-950">Ready to choose one skill?</h2><p className="mt-2 leading-7 text-slate-600">Use the filtered directory to compare every editorial-ready guide in this topic.</p></div>
            <Link href={`/skills/search?category=${topic.slug}`}><Button size="lg"><BookOpen aria-hidden="true" className="mr-2 h-4 w-4" />Browse {topic.name}</Button></Link>
          </section>
        </main>
      </div>
    </div>
  );
}
