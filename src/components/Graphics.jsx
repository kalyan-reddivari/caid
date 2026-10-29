// Animated illustrations for the public site.
// Everything here is inline SVG + CSS animation (see "Motion" in styles.css), so it stays
// crisp at any size, weighs almost nothing, and switches itself off for people who prefer
// reduced motion. Colours come from the CSS variables so the art follows the site palette.

import { useEffect, useState } from 'react';

const FONT = { fontFamily: 'var(--font-body)' };
const DISPLAY = { fontFamily: 'var(--font-display)' };

/* -------------------------------------------------------------------------
   Small building blocks
   ------------------------------------------------------------------------- */
export function usePrefersReducedMotion() {
  const query = '(prefers-reduced-motion: reduce)';
  // Starts false so prerendered HTML and the first browser render match; the effect then reads the setting.
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (!window.matchMedia) return undefined;
    const mq = window.matchMedia(query);
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return reduced;
}

// Turns its children around (cx, cy), in the group's own coordinates. SMIL is used because the
// rotation point is explicit, which stays correct for nested and translated groups.
export function Rotate({ cx = 0, cy = 0, dur = 16, reverse = false, children }) {
  const reduced = usePrefersReducedMotion();
  return (
    <g>
      {!reduced && (
        <animateTransform attributeName="transform" type="rotate" from={`0 ${cx} ${cy}`}
          to={`${reverse ? -360 : 360} ${cx} ${cy}`} dur={`${dur}s`} repeatCount="indefinite" />
      )}
      {children}
    </g>
  );
}

function Gear({ r, teeth, tw = 12, th = 12, fill, hole = 'var(--ink)' }) {
  return (
    <g>
      {Array.from({ length: teeth }, (_, i) => (
        <rect key={i} x={-tw / 2} y={-(r + th)} width={tw} height={th + 3} rx="2.5" fill={fill}
          transform={`rotate(${(360 / teeth) * i})`} />
      ))}
      <circle r={r} fill={fill} />
      <circle r={r * 0.4} fill={hole} />
    </g>
  );
}

// A wire plus a pulse of light travelling along it.
export function Wire({ d, delay = 0, tone = 'teal', wire = 'var(--line)', speed = 3 }) {
  return (
    <>
      <path d={d} fill="none" stroke={wire} strokeWidth="2" />
      <path d={d} className={`packet ${tone}`} pathLength="1" fill="none" strokeWidth="3.5" strokeLinecap="round"
        style={{ '--d': `${delay}s`, '--dur': `${speed}s` }} />
    </>
  );
}

export function Pill({ x, y, w, label, fill = 'var(--ink)', color = '#fff', delay = 0 }) {
  return (
    <g className="anim-float" style={{ '--d': `${delay}s`, '--dur': '5s' }}>
      <rect x={x} y={y} width={w} height="26" rx="13" fill={fill} />
      <text x={x + w / 2} y={y + 17.5} textAnchor="middle" fontSize="12" fontWeight="600" fill={color} style={FONT}>{label}</text>
    </g>
  );
}

/* -------------------------------------------------------------------------
   Services: an app, an API gear-train and a cloud, wired together
   ------------------------------------------------------------------------- */
export function ServicesArt() {
  const bars = [30, 58, 42, 78, 60];
  return (
    <svg className="art" viewBox="0 0 520 360" role="img"
      aria-label="An application connected through turning gears to cloud servers">
      <circle className="anim-breathe svg-box" cx="260" cy="180" r="150" fill="var(--teal-wash)" />

      {/* application window */}
      <g>
        <rect x="16" y="76" width="168" height="208" rx="14" fill="var(--surface)" stroke="var(--line)" />
        <path d="M16 110 H184" stroke="var(--line)" />
        <circle cx="34" cy="93" r="4" fill="var(--amber)" />
        <circle cx="48" cy="93" r="4" fill="var(--teal)" />
        <circle cx="62" cy="93" r="4" fill="var(--line)" />
        {[100, 72, 120].map((w, i) => (
          <rect key={i} className="grow-x" x="32" y={128 + i * 16} width={w} height="8" rx="4"
            fill={i === 1 ? 'var(--amber)' : 'var(--teal-wash)'} style={{ '--d': `${i * 0.25}s` }} />
        ))}
        {bars.map((h, i) => (
          <rect key={i} className="grow-y" x={34 + i * 27} y={266 - h} width="16" height={h} rx="3"
            fill={i === bars.length - 1 ? 'var(--amber)' : 'var(--teal)'} style={{ '--d': `${i * 0.18}s` }} />
        ))}
      </g>

      {/* connectors */}
      <Wire d="M184 180 H236" />
      <Wire d="M304 180 H372" delay={1.2} tone="amber" />

      {/* gear train */}
      <g transform="translate(270 180)">
        <Rotate dur={16}>
          <Gear r={30} teeth={10} tw={14} th={13} fill="var(--amber)" />
        </Rotate>
      </g>
      <g transform="translate(322 232)">
        <Rotate dur={9} reverse>
          <Gear r={14} teeth={8} tw={8} th={8} fill="var(--teal)" />
        </Rotate>
      </g>

      {/* servers */}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x="372" y={76 + i * 66} width="132" height="54" rx="10" fill="var(--surface)" stroke="var(--line)" />
          <circle className="blink" cx="392" cy={103 + i * 66} r="5" fill={i === 1 ? 'var(--amber)' : 'var(--teal)'}
            style={{ '--d': `${i * 0.45}s` }} />
          <rect x="408" y={97 + i * 66} width="70" height="6" rx="3" fill="var(--teal-wash)" />
          <rect x="408" y={109 + i * 66} width="46" height="6" rx="3" fill="var(--line)" />
        </g>
      ))}

      <Pill x={234} y={88} w={56} label="API" />
      <Pill x={92} y={306} w={70} label="CI/CD" fill="var(--amber)" color="var(--ink)" delay={1} />
      <Pill x={412} y={30} w={72} label="Cloud" fill="var(--teal)" delay={0.6} />
    </svg>
  );
}

