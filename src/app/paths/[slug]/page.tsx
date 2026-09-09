import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  CheckCircle2,
  Clock3,
  Compass,
  GraduationCap,
  Network,
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
import { getTopicBySlug } from '@/lib/topics';

type Props = {
  params: Promise<{ slug: string }>;
};

function referenceKey(value: string) {
  return value
    .trim()
    .toLocaleLowerCase('en')
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function relatedPathScore(currentSkills: Set<string>, candidateSkills: string[]) {
  return candidateSkills.reduce(
    (score, skill) => score + (currentSkills.has(referenceKey(skill)) ? 1 : 0),
    0,
  );
}

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

  const allPaths = (await getSkillPaths()).filter(isSkillPathIndexable);
  const currentSkillReferences = new Set(path.skills.map(referenceKey));
  const relatedPaths = allPaths
    .filter((candidate) => candidate.id !== path.id)
    .map((candidate) => ({
      path: candidate,
      score:
        relatedPathScore(currentSkillReferences, candidate.skills) * 2 +
        (referenceKey(candidate.category) === referenceKey(path.category) ? 2 : 0),
    }))
    .filter(({ score }) => score > 0)
    .sort((left, right) => right.score - left.score || left.path.name.localeCompare(right.path.name))
    .slice(0, 6)
    .map(({ path: candidate }) => candidate);

  const [skills, careers] = await Promise.all([
    resolveSkillReferences(path.skills),
    resolveCareerReferences(path.relatedCareers),
  ]);
  const topic = getTopicBySlug(path.category);
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
          <div className="mt-7 flex flex-wrap gap-3">
            {skills[0] && (
              <Link href={`/skills/${skills[0].slug}`}>
                <Button size="lg" className="bg-white text-slate-950 hover:bg-blue-50">
                  Start with {skills[0].name} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            )}
            {topic && (
              <Link href={`/topics/${topic.slug}`}>
                <Button size="lg" variant="outline" className="border-white/30 bg-white/5 text-white hover:bg-white/10 hover:text-white">
                  <Compass className="mr-2 h-4 w-4" />
                  Explore {topic.name}
                </Button>
              </Link>
            )}
          </div>
        </header>

        {pathCheck && <KnowledgeCheckCard check={pathCheck} className="mt-12" />}

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px]">
          <main>
            <div className="mb-7">
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">Recommended sequence</div>
              <h2 className="mt-2 text-3xl font-bold text-slate-950">Build the stack one skill at a time</h2>
              <p className="mt-2 text-slate-600">Each guide connects forward to careers, industries, articles, lessons, and related skills.</p>
            </div>

            <ol className="space-y-5">
              {skills.map((skill, index) => {
                const course = getSkillCourse(skill.slug);
                const nextSkill = skills[index + 1];
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
                          <Link href={`/skills/${skill.slug}/lessons/how-to`}>
                            <Button variant="outline">How to develop</Button>
                          </Link>
                          <Link href={`/skills/${skill.slug}/lessons/examples`}>
                            <Button variant="outline">See examples</Button>
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
                        {nextSkill && (
                          <p className="mt-5 text-sm leading-6 text-slate-500">
                            Next in sequence: <Link href={`/skills/${nextSkill.slug}`} className="font-semibold text-blue-700 hover:underline">{nextSkill.name}</Link>
                          </p>
                        )}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>

            {relatedPaths.length > 0 && (
              <section className="mt-14" aria-labelledby="related-paths">
                <div className="flex items-center gap-3">
                  <Network className="h-6 w-6 text-indigo-700" />
                  <h2 id="related-paths" className="text-3xl font-bold text-slate-950">Continue with related learning paths</h2>
                </div>
                <p className="mt-2 max-w-3xl text-slate-600">
                  These paths overlap with this skill stack or live in the same topic, giving both learners and search engines clear routes between adjacent knowledge areas.
                </p>
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  {relatedPaths.map((relatedPath) => (
                    <Link key={relatedPath.id} href={`/paths/${relatedPath.id}`} className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-indigo-300 hover:shadow-sm">
                      <div className="flex items-center justify-between gap-3">
                        <Badge variant="outline" className="capitalize">{relatedPath.difficulty}</Badge>
                        <span className="text-xs text-slate-500">{relatedPath.estimatedTime}</span>
                      </div>
                      <h3 className="mt-3 text-lg font-bold text-slate-950">{relatedPath.name}</h3>
                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">{relatedPath.description}</p>
                    </Link>
                  ))}
                </div>
              </section>
            )}
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

            {topic && (
              <Card>
                <CardHeader><CardTitle>Topic hub</CardTitle></CardHeader>
                <CardContent>
                  <Link href={`/topics/${topic.slug}`} className="block rounded-xl border p-3 transition hover:border-blue-300 hover:bg-blue-50">
                    <span className="block text-sm font-semibold text-slate-900">{topic.name}</span>
                    <span className="mt-1 block text-xs leading-5 text-slate-500">Browse the broader skill, career, industry, article, and path network around this topic.</span>
                  </Link>
                </CardContent>
              </Card>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
