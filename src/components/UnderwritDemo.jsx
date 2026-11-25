import { useEffect, useRef, useState } from 'react';
import { track } from '../utils/track.js';

// A self-contained, scripted walkthrough of what Underwrit does with a risky agent action.
// Nothing here calls a real system: the agent, the approvers and the record are sample data.

const ACTION = {
  agent: 'billing-agent',
  tool: 'stripe.refunds.create',
  args: [['customer', 'cus_8Q2…41'], ['amount', '$4,800.00'], ['reason', 'duplicate charge']],
  policy: 'Refunds over $1,000 need two named approvers',
};

// A short, stable-looking digest, so the record reads like a real one without pretending to be.
function digest(text) {
  let h = 2166136261;
  for (let i = 0; i < text.length; i += 1) h = Math.imul(h ^ text.charCodeAt(i), 16777619);
  const hex = (h >>> 0).toString(16).padStart(8, '0');
  return `${hex}${hex.split('').reverse().join('')}`;
}

export default function UnderwritDemo() {
  // idle → held → second (first approval in, waiting for the second) → sealed | refused
  const [state, setState] = useState('idle');
  const [time, setTime] = useState('');
  const timer = useRef(0);

  useEffect(() => () => clearTimeout(timer.current), []);

  const start = () => { setState('held'); track('demo', { demo: 'underwrit', step: 'start' }); };
  const approve = () => {
    setState('second');
    track('demo', { demo: 'underwrit', step: 'approve' });
    timer.current = setTimeout(() => {
      setTime(new Date().toISOString().slice(0, 19).replace('T', ' '));
      setState('sealed');
    }, 1400);
  };
  const deny = () => {
    setTime(new Date().toISOString().slice(0, 19).replace('T', ' '));
    setState('refused');
    track('demo', { demo: 'underwrit', step: 'deny' });
  };
  const reset = () => { clearTimeout(timer.current); setState('idle'); };

  const done = state === 'sealed' || state === 'refused';
  const decision = state === 'sealed' ? 'allowed' : 'refused';

  return (
    <div className="uw-demo">
      <div className="uw-demo-head">
        <span className="pill warn">Interactive demo</span>
        <span className="small muted">Sample data. No real systems are called.</span>
      </div>

      <ol className="uw-track" aria-label="Progress">
        {['Agent asks', 'Policy holds', 'People approve', 'Record sealed'].map((label, i) => {
          const reached = { idle: 0, held: 1, second: 2, sealed: 3, refused: 3 }[state] >= i;
          return <li key={label} className={reached ? 'on' : ''}>{label}</li>;
        })}
      </ol>

      <div className="uw-card" aria-live="polite">
        <div className="uw-row">
          <span className="uw-agent">{ACTION.agent}</span>
          <span className="small muted">wants to call</span>
          <code>{ACTION.tool}</code>
        </div>
        <dl className="uw-args">
          {ACTION.args.map(([k, v]) => <div key={k}><dt>{k}</dt><dd className="mono">{v}</dd></div>)}
        </dl>

        {state === 'idle' && (
          <button type="button" className="btn btn-primary" onClick={start}>Send the action</button>
        )}

        {state !== 'idle' && (
          <div className={`uw-hold${done ? ' closed' : ''}`}>
            <strong>Held by policy.</strong> {ACTION.policy}.
          </div>
        )}

        {state === 'held' && (
          <div className="uw-actions">
            <p className="small">You are the first approver, Finance lead. You are approving these exact arguments.</p>
            <button type="button" className="btn btn-primary" onClick={approve}>Approve</button>
            <button type="button" className="btn btn-ghost" onClick={deny}>Deny</button>
          </div>
        )}

        {state === 'second' && (
          <p className="uw-wait"><span className="uw-spinner" aria-hidden="true" /> Approved by you. Waiting for the second approver in Slack…</p>
        )}

        {done && (
          <div className={`uw-receipt ${decision}`}>
            <div className="uw-receipt-head">
              <strong>{state === 'sealed' ? 'Allowed and sealed' : 'Refused and sealed'}</strong>
              <span className="mono small">{time} UTC</span>
            </div>
            <dl className="uw-args">
              <div><dt>decision</dt><dd className="mono">{decision}</dd></div>
              <div><dt>approvers</dt><dd className="mono">{state === 'sealed' ? 'finance-lead, controller' : 'finance-lead (denied)'}</dd></div>
              <div><dt>record</dt><dd className="mono">sha256:{digest(ACTION.tool + decision + time)}…</dd></div>
              <div><dt>signature</dt><dd className="mono">signed, verifiable offline</dd></div>
            </dl>
            <button type="button" className="link-btn" onClick={reset}>Run it again</button>
          </div>
        )}
      </div>
    </div>
  );
}
