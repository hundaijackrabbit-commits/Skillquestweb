/**
 * Curated concept definitions, distinct from teachable skill profiles.
 * English editorial originals; not automatically translated or generated.
 */
export const GLOSSARY_CATEGORIES = ["Learning science","Skills & careers","AI & technology","Reasoning & work"] as const;
export type GlossaryCategory = (typeof GLOSSARY_CATEGORIES)[number];
export type GlossaryEntry = {
  slug: string;
  title: string;
  category: GlossaryCategory;
  definition: string;
  whyItMatters: string;
  example: string;
  aliases: string[];
  sourceUrl?: string;
};
export const GLOSSARY_ENTRIES: GlossaryEntry[] = [
  {
    "slug": "retrieval-practice",
    "title": "Retrieval practice",
    "category": "Learning science",
    "definition": "A learning method that asks you to recall information from memory instead of only rereading it.",
    "whyItMatters": "Recalling a concept makes gaps in understanding visible and can strengthen later recall. It is useful for Practice Lab quizzes and saved-insight reviews.",
    "example": "After finishing a lesson, close it and explain its main idea without looking.",
    "aliases": [
      "active recall",
      "practice testing"
    ],
    "sourceUrl": "https://www.cmu.edu/teaching/resources/instructionalstrategies/activelearningstrategies/retrievalpractice/"
  },
  {
    "slug": "spaced-practice",
    "title": "Spaced practice",
    "category": "Learning science",
    "definition": "Revisiting the same material over multiple sessions separated by time, rather than cramming it into one session.",
    "whyItMatters": "Spacing gives learners repeated opportunities to retrieve and apply a concept after some forgetting has occurred. It complements retrieval practice.",
    "example": "Study a skill today, practise it again later in the week, then revisit it next month.",
    "aliases": [
      "spaced repetition",
      "distributed practice"
    ],
    "sourceUrl": "https://www.cmu.edu/teaching/resources/instructionalstrategies/activelearningstrategies/spacedopractice/index.html"
  },
  {
    "slug": "deliberate-practice",
    "title": "Deliberate practice",
    "category": "Learning science",
    "definition": "Focused practice aimed at improving a specific part of performance, usually with feedback and adjustment.",
    "whyItMatters": "Simply repeating a task can reinforce existing habits. Targeting one weak step, checking the result and refining it makes practice more purposeful.",
    "example": "Record a short presentation, identify one unclear transition, and rehearse that section again.",
    "aliases": [
      "focused practice"
    ]
  },
  {
    "slug": "metacognition",
    "title": "Metacognition",
    "category": "Learning science",
    "definition": "Awareness and regulation of your own thinking and learning processes.",
    "whyItMatters": "It helps learners notice what they actually understand, choose an appropriate strategy and recognize when their confidence exceeds their knowledge.",
    "example": "Before submitting a decision memo, identify which assumptions you still need to verify.",
    "aliases": [
      "thinking about thinking"
    ]
  },
  {
    "slug": "cognitive-load",
    "title": "Cognitive load",
    "category": "Learning science",
    "definition": "The mental effort required to hold and process information in working memory.",
    "whyItMatters": "Dense instructions, competing controls and unfamiliar terminology can crowd out the thinking needed for the actual lesson.",
    "example": "Break a long workshop into small steps, each with a clear outcome and example.",
    "aliases": [
      "mental load"
    ]
  },
  {
    "slug": "formative-assessment",
    "title": "Formative assessment",
    "category": "Learning science",
    "definition": "A low-stakes check used during learning to reveal what a person understands and what needs more work.",
    "whyItMatters": "Its main value is actionable feedback while there is still time to adjust, rather than a final score.",
    "example": "Answer a practice question, examine the explanation and retry after correcting a misconception.",
    "aliases": [
      "formative feedback"
    ]
  },
  {
    "slug": "learning-outcome",
    "title": "Learning outcome",
    "category": "Learning science",
    "definition": "A statement of what someone should be able to demonstrate after a lesson or activity.",
    "whyItMatters": "An observable outcome helps distinguish genuine capability from merely reading content or completing a checklist.",
    "example": "Instead of 'understand communication,' aim to 'write an update with an owner, decision and deadline.'",
    "aliases": [
      "learning outcomes"
    ]
  },
  {
    "slug": "skill-gap",
    "title": "Skill gap",
    "category": "Skills & careers",
    "definition": "The difference between skills a person currently demonstrates and those a specific goal, task or role requires.",
    "whyItMatters": "A useful skill-gap assessment compares evidence against a real target, rather than treating every missing skill as equally urgent.",
    "example": "Compare the skills shown in your work samples with those required in three target job postings.",
    "aliases": [
      "skills gap",
      "skill gaps"
    ]
  },
  {
    "slug": "transferable-skills",
    "title": "Transferable skills",
    "category": "Skills & careers",
    "definition": "Capabilities that can be applied across different jobs, industries or situations.",
    "whyItMatters": "They help explain why experience in one role may be relevant to a different role even when job titles differ.",
    "example": "Customer service experience can demonstrate conflict resolution and clear communication in an operations role.",
    "aliases": [
      "transferable skill"
    ]
  },
  {
    "slug": "proficiency-level",
    "title": "Proficiency level",
    "category": "Skills & careers",
    "definition": "A description of how independently and reliably someone can perform a skill at a given level of complexity.",
    "whyItMatters": "Proficiency requires evidence of performance, not just familiarity with the topic or time spent studying.",
    "example": "A beginner follows a template; an advanced practitioner adapts the method under unfamiliar constraints.",
    "aliases": [
      "skill proficiency",
      "proficiency levels"
    ],
    "sourceUrl": "https://reports.weforum.org/docs/WEF_Global_Skills_Taxonomy_Adoption_Toolkit_2025.pdf"
  },
  {
    "slug": "skill-stack",
    "title": "Skill stack",
    "category": "Skills & careers",
    "definition": "A combination of complementary capabilities that becomes more useful together than each skill in isolation.",
    "whyItMatters": "A skill stack connects learning to real work and helps people choose sensible next capabilities.",
    "example": "Combine data analysis, presentation design and storytelling to communicate findings to decision-makers.",
    "aliases": [
      "skill stacks",
      "skills stack"
    ]
  },
  {
    "slug": "competency",
    "title": "Competency",
    "category": "Skills & careers",
    "definition": "The demonstrated ability to apply relevant knowledge and skills effectively in a particular context.",
    "whyItMatters": "A competency typically combines what you know, what you can do and the judgment needed to do it appropriately.",
    "example": "Running an effective client meeting requires listening, preparation, clear decisions and dependable follow-through.",
    "aliases": [
      "competencies"
    ]
  },
  {
    "slug": "proof-of-skill",
    "title": "Proof of skill (work sample)",
    "category": "Skills & careers",
    "definition": "A tangible example showing how you applied a skill, such as a project, analysis, prototype or work sample.",
    "whyItMatters": "Evidence of application gives employers and collaborators more information than a self-reported skill label.",
    "example": "Share a redacted project brief showing your decisions, constraints and measurable results.",
    "aliases": [
      "proof of work",
      "work sample"
    ]
  },
  {
    "slug": "career-pivot",
    "title": "Career pivot",
    "category": "Skills & careers",
    "definition": "A deliberate change in career direction that reuses some existing experience while adding capabilities for a new role.",
    "whyItMatters": "Thinking in terms of transferable skills and evidence can make a pivot more manageable than starting from zero.",
    "example": "A retail supervisor moves toward customer success by documenting coaching, process improvement and account-facing work.",
    "aliases": [
      "career transition"
    ]
  },
  {
    "slug": "ai-hallucination",
    "title": "AI hallucination",
    "category": "AI & technology",
    "definition": "An AI-generated statement that is false, unsupported or misleading, sometimes presented with convincing confidence.",
    "whyItMatters": "Fluent output is not the same as reliable evidence. High-stakes claims, numbers and citations should be checked against trustworthy sources.",
    "example": "A chatbot invents a research paper citation that looks plausible but cannot be located.",
    "aliases": [
      "AI hallucinations",
      "hallucination"
    ],
    "sourceUrl": "https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence"
  },
  {
    "slug": "human-in-the-loop",
    "title": "Human-in-the-loop",
    "category": "AI & technology",
    "definition": "A workflow in which people actively review, guide or approve important stages of an automated or AI-assisted process.",
    "whyItMatters": "Human involvement matters most where context, accountability, privacy or consequential decisions cannot safely be delegated.",
    "example": "AI drafts a hiring rubric; a qualified recruiter checks fairness and approves its use.",
    "aliases": [
      "human in the loop",
      "human oversight"
    ]
  },
  {
    "slug": "automation-risk",
    "title": "Automation risk",
    "category": "AI & technology",
    "definition": "The possibility that specific tasks or parts of a role can be performed by software or machines.",
    "whyItMatters": "Automation risk is better assessed at the task level than by assuming an entire occupation will simply disappear.",
    "example": "Routine report formatting may be automated while stakeholder judgment remains human-led.",
    "aliases": [
      "risk of automation"
    ]
  },
  {
    "slug": "algorithmic-bias",
    "title": "Algorithmic bias",
    "category": "AI & technology",
    "definition": "A systematic pattern in a model or automated process that produces unfair or misleading differences across groups or situations.",
    "whyItMatters": "Training data, measurement choices and deployment context can all affect results; evaluation must look beyond average accuracy.",
    "example": "A résumé filter performs worse for qualified applicants whose work histories differ from its training examples.",
    "aliases": [
      "AI bias",
      "model bias"
    ],
    "sourceUrl": "https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence"
  },
  {
    "slug": "data-provenance",
    "title": "Data provenance",
    "category": "AI & technology",
    "definition": "A record of where data came from and how it was collected, transformed and used.",
    "whyItMatters": "Knowing a dataset's origin makes analysis easier to verify, repeat, correct and audit.",
    "example": "A report records the source spreadsheet, extraction date, cleaning steps and version used to create a chart.",
    "aliases": [
      "data lineage",
      "data origin"
    ]
  },
  {
    "slug": "confirmation-bias",
    "title": "Confirmation bias",
    "category": "Reasoning & work",
    "definition": "The tendency to seek, notice or interpret information in ways that support an existing belief.",
    "whyItMatters": "It can make research and decisions look stronger than they are by neglecting contradictory evidence.",
    "example": "Before choosing a vendor, list evidence that would make you change your preferred choice.",
    "aliases": [
      "confirmatory bias"
    ]
  },
  {
    "slug": "correlation-vs-causation",
    "title": "Correlation versus causation",
    "category": "Reasoning & work",
    "definition": "The distinction between two variables changing together and one variable actually producing a change in the other.",
    "whyItMatters": "Timing or association alone rarely rules out alternative explanations, confounding factors or coincidence.",
    "example": "Sales dropped after a website redesign, but seasonal demand or pricing may have changed too.",
    "aliases": [
      "correlation vs causation",
      "causation versus correlation"
    ]
  },
  {
    "slug": "key-performance-indicator",
    "title": "Key performance indicator (KPI)",
    "category": "Reasoning & work",
    "definition": "A measurable signal selected to track progress toward a specific objective.",
    "whyItMatters": "A KPI is useful only when the measure reflects the outcome being pursued, not merely easy-to-count activity.",
    "example": "For onboarding quality, track time to independent task completion rather than only training-page views.",
    "aliases": [
      "KPI",
      "KPIs",
      "key performance indicators"
    ]
  },
  {
    "slug": "stakeholder",
    "title": "Stakeholder",
    "category": "Reasoning & work",
    "definition": "A person or group that influences, is responsible for, or is affected by a decision or project.",
    "whyItMatters": "Identifying stakeholders clarifies whose needs, approval, constraints and communication should shape a plan.",
    "example": "For a product launch, map customer support, engineering, affected users and the decision owner.",
    "aliases": [
      "stakeholders"
    ]
  },
  {
    "slug": "feedback-loop",
    "title": "Feedback loop",
    "category": "Reasoning & work",
    "definition": "A cycle that uses information about results to adjust the next action.",
    "whyItMatters": "Without a feedback loop, a team can repeat activity without learning whether it is improving the outcome.",
    "example": "Run a short experiment, measure the result, discuss the evidence and change the next iteration.",
    "aliases": [
      "feedback loops"
    ]
  }
];

