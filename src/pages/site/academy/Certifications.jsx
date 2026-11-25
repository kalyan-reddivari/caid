import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import DotTerrain from '../../../components/fx/DotTerrain.jsx';
import Reveal from '../../../components/Reveal.jsx';
import { CERT_FAQ, CERT_STEPS, certById, CERTS, pathById, resourcesFor, ROADMAPS, studyWeeks, TIERS } from '../../../content/academy.js';
import Credential from './Credential.jsx';
import { CONTACT_ACADEMY, ResourceLink, TierMark } from './shared.jsx';

const LETTERS = ['A', 'B', 'C', 'D'];

// Exam-style practice questions. Picking an option shows whether it was right and why.
function SampleQuestions({ cert }) {
  const [picks, setPicks] = useState({});
  return (
    <div className="sample-qs">
      {cert.sample.map((s, n) => {
        const pick = picks[n];
        const done = pick !== undefined;
        return (
          <fieldset key={s.q} className="sample-q">
            <legend><span className="sample-n">Question {n + 1}</span>{s.q}</legend>
            <div className="sample-options">
              {s.options.map((o, i) => {
                const state = !done ? '' : i === s.answer ? ' right' : i === pick ? ' wrong' : '';
                return (
                  <button key={o} type="button" className={`sample-opt${state}`} aria-pressed={pick === i}
                    disabled={done} onClick={() => setPicks({ ...picks, [n]: i })}>
                    <b aria-hidden="true">{LETTERS[i]}</b>{o}
                  </button>
                );
              })}
            </div>
            {done && (
              <p className="sample-why" role="status">
                <strong>{pick === s.answer ? 'Correct.' : `Not quite. The answer is ${LETTERS[s.answer]}.`}</strong> {s.why}
              </p>
            )}
          </fieldset>
        );
      })}
      {Object.keys(picks).length > 0 && (
        <button type="button" className="link-btn" onClick={() => setPicks({})}>Try again</button>
      )}
    </div>
  );
}

const TIER_TEXT = {
  Foundational: 'Core AI literacy for anyone. Unproctored.',
  Associate: 'Proves you can do the job in your role, day to day.',
  Professional: 'For people who design and own AI systems in production.',
  'Product specialist': 'Deep, hands-on skill with Underwrit, Orbitward or Agentcraft Studio.',
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
  const prep = resourcesFor(c.id);
  const weeks = studyWeeks(path.hours);

  return (
    <>
      <section className="page-hero academy-hero">
        <DotTerrain />
        <div className="wrap">
          <span className="eyebrow">Certifications</span>
          <h1>Credentials that prove the work, not the reading</h1>
          <p>
            {CERTS.length} certifications in four tiers, from Foundations to Professional and product specialist
            exams. Every one is free, each comes with sample questions and a study plan, and every credential is a
            digital badge anyone can verify.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <h2 className="sr-only">Certifications by tier</h2>
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
              <p className="muted">For {c.audience.charAt(0).toLowerCase() + c.audience.slice(1)}.</p>
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

            <div className="cert-prep">
              <div>
                <h3 className="mini-head">Try sample questions</h3>
                <SampleQuestions key={c.id} cert={c} />
              </div>
              <div>
                <h3 className="mini-head">Study plan</h3>
                <p className="prep-plan">
                  <b>About {weeks} weeks</b> at four hours a week: the {path.hours}-hour{' '}
                  <Link to={`/ai-academy/paths#${path.id}`}>{path.title}</Link> path, then a practice exam.
                </p>
                <h3 className="mini-head">Free prep for this exam</h3>
                <ul className="prep-list">
                  {prep.filter((r) => r.free).sort((a, b) => a.certs.includes('*') - b.certs.includes('*')).slice(0, 7).map((r) => (
                    <li key={r.title}><ResourceLink r={r} /><span>{r.type}</span></li>
                  ))}
                </ul>
                <Link className="more-link" to={`/ai-academy/resources?cert=${c.id}`}>All {prep.length} resources for this exam</Link>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="section section-alt">
        <div className="wrap">
          <Reveal className="section-head">
            <div>
              <h2>Roadmaps by role</h2>
              <p className="muted">A suggested order of certifications for the work you do. Start anywhere your experience allows.</p>
            </div>
          </Reveal>
          <div className="roadmaps">
            {ROADMAPS.map((r) => (
              <div key={r.role} className="roadmap">
                <h3>{r.role}</h3>
                <ol>
                  {r.steps.map((id) => {
                    const x = certById(id);
                    return (
                      <li key={id}>
                        <button type="button" className={x.id === selected ? 'on' : ''} onClick={() => { choose(x.id); detail.current?.scrollIntoView({ block: 'start' }); }}>
                          <TierMark tier={x.tier} />{x.name}
                        </button>
                      </li>
                    );
                  })}
                </ol>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
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
