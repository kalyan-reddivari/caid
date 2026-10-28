import { Link } from 'react-router-dom';
import CallButton from '../../components/CallButton.jsx';
import { CaseStudies } from '../../components/Proof.jsx';
import { FlowBand, ServicesArt } from '../../components/Graphics.jsx';
import { IconTile } from '../../components/Icons.jsx';
import Reveal from '../../components/Reveal.jsx';

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

export default function Services() {
  return (
    <>
      <section className="page-hero has-art">
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

      <section className="section section-ink">
        <div className="wrap">
          <Reveal className="section-head">
            <h2>Data moves once and stays correct</h2>
            <p className="muted">One API and event layer between the systems you run and the places people use the data.</p>
          </Reveal>
          <Reveal delay={120}><FlowBand /></Reveal>
        </div>
      </section>

      <CaseStudies heading="Results from recent projects" intro="Each one started with a free 30-minute call." />

      <section className="cta-band">
        <div className="wrap">
          <h2>Not sure which service fits? Start with a free 30-minute call.</h2>
          <CallButton className="btn" from="services-band">Book a free call</CallButton>
        </div>
      </section>
    </>
  );
}
