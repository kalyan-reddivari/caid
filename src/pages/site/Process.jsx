import { useState } from 'react';
import { Link } from 'react-router-dom';
import api, { errorMessage } from '../../api/client.js';
import { IconTile } from '../../components/Icons.jsx';
import { JourneyArt, PlanGantt } from '../../components/ProcessGraphics.jsx';
import Reveal from '../../components/Reveal.jsx';

const STAGES = [
  {
    name: 'First conversation',
    when: 'Day 1',
    cost: 'Free',
    summary: 'A 30-minute call with a senior consultant to understand the problem, the people affected and what success looks like.',
    you: ['Describe the business problem and goals', 'Share any constraints: deadline, budget, compliance'],
    we: ['Ask questions, not pitch', 'Sign an NDA if you need one', 'Tell you honestly if we are not the right fit'],
    get: ['A short summary of what we heard', 'A recommended next step'],
    decision: 'Is this worth exploring together?',
  },
  {
    name: 'Discovery',
    when: '1–2 weeks',
    cost: 'Small fixed fee',
    summary: 'Workshops with your stakeholders to map processes, systems and data. AI drafts the requirements live, so you see them take shape.',
    you: ['Make key people available for 2–3 workshops', 'Give read access to relevant documents and systems'],
    we: ['Run the workshops and system walkthroughs', 'Draft requirements and acceptance criteria', 'Identify risks, integrations and quick wins'],
    get: ['Requirements spec you can keep', 'Solution outline and architecture', 'Prioritised list of features'],
    decision: 'Do we agree on what the first release must do?',
  },
  {
    name: 'Proposal',
    when: 'Within 1 week',
    cost: 'Free',
    summary: 'A clear written proposal based on the agreed spec: scope, team, timeline, price and the risks we see.',
    you: ['Review the scope with your stakeholders', 'Choose an engagement model'],
    we: ['Estimate from the spec, task by task', 'Offer options: smaller first release, phased plan', 'Walk your team through the numbers'],
    get: ['Fixed or capped price options', 'Delivery plan and milestones', 'Named team and roles'],
    decision: 'Go, adjust the scope, or stop. You keep the discovery outputs either way.',
  },
  {
    name: 'Agreement and kickoff',
    when: '1 week',
    cost: 'Part of the project',
    summary: 'We sign the statement of work, set up access and tools, and hold a kickoff with everyone who will be involved.',
    you: ['Sign the agreement', 'Name a product owner who can make decisions', 'Arrange system and environment access'],
    we: ['Introduce your delivery lead and team', 'Set up repositories, environments and the project dashboard', 'Agree the demo and reporting rhythm'],
    get: ['Signed SOW with IP owned by you', 'Project dashboard access', 'Calendar of demos and steering meetings'],
    decision: 'Is everyone and everything ready to start building?',
  },
  {
    name: 'Delivery',
    when: 'Weeks to months',
    cost: 'Billed by milestone or month',
    summary: 'We build in short cycles and show you working software every week. Our AI-driven process keeps each cycle fast; our engineers keep it correct.',
    you: ['Attend a 30-minute demo each week', 'Give feedback and approve changes', 'Join a monthly steering review'],
    we: ['Build, test and review every change', 'Report progress, budget and risks weekly', 'Handle change requests transparently'],
    get: ['Working software every week', 'Weekly status report', 'Change log with cost impact before work starts'],
    decision: 'Each demo: accept the work, or ask for changes.',
  },
  {
    name: 'Acceptance and launch',
    when: '1–3 weeks',
    cost: 'Part of the project',
    summary: 'Your users test against the agreed acceptance criteria. We fix what they find, train them, and go live with a rollback plan ready.',
    you: ['Run user acceptance testing', 'Sign off each acceptance criterion', 'Approve the go-live date'],
    we: ['Fix defects quickly', 'Train users and administrators', 'Plan and run the launch'],
    get: ['Signed acceptance report', 'Training sessions and guides', 'Live system with monitoring'],
    decision: 'Formal sign-off and go-live approval.',
  },
  {
    name: 'Handover and support',
    when: 'Ongoing',
    cost: 'Optional support plan',
    summary: 'A period of hypercare after launch, then either a full handover to your team or an ongoing support and improvement plan.',
    you: ['Choose: take it in-house, or keep us on', 'Prioritise the next improvements'],
    we: ['Fix any launch defects at no charge during the warranty period', 'Hand over code, specs and runbooks', 'Offer support with agreed response times'],
    get: ['All source code, specs and documentation', 'Knowledge-transfer sessions', 'Support plan with response times'],
    decision: 'What should the next release be?',
  },
];

