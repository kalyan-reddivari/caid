import { Link } from 'react-router-dom';
import { LearnMiniArt, LoopMiniArt, SpecMiniArt, StackBoard } from '../../components/AIGraphics.jsx';
import CallButton from '../../components/CallButton.jsx';
import { IconTile } from '../../components/Icons.jsx';
import MediaClip from '../../components/MediaClip.jsx';
import { CaseStudies, ClientStrip, Testimonial } from '../../components/Proof.jsx';
import Reveal from '../../components/Reveal.jsx';
import StackMap from '../../components/StackMap.jsx';
import NetworkGlobe from '../../components/fx/NetworkGlobe.jsx';
import MEDIA, { hasMedia } from '../../media.js';

const SERVICES = [
  { icon: 'app', title: 'Custom applications', text: 'Web, mobile and internal tools designed around how your teams already work.' },
  { icon: 'link', title: 'Systems integration', text: 'ERP, CRM, payments and legacy systems connected through clean, observable APIs.' },
  { icon: 'ai', title: 'AI adoption', ai: true, text: 'Assistants, document automation and retrieval built into the tools people use daily.' },
  { icon: 'cube', title: 'Product development', text: 'From discovery to launch for founders and business units building something new.' },
  { icon: 'cloud', title: 'Cloud and DevOps', text: 'Pipelines, containers and infrastructure that keep releases routine.' },
  { icon: 'bulb', title: 'Technology consulting', text: 'Architecture reviews, modernization roadmaps and hands-on technical leadership.' },
];

const STEPS = [
  { title: 'Discover', text: 'We map your systems, data and goals in a live session, with AI drafting the notes and questions.' },
  { title: 'Specify', text: 'A written spec and architecture you approve, with a first release small enough to ship in weeks.' },
  { title: 'Build', text: 'Our in-house team and AI agents deliver in short build cycles you can review every few days.' },
  { title: 'Adopt', text: 'Training, measurement and support so the new tools actually get used.' },
];

const AI_NATIVE = [
  { Art: LoopMiniArt, title: 'AI-driven lifecycle', text: 'Inception, construction and operations with AI in every phase and people at every gate.', to: '/ai-engineering#aidlc', cta: 'See the lifecycle' },
  { Art: SpecMiniArt, title: 'Spec-driven development', text: 'Requirements, design and tasks written first, so agents build exactly what you approved.', to: '/ai-engineering', cta: 'See how specs steer the work' },
  { Art: LearnMiniArt, title: 'A trained team', text: 'Everyone at CAID, from analysts to engineers, climbs our four-level AI Academy.', to: '/ai-academy', cta: 'Visit the AI Academy' },
];

export default function Home() {
  return (
    <>
      <section className="hero hero-map">
        <div className="wrap">
          <div className="hero-copy">
            <p className="eyebrow">Custom Application and Integration Development</p>
            <h1>Connect the systems you already run. Then <span className="hl">put AI to work</span> across them.</h1>
            <p className="lede">
              CAID is an Atlanta software firm for companies whose ERP, CRM, HR and finance systems don't talk to
              each other. One in-house team integrates them, builds the apps your people need, and adds AI where it pays off.
            </p>
            <div className="hero-actions">
              <CallButton from="home-hero" />
              <a className="btn btn-ghost" href="#map" data-track="map:home-hero">Map your stack ↓</a>
            </div>
            <ul className="assurances">
              <li>Free first call with a senior consultant</li>
              <li>NDA on request</li>
              <li>You own all code</li>
            </ul>
          </div>
          <div className="hero-globe"><NetworkGlobe /></div>
          <div className="hero-map-slot" id="map"><StackMap /></div>
          <ClientStrip />
        </div>
      </section>

      <section className="section section-alt">
        <div className="wrap">
          <Reveal className="section-head">
            <h2>What we build</h2>
            <p className="muted">Consulting and delivery under one roof, so advice turns into working software.</p>
          </Reveal>
          <div className="service-list">
            {SERVICES.map((s, i) => (
              <Reveal as="article" key={s.title} delay={(i % 3) * 110}>
                <IconTile name={s.icon} tone={s.ai ? 'amber' : 'teal'} />
                <h3>{s.title}{s.ai && <span className="tag-ai">AI</span>}</h3>
                <p>{s.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CaseStudies />

      <section className="section">
        <div className="wrap">
          <Reveal className="section-head">
            <div>
              <h2>AI-native by default</h2>
              <p className="muted">Every project we take in-house runs on the same AI-driven way of working.</p>
            </div>
            <Link className="btn btn-ghost" to="/ai-engineering">How we build</Link>
          </Reveal>
          <div className="feature-cards">
            {AI_NATIVE.map(({ Art, ...f }, i) => (
              <Reveal as="article" key={f.title} className="feature-card" delay={i * 120}>
                <div className="feature-art"><Art /></div>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
                <Link to={f.to}>{f.cta} →</Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-ink">
        <div className="wrap">
          <Reveal className="section-head">
            <div>
              <h2>How an engagement runs</h2>
              <p className="muted">Four stages, with a working release at the end of each one.</p>
            </div>
            <Link className="btn btn-ghost" to="/process">See the full process</Link>
          </Reveal>
          <ol className="steps">
            {STEPS.map((s) => (
              <li key={s.title}>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section-alt">
        <div className="wrap">
          <Reveal className="section-head">
            <div>
              <h2>One in-house team, every stack</h2>
              <p className="muted">
                Bring us the project, not a staffing plan. We assemble the right mix of people from our own bench
                and run the whole delivery under one roof.
              </p>
            </div>
          </Reveal>
          <Reveal><StackBoard /></Reveal>
          {hasMedia(MEDIA.teamIntro) && (
            <Reveal className="team-video"><MediaClip {...MEDIA.teamIntro} /></Reveal>
          )}
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <Testimonial />
        </div>
        <div className="wrap split">
          <Reveal>
            <h2>Why <span className="ai-mark">{'{'}<b>Ai</b>{'}'}</span> sits in the middle of our name</h2>
            <p className="muted">
              Most AI projects stall because the model is not connected to real systems and real workflows.
              Integration is our core skill, so AI becomes part of your applications instead of a separate experiment.
            </p>
            <Link className="btn btn-ink" to="/ai-adoption">Explore AI adoption</Link>
          </Reveal>
          <Reveal as="dl" className="facts" delay={120}>
            <div><dt>Weeks</dt><dd>to a first production release, not quarters. <Link to="/process">See a typical 12-week plan</Link></dd></div>
            <div><dt>One team</dt><dd>for strategy, engineering and support</dd></div>
            <div><dt>Your IP</dt><dd>code and models you own outright</dd></div>
            <div><dt>Measured</dt><dd>every AI feature ships with evaluation and monitoring</dd></div>
          </Reveal>
        </div>
      </section>

      <section className="cta-band">
        <div className="wrap">
          <h2>Have systems that should talk to each other? Tell us about them.</h2>
          <div className="cta-actions">
            <CallButton className="btn" from="home-band" />
            <Link className="btn btn-outline-light" to="/process#brief" data-track="brief:home-band">Send a project brief</Link>
          </div>
        </div>
      </section>
    </>
  );
}