/* -------------------------------------------------------------------------
   Services: source systems -> API + events -> the places data is used
   ------------------------------------------------------------------------- */
export function FlowBand() {
  const left = ['ERP', 'CRM', 'HR', 'Finance'];
  const right = ['Web apps', 'Analytics', 'AI assistants'];
  const ly = (i) => 46 + i * 66;
  const ry = (i) => 79 + i * 66;
  return (
    <svg className="art flow-band" viewBox="0 0 1000 290" role="img"
      aria-label="ERP, CRM, HR and finance systems flowing through an API and event layer into apps, analytics and AI assistants">
      {left.map((_, i) => (
        <Wire key={`l${i}`} d={`M200 ${ly(i)} C 330 ${ly(i)}, 340 145, 440 145`} delay={i * 0.5}
          wire="#2c3a5c" tone="bright" speed={3.4} />
      ))}
      {right.map((_, i) => (
        <Wire key={`r${i}`} d={`M560 145 C 660 145, 670 ${ry(i)}, 800 ${ry(i)}`} delay={1 + i * 0.6}
          wire="#2c3a5c" tone="amber" speed={3.4} />
      ))}

      {left.map((t, i) => (
        <g key={t}>
          <rect x="40" y={ly(i) - 22} width="160" height="44" rx="10" fill="#1e2d50" stroke="#2c3a5c" />
          <text x="120" y={ly(i) + 5} textAnchor="middle" fontSize="15" fontWeight="600" fill="#fff" style={FONT}>{t}</text>
        </g>
      ))}
      {right.map((t, i) => (
        <g key={t}>
          <rect x="800" y={ry(i) - 22} width="160" height="44" rx="10" fill="#1e2d50" stroke="#2c3a5c" />
          <text x="880" y={ry(i) + 5} textAnchor="middle" fontSize="15" fontWeight="600" fill="#fff" style={FONT}>{t}</text>
        </g>
      ))}

      <circle className="spin svg-box" style={{ '--dur': '30s' }} cx="500" cy="145" r="80" fill="none"
        stroke="var(--amber)" strokeOpacity=".4" strokeWidth="1.5" strokeDasharray="3 7" />
      <circle className="anim-breathe svg-box" cx="500" cy="145" r="58" fill="var(--amber)" />
      <text x="500" y="142" textAnchor="middle" fontSize="22" fontWeight="800" fill="var(--ink)" style={DISPLAY}>API</text>
      <text x="500" y="163" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--ink)" style={FONT}>+ events</text>
    </svg>
  );
}

/* -------------------------------------------------------------------------
   AI adoption: a small network where data flows through to outcomes
   ------------------------------------------------------------------------- */
