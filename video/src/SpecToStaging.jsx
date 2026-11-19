import { useCurrentFrame } from 'remotion';
import { C, Caption, Card, Check, Label, MONO, Pill, Stage, Title, lerp, useIn, useOut } from './kit.jsx';

// How we build: a feature going from spec to staging. The spec is written and approved, agents split it
// into tasks and write the code with tests, a person reviews, and it ships to staging. 18 seconds.

const STEPS = [
  [0, 'Spec', 'Requirements written first, and approved by you.'],
  [110, 'Tasks', 'Agents split the spec into small, reviewable tasks.'],
  [200, 'Build', 'Code and tests written against the spec.'],
  [330, 'Review', 'An engineer reviews every change.'],
  [420, 'Ship', 'It reaches staging the same day.'],
];

function useCaption() {
  const f = useCurrentFrame();
  let i = 0;
  STEPS.forEach(([at], k) => { if (f >= at) i = k; });
  const [at, title, text] = STEPS[i];
  const next = STEPS[i + 1]?.[0] ?? 540;
  const show = Math.min(lerp(f, at, at + 14, 0, 1), lerp(f, next - 10, next, 1, 0));
  return { step: `0${i + 1}`, title, text, show };
}

const CODE = [
  ['+', 'export function needsSecondApprover(invoice) {'],
  ['+', '  return invoice.amount > 5000'],
  ['+', '    && invoice.approvals.length < 2;'],
  ['+', '}'],
  [' ', ''],
  ['+', "test('over $5,000 waits for a second approver', …)"],
];

export default function SpecToStaging() {
  const f = useCurrentFrame();
  const out = useOut(515, 540);
  const spec = useIn(4);
  const ac = [useIn(30), useIn(45), useIn(60)];
  const approved = useIn(85);
  const tasks = [useIn(115), useIn(130), useIn(145)];
  const code = useIn(200);
  const lines = Math.floor(lerp(f, 210, 290, 0, CODE.length));
  const tests = Math.floor(lerp(f, 280, 325, 0, 24));
  const review = useIn(335);
  const lgtm = useIn(380);
  const deploy = ['Build', 'Tests', 'Security scan', 'Staging'].map((_, i) => lerp(f, 425 + i * 18, 440 + i * 18, 0, 1));
  const live = useIn(500);
  const cap = useCaption();

  return (
    <Stage>
      <div style={{ position: 'absolute', inset: 0, opacity: out }}>
        {/* Spec */}
        <Card x={60} y={70} w={380} h={300} show={spec}>
          <Label size={15} style={{ fontFamily: MONO }}>specs/invoice-approval.md</Label>
          <Title size={24} style={{ margin: '8px 0 12px' }}>Invoice approval</Title>
          <Label size={18} color={C.text}>Invoices over $5,000 need a second approver.</Label>
          <div style={{ display: 'grid', gap: 8, marginTop: 14 }}>
            {['Second approver is not the first', 'Approver sees the exact amount', 'Every decision is logged'].map((t, i) => (
              <div key={t} style={{ display: 'flex', gap: 10, alignItems: 'center', opacity: ac[i] }}><Check size={22} show={ac[i]} /><Label size={16}>{t}</Label></div>
            ))}
          </div>
          <div style={{ marginTop: 14 }}><Pill tone="teal" show={approved}>Approved by product owner</Pill></div>
        </Card>

        {/* Tasks */}
        <div style={{ position: 'absolute', left: 60, top: 392, width: 380, display: 'grid', gap: 10 }}>
          {['T1 · approval rule', 'T2 · approver screen', 'T3 · audit entry'].map((t, i) => (
            <div key={t} style={{ padding: '10px 14px', borderRadius: 12, background: C.ink2, border: `2px solid ${i === 0 && f > 200 ? C.amber : C.line}`, opacity: tasks[i], transform: `translateX(${(1 - tasks[i]) * -20}px)`, display: 'flex', justifyContent: 'space-between' }}>
              <Label color={C.text} size={17}>{t}</Label>
              <Label size={15} color={i === 0 && f > 330 ? C.tealLight : C.mute}>{i === 0 && f > 330 ? 'done' : 'agent'}</Label>
            </div>
          ))}
        </div>

        {/* Code and tests */}
        <Card x={480} y={70} w={740} h={300} show={code} style={{ fontFamily: MONO }}>
          <Label size={15} style={{ fontFamily: MONO }}>src/invoices/approval.ts</Label>
          <div style={{ marginTop: 12, display: 'grid', gap: 4 }}>
            {CODE.slice(0, lines).map(([sign, line], i) => (
              <div key={i} style={{ fontSize: 18, color: sign === '+' ? '#9be3d9' : C.mute, background: sign === '+' ? 'rgba(79,209,197,.08)' : 'none', padding: '2px 8px', borderRadius: 4, whiteSpace: 'pre' }}>
                <span style={{ color: C.tealLight, marginRight: 12 }}>{sign}</span>{line}
              </div>
            ))}
          </div>
          <div style={{ position: 'absolute', left: 22, right: 22, bottom: 22 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <Label size={16} style={{ fontFamily: MONO }}>tests</Label>
              <Label size={16} color={tests === 24 ? C.tealLight : C.text} style={{ fontFamily: MONO }}>{tests}/24 passing</Label>
            </div>
            <div style={{ height: 8, borderRadius: 4, background: C.ink3 }}><div style={{ height: 8, borderRadius: 4, width: `${(tests / 24) * 100}%`, background: C.tealLight }} /></div>
          </div>
        </Card>

        {/* Review */}
        <Card x={480} y={392} w={360} h={150} show={review}>
          <Label size={15}>Pull request #214</Label>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 10 }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: C.teal, display: 'grid', placeItems: 'center', fontWeight: 800 }}>R</div>
            <div><Label color={C.text} weight={700}>Ravi · Senior engineer</Label><Label size={15}>checked against the spec</Label></div>
          </div>
          <div style={{ marginTop: 12 }}><Pill tone="teal" show={lgtm}>Approved</Pill></div>
        </Card>

        {/* Pipeline */}
        <Card x={860} y={392} w={360} h={150} show={useIn(420)}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 6 }}>
            {['Build', 'Tests', 'Scan', 'Staging'].map((s, i) => (
              <div key={s} style={{ flex: 1, textAlign: 'center' }}>
                <div style={{ height: 6, borderRadius: 3, background: C.ink3, marginBottom: 8 }}><div style={{ height: 6, borderRadius: 3, width: `${deploy[i] * 100}%`, background: i === 3 ? C.amber : C.tealLight }} /></div>
                <Label size={14} color={deploy[i] >= 1 ? C.text : C.mute}>{s}</Label>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginTop: 16, opacity: live }}>
            <Check size={26} show={live} />
            <Label color={C.tealLight} weight={700} style={{ fontFamily: MONO, fontSize: 17 }}>staging · invoices live</Label>
          </div>
        </Card>
      </div>
      <Caption {...cap} show={cap.show * out} />
    </Stage>
  );
}
