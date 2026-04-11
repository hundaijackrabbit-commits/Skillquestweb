import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatRelativeDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) return 'Today';
  if (diffInDays === 1) return 'Yesterday';
  if (diffInDays < 7) return `${diffInDays} days ago`;
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
  if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
  return `${Math.floor(diffInDays / 365)} years ago`;
}

export function createSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

export function capitalizeWords(text: string): string {
  return text
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function formatCategoryName(category: string): string {
  return category
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function estimateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).replace(/\s+\S*$/, '') + '...';
}

export function pluralize(count: number, singular: string, plural?: string): string {
  if (count === 1) return `${count} ${singular}`;
  return `${count} ${plural || singular + 's'}`;
}

// Color utilities for categories
export function getCategoryColor(category: string): { bg: string; text: string; border: string } {
  const colors: Record<string, { bg: string; text: string; border: string }> = {
    'communication': { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
    'leadership': { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
    'critical-thinking': { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
    'collaboration': { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200' },
    'personal-effectiveness': { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200' },
    'business-strategy': { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200' },
    'sales-marketing': { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
    'finance-operations': { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200' },
    'human-resources': { bg: 'bg-pink-50', text: 'text-pink-700', border: 'border-pink-200' },
    'customer-success': { bg: 'bg-cyan-50', text: 'text-cyan-700', border: 'border-cyan-200' },
    'digital-literacy': { bg: 'bg-violet-50', text: 'text-violet-700', border: 'border-violet-200' },
    'content-media': { bg: 'bg-teal-50', text: 'text-teal-700', border: 'border-teal-200' },
    'design-ux': { bg: 'bg-fuchsia-50', text: 'text-fuchsia-700', border: 'border-fuchsia-200' },
    'technical': { bg: 'bg-slate-50', text: 'text-slate-700', border: 'border-slate-200' },
    'analytics-research': { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
    'remote-work': { bg: 'bg-sky-50', text: 'text-sky-700', border: 'border-sky-200' },
    'entrepreneurship': { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' },
    'freelance-gig': { bg: 'bg-lime-50', text: 'text-lime-700', border: 'border-lime-200' },
    'ai-era': { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200' },
    'future-resistant': { bg: 'bg-stone-50', text: 'text-stone-700', border: 'border-stone-200' },
  };

  return colors[category] || { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200' };
}

// Risk level colors
export function getRiskLevelColor(risk: string): { bg: string; text: string } {
  const colors: Record<string, { bg: string; text: string }> = {
    'low': { bg: 'bg-green-100', text: 'text-green-800' },
    'medium': { bg: 'bg-yellow-100', text: 'text-yellow-800' },
    'high': { bg: 'bg-red-100', text: 'text-red-800' },
  };
  return colors[risk] || { bg: 'bg-gray-100', text: 'text-gray-800' };
}

// Difficulty level colors
export function getDifficultyColor(difficulty: string): { bg: string; text: string } {
  const colors: Record<string, { bg: string; text: string }> = {
    'beginner': { bg: 'bg-green-100', text: 'text-green-800' },
    'intermediate': { bg: 'bg-yellow-100', text: 'text-yellow-800' },
    'advanced': { bg: 'bg-red-100', text: 'text-red-800' },
  };
  return colors[difficulty] || { bg: 'bg-gray-100', text: 'text-gray-800' };
}

// Employer signal value visualization
export function getSignalValueColor(value: number): { bg: string; text: string } {
  if (value >= 8) return { bg: 'bg-green-100', text: 'text-green-800' };
  if (value >= 6) return { bg: 'bg-yellow-100', text: 'text-yellow-800' };
  if (value >= 4) return { bg: 'bg-orange-100', text: 'text-orange-800' };
  return { bg: 'bg-red-100', text: 'text-red-800' };
}

// Search and filtering utilities
export function highlightSearchTerm(text: string, searchTerm: string): string {
  if (!searchTerm) return text;
  
  const regex = new RegExp(`(${searchTerm})`, 'gi');
  return text.replace(regex, '<mark class="bg-yellow-200 px-1 py-0.5 rounded">$1</mark>');
}

// URL utilities
export function getSkillUrl(slug: string): string {
  return `/skills/${slug}`;
}

export function getCareerUrl(slug: string): string {
  return `/careers/${slug}`;
}

export function getIndustryUrl(slug: string): string {
  return `/industries/${slug}`;
}

export function getBlogUrl(slug: string): string {
  return `/blog/${slug}`;
}

// Content processing utilities
export function extractMdxMetadata(content: string): Record<string, any> {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---/;
  const match = content.match(frontmatterRegex);
  
  if (!match) return {};
  
  const frontmatter = match[1];
  const metadata: Record<string, any> = {};
  
  frontmatter.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length) {
      const value = valueParts.join(':').trim();
      // Handle different data types
      if (value === 'true') metadata[key.trim()] = true;
      else if (value === 'false') metadata[key.trim()] = false;
      else if (/^\d+$/.test(value)) metadata[key.trim()] = parseInt(value);
      else if (value.startsWith('[') && value.endsWith(']')) {
        // Simple array parsing
        metadata[key.trim()] = value.slice(1, -1).split(',').map(s => s.trim().replace(/['"]/g, ''));
      }
      else metadata[key.trim()] = value.replace(/['"]/g, '');
    }
  });
  
  return metadata;
}

// Performance and analytics utilities
export function debounce<T extends (...args: any[]) => void>(
  func: T,
  waitFor: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), waitFor);
  };
}

export function throttle<T extends (...args: any[]) => void>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// SEO utilities
export function generateMetaDescription(content: string, maxLength: number = 160): string {
  // Remove markdown and HTML
  const cleanContent = content
    .replace(/#+\s/g, '') // Headers
    .replace(/\*\*(.*?)\*\*/g, '$1') // Bold
    .replace(/\*(.*?)\*/g, '$1') // Italic
    .replace(/<[^>]*>/g, '') // HTML tags
    .replace(/\n/g, ' '); // Line breaks
    
  return truncateText(cleanContent, maxLength);
}