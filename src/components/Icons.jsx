// Small line icons that draw themselves in when their card is revealed.
// Every shape is a single path so the draw-in animation can use pathLength="1".
const PATHS = {
  app: [
    'M6 5 h20 a3 3 0 0 1 3 3 v16 a3 3 0 0 1 -3 3 H6 a3 3 0 0 1 -3 -3 V8 a3 3 0 0 1 3 -3 Z',
    'M3 12 h26', 'M8 8.5 h.01', 'M12 8.5 h.01', 'M8 18 h8', 'M8 22 h14',
  ],
  link: [
    'M4 20 a4 4 0 1 0 8 0 a4 4 0 1 0 -8 0',
    'M20 20 a4 4 0 1 0 8 0 a4 4 0 1 0 -8 0',
    'M12 20 h8',
    'M8 16 C8 6 24 6 24 16',
  ],
  ai: [
    'M13 6 L16 14 L24 17 L16 20 L13 28 L10 20 L2 17 L10 14 Z',
    'M25 3 v7', 'M21.5 6.5 h7',
  ],
  cube: ['M16 3 L27 9 V22 L16 29 L5 22 V9 Z', 'M5 9 L16 15 L27 9', 'M16 15 V29'],
  cloud: ['M9 25 a6 6 0 0 1 -1 -11.9 A8 8 0 0 1 23.5 11.6 A6.7 6.7 0 0 1 23 25 Z'],
  bulb: ['M16 3 a8 8 0 0 0 -4 14.9 V22 h8 v-4.1 A8 8 0 0 0 16 3 Z', 'M12 26 h8', 'M14 29.5 h4'],
  book: [
    'M4 6 h8 a4 4 0 0 1 4 4 v17 a3 3 0 0 0 -3 -3 H4 Z',
    'M28 6 h-8 a4 4 0 0 0 -4 4 v17 a3 3 0 0 1 3 -3 h9 Z',
  ],
  doc: [
    'M8 3 h11 l6 6 v18 a1 1 0 0 1 -1 1 H8 a1 1 0 0 1 -1 -1 V4 a1 1 0 0 1 1 -1 Z',
    'M19 3 v6 h6', 'M11 16 h10', 'M11 21 h10',
  ],
  chat: [
    'M5 6 h22 a1 1 0 0 1 1 1 v15 a1 1 0 0 1 -1 1 H14 l-6 5 v-5 H5 a1 1 0 0 1 -1 -1 V7 a1 1 0 0 1 1 -1 Z',
    'M10 12 h12', 'M10 17 h8',
  ],
  trend: ['M3 24 L12 15 L17 20 L29 8', 'M22 8 h7 v7'],
  code: ['M11 9 L4 16 L11 23', 'M21 9 L28 16 L21 23', 'M18 6 L14 26'],
  shield: [
    'M16 3 L27 7 V16 c0 6.5 -4.8 10.4 -11 13 C9.8 26.4 5 22.5 5 16 V7 Z',
    'M11 16 l4 4 l6.5 -8',
  ],
  send: ['M4 15 L28 4 L21 28 L15 19 Z', 'M28 4 L15 19'],
  target: [
    'M4 16 a12 12 0 1 0 24 0 a12 12 0 1 0 -24 0',
    'M10 16 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0',
    'M16 16 h.01',
  ],
  check: ['M4 16 a12 12 0 1 0 24 0 a12 12 0 1 0 -24 0', 'M10 16.5 l4 4 l8 -9'],
  lock: ['M7 14 h18 a1 1 0 0 1 1 1 v12 a1 1 0 0 1 -1 1 H7 a1 1 0 0 1 -1 -1 V15 a1 1 0 0 1 1 -1 Z', 'M11 14 v-4 a5 5 0 0 1 10 0 v4', 'M16 20 v3'],
  users: [
    'M7 11 a5 5 0 1 0 10 0 a5 5 0 1 0 -10 0', 'M2 27 c0 -5 4.5 -8 10 -8 s10 3 10 8',
    'M20 6.5 a5 5 0 0 1 0 9', 'M24 19.5 c3.5 1 6 3.5 6 7.5',
  ],
  flask: ['M12 3 h8', 'M13 3 v9 L5 26 a2 2 0 0 0 1.8 3 h18.4 a2 2 0 0 0 1.8 -3 L19 12 V3', 'M8.5 21 h15'],
  layers: ['M16 4 L29 11 L16 18 L3 11 Z', 'M3 16 L16 23 L29 16', 'M3 21 L16 28 L29 21'],
  grad: ['M16 6 L30 13 L16 20 L2 13 Z', 'M8 16 v6 c0 2 3.5 4 8 4 s8 -2 8 -4 v-6', 'M30 13 v8'],
  loop: ['M26 12 A11 11 0 0 0 6 13', 'M6 20 A11 11 0 0 0 26 19', 'M26 5 v7 h-7', 'M6 27 v-7 h7'],
};

export function Icon({ name, size = 28 }) {
  const shapes = PATHS[name] || [];
  return (
    <svg className="icon" viewBox="0 0 32 32" width={size} height={size} fill="none"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {shapes.map((d, i) => (
        <path key={i} d={d} pathLength="1" style={{ '--i': i }} />
      ))}
    </svg>
  );
}

export function IconTile({ name, tone = 'teal' }) {
  return (
    <span className={`icon-tile ${tone}`}>
      <Icon name={name} />
    </span>
  );
}
