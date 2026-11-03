// CAID Academy catalogue: learning paths, certifications and resources.
// Everything the Academy tabs show comes from here, so names and exam details are edited in one place.

export const ROLES = ['Everyone', 'Engineers', 'Integration', 'AI engineers', 'Security and risk', 'Platform and SRE', 'Delivery leads'];
export const LEVELS = ['Beginner', 'Intermediate', 'Advanced'];
export const TIERS = ['Foundational', 'Associate', 'Professional', 'Product specialist'];

export const FORMATS = {
  self: 'Self-paced',
  ilt: 'Instructor-led',
  lab: 'Hands-on lab',
  exam: 'Assessment',
};

export const PATHS = [
  {
    id: 'ai-foundations',
    title: 'AI Foundations',
    role: 'Everyone',
    level: 'Beginner',
    hours: 6,
    icon: 'bulb',
    summary: 'What AI models can and cannot do, how to use them safely at work, and where they pay back. The starting point for every other path.',
    outcomes: ['Explain how large language models produce answers', 'Recognize hallucination, bias and data leakage', 'Use approved AI tools within a responsible-use policy'],
    courses: [
      { title: 'How large language models work', format: 'self', mins: 45 },
      { title: 'Where AI fails: hallucination, bias and leakage', format: 'self', mins: 45 },
      { title: 'Prompting with approved tools', format: 'lab', mins: 60 },
      { title: 'Responsible AI policy essentials', format: 'self', mins: 30 },
      { title: 'AI use cases that pay back', format: 'self', mins: 45 },
      { title: 'Foundations knowledge check', format: 'exam', mins: 30 },
    ],
    certs: ['foundations'],
  },
  {
    id: 'ai-native-developer',
    title: 'AI-Native Application Developer',
    role: 'Engineers',
    level: 'Intermediate',
    hours: 24,
    icon: 'code',
    summary: 'Build production software with coding agents at your side: write the spec first, let the agent draft, and review and test what it produces.',
    outcomes: ['Drive a coding agent from a written spec', 'Review AI-written code for correctness and security', 'Generate tests from acceptance criteria'],
    courses: [
      { title: 'Pairing with coding agents', format: 'lab', mins: 120 },
      { title: 'Spec-driven development with the AIDLC', format: 'ilt', mins: 360 },
      { title: 'Reviewing AI-written code', format: 'self', mins: 90 },
      { title: 'Test generation from acceptance criteria', format: 'lab', mins: 120 },
      { title: 'Shipping AI features to production', format: 'self', mins: 120 },
      { title: 'Capstone: one feature, spec to deploy', format: 'lab', mins: 480 },
    ],
    certs: ['developer-associate'],
  },
  {
    id: 'integration-engineer',
    title: 'Integration Engineer',
    role: 'Integration',
    level: 'Intermediate',
    hours: 20,
    icon: 'link',
    summary: 'Connect systems, and now agents, to the tools they need: API contracts, event-driven patterns and secure tool use through MCP.',
    outcomes: ['Design versioned API contracts', 'Choose between sync, async and event-driven patterns', 'Build and secure MCP servers for agent tool use'],
    courses: [
      { title: 'API design and contracts', format: 'self', mins: 120 },
      { title: 'Event-driven integration patterns', format: 'self', mins: 150 },
      { title: 'Building MCP servers and tools', format: 'lab', mins: 180 },
      { title: 'Securing agent tool calls', format: 'ilt', mins: 240 },
      { title: 'Integration testing and observability', format: 'lab', mins: 150 },
    ],
    certs: ['integration-associate'],
  },
  {
    id: 'genai-engineer',
    title: 'Generative AI Engineer',
    role: 'AI engineers',
    level: 'Advanced',
    hours: 32,
    icon: 'ai',
    summary: 'Design, evaluate and run retrieval and agent systems in production, with the cost, latency and security controls that keep them there.',
    outcomes: ['Design retrieval pipelines and vector search', 'Build agents with tool use and guardrails', 'Evaluate quality with test sets and LLM judges'],
    courses: [
      { title: 'Retrieval and vector search design', format: 'self', mins: 180 },
      { title: 'Building agents with tool use', format: 'lab', mins: 240 },
      { title: 'Evaluation sets and LLM judges', format: 'self', mins: 150 },
      { title: 'Guardrails and prompt-injection defense', format: 'ilt', mins: 240 },
      { title: 'Cost, latency and model routing', format: 'self', mins: 120 },
      { title: 'Capstone: a production RAG agent', format: 'lab', mins: 600 },
    ],
    certs: ['genai-associate', 'genai-professional'],
  },
  {
    id: 'ai-governance',
    title: 'AI Governance and Risk',
    role: 'Security and risk',
    level: 'Intermediate',
    hours: 14,
    icon: 'shield',
    summary: 'Turn AI policy into controls that run: policy checks on agent actions, approvals bound to the exact action, and records an auditor can verify.',
    outcomes: ['Map AI controls to the EU AI Act, NIST AI RMF and ISO 42001', 'Write policy as code for agent actions', 'Produce evidence auditors can verify offline'],
    courses: [
      { title: 'AI risk frameworks in practice', format: 'self', mins: 150 },
      { title: 'Policy as code for agent actions', format: 'lab', mins: 180 },
      { title: 'Approvals and separation of duties', format: 'self', mins: 90 },
      { title: 'Evidence, audit trails and verification', format: 'ilt', mins: 240 },
      { title: 'Underwrit in practice', format: 'lab', mins: 180 },
    ],
    certs: ['governance-associate', 'underwrit-specialist'],
  },
  {
    id: 'platform-engineer',
    title: 'Platform Engineering with Agents',
    role: 'Platform and SRE',
    level: 'Intermediate',
    hours: 18,
    icon: 'layers',
    summary: 'Give developers golden paths and put agents to work on the platform, inside policy gates, with SLOs and cost in view.',
    outcomes: ['Build golden paths and service scorecards', 'Gate agent actions on identity, scope and policy', 'Track SLOs, error budgets and AI spend together'],
    courses: [
      { title: 'Golden paths and scorecards', format: 'self', mins: 150 },
      { title: 'Agent policy gates on the platform', format: 'lab', mins: 180 },
      { title: 'SLOs, error budgets and observability', format: 'self', mins: 150 },
      { title: 'FinOps, including AI spend', format: 'self', mins: 120 },
      { title: 'Orbitward in practice', format: 'lab', mins: 240 },
    ],
    certs: ['orbitward-specialist'],
  },
  {
    id: 'delivery-lead',
    title: 'AI Delivery Leadership',
    role: 'Delivery leads',
    level: 'Intermediate',
    hours: 12,
    icon: 'users',
    summary: 'Plan, estimate and run projects where AI does a large share of the work, and explain the results honestly to executives.',
    outcomes: ['Run mob elaboration and write EARS criteria', 'Estimate and plan AI-native delivery', 'Measure AI productivity without vanity metrics'],
    courses: [
      { title: 'Running mob elaboration', format: 'ilt', mins: 240 },
      { title: 'Writing EARS acceptance criteria', format: 'self', mins: 60 },
      { title: 'Estimating AI-native projects', format: 'self', mins: 90 },
      { title: 'Measuring AI productivity honestly', format: 'self', mins: 60 },
      { title: 'Explaining AI to client executives', format: 'self', mins: 60 },
    ],
    certs: ['delivery-associate'],
  },
];

