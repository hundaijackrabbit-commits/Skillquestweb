import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import AuthPageClient from './auth-page-client';

export const metadata: Metadata = {
  title: 'Member Sign In',
  description: 'Sign in or create a Modern Skill Lab account to save skills and use your dashboard.',
  robots: { index: false, follow: false },
};

export default async function AuthPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect('/dashboard');
  }

  return <AuthPageClient />;
}