import type { SkillIntelligenceBrief } from './skill-intelligence';

const reviewedAt = '2026-09-09';

const sources = {
  peopleAnalytics: {
    title: 'People analytics',
    publisher: 'CIPD',
    url: 'https://www.cipd.org/en/knowledge/factsheets/analytics-factsheet/',
    publishedAt: '2025-02-07',
  },
  engagement: {
    title: 'Employee engagement and motivation',
    publisher: 'CIPD',
    url: 'https://www.cipd.org/en/knowledge/factsheets/engagement-factsheet/',
    publishedAt: '2025-07-23',
  },
  employeeExperience2026: {
    title: '2026 State of the Workplace: Insights to Shape the Future of Work',
    publisher: 'SHRM',
    url: 'https://www.shrm.org/in/topics-tools/research/state-of-the-workplace-summary-and-report',
    publishedAt: '2026-01-08',
  },
  hris2026: {
    title: 'Modernizing Your HRIS: 11 Foundational Functional Capabilities',
    publisher: 'SHRM',
    url: 'https://www.shrm.org/in/topics-tools/employment-law-compliance/modernizing-hris-11-foundational-functional-capabilities',
    publishedAt: '2026-08-25',
  },
  digitalLearning: {
    title: 'Associate Diploma in People Management: technology in learning and development',
    publisher: 'CIPD',
    url: 'https://www.cipd.org/globalassets/media/marketing/learning/cipd-qualifications/cipd-qualifications-regulatory-information/new-level-5-associate-diploma-in-people-management-v2.2_tcm18-88827.pdf',
    publishedAt: '2024-06-01',
  },
};

export const peopleHrSkillIntelligenceBriefs: Record<string, SkillIntelligenceBrief> = {
  'employee-experience': {
    reviewedAt,
    signal: 'Employee experience is becoming a work-system priority, not a perks program',
    summary:
      'Current workplace research places employee experience near the centre of HR priorities as organizations manage AI adoption, uncertainty, wellbeing, retention, and changing worker expectations. The useful unit of analysis is the actual experience of work: leadership, tools, workload, access, communication, trust, and the moments where organizational systems create or remove friction.',
    action:
      'Pick one employee journey such as onboarding or a technology rollout. Map the three highest-friction moments, identify the policy, tool, handoff, or management practice behind each one, and choose one change you can measure.',
    sources: [sources.employeeExperience2026],
  },
  'people-analytics': {
    reviewedAt,
    signal: 'The strongest people analytics starts with a business decision, not a dashboard',
    summary:
      'CIPD frames people analytics as using people data to solve business problems and stresses the difference between descriptive, predictive, and prescriptive analysis. More advanced methods are not automatically more useful; data ownership, quality, correlation-versus-causation judgment, and a clear decision question determine whether analysis creates value.',
    action:
      'Take one workforce metric you report today and write the decision it is supposed to inform, its exact definition, one plausible alternative explanation for the pattern, and the additional evidence you would need before recommending action.',
    sources: [sources.peopleAnalytics],
  },
  hris: {
    reviewedAt,
    signal: 'HRIS is becoming governed workforce infrastructure rather than an administrative database',
    summary:
      'Modern HRIS platforms centralize employee information, automate workflows, support secure self-service, and feed reporting and analytics. As more HR work becomes automated, the professional advantage shifts toward data ownership, process design, role-based access, testing, reconciliation, integration discipline, and deciding where human review still belongs.',
    action:
      'Choose one HR workflow and document its source-of-truth fields, owner, approvals, permissions, integrations, exception cases, and reconciliation check. Any box you cannot fill in is a governance gap worth investigating.',
    sources: [sources.hris2026],
  },
  'learning-management-systems': {
    reviewedAt,
    signal: 'Learning platforms create value when they improve access, application, and evidence—not just completions',
    summary:
      'CIPD learning standards place LMS and LXP systems within a broader digital-learning ecosystem that includes virtual classrooms, collaboration, mobile access, open resources, and AI. Platform choices should account for accessibility, security, learner self-direction, stakeholder and vendor relationships, and whether the learning design actually supports capability in the workplace.',
    action:
      'Audit one course from assignment to application. Check access, metadata, completion logic, assessment quality, accessibility, and what evidence exists that the learner can use the skill after the course is marked complete.',
    sources: [sources.digitalLearning],
  },
  'employee-engagement': {
    reviewedAt,
    signal: 'Engagement becomes more actionable when the construct and work condition are specific',
    summary:
      'CIPD distinguishes employee engagement from job quality, management action, and related concepts such as satisfaction or commitment. It also cautions that much of the engagement-performance evidence is correlational. Useful engagement work therefore combines credible measurement with employee voice and focuses on conditions such as job design, autonomy, management support, relationships, psychological safety, and workload.',
    action:
      'Choose one engagement survey item and name the exact work condition it is meant to represent. Pair the score with one qualitative signal and one operational indicator before deciding what action to take.',
    sources: [sources.engagement],
  },
};
