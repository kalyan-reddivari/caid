import { AbsoluteFill, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

// Shared look for every video: the site's palette, its two typefaces, and small animated parts.

export const C = {
  ink: '#14213d', ink2: '#1e2d50', ink3: '#26375f', line: '#3a4b75', mute: '#aab4c8', text: '#eef2f8',
  teal: '#0e7c73', tealLight: '#4fd1c5', amber: '#f0a93b', paper: '#f2f3f1', red: '#e5735f',
};
export const DISPLAY = "'Bricolage Grotesque', system-ui, sans-serif";
export const BODY = "'IBM Plex Sans', system-ui, sans-serif";
export const MONO = "ui-monospace, 'SF Mono', Menlo, monospace";

export function Fonts() {
  return (
    <style>{`
      @font-face { font-family: 'Bricolage Grotesque'; src: url(${staticFile('fonts/bricolage-grotesque-latin.woff2')}) format('woff2'); font-weight: 200 800; }
      @font-face { font-family: 'IBM Plex Sans'; src: url(${staticFile('fonts/ibm-plex-sans-latin.woff2')}) format('woff2'); font-weight: 100 700; }
    `}</style>
  );
}

// Navy stage with a soft teal glow and a faint grid, as in the site's dark sections.
export function Stage({ children }) {
  const f = useCurrentFrame();
  const drift = Math.sin(f / 90) * 40;
  return (
    <AbsoluteFill style={{ background: `radial-gradient(ellipse at ${30 + drift / 10}% 20%, #1f3566 0%, ${C.ink} 55%, #0d1730 100%)`, fontFamily: BODY, color: C.text }}>
      <Fonts />
      <AbsoluteFill style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
      {children}
    </AbsoluteFill>
  );
}

// 0 → 1 with a spring, starting at `at` frames.
export function useIn(at, config = { damping: 200 }) {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: f - at, fps, config });
}

// 1 → 0 fade between frames a and b.
export function useOut(a, b) {
  const f = useCurrentFrame();
  return interpolate(f, [a, b], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
}

export const lerp = (f, a, b, from, to) => interpolate(f, [a, b], [from, to], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

export function Card({ x, y, w, h, show = 1, border = C.line, bg = C.ink2, radius = 16, children, style }) {
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: w, height: h, background: bg, border: `2px solid ${border}`, borderRadius: radius,
      opacity: show, transform: `translateY(${(1 - show) * 24}px) scale(${0.96 + show * 0.04})`, boxShadow: '0 24px 60px -30px rgba(0,0,0,.6)', padding: 22, boxSizing: 'border-box', ...style }}>
      {children}
    </div>
  );
}

export function Label({ children, color = C.mute, size = 18, weight = 500, style }) {
  return <div style={{ color, fontSize: size, fontWeight: weight, ...style }}>{children}</div>;
}

export function Title({ children, size = 26, color = C.text, style }) {
  return <div style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: size, color, letterSpacing: '-0.01em', ...style }}>{children}</div>;
}

export function Pill({ children, tone = 'amber', show = 1, style }) {
  const c = tone === 'teal' ? C.tealLight : tone === 'red' ? C.red : C.amber;
  return (
    <span style={{ display: 'inline-block', padding: '6px 14px', borderRadius: 999, background: `${c}26`, color: c, fontWeight: 700, fontSize: 16,
      opacity: show, transform: `scale(${0.9 + show * 0.1})`, ...style }}>{children}</span>
  );
}

export function Check({ size = 34, show = 1 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 34 34" style={{ opacity: show, transform: `scale(${0.6 + show * 0.4})` }}>
      <circle cx="17" cy="17" r="16" fill={C.teal} />
      <path d="M10 17.5 l4.5 4.5 l9 -10" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
        strokeDasharray="24" strokeDashoffset={24 * (1 - show)} />
    </svg>
  );
}

// A line between two points that draws itself, with a packet travelling along it.
export function Wire({ from, to, progress, color = C.tealLight, dashed = false, packet = true }) {
  const f = useCurrentFrame();
  const [x1, y1] = from; const [x2, y2] = to;
  const len = Math.hypot(x2 - x1, y2 - y1);
  const t = ((f % 45) / 45);
  return (
    <svg style={{ position: 'absolute', inset: 0, overflow: 'visible' }} width="100%" height="100%">
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="2.5" strokeOpacity=".7"
        strokeDasharray={dashed ? '8 9' : `${len}`} strokeDashoffset={dashed ? -f : len * (1 - progress)} opacity={dashed ? progress : 1} />
      {packet && progress >= 1 && <circle cx={x1 + (x2 - x1) * t} cy={y1 + (y2 - y1) * t} r="6" fill={C.amber} />}
    </svg>
  );
}

// Caption strip at the bottom: the step's name and one plain sentence.
export function Caption({ step, title, text, show }) {
  return (
    <div style={{ position: 'absolute', left: 64, bottom: 44, right: 64, display: 'flex', alignItems: 'baseline', gap: 18, opacity: show, transform: `translateY(${(1 - show) * 14}px)` }}>
      <span style={{ fontFamily: DISPLAY, fontWeight: 800, color: C.amber, fontSize: 22 }}>{step}</span>
      <span style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: 28 }}>{title}</span>
      <span style={{ color: C.mute, fontSize: 21 }}>{text}</span>
    </div>
  );
}
