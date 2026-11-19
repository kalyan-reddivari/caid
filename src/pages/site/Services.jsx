import { Link } from 'react-router-dom';
import { AgentServicesArt, AgentStack } from '../../components/AgentGraphics.jsx';
import CallButton from '../../components/CallButton.jsx';
import { IconTile } from '../../components/Icons.jsx';
import Reveal from '../../components/Reveal.jsx';
import DotTerrain from '../../components/fx/DotTerrain.jsx';

// AI and agents first: each service is something we build, run or govern for AI that does real work.
const SERVICES = [
  {
    icon: 'ai',
    tone: 'amber',
    title: 'Agentic workflow engineering',
    text: 'Agents that do a defined job end to end: triage a ticket, reconcile an invoice, onboard a supplier. Designed as a workflow with clear steps, tools and review points, not a chatbot left to improvise.',
    points: ['Single and multi-agent workflows on LangGraph', 'Human review steps where the risk is', 'Fault rehearsal before release: timeouts, duplicates, outages'],
  },
  {
    icon: 'target',
    title: 'AI strategy and adoption',
    text: 'Find the work where AI pays off, prove it in weeks, and roll it out so people actually use it. Every use case gets a baseline, a target and an owner.',
    points: ['AI readiness assessment of data, systems and skills', 'Use-case portfolio ranked by value and risk', 'Training and change management through our AI Academy'],
  },
  {
    icon: 'link',
    title: 'Agent-ready integration',
    text: 'Agents are only as useful as the systems they can reach. We turn SAP, Salesforce, Workday and ServiceNow into governed tools that act as the signed-in person, so an agent can never see or do more than the human it works for.',
    points: ['MCP servers for your systems of record', 'Per-person access, field scoping and rate limits', 'Events and APIs underneath, monitored and retried'],
  },
  {
    icon: 'book',
    title: 'Knowledge and retrieval',
    text: 'Assistants that answer from your documents and records, with sources, and only from what the person asking is allowed to read.',
    points: ['Permission-aware retrieval (RAG) kept in sync with sources', 'Answer-quality evaluation sets', 'SharePoint, Confluence, Salesforce, ServiceNow and more'],
  },
  {
    icon: 'shield',
    title: 'AI governance and guardrails',
    text: 'Let agents act and keep the proof. Policy on every tool call, approvals bound to the exact values, and a signed record auditors can verify.',
    points: ['Approval flows in Slack and Teams', 'Policy mapped to SOC 2, the EU AI Act and HIPAA', 'Red-team testing against prompt injection and tool poisoning'],
  },
  {
    icon: 'loop',
    title: 'AgentOps and LLMOps',
    text: 'Run agents like production software: versioned, evaluated on every change, watched in production, and kept within budget.',
    points: ['Regression evals and release gates in CI', 'Tracing, cost and latency per workflow', 'Model routing and fallbacks across providers'],
  },
];

// How far a team has taken AI, and what we build at each step. Most clients start at one and move right.
const LADDER = [
  { level: 'Assist', title: 'AI answers', text: 'Assistants that find and summarize, grounded in your own documents and records.', example: 'What does our contract with Acme say about renewals?' },
  { level: 'Prepare', title: 'AI drafts the work', text: 'Agents read across systems and prepare the invoice, the reply or the change. A person sends it.', example: 'Draft the credit note for order 4471 and attach the evidence.' },
  { level: 'Act', title: 'AI acts, with approval', text: 'Routine actions run on their own. Risky ones wait for a named person to approve the exact values.', example: 'Refund under $200 runs; $4,000 waits for the finance lead.' },
  { level: 'Collaborate', title: 'Agents work together', text: 'Agents hand work to other agents, across teams and even across companies, under agreed terms.', example: "Your agent opens an incident at your provider's service desk." },
];

