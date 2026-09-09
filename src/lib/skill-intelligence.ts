import { peopleHrSkillIntelligenceBriefs } from './skill-intelligence-people-hr';

export type SkillEvidenceSource = {
  title: string;
  publisher: string;
  url: string;
  publishedAt: string;
};

export type SkillIntelligenceBrief = {
  reviewedAt: string;
  signal: string;
  summary: string;
  action: string;
  sources: SkillEvidenceSource[];
};

const sources = {
  wefSkills: {
    title: 'Future of Jobs Report 2025: Skills outlook',
    publisher: 'World Economic Forum',
    url: 'https://www.weforum.org/publications/the-future-of-jobs-report-2025/in-full/3-skills-outlook/',
    publishedAt: '2025-01-07',
  },
  microsoft2026: {
    title: '2026 Work Trend Index: Agents, human agency, and opportunity',
    publisher: 'Microsoft WorkLab',
    url: 'https://www.microsoft.com/en-us/worklab/work-trend-index/agents-human-agency-and-the-opportunity-for-every-organization',
    publishedAt: '2026-05-05',
  },
  microsoftWorkday: {
    title: 'Breaking down the infinite workday',
    publisher: 'Microsoft WorkLab',
    url: 'https://www.microsoft.com/en-us/worklab/work-trend-index/breaking-down-infinite-workday',
    publishedAt: '2025-06-17',
  },
  oecdAi: {
    title: 'Skills in the AI age',
    publisher: 'OECD',
    url: 'https://www.oecd.org/content/dam/oecd/en/publications/reports/2026/07/skills-in-the-ai-age_e8d8c1e6/972bd15e-en.pdf',
    publishedAt: '2026-07-06',
  },
  anthropicCadence: {
    title: 'Anthropic Economic Index: Cadences',
    publisher: 'Anthropic',
    url: 'https://www.anthropic.com/research/economic-index-june-2026-report',
    publishedAt: '2026-06-26',
  },
  nistGenAi: {
    title: 'Generative AI Profile for the AI Risk Management Framework',
    publisher: 'NIST',
    url: 'https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence',
    publishedAt: '2024-07-26',
  },
  cisaSecure: {
    title: 'Secure Our World',
    publisher: 'CISA',
    url: 'https://www.cisa.gov/secure-our-world',
    publishedAt: '2026-08-14',
  },
} satisfies Record<string, SkillEvidenceSource>;

const reviewedAt = '2026-08-14';

