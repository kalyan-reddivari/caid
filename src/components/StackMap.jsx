import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { track } from '../utils/track.js';

// Home page hero: the visitor picks the systems they run today and sees them wired through
// a CAID integration layer into the things people use, plus the first projects we would suggest.
// "Send this map" carries the selection into the project brief on the Process page.

const GROUPS = [
  { key: 'erp', label: 'ERP and finance', systems: ['SAP', 'NetSuite', 'Dynamics 365', 'QuickBooks'] },
  { key: 'crm', label: 'CRM and commerce', systems: ['Salesforce', 'HubSpot', 'Shopify'] },
  { key: 'hr', label: 'HR and payroll', systems: ['Workday', 'ADP'] },
  { key: 'ops', label: 'Service and IT', systems: ['ServiceNow', 'Jira'] },
  { key: 'data', label: 'Data', systems: ['Snowflake', 'SQL Server', 'Legacy database'] },
  { key: 'chat', label: 'Where people work', systems: ['Slack', 'Microsoft Teams', 'SharePoint'] },
];
const GROUP_OF = Object.fromEntries(GROUPS.flatMap((g) => g.systems.map((s) => [s, g.key])));
const MAX = 6;
const START = ['SAP', 'Salesforce', 'Slack'];

// Each idea needs certain kinds of system. The first three that fit, in this order, are shown.
const IDEAS = [
  { needs: ['erp', 'crm'], title: 'Quote-to-cash sync', text: (s) => `Customers, orders and invoices move once between ${s.crm} and ${s.erp}, so sales and finance stop rekeying.` },
  { needs: ['legacy'], title: 'Modernize without a rewrite', text: () => 'Wrap the legacy database in clean, documented APIs so new apps can use its data safely.' },
  { needs: ['hr'], title: 'Hands-free onboarding', text: (s) => `A new hire in ${s.hr} gets accounts, equipment requests and payroll set up automatically.` },
  { needs: ['data'], title: 'Ask-your-data assistant', text: (s) => `Plain-English questions answered from ${s.data}, with the source of every number shown.` },
  { needs: ['ops'], title: 'AI ticket triage', text: (s) => `New tickets in ${s.ops} are routed and drafted with an answer that an agent approves.` },
  { needs: ['erp'], title: 'Invoice automation', text: (s) => `AI reads supplier invoices and enters them in ${s.erp}, with a person approving anything unusual.` },
  { needs: ['crm'], title: 'Account briefings', text: (s) => `Before every call, a one-page summary of the account from ${s.crm}, its orders and open tickets.` },
  { needs: ['chat'], title: 'Approvals where people work', text: (s) => `Requests that need sign-off arrive in ${s.chat} with the details attached, approved in one click.` },
];

const OUTPUTS = ['AI assistant', 'Automations', 'Live dashboards'];

function pick(selected) {
  const first = {};
  selected.forEach((s) => {
    const g = s === 'Legacy database' ? 'legacy' : GROUP_OF[s];
    if (!first[g]) first[g] = s;
    if (g === 'legacy' && !first.data) first.data = s;
  });
  return IDEAS.filter((i) => i.needs.every((n) => first[n])).slice(0, 3).map((i) => ({ title: i.title, text: i.text(first) }));
}

function Diagram({ selected }) {
  const n = Math.max(selected.length, 1);
  const top = 40;
  const span = 320;
  const gap = n > 1 ? span / (n - 1) : 0;
  const ys = selected.map((_, i) => (n > 1 ? top + i * gap : 200));
  const outYs = [110, 200, 290];
  const CX = 260;
  return (
    <svg className="stack-diagram" viewBox="0 0 520 400" role="img"
      aria-label={selected.length
        ? `${selected.join(', ')} connected through a CAID integration and AI layer to an AI assistant, automations and live dashboards`
        : 'Pick systems to see how they connect'}>
      <defs>
        <linearGradient id="layer-fill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="var(--ink)" />
          <stop offset="1" stopColor="#22325a" />
        </linearGradient>
      </defs>
      {ys.map((y, i) => {
        const d = `M150 ${y} C 205 ${y}, 200 200, ${CX - 44} 200`;
        return (
          <g key={selected[i]}>
            <path d={d} className="sm-wire" />
            <path d={d} className="packet teal" pathLength="1" fill="none" strokeWidth="3" style={{ '--dur': '2.6s', '--d': `${i * 0.35}s` }} />
          </g>
        );
      })}
      {outYs.map((y, i) => {
        const d = `M${CX + 44} 200 C 330 200, 325 ${y}, 372 ${y}`;
        return (
          <g key={OUTPUTS[i]}>
            <path d={d} className="sm-wire" />
            <path d={d} className="packet amber" pathLength="1" fill="none" strokeWidth="3" style={{ '--dur': '2.6s', '--d': `${1.2 + i * 0.4}s` }} />
          </g>
        );
      })}

      {selected.map((s, i) => (
        <g key={s} className="sm-node">
          <rect x="10" y={ys[i] - 19} width="140" height="38" rx="8" />
          <text x="80" y={ys[i] + 5} textAnchor="middle">{s}</text>
        </g>
      ))}

      <g>
        <rect x={CX - 44} y="70" width="88" height="260" rx="14" fill="url(#layer-fill)" />
        <rect x={CX - 30} y="170" width="60" height="44" rx="8" fill="var(--amber)" />
        <text x={CX} y="199" textAnchor="middle" className="sm-core">{'{Ai}'}</text>
        <text x={CX} y="102" textAnchor="middle" className="sm-layer">APIs</text>
        <text x={CX} y="134" textAnchor="middle" className="sm-layer">Events</text>
        <text x={CX} y="252" textAnchor="middle" className="sm-layer">Rules</text>
        <text x={CX} y="284" textAnchor="middle" className="sm-layer">Audit log</text>
        <text x={CX} y="355" textAnchor="middle" className="sm-caption">CAID layer</text>
      </g>

      {OUTPUTS.map((o, i) => (
        <g key={o} className="sm-out">
          <rect x="372" y={outYs[i] - 20} width="138" height="40" rx="20" />
          <text x="441" y={outYs[i] + 5} textAnchor="middle">{o}</text>
        </g>
      ))}
    </svg>
  );
}

