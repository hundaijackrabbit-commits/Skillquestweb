import type { Skill } from '@/lib/types';

export type KnowledgeCheck = {
  id: string;
  label: string;
  title: string;
  skillSlug: string;
  question: string;
  options: [string, string, string];
  correctIndex: number;
  explanation: string;
  xp: number;
  continueHref?: string;
  continueLabel?: string;
};

const checks: Record<string, KnowledgeCheck> = {
  'ai-literacy': {
    id: 'ai-accountability-v1',
    label: 'AI judgment check',
    title: 'Who owns the outcome?',
    skillSlug: 'ai-literacy',
    question: 'An AI produces a polished recommendation for changing a hiring rule. What should happen next?',
    options: [
      'Publish it because the language sounds confident.',
      'Have a qualified person verify the evidence, assess consequences, and own the decision.',
      'Ask the same system whether its first answer was correct.',
    ],
    correctIndex: 1,
    explanation: 'Fluency is not authority. Consequential recommendations need independent evidence checks and a responsible human decision owner.',
    xp: 15,
    continueHref: '/skills/ai-literacy',
    continueLabel: 'Open AI Literacy',
  },
  'critical-thinking': {
    id: 'critical-causation-v1',
    label: 'Reasoning check',
    title: 'Test the hidden assumption',
    skillSlug: 'critical-thinking',
    question: 'Sales fell immediately after a redesign. Which claim is best supported by that fact alone?',
    options: [
      'The redesign definitely caused the decline.',
      'The decline occurred after the redesign; other possible causes still need testing.',
      'The redesign had no effect on sales.',
    ],
    correctIndex: 1,
    explanation: 'Sequence establishes timing, not causation. A stronger conclusion requires evidence that addresses plausible competing explanations.',
    xp: 15,
    continueHref: '/skills/critical-thinking',
    continueLabel: 'Practise Critical Thinking',
  },
  communication: {
    id: 'communication-loop-v1',
    label: 'Communication check',
    title: 'Close the loop',
    skillSlug: 'communication',
    question: 'Which meeting close is least likely to create ownership confusion?',
    options: [
      'Great discussion. Let me know if anything comes up.',
      'We all know what needs to happen next.',
      'Maya sends the draft by noon; Theo verifies the figures before client review.',
    ],
    correctIndex: 2,
    explanation: 'The strongest close names the output, owner, sequence, and timing instead of relying on implied understanding.',
    xp: 15,
    continueHref: '/skills/communication',
    continueLabel: 'Open Communication',
  },
  'data-analysis': {
    id: 'data-measure-v1',
    label: 'Data judgment check',
    title: 'Choose the right evidence',
    skillSlug: 'data-analysis',
    question: 'Which result most directly supports the claim that a training module improved comprehension?',
    options: [
      'The page received 2,000 views.',
      'Learners performed better on a relevant application task than before training.',
      'The average visit lasted six minutes.',
    ],
    correctIndex: 1,
    explanation: 'An application task measures the named capability more directly than attention, traffic, or time on page.',
    xp: 15,
    continueHref: '/skills/data-analysis',
    continueLabel: 'Practise Data Analysis',
  },
  'cybersecurity-awareness': {
    id: 'cyber-verify-v1',
    label: 'Security check',
    title: 'Pause before acting',
    skillSlug: 'cybersecurity-awareness',
    question: 'A familiar vendor emails an urgent request to change its payment account. What is the safest first move?',
    options: [
      'Reply to the email and ask whether it is legitimate.',
      'Use a previously trusted channel to verify the request and follow the normal approval process.',
      'Make the change quickly, then confirm afterward.',
    ],
    correctIndex: 1,
    explanation: 'A separate trusted channel avoids relying on contact details that a possible attacker may control.',
    xp: 15,
    continueHref: '/skills/cybersecurity-awareness',
    continueLabel: 'Open Cybersecurity Awareness',
  },
  'team-leadership': {
    id: 'leadership-rights-v1',
    label: 'Leadership check',
    title: 'Make decision rights visible',
    skillSlug: 'team-leadership',
    question: 'What is most important before an AI-assisted workflow handles consequential work?',
    options: [
      'Give the tool the broadest possible access.',
      'Define who sets direction, verifies quality, owns the decision, and can stop the process.',
      'Remove human review so the workflow remains fast.',
    ],
    correctIndex: 1,
    explanation: 'Clear decision rights preserve accountability and give the team a known review and escalation path.',
    xp: 15,
    continueHref: '/skills/team-leadership',
    continueLabel: 'Practise Team Leadership',
  },
  adaptability: {
    id: 'adaptability-test-v1',
    label: 'Adaptability check',
    title: 'Learn without overcommitting',
    skillSlug: 'adaptability',
    question: 'Evidence is incomplete and a plan may need to change. Which response creates the most useful learning?',
    options: [
      'Wait until every uncertainty disappears.',
      'Replace the whole system immediately.',
      'Run a small reversible test with a result that would change the plan.',
    ],
    correctIndex: 2,
    explanation: 'A reversible test creates evidence while limiting the cost of a wrong assumption.',
    xp: 15,
    continueHref: '/skills/adaptability',
    continueLabel: 'Open Adaptability',
  },
  'project-management': {
    id: 'project-dependency-v1',
    label: 'Project check',
    title: 'Expose the dependency',
    skillSlug: 'project-management',
    question: 'Which description makes a project dependency actionable?',
    options: [
      'Legal review could be a problem.',
      'Approval is needed sometime before launch.',
      'Legal owns the disclosure approval due Friday; without it, testing pauses Monday.',
    ],
    correctIndex: 2,
    explanation: 'An actionable dependency identifies the input, owner, due date, and consequence of delay.',
    xp: 15,
    continueHref: '/skills/project-management',
    continueLabel: 'Practise Project Management',
  },
  'active-listening': {
    id: 'listening-confirm-v1',
    label: 'Listening check',
    title: 'Verify the meaning',
    skillSlug: 'active-listening',
    question: 'Which response best checks whether you understood a stakeholder’s concern?',
    options: [
      'I understand exactly what you mean.',
      'So protecting the launch date matters more than keeping every feature—is that the trade-off?',
      'Here is the solution I think you should use.',
    ],
    correctIndex: 1,
    explanation: 'A specific paraphrase gives the other person something they can confirm or correct before action begins.',
    xp: 15,
    continueHref: '/skills/active-listening',
    continueLabel: 'Open Active Listening',
  },
  'professional-writing': {
    id: 'writing-criteria-v1',
    label: 'Writing check',
    title: 'Write for execution',
    skillSlug: 'professional-writing',
    question: 'Which addition most improves a brief another person must execute?',
    options: [
      'More descriptive adjectives.',
      'Acceptance criteria and a named source of truth.',
      'A longer introduction about the project history.',
    ],
    correctIndex: 1,
    explanation: 'Acceptance criteria and authoritative sources reduce inference and make the result easier to review.',
    xp: 15,
    continueHref: '/skills/professional-writing',
    continueLabel: 'Practise Professional Writing',
  },
  resilience: {
    id: 'resilience-system-v1',
    label: 'Resilience check',
    title: 'Recover and improve the system',
    skillSlug: 'resilience',
    question: 'The same handoff fails for a third week. Which response demonstrates sustainable resilience?',
    options: [
      'Work later each week to absorb the failure.',
      'Recover, identify the recurring cause, and change the handoff or capacity rule.',
      'Ignore it so the team appears calm.',
    ],
    correctIndex: 1,
    explanation: 'Resilience includes recovery, learning, and reducing repeat exposure—not silently tolerating a broken process.',
    xp: 15,
    continueHref: '/skills/resilience',
    continueLabel: 'Open Resilience',
  },
  'systems-thinking': {
    id: 'systems-feedback-v1',
    label: 'Systems check',
    title: 'Look beyond the local metric',
    skillSlug: 'systems-thinking',
    question: 'Support replies become faster, but repeat contacts rise. What should the team examine next?',
    options: [
      'Only the original response-time target.',
      'Whether faster replies reduced resolution quality and shifted work downstream.',
      'How to send the first reply even faster.',
    ],
    correctIndex: 1,
    explanation: 'A local improvement can worsen the whole system. Feedback and downstream effects reveal whether value actually increased.',
    xp: 15,
    continueHref: '/skills/systems-thinking',
    continueLabel: 'Practise Systems Thinking',
  },
  'time-management': {
    id: 'time-focus-v1',
    label: 'Focus check',
    title: 'Protect an outcome',
    skillSlug: 'time-management',
    question: 'Which focus block is most likely to produce a useful result?',
    options: [
      'Work on the project for a while and check every notification.',
      'Block 45 minutes, silence non-urgent channels, and define the deliverable in advance.',
      'Keep all tasks open so priorities remain flexible.',
    ],
    correctIndex: 1,
    explanation: 'A protected window works better when it ends in a defined output and limits avoidable switching.',
    xp: 15,
    continueHref: '/skills/time-management',
    continueLabel: 'Open Time Management',
  },
};

