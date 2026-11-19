// Graphics for the agentic side of the site: the Services hero and the layered agent stack.
// Light-theme art uses the site's CSS variables; the stack is plain HTML so it reflows on phones.

const flow = (d = 0) => ({ strokeDasharray: '5 6', animation: `dash-flow 1.6s linear ${d}s infinite` });

/* -------------------------------------------------------------------------
   Services hero: one agent in the middle, and the four things that make it
   safe to put to work: tools, knowledge, a person's approval and evaluations.
   ------------------------------------------------------------------------- */
export function AgentServicesArt() {
  const card = { fill: 'var(--surface)', stroke: 'var(--line)' };
  return (
    <svg className="art" viewBox="0 0 520 360" role="img"
      aria-label="An AI agent in the middle, connected to its tools on business systems, its knowledge, a person who approves its actions, and the evaluations that check it">
      <circle className="anim-breathe svg-box" cx="260" cy="180" r="150" fill="var(--teal-wash)" />

      {/* wires from the agent to each card */}
      <g fill="none" stroke="var(--teal)" strokeWidth="1.6">
        <path d="M222 160 C 190 150, 186 112, 170 104" style={flow(0)} />
        <path d="M298 160 C 330 150, 334 112, 350 104" style={flow(0.4)} stroke="var(--amber)" />
        <path d="M222 200 C 190 210, 186 248, 170 256" style={flow(0.8)} />
        <path d="M298 200 C 330 210, 334 248, 350 256" style={flow(1.2)} stroke="var(--amber)" />
      </g>

      {/* the agent */}
      <g transform="translate(260 180)">
        <rect x="-40" y="-40" width="80" height="80" rx="22" fill="var(--ink)" />
        <rect x="-30" y="-30" width="60" height="60" rx="16" fill="var(--amber)" />
        <text y="7" textAnchor="middle" style={{ font: '800 19px var(--font-display)', fill: 'var(--ink)' }}>{'{Ai}'}</text>
        <text y="62" textAnchor="middle" style={{ font: '600 11px var(--font-body)', fill: 'var(--ink-soft)' }}>your agent</text>
      </g>

      {/* tools: governed actions on systems of record */}
      <g transform="translate(16 40)">
        <rect width="156" height="104" rx="14" {...card} />
        <text x="16" y="26" style={{ font: '700 12px var(--font-body)', fill: 'var(--ink)' }}>Tools</text>
        <text x="58" y="26" style={{ font: '500 10px var(--font-body)', fill: 'var(--ink-soft)' }}>via MCP</text>
        {[['SAP', 0], ['Salesforce', 1], ['Workday', 2]].map(([t, i]) => (
          <g key={t} transform={`translate(16 ${40 + i * 20})`}>
            <rect width="124" height="15" rx="7.5" fill="var(--teal-wash)" />
            <circle cx="9" cy="7.5" r="3.5" fill={i === 1 ? 'var(--amber)' : 'var(--teal)'} className="blink" style={{ '--d': `${i * 0.5}s` }} />
            <text x="19" y="11" style={{ font: '600 9.5px var(--font-body)', fill: 'var(--ink)' }}>{t}</text>
            <text x="116" y="11" textAnchor="end" style={{ font: '500 9px var(--font-body)', fill: 'var(--ink-soft)' }}>as you</text>
          </g>
        ))}
      </g>

      {/* knowledge: grounded in permitted data */}
      <g transform="translate(348 40)">
        <rect width="156" height="104" rx="14" {...card} />
        <text x="16" y="26" style={{ font: '700 12px var(--font-body)', fill: 'var(--ink)' }}>Knowledge</text>
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(${16 + i * 44} 40)`}>
            <path d="M0 0 H26 L34 8 V44 H0 Z" fill="var(--surface)" stroke="var(--line)" />
            <rect x="5" y="14" width="22" height="3" rx="1.5" fill="var(--teal)" className="grow-x" style={{ '--d': `${i * 0.3}s` }} />
            <rect x="5" y="22" width="18" height="3" rx="1.5" fill="var(--line)" />
            <rect x="5" y="30" width="22" height="3" rx="1.5" fill="var(--line)" />
          </g>
        ))}
        <path d="M124 76 l4 4 l7 -8" fill="none" stroke="var(--teal)" strokeWidth="2" strokeLinecap="round" />
      </g>

      {/* approvals: a person approves the exact action */}
      <g transform="translate(16 216)">
        <rect width="156" height="104" rx="14" {...card} />
        <text x="16" y="26" style={{ font: '700 12px var(--font-body)', fill: 'var(--ink)' }}>Approvals</text>
        <circle cx="34" cy="58" r="14" fill="var(--teal-wash)" />
        <circle cx="34" cy="53" r="5" fill="var(--teal)" />
        <path d="M24 66 a10 8 0 0 1 20 0" fill="var(--teal)" />
        <text x="56" y="55" style={{ font: '600 10px var(--font-body)', fill: 'var(--ink)' }}>Refund $420</text>
        <text x="56" y="69" style={{ font: '500 9px var(--font-body)', fill: 'var(--ink-soft)' }}>exact values</text>
        <rect x="16" y="80" width="58" height="15" rx="7.5" fill="var(--teal)" />
        <text x="45" y="91" textAnchor="middle" style={{ font: '700 9px var(--font-body)', fill: '#fff' }}>Approve</text>
        <rect x="80" y="80" width="58" height="15" rx="7.5" fill="none" stroke="var(--line)" />
        <text x="109" y="91" textAnchor="middle" style={{ font: '600 9px var(--font-body)', fill: 'var(--ink-soft)' }}>Hold</text>
      </g>

      {/* evaluations: checked before and after release */}
      <g transform="translate(348 216)">
        <rect width="156" height="104" rx="14" {...card} />
        <text x="16" y="26" style={{ font: '700 12px var(--font-body)', fill: 'var(--ink)' }}>Evaluations</text>
        {[44, 52, 49, 58, 62].map((h, i) => (
          <rect key={i} className="grow-y" x={18 + i * 18} y={92 - h * 0.8} width="11" height={h * 0.8} rx="2.5"
            fill={i === 4 ? 'var(--amber)' : 'var(--teal)'} style={{ '--d': `${i * 0.15}s` }} />
        ))}
        <text x="140" y="56" textAnchor="end" style={{ font: '800 16px var(--font-display)', fill: 'var(--ink)' }}>98%</text>
        <text x="140" y="70" textAnchor="end" style={{ font: '500 9px var(--font-body)', fill: 'var(--ink-soft)' }}>cases pass</text>
      </g>
    </svg>
  );
}

/* -------------------------------------------------------------------------
   The agentic stack we build: people and channels at the top, systems of
   record at the bottom, and the guardrails that run alongside every layer.
   ------------------------------------------------------------------------- */
const LAYERS = [
  { name: 'Where people work', items: ['Slack and Teams', 'Your web and mobile apps', 'Service portals', 'Email and documents'] },
  { name: 'Agents', tone: 'ai', items: ['Assistants that answer', 'Agents that prepare actions', 'Multi-agent workflows', 'Agents of partner companies'] },
  { name: 'Models and orchestration', items: ['LangGraph workflows', 'Model routing: Claude, GPT, Gemini, open models', 'Retrieval over permitted data', 'Memory and checkpoints'] },
  { name: 'Governed tools', items: ['MCP servers for each system', 'Acts as the signed-in person', 'Risk tiers per call', 'Pinned tool definitions'] },
  { name: 'Systems of record', items: ['SAP and Oracle', 'Salesforce and Dynamics 365', 'Workday and SuccessFactors', 'ServiceNow and Jira', 'Snowflake and Databricks'] },
];
const RAIL = ['Identity for every agent', 'Policy on every call', 'Approval of exact values', 'Evaluations before release', 'Signed audit trail'];

export function AgentStack() {
  return (
    <div className="agent-stack">
      <ol className="agent-layers">
        {LAYERS.map((l, i) => (
          <li key={l.name} className={`agent-layer${l.tone ? ` is-${l.tone}` : ''}`} style={{ '--d': `${i * 0.08}s` }}>
            <span className="agent-layer-name">{l.name}</span>
            <div className="agent-layer-items">
              {l.items.map((t) => <span key={t}>{t}</span>)}
            </div>
          </li>
        ))}
      </ol>
      <aside className="agent-rail" aria-label="Guardrails on every layer">
        <span className="agent-rail-name">Guardrails on every layer</span>
        <ul>{RAIL.map((r) => <li key={r}>{r}</li>)}</ul>
      </aside>
    </div>
  );
}