const MODELS = [
  {
    icon: 'target', name: 'Fixed scope',
    best: 'A well-defined first release or a project with a fixed budget.',
    price: 'Fixed price agreed from the discovery spec, paid by milestone.',
    control: 'Changes go through a simple change request with a price before work starts.',
  },
  {
    icon: 'users', name: 'Dedicated team', featured: true,
    best: 'Products that will keep evolving, or scope that is still being discovered.',
    price: 'Monthly fee for a named team. Scale up or down with 30 days’ notice.',
    control: 'You set priorities every week; the team works your backlog.',
  },
  {
    icon: 'shield', name: 'Support and evolve',
    best: 'Systems already live, built by us or by someone else.',
    price: 'Monthly plan with a set number of hours and agreed response times.',
    control: 'Monthly review of tickets, improvements and system health.',
  },
];

const GOVERNANCE = [
  { icon: 'send', title: 'Weekly demo', text: 'Working software every week, not slide decks. You see exactly where the project stands.' },
  { icon: 'trend', title: 'Live project dashboard', text: 'Progress, budget used, open risks and decisions, available to your team at any time.' },
  { icon: 'chat', title: 'One accountable lead', text: 'A named delivery lead who is your single point of contact from kickoff to handover.' },
  { icon: 'loop', title: 'Clear change control', text: 'New ideas are welcome. Each one is written up with its cost and timing impact before you approve it.' },
  { icon: 'users', title: 'Monthly steering', text: 'Your sponsors and our leadership review outcomes, risks and priorities together.' },
  { icon: 'lock', title: 'Your IP, your data', text: 'You own all code and documents. NDAs, data protection and security reviews come as standard.' },
];

const PREPARE = [
  'The business problem, in your own words',
  'Who will use the system and how many people',
  'Systems it must connect to (ERP, CRM, HR…)',
  'Any deadline that matters, and why',
  'A rough budget range, even if uncertain',
  'Who will make decisions on your side',
];

const FAQ = [
  { q: 'How quickly can you start?', a: 'Usually within two weeks of the first conversation for discovery, and one to two weeks after the agreement for delivery. We tell you up front if a specific skill needs longer to staff.' },
  { q: 'Who owns the code and the designs?', a: 'You do, outright, once invoices are paid. That includes source code, specifications, designs and documentation. There is no lock-in.' },
  { q: 'What if our requirements change during the project?', a: 'They usually do, and that is fine. Every change is written into the spec with its cost and timing impact, and nothing changes until you approve it.' },
  { q: 'How do you use AI on our project, and is our data safe?', a: 'Our teams use approved enterprise AI tools that do not train on your data, and a person reviews every change. For sensitive work we can run AI tools inside your own cloud account. See How we build for details.' },
  { q: 'Can our own developers work alongside your team?', a: 'Yes. Many clients embed their engineers in our team, which also makes the handover smoother.' },
  { q: 'What if discovery shows the project is not worth doing?', a: 'Then we tell you. You keep the discovery outputs, and you are under no obligation to continue.' },
];

const BRIEF = {
  name: '', email: '', company: '', type: 'New application', stage: 'Just an idea',
  timeline: 'In 1–3 months', budget: 'Not sure yet', systems: '', goals: '',
};
const TYPES = ['New application', 'Modernise an existing system', 'Systems integration', 'AI feature or assistant', 'Mobile app', 'Rescue a struggling project', 'Other'];
const STAGE_OPTS = ['Just an idea', 'Requirements written', 'Designs ready', 'Existing system in use'];
const TIMELINES = ['As soon as possible', 'In 1–3 months', 'In 3–6 months', 'Later this year', 'Exploring for now'];
const BUDGETS = ['Under $50k', '$50k–$150k', '$150k–$500k', 'Over $500k', 'Not sure yet'];

