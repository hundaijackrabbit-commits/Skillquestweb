'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Career, Skill } from '@/lib/types';
import { 
  ArrowRight, 
  ArrowUp, 
  Users, 
  Target, 
  TrendingUp,
  MapPin,
  Clock,
  Briefcase,
  Zap
} from 'lucide-react';

interface CareerPathwayProps {
  career: Career;
  relatedSkills: Skill[];
  relatedCareers?: Career[];
  className?: string;
}

interface PathwayStep {
  level: 'entry' | 'mid' | 'senior' | 'executive';
  title: string;
  description: string;
  skills: string[];
  timeframe: string;
  responsibilities: string[];
}

const getPathwaySteps = (career: Career): PathwayStep[] => {
  // Generate realistic career progression steps
  const baseTitle = career.title.replace(/Senior |Lead |Principal |Director |VP |Chief /, '');
  
  return [
    {
      level: 'entry',
      title: `Junior ${baseTitle}`,
      description: 'Entry-level position focusing on learning fundamentals and building experience',
      skills: career.coreSkills.slice(0, 3),
      timeframe: '0-2 years',
      responsibilities: career.beginnerEntryStrategies.slice(0, 3)
    },
    {
      level: 'mid',
      title: baseTitle,
      description: 'Mid-level position with increased responsibility and independence',
      skills: [...career.coreSkills.slice(0, 2), ...career.secondarySkills.slice(0, 2)],
      timeframe: '2-5 years',
      responsibilities: ['Lead project initiatives', 'Mentor junior team members', 'Drive strategic improvements']
    },
    {
      level: 'senior',
      title: `Senior ${baseTitle}`,
      description: 'Senior position leading teams and strategic initiatives',
      skills: [...career.coreSkills, ...career.secondarySkills.slice(0, 2)],
      timeframe: '5-8 years',
      responsibilities: ['Lead cross-functional teams', 'Develop strategy and roadmaps', 'Drive organizational change']
    },
    {
      level: 'executive',
      title: career.growthOpportunities[0] || `Director of ${baseTitle.replace(/Manager/, 'Operations')}`,
      description: 'Executive position setting vision and leading large organizations',
      skills: [...career.coreSkills, ...career.transferableSkills.slice(0, 3)],
      timeframe: '8+ years',
      responsibilities: ['Set organizational vision', 'Lead multiple teams', 'Drive business strategy']
    }
  ];
};

const getLevelColor = (level: string) => {
  const colors = {
    entry: 'from-green-400 to-green-600',
    mid: 'from-blue-400 to-blue-600', 
    senior: 'from-purple-400 to-purple-600',
    executive: 'from-orange-400 to-orange-600'
  };
  return colors[level as keyof typeof colors] || 'from-gray-400 to-gray-600';
};

const getLevelBadgeColor = (level: string) => {
  const colors = {
    entry: 'bg-green-100 text-green-800',
    mid: 'bg-blue-100 text-blue-800',
    senior: 'bg-purple-100 text-purple-800', 
    executive: 'bg-orange-100 text-orange-800'
  };
  return colors[level as keyof typeof colors] || 'bg-gray-100 text-gray-800';
};