export const CERTS = [
  {
    id: 'foundations',
    name: 'CAID Certified AI Foundations',
    tier: 'Foundational',
    audience: 'Anyone who works alongside AI tools',
    questions: 30, minutes: 45, proctoring: 'Online, unproctored', fee: 'Free', validity: '2 years',
    prereq: 'None',
    path: 'ai-foundations',
    domains: [['AI concepts', 30], ['Risks and limitations', 30], ['Responsible use', 20], ['Use cases and value', 20]],
  },
  {
    id: 'developer-associate',
    name: 'Certified AI-Native Developer, Associate',
    tier: 'Associate',
    audience: 'Software engineers building with coding agents',
    questions: 45, minutes: 90, proctoring: 'Online, proctored', fee: 'Free', validity: '2 years',
    prereq: '6 months building production software recommended',
    path: 'ai-native-developer',
    domains: [['Working with coding agents', 25], ['Spec-driven development', 25], ['Reviewing and testing AI-written code', 30], ['Production readiness', 20]],
  },
  {
    id: 'integration-associate',
    name: 'Certified Integration Engineer, Associate',
    tier: 'Associate',
    audience: 'Engineers connecting systems and agents',
    questions: 45, minutes: 90, proctoring: 'Online, proctored', fee: 'Free', validity: '2 years',
    prereq: '6 months of integration work recommended',
    path: 'integration-engineer',
    domains: [['APIs and contracts', 25], ['Event-driven patterns', 20], ['MCP and agent tool use', 30], ['Security and observability', 25]],
  },
  {
    id: 'genai-associate',
    name: 'Certified Generative AI Engineer, Associate',
    tier: 'Associate',
    audience: 'Engineers building retrieval and agent features',
    questions: 45, minutes: 90, proctoring: 'Online, proctored', fee: 'Free', validity: '2 years',
    prereq: 'Working Python and one shipped AI feature recommended',
    path: 'genai-engineer',
    domains: [['Retrieval design', 25], ['Agents and tool use', 25], ['Evaluation', 25], ['Guardrails and cost', 25]],
  },
  {
    id: 'genai-professional',
    name: 'Certified Generative AI Engineer, Professional',
    tier: 'Professional',
    audience: 'Senior engineers who own AI systems in production',
    questions: 60, minutes: 120, proctoring: 'Online, proctored', fee: 'Free', validity: '2 years',
    prereq: 'Associate certification and a year running AI in production recommended',
    path: 'genai-engineer',
    domains: [['System design', 30], ['Evaluation at scale', 20], ['Security and prompt injection', 25], ['Operations and cost', 25]],
  },
  {
    id: 'governance-associate',
    name: 'Certified AI Governance Practitioner, Associate',
    tier: 'Associate',
    audience: 'Security, compliance, audit and risk teams',
    questions: 45, minutes: 90, proctoring: 'Online, proctored', fee: 'Free', validity: '2 years',
    prereq: 'AI Foundations recommended',
    path: 'ai-governance',
    domains: [['Frameworks and regulation', 30], ['Policy design', 25], ['Approvals and controls', 20], ['Evidence and audit', 25]],
  },
  {
    id: 'delivery-associate',
    name: 'Certified AI Delivery Lead, Associate',
    tier: 'Associate',
    audience: 'Delivery leads, product owners and analysts',
    questions: 40, minutes: 75, proctoring: 'Online, proctored', fee: 'Free', validity: '2 years',
    prereq: 'AI Foundations recommended',
    path: 'delivery-lead',
    domains: [['Elaboration and specs', 30], ['Planning and estimating', 25], ['Risk and compliance', 20], ['Measuring outcomes', 25]],
  },
  {
    id: 'underwrit-specialist',
    name: 'Underwrit Certified Administrator',
    tier: 'Product specialist',
    audience: 'Teams deploying and running Underwrit',
    questions: 40, minutes: 75, proctoring: 'Online, proctored', fee: 'Free', validity: '2 years',
    prereq: 'Hands-on time with Underwrit recommended',
    path: 'ai-governance',
    domains: [['Deployment and integration', 25], ['Policies and templates', 30], ['Holds and approvals', 20], ['Records and verification', 25]],
  },
  {
    id: 'orbitward-specialist',
    name: 'Orbitward Certified Platform Engineer',
    tier: 'Product specialist',
    audience: 'Platform teams building on Orbitward',
    questions: 40, minutes: 75, proctoring: 'Online, proctored', fee: 'Free', validity: '2 years',
    prereq: 'Hands-on time with Orbitward recommended',
    path: 'platform-engineer',
    domains: [['Golden paths and templates', 25], ['Agent policy gates', 30], ['Observability and SLOs', 25], ['FinOps', 20]],
  },
];

