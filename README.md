# Modern Skill Lab

Modern Skill Lab is a Next.js skills and career discovery platform built around a large structured content library, member accounts, and a Supabase-backed growth/admin layer.

**Canonical production domain:** `https://modernskilllab.space`

## Current content library

- 1,541 source skill records and 1,340 canonical skill topics (`src/data/skills-1000plus.json`)
- 103 career profiles
- 8 industry guides
- 100 learning paths
- 20 MDX articles

The source totals are not the same as the public discovery totals. Editorial and originality gates currently make 794 canonical skill pages, 21 career profiles, and 26 learning paths eligible for indexing. Other records remain available for revision with `noindex,follow`.

The active skill loader is `src/data/skills-1000plus.json`. Do not replace it with the smaller legacy `skills.json` file.

## Stack

- Next.js 16.2 / React 19 / TypeScript
- Tailwind CSS 4
- Supabase Auth + Postgres / Row Level Security
- Vercel Analytics + Speed Insights
- Zod validation
- Server-rendered skill search and pagination
- MDX blog content

## Product features

### Public site

- Paginated skills repository with server-side search
- 16 topic hubs connecting skills, paths, careers, industries, and practice
- Career, industry, learning-path, and blog content
- Member accounts and saved skills
- Real newsletter signup
- Admin-selected Skill of the Week / Month / Editor's Picks
- Automatically calculated trending skills based on first-party skill-view events
- Controlled AdSense placement hooks (disabled until configured)

### Growth Console (`/admin`)

- Secure admin-only access
- Account and newsletter subscriber totals
- Recent account/subscriber activity
- Most-viewed skills for 7-day and 30-day windows
- Homepage featured-skill controls tied directly to real skill slugs
- Homepage newsletter-message controls
- Subscriber status management
- Optional admin-role controls when a service-role key is configured server-side
- Ad-placement enable/disable and slot-ID controls

## SEO / canonical setup

The owned apex domain is the canonical site. `next.config.ts` permanently redirects requests from `skillquestweb.vercel.app` and `www.modernskilllab.space` to the same path and query on `modernskilllab.space` before route rendering. `src/proxy.ts` is reserved for authentication refreshes.

The project includes:

- `metadataBase` and canonical metadata
- `robots.ts`
- `sitemap.ts`
- Organization + WebSite structured data
- Article / BlogPosting structured data on content detail pages
- `noindex` metadata for member/admin areas

After deployment, submit:

`https://modernskilllab.space/sitemap.xml`

to Google Search Console and inspect/request indexing for the custom-domain homepage.

## Local setup

```bash
npm ci
npm run dev
```

Production check:

```bash
npm run audit:originality
npm run audit:seo
npm run audit:links
npx tsc --noEmit
npm run build
```

See [`PATCH_NOTES_2026-08-15_ARCHITECTURE.md`](./PATCH_NOTES_2026-08-15_ARCHITECTURE.md) for the architecture changes, editorial-gate counts, and deployment checklist.

## Supabase setup

On a new Supabase project, run the migrations in order:

1. `supabase/migrations/001_initial_schema.sql`
2. `supabase/migrations/003_growth_admin.sql`

If `public.profiles` already exists from an older deployment, `001_initial_schema.sql` is idempotent and can be rerun safely before 003.

Then create/sign in to your account and promote only that profile once in the Supabase SQL editor:

```sql
UPDATE public.profiles
SET is_admin = TRUE
WHERE email = 'YOUR_EMAIL_HERE';
```

### Required Vercel variables for accounts/admin/newsletter

```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

### Optional privileged admin control

Only needed to grant/remove admin roles from inside the Growth Console:

```env
SUPABASE_SERVICE_ROLE_KEY=...
```

Never expose the service-role key with a `NEXT_PUBLIC_` prefix.

### Optional AdSense

Advertising remains off unless all three conditions are true: an ad placement is enabled in `/admin`, that placement has an AdSense slot ID, and this variable is configured:

```env
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-...
```

Do not publish an `ads.txt` seller line until Google provides the real publisher details.

## Important deployment notes

See [`PATCH_NOTES_2026-08-12.md`](./PATCH_NOTES_2026-08-12.md) for the exact migration/deployment order and a summary of the patch.
