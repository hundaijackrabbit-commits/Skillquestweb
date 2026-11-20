import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';

const EventSchema = z.object({
  eventType: z.enum(['page_view', 'skill_view', 'career_view', 'blog_view', 'cta_click']),
  itemType: z.enum(['skill', 'career', 'blog', 'page']).optional(),
  itemSlug: z.string().max(160).optional(),
  path: z.string().max(500).optional(),
  referrer: z.string().max(1000).optional(),
  sessionId: z.string().max(100).optional(),
});

export async function POST(request: Request) {
  try {
    const parsed = EventSchema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({ ok: false }, { status: 400 });

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    const event = {
      event_type: parsed.data.eventType,
      item_type: parsed.data.itemType || null,
      item_slug: parsed.data.itemSlug || null,
      path: parsed.data.path || null,
      referrer: parsed.data.referrer || null,
      session_id: parsed.data.sessionId || null,
      user_id: user?.id || null,
    };
    // Vercel provides only a coarse country code. Never store an IP address,
    // city, or browser-provided location in the community activity feature.
    const countryHeader = request.headers.get('x-vercel-ip-country')?.toUpperCase() ?? '';
    const countryCode = /^[A-Z]{2}$/.test(countryHeader) ? countryHeader : null;
    let { error } = await supabase.from('content_events').insert(
      countryCode && parsed.data.eventType === 'skill_view'
        ? { ...event, country_code: countryCode }
        : event,
    );

    // Backward-compatible if deployed before the optional Supabase migration.
    // Page-view tracking must continue to work regardless of the new feature.
    if (error && countryCode && (error.code === 'PGRST204' || error.code === '42703')) {
      ({ error } = await supabase.from('content_events').insert(event));
    }

    if (error) return NextResponse.json({ ok: false }, { status: 503 });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
