import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/navigation/breadcrumbs';
import {
  getCareerBySlug,
  getAllCareers,
  getSkillsForCareer,
  getIndustriesForCareer,
  getRelatedCareers,
  getBlogPostsForCareer,
  getSkillPathsForCareer,
} from '@/lib/content';
import { CareerPathway } from '@/components/features/career-pathway';
import { ContentViewTracker } from '@/components/analytics/content-view-tracker';
import { ManagedAdSlot } from '@/components/ads/managed-ad-slot';
import { absoluteUrl } from '@/lib/site';
import { breadcrumbList } from '@/lib/seo';
import { isCareerIndexable } from '@/lib/content-quality';
import { 
  Briefcase, 
  TrendingUp, 
  MapPin, 
  Users,
  Target,
  BookOpen,
  Star,
  Building2,
  Zap,
  Award,
  CheckCircle2,
  ArrowRight,
  FileText,
  Route,
} from 'lucide-react';

interface CareerDetailPageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all career slugs
export async function generateStaticParams() {
  const careers = await getAllCareers();
  
  return careers.filter(isCareerIndexable).map((career) => ({
    slug: career.slug,
  }));
}

export async function generateMetadata({ params }: CareerDetailPageProps) {
  const { slug } = await params;
  const career = await getCareerBySlug(slug);
  
  if (!career) {
    return {
      title: 'Career Not Found',
    };
  }
  
  const title = `${career.title} Career Guide`;
  const description = career.summary.length > 158 ? `${career.summary.slice(0, 155)}…` : career.summary;
  return {
    title,
    description,
    alternates: { canonical: `/careers/${career.slug}` },
    robots: { index: isCareerIndexable(career), follow: true },
    openGraph: { title: `${title} | Modern Skill Lab`, description, type: 'article', url: `/careers/${career.slug}` },
  };
}

