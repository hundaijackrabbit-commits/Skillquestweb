import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ArrowRight,
  Brain,
  Briefcase,
  CheckCircle2,
  Clock3,
  Compass,
  Layers3,
  LineChart,
  Sparkles,
  Target,
  Zap,
} from 'lucide-react';

const featuredTracks = [
  {
    title: 'AI Literacy',
    description:
      'Learn how to use modern AI tools with good judgment, sharper prompts, and real workflow awareness.',
    href: '/skills/ai-literacy',
    badge: 'Fast-growing',
  },
  {
    title: 'Professional Communication',
    description:
      'Write, present, explain, and collaborate better across meetings, messages, and high-stakes work.',
    href: '/skills/communication',
    badge: 'Career-critical',
  },
  {
    title: 'Critical Thinking',
    description:
      'Break down problems, test assumptions, and make stronger decisions in messy real-world situations.',
    href: '/skills/critical-thinking',
    badge: 'High leverage',
  },
];

const pillars = [
  {
    icon: Layers3,
    title: 'Skill depth, not surface lists',
    description:
      'Every topic is framed as something you can actually build, practice, and apply rather than skim and forget.',
  },
  {
    icon: Compass,
    title: 'Clear direction for modern work',
    description:
      'Connect skills to careers, digital leverage, and real-world opportunity instead of learning randomly.',
  },
  {
    icon: LineChart,
    title: 'Practical growth strategy',
    description:
      'Focus on what compounds: communication, AI fluency, systems thinking, execution, and adaptability.',
  },
];

const outcomes = [
  'Find which skills matter for your next move',
  'Understand where a skill fits in real work',
  'Build stronger habits around learning and execution',
  'Move from scattered content consumption to focused growth',
];

const stats = [
  { value: '500+', label: 'skills and topics indexed' },
  { value: '25+', label: 'career paths and growth directions' },
  { value: '20+', label: 'published guides and articles' },
  { value: '1', label: 'clear mission: useful modern skills' },
];

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden border-b bg-gradient-to-b from-slate-50 via-white to-white">
        <div className="absolute inset-x-0 top-0 h-64 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.14),transparent_55%)]" />
        <div className="mx-auto grid max-w-7xl gap-14 px-6 py-20 lg:grid-cols-[1.2fr_0.8fr] lg:px-8 lg:py-28">
          <div className="relative">
            <Badge variant="info" className="rounded-full px-3 py-1 text-xs font-semibold">
              ModernSkillLab.space
            </Badge>
            <h1 className="mt-6 max-w-4xl text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">
              Build modern skills that actually move your career forward.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Modern Skill Lab helps ambitious people focus on practical skills, digital leverage,
              and better career decisions. Less noise. More clarity. More useful growth.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/skills">
                <Button variant="primary" size="lg" className="w-full sm:w-auto">
                  Explore skills
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/blog">
                <Button variant="outline" size="lg" className="w-full sm:w-auto border-slate-300">
                  Read the blog
                </Button>
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-3 text-sm text-slate-600">
              <span className="inline-flex items-center rounded-full bg-white px-3 py-1 shadow-sm ring-1 ring-slate-200">
                <Brain className="mr-2 h-4 w-4 text-blue-600" />
                AI and digital workflows
              </span>
              <span className="inline-flex items-center rounded-full bg-white px-3 py-1 shadow-sm ring-1 ring-slate-200">
                <Briefcase className="mr-2 h-4 w-4 text-blue-600" />
                Career strategy
              </span>
              <span className="inline-flex items-center rounded-full bg-white px-3 py-1 shadow-sm ring-1 ring-slate-200">
                <Target className="mr-2 h-4 w-4 text-blue-600" />
                High-value professional skills
              </span>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_20px_70px_-35px_rgba(15,23,42,0.4)]">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <p className="text-sm font-medium text-slate-500">What Modern Skill Lab is built for</p>
                  <h2 className="mt-1 text-xl font-semibold text-slate-900">Focused, useful growth</h2>
                </div>
                <div className="rounded-2xl bg-blue-600/10 p-3 text-blue-600">
                  <Sparkles className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-6 space-y-4">
                {outcomes.map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
                    <p className="text-sm leading-6 text-slate-700">{item}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-slate-200 p-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                    <Clock3 className="h-4 w-4" />
                    Save time
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    Stop guessing what to learn next.
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 p-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                    <Zap className="h-4 w-4" />
                    Stay relevant
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    Focus on skills that still matter as work changes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-6 rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:grid-cols-2 xl:grid-cols-4 xl:p-8">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200/70">
                <div className="text-3xl font-bold tracking-tight text-slate-900">{stat.value}</div>
                <p className="mt-2 text-sm leading-6 text-slate-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Start with what matters</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Featured skill tracks
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              High-value topics for people trying to get sharper, more adaptable, and more useful in modern work.
            </p>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            {featuredTracks.map((track) => (
              <Card key={track.title} className="rounded-3xl border-slate-200 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between gap-4">
                    <Badge variant="success" className="rounded-full px-3 py-1 text-xs font-semibold">
                      {track.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl text-slate-900">{track.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-6 text-slate-600">{track.description}</p>
                  <Link href={track.href} className="mt-5 inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-500">
                    Explore this topic
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Why this feels different</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Not another vague self-improvement site.
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-600">
                Modern Skill Lab is designed for people who want better judgment, better capability,
                and better results. The focus is practical. The standard is higher.
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-3">
              {pillars.map((pillar) => (
                <div key={pillar.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="inline-flex rounded-2xl bg-blue-600/10 p-3 text-blue-600">
                    <pillar.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-slate-900">{pillar.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{pillar.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="rounded-[2rem] bg-slate-900 px-6 py-10 text-white sm:px-10 sm:py-12 lg:flex lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">Ready to sharpen your edge</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Explore the platform and start building a stronger skill stack.
              </h2>
              <p className="mt-4 text-base leading-7 text-slate-300">
                Browse skills, follow career-relevant topics, and use the blog as a practical guide for modern work.
              </p>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:mt-0">
              <Link href="/skills">
                <Button size="lg" className="w-full bg-white text-slate-900 hover:bg-slate-100 sm:w-auto">
                  Browse skills
                </Button>
              </Link>
              <Link href="/auth">
                <Button size="lg" variant="outline" className="w-full border-slate-600 bg-transparent text-white hover:bg-slate-800 sm:w-auto">
                  Create account
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}