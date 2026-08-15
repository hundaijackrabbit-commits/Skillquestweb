'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';
import { getAllIndustries } from '@/lib/content';

const assessmentSchema = z.object({
  name: z.string().trim().min(2).max(80),
  careerInterests: z
    .array(z.enum(['maker', 'investigator', 'creator', 'helper', 'persuader', 'organizer']))
    .min(1)
    .max(3),
  selectedIndustries: z.array(z.string().trim().min(1).max(80)).max(3),
  goal: z.enum(['explore', 'get-hired', 'switch', 'grow', 'lead', 'build-business']),
  workStyles: z
    .array(z.enum(['collaborative', 'independent', 'structured', 'fast-moving', 'remote-flexible', 'hands-on']))
    .min(1)
    .max(3),
  strengths: z
    .array(z.enum(['communicator', 'analyst', 'organizer', 'creator', 'technologist', 'leader']))
    .min(1)
    .max(3),
});

export type AssessmentActionInput = z.infer<typeof assessmentSchema>;

export type AssessmentActionResult = {
  ok: boolean;
  message: string;
};

export async function saveProfileAssessment(input: AssessmentActionInput): Promise<AssessmentActionResult> {
  const parsed = assessmentSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, message: 'Choose the required profile signals before building your fit map.' };
  }

  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { ok: false, message: 'Your session expired. Sign in again to update your profile.' };
  }

  const industries = await getAllIndustries();
  const validIndustrySlugs = new Set(industries.map((industry) => industry.slug));
  if (!parsed.data.selectedIndustries.every((slug) => validIndustrySlugs.has(slug))) {
    return { ok: false, message: 'One of the selected industries is not available.' };
  }

  const { data: currentProfile, error: profileError } = await supabase
    .from('profiles')
    .select('preferences')
    .eq('id', user.id)
    .maybeSingle();

  if (profileError) {
    return { ok: false, message: 'We could not load your profile preferences.' };
  }

  const currentPreferences =
    currentProfile?.preferences && typeof currentProfile.preferences === 'object' && !Array.isArray(currentProfile.preferences)
      ? currentProfile.preferences
      : {};

  const { error: updateError } = await supabase
    .from('profiles')
    .update({
      name: parsed.data.name,
      career_interests: parsed.data.careerInterests,
      selected_industries: parsed.data.selectedIndustries,
      preferences: {
        ...currentPreferences,
        profile_assessment: {
          version: 1,
          goal: parsed.data.goal,
          workStyles: parsed.data.workStyles,
          strengths: parsed.data.strengths,
          completedAt: new Date().toISOString(),
        },
      },
      updated_at: new Date().toISOString(),
    })
    .eq('id', user.id);

  if (updateError) {
    return { ok: false, message: 'Your fit map could not be saved. Please try again.' };
  }

  revalidatePath('/dashboard');
  return { ok: true, message: 'Your profile and fit map are updated.' };
}
