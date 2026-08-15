import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/navigation/breadcrumbs';
import {
  getBlogPostBySlug,
  getAllBlogPosts,
  resolveSkillReferences,
  resolveCareerReferences,
  resolveIndustryReferences,
} from '@/lib/content';
import { ContentViewTracker } from '@/components/analytics/content-view-tracker';
import { ManagedAdSlot } from '@/components/ads/managed-ad-slot';
import { absoluteUrl } from '@/lib/site';
import { breadcrumbList } from '@/lib/seo';
import { isBlogPostIndexable } from '@/lib/content-quality';
import { ArticleActions } from '@/components/blog/article-actions';
import {
  Calendar,
  Clock,
  User,
  BookOpen,
  ArrowRight,
  Star,
  ShieldCheck,
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
  return blogPosts.filter(isBlogPostIndexable).map((post) => ({
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
    robots: { index: isBlogPostIndexable(post), follow: true },
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

  const [allPosts, relatedSkills, relatedCareers, relatedIndustries] = await Promise.all([
    getAllBlogPosts(),
    resolveSkillReferences(post.relatedSkills, 8),
    resolveCareerReferences(post.relatedCareers, 6),
    resolveIndustryReferences(post.relatedIndustries, 6),
  ]);
  const relatedPosts = allPosts
    .filter((p) => isBlogPostIndexable(p) && p.id !== post.id && p.tags.some((tag) => post.tags.includes(tag)))
    .slice(0, 3);
  const canonicalUrl = absoluteUrl(`/blog/${post.slug}`);
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.excerpt,
        mainEntityOfPage: canonicalUrl,
        datePublished: post.publishedAt,
        dateModified: post.lastUpdated,
        author: { '@type': 'Organization', name: post.author },
        publisher: { '@type': 'Organization', name: 'Modern Skill Lab' },
      },
      breadcrumbList([
        { name: 'Modern Skill Lab', url: absoluteUrl('/') },
        { name: 'Blog', url: absoluteUrl('/blog') },
        { name: post.title, url: canonicalUrl },
      ]),
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/30 to-white py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <ContentViewTracker eventType="blog_view" itemType="blog" itemSlug={post.slug} />
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <Breadcrumbs className="mb-8" items={[{ label: 'Home', href: '/' }, { label: 'Blog', href: '/blog' }, { label: post.title }]} />

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
            <div className="flex items-center">
              <ShieldCheck className="mr-2 h-4 w-4 text-emerald-600" />
              Reviewed {new Date(`${post.lastUpdated}T12:00:00`).toLocaleDateString()}
            </div>
          </div>

          <ArticleActions slug={post.slug} />
        </div>

        {post.reviewedBy && (
          <aside className="mb-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-sm leading-6 text-emerald-950">
            <strong>Editorial review:</strong> {post.reviewedBy}. {post.evidenceNote ?? 'Claims with a meaningful date or number are linked to their source in the article.'}
          </aside>
        )}

        <article className="mb-12 rounded-2xl border bg-white p-8 shadow-sm">
          <div className="prose prose-lg max-w-none">
            <MDXRemote source={post.content} components={mdxComponents} />
          </div>
        </article>

        <ManagedAdSlot placement="blog-inline" />

        {(relatedSkills.length > 0 || relatedCareers.length > 0 || relatedIndustries.length > 0) && (
          <Card id="practice-next" className="mb-12 scroll-mt-28">
            <CardHeader>
              <CardTitle>Continue through the topic</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6 md:grid-cols-3">
              {relatedSkills.length > 0 && (
                <div>
                  <h4 className="mb-3 font-semibold">Practice the skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {relatedSkills.map((skill) => (
                      <Link key={skill.slug} href={`/skills/${skill.slug}`}>
                        <Badge variant="outline" className="transition hover:bg-blue-50">{skill.name}</Badge>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {relatedCareers.length > 0 && (
                <div>
                  <h4 className="mb-3 font-semibold">See the careers</h4>
                  <div className="flex flex-wrap gap-2">
                    {relatedCareers.map((career) => (
                      <Link key={career.slug} href={`/careers/${career.slug}`}>
                        <Badge variant="outline" className="transition hover:bg-violet-50">{career.title}</Badge>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {relatedIndustries.length > 0 && (
                <div>
                  <h4 className="mb-3 font-semibold">Explore the industries</h4>
                  <div className="flex flex-wrap gap-2">
                    {relatedIndustries.map((industry) => (
                      <Link key={industry.slug} href={`/industries/${industry.slug}`}>
                        <Badge variant="outline" className="transition hover:bg-emerald-50">{industry.name}</Badge>
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
