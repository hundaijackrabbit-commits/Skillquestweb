import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  CheckCircle2,
  Clock3,
  GraduationCap,
  Route,
  Sparkles,
  Target,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  getSkillPathBySlug,
  getSkillPaths,
  resolveCareerReferences,
  resolveSkillReferences,
} from '@/lib/content';
import { getSkillCourse } from '@/lib/courses';
import { absoluteUrl } from '@/lib/site';
import { breadcrumbList } from '@/lib/seo';
import { Breadcrumbs } from '@/components/navigation/breadcrumbs';
import { isSkillPathIndexable } from '@/lib/content-quality';
import { KnowledgeCheckCard } from '@/components/learning/knowledge-check-card';
import { buildDefinitionKnowledgeCheck } from '@/lib/knowledge-checks';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const paths = await getSkillPaths();
  return paths.filter(isSkillPathIndexable).map((path) => ({ slug: path.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const path = await getSkillPathBySlug(slug);
  if (!path) return { title: 'Learning Path Not Found' };
  return {
    title: `${path.name}: Learning Path`,
    description: path.description,
    alternates: { canonical: `/paths/${path.id}` },
    robots: { index: isSkillPathIndexable(path), follow: true },
    openGraph: {
      title: `${path.name} | Modern Skill Lab`,
      description: path.description,
      type: 'article',
      url: absoluteUrl(`/paths/${path.id}`),
    },
  };
}

export default async function SkillPathDetailPage({ params }: Props) {
  const { slug } = await params;
  const path = await getSkillPathBySlug(slug);
  if (!path) notFound();

  const [skills, careers] = await Promise.all([
    resolveSkillReferences(path.skills),
    resolveCareerReferences(path.relatedCareers),
  ]);
  const canonicalUrl = absoluteUrl(`/paths/${path.id}`);
  const pathCheck = buildDefinitionKnowledgeCheck(
    { type: 'path', slug: path.id, name: path.name },
    skills,
  );
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ItemList',
        name: path.name,
        description: path.description,
        url: canonicalUrl,
        numberOfItems: skills.length,
        itemListElement: skills.map((skill, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: skill.name,
          url: absoluteUrl(`/skills/${skill.slug}`),
        })),
      },
      breadcrumbList([
        { name: 'Modern Skill Lab', url: absoluteUrl('/') },
        { name: 'Learning Paths', url: absoluteUrl('/paths') },
        { name: path.name, url: canonicalUrl },
      ]),
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/40 to-white py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }}
      />
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Learning Paths', href: '/paths' }, { label: path.name }]} />

        <header className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-950 via-blue-950 to-violet-950 p-8 text-white shadow-xl sm:p-11">
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <Badge className="bg-white/10 text-blue-100">{path.difficulty} path</Badge>
            <span className="inline-flex items-center text-sm text-blue-200">
              <Clock3 className="mr-1.5 h-4 w-4" />
              {path.estimatedTime}
            </span>
            <span className="inline-flex items-center text-sm text-blue-200">
              <Route className="mr-1.5 h-4 w-4" />
              Connected skill sequence
            </span>
          </div>
          <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl">{path.name}</h1>
          <p className="mt-5 max-w-3xl text-xl leading-8 text-blue-100">{path.description}</p>
          {skills[0] && (
            <Link href={`/skills/${skills[0].slug}`} className="mt-7 inline-block">
              <Button size="lg" className="bg-white text-slate-950 hover:bg-blue-50">
                Start with {skills[0].name} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          )}
        </header>

        {pathCheck && <KnowledgeCheckCard check={pathCheck} className="mt-12" />}

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px]">
          <main>
            <div className="mb-7">
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">Recommended sequence</div>
              <h2 className="mt-2 text-3xl font-bold text-slate-950">Build the stack one skill at a time</h2>
              <p className="mt-2 text-slate-600">Each guide connects forward to careers, industries, articles, and related skills.</p>
            </div>

            <ol className="space-y-5">
              {skills.map((skill, index) => {
                const course = getSkillCourse(skill.slug);
                return (
                  <li key={skill.slug} className="relative rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-blue-300 hover:shadow-md sm:p-7">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                      <div className="flex h-12 w-12 flex-none items-center justify-center rounded-2xl bg-blue-100 text-lg font-bold text-blue-700">
                        {index + 1}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge variant="outline">{skill.difficulty ?? 'intermediate'}</Badge>
                          {course && (
                            <Badge className="bg-violet-100 text-violet-800">
                              <Sparkles className="mr-1 h-3 w-3" />
                              Practice available
                            </Badge>
                          )}
                        </div>
                        <h3 className="mt-3 text-2xl font-bold text-slate-950">{skill.name}</h3>
                        <p className="mt-2 leading-7 text-slate-600">{skill.shortDefinition}</p>
                        <div className="mt-5 flex flex-wrap gap-3">
                          <Link href={`/skills/${skill.slug}`}>
                            <Button variant="outline">
                              <BookOpen className="mr-2 h-4 w-4" />
                              Open skill guide
                            </Button>
                          </Link>
                          {course && (
                            <Link href={`/skills/${skill.slug}/learn`}>
                              <Button>
                                <GraduationCap className="mr-2 h-4 w-4" />
                                Take the Skill Sprint
                              </Button>
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </main>

          <aside className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="mr-2 h-5 w-5 text-blue-600" />
                  Learning outcomes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {path.learningOutcomes.map((outcome) => (
                    <li key={outcome} className="flex items-start text-sm leading-6 text-slate-700">
                      <CheckCircle2 className="mr-2 mt-0.5 h-4 w-4 flex-none text-green-600" />
                      {outcome}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {path.prerequisites.length > 0 && (
              <Card>
                <CardHeader><CardTitle>Before you begin</CardTitle></CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm leading-6 text-slate-600">
                    {path.prerequisites.map((prerequisite) => <li key={prerequisite}>• {prerequisite}</li>)}
                  </ul>
                </CardContent>
              </Card>
            )}

            {careers.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Briefcase className="mr-2 h-5 w-5 text-violet-600" />
                    Careers using this stack
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {careers.map((career) => (
                    <Link key={career.slug} href={`/careers/${career.slug}`} className="block rounded-xl border p-3 transition hover:border-violet-300 hover:bg-violet-50">
                      <span className="block text-sm font-semibold text-slate-900">{career.title}</span>
                      <span className="mt-1 block text-xs text-slate-500">Compare role and capability map</span>
                    </Link>
                  ))}
                </CardContent>
              </Card>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
