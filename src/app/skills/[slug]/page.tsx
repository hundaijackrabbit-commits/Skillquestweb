import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getSkillBySlug, getAllSkills, getRelatedSkills, getCareersForSkill } from '@/lib/content';
import { formatCategoryName, formatDate } from '@/lib/utils';
import { 
  ArrowLeft, 
  Star, 
  Briefcase, 
  TrendingUp, 
  Clock, 
  Target, 
  CheckCircle2, 
  AlertTriangle,
  BookOpen,
  Users,
  Building2
} from 'lucide-react';

interface SkillDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const skills = await getAllSkills();
  return skills.map((skill) => ({
    slug: skill.slug,
  }));
}

export async function generateMetadata({ params }: SkillDetailPageProps) {
  const resolvedParams = await params;
  const skill = await getSkillBySlug(resolvedParams.slug);
  
  if (!skill) {
    return {
      title: 'Skill Not Found',
    };
  }

  return {
    title: `${skill.name} - Professional Skill Guide | SkillQuest`,
    description: skill.shortDefinition,
    keywords: [skill.name, ...skill.professionalContexts, 'professional development', 'career skills'],
    openGraph: {
      title: `${skill.name} - Professional Skill Guide`,
      description: skill.shortDefinition,
      type: 'article',
    },
  };
}

export default async function SkillDetailPage({ params }: SkillDetailPageProps) {
  const resolvedParams = await params;
  const skill = await getSkillBySlug(resolvedParams.slug);

  if (!skill) {
    notFound();
  }

  const [relatedSkills, relatedCareers] = await Promise.all([
    getRelatedSkills(skill.id),
    getCareersForSkill(skill.slug)
  ]);

  return (
    <div className="py-12">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        {/* Back Navigation */}
        <div className="mb-8">
          <Link href="/skills" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Skills
          </Link>
        </div>

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center space-x-4 mb-4">
            <Badge variant="info" size="lg">
              {formatCategoryName(skill.category)}
            </Badge>
            <div className="flex items-center space-x-1">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <span className="font-medium text-gray-900">{skill.employerSignalValue}/10</span>
              <span className="text-sm text-gray-500">employer signal</span>
            </div>
          </div>
          
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">
            {skill.name}
          </h1>
          
          <p className="text-xl text-gray-600 mb-6">
            {skill.shortDefinition}
          </p>

          {/* Key Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="text-center">
              <div className="text-sm font-medium text-gray-500 mb-1">Difficulty</div>
              <Badge variant={
                skill.difficulty === 'beginner' ? 'success' : 
                skill.difficulty === 'intermediate' ? 'warning' : 'danger'
              }>
                {skill.difficulty || 'Intermediate'}
              </Badge>
            </div>
            <div className="text-center">
              <div className="text-sm font-medium text-gray-500 mb-1">Time to Develop</div>
              <div className="text-sm font-semibold">{skill.estimatedTimeToDevelop}</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-medium text-gray-500 mb-1">Automation Risk</div>
              <Badge variant={
                skill.automationRisk === 'low' ? 'success' : 
                skill.automationRisk === 'medium' ? 'warning' : 'danger'
              }>
                {skill.automationRisk}
              </Badge>
            </div>
            <div className="text-center">
              <div className="text-sm font-medium text-gray-500 mb-1">Last Updated</div>
              <div className="text-sm">{formatDate(skill.lastUpdated)}</div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Why It Matters */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Target className="h-6 w-6 mr-2 text-blue-600" />
                Why This Skill Matters
              </h2>
              <div className="prose max-w-none">
                <p className="text-gray-700">{skill.whyItMatters}</p>
              </div>
            </section>

            {/* Full Definition */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <BookOpen className="h-6 w-6 mr-2 text-blue-600" />
                Comprehensive Definition
              </h2>
              <div className="prose max-w-none">
                <p className="text-gray-700">{skill.fullDefinition}</p>
              </div>
            </section>

            {/* Modern Relevance */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <TrendingUp className="h-6 w-6 mr-2 text-blue-600" />
                Modern Relevance
              </h2>
              <div className="prose max-w-none">
                <p className="text-gray-700">{skill.modernRelevance}</p>
              </div>
            </section>

            {/* AI Era Context */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                AI Era Context
              </h2>
              <div className="prose max-w-none">
                <p className="text-gray-700">{skill.aiEraRelevance}</p>
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Human Advantage</h4>
                  <p className="text-blue-800 text-sm">{skill.humanAdvantage}</p>
                </div>
              </div>
            </section>

            {/* Development Path */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <CheckCircle2 className="h-6 w-6 mr-2 text-blue-600" />
                Development Path
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 text-green-700">Beginner Level</h3>
                  <ul className="space-y-2">
                    {skill.beginnerActions.map((action, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-gray-700">{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 text-yellow-700">Intermediate Level</h3>
                  <ul className="space-y-2">
                    {skill.intermediateActions.map((action, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 text-yellow-600 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-gray-700">{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 text-red-700">Advanced Level</h3>
                  <ul className="space-y-2">
                    {skill.advancedActions.map((action, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 text-red-600 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-gray-700">{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Common Mistakes */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <AlertTriangle className="h-6 w-6 mr-2 text-yellow-600" />
                Common Mistakes to Avoid
              </h2>
              <ul className="space-y-2">
                {skill.commonMistakes.map((mistake, index) => (
                  <li key={index} className="flex items-start">
                    <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">{mistake}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Evidence Base */}
            {skill.evidenceSummary && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Evidence & Research
                </h2>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="text-gray-700 mb-4">{skill.evidenceSummary}</p>
                  {skill.scholarlyNotes && skill.scholarlyNotes.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Research Notes:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {skill.scholarlyNotes.map((note, index) => (
                          <li key={index}>• {note}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </section>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Professional Context */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Briefcase className="h-5 w-5 mr-2" />
                  Professional Contexts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {skill.professionalContexts.map((context, index) => (
                    <li key={index} className="text-sm text-gray-600">• {context}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Related Careers */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Related Careers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {relatedCareers.slice(0, 5).map((career) => (
                    <Link
                      key={career.id}
                      href={`/careers/${career.slug}`}
                      className="block text-sm text-blue-600 hover:text-blue-800"
                    >
                      {career.title}
                    </Link>
                  ))}
                  {relatedCareers.length > 5 && (
                    <Link href="/careers" className="text-sm text-gray-500 hover:text-gray-700">
                      View all careers →
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Tools & Platforms */}
            <Card>
              <CardHeader>
                <CardTitle>Tools & Platforms</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skill.tools.map((tool, index) => (
                    <Badge key={index} variant="outline" size="sm">
                      {tool}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Related Skills */}
            <Card>
              <CardHeader>
                <CardTitle>Related Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {relatedSkills.map((relatedSkill) => (
                    <Link
                      key={relatedSkill.id}
                      href={`/skills/${relatedSkill.slug}`}
                      className="block text-sm text-blue-600 hover:text-blue-800"
                    >
                      {relatedSkill.name}
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Action Items */}
            <Card className="border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="text-blue-900">Start Developing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm text-blue-800">
                  <strong>How to Practice:</strong>
                  <p className="mt-1">{skill.howToPractice}</p>
                </div>
                <div className="text-sm text-blue-800">
                  <strong>Measure Progress:</strong>
                  <p className="mt-1">{skill.howToMeasureProgress}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}