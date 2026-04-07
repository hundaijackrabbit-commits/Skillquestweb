import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getBlogPostBySlug, getAllBlogPosts } from '@/lib/content';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  User,
  Eye,
  Heart,
  Share2,
  BookOpen,
  ArrowRight,
  MessageCircle,
  Star,
  Target
} from 'lucide-react';

interface BlogPostDetailPageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all blog post slugs
export async function generateStaticParams() {
  const blogPosts = await getAllBlogPosts();
  
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostDetailPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  
  if (!post) {
    return {
      title: 'Article Not Found - SkillQuest',
    };
  }
  
  return {
    title: `${post.title} - SkillQuest Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostDetailPage({ params }: BlogPostDetailPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  
  if (!post) {
    notFound();
  }

  const allPosts = await getAllBlogPosts();
  const relatedPosts = allPosts
    .filter(p => p.id !== post.id && p.tags.some(tag => post.tags.includes(tag)))
    .slice(0, 3);

  return (
    <div className="py-12 bg-gradient-to-b from-blue-50/30 to-white min-h-screen">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        {/* Back Navigation */}
        <div className="mb-8">
          <Link 
            href="/blog" 
            className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors group"
          >
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Blog
          </Link>
        </div>

        {/* Article Header */}
        <div className="mb-12">
          <div className="mb-6">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              {post.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="font-medium">
                  {tag.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </Badge>
              ))}
              {post.featured && (
                <Badge variant="default" className="bg-yellow-100 text-yellow-800">
                  <Star className="h-3 w-3 mr-1" />
                  Featured
                </Badge>
              )}
            </div>
            
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>
            
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              {post.excerpt}
            </p>

            {/* Article Meta */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-8">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                <span className="font-medium">{post.author}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{new Date(post.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                <span>{post.readTime} min read</span>
              </div>
            </div>

            {/* Social Actions */}
            <div className="flex items-center gap-4 pb-8 border-b">
              <Button variant="outline" size="sm">
                <Heart className="h-4 w-4 mr-2" />
                Like
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <MessageCircle className="h-4 w-4 mr-2" />
                Discuss
              </Button>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="prose prose-lg prose-gray max-w-none mb-12">
          <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Article Content Coming Soon
            </h2>
            <p className="text-gray-700">
              This is a placeholder for the full article content. In a production environment, 
              this would contain the complete blog post content parsed from markdown or stored 
              in a content management system.
            </p>
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-2"><strong>Article Preview:</strong></p>
              <p className="text-gray-700">{post.content || post.excerpt}</p>
            </div>
          </div>

          {/* Placeholder sections for full article */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
              <p className="text-gray-700 mb-4">
                This article explores {post.title.toLowerCase()} and its implications for 
                professional development in today's economy. We'll examine evidence-based 
                strategies and provide actionable insights for career growth.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Insights</h2>
              <p className="text-gray-700 mb-4">
                Based on current research and industry trends, here are the main takeaways 
                professionals should understand about this topic.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Practical Applications</h2>
              <p className="text-gray-700 mb-4">
                Here's how you can apply these insights to your own professional development 
                and career advancement strategy.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Conclusion</h2>
              <p className="text-gray-700 mb-4">
                Understanding {post.title.toLowerCase()} is crucial for professional success. 
                By implementing these strategies, you can accelerate your career growth and 
                stay competitive in today's market.
              </p>
            </div>
          </div>
        </div>

        {/* Related Content */}
        {(post.relatedSkills?.length || post.relatedCareers?.length) && (
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="h-5 w-5 mr-2 text-blue-600" />
                Related Content
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {post.relatedSkills && post.relatedSkills.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Related Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {post.relatedSkills.map((skillId, index) => (
                        <Link key={index} href={`/skills/${skillId}`}>
                          <Badge variant="outline" className="hover:bg-blue-50 cursor-pointer">
                            {skillId.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </Badge>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
                
                {post.relatedCareers && post.relatedCareers.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Related Careers</h4>
                    <div className="flex flex-wrap gap-2">
                      {post.relatedCareers.map((careerId, index) => (
                        <Link key={index} href={`/careers/${careerId}`}>
                          <Badge variant="outline" className="hover:bg-green-50 cursor-pointer">
                            {careerId.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </Badge>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`}>
                  <Card className="hover:shadow-lg transition-shadow group">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant="outline" size="sm">
                          {relatedPost.tags[0]?.replace('-', ' ')}
                        </Badge>
                        <div className="flex items-center text-xs text-gray-500">
                          <Clock className="h-3 w-3 mr-1" />
                          {relatedPost.readTime}m
                        </div>
                      </div>
                      <CardTitle className="text-lg group-hover:text-blue-600 transition-colors line-clamp-2">
                        {relatedPost.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm text-gray-600 line-clamp-3">
                        {relatedPost.excerpt}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Newsletter CTA */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
          <CardContent className="pt-6">
            <div className="text-center">
              <BookOpen className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Stay Updated with Professional Insights
              </h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Get weekly articles on career development, skill building, and market trends 
                delivered to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Button>
                  Subscribe
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation to Blog */}
        <div className="text-center mt-12">
          <Link href="/blog">
            <Button variant="outline" size="lg">
              <BookOpen className="h-4 w-4 mr-2" />
              Browse All Articles
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}