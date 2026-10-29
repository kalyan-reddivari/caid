import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AIDLCLoopArt, SDD_SESSION, SessionPlayer, SpecCard, SpecFlowArt } from '../../components/AIGraphics.jsx';
import { IconTile } from '../../components/Icons.jsx';
import MediaClip from '../../components/MediaClip.jsx';
import Reveal from '../../components/Reveal.jsx';
import MEDIA from '../../media.js';
import DotTerrain from '../../components/fx/DotTerrain.jsx';

const PHASES = [
  {
    name: 'Inception',
    tagline: 'Decide what to build, together, in days instead of weeks.',
    ritual: 'Mob elaboration',
    ritualText: 'Client stakeholders, a business analyst and a tech lead work in one room while AI drafts stories, flags gaps and proposes the units of work.',
    ai: ['Drafts user stories and acceptance criteria', 'Finds gaps, conflicts and open questions', 'Proposes how to split the work into bolts'],
    human: ['Confirms the business intent', 'Answers open questions', 'Approves the spec and the priorities'],
    artifacts: ['requirements.md', 'Risk and NFR list', 'Bolt plan'],
  },
  {
    name: 'Construction',
    tagline: 'Short build cycles ("bolts") measured in hours or days.',
    ritual: 'Mob construction',
    ritualText: 'Engineers steer AI agents task by task. Each task is traced to an acceptance criterion, and nothing merges without a human review.',
    ai: ['Proposes the design, data model and APIs', 'Writes code and tests one task at a time', 'Explains every change it makes'],
    human: ['Approves architecture decisions', 'Reviews every diff before merge', 'Owns security and quality calls'],
    artifacts: ['design.md', 'tasks.md', 'Code, tests and ADRs'],
  },
  {
    name: 'Operations',
    tagline: 'Ship, watch and feed what we learn back into the spec.',
    ritual: 'Ops review',
    ritualText: 'Weekly review of incidents, costs and AI quality scores. Findings become new acceptance criteria, so the spec keeps up with reality.',
    ai: ['Generates infrastructure as code and runbooks', 'Summarises logs, incidents and anomalies', 'Runs evaluations on AI features'],
    human: ['Approves releases to production', 'Decides on incidents and rollbacks', 'Reviews cost and quality trends'],
    artifacts: ['IaC + pipelines', 'Runbooks', 'Eval and cost dashboards'],
  },
];

const SDD_POINTS = [
  { icon: 'doc', title: 'The spec is the source of truth', text: 'Requirements, design and tasks live in the repository next to the code, versioned and reviewed like code.' },
  { icon: 'target', title: 'Testable by construction', text: 'Acceptance criteria are written in WHEN / THE SYSTEM SHALL form, so each one turns directly into tests.' },
  { icon: 'link', title: 'Traceable end to end', text: 'Every task, commit and test points back to a requirement. You can ask "why does this code exist?" and get an answer.' },
  { icon: 'loop', title: 'Change the spec, not just the code', text: 'New requests start as spec changes. Agents regenerate the plan, and reviewers see exactly what moved.' },
];

const PROCESS = [
  { title: 'Intake and intent', ai: 'Summarises your documents, systems and tickets', human: 'Agree goals, budget and success measures', gate: 'Engagement approved' },
  { title: 'Specify', ai: 'Drafts requirements and acceptance criteria', human: 'Product owner answers questions and signs off', gate: 'Spec approved' },
  { title: 'Plan', ai: 'Proposes design, tasks and estimates', human: 'Tech lead reviews architecture and risk', gate: 'Plan approved' },
  { title: 'Build in bolts', ai: 'Agents code and test one task at a time', human: 'Engineers steer, pair and review each diff', gate: 'Code reviewed' },
  { title: 'Verify', ai: 'Generates tests, runs scans and evaluations', human: 'QA explores edge cases and accessibility', gate: 'Quality gate passed' },
  { title: 'Release and operate', ai: 'Writes release notes, runbooks and alerts', human: 'Client demo and production approval', gate: 'Release approved' },
  { title: 'Learn', ai: 'Clusters feedback, incidents and usage', human: 'Retro decides what changes in the spec', gate: 'Next bolt planned' },
];

const GUARDRAILS = [
  { icon: 'users', title: 'Human in the loop', text: 'AI proposes, people decide. Every spec, plan, merge and release has a named human approver.' },
  { icon: 'lock', title: 'Your data stays yours', text: 'Enterprise AI tools with no training on client data. Sensitive work runs inside your own cloud tenancy.' },
  { icon: 'shield', title: 'Approved tools only', text: 'A reviewed list of models and assistants per client, with logging and access controls.' },
  { icon: 'flask', title: 'Evaluated, not assumed', text: 'AI features ship with evaluation sets, quality thresholds and monitoring in production.' },
  { icon: 'code', title: 'Clean, owned code', text: 'Security, dependency and licence scans on every change. You own all code and specs outright.' },
  { icon: 'layers', title: 'Fully documented', text: 'Specs, decisions and runbooks are part of the delivery, so your team can carry it forward.' },
];

const TOOLCHAIN = ['Claude Code', 'GitHub Copilot', 'Amazon Q Developer', 'Kiro', 'Cursor', 'Spec Kit', 'MCP servers', 'LangGraph', 'Bedrock', 'Azure OpenAI', 'Playwright', 'SonarQube'];

