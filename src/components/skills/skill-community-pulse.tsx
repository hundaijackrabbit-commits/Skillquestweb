'use client';

import { useEffect, useState } from 'react';
import { Globe2, UsersRound } from 'lucide-react';
import { useLearningLanguage } from '@/components/providers/learning-language-provider';

type CountryActivity = { code: string; sessions: number };
type SkillActivity = { sessions: number; countries: CountryActivity[]; available: boolean };

export function SkillCommunityPulse({ slug }: { slug: string }) {
  const { locale } = useLearningLanguage();
  const zh = locale === 'zh-CN';
  const [activity, setActivity] = useState<SkillActivity | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        const response = await fetch(`/api/skill-activity?slug=${encodeURIComponent(slug)}`, {
          signal: controller.signal,
        });
        if (!response.ok) return;
        const data = (await response.json()) as SkillActivity;
        if (!controller.signal.aborted) setActivity(data);
      } catch {
        // Activity is an optional enhancement and never blocks the skill guide.
      }
    }

    void load();
    return () => controller.abort();
  }, [slug]);

  // Small samples and unavailable analytics are hidden rather than inflated.
  if (!activity?.available || !Number.isFinite(activity.sessions) || activity.sessions < 5) return null;

  const countries = activity.countries
    .filter(({ code, sessions }) => /^[A-Z]{2}$/.test(code) && sessions >= 3)
    .slice(0, 4);

  const displayNames = new Intl.DisplayNames([locale], { type: 'region' });

  return (
    <aside className="mb-10 rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50/80 to-violet-50/70 px-5 py-4 shadow-sm sm:px-6" aria-label={zh ? '全球学习动态' : 'Global learning activity'}>
      <div className="flex items-start gap-3">
        <span className="mt-0.5 rounded-xl bg-white p-2 text-blue-700 shadow-sm"><UsersRound className="h-5 w-5" aria-hidden="true" /></span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-slate-900">{zh ? '与世界各地的学习者一起探索' : 'You are learning alongside others'}</p>
          <p className="mt-1 text-sm leading-6 text-slate-700">
            {zh
              ? `过去 24 小时，约有 ${activity.sessions.toLocaleString(locale)} 个独立浏览会话访问了这项技能。`
              : `${activity.sessions.toLocaleString(locale)} distinct browsing sessions explored this skill in the past 24 hours.`}
          </p>
          {countries.length > 0 && (
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Globe2 className="h-4 w-4 text-blue-700" aria-hidden="true" />
              <span className="text-xs font-medium text-slate-600">{zh ? '近期访问来自' : 'Recent visitors from'}</span>
              {countries.map(({ code }) => (
                <span key={code} className="rounded-full border border-blue-100 bg-white px-2.5 py-1 text-xs font-medium text-slate-700">
                  {displayNames.of(code) ?? code}
                </span>
              ))}
            </div>
          )}
          <p className="mt-2 text-xs text-slate-500">{zh ? '这是匿名访问统计，不代表实时在线人数。' : 'Aggregated visits, not a live online-user count. No individual locations are shown.'}</p>
        </div>
      </div>
    </aside>
  );
}
