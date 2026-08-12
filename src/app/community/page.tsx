import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, BookOpen, Users, PenTool, Compass, Sparkles, Briefcase } from 'lucide-react';

export const metadata = {
  title: 'Community',
  description: 'Explore ways to learn with Modern Skill Lab, follow practical skill guides, and grow alongside the platform.',
  alternates: { canonical: '/community' },
};

const principles = [
  {
    title: 'Useful over performative',
    description:
      'Modern Skill Lab is about practical growth, not vanity metrics, hype, or pretending to be bigger than it is.',
  },
  {
    title: 'Thoughtful people, real development',
    description:
      'The goal is to attract curious, serious people who want clearer thinking, stronger skills, and better career decisions.',
  },
  {
    title: 'Built in public, growing honestly',
    description:
      'This platform is still evolving. Community here means readers, learners, and contributors growing alongside the project.',
  },
];

const waysToEngage = [
  {
    icon: BookOpen,
    title: 'Explore skills',
    description:
      'Browse practical skill categories and start finding the areas most relevant to your growth.',
    href: '/skills',
    cta: 'Browse skills',
  },
  {
    icon: PenTool,
    title: 'Read the blog',
    description:
      'Use the blog as a growing library of modern skill development, career thinking, and digital relevance.',
    href: '/blog',
    cta: 'Visit the blog',
  },
  {
    icon: Briefcase,
    title: 'Explore careers',
    description:
      'See how skill development connects to real career directions instead of staying abstract.',
    href: '/careers',
    cta: 'See career paths',
  },
];

export default function CommunityPage() {
  return (
    <div className="bg-white">
      <section className="border-b bg-gradient-to-b from-slate-50 via-white to-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
          <Badge variant="info" className="rounded-full px-3 py-1 text-xs font-semibold">
            Community
          </Badge>

          <div className="mt-6 max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              A growing community around practical modern skills.
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              Modern Skill Lab is still early, and that is fine. This community is not built on fake numbers
              or inflated claims. It is built on useful ideas, steady growth, and people who want to become
              more capable in modern work.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/skills">
              <Button variant="primary" size="lg" className="w-full sm:w-auto">
                Explore skills
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>

            <Link href="/auth">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Create account
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
              What community means here
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Honest, useful, and still taking shape
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              This is not a polished social network. It is a developing space for learning, reflection,
              and skill-building around modern work.
            </p>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            {principles.map((item) => (
              <Card key={item.title} className="rounded-3xl border-slate-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl text-slate-900">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-6 text-slate-600">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
                Best ways to engage right now
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Start with the parts that already create value.
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-600">
                Instead of fake activity feeds or empty community stats, the best experience right now is to
                explore the platform itself.
              </p>

              <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="rounded-2xl bg-blue-600/10 p-3 text-blue-600">
                    <Compass className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">Current direction</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Modern Skill Lab is building toward a stronger ecosystem of skills, articles,
                      and career-relevant guidance. Community features can come later, once they are real.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-6">
              {waysToEngage.map((item) => (
                <Card key={item.title} className="rounded-3xl border-slate-200 bg-white shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="rounded-2xl bg-slate-100 p-3 text-slate-700">
                        <item.icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
                        <Link
                          href={item.href}
                          className="mt-4 inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-500"
                        >
                          {item.cta}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="rounded-[2rem] bg-slate-900 px-6 py-10 text-white sm:px-10 sm:py-12">
            <div className="max-w-2xl">
              <div className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-blue-200">
                Early stage by design
              </div>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Better to be honest than to look bigger than we are.
              </h2>
              <p className="mt-4 text-base leading-7 text-slate-300">
                The strongest version of this brand will come from credibility. That means useful content,
                a clearer platform, and real engagement over time.
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/blog">
                <Button size="lg" className="w-full bg-white text-slate-900 hover:bg-slate-100 sm:w-auto">
                  Read articles
                </Button>
              </Link>
              <Link href="/auth">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full border-slate-600 bg-transparent text-white hover:bg-slate-800 sm:w-auto"
                >
                  Join early
                  <Sparkles className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="mt-8 flex items-center gap-3 text-sm text-slate-300">
              <Users className="h-4 w-4" />
              A growing platform for people who want clearer thinking and stronger skills
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}