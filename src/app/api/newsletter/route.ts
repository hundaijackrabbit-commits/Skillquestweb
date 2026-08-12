import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';

const SubscribeSchema = z.object({
  email: z.string().trim().email().max(254),
  source: z.string().trim().max(80).optional(),
  company: z.string().max(200).optional(),
});

export async function POST(request: Request) {
  try {
    const body = SubscribeSchema.safeParse(await request.json());
    if (!body.success) {
      return NextResponse.json({ ok: false, message: 'Enter a valid email address.' }, { status: 400 });
    }

    // Honeypot field. Real visitors never fill this.
    if (body.data.company) {
      return NextResponse.json({ ok: true, message: 'You’re on the list.' });
    }

    const supabase = await createClient();
    const email = body.data.email.toLowerCase();
    const { error } = await supabase.rpc('subscribe_newsletter', {
      p_email: email,
      p_source: body.data.source || 'website',
    });

    if (error) {
      console.error('Newsletter signup failed:', error.message);
      return NextResponse.json(
        { ok: false, message: 'Signup is temporarily unavailable. Please try again shortly.' },
        { status: 503 }
      );
    }

    return NextResponse.json({ ok: true, message: 'You’re on the list.' });
  } catch (error) {
    console.error('Newsletter signup error:', error);
    return NextResponse.json(
      { ok: false, message: 'Signup is temporarily unavailable. Please try again shortly.' },
      { status: 500 }
    );
  }
}