function ProjectBrief() {
  const [form, setForm] = useState(BRIEF);
  const [state, setState] = useState({ sending: false, error: '', done: false });
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  // The brief is sent through the normal contact endpoint, so it lands in the portal's Inquiries list.
  const submit = async (e) => {
    e.preventDefault();
    setState({ sending: true, error: '', done: false });
    const lines = [
      `Project type: ${form.type}`,
      `Current stage: ${form.stage}`,
      `Timeline: ${form.timeline}`,
      `Budget range: ${form.budget}`,
    ];
    if (form.systems.trim()) lines.push(`Systems to connect: ${form.systems.trim()}`);
    const message = [...lines, '', 'Goals:', form.goals.trim()].join('\n');
    try {
      await api.post('/public/contact', {
        name: form.name, email: form.email, company: form.company, interest: 'New project brief', message,
      });
      setState({ sending: false, error: '', done: true });
    } catch (err) {
      setState({ sending: false, error: errorMessage(err), done: false });
    }
  };

  if (state.done) {
    return (
      <div className="brief-done">
        <IconTile name="check" />
        <h3>Thank you. Your brief is with us.</h3>
        <ol className="next-list">
          <li><b>Within 1 business day</b> a senior consultant replies to {form.email}.</li>
          <li><b>Within a week</b> we hold the free first conversation.</li>
          <li><b>Then</b> we suggest a discovery plan, or tell you honestly if we are not the right fit.</li>
        </ol>
      </div>
    );
  }

  return (
    <form className="form-grid" onSubmit={submit}>
      {state.error && <div className="alert alert-error full">{state.error}</div>}
      <label className="field"><span>Name *</span><input required value={form.name} onChange={set('name')} /></label>
      <label className="field"><span>Work email *</span><input type="email" required value={form.email} onChange={set('email')} /></label>
      <label className="field"><span>Company</span><input value={form.company} onChange={set('company')} /></label>
      <label className="field"><span>What do you need?</span>
        <select value={form.type} onChange={set('type')}>{TYPES.map((o) => <option key={o}>{o}</option>)}</select>
      </label>
      <label className="field"><span>Where are you today?</span>
        <select value={form.stage} onChange={set('stage')}>{STAGE_OPTS.map((o) => <option key={o}>{o}</option>)}</select>
      </label>
      <label className="field"><span>When do you want to start?</span>
        <select value={form.timeline} onChange={set('timeline')}>{TIMELINES.map((o) => <option key={o}>{o}</option>)}</select>
      </label>
      <label className="field"><span>Budget range</span>
        <select value={form.budget} onChange={set('budget')}>{BUDGETS.map((o) => <option key={o}>{o}</option>)}</select>
      </label>
      <label className="field"><span>Systems it should connect to</span>
        <input placeholder="e.g. SAP, Salesforce, Workday" value={form.systems} onChange={set('systems')} maxLength={300} />
      </label>
      <label className="field full"><span>What problem should it solve? *</span>
        <textarea required maxLength={3000} value={form.goals} onChange={set('goals')}
          placeholder="Who has the problem today, what it costs you, and what success would look like." />
      </label>
      <div className="full brief-foot">
        <button className="btn btn-primary" disabled={state.sending}>{state.sending ? 'Sending…' : 'Send project brief'}</button>
        <span className="small muted">No obligation. We reply within one business day.</span>
      </div>
    </form>
  );
}

