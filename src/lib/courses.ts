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
];

export function getAllSkillCourses() {
  return courses;
}

export function getSkillCourse(skillSlug: string) {
  return courses.find((course) => course.skillSlug === skillSlug) ?? null;
}
