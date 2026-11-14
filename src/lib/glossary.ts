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
