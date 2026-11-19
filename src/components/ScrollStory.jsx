import { useEffect, useRef, useState } from 'react';

// Home page story: four steps from disconnected systems to an agent's action, approved and recorded.
// The steps sit beside the diagram as a stepper: it plays on its own, pauses while the visitor hovers or
// focuses it, and any step can be picked directly. With reduced motion it waits on the last step.

const STEPS = [
  {
    title: "Today, your systems don't talk",
    text: 'Orders are retyped from Salesforce into SAP, customer records drift apart, and month-end runs on a spreadsheet.',
  },
  {
    title: 'We connect them once',
    text: 'One integration layer moves each order, customer and invoice once, with retries, monitoring and a trail you can audit.',
  },
  {
    title: 'An agent does the busywork',
    text: 'On connected data, an agent matches the invoice to the order and the receipt, and prepares the posting. It does not act alone.',
  },
  {
    title: 'A person approves, and it is recorded',
    text: 'The finance lead approves the exact amount and vendor. The posting runs in SAP and a signed record is kept, so audit is a search.',
  },
];

const SYSTEMS = [
  { id: 'sf', label: 'Salesforce', sub: 'orders', y: 34 },
  { id: 'sap', label: 'SAP', sub: 'invoices', y: 112 },
  { id: 'wd', label: 'Workday', sub: 'approvers', y: 190 },
  { id: 'sn', label: 'ServiceNow', sub: 'cases', y: 268 },
];
const SYS_X = 22;
const SYS_W = 140;
const SYS_H = 52;
const HUB = { x: 290, y: 175 };
const ACT = { x: 392, y: 34 };

// Visible from step `from` (inclusive) to step `to` (inclusive).
const on = (step, from, to = 3) => step >= from && step <= to;

