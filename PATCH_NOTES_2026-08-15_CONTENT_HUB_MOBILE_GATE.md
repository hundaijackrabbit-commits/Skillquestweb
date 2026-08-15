# Content Hub and Mobile Gate Refresh

## Public count cleanup

- Removed changing library-total claims from the homepage and the Skills, Topics, Careers, Industries, Paths, Blog, and About pages.
- Removed public view totals and numeric ranking labels from the homepage trending section.
- Replaced numeric topic, career, industry, path, and related-content counters with descriptive navigation cues.
- Simplified the skill directory pagination to Previous and Next controls instead of exposing the size of the collection.
- Retained numbers that help a visitor make or complete a decision, including learning time, XP, salaries, step order, private progress, and assessment limits.

## Stronger content hubs

- Added three clear homepage entry points: start with a skill, a career, or a destination.
- Added career-direction clusters based on the kind of work a visitor wants to do, with direct links to relevant profiles.
- Reworked career cards to show actual core capabilities and common settings rather than record counts.
- Added industry guidance around change, contribution, and learning priorities.
- Reworked industry cards to preview real roles, skills, and change signals from each profile.
- Added learning-path guidance around outcomes, sequence, and evidence.
- Reworked path cards to preview their actual skill sequence, career direction, and intended outcome.
- Added editorial-use guidance to the Blog and replaced the About page inventory panel with platform principles.
- Preserved the existing quality gate: thinner or repetitive records are not promoted merely to inflate a visible total.

## Mobile account gate

- Replaced the phone overlay with a normal-flow mobile layout that cannot be clipped by a fixed or minimum-height preview.
- Kept a compact blurred activity preview at the top of the mobile gate.
- Moved Create free account and Sign in directly below the activity explanation.
- Reduced mobile padding and heading size while retaining comfortable touch targets.
- Kept the larger blurred overlay treatment for tablet and desktop layouts.
- Interactive activity components remain unmounted until Supabase confirms an authenticated user.

## Verification

- Changed-file ESLint: passed with no warnings.
- Interactive-control audit: passed; 58 TSX files checked and no dead or placeholder controls found.
- Strict indexable-content originality audit: passed across 1,571 documents, with no repeated 16-word phrases in public/indexable content.
- Strict content-link audit: passed with no new unresolved references above the established legacy baseline.
- A final production build was attempted after these changes, but the workspace stopped execution because the session reached its tool-usage quota. The immediately preceding responsive build passed all 936 routes. Run `npm run build` locally before deployment to complete the final verification for this refresh.

## Live-site observation

The live crawl returned conflicting public inventory totals from different cached/deployed responses. Removing those totals prevents visitors from seeing internal editorial eligibility changes as a change in the size or value of the library.