const blogSkillMap: Record<string, string> = {
  'ai-skills-2024-guide': 'ai-literacy',
  'the-future-of-work-skills-for-the-next-decade': 'adaptability',
  'communication-skills-that-drive-career-success': 'communication',
  'data-skills-career-growth': 'data-analysis',
  'cybersecurity-awareness-for-everyone': 'cybersecurity-awareness',
  'leadership-skills-guide-2024': 'team-leadership',
};

export function getKnowledgeCheckForSkill(skillSlug: string) {
  return checks[skillSlug] ?? null;
}

export function getKnowledgeCheckForBlog(blogSlug: string) {
  const skillSlug = blogSkillMap[blogSlug];
  if (!skillSlug) return null;
  const check = checks[skillSlug];
  return check ? { ...check, id: `article-${blogSlug}-${check.id}`, label: 'Article knowledge check' } : null;
}

export function getDailyKnowledgeCheck(date = new Date()) {
  const ordered = Object.values(checks);
  const dayNumber = Math.floor(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 86_400_000);
  const check = ordered[Math.abs(dayNumber) % ordered.length];
  const dateKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  return { ...check, id: `daily-${dateKey}-${check.id}`, label: 'Daily 60-second challenge', xp: 20 };
}

function hash(value: string) {
  let result = 0;
  for (const character of value) result = (result * 31 + character.charCodeAt(0)) >>> 0;
  return result;
}

