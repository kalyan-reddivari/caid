import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Reveal from '../../components/Reveal.jsx';
import StackFlow, { LifecycleLoop } from '../../components/StackFlow.jsx';
import DotTerrain from '../../components/fx/DotTerrain.jsx';
import { LAYERS, PRODUCTS, ROADMAP, STACK_INTEGRATIONS as INTEGRATIONS, WEEKS } from '../../content/products.js';

const PROOF = [
  { title: 'Acts as the person', text: 'Every call uses the signed-in person\'s own access in the source system. Their sharing rules and field security still apply.' },
  { title: 'Approves the values, not the tool', text: 'An approval covers one call with exact values. A changed value, another user or a second use is refused.' },
  { title: 'Checks against the request', text: 'What the user asked for is recorded before the agent reads anything, so text planted in a record cannot widen the task.' },
  { title: 'Blocks changed tools', text: 'Tool definitions are pinned. A changed description, a common way to mislead agents, waits for an admin to approve it.' },
  { title: 'Signs every write', text: 'A receipt links the request, the values, the policy and the approver, signed so auditors can verify it without trusting us.' },
  { title: 'Tested against attacks', text: 'A red-team suite of 19 attack types runs on every change, from tool poisoning to replayed approvals. All 19 are blocked today.' },
];

// Which roadmap week today falls in (0 = the week of 2 November 2026), kept inside the chart.
function currentWeek() {
  const start = Date.UTC(2026, 10, 2);
  const weeks = Math.floor((Date.now() - start) / (7 * 24 * 3600 * 1000));
  return Math.min(Math.max(weeks, 0), WEEKS.length - 1);
}

function Roadmap() {
  // The prerendered page marks the first week; the browser moves the marker to this week.
  const [week, setWeek] = useState(0);
  useEffect(() => setWeek(currentWeek()), []);
  return (
    <Reveal className="roadmap" tabIndex={0} aria-label="Product roadmap, scrolls sideways on small screens">
      <div className="roadmap-grid" role="table" aria-label="Product roadmap for the next three months, week by week, November 2026 to January 2027">
        <div role="row" style={{ display: 'contents' }}>
          <div role="columnheader"><span className="sr-only">Product</span></div>
          {WEEKS.map(([day, month], i) => (
            <div key={i} className={`roadmap-month${month ? ' is-month' : ''}`} role="columnheader">{month ? <b>{month}</b> : <br />}<br />{day}</div>
          ))}
        </div>
        <div className="roadmap-today" style={{ gridRow: `2 / ${ROADMAP.length + 2}`, gridColumn: week + 2 }} aria-hidden="true"><span>now</span><i /></div>
        {ROADMAP.map((r, k) => (
          <div key={r.name} role="row" style={{ display: 'contents' }}>
            <div className="roadmap-name" role="rowheader" style={{ gridRow: k + 2, gridColumn: 1 }}>{r.name}<small>{r.note}</small></div>
            <div style={{ gridRow: k + 2, gridColumn: `${r.start + 2} / ${r.end + 3}` }} role="cell">
              <div className="roadmap-bar" style={{ '--d': `${k * 0.12}s` }}>
                {r.marks.map(([m, label]) => {
                  const pct = ((m - r.start + 0.5) / (r.end - r.start + 1)) * 100;
                  return <span key={label} className={`roadmap-dot${label === 'GA' ? ' ga' : ''}`} style={{ left: `${pct}%` }}><span>{label}</span></span>;
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="roadmap-legend">
        <span>Available now: {PRODUCTS.map((p) => `${p.name} (${p.short})`).join(', ')}.</span>
        <span>Every product reaches general availability (GA) within the next three months. Dates are targets, shaped by design partners.</span>
      </div>
    </Reveal>
  );
}

export default function Platform() {
  return (
    <>
      <section className="page-hero">
        <DotTerrain />
        <div className="wrap">
          <div>
            <span className="eyebrow">How the stack works</span>
            <h1>Let agents act on your systems of record, and prove every action was meant</h1>
            <p>
              The CAID stack takes an agent workflow from design to production: designed in Agentcraft Studio, rehearsed
              in Dryva, run through Bridgehead as the signed-in person, approved in Underwrit when it matters, and
              recorded in a receipt anyone can check. Pick a walkthrough below to see one request travel through it.
            </p>
            <div className="hero-actions">
              <a className="btn btn-primary" href="#walkthrough">See a request travel</a>
              <Link className="btn btn-ghost" to="/products">All products</Link>
            </div>
          </div>
        </div>
      </section>

      <section id="walkthrough" className="section">
        <div className="wrap">
          <Reveal className="section-head">
            <div>
              <h2>One request, step by step</h2>
              <p className="muted">Each walkthrough lights up the path through the stack. Pause it, or pick a step to read it at your own pace.</p>
            </div>
          </Reveal>
          <StackFlow />
        </div>
      </section>

      <section className="section section-alt">
        <div className="wrap">
          <Reveal className="section-head">
            <div>
              <h2>Four layers, one path</h2>
              <p className="muted">Products never call a customer system directly. Everything goes through the same identity, policy, approval and audit.</p>
            </div>
          </Reveal>
          <div className="layer-grid">
            {LAYERS.map((l, i) => (
              <Reveal as="article" key={l.name} className="layer-card" delay={(i % 4) * 90}>
                <span className="layer-kicker">{l.kicker}</span>
                <h3>{l.name}</h3>
                <p className="muted">{l.text}</p>
                <ul>{l.points.map((p) => <li key={p}>{p}</li>)}</ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="integrations" className="section">
        <div className="wrap">
          <Reveal className="section-head">
            <div>
              <h2>What it connects to</h2>
              <p className="muted">Every connection runs as the signed-in person or a read-only identity the customer controls, through the same policy, approvals and audit.</p>
            </div>
          </Reveal>
          <div className="int-grid">
            {INTEGRATIONS.map((g, i) => (
              <Reveal as="article" key={g.name} className="int-card" delay={(i % 3) * 90}>
                <span className="layer-kicker">{g.product}</span>
                <h3>{g.name}</h3>
                <ul className="int-chips">{g.items.map((x) => <li key={x}>{x}</li>)}</ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="wrap">
          <Reveal className="section-head">
            <div>
              <h2>The life of a workflow</h2>
              <p className="muted">Each product covers one stage, and the loop starts again with every change.</p>
            </div>
          </Reveal>
          <Reveal><LifecycleLoop /></Reveal>
        </div>
      </section>

      <section className="section section-ink">
        <div className="wrap">
          <Reveal className="section-head">
            <div>
              <h2>What a security team can check for itself</h2>
              <p className="muted">Gateways and connectors are now common. What sets this stack apart is proof that each action was intended, approved and allowed.</p>
            </div>
          </Reveal>
          <div className="proof-list">
            {PROOF.map((p, i) => (
              <Reveal key={p.title} delay={(i % 3) * 90}>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="roadmap" className="section">
        <div className="wrap">
          <Reveal className="section-head">
            <div>
              <h2>Roadmap</h2>
              <p className="muted">The next three months, week by week. The shared platform comes first, and each product then reuses what the one before it built.</p>
            </div>
          </Reveal>
          <Roadmap />
        </div>
      </section>

      <section className="cta-band">
        <div className="wrap">
          <h2>Running agents on Salesforce, ServiceNow, Workday or SAP? Help shape what ships first.</h2>
          <Link className="btn" to="/contact?interest=Products#book" data-track="platform:design-partner">Become a design partner</Link>
        </div>
      </section>
    </>
  );
}