const FAQ = [
  { q: 'What is the difference between an assistant and an agent?', a: 'An assistant answers questions. An agent takes steps: it reads from your systems, decides what to do next and prepares or performs an action. That is why agents need tools with the right permissions, approvals for risky actions and a record of what they did. We build both, and most projects start with an assistant.' },
  { q: 'Which models do you use?', a: 'The one that fits the job. We build on Claude, GPT, Gemini and open models, often more than one in the same workflow, and route between them by cost, speed and quality. Your workflows are not tied to one provider.' },
  { q: 'How do you stop an agent from doing something it should not?', a: 'Three layers. The agent acts through tools that carry the signed-in person\'s own access, so it cannot see more than they can. Policy checks every call before it runs. Anything risky waits for a named person to approve the exact values, and every decision is signed and kept.' },
  { q: 'Our data and systems are messy. Can we still start?', a: 'Yes. A readiness assessment shows which use cases your data supports today, and we fix integration where it blocks the value. Agent-ready integration is often the first release.' },
  { q: 'How long until something is in production?', a: 'Weeks. A first workflow, such as ticket triage or invoice matching, ships to a pilot group with evaluations and monitoring, and larger programs are split into releases of that size. The Process page shows a typical first-release plan.' },
  { q: 'Do you still build applications and integrations without AI?', a: 'Yes. Custom applications, systems integration, cloud and DevOps are where we started, and they are the foundation every agent runs on. See the integration guides for the systems we connect most.' },
];

export default function Services() {
  return (
    <>
      <section className="page-hero has-art">
        <DotTerrain />
        <div className="wrap">
          <div>
            <span className="eyebrow">Services</span>
            <h1>AI agents that do real work on the systems you already run</h1>
            <p>
              Strategy, engineering and governance for AI, from one in-house team. We design the agents, connect them
              to your business systems with the right permissions, and keep people in charge of what they do.
            </p>
            <div className="hero-actions">
              <CallButton from="services-hero" />
              <Link className="btn btn-ghost" to="/process#brief" data-track="brief:services-hero">Send a project brief</Link>
            </div>
          </div>
          <div className="hero-art"><AgentServicesArt /></div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <Reveal className="section-head">
            <div>
              <h2>What we do</h2>
              <p className="muted">Six services, each one part of putting agents to work safely.</p>
            </div>
          </Reveal>
          <div className="svc-grid">
            {SERVICES.map((s, i) => (
              <Reveal as="article" key={s.title} className="svc-card" delay={(i % 3) * 90}>
                <IconTile name={s.icon} tone={s.tone || 'teal'} />
                <h3>{s.title}</h3>
                <p className="muted">{s.text}</p>
                <ul>{s.points.map((p) => <li key={p}>{p}</li>)}</ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="wrap">
          <Reveal className="section-head">
            <div>
              <h2>From answers to action</h2>
              <p className="muted">Four steps teams take with AI. We meet you where you are and build the next one.</p>
            </div>
            <Link className="btn btn-ghost" to="/ai-adoption">See AI adoption</Link>
          </Reveal>
          <ol className="ladder">
            {LADDER.map((l, i) => (
              <Reveal as="li" key={l.level} className="ladder-step" delay={i * 90}>
                <span className="ladder-level">{String(i + 1).padStart(2, '0')} · {l.level}</span>
                <h3>{l.title}</h3>
                <p className="muted">{l.text}</p>
                <p className="ladder-example">“{l.example}”</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section-ink">
        <div className="wrap">
          <Reveal className="section-head">
            <div>
              <h2>The agentic stack we build</h2>
              <p className="muted">Five layers from the people asking to the systems that hold the record, with guardrails on every one.</p>
            </div>
            <Link className="btn btn-ghost" to="/platform">How our products fit</Link>
          </Reveal>
          <Reveal delay={120}><AgentStack /></Reveal>
        </div>
      </section>

      <section className="section">
        <div className="wrap faq-wrap">
          <Reveal>
            <h2>Common questions</h2>
            <p className="muted">Something else on your mind? <Link to="/contact">Ask us directly</Link>.</p>
          </Reveal>
          <div className="faq">
            {FAQ.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="wrap">
          <h2>Have work an agent could take on? Start with a free 30-minute call.</h2>
          <CallButton className="btn" from="services-band">Book a free call</CallButton>
        </div>
      </section>
    </>
  );
}