export function NeuralArt() {
  const layers = [4, 5, 5, 3];
  const xs = [58, 188, 332, 462];
  const labels = ['Your data', 'Models', 'Your systems', 'Outcomes'];
  const yOf = (n, i) => 40 + i * (270 / (n - 1));

  const edges = [];
  layers.slice(0, -1).forEach((n, l) => {
    for (let a = 0; a < n; a += 1) {
      for (let b = 0; b < layers[l + 1]; b += 1) {
        edges.push({ x1: xs[l], y1: yOf(n, a), x2: xs[l + 1], y2: yOf(layers[l + 1], b), lit: (a * 7 + b * 3 + l) % 6 === 0, k: `${l}-${a}-${b}` });
      }
    }
  });

  return (
    <svg className="art" viewBox="0 0 520 380" role="img"
      aria-label="A neural network turning your data into outcomes through your existing systems">
      <circle className="anim-breathe svg-box" cx="260" cy="175" r="150" fill="var(--amber-wash)" />
      {edges.map((e) => (
        <line key={e.k} x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2} stroke="var(--line)" strokeWidth="1.4" />
      ))}
      {edges.filter((e) => e.lit).map((e, i) => (
        <path key={`p${e.k}`} d={`M${e.x1} ${e.y1} L${e.x2} ${e.y2}`} className="packet amber" pathLength="1"
          fill="none" strokeWidth="3.5" strokeLinecap="round" style={{ '--d': `${(i * 0.37) % 3}s`, '--dur': '3.2s' }} />
      ))}
      {layers.map((n, l) =>
        Array.from({ length: n }, (_, i) => (
          <circle key={`${l}-${i}`} className={l > 0 && l < 3 && (i + l) % 2 === 0 ? 'anim-pop svg-box' : ''}
            cx={xs[l]} cy={yOf(n, i)} r={l === 3 ? 11 : 9}
            fill={l === 3 ? 'var(--amber)' : l === 0 ? 'var(--surface)' : 'var(--teal-wash)'}
            stroke={l === 3 ? 'var(--amber)' : 'var(--teal)'} strokeWidth="2" style={{ '--d': `${(i * 0.3 + l * 0.2) % 2}s` }} />
        )),
      )}
      {labels.map((t, l) => (
        <text key={t} x={xs[l]} y="352" textAnchor="middle" fontSize="12.5" fontWeight="600" fill="var(--ink-soft)" style={FONT}>{t}</text>
      ))}
    </svg>
  );
}

// A rising curve with four milestones, drawn for the dark "adoption path" band.
export function AdoptionPathArt() {
  const pts = [[70, 168], [350, 128], [640, 86], [930, 50]];
  const names = ['Assess', 'Pilot', 'Integrate', 'Scale'];
  const line = 'M70 168 C 200 166, 250 134, 350 128 S 540 96, 640 86 S 830 60, 930 50';
  return (
    <svg className="art path-art" viewBox="0 0 1000 220" role="img"
      aria-label="Value rising through four stages: assess, pilot, integrate and scale">
      <defs>
        <linearGradient id="adoptFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--amber)" stopOpacity=".35" />
          <stop offset="1" stopColor="var(--amber)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[60, 110, 160].map((y) => (
        <path key={y} d={`M40 ${y} H970`} stroke="#2c3a5c" strokeDasharray="2 8" />
      ))}
      <path className="fade-in" d={`${line} L930 200 L70 200 Z`} fill="url(#adoptFill)" />
      <path className="draw-line" d={line} pathLength="1" fill="none" stroke="var(--amber)" strokeWidth="4" strokeLinecap="round" />
      <path className="packet bright" d={line} pathLength="1" fill="none" strokeWidth="5" strokeLinecap="round"
        style={{ '--dur': '4.5s', '--d': '1.2s' }} />
      {pts.map(([x, y], i) => (
        <g key={names[i]}>
          <circle className="ring" cx={x} cy={y} r="9" fill="none" stroke="var(--amber)" strokeWidth="2" style={{ '--d': `${i * 0.6}s` }} />
          <circle cx={x} cy={y} r="9" fill="var(--ink)" stroke="var(--amber)" strokeWidth="3.5" />
          <text x={x} y={y + (i === 0 ? 34 : -22)} textAnchor="middle" fontSize="15" fontWeight="700" fill="#fff" style={FONT}>
            {i + 1}. {names[i]}
          </text>
        </g>
      ))}
    </svg>
  );
}

/* -------------------------------------------------------------------------
   About: the four values orbiting the {Ai} core
   ------------------------------------------------------------------------- */
