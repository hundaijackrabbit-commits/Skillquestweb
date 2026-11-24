# Chinese content and mainland accessibility — rollout checklist (November 2026)

## Scope of this release
- Ten **original, condensed Chinese editorial editions grounded in existing English content**: four skills (AI literacy, critical thinking, data analysis, communication), three careers (data analyst, product manager, software engineer), three articles (AI skills, data skills, workplace communication).
- Every new Chinese edition has native-readable prose, an exercise, distinct title and description, Chinese `lang` on content, English source link, canonical, selective bidirectional `hreflang`, and sitemap entry.
- The English original stays fully available. **These are topic-matched adaptations, not line-by-line full translations**. English article citations, historical publication dates, assignments and account progress are not modified.
- China's search and language usability are improved by internally linked, static Chinese pages; this **does not** establish that content is discoverable on Baidu, accessible via all mainland networks, or that a particular number of Chinese visitors is authentic.

## Editorial verification — before scaling beyond 10 editions
1. Have a native Simplified Chinese editor proofread terminology, title phrasing, cultural clarity and Chinese punctuation; distinguish “AI literacy”, critical thinking and data interpretation consistently.
2. Validate that any research statistics cited in the English source are accurately attributed, reflect the original survey/population, are current enough for the subject, and do not imply causality when the study does not.
3. Verify linked official references; some may be inaccessible from mainland China, so the article must remain useful without opening them.
4. Preserve each original citation and legal/privacy caveat. Do not translate existing source files in place.
5. Add new editions incrementally with separate content review and matching `edition-routes` slug entries. Never create empty translation stubs or auto-index English bodies under a Chinese locale.

## Search discovery checks
- Validate each new URL responds HTTP 200 without an auth gate and appears once in `/sitemap.xml`.
- Inspect rendered head: Chinese page self-canonical, language alternate `zh-CN` and corresponding English source; English source keeps English canonical and `zh-CN` alternate **only for the ten editions**.
- Submit the regular sitemap through the search-engine tools available to the site owner, such as Google Search Console, Bing Webmaster Tools and Baidu's webmaster platform. Confirm indexing/coverage *after* submission; this code alone cannot submit or guarantee indexing.
- Avoid suggesting that the old `/zh-CN` hub or all 1,500+ English guides are complete Chinese translations.
- Compare search appearances, Chinese-language queries, landing pages, and search referrals after publishing, using a 28-day baseline. Preserve visitor privacy.

## Mainland China accessibility and performance
**Not verified from within mainland China.** Vercel deployment readiness and a North America fetch are not geographic network tests.

- From real mainland-China network locations (Beijing, Shanghai, southern China), test on Wi-Fi and mobile connections: `/`, `/zh-CN`, `/zh-CN/skills/ai-literacy`, `/zh-CN/careers/data-analyst`, `/zh-CN/blog/ai-skills-2024-guide`, `/skills/search?q=%E6%95%B0%E6%8D%AE%E5%88%86%E6%9E%90`, authentication, AI helper and all referenced APIs.
- Collect p75 LCP, INP, CLS, TTFB, route availability and error rates, separately for mainland and non-mainland audiences. Compare against baseline rather than fabricating numbers.
- Check third-party dependencies for blocked/slow hosts: YouTube on existing English pages (Chinese homepage already has a video-free alternative), Google AdSense, tracking scripts, fonts, AI providers, Supabase requests, authentication redirects, and external source links. New Chinese editorial pages themselves use server-rendered text without an iframe.
- Confirm whether Vercel Web Analytics/Speed Insights actually has geographic and Core Web Vitals breakdowns accessible to the owner. Their React components are installed but this connector does **not** expose verified audience-by-country or China latency numbers.
- If mainland reachability is poor, evaluate a compliant delivery/edge strategy and local regulatory/hosting requirements with qualified regional advice before infrastructure migration. **Do not change hosting, DNS or production user data solely based on assumptions.**

## Verification and rollback
- Run `npm run audit:chinese-editorial`, `npm run audit:chinese-localization`, and `npm run audit:learning-progress` before the production build.
- Check the final preview (not just earlier intermediate previews) for static generation, TypeScript, desktop/mobile layout and English fallback.
- If a release fails, revert the merged commit; leave prior English content and all member records intact.
