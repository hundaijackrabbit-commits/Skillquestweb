'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Career, Skill } from '@/lib/types';
import { ArrowRight, Users, Target, TrendingUp, MapPin, Briefcase, Zap, Compass } from 'lucide-react';

interface CareerPathwayProps {
  career: Career;
  relatedSkills: Skill[];
  relatedCareers?: Career[];
  className?: string;
}

interface PathwayStage {
  id: 'entry' | 'practice' | 'growth';
  label: string;
  title: string;
  description: string;
  skills: string[];
  evidence: string[];
}

function unique(values: string[]) {
  return [...new Set(values.filter(Boolean))];
}

function buildStages(career: Career): PathwayStage[] {
  const entryEvidence = career.beginnerEntryStrategies.length
    ? career.beginnerEntryStrategies
    : career.alternativePaths.slice(0, 4);

  const practiceEvidence = unique([
    ...career.coreSkills.map((skill) => `Build working evidence in ${skill.replace(/-/g, ' ')}`),
    ...career.secondarySkills.slice(0, 2).map((skill) => `Add supporting capability in ${skill.replace(/-/g, ' ')}`),
  ]);

  const growthEvidence = career.growthOpportunities.length
    ? career.growthOpportunities
    : career.alternativePaths.slice(0, 4);

  return [
    {
      id: 'entry',
      label: 'ENTRY ROUTES',
      title: `Ways into ${career.title}`,
      description: 'Common ways people begin building relevant experience. These are routes, not mandatory prerequisites or a fixed timeline.',
      skills: career.coreSkills.slice(0, 3),
      evidence: entryEvidence.slice(0, 4),
    },
    {
      id: 'practice',
      label: 'CORE ROLE',
      title: `Working as a ${career.title}`,
      description: 'The focus shifts from gaining access to the role toward producing reliable work, strengthening judgement, and building role-specific evidence.',
      skills: unique([...career.coreSkills, ...career.secondarySkills.slice(0, 3)]),
      evidence: practiceEvidence.slice(0, 5),
    },
    {
      id: 'growth',
      label: 'NEXT DIRECTIONS',
      title: 'Possible progression and specialization',
      description: 'Career growth is not one universal ladder. Depending on the field, people may deepen as specialists, broaden scope, move into management, consult, or transition into adjacent roles.',
      skills: unique([...career.coreSkills.slice(0, 2), ...career.transferableSkills.slice(0, 3)]),
      evidence: growthEvidence.slice(0, 5),
    },
  ];
}

const stageStyles = {
  entry: 'bg-emerald-100 text-emerald-800',
  practice: 'bg-blue-100 text-blue-800',
  growth: 'bg-purple-100 text-purple-800',
};

export function CareerPathway({ career, relatedSkills, relatedCareers, className }: CareerPathwayProps) {
  const stages = buildStages(career);

  return (
    <div className={className}>
      <div className="mb-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="flex items-center text-3xl font-bold text-gray-900">
            <Target className="mr-3 h-8 w-8 text-blue-600" />
            Career Pathway
          </h2>
          <Badge variant="outline" className="w-fit">
            <MapPin className="mr-1 h-4 w-4" />
            Role-specific, non-linear
          </Badge>
        </div>
        <p className="mt-4 max-w-4xl text-lg leading-8 text-gray-600">
          Use this as a decision map rather than a promise of promotion. Entry routes, skill expectations, titles, and advancement vary by employer, industry, geography, and specialization.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {stages.map((stage, index) => (
          <Card key={stage.id} className="overflow-hidden">
            <CardHeader className="border-b bg-slate-50/80">
              <div className="mb-3 flex items-center justify-between gap-3">
                <Badge className={stageStyles[stage.id]}>{stage.label}</Badge>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Stage {index + 1}</span>
              </div>
              <CardTitle className="text-xl text-slate-950">{stage.title}</CardTitle>
              <p className="mt-2 text-sm leading-6 text-slate-600">{stage.description}</p>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div>
                <h3 className="mb-3 flex items-center text-sm font-semibold text-slate-900">
                  <Zap className="mr-2 h-4 w-4 text-blue-600" />
                  Capability focus
                </h3>
                <div className="flex flex-wrap gap-2">
                  {stage.skills.map((skillId) => {
                    const skill = relatedSkills.find((item) => item.id === skillId || item.slug === skillId);
                    return skill ? (
                      <Link key={skillId} href={`/skills/${skill.slug}`}>
                        <Badge variant="secondary" className="hover:bg-blue-100 hover:text-blue-800">{skill.name}</Badge>
                      </Link>
                    ) : (
                      <Badge key={skillId} variant="outline">{skillId.replace(/-/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase())}</Badge>
                    );
                  })}
                </div>
              </div>

              <div>
                <h3 className="mb-3 flex items-center text-sm font-semibold text-slate-900">
                  <Briefcase className="mr-2 h-4 w-4 text-emerald-600" />
                  What this can look like
                </h3>
                <ul className="space-y-2 text-sm leading-6 text-slate-600">
                  {stage.evidence.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {career.alternativePaths.length > 0 && (
        <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50/60 p-6">
          <div className="flex items-start gap-3">
            <Compass className="mt-1 h-5 w-5 shrink-0 text-blue-700" />
            <div>
              <h3 className="font-semibold text-blue-950">Alternative ways into this work</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {career.alternativePaths.slice(0, 6).map((path) => <Badge key={path} variant="outline" className="bg-white">{path}</Badge>)}
              </div>
            </div>
          </div>
        </div>
      )}

      {relatedCareers && relatedCareers.length > 0 && (
        <div className="mt-14">
          <h3 className="mb-6 flex items-center text-2xl font-bold text-gray-900">
            <ArrowRight className="mr-3 h-6 w-6 text-purple-600" />
            Adjacent career directions
          </h3>
          <div className="grid gap-5 md:grid-cols-2">
            {relatedCareers.slice(0, 4).map((relatedCareer) => (
              <Card key={relatedCareer.id} className="transition-shadow hover:shadow-md">
                <CardHeader className="pb-3">
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <Badge variant="outline"><Users className="mr-1 h-3 w-3" />Transition</Badge>
                    {relatedCareer.demandLevel && <Badge variant="secondary" size="sm">{relatedCareer.demandLevel} demand</Badge>}
                  </div>
                  <CardTitle className="text-lg">{relatedCareer.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-sm leading-6 text-gray-600">{relatedCareer.summary}</p>
                  <Link href={`/careers/${relatedCareer.slug}`} className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-700">
                    Compare role <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      <div className="mt-8 flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600">
        <TrendingUp className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />
        <p>Career progression is evidence-based but not deterministic: titles, compensation, experience thresholds, and management structures differ substantially across organizations.</p>
      </div>
    </div>
  );
}
