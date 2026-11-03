import { useEffect, useRef, useState } from 'react';

// Home page story: four steps from disconnected systems to approved, recorded AI actions.
// The diagram stays pinned while the steps scroll past; the step nearest the middle of the screen drives it.
// Without IntersectionObserver every step simply shows the final, connected picture.

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
    title: 'Then AI does the busywork',
    text: 'On connected data, AI drafts the invoice, matches the payment or briefs the account team. It prepares the action; it does not act alone.',
  },
  {
    title: 'A person approves, and it is recorded',
    text: 'Anything risky waits for the right person to approve the exact action. Every decision is signed and kept, so audit is a search, not a scramble.',
  },
];

const NODES = [
  { id: 'sf', label: 'Salesforce', x: 90, y: 70 },
  { id: 'sap', label: 'SAP', x: 430, y: 70 },
  { id: 'wd', label: 'Workday', x: 90, y: 330 },
  { id: 'sn', label: 'ServiceNow', x: 430, y: 330 },
];
const HUB = { x: 260, y: 200 };

// Visible from step `from` (inclusive) to step `to` (inclusive).
const on = (step, from, to = 3) => step >= from && step <= to;

function Diagram({ step }) {
  const show = (from, to) => ({ opacity: on(step, from, to) ? 1 : 0 });
  return (
    <svg className="story-svg" viewBox="0 0 520 400" role="img"
      aria-label={`Step ${step + 1} of 4: ${STEPS[step].title}`}>
      {/* Step 1: a person retyping between systems, and the spreadsheet in the middle */}
      <g className="story-fade" style={show(0, 0)}>
        <path className="story-rekey" d="M150 78 C 240 30, 300 30, 380 78" />
        <path className="story-rekey" d="M150 322 C 220 270, 300 270, 372 322" />
        <path className="story-rekey" d="M95 105 L 95 295" />
        <g transform="translate(222 172)">
          <rect width="76" height="56" rx="6" className="story-sheet" />
          {[0, 1, 2, 3].map((r) => <line key={r} x1="8" x2="68" y1={14 + r * 11} y2={14 + r * 11} className="story-sheet-line" />)}
          <text x="38" y="74" textAnchor="middle" className="story-note">month-end.xlsx</text>
        </g>
        <text x="260" y="26" textAnchor="middle" className="story-note warn">retyped by hand</text>
      </g>

      {/* Step 2 onward: every system wired to one layer, with data moving */}
      <g className="story-fade" style={show(1)}>
        {NODES.map((n) => (
          <g key={n.id}>
            <line x1={n.x} y1={n.y} x2={HUB.x} y2={HUB.y} className="story-wire" />
            <circle r="4" className="story-packet">
              <animateMotion dur="2.4s" repeatCount="indefinite" path={`M${n.x} ${n.y} L${HUB.x} ${HUB.y}`} />
            </circle>
          </g>
        ))}
      </g>

      {/* The hub: the CAID layer, which becomes {Ai} once AI joins */}
      <g className="story-fade" style={show(1)}>
        <circle cx={HUB.x} cy={HUB.y} r="44" className={`story-hub${step >= 2 ? ' ai' : ''}`} />
        <text x={HUB.x} y={HUB.y + 6} textAnchor="middle" className="story-hub-label">{step >= 2 ? '{Ai}' : 'CAID'}</text>
        <text x={HUB.x} y={HUB.y + 64} textAnchor="middle" className="story-note">{step >= 2 ? 'prepares actions' : 'integration layer'}</text>
      </g>

      {/* Step 3 onward: a proposed action heading to SAP */}
      <g className="story-fade story-slide" style={{ ...show(2), transform: step >= 2 ? 'none' : 'translate(-30px, 20px)' }}>
        <g transform="translate(292 112)">
          <rect width="150" height="40" rx="8" className={`story-action${step >= 3 ? ' ok' : ''}`} />
          <text x="12" y="17" className="story-action-t">Post invoice in SAP</text>
          <text x="12" y="31" className="story-action-s">{step >= 3 ? 'Approved, sent' : 'Held for approval'}</text>
        </g>
      </g>

      {/* Step 4: the approval and the signed record */}
      <g className="story-fade story-slide" style={{ ...show(3), transform: step >= 3 ? 'none' : 'translateY(16px)' }}>
        <g transform="translate(60 168)">
          <rect width="128" height="64" rx="10" className="story-card" />
          <circle cx="22" cy="24" r="10" className="story-check" />
          <path d="M17 24 l4 4 l7 -8" className="story-check-mark" />
          <text x="40" y="22" className="story-card-t">Finance lead</text>
          <text x="40" y="36" className="story-card-s">approved</text>
          <text x="14" y="54" className="story-card-s">exact amount and vendor</text>
        </g>
        <g transform="translate(300 250)">
          <rect width="150" height="38" rx="8" className="story-receipt" />
          <text x="12" y="16" className="story-card-t">Signed record</text>
          <text x="12" y="30" className="story-mono">sha256 9f2c…a71e</text>
        </g>
      </g>

      {/* The systems themselves, always on top */}
      {NODES.map((n) => (
        <g key={n.id} transform={`translate(${n.x} ${n.y})`}>
          <rect x="-54" y="-17" width="108" height="34" rx="17" className={`story-node${step >= 1 ? ' linked' : ''}`} />
          <text y="5" textAnchor="middle" className="story-node-t">{n.label}</text>
          {n.id === 'sap' && (
            <circle cx="50" cy="-14" r="7" className="story-done" style={show(3)} />
          )}
        </g>
      ))}
    </svg>
  );
}

export default function ScrollStory() {
  const [step, setStep] = useState(0);
  const refs = useRef([]);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') {
      setStep(STEPS.length - 1);
      return undefined;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setStep(Number(e.target.dataset.step));
        });
      },
      // The step that crosses a thin band drives the diagram. On phones the pinned diagram covers the top half,
      // so the band sits lower, under it.
      { rootMargin: window.matchMedia('(max-width: 860px)').matches ? '-58% 0px -32% 0px' : '-30% 0px -60% 0px' },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="story">
      <div className="story-visual">
        <div className="story-frame art-dark">
          <Diagram step={step} />
          <ol className="story-dots" aria-hidden="true">
            {STEPS.map((s, i) => <li key={s.title} className={i === step ? 'on' : i < step ? 'done' : ''} />)}
          </ol>
        </div>
      </div>
      <ol className="story-steps">
        {STEPS.map((s, i) => (
          <li key={s.title} data-step={i} ref={(el) => { refs.current[i] = el; }} className={i === step ? 'on' : ''}>
            <span className="story-n">{String(i + 1).padStart(2, '0')}</span>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
