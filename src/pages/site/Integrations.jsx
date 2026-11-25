import { Link, useParams } from 'react-router-dom';
import CallButton from '../../components/CallButton.jsx';
import Reveal from '../../components/Reveal.jsx';
import DotTerrain from '../../components/fx/DotTerrain.jsx';
import { APPROACH, INTEGRATIONS, integrationBySlug } from '../../content/integrations.js';
import NotFound from '../NotFound.jsx';

// Two systems joined by a line with data moving both ways.
function PairArt({ a, b }) {
  return (
    <svg className="pair-art" viewBox="0 0 360 120" role="img" aria-label={`${a} connected to ${b}`}>
      <line x1="90" y1="60" x2="270" y2="60" className="pair-line" />
      <circle r="4" className="pair-packet"><animateMotion dur="2s" repeatCount="indefinite" path="M90 60 L270 60" /></circle>
      <circle r="4" className="pair-packet back"><animateMotion dur="2.6s" repeatCount="indefinite" path="M270 60 L90 60" /></circle>
      <rect x="152" y="44" width="56" height="32" rx="8" className="pair-hub" />
      <text x="180" y="65" textAnchor="middle" className="pair-hub-t">CAID</text>
      {[[60, a], [300, b]].map(([x, label]) => (
        <g key={label} transform={`translate(${x} 60)`}>
          <rect x="-56" y="-20" width="112" height="40" rx="20" className="pair-node" />
          <text y="5" textAnchor="middle" className="pair-node-t">{label}</text>
        </g>
      ))}
    </svg>
  );
}

export default function Integrations() {
  return (
    <>
      <section className="page-hero">
        <DotTerrain />
        <div className="wrap">
          <span className="eyebrow">Integration guides</span>
          <h1>How we connect the systems you already run</h1>
          <p>
            Guides for the system pairs we are asked about most: what moves between them, how we build it, and where AI
            helps once the data is connected. Running something else? We have probably connected it.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="pair-grid">
            {INTEGRATIONS.map((g, i) => (
              <Reveal as="article" key={g.slug} className="feature-card pair-card" delay={i * 100}>
                <div className="pair-frame art-dark"><PairArt a={g.a} b={g.b} /></div>
                <h2 className="pair-title">{g.title}</h2>
                <p>{g.summary}</p>
                <Link to={`/integrations/${g.slug}`}>Read the guide →</Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Approach />
      <GuideCta />
    </>
  );
}

function Approach() {
  return (
    <section className="section section-alt">
      <div className="wrap">
        <Reveal className="section-head">
          <div>
            <h2>The same four steps, whatever the systems</h2>
            <p className="muted">Every integration starts small and gets checked every day.</p>
          </div>
        </Reveal>
        <ol className="steps">
          {APPROACH.map((s) => (
            <li key={s.title}>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function GuideCta() {
  return (
    <section className="cta-band">
      <div className="wrap">
        <h2>Tell us which systems you run. We will tell you what to connect first.</h2>
        <CallButton className="btn" from="integrations-band">Book a free call</CallButton>
      </div>
    </section>
  );
}

export function IntegrationGuide() {
  const { slug } = useParams();
  const g = integrationBySlug(slug);
  if (!g) return <NotFound />;
  const others = INTEGRATIONS.filter((x) => x.slug !== g.slug);

  return (
    <>
      <section className="page-hero has-art">
        <DotTerrain />
        <div className="wrap">
          <div>
            <span className="eyebrow"><Link to="/integrations">Integration guides</Link></span>
            <h1>{g.title}</h1>
            <p>{g.summary}</p>
            <div className="hero-actions">
              <CallButton from={`integration-${g.slug}`} />
              <a className="btn btn-ghost" href="#flows">What moves</a>
            </div>
          </div>
          <div className="hero-art art-dark pair-hero"><PairArt a={g.a} b={g.b} /></div>
        </div>
      </section>

      <section className="section">
        <div className="wrap split">
          <Reveal>
            <h2>Signs you need it</h2>
            <ul className="ba-points">
              {g.pains.map((p, i) => <li key={p} style={{ '--i': i }}>{p}</li>)}
            </ul>
          </Reveal>
          <Reveal delay={120}>
            <h2>Tools we use</h2>
            <div className="chips">{g.tech.map((t) => <span className="chip mono" key={t}>{t}</span>)}</div>
          </Reveal>
        </div>
      </section>

      <section className="section section-alt" id="flows">
        <div className="wrap">
          <Reveal className="section-head"><h2>What moves between them</h2></Reveal>
          <div className="flow-rows">
            {g.flows.map((f, i) => (
              <Reveal key={f.what} className="flow-row" delay={i * 90}>
                <span className="chip">{f.from}</span>
                <span className="flow-arrow" aria-label="to">→</span>
                <span className="chip">{f.to}</span>
                <p>{f.what}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap split">
          <Reveal>
            <h2>Where <span className="ai-mark">{'{'}<b>Ai</b>{'}'}</span> helps next</h2>
            <p className="muted">{g.ai}</p>
            <Link className="btn btn-ink" to="/ai-adoption">Explore AI adoption</Link>
          </Reveal>
          <Reveal delay={120}>
            <h2>Other guides</h2>
            <ul className="plain-links">
              {others.map((o) => <li key={o.slug}><Link to={`/integrations/${o.slug}`}>{o.title} →</Link></li>)}
              <li><Link to="/integrations">All integration guides →</Link></li>
            </ul>
          </Reveal>
        </div>
      </section>

      <Approach />
      <GuideCta />
    </>
  );
}
