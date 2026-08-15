# Modern Skill Lab search migration audit

Date: 2026-08-14

## Bottom line

The custom domain is not blocked from Google. Current public search checks show the homepage and deep pages from `modernskilllab.space` in the index. The legacy `skillquestweb.vercel.app` hostname also redirects to the custom domain.

The search-result mismatch is a migration and consolidation issue, not a DNS failure: Google still has cached Vercel URLs and old SkillQuest titles while it recrawls the site page by page. With roughly 1,500 public URLs, that can take several weeks.

## What was found

- The custom-domain homepage is indexed.
- Custom-domain career and skill pages are indexed.
- The legacy Vercel homepage redirects to the apex custom domain.
- The repository already has a crawlable robots file, XML sitemap, Google verification metadata, self-referencing canonicals, and indexable public routes.
- The source dataset has 1,541 skill records but only 1,340 unique skill names. The 201 extra records create competing pages for the same topics.
- 408 source skill records still use visibly generated or grammatically weak short-definition patterns. These are a longer-term content-quality risk even when technical SEO is correct.

## Fixes included in this repo

- Permanent host redirects now run before route rendering for:
  - `skillquestweb.vercel.app` → `modernskilllab.space`
  - `www.modernskilllab.space` → `modernskilllab.space`
- Redirects preserve the full path and query string.
- Duplicate skill names now select one strongest canonical page.
- The public skill directory, internal search, related-skill discovery, and sitemap use canonical skill topics.
- Duplicate skill URLs remain available for old links, but their absolute canonical metadata points to the selected topic URL.
- The sitemap contains only apex-domain canonical URLs.
- Breadcrumb structured data was added to skill, career, industry, and blog detail pages.
- A repeatable content audit is available with `npm run audit:seo`.

## Validation results

- `npm run build`: passed.
- Next.js generated 1,692 routes successfully.
- Generated sitemap: 1,480 URLs total.
- Generated sitemap skill URLs: 1,340, all unique.
- Sitemap hostnames: only `modernskilllab.space`.
- Generated robots file allows public crawling, blocks account/admin routes, and references the apex sitemap.
- Duplicate examples such as the three Copywriting pages emit the same absolute canonical URL.

The repository's full lint command still reports older issues in unrelated scripts and UI components. They do not block the production build, but should be handled in a separate code-quality pass.

## Required Search Console steps after deployment

1. Verify a Domain property for `modernskilllab.space` using DNS.
2. Keep the old `https://skillquestweb.vercel.app/` URL-prefix property verified if possible.
3. Deploy this revision, then submit `https://modernskilllab.space/sitemap.xml` in the new property.
4. Use URL Inspection on:
   - `https://modernskilllab.space/`
   - `https://modernskilllab.space/skills`
   - `https://modernskilllab.space/careers`
   - `https://modernskilllab.space/blog`
5. For the homepage, confirm that **User-declared canonical** and **Google-selected canonical** both show `https://modernskilllab.space/`.
6. If Search Console offers Change of Address for the verified old property, submit the move to `modernskilllab.space`.
7. Keep legacy redirects active for at least one year; indefinitely is better for visitors with old links.
8. Do not repeatedly request indexing for hundreds of pages. Submit the sitemap once, request the homepage and a few important section pages, then monitor the Page indexing and Sitemaps reports weekly.

## Next content priority

Technical consolidation is now strong enough for migration. The next meaningful SEO gain is editorial quality:

1. Rewrite the 408 generated-copy definitions, starting with pages that already have impressions in Search Console.
2. Replace boilerplate sections with specific workplace examples, practice exercises, evaluation criteria, and credible source notes.
3. Add clear editorial ownership, author profiles, and update dates only when a page receives a real review.
4. Build topic hubs around the three main audiences so important pages receive stronger internal links than the long tail.

Run `npm run audit:seo` after content changes to track the remaining duplicate and generated-copy backlog.
