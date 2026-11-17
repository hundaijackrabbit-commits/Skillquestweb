# Communication Skills growth pilot — 2026-11-16

Tracking: GitHub issue #66 and PR #67

## Verified content baseline
The raw 1,560-skill source file includes a legacy generic communication record. The production prebuild already merges a researched communication override from skill-editorial-overrides-reviewed-metadata.json into the canonical slug. Therefore the published skill guide is already editorially enriched. An additional legacy professional-communication override exists, but is not needed for this release. The content loader and existing editorial records remain unchanged.

## Changes in this pilot
1. Add a distinctive, original workplace communication field guide to the existing /skills/communication page, with a concise three-step framework, a before/after example and a five-minute exercise.
2. Add a communication message-clarity sort activity to the existing interactive Practice Lab system, using existing authentication, completion history, and XP infrastructure.
3. Add clear entry links in the existing /topics/communication topic hub to professional communication, active listening, and written communication.
4. Improve targeted metadata for the communication skill and topic without changing slugs, canonical URLs, or the general metadata policy for other skills.
5. Sharpen homepage brand positioning to 'Understand it. Practice it. Prove it.' while retaining videos, newsletter, member tools, quiz, and discoverability.

## Quality gates before production
- Check the communication guide, topic hub, and homepage at 360px, 390px, 430px, tablet and desktop; confirm keyboard navigation and reduced-motion behavior.
- Verify the interactive activity remains access-gated, completes correctly, and does not award duplicate XP.
- Run the existing lint and build, SEO, link-graph, originality, and interactive controls audits. A Vercel build is not a substitute for all of these checks.
- Verify canonical URLs and page metadata, and confirm no previously existing components or content disappeared.
- Record available Search Console/analytics baselines before claiming marketing results.

Out of scope: mass rewriting legacy records, database changes, parallel glossaries, generated SEO filler pages, or deleting any existing route or feature.
