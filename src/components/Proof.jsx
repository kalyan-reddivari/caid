import { CASE_STUDIES, CLIENTS, TESTIMONIALS, live } from '../content/proof.js';
import Reveal from './Reveal.jsx';

// Marks an empty content slot. Only rendered in local development (see content/proof.js).
export function PlaceholderTag() {
  return <span className="placeholder-tag">Placeholder</span>;
}

export function ClientStrip() {
  const clients = live(CLIENTS);
  if (!clients.length) return null;
  return (
    <div className="client-strip">
      <span className="client-strip-label">Trusted by teams at</span>
      <ul>
        {clients.map((c, i) => (
          <li key={i} className={c.placeholder ? 'is-placeholder' : ''}>{c.name}</li>
        ))}
      </ul>
      {clients.some((c) => c.placeholder) && <PlaceholderTag />}
    </div>
  );
}

export function CaseStudies({ heading = 'Selected work', intro = 'What changed for clients after their systems started working together.' }) {
  const items = live(CASE_STUDIES);
  if (!items.length) return null;
  return (
    <section className="section" id="work">
      <div className="wrap">
        <Reveal className="section-head">
          <div>
            <h2>{heading}</h2>
            <p className="muted">{intro}</p>
          </div>
        </Reveal>
        <div className="case-grid">
          {items.map((c, i) => (
            <Reveal as="article" key={i} className={`case-card${c.placeholder ? ' is-placeholder' : ''}`} delay={i * 110}>
              {c.placeholder && <PlaceholderTag />}
              <span className="case-industry">{c.industry}</span>
              <div className="case-result">
                <b>{c.result}</b>
                <span>{c.resultLabel}</span>
              </div>
              <h3>{c.title}</h3>
              <p>{c.summary}</p>
              <ul className="chips" aria-label="Systems connected">
                {c.systems.map((s) => <li className="chip mono" key={s}>{s}</li>)}
              </ul>
              <span className="case-client">{c.client}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Testimonial() {
  const [t] = live(TESTIMONIALS);
  if (!t) return null;
  return (
    <Reveal as="figure" className={`testimonial${t.placeholder ? ' is-placeholder' : ''}`}>
      {t.placeholder && <PlaceholderTag />}
      <blockquote>{t.quote}</blockquote>
      <figcaption><b>{t.name}</b><span>{t.role}</span></figcaption>
    </Reveal>
  );
}
