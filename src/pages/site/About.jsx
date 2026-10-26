import { Link } from 'react-router-dom';
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
            <h1>About CAID</h1>
            <p>A consulting and product development firm for organizations whose systems need to work together.</p>
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

      <section className="cta-band">
        <div className="wrap">
          <h2>We are hiring engineers who like hard integration problems.</h2>
          <Link className="btn" to="/careers">See open roles</Link>
        </div>
      </section>
    </>
  );
}
