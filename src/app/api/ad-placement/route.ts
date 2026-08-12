import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

const allowedKeys = new Set(['homepage-inline', 'skill-inline', 'career-inline', 'blog-inline']);

export async function GET(request: Request) {
  const url = new URL(request.url);
  const key = url.searchParams.get('key') || '';
  if (!allowedKeys.has(key)) return NextResponse.json({ enabled: false }, { status: 400 });

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('ad_placements')
      .select('enabled, slot_id')
      .eq('placement_key', key)
      .maybeSingle();

    if (error || !data) return NextResponse.json({ enabled: false });
    return NextResponse.json({ enabled: Boolean(data.enabled && data.slot_id), slotId: data.slot_id });
  } catch {
    return NextResponse.json({ enabled: false });
  }
}