export default function Process() {
  const [active, setActive] = useState(0);
  const s = STAGES[active];

  return (
    <>
      <section className="page-hero has-art">
        <div className="wrap">
          <div>
            <span className="eyebrow">Our process</span>
            <h1>From first conversation to live software</h1>
            <p>
              What working with CAID looks like in business terms: what happens at each stage, what you decide,
              what you receive, and what it costs to get started.
            </p>
            <div className="hero-actions">
              <a className="btn btn-primary" href="#brief">Start a project brief</a>
              <a className="btn btn-ghost" href="#stages">See the seven stages</a>
            </div>
          </div>
          <div className="hero-art"><JourneyArt /></div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="wrap">
          <Reveal as="dl" className="facts four">
            <div><dt>1 day</dt><dd>to a reply from a senior consultant, not a salesperson</dd></div>
            <div><dt>2 weeks</dt><dd>typical discovery before you see a fixed proposal</dd></div>
            <div><dt>Weekly</dt><dd>demos of working software throughout delivery</dd></div>
            <div><dt>100%</dt><dd>of code, specs and documents owned by you</dd></div>
          </Reveal>
        </div>
      </section>

      <section className="section" id="stages">
        <div className="wrap">
          <Reveal className="section-head">
            <div>
              <h2>The seven stages of a project</h2>
              <p className="muted">Each stage ends with a clear decision that is yours to make. Select a stage to see the detail.</p>
            </div>
          </Reveal>

          <Reveal className="stage-rail" role="tablist" aria-label="Project stages">
            {STAGES.map((st, i) => (
              <button key={st.name} role="tab" aria-selected={active === i}
                className={`${active === i ? 'active' : ''}${i < active ? ' past' : ''}`} onClick={() => setActive(i)}>
                <span className="stage-dot">{i + 1}</span>
                <span className="stage-name">{st.name}</span>
                <span className="stage-when">{st.when}</span>
              </button>
            ))}
          </Reveal>

          <div className="stage-panel" key={s.name} role="tabpanel">
            <div className="stage-intro">
              <div className="chips">
                <span className="pill info">{s.when}</span>
                <span className="pill good">{s.cost}</span>
              </div>
              <h3>{active + 1}. {s.name}</h3>
              <p>{s.summary}</p>
              <div className="decision">
                <span>Your decision</span>
                <b>{s.decision}</b>
              </div>
            </div>
            <div className="stage-cols">
              <div><h4>You</h4><ul>{s.you.map((x) => <li key={x}>{x}</li>)}</ul></div>
              <div><h4>We</h4><ul>{s.we.map((x) => <li key={x}>{x}</li>)}</ul></div>
              <div className="gets"><h4>You receive</h4><ul>{s.get.map((x) => <li key={x}>{x}</li>)}</ul></div>
            </div>
            <div className="stage-nav">
              <button type="button" className="btn btn-ghost btn-sm" disabled={active === 0} onClick={() => setActive(active - 1)}>← Previous</button>
              <span className="small muted">Stage {active + 1} of {STAGES.length}</span>
              <button type="button" className="btn btn-ink btn-sm" disabled={active === STAGES.length - 1} onClick={() => setActive(active + 1)}>Next →</button>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="wrap">
          <Reveal className="section-head">
            <div>
              <h2>What a typical first release looks like</h2>
              <p className="muted">An example plan for a first release of about twelve weeks. Your plan is set during discovery.</p>
            </div>
          </Reveal>
          <Reveal><PlanGantt /></Reveal>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <Reveal className="section-head">
            <div>
              <h2>Ways to work with us</h2>
              <p className="muted">Pick the model that fits your budget process and how settled the scope is. You can switch later.</p>
            </div>
          </Reveal>
          <div className="models">
            {MODELS.map((m, i) => (
              <Reveal as="article" key={m.name} className={`model${m.featured ? ' featured' : ''}`} delay={i * 110}>
                {m.featured && <span className="model-flag">Most common</span>}
                <IconTile name={m.icon} tone={m.featured ? 'ink' : 'teal'} />
                <h3>{m.name}</h3>
                <dl>
                  <dt>Best for</dt><dd>{m.best}</dd>
                  <dt>How pricing works</dt><dd>{m.price}</dd>
                  <dt>How you stay in control</dt><dd>{m.control}</dd>
                </dl>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-ink">
        <div className="wrap">
          <Reveal className="section-head">
            <div>
              <h2>You always know where your project stands</h2>
              <p className="muted">Governance built into every engagement, whatever its size.</p>
            </div>
          </Reveal>
          <div className="gov-grid">
            {GOVERNANCE.map((g, i) => (
              <Reveal as="article" key={g.title} delay={(i % 3) * 110}>
                <IconTile name={g.icon} tone="ink" />
                <h3>{g.title}</h3>
                <p>{g.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="brief">
        <div className="wrap split">
          <Reveal>
            <h2>Start with a project brief</h2>
            <p className="muted">
              Five minutes now saves a week later. Tell us what you can; rough answers are fine, and we will
              fill the gaps together in the first conversation.
            </p>
            <h3 className="prep-title">Helpful to have ready</h3>
            <ul className="prep-list">
              {PREPARE.map((p) => <li key={p}>{p}</li>)}
            </ul>
          </Reveal>
          <Reveal className="panel" delay={120}><ProjectBrief /></Reveal>
        </div>
      </section>

      <section className="section section-alt">
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
          <h2>Ready when you are. The first conversation is free.</h2>
          <a className="btn" href="#brief">Start a project brief</a>
        </div>
      </section>
    </>
  );
}
