import { Link } from 'react-router-dom';
import CallButton from '../../components/CallButton.jsx';
import { PlaceholderTag } from '../../components/Proof.jsx';
import { COMPANY_FACTS, TEAM, live } from '../../content/proof.js';
import { AboutOrbitArt } from '../../components/Graphics.jsx';
import { IconTile } from '../../components/Icons.jsx';
import Reveal from '../../components/Reveal.jsx';

const VALUES = [
  { icon: 'send', title: 'Ship early', text: 'A small release in real hands teaches more than a long plan.' },
  { icon: 'target', title: 'Own the outcome', text: 'We measure success by adoption and results, not hours billed.' },
  { icon: 'chat', title: 'Explain plainly', text: 'Clients should understand every decision we make on their behalf.' },
  { icon: 'check', title: 'Leave it better', text: 'Documented code, trained teams and no lock-in when we hand over.' },
];

const STORY = [
  { icon: 'link', title: 'Connect', text: 'We started by connecting systems that were never designed to talk to each other.' },
  { icon: 'ai', tone: 'amber', title: 'Put AI at the center', text: 'As AI matured, the same integration skill decided whether it succeeded inside a business.' },
  { icon: 'cube', title: 'Build and ship', text: 'Today we combine consulting, engineering and our own products.' },
];

export default function About() {
  return (
    <>
      <section className="page-hero has-art">
        <div className="wrap">
          <div>
            <span className="eyebrow">About CAID</span>
            <h1>An integration firm that put AI at the center</h1>
            <p>CAID LLC is a consulting and product development firm in Atlanta for organizations whose systems need to work together.</p>
          </div>
          <div className="hero-art"><AboutOrbitArt /></div>
        </div>
      </section>
      <section className="section">
        <div className="wrap split">
          <Reveal>
            <h2>Our story</h2>
            <p className="muted">
              CAID stands for Custom Application and Integration Development. We started by connecting systems
              that were never designed to talk to each other. As AI matured, it became clear that the same skill
              decides whether AI succeeds inside a business, so we put it at the center of our name and our work.
            </p>
            <p className="muted">
              Today we combine consulting, engineering and our own products to help clients modernize,
              integrate and adopt AI with confidence.
            </p>
          </Reveal>
          <div className="service-list two-col">
            {VALUES.map((v, i) => (
              <Reveal as="article" className="value" key={v.title} delay={i * 100}>
                <IconTile name={v.icon} tone={i % 2 ? 'amber' : 'teal'} />
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="wrap">
          <Reveal className="section-head">
            <h2>How we got here</h2>
            <p className="muted">Three steps from connecting systems to putting AI to work in them.</p>
          </Reveal>
          <Reveal className="timeline" delay={100}>
            {STORY.map((s) => (
              <div key={s.title}>
                <IconTile name={s.icon} tone={s.tone || 'teal'} />
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <LeadershipSection />

      <section className="cta-band">
        <div className="wrap">
          <h2>We are hiring engineers who like hard integration problems.</h2>
          <Link className="btn" to="/careers">See open roles</Link>
        </div>
      </section>
    </>
  );
}

function LeadershipSection() {
  const team = live(TEAM);
  const facts = COMPANY_FACTS.filter((f) => f.value || (f.placeholder && live([f]).length));
  if (!team.length && !facts.length) return null;
  return (
    <section className="section">
      <div className="wrap">
        <Reveal className="section-head">
          <div>
            <h2>{team.length ? 'The people you will work with' : 'CAID at a glance'}</h2>
            <p className="muted">Senior people lead every engagement, from the first call to handover.</p>
          </div>
          <CallButton className="btn btn-ghost" from="about-team">Talk to one of us</CallButton>
        </Reveal>
        {team.length > 0 && (
          <div className="team-grid">
            {team.map((p, i) => (
              <Reveal as="article" key={i} className={`team-card${p.placeholder ? ' is-placeholder' : ''}`} delay={i * 100}>
                {p.placeholder && <PlaceholderTag />}
                <span className="team-avatar" aria-hidden="true">{p.initials}</span>
                <h3>{p.name}</h3>
                <span className="team-role">{p.role}</span>
                <p>{p.bio}</p>
              </Reveal>
            ))}
          </div>
        )}
        {facts.length > 0 && (
          <dl className="company-facts">
            {facts.map((f) => (
              <div key={f.label}>
                <dt>{f.label}</dt>
                <dd>{f.value || <span className="placeholder-inline">To confirm</span>}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </section>
  );
}
