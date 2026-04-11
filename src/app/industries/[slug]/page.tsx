import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getIndustryBySlug, getAllIndustries, getCareersForIndustry, getSkillsForIndustry } from '@/lib/content';
import { 
  ArrowLeft, 
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
  DollarSign
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
      title: 'Industry Not Found - SkillQuest',
    };
  }
  
  return {
    title: `${industry.name} Industry Guide - SkillQuest | Career Opportunities & Skills`,
    description: industry.description,
  };
}

export default async function IndustryDetailPage({ params }: IndustryDetailPageProps) {
  const { slug } = await params;
  const industry = await getIndustryBySlug(slug);
  
  if (!industry) {
    notFound();
  }

  const [relatedCareers, relatedSkills] = await Promise.all([
    getCareersForIndustry(slug).catch(() => []),
    getSkillsForIndustry(slug).catch(() => [])
  ]);

  return (
    <div className="py-12 bg-gradient-to-b from-blue-50/30 to-white min-h-screen">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Back Navigation */}
        <div className="mb-8">
          <Link 
            href="/industries" 
            className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors group"
          >
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Industries
          </Link>
        </div>

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
                  High Growth
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
                  {industry.commonCareers?.length || 0} positions
                </div>
              </div>
              
              <div className="text-center p-4 bg-white/60 rounded-xl">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-green-100 mb-2">
                  <Target className="h-6 w-6 text-green-600" />
                </div>
                <div className="text-sm font-medium text-gray-500 mb-1">Core Skills</div>
                <div className="text-sm font-semibold text-green-600">
                  {industry.criticalSkills?.length || 0} essential
                </div>
              </div>
              
              <div className="text-center p-4 bg-white/60 rounded-xl">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-purple-100 mb-2">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
                <div className="text-sm font-medium text-gray-500 mb-1">Growth Rate</div>
                <div className="text-sm font-semibold text-purple-600">
                  Expanding
                </div>
              </div>
              
              <div className="text-center p-4 bg-white/60 rounded-xl">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-orange-100 mb-2">
                  <DollarSign className="h-6 w-6 text-orange-600" />
                </div>
                <div className="text-sm font-medium text-gray-500 mb-1">Salary Range</div>
                <div className="text-sm font-semibold text-orange-600">
                  Competitive
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
              We're currently developing comprehensive career and skill intelligence 
              for the {industry.name} industry. This profile will include detailed 
              role hierarchies, skill requirements, and market trends.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button variant="outline">
                <Target className="h-4 w-4 mr-2" />
                Notify When Ready
              </Button>
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Browse Other Industries
              </Button>
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
                      Industry Insights
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Market Size</span>
                      <span className="text-sm font-medium text-gray-900">
                        Large
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Growth Rate</span>
                      <span className="text-sm font-medium text-green-600">
                        Positive
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Remote Work</span>
                      <span className="text-sm font-medium text-blue-600">
                        Hybrid
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">AI Impact</span>
                      <span className="text-sm font-medium text-purple-600">
                        Moderate
                      </span>
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

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Zap className="h-5 w-5 mr-2 text-orange-600" />
                      Quick Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <Users className="h-4 w-4 mr-2" />
                      View All Careers
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Target className="h-4 w-4 mr-2" />
                      Explore Skills
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Market Trends
                    </Button>
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
              <Button size="lg" className="px-8">
                <Target className="h-4 w-4 mr-2" />
                Create Career Plan
              </Button>
              <Button variant="outline" size="lg" className="px-8">
                <Briefcase className="h-4 w-4 mr-2" />
                Explore Careers
              </Button>
              <Button variant="outline" size="lg" className="px-8">
                <Zap className="h-4 w-4 mr-2" />
                View Required Skills
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}