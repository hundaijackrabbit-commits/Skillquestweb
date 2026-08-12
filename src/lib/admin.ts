import { createClient as createSupabaseAdminClient } from '@supabase/supabase-js';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

function envAdminEmails() {
  return (process.env.ADMIN_EMAILS || '')
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export async function getAdminContext() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { user: null, isAdmin: false, supabase };

  const { data: profile } = await supabase
    .from('profiles')
    .select('id, email, name, is_admin')
    .eq('id', user.id)
    .maybeSingle();

  const email = user.email?.toLowerCase() || '';
  const envAuthorized = envAdminEmails().includes(email) && Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY);
  const isAdmin = Boolean(profile?.is_admin) || envAuthorized;
  return { user, profile, isAdmin, supabase };
}

export async function requireAdmin() {
  const context = await getAdminContext();
  if (!context.user) redirect('/admin/login');
  if (!context.isAdmin) redirect('/dashboard?admin=denied');
  return context;
}

export function createPrivilegedClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) return null;

  return createSupabaseAdminClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
