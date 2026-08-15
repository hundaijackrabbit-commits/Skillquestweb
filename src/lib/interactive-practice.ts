type PracticeBase = {
  id: string;
  skillSlug: string;
  skillName: string;
  label: string;
  title: string;
  instruction: string;
  explanation: string;
  xp: number;
};

export type SequencePractice = PracticeBase & {
  kind: 'sequence';
  items: Array<{ id: string; text: string }>;
};

export type SortPractice = PracticeBase & {
  kind: 'sort';
  categories: [
    { id: string; label: string; description: string },
    { id: string; label: string; description: string },
  ];
  items: Array<{ id: string; text: string; categoryId: string }>;
};

export type InteractivePractice = SequencePractice | SortPractice;

const practices: Record<string, InteractivePractice> = {
  'problem-solving': {
    kind: 'sequence',
    id: 'problem-solving-loop-v1',
    skillSlug: 'problem-solving',
    skillName: 'Problem Solving',
    label: 'Sequence builder',
    title: 'Build a disciplined problem-solving loop',
    instruction: 'Move the steps into the order that creates evidence before commitment.',
    items: [
      { id: 'define', text: 'Define the observable gap and the outcome that would count as improvement.' },
      { id: 'evidence', text: 'Gather evidence about causes, constraints, and who experiences the problem.' },
      { id: 'options', text: 'Generate multiple responses and compare their assumptions and trade-offs.' },
      { id: 'test', text: 'Run the smallest useful test, measure the result, and adjust.' },
    ],
    explanation: 'A strong loop separates the problem from the first proposed solution, tests causes, compares options, and learns through a bounded experiment.',
    xp: 35,
  },
  'information-literacy': {
    kind: 'sequence',
    id: 'information-source-trace-v1',
    skillSlug: 'information-literacy',
    skillName: 'Information Literacy',
    label: 'Source-trace sequence',
    title: 'Trace a claim before using it',
    instruction: 'Arrange the steps for turning an attractive claim into decision-ready evidence.',
    items: [
      { id: 'claim', text: 'State the exact claim, including its scope, date, and implied comparison.' },
      { id: 'origin', text: 'Locate the original source rather than relying on a repost or summary.' },
      { id: 'method', text: 'Check the method, sample, limitations, incentives, and missing context.' },
      { id: 'compare', text: 'Compare independent evidence and decide how much confidence the claim deserves.' },
    ],
    explanation: 'Good information literacy follows the evidence chain from a precise claim to its origin, evaluates how the result was produced, and checks whether other evidence agrees.',
    xp: 35,
  },
  'research-skills': {
    kind: 'sequence',
    id: 'research-question-to-synthesis-v1',
    skillSlug: 'research-skills',
    skillName: 'Research Skills',
    label: 'Research sequence',
    title: 'Move from question to defensible synthesis',
    instruction: 'Put the research moves in an order that reduces confirmation bias.',
    items: [
      { id: 'frame', text: 'Frame a specific, answerable question and define important terms.' },
      { id: 'plan', text: 'Choose appropriate evidence sources and inclusion criteria before searching.' },
      { id: 'collect', text: 'Collect findings consistently and record where each claim came from.' },
      { id: 'synthesise', text: 'Compare patterns, contradictions, confidence, and limitations before concluding.' },
    ],
    explanation: 'Predefining the question and evidence criteria makes the search less vulnerable to convenient conclusions; synthesis then preserves uncertainty instead of hiding it.',
    xp: 35,
  },
  'public-speaking': {
    kind: 'sequence',
    id: 'public-speaking-preparation-v1',
    skillSlug: 'public-speaking',
    skillName: 'Public Speaking',
    label: 'Delivery sequence',
    title: 'Prepare a talk people can act on',
    instruction: 'Arrange the preparation loop from audience need to adaptive delivery.',
    items: [
      { id: 'audience', text: 'Identify what this audience needs to understand, decide, or do.' },
      { id: 'message', text: 'Build one clear through-line supported by only the evidence it needs.' },
      { id: 'rehearse', text: 'Rehearse aloud, test timing, and simplify moments that create friction.' },
      { id: 'adapt', text: 'Deliver while watching comprehension and adjusting pace or explanation.' },
    ],
    explanation: 'Effective speaking begins with the audience’s decision, not the speaker’s information. Rehearsal tests the message, while live observation keeps delivery responsive.',
    xp: 35,
  },
  'stakeholder-management': {
    kind: 'sequence',
    id: 'stakeholder-alignment-v1',
    skillSlug: 'stakeholder-management',
    skillName: 'Stakeholder Management',
    label: 'Alignment sequence',
    title: 'Create alignment without endless meetings',
    instruction: 'Put the stakeholder moves in the order that makes ownership visible.',
    items: [
      { id: 'map', text: 'Map who is affected, who has decision authority, and what each party risks.' },
      { id: 'outcome', text: 'Clarify the shared outcome and surface important disagreements early.' },
      { id: 'rights', text: 'Agree on decision rights, inputs, owners, and communication cadence.' },
      { id: 'loop', text: 'Close the loop with decisions, changes, unresolved risks, and next actions.' },
    ],
    explanation: 'Stakeholder work becomes lighter when the team first understands stakes, then aligns on outcomes, establishes rights, and closes communication loops explicitly.',
    xp: 35,
  },
  'risk-assessment': {
    kind: 'sequence',
    id: 'risk-assessment-control-v1',
    skillSlug: 'risk-assessment',
    skillName: 'Risk Assessment',
    label: 'Risk sequence',
    title: 'Turn a vague concern into an owned risk',
    instruction: 'Arrange the steps that make risk review actionable.',
    items: [
      { id: 'outcome', text: 'Name the outcome, asset, or obligation that needs protection.' },
      { id: 'scenario', text: 'Describe a plausible failure scenario and the conditions that enable it.' },
      { id: 'evaluate', text: 'Estimate likelihood and impact, then test the strength of existing controls.' },
      { id: 'owner', text: 'Assign an owner, response, warning trigger, and review date.' },
    ],
    explanation: 'A useful risk statement connects a protected outcome to a plausible scenario, evaluates exposure and controls, and ends with clear ownership and monitoring.',
    xp: 35,
  },
  'emotional-intelligence': {
    kind: 'sort',
    id: 'emotional-intelligence-observation-v1',
    skillSlug: 'emotional-intelligence',
    skillName: 'Emotional Intelligence',
    label: 'Signal sorter',
    title: 'Separate observation from interpretation',
    instruction: 'Sort each statement by what is directly observable versus what the speaker has inferred.',
    categories: [
      { id: 'observation', label: 'Observation', description: 'A specific behavior or event another person could verify.' },
      { id: 'interpretation', label: 'Interpretation', description: 'A judgment, motive, label, or story added to the event.' },
    ],
    items: [
      { id: 'late', text: 'Jordan joined the meeting twelve minutes after it began.', categoryId: 'observation' },
      { id: 'careless', text: 'Jordan does not respect the team’s time.', categoryId: 'interpretation' },
      { id: 'silent', text: 'Priya did not speak during the final twenty minutes.', categoryId: 'observation' },
      { id: 'disengaged', text: 'Priya has stopped caring about the project.', categoryId: 'interpretation' },
    ],
    explanation: 'Emotional intelligence improves when you notice the story your mind added. Observations create a safer basis for curiosity, feedback, and action.',
    xp: 35,
  },
  'digital-literacy': {
    kind: 'sort',
    id: 'digital-literacy-trust-v1',
    skillSlug: 'digital-literacy',
    skillName: 'Digital Literacy',
    label: 'Trust sorter',
    title: 'Distinguish verification from digital shortcuts',
    instruction: 'Sort the behaviors by whether they strengthen or weaken digital trust.',
    categories: [
      { id: 'verify', label: 'Trust-building practice', description: 'Checks identity, source, access, or consequence.' },
      { id: 'shortcut', label: 'Risky shortcut', description: 'Trades verification or control for convenience.' },
    ],
    items: [
      { id: 'channel', text: 'Verify an unusual payment request through a previously trusted channel.', categoryId: 'verify' },
      { id: 'permissions', text: 'Review an app’s requested permissions before connecting it to company data.', categoryId: 'verify' },
      { id: 'reuse', text: 'Reuse the same password because the service is not financially important.', categoryId: 'shortcut' },
      { id: 'first-result', text: 'Download the first search result because its page design looks professional.', categoryId: 'shortcut' },
    ],
    explanation: 'Digital fluency includes judgment about identity, provenance, permissions, and consequences—not merely the ability to operate a tool quickly.',
    xp: 35,
  },
  'creative-thinking': {
    kind: 'sort',
    id: 'creative-thinking-modes-v1',
    skillSlug: 'creative-thinking',
    skillName: 'Creative Thinking',
    label: 'Thinking-mode sorter',
    title: 'Know when to diverge and converge',
    instruction: 'Sort each move into idea expansion or idea selection.',
    categories: [
      { id: 'diverge', label: 'Diverge', description: 'Expand possibilities before judging them.' },
      { id: 'converge', label: 'Converge', description: 'Evaluate options against the goal and constraints.' },
    ],
    items: [
      { id: 'analogies', text: 'Generate analogies from three unrelated industries.', categoryId: 'diverge' },
      { id: 'wild', text: 'List ten deliberately unconventional approaches.', categoryId: 'diverge' },
      { id: 'criteria', text: 'Score options against user value, feasibility, and risk.', categoryId: 'converge' },
      { id: 'prototype', text: 'Choose one assumption to test with a low-cost prototype.', categoryId: 'converge' },
    ],
    explanation: 'Creativity suffers when evaluation arrives too early or never arrives at all. Separating expansion from selection gives both modes room to work.',
    xp: 35,
  },
  'analytical-thinking': {
    kind: 'sort',
    id: 'analytical-thinking-evidence-v1',
    skillSlug: 'analytical-thinking',
    skillName: 'Analytical Thinking',
    label: 'Evidence sorter',
    title: 'Separate signal from unsupported inference',
    instruction: 'Classify what the evidence directly shows and what still requires testing.',
    categories: [
      { id: 'signal', label: 'Direct signal', description: 'A result the stated measure directly supports.' },
      { id: 'inference', label: 'Needs more evidence', description: 'A causal or general claim beyond the current measure.' },
    ],
    items: [
      { id: 'completion', text: 'Course completion rose from 42% to 58% after the redesign.', categoryId: 'signal' },
      { id: 'learning', text: 'The redesign caused deeper learning for every participant.', categoryId: 'inference' },
      { id: 'tickets', text: 'Support tickets tagged “setup” fell during the pilot.', categoryId: 'signal' },
      { id: 'loyalty', text: 'Customers are now more loyal to the company.', categoryId: 'inference' },
    ],
    explanation: 'Analysis becomes trustworthy when conclusions stay proportional to what was measured and causal claims remain hypotheses until competing explanations are tested.',
    xp: 35,
  },
  'cross-functional-collaboration': {
    kind: 'sort',
    id: 'cross-functional-collaboration-ownership-v1',
    skillSlug: 'cross-functional-collaboration',
    skillName: 'Cross-Functional Collaboration',
    label: 'Ownership sorter',
    title: 'Spot collaboration versus coordination debt',
    instruction: 'Sort the team behavior by whether it creates shared execution or hidden friction.',
    categories: [
      { id: 'shared', label: 'Shared execution', description: 'Makes outcomes, interfaces, and ownership visible.' },
      { id: 'debt', label: 'Coordination debt', description: 'Leaves teams to infer responsibilities or reconcile conflict later.' },
    ],
    items: [
      { id: 'contract', text: 'Teams agree on the handoff format, owner, deadline, and acceptance test.', categoryId: 'shared' },
      { id: 'decision', text: 'The decision log names what changed, why, and who must adapt.', categoryId: 'shared' },
      { id: 'everyone', text: 'Everyone is responsible, so no single owner is named.', categoryId: 'debt' },
      { id: 'assume', text: 'Each function privately assumes the other team will resolve the dependency.', categoryId: 'debt' },
    ],
    explanation: 'Cross-functional work improves when interfaces and decisions are explicit. Ambiguous collective ownership usually postpones—not removes—the coordination cost.',
    xp: 35,
  },
  'media-literacy': {
    kind: 'sort',
    id: 'media-literacy-cues-v1',
    skillSlug: 'media-literacy',
    skillName: 'Media Literacy',
    label: 'Media-cue sorter',
    title: 'Separate evidence cues from attention cues',
    instruction: 'Sort each feature by what it tells you about reliability.',
    categories: [
      { id: 'evidence', label: 'Evidence cue', description: 'Helps inspect provenance, method, context, or correction.' },
      { id: 'attention', label: 'Attention cue', description: 'May attract or persuade without establishing accuracy.' },
    ],
    items: [
      { id: 'source', text: 'Links to the original dataset and explains how the figures were calculated.', categoryId: 'evidence' },
      { id: 'correction', text: 'Provides a dated correction policy and visible revision history.', categoryId: 'evidence' },
      { id: 'shares', text: 'Has millions of views and thousands of emotional comments.', categoryId: 'attention' },
      { id: 'urgent', text: 'Uses an urgent headline and dramatic image without source details.', categoryId: 'attention' },
    ],
    explanation: 'Popularity, urgency, polish, and emotional force can explain attention but do not verify a claim. Reliability depends on inspectable evidence and accountable correction.',
    xp: 35,
  },
};

export function getInteractivePracticeForSkill(skillSlug: string) {
  return practices[skillSlug] ?? null;
}

export function getAllInteractivePractices() {
  return Object.values(practices);
}
