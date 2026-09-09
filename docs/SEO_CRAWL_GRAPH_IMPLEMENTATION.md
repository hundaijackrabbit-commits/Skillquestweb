# Semantic crawl graph implementation

This layer improves crawlability without mutating canonical skill records, slugs, loaders, or member/voice systems.

## Architecture

Topic hubs act as semantic bridge pages between the broad site taxonomy and individual guides. Each editorial-ready skill is reachable from its topic hub through a normal crawlable `<a href>` link. Deep skill lesson URLs are also exposed contextually from the same hub, while the existing skill detail page continues the graph into careers, industries, paths, articles, related skills, practice and lessons.

Primary graph:

`Topic -> Skill -> Lesson`

`Topic -> Path`

`Topic -> Career`

`Topic -> Industry`

`Topic -> Article`

Existing reciprocal graph:

`Skill -> Topic / Related Skill / Career / Industry / Path / Article / Lesson`

`Career -> Skill / Industry / Path / Article / Adjacent Career`

`Article -> Skill / Career / Industry / Related Article`

## Safety rules

- Do not rename or remove skill slugs.
- Do not mutate `skills-1000plus.json` for SEO linking.
- Only expose editorial-ready/indexable content through topic hub discovery helpers.
- Links must be relevant to the page context and visible to users.
- Keep the graph server-rendered with Next.js `Link` so crawlers receive normal anchor URLs.
- Build and audit before merge.

## Audit baseline

The relationship-data audit on 2026-09-09 found 1,560 skill records. It identified many records with few explicit relationship references and highlighted paths as especially weak in the raw relationship graph. The audit intentionally does not count directory pagination, topic hubs, A-Z pages, breadcrumbs, global navigation, or runtime contextual helpers, so it is a prioritization signal rather than a literal count of crawlable pages.
