export type CourseQuiz = {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

export type CourseLesson = {
  id: string;
  title: string;
  objective: string;
  concept: string;
  example: string;
  practice: string;
  quiz: CourseQuiz;
};

export type SkillCourse = {
  skillSlug: string;
  title: string;
  description: string;
  estimatedMinutes: number;
  pointsPerLesson: number;
  lessons: CourseLesson[];
};

const courses: SkillCourse[] = [
  {
    skillSlug: 'communication',
    title: 'Clear Communication Sprint',
    description:
      'Turn vague workplace messages into clear, useful communication through three short practice rounds.',
    estimatedMinutes: 12,
    pointsPerLesson: 40,
    lessons: [
      {
        id: 'lead-with-outcome',
        title: 'Lead with the outcome',
        objective: 'Make the purpose of a message obvious within its first sentence.',
        concept:
          'People understand messages faster when they know the requested outcome before they receive the supporting detail. State the decision, request, or update first; then add context.',
        example:
          'Instead of “I reviewed the launch notes and noticed a few timing issues,” write “Please approve moving the launch to Thursday; the testing window is two days shorter than planned.”',
        practice:
          'Rewrite one message in your sent folder so its first sentence contains the decision, request, or update.',
        quiz: {
          question: 'Which opening gives the reader the clearest next step?',
          options: [
            'I wanted to follow up about the report we discussed yesterday.',
            'Please send the final report by 3 p.m. so finance can include it in today’s review.',
            'There are several things happening with the report and the finance review.',
          ],
          correctIndex: 1,
          explanation:
            'It names the action, deadline, and reason immediately, so the reader does not have to infer what to do.',
        },
      },
      {
        id: 'match-the-audience',
        title: 'Match the audience',
        objective: 'Choose detail and language based on what the other person needs to decide.',
        concept:
          'Clear communication is audience-specific. A specialist may need technical detail; an executive usually needs the consequence, options, and recommendation. Relevance is more useful than completeness.',
        example:
          'A developer receives the error conditions and reproduction steps. A project lead receives the delivery risk, affected users, and recommended decision.',
        practice:
          'Take one update and write two versions: one for a teammate doing the work and one for a leader approving it.',
        quiz: {
          question: 'What should determine how much detail you include?',
          options: [
            'The amount of work you put into the message.',
            'The reader’s role and the decision or action they need to take.',
            'Using the same template for every audience.',
          ],
          correctIndex: 1,
          explanation:
            'The right level of detail depends on the reader’s context and what the message enables them to do.',
        },
      },
      {
        id: 'close-the-loop',
        title: 'Close the loop',
        objective: 'Confirm shared understanding instead of assuming a message landed correctly.',
        concept:
          'Communication is complete when meaning is shared, not merely when words are sent. For consequential work, confirm the owner, next action, and timing.',
        example:
          'End a meeting with: “Maya owns the revised draft, I will review it, and we will send it by Tuesday at noon.”',
        practice:
          'At your next meeting, summarize the owner, action, and deadline before everyone leaves.',
        quiz: {
          question: 'Which closing best prevents a coordination failure?',
          options: [
            'Let me know if anyone has questions.',
            'Thanks everyone—we covered a lot.',
            'Jordan will send the customer notes by noon Friday; Priya will turn them into the revised brief.',
          ],
          correctIndex: 2,
          explanation:
            'It confirms ownership, sequence, and timing rather than relying on people to remember implied responsibilities.',
        },
      },
    ],
  },
  {
    skillSlug: 'critical-thinking',
    title: 'Critical Thinking Sprint',
    description:
      'Practice separating claims, evidence, and assumptions before making a professional judgment.',
    estimatedMinutes: 14,
    pointsPerLesson: 40,
    lessons: [
      {
        id: 'claim-evidence-assumption',
        title: 'Separate the parts',
        objective: 'Distinguish a claim from its evidence and hidden assumptions.',
        concept:
          'A claim says what someone believes is true. Evidence supports or weakens that claim. An assumption connects the two but may be unstated. Strong analysis makes all three visible.',
        example:
          '“Customers want feature X because five interviewees requested it” assumes those interviewees represent the customers most likely to use or buy the product.',
        practice:
          'Choose one recommendation from your work and write three lines: claim, evidence, and assumption.',
        quiz: {
          question: 'In “Sales fell after the redesign, so the redesign caused the decline,” what is the hidden assumption?',
          options: [
            'Sales fell.',
            'No other meaningful factor changed during the same period.',
            'A redesign took place.',
          ],
          correctIndex: 1,
          explanation:
            'The sequence is evidence of timing, but causation requires ruling out other plausible causes.',
        },
      },
      {
        id: 'test-the-source',
        title: 'Test the evidence',
        objective: 'Judge evidence by relevance, reliability, and representativeness.',
        concept:
          'More evidence is not automatically better evidence. Ask whether the source can know the answer, whether the measure matches the claim, and whether the sample represents the situation.',
        example:
          'A high number of page views can demonstrate attention, but it does not by itself demonstrate comprehension, satisfaction, or purchase intent.',
        practice:
          'For one metric you use, write what it demonstrates—and two things it cannot demonstrate.',
        quiz: {
          question: 'Which evidence best supports the claim that a training module improved comprehension?',
          options: [
            'The module received 2,000 page views.',
            'Learners spent an average of six minutes on the page.',
            'Learners performed better on an application task than they did before the module.',
          ],
          correctIndex: 2,
          explanation:
            'An application task measures the capability named in the claim more directly than attention or time-on-page.',
        },
      },
      {
        id: 'decide-with-uncertainty',
        title: 'Decide under uncertainty',
        objective: 'Make a proportionate decision without pretending uncertainty is gone.',
        concept:
          'Good judgment does not require perfect information. Compare options, name the largest uncertainty, consider the cost of being wrong, and choose the next reversible step when possible.',
        example:
          'Instead of rebuilding an entire onboarding flow from survey comments, test the highest-confidence change with a small group and define what result would justify expanding it.',
        practice:
          'For a current decision, identify one reversible test and one result that would change your direction.',
        quiz: {
          question: 'When evidence is incomplete, what is usually the strongest next move?',
          options: [
            'Wait until uncertainty disappears completely.',
            'Choose the loudest opinion and move quickly.',
            'Run a proportionate, reversible test with a defined success signal.',
          ],
          correctIndex: 2,
          explanation:
            'A reversible test creates information while limiting the cost of a mistaken assumption.',
        },
      },
    ],
  },
  {
    skillSlug: 'ai-literacy',
    title: 'Practical AI Literacy Sprint',
    description:
      'Learn when to use AI, how to give it useful context, and how to verify its output responsibly.',
    estimatedMinutes: 13,
    pointsPerLesson: 40,
    lessons: [
      {
        id: 'capability-fit',
        title: 'Match AI to the task',
        objective: 'Identify tasks where AI can accelerate work without owning the judgment.',
        concept:
          'AI is strongest when generating options, transforming formats, finding patterns, or producing a first draft. Humans should retain accountability for goals, sensitive context, verification, and consequential decisions.',
        example:
          'Use AI to produce three structures for a client update. Choose and revise the structure yourself using facts the model cannot know.',
        practice:
          'Divide one workflow into “AI can assist,” “human must verify,” and “human must decide.”',
        quiz: {
          question: 'Which use keeps human accountability in the right place?',
          options: [
            'Let AI make a final hiring decision from résumés.',
            'Ask AI for interview themes, then have a qualified person verify evidence and make the decision.',
            'Publish an AI-generated policy without review.',
          ],
          correctIndex: 1,
          explanation:
            'AI assists with synthesis while a responsible person verifies the evidence and owns the consequential decision.',
        },
      },
      {
        id: 'context-and-constraints',
        title: 'Give useful context',
        objective: 'Improve an AI request with a goal, audience, source material, and constraints.',
        concept:
          'Useful prompts define the job clearly. Include the desired outcome, audience, relevant facts, constraints, and a way to evaluate the result. More words do not help unless they reduce ambiguity.',
        example:
          '“Summarize these interview notes for a product manager. Group findings by repeated user problem, cite the note number, and mark claims supported by fewer than three interviews.”',
        practice:
          'Rewrite one vague prompt using five fields: goal, audience, context, constraints, and success criteria.',
        quiz: {
          question: 'Which addition most improves verifiability?',
          options: [
            'Make it amazing and highly professional.',
            'Cite the supplied source section beside each factual claim.',
            'Use more adjectives throughout the answer.',
          ],
          correctIndex: 1,
          explanation:
            'Source references make it easier for a person to inspect whether the output is grounded in the supplied material.',
        },
      },
      {
        id: 'verify-and-protect',
        title: 'Verify and protect',
        objective: 'Check important output and avoid exposing information that should remain private.',
        concept:
          'Fluent output can still be wrong. Verify important claims against reliable sources, inspect calculations, and follow workplace rules before sharing personal, confidential, or regulated information with an AI system.',
        example:
          'For a market statistic, locate the original dataset and confirm the date, geography, definition, and calculation rather than trusting an uncited number.',
        practice:
          'Create a three-item verification checklist for the kind of AI output you use most often.',
        quiz: {
          question: 'What is the safest response to a confident, uncited statistic from an AI tool?',
          options: [
            'Use it because confidence indicates accuracy.',
            'Round the number so it is less specific.',
            'Verify it against a reliable original source before using it.',
          ],
          correctIndex: 2,
          explanation:
            'Tone is not evidence. Important factual claims should be checked against an appropriate source.',
        },
      },
    ],
  },
  {
    skillSlug: 'data-analysis',
    title: 'Decision-Ready Data Sprint',
    description:
      'Move from a business question to defensible evidence, then communicate what the data can and cannot support.',
    estimatedMinutes: 15,
    pointsPerLesson: 40,
    lessons: [
      {
        id: 'decision-first',
        title: 'Start with the decision',
        objective: 'Translate a broad request into a question that data can answer usefully.',
        concept:
          'Analysis becomes useful when it is tied to a decision. Define the choice, the population or process involved, the time period, and the result that would change what someone does next.',
        example:
          'Replace “How is onboarding doing?” with “Which onboarding step is most associated with first-week abandonment among new mobile users this quarter?”',
        practice:
          'Rewrite one dashboard request as a decision question with a population, period, comparison, and next action.',
        quiz: {
          question: 'Which question gives an analyst the clearest decision context?',
          options: [
            'Can you pull some customer numbers?',
            'Which support issue drove the largest rise in repeat contacts this month, and where should we test a fix?',
            'What interesting patterns are in the database?',
          ],
          correctIndex: 1,
          explanation:
            'It defines the outcome, period, comparison, and decision the analysis is meant to inform.',
        },
      },
      {
        id: 'test-the-measure',
        title: 'Test the measure',
        objective: 'Check whether a metric represents the claim being made.',
        concept:
          'A clean calculation can still answer the wrong question. Inspect the definition, collection method, missing values, comparison group, and plausible alternative explanations before interpreting a result.',
        example:
          'A rise in average order value may reflect a price increase rather than customers buying more items. Both are valid measurements, but they support different explanations.',
        practice:
          'Choose one metric and write its definition, one known limitation, and one plausible competing explanation.',
        quiz: {
          question: 'Why can average order value rise even if customers buy fewer items?',
          options: [
            'Averages always exaggerate performance.',
            'Prices or the mix of products purchased may have changed.',
            'The result must be a calculation error.',
          ],
          correctIndex: 1,
          explanation:
            'The same metric can move because of quantity, price, product mix, or a combination of factors.',
        },
      },
      {
        id: 'communicate-uncertainty',
        title: 'Communicate the boundary',
        objective: 'Present a conclusion without hiding uncertainty or overstating causation.',
        concept:
          'Decision-ready analysis separates observation from explanation. State the result, practical consequence, confidence limits, unresolved risk, and the next evidence that would strengthen or overturn the recommendation.',
        example:
          '“Conversion rose after the change” reports sequence. “The change caused the rise” requires a design that rules out meaningful competing causes.',
        practice:
          'Add a “what this does not prove” sentence and a next-test recommendation to one recent analysis.',
        quiz: {
          question: 'Which statement is the most defensible?',
          options: [
            'The campaign caused growth because sales rose afterward.',
            'Sales rose 8% after launch; seasonality remains a plausible explanation, so we should compare matched regions next.',
            'The chart proves the strategy works everywhere.',
          ],
          correctIndex: 1,
          explanation:
            'It reports the observation, identifies an alternative explanation, and proposes a useful test.',
        },
      },
    ],
  },
  {
    skillSlug: 'cybersecurity-awareness',
    title: 'Everyday Cybersecurity Sprint',
    description:
      'Practice the small identity, message, and reporting decisions that prevent avoidable security incidents.',
    estimatedMinutes: 12,
    pointsPerLesson: 40,
    lessons: [
      {
        id: 'inspect-the-message',
        title: 'Slow down the message',
        objective: 'Recognize the combination of urgency, identity uncertainty, and unusual action in a suspicious request.',
        concept:
          'Phishing often succeeds by compressing decision time. Pause when a message creates urgency, requests credentials or money, changes a familiar process, or directs you to an unexpected link or attachment.',
        example:
          'A message that appears to come from a leader asks for an urgent gift-card purchase. Verify the request through a known channel instead of replying or using contact details in the message.',
        practice:
          'Review your organization’s phishing-reporting method and identify a trusted channel for verifying an unusual request.',
        quiz: {
          question: 'What is the strongest response to an urgent, unusual payment request?',
          options: [
            'Reply and ask whether it is legitimate.',
            'Use a known, separate channel to verify the requester and report the message if suspicious.',
            'Forward it to a colleague without context.',
          ],
          correctIndex: 1,
          explanation:
            'A separate trusted channel avoids relying on contact information controlled by a possible attacker.',
        },
      },
      {
        id: 'protect-the-account',
        title: 'Protect the account',
        objective: 'Reduce the damage a stolen password can cause.',
        concept:
          'Use a unique strong password for each important account, preferably managed by an approved password manager, and enable the strongest multifactor authentication option the service supports.',
        example:
          'If one website is breached, a unique password prevents the same credential from unlocking your email, payroll, or cloud storage.',
        practice:
          'Upgrade one important account: replace a reused password and confirm that multifactor authentication is active.',
        quiz: {
          question: 'Why should important accounts have unique passwords?',
          options: [
            'Unique passwords make usernames unnecessary.',
            'A breach at one service cannot directly expose the same password at another.',
            'They eliminate the need for multifactor authentication.',
          ],
          correctIndex: 1,
          explanation:
            'Password reuse turns one compromised service into a route to other accounts.',
        },
      },
      {
        id: 'report-and-contain',
        title: 'Report without delay',
        objective: 'Use the right escalation path after a suspicious click or sign-in.',
        concept:
          'Fast reporting gives a security team a chance to contain harm. Do not conceal a mistake or investigate beyond your role. Follow the approved process, preserve relevant details, and change credentials from a trusted device when instructed.',
        example:
          'After entering a password on a suspicious page, contact the security team immediately and describe the account, time, and action taken rather than waiting to see whether anything happens.',
        practice:
          'Find and save the official security-reporting contact or button used by your workplace or primary email provider.',
        quiz: {
          question: 'What should you do after entering credentials on a suspicious page?',
          options: [
            'Wait for evidence of account misuse.',
            'Delete your browser history and say nothing.',
            'Report it immediately through the approved channel and follow containment instructions.',
          ],
          correctIndex: 2,
          explanation:
            'Early reporting allows defenders to reset access, inspect activity, and reduce further damage.',
        },
      },
    ],
  },
  {
    skillSlug: 'project-management',
    title: 'Project Control Sprint',
    description:
      'Create enough structure to keep outcomes, decisions, dependencies, and risks visible without adding unnecessary process.',
    estimatedMinutes: 15,
    pointsPerLesson: 40,
    lessons: [
      {
        id: 'define-done',
        title: 'Define done',
        objective: 'Turn activity into a shared outcome with acceptance criteria.',
        concept:
          'A project is easier to coordinate when “done” is observable. Name the user or stakeholder outcome, the boundary of the work, the owner, the target date, and the conditions required for acceptance.',
        example:
          '“Launch the help centre” becomes “Publish the 20 highest-volume support answers, reviewed by legal and searchable from the product by September 30.”',
        practice:
          'Rewrite one project goal so a neutral reviewer could determine whether it is complete.',
        quiz: {
          question: 'Which goal has the clearest completion test?',
          options: [
            'Improve customer onboarding soon.',
            'Work on a better onboarding experience.',
            'Reduce median account-setup time from 12 to 8 minutes for new self-serve customers by October 1.',
          ],
          correctIndex: 2,
          explanation:
            'It defines the population, measure, starting point, target, and date.',
        },
      },
      {
        id: 'expose-the-dependency',
        title: 'Expose the dependency',
        objective: 'Identify the handoff most likely to control the schedule or quality.',
        concept:
          'A task list hides relationships. Map what each result depends on, who owns the input, when it is needed, and what happens if it arrives late or incomplete. Escalate before a blocked dependency becomes an emergency.',
        example:
          'Design cannot finish the flow until policy approves the required disclosure. The approval date—not the drawing effort—may control the launch.',
        practice:
          'Name the largest external dependency in one active project and confirm its owner, due date, and fallback.',
        quiz: {
          question: 'What makes a dependency actionable?',
          options: [
            'Listing it as a general concern.',
            'Naming the required input, owner, due date, impact, and fallback.',
            'Adding more internal tasks to the schedule.',
          ],
          correctIndex: 1,
          explanation:
            'Those details allow the team to monitor, escalate, or change the plan before the dependency fails.',
        },
      },
      {
        id: 'run-the-control-loop',
        title: 'Run the control loop',
        objective: 'Use a lightweight review rhythm to turn new information into explicit decisions.',
        concept:
          'Project updates should not merely recite activity. Compare actual progress with the plan, identify the most important variance, decide what changes, record the owner, and communicate the consequence to affected people.',
        example:
          'A weekly review finds testing is three days late. The team removes a lower-priority feature, records the scope decision, and informs support about the revised release contents.',
        practice:
          'At the next check-in, replace status narration with one variance, one decision, one owner, and one communication action.',
        quiz: {
          question: 'Which update is most useful for project control?',
          options: [
            'Everyone has been very busy this week.',
            'Testing is three days late; Sam will remove feature B today so the release date remains unchanged.',
            'Several tasks are green and two are yellow.',
          ],
          correctIndex: 1,
          explanation:
            'It connects a measurable variance to a decision, owner, and schedule consequence.',
        },
      },
    ],
  },
];

export function getAllSkillCourses() {
  return courses;
}

export function getSkillCourse(skillSlug: string) {
  return courses.find((course) => course.skillSlug === skillSlug) ?? null;
}
