// The product catalog: one place for every product the site mentions. Products, How the stack works,
// Home and the page titles all read from here, so adding a product is one edit in this file.

const WORDS = ['no', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
export const countWord = (n) => WORDS[n] || String(n);
export const listNames = (items) => {
  const names = items.map((p) => p.name);
  return names.length < 2 ? names.join('') : `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}`;
};

// Available today, each with a full section on the Products page. `art` names its drawing in ProductGraphics.
export const PRODUCTS = [
  {
    id: 'underwrit',
    name: 'Underwrit',
    url: 'https://underwrit.io',
    status: 'Available now · free edition',
    short: 'free edition', // used in lists such as the roadmap legend
    state: 'pilot',
    category: 'AI agent governance',
    tagline: 'Let AI agents act. Keep the proof.',
    text: 'Underwrit sits between your AI agents and the tools they call, such as email, payments, Kubernetes and databases. It lets routine actions through, holds risky ones until named people approve the exact action, and seals every decision into a signed record anyone can verify offline.',
    audience: ['Teams running AI agents', 'Security', 'Compliance', 'Audit and risk'],
    features: [
      { icon: 'shield', title: 'Policy checks on every action', text: 'Each tool call is checked before it runs. Content an agent reads is treated as a suggestion, never as authority.' },
      { icon: 'users', title: 'Holds and two-person approval', text: 'Risky actions wait for named approvers, bound to the exact arguments, with approvals in Slack or Teams.' },
      { icon: 'lock', title: 'Signed, tamper-evident records', text: 'Every decision is hash-chained, signed and timestamped, so the history cannot be quietly changed.' },
      { icon: 'check', title: 'Verify offline', text: 'Evidence packs come with a public verifier, so auditors can check records without trusting the vendor.' },
      { icon: 'doc', title: 'Policy templates', text: 'Starting policies for many domains, mapped to frameworks such as SOC 2, the EU AI Act and HIPAA.' },
      { icon: 'book', title: 'Auditor workspace', text: 'A dedicated view for auditors, with records mapped to the frameworks they review against.' },
    ],
    integrations: ['Agent frameworks', 'AI gateways', 'Slack', 'Microsoft Teams'],
    note: 'Available now: it works end to end, with a free edition to start on.',
    cta: 'Get started free',
    art: 'underwrit',
  },
  {
    id: 'orbitward',
    name: 'Orbitward',
    url: 'https://orbitward.ai',
    status: 'Available now · guided pilots',
    short: 'guided pilots', // used in lists such as the roadmap legend
    state: 'pilot',
    category: 'Platform engineering',
    tagline: 'Platform engineering, with agents built in.',
    text: 'Build your platform and give developers a clear path. Orbitward brings developer self-service, infrastructure, delivery, operations and ownership standards into one place, with AI agents that work inside defined boundaries and leave evidence of everything they do.',
    audience: ['Platform teams', 'Developers', 'Security teams', 'SRE and operations'],
    features: [
      { icon: 'shield', title: 'Policy gate for agents', text: 'Every agent action is checked for identity, permission, policy and scope, then allowed, held for review or refused.' },
      { icon: 'doc', title: 'Evidence by default', text: 'An evidence record for every decision, so you can always see what an agent did and why.' },
      { icon: 'flask', title: 'Agent evaluations', text: 'Datasets, assertions and human review to check agents before and after they ship.' },
      { icon: 'app', title: 'Golden paths', text: 'Software templates and service scorecards in a developer portal, so new services start right.' },
      { icon: 'trend', title: 'Observatory', text: 'Monitoring coverage, SLOs and error budgets across every service.' },
      { icon: 'cloud', title: 'FinOps, including AI', text: 'Cost allocation and optimization tracking, with AI spend counted alongside cloud spend.' },
    ],
    integrations: ['Terraform', 'Kubernetes', 'GitHub', 'GitLab', 'OpenTelemetry', 'MCP'],
    note: 'Rolled out through guided pilots, so we set it up with your platform team.',
    cta: 'Book a demo',
    art: 'orbitward',
  },
  {
    id: 'agentcraft-studio',
    name: 'Agentcraft Studio',
    status: 'Free · open source',
    short: 'free', // used in lists such as the roadmap legend
    state: 'pilot',
    category: 'Agent workflow design',
    tagline: 'Design agent workflows you can see, test and hand over.',
    text: 'A visual studio for building agent workflows on LangGraph. Draw the steps, tools, knowledge and human reviews on a canvas, run it with checkpoints you can fork and replay, test it against regression cases, and export a project your engineers can run anywhere. It runs on your own machine and is free.',
    audience: ['Teams building agents', 'Solution architects', 'Analysts', 'Educators'],
    features: [
      { icon: 'app', title: 'Visual designer', text: 'Model, agent, knowledge, memory, condition, tool and review steps, with parallel groups, loops and subworkflows. 34 starter templates.' },
      { icon: 'users', title: 'Human approvals', text: 'Runs pause at review steps, and every live HTTP or MCP action waits for approval with its destination and arguments shown.' },
      { icon: 'check', title: 'Contracts on inputs and outputs', text: 'Typed input forms and schema checks between steps, so a bad hand-off fails at the step, not at the end.' },
      { icon: 'flask', title: 'Evaluation lab', text: 'Regression cases, experiments you can compare, and releases pinned only with current, passing evidence.' },
      { icon: 'doc', title: 'Rehearsals and passports', text: 'Replay a run with a changed step and fixed tool responses, then export a release passport anyone can re-verify.' },
      { icon: 'cloud', title: 'Yours to run', text: 'Local first, with Ollama or any OpenAI-compatible model. Export a Python project with the runtime included.' },
    ],
    integrations: ['LangGraph', 'MCP', 'Ollama', 'OpenAI-compatible APIs', 'PDF and DOCX', 'Git'],
    note: 'Version 0.10. Free to use; the open-source release is being prepared.',
    cta: 'Ask for early access',
    art: 'agentcraft',
  },
  {
    id: 'dryva',
    name: 'Dryva',
    status: 'Release candidate · customer-hosted pilots',
    short: 'release candidate', // used in lists such as the roadmap legend
    state: 'pilot',
    category: 'Workflow rehearsal',
    tagline: 'Rehearse a workflow\'s failures before your customers do.',
    text: 'Dryva tests whether an agent or automation workflow leaves the business in a correct state when its tools fail. It runs the workflow against synthetic systems under timeouts, duplicate deliveries, outages, denied permissions, restarts and reordered steps, checks your business rules after every step, and qualifies a release only when every case holds.',
    audience: ['Teams shipping agent workflows', 'Integration engineers', 'Release managers', 'Risk and QA'],
    features: [
      { icon: 'flask', title: 'Eight kinds of failure', text: 'Commit-then-timeout, duplicates, outages, permanent denial, restarts and reordered plans, each across fixed seeds you can rerun.' },
      { icon: 'check', title: 'Business rules, not just status codes', text: 'Contracts state what must be true after the workflow: no double refunds, no access left after offboarding.' },
      { icon: 'trend', title: 'Regression-first release gates', text: 'Compare a candidate against the baseline on the same contract and plan; anything missing makes the result inconclusive, not a pass.' },
      { icon: 'shield', title: 'Isolated runs', text: 'Your own adapter code runs in a bounded Docker runner, with cancellable jobs and revision manifests.' },
      { icon: 'doc', title: 'Evidence you can replay', text: 'Every run keeps the contract, fault plan, states and traces, so a result can be rechecked later.' },
      { icon: 'users', title: 'Review inbox', text: 'Failing cases arrive with the first broken rule and its state, plus a safe rehearsal of the completion on a copy.' },
    ],
    integrations: ['Python adapters', 'Docker', 'MCP capture', 'GitHub sandboxes', 'JUnit for CI'],
    note: 'Release candidate (0.2). Validation against real providers is in progress with pilot teams.',
    cta: 'Join the pilot',
    art: 'dryva',
  },
];

// Products in development. Each one turns work we already do for clients into software.
export const PIPELINE = [
  {
    id: 'bridgehead',
    name: 'Bridgehead',
    icon: 'link',
    category: 'GenAI integration',
    problem: 'Every team wiring an assistant to SAP, Salesforce or Workday rebuilds the same connector, and most of them run with a service account that can see everything.',
    text: 'A governed MCP gateway for systems of record. Ready-made tools for SAP, Salesforce, Workday, ServiceNow, Dynamics 365, Oracle Fusion, NetSuite, SuccessFactors, HubSpot, Coupa, Jira Service Management and Zendesk that act as the signed-in user, with field-level scoping, rate limits and a write path that hands risky actions to Underwrit.',
    buyers: ['Enterprise architects', 'Integration teams', 'AI platform teams'],
    ga: 'mid-December 2026',
    built: ['Tools for twelve business systems that act as the signed-in person', 'Approvals that show the record before and after, bound to the exact values', 'Signed receipts, pinned tool definitions, Okta and Entra agent sign-in'],
  },
  {
    id: 'groundline',
    name: 'Groundline',
    icon: 'layers',
    tone: 'amber',
    category: 'Retrieval and RAG',
    problem: 'Assistants answer from stale copies of documents and records, and the copies ignore who was allowed to read the originals.',
    text: 'Retrieval indexes kept in step with the source systems through change data capture, carrying each record\'s access rules into every answer. Built-in evaluation sets show when answer quality drops after a source changes.',
    buyers: ['Teams building assistants', 'Data engineering', 'Security'],
    ga: 'late December 2026',
    built: ['Permissions applied inside the search, never after it', 'Shared answers limited to what every reader may see', 'Nine sources, from Salesforce and SharePoint to Google Drive, Box, Notion and Snowflake'],
  },
  {
    id: 'driftwatch',
    name: 'Driftwatch',
    icon: 'check',
    category: 'Integration DevOps',
    problem: 'Salesforce ships three releases a year and Workday two. Schema and API changes break integrations in production, usually on a Monday.',
    text: 'Contract tests generated from the integrations you already run, checked against vendor sandboxes and preview releases in CI. A failing contract opens a pull request with the change and the flows it touches.',
    buyers: ['Integration teams', 'Platform engineering', 'Release managers'],
    ga: 'early January 2027',
    built: ['Contracts built from traffic, code and MuleSoft, Boomi or Informatica mappings', 'Checks against preview sandboxes, including recorded responses', 'GitHub checks and draft fix pull requests; open-source command line'],
  },
  {
    id: 'pagewise',
    name: 'Pagewise',
    icon: 'trend',
    tone: 'amber',
    category: 'SRE',
    problem: 'Incidents in ERP-heavy estates cross failed IDocs, MuleSoft flows, Kafka lag and cloud alerts, and no single tool sees all of them.',
    text: 'An incident agent that joins OpenTelemetry signals, recent deploys and integration job failures into one timeline, drafts the first response and the postmortem, and runs remediation steps only through approved runbooks.',
    buyers: ['SRE and operations', 'Integration support', 'IT service management'],
    ga: 'mid-January 2027',
    built: ['Evidence from SAP, MuleSoft, Kafka, Datadog, Splunk, Dynatrace, New Relic, Azure Monitor and CloudWatch', 'Causes graded by their evidence, with gaps in monitoring named first', 'Runbooks only from an approved catalog, verified after they run'],
  },
  {
    id: 'modelyard',
    name: 'Modelyard',
    icon: 'flask',
    category: 'MLOps',
    problem: 'Forecasting, churn and anomaly models built on ERP and CRM data stall in notebooks, because nobody owns training, monitoring and write-back.',
    text: 'A packaged MLOps path for business data: features drawn from the systems of record, a model registry, drift and accuracy monitoring, and predictions written back to SAP or Salesforce where planners already work.',
    buyers: ['Finance and supply chain analytics', 'Data science', 'ML platform teams'],
    ga: 'late January 2027',
    built: ['Churn, demand forecast and posting-anomaly templates with plain reasons', 'Shadow mode, approval on first deploy, rollback of written scores', "Runs on the customer's Databricks, Snowflake or Data Cloud, mirrored to MLflow, SageMaker or Vertex AI"],
  },
  {
    id: 'tradewire',
    name: 'Tradewire',
    icon: 'users',
    tone: 'amber',
    category: 'Cross-company agents',
    problem: 'A managed service provider\'s agents and its client\'s agents work the same incidents in two ServiceNow or Jira instances, and today they hand off through email, shared logins or a brittle point-to-point integration nobody can audit.',
    text: 'A neutral trust broker for agents that work across company lines. Both companies sign one agreement that says what their agents may ask each other, every agent proves who it is and on whose authority, each company still enforces its own policy and approvals at its own edge, and both keep one signed record either can verify without trusting the other.',
    buyers: ['Managed service providers', 'Systems integrators', 'IT service management', 'Vendor and risk management'],
    ga: 'late January 2027',
    built: ['Incidents and change requests between ServiceNow and Jira Service Management', 'Agreements with limits and approvals, in force only when both companies sign', 'A shared record signed by the broker and both companies, with SLA evidence', 'Works when only one side has bought it: the other signs from a link as a guest'],
  },
];

// How the stack works: the layers a request passes through.
export const LAYERS = [
  {
    kicker: 'Design and rehearse',
    name: 'Agentcraft Studio and Dryva',
    text: 'Build agent workflows visually, then prove they leave the business in a correct state before they ship.',
    points: ['Visual workflow designer on LangGraph, free and open source', 'Fault rehearsals: timeouts, duplicates, outages, denied permissions', 'Release passports that pin the version that passed'],
  },
  {
    kicker: 'Act',
    name: 'Bridgehead on CAID Core',
    text: 'Governed MCP tools for twelve business systems, from Salesforce and SAP to Dynamics 365, Oracle and Zendesk, that act as the signed-in person.',
    points: ['Token exchange per person and system, no shared account', 'Risk tiers set by the values in each call', 'Vendor MCP servers wrapped under the same policy'],
  },
  {
    kicker: 'Approve and prove',
    name: 'Underwrit and signed receipts',
    text: 'Risky actions wait for a person who sees exactly what changes, and every write leaves proof anyone can check.',
    points: ['The record before and after, the blast radius, the user\'s request', 'Approvals bound to the exact values, used once', 'Receipts signed with the customer\'s own key'],
  },
  {
    kicker: 'Alongside every call',
    name: 'Groundline, Driftwatch, Pagewise, Modelyard',
    text: 'The rest of the life of an integration: what agents may know, what vendors change, what breaks, what to predict.',
    points: ['Answers filtered by what every reader may see', 'Contract tests against vendor preview releases', 'Incident evidence and approved runbooks', 'Predictions written back with approval'],
  },
  {
    kicker: 'Between companies',
    name: 'Tradewire',
    text: 'When an agent has to work with a partner\'s agent, both companies sign what each side may ask, and both keep one signed record.',
    points: ['One agreement both companies sign, version by version', 'Each side checks every task against its own policy', 'A shared record either company can verify alone'],
  },
];

// What each product connects to today, built and tested in each product's own repository.
export const STACK_INTEGRATIONS = [
  { name: 'Act on systems of record', product: 'Bridgehead', items: ['Salesforce', 'ServiceNow', 'Workday', 'SAP S/4HANA',
    'Microsoft Dynamics 365', 'Oracle Fusion Cloud ERP', 'Oracle NetSuite', 'SAP SuccessFactors', 'HubSpot', 'Coupa',
    'Jira Service Management', 'Zendesk', 'Any vendor MCP server'] },
  { name: 'Ground answers in permitted data', product: 'Groundline', items: ['Salesforce', 'ServiceNow knowledge',
    'Confluence', 'SharePoint and OneDrive', 'Google Drive', 'Box', 'Notion', 'Jira', 'Snowflake tables'] },
  { name: 'Test vendor releases', product: 'Driftwatch', items: ['Salesforce', 'Workday', 'ServiceNow', 'SAP OData services',
    'Any OpenAPI spec', 'MuleSoft', 'Boomi', 'Informatica'] },
  { name: 'Gather incident evidence', product: 'Pagewise', items: ['SAP IDocs, jobs and dumps', 'SAP Integration Suite',
    'MuleSoft', 'Kafka', 'GitHub', 'Argo CD', 'Prometheus', 'Tempo', 'Datadog', 'Splunk', 'Dynatrace', 'New Relic',
    'Azure Monitor', 'Amazon CloudWatch', 'Alerts from PagerDuty, Opsgenie, Datadog and Azure Monitor'] },
  { name: 'Predict where people work', product: 'Modelyard', items: ['Databricks', 'Snowflake', 'Salesforce Data Cloud',
    'MLflow', 'Amazon SageMaker', 'Vertex AI', 'Write-back to Salesforce and SAP'] },
  { name: 'Work with partner companies', product: 'Tradewire', items: ['ServiceNow', 'Jira Service Management',
    'A2A Agent Cards', 'OAuth client credentials', 'Signed links for guest partners', 'JSON and PDF record export'] },
  { name: 'Run in your estate', product: 'CAID Core', items: ['Okta', 'Microsoft Entra ID', 'PingOne and PingFederate',
    'Google Workspace', 'AWS KMS', 'Azure Key Vault', 'Google Cloud KMS', 'HashiCorp Vault', 'Audit to Splunk, Sentinel and Datadog',
    'Approvals in Slack and Teams'] },
];

// The next three months, week by week: weeks start on Mondays, from 2 November 2026 (index 0) to 25 January 2027 (12).
// The next three months, week by week: weeks start on Mondays, from 2 November 2026 (index 0) to 25 January 2027 (12).
export const WEEKS = [[2, 'Nov 2026'], [9], [16], [23], [30, 'Dec'], [7], [14], [21], [28], [4, 'Jan 2027'], [11], [18], [25]];
export const ROADMAP = [
  { name: 'CAID Core', note: 'shared platform', start: 0, end: 3, marks: [[3, 'foundation']] },
  { name: 'Bridgehead', note: 'MCP connectors', start: 0, end: 6, marks: [[2, 'preview'], [4, 'pilot'], [6, 'GA']] },
  { name: 'Groundline', note: 'permission-aware RAG', start: 2, end: 8, marks: [[4, 'preview'], [6, 'pilot'], [8, 'GA']] },
  { name: 'Driftwatch', note: 'release contract tests', start: 3, end: 9, marks: [[5, 'preview'], [7, 'pilot'], [9, 'GA']] },
  { name: 'Pagewise', note: 'incident agent', start: 5, end: 11, marks: [[7, 'preview'], [9, 'pilot'], [11, 'GA']] },
  { name: 'Modelyard', note: 'ERP and CRM MLOps', start: 6, end: 12, marks: [[8, 'preview'], [10, 'pilot'], [12, 'GA']] },
  { name: 'Tradewire', note: 'cross-company agents', start: 2, end: 12, marks: [[3, 'preview'], [7, 'pilot'], [12, 'GA']] },
];

// The product strip on Home, in the order a workflow meets them.
export const HOME_STACK = [
  ['Design', 'Agentcraft Studio', 'Free'],
  ['Rehearse', 'Dryva', 'Release candidate'],
  ['Approve and prove', 'Underwrit', 'Available now'],
  ['Run on your platform', 'Orbitward', 'Guided pilots'],
  ['Act on SAP, Salesforce, Workday', 'Bridgehead', 'In development'],
  ['Know, watch, fix, predict', 'Groundline · Driftwatch · Pagewise · Modelyard', 'In development'],
  ['Work across company lines', 'Tradewire', 'In development'],
];
