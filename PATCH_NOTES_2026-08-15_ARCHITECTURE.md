# Modern Skill Lab — Directory, Topic Hub, and Editorial Gate Build

Date: 2026-08-15

## What changed

- Replaced the client-rendered `/skills` mega-directory with 30 server-rendered guides per page.
- Added crawlable pagination at `/skills/page/[page]`.
- Added server-side search and filtering at `/skills/search`; filtered URLs use `noindex,follow`.
- Added `/topics` and 16 topic hubs that connect skills with curated paths, careers, industries, and articles.
- Added visible, accessible breadcrumbs to the major directory and detail templates.
- Added permanent host redirects from the Vercel hostname and `www` hostname to `modernskilllab.space`.
- Removed the public-skills routes from authentication middleware so anonymous content requests do not refresh Supabase sessions.
- Removed unsupported salary, demand, market-size, growth-rate, remote-work, and AI-impact labels from career and industry templates.

## Editorial and originality gate

Run:

```powershell
npm run audit:originality
```

The audit checks every canonical skill, career, industry, learning path, and MDX article for:

- exact duplicate long passages across documents;
- template-normalized passages;
- repeated 16-word sequences in content eligible for indexing;
- placeholder skill titles and generic generated definitions;
- repeated career, path, and blog templates;
- unattributed Markdown blockquotes.

Current result:

- 1,571 documents checked;
- 6,135 long passages checked;
- 794 skill pages eligible for discovery;
- 546 canonical skill pages quarantined with `noindex,follow`;
- 21 career pages eligible for discovery;
- 26 learning paths eligible for discovery;
- 0 existing blog posts eligible until their repeated template sections are rewritten;
- indexable-content originality gate: PASS.

The sitemap and public discovery pages include only content that clears the gate. Quarantined URLs remain available for editorial work and keep followed links, but they are excluded from the sitemap and receive `noindex` metadata.

The relationship audit still identifies 814 unresolved references inherited from the legacy datasets. Discovery components omit unresolved targets, and `npm run audit:links` now treats 814 as a temporary baseline and fails if new work increases that number. Reducing the baseline is the next data-cleanup track.

This repository audit verifies internal originality and screens repeated/template content. It is not a legal opinion or a certificate against every external publication database. A commercial corpus checker is still appropriate before representing the entire archive as legally certified plagiarism-free.

## Validation

```powershell
npm run audit:originality
npm run audit:seo
npm run audit:links
npx tsc --noEmit
npm run build
```

The build must finish successfully before deployment.

## Deployment notes

The primary public hostname remains `https://modernskilllab.space`. The redirects in `next.config.ts` send both `skillquestweb.vercel.app` and `www.modernskilllab.space` to that hostname with permanent redirects.

After deployment:

1. Open `/skills`, `/skills/page/2`, `/skills/search?q=communication`, `/topics`, and several topic hubs.
2. Confirm the Vercel hostname redirects to the primary hostname.
3. Submit the refreshed sitemap in Google Search Console.
4. Request reindexing for the homepage, `/skills`, `/topics`, and the strongest topic hubs.