export const RESOURCE_TYPES = ['Course', 'Lab', 'Exam prep', 'Guide', 'Webinar', 'Template', 'Community'];

export const RESOURCES = [
  { title: 'How large language models work', type: 'Course', level: 'Beginner', time: '45 min', free: true, text: 'A plain-language tour of tokens, context windows and why models sometimes make things up.' },
  { title: 'Prompting with approved tools', type: 'Lab', level: 'Beginner', time: '1 hr', free: true, text: 'Guided exercises on writing, checking and refining prompts for everyday work.' },
  { title: 'Spec-driven development with the AIDLC', type: 'Course', level: 'Intermediate', time: '1 day', free: false, text: 'Our delivery lifecycle, taught live: specs, bolts, reviews and the hand-offs between people and agents.' },
  { title: 'Building MCP servers and tools', type: 'Lab', level: 'Intermediate', time: '3 hr', free: false, text: 'Expose a real system to an agent through MCP, then lock down what it may call.' },
  { title: 'Evaluation sets and LLM judges', type: 'Course', level: 'Advanced', time: '2.5 hr', free: false, text: 'Build test sets, choose metrics and calibrate model judges against human review.' },
  { title: 'Policy as code for agent actions', type: 'Lab', level: 'Intermediate', time: '3 hr', free: false, text: 'Write allow, hold and refuse rules for agent tool calls and test them against recorded traffic.' },
  { title: 'Exam guides for every certification', type: 'Exam prep', level: 'All levels', time: 'PDF', free: true, text: 'What each exam covers, domain weightings, sample questions and recommended study.' },
  { title: 'Practice exams', type: 'Exam prep', level: 'All levels', time: '30–60 min', free: true, text: 'Timed practice papers with explanations for every answer, one per Associate exam.' },
  { title: 'Exam-readiness sessions', type: 'Exam prep', level: 'Intermediate', time: '90 min', free: true, text: 'Live walkthroughs of each exam with an instructor, held before every exam window.' },
  { title: 'Responsible AI field guide', type: 'Guide', level: 'Beginner', time: '20 min read', free: true, text: 'Short, practical rules for using AI on client and company data.' },
  { title: 'Reviewing AI-written code: a checklist', type: 'Guide', level: 'Intermediate', time: '15 min read', free: true, text: 'The checks our reviewers run on every agent-written change, from tests to secrets.' },
  { title: 'Mapping AI controls to the EU AI Act', type: 'Guide', level: 'Intermediate', time: '30 min read', free: true, text: 'Which obligations apply to which systems, and the evidence each one calls for.' },
  { title: 'Spec and acceptance-criteria templates', type: 'Template', level: 'All levels', time: 'Download', free: true, text: 'The spec, EARS criteria and review templates our teams use on client projects.' },
  { title: 'Prompt library for delivery teams', type: 'Template', level: 'All levels', time: 'Download', free: true, text: 'Tested prompts for elaboration, test design, code review and incident summaries.' },
  { title: 'Monthly AI engineering webinar', type: 'Webinar', level: 'All levels', time: '45 min', free: true, text: 'What changed in models and tools this month, and what it means for teams shipping software.' },
  { title: 'Agents in production: lessons learned', type: 'Webinar', level: 'Advanced', time: '60 min', free: true, text: 'Recorded case studies on running agents safely, including what went wrong.' },
  { title: 'Weekly office hours', type: 'Community', level: 'All levels', time: '1 hr', free: true, text: 'Bring a question about a course, a lab or your own project to an instructor.' },
  { title: 'Certified practitioners community', type: 'Community', level: 'All levels', time: 'Ongoing', free: true, text: 'A members-only space for certified people to share patterns and meet peers.' },
];

