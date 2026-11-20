import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

const cacheHeaders = {
  'Cache-Control': 'public, max-age=0, s-maxage=180, stale-while-revalidate=180',
};

export async function GET(request: Request) {
  const slug = new URL(request.url).searchParams.get('slug') ?? '';
  if (slug.length > 160 || !/^[a-z0-9][a-z0-9-]*$/.test(slug)) {
    return NextResponse.json({ error: 'Invalid skill slug' }, { status: 400 });
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.rpc('get_skill_learning_activity', { p_slug: slug });

    // The feature quietly disables itself if the optional database migration is
    // not yet applied, without interfering with skill-page content.
    if (error || !data || typeof data !== 'object' || Array.isArray(data)) {
      return NextResponse.json({ available: false, sessions: 0, countries: [] }, { headers: cacheHeaders });
    }

    const record = data as { sessions?: unknown; countries?: unknown };
    const sessions = typeof record.sessions === 'number' && Number.isFinite(record.sessions)
      ? Math.max(0, Math.floor(record.sessions))
      : 0;
    const countries = Array.isArray(record.countries)
      ? record.countries.filter((item): item is { code: string; sessions: number } =>
          !!item && typeof item === 'object' && /^[A-Z]{2}$/.test(item.code) &&
          typeof item.sessions === 'number' && item.sessions >= 3).slice(0, 4)
      : [];

    return NextResponse.json({ available: true, sessions, countries }, { headers: cacheHeaders });
  } catch {
    return NextResponse.json({ available: false, sessions: 0, countries: [] }, { headers: cacheHeaders });
  }
}
