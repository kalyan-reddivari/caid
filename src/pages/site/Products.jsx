import { Link } from 'react-router-dom';
import { IconTile } from '../../components/Icons.jsx';
import { AgentcraftArt, DryvaArt, OrbitwardArt, ProductsHeroArt, UnderwritArt } from '../../components/ProductGraphics.jsx';
import Reveal from '../../components/Reveal.jsx';
import DotTerrain from '../../components/fx/DotTerrain.jsx';

const PRODUCTS = [
  {
    id: 'underwrit',
    name: 'Underwrit',
    url: 'https://underwrit.io',
    status: 'Public beta · free edition',
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
    note: 'Public beta: it works end to end and is being hardened before general availability.',
    cta: 'Get started free',
    Art: UnderwritArt,
  },
  {
    id: 'orbitward',
    name: 'Orbitward',
    url: 'https://orbitward.ai',
    status: 'Beta · guided pilots',
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
    note: 'In beta. Features and availability may change.',
    cta: 'Book a beta demo',
    Art: OrbitwardArt,
  },
  {
    id: 'agentcraft-studio',
    name: 'Agentcraft Studio',
    status: 'Alpha · free and open source',
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
    note: 'Alpha (v0.10). Free to use; the open-source release is being prepared.',
    cta: 'Ask for early access',
    Art: AgentcraftArt,
  },
  {
    id: 'dryva',
    name: 'Dryva',
    status: 'Release candidate · customer-hosted pilots',
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
    Art: DryvaArt,
  },
];

// Products we are designing next. Each one turns work we already do for clients into software.
const PIPELINE = [
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
];

export default function Products() {
  return (
    <>
      <section className="page-hero has-art">
        <DotTerrain />
        <div className="wrap">
          <div>
            <span className="eyebrow">Products</span>
            <h1>Software we build and run ourselves</h1>
            <p>
              Four products you can use today: Underwrit approves and proves agent actions, Orbitward gives platform
              teams agents within guardrails, Agentcraft Studio designs agent workflows for free, and Dryva rehearses
              them against failures. Five more, built on one shared platform, are in development.
            </p>
            <div className="hero-actions">
              {PRODUCTS.map((p, i) => (
                <a key={p.id} className={`btn ${i ? 'btn-ghost' : 'btn-primary'}`} href={`#${p.id}`}>{p.name}</a>
              ))}
              <a className="btn btn-ghost" href="#next">In development</a>
              <Link className="btn btn-ghost" to="/platform">How the stack works</Link>
            </div>
          </div>
          <div className="hero-art art-dark"><ProductsHeroArt /></div>
        </div>
      </section>

      {PRODUCTS.map((p, i) => (
        <section key={p.id} id={p.id} className={`section${i % 2 ? ' section-alt' : ''}`}>
          <div className={`wrap showcase${i % 2 ? ' flip' : ''}`}>
            <div className="showcase-copy">
              <Reveal>
                <div className="showcase-meta">
                  <span className="pill info">{p.category}</span>
                  <span className="status" data-state={p.state}>{p.status}</span>
                </div>
                <h2 className="showcase-name">{p.name}</h2>
                <p className="showcase-tagline">{p.tagline}</p>
                <p className="muted">{p.text}</p>
                <h3 className="showcase-label">Built for</h3>
                <div className="chips">{p.audience.map((a) => <span className="chip" key={a}>{a}</span>)}</div>
              </Reveal>

              <div className="showcase-features">
                {p.features.map((f, k) => (
                  <Reveal key={f.title} className="point" delay={(k % 2) * 90}>
                    <IconTile name={f.icon} tone={k % 2 ? 'amber' : 'teal'} />
                    <div>
                      <h3>{f.title}</h3>
                      <p>{f.text}</p>
                    </div>
                  </Reveal>
                ))}
              </div>

              {p.integrations && (
                <Reveal>
                  <h3 className="showcase-label">Works with</h3>
                  <div className="chips">{p.integrations.map((t) => <span className="chip mono" key={t}>{t}</span>)}</div>
                </Reveal>
              )}

              <Reveal className="showcase-actions">
                {p.url ? (
                  <>
                    <a className="btn btn-primary" href={p.url} target="_blank" rel="noopener noreferrer" data-track={`product-site:${p.id}`}>
                      {p.cta} <span aria-hidden="true">↗</span><span className="sr-only">(opens {p.url.replace('https://', '')} in a new tab)</span>
                    </a>
                    <Link className="btn btn-ghost" to={`/contact?interest=Products#book`} data-track={`product-talk:${p.id}`}>
                      Talk to us about {p.name}
                    </Link>
                  </>
                ) : (
                  <Link className="btn btn-primary" to={`/contact?interest=Products#book`} data-track={`product-talk:${p.id}`}>
                    {p.cta}
                  </Link>
                )}
                <span className="small muted">{p.note}</span>
              </Reveal>
            </div>

            <Reveal className="showcase-art art-dark" delay={120}>
              <p.Art />
            </Reveal>
          </div>
        </section>
      ))}

      <section id="next" className="section section-alt">
        <div className="wrap">
          <Reveal className="section-head">
            <div>
              <h2>In development</h2>
              <p className="muted">Five products on one shared platform, built from the integration, platform and AI work we do for clients. None is for sale yet; design partners shape what ships first. <Link to="/platform#roadmap">See the roadmap</Link>.</p>
            </div>
          </Reveal>
          <div className="pipeline-cards">
            {PIPELINE.map((p, i) => (
              <Reveal as="article" key={p.id} id={p.id} className="feature-card pipeline-card" delay={(i % 3) * 120}>
                <div className="pipeline-head">
                  <IconTile name={p.icon} tone={p.tone || 'teal'} />
                  <div>
                    <h3>{p.name}</h3>
                    <span className="pill info">{p.category}</span>
                  </div>
                </div>
                <p className="pipeline-problem">{p.problem}</p>
                <p>{p.text}</p>
                <h4 className="pipeline-built">Working in our lab today</h4>
                <ul className="pipeline-list">{p.built.map((b) => <li key={b}>{b}</li>)}</ul>
                <div className="chips">{p.buyers.map((b) => <span className="chip" key={b}>{b}</span>)}</div>
                <span className="small muted">Target for general availability: {p.ga}</span>
                <Link to="/contact?interest=Products#book" data-track={`product-partner:${p.id}`}>Become a design partner →</Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="wrap">
          <h2>Have a product idea of your own? We build those for clients too.</h2>
          <Link className="btn" to="/process">See how a project runs</Link>
        </div>
      </section>
    </>
  );
}