const briefs: Record<string, SkillIntelligenceBrief> = {
  'ai-literacy': {
    reviewedAt,
    signal: 'AI fluency is moving from tool use to accountable delegation',
    summary:
      'The current shift is toward human–agent workflows. The differentiator is no longer producing a plausible first draft; it is framing the task, setting boundaries, checking evidence, and retaining responsibility for the result.',
    action:
      'Take one recurring task and mark four points explicitly: what the AI may draft, what evidence it must use, what a person must verify, and who owns the final decision.',
    sources: [sources.microsoft2026, sources.oecdAi, sources.nistGenAi],
  },
  'critical-thinking': {
    reviewedAt,
    signal: 'Analytical judgment remains a top employer priority',
    summary:
      'Employer research still places analytical thinking at the centre of effective work, while newer AI research suggests that tacit and context-specific expertise remains difficult to reproduce. Strong judgment now includes evaluating machine-generated claims as well as human ones.',
    action:
      'For the next recommendation you receive, separate the claim, supporting evidence, hidden assumption, and decision cost before accepting it.',
    sources: [sources.wefSkills, sources.anthropicCadence],
  },
  communication: {
    reviewedAt,
    signal: 'Clarity matters more as teams coordinate with people and agents',
    summary:
      'Work is increasingly distributed across functions, time zones, and automated systems. Clear outcomes, owners, constraints, and escalation points reduce the interpretation work that otherwise becomes delay or rework.',
    action:
      'Rewrite one live request so it names the outcome, owner, deadline, constraints, and confirmation method in a form another person can act on without a follow-up meeting.',
    sources: [sources.microsoft2026, sources.microsoftWorkday],
  },
  'data-analysis': {
    reviewedAt,
    signal: 'AI and big-data capability is rising, but interpretation is the durable advantage',
    summary:
      'AI and big data remain among the fastest-growing skill areas. The useful professional contribution is not merely generating a chart; it is selecting a valid measure, detecting uncertainty, and connecting the result to a proportionate decision.',
    action:
      'Choose one dashboard metric and write what it demonstrates, what it cannot demonstrate, and what additional evidence would change the decision attached to it.',
    sources: [sources.wefSkills, sources.oecdAi],
  },
  'cybersecurity-awareness': {
    reviewedAt,
    signal: 'Everyday identity and message checks remain the first line of defence',
    summary:
      'Security awareness is operational behaviour: recognizing and reporting suspicious messages, using strong unique credentials, enabling multifactor authentication, and following approved handling rules for sensitive information.',
    action:
      'Audit one important account today: replace a reused password, enable the strongest available MFA method, and confirm how you would report a suspicious sign-in.',
    sources: [sources.cisaSecure],
  },
  'team-leadership': {
    reviewedAt,
    signal: 'Leadership is shifting toward work design and responsible delegation',
    summary:
      'Leadership and social influence continue to rise in employer priorities. In AI-enabled teams, the role also includes deciding which work should be assisted, establishing review standards, and protecting human agency when tools take on execution.',
    action:
      'Map one team workflow by decision rights: who sets the goal, who or what executes, who reviews quality, and who can stop or escalate the work.',
    sources: [sources.wefSkills, sources.microsoft2026],
  },
  adaptability: {
    reviewedAt,
    signal: 'Adaptability is becoming a repeatable operating practice',
    summary:
      'Employers continue to prioritize resilience, flexibility, and agility as technology changes tasks. Useful adaptability means detecting a changed condition early, updating a plan, and learning from a small reversible test—not reacting to every new trend.',
    action:
      'Name one assumption in your current plan that may expire. Define the signal that would invalidate it and the smallest response you could test within a week.',
    sources: [sources.wefSkills, sources.oecdAi],
  },
  'project-management': {
    reviewedAt,
    signal: 'Coordination overload makes explicit project boundaries more valuable',
    summary:
      'Digital work can produce dense streams of meetings, messages, and last-minute changes. Strong project management protects decision time by making scope, ownership, dependencies, risks, and change rules visible before urgency takes over.',
    action:
      'For one active project, publish a one-screen control panel containing the outcome, owner, next milestone, largest risk, blocked dependency, and latest decision.',
    sources: [sources.microsoftWorkday, sources.wefSkills],
  },
  'active-listening': {
    reviewedAt,
    signal: 'Listening is a verification skill in high-volume work',
    summary:
      'When communication is fragmented across meetings and channels, repeating words is not enough. Active listening checks the intended outcome, underlying concern, and constraints before people or automated systems act on an incomplete interpretation.',
    action:
      'In your next consequential conversation, summarize the other person’s goal and concern, then ask them to correct your interpretation before proposing a solution.',
    sources: [sources.microsoftWorkday],
  },
  'professional-writing': {
    reviewedAt,
    signal: 'Useful writing increasingly doubles as an execution specification',
    summary:
      'Written instructions now guide both colleagues and automated tools. The strongest documents state the outcome, audience, source of truth, constraints, decision owner, and next action while making uncertainty visible.',
    action:
      'Take one recurring brief and add acceptance criteria plus a source-of-truth link. Ask a colleague to identify anything they would still need to infer.',
    sources: [sources.microsoft2026, sources.nistGenAi],
  },
  resilience: {
    reviewedAt,
    signal: 'Resilience remains central, but should not mean tolerating broken systems',
    summary:
      'Employer surveys place resilience and flexibility near the top of current core skills. At work, sustainable resilience combines recovery habits with early risk communication, realistic capacity choices, and changes to the conditions creating repeated strain.',
    action:
      'After the next setback, write one recovery action, one lesson, and one system change that would make the same disruption less costly next time.',
    sources: [sources.wefSkills, sources.microsoftWorkday],
  },
  'systems-thinking': {
    reviewedAt,
    signal: 'Connected decisions matter as automation changes whole workflows',
    summary:
      'AI adoption affects handoffs, incentives, controls, and job design—not only individual tasks. Systems thinking helps teams anticipate second-order effects and find the constraint that determines whether a local improvement creates real value.',
    action:
      'Diagram one workflow with inputs, decisions, handoffs, feedback, and failure points. Identify where faster output could create slower or riskier downstream work.',
    sources: [sources.microsoft2026, sources.oecdAi],
  },
  'time-management': {
    reviewedAt,
    signal: 'Attention protection is now part of time management',
    summary:
      'Microsoft’s workplace telemetry shows how meetings, messages, and edits can fracture the day. Current time management is less about filling every minute and more about creating protected decision windows, clear response norms, and fewer avoidable handoffs.',
    action:
      'Block one focus window, silence non-urgent channels, and define the single deliverable that must exist when the window ends. Review what interrupted it afterward.',
    sources: [sources.microsoftWorkday],
  },
};

export function getSkillIntelligenceBrief(skillSlug: string) {
  return briefs[skillSlug] ?? peopleHrSkillIntelligenceBriefs[skillSlug] ?? null;
}
