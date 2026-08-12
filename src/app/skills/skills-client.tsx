'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SkillCard } from '@/components/ui/skill-card';
import { SearchFilter } from '@/components/features/search-filter';
import { Skill } from '@/lib/types';
import { formatCategoryName } from '@/lib/utils';
import { 
  Search, 
  TrendingUp, 
  Users, 
  Brain, 
  Zap, 
  Target, 
  Sparkles,
  BookOpen,
  Filter,
  Grid3X3,
  List,
  Star
} from 'lucide-react';

interface SkillsPageClientProps {
  skills: Skill[];
}

export function SkillsPageClient({ skills }: SkillsPageClientProps) {
  const [filteredSkills, setFilteredSkills] = useState<Skill[]>(skills);
  const [viewMode, setViewMode] = useState<'grid' | 'compact'>('grid');
  const [sortBy, setSortBy] = useState<'relevance' | 'name' | 'signal' | 'featured'>('featured');

  const sortedSkills = useMemo(() => {
    const sorted = [...filteredSkills];
    
    switch (sortBy) {
      case 'name':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'signal':
        return sorted.sort((a, b) => b.employerSignalValue - a.employerSignalValue);
      case 'featured':
        return sorted.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return b.employerSignalValue - a.employerSignalValue;
        });
      default:
        return sorted;
    }
  }, [filteredSkills, sortBy]);

  const featuredSkills = skills.filter(skill => skill.featured);
  const categoryCount = new Set(skills.map((skill) => skill.category)).size;
  const categoryStats = useMemo(() => {
    const stats: Record<string, number> = {};
    skills.forEach(skill => {
      stats[skill.category] = (stats[skill.category] || 0) + 1;
    });
    return Object.entries(stats)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 8);
  }, [skills]);

  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mx-auto max-w-4xl text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4 mr-2" />
            1,500+ Professional Skills Available
          </div>
          
          <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-6">
            Professional Skills
            <span className="text-blue-600 block">Intelligence Platform</span>
          </h1>
          
          <p className="text-xl leading-8 text-gray-600 mb-8">
            Deep, practical context on the skills that power modern careers.
            Each guide connects definitions, practice ideas, workplace context, related capabilities, and career relevance.
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{skills.length.toLocaleString()}</div>
              <div className="text-sm font-medium text-gray-600">Professional Skills</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">{featuredSkills.length}</div>
              <div className="text-sm font-medium text-gray-600">Featured Skills</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">{categoryCount}</div>
              <div className="text-sm font-medium text-gray-600">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">Practical</div>
              <div className="text-sm font-medium text-gray-600">Workplace Context</div>
            </div>
          </div>
        </div>

        {/* Category Quick Navigation */}
        <div className="mb-12">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Popular Categories</h2>
          <div className="flex flex-wrap gap-3">
            {categoryStats.map(([category, count]) => (
              <Link 
                key={category}
                href={`#category-${category}`}
                className="inline-flex items-center px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <span className="text-sm font-medium text-gray-700">{formatCategoryName(category)}</span>
                <Badge variant="secondary" size="sm" className="ml-2">
                  {count}
                </Badge>
              </Link>
            ))}
          </div>
        </div>

        {/* Search and Filter System */}
        <SearchFilter 
          skills={skills} 
          onFilteredResults={setFilteredSkills}
          className="mb-12"
        />

        {/* Results Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div className="flex items-center space-x-4 mb-4 sm:mb-0">
            <h2 className="text-2xl font-bold text-gray-900">
              {filteredSkills.length === skills.length ? 'All Skills' : 'Filtered Results'}
            </h2>
            <Badge variant="outline" className="flex items-center">
              <BookOpen className="h-3 w-3 mr-1" />
              {filteredSkills.length} skills
            </Badge>
          </div>

          <div className="flex items-center space-x-4">
            {/* Sort Options */}
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="featured">Featured First</option>
              <option value="signal">Employer Signal</option>
              <option value="name">Alphabetical</option>
              <option value="relevance">Relevance</option>
            </select>

            {/* View Toggle */}
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-blue-50 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <Grid3X3 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('compact')}
                className={`p-2 ${viewMode === 'compact' ? 'bg-blue-50 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Featured Skills Section (if no filters applied) */}
        {filteredSkills.length === skills.length && featuredSkills.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <Star className="h-6 w-6 mr-2 text-yellow-500" />
                Featured Skills
              </h2>
              <Link 
                href="#all-skills" 
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                View all skills →
              </Link>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {featuredSkills.slice(0, 6).map((skill) => (
                <SkillCard 
                  key={skill.id} 
                  skill={skill} 
                  variant="featured"
                  showMetrics={true}
                />
              ))}
            </div>
          </div>
        )}

        {/* Skills Grid */}
        <div id="all-skills" className="mb-16">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {sortedSkills.map((skill) => (
                <SkillCard 
                  key={skill.id} 
                  skill={skill} 
                  variant="default"
                  showMetrics={true}
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
              {sortedSkills.map((skill) => (
                <SkillCard 
                  key={skill.id} 
                  skill={skill} 
                  variant="compact"
                  showMetrics={false}
                />
              ))}
            </div>
          )}
        </div>

        {/* Empty State */}
        {filteredSkills.length === 0 && (
          <div className="text-center py-16">
            <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No skills found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search criteria or browse our popular categories above.
            </p>
            <Button onClick={() => window.location.reload()}>
              Reset Filters
            </Button>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-20 text-center bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-2xl p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Can't find the skill you're looking for?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Our repository keeps growing with practical professional-skill guides.
            Explore the library to find the next capability worth adding to your stack.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="#all-skills">
              <Button size="lg" className="px-8">
                <Users className="h-4 w-4 mr-2" />
                Explore all skills
              </Button>
            </Link>
            <Link href="/paths">
              <Button variant="outline" size="lg" className="px-8">
                <BookOpen className="h-4 w-4 mr-2" />
                Browse learning paths
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}