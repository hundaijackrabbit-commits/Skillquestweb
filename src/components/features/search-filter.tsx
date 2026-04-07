'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Skill, SkillCategory } from '@/lib/types';
import { formatCategoryName } from '@/lib/utils';
import { 
  Search, 
  Filter, 
  X, 
  ChevronDown,
  ChevronUp,
  Sliders,
  Star,
  Zap,
  Shield,
  Brain,
  Users,
  TrendingUp,
  Clock
} from 'lucide-react';

interface SearchFilterProps {
  skills: Skill[];
  onFilteredResults: (skills: Skill[]) => void;
  className?: string;
}

interface FilterState {
  query: string;
  categories: string[];
  difficulty: string[];
  automationRisk: string[];
  employerSignal: number[];
  featured: boolean | null;
  aiRelevant: boolean | null;
  remoteRelevant: boolean | null;
}

const initialFilterState: FilterState = {
  query: '',
  categories: [],
  difficulty: [],
  automationRisk: [],
  employerSignal: [0, 10],
  featured: null,
  aiRelevant: null,
  remoteRelevant: null,
};

const categoryOptions = [
  'communication', 'leadership', 'critical-thinking', 'collaboration', 'personal-effectiveness',
  'business-strategy', 'sales-marketing', 'finance-operations', 'human-resources', 'customer-success',
  'digital-literacy', 'content-media', 'design-ux', 'technical', 'analytics-research',
  'remote-work', 'entrepreneurship', 'freelance-gig', 'ai-era', 'future-resistant'
];

const difficultyOptions = ['beginner', 'intermediate', 'advanced'];
const automationRiskOptions = ['low', 'medium', 'high'];

