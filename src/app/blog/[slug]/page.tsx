import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getBlogPostBySlug, getAllBlogPosts } from '@/lib/content';
import { ContentViewTracker } from '@/components/analytics/content-view-tracker';
import { ManagedAdSlot } from '@/components/ads/managed-ad-slot';
import { absoluteUrl } from '@/lib/site';
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
} from 'lucide-react';

interface BlogPostDetailPageProps {
  params: Promise<{ slug: string }>;
}

const mdxComponents = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="mt-10 mb-4 text-4xl font-bold tracking-tight text-gray-900" {...props} />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="mt-10 mb-4 text-2xl font-bold text-gray-900" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="mt-8 mb-3 text-xl font-semibold text-gray-900" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="mb-5 leading-8 text-gray-700" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="mb-6 ml-6 list-disc space-y-2 text-gray-700" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="mb-6 ml-6 list-decimal space-y-2 text-gray-700" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="pl-1" {...props} />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-semibold text-gray-900" {...props} />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLElement>) => (
    <blockquote className="my-6 border-l-4 border-blue-300 bg-blue-50/60 px-4 py-3 italic text-gray-700" {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a className="font-medium text-blue-600 underline-offset-4 hover:underline" {...props} />
  ),
  hr: () => <hr className="my-10 border-gray-200" />,
};

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
      title: 'Article Not Found',
    };
  }

  const description = post.excerpt.length > 158 ? `${post.excerpt.slice(0, 155)}…` : post.excerpt;
  return {
    title: post.title,
    description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: `${post.title} | Modern Skill Lab`,
      description,
      type: 'article',
      url: `/blog/${post.slug}`,
      publishedTime: post.publishedAt,
      modifiedTime: post.lastUpdated,
      authors: [post.author],
    },
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
    .filter((p) => p.id !== post.id && p.tags.some((tag) => post.tags.includes(tag)))
    .slice(0, 3);
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
    datePublished: post.publishedAt,
    dateModified: post.lastUpdated,
    author: { '@type': 'Organization', name: post.author },
    publisher: { '@type': 'Organization', name: 'Modern Skill Lab' },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/30 to-white py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <ContentViewTracker eventType="blog_view" itemType="blog" itemSlug={post.slug} />
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/blog" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </div>

        <div className="mb-12">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            {post.tags.map((tag, i) => (
              <Badge key={i} variant="secondary">
                {tag.replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
              </Badge>
            ))}
            {post.featured && (
              <Badge className="bg-yellow-100 text-yellow-800">
                <Star className="mr-1 h-3 w-3" />
                Featured
              </Badge>
            )}
          </div>

          <h1 className="mb-6 text-4xl font-bold leading-tight text-gray-900">{post.title}</h1>

          <p className="mb-8 text-xl leading-relaxed text-gray-700">{post.excerpt}</p>

          <div className="mb-8 flex flex-wrap items-center gap-6 text-sm text-gray-600">
            <div className="flex items-center">
              <User className="mr-2 h-4 w-4" />
              {post.author}
            </div>
            <div className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              {new Date(post.publishedAt).toLocaleDateString()}
            </div>
            <div className="flex items-center">
              <Clock className="mr-2 h-4 w-4" />
              {post.readTime} min read
            </div>
          </div>

          <div className="flex gap-3 border-b pb-6">
            <Button variant="outline" size="sm"><Heart className="mr-2 h-4 w-4" />Like</Button>
            <Button variant="outline" size="sm"><Share2 className="mr-2 h-4 w-4" />Share</Button>
            <Button variant="outline" size="sm"><MessageCircle className="mr-2 h-4 w-4" />Discuss</Button>
          </div>
        </div>

        <article className="mb-12 rounded-2xl border bg-white p-8 shadow-sm">
          <div className="prose prose-lg max-w-none">
            <MDXRemote source={post.content} components={mdxComponents} />
          </div>
        </article>

        <ManagedAdSlot placement="blog-inline" />

        {(post.relatedSkills?.length || post.relatedCareers?.length) && (
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>Related Content</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6 md:grid-cols-2">
              {post.relatedSkills?.length > 0 && (
                <div>
                  <h4 className="mb-3 font-semibold">Skills</h4>
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
                  <h4 className="mb-3 font-semibold">Careers</h4>
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

        {relatedPosts.length > 0 && (
          <div className="mb-12">
            <h2 className="mb-6 text-2xl font-bold">Related Articles</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {relatedPosts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`}>
                  <Card className="h-full transition hover:shadow-md">
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

        <div className="mt-12 text-center">
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
