import { Link } from 'react-router-dom';
import BeforeAfter from '../../components/BeforeAfter.jsx';
import CallButton from '../../components/CallButton.jsx';
import { FlowBand, ServicesArt } from '../../components/Graphics.jsx';
import { IconTile } from '../../components/Icons.jsx';
import Reveal from '../../components/Reveal.jsx';
import DotTerrain from '../../components/fx/DotTerrain.jsx';

const SERVICES = [
  {
    icon: 'app',
    title: 'Custom application development',
    text: 'Customer portals, operations dashboards, mobile apps and internal tools built with React, Spring Boot and modern cloud platforms.',
    points: ['Product discovery and UX design', 'Web and mobile development', 'Legacy application modernization'],
  },
  {
    icon: 'link',
    title: 'Systems integration',
    text: 'We connect ERP, CRM, HR, finance and industry systems so data moves once and stays correct.',
    points: ['API design and API gateways', 'Event streaming with Kafka', 'Salesforce, SAP and MuleSoft integration'],
  },
  {
    icon: 'ai',
    tone: 'amber',
    title: 'AI adoption',
    text: 'Practical AI that lives inside your applications, grounded in your own data and reviewed by your people.',
    points: ['AI readiness assessments', 'Assistants and retrieval (RAG)', 'Document and workflow automation'],
  },
  {
    icon: 'cube',
    title: 'Product development',
    text: 'End-to-end product teams for startups and enterprises launching new digital products.',
    points: ['MVP scoping and roadmaps', 'Multi-tenant SaaS architecture', 'Launch, analytics and iteration'],
  },
  {
    icon: 'cloud',
    title: 'Cloud and DevOps',
    text: 'Reliable infrastructure and release pipelines on AWS and Azure.',
    points: ['Containers and Kubernetes', 'CI/CD automation', 'Observability and cost reviews'],
  },
  {
    icon: 'bulb',
    title: 'Technology consulting',
    text: 'Senior guidance when you need a second opinion or a plan before you build.',
    points: ['Architecture reviews', 'Modernization roadmaps', 'Fractional CTO support'],
  },
];

const FAQ = [
  { q: 'Which systems do you integrate?', a: 'ERP, CRM, HR, finance and service systems such as SAP, Salesforce, Workday, NetSuite and ServiceNow, plus data platforms like Snowflake and older databases with no API. If a system has an API, a database or a file drop, we can connect it.' },
  { q: 'Do we need MuleSoft or another integration platform?', a: 'No. We use the platform you already pay for when it fits, and build lightweight services with Spring Boot or Python when it does not. Either way you own the code and the run books.' },
  { q: 'How long does a first integration take?', a: 'Weeks, not quarters. A first production flow, such as orders from Salesforce to SAP, ships with monitoring and retries, and larger programs are split into releases of that size. The Process page shows a typical first-release plan.' },
  { q: 'Can AI be added later?', a: 'Yes, and it works better that way. Once data moves reliably, assistants and automations can read it and propose actions, with people approving anything risky.' },
  { q: 'Who supports it after launch?', a: 'You choose: we hand over with documentation and training, or keep running it under a support agreement with agreed response times.' },
];

export default function Services() {
  return (
    <>
      <section className="page-hero has-art">
        <DotTerrain />
        <div className="wrap">
          <div>
            <span className="eyebrow">Services</span>
            <h1>Custom software and systems integration, from one team</h1>
            <p>Advice, engineering and ongoing support from people who know your systems, with AI built in where it helps.</p>
            <div className="hero-actions">
              <CallButton from="services-hero" />
              <Link className="btn btn-ghost" to="/process#brief" data-track="brief:services-hero">Send a project brief</Link>
            </div>
          </div>
          <div className="hero-art"><ServicesArt /></div>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <h2 className="sr-only">Our services</h2>
          {SERVICES.map((s) => (
            <Reveal as="article" key={s.title} className="product">
              <div className="product-head">
                <IconTile name={s.icon} tone={s.tone || 'teal'} />
                <h3>{s.title}</h3>
              </div>
              <div>
                <p className="muted">{s.text}</p>
                <ul>{s.points.map((p) => <li key={p}>{p}</li>)}</ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section section-alt">
        <div className="wrap">
          <Reveal className="section-head">
            <div>
              <h2>What changes when your systems are connected</h2>
              <p className="muted">The same four systems, before and after an integration project. Flip the switch.</p>
            </div>
            <Link className="btn btn-ghost" to="/integrations">See integration guides</Link>
          </Reveal>
          <Reveal><BeforeAfter /></Reveal>
        </div>
      </section>

      <section className="section section-ink">
        <div className="wrap">
          <Reveal className="section-head">
            <h2>Data moves once and stays correct</h2>
            <p className="muted">One API and event layer between the systems you run and the places people use the data.</p>
          </Reveal>
          <Reveal delay={120}><FlowBand /></Reveal>
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
          <h2>Not sure which service fits? Start with a free 30-minute call.</h2>
          <CallButton className="btn" from="services-band">Book a free call</CallButton>
        </div>
      </section>
    </>
  );
}
