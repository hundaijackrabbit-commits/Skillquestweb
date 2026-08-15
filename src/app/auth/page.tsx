import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import AuthPageClient from './auth-page-client';

export const metadata: Metadata = {
  title: 'Member Sign In',
  description: 'Sign in or create a Modern Skill Lab account to save skills and use your dashboard.',
  robots: { index: false, follow: false },
};

type Props = {
  searchParams: Promise<{ mode?: string | string[]; redirect?: string | string[] }>;
};

function safeRedirect(value: string | string[] | undefined) {
  const candidate = Array.isArray(value) ? value[0] : value;
  if (!candidate?.startsWith('/')) return '/dashboard';

  try {
    const base = new URL('https://modernskilllab.space');
    const parsed = new URL(candidate, base);
    return parsed.origin === base.origin
      ? `${parsed.pathname}${parsed.search}${parsed.hash}`
      : '/dashboard';
  } catch {
    return '/dashboard';
  }
}

export default async function AuthPage({ searchParams }: Props) {
  const query = await searchParams;
  const redirectTo = safeRedirect(query.redirect);
  const requestedMode = Array.isArray(query.mode) ? query.mode[0] : query.mode;
  const initialMode = requestedMode === 'signup' ? 'signup' : 'signin';
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect(redirectTo);
  }

  return <AuthPageClient initialMode={initialMode} redirectTo={redirectTo} />;
}
