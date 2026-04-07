import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, BookOpen, Briefcase, Building2, TrendingUp, Users, Search, CheckCircle, Star, Target } from 'lucide-react';

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-blue-50 to-white py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              The Professional{' '}
              <span className="text-blue-600">Skills Repository</span>{' '}
              for Today's Economy
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Evidence-backed skill development and career intelligence for ambitious professionals. 
              Navigate your career with confidence in an evolving economy.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button size="lg" className="px-8">
                Explore Skills
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg">
                Find Your Path
              </Button>
            </div>
          </div>
          
          {/* Stats */}
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 sm:text-3xl">500+</div>
                <div className="text-sm font-medium text-gray-600">Professional Skills</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 sm:text-3xl">25+</div>
                <div className="text-sm font-medium text-gray-600">Career Paths</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 sm:text-3xl">15+</div>
                <div className="text-sm font-medium text-gray-600">Industries</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 sm:text-3xl">100%</div>
                <div className="text-sm font-medium text-gray-600">Evidence-Based</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Skills Section */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Skills That Matter Now
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              High-impact professional skills that employers value and careers are built on
            </p>
          </div>
          
          <div className="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {/* Communication Skill Card */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="info">Communication</Badge>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-gray-600">9.2</span>
                  </div>
                </div>
                <CardTitle className="text-xl">Professional Communication</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  The ability to convey information clearly, persuasively, and appropriately across different professional contexts and audiences.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <Briefcase className="h-4 w-4 mr-2" />
                    <span>Essential for 95% of professional roles</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    <span>High automation resistance</span>
                  </div>
                </div>
                <Link href="/skills/communication" className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500 mt-4">
                  Learn more <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </CardContent>
            </Card>

            {/* Critical Thinking Skill Card */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="success">Critical Thinking</Badge>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-gray-600">9.0</span>
                  </div>
                </div>
                <CardTitle className="text-xl">Critical Thinking</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  The capacity to analyze information objectively, evaluate evidence, and make reasoned judgments in complex situations.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <Target className="h-4 w-4 mr-2" />
                    <span>Core requirement for leadership roles</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    <span>Increasingly valued in AI era</span>
                  </div>
                </div>
                <Link href="/skills/critical-thinking" className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500 mt-4">
                  Learn more <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </CardContent>
            </Card>

            {/* AI Literacy Skill Card */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="purple">AI Era</Badge>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-gray-600">8.5</span>
                  </div>
                </div>
                <CardTitle className="text-xl">AI Literacy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Understanding how to effectively work with artificial intelligence tools while maintaining human judgment and creativity.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    <span>Rapidly growing demand</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    <span>Future-resistant advantage</span>
                  </div>
                </div>
                <Link href="/skills/ai-literacy" className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500 mt-4">
                  Learn more <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Platform Features Section */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Your Career Intelligence Platform
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              More than a skills directory. A comprehensive system for professional development.
            </p>
          </div>
          
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {/* Skills Repository */}
              <div className="text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-blue-600 mx-auto">
                  <BookOpen className="h-8 w-8 text-white" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-gray-900">Deep Skill Intelligence</h3>
                <p className="mt-3 text-gray-600">
                  Every skill is a comprehensive knowledge object with development paths, career connections, 
                  and evidence-backed guidance—not just a label.
                </p>
              </div>

              {/* Career Pathways */}
              <div className="text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-green-600 mx-auto">
                  <Briefcase className="h-8 w-8 text-white" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-gray-900">Career Mapping</h3>
                <p className="mt-3 text-gray-600">
                  Understand exactly which skills power which careers. See clear pathways 
                  from your current abilities to your professional goals.
                </p>
              </div>

              {/* Industry Context */}
              <div className="text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-purple-600 mx-auto">
                  <Building2 className="h-8 w-8 text-white" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-gray-900">Industry Context</h3>
                <p className="mt-3 text-gray-600">
                  See how skills operate differently across industries. Make informed decisions 
                  about where your abilities will be most valued.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Start Building Your Professional Future
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Join thousands of professionals using SkillQuest to navigate their careers with confidence
            </p>
            <div className="mt-8 flex items-center justify-center gap-x-6">
              <Button size="lg" className="px-8">
                <Search className="mr-2 h-4 w-4" />
                Explore Skills
              </Button>
              <Button variant="outline" size="lg">
                <Users className="mr-2 h-4 w-4" />
                Join Community
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
