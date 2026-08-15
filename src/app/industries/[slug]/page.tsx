import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/navigation/breadcrumbs';
import {
  getIndustryBySlug,
  getAllIndustries,
  getCareersForIndustry,
  getSkillsForIndustry,
  getBlogPostsForIndustry,
} from '@/lib/content';
import { absoluteUrl } from '@/lib/site';
import { breadcrumbList } from '@/lib/seo';
import { 
  Building2, 
  TrendingUp, 
  Users, 
  Target,
  Globe,
  Zap,
  Star,
  BarChart3,
  Briefcase,
  Award,
  ArrowRight,
  FileText,
} from 'lucide-react';

interface IndustryDetailPageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all industry slugs
export async function generateStaticParams() {
  const industries = await getAllIndustries();
  
  return industries.map((industry) => ({
    slug: industry.slug,
  }));
}

export async function generateMetadata({ params }: IndustryDetailPageProps) {
  const { slug } = await params;
  const industry = await getIndustryBySlug(slug);
  
  if (!industry) {
    return {
      title: 'Industry Not Found',
    };
  }
  
  const description = industry.description.length > 158 ? `${industry.description.slice(0, 155)}…` : industry.description;
  return {
    title: `${industry.name} Industry Guide`,
    description,
    alternates: { canonical: `/industries/${industry.slug}` },
    openGraph: { title: `${industry.name} Industry Guide | Modern Skill Lab`, description, type: 'article', url: `/industries/${industry.slug}` },
  };
}

