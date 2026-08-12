'use server';

import { revalidatePath } from 'next/cache';
import { createPrivilegedClient, requireAdmin } from '@/lib/admin';

async function adminDb() {
  const { supabase } = await requireAdmin();
  return createPrivilegedClient() || supabase;
}

function assertMutation(error: { message?: string } | null, action: string) {
  if (error) throw new Error(`${action} failed: ${error.message || 'database error'}`);
}

export async function featureSkill(formData: FormData) {
  const db = await adminDb();
  const skillSlug = String(formData.get('skillSlug') || '').trim();
  const featureType = String(formData.get('featureType') || 'week');
  const headline = String(formData.get('headline') || '').trim().slice(0, 120);
  const durationDays = featureType === 'month' ? 31 : featureType === 'week' ? 8 : 90;
  if (!skillSlug || !['week', 'month', 'editor'].includes(featureType)) return;

  if (featureType === 'week' || featureType === 'month') {
    const { error } = await db.from('featured_skills').update({ active: false }).eq('feature_type', featureType).eq('active', true);
    assertMutation(error, 'Updating the existing feature');
  }

  const startsAt = new Date();
  const endsAt = new Date(startsAt.getTime() + durationDays * 24 * 60 * 60 * 1000);
  const { error } = await db.from('featured_skills').insert({
    skill_slug: skillSlug,
    feature_type: featureType,
    homepage_headline: headline || null,
    starts_at: startsAt.toISOString(),
    ends_at: endsAt.toISOString(),
    active: true,
  });
  assertMutation(error, 'Featuring the skill');

  revalidatePath('/');
  revalidatePath('/admin');
}

export async function deactivateFeature(formData: FormData) {
  const db = await adminDb();
  const id = String(formData.get('id') || '');
  if (!id) return;
  const { error } = await db.from('featured_skills').update({ active: false }).eq('id', id);
  assertMutation(error, 'Removing the homepage feature');
  revalidatePath('/');
  revalidatePath('/admin');
}

export async function updateAdPlacement(formData: FormData) {
  const db = await adminDb();
  const id = String(formData.get('id') || '');
  const slotId = String(formData.get('slotId') || '').trim().slice(0, 80);
  const enabled = formData.get('enabled') === 'on';
  if (!id) return;

  const { error } = await db.from('ad_placements').update({ enabled, slot_id: slotId || null }).eq('id', id);
  assertMutation(error, 'Updating the ad placement');
  revalidatePath('/');
  revalidatePath('/skills', 'layout');
  revalidatePath('/careers', 'layout');
  revalidatePath('/blog', 'layout');
  revalidatePath('/admin');
}

export async function updateSubscriberStatus(formData: FormData) {
  const db = await adminDb();
  const id = String(formData.get('id') || '');
  const status = String(formData.get('status') || 'subscribed');
  if (!id || !['subscribed', 'unsubscribed'].includes(status)) return;
  const { error } = await db.from('newsletter_subscribers').update({ status }).eq('id', id);
  assertMutation(error, 'Updating the subscriber');
  revalidatePath('/admin');
}

export async function setAdminRole(formData: FormData) {
  const context = await requireAdmin();
  const privileged = createPrivilegedClient();
  if (!privileged) return;

  const userId = String(formData.get('userId') || '');
  const isAdmin = String(formData.get('isAdmin') || '') === 'true';
  if (!userId || userId === context.user?.id) return;

  const { error } = await privileged.from('profiles').update({ is_admin: isAdmin }).eq('id', userId);
  assertMutation(error, 'Updating the admin role');
  revalidatePath('/admin');
}

export async function updateMarketingSettings(formData: FormData) {
  const db = await adminDb();
  const newsletterHeadline = String(formData.get('newsletterHeadline') || '').trim().slice(0, 100);
  const newsletterDescription = String(formData.get('newsletterDescription') || '').trim().slice(0, 240);
  if (!newsletterHeadline || !newsletterDescription) return;

  const { error } = await db.from('site_settings').upsert({
    key: 'marketing',
    value: { newsletterHeadline, newsletterDescription },
    is_public: true,
  });
  assertMutation(error, 'Updating the homepage marketing message');
  revalidatePath('/');
  revalidatePath('/admin');
}
