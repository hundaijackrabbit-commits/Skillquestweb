# Connected Learning Release — 2026-08-15

This release turns Modern Skill Lab from a collection of pages into a more connected learning system.

## What changed

- Added a Practice Lab at `/learn`.
- Added three interactive Skill Sprints:
  - `/skills/communication/learn`
  - `/skills/critical-thinking/learn`
  - `/skills/ai-literacy/learn`
- Added progress, retrieval checks, immediate feedback, and lightweight XP stored in the visitor's browser.
- Added 100 crawlable learning-path detail pages at `/paths/[slug]`.
- Connected skill guides to relevant careers, industries, learning paths, articles, related skills, and Skill Sprints.
- Connected career pages to industries, adjacent careers, articles, and learning paths.
- Connected blog articles to resolved skill, career, and industry titles instead of displaying raw slugs.
- Converted learning-path and industry buttons that did nothing into crawlable links.
- Added contextual blog relationship metadata for all 20 articles.
- Added permanent redirects from duplicate skill slugs to their canonical skill guide.
- Added all published learning paths and Skill Sprints to the sitemap.
- Added `npm run audit:links` to report unresolved references in the legacy datasets.

## Validation

- Targeted ESLint: passed with no errors or warnings.
- Production build: passed.
- Static routes generated: 1,796.

## Progress model

The pilot Skill Sprints deliberately use browser storage so visitors can begin without creating an account. The next phase can sync completions, XP, streaks, and earned badges to Supabase for signed-in members after the pilot format is validated.

## Recommended next data pass

The relationship audit identifies legacy career and learning-path references that do not yet map to a live entity. These references are omitted from link surfaces rather than generating broken links. Use `npm run audit:links` to prioritize the next cleanup pass.