export function getGlossaryEntry(slug: string): GlossaryEntry | undefined {
  return GLOSSARY_ENTRIES.find((entry) => entry.slug === slug);
}

/** Vocabulary-only matches: do not infer meaning for arbitrary short acronyms. */
const terms = GLOSSARY_ENTRIES.flatMap((entry) => [
  { phrase: entry.title, entry },
  ...entry.aliases.map((phrase) => ({ phrase, entry })),
]).sort((a, b) => b.phrase.length - a.phrase.length);
const normalizedTerms = terms.filter(({phrase}) => phrase.length >= 3);
const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
export const GLOSSARY_MATCHER = new RegExp(
  `(^|[^a-z0-9])(${normalizedTerms.map(({phrase}) => escapeRegExp(phrase)).join('|')})(?=$|[^a-z0-9])`, 'gi'
);
const termByPhrase = new Map(terms.map(({phrase, entry}) => [phrase.toLowerCase(), entry]));

export function glossaryEntryForPhrase(value: string): GlossaryEntry | undefined {
  return termByPhrase.get(value.toLowerCase());
}

export function findGlossaryEntries(text: string, limit = 6): GlossaryEntry[] {
  const found: GlossaryEntry[] = [];
  const used = new Set<string>();
  for (const match of text.matchAll(GLOSSARY_MATCHER)) {
    const entry = glossaryEntryForPhrase(match[2]);
    if (entry && !used.has(entry.slug)) {
      found.push(entry);
      used.add(entry.slug);
      if (found.length >= limit) break;
    }
  }
  return found;
}
