import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getAllCareers } from '@/lib/content';
import { ArrowRight, Briefcase, TrendingUp, DollarSign, MapPin } from 'lucide-react';

export const metadata = {
  title: 'Career Paths & Skill Requirements',
  description: 'Explore career profiles, core skills, growth paths, work environments, and practical routes into modern careers.',
  alternates: { canonical: '/careers' },
};

export default async function CareersPage() {
  const careers = await getAllCareers();

  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Career Intelligence Platform
          </h1>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Understand the skills, pathways, and market dynamics of modern professional careers. 
            Make informed decisions with practical career profiles, skill connections, and role context.
          </p>
        </div>

        {/* Stats */}
        <div className="mt-8 flex justify-center">
          <div className="flex items-center space-x-8 text-sm text-gray-600">
            <span>{careers.length} Career Profiles</span>
            <span>•</span>
            <span>{careers.filter(c => c.featured).length} Featured</span>
            <span>•</span>
            <span>Skill-Connected</span>
          </div>
        </div>

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
                      {career.demandLevel && (
                        <Badge 
                          variant={
                            career.demandLevel === 'very-high' ? 'success' :
                            career.demandLevel === 'high' ? 'warning' :
                            career.demandLevel === 'moderate' ? 'info' : 'gray'
                          }
                          size="sm"
                        >
                          {career.demandLevel.replace('-', ' ')} demand
                        </Badge>
                      )}
                    </div>

                  </div>
                  <CardTitle className="text-xl">{career.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    {career.summary}
                  </p>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="font-medium mr-2">Core Skills:</span>
                      <span>{career.coreSkills.length} required</span>
                    </div>
                    {career.salaryRange && (
                      <div className="flex items-center text-sm text-gray-600">
                        <DollarSign className="h-4 w-4 mr-2" />
                        <span>{career.salaryRange}</span>
                      </div>
                    )}
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{career.commonIndustries.length} industries</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex flex-wrap gap-1">
                      {career.commonIndustries.slice(0, 2).map((industry, index) => (
                        <Badge key={index} variant="outline" size="sm">
                          {industry.replace('-', ' ')}
                        </Badge>
                      ))}
                      {career.commonIndustries.length > 2 && (
                        <Badge variant="outline" size="sm">
                          +{career.commonIndustries.length - 2}
                        </Badge>
                      )}
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
            <div className="text-sm text-gray-600">
              {careers.length} careers
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {careers.map((career) => (
              <Card key={career.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <Badge 
                      variant={
                        career.demandLevel === 'very-high' ? 'success' :
                        career.demandLevel === 'high' ? 'warning' :
                        career.demandLevel === 'moderate' ? 'info' : 'gray'
                      }
                      size="sm"
                    >
                      {career.demandLevel?.replace('-', ' ') || 'Moderate'} demand
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{career.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-gray-600 mb-3">
                    {career.summary.substring(0, 120)}...
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-500">
                      {career.coreSkills.length} core skills
                    </div>
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
              Every career profile includes comprehensive intelligence for strategic career planning
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
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Growth Paths</h3>
              <p className="text-sm text-gray-600">
                Clear progression routes and advancement opportunities
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Industry Context</h3>
              <p className="text-sm text-gray-600">
                Industry variations and work environment insights
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <DollarSign className="h-6 w-6 text-yellow-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Market Intelligence</h3>
              <p className="text-sm text-gray-600">
                Salary ranges, demand levels, and future outlook
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
            Connect your skills to career opportunities and build a strategic development plan
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/skills"><Button>Explore Skills</Button></Link>
            <Link href="/industries"><Button variant="outline">Browse Industries</Button></Link>
          </div>
        </div>
      </div>
    </div>
  );
}