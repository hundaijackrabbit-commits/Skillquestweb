# Modern Skill Lab — Full-Site Completion & Placeholder Audit

Date: 2026-09-09
Scope: public content system + member-facing surfaces + structured data. This audit expands the skill-guide audit to the rest of the product.

## Audit standard

A section is not considered complete merely because it renders. Flag it when it contains one or more of the following:

- templated prose that could be pasted onto many unrelated subjects;
- generic tools, outcomes, mistakes, development steps, or career advice;
- empty headings or relationships;
- repeated career/path copy that does not describe the specific subject;
- claims of depth that the underlying record does not support;
- thin editorial articles relative to the site's teaching-first standard;
- dead or fallback UI that says “coming soon”;
- member features whose UI promises more than the connected data currently demonstrates;
- discovery surfaces that promote thin records as Editor’s Picks.

The target standard is: subject-specific explanation -> framework/model -> workplace examples -> practice -> evidence/measurement -> connected next step.

## P0 — update first

### 1. Legacy skill library

Status: critical, already under active remediation.

Public search still exposes many generic records, including A/B Testing, Automation, Digital Analytics, Digital Marketing, Financial Analysis, SEO, Compliance Management and others with category-template definitions. Some individual guides still show generic development steps such as “learn fundamentals,” “apply in projects,” “train others,” and generic mistakes such as “insufficient practice” and “not adapting to context.”

Update requirement:
- run the existing skill completion audit over every canonical record;
- separately rank records by template fingerprints, not only missing fields;
- prevent a generic record from receiving `featured: true` / Editor’s Pick treatment;
- research-rewrite the weakest canonical records in waves;
- require subject-specific definition, why-it-matters, modern relevance, workplace contexts, scenarios, development methods, mistakes, measurement, employer evaluation, mastery signals, career impact and evidence notes.

### 2. Career profiles and generated career pathways

Status: critical.

The career dataset contains 103 profiles, but substantial portions are repeated templates. Audit snapshot from repository data:
- “Independent consulting and specialized practice” appears in 62 career records.
- “Communication tools” appears in 56 career records.
- generic “Professional platforms” appears in 62 records.
- the same stable/positive future-outlook sentence appears in 37 records.
- repeated education, alternative-path and entry-strategy templates appear across large blocks of the dataset.
- related-career links are heavily concentrated around the same small set of roles.

The rendered career pathway component also generates generic ladder copy such as “Entry-level position focusing on learning fundamentals and building experience,” “Executive position setting vision and leading large organizations,” and generic executive responsibilities. This produces implausible ladders for individual-contributor professions.

Update requirement:
- replace generated one-size-fits-all ladders with career-specific stages;
- add role-specific responsibilities, evidence/portfolio signals, realistic entry routes, tools, advancement branches, adjacent roles and current outlook;
- distinguish IC advancement from people-management advancement;
- audit salary/outlook claims for geography/date/source transparency;
- validate skill links so generic skills do not dominate every career.

### 3. Learning paths

Status: critical.

The dataset contains 100 paths, but 74 share the same three learning outcomes:
- Apply skills in real-world professional contexts
- Build relevant experience and professional network
- Achieve career advancement in chosen field

The same 74 also reuse generic prerequisites such as “Basic professional skills,” “Motivation to learn and grow,” and “Commitment to practice and development.” Project Management, Problem Solving, Communication and Professional Development recur across roughly three quarters of these paths. 76/100 paths have no related careers.

Update requirement:
- every path needs a specific promised outcome;
- explain why each skill is in the sequence and what the learner should produce before moving on;
- add concrete projects/evidence checkpoints, not generic outcomes;
- connect each path to realistic careers and industries;
- remove mass-default prerequisites and use actual prerequisite capability where needed;
- review the long tail for near-duplicate paths and consolidate where appropriate.

## P1 — major content debt

### 4. Blog / editorial library

Status: high priority.

The repository snapshot contains 20 MDX articles. Fourteen legacy articles are only about 245–286 body words, including topics such as negotiation, time management, remote work, digital marketing, financial literacy, customer success, project management and career transitions. This is far below the teaching depth demonstrated by the newer 2026 research articles.

Update requirement:
- rewrite thin legacy posts into real lessons with a model/framework, example, limits/caveats, exercise or retrieval check, connected skills/careers and source notes;
- avoid publishing “coverage planned” language as a substitute for actual editorial depth;
- establish minimum editorial quality rather than a raw word-count target.

### 5. Industry intelligence

Status: high priority.

Only 8 industry records exist in the repository snapshot. The page contains a dormant “Industry Intelligence Coming Soon” fallback if the data array is empty. Eight sectors are not enough to support the site's broad career/skill graph, and many skill records currently point to the same handful of industries.

Update requirement:
- expand sector coverage deliberately;
- deepen each profile with sector-specific work, operating model, current change signals, constraints, role families, durable skills, emerging skills, common tools/systems, entry routes and source notes;
- remove the “Coming Soon” fallback once data integrity guarantees the section cannot be empty;
- audit industry-to-career and industry-to-skill relationships for over-reuse.

### 6. Topic hubs / clusters

Status: medium-high.

The 17 topic hubs have substantially better editorial framing than the legacy records, but their usefulness is limited by the quality of the skills and paths they surface. For example, People & HR currently surfaces several generic skill definitions such as HRIS, People Analytics, 360 Feedback, ATS, Compliance and Employee Experience.

