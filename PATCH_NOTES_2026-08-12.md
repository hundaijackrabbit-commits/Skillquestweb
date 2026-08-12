# Modern Skill Lab — Growth / Admin / SEO Patch

## Supabase migration order

For a fresh or partially configured Supabase project, run these files by opening each `.sql` file and pasting its **contents** into Supabase SQL Editor:

1. `supabase/migrations/001_initial_schema.sql`
2. `supabase/migrations/003_growth_admin.sql`

Do **not** paste a filesystem path such as `supabase/migrations/003_growth_admin.sql` into SQL Editor.

The refreshed 001 migration is idempotent, backfills profiles for existing `auth.users`, and omits the obsolete `app.jwt_secret` database setting.

This patch keeps the existing static content library intact and adds the operating layer needed to manage growth without rebuilding the site.

## What changed

- Canonical site identity is `https://modernskilllab.space`.
- Requests to `skillquestweb.vercel.app` are permanently redirected to the same path/query on the custom domain through the Next.js 16 `proxy.ts` convention.
- Added canonical metadata, sitemap, robots directives, cleaner titles/descriptions, Organization/WebSite and article structured data, and `noindex` on account/admin areas.
- Added a real newsletter signup endpoint and reusable signup form.
- Added first-party content events for skill, career, and blog views.
- Added `/admin/login` and a protected `/admin` Growth Console.
- Admin can see account/subscriber totals, recent users, recent subscribers, top viewed skills, and active homepage features.
- Admin can select Skill of the Week, Skill of the Month, or Editor's Picks from the live skill library.
- Homepage shows admin-selected featured skills separately from automatically calculated trending skills.
- Admin can edit the homepage newsletter headline/description.
- Added controlled ad placements. Nothing renders until a placement is enabled, a slot ID is entered, and `NEXT_PUBLIC_ADSENSE_CLIENT_ID` is configured.
- Added a privacy disclosure page for account, newsletter, analytics, and future advertising data.
- Added the `saved_skills` relation expected by the existing save button/dashboard, with a compatibility trigger for the older profile-array model.
- Removed several unsupported marketing claims and dead search/CTA controls from public pages.

## Important: deploy in this order

1. **Keep a backup / deploy on a branch first.**
2. In Supabase, run `supabase/migrations/003_growth_admin.sql` in the SQL editor.
3. Create or sign in to your own member account so a row exists in `public.profiles`.
4. In the Supabase SQL editor, make only your account an admin:

   ```sql
   UPDATE public.profiles
   SET is_admin = TRUE
   WHERE email = 'YOUR_EMAIL_HERE';
   ```

5. Confirm your existing Vercel environment variables are present:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
6. Optional, but required if you want to grant/remove admin roles from inside the Growth Console:
   - `SUPABASE_SERVICE_ROLE_KEY`
   - Never prefix the service-role key with `NEXT_PUBLIC_`.
7. Optional advertising variable (only after an AdSense account/site is ready):
   - `NEXT_PUBLIC_ADSENSE_CLIENT_ID` (for example `ca-pub-...`)
8. Deploy to Vercel.
9. Sign in at `/admin/login` and verify `/admin`.
10. In Google Search Console, submit `https://modernskilllab.space/sitemap.xml`, inspect the custom-domain homepage, and request indexing after the redirect/canonical deployment is live.

## AdSense note

Do not create a real `ads.txt` entry until Google gives you the publisher ID / seller line. The admin placements are intentionally disabled by default.

## Data safety

The active content loader still reads `src/data/skills-1000plus.json`. This patch does not replace or migrate the static skill/career/industry content library. Homepage/admin feature records point to the existing skill slugs instead.

## Verification performed in this patch workspace

- TypeScript/TSX syntax transpilation sweep across source files.
- JSON integrity/count checks on the existing content library.
- Search for stale public `SkillQuest` branding and unsupported blanket “evidence-backed” claims.

A full `next build` should still be run in your normal development/Vercel environment before production promotion. The patch workspace could not restore npm dependencies from the network, so a complete framework/type dependency build was not available here.