export function AboutOrbitArt() {
  const inner = ['Ship early', 'Explain plainly'];
  const outer = ['Own the outcome', 'Leave it better'];
  const node = (label, x, y, w, fill, color) => (
    <g key={label} transform={`translate(${x} ${y})`}>
      <Rotate dur={48} reverse>
        <rect x={-w / 2} y="-15" width={w} height="30" rx="15" fill={fill} stroke="var(--line)" />
        <text y="5" textAnchor="middle" fontSize="12.5" fontWeight="600" fill={color} style={FONT}>{label}</text>
      </Rotate>
    </g>
  );
  return (
    <svg className="art" viewBox="0 0 520 400" role="img"
      aria-label="Our values orbiting the Ai at the heart of CAID">
      <circle className="anim-breathe svg-box" cx="260" cy="200" r="170" fill="var(--teal-wash)" opacity=".6" />
      <circle className="flow" cx="260" cy="200" r="112" fill="none" stroke="var(--teal)" strokeOpacity=".5" strokeWidth="1.5" />
      <circle className="flow" cx="260" cy="200" r="166" fill="none" stroke="var(--amber)" strokeOpacity=".7" strokeWidth="1.5" />

      <Rotate cx={260} cy={200} dur={48}>
        {node(inner[0], 260 - 112, 200, 116, 'var(--surface)', 'var(--ink)')}
        {node(inner[1], 260 + 112, 200, 136, 'var(--surface)', 'var(--ink)')}
        {node(outer[0], 260, 200 - 166, 150, 'var(--ink)', '#fff')}
        {node(outer[1], 260, 200 + 166, 136, 'var(--ink)', '#fff')}
        <circle cx={260 + 79} cy={200 - 79} r="6" fill="var(--amber)" />
        <circle cx={260 - 117} cy={200 + 117} r="6" fill="var(--teal)" />
      </Rotate>

      <rect className="anim-pop svg-box" x="204" y="168" width="112" height="64" rx="16" fill="var(--amber)" style={{ '--dur': '4s' }} />
      <text x="260" y="211" textAnchor="middle" fontSize="34" fontWeight="800" fill="var(--ink)" style={DISPLAY}>{'{Ai}'}</text>
    </svg>
  );
}

/* -------------------------------------------------------------------------
   Careers and contact hero art
   ------------------------------------------------------------------------- */
export function CareersArt() {
  return (
    <div className="code-card" aria-hidden="true">
      <div className="code-head"><i /><i /><i /><span>join.caid</span></div>
      <pre>
        <span className="ln" style={{ '--w': '1ch', '--s': '0s' }}>{'{'}</span>
        <span className="ln" style={{ '--w': '20ch', '--s': '0.5s' }}>{'  role: "engineer",'}</span>
        <span className="ln" style={{ '--w': '38ch', '--s': '1.6s' }}>{'  loves: "hard integration problems",'}</span>
        <span className="ln" style={{ '--w': '30ch', '--s': '3s' }}>{'  builds: "things that ship",'}</span>
        <span className="ln" style={{ '--w': '16ch', '--s': '4.2s' }}>{'  hiring: '}<em>true</em></span>
        <span className="ln caret-line" style={{ '--w': '4ch', '--s': '5.2s' }}>{'}'}</span>
      </pre>
    </div>
  );
}

export function ContactArt() {
  const path = 'M70 236 C 150 40, 330 40, 440 96';
  return (
    <svg className="art" viewBox="0 0 520 300" role="img" aria-label="A message flying from you to CAID">
      <circle className="anim-breathe svg-box" cx="300" cy="150" r="130" fill="var(--teal-wash)" />
      <path d={path} fill="none" stroke="var(--teal)" strokeWidth="2" strokeDasharray="3 9" className="flow" />
      <path className="packet amber" d={path} pathLength="1" fill="none" strokeWidth="5" strokeLinecap="round" style={{ '--dur': '3.4s' }} />

      <circle cx="70" cy="236" r="26" fill="var(--surface)" stroke="var(--line)" />
      <circle cx="70" cy="229" r="7" fill="var(--teal)" />
      <path d="M56 248 C 58 238, 82 238, 84 248 Z" fill="var(--teal)" />
      <text x="70" y="282" textAnchor="middle" fontSize="12.5" fontWeight="600" fill="var(--ink-soft)" style={FONT}>You</text>

      <circle className="ring" cx="440" cy="96" r="28" fill="none" stroke="var(--amber)" strokeWidth="2" />
      <circle className="ring" cx="440" cy="96" r="28" fill="none" stroke="var(--amber)" strokeWidth="2" style={{ '--d': '1.2s' }} />
      <rect x="400" y="70" width="80" height="52" rx="14" fill="var(--amber)" />
      <text x="440" y="105" textAnchor="middle" fontSize="24" fontWeight="800" fill="var(--ink)" style={DISPLAY}>{'{Ai}'}</text>

      <g className="anim-float" style={{ '--d': '0.4s', '--dur': '4.5s' }}>
        <rect x="204" y="48" width="76" height="52" rx="8" fill="var(--surface)" stroke="var(--line)" />
        <path d="M204 54 L242 82 L280 54" fill="none" stroke="var(--teal)" strokeWidth="2.2" strokeLinejoin="round" />
      </g>
    </svg>
  );
}
