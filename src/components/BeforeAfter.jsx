import { useState } from 'react';

// Services: the same four systems, before and after an integration project. A switch flips between them.

const POINTS = {
  before: [
    'Orders are retyped from Salesforce into SAP',
    'Two versions of every customer record',
    'Month-end reconciled in a spreadsheet',
    'Customers find the errors first',
  ],
  after: [
    'Orders reach SAP the moment they close',
    'One customer record, synced both ways',
    'Month-end runs on live, matched data',
    'Failures retry, then alert your team',
  ],
};

const SYS = [
  { label: 'Salesforce', x: 80, y: 60 },
  { label: 'SAP', x: 380, y: 60 },
  { label: 'Workday', x: 80, y: 250 },
  { label: 'NetSuite', x: 380, y: 250 },
];

function Picture({ after }) {
  return (
    <svg className="ba-svg" viewBox="0 0 460 310" role="img"
      aria-label={after ? 'After: all four systems connected through one integration layer' : 'Before: systems linked by people retyping data and a spreadsheet'}>
      <g className="ba-layer" style={{ opacity: after ? 0 : 1 }}>
        <path d="M130 60 C 200 10, 260 10, 330 60" className="ba-manual" />
        <path d="M80 85 L 80 225" className="ba-manual" />
        <path d="M130 250 C 200 300, 260 300, 330 250" className="ba-manual" />
        <g transform="translate(196 118)">
          <rect width="68" height="52" rx="6" className="ba-sheet" />
          {[0, 1, 2].map((r) => <line key={r} x1="8" x2="60" y1={14 + r * 12} y2={14 + r * 12} className="ba-sheet-line" />)}
        </g>
        <text x="230" y="195" textAnchor="middle" className="ba-note">reconcile.xlsx</text>
        <text x="230" y="44" textAnchor="middle" className="ba-note warn">retyped</text>
        <text x="96" y="160" className="ba-note warn">CSV export</text>
        <text x="230" y="276" textAnchor="middle" className="ba-note warn">emailed weekly</text>
      </g>
      <g className="ba-layer" style={{ opacity: after ? 1 : 0 }}>
        <rect x="170" y="125" width="120" height="60" rx="12" className="ba-hub" />
        <text x="230" y="152" textAnchor="middle" className="ba-hub-t">API and event</text>
        <text x="230" y="168" textAnchor="middle" className="ba-hub-t">layer</text>
        {SYS.map((s) => {
          const tx = s.x < 230 ? 170 : 290;
          const ty = s.y < 155 ? 135 : 175;
          return (
            <g key={s.label}>
              <line x1={s.x} y1={s.y} x2={tx} y2={ty} className="ba-wire" />
              {after && (
                <circle r="3.5" className="ba-packet">
                  <animateMotion dur="2.2s" repeatCount="indefinite" path={`M${s.x} ${s.y} L${tx} ${ty}`} />
                </circle>
              )}
            </g>
          );
        })}
      </g>
      {SYS.map((s) => (
        <g key={s.label} transform={`translate(${s.x} ${s.y})`}>
          <rect x="-50" y="-16" width="100" height="32" rx="16" className={`ba-node${after ? ' linked' : ''}`} />
          <text y="5" textAnchor="middle" className="ba-node-t">{s.label}</text>
        </g>
      ))}
    </svg>
  );
}

export default function BeforeAfter() {
  const [after, setAfter] = useState(false);
  const list = after ? POINTS.after : POINTS.before;
  return (
    <div className="ba">
      <div className="ba-switch" role="group" aria-label="Show the systems">
        <button type="button" aria-pressed={!after} className={!after ? 'on' : ''} onClick={() => setAfter(false)}>Before</button>
        <button type="button" aria-pressed={after} className={after ? 'on' : ''} onClick={() => setAfter(true)}>After</button>
      </div>
      <div className="ba-body">
        <div className="ba-frame art-dark"><Picture after={after} /></div>
        <ul className={`ba-points${after ? ' good' : ''}`} aria-live="polite">
          {list.map((p, i) => <li key={p} style={{ '--i': i }}>{p}</li>)}
        </ul>
      </div>
    </div>
  );
}