export function SearchFilter({ skills, onFilteredResults, className }: SearchFilterProps) {
  const [filters, setFilters] = useState<FilterState>(initialFilterState);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [filteredSkills, setFilteredSkills] = useState<Skill[]>(skills);

  // Apply filters whenever filters or skills change
  useEffect(() => {
    let result = [...skills];

    // Text search
    if (filters.query.trim()) {
      const query = filters.query.toLowerCase();
      result = result.filter(skill => 
        skill.name.toLowerCase().includes(query) ||
        skill.shortDefinition.toLowerCase().includes(query) ||
        skill.professionalContexts.some(context => context.toLowerCase().includes(query)) ||
        skill.category.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (filters.categories.length > 0) {
      result = result.filter(skill => filters.categories.includes(skill.category));
    }

    // Difficulty filter
    if (filters.difficulty.length > 0) {
      result = result.filter(skill => 
        filters.difficulty.includes(skill.difficulty || 'intermediate')
      );
    }

    // Automation risk filter
    if (filters.automationRisk.length > 0) {
      result = result.filter(skill => filters.automationRisk.includes(skill.automationRisk));
    }

    // Employer signal value range
    result = result.filter(skill => 
      skill.employerSignalValue >= filters.employerSignal[0] && 
      skill.employerSignalValue <= filters.employerSignal[1]
    );

    // Featured filter
    if (filters.featured !== null) {
      result = result.filter(skill => skill.featured === filters.featured);
    }

    // AI relevance filter
    if (filters.aiRelevant !== null) {
      result = result.filter(skill => 
        filters.aiRelevant ? 
        skill.aiEraRelevance.toLowerCase().includes('ai') || 
        skill.aiEraRelevance.toLowerCase().includes('artificial') ||
        skill.category === 'ai-era' : 
        !skill.aiEraRelevance.toLowerCase().includes('ai')
      );
    }

    // Remote work relevance filter
    if (filters.remoteRelevant !== null) {
      result = result.filter(skill => 
        filters.remoteRelevant ? 
        skill.remoteWorkRelevance || skill.category === 'remote-work' : 
        !skill.remoteWorkRelevance
      );
    }

    setFilteredSkills(result);
    onFilteredResults(result);
  }, [filters, skills, onFilteredResults]);

  const updateFilter = (key: keyof FilterState, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const toggleArrayFilter = (key: 'categories' | 'difficulty' | 'automationRisk', value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: prev[key].includes(value) 
        ? prev[key].filter(item => item !== value)
        : [...prev[key], value]
    }));
  };

  const clearFilters = () => {
    setFilters(initialFilterState);
  };

  const hasActiveFilters = () => {
    return (
      filters.query !== '' ||
      filters.categories.length > 0 ||
      filters.difficulty.length > 0 ||
      filters.automationRisk.length > 0 ||
      filters.employerSignal[0] !== 0 ||
      filters.employerSignal[1] !== 10 ||
      filters.featured !== null ||
      filters.aiRelevant !== null ||
      filters.remoteRelevant !== null
    );
  };

  const activeFilterCount = () => {
    let count = 0;
    if (filters.query) count++;
    if (filters.categories.length > 0) count++;
    if (filters.difficulty.length > 0) count++;
    if (filters.automationRisk.length > 0) count++;
    if (filters.employerSignal[0] !== 0 || filters.employerSignal[1] !== 10) count++;
    if (filters.featured !== null) count++;
    if (filters.aiRelevant !== null) count++;
    if (filters.remoteRelevant !== null) count++;
    return count;
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search skills, contexts, or categories..."
            value={filters.query}
            onChange={(e) => updateFilter('query', e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
          />
          {filters.query && (
            <button
              onClick={() => updateFilter('query', '')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center space-x-2"
          >
            <Sliders className="h-4 w-4" />
            <span>Filters</span>
            {activeFilterCount() > 0 && (
              <Badge variant="secondary" size="sm">
                {activeFilterCount()}
              </Badge>
            )}
            {showAdvanced ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
          
          {hasActiveFilters() && (
            <Button variant="ghost" onClick={clearFilters} className="text-gray-500 hover:text-gray-700">
              <X className="h-4 w-4 mr-1" />
              Clear
            </Button>
          )}
        </div>
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between text-sm text-gray-600">
        <div className="flex items-center space-x-4">
          <span className="font-medium">{filteredSkills.length} skills found</span>
          {filteredSkills.length !== skills.length && (
            <span>of {skills.length} total</span>
          )}
        </div>
        
        {/* Quick Filter Tags */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => updateFilter('featured', filters.featured === true ? null : true)}
            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium transition-colors ${
              filters.featured === true
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-gray-100 text-gray-600 hover:bg-yellow-50'
            }`}
          >
            <Star className="h-3 w-3 mr-1" />
            Featured
          </button>
          
          <button
            onClick={() => updateFilter('aiRelevant', filters.aiRelevant === true ? null : true)}
            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium transition-colors ${
              filters.aiRelevant === true
                ? 'bg-purple-100 text-purple-800'
                : 'bg-gray-100 text-gray-600 hover:bg-purple-50'
            }`}
          >
            <Brain className="h-3 w-3 mr-1" />
            AI-Era
          </button>
          
          <button
            onClick={() => updateFilter('remoteRelevant', filters.remoteRelevant === true ? null : true)}
            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium transition-colors ${
              filters.remoteRelevant === true
                ? 'bg-blue-100 text-blue-800'
                : 'bg-gray-100 text-gray-600 hover:bg-blue-50'
            }`}
          >
            <Shield className="h-3 w-3 mr-1" />
            Remote
          </button>
        </div>
      </div>

      {/* Advanced Filters */}
      {showAdvanced && (
        <Card>
          <CardContent className="p-6 space-y-6">
            {/* Categories */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                <Users className="h-4 w-4 mr-2" />
                Categories
              </h4>
              <div className="flex flex-wrap gap-2">
                {categoryOptions.map(category => (
                  <button
                    key={category}
                    onClick={() => toggleArrayFilter('categories', category)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      filters.categories.includes(category)
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {formatCategoryName(category)}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Difficulty */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  Difficulty
                </h4>
                <div className="space-y-2">
                  {difficultyOptions.map(level => (
                    <label key={level} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.difficulty.includes(level)}
                        onChange={() => toggleArrayFilter('difficulty', level)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm capitalize">{level}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Automation Risk */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                  <Shield className="h-4 w-4 mr-2" />
                  Automation Risk
                </h4>
                <div className="space-y-2">
                  {automationRiskOptions.map(risk => (
                    <label key={risk} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.automationRisk.includes(risk)}
                        onChange={() => toggleArrayFilter('automationRisk', risk)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm capitalize">{risk}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Employer Signal Value */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Employer Signal
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>{filters.employerSignal[0]}/10</span>
                    <span>{filters.employerSignal[1]}/10</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={filters.employerSignal[0]}
                    onChange={(e) => updateFilter('employerSignal', [parseInt(e.target.value), filters.employerSignal[1]])}
                    className="w-full"
                  />
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={filters.employerSignal[1]}
                    onChange={(e) => updateFilter('employerSignal', [filters.employerSignal[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Active Filters Display */}
      {hasActiveFilters() && (
        <div className="flex flex-wrap gap-2">
          {filters.query && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Search: "{filters.query}"
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => updateFilter('query', '')}
              />
            </Badge>
          )}
          
          {filters.categories.map(category => (
            <Badge key={category} variant="secondary" className="flex items-center gap-1">
              {formatCategoryName(category)}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => toggleArrayFilter('categories', category)}
              />
            </Badge>
          ))}
          
          {filters.difficulty.map(level => (
            <Badge key={level} variant="secondary" className="flex items-center gap-1">
              {level}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => toggleArrayFilter('difficulty', level)}
              />
            </Badge>
          ))}
          
          {filters.featured === true && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Featured Only
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => updateFilter('featured', null)}
              />
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}