// The same picture, stacked top to bottom, for phones (CSS shows one or the other).
function DiagramTall({ selected }) {
  const pos = selected.map((_, i) => ({ x: i % 2 ? 180 : 10, y: 10 + Math.floor(i / 2) * 50 }));
  const outs = OUTPUTS.map((o, i) => ({ o, x: 6 + i * 112 }));
  return (
    <svg className="stack-diagram tall" viewBox="0 0 340 420" aria-hidden="true">
      {pos.map((p, i) => {
        const sx = p.x + 75;
        const tx = 70 + (i * 200) / Math.max(selected.length - 1, 1);
        const d = `M${sx} ${p.y + 36} C ${sx} 190, ${tx} 170, ${tx} 214`;
        return (
          <g key={selected[i]}>
            <path d={d} className="sm-wire" />
            <path d={d} className="packet teal" pathLength="1" fill="none" strokeWidth="3" style={{ '--dur': '2.6s', '--d': `${i * 0.35}s` }} />
          </g>
        );
      })}
      {outs.map(({ o, x }, i) => {
        const d = `M${100 + i * 70} 286 C ${100 + i * 70} 320, ${x + 52} 310, ${x + 52} 346`;
        return (
          <g key={o}>
            <path d={d} className="sm-wire" />
            <path d={d} className="packet amber" pathLength="1" fill="none" strokeWidth="3" style={{ '--dur': '2.6s', '--d': `${1.2 + i * 0.4}s` }} />
          </g>
        );
      })}
      {selected.map((s, i) => (
        <g key={s} className="sm-node">
          <rect x={pos[i].x} y={pos[i].y} width="150" height="36" rx="8" />
          <text x={pos[i].x + 75} y={pos[i].y + 23} textAnchor="middle">{s}</text>
        </g>
      ))}
      <rect x="20" y="214" width="300" height="72" rx="14" fill="url(#layer-fill-tall)" />
      <defs>
        <linearGradient id="layer-fill-tall" x1="0" x2="1"><stop offset="0" stopColor="var(--ink)" /><stop offset="1" stopColor="#22325a" /></linearGradient>
      </defs>
      <rect x="140" y="228" width="60" height="44" rx="8" fill="var(--amber)" />
      <text x="170" y="257" textAnchor="middle" className="sm-core">{'{Ai}'}</text>
      <text x="80" y="246" textAnchor="middle" className="sm-layer">APIs</text>
      <text x="80" y="266" textAnchor="middle" className="sm-layer">Events</text>
      <text x="260" y="246" textAnchor="middle" className="sm-layer">Rules</text>
      <text x="260" y="266" textAnchor="middle" className="sm-layer">Audit log</text>
      {outs.map(({ o, x }) => (
        <g key={o} className="sm-out">
          <rect x={x} y="346" width="104" height="40" rx="20" />
          <text x={x + 52} y="371" textAnchor="middle" className="sm-out-small">{o}</text>
        </g>
      ))}
      <text x="170" y="412" textAnchor="middle" className="sm-caption">Your systems → CAID layer → your people</text>
    </svg>
  );
}

export default function StackMap() {
  const [selected, setSelected] = useState(START);
  const ideas = useMemo(() => pick(selected), [selected]);
  const full = selected.length >= MAX;

  const toggle = (s) => setSelected((cur) => (cur.includes(s) ? cur.filter((x) => x !== s) : cur.length >= MAX ? cur : [...cur, s]));

  const briefHref = `/process?systems=${encodeURIComponent(selected.join(', '))}${ideas[0] ? `&idea=${encodeURIComponent(ideas[0].title)}` : ''}#brief`;

  return (
    <div className="stack-map">
      <div className="stack-map-head">
        <span className="stack-map-step">Try it</span>
        <h2 className="stack-map-title">What do you run today?</h2>
        <p className="stack-map-hint" aria-live="polite">
          {full ? `That's ${MAX}, the most this map shows. Remove one to add another.` : `Pick up to ${MAX} systems. We'll show how we'd connect them.`}
        </p>
      </div>

      <div className="stack-picker">
        {GROUPS.map((g) => (
          <div key={g.key} className="stack-picker-group" role="group" aria-label={g.label}>
            <span>{g.label}</span>
            <div>
              {g.systems.map((s) => {
                const on = selected.includes(s);
                return (
                  <button key={s} type="button" aria-pressed={on} disabled={!on && full}
                    className={`sys-chip${on ? ' on' : ''}`} onClick={() => toggle(s)}>
                    {s}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="stack-visual">
        <Diagram selected={selected} />
        <DiagramTall selected={selected} />
      </div>

      <div className="stack-ideas">
        <h3>What we'd likely build first</h3>
        {ideas.length ? (
          <ol>
            {ideas.map((i) => <li key={i.title}><b>{i.title}.</b> {i.text}</li>)}
          </ol>
        ) : (
          <p className="muted small">Pick at least one system above to see suggestions.</p>
        )}
        <div className="stack-actions">
          <Link className="btn btn-primary" to={briefHref}
            onClick={() => track('stack_map', { systems: selected.join(', ') })}>
            Send this map with a project brief →
          </Link>
          <span className="small muted">Takes five minutes. A senior consultant replies within one business day.</span>
        </div>
      </div>
    </div>
  );
}