Update requirement:
- rank strongest guides first;
- do not label thin records Editor’s Pick;
- add a curated “start here / then learn / apply with” progression per topic;
- add topic-specific practice and career examples rather than relying entirely on underlying generic records.

## P2 — product/content consistency

### 7. Homepage

Status: structurally strong, quality-control issue.

The homepage has a clear proposition, practice sprints, newsletter, career guide and selected skills. Main risk: any automated featured/trending surface can expose unfinished records and undermine the stronger positioning.

Update requirement:
- featured content must pass the strict completion audit;
- trending content should have a quality gate before display;
- ensure “deep library” claims are supported by the specific pages users are sent to.

### 8. Community

Status: conceptually clear; needs functional/data verification.

The public page explicitly says there are “no placeholder feeds or empty community counters.” That is a strong promise and therefore needs end-to-end verification against production Supabase state, especially because community migrations were developed separately.

Update requirement:
- verify production tables/RPC/RLS for discussions, replies, reactions, follows and member cards;
- verify starter discussions actually appear for new/anonymous/member states as intended;
- replace the absolute “no placeholder” claim if production cannot guarantee it;
- add empty-state content that still gives a useful next action.

### 9. Dashboard / profile / saved progress

Status: needs functional verification.

Repository code has historical TODOs around skill progress counts. The full member flow should be audited signed-out, new-account, partially-complete and returning-member states.

Update requirement:
- verify saved skills, in-progress skills, completed skills, XP/streaks, profile recommendations and career shortlist all use real persisted data;
- remove zero/default counters that masquerade as real progress;
- ensure recommendations link to complete canonical content.

### 10. Practice Lab / skill missions / interactive learning

Status: strongest differentiated product area, but coverage is uneven.

The homepage currently highlights six substantive Skill Sprints, while many skill guides rely on generic development actions or member mission UI. The practice promise should scale beyond a small curated set.

Update requirement:
- classify practice into curated sprints vs generated missions vs reflection-only activities;
- never imply a full interactive lesson where only a generic reflection prompt exists;
- progressively add subject-specific practice to high-traffic skill clusters;
- connect completion evidence back to profile/path progress.

### 11. About / trust / research transparency

Status: good positioning, but claims create a quality obligation.

The About page says every skill is a “deep knowledge object” and emphasizes comprehensive, research-aware guidance. Thin legacy records conflict directly with this positioning.

Update requirement:
- keep the positioning, but make the content audit enforce it;
- add a concise methodology page explaining editorial status, evidence/source notes, update dates and what “research surfaced where available” means;
- distinguish researched guides from baseline editorial guides without making baseline pages look second-class.

### 12. Free Career & Life Map

Status: public landing page is strong.

Update requirement:
- test email delivery, attachment and backup link end-to-end;
- verify workbook claims (60 pages, fillable/interactivity) against current asset;
- connect workbook outputs to profile/diagnostic/path features where useful.

### 13. Search and discovery

Status: useful architecture, quality gate incomplete.

Search, topics, clusters, diagnostic and paths solve different discovery jobs. The major weakness is not navigation—it is that search can still rank or expose generic canonical records.

Update requirement:
- incorporate completion score into search/discovery ranking;
- suppress severely thin records from featured surfaces while keeping valid direct URLs available during remediation;
- add “recently updated / research-backed / practice available” signals only when true.

### 14. Auth and gated member UI

Status: verify copy and state transitions.

Public crawls show repeated “Checking your access…” blocks on some pages. That may be a crawler artifact, but the rendered UX should be checked for flashes, duplicated gates and confusing lock states.

Update requirement:
- test anonymous, loading, signed-in and expired-session states;
- avoid duplicated access modules on a single page;
- keep the product rule clear: guides are free; account adds saving/practice/progress, not a paid content tier.

## Cross-site automated checks to add

1. `audit:skills` — missing fields + template fingerprints + weak lists + generic tools + empty relationship headings.
2. `audit:careers` — repeated prose thresholds, generic tools/outlook/education, implausible pathway stages, weak skill/industry links.
3. `audit:paths` — repeated outcomes/prerequisites, missing related careers, sequence duplication, weak evidence checkpoints.
4. `audit:blog` — thin body, missing source/evidence notes where claims require them, missing connected content/practice.
5. `audit:industries` — coverage count, generic relationships, missing trends/challenges/opportunities/source dates.
6. `audit:surface-quality` — featured/trending/editor-pick content must pass a stricter threshold than ordinary indexable content.
7. `audit:member-state` — manual/automated production checklist for community, dashboard, saves, progress and access states.

## Recommended update order

Wave A: career profiles + career pathway generator.
Wave B: learning paths.
Wave C: weakest remaining skill clusters, ranked by public visibility and template score.
Wave D: thin legacy blog articles.
Wave E: industry expansion and relationship cleanup.
Wave F: topic-hub curation and search/discovery quality gating.
Wave G: member/community/dashboard end-to-end production verification.
Wave H: methodology/trust layer and final cross-site polish.

## Definition of done

The audit is complete only when a visitor can enter through Home, Search, Topic, Skill, Career, Industry, Path, Blog, Community or Practice and avoid falling from a strong editorial page into obvious template content. Every prominent recommendation should lead to a page that teaches something specific, gives the learner a practical next action, and accurately represents its evidence and product state.
