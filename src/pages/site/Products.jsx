import { Link } from 'react-router-dom';
import { IconTile } from '../../components/Icons.jsx';
import { OrbitwardArt, ProductsHeroArt, UnderwritArt } from '../../components/ProductGraphics.jsx';
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
];

// Products we are designing next. Each one turns work we already do for clients into software.
const PIPELINE = [
  {
    id: 'bridgehead',
    name: 'Bridgehead',
    icon: 'link',
    category: 'GenAI integration',
    problem: 'Every team wiring an assistant to SAP, Salesforce or Workday rebuilds the same connector, and most of them run with a service account that can see everything.',
    text: 'A governed MCP gateway for systems of record. Ready-made tools for SAP, Salesforce, Workday and ServiceNow that act as the signed-in user, with field-level scoping, rate limits and a write path that hands risky actions to Underwrit.',
    buyers: ['Enterprise architects', 'Integration teams', 'AI platform teams'],
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
  },
  {
    id: 'driftwatch',
    name: 'Driftwatch',
    icon: 'check',
    category: 'Integration DevOps',
    problem: 'Salesforce ships three releases a year and Workday two. Schema and API changes break integrations in production, usually on a Monday.',
    text: 'Contract tests generated from the integrations you already run, checked against vendor sandboxes and preview releases in CI. A failing contract opens a pull request with the change and the flows it touches.',
    buyers: ['Integration teams', 'Platform engineering', 'Release managers'],
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
  },
  {
    id: 'modelyard',
    name: 'Modelyard',
    icon: 'flask',
    category: 'MLOps',
    problem: 'Forecasting, churn and anomaly models built on ERP and CRM data stall in notebooks, because nobody owns training, monitoring and write-back.',
    text: 'A packaged MLOps path for business data: features drawn from the systems of record, a model registry, drift and accuracy monitoring, and predictions written back to SAP or Salesforce where planners already work.',
    buyers: ['Finance and supply chain analytics', 'Data science', 'ML platform teams'],
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
              Two products from the CAID team for organizations putting AI agents to work: one keeps proof
              of every action an agent takes, the other gives platform teams agents that work within guardrails.
              Five more are in design.
            </p>
            <div className="hero-actions">
              {PRODUCTS.map((p, i) => (
                <a key={p.id} className={`btn ${i ? 'btn-ghost' : 'btn-primary'}`} href={`#${p.id}`}>{p.name}</a>
              ))}
              <a className="btn btn-ghost" href="#next">What's next</a>
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
                <a className="btn btn-primary" href={p.url} target="_blank" rel="noopener noreferrer" data-track={`product-site:${p.id}`}>
                  {p.cta} <span aria-hidden="true">↗</span><span className="sr-only">(opens {p.url.replace('https://', '')} in a new tab)</span>
                </a>
                <Link className="btn btn-ghost" to={`/contact?interest=Products#book`} data-track={`product-talk:${p.id}`}>
                  Talk to us about {p.name}
                </Link>
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
              <h2>What we are building next</h2>
              <p className="muted">Ideas from the integration, platform and AI work we do for clients. None is for sale yet; design partners shape what ships first.</p>
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
                <div className="chips">{p.buyers.map((b) => <span className="chip" key={b}>{b}</span>)}</div>
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
