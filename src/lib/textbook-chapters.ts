export type TextbookChapter = {
  objectives: string[];
  theory: string;
  steps: [string, string][];
  example: { scenario: string; work: string[]; result: string };
  exercise: string;
  check: { question: string; answer: string };
  reading: string[];
  caseStudy?: { context: string; concept: string; task: string; criteria: string[]; solution: string };
};

const chapters: Record<string, TextbookChapter> = {
  "communication": {
    "objectives": [
      "Distinguish a message from shared understanding.",
      "Choose the right amount of detail for the recipient.",
      "Close a conversation with a confirmed action and owner."
    ],
    "theory": "A message is encoded by a sender, interpreted by a receiver, and affected by context, expectations and interference. Communication is therefore not finished when information is transmitted. Feedback checks whether the meaning received matches the meaning intended. In professional settings, a clear request also identifies what the receiver needs to do and how success will be recognized.",
    "steps": [
      [
        "Purpose",
        "Name the outcome or decision."
      ],
      [
        "Message",
        "Choose language and detail for the audience."
      ],
      [
        "Feedback",
        "Ask the receiver to restate or clarify the action."
      ],
      [
        "Confirmation",
        "Agree on ownership, timing and the expected result."
      ]
    ],
    "example": {
      "scenario": "A team needs a revised report before a Friday meeting.",
      "work": [
        "Weak request: “Can someone look at the report soon?”",
        "Specify the output: “Please revise the two revenue tables using the approved figures.”",
        "Assign the owner and deadline: “Sam, send the updated tables by Thursday at 3 p.m.”",
        "Close the loop: ask Sam to confirm which source file will be used and flag any blocked input."
      ],
      "result": "The receiver can identify the deliverable, source, deadline and escalation condition without guessing."
    },
    "exercise": "Rewrite a vague request from your own work. Ask another person to identify the expected output, owner and deadline from the revised message alone. Revise any part they interpret differently.",
    "check": {
      "question": "Why is a recipient’s confirmation especially useful for an important request?",
      "answer": "It tests the meaning actually received. A sent message or a polite acknowledgment does not establish that the recipient understood the expected outcome."
    },
    "reading": [
      "Shannon, C. E. (1948). A Mathematical Theory of Communication. Bell System Technical Journal. A foundational transmission model; the feedback and interpersonal interpretation discussion here extends beyond that model.",
      "Clark, H. H. (1996). Using Language. Cambridge University Press. A treatment of language as coordinated joint action."
    ]
  },
  "critical-thinking": {
    "objectives": [
      "Separate observations, claims and assumptions.",
      "Compare plausible alternative explanations.",
      "Make a proportionate decision under uncertainty."
    ],
    "theory": "Critical thinking evaluates the connection between reasons and conclusions. An observation can be accurate while the explanation inferred from it is wrong. Deductive arguments require a valid structure and true premises; inductive conclusions are supported to varying degrees by evidence. In everyday decisions, checking base rates, measurement quality and competing explanations often matters more than collecting additional anecdotes.",
    "steps": [
      [
        "Claim",
        "State exactly what is being asserted."
      ],
      [
        "Evidence",
        "Identify observations and their reliability."
      ],
      [
        "Alternatives",
        "Test other explanations and hidden assumptions."
      ],
      [
        "Judgment",
        "State the conclusion, uncertainty and next test."
      ]
    ],
    "example": {
      "scenario": "A shop changes its homepage and sales decline the following week.",
      "work": [
        "Separate the observed decline from the claim that the redesign caused it.",
        "Check traffic sources, stock availability and seasonal changes.",
        "Compare conversion rates for comparable traffic before and after the redesign.",
        "If feasible, run a controlled comparison with the old version and define success before testing."
      ],
      "result": "The conclusion remains provisional until the evidence distinguishes the redesign from other plausible causes."
    },
    "exercise": "Take a claim from a headline or meeting. Write its premises, one competing explanation, and one observation that would make you change your mind.",
    "check": {
      "question": "Does a sales decline immediately after a redesign prove causation?",
      "answer": "No. Timing supports a possible causal hypothesis, but it does not exclude other changes or chance. A controlled comparison or other credible causal evidence is needed."
    },
    "reading": [
      "Toulmin, S. E. (1958). The Uses of Argument. Cambridge University Press. A framework for examining claims, grounds and warrants.",
      "Kahneman, D. (2011). Thinking, Fast and Slow. Farrar, Straus and Giroux. A discussion of judgment and cognitive biases; individual claims should be assessed against subsequent research."
    ]
  },
  "data-analysis": {
    "objectives": [
      "Translate a business question into a measurable quantity.",
      "Calculate and interpret a rate using its denominator.",
      "Distinguish descriptive patterns from causal conclusions."
    ],
    "theory": "Data analysis starts by defining the question, unit of observation and relevant population. A measure should represent the concept being investigated; for example, page views measure recorded page loads rather than understanding. Ratios make comparisons more meaningful when group sizes differ, but changes in sampling, missing records and measurement definitions can distort the result. Good analysis documents its assumptions and communicates uncertainty.",
    "steps": [
      [
        "Question",
        "Define the decision and population."
      ],
      [
        "Prepare",
        "Check definitions, completeness and duplicates."
      ],
      [
        "Calculate",
        "Choose the relevant measure and denominator."
      ],
      [
        "Interpret",
        "Explain limits and the next evidence needed."
      ]
    ],
    "example": {
      "scenario": "Two landing pages receive different numbers of visitors. Page A has 40 signups from 800 visitors; Page B has 30 from 300.",
      "work": [
        "Calculate A: 40 divided by 800 equals 5%.",
        "Calculate B: 30 divided by 300 equals 10%.",
        "Compare rates, not just signup counts. B has the higher observed signup rate.",
        "Check visitor mix and sampling uncertainty before concluding that B's design caused the difference."
      ],
      "result": "B is associated with a higher observed rate, while A produces more total signups. The preferred decision depends on the objective and evidence."
    },
    "exercise": "Create a small table with visits and outcomes for three hypothetical pages. Compute each rate, explain which metric matches your objective, and identify one potential confounder.",
    "check": {
      "question": "Why can total signups alone be misleading when comparing landing pages?",
      "answer": "Different traffic volumes change total counts. A rate accounts for exposure, though even the rate may be affected by traffic quality and other differences."
    },
    "reading": [
      "Tukey, J. W. (1977). Exploratory Data Analysis. Addison-Wesley.",
      "NIST/SEMATECH e-Handbook of Statistical Methods. https://www.itl.nist.gov/div898/handbook/"
    ]
  },
  "ai-literacy": {
    "objectives": [
      "Identify tasks suitable for AI assistance and tasks requiring expert review.",
      "Specify context, constraints and verification criteria.",
      "Distinguish an AI-generated draft from a verified deliverable."
    ],
    "theory": "Generative models produce outputs based on learned statistical patterns and the supplied context. A plausible sentence is not a guarantee of factual accuracy. Reliability varies by task and system; AI assistance is most useful when the user can evaluate the result or obtain qualified review. A workflow should separate generation from verification and assign human responsibility for decisions, especially when consequences are significant.",
    "steps": [
      [
        "Scope",
        "Define the task and assess the consequences of error."
      ],
      [
        "Context",
        "Supply permitted evidence, constraints and expected format."
      ],
      [
        "Verify",
        "Check claims, calculations and omissions independently."
      ],
      [
        "Approve",
        "Correct the output and assign a responsible decision owner."
      ]
    ],
    "example": {
      "scenario": "A manager asks AI to summarize approved meeting minutes into a project action list.",
      "work": [
        "Remove confidential material not approved for the tool.",
        "Ask for tasks, owners and deadlines explicitly stated in the minutes, and mark missing fields as unknown.",
        "Compare each action against the original minutes; reject invented owners and dates.",
        "Have the meeting owner confirm disputed items before distribution."
      ],
      "result": "The assistant accelerates drafting while the manager maintains control over factual commitments."
    },
    "exercise": "Use a non-sensitive document with known facts. Ask an AI to summarize it, then mark each claim as supported, contradicted or not established. Revise the task brief and compare the next result.",
    "check": {
      "question": "An AI cites a convincing research paper. What is the next step before using it?",
      "answer": "Locate the original source, confirm that it exists and supports the claim, and consider its limitations. Fluent wording and a formatted citation do not establish accuracy."
    },
    "reading": [
      "NIST (2024). Artificial Intelligence Risk Management Framework: Generative Artificial Intelligence Profile (NIST AI 600-1). https://doi.org/10.6028/NIST.AI.600-1",
      "Noy, S. and Zhang, W. (2023). Experimental Evidence on the Productivity Effects of Generative Artificial Intelligence. Science. https://doi.org/10.1126/science.adh2586"
    ]
  },
  "active-listening": {
    "objectives": [
      "Distinguish listening from silently waiting to respond.",
      "Paraphrase meaning without prematurely agreeing or advising.",
      "Use clarification to test assumptions and identify next steps."
    ],
    "theory": "Active listening is a process of attending, interpreting and checking understanding. A paraphrase should capture the speaker’s meaning in the listener’s own words, not merely echo the wording. Open questions clarify details; a tentative reflection of emotion can acknowledge a concern without claiming to know what someone feels. Understanding a position is not the same as endorsing it.",
    "steps": [
      [
        "Attend",
        "Reduce distractions and let the speaker finish."
      ],
      [
        "Reflect",
        "Paraphrase the meaning and tentative concern."
      ],
      [
        "Clarify",
        "Ask a focused question about what remains uncertain."
      ],
      [
        "Confirm",
        "Invite correction before offering advice or acting."
      ]
    ],
    "example": {
      "scenario": "A teammate says, “I’m tired of all these last-minute requests.”",
      "work": [
        "Avoid jumping to a solution or defending the requests.",
        "Reflect: “It sounds like the unexpected timing is making it difficult to plan your work.”",
        "Clarify: “Is the main issue the number of requests or how late they arrive?”",
        "Confirm the answer and agree on an appropriate follow-up, such as a shared request deadline."
      ],
      "result": "The response tests the cause of the concern instead of assuming it, making a suitable response more likely."
    },
    "exercise": "Ask a willing partner to describe a minor work challenge for two minutes. Paraphrase it and ask them to rate whether your summary reflects their main concern. Repeat using their correction.",
    "check": {
      "question": "Why is “So the deadline changes are the main problem—is that right?” more useful than “I understand”?",
      "answer": "It states a specific interpretation that the speaker can confirm or correct, reducing the risk of acting on a mistaken assumption."
    },
    "reading": [
      "Rogers, C. R. (1951). Client-Centered Therapy. Houghton Mifflin. A historical foundation for empathic understanding in helping relationships."
    ]
  },
  "project-management": {
    "objectives": [
      "Distinguish project scope, milestones, dependencies and risks.",
      "Define an observable acceptance criterion.",
      "Use a change-control decision to protect the project objective."
    ],
    "theory": "Project management coordinates temporary work toward a defined outcome under constraints. Scope identifies the agreed deliverables and exclusions; milestones mark meaningful events; dependencies specify which work relies on other work; risks describe uncertain events and their effects. A useful plan ties these concepts to named owners, evidence of completion and a method for evaluating changes rather than treating the schedule as fixed regardless of circumstances.",
    "steps": [
      [
        "Outcome",
        "Define the deliverable and acceptance criteria."
      ],
      [
        "Plan",
        "Identify tasks, owners, dependencies and milestones."
      ],
      [
        "Monitor",
        "Check progress, risks and unresolved decisions."
      ],
      [
        "Adapt",
        "Evaluate changes against scope, resources and benefit."
      ]
    ],
    "example": {
      "scenario": "A team must launch a new signup form by Friday, with legal approval before release.",
      "work": [
        "Define acceptance criteria: the form submits correctly, consent language is approved, and errors are handled.",
        "Assign implementation and testing owners; record legal approval as a release dependency.",
        "Identify a risk: legal review might be delayed. Set an escalation point on Wednesday.",
        "If a new feature is requested, compare its benefit with delivery and testing costs before approving a scope change."
      ],
      "result": "The plan reveals what must happen, who owns it and what would justify a change; it does not hide uncertainty behind a deadline."
    },
    "exercise": "Map a small project in five rows: deliverable, owner, acceptance criterion, dependency and risk. Add a decision rule for one foreseeable change.",
    "check": {
      "question": "A release depends on an approval that may be late. What information makes that dependency actionable?",
      "answer": "The approval owner, required date, affected release milestone, consequence of delay and escalation point make it possible to act before the project is blocked."
    },
    "reading": [
      "Project Management Institute (2021). A Guide to the Project Management Body of Knowledge (PMBOK Guide), Seventh Edition. A principles-based reference, not the only valid project methodology."
    ]
  }
};