export function CareerPathway({ career, relatedSkills, relatedCareers, className }: CareerPathwayProps) {
  const pathwaySteps = getPathwaySteps(career);
  
  return (
    <div className={className}>
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-900 flex items-center">
            <Target className="h-8 w-8 mr-3 text-blue-600" />
            Career Pathway
          </h2>
          <Badge variant="outline" className="flex items-center">
            <MapPin className="h-4 w-4 mr-1" />
            Industry-connected role
          </Badge>
        </div>
        
        <p className="text-lg text-gray-600 max-w-3xl">
          Strategic progression path for {career.title} showing skills development, 
          responsibilities growth, and typical advancement timeline.
        </p>
      </div>

      {/* Pathway Visualization */}
      <div className="relative">
        {/* Connection Lines */}
        <div className="absolute left-8 top-24 bottom-0 w-0.5 bg-gradient-to-b from-green-300 via-blue-300 via-purple-300 to-orange-300 hidden lg:block" />
        
        <div className="space-y-8">
          {pathwaySteps.map((step, index) => (
            <div key={step.level} className="relative">
              {/* Level Indicator */}
              <div className="absolute left-0 top-6 hidden lg:block">
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${getLevelColor(step.level)} flex items-center justify-center shadow-lg`}>
                  <span className="text-white font-bold text-lg">{index + 1}</span>
                </div>
              </div>

              {/* Content Card */}
              <div className="lg:ml-24">
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardHeader className="bg-gradient-to-r from-gray-50 to-blue-50">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <div className="flex items-center space-x-3 mb-2">
                          <Badge className={getLevelBadgeColor(step.level)}>
                            {step.level.toUpperCase()}
                          </Badge>
                          <Badge variant="outline" className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {step.timeframe}
                          </Badge>
                        </div>
                        <CardTitle className="text-xl text-gray-900">
                          {step.title}
                        </CardTitle>
                        <p className="text-gray-600 mt-1">
                          {step.description}
                        </p>
                      </div>
                      
                      {index < pathwaySteps.length - 1 && (
                        <ArrowUp className="h-6 w-6 text-gray-400 mt-4 sm:mt-0 transform rotate-45" />
                      )}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Key Skills */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                          <Zap className="h-4 w-4 mr-2 text-blue-600" />
                          Key Skills Required
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {step.skills.map((skillId) => {
                            const skill = relatedSkills.find(s => s.id === skillId);
                            return skill ? (
                              <Link 
                                key={skillId}
                                href={`/skills/${skill.slug}`}
                                className="inline-block"
                              >
                                <Badge 
                                  variant="secondary" 
                                  className="hover:bg-blue-100 hover:text-blue-800 cursor-pointer transition-colors"
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

                      {/* Key Responsibilities */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                          <Briefcase className="h-4 w-4 mr-2 text-green-600" />
                          Key Responsibilities
                        </h4>
                        <ul className="space-y-1 text-sm text-gray-600">
                          {step.responsibilities.slice(0, 3).map((responsibility, idx) => (
                            <li key={idx} className="flex items-start">
                              <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 mr-2 flex-shrink-0" />
                              {responsibility}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Progression Insight */}
                    {index < pathwaySteps.length - 1 && (
                      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                        <div className="flex items-start">
                          <TrendingUp className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                          <div>
                            <h5 className="font-medium text-blue-900 mb-1">Path to Next Level</h5>
                            <p className="text-sm text-blue-700">
                              Focus on developing {pathwaySteps[index + 1].skills.slice(-2).join(' and ').replace(/-/g, ' ')} skills 
                              while building leadership experience and expanding your network.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Alternative Career Transitions */}
      {relatedCareers && relatedCareers.length > 0 && (
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <ArrowRight className="h-6 w-6 mr-3 text-purple-600" />
            Alternative Career Paths
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedCareers.slice(0, 4).map((relatedCareer) => (
              <Card key={relatedCareer.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="flex items-center">
                      <Users className="h-3 w-3 mr-1" />
                      Transition
                    </Badge>
                    {relatedCareer.demandLevel && (
                      <Badge 
                        variant={relatedCareer.demandLevel === 'very-high' ? 'success' : 'secondary'}
                        size="sm"
                      >
                        {relatedCareer.demandLevel} demand
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg">{relatedCareer.title}</CardTitle>
                </CardHeader>
                
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    {relatedCareer.summary}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-500">
                      Compare capability map
                    </div>
                    <Link 
                      href={`/careers/${relatedCareer.slug}`}
                      className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center"
                    >
                      Explore <ArrowRight className="h-3 w-3 ml-1" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
