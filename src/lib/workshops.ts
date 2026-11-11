/** Original self-directed practice workshops: examples are illustrative, not graded assessments. */
export type WorkshopStep = { title: string; instruction: string; scaffold: string; example: string };
export type GuidedWorkshop = {
  slug: string; skillSlug: string; skillName: string; title: string;
  description: string; scenario: string; deliverable: string;
  estimatedMinutes: number; xp: number;
  steps: [WorkshopStep, WorkshopStep, WorkshopStep];
  criteria: [string, string, string, string];
  pitfalls: string[]; revisit: string;
};

const workshops: GuidedWorkshop[] = [
  {
    slug: 'clear-handoff', skillSlug: 'communication', skillName: 'Professional Communication',
    title: 'The Clear Handoff Workshop',
    description: 'Turn a messy project update into a message that makes the decision, owner and deadline unmistakable.',
    scenario: 'A client expects a draft campaign tomorrow. A designer is waiting for approved images. The account manager believes the deadline moved, and the client has had no update. You own the handoff, but not every decision.',
    deliverable: 'A ready-to-send client update and an internal action log another person could follow.',
    estimatedMinutes: 18, xp: 60,
    steps: [
      {
        title: 'Separate fact from assumption',
        instruction: 'Identify what is known, what is still uncertain and which decision must be made before work continues. Avoid blame.',
        scaffold: 'Confirmed facts: …\nUnverified assumptions: …\nDecision needed and when: …',
        example: 'Confirmed: The designer needs approved images. Unverified: The client has accepted a revised deadline. Decision: Account manager confirms the date by 2 p.m. today.',
      },
      {
        title: 'Write the client update',
        instruction: 'Write four to six sentences. State the current status, explain the dependency without jargon, offer the next update and avoid promising a date that is not confirmed.',
        scaffold: 'Current status: …\nThe dependency: …\nWhat happens next: …\nNext update time: …',
        example: 'The campaign draft is paused while we confirm the approved images and delivery date. We are resolving both today. I will send you a confirmed schedule by 3 p.m., even if an item is still outstanding.',
      },
      {
        title: 'Close the internal loop',
        instruction: 'Create a tiny action log with an owner, deadline and escalation trigger for each critical handoff.',
        scaffold: 'Action | Owner | Due | Escalation trigger\n…',
        example: 'Confirm image approval | Designer | 1 p.m. | Flag account manager at 1:15 if missing. Confirm client deadline | Account manager | 2 p.m. | Escalate if unconfirmed.',
      },
    ],
    criteria: [
      'My draft separates confirmed facts from assumptions.',
      'A reader can identify the decision or next action immediately.',
      'Critical actions include an owner and a check-in time.',
      'I avoided blame, invented certainty and unverified promises.',
    ],
    pitfalls: ['Leading with a long backstory.', 'Using “we will handle it” instead of assigning an owner.', 'Calling an unconfirmed deadline certain.'],
    revisit: 'In two or three days, reopen your handoff. Could a colleague who missed the conversation act without calling you?',
  },
  {
    slug: 'responsible-ai-brief', skillSlug: 'ai-literacy', skillName: 'AI Literacy',
    title: 'The Responsible AI Brief Workshop',
    description: 'Design a useful AI-assisted workflow without handing it sensitive information or consequential decisions.',
    scenario: 'Your team wants AI to summarize customer feedback and propose improvements. Some feedback includes personal details. The team is tempted to paste everything into a public chatbot and publish its recommendations.',
    deliverable: 'A one-page workflow brief with a usable prompt, verification checks and a human decision owner.',
    estimatedMinutes: 22, xp: 60,
    steps: [
      {
        title: 'Draw the decision boundary',
        instruction: 'Separate tasks AI may assist with, outputs a person must verify and decisions a person must own. State what input should not be sent.',
        scaffold: 'AI may assist: …\nHuman must verify: …\nHuman must decide: …\nData to exclude: …',
        example: 'AI groups redacted themes. A researcher checks source support. The product owner chooses priorities. Exclude names, contact details, account numbers and confidential information.',
      },
      {
        title: 'Build a verifiable prompt',
        instruction: 'Specify role, task, permitted source material, output format and a rule for uncertainty. Do not invite invented evidence.',
        scaffold: 'Task: …\nApproved material: …\nOutput: …\nWhen evidence is thin: …\nDo not: …',
        example: 'Using only these redacted notes, list recurring issues and supporting note IDs. Write “insufficient evidence” for a theme found only once. Do not infer demographics or fabricate quotes.',
      },
      {
        title: 'Write the release gate',
        instruction: 'Define at least three checks before anyone uses the output. Include who signs off and what would stop publication.',
        scaffold: 'Source accuracy: …\nPrivacy: …\nCoverage or bias: …\nDecision owner and stop rule: …',
        example: 'Match each claim to an original note, check for identifying details, and examine missing customer groups. The research lead blocks release if an important claim lacks evidence.',
      },
    ],
    criteria: [
      'A responsible person owns consequential decisions.',
      'Sensitive data is withheld or handled under approved policy.',
      'The prompt requests evidence and explicitly marks uncertainty.',
      'The release gate could catch errors before they cause harm.',
    ],
    pitfalls: ['Confusing fluent text with verified facts.', 'Assuming an apparently anonymous note is harmless to share.', 'Asking the AI to be its own only reviewer.'],
    revisit: 'After your next AI-assisted task, identify one unsupported claim you caught and improve the verification gate.',
  },
  {
    slug: 'claim-to-decision', skillSlug: 'critical-thinking', skillName: 'Critical Thinking',
    title: 'The Claim-to-Decision Workshop',
    description: 'Investigate a persuasive claim, test alternative explanations and recommend a proportionate next step.',
    scenario: 'A manager says, “Productivity fell after we introduced flexible hours, so flexible hours are the problem.” You have a weekly report but no controlled comparison.',
    deliverable: 'A short decision memo separating observation, explanation, uncertainty and a testable action.',
    estimatedMinutes: 20, xp: 60,
    steps: [
      {
        title: 'Audit the claim',
        instruction: 'Rewrite it as an observable statement. Identify the measure, period, comparison and missing evidence.',
        scaffold: 'Observed change: …\nClaimed cause: …\nImportant missing comparison: …',
        example: 'Throughput fell 8% in the four weeks after flexible hours began. Timing is observed; cause is not established. Check workloads, staffing, outages and prior seasonal patterns.',
      },
      {
        title: 'Consider competing explanations',
        instruction: 'List three plausible hypotheses, including explanations that contradict the manager’s story. State what data could distinguish them.',
        scaffold: 'Hypothesis A and evidence: …\nHypothesis B and evidence: …\nHypothesis C and evidence: …',
        example: 'Scheduling gaps: compare handoff delays. More complex requests: compare workload mix. Software outage: check incident logs. Flexible hours could matter but are not the only explanation.',
      },
      {
        title: 'Recommend a reversible test',
        instruction: 'Propose a small experiment with an owner, timeframe, measure and explicit reason to stop or revise the plan.',
        scaffold: 'Test: …\nOwner and duration: …\nSuccess measure: …\nStop condition and risk: …',
        example: 'For two weeks, retain flexible hours but add one shared handoff window for one team. Compare cycle time and missed handoffs against a similar team; stop if coverage deteriorates.',
      },
    ],
    criteria: [
      'I distinguish a correlation or sequence from a proven cause.',
      'I considered several plausible explanations.',
      'I named measurable outcomes and limitations.',
      'The recommended step is reversible and proportionate.',
    ],
    pitfalls: ['Starting with a favorite conclusion.', 'Treating one metric as the entire story.', 'Running a test without saying what would change your mind.'],
    revisit: 'One week later, revisit your strongest hypothesis. Which new evidence would make you change your conclusion?',
  },
];

export function getAllWorkshops() { return workshops; }
export function getWorkshop(slug: string) { return workshops.find((item) => item.slug === slug) ?? null; }
export function getWorkshopForSkill(skillSlug: string) { return workshops.find((item) => item.skillSlug === skillSlug) ?? null; }
