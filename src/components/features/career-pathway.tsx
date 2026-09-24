'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Career, Skill } from '@/lib/types';
import { ArrowRight, Users, Target, MapPin, Briefcase, Zap } from 'lucide-react';

interface CareerPathwayProps {
  career: Career;
  relatedSkills: Skill[];
  relatedCareers?: Career[];
  className?: string;
}

interface PathwayStep {
  label: string;
  title: string;
  description: string;
  skills: string[];
  focus: string[];
}

const unique = (items: string[]) => Array.from(new Set(items.filter(Boolean)));

const getPathwaySteps = (career: Career): PathwayStep[] => {
  const growthOptions = career.growthOpportunities?.filter(Boolean) || [];
  const entryRoutes = career.beginnerEntryStrategies?.filter(Boolean) || [];

  return [
    {
      label: 'GET STARTED',
      title: `Build evidence for ${career.title}`,
      description: 'Develop the core capabilities and create evidence that you can apply them in realistic work.',
      skills: unique(career.coreSkills.slice(0, 3)),
      focus: entryRoutes.slice(0, 3)
    },
    {
      label: 'BUILD DEPTH',
      title: `Grow in ${career.title}`,
      description: 'Take on broader or more complex work as your judgment, independence, and domain knowledge improve.',
      skills: unique([...career.coreSkills.slice(0, 3), ...career.secondarySkills.slice(0, 2)]),
      focus: [
        'Handle more complex work with less supervision',
        'Build stronger evidence through projects and measurable outcomes',
        'Deepen role-specific skills and domain knowledge'
      ]
    },
    {
      label: 'EXPLORE NEXT MOVES',
      title: 'Possible directions from here',
      description: 'Career growth is not a single ladder. Depending on the organization and your interests, you may deepen as a specialist, broaden your scope, move into leadership, or transition into adjacent work.',
      skills: unique([...career.secondarySkills.slice(0, 2), ...career.transferableSkills.slice(0, 3)]),
      focus: growthOptions.length > 0
        ? growthOptions.slice(0, 3)
        : [
            'Deepen as a specialist',
            'Broaden into adjacent responsibilities',
            'Compare related roles before choosing a next step'
          ]
    }
  ];
};

export function CareerPathway({ career, relatedSkills, relatedCareers, className }: CareerPathwayProps) {
  const pathwaySteps = getPathwaySteps(career);

  return (
    <div className={className}>
      <div className="mb-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-4">
          <h2 className="text-3xl font-bold text-gray-900 flex items-center">
            <Target className="h-8 w-8 mr-3 text-blue-600" />
            Career Development Map
          </h2>
          <Badge variant="outline" className="flex items-center w-fit">
            <MapPin className="h-4 w-4 mr-1" />
            Role-specific starting point
          </Badge>
        </div>
        <p className="text-lg text-gray-600 max-w-3xl">
          A practical way to think about developing toward and within {career.title}. Titles, timelines, and promotion paths vary by employer, industry, location, and individual experience, so use this as a planning map rather than a fixed ladder.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {pathwaySteps.map((step, index) => (
          <Card key={step.label} className="overflow-hidden hover:shadow-md transition-shadow">
            <CardHeader className="bg-gradient-to-r from-gray-50 to-blue-50">
              <div className="flex items-center justify-between mb-3">
                <Badge variant="outline">{step.label}</Badge>
                <span className="text-sm font-semibold text-gray-400">0{index + 1}</span>
              </div>
              <CardTitle className="text-xl text-gray-900">{step.title}</CardTitle>
              <p className="text-sm text-gray-600 mt-2">{step.description}</p>
            </CardHeader>

            <CardContent className="pt-6 space-y-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <Zap className="h-4 w-4 mr-2 text-blue-600" />
                  Skills to strengthen
                </h4>
                <div className="flex flex-wrap gap-2">
                  {step.skills.map((skillId) => {
                    const skill = relatedSkills.find(s => s.id === skillId);
                    return skill ? (
                      <Link key={skillId} href={`/skills/${skill.slug}`} className="inline-block">
                        <Badge variant="secondary" className="hover:bg-blue-100 hover:text-blue-800 cursor-pointer transition-colors">
                          {skill.name}
                        </Badge>
                      </Link>
                    ) : (
                      <Badge key={skillId} variant="outline" className="opacity-70">
                        {skillId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </Badge>
                    );
                  })}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <Briefcase className="h-4 w-4 mr-2 text-green-600" />
                  Development focus
                </h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  {step.focus.map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 mr-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {relatedCareers && relatedCareers.length > 0 && (
        <div className="mt-14">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <ArrowRight className="h-6 w-6 mr-3 text-purple-600" />
            Adjacent careers to compare
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedCareers.slice(0, 4).map((relatedCareer) => (
              <Card key={relatedCareer.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <Badge variant="outline" className="flex items-center w-fit mb-2">
                    <Users className="h-3 w-3 mr-1" />
                    Compare
                  </Badge>
                  <CardTitle className="text-lg">{relatedCareer.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">{relatedCareer.summary}</p>
                  <Link href={`/careers/${relatedCareer.slug}`} className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center">
                    Explore role <ArrowRight className="h-3 w-3 ml-1" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
