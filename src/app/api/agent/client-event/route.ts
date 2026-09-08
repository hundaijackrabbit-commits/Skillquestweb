import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

function sanitizeString(value: unknown, max = 80) {
  return typeof value === 'string' ? value.slice(0, max) : undefined;
}

function sanitizeKeyList(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item): item is string => typeof item === 'string')
    .slice(0, 24)
    .map((item) => item.slice(0, 64));
}

export async function POST(request: NextRequest) {
  const fetchSite = request.headers.get('sec-fetch-site');
  if (fetchSite && !['same-origin', 'same-site', 'none'].includes(fetchSite)) {
    return NextResponse.json({ ok: false }, { status: 403 });
  }

  const body = await request.json().catch(() => ({}));
  const nested = Array.isArray(body.nestedKeySets)
    ? body.nestedKeySets.slice(0, 8).map(sanitizeKeyList)
    : [];

  console.info('Cartesia client event shape', {
    eventType: sanitizeString(body.eventType),
    topLevelKeys: sanitizeKeyList(body.topLevelKeys),
    nestedKeySets: nested,
    matchedNavigation: body.matchedNavigation === true,
  });

  return NextResponse.json({ ok: true });
}
