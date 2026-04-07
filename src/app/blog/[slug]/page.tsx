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

        {/* Back */}
        <div className="mb-8">
          <Link href="/blog" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </div>

        {/* Header */}
        <div className="mb-12">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            {post.tags.map((tag, i) => (
              <Badge key={i} variant="secondary">
                {tag.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </Badge>
            ))}
            {post.featured && (
              <Badge className="bg-yellow-100 text-yellow-800">
                <Star className="h-3 w-3 mr-1" />
                Featured
              </Badge>
            )}
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            {post.title}
          </h1>

          <p className="text-xl text-gray-700 mb-8">
            {post.excerpt}
          </p>

          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-8">
            <div className="flex items-center">
              <User className="h-4 w-4 mr-2" />
              {post.author}
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              {new Date(post.publishedAt).toLocaleDateString()}
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              {post.readTime} min read
            </div>
          </div>

          <div className="flex gap-3 border-b pb-6">
            <Button variant="outline" size="sm"><Heart className="h-4 w-4 mr-2" />Like</Button>
            <Button variant="outline" size="sm"><Share2 className="h-4 w-4 mr-2" />Share</Button>
            <Button variant="outline" size="sm"><MessageCircle className="h-4 w-4 mr-2" />Discuss</Button>
          </div>
        </div>

        {/* ✅ CLEAN ARTICLE CONTENT */}
        <div className="prose prose-lg max-w-none mb-12">
          {post.content.split('\n\n').map((p, i) => (
            <p key={i} className="text-gray-700 leading-relaxed mb-6">
              {p}
            </p>
          ))}
        </div>

        {/* Related Skills / Careers */}
        {(post.relatedSkills?.length || post.relatedCareers?.length) && (
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>Related Content</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6">

              {post.relatedSkills?.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-3">Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {post.relatedSkills.map((id, i) => (
                      <Link key={i} href={`/skills/${id}`}>
                        <Badge variant="outline">{id}</Badge>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {post.relatedCareers?.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-3">Careers</h4>
                  <div className="flex flex-wrap gap-2">
                    {post.relatedCareers.map((id, i) => (
                      <Link key={i} href={`/careers/${id}`}>
                        <Badge variant="outline">{id}</Badge>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

            </CardContent>
          </Card>
        )}

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map(post => (
                <Link key={post.id} href={`/blog/${post.slug}`}>
                  <Card className="hover:shadow-md transition">
                    <CardHeader>
                      <CardTitle className="text-lg">{post.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600">{post.excerpt}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="text-center mt-12">
          <Link href="/blog">
            <Button variant="outline">
              <BookOpen className="mr-2 h-4 w-4" />
              Browse All Articles
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

      </div>
    </div>
  );
}