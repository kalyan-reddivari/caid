import { useCurrentFrame } from 'remotion';
import { C, Caption, Card, Check, DISPLAY, Label, MONO, Pill, Stage, Title, Wire, lerp, useIn, useOut } from './kit.jsx';

// Home: one request, start to finish. A support lead asks for a refund in Slack, the agent reads
// Salesforce and SAP, prepares the refund, policy holds it for the finance lead, and once approved
// it runs in SAP with a signed record. 18 seconds, loops cleanly.

const STEPS = [
  [0, 'Ask', 'A person asks in Slack, in plain words.'],
  [100, 'Read', 'The agent reads Salesforce and SAP as that person.'],
  [210, 'Prepare', 'It prepares the refund. Policy says this one needs approval.'],
  [320, 'Approve', 'The finance lead approves the exact amount.'],
  [420, 'Record', 'It runs in SAP, and a signed record is kept.'],
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

export default function AgentRequest() {
  const f = useCurrentFrame();
  const out = useOut(515, 540);
  const ask = useIn(6);
  const agent = useIn(90);
  const sf = useIn(110);
  const sap = useIn(130);
  const action = useIn(215);
  const hold = useIn(255);
  const approval = useIn(320);
  const pressed = lerp(f, 370, 380, 0, 1);
  const done = useIn(420);
  const receipt = useIn(445);
  const cap = useCaption();
  const typed = 'Refund order 4471, it arrived damaged.'.slice(0, Math.floor(lerp(f, 20, 70, 0, 38)));

  return (
    <Stage>
      <div style={{ position: 'absolute', inset: 0, opacity: out }}>
        {/* Slack request */}
        <Card x={64} y={96} w={360} h={170} show={ask}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: '#7c4dff', display: 'grid', placeItems: 'center', fontWeight: 800 }}>P</div>
            <div>
              <Label color={C.text} weight={700}>Priya · Support lead</Label>
              <Label size={15}>#support-escalations · Slack</Label>
            </div>
          </div>
          <div style={{ fontSize: 21, lineHeight: 1.4 }}>
            <span style={{ color: C.tealLight, fontWeight: 600 }}>@caid-agent</span> {typed}
            <span style={{ opacity: f < 75 && f % 20 < 10 ? 1 : 0 }}>▍</span>
          </div>
        </Card>

        {/* Agent */}
        <div style={{ position: 'absolute', left: 560, top: 190, width: 160, height: 160, opacity: agent, transform: `scale(${0.7 + agent * 0.3})` }}>
          <div style={{ position: 'absolute', inset: -18, borderRadius: 48, background: `${C.amber}22`, transform: `scale(${1 + Math.sin(f / 12) * 0.04})` }} />
          <div style={{ position: 'absolute', inset: 0, borderRadius: 40, background: C.amber, display: 'grid', placeItems: 'center', fontFamily: DISPLAY, fontWeight: 800, fontSize: 44, color: C.ink }}>{'{Ai}'}</div>
          <Label size={16} style={{ position: 'absolute', top: 172, width: '100%', textAlign: 'center' }}>acts as Priya</Label>
        </div>
        <Wire from={[424, 180]} to={[560, 270]} progress={lerp(f, 80, 100, 0, 1)} />
        <Wire from={[720, 250]} to={[860, 150]} progress={lerp(f, 105, 125, 0, 1)} />
        <Wire from={[720, 290]} to={[860, 310]} progress={lerp(f, 125, 145, 0, 1)} />

        {/* Systems the agent reads */}
        <Card x={860} y={80} w={360} h={140} show={sf} border={C.tealLight}>
          <Title size={22}>Salesforce</Title>
          <Label size={17} style={{ marginTop: 8 }}>Case 00981 · Acme Corp</Label>
          <Label size={17} color={C.text}>“Box crushed, two units broken”</Label>
        </Card>
        <Card x={860} y={240} w={360} h={140} show={sap} border={C.tealLight}>
          <Title size={22}>SAP</Title>
          <Label size={17} style={{ marginTop: 8 }}>Order 4471 · delivered 12 Nov</Label>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Label size={17} color={C.text}>$412.80 · paid</Label>
            {done > 0.05 && <Pill tone="teal" show={done}>Refunded</Pill>}
          </div>
        </Card>

        {/* The prepared action */}
        <Card x={470} y={400} w={340} h={180} show={action} border={pressed >= 1 ? C.tealLight : C.amber} bg={pressed >= 1 ? '#0f3b38' : '#2b2412'}>
          <Title size={22}>Refund in SAP</Title>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', rowGap: 4, marginTop: 10, fontSize: 18 }}>
            <Label size={17}>Customer</Label><Label size={17} color={C.text} weight={600}>Acme Corp</Label>
            <Label size={17}>Amount</Label><Label size={17} color={C.text} weight={600} style={{ fontFamily: MONO }}>$412.80</Label>
          </div>
          <div style={{ marginTop: 12 }}>
            {pressed >= 1 ? <Pill tone="teal">Approved · running</Pill> : <Pill show={hold}>Over $200 · needs approval</Pill>}
          </div>
        </Card>
        <Wire from={[640, 350]} to={[640, 400]} progress={lerp(f, 205, 220, 0, 1)} color={C.amber} packet={false} />

        {/* Approval in Teams */}
        <Card x={64} y={320} w={360} h={200} show={approval}>
          <Label size={15}>Microsoft Teams · approval</Label>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', margin: '10px 0 12px' }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: C.teal, display: 'grid', placeItems: 'center', fontWeight: 800 }}>D</div>
            <div>
              <Label color={C.text} weight={700}>Dana · Finance lead</Label>
              <Label size={15}>Refund $412.80 to Acme Corp?</Label>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <span style={{ padding: '9px 18px', borderRadius: 10, fontWeight: 700, background: pressed >= 1 ? C.teal : C.tealLight, color: pressed >= 1 ? '#fff' : C.ink, transform: `scale(${1 - Math.sin(pressed * Math.PI) * 0.08})` }}>Approve</span>
            <span style={{ padding: '9px 18px', borderRadius: 10, fontWeight: 600, border: `2px solid ${C.line}`, color: C.mute }}>Deny</span>
            {pressed >= 1 && <Check show={lerp(f, 380, 396, 0, 1)} />}
          </div>
        </Card>

        {/* Signed record */}
        <Card x={860} y={400} w={360} h={130} show={receipt} border={C.tealLight}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Title size={22}>Signed record</Title>
            <Check size={30} show={receipt} />
          </div>
          <Label size={16} color={C.tealLight} style={{ fontFamily: MONO, marginTop: 8 }}>sha256 4b1e…92ac</Label>
          <Label size={15}>request · values · policy · approver</Label>
        </Card>
      </div>
      <Caption {...cap} show={cap.show * out} />
    </Stage>
  );
}
