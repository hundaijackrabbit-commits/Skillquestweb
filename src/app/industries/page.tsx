import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getAllIndustries } from '@/lib/content';
import { 
  ArrowRight, 
  Building2, 
  TrendingUp, 
  Users,
  Target,
  Globe,
  Zap,
  Star,
  BarChart3,
  Compass,
  Award
} from 'lucide-react';

export const metadata = {
  title: 'Industries: Skills, Careers & Opportunities',
  description: 'Explore skill requirements, career paths, trends, and opportunities across major industries.',
  alternates: { canonical: '/industries' },
};

export default async function IndustriesPage() {
  const industries = await getAllIndustries();
  const featuredIndustries = industries.filter(industry => industry.featured);
  
  return (
    <div className="py-12 bg-gradient-to-b from-blue-50/30 to-white min-h-screen">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mx-auto max-w-4xl text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-sm font-medium mb-6">
            <Globe className="h-4 w-4 mr-2" />
            Industry Intelligence Platform
          </div>
          
          <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-6">
            Career Opportunities
            <span className="text-blue-600 block">By Industry</span>
          </h1>
          
          <p className="text-xl leading-8 text-gray-600 mb-8">
            Explore career paths, skill requirements, and market dynamics across major industries. 
            Make strategic career decisions with comprehensive sector intelligence and trend analysis.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{industries.length}</div>
              <div className="text-sm font-medium text-gray-600">Major Industries</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">{featuredIndustries.length}</div>
              <div className="text-sm font-medium text-gray-600">Featured Industries</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">100+</div>
              <div className="text-sm font-medium text-gray-600">Career Profiles</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">1,300+</div>
              <div className="text-sm font-medium text-gray-600">Skills Indexed</div>
            </div>
          </div>
        </div>

        {/* Content Status */}
        {industries.length === 0 ? (
          <div className="text-center py-16">
            <div className="mx-auto max-w-md">
              <Building2 className="h-24 w-24 text-gray-300 mx-auto mb-6" />
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Industry Intelligence Coming Soon
              </h2>
              <p className="text-gray-600 mb-8">
                We're compiling comprehensive industry profiles with career paths, 
                skill requirements, and market trends. Our industry intelligence 
                platform will be available shortly.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="font-medium text-blue-900">Technology</div>
                  <div className="text-blue-700">Software, AI, Cloud</div>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="font-medium text-green-900">Healthcare</div>
                  <div className="text-green-700">Medical, Biotech</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="font-medium text-purple-900">Finance</div>
                  <div className="text-purple-700">Banking, Fintech</div>
                </div>
                <div className="bg-orange-50 rounded-lg p-4">
                  <div className="font-medium text-orange-900">Education</div>
                  <div className="text-orange-700">EdTech, Training</div>
                </div>
                <div className="bg-pink-50 rounded-lg p-4">
                  <div className="font-medium text-pink-900">Marketing</div>
                  <div className="text-pink-700">Digital, Creative</div>
                </div>
                <div className="bg-indigo-50 rounded-lg p-4">
                  <div className="font-medium text-indigo-900">Consulting</div>
                  <div className="text-indigo-700">Strategy, Operations</div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Featured Industries */}
            {featuredIndustries.length > 0 && (
              <div className="mb-16">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 flex items-center">
                    <Star className="h-7 w-7 mr-3 text-yellow-500" />
                    Featured Industries
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {featuredIndustries.slice(0, 4).map((industry) => (
                    <Card key={industry.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-pink-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      <CardHeader className="relative">
                        <div className="flex items-center justify-between mb-4">
                          <Badge 
                            variant="default" 
                            className="bg-green-100 text-green-800 font-medium"
                          >
                            <TrendingUp className="h-3 w-3 mr-1" />
                            Featured
                          </Badge>
                          <div className="text-xs text-gray-500 uppercase tracking-wide">
                            Industry Sector
                          </div>
                        </div>
                        
                        <CardTitle className="text-2xl group-hover:text-blue-600 transition-colors">
                          {industry.name}
                        </CardTitle>
                      </CardHeader>

                      <CardContent className="relative">
                        <p className="text-gray-700 mb-6 leading-relaxed">
                          {industry.description}
                        </p>
                        
                        <div className="space-y-4 mb-6">
                          <div className="flex items-center text-sm text-gray-600">
                            <Users className="h-4 w-4 mr-2 text-blue-600" />
                            <span>{industry.commonCareers?.length || 0} key career roles</span>
                          </div>
                          
                          <div className="flex items-center text-sm text-gray-600">
                            <Target className="h-4 w-4 mr-2 text-green-600" />
                            <span>{industry.criticalSkills?.length || 0} essential skills</span>
                          </div>
                          
                          <div className="flex items-center text-sm text-gray-600">
                            <BarChart3 className="h-4 w-4 mr-2 text-purple-600" />
                            <span>Market growth: Expanding</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="text-xs text-gray-500 uppercase tracking-wide">
                            Industry Profile
                          </div>
                          <Link href={`/industries/${industry.slug}`}>
                            <Button className="bg-blue-600 hover:bg-blue-700 shadow-sm hover:shadow-md">
                              Explore <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* All Industries */}
            <div className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900">All Industries</h2>
                <div className="text-sm text-gray-600">
                  {industries.length} sectors analyzed
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {industries.map((industry) => (
                  <Card key={industry.id} className="hover:shadow-lg transition-shadow group">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant="outline" size="sm">
                          Industry
                        </Badge>
                        {industry.featured && (
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        )}
                      </div>
                      <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                        {industry.name}
                      </CardTitle>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {industry.description}
                      </p>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-xs text-gray-500">
                          <Users className="h-3 w-3 mr-2" />
                          <span>{industry.commonCareers?.length || 0} career roles</span>
                        </div>
                        <div className="flex items-center text-xs text-gray-500">
                          <Target className="h-3 w-3 mr-2" />
                          <span>{industry.criticalSkills?.length || 0} core skills</span>
                        </div>
                        <div className="flex items-center text-xs text-gray-500">
                          <TrendingUp className="h-3 w-3 mr-2" />
                          <span>{industry.trends?.length || 0} trends tracked</span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="text-xs text-gray-500 uppercase tracking-wide">
                          Sector Profile
                        </div>
                        <Link href={`/industries/${industry.slug}`}>
                          <Button variant="outline" size="sm">
                            Explore <ArrowRight className="ml-1 h-3 w-3" />
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Intelligence Features */}
        <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-2xl p-12 mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center">
              <Compass className="h-8 w-8 mr-3 text-blue-500" />
              Industry Intelligence Features
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Comprehensive sector analysis for strategic career planning
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Career Mapping</h3>
              <p className="text-sm text-gray-600">
                Detailed role hierarchies and advancement pathways
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Skill Requirements</h3>
              <p className="text-sm text-gray-600">
                Essential and emerging skills for each industry
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Market Trends</h3>
              <p className="text-sm text-gray-600">
                Growth rates, salary ranges, and employment outlook
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Entry Strategies</h3>
              <p className="text-sm text-gray-600">
                Proven pathways for breaking into each industry
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Find Your Industry Fit
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Explore industries that match your skills and interests. Get strategic 
            insights for making informed career transitions and advancement decisions.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/skills"><Button size="lg" className="px-8"><Target className="h-4 w-4 mr-2" />Explore Skills</Button></Link>
            <Link href="/careers"><Button variant="outline" size="lg" className="px-8"><Compass className="h-4 w-4 mr-2" />Browse Careers</Button></Link>
          </div>
        </div>
      </div>
    </div>
  );
}
