import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getSkillBySlug, getAllSkills, getRelatedSkills, getCareersForSkill } from '@/lib/content';
import {
  formatCategoryName,
  getCategoryColor,
  getRiskLevelColor,
  getDifficultyColor,
} from '@/lib/utils';
import SaveSkillButton from '@/components/skills/save-skill-button';
import { ContentViewTracker } from '@/components/analytics/content-view-tracker';
import { ManagedAdSlot } from '@/components/ads/managed-ad-slot';
import { absoluteUrl } from '@/lib/site';
import {
  ArrowLeft,
  Briefcase,
  TrendingUp,
  Clock,
  Target,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  Users,
  Building2,
  Zap,
  Shield,
  Globe,
  Sparkles,
  Award,
  Play,
  BarChart3,
  MapPin,
  Layers,
  Activity,
  Eye,
  GraduationCap,
  Link2,
  FileText,
  Search,
  Gauge,
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

  const title = `${skill.name}: Practical Skill Guide`;
  const description = skill.shortDefinition.length > 158 ? `${skill.shortDefinition.slice(0, 155)}…` : skill.shortDefinition;

  return {
    title,
    description,
    keywords: [skill.name, ...skill.professionalContexts.slice(0, 5), 'professional skills', 'career development'],
    alternates: { canonical: `/skills/${skill.slug}` },
    openGraph: {
      title: `${title} | Modern Skill Lab`,
      description,
      type: 'article',
      url: `/skills/${skill.slug}`,
    },
    twitter: { card: 'summary_large_image', title: `${title} | Modern Skill Lab`, description },
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
    getCareersForSkill(skill.slug),
  ]);

  const categoryColors = getCategoryColor(skill.category);
  const riskColors = getRiskLevelColor(skill.automationRisk);
  const difficultyColors = getDifficultyColor(skill.difficulty || 'intermediate');
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${skill.name}: Practical Skill Guide`,
    description: skill.shortDefinition,
    mainEntityOfPage: absoluteUrl(`/skills/${skill.slug}`),
    dateModified: skill.lastUpdated,
    author: { '@type': 'Organization', name: 'Modern Skill Lab' },
    publisher: { '@type': 'Organization', name: 'Modern Skill Lab' },
    about: skill.name,
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/30 to-white py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <ContentViewTracker eventType="skill_view" itemType="skill" itemSlug={skill.slug} />
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-8">
          <Link
            href="/skills"
            className="group inline-flex items-center text-sm font-medium text-gray-500 transition-colors hover:text-gray-900"
          >
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Skills Repository
          </Link>
        </div>

        <div className="mb-16">
          <div className="relative rounded-2xl border bg-gradient-to-r from-white via-blue-50/50 to-purple-50/50 p-8 shadow-sm">
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <Badge
                variant="default"
                className={`${categoryColors.bg} ${categoryColors.text} px-3 py-1 font-medium`}
                size="lg"
              >
                {formatCategoryName(skill.category)}
              </Badge>

              {skill.featured && (
                <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 font-medium text-white">
                  <Sparkles className="mr-1 h-3 w-3" />
                  Featured Skill
                </Badge>
              )}

              <Badge variant="outline" className="flex items-center">
                <Award className="mr-1 h-3 w-3" />
                {skill.employerSignalValue}/10 Signal Value
              </Badge>
            </div>

            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-4xl">
                <h1 className="mb-4 text-5xl font-bold tracking-tight text-gray-900">{skill.name}</h1>
                <p className="mb-2 text-xl leading-relaxed text-gray-700">{skill.shortDefinition}</p>
              </div>

              <div className="w-full max-w-sm rounded-2xl border bg-white/80 p-4 shadow-sm">
                <div className="mb-3">
                  <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                    Save this skill
                  </h2>
                  <p className="mt-1 text-sm text-gray-600">
                    Add this skill to your dashboard so you can revisit it, track it, and build your
                    stack over time.
                  </p>
                </div>

                <SaveSkillButton skillSlug={skill.slug} className="w-full justify-center" />
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4">
              <div className="rounded-xl bg-white/60 p-4 text-center">
                <div
                  className={`mb-2 inline-flex h-12 w-12 items-center justify-center rounded-lg ${difficultyColors.bg}`}
                >
                  <Clock className={`h-6 w-6 ${difficultyColors.text}`} />
                </div>
                <div className="mb-1 text-sm font-medium text-gray-500">Difficulty</div>
                <div className={`text-sm font-semibold ${difficultyColors.text}`}>
                  {skill.difficulty || 'Intermediate'}
                </div>
              </div>

              <div className="rounded-xl bg-white/60 p-4 text-center">
                <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                  <BarChart3 className="h-6 w-6 text-blue-600" />
                </div>
                <div className="mb-1 text-sm font-medium text-gray-500">Development Time</div>
                <div className="text-sm font-semibold text-blue-600">
                  {skill.estimatedTimeToDevelop?.split('.')[0] || 'Varies'}
                </div>
              </div>

              <div className="rounded-xl bg-white/60 p-4 text-center">
                <div
                  className={`mb-2 inline-flex h-12 w-12 items-center justify-center rounded-lg ${riskColors.bg}`}
                >
                  <Shield className={`h-6 w-6 ${riskColors.text}`} />
                </div>
                <div className="mb-1 text-sm font-medium text-gray-500">Automation Risk</div>
                <div className={`text-sm font-semibold capitalize ${riskColors.text}`}>
                  {skill.automationRisk}
                </div>
              </div>

              <div className="rounded-xl bg-white/60 p-4 text-center">
                <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                  <Briefcase className="h-6 w-6 text-green-600" />
                </div>
                <div className="mb-1 text-sm font-medium text-gray-500">Career Impact</div>
                <div className="text-sm font-semibold text-green-600">{relatedCareers.length} careers</div>
              </div>
            </div>
          </div>
        </div>

        <ManagedAdSlot placement="skill-inline" />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <section>
              <h2 className="mb-4 flex items-center text-2xl font-bold text-gray-900">
                <Target className="mr-2 h-6 w-6 text-blue-600" />
                Why This Skill Matters
              </h2>
              <div className="prose max-w-none">
                <p className="text-gray-700">{skill.whyItMatters}</p>
              </div>
            </section>

            <section>
              <h2 className="mb-4 flex items-center text-2xl font-bold text-gray-900">
                <BookOpen className="mr-2 h-6 w-6 text-blue-600" />
                Comprehensive Definition
              </h2>
              <div className="prose max-w-none">
                <p className="text-gray-700">{skill.fullDefinition}</p>
              </div>
            </section>

            <section>
              <h2 className="mb-4 flex items-center text-2xl font-bold text-gray-900">
                <TrendingUp className="mr-2 h-6 w-6 text-blue-600" />
                Modern Relevance
              </h2>
              <div className="prose max-w-none">
                <p className="text-gray-700">{skill.modernRelevance}</p>
              </div>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-gray-900">AI Era Context</h2>
              <div className="prose max-w-none">
                <p className="text-gray-700">{skill.aiEraRelevance}</p>
                <div className="mt-4 rounded-lg bg-blue-50 p-4">
                  <h4 className="mb-2 font-semibold text-blue-900">Human Advantage</h4>
                  <p className="text-sm text-blue-800">{skill.humanAdvantage}</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="mb-6 flex items-center text-2xl font-bold text-gray-900">
                <CheckCircle2 className="mr-2 h-6 w-6 text-blue-600" />
                Development Path
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="mb-3 text-lg font-semibold text-green-700">Beginner Level</h3>
                  <ul className="space-y-2">
                    {skill.beginnerActions.map((action, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle2 className="mr-2 mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                        <span className="text-gray-700">{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="mb-3 text-lg font-semibold text-yellow-700">Intermediate Level</h3>
                  <ul className="space-y-2">
                    {skill.intermediateActions.map((action, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle2 className="mr-2 mt-0.5 h-4 w-4 flex-shrink-0 text-yellow-600" />
                        <span className="text-gray-700">{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="mb-3 text-lg font-semibold text-red-700">Advanced Level</h3>
                  <ul className="space-y-2">
                    {skill.advancedActions.map((action, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle2 className="mr-2 mt-0.5 h-4 w-4 flex-shrink-0 text-red-600" />
                        <span className="text-gray-700">{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="mb-4 flex items-center text-2xl font-bold text-gray-900">
                <AlertTriangle className="mr-2 h-6 w-6 text-yellow-600" />
                Common Mistakes to Avoid
              </h2>
              <ul className="space-y-2">
                {skill.commonMistakes.map((mistake, index) => (
                  <li key={index} className="flex items-start">
                    <AlertTriangle className="mr-2 mt-0.5 h-4 w-4 flex-shrink-0 text-yellow-600" />
                    <span className="text-gray-700">{mistake}</span>
                  </li>
                ))}
              </ul>
            </section>

            {skill.whereItShowsUp && (
              <section>
                <h2 className="mb-4 flex items-center text-2xl font-bold text-gray-900">
                  <MapPin className="mr-2 h-6 w-6 text-blue-600" />
                  Where This Skill Shows Up at Work
                </h2>
                <div className="prose max-w-none">
                  <p className="text-gray-700">{skill.whereItShowsUp}</p>
                </div>
              </section>
            )}

            {skill.careerApplications && (
              <section>
                <h2 className="mb-4 flex items-center text-2xl font-bold text-gray-900">
                  <Briefcase className="mr-2 h-6 w-6 text-blue-600" />
                  Career Applications
                </h2>
                <div className="prose max-w-none">
                  <p className="text-gray-700">{skill.careerApplications}</p>
                </div>
              </section>
            )}

            {skill.skillInAction && (
              <section>
                <h2 className="mb-4 flex items-center text-2xl font-bold text-gray-900">
                  <Activity className="mr-2 h-6 w-6 text-blue-600" />
                  What Strong Execution Looks Like
                </h2>
                <div className="prose max-w-none">
                  <p className="text-gray-700">{skill.skillInAction}</p>
                </div>
              </section>
            )}

            {skill.realWorldScenarios && skill.realWorldScenarios.length > 0 && (
              <section>
                <h2 className="mb-4 flex items-center text-2xl font-bold text-gray-900">
                  <Globe className="mr-2 h-6 w-6 text-blue-600" />
                  Real-World Applications
                </h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {skill.realWorldScenarios.map((scenario, index) => (
                    <div key={index} className="rounded-lg bg-blue-50 p-4">
                      <div className="flex items-start">
                        <Play className="mr-3 mt-0.5 h-4 w-4 flex-shrink-0 text-blue-600" />
                        <p className="text-sm text-blue-900">{scenario}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {skill.industryVariations && (
              <section>
                <h2 className="mb-4 flex items-center text-2xl font-bold text-gray-900">
                  <Building2 className="mr-2 h-6 w-6 text-blue-600" />
                  Industry Variations
                </h2>
                <div className="prose max-w-none">
                  <p className="text-gray-700">{skill.industryVariations}</p>
                </div>
              </section>
            )}

            {skill.coreSubskills && skill.coreSubskills.length > 0 && (
              <section>
                <h2 className="mb-4 flex items-center text-2xl font-bold text-gray-900">
                  <Layers className="mr-2 h-6 w-6 text-blue-600" />
                  Core Subskills
                </h2>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  {skill.coreSubskills.map((subskill, index) => (
                    <div key={index} className="flex items-center rounded-lg bg-gray-50 p-3">
                      <Zap className="mr-2 h-4 w-4 flex-shrink-0 text-gray-600" />
                      <span className="text-gray-700">{subskill}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {skill.howEmployersEvaluate && (
              <section>
                <h2 className="mb-4 flex items-center text-2xl font-bold text-gray-900">
                  <Search className="mr-2 h-6 w-6 text-blue-600" />
                  How Employers Evaluate This Skill
                </h2>
                <div className="prose max-w-none">
                  <p className="text-gray-700">{skill.howEmployersEvaluate}</p>
                </div>
              </section>
            )}

            {skill.signalsOfMastery && skill.signalsOfMastery.length > 0 && (
              <section>
                <h2 className="mb-4 flex items-center text-2xl font-bold text-gray-900">
                  <Eye className="mr-2 h-6 w-6 text-blue-600" />
                  Signals of Mastery
                </h2>
                <ul className="space-y-2">
                  {skill.signalsOfMastery.map((signal, index) => (
                    <li key={index} className="flex items-start">
                      <Award className="mr-2 mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                      <span className="text-gray-700">{signal}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {skill.developmentMethods && (
              <section>
                <h2 className="mb-4 flex items-center text-2xl font-bold text-gray-900">
                  <GraduationCap className="mr-2 h-6 w-6 text-blue-600" />
                  Specific Development Methods
                </h2>
                <div className="prose max-w-none">
                  <p className="text-gray-700">{skill.developmentMethods}</p>
                </div>
              </section>
            )}

            {skill.practiceOpportunities && (
              <section>
                <h2 className="mb-4 flex items-center text-2xl font-bold text-gray-900">
                  <Target className="mr-2 h-6 w-6 text-blue-600" />
                  Practice Opportunities
                </h2>
                <div className="prose max-w-none">
                  <p className="text-gray-700">{skill.practiceOpportunities}</p>
                </div>
              </section>
            )}

            {skill.careerImpact && (
              <section>
                <h2 className="mb-4 flex items-center text-2xl font-bold text-gray-900">
                  <TrendingUp className="mr-2 h-6 w-6 text-blue-600" />
                  Career Impact
                </h2>
                <div className="prose max-w-none">
                  <p className="text-gray-700">{skill.careerImpact}</p>
                </div>
              </section>
            )}

            {skill.evidenceSummary && (
              <section>
                <h2 className="mb-4 flex items-center text-2xl font-bold text-gray-900">
                  <FileText className="mr-2 h-6 w-6 text-blue-600" />
                  Evidence & Research
                </h2>
                <div className="rounded-lg bg-gray-50 p-6">
                  <p className="mb-4 text-gray-700">{skill.evidenceSummary}</p>
                  {skill.scholarlyNotes && skill.scholarlyNotes.length > 0 && (
                    <div>
                      <h4 className="mb-2 font-semibold text-gray-900">Research Notes:</h4>
                      <ul className="space-y-1 text-sm text-gray-600">
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

          <div className="space-y-6">
            {(skill.transferabilityLevel ||
              skill.demandLevel ||
              skill.futureProofScore ||
              skill.leadershipRelevance) && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Gauge className="mr-2 h-5 w-5" />
                    Skill Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {skill.transferabilityLevel && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-600">Transferability</span>
                      <Badge
                        variant="outline"
                        className={
                          skill.transferabilityLevel === 'high'
                            ? 'bg-green-50 text-green-700'
                            : skill.transferabilityLevel === 'medium'
                              ? 'bg-yellow-50 text-yellow-700'
                              : 'bg-red-50 text-red-700'
                        }
                      >
                        {skill.transferabilityLevel.charAt(0).toUpperCase() +
                          skill.transferabilityLevel.slice(1)}
                      </Badge>
                    </div>
                  )}

                  {skill.demandLevel && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-600">Market Demand</span>
                      <Badge
                        variant="outline"
                        className={
                          skill.demandLevel === 'very-high'
                            ? 'bg-green-50 text-green-700'
                            : skill.demandLevel === 'high'
                              ? 'bg-green-50 text-green-700'
                              : skill.demandLevel === 'moderate'
                                ? 'bg-yellow-50 text-yellow-700'
                                : 'bg-red-50 text-red-700'
                        }
                      >
                        {skill.demandLevel === 'very-high'
                          ? 'Very High'
                          : skill.demandLevel.charAt(0).toUpperCase() + skill.demandLevel.slice(1)}
                      </Badge>
                    </div>
                  )}

                  {skill.futureProofScore && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-600">Future-Proof Score</span>
                      <span className="text-sm font-bold text-blue-600">{skill.futureProofScore}/10</span>
                    </div>
                  )}

                  {skill.leadershipRelevance && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-600">Leadership Relevance</span>
                      <span className="text-sm font-bold text-purple-600">
                        {skill.leadershipRelevance}/10
                      </span>
                    </div>
                  )}

                  {skill.creativeVsAnalytical && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-600">Type</span>
                      <Badge variant="outline">
                        {skill.creativeVsAnalytical === 'creative'
                          ? '🎨 Creative'
                          : skill.creativeVsAnalytical === 'analytical'
                            ? '📊 Analytical'
                            : '🔄 Hybrid'}
                      </Badge>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            <Card className="border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="text-blue-900">Save to Your Dashboard</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-blue-800">
                  Keep track of important skills and build a personalized learning stack.
                </p>
                <SaveSkillButton skillSlug={skill.slug} className="w-full justify-center" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Briefcase className="mr-2 h-5 w-5" />
                  Professional Contexts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {skill.professionalContexts.map((context, index) => (
                    <li key={index} className="text-sm text-gray-600">
                      • {context}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="mr-2 h-5 w-5" />
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

            {skill.skillStacksWell && skill.skillStacksWell.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Link2 className="mr-2 h-5 w-5" />
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

            {skill.learningResources && skill.learningResources.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BookOpen className="mr-2 h-5 w-5" />
                    Learning Resources
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {skill.learningResources.map((resource, index) => (
                      <li key={index} className="flex items-start text-sm text-gray-700">
                        <GraduationCap className="mr-2 mt-0.5 h-3 w-3 flex-shrink-0 text-gray-500" />
                        {resource}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

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