export default function AIEngineering() {
  const [phase, setPhase] = useState(0);
  const p = PHASES[phase];

  return (
    <>
      <section className="page-hero has-art">
        <DotTerrain />
        <div className="wrap">
          <div>
            <span className="eyebrow">How we build</span>
            <h1>AI-native software delivery</h1>
            <p>
              We take your project in-house and deliver it with an AI-driven development lifecycle:
              specs first, AI agents doing the heavy lifting, and experienced engineers approving every step.
            </p>
            <div className="hero-actions">
              <a className="btn btn-primary" href="#aidlc">See the lifecycle</a>
              <a className="btn btn-ghost" href="#demo">Watch a session</a>
            </div>
          </div>
          <div className="hero-art"><AIDLCLoopArt /></div>
        </div>
      </section>

      <section className="section" id="aidlc">
        <div className="wrap">
          <Reveal className="section-head">
            <div>
              <h2>The AI-driven development lifecycle (AIDLC)</h2>
              <p className="muted">
                AI is not a tool bolted onto the old process. It takes part in every phase, while people keep the decisions.
              </p>
            </div>
          </Reveal>

          <Reveal className="phase-tabs" role="tablist" aria-label="AIDLC phases">
            {PHASES.map((ph, i) => (
              <button key={ph.name} role="tab" aria-selected={phase === i} className={phase === i ? 'active' : ''} onClick={() => setPhase(i)}>
                <b>{String(i + 1).padStart(2, '0')}</b>{ph.name}
              </button>
            ))}
          </Reveal>

          <div className="phase-panel" key={p.name} role="tabpanel">
            <div className="phase-intro">
              <h3>{p.name}</h3>
              <p className="lead">{p.tagline}</p>
              <div className="ritual">
                <span className="pill warn">{p.ritual}</span>
                <p>{p.ritualText}</p>
              </div>
              <div className="chips">{p.artifacts.map((a) => <span className="chip mono" key={a}>{a}</span>)}</div>
            </div>
            <div className="duo">
              <div className="duo-col ai">
                <h4><span className="ai-mark">{'{'}<b>Ai</b>{'}'}</span> does</h4>
                <ul>{p.ai.map((x) => <li key={x}>{x}</li>)}</ul>
              </div>
              <div className="duo-col human">
                <h4>People decide</h4>
                <ul>{p.human.map((x) => <li key={x}>{x}</li>)}</ul>
              </div>
            </div>
          </div>

          <Reveal as="dl" className="facts four" delay={100}>
            <div><dt>Bolts</dt><dd>build cycles of hours or days, replacing two-week sprints</dd></div>
            <div><dt>Mobs</dt><dd>decisions made live with the client, not over weeks of email</dd></div>
            <div><dt>Gates</dt><dd>a named person approves every spec, plan, merge and release</dd></div>
            <div><dt>Context</dt><dd>specs and decisions stored so agents and people share one memory</dd></div>
          </Reveal>
        </div>
      </section>

      <section className="section section-ink">
        <div className="wrap">
          <Reveal className="section-head">
            <div>
              <h2>Spec-driven development</h2>
              <p className="muted">We write down what the software must do before anyone, human or AI, writes code.</p>
            </div>
          </Reveal>
          <Reveal><SpecFlowArt /></Reveal>
        </div>
      </section>

      <section className="section">
        <div className="wrap split">
          <div>
            <Reveal>
              <h2>Three files that steer the work</h2>
              <p className="muted">
                Each feature gets a requirements file, a design file and a task list. AI drafts them,
                your team approves them, and agents build against them. Try the tabs.
              </p>
            </Reveal>
            <div className="point-list">
              {SDD_POINTS.map((s, i) => (
                <Reveal key={s.title} className="point" delay={i * 90}>
                  <IconTile name={s.icon} tone={i % 2 ? 'amber' : 'teal'} />
                  <div>
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal delay={120} className="sticky-col"><SpecCard /></Reveal>
        </div>
      </section>

      <section className="section section-alt" id="demo">
        <div className="wrap">
          <Reveal className="section-head">
            <div>
              <h2>Watch a feature go from spec to staging</h2>
              <p className="muted">A 26-second replay of how a bolt runs. Pause it, or jump between chapters.</p>
            </div>
          </Reveal>
          <Reveal>
            <MediaClip {...MEDIA.deliveryDemo} fallback={<SessionPlayer script={SDD_SESSION} title="bolt-14 · invoice-approval" />} />
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <Reveal className="section-head">
            <div>
              <h2>Our AI delivery process</h2>
              <p className="muted">Seven steps. AI accelerates each one; a person signs off before the next begins.</p>
            </div>
          </Reveal>
          <ol className="process">
            {PROCESS.map((s, i) => (
              <Reveal as="li" key={s.title} delay={(i % 4) * 80}>
                <span className="pnum">{i + 1}</span>
                <h3>{s.title}</h3>
                <p><span className="who ai">AI</span>{s.ai}</p>
                <p><span className="who human">Team</span>{s.human}</p>
                <span className="gate">{s.gate}</span>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section-alt">
        <div className="wrap">
          <Reveal className="section-head">
            <h2>Guardrails we never skip</h2>
            <p className="muted">Speed only counts if the result is safe, correct and yours.</p>
          </Reveal>
          <div className="service-list">
            {GUARDRAILS.map((g, i) => (
              <Reveal as="article" key={g.title} delay={(i % 3) * 110}>
                <IconTile name={g.icon} tone={i % 2 ? 'amber' : 'teal'} />
                <h3>{g.title}</h3>
                <p>{g.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <Reveal className="section-head">
            <h2>Tools our teams are fluent in</h2>
            <p className="muted">We pick per client, within your security and licensing rules.</p>
          </Reveal>
          <Reveal className="chips big">{TOOLCHAIN.map((t) => <span className="chip" key={t}>{t}</span>)}</Reveal>
        </div>
      </section>

      <section className="cta-band">
        <div className="wrap">
          <h2>Bring us a project. We will show you its spec in the first week.</h2>
          <Link className="btn" to="/contact?interest=AI-native%20delivery">Start a project</Link>
        </div>
      </section>
    </>
  );
}
