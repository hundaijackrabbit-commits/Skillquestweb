import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Target, 
  BookOpen, 
  Users, 
  TrendingUp, 
  CheckCircle, 
  Lightbulb,
  Shield,
  Globe
} from 'lucide-react';

export const metadata = {
  title: 'About',
  description: 'Learn why Modern Skill Lab exists and how its practical skill guides connect learning, careers, and modern work.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <div className="py-12">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-6">
            About Modern Skill Lab
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            The professional skills repository and career intelligence platform designed for 
            ambitious professionals navigating today's evolving economy.
          </p>
        </div>

        {/* Mission Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center">
              <Target className="h-8 w-8 mr-3 text-blue-600" />
              Our Mission
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              To build a deep, practical skills intelligence platform that helps people make better learning and career-development decisions.
            </p>
          </div>

          <div className="bg-blue-50 rounded-2xl p-8">
            <blockquote className="text-lg italic text-blue-900 text-center">
              "Skills are not just labels—they are complex, multi-dimensional professional capabilities 
              that require deep understanding, structured development, and strategic application. 
              Modern Skill Lab treats every skill as a comprehensive knowledge object deserving serious analysis."
            </blockquote>
            <div className="text-center mt-4 text-blue-700 font-semibold">
              — The Modern Skill Lab Philosophy
            </div>
          </div>
        </section>

        {/* Why Modern Skill Lab Exists */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Why Modern Skill Lab Exists
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-l-4 border-l-red-500">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">The Problem</h3>
                <ul className="space-y-3 text-gray-700">
                  <li>• Most career advice is generic and surface-level</li>
                  <li>• Skills are treated as simple keywords rather than complex capabilities</li>
                  <li>• Limited connection between skills and actual career outcomes</li>
                  <li>• Young professionals lack structured guidance for skill development</li>
                  <li>• Practical career intelligence is often scattered across disconnected sources</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Solution</h3>
                <ul className="space-y-3 text-gray-700">
                  <li>• Deep, multi-dimensional skill profiles with development paths</li>
                  <li>• Practical guidance with research surfaced where source material is available</li>
                  <li>• Clear connections between skills, careers, and industries</li>
                  <li>• Practical, actionable guidance for professional growth</li>
                  <li>• Modern relevance including AI-era skill adaptation</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Core Principles */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Our Core Principles
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Transparent</h3>
              <p className="text-sm text-gray-600">
                Practical guidance is separated from research notes and source material when those are available
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Comprehensive</h3>
              <p className="text-sm text-gray-600">
                Every skill is a deep knowledge object, not a superficial label
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Modern</h3>
              <p className="text-sm text-gray-600">
                Focused on skills and careers relevant to today's economy
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Practical</h3>
              <p className="text-sm text-gray-600">
                Actionable guidance for real professional development
              </p>
            </div>
          </div>
        </section>

        {/* What Makes Us Different */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            What Makes Modern Skill Lab Different
          </h2>
          
          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Skills as Knowledge Objects
                    </h3>
                    <p className="text-gray-700">
                      Unlike simple skill directories, we treat each skill as a comprehensive knowledge system 
                      with definitions, practice ideas, career connections, workplace context, and modern relevance.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Career-Skill Integration
                    </h3>
                    <p className="text-gray-700">
                      Skills and careers are deeply connected from the ground up. Every skill shows 
                      related careers, and every career maps to required skills with practical detail.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      AI-Era Perspective
                    </h3>
                    <p className="text-gray-700">
                      Every skill includes analysis of its relevance in an AI-powered economy, 
                      automation risk assessment, and guidance on human advantages.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Context & Source Transparency
                    </h3>
                    <p className="text-gray-700">
                      Practical guidance is presented clearly, while research notes and source material are surfaced separately when a guide includes them.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Who We Serve */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Who We Serve
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="text-center">
              <CardContent className="pt-6">
                <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Young Professionals
                </h3>
                <p className="text-sm text-gray-600">
                  Early career professionals building foundational skills and exploring career paths
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <TrendingUp className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Career Changers
                </h3>
                <p className="text-sm text-gray-600">
                  Professionals transitioning between industries or roles seeking skill guidance
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <Globe className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Freelancers & Entrepreneurs
                </h3>
                <p className="text-sm text-gray-600">
                  Independent professionals building diverse skill portfolios for market success
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Platform Stats */}
        <section className="mb-16">
          <div className="bg-gray-50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Platform Overview
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">1,500+</div>
                <div className="text-sm font-medium text-gray-600">Professional Skills</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">100+</div>
                <div className="text-sm font-medium text-gray-600">Career Profiles</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">8</div>
                <div className="text-sm font-medium text-gray-600">Industry Guides</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">100</div>
                <div className="text-sm font-medium text-gray-600">Learning Paths</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Accelerate Your Professional Development?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join the community of professionals using Modern Skill Lab to make informed, 
            strategic decisions about their career development.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">
              Explore Skills Repository
            </Button>
            <Button variant="outline" size="lg">
              Browse Career Paths
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}