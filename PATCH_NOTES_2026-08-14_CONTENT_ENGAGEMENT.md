# Modern Skill Lab content and engagement build

Date: August 14, 2026

## Outcome

This build turns the content library into a more active learning system. It adds a first-party evidence layer to priority skill guides, republishes six fully rewritten articles, doubles the Practice Lab course catalogue, and connects practice activity through one browser-based XP and streak profile.

## Current-information layer

Thirteen priority skill guides now include a visible current signal, review date, practical action, and links to first-party evidence. Coverage includes AI literacy, analytical thinking, communication, data analysis, cybersecurity awareness, leadership, adaptability, project management, active listening, professional writing, resilience, systems thinking, and time management.

The source registry lives in `src/lib/skill-intelligence.ts`. A skill brief is displayed only when a curated entry exists; the application does not manufacture a generic “current” claim for every page.

Recommended maintenance cadence:

1. Review AI and workplace signals every quarter.
2. Review government security guidance every six months or after a material update.
3. Recheck labour-market reports when a new comparable edition is released.
4. Preserve the publication date, update `reviewedAt`, and record what materially changed.
5. Remove or qualify a claim when its original source no longer supports it.

## Editorial refresh

Six articles were rebuilt from a blank editorial structure and are now eligible for indexing:

- AI skills for accountable delegation
- Future-of-work skill portfolios
- Communication for high-volume work
- Decision-ready data skills
- Everyday cybersecurity awareness
- Leadership in human–agent teams

Each refreshed article has a 2026 review date, an editorial evidence note, direct source links beside current claims, useful internal skill links, and a source-and-scope section. Fourteen legacy drafts remain behind the originality/indexing gate until they receive the same level of review.

The old article controls were also corrected. “Like” and “Discuss” buttons with no real behaviour were replaced by working browser-local “Mark useful,” native/copy sharing, and “Practice next” navigation.

## Engagement and gamification

The system rewards evidence of learning rather than attention metrics:

- XP is awarded for completed practice missions and correct retrieval checks.
- Every qualified skill guide offers Starter, Builder, and Stretch missions.
- A short reflection is required before a mission can be completed; its text is not stored.
- Rewards are idempotent, so resetting a course cannot be used to farm XP.
- A daily practice rhythm and longest streak are recorded without punishing page visits.
- Progress is shared across courses and skill missions in one local profile.
- Connected-skill recommendations explain the relationship instead of presenting an unexplained list.

Progress is currently stored in the browser under `msl_learning_profile_v1`. A later authenticated phase can synchronize this record to Supabase while retaining a local fallback.

## Practice Lab expansion

The catalogue grew from three to six short courses. New Skill Sprints cover:

- decision-ready data analysis;
- everyday cybersecurity decisions;
- project scope, dependencies, and control loops.

Every sprint contains three concise concept rounds, a workplace application, immediate quiz feedback, and a first-completion XP reward.

## Quality verification

- Next.js production compilation and TypeScript validation: passed.
- Static generation: 936 pages generated.
- Changed-file ESLint check: passed.
- Indexable-content originality gate: passed.
- Repeated 16-word phrases across public content: zero.
- Unattributed Markdown blockquotes: zero.
- Newly introduced broken content references: zero.
- Runtime route checks: six representative routes returned HTTP 200.
- Sitemap includes all six refreshed articles and all six Skill Sprints.

The repository-wide ESLint command still reports pre-existing issues in legacy scripts, the About page, Admin, Dashboard, save-button, Supabase, and utility files. No new lint finding remains in the files changed by this build.

## Suggested next phase

1. Rewrite the next six quarantined articles, prioritizing project management, time management, career transition, negotiation, digital marketing, and financial literacy.
2. Add delayed retrieval prompts at 2, 7, and 21 days.
3. Synchronize learning progress for signed-in members.
4. Build a skill-map view that shows foundations, adjacent capabilities, and career bridges.
5. Add opt-in team challenges based on completed artifacts rather than leaderboards based on volume.
6. Measure mission starts, completions, reflection completion, course completion, and connected-skill continuation in the admin analytics view.
