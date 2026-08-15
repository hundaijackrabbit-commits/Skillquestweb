# Account Gamification Build — 2026-08-15

## Outcome

This build keeps public skill guides available to readers and search engines while requiring a Modern Skill Lab account to use interactive practice and earn rewards.

## Account access

- Added a reusable inline account gate for knowledge checks, skill missions, Skill Sprints, sequence builders, categorization challenges, XP, streaks, and achievements.
- Added create-account and sign-in links that return the learner to the page they came from.
- Sanitized return paths so authentication redirects can only target safe, local routes.
- Extended Supabase session refresh coverage to `/learn` and skill-course routes.
- Kept the public educational guide outside the gate. The gate is an inline section rather than a page-obscuring interstitial.

## Progress and rewards

- Namespaced browser progress by Supabase user ID so two people using the same browser do not share XP or completions.
- Added sequence-practice and sort-practice activity types.
- Added a Pattern Builder achievement for completing four interactive practices.
- Preserved one-time XP awards, retry without penalty, streaks, levels, missions, course lessons, and knowledge-check rewards.
- Kept profiles private and omitted a public leaderboard.

Progress is currently private to the signed-in account **on the current browser**. Cross-device synchronization should be implemented in a later phase with a Supabase progress table and row-level security.

## New interactive practices

### Sequence builders

- Problem Solving
- Information Literacy
- Research Skills
- Public Speaking
- Stakeholder Management
- Risk Assessment

### Categorization challenges

- Emotional Intelligence
- Digital Literacy
- Creative Thinking
- Analytical Thinking
- Cross-Functional Collaboration
- Media Literacy

Every skill guide still includes a real-world skill mission. Existing knowledge checks and the six Skill Sprints remain available behind the account gate.

## Where to test

- `/learn` — signed-out Practice Lab gate and signed-in activity library
- `/skills/problem-solving#interactive-practice` — sequence builder
- `/skills/emotional-intelligence#interactive-practice` — categorization challenge
- `/skills/ai-literacy#knowledge-check` — knowledge check
- `/skills/communication#skill-mission` — real-world mission and reflection
- `/skills/communication/learn` — multi-lesson Skill Sprint
- `/auth?mode=signup&redirect=%2Flearn` — account creation and return flow

## Verification

- Next.js 16.2.3 production build: passed (936 routes)
- Focused ESLint pass for all changed files: passed
- Strict indexable-content originality audit: passed
- Repeated 16-word phrases among public/indexable content: 0
- Strict content-link audit: no new unresolved references above the repository baseline
- Local production smoke tests: `/learn`, the selected skill pages, and a Skill Sprint returned HTTP 200
- The local `/auth` smoke test requires the Supabase values documented in `.env.example`; the production build and TypeScript checks passed without embedding credentials

## Research-informed constraints

- Supabase recommends `@supabase/ssr` for cookie-based Next.js authentication and server-side token validation for protected data.
- Google advises against page-obscuring interstitials and cannot index password-protected content, so the public guide remains crawlable while interactive controls are gated inline.
- Current gamification research supports challenges, progress, levels, badges, and prompt feedback, while also warning that outcomes depend on context and that overreliance on points or competition can be counterproductive.

References:

- https://supabase.com/docs/guides/auth/choosing-a-server-package
- https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs
- https://developers.google.com/search/docs/appearance/avoid-intrusive-interstitials
- https://developers.google.com/search/docs/crawling-indexing/control-what-you-share
- https://journals.sagepub.com/doi/10.1177/21582440261421375
- https://arxiv.org/abs/2305.08346
