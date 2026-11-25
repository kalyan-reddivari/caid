import { Link } from 'react-router-dom';
import { AcademyArt } from '../../../components/AIGraphics.jsx';
import { IconTile } from '../../../components/Icons.jsx';
import DotTerrain from '../../../components/fx/DotTerrain.jsx';
import Reveal from '../../../components/Reveal.jsx';
import CountUp from '../../../components/CountUp.jsx';
import { AUDIENCES, CERTS, PATHS, RESOURCES, TIERS, WAYS_TO_LEARN } from '../../../content/academy.js';
import { CONTACT_ACADEMY, TierMark } from './shared.jsx';

const FEATURED = ['ai-foundations', 'agent-platform-engineer', 'mlops-engineer'];

export default function Overview() {
  const free = RESOURCES.filter((r) => r.free).length;

  return (
    <>
      <section className="page-hero has-art">
        <DotTerrain />
        <div className="wrap">
          <div>
            <span className="eyebrow">CAID Academy</span>
            <h1>Learn to build and govern AI, then prove it</h1>
            <p>
              Role-based learning paths, hands-on labs and certifications, taught by the people who build
              AI-native software and run our products every day.
            </p>
            <div className="hero-actions">
              <Link className="btn btn-primary" to="/ai-academy/paths">Explore learning paths</Link>
              <Link className="btn btn-ghost" to="/ai-academy/certifications">See certifications</Link>
            </div>
          </div>
          <div className="hero-art"><AcademyArt /></div>
        </div>
      </section>

      <section className="section academy-facts-section">
        <div className="wrap">
          <dl className="facts four academy-facts">
            <div><dt><CountUp value={PATHS.length} /></dt><dd>role-based learning paths</dd></div>
            <div><dt><CountUp value={CERTS.length} /></dt><dd>certifications across four tiers</dd></div>
            <div><dt><CountUp value={free} /></dt><dd>free resources to start with</dd></div>
            <div><dt>Free</dt><dd>every certification exam, retakes included</dd></div>
          </dl>
        </div>
      </section>

      <section className="section section-alt">
        <div className="wrap">
          <Reveal className="section-head">
            <div>
              <h2>Four ways to learn</h2>
              <p className="muted">Mix them to suit how you and your team work.</p>
            </div>
          </Reveal>
          <div className="academy-ways">
            {WAYS_TO_LEARN.map((w, i) => (
              <Reveal as="article" key={w.title} delay={i * 100}>
                <IconTile name={w.icon} tone={i % 2 ? 'amber' : 'teal'} />
                <h3>{w.title}</h3>
                <p>{w.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <Reveal className="section-head">
            <div>
              <h2>Start with a learning path</h2>
              <p className="muted">Each path is an ordered set of courses and labs that leads to a certification.</p>
            </div>
            <Link className="btn btn-ghost" to="/ai-academy/paths">All {PATHS.length} paths</Link>
          </Reveal>
          <div className="path-teasers">
            {FEATURED.map((id, i) => {
              const p = PATHS.find((x) => x.id === id);
              return (
                <Reveal as="article" key={p.id} className="path-teaser" delay={i * 110}>
                  <IconTile name={p.icon} tone="ink" />
                  <span className="path-meta">{p.level} · {p.hours} hours · {p.courses.length} courses</span>
                  <h3>{p.title}</h3>
                  <p>{p.summary}</p>
                  <Link to={`/ai-academy/paths#${p.id}`}>View the path</Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section section-ink">
        <div className="wrap">
          <Reveal className="section-head">
            <div>
              <h2>A certification ladder</h2>
              <p className="muted">Start with Foundations, prove role skills at Associate, lead at Professional, and specialise in our products.</p>
            </div>
            <Link className="btn btn-ghost" to="/ai-academy/certifications">How certification works</Link>
          </Reveal>
          <div className="ladder ladder-dark">
            {TIERS.map((tier) => (
              <div key={tier} className="ladder-col">
                <h3><TierMark tier={tier} />{tier}</h3>
                {CERTS.filter((c) => c.tier === tier).map((c) => (
                  <Link key={c.id} to={`/ai-academy/certifications#${c.id}`}>{c.name}</Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <Reveal className="section-head">
            <h2>Who the Academy is for</h2>
          </Reveal>
          <div className="service-list">
            {AUDIENCES.map((a, i) => (
              <Reveal as="article" key={a.title} delay={i * 110}>
                <IconTile name={a.icon} tone={i % 2 ? 'amber' : 'teal'} />
                <h3>{a.title}</h3>
                <p>{a.text}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="academy-band academy-team-band">
            <div>
              <h2>Our own people learn here first</h2>
              <p>Everyone at CAID follows an internal four-level path and certifies on the same paths we teach.</p>
            </div>
            <Link className="btn btn-ghost" to="/ai-academy/team">How we train our team</Link>
          </Reveal>
        </div>
      </section>

      <section className="cta-band">
        <div className="wrap">
          <h2>Training a team? We run private cohorts, and every certification is free.</h2>
          <Link className="btn" to={CONTACT_ACADEMY}>Talk to us about team training</Link>
        </div>
      </section>
    </>
  );
}
