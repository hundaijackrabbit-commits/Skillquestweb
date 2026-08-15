# Profile, Access Gate, and Interaction Polish — 2026-08-15

## Account wall correction

- Replaced the plain member prompt with a full blurred practice preview and centered lock wall.
- Replaced the fixed-height absolute overlay with a content-sized grid overlay so the entire lock card remains visible at narrow mobile widths.
- Added phone-specific padding, heading sizes, line heights, break-safe titles, and full-width account buttons.
- The blurred preview is deliberately inert and contains no working quiz controls.
- Quiz, mission, sequence, sorting, and Skill Sprint components remain unmounted until the Supabase provider confirms an authenticated user.
- The loading state is locked too, preventing a brief interactive flash before authentication resolves.
- Authentication links now preserve the originating path and activity anchor.
- Public skill, career, industry, topic, path, and article content remains outside the interaction wall.

## Personal learning profile

The authenticated `/dashboard` route is now a main personal profile with:

- a five-step fit assessment;
- editable display name;
- saved-skill and saved-career favourites;
- an explainable industry, career, and skill fit map;
- private XP, streak, activity, level, and achievement views;
- direct navigation to the skills repository, careers, industries, paths, and Practice Lab;
- clear sign-out and profile-edit controls.

The assessment asks about:

1. broad work interests;
2. the member's current career goal;
3. preferred work styles;
4. recognized strengths;
5. optional industry curiosity.

Answers use existing `profiles` columns (`career_interests`, `selected_industries`, and `preferences`). No new database migration is required. The Server Action validates every field, verifies the authenticated user again, preserves unrelated preferences, and relies on existing profile row-level security.

## Recommendation behavior

- Recommendations are deterministic and explainable rather than presented as an opaque AI verdict.
- Industry matches use selected sectors, interest clusters, goals, and work-style signals.
- Career matches also use connected core/secondary skills, saved skills, work environments, demand metadata, and current goals.
- Skill matches use interest/category connections, strengths, selected industries, goal relevance, and top-career requirements.
- Each result states why it surfaced and uses qualitative fit signals instead of false-precision percentages.
- The dashboard explicitly describes the fit map as an exploration aid, not an aptitude or employment decision.

## Favourites

- Added a working Save Career control to every indexable career profile.
- Signed-out visitors are routed to account creation and returned to the career page.
- Saved careers and skills are displayed together in the member profile.

## Button and content polish

- Removed duplicate dead action panels from the career pathway.
- Replaced career and industry buttons that had no action with real routes.
- Removed the unsupported “Connect with Professionals” control.
- Corrected header and homepage sign-in/sign-up paths and return destinations.
- Renamed the authenticated header destination to “My Profile.”
- Replaced the repetitive, self-conscious Community page with four concise working actions.
- Removed a repeated industry call-to-action block.
- Deleted unused legacy dashboard and save-button components.
- Added `scripts/audit-interactive-controls.mjs` and `npm run audit:controls` to prevent future dead buttons or placeholder links.

## Privacy

- Updated `/privacy` to describe stored profile-assessment signals, recommendation use, saved careers, and browser-local practice progress.

## Verification

- Next.js 16.2.3 production build: passed (936 routes)
- TypeScript: passed
- Changed-file ESLint: passed
- Interactive-control audit: 58 TSX files checked, 0 dead or placeholder controls
- Public route smoke tests: 7 selected routes returned HTTP 200
- Lock markup confirmed on `/learn` and `/skills/ai-literacy`
- Strict content-link audit: no new unresolved references above the existing dataset baseline
- Strict indexable-content originality audit: passed with 0 repeated 16-word phrases

The repository-wide lint command still reports legacy errors in unchanged generation, search/filter, admin, and skill-card files. These do not block the production build; the files changed in this patch lint clean.

## Research references

- Supabase Next.js authentication: https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs
- Supabase row-level security: https://supabase.com/docs/guides/database/postgres/row-level-security
- O*NET Interest Profiler background: https://www.onetcenter.org/IP.html
- W3C link-purpose guidance: https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html
- Google interstitial guidance: https://developers.google.com/search/docs/appearance/avoid-intrusive-interstitials