function Diagram({ step }) {
  const show = (from, to) => ({ opacity: on(step, from, to) ? 1 : 0 });
  const rise = (from) => ({ opacity: step >= from ? 1 : 0, transform: step >= from ? 'none' : 'translateY(10px)' });
  const posted = step >= 3;
  return (
    <svg className="story-svg" viewBox="0 0 560 350" role="img" aria-label={`Step ${step + 1} of 4: ${STEPS[step].title}`}>
      {/* Step 1: retyping by hand between systems, through a spreadsheet */}
      <g className="story-fade" style={show(0, 0)}>
        <path className="story-rekey" d={`M${SYS_X + SYS_W} 60 C 250 60, 250 138, ${SYS_X + SYS_W} 138`} />
        <path className="story-rekey" d={`M${SYS_X + SYS_W} 216 C 250 216, 250 294, ${SYS_X + SYS_W} 294`} />
        <g transform="translate(250 146)">
          <rect width="84" height="60" rx="8" className="story-sheet" />
          {[0, 1, 2, 3].map((r) => <line key={r} x1="10" x2="74" y1={15 + r * 11} y2={15 + r * 11} className="story-sheet-line" />)}
          <text x="42" y="80" textAnchor="middle" className="story-note">month-end.xlsx</text>
        </g>
        <text x="420" y="160" textAnchor="middle" className="story-note warn">retyped by hand</text>
        <text x="420" y="178" textAnchor="middle" className="story-note">3 copies of every customer</text>
      </g>

      {/* Step 2 onward: every system wired into one layer, with data moving */}
      <g className="story-fade" style={show(1)}>
        {SYSTEMS.map((s, i) => {
          const d = `M${SYS_X + SYS_W} ${s.y + SYS_H / 2} C ${HUB.x - 70} ${s.y + SYS_H / 2}, ${HUB.x - 60} ${HUB.y}, ${HUB.x - 46} ${HUB.y}`;
          return (
            <g key={s.id}>
              <path d={d} className="story-wire" />
              <circle r="3.5" className="story-packet">
                <animateMotion dur="2.6s" begin={`${i * 0.5}s`} repeatCount="indefinite" path={d} />
              </circle>
            </g>
          );
        })}
      </g>

      {/* The hub: the integration layer, which becomes an agent once AI joins */}
      <g className="story-fade" style={show(1)}>
        <circle cx={HUB.x} cy={HUB.y} r="58" className="story-halo" />
        <rect x={HUB.x - 44} y={HUB.y - 44} width="88" height="88" rx="24" className={`story-hub${step >= 2 ? ' ai' : ''}`} />
        <text x={HUB.x} y={HUB.y + 6} textAnchor="middle" className="story-hub-label">{step >= 2 ? '{Ai}' : 'CAID'}</text>
        <text x={HUB.x} y={HUB.y + 66} textAnchor="middle" className="story-note">{step >= 2 ? 'agent' : 'integration layer'}</text>
      </g>

      {/* Step 3 onward: the action the agent prepared */}
      <g className="story-slide" style={rise(2)}>
        <path d={`M${HUB.x + 44} ${HUB.y - 20} C ${HUB.x + 70} ${HUB.y - 20}, ${ACT.x - 30} 90, ${ACT.x} 90`} className="story-wire amber" />
        <g transform={`translate(${ACT.x} ${ACT.y})`}>
          <rect width="156" height="136" rx="12" className={`story-action${posted ? ' ok' : ''}`} />
          <text x="14" y="24" className="story-action-t">Post invoice</text>
          <text x="14" y="39" className="story-mono dim">INV-2041</text>
          {[['Vendor', 'Northwind'], ['Amount', '$12,480.00'], ['Matches', 'PO-7712']].map(([k, v], i) => (
            <g key={k} transform={`translate(14 ${60 + i * 17})`}>
              <text className="story-card-s">{k}</text>
              <text x="128" textAnchor="end" className="story-card-v">{v}</text>
            </g>
          ))}
          <rect x="14" y="106" width="128" height="18" rx="9" className={`story-status${posted ? ' ok' : ''}`} />
          <text x="78" y="119" textAnchor="middle" className="story-status-t">{posted ? 'Posted in SAP' : 'Waiting for approval'}</text>
        </g>
      </g>

      {/* Step 4: the approval and the signed record */}
      <g className="story-slide" style={rise(3)}>
        <g transform={`translate(${ACT.x} 190)`}>
          <rect width="156" height="56" rx="12" className="story-card" />
          <circle cx="26" cy="29" r="13" className="story-check" />
          <path d="M20 29 l4 4 l8 -9" className="story-check-mark" />
          <text x="48" y="26" className="story-card-t">Finance lead</text>
          <text x="48" y="41" className="story-card-s">approved the values</text>
        </g>
        <g transform={`translate(${ACT.x} 260)`}>
          <rect width="156" height="62" rx="12" className="story-receipt" />
          <text x="14" y="24" className="story-card-t">Signed record</text>
          <text x="14" y="42" className="story-mono">sha256 9f2c…a71e</text>
          <text x="14" y="55" className="story-card-s">request · values · approver</text>
        </g>
      </g>

      {/* The systems themselves, always on top */}
      {SYSTEMS.map((s) => (
        <g key={s.id} transform={`translate(${SYS_X} ${s.y})`}>
          <rect width={SYS_W} height={SYS_H} rx="12" className={`story-node${step >= 1 ? ' linked' : ''}`} />
          <rect x="12" y="14" width="24" height="24" rx="7" className="story-node-chip" />
          <text x="46" y="24" className="story-node-t">{s.label}</text>
          <text x="46" y="39" className="story-node-s">{s.sub}</text>
          {s.id === 'sap' && <circle cx={SYS_W - 14} cy="14" r="5" className="story-done" style={show(3)} />}
        </g>
      ))}
    </svg>
  );
}

const STEP_MS = 4200;

export default function ScrollStory() {
  const [step, setStep] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [still, setStill] = useState(false);
  const ref = useRef(null);

  // Reduced motion: no autoplay, and the finished picture first.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) { setStill(true); setStep(STEPS.length - 1); }
  }, []);

  // Play only while the story is on screen.
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return undefined;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (still || paused || !visible) return undefined;
    const t = setTimeout(() => setStep((s) => (s + 1) % STEPS.length), step === STEPS.length - 1 ? STEP_MS * 1.6 : STEP_MS);
    return () => clearTimeout(t);
  }, [step, still, paused, visible]);

  return (
    <div className="story" ref={ref} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
      <ol className="story-steps">
        {STEPS.map((s, i) => (
          <li key={s.title} className={i === step ? 'on' : i < step ? 'done' : ''}>
            <button type="button" aria-current={i === step ? 'step' : undefined} onClick={() => setStep(i)}>
              <span className="story-n">{String(i + 1).padStart(2, '0')}</span>
              <span className="story-copy">
                <span className="story-title">{s.title}</span>
                <span className="story-text">{s.text}</span>
              </span>
              <span className="story-bar" aria-hidden="true"><i style={{ animationDuration: `${step === STEPS.length - 1 ? STEP_MS * 1.6 : STEP_MS}ms`, animationPlayState: paused || !visible || still ? 'paused' : 'running' }} key={`${i}-${step}`} /></span>
            </button>
          </li>
        ))}
      </ol>
      <div className="story-visual">
        <div className="story-frame art-dark">
          <Diagram step={step} />
        </div>
      </div>
    </div>
  );
}
