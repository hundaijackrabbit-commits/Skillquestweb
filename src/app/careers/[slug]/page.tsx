import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getCareerBySlug, getAllCareers, getSkillsForCareer } from '@/lib/content';
import { CareerPathway } from '@/components/features/career-pathway';
import { formatDate } from '@/lib/utils';
import { 
  ArrowLeft, 
  Briefcase, 
  TrendingUp, 
  DollarSign, 
  MapPin, 
  Users,
  Target,
  Clock,
  BookOpen,
  Star,
  Building2,
  Zap,
  Award,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

interface CareerDetailPageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all career slugs
export async function generateStaticParams() {
  const careers = await getAllCareers();
  
  return careers.map((career) => ({
    slug: career.slug,
  }));
}

export async function generateMetadata({ params }: CareerDetailPageProps) {
  const { slug } = await params;
  const career = await getCareerBySlug(slug);
  
  if (!career) {
    return {
      title: 'Career Not Found - SkillQuest',
    };
  }
  
  return {
    title: `${career.title} Career Guide - SkillQuest`,
    description: career.summary,
  };
}

export default async function CareerDetailPage({ params }: CareerDetailPageProps) {
  const { slug } = await params;
  const career = await getCareerBySlug(slug);
  
  if (!career) {
    notFound();
  }

  const relatedSkills = await getSkillsForCareer(career.slug);

  return (
    <div className="py-12 bg-gradient-to-b from-blue-50/30 to-white min-h-screen">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Back Navigation */}
        <div className="mb-8">
          <Link 
            href="/careers" 
            className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors group"
          >
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Career Intelligence
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
                <Briefcase className="h-4 w-4 mr-2" />
                Career Path
              </Badge>
              
              {career.demandLevel && (
                <Badge 
                  variant={
                    career.demandLevel === 'very-high' ? 'success' :
                    career.demandLevel === 'high' ? 'warning' : 'secondary'
                  }
                  className="font-medium"
                >
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {career.demandLevel.replace('-', ' ')} demand
                </Badge>
              )}
              
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
              
              {career.salaryRange && (
                <div className="text-center p-4 bg-white/60 rounded-xl">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-yellow-100 mb-2">
                    <DollarSign className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div className="text-sm font-medium text-gray-500 mb-1">Salary Range</div>
                  <div className="text-sm font-semibold text-yellow-600">
                    {career.salaryRange}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

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
                  {career.commonIndustries.map((industry, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm font-medium text-gray-700">
                        {industry.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </span>
                    </div>
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