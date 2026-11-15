# Modern Skill Lab — Editorial QA Checkpoint (50+ priority skills)

Date: 2026-09-23
Branch: `audit/content-quality-pass-1`
Status: active QA; do not merge solely on the basis of content volume.

## Purpose

This checkpoint records the quality standard for the first 50+ editorial upgrades before expansion toward 100. Existing library content remains protected; fixes should be additive overrides or narrowly scoped corrections unless deletion is explicitly justified and reviewed.

## QA dimensions

### 1. Originality and usefulness
- Each skill must answer a real learner question rather than exist primarily to capture a search query.
- Definitions, scenarios, exercises, mistakes, measurement criteria, and AI-era sections should contain skill-specific reasoning rather than noun-swapped template prose.
- Avoid unsupported salary, demand, percentage, or outcome claims.
- Prefer original explanation, practical application, and synthesis over paraphrasing source material.

### 2. Evidence integrity
- Quantitative or time-sensitive factual claims require a source appropriate to the claim.
- Source notes must point to material that actually supports the associated statement.
- Prefer primary/authoritative sources when available.
- Preserve population, geography, date, scope, and uncertainty when they materially affect interpretation.
- Multiple articles derived from one underlying source do not count as independent corroboration.

### 3. AI-content quality
- AI-related skills must distinguish fluent output from verified performance.
- AI Evaluation should use application-level evidence, including model testing, red teaming, and user testing, rather than treating a benchmark as proof of real-world fitness.
- High-impact or difficult-to-reverse AI workflows should include stronger evaluation, monitoring, escalation, and human-control expectations.

### 4. Accessibility
- Treat accessibility as a product/content quality discipline rather than an automated score.
- Use WCAG 2.2 as the principal web-content accessibility standard for this checkpoint.
- Combine automated, semi-automated, and manual evaluation where appropriate; automated checks alone are insufficient for many user-experience questions.
- Representative page review should include keyboard operation, semantic structure, labels, focus behavior, alternatives/captions where relevant, error handling, and readable/adaptable presentation.

### 5. Editorial structure
For each priority skill, verify where applicable:
- distinct short definition
- substantial full definition
- why-it-matters section without hype
- realistic scenarios
- progressive beginner/intermediate/advanced practice
- skill-specific common mistakes
- coherent subskills
- evidence summary/source notes for research-dependent claims
- observable measurement criteria
- AI-era relevance that adds substance rather than a generic AI paragraph

### 6. Duplication checks
Flag:
- identical or near-identical definitions across different slugs
- repeated long sentences or scenario structures
- generic exercise blocks reused across unrelated skills
- repeated evidence summaries that do not match the skill
- conflicting duplicate slugs across editorial batches unless a later batch is an intentional revision

Intentional revision currently present:
- `ai-evaluation`: Batch 07 supersedes the Batch 06 editorial version and should win in merge/override order.

### 7. Technical/content integration
Before merge:
- confirm every editorial JSON file parses successfully
- confirm the editorial loader discovers numbered batches in deterministic order
- confirm later intentional overrides resolve predictably
- confirm every upgraded slug maps to a real skill page or an explicitly planned page
- run editorial QA, strict originality, link, SEO, and production build scripts
- inspect representative rendered pages rather than relying only on JSON validation

## Representative-page inspection set

Use a varied sample rather than only technology pages:
1. Communication
2. Analytical Thinking
3. Content Strategy
4. Customer Service
5. Cybersecurity
6. User Experience Design
7. Information Literacy
8. Digital Accessibility
9. AI Evaluation
10. Lifelong Learning

Inspect desktop and mobile presentation, section hierarchy, source rendering, navigation/internal links, readability, excessive page length, repeated components, and interactive states.

## Research benchmark notes

- NIST ARIA Evaluation Planning Manual (2026): holistic AI application evaluation combines Model Testing, Red Teaming, and User Testing.
- NIST ARIA Pilot Evaluation Report (2025): evaluation scenarios used multiple testing levels to examine system behavior and human interaction/impact.
- W3C WCAG 2.2: accessibility recommendations cover a broad range of disability-related access needs.
- W3C ACT: accessibility conformance testing includes automated, semi-automated, and manual approaches.

## Current QA findings/actions

- **Fixed:** AI Evaluation was too model/test-suite centered. Batch 07 now explicitly separates model testing, red teaming, and user testing and ties evaluation to deployment context.
- **Added:** Fact-Checking and Source Synthesis to strengthen evidence literacy and claim provenance across the curriculum.
- **Added:** Digital Accessibility as a dedicated skill rather than leaving accessibility only as a UX subtopic.
- **Watch:** repeated World Economic Forum sourcing across workforce skills is legitimate for workforce-trend claims, but pages should not become dependent on one report for all instructional content.
- **Watch:** AI-era sections can become structurally repetitive. Review for unique implications rather than merely stating that AI makes the skill more important.
- **Watch:** long skill pages may create excessive desktop/mobile scrolling. Rendered inspection must assess progressive disclosure, navigation, and content density before merge.

## Merge gate

Do not merge the 50+ skill checkpoint until:
1. parser/schema checks pass;
2. duplicate/originality checks pass or flagged exceptions are documented;
3. source/link checks pass or known exceptions are documented;
4. production build passes;
5. the representative-page set is visually inspected;
6. critical/high-severity accessibility defects in representative flows are fixed;
7. intentional override ordering is verified.

Expansion toward 100 can continue after this gate without requiring perfection on every low-severity editorial issue, but critical structural, factual, duplication, build, and accessibility defects should be resolved first.
