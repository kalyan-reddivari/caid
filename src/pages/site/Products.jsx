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
            </p>
            <div className="hero-actions">
              {PRODUCTS.map((p, i) => (
                <a key={p.id} className={`btn ${i ? 'btn-ghost' : 'btn-primary'}`} href={`#${p.id}`}>{p.name}</a>
              ))}
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

      <section className="cta-band">
        <div className="wrap">
          <h2>Have a product idea of your own? We build those for clients too.</h2>
          <Link className="btn" to="/process">See how a project runs</Link>
        </div>
      </section>
    </>
  );
}
