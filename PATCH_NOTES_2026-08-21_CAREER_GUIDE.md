# Career & Life Map delivery patch — August 21, 2026

## Added

- `/free-career-guide` conversion page with a mobile-first layout and original product copy.
- The complete 60-page, fillable `ModernSkillLab_Career_and_Life_Map.pdf` plus a web-optimized cover preview.
- Branded Resend email delivery with the PDF attached and a backup download link.
- Automatic guide delivery after successful account creation without blocking account signup if email delivery is unavailable.
- Separate, optional newsletter consent on the guide form.
- Supabase migration 004 for request, sent, and failed delivery tracking.
- Guide delivery reporting in the Growth Console.
- Homepage, header, footer, Careers, Blog, Paths, sitemap, privacy, environment, and deployment integration.
- Download response headers that prevent the raw PDF from being indexed as a competing search result.

## Production activation

1. Run migrations 001–004 in order.
2. Verify `mail.modernskilllab.space` in Resend.
3. Add `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `NEXT_PUBLIC_SITE_URL`, and the existing Supabase variables in Vercel.
4. Redeploy and submit one guide request plus one new-account test.

