import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skill } from '@/lib/types';
import { formatCategoryName, getCategoryColor, getRiskLevelColor, getDifficultyColor } from '@/lib/utils';
import { 
  ArrowRight, 
  Star, 
  Briefcase, 
  TrendingUp, 
  Clock, 
  Users,
  Brain,
  Zap,
  Shield,
  Target,
  Sparkles
} from 'lucide-react';

interface SkillCardProps {
  skill: Skill;
  variant?: 'default' | 'featured' | 'compact';
  showMetrics?: boolean;
}

const getCategoryIcon = (category: string) => {
  const iconMap: { [key: string]: React.ComponentType<any> } = {
    communication: Users,
    leadership: Target,
    'critical-thinking': Brain,
    collaboration: Users,
    'personal-effectiveness': Zap,
    'business-strategy': TrendingUp,
    'sales-marketing': TrendingUp,
    'finance-operations': Briefcase,
    'human-resources': Users,
    'customer-success': Star,
    'digital-literacy': Zap,
    'content-media': Sparkles,
    'design-ux': Sparkles,
    technical: Brain,
    'analytics-research': Brain,
    'remote-work': Shield,
    entrepreneurship: TrendingUp,
    'freelance-gig': Briefcase,
    'ai-era': Brain,
    'future-resistant': Shield,
  };
  
  return iconMap[category] || Star;
};

export function SkillCard({ skill, variant = 'default', showMetrics = true }: SkillCardProps) {
  const categoryColors = getCategoryColor(skill.category);
  const riskColors = getRiskLevelColor(skill.automationRisk);
  const difficultyColors = getDifficultyColor(skill.difficulty || 'intermediate');
  const CategoryIcon = getCategoryIcon(skill.category);

  if (variant === 'compact') {
    return (
      <Card className="group hover:shadow-md transition-all duration-200 hover:-translate-y-1 border hover:border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-2">
              <div className={`p-1.5 rounded-lg ${categoryColors.bg}`}>
                <CategoryIcon className={`h-4 w-4 ${categoryColors.text}`} />
              </div>
              <Badge variant="outline" size="sm" className={`${categoryColors.bg} ${categoryColors.text} ${categoryColors.border}`}>
                {formatCategoryName(skill.category)}
              </Badge>
            </div>
            {skill.featured && (
              <div className="flex items-center">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              </div>
            )}
          </div>
          
          <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
            {skill.name}
          </h3>
          
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {skill.shortDefinition}
          </p>

          <div className="flex items-center justify-between">
            <div className="text-xs text-gray-500">
              Signal: {skill.employerSignalValue}/10
            </div>
            <Link 
              href={`/skills/${skill.slug}`}
              className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
            >
              View <ArrowRight className="ml-1 h-3 w-3" />
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (variant === 'featured') {
    return (
      <Card className="group relative overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <CardHeader className="relative">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className={`p-3 rounded-xl ${categoryColors.bg} ring-2 ring-white shadow-sm`}>
                <CategoryIcon className={`h-6 w-6 ${categoryColors.text}`} />
              </div>
              <Badge variant="default" className={`${categoryColors.bg} ${categoryColors.text} font-medium`}>
                {formatCategoryName(skill.category)}
              </Badge>
            </div>
            <div className="flex items-center space-x-3">
              {skill.featured && (
                <div className="flex items-center space-x-1 bg-yellow-100 px-2 py-1 rounded-full">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs font-medium text-yellow-800">Featured</span>
                </div>
              )}
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-semibold text-gray-900">{skill.employerSignalValue.toFixed(1)}</span>
              </div>
            </div>
          </div>
          
          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
            {skill.name}
          </h3>
        </CardHeader>

        <CardContent className="relative pt-0">
          <p className="text-gray-700 mb-6 leading-relaxed">
            {skill.shortDefinition}
          </p>
          
          {showMetrics && (
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${difficultyColors.bg} ${difficultyColors.text}`}>
                  <Clock className="h-3 w-3 mr-1" />
                  {skill.difficulty || 'Intermediate'}
                </div>
                <div className="text-xs text-gray-500 mt-1">Difficulty</div>
              </div>
              
              <div className="text-center">
                <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${riskColors.bg} ${riskColors.text}`}>
                  <Shield className="h-3 w-3 mr-1" />
                  {skill.automationRisk}
                </div>
                <div className="text-xs text-gray-500 mt-1">Auto Risk</div>
              </div>
              
              <div className="text-center">
                <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  <Briefcase className="h-3 w-3 mr-1" />
                  {skill.careers.length}
                </div>
                <div className="text-xs text-gray-500 mt-1">Careers</div>
              </div>
            </div>
          )}

          <div className="space-y-3 mb-6">
            <div className="flex items-center text-sm text-gray-600">
              <TrendingUp className="h-4 w-4 mr-2 text-green-600" />
              <span>{skill.modernRelevance.substring(0, 60)}...</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Users className="h-4 w-4 mr-2 text-blue-600" />
              <span>{skill.professionalContexts.length} professional contexts</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex space-x-2">
              {skill.professionalContexts.slice(0, 2).map((context, index) => (
                <Badge key={index} variant="outline" size="sm" className="text-xs">
                  {context.length > 15 ? `${context.substring(0, 15)}...` : context}
                </Badge>
              ))}
              {skill.professionalContexts.length > 2 && (
                <Badge variant="outline" size="sm" className="text-xs">
                  +{skill.professionalContexts.length - 2}
                </Badge>
              )}
            </div>
            
            <Link 
              href={`/skills/${skill.slug}`}
              className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm hover:shadow-md"
            >
              Explore <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Default variant
  return (
    <Card className="group hover:shadow-lg transition-all duration-200 hover:-translate-y-1 border hover:border-blue-200">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className={`p-2 rounded-lg ${categoryColors.bg}`}>
              <CategoryIcon className={`h-4 w-4 ${categoryColors.text}`} />
            </div>
            <Badge variant="outline" className={`${categoryColors.bg} ${categoryColors.text} ${categoryColors.border}`}>
              {formatCategoryName(skill.category)}
            </Badge>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm text-gray-600">{skill.employerSignalValue.toFixed(1)}</span>
          </div>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
          {skill.name}
        </h3>
      </CardHeader>

      <CardContent className="pt-0">
        <p className="text-sm text-gray-600 mb-4">
          {skill.shortDefinition}
        </p>
        
        {showMetrics && (
          <div className="space-y-2 mb-4">
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
        )}

        <div className="flex justify-between items-center">
          <Badge 
            variant={skill.difficulty === 'beginner' ? 'success' : skill.difficulty === 'intermediate' ? 'warning' : 'danger'}
            size="sm"
          >
            {skill.difficulty || 'Intermediate'}
          </Badge>
          <Link 
            href={`/skills/${skill.slug}`}
            className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
          >
            Learn more <ArrowRight className="ml-1 h-3 w-3" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}