export const WAYS_TO_LEARN = [
  { icon: 'book', title: 'Self-paced', text: 'Short courses and readings you take when it suits you. Foundations content is free for everyone.' },
  { icon: 'users', title: 'Instructor-led', text: 'Live sessions with CAID practitioners, public or as a private cohort for your team.' },
  { icon: 'flask', title: 'Hands-on labs', text: 'Sandbox environments with real tools, so you practice the work, not just read about it.' },
  { icon: 'grad', title: 'Certification', text: 'Free proctored exams that prove the skills, with a verifiable digital badge when you pass.' },
];

export const AUDIENCES = [
  { icon: 'app', title: 'Client teams', text: 'Upskill the people who will own what we build with you, with private cohorts and seats bundled into engagements.' },
  { icon: 'link', title: 'Partners', text: 'Enablement and certification for firms that deliver alongside CAID or resell our products.' },
  { icon: 'grad', title: 'Individuals', text: 'Free foundations and free certifications you can take on your own schedule, plus deeper courses when you need them.' },
];

export const CERT_STEPS = [
  { title: 'Prepare', text: 'Follow the recommended path, read the exam guide and sit a practice exam.' },
  { title: 'Register', text: 'Book a free online exam slot. There is no fee for any CAID certification.' },
  { title: 'Take the exam', text: 'Sit the exam online from home or the office, with a remote proctor.' },
  { title: 'Get your badge', text: 'Pass and receive a digital badge with a link anyone can use to verify it.' },
  { title: 'Stay current', text: 'Credentials last two years. Recertify with a shorter exam on what has changed.' },
];

export const CERT_FAQ = [
  { q: 'How are exams delivered?', a: 'Online, with a remote proctor watching through your webcam. You need a quiet room, a stable connection and photo ID. The Foundations exam is unproctored.' },
  { q: 'What if I do not pass?', a: 'You can retake an exam after 14 days. Every attempt is free, and your score report shows how you did in each domain.' },
  { q: 'How long does a certification last?', a: 'Two years. Before it expires you can sit a shorter recertification exam covering what has changed in the field and in our products.' },
  { q: 'How do employers check a credential?', a: 'Every credential comes as a digital badge with a public verification link showing the holder, the certification and its expiry date.' },
  { q: 'What does certification cost?', a: 'Nothing. Every CAID certification exam, including retakes and recertification, is free. Instructor-led courses and labs can be bundled into client engagements and partner agreements.' },
  { q: 'Do you offer exam accommodations?', a: 'Yes. Extra time and other accommodations are available on request. Ask before you book so we can set them up.' },
];

export const pathById = (id) => PATHS.find((p) => p.id === id);
export const certById = (id) => CERTS.find((c) => c.id === id);
export const formatMins = (m) => (m >= 60 ? `${+(m / 60).toFixed(1)} hr` : `${m} min`);
