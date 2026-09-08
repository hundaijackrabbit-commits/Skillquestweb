import { NextRequest, NextResponse } from 'next/server';

const ALLOWED_TOP_LEVEL = new Set([
  '/', '/about', '/blog', '/careers', '/community', '/dashboard',
  '/free-career-guide', '/industries', '/learn', '/paths', '/skills',
]);

const ALLOWED_PREFIXES = ['/blog/', '/careers/', '/industries/', '/learn/', '/paths/', '/skills/'];

function normalizePath(input: unknown) {
  if (typeof input !== 'string') return null;
  let value = input.trim();
  if (!value) return null;

  try {
    if (value.startsWith('http://') || value.startsWith('https://')) {
      const url = new URL(value);
      if (url.hostname !== 'modernskilllab.space' && url.hostname !== 'www.modernskilllab.space') return null;
      value = `${url.pathname}${url.search}${url.hash}`;
    }
  } catch {
    return null;
  }

  if (!value.startsWith('/')) value = `/${value}`;
  const pathOnly = value.split(/[?#]/)[0] || '/';
  const safe = ALLOWED_TOP_LEVEL.has(pathOnly) || ALLOWED_PREFIXES.some((prefix) => pathOnly.startsWith(prefix));
  return safe ? value : null;
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const path = normalizePath(body.path ?? body.url ?? body.destination);

  if (!path) {
    return NextResponse.json(
      { ok: false, error: 'Destination is not an approved Modern Skill Lab page.' },
      { status: 400 },
    );
  }

  const label = typeof body.label === 'string' && body.label.trim()
    ? body.label.trim().slice(0, 100)
    : 'that page';

  return NextResponse.json({
    ok: true,
    action: 'request_navigation_permission',
    path,
    label,
    message: `Ask the user for permission before navigating to ${label}.`,
  });
}
