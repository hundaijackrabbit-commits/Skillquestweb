# Simplified Chinese rollout — search, traffic verification, and China network QA
Updated: 2026-11-19

## What is published

- **Chinese landing:** `/zh-CN`.
- **Chinese skill editions:** `/zh-CN/skills/{ai-literacy,critical-thinking,data-analysis,communication}`.
- **Chinese career editions:** `/zh-CN/careers/{data-analyst,product-manager,software-engineer}`.
- **Chinese editorial articles:** `/zh-CN/blog/{ai-skills-2024-guide,data-skills-career-growth,communication-skills-that-drive-career-success}`.
- Each has Simplified Chinese main content, a self-referencing canonical, reciprocal English/Chinese alternate links, Chinese metadata, and a link back to the unchanged English source. Editions are **substantive localized editorial adaptations**, not line-for-line replicas.
- Discovery: `/sitemap.xml` includes Chinese URLs; `/sitemap-zh.xml` focuses on Chinese URLs and their English alternatives; `/robots.txt` announces both sitemaps.
- The original English material remains indexable, and untranslated articles are **not** presented as Chinese alternatives.

## Mainland China reachability: not yet verified

The site remains hosted on Vercel outside mainland China. A successful deployment, a fast load from North America, and a translated article do **not** prove that Chinese users can load the page quickly or consistently. External providers or their dependencies (YouTube, Google ads and third-party authentication/AI endpoints) may also be inaccessible.

1. Obtain permission to test from several real mainland connections (for example China Mobile, China Telecom and China Unicom; at least two cities) using ordinary browsers or owned test machines. Do **not** use untrusted third-party test services with account credentials.
2. From each connection, run `node scripts/china-connectivity-probe.mjs --runs=5`. It requests six public URLs only; it does not log IP addresses or install tracking scripts. Save output privately with network type and approximate city added by the tester; the script cannot verify its own geographic location.
3. Record success rate, median time to response headers, total download time, mobile Core Web Vitals where possible, auth/login success, and access to AI explanation endpoints. Treat failures due to blocked upstream services separately from page HTML delivery.
4. Compare against the same pages in Canada and at another non-mainland location. Repeat at different local times; one successful request does not prove reliability.
5. If failures occur, inspect CDN/deployment geography, JS/CSS/font hosting, `Content-Language`, redirects, third-party calls, image/video providers and blocked upstream APIs. Change one dependency at a time; do not bypass local law or assume an offshore deployment is consistently accessible.
6. **Do not move hosting to mainland China or add new tracking/data processors** without reviewing relevant legal, privacy, hosting and domain requirements.

Suggested launch gate (a project QA target, not a measured fact): at least 95% successful public-page fetches across approved network samples, no hard dependency on YouTube for Chinese instructional content, mobile readability at 360–390 CSS px, and no functional regressions on English pages. Latency targets should be set from measured baseline, not guessed.

## Verify the reported Chinese traffic

The connected Vercel API currently exposes deploy/runtime diagnostics but does not expose a reliable country-by-country audience report. **China visitor volume has not been independently verified here.**

1. Open **Vercel Web Analytics** for project `skillquestweb`; choose matching date windows (e.g. last 28 days vs prior 28 days). Review unique visitors and pageviews by country/region, device, referrer, entry page, and any bot filtering the product provides.
2. Compare unique visitors vs total pageviews. A sharp rise in pageviews from one path or a small group of visitors may not represent audience growth. Avoid deriving location from individual IP addresses or exporting personal data to spreadsheets without a legitimate need.
3. Inspect which pages Chinese visitors land on and whether they continue to another guide, create verified accounts, save a skill, or complete practice. These metrics must be **explicitly instrumented and validated**; never infer them from raw views.
4. Check whether the analytics script is reachable from the measured mainland networks; blocked analytics can undercount, and VPN/proxy traffic may show misleading geography.
5. Compare organic search referrals, direct visits and suspicious traffic patterns. Treat regional analytics as approximate rather than proof of residence or intent.
6. If analytics cannot be accessed, share a **country-and-page-level aggregated export** (no names, emails or IPs) for further analysis.

## Search discovery and indexing

- Verify site ownership separately with the relevant Chinese search platforms (including Baidu Search Resource Platform, where eligible), and with Bing Webmaster Tools if appropriate. Do not claim verification was completed without the actual account.
- Submit `https://modernskilllab.space/sitemap-zh.xml` through those platforms after verification. The sitemap is available publicly; submission is not automatic.
- Inspect indexed status, coverage issues, canonical selection, hreflang/alternate relationships, crawl errors, and real search queries for the 11 Chinese URLs.
- Add region-appropriate Chinese search phrases naturally only when supported by relevant editorial content. No keyword stuffing or mass machine-translated shallow pages.
- Confirm the displayed title, description, and language on Chinese results, and update any editorial issues before expanding the set.
- Server root layout currently begins with `<html lang="en">`, because most routes are English. Chinese pages explicitly mark their body content `lang="zh-CN"`, emit a Chinese language response header, and provide localized metadata. A future route-layout architecture can give localized pages a **server-rendered root `<html lang="zh-CN">`** without making the existing 1,700+ English pages dynamic. Do not make the shared root layout request-dependent just to change this label.
- Do not claim full library localization: only 10 translated editorial editions and the existing Chinese hub currently qualify for Chinese editorial indexing.

## Editorial expansion plan

Prioritize additional pages using *verified* Chinese page entries, searches, and engagement, not just generic keyword popularity. For each new Chinese edition: read the source, preserve important limitations and citation links, translate the actual subject matter, add a useful practice exercise, check terminology consistency, verify all internal links, update the bilingual alternate and sitemap only after substantive localized content exists, and obtain native-speaking editorial QA before large-scale promotion.
