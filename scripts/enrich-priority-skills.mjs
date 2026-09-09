import fs from 'node:fs';
import path from 'node:path';

const file = path.join(process.cwd(), 'src', 'data', 'skills-1000plus.json');
const skills = JSON.parse(fs.readFileSync(file, 'utf8'));
const reviewedAt = '2026-09-09';

const enrichments = {
  'employee-experience': {
    shortDefinition:
      'The discipline of designing and improving the end-to-end conditions and interactions that shape how employees experience work, from onboarding and everyday management through development, change, and exit.',
    fullDefinition:
      'Employee experience is the accumulated experience created by the many interactions an employee has with an organization: the work itself, line management, trust, voice, culture, policies, technology, physical or digital work environments, development opportunities, communication, recognition, and major moments in the employee journey. Strong employee-experience practice does not reduce the topic to perks or a survey score. It identifies the moments and operating conditions that matter, gathers employee evidence, traces friction back to policies or systems, and improves the work environment in ways that are useful to both employees and the organization.',
    whyItMatters:
      'Employee experience matters because everyday working conditions influence whether people can do good work, trust leaders, stay with the organization, adapt to change, and recommend the workplace to others. The useful question is not whether employees are always happy; it is whether the organization creates clear, fair, workable conditions in which people can contribute and recover from problems. Improvements should be judged through evidence such as retention patterns, onboarding outcomes, employee voice, manager quality, absence or wellbeing indicators, service outcomes, and qualitative feedback rather than a single sentiment score.',
    modernRelevance:
      'Hybrid work, AI-enabled workflows, digital monitoring, rapid restructuring, and changing employee expectations make employee experience a systems problem rather than an HR campaign. Technology can remove friction, but it can also create overload, surveillance concerns, confusing handoffs, and inequitable access. Modern practitioners therefore examine the human impact of new tools, the quality of manager-employee relationships, employee voice, trust, accessibility, workload, and whether changes improve both the experience of work and the organization’s ability to perform.',
    whereItShowsUp:
      'Employee experience shows up in recruitment handoffs, onboarding, role clarity, manager interactions, collaboration norms, workplace technology, learning and mobility, performance conversations, recognition, wellbeing, change communication, employee voice, internal services, hybrid-work design, and offboarding. It is especially visible at moments where expectations are set or broken: a new hire’s first weeks, a manager change, a promotion process, a difficult policy decision, a technology rollout, a reorganization, or a return from leave.',
    professionalContexts: [
      'Employee listening and voice',
      'Onboarding and employee journeys',
      'Manager and team effectiveness',
      'Workplace technology and digital experience',
      'Organizational change',
      'Retention and employer brand',
      'Wellbeing and work design',
      'People-policy improvement',
    ],
    tools: [
      'Employee listening and survey platforms',
      'Journey-mapping tools',
      'HRIS and HCM platforms',
      'Collaboration and communication platforms',
      'People analytics dashboards',
    ],
    realWorldScenarios: [
      'New hires are leaving during the first six months. Map the onboarding journey, interview recent hires and managers, review time-to-productivity and early attrition, then redesign the highest-friction moments instead of adding more orientation content.',
      'A new AI assistant is introduced across the company. Study how it changes workload, role clarity, review expectations, trust, accessibility, and employee voice before treating adoption rate as success.',
      'Engagement survey scores fall after a reorganization. Combine survey themes with manager interviews, workload data, turnover patterns, and employee listening to separate temporary uncertainty from structural problems in work design or leadership.',
    ],
    skillInAction:
      'Strong employee-experience work starts with a real employee or business problem, defines the affected population and journey, gathers more than one kind of evidence, and identifies the underlying operating condition that creates the experience. The practitioner distinguishes symptoms from causes, involves employees without promising every preference will become policy, prioritizes improvements by impact and feasibility, and measures whether the change actually reduced friction or improved a meaningful outcome.',
    beginnerActions: [
      'Map one employee journey such as onboarding, internal mobility, or return from leave and identify the moments where expectations are created or broken.',
      'Learn to separate employee experience, engagement, satisfaction, wellbeing, and employer brand rather than using the terms interchangeably.',
      'Practice writing neutral interview and survey questions that uncover friction without steering people toward a preferred answer.',
      'Review one policy or digital workflow from the employee’s point of view and document unnecessary effort, ambiguity, or duplication.',
    ],
    intermediateActions: [
      'Combine qualitative employee feedback with operational data such as retention, absence, internal mobility, service times, or onboarding outcomes.',
      'Facilitate a cross-functional improvement involving HR, managers, IT, communications, or workplace teams and define ownership for each fix.',
      'Segment employee evidence carefully to find different experiences without exposing individuals or treating small groups as statistically certain.',
      'Pilot one experience improvement, define a baseline, and compare both employee feedback and operational outcomes after the change.',
    ],
    advancedActions: [
      'Design an organization-wide employee-experience framework that connects employee voice, work design, manager practices, technology, policy, and measurable outcomes.',
      'Build governance for employee listening so the organization collects only useful data, protects privacy, closes feedback loops, and avoids survey fatigue.',
      'Use journey evidence to influence operating-model, technology, policy, and leadership decisions rather than treating experience as an HR-owned communications program.',
      'Coach leaders to interpret employee evidence with appropriate caution and distinguish correlation, local context, and causal claims.',
    ],
    howToPractice:
      'Choose one bounded employee journey and treat it like a service to improve. Observe the current process, interview several people who experience it, capture the intended outcome, map friction points, and identify which policies, tools, handoffs, or management practices create them. Make one small change, define what should improve, and return to the same employees after implementation to compare the experience with the baseline.',
    howToMeasureProgress:
      'Use a balanced set of measures rather than a single engagement score. Track one experience indicator, one operational indicator, and one qualitative signal. Depending on the problem, these might include onboarding confidence, time-to-productivity, regrettable turnover, internal service time, manager effectiveness, employee voice, absence, internal mobility, or recurring themes in interviews. Progress is stronger when the same friction becomes less frequent and employees can explain what changed.',
    commonMistakes: [
      'Treating employee experience as perks, events, or employer-brand messaging',
      'Collecting feedback without closing the loop or changing underlying conditions',
      'Using a single survey score as proof of the total employee experience',
      'Ignoring line managers even though they shape much of the day-to-day experience',
      'Copying customer-experience methods without adapting for the employment relationship, power, privacy, and fairness',
      'Introducing workplace technology for efficiency without examining workload, trust, accessibility, and unintended consequences',
    ],
    coreSubskills: [
      'Employee journey mapping',
      'Employee listening and qualitative research',
      'Survey and measurement literacy',
      'Work and service-design thinking',
      'Manager and employment-relationship awareness',
      'Cross-functional facilitation',
      'Change and communication design',
      'Privacy, fairness, and employee-data judgment',
    ],
    developmentMethods:
      'Build capability through small journey-improvement projects. Use interviews, observation, process evidence, and relevant people data to create a current-state map. Develop several possible causes instead of jumping to one solution. Test a proportionate change, document the result, and review what employees actually experienced. Progress toward larger work only after you can show that your diagnosis and intervention logic are reliable.',
    practiceOpportunities:
      'Useful practice opportunities include onboarding redesign, employee-listening follow-up, manager enablement, internal-service improvement, HR technology rollouts, hybrid-work reviews, return-to-work processes, recognition programs, internal mobility, or a team-level change initiative. Choose projects where you can observe the current experience and measure whether a specific source of friction improved.',
    howEmployersEvaluate:
      'Employers look for more than enthusiasm for culture. Strong evidence shows that you can gather employee insight, connect it to business and people outcomes, identify root causes, influence managers and cross-functional partners, protect confidentiality, and measure whether an intervention changed anything. In interviews, describe the employee population, the journey or problem, evidence collected, trade-offs, intervention, result, and what you learned.',
    signalsOfMastery: [
      'Distinguishes employee experience from engagement, satisfaction, wellbeing, and employer brand',
      'Maps experiences to the policies, technologies, management practices, and work-design choices that create them',
      'Uses qualitative and quantitative evidence together',
      'Closes employee feedback loops and explains what will and will not change',
      'Measures operational outcomes as well as sentiment',
      'Identifies privacy, fairness, accessibility, and power concerns in employee data and workplace technology',
    ],
    careerImpact:
      'Employee-experience capability is valuable in HR, people operations, organizational development, internal communications, workplace strategy, change, employee listening, HR technology, and leadership roles. Career value increases when a practitioner can move from collecting sentiment to diagnosing work-system problems and influencing measurable improvements across functions.',
    evidenceSummary:
      'CIPD describes employee experience as the result of the interactions employees have with their employer and emphasizes the role of line management, trust, employee voice, engagement approaches, communications, employer brand, and the wider work environment. SHRM similarly treats employee experience as a broad journey that includes culture, leadership, tools, and workplace conditions. Both bodies frame employee experience as an organizational issue rather than a perks program. Use local evidence to decide which parts of the experience actually need intervention.',
    scholarlyNotes: [
      'CIPD, Employee experience roles and Profession Map: employee experience spans interactions with the employer, line management, trust, employee voice, engagement approaches, communications, and employer brand.',
      'SHRM, Guide to Employee Experience: employee experience includes the broader journey of work, including culture, leadership, tools, and work environment.',
      'CIPD workplace-technology research cautions that technology adoption should be evaluated for its effects on productivity, work-life balance, engagement, wellbeing, and the broader employee experience.',
    ],
    aiEraRelevance:
      'AI changes employee experience through new workflows, monitoring possibilities, role redesign, faster communication, and different expectations for judgment and review. The employee-experience skill now includes assessing whether AI removes low-value effort or simply shifts risk and cognitive load onto employees, whether people understand decision rights, and whether data collection remains proportionate and trustworthy.',
    humanAdvantage:
      'The durable human advantage is interpreting lived experience in context: understanding trust, fairness, power, identity, ambiguity, and trade-offs that cannot be reduced to an engagement score or automated workflow. Technology can surface patterns, but people still need to decide what those patterns mean and which organizational conditions should change.',
    lastUpdated: reviewedAt,
  },

  'people-analytics': {
    shortDefinition:
      'The disciplined use of people data, analytical methods, and business context to investigate workforce questions and support better organizational decisions.',
    fullDefinition:
      'People analytics uses quantitative and qualitative workforce data to answer business and people questions. It is more than HR reporting or dashboard production. A strong practitioner starts with a decision or problem, identifies the evidence needed, checks data quality and definitions, chooses an appropriate descriptive, diagnostic, predictive, or experimental method, interprets the result with attention to uncertainty and bias, and communicates what the evidence does and does not support. The work may draw from HR systems, surveys, finance, operations, learning, recruitment, performance, external benchmarks, and interviews, while treating privacy and employee trust as design constraints.',
    whyItMatters:
      'People decisions are expensive and consequential. Weak analysis can turn noisy metrics into false certainty about hiring, retention, performance, pay, wellbeing, or workforce planning. People analytics improves decision quality when it connects a clearly defined business problem with fit-for-purpose evidence and makes limitations visible. Its value is demonstrated when analysis changes a decision, improves targeting, reveals a hidden pattern, reduces avoidable cost or risk, or helps an organization evaluate whether a people intervention worked.',
    modernRelevance:
      'Organizations now have more people data and more automated analysis than ever, but more data does not guarantee better decisions. AI can accelerate coding, summarization, forecasting, and pattern detection while also making it easier to produce confident but misleading analysis. Modern people analytics therefore requires strong problem framing, data governance, privacy awareness, causal caution, fairness checks, reproducibility, and the ability to explain results to non-specialists.',
    whereItShowsUp:
      'People analytics appears in retention and attrition analysis, hiring funnels, workforce planning, pay and promotion reviews, learning effectiveness, absence and wellbeing analysis, engagement research, DEI measurement, internal mobility, skills analysis, span-of-control reviews, productivity questions, and evaluation of HR programs. It also appears whenever leaders ask whether a people policy is working and the answer requires more than anecdote.',
    professionalContexts: [
      'Workforce planning',
      'Retention and attrition analysis',
      'Recruitment and hiring funnels',
      'Employee listening and engagement',
      'Pay, promotion, and fairness analysis',
      'Learning and capability measurement',
      'HR program evaluation',
      'Workforce reporting',
    ],
    tools: [
      'HRIS and HCM reporting',
      'Spreadsheet and statistical-analysis tools',
      'Business-intelligence dashboards',
      'Survey and employee-listening platforms',
      'Data-visualization tools',
    ],
    realWorldScenarios: [
      'Turnover rises in one business unit. Define the population and time period, separate voluntary from involuntary exits, examine tenure and manager patterns, add interview evidence, and avoid claiming causation from a correlation alone.',
      'Leadership wants to know whether a training program improved performance. Build a comparison strategy before looking at the result, define the relevant outcome, account for selection effects, and state what the available design can and cannot prove.',
      'A predictive model flags employees at risk of leaving. Evaluate data quality, fairness, privacy, actionability, false-positive costs, and whether using the model would damage trust before recommending deployment.',
    ],
    skillInAction:
      'Strong people analytics begins with a decision, not a dataset. The practitioner translates a vague question into a testable problem, defines measures precisely, checks missingness and bias, chooses a method proportionate to the evidence, distinguishes correlation from causation, and validates surprising results. The final output explains the decision implication, uncertainty, affected groups, ethical considerations, and what additional evidence would change the conclusion.',
    beginnerActions: [
      'Take one HR metric and write its exact definition, numerator, denominator, time window, exclusions, and the decision it is meant to inform.',
      'Practice distinguishing descriptive, diagnostic, predictive, and prescriptive questions.',
      'Build a simple analysis using clean workforce data and explain the result without statistical jargon.',
      'Learn the difference between correlation and causation and identify common confounders in people data.',
    ],
    intermediateActions: [
      'Combine data from more than one source while documenting joins, definitions, missing values, and known data-quality limitations.',
      'Segment results to identify meaningful differences while checking small-sample risk and confidentiality.',
      'Use a comparison group, before-and-after design, or other evaluation logic when assessing a people intervention.',
      'Present a recommendation that states both the evidence and the uncertainty rather than hiding caveats in an appendix.',
    ],
    advancedActions: [
      'Design a people-analytics strategy that links priority business questions to data, governance, capability, and decision processes.',
      'Create review standards for predictive models, AI-assisted analysis, fairness, privacy, and model drift.',
      'Coach leaders to distinguish useful workforce evidence from vanity metrics and unsupported causal claims.',
      'Evaluate whether analytics actually improved decisions and organizational outcomes rather than merely increasing reporting volume.',
    ],
    howToPractice:
      'Choose a real workforce question and write the decision first. Specify what evidence would support or weaken each plausible explanation, then work backward to the data required. Clean and analyze a small dataset, document assumptions, create one clear visualization, and ask a knowledgeable reviewer to challenge your interpretation. Repeat with a question where the answer is not obvious and where a bad conclusion would have a real cost.',
    howToMeasureProgress:
      'Measure progress through analytical reliability and decision usefulness: fewer definition errors, better data-quality checks, reproducible work, clearer distinction between correlation and causation, more appropriate methods, fewer unsupported claims, and stakeholder ability to explain the implication correctly. Stronger practitioners can also show that an analysis changed a decision, improved targeting, or identified a measurable outcome that was later evaluated.',
    commonMistakes: [
      'Starting with available data instead of a decision or business question',
      'Treating correlation as proof of causation',
      'Using dashboards as a substitute for analysis',
      'Ignoring missing data, inconsistent definitions, and selection bias',
      'Reporting averages that hide important differences between groups',
      'Using sensitive people data without a clear purpose, proportionality, privacy controls, or employee trust',
      'Presenting predictive accuracy without examining fairness, actionability, and the cost of errors',
    ],
    coreSubskills: [
      'Problem framing and stakeholder questions',
      'Metric definition and data quality',
      'Descriptive and diagnostic analysis',
      'Correlation, causation, and evaluation design',
      'Segmentation and statistical reasoning',
      'Data visualization and decision communication',
      'Privacy, ethics, and fairness',
      'AI-assisted analysis and validation',
    ],
    developmentMethods:
      'Build capability by repeating the full analytics cycle on increasingly difficult questions: define the problem, identify stakeholders, design the data approach, collect or clean evidence, analyze, report, recommend, and evaluate impact. Keep an analysis log that records definitions, assumptions, decisions, caveats, and what a reviewer challenged. Progress faster by comparing your conclusion with an experienced analyst before the business acts on it.',
    practiceOpportunities:
      'Useful projects include recruitment-funnel analysis, early-tenure attrition, absence trends, internal mobility, learning evaluation, survey analysis, workforce planning, or a pay and promotion review. Start with anonymized or appropriately governed data and choose questions where a leader has a real decision to make.',
    howEmployersEvaluate:
      'Employers look for evidence that you can translate an ambiguous business question into a rigorous analysis, work with messy HR data, explain statistics to non-specialists, distinguish correlation from causation, protect confidential data, and recommend an action that fits the evidence. Strong portfolios show the question, dataset, method, quality checks, visualization, interpretation, limitations, and decision impact.',
    signalsOfMastery: [
      'Defines metrics precisely and challenges inconsistent data definitions',
      'Starts with a decision question rather than a preferred analytical technique',
      'Separates correlation, prediction, and causal claims',
      'Makes uncertainty and data limitations visible',
      'Protects privacy and considers fairness before using sensitive workforce data',
      'Communicates a proportionate recommendation that stakeholders can understand and act on',
    ],
    careerImpact:
      'People-analytics capability increases the value of HR business partners, people operations, workforce planning, talent, reward, learning, organizational development, and dedicated analytics specialists. Career impact is strongest when a practitioner combines analytical fluency with business context and can influence decisions rather than only produce reports.',
    evidenceSummary:
      'CIPD defines people analytics as analysing people data to solve business problems and treats it as a core part of evidence-based HR. Its guidance emphasizes a process that begins with stakeholder and business questions, moves through data strategy, collection, analysis, reporting, recommendation, and evaluation, and distinguishes descriptive, predictive, and prescriptive uses. CIPD also warns that people data can be intrusive and should be collected and used transparently, lawfully, and proportionately.',
    scholarlyNotes: [
      'CIPD People Analytics factsheet: people analytics uses data about people to solve business problems and can draw from HR systems, other internal systems, and external sources.',
      'CIPD practitioner guidance places people data alongside professional expertise, scientific literature, and stakeholder views as part of evidence-based practice.',
      'CIPD cautions that workforce monitoring can be lawful yet still intrusive or contentious; transparency, relevance, necessity, and discrimination risk matter.',
    ],
    aiEraRelevance:
      'AI can accelerate data cleaning, code generation, text analysis, forecasting, and explanation, but it also makes unsupported inference easier to scale. People analysts must verify AI-produced code and claims, protect sensitive data, monitor model bias, and retain human accountability for employment decisions. The value shifts from producing analysis quickly to ensuring the question, method, evidence, and decision are defensible.',
    humanAdvantage:
      'The human advantage is deciding what the organization should ask, which data is legitimate to use, what trade-offs are acceptable, and how much confidence a decision deserves. Context, ethics, employee trust, and causal judgment cannot be delegated safely to a dashboard or model output.',
    lastUpdated: reviewedAt,
  },

  hris: {
    shortDefinition:
      'The ability to configure, govern, and improve human resource information systems so workforce data, HR workflows, access, reporting, and employee self-service are accurate, secure, and useful.',
    fullDefinition:
      'HRIS capability combines HR process knowledge with systems thinking. A practitioner understands how employee records, organizational structures, workflows, permissions, integrations, reporting, and self-service fit together across the employee lifecycle. The skill is not simply navigating an HR platform. It includes defining data ownership, translating HR policies into reliable workflows, maintaining data quality, testing changes, controlling access to sensitive information, coordinating integrations with payroll or other systems, and improving adoption without creating unnecessary custom complexity.',
    whyItMatters:
      'HRIS data and workflows sit underneath many high-stakes people processes. Errors can affect pay, benefits, reporting, access, compliance, manager decisions, and employee trust. A well-governed system reduces duplicate administration and makes workforce information easier to use, while a poorly governed system can automate bad processes and spread inaccurate data faster. HRIS skill therefore matters both for operational efficiency and for the quality of downstream analytics and decisions.',
    modernRelevance:
      'Modern HRIS and HCM platforms increasingly connect workflow automation, employee self-service, analytics, document management, integrations, and AI-assisted features. That raises the value of clean data, clear permissions, process ownership, integration design, and change control. As organizations automate more people processes, the practitioner must understand not only what the system can do but what should be automated, where human review belongs, and how to protect sensitive workforce data.',
    whereItShowsUp:
      'HRIS skill appears in employee-record management, onboarding and offboarding, organizational changes, leave workflows, benefits administration, performance processes, document management, manager and employee self-service, workforce reporting, system integrations, security roles, data migrations, audits, vendor changes, and implementation projects.',
    professionalContexts: [
      'Core employee data management',
      'HR workflow automation',
      'Manager and employee self-service',
      'Reporting and workforce analytics',
      'Data migration and system implementation',
      'Security roles and privacy controls',
      'Payroll and benefits integrations',
      'HR technology governance',
    ],
    tools: [
      'HRIS and HCM platforms',
      'Workflow and integration tools',
      'Reporting and analytics tools',
      'Identity and access-management systems',
      'Data-quality and migration utilities',
    ],
    realWorldScenarios: [
      'A promotion workflow creates conflicting job and pay records. Trace the data model and approval sequence, identify the source of truth, correct the workflow, test edge cases, and monitor the next cycle.',
      'An organization replaces its HRIS. Clean and map legacy data before migration, define ownership and retention rules, test integrations, reconcile critical totals, and prepare employee and manager support before launch.',
      'Managers request broader access to workforce data for planning. Translate the business need into least-privilege roles, document the purpose, test access, and avoid exposing sensitive information simply because the platform allows it.',
    ],
    skillInAction:
      'Strong HRIS practice begins with a process and data model, not a screen configuration. The practitioner identifies the source of truth, data owner, user groups, approval logic, security requirements, integration points, failure cases, and reporting needs before configuring a change. They test with realistic scenarios, document decisions, reconcile outputs, monitor adoption, and treat sensitive workforce data as a governed asset rather than a convenient database.',
    beginnerActions: [
      'Map the employee lifecycle in your HR system and identify which records and workflows are authoritative at each stage.',
      'Learn the difference between configuration, customization, integration, role-based access, and reporting.',
      'Practice data-quality checks for duplicate records, missing fields, invalid dates, and inconsistent organizational structures.',
      'Document one common HR workflow including trigger, owner, approvals, system actions, notifications, and completion criteria.',
    ],
    intermediateActions: [
      'Configure or redesign a bounded workflow and test normal, exception, and reversal cases before release.',
      'Build a role-based access matrix that matches business need to least-privilege data access.',
      'Coordinate a data migration or integration with reconciliation checks and a rollback plan.',
      'Create operational reporting that helps HR or managers identify exceptions rather than producing a dashboard with no action attached.',
    ],
    advancedActions: [
      'Design HR technology governance covering data ownership, configuration standards, change control, access reviews, integrations, vendor management, and documentation.',
      'Lead a major HRIS implementation or module rollout while balancing process simplification, user adoption, privacy, and technical constraints.',
      'Establish data-quality controls that support reliable people analytics and downstream AI use.',
      'Review automation and AI features for decision rights, human oversight, data exposure, bias, and auditability before adoption.',
    ],
    howToPractice:
      'Choose a real HR workflow and model it before touching the system. Write the trigger, required data, decision rules, approvals, outputs, permissions, exceptions, and success criteria. Configure or simulate the process in a safe environment, run test cases, reconcile the output, and ask actual users where the workflow creates confusion or duplicate effort. Repeat with more complex workflows that cross systems.',
    howToMeasureProgress:
      'Track data accuracy, exception rates, unresolved tickets, workflow completion time, rework, integration failures, access-review findings, reporting reliability, and user adoption. For project work, measure migration reconciliation, defect rates, support volume after release, and whether the new process reduced manual effort without creating new risk.',
    commonMistakes: [
      'Treating the HRIS as an IT database rather than a people-process system',
      'Automating a broken process without simplifying it first',
      'Migrating poor-quality legacy data without ownership and reconciliation',
      'Granting broad access because it is easier than designing appropriate security roles',
      'Over-customizing the platform until upgrades and support become difficult',
      'Building reports without clear definitions, action owners, or data-quality checks',
      'Launching changes without testing exception cases or preparing users',
    ],
    coreSubskills: [
      'HR data models and employee lifecycle',
      'Workflow configuration and process design',
      'Data quality and reconciliation',
      'Role-based access and privacy',
      'Integrations and system interfaces',
      'Reporting and workforce data definitions',
      'Testing, release, and change control',
      'Vendor and implementation management',
    ],
    developmentMethods:
      'Develop HRIS skill by combining process mapping, configuration practice, data-quality work, and user support. Start with one workflow and one report, document the current state, make a controlled change, test it, and review the impact with HR users. Progress to integrations, security, and migration work only after you can explain the underlying data and process logic rather than relying on platform-specific clicks.',
    practiceOpportunities:
      'Useful practice includes onboarding workflows, job-change approvals, employee self-service, data cleanup, reporting definitions, access reviews, ticket analysis, module rollouts, integration testing, and migration projects. Sandbox environments and implementation projects are especially valuable because they expose both system behavior and real process trade-offs.',
    howEmployersEvaluate:
      'Employers look for evidence that you understand both HR processes and systems: data structures, workflows, security, reporting, integrations, testing, and user adoption. Strong candidates can explain a configuration or implementation problem from requirement through design, testing, launch, and support, including the failure modes they anticipated and the controls they used.',
    signalsOfMastery: [
      'Can explain the source of truth and ownership for critical workforce data',
      'Translates policy and process requirements into reliable system logic',
      'Designs least-privilege access for sensitive information',
      'Tests normal and exception cases before release',
      'Uses reconciliation and data-quality checks rather than assuming integrations are correct',
      'Simplifies processes before automating them',
    ],
    careerImpact:
      'HRIS skill supports careers in HR operations, HR technology, people systems, people analytics, payroll and benefits operations, implementation consulting, and digital HR transformation. The strongest career signal comes from owning reliable system outcomes rather than only administering transactions.',
    evidenceSummary:
      'SHRM describes an HRIS as a centralized platform that stores employee information, automates HR processes, and provides secure access to workforce data. Its 2026 guidance highlights capabilities such as leave management, performance, document storage, reporting, workforce analytics, and employee self-service, while emphasizing administrative efficiency, employee experience, compliance, and data privacy. Modern HRIS skill therefore combines process, data, security, reporting, and governance rather than simple software navigation.',
    scholarlyNotes: [
      'SHRM, Modernizing Your HRIS: modern HRIS platforms centralize workforce data, automate HR processes, and support secure access for employees, managers, HR professionals, and administrators.',
      'SHRM identifies leave management, performance evaluations, document storage, reporting, workforce analytics, and employee self-service among common HRIS capabilities.',
    ],
    aiEraRelevance:
      'AI features increasingly depend on HRIS data and permissions. Poor data quality, weak access controls, or unclear workflow ownership can therefore affect automated recommendations and downstream analysis. Practitioners need to understand what data an AI feature uses, how outputs are reviewed, which decisions remain human-owned, and whether sensitive information is exposed beyond its intended purpose.',
    humanAdvantage:
      'The human advantage is translating policy, employee needs, legal and privacy constraints, and messy organizational processes into a system that is reliable and proportionate. Platforms can automate configured rules, but people still decide which rules are appropriate, which exceptions matter, and how to govern sensitive workforce data.',
    lastUpdated: reviewedAt,
  },

  'learning-management-systems': {
    shortDefinition:
      'The ability to administer and improve learning-management systems so training content, access, assignments, tracking, reporting, and learner support contribute to real capability development rather than completion alone.',
    fullDefinition:
      'Learning Management Systems skill combines learning-and-development knowledge with platform administration and data discipline. It includes organizing learning content, managing audiences and permissions, assigning required or optional learning, supporting learners and managers, maintaining course metadata, handling integrations, monitoring accessibility, producing useful reports, and evaluating whether the platform supports application on the job. The skill is distinct from instructional design: an LMS can distribute and record learning, but it does not guarantee that content is relevant, understood, retained, or transferred into performance.',
    whyItMatters:
      'Organizations use learning platforms for onboarding, compliance, professional development, role academies, certification, product knowledge, and large-scale upskilling. Poor administration creates outdated content, confusing catalogs, access problems, unreliable completion data, and low trust. Strong LMS practice makes required learning easier to find and complete, supports a useful learner journey, and gives L&D teams evidence that can be connected to capability and performance rather than reporting activity for its own sake.',
    modernRelevance:
      'Digital learning now spans LMS, learning-experience platforms, virtual classrooms, content libraries, collaboration tools, mobile learning, and AI-generated materials. The challenge is no longer simply putting courses online. Modern practitioners must manage content quality, accessibility, security, self-directed learning, integration, learning data, and the growing volume of AI-assisted content while keeping the learner’s real work context in view.',
    whereItShowsUp:
      'LMS skill appears in onboarding, compliance programs, role-based academies, certification, continuing professional development, manager development, product and sales enablement, partner or customer education, mandatory recertification, learning campaigns, course migrations, platform implementations, and reporting to business or regulatory stakeholders.',
    professionalContexts: [
      'Onboarding and required learning',
      'Compliance and recertification',
      'Role academies and capability building',
      'Learning operations and learner support',
      'Digital learning content governance',
      'Learning analytics and reporting',
      'Platform implementation and migration',
      'Accessibility and learner experience',
    ],
    tools: [
      'LMS and LXP platforms',
      'Digital authoring tools',
      'Virtual-classroom and webinar platforms',
      'Learning analytics dashboards',
      'Content libraries and integration tools',
    ],
    realWorldScenarios: [
      'Mandatory training completion is high but employees still make the same process errors. Separate completion from learning transfer, review assessment quality, observe the work, and redesign practice or reinforcement around the real failure points.',
      'A company migrates to a new LMS. Clean course metadata, define archive and retention rules, map audiences and permissions, test historical records, validate integrations, and design support for learners and managers before cutover.',
      'AI makes it easy for teams to generate dozens of new courses. Create content-governance rules for ownership, evidence, accessibility, duplication, review dates, and retirement so the catalog does not become a landfill.',
    ],
    skillInAction:
      'Strong LMS administration begins with the learning objective and audience. The practitioner chooses the right platform behavior, structures content so it can be found, configures access and assignment logic, tests the learner journey, verifies tracking, and builds reporting around a decision or obligation. They maintain ownership and review dates, remove obsolete material, monitor support issues, and distinguish platform activity from evidence that people learned or applied something.',
    beginnerActions: [
      'Map the learner journey from enrollment or assignment through access, completion, assessment, and follow-up.',
      'Learn the difference between LMS administration, instructional design, content authoring, facilitation, and learning analytics.',
      'Create clear course metadata including audience, objective, owner, review date, prerequisites, and completion rule.',
      'Test one course as a learner, manager, and administrator and document where permissions or instructions create friction.',
    ],
    intermediateActions: [
      'Design role- or audience-based assignment rules and test edge cases before launch.',
      'Create a learning dashboard that answers a specific operational question rather than only listing completion percentages.',
      'Audit a catalog for duplication, obsolete content, inaccessible formats, weak metadata, and missing owners.',
      'Connect LMS evidence with manager feedback, assessment, work samples, or performance measures when evaluating learning transfer.',
    ],
    advancedActions: [
      'Lead an LMS migration or implementation with clear data, integration, accessibility, security, support, and content-governance requirements.',
      'Design governance for AI-assisted learning content including source quality, review, duplication, versioning, and human approval.',
      'Build a learning ecosystem in which LMS, live learning, practice, social learning, and workplace performance support one another.',
      'Evaluate whether the platform and learning architecture improve capability, not only adoption or course consumption.',
    ],
    howToPractice:
      'Take one real learning program and audit the entire platform journey. Define the audience and behavior the learning should support, inspect discovery and access, test assignment rules, verify tracking, review assessment quality, and examine what happens after completion. Fix one friction point and one evidence gap, then compare support tickets, learner feedback, assessment quality, or on-the-job follow-through after the change.',
    howToMeasureProgress:
      'Use platform-reliability measures such as access success, assignment accuracy, support volume, completion integrity, metadata quality, and integration errors, but pair them with learning evidence where possible. Stronger measurement includes assessment quality, practice performance, manager observation, time-to-competence, recertification results, or changes in a workplace outcome linked to the learning objective.',
    commonMistakes: [
      'Treating course completion as proof that learning occurred',
      'Filling the catalog with content that has no owner, audience, or retirement date',
      'Designing around platform features instead of the learner and work outcome',
      'Ignoring accessibility, mobile access, time constraints, or self-directed learning needs',
      'Using reporting that lists activity but supports no decision',
      'Migrating obsolete or poor-quality content into a new platform unchanged',
      'Generating large amounts of AI-assisted content without evidence, review, or governance',
    ],
    coreSubskills: [
      'Learner and administrator journey design',
      'Course metadata and catalog architecture',
      'Enrollment, assignment, and permission logic',
      'Learning records and reporting',
      'Accessibility and digital-learning usability',
      'Content governance and lifecycle',
      'Platform integrations and migration',
      'Learning-transfer and evaluation literacy',
    ],
    developmentMethods:
      'Build LMS capability by owning small operational improvements before major implementations. Audit real learner journeys, support issues, content metadata, assignments, and reports. Learn enough instructional design and evaluation to recognize when a platform fix will not solve a learning problem. Progress into migrations, integrations, and governance only after you can explain the learning and data consequences of a configuration choice.',
    practiceOpportunities:
      'Useful projects include onboarding pathways, compliance assignments, content cleanup, catalog redesign, course migrations, reporting improvements, learner support, accessibility reviews, manager dashboards, recertification, or a platform implementation. Volunteer for projects where you can observe both the system and what learners do after completion.',
    howEmployersEvaluate:
      'Employers look for evidence that you can administer the platform reliably, structure content, troubleshoot access, build assignment logic, maintain learning records, work with vendors and integrations, and connect platform data with real learning outcomes. Strong candidates can explain a migration, governance problem, reporting improvement, or learner-experience issue from diagnosis through implementation and verification.',
    signalsOfMastery: [
      'Separates platform activity from evidence of learning and transfer',
      'Maintains clear ownership, metadata, review dates, and retirement rules for content',
      'Tests learner, manager, and administrator journeys before release',
      'Designs reports around decisions and obligations rather than vanity metrics',
      'Understands accessibility, privacy, security, and integration implications',
      'Can explain when an LMS change will not solve an instructional-design or performance problem',
    ],
    careerImpact:
      'LMS capability supports careers in learning operations, learning technology, instructional design, L&D, enablement, HR technology, implementation consulting, and digital learning. Career value rises when a practitioner moves beyond administration into governance, analytics, integrations, accessibility, and learning-transfer evaluation.',
    evidenceSummary:
      'CIPD’s professional learning standards treat technology as part of learning-and-development design and delivery and explicitly discuss LMS and LXP systems alongside virtual classrooms, open resources, mobile learning, collaboration tools, and AI. Its guidance highlights accessibility, security, stakeholder and vendor relationships, learner self-direction, and the changing role of L&D professionals. These points support treating LMS capability as a learning-system discipline rather than simple course administration.',
    scholarlyNotes: [
      'CIPD learning standards ask practitioners to evaluate the strengths and weaknesses of LMS and LXP systems and the effect of technology on learning design and delivery.',
      'CIPD highlights accessibility, remote availability, security, stakeholder relationships, vendor relationships, and learner self-direction as important digital-learning considerations.',
    ],
    aiEraRelevance:
      'AI can accelerate content creation, tagging, search, recommendation, and learner support, but it can also multiply weak or duplicated material. LMS practitioners increasingly need governance for source quality, human review, content freshness, accessibility, privacy, and the difference between personalized recommendations and opaque or unfair decision-making.',
    humanAdvantage:
      'The human advantage is deciding what people actually need to learn, which evidence proves competence, how learning fits the work, and when platform efficiency conflicts with accessibility, trust, or sound learning design. Systems can distribute content; people still judge whether the experience creates useful capability.',
    lastUpdated: reviewedAt,
  },

  'employee-engagement': {
    shortDefinition:
      'The ability to understand, measure, and improve the conditions that support employees’ psychological connection to their work and organization, including meaningful work, autonomy, relationships, voice, trust, and good management.',
    fullDefinition:
      'Employee engagement is commonly used as an umbrella term for the psychological state that connects people with their work and organization. It is related to, but not identical with, job satisfaction, motivation, commitment, or happiness. Strong engagement practice identifies the specific aspect being measured, uses credible employee evidence, and works on the conditions that shape the experience of work: job design, autonomy, resources, leadership, manager support, voice, recognition, psychological safety, relationships, and organizational climate. The goal is not to manufacture enthusiasm; it is to create conditions in which people can invest attention and effort without ignoring workload, fairness, or wellbeing.',
    whyItMatters:
      'Engagement is useful because it helps organizations understand how people experience their work and whether conditions support commitment, energy, and discretionary effort. Research often finds positive relationships between engagement and outcomes such as performance, retention, customer experience, innovation, and wellbeing, but these relationships are not simple proof of causation. Good practice therefore avoids score-chasing and examines the underlying work conditions that leaders and managers can actually change.',
    modernRelevance:
      'Rapid AI adoption, hybrid work, organizational uncertainty, and frequent change can alter autonomy, workload, trust, role clarity, and relationships at work. Modern engagement practice must therefore look beyond annual surveys. It uses continuous but proportionate listening, manager capability, employee voice, job design, psychological safety, and clear communication while being careful not to treat employee monitoring or automated sentiment analysis as a substitute for trust.',
    whereItShowsUp:
      'Employee engagement appears in employee surveys, pulse listening, manager development, team retrospectives, workload and job-design reviews, recognition, internal communication, employee voice, change initiatives, retention analysis, culture work, wellbeing, and leadership routines. It is most useful when a score or comment leads to a specific question about the conditions of work and a clear owner for action.',
    professionalContexts: [
      'Employee listening and surveys',
      'Manager and team effectiveness',
      'Job design and autonomy',
      'Employee voice and communication',
      'Retention and workforce health',
      'Culture and psychological safety',
      'Organizational change',
      'Recognition and motivation',
    ],
    tools: [
      'Employee survey and listening platforms',
      'People analytics dashboards',
      'Team feedback and retrospective tools',
      'HRIS and HCM data',
      'Communication and collaboration platforms',
    ],
    realWorldScenarios: [
      'An engagement score drops after a return-to-office policy. Separate reactions to the policy from manager support, commute burden, autonomy, collaboration quality, workload, and communication before choosing an intervention.',
      'A team has high survey scores but rising turnover. Compare engagement data with exit themes, role progression, pay, manager changes, and workload rather than assuming the survey is wrong or complete.',
      'Managers receive team engagement scores but take no action. Give them a small interpretation framework, help them discuss one priority with the team, and track whether the chosen work condition changes before the next survey.',
    ],
    skillInAction:
      'Strong engagement practice defines the construct being measured, selects a credible listening method, protects confidentiality, and interprets scores alongside qualitative and operational evidence. The practitioner looks for actionable conditions rather than blaming employee attitude, involves managers and employees in sense-making, chooses a small number of priorities, and closes the loop by explaining what will change, what will not, and how progress will be checked.',
    beginnerActions: [
      'Learn to distinguish engagement from satisfaction, motivation, organizational commitment, and wellbeing.',
      'Review one survey question and identify exactly what psychological state or work condition it is intended to measure.',
      'Practice a team listening conversation that asks what helps people do good work and what gets in the way.',
      'Choose one actionable work condition such as role clarity, autonomy, manager support, or recognition and identify observable evidence for it.',
    ],
    intermediateActions: [
      'Interpret survey data alongside retention, absence, workload, manager, or qualitative evidence instead of using scores alone.',
      'Facilitate an action-planning session that turns broad feedback into one or two owned experiments.',
      'Segment engagement data responsibly to identify different experiences while protecting confidentiality and avoiding over-interpretation of small groups.',
      'Evaluate whether a manager or job-design intervention changes the underlying condition, not just the next score.',
    ],
    advancedActions: [
      'Design an engagement strategy that combines credible measurement, employee voice, manager capability, job design, communication, and follow-through.',
      'Create governance that prevents survey fatigue, protects anonymity, limits unnecessary monitoring, and clarifies how data will be used.',
      'Coach senior leaders to interpret engagement evidence without making unsupported causal claims or treating employees as the problem.',
      'Connect engagement work with employee experience, wellbeing, performance, retention, and organizational design while keeping the constructs distinct.',
    ],
    howToPractice:
      'Choose one team or employee population and identify a specific engagement-related condition to understand. Gather a small amount of structured feedback, hold a listening conversation, and compare it with one operational signal. Agree on a single change with a clear owner, explain the reasoning to employees, and return after several weeks to see whether the condition improved. Repeat with a different construct rather than endlessly asking the same survey questions.',
    howToMeasureProgress:
      'Measure both the quality of the listening process and the condition being improved. Useful indicators include response quality, participation, manager follow-through, role clarity, autonomy, psychological safety, intention to stay, recognition, workload, qualitative themes, and relevant operational outcomes. Avoid treating a small score movement as proof of causation. Strong progress is visible when leaders can name the work condition, act on it, and explain the evidence behind the decision.',
    commonMistakes: [
      'Treating engagement as the same thing as happiness or satisfaction',
      'Chasing survey scores without changing the conditions of work',
      'Assuming correlation between engagement and performance proves a simple causal relationship',
      'Over-surveying employees and failing to close the feedback loop',
      'Using perks and events as substitutes for job design, manager quality, autonomy, or trust',
      'Treating low engagement as an employee attitude problem rather than investigating organizational conditions',
      'Using passive monitoring or automated sentiment analysis without considering privacy and trust',
    ],
    coreSubskills: [
      'Engagement concepts and measurement literacy',
      'Survey and listening design',
      'Qualitative sense-making',
      'Manager enablement',
      'Job design, autonomy, and resources',
      'Employee voice and psychological safety',
      'Action planning and feedback loops',
      'Correlation, causation, and evidence judgment',
    ],
    developmentMethods:
      'Develop engagement skill through repeated listening-and-action cycles. Start with a specific construct, collect a modest amount of evidence, facilitate sense-making, and choose one work-condition change. Keep a record of what the data suggested, what alternative explanations existed, what action was taken, and whether the condition changed. Progress from team-level work to organization-level measurement only when you can show disciplined interpretation and follow-through.',
    practiceOpportunities:
      'Useful practice includes pulse surveys, team retrospectives, manager action planning, onboarding feedback, change listening, stay interviews, recognition reviews, workload discussions, employee voice forums, or analysis of retention themes. Choose work where employees will see whether the organization acted on what it heard.',
    howEmployersEvaluate:
      'Employers look for evidence that you understand engagement concepts, can design or interpret employee listening, protect confidentiality, facilitate difficult feedback, coach managers, and turn evidence into realistic action. Strong candidates explain how they avoided score-chasing, considered alternative causes, chose an intervention, closed the loop with employees, and measured whether the underlying condition changed.',
    signalsOfMastery: [
      'Uses precise definitions instead of treating engagement as a catch-all for employee mood',
      'Interprets survey data with qualitative and operational evidence',
      'Distinguishes correlation from causation',
      'Turns listening into a small number of owned actions',
      'Protects confidentiality and avoids unnecessary monitoring',
      'Focuses on work conditions leaders and managers can actually change',
    ],
    careerImpact:
      'Employee-engagement capability supports careers in HR business partnering, employee experience, organizational development, people analytics, internal communication, culture, leadership development, and people operations. Career value is strongest when the practitioner can move from measurement into evidence-based improvement of work conditions.',
    evidenceSummary:
      'CIPD describes employee engagement as a psychological state and notes that there is no single universally accepted definition. Its 2025 factsheet distinguishes engagement from related concepts, discusses job design, leadership, management, culture, autonomy, and relationships as influences, and cautions that much of the evidence linking engagement to business outcomes is correlational rather than straightforward proof of causation. Good practice therefore combines sound measurement with changes to the conditions of work.',
    scholarlyNotes: [
      'CIPD Employee Engagement and Motivation factsheet: employee engagement is treated as a psychological state, with multiple definitions in the literature.',
      'CIPD identifies influences including job demands and resources, leadership and management, organizational climate, psychological safety, autonomy, and managerial support.',
      'CIPD notes that many engagement-performance findings are correlational and that observed causal effects can be modest and bidirectional.',
    ],
    aiEraRelevance:
      'AI can affect engagement by changing autonomy, workload, job meaning, role clarity, monitoring, and relationships with managers and colleagues. Engagement practitioners need to separate genuine productivity gains from experiences of increased control or uncertainty, involve employees in workflow changes, and avoid using automated sentiment or productivity signals as if they directly measured engagement.',
    humanAdvantage:
      'The human advantage is understanding why a work condition feels enabling or draining in context and facilitating the conversations needed to change it. Models can summarize survey comments, but people still need to interpret trust, power, meaning, fairness, and the organizational choices behind the data.',
    lastUpdated: reviewedAt,
  },
};

let applied = 0;
const missing = [];

for (const [slug, patch] of Object.entries(enrichments)) {
  const skill = skills.find((candidate) => candidate.slug === slug);
  if (!skill) {
    missing.push(slug);
    continue;
  }

  Object.assign(skill, patch);
  applied += 1;
}

if (missing.length) {
  console.error(`Priority enrichment failed. Missing skill slugs: ${missing.join(', ')}`);
  process.exit(1);
}

fs.writeFileSync(file, `${JSON.stringify(skills, null, 2)}\n`);
console.log(`Applied research-backed enrichment to ${applied} priority skill guides.`);
