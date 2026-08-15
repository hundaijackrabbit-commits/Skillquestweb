import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Clock3, Sparkles } from 'lucide-react';
import { CourseRunner } from '@/components/learning/course-runner';
import { getAllSkillCourses, getSkillCourse } from '@/lib/courses';
import { getSkillBySlug } from '@/lib/content';
import { absoluteUrl } from '@/lib/site';
import { breadcrumbList } from '@/lib/seo';

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllSkillCourses().map((course) => ({ slug: course.skillSlug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const course = getSkillCourse(slug);
  if (!course) return { title: 'Skill Sprint Not Found' };

  return {
    title: `${course.title}: Short Practice Course`,
    description: course.description,
    alternates: { canonical: `/skills/${course.skillSlug}/learn` },
    openGraph: {
      title: `${course.title} | Modern Skill Lab`,
      description: course.description,
      type: 'article',
      url: absoluteUrl(`/skills/${course.skillSlug}/learn`),
    },
  };
}

export default async function SkillCoursePage({ params }: Props) {
  const { slug } = await params;
  const course = getSkillCourse(slug);
  const skill = await getSkillBySlug(slug);
  if (!course || !skill) notFound();

  const courseUrl = absoluteUrl(`/skills/${course.skillSlug}/learn`);
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Course',
        name: course.title,
        description: course.description,
        url: courseUrl,
        provider: { '@type': 'Organization', name: 'Modern Skill Lab', url: absoluteUrl('/') },
        numberOfCredits: course.lessons.length * course.pointsPerLesson,
        timeRequired: `PT${course.estimatedMinutes}M`,
        about: skill.name,
      },
      breadcrumbList([
        { name: 'Modern Skill Lab', url: absoluteUrl('/') },
        { name: 'Practice Lab', url: absoluteUrl('/learn') },
        { name: course.title, url: courseUrl },
      ]),
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/40 to-white py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }}
      />
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <Link
            href={`/skills/${skill.slug}`}
            className="inline-flex items-center text-sm font-semibold text-slate-600 transition hover:text-blue-700"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to {skill.name}
          </Link>
          <Link href="/learn" className="text-sm font-semibold text-blue-700 hover:text-blue-900">
            Browse all Skill Sprints
          </Link>
        </div>

        <header className="mb-10 max-w-4xl">
          <div className="mb-4 flex flex-wrap items-center gap-3 text-sm font-semibold">
            <span className="inline-flex items-center rounded-full bg-violet-100 px-3 py-1.5 text-violet-800">
              <Sparkles className="mr-1.5 h-4 w-4" />
              Skill Sprint
            </span>
            <span className="inline-flex items-center text-slate-500">
              <Clock3 className="mr-1.5 h-4 w-4" />
              About {course.estimatedMinutes} minutes
            </span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">{course.title}</h1>
          <p className="mt-4 text-xl leading-8 text-slate-600">{course.description}</p>
        </header>

        <CourseRunner
          course={course}
          skillName={skill.name}
          relatedSkillHref={`/skills/${skill.slug}`}
        />
      </div>
    </div>
  );
}