export function buildDefinitionKnowledgeCheck(
  scope: { type: 'career' | 'industry' | 'path' | 'topic'; slug: string; name: string },
  skillCandidates: Skill[],
): KnowledgeCheck | null {
  const skills = [...new Map(skillCandidates.map((skill) => [skill.name, skill])).values()];
  if (skills.length < 3) return null;

  const correctPosition = hash(`${scope.type}:${scope.slug}`) % skills.length;
  const correct = skills[correctPosition];
  const distractors = skills.filter((_, index) => index !== correctPosition).slice(0, 2);
  const unrotated = [correct, ...distractors];
  const rotation = hash(`${scope.slug}:rotation`) % 3;
  const choices = [...unrotated.slice(rotation), ...unrotated.slice(0, rotation)];
  const correctIndex = choices.findIndex((skill) => skill.slug === correct.slug);

  return {
    id: `definition-${scope.type}-${scope.slug}-${correct.slug}-v1`,
    label: `${scope.type === 'path' ? 'Path checkpoint' : `${scope.name} connection check`}`,
    title: 'Match the skill to its meaning',
    skillSlug: correct.slug,
    question: `Which skill best matches this description? “${correct.shortDefinition}”`,
    options: choices.map((skill) => skill.name) as [string, string, string],
    correctIndex,
    explanation: `This definition describes ${correct.name}. The match matters because the skill is connected to this ${scope.type}.`,
    xp: 15,
    continueHref: `/skills/${correct.slug}`,
    continueLabel: `Explore ${correct.name}`,
  };
}

