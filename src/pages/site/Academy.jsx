import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ACADEMY_SESSION, AcademyArt, LEVELS, LevelBadge, SessionPlayer } from '../../components/AIGraphics.jsx';
import { IconTile } from '../../components/Icons.jsx';
import MediaClip from '../../components/MediaClip.jsx';
import Reveal from '../../components/Reveal.jsx';
import MEDIA from '../../media.js';

const LEVEL_INFO = [
  { who: 'Everyone, first 30 days', text: 'How AI models work, where they fail, and our responsible-use policy. Safe prompting with approved tools.', proof: 'Policy quiz + 3 guided labs' },
  { who: 'Every delivery role', text: 'Daily work with AI assistants: writing specs, reviewing AI output, and spec-driven development on sandbox projects.', proof: '9 labs + one sandbox feature' },
  { who: 'Engineers and specialists', text: 'Building AI into products: RAG, agents, tool use with MCP, evaluations, cost and security controls.', proof: 'Capstone reviewed by a panel' },
  { who: 'Leads and mentors', text: 'Run mob sessions, coach others, improve our playbooks and assess AI risk on client engagements.', proof: 'Lead 2 client bolts + mentor 3 people' },
];

const TRACKS = [
  {
    role: 'Engineers', icon: 'code',
    modules: ['Pairing with coding agents', 'Spec-driven development in practice', 'Reviewing AI-written code', 'Test generation from acceptance criteria', 'Building RAG and agent features', 'MCP servers and tool use'],
  },
  {
    role: 'QA and test', icon: 'check',
    modules: ['Criteria-to-test traceability', 'AI-assisted exploratory testing', 'Evaluating LLM features', 'Test data generation without real PII', 'Visual and accessibility checks'],
  },
  {
    role: 'Business analysts', icon: 'doc',
    modules: ['Running mob elaboration', 'Writing EARS acceptance criteria', 'Turning interviews into specs with AI', 'Spotting gaps and conflicts', 'Prioritising bolts with clients'],
  },
  {
    role: 'Cloud and DevOps', icon: 'cloud',
    modules: ['Infrastructure as code with AI', 'AI in CI/CD pipelines', 'Runbooks and incident summaries', 'Model hosting and cost control', 'Securing AI workloads'],
  },
  {
    role: 'Data and ML', icon: 'trend',
    modules: ['Retrieval and vector search design', 'Fine-tuning versus prompting', 'Evaluation sets and LLM judges', 'MLOps and monitoring drift', 'Data governance for AI'],
  },
  {
    role: 'Delivery leads', icon: 'users',
    modules: ['Estimating AI-native projects', 'AI risk and compliance reviews', 'Explaining AI to client executives', 'Measuring AI productivity honestly', 'Coaching mixed-skill teams'],
  },
];

const FIRST_90 = [
  { when: 'Week 1', title: 'Foundations', text: 'How models work, our policy, approved tools, and your first guided lab.' },
  { when: 'Weeks 2–4', title: 'Daily practice', text: 'Prompting, reviewing AI output and writing specs in your role track.' },
  { when: 'Weeks 5–8', title: 'Sandbox project', text: 'A full feature on an internal project using the AIDLC, from spec to deploy.' },
  { when: 'Weeks 9–12', title: 'Shadow a client bolt', text: 'Join a live team with a mentor, then sit your L2 Practitioner review.' },
];

const RHYTHM = [
  { icon: 'chat', title: 'Weekly prompt clinic', text: 'Bring a real problem, solve it together and add the best patterns to the playbook.' },
  { icon: 'flask', title: 'Friday lab hours', text: 'Protected time every week to try new models and tools on sandbox projects.' },
  { icon: 'send', title: 'Monthly demo day', text: 'Teams show what AI changed in their work, including what did not work.' },
  { icon: 'bulb', title: 'Quarterly hack week', text: 'Build internal tools and accelerators that later speed up client delivery.' },
  { icon: 'book', title: 'Living playbooks', text: 'Prompt libraries, spec templates and review checklists kept current by champions.' },
  { icon: 'grad', title: 'Certification support', text: 'Paid exam fees and study time for cloud AI certifications from the major providers.' },
];

