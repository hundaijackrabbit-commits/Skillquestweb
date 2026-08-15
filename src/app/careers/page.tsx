import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/navigation/breadcrumbs';
import { getAllCareers } from '@/lib/content';
import { isCareerIndexable } from '@/lib/content-quality';
import { ArrowRight, BookOpen, Briefcase, MapPin, Route, Target, Users } from 'lucide-react';

export const metadata = {
  title: 'Career Paths & Skill Requirements',
  description: 'Explore career profiles, core skills, growth paths, work environments, and practical routes into modern careers.',
  alternates: { canonical: '/careers' },
};

const careerDirections = [
  {
    title: 'Build digital products',
    description: 'Shape software, systems, and user experiences with a mix of technical judgment and collaboration.',
    icon: Briefcase,
    roles: [
      ['Product Manager', 'product-manager'],
      ['Software Engineer', 'software-engineer'],
      ['UX Designer', 'ux-designer'],
      ['DevOps Engineer', 'devops-engineer'],
    ],
  },
  {
    title: 'Turn evidence into decisions',
    description: 'Investigate patterns, explain tradeoffs, and help teams make defensible choices.',
    icon: Target,
    roles: [
      ['Data Analyst', 'data-analyst'],
      ['Data Scientist', 'data-scientist'],
      ['Business Analyst', 'business-analyst'],
      ['Financial Analyst', 'financial-analyst'],
    ],
  },
  {
    title: 'Grow trust and demand',
    description: 'Understand people, communicate value, and strengthen customer or audience relationships.',
    icon: Users,
    roles: [
      ['Account Manager', 'account-manager'],
      ['Customer Success Manager', 'customer-success-manager'],
      ['Sales Representative', 'sales-representative'],
      ['Digital Marketing Manager', 'digital-marketing-manager'],
    ],
  },
  {
    title: 'Coordinate people and delivery',
    description: 'Create clarity around work, resources, hiring, and reliable execution.',
    icon: Route,
    roles: [
      ['Project Manager', 'project-manager'],
      ['Operations Manager', 'operations-manager'],
      ['HR Manager', 'hr-manager'],
      ['Recruiter', 'recruiter'],
    ],
  },
] as const;

function humanize(value: string) {
  return value.replaceAll('-', ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export default async function CareersPage() {
  const careers = (await getAllCareers()).filter(isCareerIndexable);

  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Breadcrumbs className="mb-10" items={[{ label: 'Home', href: '/' }, { label: 'Careers' }]} />
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Career Intelligence Platform
          </h1>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Understand what different roles do and how their core, secondary, and transferable skills connect.
            Use each profile as a starting point for learning and career exploration.
          </p>
        </div>

        <section className="mt-12" aria-labelledby="career-directions">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">Browse by the work you want to do</p>
            <h2 id="career-directions" className="mt-2 text-3xl font-bold text-slate-950">Choose a direction before choosing a title</h2>
            <p className="mt-3 leading-7 text-slate-600">Job titles vary between organizations. Start with the kind of problems and working relationships that interest you, then compare the roles inside that direction.</p>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {careerDirections.map((direction) => (
              <div key={direction.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="inline-flex rounded-2xl bg-blue-50 p-3 text-blue-700"><direction.icon className="h-5 w-5" aria-hidden="true" /></div>
                <h3 className="mt-4 text-xl font-bold text-slate-950">{direction.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{direction.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {direction.roles.map(([label, slug]) => (
                    <Link key={slug} href={`/careers/${slug}`} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:text-blue-700">{label}</Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Careers Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Career Paths</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {careers.filter(career => career.featured).map((career) => (
              <Card key={career.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Briefcase className="h-5 w-5 text-blue-600" />
                      <Badge variant="outline" size="sm">Career profile</Badge>
                    </div>

                  </div>
                  <CardTitle className="text-xl">{career.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    {career.summary}
                  </p>
                  
                  <div className="mb-5 space-y-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Core focus</p>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {career.coreSkills.slice(0, 3).map((skill) => <Badge key={skill} variant="outline" size="sm">{humanize(skill)}</Badge>)}
                      </div>
                    </div>
                    <div>
                      <p className="flex items-center text-xs font-semibold uppercase tracking-wide text-slate-500"><MapPin className="mr-1.5 h-3.5 w-3.5" aria-hidden="true" />Common settings</p>
                      <p className="mt-1.5 text-sm leading-6 text-slate-600">{career.commonIndustries.slice(0, 3).map(humanize).join(' · ')}</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex flex-wrap gap-1">
                      {career.commonIndustries.slice(0, 2).map((industry, index) => (
                        <Badge key={index} variant="outline" size="sm">
                          {industry.replace('-', ' ')}
                        </Badge>
                      ))}
                    </div>
                    <Link 
                      href={`/careers/${career.slug}`}
                      className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500"
                    >
                      Explore <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* All Careers Section */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">All Career Paths</h2>
            <Link href="/dashboard" className="text-sm font-semibold text-blue-700">Build your personal fit profile <ArrowRight className="ml-1 inline h-4 w-4" aria-hidden="true" /></Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {careers.map((career) => (
              <Card key={career.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" size="sm">Skill-connected</Badge>
                  </div>
                  <CardTitle className="text-lg">{career.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-gray-600 mb-3">
                    {career.summary.substring(0, 120)}...
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-500">Skills, entry routes, and growth options</div>
                    <Link 
                      href={`/careers/${career.slug}`}
                      className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500"
                    >
                      Learn more <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Career Intelligence Features */}
        <div className="mt-20 bg-gray-50 rounded-2xl p-12">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Career Intelligence Features
            </h2>
            <p className="text-gray-600">
              Use each profile to compare the work itself, the evidence employers can inspect, and the next practical move you could make.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Briefcase className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Skill Requirements</h3>
              <p className="text-sm text-gray-600">
                Core, secondary, and transferable skills mapped to each career
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Target className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Evidence of Ability</h3>
              <p className="text-sm text-gray-600">
                Practical skills, tools, projects, and signals you can make visible
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Working Context</h3>
              <p className="text-sm text-gray-600">
                Common industries, team environments, and role variations
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-6 w-6 text-yellow-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Routes Forward</h3>
              <p className="text-sm text-gray-600">
                Entry strategies, alternative routes, and adjacent careers to compare
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to explore your career path?
          </h2>
          <p className="text-gray-600 mb-8">
            Use the personal profile to connect your interests and saved skills with career directions worth investigating.
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/dashboard"><Button asChild>Build My Profile</Button></Link>
            <Link href="/industries"><Button asChild variant="outline">Browse Industries</Button></Link>
          </div>
        </div>
      </div>
    </div>
  );
}
