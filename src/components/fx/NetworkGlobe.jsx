import { useCallback, useRef } from 'react';
import useCanvasLoop from './useCanvasLoop.js';

// Home hero: a slowly turning 3D globe of connected systems. Data packets run along the links
// and through the {Ai} core; the globe leans toward the pointer. Drawn with Canvas 2D, no library.

const LABELS = ['SAP', 'Salesforce', 'Workday', 'NetSuite', 'Snowflake', 'Slack', 'ServiceNow', 'HubSpot', 'Teams', 'Shopify', 'SQL Server', 'ADP', 'Jira', 'Dynamics', 'Spring Boot', 'Python', 'MuleSoft'];
const N = 150;
const TEAL = [14, 124, 115];
const AMBER = [240, 169, 59];
const INK = [20, 33, 61];

function buildGlobe() {
  const golden = Math.PI * (3 - Math.sqrt(5));
  const pts = [];
  for (let i = 0; i < N; i += 1) {
    const y = 1 - (i / (N - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const th = i * golden;
    pts.push({ x: Math.cos(th) * r, y, z: Math.sin(th) * r, label: null, sx: 0, sy: 0, sz: 0, s: 1 });
  }
  // Three nearest neighbours per point make an even mesh.
  const edges = [];
  const seen = new Set();
  pts.forEach((p, i) => {
    pts
      .map((q, j) => ({ j, d: (p.x - q.x) ** 2 + (p.y - q.y) ** 2 + (p.z - q.z) ** 2 }))
      .filter((o) => o.j !== i)
      .sort((a, b) => a.d - b.d)
      .slice(0, 3)
      .forEach(({ j }) => {
        const key = i < j ? `${i}-${j}` : `${j}-${i}`;
        if (!seen.has(key)) { seen.add(key); edges.push([i, j]); }
      });
  });
  const adj = pts.map(() => []);
  edges.forEach(([a, b], k) => { adj[a].push(k); adj[b].push(k); });
  LABELS.forEach((l, k) => { pts[Math.floor(((k + 0.5) / LABELS.length) * N * 0.94) + 4].label = l; });
  return { pts, edges, adj };
}

const rgba = (c, a) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;

export default function NetworkGlobe({ className = '' }) {
  const ref = useRef(null);

  const setup = useCallback((state) => {
    const { pts, edges, adj } = buildGlobe();
    let rotY = 0.6;
    let tiltX = -0.25;
    let tiltY = 0;
    const packets = Array.from({ length: 16 }, (_, i) => ({
      edge: (i * 37) % edges.length, t: Math.random(), dir: 1, speed: 0.0006 + Math.random() * 0.0008, color: i % 3 ? TEAL : AMBER,
    }));
    const pulses = [];

    return (ctx, dt) => {
      const { w, h } = state;
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2;
      const cy = h / 2;
      const R = Math.min(w, h) * 0.4;

      rotY += dt * 0.00012;
      const targetX = -0.25 + (state.inside ? state.py * 0.35 : 0);
      const targetY = state.inside ? state.px * 0.45 : 0;
      tiltX += (targetX - tiltX) * 0.04;
      tiltY += (targetY - tiltY) * 0.04;

      const ay = rotY + tiltY;
      const cosY = Math.cos(ay); const sinY = Math.sin(ay);
      const cosX = Math.cos(tiltX); const sinX = Math.sin(tiltX);
      const f = 3;
      pts.forEach((p) => {
        const x1 = p.x * cosY + p.z * sinY;
        const z1 = -p.x * sinY + p.z * cosY;
        const y2 = p.y * cosX - z1 * sinX;
        const z2 = p.y * sinX + z1 * cosX;
        const s = f / (f - z2);
        p.sx = cx + x1 * R * s;
        p.sy = cy + y2 * R * s;
        p.sz = z2;
        p.s = s;
      });

      // Glow behind the globe and the {Ai} core.
      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 1.25);
      glow.addColorStop(0, rgba(AMBER, 0.28));
      glow.addColorStop(0.45, rgba(AMBER, 0.08));
      glow.addColorStop(1, rgba(AMBER, 0));
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, w, h);

      // Back half first, then the core, then the front half, so depth reads correctly.
      const drawEdges = (front) => {
        edges.forEach(([a, b]) => {
          const p = pts[a]; const q = pts[b];
          const z = (p.sz + q.sz) / 2;
          if ((z >= 0) !== front) return;
          ctx.strokeStyle = rgba(TEAL, 0.07 + (z + 1) * 0.16);
          ctx.lineWidth = 0.6 + (z + 1) * 0.35;
          ctx.beginPath(); ctx.moveTo(p.sx, p.sy); ctx.lineTo(q.sx, q.sy); ctx.stroke();
        });
      };
      const drawPoints = (front) => {
        pts.forEach((p) => {
          if ((p.sz >= 0) !== front) return;
          ctx.fillStyle = rgba(p.label ? TEAL : INK, 0.18 + (p.sz + 1) * 0.3);
          ctx.beginPath(); ctx.arc(p.sx, p.sy, (p.label ? 2.6 : 1.4) * p.s, 0, Math.PI * 2); ctx.fill();
        });
      };

      drawEdges(false);
      drawPoints(false);

      // Core: spokes from the core to the labelled systems, then the core itself.
      pts.forEach((p) => {
        if (!p.label) return;
        ctx.strokeStyle = rgba(AMBER, 0.05 + Math.max(p.sz, 0) * 0.22);
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 5]);
        ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(p.sx, p.sy); ctx.stroke();
      });
      ctx.setLineDash([]);
      const pulse = (Math.sin(state.t * 0.002) + 1) / 2;
      const core = R * 0.2;
      ctx.fillStyle = rgba(AMBER, 0.18 + pulse * 0.12);
      ctx.beginPath(); ctx.arc(cx, cy, core * (1.35 + pulse * 0.15), 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = rgba(AMBER, 1);
      ctx.beginPath(); ctx.roundRect(cx - core, cy - core * 0.72, core * 2, core * 1.44, core * 0.3); ctx.fill();
      ctx.fillStyle = rgba(INK, 1);
      ctx.font = `800 ${Math.round(core * 0.78)}px 'Bricolage Grotesque', system-ui, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('{Ai}', cx, cy + core * 0.04);

      drawEdges(true);
      drawPoints(true);

      // Packets travel edge to edge; when one reaches a labelled system it sends a pulse.
      packets.forEach((k) => {
        k.t += dt * k.speed * 1.6;
        if (k.t >= 1) {
          const [a, b] = edges[k.edge];
          const end = k.dir > 0 ? b : a;
          if (pts[end].label) pulses.push({ i: end, life: 1 });
          const options = adj[end].filter((e) => e !== k.edge);
          k.edge = options[Math.floor(Math.random() * options.length)] ?? k.edge;
          k.dir = edges[k.edge][0] === end ? 1 : -1;
          k.t = 0;
        }
        const [a, b] = edges[k.edge];
        const p = k.dir > 0 ? pts[a] : pts[b];
        const q = k.dir > 0 ? pts[b] : pts[a];
        const x = p.sx + (q.sx - p.sx) * k.t;
        const y = p.sy + (q.sy - p.sy) * k.t;
        const z = p.sz + (q.sz - p.sz) * k.t;
        const alpha = 0.25 + (z + 1) * 0.37;
        const g = ctx.createRadialGradient(x, y, 0, x, y, 7);
        g.addColorStop(0, rgba(k.color, alpha));
        g.addColorStop(1, rgba(k.color, 0));
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(x, y, 7, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = rgba(k.color, Math.min(1, alpha + 0.2));
        ctx.beginPath(); ctx.arc(x, y, 2, 0, Math.PI * 2); ctx.fill();
      });

      for (let i = pulses.length - 1; i >= 0; i -= 1) {
        const pu = pulses[i];
        pu.life -= dt * 0.0012;
        if (pu.life <= 0) { pulses.splice(i, 1); continue; }
        const p = pts[pu.i];
        ctx.strokeStyle = rgba(AMBER, pu.life * 0.8);
        ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.arc(p.sx, p.sy, (1 - pu.life) * 18 + 3, 0, Math.PI * 2); ctx.stroke();
      }

      // Labels on the front of the globe.
      ctx.font = "600 12px 'IBM Plex Sans', system-ui, sans-serif";
      ctx.textBaseline = 'middle';
      pts.forEach((p) => {
        if (!p.label || p.sz < 0.05) return;
        const a = Math.min(1, (p.sz - 0.05) * 2.2);
        const tw = ctx.measureText(p.label).width;
        const bx = p.sx + 8;
        const by = p.sy - 11;
        ctx.fillStyle = `rgba(255,255,255,${0.92 * a})`;
        ctx.strokeStyle = rgba(TEAL, 0.55 * a);
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.roundRect(bx, by, tw + 16, 22, 11); ctx.fill(); ctx.stroke();
        ctx.fillStyle = rgba(INK, a);
        ctx.textAlign = 'left';
        ctx.fillText(p.label, bx + 8, by + 11.5);
      });
    };
  }, []);

  useCanvasLoop(ref, setup);

  return (
    <canvas ref={ref} className={`network-globe ${className}`} role="img"
      aria-label="A turning globe of business systems such as SAP, Salesforce and Workday, all connected through the CAID {Ai} core" />
  );
}