export default async function IndustryDetailPage({ params }: IndustryDetailPageProps) {
  const { slug } = await params;
  const industry = await getIndustryBySlug(slug);
  
  if (!industry) {
    notFound();
  }

  const [relatedCareers, relatedSkills, relatedPosts] = await Promise.all([
    getCareersForIndustry(slug).catch(() => []),
    getSkillsForIndustry(slug).catch(() => []),
    getBlogPostsForIndustry(slug).catch(() => []),
  ]);
  const canonicalUrl = absoluteUrl(`/industries/${industry.slug}`);
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: `${industry.name} Industry Guide`,
        description: industry.description,
        mainEntityOfPage: canonicalUrl,
        dateModified: industry.lastUpdated,
        author: { '@type': 'Organization', name: 'Modern Skill Lab' },
        publisher: { '@type': 'Organization', name: 'Modern Skill Lab' },
        about: industry.name,
      },
      breadcrumbList([
        { name: 'Modern Skill Lab', url: absoluteUrl('/') },
        { name: 'Industries', url: absoluteUrl('/industries') },
        { name: industry.name, url: canonicalUrl },
      ]),
    ],
  };

  return (
    <div className="py-12 bg-gradient-to-b from-blue-50/30 to-white min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Breadcrumbs className="mb-8" items={[{ label: 'Home', href: '/' }, { label: 'Industries', href: '/industries' }, { label: industry.name }]} />

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
                <Building2 className="h-4 w-4 mr-2" />
                Industry Profile
              </Badge>
              
              {industry.featured && (
                <Badge 
                  variant="secondary"
                  className="bg-yellow-100 text-yellow-800 font-medium"
                >
                  <Star className="h-3 w-3 mr-1" />
                  Featured Industry
                </Badge>
              )}
              
              <Badge variant="outline" className="flex items-center">
                <Globe className="h-3 w-3 mr-1" />
                {industry.name} Sector
              </Badge>
            </div>
            
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 mb-4">
              {industry.name}
            </h1>
            
            <p className="text-xl text-gray-700 mb-8 max-w-4xl leading-relaxed">
              {industry.description}
            </p>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
              <div className="text-center p-4 bg-white/60 rounded-xl">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-blue-100 mb-2">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div className="text-sm font-medium text-gray-500 mb-1">Key Roles</div>
                <div className="text-sm font-semibold text-blue-600">
                  {relatedCareers.length} profiles
                </div>
              </div>
              
              <div className="text-center p-4 bg-white/60 rounded-xl">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-green-100 mb-2">
                  <Target className="h-6 w-6 text-green-600" />
                </div>
                <div className="text-sm font-medium text-gray-500 mb-1">Core Skills</div>
                <div className="text-sm font-semibold text-green-600">
                  {relatedSkills.length} connected
                </div>
              </div>
              
              <div className="text-center p-4 bg-white/60 rounded-xl">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-purple-100 mb-2">
                  <BarChart3 className="h-6 w-6 text-purple-600" />
                </div>
                <div className="text-sm font-medium text-gray-500 mb-1">Trends Covered</div>
                <div className="text-sm font-semibold text-purple-600">
                  {industry.trends.length} listed
                </div>
              </div>
              
              <div className="text-center p-4 bg-white/60 rounded-xl">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-orange-100 mb-2">
                  <Zap className="h-6 w-6 text-orange-600" />
                </div>
                <div className="text-sm font-medium text-gray-500 mb-1">Opportunities</div>
                <div className="text-sm font-semibold text-orange-600">
                  {industry.opportunities.length} mapped
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Status for Empty Industry */}
        {!industry.commonCareers?.length && !industry.criticalSkills?.length ? (
          <div className="text-center py-16">
            <Building2 className="h-24 w-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Industry Profile Development in Progress
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              We&apos;re currently developing comprehensive career and skill intelligence 
              for the {industry.name} industry. This profile will include detailed 
              role hierarchies, skill requirements, and market trends.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/topics"><Button variant="outline"><Target className="h-4 w-4 mr-2" />Browse skill topics</Button></Link>
              <Link href="/industries"><Button variant="outline">Browse Other Industries</Button></Link>
            </div>
          </div>
        ) : (
          <>
            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
              {/* Left Column - Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Key Career Roles */}
                {industry.commonCareers && industry.commonCareers.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center text-2xl">
                        <Briefcase className="h-6 w-6 mr-3 text-blue-600" />
                        Key Career Roles
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {industry.commonCareers.map((role, index) => (
                          <div key={index} className="p-4 bg-gray-50 rounded-lg">
                            <h4 className="font-semibold text-gray-900 mb-2">{role}</h4>
                            <p className="text-sm text-gray-600">
                              Core position in {industry.name} industry with growth opportunities
                            </p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Essential Skills */}
                {industry.criticalSkills && industry.criticalSkills.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center text-2xl">
                        <Zap className="h-6 w-6 mr-3 text-green-600" />
                        Essential Skills
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {industry.criticalSkills.map((skillId, index) => {
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
                            <Badge key={index} variant="outline" className="opacity-60">
                              {skillId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                            </Badge>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Related Careers */}
                {relatedCareers.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center text-2xl">
                        <Users className="h-6 w-6 mr-3 text-purple-600" />
                        Career Opportunities
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {relatedCareers.slice(0, 6).map((career) => (
                          <Link key={career.id} href={`/careers/${career.slug}`}>
                            <div className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
                              <h5 className="font-medium text-gray-900 mb-1">{career.title}</h5>
                              <p className="text-sm text-gray-600 line-clamp-2">
                                {career.summary}
                              </p>
                              <div className="flex items-center mt-2 text-xs text-gray-500">
                                <Target className="h-3 w-3 mr-1" />
                                {career.coreSkills.length} skills required
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                      {relatedCareers.length > 6 && (
                        <div className="mt-4 text-center">
                          <Button variant="outline">
                            View All {relatedCareers.length} Career Paths
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Right Column - Sidebar */}
              <div className="space-y-6">
                {/* Industry Insights */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
                      Profile Coverage
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Skill guides</span>
                      <span className="text-sm font-medium text-gray-900">{relatedSkills.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Career profiles</span>
                      <span className="text-sm font-medium text-green-700">{relatedCareers.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Challenges mapped</span>
                      <span className="text-sm font-medium text-blue-700">{industry.challenges.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Last reviewed</span>
                      <time dateTime={industry.lastUpdated} className="text-sm font-medium text-purple-700">{new Date(industry.lastUpdated).toLocaleDateString('en-CA', { year: 'numeric', month: 'short' })}</time>
                    </div>
                  </CardContent>
                </Card>

                {/* Industry Tools */}
                {industry.tools && industry.tools.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Award className="h-5 w-5 mr-2 text-green-600" />
                        Common Tools
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {industry.tools.map((tool, index) => (
                          <Badge key={index} variant="outline" size="sm">
                            {tool}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {relatedPosts.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <FileText className="mr-2 h-5 w-5 text-violet-600" />
                        Related Articles
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {relatedPosts.map((post) => (
                        <Link key={post.slug} href={`/blog/${post.slug}`} className="block text-sm font-semibold text-blue-700 hover:text-blue-900">
                          {post.title}
                        </Link>
                      ))}
                    </CardContent>
                  </Card>
                )}

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Zap className="h-5 w-5 mr-2 text-orange-600" />
                      Quick Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Link href="/careers" className="block">
                      <Button variant="outline" className="w-full justify-start">
                        <Users className="h-4 w-4 mr-2" />
                        View All Careers
                      </Button>
                    </Link>
                    <Link href="/skills" className="block">
                      <Button variant="outline" className="w-full justify-start">
                        <Target className="h-4 w-4 mr-2" />
                        Explore Skills
                      </Button>
                    </Link>
                    <Link href="/blog" className="block">
                      <Button variant="outline" className="w-full justify-start">
                        <TrendingUp className="h-4 w-4 mr-2" />
                        Read Market Insights
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </div>
          </>
        )}

        {/* Action Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Enter {industry.name}?
            </h3>
            
            <p className="text-gray-700 mb-8">
              Develop the right skills and explore career paths in this industry. 
              Our platform can help you create a strategic entry plan.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/paths">
                <Button size="lg" className="px-8">
                  <Target className="h-4 w-4 mr-2" />
                  Choose a Learning Path
                </Button>
              </Link>
              <Link href="/careers">
                <Button variant="outline" size="lg" className="px-8">
                  <Briefcase className="h-4 w-4 mr-2" />
                  Explore Careers
                </Button>
              </Link>
              <Link href="/skills">
                <Button variant="outline" size="lg" className="px-8">
                  <Zap className="h-4 w-4 mr-2" />
                  View Required Skills
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
