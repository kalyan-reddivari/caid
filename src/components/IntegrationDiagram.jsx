// Hero illustration: the words of the name, Custom Application and Integration Development,
// wired into the {Ai} core.
const NODES = [
  { x: 96, y: 70, letter: 'C', word: 'Custom' },
  { x: 424, y: 70, letter: 'A', word: 'Application' },
  { x: 96, y: 330, letter: 'I', word: 'Integration', and: true },
  { x: 424, y: 330, letter: 'D', word: 'Development' },
];
const CX = 260;
const CY = 200;

export default function IntegrationDiagram() {
  const paths = NODES.map((n) => {
    const midX = (n.x + CX) / 2;
    return `M${n.x} ${n.y} C ${midX} ${n.y}, ${midX} ${CY}, ${CX} ${CY}`;
  });

  return (
    <svg className="diagram" viewBox="0 0 520 400" role="img"
      aria-label="Custom Application and Integration Development connected through an AI core">
      {paths.map((d, i) => <path key={`w${i}`} className="wire" d={d} />)}
      {paths.map((d, i) => <path key={`p${i}`} className="pulse" d={d} />)}

      {NODES.map((n) => (
        <g key={n.word}>
          <rect x={n.x - 76} y={n.y - 30} width="152" height="60" rx="8"
            fill="var(--surface)" stroke="var(--line)" />
          <text x={n.x - 58} y={n.y + 9} fontFamily="var(--font-display)" fontWeight="800"
            fontSize="26" fill="var(--teal)">{n.letter}</text>
          <text x={n.x - 34} y={n.y + 5} fontFamily="var(--font-body)" fontWeight="500"
            fontSize="14" fill="var(--ink)">{n.word}</text>
          {n.and && (
            <g>
              <rect x={n.x - 25} y={n.y - 41} width="50" height="22" rx="11" fill="var(--amber)" />
              <text x={n.x} y={n.y - 26} textAnchor="middle" fontFamily="var(--font-body)"
                fontStyle="italic" fontWeight="600" fontSize="12.5" fill="var(--ink)">and</text>
            </g>
          )}
        </g>
      ))}

      <circle className="spin svg-box" style={{ '--dur': '40s' }} cx={CX} cy={CY} r="70" fill="none"
        stroke="var(--amber)" strokeOpacity=".45" strokeWidth="1.5" strokeDasharray="3 6" />
      <rect x={CX - 52} y={CY - 38} width="104" height="76" rx="12" fill="var(--amber)" />
      <text x={CX} y={CY + 13} textAnchor="middle" fontFamily="var(--font-display)"
        fontWeight="800" fontSize="34" fill="var(--ink)">{'{Ai}'}</text>
    </svg>
  );
}
