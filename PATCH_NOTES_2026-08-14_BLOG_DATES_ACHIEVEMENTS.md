# Blog Dates and Achievement Layer — 2026-08-14

## Blog freshness and transparency

- Made the substantial 2026 update date the primary visible date on refreshed article pages.
- Kept the original publication date and labeled it clearly instead of overwriting article history.
- Kept `datePublished` and `dateModified` distinct in Open Graph and `BlogPosting` structured data.
- Sorted the blog index by `lastUpdated`, with original publication date as the tie-breaker.
- Added consistent, timezone-safe long-date formatting.
- Added “Practice included” and “Knowledge check included” signals to blog cards.

This follows Google Search guidance: visibly show publication or modification dates, supply matching structured data, and avoid changing dates merely to make unchanged content appear fresh.

- https://developers.google.com/search/docs/appearance/publication-dates
- https://developers.google.com/search/docs/appearance/structured-data/article
- https://developers.google.com/search/docs/fundamentals/creating-helpful-content

## New gamification layer

- Added five private XP levels: Starter, Explorer, Builder, Practitioner, and Pathfinder.
- Added a progress bar showing XP remaining to the next level.
- Added six private achievements:
  - First Rep
  - Skill Explorer
  - Knowledge Builder
  - Sprint Finisher
  - Evidence Maker
  - Practice Rhythm
- Added a Practice Lab map with direct links to scenario checks, Skill Sprints, skill missions, and connection checks.
- Renamed the main navigation link from “Practice” to “Practice Lab”.
- Added stable anchors to knowledge checks and skill missions so the Practice Lab links land on the activity.
- Kept progress private and browser-local; there is no public leaderboard or competitive ranking.

## Where to see it

- `/learn` — daily challenge, XP summary, levels, achievements, activity map, and Skill Sprints.
- `/skills/ai-literacy#knowledge-check` — curated scenario check.
- `/skills/communication/learn` — complete Skill Sprint.
- `/skills/communication#skill-mission` — three real-world mission difficulties.
- `/blog/ai-skills-2024-guide` — refreshed date presentation and article knowledge check.
- `/careers/data-analyst#knowledge-check` — skill-connection check.

## Verification

- Targeted ESLint: passed.
- Next.js production build and TypeScript: passed.
- Static generation: 936 pages.
- Representative Practice Lab, blog, skill, and career routes: HTTP 200.
- Rendered HTML contains the August 14, 2026 update date and labeled original publication date.
- Strict originality audit: passed.
- Strict link audit: zero new unresolved references above the accepted legacy baseline.
