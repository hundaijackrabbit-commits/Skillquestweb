import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getAllBlogPosts } from '@/lib/content';
import { 
  Search, 
  Filter, 
  ArrowRight, 
  Clock, 
  User,
  Calendar,
  BookOpen,
  TrendingUp,
  Lightbulb,
  Target,
  Zap,
  Star,
  Eye
} from 'lucide-react';

export const metadata = {
  title: 'Professional Development Blog - SkillQuest',
  description: 'Evidence-backed insights on career development, skills acquisition, and professional growth. Expert analysis and practical advice for navigating today\'s economy.',
};

export default async function BlogPage() {
  const blogPosts = await getAllBlogPosts();
  const featuredPosts = blogPosts.filter(post => post.featured);
  
  return (
    <div className="py-12 bg-gradient-to-b from-blue-50/30 to-white min-h-screen">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mx-auto max-w-4xl text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-sm font-medium mb-6">
            <Lightbulb className="h-4 w-4 mr-2" />
            Professional Development Insights
          </div>
          
          <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-6">
            Skills & Career
            <span className="text-blue-600 block">Intelligence Blog</span>
          </h1>
          
          <p className="text-xl leading-8 text-gray-600 mb-8">
            Evidence-backed insights on career development, skills acquisition, and professional growth. 
            Expert analysis and practical advice for navigating today's rapidly evolving economy.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{blogPosts.length}</div>
              <div className="text-sm font-medium text-gray-600">Expert Articles</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">{featuredPosts.length}</div>
              <div className="text-sm font-medium text-gray-600">Featured Insights</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">100%</div>
              <div className="text-sm font-medium text-gray-600">Evidence-Based</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">Weekly</div>
              <div className="text-sm font-medium text-gray-600">New Content</div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-12 flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search insights and articles..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
            />
          </div>
          <Button variant="outline" className="sm:w-auto">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>

        {/* Content Status */}
        {blogPosts.length === 0 ? (
          <div className="text-center py-16">
            <div className="mx-auto max-w-md">
              <BookOpen className="h-24 w-24 text-gray-300 mx-auto mb-6" />
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Blog Content Coming Soon
              </h2>
              <p className="text-gray-600 mb-8">
                We're crafting evidence-backed articles on professional development, 
                career intelligence, and skills acquisition. Our first insights will be 
                published shortly.
              </p>
              
              {/* Newsletter Signup Placeholder */}
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Get Notified When We Publish
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Be among the first to access our professional development insights
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <Button>
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Featured Posts */}
            {featuredPosts.length > 0 && (
              <div className="mb-16">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 flex items-center">
                    <Star className="h-7 w-7 mr-3 text-yellow-500" />
                    Featured Insights
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {featuredPosts.slice(0, 4).map((post) => (
                    <Card key={post.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-pink-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      <CardHeader className="relative">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-2">
                            {post.tags.slice(0, 2).map((tag, index) => (
                              <Badge key={index} variant="secondary" size="sm">
                                {tag.replace('-', ' ')}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Clock className="h-4 w-4 mr-1" />
                            {post.readTime} min
                          </div>
                        </div>
                        
                        <CardTitle className="text-2xl group-hover:text-blue-600 transition-colors line-clamp-2">
                          {post.title}
                        </CardTitle>
                      </CardHeader>

                      <CardContent className="relative">
                        <p className="text-gray-700 mb-6 leading-relaxed">
                          {post.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-sm text-gray-600">
                            <User className="h-4 w-4 mr-2" />
                            <span>{post.author}</span>
                            <Calendar className="h-4 w-4 ml-4 mr-1" />
                            <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                          </div>
                          <Link href={`/blog/${post.slug}`}>
                            <Button className="bg-blue-600 hover:bg-blue-700 shadow-sm hover:shadow-md">
                              Read More <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* All Posts */}
            <div className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Latest Articles</h2>
                <div className="text-sm text-gray-600">
                  {blogPosts.length} articles published
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {blogPosts.map((post) => (
                  <Card key={post.id} className="hover:shadow-lg transition-shadow group">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          {post.tags.slice(0, 1).map((tag, index) => (
                            <Badge key={index} variant="outline" size="sm">
                              {tag.replace('-', ' ')}
                            </Badge>
                          ))}
                        </div>
                        {post.featured && (
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        )}
                      </div>
                      <CardTitle className="text-lg group-hover:text-blue-600 transition-colors line-clamp-2">
                        {post.title}
                      </CardTitle>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-xs text-gray-500">
                          <User className="h-3 w-3 mr-2" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center text-xs text-gray-500">
                          <Clock className="h-3 w-3 mr-2" />
                          <span>{post.readTime} min read</span>
                        </div>
                        <div className="flex items-center text-xs text-gray-500">
                          <Calendar className="h-3 w-3 mr-2" />
                          <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="text-xs text-gray-500 uppercase tracking-wide">
                          Professional Insights
                        </div>
                        <Link href={`/blog/${post.slug}`}>
                          <Button variant="outline" size="sm">
                            Read <ArrowRight className="ml-1 h-3 w-3" />
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Topics Section */}
        <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-2xl p-12 mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center">
              <Target className="h-8 w-8 mr-3 text-blue-500" />
              Topics We Cover
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Evidence-backed insights across the full spectrum of professional development
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Skills Intelligence</h3>
              <p className="text-sm text-gray-600">
                Market insights and strategic skill development guidance
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Career Strategy</h3>
              <p className="text-sm text-gray-600">
                Evidence-backed career planning and advancement tactics
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Eye className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Market Analysis</h3>
              <p className="text-sm text-gray-600">
                Labor market trends and economic insights for professionals
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Learning Science</h3>
              <p className="text-sm text-gray-600">
                Research-backed approaches to skill acquisition and mastery
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Stay Ahead of the Curve
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Get weekly insights on skills, careers, and professional development delivered 
            to your inbox. Evidence-backed content for strategic career growth.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="px-8">
              <Target className="h-4 w-4 mr-2" />
              Subscribe to Insights
            </Button>
            <Button variant="outline" size="lg" className="px-8">
              <BookOpen className="h-4 w-4 mr-2" />
              Browse All Articles
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}