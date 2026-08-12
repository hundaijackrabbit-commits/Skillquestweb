import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Activity,
  BarChart3,
  BookOpen,
  ExternalLink,
  Mail,
  Megaphone,
  ShieldCheck,
  Sparkles,
  Users,
  WalletCards,
} from 'lucide-react';
import { requireAdmin, createPrivilegedClient } from '@/lib/admin';
import { getAllSkills } from '@/lib/content';
import { featureSkill, deactivateFeature, updateAdPlacement, updateSubscriberStatus, setAdminRole, updateMarketingSettings } from './actions';

type TrendingSkillRow = {
  item_slug: string;
  views: number | string | null;
};

export const metadata: Metadata = {
  title: 'Growth Console',
  description: 'Modern Skill Lab administration and growth controls.',
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const { user, supabase } = await requireAdmin();
  const privileged = createPrivilegedClient();
  const db = privileged || supabase;
  const skills = await getAllSkills();
  const skillBySlug = new Map(skills.map((skill) => [skill.slug, skill]));
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

  const [
    profilesResult,
    subscribersResult,
    activeSubscribersResult,
    weeklyEventsResult,
    weeklyTrendingResult,
    monthlyTrendingResult,
    featuredResult,
    adsResult,
    recentUsersResult,
    recentSubscribersResult,
  ] = await Promise.all([
    db.from('profiles').select('id', { count: 'exact', head: true }),
    db.from('newsletter_subscribers').select('id', { count: 'exact', head: true }),
    db.from('newsletter_subscribers').select('id', { count: 'exact', head: true }).eq('status', 'subscribed'),
    db.from('content_events').select('id', { count: 'exact', head: true }).gte('created_at', sevenDaysAgo),
    db.rpc('get_trending_skills', { p_days: 7, p_limit: 20 }),
    db.rpc('get_trending_skills', { p_days: 30, p_limit: 20 }),
    db.from('featured_skills').select('*').eq('active', true).order('display_order').order('created_at', { ascending: false }),
    db.from('ad_placements').select('*').order('label'),
    db.from('profiles').select('id, email, name, created_at, saved_skills, saved_careers, is_admin').order('created_at', { ascending: false }).limit(12),
    db.from('newsletter_subscribers').select('id, email, source, status, created_at').order('created_at', { ascending: false }).limit(12),
  ]);

  const marketingResult = await db.from('site_settings').select('value').eq('key', 'marketing').maybeSingle();
  const marketing = (marketingResult.data?.value || {}) as { newsletterHeadline?: string; newsletterDescription?: string };
  const setupMissing = [subscribersResult, weeklyEventsResult, featuredResult, adsResult].some((result) => Boolean(result.error));
  const monthlyTrendingRows = (monthlyTrendingResult.data || []) as TrendingSkillRow[];
  const weeklyTrendingRows = (weeklyTrendingResult.data || []) as TrendingSkillRow[];
  const topSkills = monthlyTrendingRows.slice(0, 8).map((row) => [String(row.item_slug), Number(row.views)] as const);
  const weeklySkillCounts = new Map(weeklyTrendingRows.map((row) => [String(row.item_slug), Number(row.views)] as const));
  const activeFeatures = featuredResult.data || [];
  const adPlacements = adsResult.data || [];
  const users = recentUsersResult.data || [];
  const subscribers = recentSubscribersResult.data || [];

  const stats = [
    { label: 'Accounts', value: profilesResult.count ?? 0, icon: Users, detail: 'Registered members' },
    { label: 'Email subscribers', value: activeSubscribersResult.count ?? 0, icon: Mail, detail: `${subscribersResult.count ?? 0} total records` },
    { label: 'Tracked activity', value: weeklyEventsResult.count ?? 0, icon: Activity, detail: 'Last 7 days' },
    { label: 'Skill library', value: skills.length, icon: BookOpen, detail: 'Public skill guides' },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="border-b bg-slate-950 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-8 lg:flex-row lg:items-end lg:justify-between lg:px-8">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-200">
              <ShieldCheck className="h-4 w-4" /> Modern Skill Lab Admin
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Growth Console</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
              Connect traffic, users, skills, marketing, featured content and advertising to the public site from one place.
            </p>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="hidden text-slate-400 sm:inline">{user.email}</span>
            <Link href="/" className="inline-flex items-center rounded-xl bg-white px-4 py-2 font-semibold text-slate-900 hover:bg-slate-100">
              View site <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl space-y-10 px-6 py-10 lg:px-8">
        {setupMissing && (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-900">
            <strong>Growth tables are not live yet.</strong> Run <code className="rounded bg-amber-100 px-1.5 py-0.5">supabase/migrations/003_growth_admin.sql</code> in the Supabase SQL editor, then set your profile&apos;s <code className="rounded bg-amber-100 px-1.5 py-0.5">is_admin</code> flag to true. The public site remains safe if these tables are not installed yet.
          </div>
        )}

        <section>
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-600">Command center</p>
              <h2 className="mt-1 text-2xl font-bold text-slate-900">What is happening now</h2>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">{stat.value.toLocaleString()}</p>
                    <p className="mt-1 text-xs text-slate-500">{stat.detail}</p>
                  </div>
                  <div className="rounded-xl bg-blue-50 p-2.5 text-blue-700"><stat.icon className="h-5 w-5" /></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="featured" className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-blue-600"><Sparkles className="h-5 w-5" /><span className="text-sm font-semibold uppercase tracking-[0.16em]">Homepage control</span></div>
                <h2 className="mt-2 text-2xl font-bold text-slate-900">Feature a skill</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">Choose the same skill records visitors browse. Changes feed the public homepage.</p>
              </div>
            </div>
            <form action={featureSkill} className="grid gap-4 md:grid-cols-2">
              <label className="text-sm font-medium text-slate-700 md:col-span-2">Skill
                <select name="skillSlug" required className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5">
                  {skills.map((skill) => <option key={skill.slug} value={skill.slug}>{skill.name} · {skill.category}</option>)}
                </select>
              </label>
              <label className="text-sm font-medium text-slate-700">Feature type
                <select name="featureType" className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5">
                  <option value="week">Skill of the Week</option>
                  <option value="month">Skill of the Month</option>
                  <option value="editor">Editor&apos;s Pick</option>
                </select>
              </label>
              <label className="text-sm font-medium text-slate-700">Homepage headline (optional)
                <input name="headline" maxLength={120} placeholder="Why this skill matters right now" className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2.5" />
              </label>
              <button className="md:col-span-2 inline-flex w-fit items-center rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700">Feature on homepage</button>
            </form>

            <div className="mt-8 border-t border-slate-100 pt-6">
              <h3 className="text-sm font-semibold text-slate-900">Active homepage features</h3>
              <div className="mt-3 space-y-2">
                {activeFeatures.length === 0 && <p className="text-sm text-slate-500">No admin-selected skills are active yet.</p>}
                {activeFeatures.map((feature) => {
                  const skill = skillBySlug.get(feature.skill_slug);
                  return (
                    <div key={feature.id} className="flex flex-col gap-3 rounded-xl bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
                      <div><p className="font-semibold text-slate-900">{skill?.name || feature.skill_slug}</p><p className="text-xs uppercase tracking-wide text-slate-500">{feature.feature_type}</p></div>
                      <form action={deactivateFeature}><input type="hidden" name="id" value={feature.id} /><button className="text-sm font-medium text-red-600 hover:text-red-700">Remove from homepage</button></form>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2 text-orange-600"><BarChart3 className="h-5 w-5" /><span className="text-sm font-semibold uppercase tracking-[0.16em]">Content intelligence</span></div>
            <h2 className="mt-2 text-2xl font-bold text-slate-900">Most viewed skills</h2>
            <p className="mt-2 text-sm text-slate-600">Based on first-party skill-view events from the last 30 days.</p>
            <div className="mt-5 space-y-3">
              {topSkills.length === 0 && <p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-500">Tracking starts after migration 003 is installed and visitors open skill pages.</p>}
              {topSkills.map(([slug, count], index) => {
                const skill = skillBySlug.get(slug);
                return (
                  <div key={slug} className="rounded-xl border border-slate-100 p-3">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex min-w-0 items-center gap-3">
                        <span className="w-5 text-sm font-bold text-slate-400">{index + 1}</span>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-slate-900">{skill?.name || slug}</p>
                          <p className="text-xs text-slate-500">{weeklySkillCounts.get(slug) || 0} views / 7d · {count} views / 30d</p>
                        </div>
                      </div>
                      <Link href={`/skills/${slug}`} className="text-xs font-semibold text-blue-600">Open</Link>
                    </div>
                    <div className="mt-3 flex gap-2 pl-8">
                      <form action={featureSkill}>
                        <input type="hidden" name="skillSlug" value={slug} />
                        <input type="hidden" name="featureType" value="week" />
                        <button className="rounded-lg bg-blue-50 px-2.5 py-1.5 text-xs font-semibold text-blue-700 hover:bg-blue-100">Feature this week</button>
                      </form>
                      <form action={featureSkill}>
                        <input type="hidden" name="skillSlug" value={slug} />
                        <input type="hidden" name="featureType" value="month" />
                        <button className="rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200">Feature this month</button>
                      </form>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="marketing" className="grid gap-6 xl:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2 text-emerald-600"><Megaphone className="h-5 w-5" /><span className="text-sm font-semibold uppercase tracking-[0.16em]">Sales & marketing</span></div>
            <h2 className="mt-2 text-2xl font-bold text-slate-900">Recent email subscribers</h2>
            <p className="mt-2 text-sm text-slate-600">Newsletter forms across the site feed this list directly. The homepage message below is live site content.</p>
            <form action={updateMarketingSettings} className="mt-5 rounded-2xl bg-slate-50 p-4">
              <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500">Homepage email headline
                <input name="newsletterHeadline" required maxLength={100} defaultValue={marketing.newsletterHeadline || 'One useful skill every week'} className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-normal normal-case tracking-normal" />
              </label>
              <label className="mt-3 block text-xs font-semibold uppercase tracking-wide text-slate-500">Description
                <textarea name="newsletterDescription" required maxLength={240} rows={2} defaultValue={marketing.newsletterDescription || 'Get practical skills, career ideas, and modern-work insights worth keeping.'} className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-normal normal-case tracking-normal" />
              </label>
              <button className="mt-3 rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white hover:bg-emerald-700">Update homepage message</button>
            </form>
            <h3 className="mt-6 text-sm font-semibold text-slate-900">Subscriber activity</h3>
            <div className="mt-2 divide-y divide-slate-100">
              {subscribers.length === 0 && <p className="py-4 text-sm text-slate-500">No subscribers recorded yet.</p>}
              {subscribers.map((subscriber) => (
                <div key={subscriber.id} className="flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between">
                  <div><p className="text-sm font-semibold text-slate-900">{subscriber.email}</p><p className="text-xs text-slate-500">{subscriber.source} · {new Date(subscriber.created_at).toLocaleDateString()}</p></div>
                  <form action={updateSubscriberStatus} className="flex items-center gap-2"><input type="hidden" name="id" value={subscriber.id} /><select name="status" defaultValue={subscriber.status} className="rounded-lg border border-slate-200 px-2 py-1 text-xs"><option value="subscribed">Subscribed</option><option value="unsubscribed">Unsubscribed</option></select><button className="text-xs font-semibold text-blue-600">Save</button></form>
                </div>
              ))}
            </div>
          </div>

          <div id="users" className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2 text-violet-600"><Users className="h-5 w-5" /><span className="text-sm font-semibold uppercase tracking-[0.16em]">Users</span></div>
            <h2 className="mt-2 text-2xl font-bold text-slate-900">Newest accounts</h2>
            <p className="mt-2 text-sm text-slate-600">Account records come from the existing Supabase profile system. {privileged ? 'Role controls are enabled.' : 'Add SUPABASE_SERVICE_ROLE_KEY to Vercel to enable role changes from this screen.'}</p>
            <div className="mt-5 divide-y divide-slate-100">
              {users.map((profile) => (
                <div key={profile.id} className="flex items-center justify-between gap-4 py-3">
                  <div className="min-w-0"><p className="truncate text-sm font-semibold text-slate-900">{profile.name || profile.email}</p><p className="truncate text-xs text-slate-500">{profile.email} · joined {new Date(profile.created_at).toLocaleDateString()}</p></div>
                  <div className="shrink-0 text-right text-xs text-slate-500">
                    <div>{profile.saved_skills?.length || 0} saved skills</div>
                    {profile.is_admin && <div className="font-semibold text-violet-600">Admin</div>}
                    {privileged && profile.id !== user.id && (
                      <form action={setAdminRole} className="mt-1">
                        <input type="hidden" name="userId" value={profile.id} />
                        <input type="hidden" name="isAdmin" value={profile.is_admin ? 'false' : 'true'} />
                        <button className="font-semibold text-blue-600 hover:text-blue-700">{profile.is_admin ? 'Remove admin' : 'Make admin'}</button>
                      </form>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="ads" className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2 text-amber-600"><WalletCards className="h-5 w-5" /><span className="text-sm font-semibold uppercase tracking-[0.16em]">Advertising</span></div>
          <h2 className="mt-2 text-2xl font-bold text-slate-900">Ad placement controls</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">Keep ad inventory intentional. A placement only renders when it is enabled here, has a slot ID, and <code>NEXT_PUBLIC_ADSENSE_CLIENT_ID</code> is configured in Vercel.</p>
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {adPlacements.map((placement) => (
              <form key={placement.id} action={updateAdPlacement} className="rounded-2xl border border-slate-200 p-4">
                <input type="hidden" name="id" value={placement.id} />
                <div className="flex items-start justify-between gap-4"><div><h3 className="font-semibold text-slate-900">{placement.label}</h3><p className="mt-1 text-xs leading-5 text-slate-500">{placement.description}</p><code className="mt-2 inline-block text-xs text-slate-400">{placement.placement_key}</code></div><label className="flex shrink-0 items-center gap-2 text-sm font-medium text-slate-700"><input type="checkbox" name="enabled" defaultChecked={placement.enabled} className="h-4 w-4" /> Enabled</label></div>
                <label className="mt-4 block text-xs font-semibold uppercase tracking-wide text-slate-500">AdSense slot ID<input name="slotId" defaultValue={placement.slot_id || ''} placeholder="e.g. 1234567890" className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm font-normal normal-case tracking-normal" /></label>
                <button className="mt-3 rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white">Save placement</button>
              </form>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
