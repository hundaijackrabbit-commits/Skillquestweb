import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/navigation/breadcrumbs';
import { getAllIndustries } from '@/lib/content';
import { 
  ArrowRight, 
  Building2, 
  TrendingUp, 
  Users,
  Target,
  Globe,
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

function humanize(value: string) {
  return value.replaceAll('-', ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export default async function IndustriesPage() {
  const industries = await getAllIndustries();
  const featuredIndustries = industries.filter(industry => industry.featured);
  
  return (
    <div className="py-12 bg-gradient-to-b from-blue-50/30 to-white min-h-screen">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Breadcrumbs className="mb-10" items={[{ label: 'Home', href: '/' }, { label: 'Industries' }]} />
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
            Explore how skills and roles connect across major industries.
            Each profile organizes sector characteristics, challenges, opportunities, and linked learning resources.
          </p>

          <div className="grid gap-4 text-left md:grid-cols-3">
            <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
              <h2 className="font-bold text-slate-950">What is changing?</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">Review the forces reshaping the sector, then separate durable shifts from passing headlines.</p>
            </div>
            <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
              <h2 className="font-bold text-slate-950">Where could I contribute?</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">Compare the problems, working environments, and career families found across the industry.</p>
            </div>
            <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
              <h2 className="font-bold text-slate-950">What should I learn?</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">Connect established capabilities with emerging skills before choosing a learning path.</p>
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
                We&apos;re compiling comprehensive industry profiles with career paths, 
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
                          <div className="flex items-start text-sm text-gray-600">
                            <Users className="mt-1 h-4 w-4 mr-2 shrink-0 text-blue-600" />
                            <span><strong className="font-semibold text-slate-800">Career examples:</strong> {industry.commonCareers.slice(0, 3).map(humanize).join(', ')}</span>
                          </div>
                          
                          <div className="flex items-start text-sm text-gray-600">
                            <Target className="mt-1 h-4 w-4 mr-2 shrink-0 text-green-600" />
                            <span><strong className="font-semibold text-slate-800">Skill focus:</strong> {industry.criticalSkills.slice(0, 3).map(humanize).join(', ')}</span>
                          </div>
                          
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="text-xs text-gray-500 uppercase tracking-wide">
                            Industry Profile
                          </div>
                          <Link href={`/industries/${industry.slug}`}>
                            <Button asChild className="bg-blue-600 hover:bg-blue-700 shadow-sm hover:shadow-md">
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
                <p className="text-sm text-slate-600">Compare work, change, skills, and opportunity</p>
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
                      
                      <div className="space-y-3 mb-4">
                        <div className="flex items-start text-xs leading-5 text-gray-500">
                          <Users className="mt-1 h-3 w-3 mr-2 shrink-0" />
                          <span><strong className="font-semibold text-slate-700">Roles:</strong> {industry.commonCareers.slice(0, 2).map(humanize).join(', ')}</span>
                        </div>
                        <div className="flex items-start text-xs leading-5 text-gray-500">
                          <Target className="mt-1 h-3 w-3 mr-2 shrink-0" />
                          <span><strong className="font-semibold text-slate-700">Skills:</strong> {industry.criticalSkills.slice(0, 2).map(humanize).join(', ')}</span>
                        </div>
                        <div className="flex items-start text-xs leading-5 text-gray-500">
                          <TrendingUp className="mt-1 h-3 w-3 mr-2 shrink-0" />
                          <span><strong className="font-semibold text-slate-700">Change signal:</strong> {industry.trends[0]}</span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="text-xs text-gray-500 uppercase tracking-wide">
                          Sector Profile
                        </div>
                        <Link href={`/industries/${industry.slug}`}>
                          <Button asChild variant="outline" size="sm">
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
              Every profile is organized to help you move from broad sector curiosity to a practical next question.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Work and Roles</h3>
              <p className="text-sm text-gray-600">
                See the recurring problems, environments, and career families inside the sector
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Capability Map</h3>
              <p className="text-sm text-gray-600">
                Compare durable foundations with capabilities that are becoming more important
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Change Signals</h3>
              <p className="text-sm text-gray-600">
                Examine trends alongside constraints and avoid treating change as automatically positive
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Opportunity Areas</h3>
              <p className="text-sm text-gray-600">
                Use connected careers and learning resources to investigate realistic next steps
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
            Compare industries with your interests, preferred work, and existing strengths before committing to a career direction.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/dashboard"><Button asChild size="lg" className="px-8"><Target className="h-4 w-4 mr-2" />Build My Profile</Button></Link>
            <Link href="/careers"><Button asChild variant="outline" size="lg" className="px-8"><Compass className="h-4 w-4 mr-2" />Browse Careers</Button></Link>
          </div>
        </div>
      </div>
    </div>
  );
}
