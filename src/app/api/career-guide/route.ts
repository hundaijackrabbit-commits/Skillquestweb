import { createHash } from 'node:crypto';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { CareerGuideEmail, careerGuideEmailText } from '@/emails/career-guide-email';
import { createPrivilegedClient } from '@/lib/admin';
import { getCareerGuideDownloadUrl } from '@/lib/career-guide';
import { getResendClient } from '@/lib/resend';
import { createClient } from '@/lib/supabase/server';

export const runtime = 'nodejs';

const CareerGuideRequestSchema = z.object({
  name: z.string().trim().max(100).optional(),
  email: z.string().trim().email().max(254),
  source: z.string().trim().max(80).optional(),
  marketingConsent: z.boolean().optional().default(false),
  company: z.string().max(200).optional(),
});

type DeliveryStatus = 'sent' | 'failed';

function firstNameFrom(name?: string) {
  return name?.split(/\s+/).find(Boolean)?.slice(0, 60);
}

function idempotencyKey(email: string) {
  const day = new Date().toISOString().slice(0, 10);
  const digest = createHash('sha256').update(`${email}:${day}:link-only-v2`).digest('hex').slice(0, 32);
  return `career-guide-v2-${digest}`;
}

async function createDeliveryRecord(input: z.infer<typeof CareerGuideRequestSchema>) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) return null;

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.rpc('request_career_guide', {
      p_email: input.email,
      p_name: input.name || null,
      p_source: input.source || 'career-guide-page',
      p_marketing_consent: input.marketingConsent,
    });

    if (error) {
      console.warn('Career guide request tracking is unavailable:', error.message);
    }

    if (input.marketingConsent) {
      const { error: newsletterError } = await supabase.rpc('subscribe_newsletter', {
        p_email: input.email,
        p_source: `${input.source || 'career-guide-page'}-guide-opt-in`,
      });
      if (newsletterError) console.warn('Guide newsletter opt-in failed:', newsletterError.message);
    }

    return typeof data === 'string' ? data : null;
  } catch (error) {
    console.warn('Career guide request tracking failed:', error);
    return null;
  }
}

async function recordDeliveryResult(id: string | null, status: DeliveryStatus, resendEmailId?: string, errorMessage?: string) {
  if (!id) return;
  const admin = createPrivilegedClient();
  if (!admin) return;

  const { error } = await admin
    .from('career_guide_deliveries')
    .update({
      status,
      resend_email_id: resendEmailId || null,
      error_message: errorMessage?.slice(0, 500) || null,
      sent_at: status === 'sent' ? new Date().toISOString() : null,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id);

  if (error) console.warn('Career guide delivery status update failed:', error.message);
}

export async function POST(request: Request) {
  try {
    const parsed = CareerGuideRequestSchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json({ ok: false, message: 'Enter a valid email address.' }, { status: 400 });
    }

    if (parsed.data.company) {
      return NextResponse.json({ ok: true, message: 'Check your inbox for the guide.' });
    }

    const input = { ...parsed.data, email: parsed.data.email.toLowerCase() };
    const deliveryId = await createDeliveryRecord(input);
    const resend = getResendClient();

    if (!resend) {
      await recordDeliveryResult(deliveryId, 'failed', undefined, 'Email provider is not configured.');
      return NextResponse.json(
        { ok: false, message: 'Email delivery is being configured. Please try again shortly.' },
        { status: 503 },
      );
    }

    const downloadUrl = getCareerGuideDownloadUrl();
    const { data, error } = await resend.emails.send(
      {
        from: process.env.RESEND_FROM_EMAIL || 'Modern Skill Lab <guide@mail.modernskilllab.space>',
        to: input.email,
        replyTo: process.env.RESEND_REPLY_TO_EMAIL || undefined,
        subject: 'Your requested Modern Skill Lab guide',
        react: CareerGuideEmail({ firstName: firstNameFrom(input.name), downloadUrl }),
        text: careerGuideEmailText({ firstName: firstNameFrom(input.name), downloadUrl }),
        tags: [
          { name: 'resource', value: 'career-life-map' },
          { name: 'source', value: (input.source || 'career-guide-page').replace(/[^a-zA-Z0-9_-]/g, '-').slice(0, 80) },
        ],
      },
      { idempotencyKey: idempotencyKey(input.email) },
    );

    if (error) {
      console.error('Career guide email failed:', error.message);
      await recordDeliveryResult(deliveryId, 'failed', undefined, error.message);
      return NextResponse.json(
        { ok: false, message: 'We could not send the guide right now. Please try again shortly.' },
        { status: 502 },
      );
    }

    await recordDeliveryResult(deliveryId, 'sent', data?.id);
    return NextResponse.json({ ok: true, message: 'Your guide is on its way. Check your inbox.' });
  } catch (error) {
    console.error('Career guide delivery error:', error);
    return NextResponse.json(
      { ok: false, message: 'We could not send the guide right now. Please try again shortly.' },
      { status: 500 },
    );
  }
}
