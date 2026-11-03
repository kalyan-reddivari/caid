import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import DotTerrain from '../../../components/fx/DotTerrain.jsx';
import Reveal from '../../../components/Reveal.jsx';
import { CERT_FAQ, CERT_STEPS, certById, CERTS, pathById, TIERS } from '../../../content/academy.js';
import Credential from './Credential.jsx';
import { CONTACT_ACADEMY, TierMark } from './shared.jsx';

const TIER_TEXT = {
  Foundational: 'Core AI literacy for anyone. Unproctored.',
  Associate: 'Proves you can do the job in your role, day to day.',
  Professional: 'For people who design and own AI systems in production.',
  'Product specialist': 'Deep, hands-on skill with Underwrit or Orbitward.',
};

export default function Certifications() {
  const { hash } = useLocation();
  const fromHash = certById(hash.slice(1));
  const [selected, setSelected] = useState(fromHash ? fromHash.id : 'genai-associate');

  useEffect(() => {
    if (fromHash) setSelected(fromHash.id);
  }, [fromHash]);

  const detail = useRef(null);
  const picked = useRef(false);
  const choose = (id) => {
    picked.current = true;
    setSelected(id);
  };

  // On narrow screens the detail sits below the whole ladder, so bring it into view after a pick.
  useEffect(() => {
    if (!picked.current) return;
    picked.current = false;
    if (window.matchMedia('(max-width: 960px)').matches) detail.current?.scrollIntoView({ block: 'start' });
  }, [selected]);

  const c = certById(selected);
  const path = pathById(c.path);

  return (
    <>
      <section className="page-hero academy-hero">
        <DotTerrain />
        <div className="wrap">
          <span className="eyebrow">Certifications</span>
          <h1>Credentials that prove the work, not the reading</h1>
          <p>
            Four tiers, from Foundations to Professional and product specialist exams. Every certification is
            free, and every credential comes with a digital badge anyone can verify.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="ladder" role="list">
            {TIERS.map((tier) => (
              <div key={tier} className="ladder-col" role="listitem">
                <h3><TierMark tier={tier} />{tier}</h3>
                <p className="small muted">{TIER_TEXT[tier]}</p>
                {CERTS.filter((x) => x.tier === tier).map((x) => (
                  <button key={x.id} id={x.id} type="button" className={`cert-pick${x.id === selected ? ' on' : ''}`}
                    aria-pressed={x.id === selected} aria-controls="cert-detail" onClick={() => choose(x.id)}>
                    {x.name}
                  </button>
                ))}
              </div>
            ))}
          </div>

          <article className="cert-detail" id="cert-detail" key={c.id} ref={detail} aria-live="polite">
            <div className="cert-detail-head">
              <span className="pill">{c.tier}</span>
              <h2>{c.name}</h2>
              <p className="muted">For {c.audience.toLowerCase()}.</p>
            </div>
            <div className="cert-detail-body">
              <dl className="exam-facts">
                <div><dt>Questions</dt><dd>{c.questions}, multiple choice</dd></div>
                <div><dt>Time</dt><dd>{c.minutes} minutes</dd></div>
                <div><dt>Delivery</dt><dd>{c.proctoring}</dd></div>
                <div><dt>Fee</dt><dd>{c.fee}</dd></div>
                <div><dt>Valid for</dt><dd>{c.validity}</dd></div>
                <div><dt>Before you sit it</dt><dd>{c.prereq}</dd></div>
              </dl>
              <div>
                <h3 className="mini-head">What the exam covers</h3>
                <ul className="domains">
                  {c.domains.map(([name, weight]) => (
                    <li key={name}>
                      <span>{name}</span>
                      <span className="domain-bar" aria-hidden="true"><i style={{ width: `${weight * 2.5}%` }} /></span>
                      <b>{weight}%</b>
                    </li>
                  ))}
                </ul>
                <div className="cert-actions">
                  <Link className="btn btn-primary" to={`/ai-academy/paths#${path.id}`}>Prepare: {path.title} path</Link>
                  <Link className="btn btn-ghost" to={CONTACT_ACADEMY}>Ask about exam booking</Link>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="section section-alt">
        <div className="wrap">
          <Reveal className="section-head">
            <div>
              <h2>What you receive</h2>
              <p className="muted">Pass and you get a digital badge and a certificate, both verifiable by anyone. Shown here for the {c.name}.</p>
            </div>
          </Reveal>
          <Credential cert={c} />
        </div>
      </section>

      <section className="section section-ink">
        <div className="wrap">
          <Reveal className="section-head">
            <div>
              <h2>How certification works</h2>
              <p className="muted">The same five steps for every exam.</p>
            </div>
          </Reveal>
          <ol className="steps five">
            {CERT_STEPS.map((s) => (
              <li key={s.title}>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="wrap faq-wrap">
          <div>
            <h2>Questions about exams</h2>
            <p className="muted">Anything else, ask us and we will reply within one business day.</p>
            <Link className="btn btn-ghost" to={CONTACT_ACADEMY}>Contact the Academy</Link>
          </div>
          <div className="faq">
            {CERT_FAQ.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
