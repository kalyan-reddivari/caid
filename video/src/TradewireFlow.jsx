import { useCurrentFrame } from 'remotion';
import { C, Caption, Card, Check, DISPLAY, Label, MONO, Pill, Stage, Title, Wire, lerp, useIn, useOut } from './kit.jsx';

// Products: Tradewire in 18 seconds. Two companies sign one agreement, Acme's agent opens an incident
// at its provider through the broker, Northwind's edge checks it again and raises it in Jira, and both
// keep one shared record that verifies with public keys alone.

const STEPS = [
  [0, 'Agree', 'Both companies sign what their agents may ask each other.'],
  [130, 'Ask', 'Acme’s agent opens an incident at its provider.'],
  [250, 'Check', 'The broker and Northwind’s own edge each check it.'],
  [380, 'Record', 'Both companies keep one signed record.'],
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

function Company({ x, name, role, system, show, agentGlow }) {
  return (
    <Card x={x} y={80} w={300} h={470} show={show} style={{ padding: 24 }}>
      <Label size={15}>{role}</Label>
      <Title size={28} style={{ margin: '4px 0 20px' }}>{name}</Title>
      <div style={{ display: 'grid', gap: 12 }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', padding: 12, borderRadius: 12, background: C.ink3, border: `2px solid ${agentGlow ? C.amber : C.line}` }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: C.amber, color: C.ink, display: 'grid', placeItems: 'center', fontFamily: DISPLAY, fontWeight: 800, fontSize: 15 }}>{'{Ai}'}</div>
          <div><Label color={C.text} weight={700}>Service agent</Label><Label size={14}>signed Agent Card</Label></div>
        </div>
        <div style={{ padding: 12, borderRadius: 12, background: C.ink3, border: `2px solid ${C.line}` }}>
          <Label color={C.text} weight={700}>Own edge</Label><Label size={14}>own policy, approvals, audit</Label>
        </div>
        <div style={{ padding: 12, borderRadius: 12, background: C.ink3, border: `2px solid ${C.line}` }}>
          <Label color={C.text} weight={700}>{system}</Label><Label size={14}>where the work lands</Label>
        </div>
      </div>
    </Card>
  );
}

export default function TradewireFlow() {
  const f = useCurrentFrame();
  const out = useOut(515, 540);
  const cos = useIn(4);
  const doc = useIn(20);
  const sigA = lerp(f, 50, 66, 0, 1);
  const sigB = lerp(f, 80, 96, 0, 1);
  const inForce = useIn(100);
  const task = useIn(140);
  const taskX = lerp(f, 150, 230, 0, 1);
  const checks = [useIn(255), useIn(275), useIn(295)];
  const cred = useIn(320);
  const jira = useIn(350);
  const rec = useIn(385);
  const entries = Math.floor(lerp(f, 395, 470, 0, 5));
  const verified = useIn(480);
  const cap = useCaption();
  const agreementFade = lerp(f, 125, 140, 1, 0);

  return (
    <Stage>
      <div style={{ position: 'absolute', inset: 0, opacity: out }}>
        <Company x={60} name="Acme Corp" role="Client" system="ServiceNow" show={cos} agentGlow={f > 130 && f < 240} />
        <Company x={920} name="Northwind" role="Managed service provider" system="Jira Service Management" show={cos} agentGlow={false} />

        {/* Broker header */}
        <div style={{ position: 'absolute', left: 400, top: 82, width: 480, textAlign: 'center', opacity: cos }}>
          <Title size={24} color={C.amber}>Tradewire</Title>
          <Label size={15}>neutral broker · holds no credentials to anyone’s systems</Label>
        </div>

        {/* Step 1: the agreement */}
        <Card x={430} y={160} w={420} h={260} show={doc * agreementFade} border={inForce > 0.5 ? C.tealLight : C.line}>
          <Title size={22}>Agreement · itsm.v1</Title>
          <Label size={16} style={{ margin: '6px 0 14px' }}>Acme may open incidents, up to 30 per hour. Contact details never cross.</Label>
          {[['Acme Corp', sigA], ['Northwind', sigB]].map(([n, s]) => (
            <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
              <Check size={28} show={s} />
              <Label color={C.text} weight={600}>{n}</Label>
              <svg width="150" height="24"><path d="M4 16 C 30 2, 40 26, 70 12 S 120 4, 146 14" fill="none" stroke={C.tealLight} strokeWidth="2.5" strokeDasharray="200" strokeDashoffset={200 * (1 - s)} /></svg>
            </div>
          ))}
          <Pill tone="teal" show={inForce}>Version 1 in force</Pill>
        </Card>

        {/* Step 2–3: the task crossing */}
        <Wire from={[360, 210]} to={[920, 210]} progress={lerp(f, 140, 160, 0, 1)} color={C.amber} dashed packet={false} />
        <div style={{ position: 'absolute', left: 360 + taskX * 380, top: 176, opacity: task * lerp(f, 370, 385, 1, 0), transform: `scale(${0.8 + task * 0.2})` }}>
          <div style={{ padding: '10px 16px', borderRadius: 12, background: '#2b2412', border: `2px solid ${C.amber}`, fontFamily: MONO, fontSize: 17 }}>incident.open · P2</div>
        </div>
        <div style={{ position: 'absolute', left: 430, top: 260, width: 420, display: 'grid', gap: 10, opacity: lerp(f, 370, 385, 1, 0) }}>
          {['Agent Card and identity verified', 'Allowed by agreement v1, within limits', 'Caller phone and email removed'].map((t, i) => (
            <div key={t} style={{ display: 'flex', gap: 12, alignItems: 'center', opacity: checks[i], transform: `translateX(${(1 - checks[i]) * -16}px)` }}>
              <Check size={26} show={checks[i]} /><Label color={C.text} size={18}>{t}</Label>
            </div>
          ))}
          <div style={{ opacity: cred, marginTop: 6 }}>
            <Pill>Task credential · this task only · 2 minutes · used once</Pill>
          </div>
        </div>
        <div style={{ position: 'absolute', left: 944, top: 470, width: 252, opacity: jira * lerp(f, 370, 385, 1, 0) }}>
          <Pill tone="teal">Raised as NW-101</Pill>
        </div>

        {/* Step 4: the shared record */}
        <Card x={400} y={150} w={480} h={380} show={rec} border={C.tealLight}>
          <Title size={22}>Shared record</Title>
          <Label size={15} style={{ marginBottom: 12 }}>each entry signed by the broker, Acme and Northwind</Label>
          {['Agreement v1 signed', 'Task requested by Acme', 'Checked and delivered', 'Raised in Jira NW-101', 'Update posted to ServiceNow'].map((t, i) => (
            <div key={t} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '7px 0', borderTop: `1px solid ${C.line}`, opacity: i < entries ? 1 : 0.12 }}>
              <Label color={C.text} size={17}>{t}</Label>
              <span style={{ display: 'flex', gap: 6 }}>{[C.amber, C.tealLight, C.tealLight].map((c, k) => <span key={k} style={{ width: 11, height: 11, borderRadius: '50%', background: c }} />)}</span>
            </div>
          ))}
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginTop: 10, opacity: verified }}>
            <Check size={26} show={verified} /><Label color={C.tealLight} weight={700}>Verified with public keys only</Label>
          </div>
        </Card>
      </div>
      <Caption {...cap} show={cap.show * out} />
    </Stage>
  );
}
