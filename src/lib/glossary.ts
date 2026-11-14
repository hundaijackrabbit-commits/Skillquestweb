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
  },
  {
    "slug": "reflective-practice",
    "title": "Reflective practice",
    "category": "Learning science",
    "definition": "A deliberate review of an experience to understand what happened, why it happened, and what to change next.",
    "whyItMatters": "Reflection becomes useful when it produces a testable adjustment, not just a description of feelings or events. It helps turn completed work into better future decisions.",
    "example": "After delivering a presentation, note where the audience became confused, identify a likely cause, and change one slide before the next presentation.",
    "aliases": [
      "reflection",
      "reflective learning"
    ]
  },
  {
    "slug": "learning-transfer",
    "title": "Learning transfer",
    "category": "Learning science",
    "definition": "Applying knowledge or a capability learned in one situation to a different task, setting, or problem.",
    "whyItMatters": "Being able to repeat a lesson example is not the same as using the idea at work. Transfer improves when learners identify the underlying principle, compare contexts, and practise adapting it to unfamiliar situations.",
    "example": "Use the owner-deadline-decision structure practised in a client handoff to coordinate a different situation, such as a volunteer event or internal product launch.",
    "aliases": [
      "transfer of learning",
      "knowledge transfer across contexts"
    ],
    "sourceUrl": "https://poorvucenter.yale.edu/transfer-of-knowledge-to-new-contexts"
  },
  {
    "slug": "summative-assessment",
    "title": "Summative assessment",
    "category": "Learning science",
    "definition": "An evaluation used to judge what someone has learned at the end of a defined unit, course, or learning period.",
    "whyItMatters": "Unlike formative feedback used during learning, a summative assessment summarizes achievement at a particular point. Its conclusions depend on how well the assessment matches the intended skill.",
    "example": "At the end of a writing course, submit a completed brief evaluated against the course's published rubric.",
    "aliases": [
      "summative evaluation"
    ],
    "sourceUrl": "https://www.cmu.edu/teaching/assessment/basics/glossary.html"
  },
  {
    "slug": "scaffolding",
    "title": "Scaffolding",
    "category": "Learning science",
    "definition": "Temporary prompts, examples, templates, or guidance that support a learner while a task is still unfamiliar.",
    "whyItMatters": "Good scaffolding makes a difficult task approachable without permanently doing the thinking for the learner. Support can be reduced as the learner gains independence.",
    "example": "First use a structured decision-memo template; later write a similar memo using only a short checklist.",
    "aliases": [
      "instructional scaffolding",
      "learning scaffold"
    ],
    "sourceUrl": "https://www.utm.utoronto.ca/tlc/instructor-resources/glossary-terms"
  },
  {
    "slug": "learning-objective",
    "title": "Learning objective",
    "category": "Learning science",
    "definition": "A specific statement of the knowledge or action a learner should achieve during an individual lesson or activity.",
    "whyItMatters": "A useful objective describes something a learner can demonstrate, allowing exercises and feedback to focus on the intended result instead of vague completion.",
    "example": "Replace 'learn more about research' with 'compare two sources and explain which one better supports a claim.'",
    "aliases": [
      "learning objectives"
    ]
  },
  {
    "slug": "working-memory",
    "title": "Working memory",
    "category": "Learning science",
    "definition": "The limited-capacity mental workspace used to hold and manipulate information briefly while thinking or completing a task.",
    "whyItMatters": "When a page asks readers to remember too many instructions at once, less attention remains for solving the problem. Clear steps, examples, and visible reference notes can reduce this strain.",
    "example": "Keep the assignment criteria beside a worksheet so you can reason through a problem without memorizing every requirement.",
    "aliases": [
      "short-term mental workspace"
    ]
  },
  {
    "slug": "peer-feedback",
    "title": "Peer feedback",
    "category": "Learning science",
    "definition": "Specific observations and suggestions about a learner's work provided by another person working at a similar level.",
    "whyItMatters": "A peer can notice ambiguity or missing context that the author overlooks. Feedback is most useful when tied to a goal, concrete evidence, and a revision the learner can test.",
    "example": "Exchange two project updates and ask each other to identify the decision, owner, deadline, and any remaining uncertainty.",
    "aliases": [
      "peer review feedback"
    ],
    "sourceUrl": "https://www.cmu.edu/teaching/resources/instructionalstrategies/activelearningstrategies/retrievalpractice/"
  },
  {
    "slug": "upskilling",
    "title": "Upskilling",
    "category": "Skills & careers",
    "definition": "Developing or updating capabilities to perform better in your current role or a closely related role.",
    "whyItMatters": "Upskilling targets changing responsibilities or tools without necessarily requiring a career change. It is most useful when tied to tasks employers actually need performed.",
    "example": "A customer-support specialist learns to analyse recurring support trends and present improvement recommendations.",
    "aliases": [
      "upskill",
      "upskilled"
    ],
    "sourceUrl": "https://www.cedefop.europa.eu/en/tools/vet-glossary/glossary"
  },
  {
    "slug": "reskilling",
    "title": "Reskilling",
    "category": "Skills & careers",
    "definition": "Learning substantially different capabilities to move into a new type of work or adapt when an existing role changes.",
    "whyItMatters": "Reskilling differs from upskilling because the target tasks or role may be significantly different. Existing transferable skills can still shorten the transition.",
    "example": "A warehouse coordinator learns testing fundamentals and builds software quality-assurance work samples to pursue a new role.",
    "aliases": [
      "reskill",
      "retraining"
    ],
    "sourceUrl": "https://www.cedefop.europa.eu/en/tools/vet-glossary/glossary"
  },
  {
    "slug": "career-mobility",
    "title": "Career mobility",
    "category": "Skills & careers",
    "definition": "The ability or opportunity to move between roles, employers, functions, or levels as circumstances and goals change.",
    "whyItMatters": "Mobility can mean advancement, a lateral move, or a shift into a different field. Understanding possible moves helps learners build flexible skill combinations rather than rely on one job title.",
    "example": "A project coordinator moves laterally into operations, using planning and stakeholder experience while learning new reporting tools.",
    "aliases": [
      "internal mobility",
      "occupational mobility"
    ],
    "sourceUrl": "https://www.weforum.org/publications/the-future-of-jobs-report-2025"
  },
  {
    "slug": "professional-portfolio",
    "title": "Professional portfolio",
    "category": "Skills & careers",
    "definition": "An intentionally selected collection of work examples that demonstrates a person's capabilities, decisions, and results.",
    "whyItMatters": "A portfolio can show how work was done, not only claim that a skill exists. Good examples include context, your contribution, constraints, and verifiable outcomes while protecting confidential details.",
    "example": "Show a before-and-after process map, explain which steps you changed, and record how cycle time improved.",
    "aliases": [
      "career portfolio",
      "work portfolio"
    ]
  },
  {
    "slug": "cross-functional-work",
    "title": "Cross-functional work",
    "category": "Skills & careers",
    "definition": "Collaboration between people from different specialties or departments to achieve a shared result.",
    "whyItMatters": "Different teams often optimize for different goals. Cross-functional work becomes more effective when responsibilities, handoffs, and decision authority are explicit.",
    "example": "For a product release, design clarifies the user experience, engineering resolves technical constraints, and support prepares customer guidance.",
    "aliases": [
      "cross-functional",
      "cross functional",
      "cross-functional collaboration"
    ]
  },
  {
    "slug": "skill-assessment",
    "title": "Skill assessment",
    "category": "Skills & careers",
    "definition": "A structured way to gather evidence of how effectively someone can apply a particular capability.",
    "whyItMatters": "The strongest assessments use tasks similar to real work, explicit criteria, and feedback. Familiarity with a topic or confidence alone is not a reliable measure of proficiency.",
    "example": "Instead of asking whether you know spreadsheets, build a small report from messy data and check it for errors.",
    "aliases": [
      "skills assessment",
      "skills evaluation"
    ]
  },
  {
    "slug": "career-progression",
    "title": "Career progression",
    "category": "Skills & careers",
    "definition": "A sequence of changes in responsibility, capability, impact, or position over a working life.",
    "whyItMatters": "Progression does not have to mean managing more people. It may involve deeper expertise, more complex problems, broader influence, or a new kind of contribution.",
    "example": "An analyst develops from preparing dashboards to explaining trade-offs and advising leaders on decisions.",
    "aliases": [
      "career advancement",
      "professional progression"
    ]
  },
  {
    "slug": "generative-ai",
    "title": "Generative AI",
    "category": "AI & technology",
    "definition": "Artificial intelligence systems that produce new content, such as text, images, audio, or code, from learned patterns and user inputs.",
    "whyItMatters": "Generated material can accelerate drafting and exploration, but it must still be checked for factual accuracy, suitability, confidentiality, and rights considerations.",
    "example": "Use a generative AI tool to outline training material, then verify every factual claim and rewrite examples for your audience.",
    "aliases": [
      "genAI",
      "generative artificial intelligence"
    ],
    "sourceUrl": "https://www.nist.gov/publications/language-trustworthy-ai-depth-glossary-terms"
  },
  {
    "slug": "large-language-model",
    "title": "Large language model (LLM)",
    "category": "AI & technology",
    "definition": "A language-focused AI model trained on substantial amounts of data to predict or generate sequences of tokens such as words and code.",
    "whyItMatters": "An LLM can summarize, explain, and draft language, but fluent text does not guarantee a verified fact, consistent reasoning, or reliable access to current information.",
    "example": "A learner asks an LLM to explain a workshop concept, then checks its examples against the lesson and an authoritative source.",
    "aliases": [
      "LLM",
      "LLMs",
      "large language models"
    ],
    "sourceUrl": "https://www.nist.gov/publications/language-trustworthy-ai-depth-glossary-terms"
  },
  {
    "slug": "ai-agent",
    "title": "AI agent",
    "category": "AI & technology",
    "definition": "A software system that uses an AI model and programmed tools or workflows to pursue a goal through one or more actions.",
    "whyItMatters": "Unlike a single chatbot reply, an agent may retrieve information, select steps, and interact with systems. Clear permissions, safeguards, and human review remain necessary.",
    "example": "An agent drafts a weekly project summary from approved task records, while a manager reviews it before distribution.",
    "aliases": [
      "AI agents",
      "agentic system"
    ],
    "sourceUrl": "https://www.nist.gov/publications/language-trustworthy-ai-depth-glossary-terms"
  },
  {
    "slug": "ai-model-evaluation",
    "title": "AI model evaluation",
    "category": "AI & technology",
    "definition": "The process of testing an AI model's outputs against defined tasks, reference examples, safety expectations, and performance measures.",
    "whyItMatters": "A convincing demonstration is not enough to establish reliability. Evaluation should examine representative cases, failure modes, and outcomes that matter to actual users.",
    "example": "Test an AI assistant on 50 real support-question patterns and record factual accuracy, refusal quality, and escalation errors.",
    "aliases": [
      "model evaluation",
      "AI evaluation",
      "model benchmarking"
    ],
    "sourceUrl": "https://www.nist.gov/publications/language-trustworthy-ai-depth-glossary-terms"
  },
  {
    "slug": "training-data",
    "title": "Training data",
    "category": "AI & technology",
    "definition": "Information used to fit an AI or statistical model so that it can learn patterns before being evaluated or put to use.",
    "whyItMatters": "Training data influences what a system learns and which situations it handles poorly. Coverage, collection methods, privacy, and bias matter; evaluation should also use separate examples the model was not trained on.",
    "example": "Train a ticket-routing model using previously categorized support requests, then test it on a separate set of real requests to see where it misroutes customers.",
    "aliases": [
      "training dataset",
      "model training data"
    ],
    "sourceUrl": "https://www.nist.gov/publications/language-trustworthy-ai-depth-glossary-terms"
  },
  {
    "slug": "ai-transparency",
    "title": "AI transparency",
    "category": "AI & technology",
    "definition": "Providing meaningful information about an AI system's purpose, data use, limitations, testing, and the people responsible for it.",
    "whyItMatters": "Transparency lets people understand when AI is involved and what checks or appeals are available. It is broader than explainability, which focuses on making individual outputs or system behavior understandable.",
    "example": "A company tells applicants when an automated screening tool is used, what information it considers, and how a person can request a review.",
    "aliases": [
      "algorithmic transparency",
      "AI system transparency"
    ],
    "sourceUrl": "https://www.nist.gov/publications/language-trustworthy-ai-depth-glossary-terms"
  },
  {
    "slug": "automation-bias",
    "title": "Automation bias",
    "category": "AI & technology",
    "definition": "A tendency to accept a recommendation from an automated system too readily, even when other evidence suggests it may be wrong.",
    "whyItMatters": "Automation bias can reduce human oversight precisely when the system sounds confident. Independent checks and clear responsibility help prevent costly mistakes.",
    "example": "A reviewer catches an incorrect AI-generated project date by comparing it with the signed client agreement before sending an update.",
    "aliases": [
      "automation complacency"
    ],
    "sourceUrl": "https://www.nist.gov/publications/language-trustworthy-ai-depth-glossary-terms"
  },
  {
    "slug": "prompt-injection",
    "title": "Prompt injection",
    "category": "AI & technology",
    "definition": "An attempt to make an AI system follow instructions hidden in material it was supposed to analyse, such as a document, page, or message.",
    "whyItMatters": "A retrieved document can contain commands that conflict with the user's actual task. Systems should treat external content as data and restrict actions and access appropriately.",
    "example": "A web page contains text telling a research assistant to ignore its task and reveal private information; a protected assistant treats that text as untrusted content.",
    "aliases": [
      "indirect prompt injection"
    ],
    "sourceUrl": "https://genai.owasp.org/llmrisk/llm01-prompt-injection/"
  },
  {
    "slug": "workflow",
    "title": "Workflow",
    "category": "Reasoning & work",
    "definition": "A repeatable sequence of tasks, decisions, and handoffs that moves work from a starting point to an intended result.",
    "whyItMatters": "Making the sequence visible helps reveal wasted steps, unclear ownership, and places where quality or approval checks are missing.",
    "example": "For an article, map research, draft, fact-check, edit, approval, publication, and follow-up as separate stages.",
    "aliases": [
      "workflows",
      "work flow"
    ]
  },
  {
    "slug": "trade-off",
    "title": "Trade-off",
    "category": "Reasoning & work",
    "definition": "A choice in which improving one desirable outcome requires accepting a cost, risk, or reduction in another.",
    "whyItMatters": "Most real decisions involve competing objectives rather than a perfect option. Naming trade-offs makes a recommendation more transparent and easier to revisit.",
    "example": "Launching a simpler feature this week may reduce scope but give customers access sooner and lower implementation risk.",
    "aliases": [
      "tradeoffs",
      "trade-offs",
      "trade off"
    ]
  },
  {
    "slug": "baseline",
    "title": "Baseline",
    "category": "Reasoning & work",
    "definition": "A reference measurement or approved plan used to judge whether something has changed or improved.",
    "whyItMatters": "Without a consistent starting point, improvement claims may confuse a genuine effect with seasonal variation or changed measurement.",
    "example": "Record average customer-response time for two weeks before introducing a new triage process.",
    "aliases": [
      "baseline measurement",
      "starting baseline"
    ],
    "sourceUrl": "https://www.apm.org.uk/resources/glossary/"
  },
  {
    "slug": "assumption",
    "title": "Assumption",
    "category": "Reasoning & work",
    "definition": "A proposition treated as true for planning or reasoning even though it has not yet been verified.",
    "whyItMatters": "Unstated assumptions can turn guesses into apparently firm conclusions. Listing the important ones reveals what evidence or confirmation a decision still needs.",
    "example": "A team plans a Friday launch assuming customer images will be approved by Wednesday; it records that dependency for confirmation.",
    "aliases": [
      "assumptions",
      "working assumption"
    ]
  },
  {
    "slug": "performance-metric",
    "title": "Performance metric",
    "category": "Reasoning & work",
    "definition": "A quantitative measure used to describe an aspect of work, process, or result.",
    "whyItMatters": "Not every metric is a key performance indicator: a KPI is selected because it tracks an important objective. Useful metrics need a consistent definition and relevant context.",
    "example": "Track average resolution time as a service metric, then compare it with customer satisfaction to avoid rewarding speed alone.",
    "aliases": [
      "metric",
      "metrics",
      "performance metrics"
    ]
  },
  {
    "slug": "escalation",
    "title": "Escalation",
    "category": "Reasoning & work",
    "definition": "A deliberate transfer of an unresolved issue or decision to someone with the authority, expertise, or capacity to address it.",
    "whyItMatters": "Escalation is not the same as blaming someone. Good escalation explains the risk, what has been attempted, who must decide, and when action is needed.",
    "example": "If image approval is missing at 1 p.m., notify the account manager with the deadline impact and the decision required.",
    "aliases": [
      "escalation trigger",
      "escalate"
    ]
  },
  {
    "slug": "customer-journey",
    "title": "Customer journey",
    "category": "Reasoning & work",
    "definition": "The sequence of experiences a person has while discovering, evaluating, buying, using, and getting support for a product or service.",
    "whyItMatters": "Mapping the journey can expose friction between teams and reveal where useful information, assistance, or reassurance is missing.",
    "example": "Trace how someone finds a food truck's website, checks its menu, places an order, and resolves a delivery problem.",
    "aliases": [
      "customer journeys",
      "buyer journey"
    ]
  },
  {
    "slug": "competitive-advantage",
    "title": "Competitive advantage",
    "category": "Reasoning & work",
    "definition": "A capability, position, or combination of resources that allows an organization to create greater customer value or perform better than rivals.",
    "whyItMatters": "An advantage is more durable when it reflects something difficult to copy, such as trusted relationships, specialist know-how, or a reliable process.",
    "example": "A mobile service business wins repeat contracts because it can arrive faster and document work quality more consistently than competitors.",
    "aliases": [
      "competitive edge"
    ]
  },
  {
    "slug": "project-dependency",
    "title": "Project dependency",
    "category": "Reasoning & work",
    "definition": "A relationship in which one task, decision, or deliverable relies on another being completed or available first.",
    "whyItMatters": "Dependencies shape the actual sequence and risk of a project. Recording an owner and trigger makes it easier to prevent a small delay from blocking several teams.",
    "example": "The client update cannot confirm the launch date until the designer receives approved images and the manager confirms the deadline.",
    "aliases": [
      "project dependencies",
      "task dependency",
      "task dependencies"
    ],
    "sourceUrl": "https://www.apm.org.uk/resources/glossary/"
  },
  {
    "slug": "deliverable",
    "title": "Deliverable",
    "category": "Reasoning & work",
    "definition": "A defined output that must be completed and handed over as part of a project, assignment, or agreement.",
    "whyItMatters": "A deliverable should be observable and have clear acceptance criteria. Describing it precisely reduces misunderstandings about what completion means.",
    "example": "Instead of 'improve the report,' specify a two-page findings memo with a chart, source notes, and one recommendation.",
    "aliases": [
      "deliverables",
      "project deliverable"
    ],
    "sourceUrl": "https://www.apm.org.uk/resources/glossary/"
  },
  {
    "slug": "active-learning",
    "title": "Active learning",
    "category": "Learning science",
    "definition": "A learning approach in which people actively process ideas through questions, discussion, practice, or problem-solving instead of only receiving information.",
    "whyItMatters": "Reading and watching can introduce a concept, but active tasks reveal whether it can be used. The quality of the activity matters: the learner should explain, apply, compare, or test an idea rather than simply click through material.",
    "example": "After reading a guide about client communication, rewrite an unclear status update and explain why the revised version is easier to act on.",
    "aliases": [
      "active learning methods",
      "active learning approach"
    ]
  },
  {
    "slug": "experiential-learning",
    "title": "Experiential learning",
    "category": "Learning science",
    "definition": "Learning through a relevant experience followed by reflection, interpretation, and the opportunity to apply what was learned again.",
    "whyItMatters": "Doing a task by itself does not guarantee learning. Reflecting on results, comparing them with expectations, and adjusting the next attempt connects experience to reusable knowledge and judgment.",
    "example": "Run a small community event, document where coordination broke down, draw lessons from the results, and use them to plan the next event.",
    "aliases": [
      "learning through experience",
      "experience-based learning"
    ]
  },
  {
    "slug": "interleaving",
    "title": "Interleaving",
    "category": "Learning science",
    "definition": "A practice strategy that mixes related problem types or skills in the same study period rather than completing a long block of one type at a time.",
    "whyItMatters": "Switching between similar tasks can make practice feel harder, but it can help learners recognize which approach a new problem actually requires. It is most useful when the differences between the tasks are meaningful.",
    "example": "Instead of answering ten identical prioritization questions in sequence, alternate prioritization, evidence-checking, and stakeholder communication scenarios.",
    "aliases": [
      "interleaved practice",
      "interleaved learning"
    ],
    "sourceUrl": "https://bjorklab.psych.ucla.edu/research/"
  },
  {
    "slug": "desirable-difficulties",
    "title": "Desirable difficulties",
    "category": "Learning science",
    "definition": "Learning conditions that feel effortful or slow initial performance but can strengthen later understanding, retention, or transfer when appropriately matched to the learner.",
    "whyItMatters": "Easy, fluent practice can create an illusion of mastery. Spacing, retrieval, and interleaving may improve long-term learning, but a difficulty is not desirable if it blocks a learner from engaging with the material at all.",
    "example": "After mastering a spreadsheet technique with a guided example, try an unfamiliar dataset without the step-by-step instructions, then check the result.",
    "aliases": [
      "desirable difficulty"
    ],
    "sourceUrl": "https://bjorklab.psych.ucla.edu/research/"
  },
  {
    "slug": "assessment-rubric",
    "title": "Assessment rubric",
    "category": "Learning science",
    "definition": "A scoring or feedback guide that names the criteria for a task and describes what different levels of performance look like for each criterion.",
    "whyItMatters": "Clear criteria allow learners to understand what good work looks like before submitting it. They also make feedback more specific and consistent than a vague judgment such as 'needs improvement.'",
    "example": "Review a project brief using criteria for factual accuracy, decision clarity, audience fit, and next actions, each with descriptions of strong and weak performance.",
    "aliases": [
      "rubric",
      "grading rubric",
      "assessment rubrics"
    ],
    "sourceUrl": "https://www.cmu.edu/teaching/assessment/assesslearning/rubrics.html"
  },
  {
    "slug": "self-efficacy",
    "title": "Self-efficacy",
    "category": "Learning science",
    "definition": "A person's belief in their ability to organize and carry out the actions needed to succeed at a particular task or challenge.",
    "whyItMatters": "Self-efficacy is task-specific and different from general confidence or actual skill level. Achievable practice, credible feedback, and evidence of improvement can help learners approach increasingly difficult tasks.",
    "example": "After successfully facilitating three short team updates, a learner becomes more willing to lead a longer planning meeting while still identifying skills to improve.",
    "aliases": [
      "task self-efficacy",
      "learning self-efficacy"
    ]
  },
  {
    "slug": "career-pathway",
    "title": "Career pathway",
    "category": "Skills & careers",
    "definition": "A plausible sequence of experiences, qualifications, skill development, and role changes that can lead toward a chosen type of work.",
    "whyItMatters": "A pathway is a planning model, not a guarantee or a single mandatory ladder. It helps a person see alternative entry points, transferable experience, and evidence they can build for the next opportunity.",
    "example": "A support representative develops reporting and process skills, takes on an operations project, and uses those work samples when applying for a junior operations role.",
    "aliases": [
      "career pathways",
      "career route",
      "career routes"
    ],
    "sourceUrl": "https://noc.esdc.gc.ca/SkillsTaxonomy/SkillsTaxonomyWelcome"
  },
  {
    "slug": "competency-framework",
    "title": "Competency framework",
    "category": "Skills & careers",
    "definition": "An organized description of capabilities and observable behaviors expected for a role, occupation, team, or level of responsibility.",
    "whyItMatters": "Frameworks make skill expectations more consistent across learning, hiring, feedback, and progression. They should describe demonstrated behavior rather than assume that course completion alone proves capability.",
    "example": "An organization defines beginner, capable, and advanced performance in client communication using examples of clarification, escalation, and follow-through.",
    "aliases": [
      "competency frameworks",
      "competence framework"
    ],
    "sourceUrl": "https://noc.esdc.gc.ca/SkillsTaxonomy/SkillsTaxonomyWelcome"
  },
  {
    "slug": "skills-taxonomy",
    "title": "Skills taxonomy",
    "category": "Skills & careers",
    "definition": "A structured classification of skill and work-related concepts that groups related terms and makes their relationships easier to compare across occupations.",
    "whyItMatters": "Job advertisements often use different words for overlapping capabilities. A taxonomy helps map those labels consistently while distinguishing a skill from an ability, knowledge area, or work activity.",
    "example": "Map 'client communication,' 'customer interaction,' and 'stakeholder updates' to clearly defined descriptors when comparing job postings and learning goals.",
    "aliases": [
      "skill taxonomy",
      "skills taxonomies",
      "occupational skills taxonomy"
    ],
    "sourceUrl": "https://noc.esdc.gc.ca/SkillsTaxonomy/SkillsTaxonomyWelcome"
  },
  {
    "slug": "job-shadowing",
    "title": "Job shadowing",
    "category": "Skills & careers",
    "definition": "A short, structured opportunity to observe someone doing their job in order to understand its tasks, decisions, tools, and working conditions.",
    "whyItMatters": "Observing real work can test whether a career fits your interests before committing to lengthy training. Observation alone is not evidence that you can perform the role, so it should be followed by reflection or practice.",
    "example": "Spend part of a day observing a project coordinator, take notes on handoffs and meetings, and compare the observed tasks with your own strengths.",
    "aliases": [
      "work shadowing",
      "career shadowing"
    ]
  },
  {
    "slug": "professional-certification",
    "title": "Professional certification",
    "category": "Skills & careers",
    "definition": "A credential issued by an organization indicating that someone has met stated requirements, which may include an examination, experience, training, or continuing education.",
    "whyItMatters": "Certifications differ in rigor, recognition, renewal rules, and legal significance. A certificate of course attendance is not automatically a professional certification, and a certification does not always authorize regulated practice.",
    "example": "Before paying for a project credential, check its prerequisites, assessment method, employer recognition, renewal obligations, and relevance to your target roles.",
    "aliases": [
      "professional certifications",
      "industry certification",
      "industry certifications"
    ]
  },
  {
    "slug": "micro-credential",
    "title": "Micro-credential",
    "category": "Skills & careers",
    "definition": "A documented recognition of specific learning outcomes from a relatively small learning experience, assessed against stated standards by an issuing provider.",
    "whyItMatters": "A micro-credential can demonstrate focused achievement without requiring a full qualification. Its value depends on transparent assessment, provider credibility, recognition, and whether the acquired capability is useful for a real goal.",
    "example": "Complete a short, assessed data-visualization module and receive a shareable record of the exact outcomes demonstrated, rather than only a participation badge.",
    "aliases": [
      "microcredential",
      "micro-credentials",
      "microcredentials"
    ],
    "sourceUrl": "https://education.ec.europa.eu/education-levels/higher-education/micro-credentials"
  },
  {
    "slug": "data-governance",
    "title": "Data governance",
    "category": "AI & technology",
    "definition": "The policies, decision rights, standards, and responsibilities that determine how an organization manages data through its lifecycle.",
    "whyItMatters": "Accurate analysis and responsible AI use require clarity about who may collect, change, access, retain, and correct information. Data governance sets accountability; individual technical controls implement parts of it.",
    "example": "Assign an owner to customer data, define authorized uses, set retention rules, and require changes to key fields to be documented before the data feeds a model.",
    "aliases": [
      "data stewardship governance",
      "enterprise data governance"
    ],
    "sourceUrl": "https://airc.nist.gov/glossary/"
  },
  {
    "slug": "model-drift",
    "title": "Model drift",
    "category": "AI & technology",
    "definition": "A change over time in the data patterns, relationships, or conditions an AI model encounters that can make its earlier performance less reliable.",
    "whyItMatters": "A model that worked well on last year's examples may fail when user behavior, language, products, or processes change. Drift signals a need to investigate and test performance; it does not automatically mean retraining is the solution.",
    "example": "A ticket-classification model starts misrouting requests after a company launches new products and customers begin using unfamiliar category names.",
    "aliases": [
      "AI model drift",
      "data drift in models",
      "concept drift in models"
    ],
    "sourceUrl": "https://www.nist.gov/publications/challenges-monitoring-deployed-ai-systems-center-ai-standards-and-innovation"
  },
  {
    "slug": "model-monitoring",
    "title": "Model monitoring",
    "category": "AI & technology",
    "definition": "The ongoing observation of a deployed model's behavior, data, quality measures, failures, and operational impact after release.",
    "whyItMatters": "Pre-launch tests cannot cover every real-world situation. Monitoring helps teams notice emerging errors, shifts in inputs, and unintended effects, then decide whether to investigate, intervene, or revise the system.",
    "example": "Review weekly error samples, user corrections, escalation rates, and data shifts for a live AI learning assistant, with a defined owner for action.",
    "aliases": [
      "AI monitoring",
      "post-deployment model monitoring",
      "production model monitoring"
    ],
    "sourceUrl": "https://www.nist.gov/publications/challenges-monitoring-deployed-ai-systems-center-ai-standards-and-innovation"
  },
  {
    "slug": "model-inference",
    "title": "Model inference",
    "category": "AI & technology",
    "definition": "The stage when a trained model uses supplied inputs to produce a prediction, classification, recommendation, or generated output.",
    "whyItMatters": "Inference is the model's use phase, distinct from the training process that adjusted its parameters. Understanding this distinction helps explain response-time costs, limits, and why each output may still need verification.",
    "example": "A trained classifier receives a new support message and predicts which team should handle it; that prediction is produced during inference.",
    "aliases": [
      "AI inference",
      "inference time",
      "inference phase"
    ],
    "sourceUrl": "https://airc.nist.gov/glossary/"
  },
  {
    "slug": "evaluation-dataset",
    "title": "Evaluation dataset",
    "category": "AI & technology",
    "definition": "A collection of examples and expected criteria used to test how a model or workflow performs, ideally including cases not used to fit the model.",
    "whyItMatters": "A realistic evaluation set can reveal failures that polished demonstrations hide. Its value depends on relevant coverage, careful labeling, representative edge cases, and avoiding contamination from training examples.",
    "example": "Before enabling an AI coach, assemble learner questions covering ambiguity, outdated facts, unsafe requests, multilingual wording, and ordinary examples, then score the answers against a rubric.",
    "aliases": [
      "evaluation set",
      "test dataset",
      "AI eval dataset"
    ],
    "sourceUrl": "https://airc.nist.gov/glossary/"
  },
  {
    "slug": "ai-red-teaming",
    "title": "AI red teaming",
    "category": "AI & technology",
    "definition": "A structured adversarial evaluation in which testers deliberately probe an AI system for vulnerabilities, harmful behavior, or failures outside ordinary expected use.",
    "whyItMatters": "Normal tests focus on whether a system succeeds. Red teaming explores how it might fail under misuse, manipulation, or unusual conditions. Findings should feed into safeguards, monitoring, and retesting.",
    "example": "A test team places misleading instructions in a retrieved document to see whether an assistant follows them instead of the user's authorized request.",
    "aliases": [
      "red teaming AI",
      "AI red-team testing",
      "adversarial AI testing"
    ],
    "sourceUrl": "https://csrc.nist.gov/glossary/term/red_teaming"
  },
  {
    "slug": "hypothesis",
    "title": "Hypothesis",
    "category": "Reasoning & work",
    "definition": "A specific, testable explanation or prediction proposed to be checked against observations or evidence.",
    "whyItMatters": "An explicit hypothesis turns a vague belief into a claim that can be challenged. It guides what to measure and what result would count against the explanation, while preventing a team from treating assumptions as proven facts.",
    "example": "Predict that a simpler checkout form will reduce abandoned bookings, define abandonment consistently, then compare results before adopting the change.",
    "aliases": [
      "working hypothesis",
      "testable hypothesis"
    ]
  },
  {
    "slug": "success-criteria",
    "title": "Success criteria",
    "category": "Reasoning & work",
    "definition": "The explicit conditions or evidence that will be used to decide whether a task, project, experiment, or learning activity has achieved its purpose.",
    "whyItMatters": "Without agreed success criteria, people can finish work and still disagree about whether it is useful. Clear criteria connect the deliverable to outcomes, quality thresholds, and acceptance by the right people.",
    "example": "A handoff succeeds when the client receives the correct file, the next owner is named, unresolved questions are listed, and a deadline is confirmed.",
    "aliases": [
      "criteria for success",
      "acceptance success criteria"
    ],
    "sourceUrl": "https://www.apm.org.uk/resources/glossary/"
  },
  {
    "slug": "leading-indicator",
    "title": "Leading indicator",
    "category": "Reasoning & work",
    "definition": "A measure that offers an early signal of conditions or actions likely to influence a future result, without guaranteeing that result.",
    "whyItMatters": "Leading indicators can help teams adjust sooner than outcome measures allow. They should be tested for their relationship to the desired result rather than assumed to be predictive simply because they are easy to track.",
    "example": "Monitor the share of new learners completing a first exercise as an early signal of whether the onboarding process supports future continued practice.",
    "aliases": [
      "leading indicators",
      "early indicator"
    ],
    "sourceUrl": "https://www.apm.org.uk/resources/glossary/"
  },
  {
    "slug": "lagging-indicator",
    "title": "Lagging indicator",
    "category": "Reasoning & work",
    "definition": "A measure of a result that has already occurred, often used to judge the outcome of earlier actions or conditions.",
    "whyItMatters": "Lagging indicators tell a team whether goals were met, but may arrive too late to guide every decision along the way. Pairing them with appropriate leading measures can support both accountability and timely correction.",
    "example": "Review the percentage of learners returning after 30 days as an outcome metric, alongside earlier measures such as first-lesson completion.",
    "aliases": [
      "lagging indicators",
      "outcome indicator"
    ],
    "sourceUrl": "https://www.apm.org.uk/resources/glossary/"
  },
  {
    "slug": "opportunity-cost",
    "title": "Opportunity cost",
    "category": "Reasoning & work",
    "definition": "The value of the best alternative that must be given up when a person or organization chooses one course of action over another.",
    "whyItMatters": "A decision can be inexpensive in direct spending yet costly in time or attention diverted from a better option. Opportunity cost helps compare choices using the most valuable realistic alternative, not every imaginable possibility.",
    "example": "Spending the team's only design day on a minor cosmetic change means delaying an onboarding fix that could help more learners complete their first activity.",
    "aliases": [
      "opportunity costs",
      "cost of the next-best alternative"
    ]
  },
  {
    "slug": "scope-creep",
    "title": "Scope creep",
    "category": "Reasoning & work",
    "definition": "The gradual addition or expansion of project work without corresponding agreement on changes to objectives, resources, time, or cost.",
    "whyItMatters": "Small unreviewed requests can accumulate into missed deadlines and unclear expectations. Good change control lets teams adapt when warranted while making the trade-offs and revised commitments explicit.",
    "example": "A three-page career guide expands into an interactive course and personalized dashboard without revisiting the delivery plan or budget.",
    "aliases": [
      "uncontrolled scope expansion",
      "scope creeping"
    ],
    "sourceUrl": "https://www.apm.org.uk/resources/glossary/"
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

/**
 * Editorially reviewed concept relationships, not arbitrary alphabetic neighbors.
 * Unmapped legacy entries retain the original small same-category fallback.
 */
const RELATED_GLOSSARY_SLUGS: Record<string, string[]> = {
  "active-learning": [
    "retrieval-practice",
    "experiential-learning",
    "formative-assessment",
    "scaffolding"
  ],
  "experiential-learning": [
    "reflective-practice",
    "learning-transfer",
    "active-learning",
    "deliberate-practice"
  ],
  "interleaving": [
    "desirable-difficulties",
    "spaced-practice",
    "retrieval-practice"
  ],
  "desirable-difficulties": [
    "interleaving",
    "retrieval-practice",
    "spaced-practice"
  ],
  "assessment-rubric": [
    "formative-assessment",
    "summative-assessment",
    "learning-outcome"
  ],
  "self-efficacy": [
    "deliberate-practice",
    "reflective-practice",
    "scaffolding"
  ],
  "career-pathway": [
    "career-mobility",
    "career-pivot",
    "upskilling",
    "reskilling"
  ],
  "competency-framework": [
    "competency",
    "proficiency-level",
    "skills-taxonomy"
  ],
  "skills-taxonomy": [
    "competency-framework",
    "transferable-skills",
    "skill-gap"
  ],
  "job-shadowing": [
    "career-pathway",
    "career-pivot",
    "proof-of-skill"
  ],
  "professional-certification": [
    "micro-credential",
    "competency-framework",
    "proficiency-level"
  ],
  "micro-credential": [
    "learning-outcome",
    "professional-certification",
    "proof-of-skill"
  ],
  "data-governance": [
    "data-provenance",
    "training-data",
    "ai-transparency"
  ],
  "model-drift": [
    "model-monitoring",
    "evaluation-dataset",
    "training-data"
  ],
  "model-monitoring": [
    "model-drift",
    "ai-model-evaluation",
    "data-provenance"
  ],
  "model-inference": [
    "large-language-model",
    "generative-ai",
    "ai-model-evaluation"
  ],
  "evaluation-dataset": [
    "ai-model-evaluation",
    "model-monitoring",
    "model-drift"
  ],
  "ai-red-teaming": [
    "prompt-injection",
    "ai-model-evaluation",
    "algorithmic-bias"
  ],
  "hypothesis": [
    "assumption",
    "baseline",
    "trade-off"
  ],
  "success-criteria": [
    "key-performance-indicator",
    "deliverable",
    "learning-outcome"
  ],
  "leading-indicator": [
    "lagging-indicator",
    "key-performance-indicator",
    "feedback-loop"
  ],
  "lagging-indicator": [
    "leading-indicator",
    "key-performance-indicator",
    "baseline"
  ],
  "opportunity-cost": [
    "trade-off",
    "competitive-advantage",
    "scope-creep"
  ],
  "scope-creep": [
    "project-dependency",
    "deliverable",
    "success-criteria"
  ]
};

export function getRelatedGlossaryEntries(entry: GlossaryEntry, limit = 4): GlossaryEntry[] {
  const recommendations = (RELATED_GLOSSARY_SLUGS[entry.slug] ?? [])
    .map((slug) => getGlossaryEntry(slug))
    .filter((item): item is GlossaryEntry => Boolean(item && item.slug !== entry.slug));
  if (recommendations.length >= limit) return recommendations.slice(0, limit);
  const seen = new Set([entry.slug, ...recommendations.map((item) => item.slug)]);
  const fallback = GLOSSARY_ENTRIES.filter((item) => item.category === entry.category && !seen.has(item.slug));
  return [...recommendations, ...fallback].slice(0, limit);
}
