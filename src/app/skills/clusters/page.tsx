import type { Metadata } from 'next';
import Link from 'next/link';
import { TOPICS, getTopicContent } from '@/lib/topics';
import { getCanonicalSkills } from '@/lib/content';
import { Breadcrumbs } from '@/components/navigation/breadcrumbs';

export const metadata: Metadata = { title: 'Skill Clusters', description: 'Explore connected skill families, from foundations to adjacent and advanced capabilities.', alternates: { canonical: '/skills/clusters' } };

export default async function SkillClustersPage() {
  const allSkills = await getCanonicalSkills();
  const clusters = await Promise.all(TOPICS.map(async (topic) => {
    const content = await getTopicContent(topic.slug);
    const skills = allSkills.filter((skill) => skill.category === topic.slug);
    return { topic, content: { ...content, skills } };
  }));
  return <main className="min-h-screen bg-white py-12"><div className="mx-auto max-w-7xl px-6 lg:px-8">
    <Breadcrumbs items={[{label:'Home',href:'/'},{label:'Skills',href:'/skills'},{label:'Skill clusters'}]} />
    <header className="mt-8 max-w-4xl"><p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-700">Connected knowledge map</p><h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950 sm:text-6xl">Learn skills as systems, not isolated pages.</h1><p className="mt-5 text-lg leading-8 text-slate-600">Each cluster groups a broad capability with its most useful adjacent skills. Start with a foundation, follow the relationships, then move into a learning path when you want a structured sequence.</p></header>
    <div className="mt-12 grid gap-6 lg:grid-cols-2">{clusters.map(({topic,content})=><section key={topic.slug} className="rounded-3xl border border-slate-200 p-6 shadow-sm"><div className="flex items-start justify-between gap-4"><div><h2 className="text-2xl font-bold text-slate-950">{topic.name}</h2><p className="mt-2 text-sm leading-6 text-slate-600">{topic.description}</p></div><span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">{content.skills.length} skills</span></div><p className="mt-4 text-sm font-medium text-slate-700">{topic.startingPoint}</p><div className="mt-5 flex flex-wrap gap-2">{content.skills.slice(0,12).map((skill)=><Link key={skill.slug} href={`/skills/${skill.slug}`} className="rounded-full border border-slate-200 px-3 py-1.5 text-sm font-semibold text-slate-700 hover:border-blue-300 hover:text-blue-700">{skill.name}</Link>)}</div><div className="mt-6 flex gap-5 border-t border-slate-100 pt-5 text-sm font-bold"><Link href={`/topics/${topic.slug}`} className="text-blue-700">Explore all {content.skills.length} →</Link>{content.paths[0]&&<Link href={`/paths/${content.paths[0].id}`} className="text-slate-700">Follow a path →</Link>}</div></section>)}</div>
  </div></main>;
}
