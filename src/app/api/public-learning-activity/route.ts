import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';
const headers = { 'Cache-Control': 'public, max-age=0, s-maxage=180, stale-while-revalidate=180' };
const empty = () => NextResponse.json({ available: false, sessions: 0, minutes: 1440, countries: [] }, { headers });
export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const kind = params.get('kind') ?? '';
  const slug = params.get('slug') ?? '';
  if (!(kind === 'home' && slug === 'home') && !(['skill','career','blog'].includes(kind) && /^[a-z0-9][a-z0-9-]{0,158}$/.test(slug))) return NextResponse.json({ error: 'Invalid scope' }, { status: 400 });
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.rpc('get_public_learning_activity', { p_kind: kind, p_slug: slug });
    if (error || !data || typeof data !== 'object' || Array.isArray(data)) return empty();
    const sessions = typeof data.sessions === 'number' && Number.isFinite(data.sessions) ? Math.floor(data.sessions) : 0;
    if (sessions < 5) return empty();
    const countries = Array.isArray(data.countries) ? data.countries.filter((c: {code?: unknown; sessions?: unknown} | null) => c && typeof c.code === 'string' && /^[A-Z]{2}$/.test(c.code) && typeof c.sessions === 'number' && c.sessions >= 3).slice(0,4) : [];
    return NextResponse.json({ available: true, sessions, minutes: data.minutes === 30 ? 30 : 1440, countries }, { headers });
  } catch { return empty(); }
}
