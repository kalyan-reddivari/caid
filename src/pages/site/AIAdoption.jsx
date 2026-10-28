import { Link } from 'react-router-dom';
import { AdoptionPathArt, NeuralArt } from '../../components/Graphics.jsx';
import { IconTile } from '../../components/Icons.jsx';
import Reveal from '../../components/Reveal.jsx';

const STAGES = [
  { title: 'Assess', text: 'Review data quality, systems and processes, then rank use cases by value and risk.' },
  { title: 'Pilot', text: 'Build one use case against real data with clear success measures agreed up front.' },
  { title: 'Integrate', text: 'Connect the pilot to your applications, permissions and audit trails.' },
  { title: 'Scale', text: 'Monitor quality and cost, train teams, and roll out the next use cases.' },
];

const USE_CASES = [
  { icon: 'book', title: 'Knowledge assistants', text: 'Answers drawn from your policies, manuals and tickets, with sources shown.' },
  { icon: 'doc', title: 'Document processing', text: 'Invoices, contracts and forms read, checked and entered into your systems.' },
  { icon: 'chat', title: 'Customer support', text: 'Suggested replies and ticket routing that agents approve before sending.' },
  { icon: 'trend', title: 'Sales and operations', text: 'Meeting summaries, CRM updates and forecasting inputs prepared automatically.' },
  { icon: 'code', title: 'Developer productivity', text: 'Code assistants, test generation and documentation for engineering teams.' },
  { icon: 'shield', title: 'Governance', text: 'Usage policies, data controls and evaluation so AI stays safe and accountable.' },
];

export default function AIAdoption() {
  return (
    <>
      <section className="page-hero has-art">
        <div className="wrap">
          <div>
            <span className="eyebrow">AI adoption</span>
            <h1>AI adoption that reaches production</h1>
            <p>We connect AI to the systems and data your business already runs on, then measure whether it helps.</p>
            <div className="hero-actions">
              <Link className="btn btn-primary" to="/contact?interest=AI%20adoption#book" data-track="assessment:ai-hero">Ask about the readiness assessment</Link>
              <a className="btn btn-ghost" href="#path">See the four stages</a>
            </div>
          </div>
          <div className="hero-art"><NeuralArt /></div>
        </div>
      </section>

      <section className="section section-ink" id="path">
        <div className="wrap">
          <div className="section-head"><h2>Our adoption path</h2></div>
          <Reveal><AdoptionPathArt /></Reveal>
          <ol className="steps">
            {STAGES.map((s) => <li key={s.title}><h3>{s.title}</h3><p>{s.text}</p></li>)}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <Reveal className="section-head">
            <h2>Where teams start</h2>
            <p className="muted">Use cases we deliver most often.</p>
          </Reveal>
          <div className="service-list">
            {USE_CASES.map((u, i) => (
              <Reveal as="article" key={u.title} delay={(i % 3) * 110}>
                <IconTile name={u.icon} tone="amber" />
                <h3>{u.title}</h3>
                <p>{u.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="wrap">
          <h2>Ask about our six-week AI readiness assessment.</h2>
          <Link className="btn" to="/contact?interest=AI%20adoption#book" data-track="assessment:ai-band">Request an assessment</Link>
        </div>
      </section>
    </>
  );
}
