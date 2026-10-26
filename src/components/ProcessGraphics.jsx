// Illustrations for the "Our process" page: the client journey from first call to support,
// and an example delivery plan. Same conventions as Graphics.jsx.

import { usePrefersReducedMotion } from './Graphics.jsx';

const FONT = { fontFamily: 'var(--font-body)' };
const DISPLAY = { fontFamily: 'var(--font-display)' };

/* -------------------------------------------------------------------------
   Journey: a winding road with seven milestones and a project travelling along it
   ------------------------------------------------------------------------- */
const ROAD = 'M50 310 H430 A55 55 0 0 0 430 200 H90 A55 55 0 0 1 90 90 H470';
const STOPS = [
  { x: 110, y: 310, label: 'First call', below: true },
  { x: 240, y: 310, label: 'Discovery', below: true },
  { x: 370, y: 310, label: 'Proposal', below: true },
  { x: 330, y: 200, label: 'Kickoff', below: true },
  { x: 170, y: 200, label: 'Delivery', below: true },
  { x: 200, y: 90, label: 'Launch', below: false },
  { x: 350, y: 90, label: 'Support', below: false },
];

export function JourneyArt() {
  const reduced = usePrefersReducedMotion();
  return (
    <svg className="art" viewBox="0 0 520 380" role="img"
      aria-label="A road from your first call with us through discovery, proposal, kickoff, delivery and launch to ongoing support">
      <circle className="anim-breathe svg-box" cx="270" cy="200" r="165" fill="var(--teal-wash)" opacity=".7" />
      <path d={ROAD} fill="none" stroke="var(--ink)" strokeWidth="26" strokeLinecap="round" strokeLinejoin="round" />
      <path d={ROAD} fill="none" stroke="#fff" strokeOpacity=".7" strokeWidth="2" className="flow" />
      <path d={ROAD} className="packet amber" pathLength="1" fill="none" strokeWidth="8" strokeLinecap="round" style={{ '--dur': '9s' }} />

      {/* start and finish */}
      <g>
        <circle cx="50" cy="310" r="17" fill="var(--amber)" />
        <path d="M43 314 L50 302 L57 314" fill="none" stroke="var(--ink)" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round" />
        <text x="50" y="350" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="var(--ink)" style={FONT}>Your idea</text>
      </g>
      <g>
        <line x1="478" y1="90" x2="478" y2="38" stroke="var(--ink)" strokeWidth="3" strokeLinecap="round" />
        <path className="anim-float" style={{ '--dur': '3s' }} d="M478 40 L508 50 L478 62 Z" fill="var(--amber)" />
        <text x="478" y="122" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="var(--ink)" style={FONT}>Live</text>
      </g>

      {STOPS.map((s, i) => (
        <g key={s.label}>
          <circle className="ring" cx={s.x} cy={s.y} r="11" fill="none" stroke="var(--amber)" strokeWidth="2" style={{ '--d': `${i * 0.55}s` }} />
          <circle cx={s.x} cy={s.y} r="11" fill="var(--surface)" stroke="var(--amber)" strokeWidth="3" />
          <text x={s.x} y={s.y + 4.5} textAnchor="middle" fontSize="11.5" fontWeight="800" fill="var(--ink)" style={DISPLAY}>{i + 1}</text>
          <text x={s.x} y={s.below ? s.y + 34 : s.y - 22} textAnchor="middle" fontSize="12.5" fontWeight="600" fill="var(--ink-soft)" style={FONT}>{s.label}</text>
        </g>
      ))}

      {/* the project, travelling the road */}
      <g>
        {!reduced && <animateMotion dur="14s" repeatCount="indefinite" path={ROAD} keyPoints="0;1;1" keyTimes="0;.86;1" calcMode="linear" />}
        <g transform={reduced ? 'translate(470 90)' : undefined}>
          <rect x="-17" y="-14" width="34" height="28" rx="7" fill="var(--amber)" stroke="var(--ink)" strokeWidth="2" />
          <text y="5" textAnchor="middle" fontSize="13" fontWeight="800" fill="var(--ink)" style={DISPLAY}>{'{ }'}</text>
        </g>
      </g>
    </svg>
  );
}

/* -------------------------------------------------------------------------
   Example plan: phases across sixteen weeks, drawn as a simple Gantt chart
   ------------------------------------------------------------------------- */
// `from` is the week a phase starts in, `to` the week after it ends (halves allowed).
const WEEKS = 16;
export const PLAN = [
  { name: 'Discovery', from: 1, to: 3, tone: 'ink' },
  { name: 'Proposal and agreement', from: 3, to: 4, tone: 'ink' },
  { name: 'Kickoff and setup', from: 4, to: 5, tone: 'teal' },
  { name: 'Delivery in bolts', from: 5, to: 13.5, tone: 'amber', demos: true },
  { name: 'Acceptance testing', from: 12, to: 14.5, tone: 'teal' },
  { name: 'Launch', from: 14.5, to: 15, tone: 'ink', milestone: true },
  { name: 'Hypercare', from: 15, to: 17, tone: 'teal' },
];

export function PlanGantt() {
  const pct = (w) => `${((w - 1) / WEEKS) * 100}%`;
  return (
    <div className="gantt" role="table" aria-label="Example plan for a first release of about twelve weeks">
      <div className="gantt-row gantt-head" role="row">
        <span role="columnheader">Phase</span>
        <div className="gantt-track" aria-hidden="true">
          {Array.from({ length: WEEKS }, (_, i) => <i key={i} style={{ left: pct(i + 1) }}>W{i + 1}</i>)}
        </div>
      </div>
      {PLAN.map((p, i) => (
        <div className="gantt-row" role="row" key={p.name}>
          <span role="rowheader">{p.name}</span>
          <div className="gantt-track" role="cell" aria-label={`Weeks ${Math.floor(p.from)} to ${Math.ceil(p.to - 1)}`}>
            <b className={`gantt-bar ${p.tone}${p.milestone ? ' milestone' : ''}`}
              style={{ left: pct(p.from), width: `${((p.to - p.from) / WEEKS) * 100}%`, '--i': i }}>
              {p.demos && Array.from({ length: 8 }, (_, k) => <em key={k} style={{ left: `${(k + 0.8) * 12}%` }} title="Client demo" />)}
            </b>
          </div>
        </div>
      ))}
      <div className="gantt-legend">
        <span><em className="dot" /> Weekly client demo</span>
        <span><em className="diamond" /> Go-live</span>
      </div>
    </div>
  );
}
