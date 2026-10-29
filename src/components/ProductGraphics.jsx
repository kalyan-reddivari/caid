// Illustrations for the Products page: Underwrit and Orbitward.
// Same conventions as Graphics.jsx (inline SVG, CSS variables, reduced-motion safe).

import { Rotate, Wire } from './Graphics.jsx';

const FONT = { fontFamily: 'var(--font-body)' };
const DISPLAY = { fontFamily: 'var(--font-display)' };
const MONO = { fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace' };
// Text and solid shapes take these tokens, so a dark panel (.art-dark) can recolour them.
const FG = 'var(--art-fg, var(--ink))';
const SOLID = 'var(--art-solid, var(--ink))';

// A shield with a tick: Underwrit's gate.
function Shield({ x, y, s = 1, fill = SOLID, tick = 'var(--amber)' }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M0 -20 L16 -14 V-2 C16 9 9 15 0 19 C-9 15 -16 9 -16 -2 V-14 Z" fill={fill} />
      <path d="M-6 0 l4 4 l8 -9" fill="none" stroke={tick} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
}

/* -------------------------------------------------------------------------
   Underwrit: an agent's actions pass the gate, are allowed, held or refused,
   and every decision is sealed into a signed record
   ------------------------------------------------------------------------- */
const ACTIONS = [
  { call: 'send_email', verdict: 'Allowed', fill: 'var(--teal)', text: '#fff' },
  { call: 'refund $4.8k', verdict: 'Held', fill: 'var(--amber)', text: 'var(--ink)' },
  { call: 'drop_table', verdict: 'Refused', fill: 'var(--danger)', text: '#fff' },
];
const TOOLS = ['Email', 'Payments', 'Kubernetes', 'Database'];

export function UnderwritArt() {
  const rowY = (i) => 160 + i * 44;
  const toolY = (i) => 112 + i * 52;
  return (
    <svg className="art" viewBox="0 0 520 420" role="img"
      aria-label="Underwrit sits between an AI agent and its tools: a routine email is allowed, a large refund is held for two approvers, a destructive database call is refused, and every decision becomes a signed record">
      <circle className="anim-breathe svg-box" cx="260" cy="210" r="175" fill="var(--teal-wash)" opacity=".6" />

      {/* the agent */}
      <Wire d="M100 205 H172" speed={2.2} />
      <g className="anim-float" style={{ '--dur': '5s' }}>
        <circle cx="64" cy="205" r="36" fill={SOLID} />
        <path d="M64 186 l3.5 8 l8 3.5 l-8 3.5 l-3.5 8 l-3.5 -8 l-8 -3.5 l8 -3.5 Z" fill="var(--amber)" />
        <text x="64" y="225" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#fff" style={FONT}>AI agent</text>
      </g>

      {/* wires from the gate to the tools: allowed flows, held waits, refused stops */}
      <Wire d={`M342 ${rowY(0)} C 372 ${rowY(0)}, 380 ${toolY(0)}, 412 ${toolY(0)}`} tone="teal" speed={2.4} delay={0.6} />
      <path d={`M342 ${rowY(1)} C 372 ${rowY(1)}, 380 ${toolY(1)}, 412 ${toolY(1)}`} fill="none" stroke="var(--amber)" strokeWidth="2" strokeDasharray="3 6" className="flow" />
      <path d={`M342 ${rowY(2)} H360`} fill="none" stroke="var(--danger)" strokeWidth="2" />
      <path d={`M362 ${rowY(2) - 6} l12 12 M374 ${rowY(2) - 6} l-12 12`} stroke="var(--danger)" strokeWidth="2.4" strokeLinecap="round" />

      {/* two approvers on the held action */}
      {[0, 1].map((k) => (
        <g key={k} className="blink" style={{ '--d': `${k * 0.8}s` }}>
          <circle cx={372 + k * 22} cy={rowY(1) + 28} r="9" fill="var(--surface)" stroke="var(--amber)" strokeWidth="2" />
          <circle cx={372 + k * 22} cy={rowY(1) + 25.5} r="2.8" fill="var(--amber)" />
          <path d={`M${366 + k * 22} ${rowY(1) + 33} c1 -4 11 -4 12 0`} fill="var(--amber)" />
        </g>
      ))}

      {TOOLS.map((t, i) => (
        <g key={t}>
          <rect x="412" y={toolY(i) - 17} width="94" height="34" rx="9" fill="var(--surface)" stroke="var(--line)" />
          <text x="459" y={toolY(i) + 4.5} textAnchor="middle" fontSize="12" fontWeight="600" fill={FG} style={FONT}>{t}</text>
        </g>
      ))}

      {/* the gate */}
      <rect x="172" y="104" width="170" height="194" rx="16" fill="var(--surface)" stroke="var(--line)" />
      <Shield x={196} y={130} s={0.7} />
      <text x="212" y="135" fontSize="15" fontWeight="800" fill={FG} style={DISPLAY}>Underwrit</text>
      {ACTIONS.map((a, i) => (
        <g key={a.call} className="uw-row" style={{ '--i': i }}>
          <rect x="184" y={rowY(i) - 16} width="146" height="32" rx="8" fill="var(--paper)" />
          <text x="193" y={rowY(i) + 4} fontSize="10" fontWeight="600" fill={FG} style={MONO}>{a.call}</text>
          <rect x="274" y={rowY(i) - 10} width="52" height="20" rx="10" fill={a.fill} />
          <text x="300" y={rowY(i) + 4} textAnchor="middle" fontSize="10" fontWeight="700" fill={a.text} style={FONT}>{a.verdict}</text>
        </g>
      ))}

      {/* every decision sealed into a signed record */}
      <path d="M257 298 V326" fill="none" stroke="var(--teal)" strokeWidth="2" className="flow" />
      <g className="anim-float" style={{ '--dur': '6s', '--d': '1s' }}>
        <rect x="150" y="326" width="214" height="56" rx="12" fill={SOLID} />
        <circle className="ring" cx="180" cy="354" r="15" fill="none" stroke="var(--amber)" strokeWidth="2" />
        <circle cx="180" cy="354" r="15" fill="var(--amber)" />
        <path d="M174 354 l4 4 l8 -9" fill="none" stroke="var(--ink)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        <text x="205" y="350" fontSize="12.5" fontWeight="700" fill="#fff" style={FONT}>Signed record</text>
        <text x="205" y="367" fontSize="10" fontWeight="500" fill="#aab4c8" style={MONO}>ed25519 · 9f3a…c21e</text>
      </g>
    </svg>
  );
}

/* -------------------------------------------------------------------------
   Orbitward: seven pillars orbiting the platform, with agents passing a policy gate
   ------------------------------------------------------------------------- */
const PILLARS = ['Governance', 'Agents', 'Delivery', 'Incidents', 'Observatory', 'FinOps', 'Dev portal'];

export function OrbitwardArt() {
  const cx = 260;
  const cy = 210;
  const R = 158;
  return (
    <svg className="art" viewBox="0 0 520 420" role="img"
      aria-label="Orbitward: seven platform pillars orbiting the platform core, with AI agents passing a policy gate">
      <circle className="anim-breathe svg-box" cx={cx} cy={cy} r="186" fill="var(--amber-wash)" opacity=".7" />
      <circle className="flow" cx={cx} cy={cy} r={R} fill="none" stroke={FG} strokeOpacity=".35" strokeWidth="1.5" />
      <circle cx={cx} cy={cy} r="88" fill="none" stroke="var(--teal)" strokeOpacity=".55" strokeWidth="2" strokeDasharray="3 7" />

      {/* agents travelling the inner orbit, through the gate at the top */}
      <Rotate cx={cx} cy={cy} dur={8}>
        <circle cx={cx} cy={cy + 88} r="7" fill="var(--teal)" />
        <circle cx={cx - 76} cy={cy - 44} r="5.5" fill="var(--amber)" />
      </Rotate>
      <g>
        <circle className="ring" cx={cx} cy={cy - 88} r="15" fill="none" stroke="var(--teal)" strokeWidth="2" />
        <path d={`M${cx} ${cy - 106} l14 5 v8 c0 7 -6 11 -14 14 c-8 -3 -14 -7 -14 -14 v-8 Z`} fill={SOLID} />
        <path d={`M${cx - 5} ${cy - 92} l3.5 3.5 l6.5 -7`} fill="none" stroke="var(--amber)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <text x={cx + 24} y={cy - 86} fontSize="11" fontWeight="700" fill={FG} style={FONT}>policy gate</text>
      </g>

      {/* the seven pillars, slowly orbiting with their labels kept upright */}
      <Rotate cx={cx} cy={cy} dur={70}>
        {PILLARS.map((p, i) => {
          const a = (-90 + (360 / PILLARS.length) * i) * (Math.PI / 180);
          const x = cx + R * Math.cos(a);
          const y = cy + R * Math.sin(a);
          const w = p.length * 7.4 + 26;
          return (
            <g key={p} transform={`translate(${x} ${y})`}>
              <Rotate dur={70} reverse>
                <rect x={-w / 2} y="-15" width={w} height="30" rx="15"
                  fill={i === 1 ? 'var(--amber)' : 'var(--surface)'} stroke={i === 1 ? 'var(--amber)' : 'var(--line)'} />
                <text y="4.5" textAnchor="middle" fontSize="12" fontWeight="600" fill={i === 1 ? 'var(--ink)' : FG} style={FONT}>{p}</text>
              </Rotate>
            </g>
          );
        })}
      </Rotate>

      <circle cx={cx} cy={cy} r="52" fill={SOLID} />
      <text x={cx} y={cy + 2} textAnchor="middle" fontSize="15" fontWeight="800" fill="#fff" style={DISPLAY}>Orbitward</text>
      <rect x={cx - 20} y={cy + 12} width="40" height="17" rx="8.5" fill="var(--amber)" />
      <text x={cx} y={cy + 24.5} textAnchor="middle" fontSize="10" fontWeight="700" fill="var(--ink)" style={FONT}>Beta</text>
    </svg>
  );
}

/* -------------------------------------------------------------------------
   Products hero: both products side by side, joined through the {Ai} core
   ------------------------------------------------------------------------- */
export function ProductsHeroArt() {
  const link = 'M178 200 C 220 200, 220 200, 260 200 S 300 200, 342 200';
  return (
    <svg className="art" viewBox="0 0 520 380" role="img" aria-label="Underwrit and Orbitward, both built by CAID">
      <circle className="anim-breathe svg-box" cx="260" cy="190" r="160" fill="var(--teal-wash)" opacity=".6" />
      <path d={link} fill="none" stroke="var(--line)" strokeWidth="2" />
      <path d={link} className="packet amber" pathLength="1" fill="none" strokeWidth="4" strokeLinecap="round" style={{ '--dur': '3s' }} />

      {/* Underwrit: the gate shield above a signed record */}
      <g className="anim-float" style={{ '--dur': '6s' }}>
        <circle className="ring" cx="119" cy="160" r="56" fill="none" stroke="var(--teal)" strokeWidth="2" />
        <Shield x={119} y={160} s={3.2} />
        <rect x="64" y="248" width="110" height="46" rx="10" fill="var(--surface)" stroke="var(--line)" />
        <circle cx="86" cy="271" r="11" fill="var(--amber)" />
        <path d="M81.5 271 l3 3 l6 -6.5" fill="none" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" />
        <rect x="104" y="262" width="56" height="6" rx="3" fill={FG} />
        <rect x="104" y="274" width="40" height="5" rx="2.5" fill="var(--line)" />
      </g>
      <text x="119" y="342" textAnchor="middle" fontSize="15" fontWeight="800" fill={FG} style={DISPLAY}>Underwrit</text>

      {/* Orbitward: orbit with pillars */}
      <g transform="translate(412 192)">
        <circle r="72" fill="none" stroke={FG} strokeOpacity=".35" strokeWidth="1.5" className="flow" />
        <circle r="40" fill="none" stroke="var(--teal)" strokeOpacity=".6" strokeDasharray="3 6" />
        <Rotate dur={24}>
          {PILLARS.map((p, i) => {
            const a = ((360 / PILLARS.length) * i * Math.PI) / 180;
            return <circle key={p} cx={72 * Math.cos(a)} cy={72 * Math.sin(a)} r={i === 1 ? 9 : 7}
              fill={i === 1 ? 'var(--amber)' : 'var(--surface)'} stroke={FG} strokeWidth="1.5" />;
          })}
        </Rotate>
        <Rotate dur={7} reverse>
          <circle cx="40" cy="0" r="5" fill="var(--teal)" />
        </Rotate>
        <circle r="24" fill={SOLID} />
        <path d="M-9 0 a9 9 0 1 0 18 0 a9 9 0 1 0 -18 0" fill="none" stroke="var(--amber)" strokeWidth="2.5" />
      </g>
      <text x="412" y="342" textAnchor="middle" fontSize="15" fontWeight="800" fill={FG} style={DISPLAY}>Orbitward</text>

      <rect className="anim-pop svg-box" x="226" y="176" width="68" height="48" rx="12" fill="var(--amber)" style={{ '--dur': '4s' }} />
      <text x="260" y="207" textAnchor="middle" fontSize="22" fontWeight="800" fill="var(--ink)" style={DISPLAY}>{'{Ai}'}</text>
    </svg>
  );
}

/* -------------------------------------------------------------------------
   Agentcraft Studio: a workflow drawn as connected steps on a canvas,
   with a human review step and a run that flows through it
   ------------------------------------------------------------------------- */
const STUDIO_NODES = [
  { x: 60, y: 90, label: 'Intake', kind: 'Template' },
  { x: 210, y: 60, label: 'Look up order', kind: 'Tool' },
  { x: 210, y: 170, label: 'Policy docs', kind: 'Knowledge' },
  { x: 360, y: 115, label: 'Draft refund', kind: 'Agent' },
  { x: 360, y: 250, label: 'Human review', kind: 'Approval', amber: true },
  { x: 210, y: 300, label: 'Issue refund', kind: 'MCP action' },
];

export function AgentcraftArt() {
  const W = 120;
  const H = 46;
  const mid = (n, side) => ({ x: side === 'r' ? n.x + W : n.x, y: n.y + H / 2 });
  const link = (a, b) => {
    const p = mid(STUDIO_NODES[a], 'r');
    const q = mid(STUDIO_NODES[b], 'l');
    const back = q.x < p.x;
    return back
      ? `M${STUDIO_NODES[a].x + W / 2} ${STUDIO_NODES[a].y + H} C ${STUDIO_NODES[a].x + W / 2} ${STUDIO_NODES[a].y + 90}, ${STUDIO_NODES[b].x + W + 60} ${q.y}, ${STUDIO_NODES[b].x + W} ${q.y}`
      : `M${p.x} ${p.y} C ${p.x + 30} ${p.y}, ${q.x - 30} ${q.y}, ${q.x} ${q.y}`;
  };
  const LINKS = [[0, 1], [0, 2], [1, 3], [2, 3], [3, 4], [4, 5]];
  return (
    <svg className="art" viewBox="0 0 520 380" role="img"
      aria-label="Agentcraft Studio: a refund workflow drawn on a canvas, from intake to an order lookup and policy documents, an agent drafting the refund, a human review, and an MCP action that issues it">
      <rect x="20" y="20" width="480" height="340" rx="14" fill="none" stroke="var(--line)" strokeDasharray="3 7" />
      {Array.from({ length: 8 }).map((_, i) => Array.from({ length: 6 }).map((__, j) => (
        <circle key={`${i}-${j}`} cx={40 + i * 62} cy={40 + j * 60} r="1.4" fill="var(--line)" />
      )))}
      {LINKS.map(([a, b], k) => <Wire key={k} d={link(a, b)} speed={2.6} delay={k * 0.35} tone={b === 4 ? 'amber' : 'teal'} />)}
      {STUDIO_NODES.map((n, i) => (
        <g key={n.label} className="anim-float" style={{ '--d': `${i * 0.4}s`, '--dur': '6s' }}>
          <rect x={n.x} y={n.y} width={W} height={H} rx="9" fill={n.amber ? 'var(--amber)' : SOLID} />
          <text x={n.x + 10} y={n.y + 19} fontSize="12.5" fontWeight="700" fill={n.amber ? 'var(--ink)' : '#fff'} style={FONT}>{n.label}</text>
          <text x={n.x + 10} y={n.y + 35} fontSize="10" fill={n.amber ? 'var(--ink)' : '#9fe3da'} style={MONO}>{n.kind}</text>
        </g>
      ))}
      <g className="blink" style={{ '--d': '1s' }}>
        <rect x="390" y="320" width="100" height="24" rx="12" fill="var(--teal)" />
        <text x="440" y="336" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff" style={FONT}>Free · open source</text>
      </g>
    </svg>
  );
}

/* -------------------------------------------------------------------------
   Dryva: the same workflow rehearsed under eight kinds of failure,
   the naive version fails most of them, the fixed version passes all
   ------------------------------------------------------------------------- */
const FAULTS = ['Healthy', 'Commit then timeout', 'Duplicate delivery', 'Transient outage', 'Permission denied',
  'Worker restart', 'Timeout and duplicate', 'Reordered plan'];

export function DryvaArt() {
  // Dryva's built-in cancellation example: the first version passes 4 of 24 cases, the fixed one 24 of 24.
  const naive = [true, false, false, false, false, false, false, false];
  return (
    <svg className="art" viewBox="0 0 520 400" role="img"
      aria-label="Dryva rehearses a cancellation workflow under eight kinds of failure across three seeds. The first version passes 4 of 24 cases, failing under every kind of fault; the idempotent fixed version passes 24 of 24.">
      <text x="40" y="44" fontSize="13" fontWeight="700" fill={FG} style={DISPLAY}>Rehearsal: cancel and refund</text>
      <text x="300" y="70" textAnchor="middle" fontSize="11" fill={FG} style={FONT}>First version</text>
      <text x="430" y="70" textAnchor="middle" fontSize="11" fill={FG} style={FONT}>Fixed version</text>
      {FAULTS.map((f, i) => {
        const y = 92 + i * 36;
        return (
          <g key={f}>
            <text x="40" y={y + 5} fontSize="12" fill={FG} style={FONT}>{f}</text>
            <g className="anim-pop svg-box" style={{ '--d': `${i * 0.35}s` }}>
              <rect x="262" y={y - 12} width="76" height="24" rx="12" fill={naive[i] ? 'var(--teal)' : 'var(--danger)'} />
              <text x="300" y={y + 4} textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff" style={FONT}>{naive[i] ? 'correct' : 'fails'}</text>
            </g>
            <g className="anim-pop svg-box" style={{ '--d': `${2.8 + i * 0.35}s` }}>
              <rect x="392" y={y - 12} width="76" height="24" rx="12" fill="var(--teal)" />
              <text x="430" y={y + 4} textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff" style={FONT}>correct</text>
            </g>
          </g>
        );
      })}
      <text x="300" y="388" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--danger)" style={FONT}>4 of 24 cases</text>
      <text x="430" y="388" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--teal)" style={FONT}>24 of 24 cases</text>
    </svg>
  );
}