export default async function CareerDetailPage({ params }: CareerDetailPageProps) {
  const { slug } = await params;
  const career = await getCareerBySlug(slug);
  
  if (!career) {
    notFound();
  }

  const [relatedSkills, relatedIndustries, relatedCareers, relatedPosts, relatedPaths] = await Promise.all([
    getSkillsForCareer(career.slug),
    getIndustriesForCareer(career.slug),
    getRelatedCareers(career.slug),
    getBlogPostsForCareer(career.slug),
    getSkillPathsForCareer(career.slug),
  ]);
  const canonicalUrl = absoluteUrl(`/careers/${career.slug}`);
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: `${career.title} Career Guide`,
        description: career.summary,
        mainEntityOfPage: canonicalUrl,
        dateModified: career.lastUpdated,
        author: { '@type': 'Organization', name: 'Modern Skill Lab' },
        publisher: { '@type': 'Organization', name: 'Modern Skill Lab' },
        about: career.title,
      },
      breadcrumbList([
        { name: 'Modern Skill Lab', url: absoluteUrl('/') },
        { name: 'Careers', url: absoluteUrl('/careers') },
        { name: career.title, url: canonicalUrl },
      ]),
    ],
  };

  return (
    <div className="py-12 bg-gradient-to-b from-blue-50/30 to-white min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <ContentViewTracker eventType="career_view" itemType="career" itemSlug={career.slug} />
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Breadcrumbs className="mb-8" items={[{ label: 'Home', href: '/' }, { label: 'Careers', href: '/careers' }, { label: career.title }]} />

        {/* Hero Header */}
        <div className="mb-16">
          <div className="relative bg-gradient-to-r from-white via-blue-50/50 to-purple-50/50 rounded-2xl p-8 shadow-sm border">
            {/* Status Badges */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <Badge 
                variant="default" 
                className="bg-blue-100 text-blue-800 font-medium px-3 py-1"
                size="lg"
              >
                <Briefcase className="h-4 w-4 mr-2" />
                Career Path
              </Badge>
              
              <Badge variant="outline" className="font-medium">Skill-connected profile</Badge>
              
              <Badge variant="outline" className="flex items-center">
                <Award className="h-3 w-3 mr-1" />
                {career.coreSkills.length} core skills required
              </Badge>
            </div>
            
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 mb-4">
              {career.title}
            </h1>
            
            <p className="text-xl text-gray-700 mb-8 max-w-4xl leading-relaxed">
              {career.summary}
            </p>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
              <div className="text-center p-4 bg-white/60 rounded-xl">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-green-100 mb-2">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <div className="text-sm font-medium text-gray-500 mb-1">Industries</div>
                <div className="text-sm font-semibold text-green-600">
                  {career.commonIndustries.length} sectors
                </div>
              </div>
              
              <div className="text-center p-4 bg-white/60 rounded-xl">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-blue-100 mb-2">
                  <Target className="h-6 w-6 text-blue-600" />
                </div>
                <div className="text-sm font-medium text-gray-500 mb-1">Core Skills</div>
                <div className="text-sm font-semibold text-blue-600">
                  {career.coreSkills.length} required
                </div>
              </div>
              
              <div className="text-center p-4 bg-white/60 rounded-xl">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-purple-100 mb-2">
                  <Building2 className="h-6 w-6 text-purple-600" />
                </div>
                <div className="text-sm font-medium text-gray-500 mb-1">Work Environments</div>
                <div className="text-sm font-semibold text-purple-600">
                  {career.workEnvironments.length} types
                </div>
              </div>
              
              <div className="text-center p-4 bg-white/60 rounded-xl">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-yellow-100 mb-2">
                  <Route className="h-6 w-6 text-yellow-700" />
                </div>
                <div className="text-sm font-medium text-gray-500 mb-1">Learning Paths</div>
                <div className="text-sm font-semibold text-yellow-700">{relatedPaths.length} connected</div>
              </div>
            </div>
          </div>
        </div>

        <ManagedAdSlot placement="career-inline" />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* What They Do */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <BookOpen className="h-6 w-6 mr-3 text-blue-600" />
                  What {career.title}s Do
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  {career.whatTheyDo}
                </p>
              </CardContent>
            </Card>

            {/* Skills Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <Zap className="h-6 w-6 mr-3 text-green-600" />
                  Skills Required
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Core Skills */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Star className="h-4 w-4 mr-2 text-yellow-500" />
                    Core Skills (Essential)
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {career.coreSkills.map((skillId) => {
                      const skill = relatedSkills.find(s => s.id === skillId);
                      return skill ? (
                        <Link 
                          key={skillId}
                          href={`/skills/${skill.slug}`}
                          className="inline-block"
                        >
                          <Badge 
                            variant="default" 
                            className="bg-blue-600 text-white hover:bg-blue-700 cursor-pointer transition-colors"
                          >
                            {skill.name}
                          </Badge>
                        </Link>
                      ) : (
                        <Badge key={skillId} variant="outline" className="opacity-60">
                          {skillId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </Badge>
                      );
                    })}
                  </div>
                </div>

                {/* Secondary Skills */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                    Secondary Skills (Important)
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {career.secondarySkills.map((skillId) => {
                      const skill = relatedSkills.find(s => s.id === skillId);
                      return skill ? (
                        <Link 
                          key={skillId}
                          href={`/skills/${skill.slug}`}
                          className="inline-block"
                        >
                          <Badge 
                            variant="secondary" 
                            className="hover:bg-green-100 hover:text-green-800 cursor-pointer transition-colors"
                          >
                            {skill.name}
                          </Badge>
                        </Link>
                      ) : (
                        <Badge key={skillId} variant="outline" className="opacity-60">
                          {skillId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </Badge>
                      );
                    })}
                  </div>
                </div>

                {/* Transferable Skills */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <ArrowRight className="h-4 w-4 mr-2 text-purple-500" />
                    Transferable Skills (Valuable)
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {career.transferableSkills.map((skillId) => {
                      const skill = relatedSkills.find(s => s.id === skillId);
                      return skill ? (
                        <Link 
                          key={skillId}
                          href={`/skills/${skill.slug}`}
                          className="inline-block"
                        >
                          <Badge 
                            variant="outline" 
                            className="hover:bg-purple-100 hover:text-purple-800 cursor-pointer transition-colors"
                          >
                            {skill.name}
                          </Badge>
                        </Link>
                      ) : (
                        <Badge key={skillId} variant="outline" className="opacity-60">
                          {skillId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </Badge>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Entry Strategies */}
            {career.beginnerEntryStrategies && career.beginnerEntryStrategies.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl">
                    <Target className="h-6 w-6 mr-3 text-orange-600" />
                    Getting Started
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {career.beginnerEntryStrategies.map((strategy, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                          <span className="text-xs font-medium text-orange-600">{index + 1}</span>
                        </div>
                        <span className="text-gray-700">{strategy}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Industries */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building2 className="h-5 w-5 mr-2 text-purple-600" />
                  Common Industries
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {relatedIndustries.map((industry) => (
                    <Link
                      key={industry.slug}
                      href={`/industries/${industry.slug}`}
                      className="flex items-center justify-between rounded bg-gray-50 p-2 transition hover:bg-purple-50"
                    >
                      <span className="text-sm font-medium text-gray-700">{industry.name}</span>
                      <ArrowRight className="h-3.5 w-3.5 text-purple-500" />
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Work Environments */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-green-600" />
                  Work Environments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {career.workEnvironments.map((env, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm font-medium text-gray-700">
                        {env.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Tools & Technologies */}
            {career.tools && career.tools.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Zap className="h-5 w-5 mr-2 text-yellow-600" />
                    Common Tools
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {career.tools.map((tool, index) => (
                      <Badge key={index} variant="outline" size="sm">
                        {tool}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Growth Opportunities */}
            {career.growthOpportunities && career.growthOpportunities.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
                    Growth Opportunities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {career.growthOpportunities.map((opportunity, index) => (
                      <li key={index} className="flex items-start">
                        <ArrowRight className="h-4 w-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{opportunity}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Career Pathway Visualization */}
        <CareerPathway 
          career={career}
          relatedSkills={relatedSkills}
          className="mb-16"
        />

        {(relatedPaths.length > 0 || relatedPosts.length > 0 || relatedCareers.length > 0) && (
          <section className="mb-16">
            <div className="mb-7">
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">Connected next steps</div>
              <h2 className="mt-2 text-3xl font-bold text-slate-950">Keep exploring {career.title}</h2>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
              {relatedPaths.length > 0 && (
                <Card>
                  <CardHeader><CardTitle className="flex items-center"><Route className="mr-2 h-5 w-5 text-blue-600" />Learning paths</CardTitle></CardHeader>
                  <CardContent className="space-y-3">
                    {relatedPaths.map((path) => (
                      <Link key={path.id} href={`/paths/${path.id}`} className="block rounded-xl border p-3 transition hover:border-blue-300 hover:bg-blue-50">
                        <span className="block text-sm font-semibold text-slate-900">{path.name}</span>
                        <span className="mt-1 block text-xs text-slate-500">{path.skills.length} skills · {path.estimatedTime}</span>
                      </Link>
                    ))}
                  </CardContent>
                </Card>
              )}
              {relatedPosts.length > 0 && (
                <Card>
                  <CardHeader><CardTitle className="flex items-center"><FileText className="mr-2 h-5 w-5 text-violet-600" />Related articles</CardTitle></CardHeader>
                  <CardContent className="space-y-3">
                    {relatedPosts.map((post) => (
                      <Link key={post.slug} href={`/blog/${post.slug}`} className="block text-sm font-semibold text-blue-700 hover:text-blue-900">
                        {post.title}
                      </Link>
                    ))}
                  </CardContent>
                </Card>
              )}
              {relatedCareers.length > 0 && (
                <Card>
                  <CardHeader><CardTitle className="flex items-center"><Briefcase className="mr-2 h-5 w-5 text-green-600" />Adjacent careers</CardTitle></CardHeader>
                  <CardContent className="space-y-3">
                    {relatedCareers.map((relatedCareer) => (
                      <Link key={relatedCareer.slug} href={`/careers/${relatedCareer.slug}`} className="block rounded-xl border p-3 transition hover:border-green-300 hover:bg-green-50">
                        <span className="block text-sm font-semibold text-slate-900">{relatedCareer.title}</span>
                        <span className="mt-1 block text-xs text-slate-500">{relatedCareer.coreSkills.length} core skills</span>
                      </Link>
                    ))}
                  </CardContent>
                </Card>
              )}
            </div>
          </section>
        )}

        {/* Action Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to pursue {career.title}?
            </h3>
            
            <p className="text-gray-700 mb-8">
              Start building the skills and experience needed for this career path. 
              Our platform can help you create a strategic development plan.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="px-8">
                <Target className="h-4 w-4 mr-2" />
                Assess Your Skills
              </Button>
              <Button variant="outline" size="lg" className="px-8">
                <BookOpen className="h-4 w-4 mr-2" />
                View Required Skills
              </Button>
              <Button variant="outline" size="lg" className="px-8">
                <Users className="h-4 w-4 mr-2" />
                Connect with Professionals
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
