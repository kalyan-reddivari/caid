// Animated illustrations and media for the AI engineering and AI Academy pages.
// Same approach as Graphics.jsx: inline SVG + CSS motion, colours from the CSS variables,
// and everything settles into a finished picture when the visitor prefers reduced motion.

import { useEffect, useRef, useState } from 'react';
import { Rotate, Wire, usePrefersReducedMotion } from './Graphics.jsx';

const FONT = { fontFamily: 'var(--font-body)' };
const DISPLAY = { fontFamily: 'var(--font-display)' };
const MONO = { fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace' };

// A small "person + tick" marker for human approval gates.
function Gate({ x, y, delay = 0, r = 13, ring = true }) {
  return (
    <g>
      {ring && <circle className="ring" cx={x} cy={y} r={r} fill="none" stroke="var(--teal)" strokeWidth="2" style={{ '--d': `${delay}s` }} />}
      <rect x={x - r} y={y - r} width={r * 2} height={r * 2} rx="4" fill="var(--teal)" transform={`rotate(45 ${x} ${y})`} />
      <path d={`M${x - 5} ${y} l3.5 3.5 l6.5 -7`} fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
}

/* -------------------------------------------------------------------------
   AIDLC: inception -> construction -> operations around a living spec
   ------------------------------------------------------------------------- */
export function AIDLCLoopArt() {
  const cx = 260;
  const cy = 200;
  const R = 140;
  const at = (deg) => [cx + R * Math.cos((deg * Math.PI) / 180), cy + R * Math.sin((deg * Math.PI) / 180)];
  const loop = `M${cx} ${cy - R} A${R} ${R} 0 1 1 ${cx} ${cy + R} A${R} ${R} 0 1 1 ${cx} ${cy - R}`;
  const phases = [
    { deg: -90, name: 'Inception', fill: 'var(--ink)', color: '#fff' },
    { deg: 30, name: 'Construction', fill: 'var(--amber)', color: 'var(--ink)' },
    { deg: 150, name: 'Operations', fill: 'var(--teal)', color: '#fff' },
  ];
  const gates = [-30, 90, 210];
  return (
    <svg className="art" viewBox="0 0 520 400" role="img"
      aria-label="The AI-driven development lifecycle: inception, construction and operations circling a living specification, with a human approval gate between each phase">
      <circle className="anim-breathe svg-box" cx={cx} cy={cy} r="165" fill="var(--amber-wash)" />
      <path d={loop} fill="none" stroke="var(--line)" strokeWidth="3" />
      <path d={loop} className="packet amber" pathLength="1" fill="none" strokeWidth="5" strokeLinecap="round" style={{ '--dur': '7s' }} />
      <path d={loop} className="packet teal" pathLength="1" fill="none" strokeWidth="5" strokeLinecap="round" style={{ '--dur': '7s', '--d': '3.5s' }} />

      {/* agents orbiting the spec */}
      <circle className="spin svg-box" style={{ '--dur': '36s' }} cx={cx} cy={cy} r="92" fill="none" stroke="var(--teal)" strokeOpacity=".45" strokeDasharray="3 7" />
      <Rotate cx={cx} cy={cy} dur={14}>
        <circle cx={cx + 92} cy={cy} r="7" fill="var(--teal)" />
        <circle cx={cx - 92} cy={cy} r="5" fill="var(--amber)" />
      </Rotate>

      {/* the living spec in the middle */}
      <g className="anim-float" style={{ '--dur': '6s' }}>
        <rect x={cx - 52} y={cy - 62} width="104" height="124" rx="10" fill="var(--surface)" stroke="var(--line)" />
        <rect x={cx - 52} y={cy - 62} width="104" height="24" rx="10" fill="var(--ink)" />
        <rect x={cx - 52} y={cy - 46} width="104" height="8" fill="var(--ink)" />
        <text x={cx} y={cy - 45} textAnchor="middle" fontSize="11.5" fontWeight="600" fill="#fff" style={MONO}>spec.md</text>
        {[64, 48, 72, 40, 58].map((w, i) => (
          <rect key={i} className="grow-x" x={cx - 38} y={cy - 24 + i * 15} width={w} height="7" rx="3.5"
            fill={i === 0 ? 'var(--amber)' : i === 3 ? 'var(--teal)' : 'var(--teal-wash)'} style={{ '--d': `${i * 0.3}s` }} />
        ))}
      </g>

      {gates.map((deg, i) => {
        const [x, y] = at(deg);
        return <Gate key={deg} x={x} y={y} delay={i * 0.8} />;
      })}

      {phases.map((p, i) => {
        const [x, y] = at(p.deg);
        const w = p.name.length * 9 + 34;
        return (
          <g key={p.name} className="anim-float" style={{ '--d': `${i * 0.7}s`, '--dur': '5s' }}>
            <rect x={x - w / 2} y={y - 19} width={w} height="38" rx="19" fill={p.fill} />
            <text x={x} y={y + 5.5} textAnchor="middle" fontSize="15" fontWeight="700" fill={p.color} style={DISPLAY}>{p.name}</text>
          </g>
        );
      })}

      <g transform="translate(150 386)">
        <rect x="-8" y="-8" width="16" height="16" rx="3" fill="var(--teal)" transform="rotate(45)" />
        <text x="16" y="5" fontSize="12.5" fontWeight="600" fill="var(--ink-soft)" style={FONT}>Human approval gate</text>
      </g>
    </svg>
  );
}

/* -------------------------------------------------------------------------
   Spec-driven development: intent -> spec -> plan -> build -> verify, with a feedback loop
   ------------------------------------------------------------------------- */
export function SpecFlowArt() {
  const stations = [
    { name: 'Intent', sub: 'the business goal' },
    { name: 'Spec', sub: 'requirements.md' },
    { name: 'Plan', sub: 'design + tasks' },
    { name: 'Build', sub: 'AI agents code' },
    { name: 'Verify', sub: 'tests + review' },
  ];
  const xs = [100, 300, 500, 700, 900];
  const y = 110;
  return (
    <svg className="art flow-band" viewBox="0 0 1000 250" role="img"
      aria-label="Spec-driven development: intent becomes a specification, then a plan, then AI-built code, then verified software, with what we learn flowing back into the spec">
      {xs.slice(0, -1).map((x, i) => (
        <Wire key={x} d={`M${x + 72} ${y} H${xs[i + 1] - 72}`} delay={i * 0.6} wire="#2c3a5c" tone={i % 2 ? 'amber' : 'bright'} speed={2.4} />
      ))}
      <path d="M900 152 C 900 232, 300 232, 300 152" fill="none" stroke="var(--amber)" strokeOpacity=".7" strokeWidth="2" className="flow" />
      <path d="M900 152 C 900 232, 300 232, 300 152" className="packet amber" pathLength="1" fill="none" strokeWidth="4" strokeLinecap="round" style={{ '--dur': '4.5s', '--d': '1s' }} />
      <rect x="512" y="200" width="176" height="26" rx="13" fill="#1e2d50" stroke="#2c3a5c" />
      <text x="600" y="217.5" textAnchor="middle" fontSize="12.5" fontWeight="600" fill="#f6c879" style={FONT}>learnings refine the spec</text>

      {stations.map((s, i) => (
        <g key={s.name}>
          <rect x={xs[i] - 72} y={y - 40} width="144" height="80" rx="12" fill={i === 1 ? 'var(--amber)' : '#1e2d50'} stroke={i === 1 ? 'var(--amber)' : '#2c3a5c'} />
          <text x={xs[i]} y={y + 2} textAnchor="middle" fontSize="20" fontWeight="800" fill={i === 1 ? 'var(--ink)' : '#fff'} style={DISPLAY}>{s.name}</text>
          <text x={xs[i]} y={y + 23} textAnchor="middle" fontSize="12" fontWeight="500" fill={i === 1 ? 'var(--ink)' : '#aab4c8'} style={i === 1 || i === 2 ? MONO : FONT}>{s.sub}</text>
          <circle cx={xs[i]} cy={y - 40} r="13" fill="var(--ink)" stroke={i === 1 ? 'var(--ink)' : 'var(--amber)'} strokeWidth="2" />
          <text x={xs[i]} y={y - 35.5} textAnchor="middle" fontSize="12.5" fontWeight="700" fill="var(--amber)" style={FONT}>{i + 1}</text>
        </g>
      ))}

      {[400, 600, 800].map((x, i) => <Gate key={x} x={x} y={y} r={10} delay={i * 0.7} />)}
      <g transform="translate(40 26)">
        <rect x="-7" y="-7" width="14" height="14" rx="3" fill="var(--teal)" transform="rotate(45)" />
        <text x="16" y="5" fontSize="12.5" fontWeight="600" fill="#aab4c8" style={FONT}>Human approves before the next step</text>
      </g>
    </svg>
  );
}

/* -------------------------------------------------------------------------
   Small card art for the Home page
   ------------------------------------------------------------------------- */
export function LoopMiniArt() {
  const loop = 'M100 22 A52 52 0 1 1 100 126 A52 52 0 1 1 100 22';
  const nodes = [[100, 22], [145, 100], [55, 100]];
  return (
    <svg className="art" viewBox="0 0 200 150" role="img" aria-label="A continuous loop of three phases">
      <path d={loop} fill="none" stroke="var(--line)" strokeWidth="2.5" />
      <path d={loop} className="packet amber" pathLength="1" fill="none" strokeWidth="4" strokeLinecap="round" style={{ '--dur': '4s' }} />
      {nodes.map(([x, y], i) => (
        <circle key={i} className="anim-pop svg-box" cx={x} cy={y} r="11" fill={['var(--ink)', 'var(--amber)', 'var(--teal)'][i]} style={{ '--d': `${i * 0.5}s` }} />
      ))}
      <rect x="84" y="58" width="32" height="34" rx="5" fill="var(--surface)" stroke="var(--line)" />
      {[0, 1, 2].map((i) => <rect key={i} className="grow-x" x="90" y={65 + i * 8} width={i === 1 ? 14 : 20} height="4" rx="2" fill="var(--teal)" style={{ '--d': `${i * 0.3}s` }} />)}
    </svg>
  );
}

export function SpecMiniArt() {
  const docs = [
    { x: 30, y: 30, label: 'req', tone: 'var(--amber)' },
    { x: 78, y: 44, label: 'design', tone: 'var(--teal)' },
    { x: 126, y: 58, label: 'tasks', tone: 'var(--ink)' },
  ];
  return (
    <svg className="art" viewBox="0 0 200 150" role="img" aria-label="Requirements, design and task documents produced in order">
      {docs.map((d, i) => (
        <g key={d.label} className="anim-float" style={{ '--d': `${i * 0.6}s`, '--dur': '5s' }}>
          <rect x={d.x} y={d.y} width="48" height="62" rx="6" fill="var(--surface)" stroke="var(--line)" />
          <rect x={d.x} y={d.y} width="48" height="12" rx="6" fill={d.tone} />
          {[0, 1, 2].map((k) => (
            <rect key={k} className="grow-x" x={d.x + 7} y={d.y + 20 + k * 10} width={k === 2 ? 20 : 32} height="4" rx="2" fill="var(--teal-wash)" style={{ '--d': `${i * 0.4 + k * 0.2}s` }} />
          ))}
          <circle cx={d.x + 40} cy={d.y + 54} r="7" fill="var(--teal)" className="anim-pop svg-box" style={{ '--d': `${i * 0.8}s` }} />
          <path d={`M${d.x + 37} ${d.y + 54} l2 2 l4 -4.5`} fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
        </g>
      ))}
    </svg>
  );
}

export function LearnMiniArt() {
  const hs = [26, 46, 66, 86];
  return (
    <svg className="art" viewBox="0 0 200 150" role="img" aria-label="Four rising levels of skill with a badge at the top">
      {hs.map((h, i) => (
        <rect key={i} className="grow-y" x={28 + i * 38} y={132 - h} width="30" height={h} rx="5"
          fill={i === 3 ? 'var(--amber)' : 'var(--teal)'} opacity={0.55 + i * 0.15} style={{ '--d': `${i * 0.25}s` }} />
      ))}
      <g className="anim-float" style={{ '--dur': '4s' }}>
        <polygon points="157,14 170,21.5 170,36.5 157,44 144,36.5 144,21.5" fill="var(--ink)" />
        <text x="157" y="33.5" textAnchor="middle" fontSize="11" fontWeight="800" fill="var(--amber)" style={DISPLAY}>L4</text>
      </g>
      <path d="M43 98 L81 78 L119 58 L150 44" fill="none" stroke="var(--amber)" strokeWidth="2" strokeDasharray="3 5" className="flow" />
    </svg>
  );
}

/* -------------------------------------------------------------------------
   AI Academy: four levels to climb
   ------------------------------------------------------------------------- */
export const LEVELS = ['Literate', 'Practitioner', 'Builder', 'Champion'];

export function LevelBadge({ level, size = 56 }) {
  const fills = ['var(--teal-wash)', 'var(--teal)', 'var(--amber)', 'var(--ink)'];
  const text = ['var(--teal-deep)', '#fff', 'var(--ink)', 'var(--amber)'];
  const i = level - 1;
  return (
    <svg className="level-badge" viewBox="0 0 60 60" width={size} height={size} aria-hidden="true">
      <polygon points="30,3 53.4,16.5 53.4,43.5 30,57 6.6,43.5 6.6,16.5" fill={fills[i]} stroke={i === 0 ? 'var(--teal)' : 'none'} strokeWidth="2" />
      <text x="30" y="37" textAnchor="middle" fontSize="18" fontWeight="800" fill={text[i]} style={DISPLAY}>L{level}</text>
    </svg>
  );
}

export function AcademyArt() {
  const base = 330;
  const steps = [70, 125, 180, 235];
  const fills = ['var(--teal-wash)', 'var(--teal)', 'var(--amber)', 'var(--ink)'];
  const badge = (i) => [62 + i * 112, base - steps[i] - 36];
  const climb = steps.map((_, i) => badge(i)).map(([x, y], i) => `${i ? 'L' : 'M'}${x} ${y}`).join(' ');
  return (
    <svg className="art" viewBox="0 0 520 380" role="img"
      aria-label="Four rising steps for the academy levels: literate, practitioner, builder and champion">
      <circle className="anim-breathe svg-box" cx="300" cy="190" r="160" fill="var(--teal-wash)" opacity=".7" />
      {steps.map((h, i) => (
        <g key={i}>
          <rect className="grow-y" x={10 + i * 112} y={base - h} width="104" height={h} rx="10" fill={fills[i]}
            stroke={i === 0 ? 'var(--teal)' : 'none'} style={{ '--d': `${i * 0.25}s` }} />
          <text x={62 + i * 112} y={base + 26} textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--ink-soft)" style={FONT}>{LEVELS[i]}</text>
        </g>
      ))}
      <path d={climb} fill="none" stroke="var(--amber)" strokeWidth="2.5" strokeDasharray="4 7" className="flow" />
      <path d={climb} className="packet amber" pathLength="1" fill="none" strokeWidth="5" strokeLinecap="round" style={{ '--dur': '3.6s' }} />
      {steps.map((_, i) => {
        const [x, y] = badge(i);
        return (
          <g key={i} className="anim-pop svg-box" style={{ '--d': `${i * 0.5}s`, transformOrigin: 'center' }}>
            <polygon points={`${x},${y - 22} ${x + 19},${y - 11} ${x + 19},${y + 11} ${x},${y + 22} ${x - 19},${y + 11} ${x - 19},${y - 11}`}
              fill="var(--surface)" stroke={i === 3 ? 'var(--amber)' : 'var(--teal)'} strokeWidth="2.5" />
            <text x={x} y={y + 6} textAnchor="middle" fontSize="15" fontWeight="800" fill="var(--ink)" style={DISPLAY}>L{i + 1}</text>
          </g>
        );
      })}
      {[[440, 40], [490, 80], [404, 74]].map(([x, y], i) => (
        <path key={i} className="blink" d={`M${x} ${y - 9} L${x + 3} ${y - 3} L${x + 9} ${y} L${x + 3} ${y + 3} L${x} ${y + 9} L${x - 3} ${y + 3} L${x - 9} ${y} L${x - 3} ${y - 3} Z`}
          fill="var(--amber)" style={{ '--d': `${i * 0.6}s` }} />
      ))}
    </svg>
  );
}

/* -------------------------------------------------------------------------
   Spec card: the three spec files, with tabs
   ------------------------------------------------------------------------- */
const SPEC_FILES = {
  'requirements.md': [
    ['h', '# Invoice approval: requirements'],
    ['', ''],
    ['h2', '## Story 1: route invoices for approval'],
    ['', 'As a finance clerk, I want invoices over the limit'],
    ['', 'sent to a manager, so spend stays controlled.'],
    ['', ''],
    ['h2', '### Acceptance criteria'],
    ['kw', '1. WHEN an invoice exceeds the approval limit'],
    ['', '   THE SYSTEM SHALL assign it to the cost-centre manager.'],
    ['kw', '2. WHEN the manager approves'],
    ['', '   THE SYSTEM SHALL post it to the ERP within 60 seconds.'],
    ['kw', '3. IF the ERP is unavailable'],
    ['', '   THEN THE SYSTEM SHALL retry and alert the finance channel.'],
  ],
  'design.md': [
    ['h', '# Design'],
    ['', ''],
    ['h2', '## Components'],
    ['', '- approval-service   Spring Boot, REST + events'],
    ['', '- erp-connector      SAP OData, idempotent posts'],
    ['', '- notifier           Teams / Slack webhooks'],
    ['', ''],
    ['h2', '## Data model'],
    ['kw', 'Invoice(id, total, costCentre, status, approverId)'],
    ['', ''],
    ['h2', '## Sequence'],
    ['', 'clerk -> approval-service -> manager (SSO)'],
    ['', 'manager.approve -> erp-connector -> ERP'],
    ['', 'ERP timeout -> retry x3 -> notifier'],
  ],
  'tasks.md': [
    ['h', '# Tasks (each traced to a requirement)'],
    ['', ''],
    ['ok', '- [x] 1. Invoice + approval entities, migrations    req 1'],
    ['ok', '- [x] 2. Routing rule by cost-centre limit          req 1'],
    ['ok', '- [x] 3. Approve endpoint with SSO role check       req 2'],
    ['', '- [ ] 4. ERP connector with idempotency key         req 2'],
    ['', '- [ ] 5. Retry policy + finance alert               req 3'],
    ['', '- [ ] 6. Contract tests against the ERP sandbox     req 2, 3'],
    ['', ''],
    ['cm', '> Agents pick up one task at a time.'],
    ['cm', '> An engineer reviews every diff before merge.'],
  ],
};

export function SpecCard() {
  const names = Object.keys(SPEC_FILES);
  const [file, setFile] = useState(names[0]);
  return (
    <div className="spec-card">
      <div className="code-head" role="tablist" aria-label="Specification files">
        <i /><i /><i />
        <div className="spec-tabs">
          {names.map((n) => (
            <button key={n} role="tab" aria-selected={file === n} className={file === n ? 'active' : ''} onClick={() => setFile(n)}>{n}</button>
          ))}
        </div>
      </div>
      <pre key={file} role="tabpanel" aria-label={file}>
        {SPEC_FILES[file].map(([kind, text], i) => (
          <span key={i} className={`sl ${kind}`} style={{ '--i': i }}>{text || ' '}</span>
        ))}
      </pre>
    </div>
  );
}

/* -------------------------------------------------------------------------
   Session player: a short, scripted "video" of an AI-assisted session.
   It plays when it scrolls into view, loops like a clip, and can be paused,
   replayed or scrubbed by chapter.
   ------------------------------------------------------------------------- */
const fmt = (s) => `0:${String(Math.floor(s)).padStart(2, '0')}`;

export function SessionPlayer({ script, title }) {
  const reduced = usePrefersReducedMotion();
  const { duration, chapters, lines, files, tasks } = script;
  const [t, setT] = useState(reduced ? duration : 0);
  const [playing, setPlaying] = useState(false);
  const ref = useRef(null);
  const userPaused = useRef(false);

  // Autoplay while on screen, pause when scrolled away (unless reduced motion).
  useEffect(() => {
    if (reduced || typeof IntersectionObserver === 'undefined') return undefined;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !userPaused.current) setPlaying(true);
      if (!e.isIntersecting) setPlaying(false);
    }, { threshold: 0.35 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [reduced]);

  useEffect(() => {
    if (!playing) return undefined;
    const id = setInterval(() => {
      setT((v) => (v >= duration + 2.5 ? 0 : v + 0.1)); // hold the last frame, then loop
    }, 100);
    return () => clearInterval(id);
  }, [playing, duration]);

  const now = Math.min(t, duration);
  const shown = lines.filter((l) => l.t <= now);
  const doneTasks = tasks.filter((k) => k.t <= now).length;
  const shownFiles = files.filter((f) => f.t <= now);
  const chapterIdx = chapters.reduce((acc, c, i) => (c.t <= now ? i : acc), 0);

  const toggle = () => {
    userPaused.current = playing;
    if (!playing && t >= duration) setT(0);
    setPlaying(!playing);
  };
  const seek = (s) => { setT(s); };

  return (
    <figure className="player" ref={ref}>
      <div className="code-head">
        <i /><i /><i />
        <span>{title}</span>
        <em className="player-badge">Illustrative session</em>
      </div>
      <div className="player-body">
        <div className="player-term" aria-live="off">
          {shown.slice(-11).map((l) => {
            const typed = l.kind === 'cmd' ? l.text.slice(0, Math.max(1, Math.floor((now - l.t) * 45))) : l.text;
            return <div key={`${l.t}-${l.text}`} className={`tl ${l.kind}`}>{typed}</div>;
          })}
          <div className="tl caret" />
        </div>
        <aside className="player-side">
          <h4>Workspace</h4>
          <ul className="pfiles">
            {shownFiles.map((f, i) => (
              <li key={f.name} className={i === shownFiles.length - 1 ? 'active' : ''}>{f.name}</li>
            ))}
          </ul>
          <h4>{script.tasksLabel || 'Tasks'} <b>{doneTasks}/{tasks.length}</b></h4>
          <div className="progress"><i style={{ width: `${(doneTasks / tasks.length) * 100}%` }} /></div>
          <ul className="ptasks">
            {tasks.map((k) => <li key={k.text} className={k.t <= now ? 'done' : ''}>{k.text}</li>)}
          </ul>
        </aside>
      </div>
      <div className="player-controls">
        <button type="button" className="pbtn" onClick={toggle} aria-label={playing ? 'Pause' : 'Play'}>
          {playing ? (
            <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><rect x="3" y="2" width="3.5" height="12" rx="1" fill="currentColor" /><rect x="9.5" y="2" width="3.5" height="12" rx="1" fill="currentColor" /></svg>
          ) : (
            <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M4 2.5 L13 8 L4 13.5 Z" fill="currentColor" /></svg>
          )}
        </button>
        <div className="ptrack">
          <div className="pfill" style={{ width: `${(now / duration) * 100}%` }} />
          {chapters.map((c, i) => (
            <button type="button" key={c.label} className={`pchap${i === chapterIdx ? ' on' : ''}`} style={{ left: `${(c.t / duration) * 100}%` }}
              onClick={() => seek(c.t)} aria-label={`Jump to ${c.label}`}>
              <span>{c.label}</span>
            </button>
          ))}
        </div>
        <span className="ptime">{fmt(now)} / {fmt(duration)}</span>
      </div>
      <figcaption className="sr-only">
        {title}: {chapters.map((c) => c.label).join(', ')}.
      </figcaption>
    </figure>
  );
}

export const SDD_SESSION = {
  duration: 26,
  chapters: [
    { t: 0, label: 'Spec' }, { t: 6.5, label: 'Plan' }, { t: 10, label: 'Build' },
    { t: 18, label: 'Verify' }, { t: 22, label: 'Review' },
  ],
  files: [
    { t: 2.4, name: 'requirements.md' }, { t: 7.6, name: 'design.md' }, { t: 8.8, name: 'tasks.md' },
    { t: 12, name: 'src/approval/…' }, { t: 18.8, name: 'tests/…' },
  ],
  tasksLabel: 'Tasks done',
  tasks: [
    { t: 11.4, text: 'Entities + migrations' }, { t: 12.8, text: 'Routing rule' },
    { t: 14.2, text: 'Approve endpoint' }, { t: 15.6, text: 'ERP connector' },
    { t: 16.8, text: 'Retry + alerts' }, { t: 19.6, text: 'Contract tests' },
  ],
  lines: [
    { t: 0, kind: 'cmd', text: '$ caid spec new "Invoice approval workflow"' },
    { t: 1.3, kind: 'info', text: '› reading intent, ERP and SSO docs, last 40 finance tickets' },
    { t: 2.4, kind: 'ok', text: '✓ requirements.md: 4 stories, 12 acceptance criteria' },
    { t: 3.4, kind: 'ask', text: '? 2 open questions sent to the product owner' },
    { t: 5.2, kind: 'human', text: '◆ product owner approved the spec' },
    { t: 6.5, kind: 'cmd', text: '$ caid plan' },
    { t: 7.6, kind: 'ok', text: '✓ design.md: components, data model, sequence' },
    { t: 8.8, kind: 'ok', text: '✓ tasks.md: 6 tasks, each traced to a criterion' },
    { t: 9.4, kind: 'human', text: '◆ tech lead approved the plan' },
    { t: 10, kind: 'cmd', text: '$ caid build --tasks 1-6' },
    { t: 11.4, kind: 'info', text: '› task 1 entities + migrations ............ done' },
    { t: 12.8, kind: 'info', text: '› task 2 routing rule ..................... done' },
    { t: 14.2, kind: 'info', text: '› task 3 approve endpoint ................. done' },
    { t: 15.6, kind: 'info', text: '› task 4 ERP connector .................... done' },
    { t: 16.8, kind: 'info', text: '› task 5 retry + alerts ................... done' },
    { t: 18, kind: 'cmd', text: '$ caid verify' },
    { t: 19.6, kind: 'ok', text: '✓ 36 tests from acceptance criteria: all passing' },
    { t: 20.4, kind: 'ok', text: '✓ security + licence scan: no high findings' },
    { t: 22, kind: 'human', text: '◆ engineer reviewed the diff and requested 1 change' },
    { t: 23.6, kind: 'ok', text: '✓ change applied, re-verified, merged to main' },
    { t: 24.8, kind: 'ok', text: '✓ deployed to staging for client demo' },
  ],
};

export const ACADEMY_SESSION = {
  duration: 24,
  chapters: [
    { t: 0, label: 'Brief' }, { t: 5, label: 'Spec' }, { t: 11, label: 'Pair' },
    { t: 17, label: 'Evaluate' }, { t: 21, label: 'Badge' },
  ],
  files: [
    { t: 1.2, name: 'lab-07-brief.md' }, { t: 6.4, name: 'my-spec.md' },
    { t: 12, name: 'solution/…' }, { t: 17.8, name: 'eval-report.md' },
  ],
  tasksLabel: 'Lab checklist',
  tasks: [
    { t: 6.4, text: 'Write the spec' }, { t: 9.6, text: 'Fix spec gaps' },
    { t: 14.6, text: 'Build with an agent' }, { t: 17.8, text: 'Pass the evals' },
    { t: 21.6, text: 'Mentor sign-off' },
  ],
  lines: [
    { t: 0, kind: 'cmd', text: '$ academy lab start 07-spec-driven-api' },
    { t: 1.2, kind: 'info', text: '› brief: add refunds to the sandbox payments API' },
    { t: 2.6, kind: 'info', text: '› rules: no client data, approved tools only' },
    { t: 5, kind: 'cmd', text: '$ academy spec draft' },
    { t: 6.4, kind: 'ok', text: '✓ my-spec.md: 3 stories, 8 acceptance criteria' },
    { t: 7.6, kind: 'ask', text: '? coach: "what happens on a partial refund?"' },
    { t: 9.6, kind: 'ok', text: '✓ added 2 criteria for partial refunds' },
    { t: 11, kind: 'cmd', text: '$ academy pair --agent' },
    { t: 12.4, kind: 'info', text: '› agent proposes a plan; trainee edits step 3' },
    { t: 14.6, kind: 'info', text: '› 5 tasks built, trainee reviewed every diff' },
    { t: 17, kind: 'cmd', text: '$ academy eval' },
    { t: 17.8, kind: 'ok', text: '✓ 10/10 criteria met · prompt log reviewed' },
    { t: 19, kind: 'info', text: '› feedback: "trace tests to criteria by id"' },
    { t: 21, kind: 'human', text: '◆ mentor signed off the lab' },
    { t: 22.4, kind: 'ok', text: '✓ progress: 7 of 9 labs toward L2 Practitioner' },
  ],
};

/* -------------------------------------------------------------------------
   Home: the stacks our people work in
   ------------------------------------------------------------------------- */
export const STACKS = [
  { group: 'Frontend', items: ['React', 'Angular', 'Vue', 'Next.js', 'TypeScript'] },
  { group: 'Backend', items: ['Java / Spring', '.NET', 'Node.js', 'Python', 'Go'] },
  { group: 'Mobile', items: ['React Native', 'Flutter', 'Swift', 'Kotlin'] },
  { group: 'Integration', items: ['MuleSoft', 'Kafka', 'SAP', 'Salesforce', 'REST / GraphQL'] },
  { group: 'Cloud & DevOps', items: ['AWS', 'Azure', 'GCP', 'Kubernetes', 'Terraform'] },
  { group: 'Data & AI', ai: true, items: ['LLM apps', 'RAG', 'AI agents', 'MLOps', 'Databricks'] },
  { group: 'Quality', items: ['Playwright', 'Cypress', 'JMeter', 'Contract tests'] },
];

export function StackBoard() {
  return (
    <div className="stack-board">
      {STACKS.map((s, i) => (
        <div key={s.group} className={`stack-col${s.ai ? ' is-ai' : ''}`} style={{ '--c': i }}>
          <h3>{s.group}</h3>
          <ul>
            {s.items.map((t, k) => <li key={t} style={{ '--k': k }}>{t}</li>)}
          </ul>
        </div>
      ))}
    </div>
  );
}
