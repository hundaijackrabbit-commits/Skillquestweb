import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/navigation/breadcrumbs';
import { getSkillPaths } from '@/lib/content';
import { isSkillPathIndexable } from '@/lib/content-quality';
import { CareerGuidePromo } from '@/components/marketing/career-guide-promo';
import { getTopicBySlug, TOPICS } from '@/lib/topics';
import { 
  ArrowRight, 
  Target, 
  Clock, 
  Star,
  Users,
  TrendingUp,
  BookOpen,
  Award,
  Compass,
  Lightbulb
} from 'lucide-react';

export const metadata = {
  title: 'Learning Paths',
  description: 'Follow structured skill-development paths that connect practical capabilities into useful learning journeys.',
  alternates: { canonical: '/paths' },
};

function humanize(value: string) {
  return value.replaceAll('-', ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export default async function SkillPathsPage() {
  const paths = (await getSkillPaths()).filter(isSkillPathIndexable);
  const featuredPaths = paths.filter(path => path.featured);
  const topicPathGroups = TOPICS
    .map((topic) => ({ topic, paths: paths.filter((path) => path.category === topic.slug) }))
    .filter(({ paths: topicPaths }) => topicPaths.length > 0);
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-blue-100 text-blue-800';
      case 'advanced':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="py-12 bg-gradient-to-b from-blue-50/30 to-white min-h-screen">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Breadcrumbs className="mb-10" items={[{ label: 'Home', href: '/' }, { label: 'Learning Paths' }]} />
        <div className="mx-auto max-w-4xl text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-sm font-medium mb-6">
            <Compass className="h-4 w-4 mr-2" />
            Structured Learning Journeys
          </div>
          <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-6">
            Skill Development
            <span className="text-blue-600 block">Paths</span>
          </h1>
          <p className="text-xl leading-8 text-gray-600 mb-8">
            Follow structured learning paths that group complementary skills into practical sequences.
            Move from foundations toward more advanced capabilities with a clearer roadmap for professional growth.
          </p>
          <div className="grid gap-4 text-left md:grid-cols-3">
            <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
              <h2 className="font-bold text-slate-950">Begin with an outcome</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">Choose a path because you want to perform a kind of work, not simply collect disconnected topics.</p>
            </div>
            <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
              <h2 className="font-bold text-slate-950">Build in sequence</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">Move from foundations into applied capabilities so each new skill has something to attach to.</p>
            </div>
            <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
              <h2 className="font-bold text-slate-950">Create evidence</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">Turn concepts into small work samples, decisions, explanations, and repeatable habits you can inspect.</p>
            </div>
          </div>
        </div>

        <section className="mb-16" aria-labelledby="paths-by-topic">
          <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-indigo-700">Browse the learning graph</p>
              <h2 id="paths-by-topic" className="mt-2 text-3xl font-bold text-slate-950">Learning paths by topic</h2>
            </div>
            <Link href="/topics" className="text-sm font-semibold text-indigo-700">Explore all topic hubs →</Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {topicPathGroups.map(({ topic, paths: topicPaths }) => (
              <Card key={topic.slug} className="rounded-2xl border-slate-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{topic.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-6 text-slate-600">{topic.description}</p>
                  <div className="mt-4 space-y-2">
                    {topicPaths.slice(0, 4).map((path) => (
                      <Link key={path.id} href={`/paths/${path.id}`} className="block rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-800 transition hover:border-indigo-300 hover:bg-indigo-50">
                        {path.name}
                      </Link>
                    ))}
                  </div>
                  <Link href={`/topics/${topic.slug}`} className="mt-4 inline-flex items-center text-sm font-semibold text-indigo-700">
                    Open {topic.name} hub <ArrowRight className="ml-1.5 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900 flex items-center">
              <Star className="h-7 w-7 mr-3 text-yellow-500" />
              Featured Learning Paths
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredPaths.map((path) => {
              const topic = getTopicBySlug(path.category);
              return (
                <Card key={path.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                  <CardHeader className="relative">
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="default" className={`${getDifficultyColor(path.difficulty)} font-medium`}>
                        {path.difficulty}
                      </Badge>
                      <div className="flex items-center text-sm text-gray-600"><Clock className="h-4 w-4 mr-1" />{path.estimatedTime}</div>
                    </div>
                    <CardTitle className="text-2xl group-hover:text-blue-600 transition-colors">{path.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="relative">
                    <p className="text-gray-700 mb-6 leading-relaxed">{path.description}</p>
                    <div className="space-y-4 mb-6">
                      <div className="flex items-start text-sm text-gray-600"><Target className="mt-1 h-4 w-4 mr-2 shrink-0 text-blue-600" /><span><strong className="font-semibold text-slate-800">Core sequence:</strong> {path.skills.slice(0, 4).map(humanize).join(' → ')}</span></div>
                      <div className="flex items-start text-sm text-gray-600"><TrendingUp className="mt-1 h-4 w-4 mr-2 shrink-0 text-green-600" /><span><strong className="font-semibold text-slate-800">Career direction:</strong> {path.relatedCareers.slice(0, 3).map(humanize).join(', ')}</span></div>
                      <div className="flex items-start text-sm text-gray-600"><Award className="mt-1 h-4 w-4 mr-2 shrink-0 text-purple-600" /><span><strong className="font-semibold text-slate-800">Outcome:</strong> {path.learningOutcomes[0]}</span></div>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <div className="text-xs text-gray-500">{topic ? <Link href={`/topics/${topic.slug}`} className="font-semibold text-indigo-700 hover:underline">{topic.name}</Link> : path.category.replace('-', ' ').toUpperCase()}</div>
                      <Link href={`/paths/${path.id}`}><Button className="bg-blue-600 hover:bg-blue-700 shadow-sm hover:shadow-md">Start Path <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">All Learning Paths</h2>
            <p className="text-sm text-slate-600">Compare outcomes, sequence, difficulty, and time</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {paths.map((path) => {
              const topic = getTopicBySlug(path.category);
              return (
                <Card key={path.id} className="hover:shadow-lg transition-shadow group">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="outline" className={`${getDifficultyColor(path.difficulty)} border-0`} size="sm">{path.difficulty}</Badge>
                      {path.featured && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                    </div>
                    <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">{path.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{path.description}</p>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-xs text-gray-500"><Clock className="h-3 w-3 mr-2" /><span>{path.estimatedTime}</span></div>
                      <div className="flex items-center text-xs text-gray-500"><BookOpen className="h-3 w-3 mr-2" /><span>{path.skills.slice(0, 3).map(humanize).join(' · ')}</span></div>
                      <div className="flex items-start text-xs leading-5 text-gray-500"><Users className="h-3 w-3 mr-2" /><span>{path.relatedCareers.slice(0, 2).map(humanize).join(' · ')}</span></div>
                    </div>
                    <div className="flex justify-between items-center gap-3">
                      <div className="text-xs text-gray-500 uppercase tracking-wide">{topic ? <Link href={`/topics/${topic.slug}`} className="font-semibold text-indigo-700 hover:underline">{topic.name}</Link> : path.category.replace('-', ' ')}</div>
                      <Link href={`/paths/${path.id}`}><Button variant="outline" size="sm">View Path <ArrowRight className="ml-1 h-3 w-3" /></Button></Link>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-2xl p-12 mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center"><Lightbulb className="h-8 w-8 mr-3 text-yellow-500" />Why Follow Structured Paths?</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Our learning paths are organized around complementary skills so you can move from foundational concepts toward more advanced applications</p>
          </div>
        </div>

        <CareerGuidePromo className="mb-16" eyebrow="Plan before you commit" />

        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to start your learning journey?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">Choose a path that aligns with your career goals and start building the skills that will set you apart in today&apos;s competitive market.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/skills"><Button size="lg" className="px-8"><Target className="h-4 w-4 mr-2" />Explore Skills</Button></Link>
            <Link href="/community"><Button variant="outline" size="lg" className="px-8"><Users className="h-4 w-4 mr-2" />Visit Community</Button></Link>
          </div>
        </div>
      </div>
    </div>
  );
}