const caseStudies: Record<string, NonNullable<TextbookChapter['caseStudy']>> = {
  "communication": {
    "context": "You coordinate a Friday client presentation. Finance needs approved pricing assumptions before revising slide 4. It is Wednesday afternoon.",
    "concept": "A request must distinguish the deliverable from its prerequisite, identify ownership and timing, and close the feedback loop.",
    "task": "Write a message naming the input, deliverable, owners, deadlines and escalation point. Ask the recipient to confirm the plan.",
    "criteria": [
      "Names a specific deliverable and owner",
      "Identifies the prerequisite and timing",
      "Invites confirmation or correction"
    ],
    "solution": "Alex, I will send the approved assumptions by Thursday at 10 a.m. Please update slide 4 using those figures by 2 p.m. If the assumptions are missing at 10, tell me immediately. Can you confirm the source and deadline? This establishes a sequence and makes a potential blocker visible."
  },
  "critical-thinking": {
    "context": "Complaints about a course rose from 8 to 16 after a redesign, while enrollments rose from 100 to 400.",
    "concept": "Counts and rates answer different questions. A causal explanation requires evidence that distinguishes competing hypotheses.",
    "task": "Calculate both complaint rates, propose two explanations and identify a test to distinguish them.",
    "criteria": [
      "Calculates 8% and 4%",
      "Separates observation from causal inference",
      "Identifies a useful comparison"
    ],
    "solution": "Complaints increased in count but fell from 8% to 4% of enrollments. The redesign may have improved usability, or new learners may differ from prior learners. Compare similar learners or conduct a controlled layout test, checking complaint definitions. Neither the count nor the rate establishes causation."
  },
  "data-analysis": {
    "context": "A learning site records 72 exercise completions from 600 mobile visitors and 40 from 200 desktop visitors. Assume each completion belongs to a different visitor.",
    "concept": "A rate uses a denominator that represents the population exposed to the opportunity. Overall rates weight groups by their sizes.",
    "task": "Calculate both device completion rates and the combined rate. Explain why an unweighted average is misleading.",
    "criteria": [
      "Mobile 12%, desktop 20%",
      "Combined 14% (112/800)",
      "Recognizes unequal group sizes and avoids claiming causation"
    ],
    "solution": "Mobile: 72/600 = 12%. Desktop: 40/200 = 20%. Overall: 112/800 = 14%, not 16%, because mobile contributes more observations. A device gap is visible, but differences in lesson mix and visitor intent could explain it."
  },
  "ai-literacy": {
    "context": "An AI drafts a product FAQ using an approved specification sheet. It introduces a warranty duration that the sheet never mentions.",
    "concept": "Grounding ties claims to evidence. Unsupported does not necessarily mean false, but an unsupported claim must not be treated as verified.",
    "task": "Classify the warranty claim, rewrite the prompt to limit unsupported additions, and describe a release check.",
    "criteria": [
      "Marks the duration as unverified",
      "Restricts answers to approved evidence",
      "Requires human confirmation before publication"
    ],
    "solution": "Mark the warranty duration as not established. Prompt: Use only the supplied specification; identify the section supporting each answer and write not specified for missing information. Check each answer against the sheet, and obtain approved warranty wording from the product owner before publication."
  },
  "active-listening": {
    "context": "A coworker says, “Nobody tells me when priorities change. I end up looking unreliable even though I finish my original assignments.”",
    "concept": "Reflection tests meaning, while clarification narrows uncertainty. Understanding does not require agreement or an immediate solution.",
    "task": "Respond with a tentative paraphrase, acknowledge the concern and ask one specific clarifying question before proposing action.",
    "criteria": [
      "Avoids blame or premature advice",
      "Invites correction of the interpretation",
      "Asks a non-leading question"
    ],
    "solution": "It sounds like you're being judged against priorities you didn't know had changed. Am I understanding correctly? Could you walk me through the last time that happened? This response checks meaning and gathers a concrete example before choosing a solution."
  },
  "project-management": {
    "context": "A registration form must launch in five working days. Development needs two days; testing needs one day after development. Privacy approval needs one day and can occur in parallel. An optional feature adds two development days.",
    "concept": "Dependencies determine task order. Parallel work can reduce elapsed time; scope changes consume schedule margin.",
    "task": "Sketch a five-day schedule, identify release dependencies and decide how to handle the optional feature.",
    "criteria": [
      "Places testing after development",
      "Requires privacy approval before release",
      "Explains how the optional feature affects schedule margin"
    ],
    "solution": "Days 1–2: develop; day 1: privacy review if the necessary inputs are ready; day 3: test; day 4: fix defects and confirm approval; day 5: launch if criteria are met. Adding two development days pushes testing to day 5 and eliminates contingency. Defer the feature or agree on a revised plan."
  }
};

export function getTextbookChapter(slug: string): TextbookChapter | undefined {
  const chapter = chapters[slug];
  return chapter ? { ...chapter, caseStudy: caseStudies[slug] } : undefined;
}
