import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getSkillPaths } from '@/lib/content';
import { 
  Search, 
  Filter, 
  ArrowRight, 
  Target, 
  Clock, 
  Star,
  Users,
  TrendingUp,
  BookOpen,
  Award,
  Compass,
  Lightbulb
} from 'lucide-react';

export const metadata = {
  title: 'Skill Paths - SkillQuest | Structured Learning Journeys',
  description: 'Follow structured skill development paths designed for career advancement. Evidence-backed progressions from beginner to mastery.',
};

export default async function SkillPathsPage() {
  const paths = await getSkillPaths();
  const featuredPaths = paths.filter(path => path.featured);
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-blue-100 text-blue-800';
      case 'advanced':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="py-12 bg-gradient-to-b from-blue-50/30 to-white min-h-screen">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mx-auto max-w-4xl text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-sm font-medium mb-6">
            <Compass className="h-4 w-4 mr-2" />
            Structured Learning Journeys
          </div>
          
          <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-6">
            Skill Development
            <span className="text-blue-600 block">Paths</span>
          </h1>
          
          <p className="text-xl leading-8 text-gray-600 mb-8">
            Follow evidence-backed learning paths designed by industry experts. 
            From beginner fundamentals to advanced mastery, each path provides a clear roadmap for professional growth.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{paths.length}</div>
              <div className="text-sm font-medium text-gray-600">Learning Paths</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">{featuredPaths.length}</div>
              <div className="text-sm font-medium text-gray-600">Featured Paths</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">500+</div>
              <div className="text-sm font-medium text-gray-600">Skills Covered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">100%</div>
              <div className="text-sm font-medium text-gray-600">Career-Connected</div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-12 flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search learning paths..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
            />
          </div>
          <Button variant="outline" className="sm:w-auto">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>

        {/* Featured Paths */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900 flex items-center">
              <Star className="h-7 w-7 mr-3 text-yellow-500" />
              Featured Learning Paths
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredPaths.map((path) => (
              <Card key={path.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-pink-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <CardHeader className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <Badge 
                      variant="default" 
                      className={`${getDifficultyColor(path.difficulty)} font-medium`}
                    >
                      {path.difficulty}
                    </Badge>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-1" />
                      {path.estimatedTime}
                    </div>
                  </div>
                  
                  <CardTitle className="text-2xl group-hover:text-blue-600 transition-colors">
                    {path.name}
                  </CardTitle>
                </CardHeader>

                <CardContent className="relative">
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    {path.description}
                  </p>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center text-sm text-gray-600">
                      <Target className="h-4 w-4 mr-2 text-blue-600" />
                      <span>{path.skills.length} skills to master</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <TrendingUp className="h-4 w-4 mr-2 text-green-600" />
                      <span>{path.relatedCareers.length} related career paths</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <Award className="h-4 w-4 mr-2 text-purple-600" />
                      <span>{path.learningOutcomes.length} key learning outcomes</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-500">
                      {path.category.replace('-', ' ').toUpperCase()} PATH
                    </div>
                    <Button className="bg-blue-600 hover:bg-blue-700 shadow-sm hover:shadow-md">
                      Start Path <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* All Paths */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">All Learning Paths</h2>
            <div className="text-sm text-gray-600">
              {paths.length} paths available
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {paths.map((path) => (
              <Card key={path.id} className="hover:shadow-lg transition-shadow group">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-3">
                    <Badge 
                      variant="outline" 
                      className={`${getDifficultyColor(path.difficulty)} border-0`}
                      size="sm"
                    >
                      {path.difficulty}
                    </Badge>
                    {path.featured && (
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    )}
                  </div>
                  <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                    {path.name}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {path.description}
                  </p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="h-3 w-3 mr-2" />
                      <span>{path.estimatedTime}</span>
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <BookOpen className="h-3 w-3 mr-2" />
                      <span>{path.skills.length} skills</span>
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <Users className="h-3 w-3 mr-2" />
                      <span>{path.relatedCareers.length} career paths</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="text-xs text-gray-500 uppercase tracking-wide">
                      {path.category.replace('-', ' ')}
                    </div>
                    <Button variant="outline" size="sm">
                      View Path <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-2xl p-12 mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center">
              <Lightbulb className="h-8 w-8 mr-3 text-yellow-500" />
              Why Follow Structured Paths?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our learning paths are designed by industry experts and backed by research on effective skill development
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Clear Progression</h3>
              <p className="text-sm text-gray-600">
                Follow a logical sequence from fundamentals to advanced concepts
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Career-Connected</h3>
              <p className="text-sm text-gray-600">
                Every path connects directly to real career opportunities
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Expert-Designed</h3>
              <p className="text-sm text-gray-600">
                Created by industry professionals with proven success
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Time-Efficient</h3>
              <p className="text-sm text-gray-600">
                Optimized learning order saves time and accelerates growth
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to start your learning journey?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Choose a path that aligns with your career goals and start building the skills 
            that will set you apart in today's competitive market.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="px-8">
              <Target className="h-4 w-4 mr-2" />
              Take Skills Assessment
            </Button>
            <Button variant="outline" size="lg" className="px-8">
              <Users className="h-4 w-4 mr-2" />
              Join Our Community
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}