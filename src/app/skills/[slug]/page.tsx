import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getSkillBySlug, getAllSkills, getRelatedSkills, getCareersForSkill } from '@/lib/content';
import { formatCategoryName, formatDate, getCategoryColor, getRiskLevelColor, getDifficultyColor } from '@/lib/utils';
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
  Building2,
  Brain,
  Zap,
  Shield,
  Globe,
  Sparkles,
  Award,
  Play,
  BarChart3,
  Lightbulb,
  Compass,
  MapPin,
  Layers,
  Activity,
  Eye,
  GraduationCap,
  TrendingDown,
  Link2,
  FileText,
  Search,
  Gauge
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

  const categoryColors = getCategoryColor(skill.category);
  const riskColors = getRiskLevelColor(skill.automationRisk);
  const difficultyColors = getDifficultyColor(skill.difficulty || 'intermediate');

  return (
    <div className="py-12 bg-gradient-to-b from-blue-50/30 to-white min-h-screen">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Back Navigation */}
        <div className="mb-8">
          <Link 
            href="/skills" 
            className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors group"
          >
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Skills Repository
          </Link>
        </div>

        {/* Hero Header */}
        <div className="mb-16">
          <div className="relative bg-gradient-to-r from-white via-blue-50/50 to-purple-50/50 rounded-2xl p-8 shadow-sm border">
            {/* Status Badges */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <Badge 
                variant="default" 
                className={`${categoryColors.bg} ${categoryColors.text} font-medium px-3 py-1`}
                size="lg"
              >
                {formatCategoryName(skill.category)}
              </Badge>
              
              {skill.featured && (
                <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white font-medium">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Featured Skill
                </Badge>
              )}
              
              <Badge variant="outline" className="flex items-center">
                <Award className="h-3 w-3 mr-1" />
                {skill.employerSignalValue}/10 Signal Value
              </Badge>
            </div>
            
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 mb-4">
              {skill.name}
            </h1>
            
            <p className="text-xl text-gray-700 mb-8 max-w-4xl leading-relaxed">
              {skill.shortDefinition}
            </p>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
              <div className="text-center p-4 bg-white/60 rounded-xl">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${difficultyColors.bg} mb-2`}>
                  <Clock className={`h-6 w-6 ${difficultyColors.text}`} />
                </div>
                <div className="text-sm font-medium text-gray-500 mb-1">Difficulty</div>
                <div className={`text-sm font-semibold ${difficultyColors.text}`}>
                  {skill.difficulty || 'Intermediate'}
                </div>
              </div>
              
              <div className="text-center p-4 bg-white/60 rounded-xl">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-blue-100 mb-2">
                  <BarChart3 className="h-6 w-6 text-blue-600" />
                </div>
                <div className="text-sm font-medium text-gray-500 mb-1">Development Time</div>
                <div className="text-sm font-semibold text-blue-600">
                  {skill.estimatedTimeToDevelop.split('.')[0]}
                </div>
              </div>
              
              <div className="text-center p-4 bg-white/60 rounded-xl">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${riskColors.bg} mb-2`}>
                  <Shield className={`h-6 w-6 ${riskColors.text}`} />
                </div>
                <div className="text-sm font-medium text-gray-500 mb-1">Automation Risk</div>
                <div className={`text-sm font-semibold ${riskColors.text} capitalize`}>
                  {skill.automationRisk}
                </div>
              </div>
              
              <div className="text-center p-4 bg-white/60 rounded-xl">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-green-100 mb-2">
                  <Briefcase className="h-6 w-6 text-green-600" />
                </div>
                <div className="text-sm font-medium text-gray-500 mb-1">Career Impact</div>
                <div className="text-sm font-semibold text-green-600">
                  {relatedCareers.length} careers
                </div>
              </div>
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

            {/* Where It Shows Up */}
            {skill.whereItShowsUp && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <MapPin className="h-6 w-6 mr-2 text-blue-600" />
                  Where This Skill Shows Up at Work
                </h2>
                <div className="prose max-w-none">
                  <p className="text-gray-700">{skill.whereItShowsUp}</p>
                </div>
              </section>
            )}

            {/* Career Applications */}
            {skill.careerApplications && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Briefcase className="h-6 w-6 mr-2 text-blue-600" />
                  Career Applications
                </h2>
                <div className="prose max-w-none">
                  <p className="text-gray-700">{skill.careerApplications}</p>
                </div>
              </section>
            )}

            {/* Skill In Action */}
            {skill.skillInAction && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Activity className="h-6 w-6 mr-2 text-blue-600" />
                  What Strong Execution Looks Like
                </h2>
                <div className="prose max-w-none">
                  <p className="text-gray-700">{skill.skillInAction}</p>
                </div>
              </section>
            )}

            {/* Real World Scenarios */}
            {skill.realWorldScenarios && skill.realWorldScenarios.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Globe className="h-6 w-6 mr-2 text-blue-600" />
                  Real-World Applications
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {skill.realWorldScenarios.map((scenario, index) => (
                    <div key={index} className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-start">
                        <Play className="h-4 w-4 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                        <p className="text-sm text-blue-900">{scenario}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Industry Variations */}
            {skill.industryVariations && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Building2 className="h-6 w-6 mr-2 text-blue-600" />
                  Industry Variations
                </h2>
                <div className="prose max-w-none">
                  <p className="text-gray-700">{skill.industryVariations}</p>
                </div>
              </section>
            )}

            {/* Core Subskills */}
            {skill.coreSubskills && skill.coreSubskills.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Layers className="h-6 w-6 mr-2 text-blue-600" />
                  Core Subskills
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {skill.coreSubskills.map((subskill, index) => (
                    <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <Zap className="h-4 w-4 text-gray-600 mr-2 flex-shrink-0" />
                      <span className="text-gray-700">{subskill}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* How Employers Evaluate */}
            {skill.howEmployersEvaluate && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Search className="h-6 w-6 mr-2 text-blue-600" />
                  How Employers Evaluate This Skill
                </h2>
                <div className="prose max-w-none">
                  <p className="text-gray-700">{skill.howEmployersEvaluate}</p>
                </div>
              </section>
            )}

            {/* Signals of Mastery */}
            {skill.signalsOfMastery && skill.signalsOfMastery.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Eye className="h-6 w-6 mr-2 text-blue-600" />
                  Signals of Mastery
                </h2>
                <ul className="space-y-2">
                  {skill.signalsOfMastery.map((signal, index) => (
                    <li key={index} className="flex items-start">
                      <Award className="h-4 w-4 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-gray-700">{signal}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Development Methods */}
            {skill.developmentMethods && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <GraduationCap className="h-6 w-6 mr-2 text-blue-600" />
                  Specific Development Methods
                </h2>
                <div className="prose max-w-none">
                  <p className="text-gray-700">{skill.developmentMethods}</p>
                </div>
              </section>
            )}

            {/* Practice Opportunities */}
            {skill.practiceOpportunities && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Target className="h-6 w-6 mr-2 text-blue-600" />
                  Practice Opportunities
                </h2>
                <div className="prose max-w-none">
                  <p className="text-gray-700">{skill.practiceOpportunities}</p>
                </div>
              </section>
            )}

            {/* Career Impact */}
            {skill.careerImpact && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <TrendingUp className="h-6 w-6 mr-2 text-blue-600" />
                  Career Impact
                </h2>
                <div className="prose max-w-none">
                  <p className="text-gray-700">{skill.careerImpact}</p>
                </div>
              </section>
            )}

            {/* Evidence Base */}
            {skill.evidenceSummary && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <FileText className="h-6 w-6 mr-2 text-blue-600" />
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
            {/* Enhanced Skill Metrics */}
            {(skill.transferabilityLevel || skill.demandLevel || skill.futureProofScore || skill.leadershipRelevance) && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Gauge className="h-5 w-5 mr-2" />
                    Skill Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {skill.transferabilityLevel && (
                    <div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-600">Transferability</span>
                        <Badge variant="outline" className={
                          skill.transferabilityLevel === 'high' ? 'bg-green-50 text-green-700' :
                          skill.transferabilityLevel === 'medium' ? 'bg-yellow-50 text-yellow-700' :
                          'bg-red-50 text-red-700'
                        }>
                          {skill.transferabilityLevel.charAt(0).toUpperCase() + skill.transferabilityLevel.slice(1)}
                        </Badge>
                      </div>
                    </div>
                  )}
                  
                  {skill.demandLevel && (
                    <div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-600">Market Demand</span>
                        <Badge variant="outline" className={
                          skill.demandLevel === 'very-high' ? 'bg-green-50 text-green-700' :
                          skill.demandLevel === 'high' ? 'bg-green-50 text-green-700' :
                          skill.demandLevel === 'moderate' ? 'bg-yellow-50 text-yellow-700' :
                          'bg-red-50 text-red-700'
                        }>
                          {skill.demandLevel === 'very-high' ? 'Very High' : skill.demandLevel.charAt(0).toUpperCase() + skill.demandLevel.slice(1)}
                        </Badge>
                      </div>
                    </div>
                  )}
                  
                  {skill.futureProofScore && (
                    <div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-600">Future-Proof Score</span>
                        <span className="text-sm font-bold text-blue-600">{skill.futureProofScore}/10</span>
                      </div>
                    </div>
                  )}
                  
                  {skill.leadershipRelevance && (
                    <div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-600">Leadership Relevance</span>
                        <span className="text-sm font-bold text-purple-600">{skill.leadershipRelevance}/10</span>
                      </div>
                    </div>
                  )}
                  
                  {skill.creativeVsAnalytical && (
                    <div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-600">Type</span>
                        <Badge variant="outline">
                          {skill.creativeVsAnalytical === 'creative' ? '🎨 Creative' :
                           skill.creativeVsAnalytical === 'analytical' ? '📊 Analytical' : '🔄 Hybrid'}
                        </Badge>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

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

            {/* Skills That Stack Well */}
            {skill.skillStacksWell && skill.skillStacksWell.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Link2 className="h-5 w-5 mr-2" />
                    Skills That Stack Well
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {skill.skillStacksWell.map((skillName, index) => (
                      <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700">
                        {skillName}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

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

            {/* Learning Resources */}
            {skill.learningResources && skill.learningResources.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BookOpen className="h-5 w-5 mr-2" />
                    Learning Resources
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {skill.learningResources.map((resource, index) => (
                      <li key={index} className="text-sm text-gray-700 flex items-start">
                        <GraduationCap className="h-3 w-3 text-gray-500 mt-0.5 mr-2 flex-shrink-0" />
                        {resource}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

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