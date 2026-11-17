# Communication Skills growth pilot — 2026-11-16

Tracking: GitHub issue #66

## Why this batch exists
The canonical communication skill was serving generic older text. A researched editorial override already existed under an unused professional-communication key. This patch routes that entry to the canonical communication page without a competing URL or a duplicate skill entry. Older unverified figures no longer drive the page.

## Changes
1. Attach researched copy to the existing canonical communication URL through a narrow loader fallback.
2. Add a search-focused title, description, and consistent article headline.
3. Add an original practical field guide with one before/after scenario and a five-minute exercise. Preserve the existing research, learning sections, skill sprint, Knowledge Vault and progress.
4. Add a message-clarity practice in the existing interactive practice system with 35 XP, using the existing authentication and progress logic.
5. Add three contextual entry links to the existing Communication topic page.
6. Clarify the homepage brand promise while retaining the video, quiz, newsletter, navigation and other tools.

## QA gates before merge
- Validate canonical skill content, links and existing page features at desktop and 360/390/430px widths.
- Check practice access for signed-out users and correct XP recording for signed-in users.
- Run lint, build, and existing SEO, links, graph, originality and controls audits.
- Review one Vercel preview, metadata, canonical URLs and mobile appearance.
- Compare Search Console and conversions after release; do not infer gains before measurement.

Scope excludes new slugs, new database tables, content deletion, glossary duplication, and mass-generated lesson pages.
