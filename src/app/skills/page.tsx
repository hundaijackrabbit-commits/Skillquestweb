import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getAllSkills } from '@/lib/content';
import { Search, Filter, ArrowRight, Star, Briefcase, TrendingUp } from 'lucide-react';
import { formatCategoryName } from '@/lib/utils';

export const metadata = {
  title: 'Skills Repository - SkillQuest',
  description: 'Explore 500+ professional skills with evidence-backed development paths, career connections, and practical guidance for today\'s economy.',
};

export default async function SkillsPage() {
  const skills = await getAllSkills();

  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Professional Skills Repository
          </h1>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Deep, evidence-backed intelligence on the skills that power modern careers. 
            Each skill is a comprehensive knowledge object designed for serious professional development.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mt-12 flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search skills..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <Button variant="outline" className="sm:w-auto">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-8 flex justify-center">
          <div className="flex items-center space-x-8 text-sm text-gray-600">
            <span>{skills.length} Total Skills</span>
            <span>•</span>
            <span>{skills.filter(s => s.featured).length} Featured</span>
            <span>•</span>
            <span>Evidence-Based</span>
          </div>
        </div>

        {/* Featured Skills Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.filter(skill => skill.featured).map((skill) => (
              <Card key={skill.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="info">{formatCategoryName(skill.category)}</Badge>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-gray-600">{skill.employerSignalValue.toFixed(1)}</span>
                    </div>
                  </div>
                  <CardTitle className="text-xl">{skill.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    {skill.shortDefinition}
                  </p>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Briefcase className="h-4 w-4 mr-2" />
                      <span>{skill.careers.length} related careers</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      <span>
                        {skill.automationRisk === 'low' ? 'Low automation risk' :
                         skill.automationRisk === 'medium' ? 'Medium automation risk' :
                         'High automation risk'}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <Badge variant={skill.difficulty === 'beginner' ? 'success' : skill.difficulty === 'intermediate' ? 'warning' : 'danger'}>
                      {skill.difficulty || 'Intermediate'}
                    </Badge>
                    <Link 
                      href={`/skills/${skill.slug}`}
                      className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500"
                    >
                      Learn more <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* All Skills Section */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">All Skills</h2>
            <div className="text-sm text-gray-600">
              {skills.length} skills
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill) => (
              <Card key={skill.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" size="sm">
                      {formatCategoryName(skill.category)}
                    </Badge>
                    <span className="text-xs text-gray-500">
                      Signal: {skill.employerSignalValue}/10
                    </span>
                  </div>
                  <CardTitle className="text-lg">{skill.name}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-gray-600 mb-3">
                    {skill.shortDefinition.substring(0, 120)}...
                  </p>
                  <Link 
                    href={`/skills/${skill.slug}`}
                    className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500"
                  >
                    Explore <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Can't find the skill you're looking for?
          </h2>
          <p className="text-gray-600 mb-8">
            Our repository is constantly growing. Request new skills or suggest improvements.
          </p>
          <div className="flex justify-center space-x-4">
            <Button>Request a Skill</Button>
            <Button variant="outline">Browse Categories</Button>
          </div>
        </div>
      </div>
    </div>
  );
}