export default function Academy() {
  const [track, setTrack] = useState(0);
  const t = TRACKS[track];

  return (
    <>
      <section className="page-hero has-art">
        <div className="wrap">
          <div>
            <span className="eyebrow">CAID AI Academy</span>
            <h1>Every person at CAID is trained to work with AI</h1>
            <p>
              Not only engineers. Analysts, testers, designers and delivery leads all follow a four-level
              path, so the whole team on your project speaks the same AI-native language.
            </p>
            <div className="hero-actions">
              <a className="btn btn-primary" href="#levels">See the levels</a>
              <Link className="btn btn-ghost" to="/careers">Join us</Link>
            </div>
          </div>
          <div className="hero-art"><AcademyArt /></div>
        </div>
      </section>

      <section className="section" id="levels">
        <div className="wrap">
          <Reveal className="section-head">
            <h2>Four levels, earned by doing</h2>
            <p className="muted">Each level is unlocked by practical work that a mentor reviews, not by watching videos.</p>
          </Reveal>
          <div className="levels">
            {LEVEL_INFO.map((l, i) => (
              <Reveal as="article" key={LEVELS[i]} className="level" delay={i * 110}>
                <LevelBadge level={i + 1} />
                <h3>{LEVELS[i]}</h3>
                <span className="small muted">{l.who}</span>
                <p>{l.text}</p>
                <span className="proof">{l.proof}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="wrap">
          <Reveal className="section-head">
            <div>
              <h2>Role tracks</h2>
              <p className="muted">After Foundations, everyone follows the track for their role.</p>
            </div>
          </Reveal>
          <div className="track-layout">
            <div className="track-list" role="tablist" aria-label="Role tracks">
              {TRACKS.map((tr, i) => (
                <button key={tr.role} role="tab" aria-selected={track === i} className={track === i ? 'active' : ''} onClick={() => setTrack(i)}>
                  {tr.role}
                </button>
              ))}
            </div>
            <div className="track-panel" key={t.role} role="tabpanel">
              <div className="track-panel-head">
                <IconTile name={t.icon} tone="amber" />
                <h3>{t.role} track</h3>
              </div>
              <ol className="modules">
                {t.modules.map((m, i) => <li key={m} style={{ '--i': i }}>{m}</li>)}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-ink">
        <div className="wrap">
          <Reveal className="section-head">
            <div>
              <h2>The first 90 days</h2>
              <p className="muted">From day one to working on a client project with AI.</p>
            </div>
          </Reveal>
          <ol className="steps">
            {FIRST_90.map((s) => (
              <li key={s.title}>
                <span className="when">{s.when}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <Reveal className="section-head">
            <div>
              <h2>Inside a lab</h2>
              <p className="muted">Trainees practise spec-driven development on sandbox projects, with a coach and an AI pair.</p>
            </div>
          </Reveal>
          <Reveal>
            <MediaClip {...MEDIA.academyLab} fallback={<SessionPlayer script={ACADEMY_SESSION} title="academy · lab 07" />} />
          </Reveal>
        </div>
      </section>

      <section className="section section-alt">
        <div className="wrap">
          <Reveal className="section-head">
            <h2>Learning never stops</h2>
            <p className="muted">AI tools change every month, so practice is part of the working week.</p>
          </Reveal>
          <div className="service-list">
            {RHYTHM.map((r, i) => (
              <Reveal as="article" key={r.title} delay={(i % 3) * 110}>
                <IconTile name={r.icon} tone={i % 2 ? 'amber' : 'teal'} />
                <h3>{r.title}</h3>
                <p>{r.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="wrap">
          <h2>Want to grow into an AI-native engineer? We train you on the job.</h2>
          <Link className="btn" to="/careers">See open roles</Link>
        </div>
      </section>
    </>
  );
}
