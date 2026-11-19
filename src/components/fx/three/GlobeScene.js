import * as THREE from 'three';

// Home hero globe in WebGL: a mesh of connected systems around the {Ai} core, with depth, a rim glow,
// packets that travel the links and pulse when they reach a named system, and labels that face the
// visitor. Plain three.js, no framework; mount() returns a cleanup function.

const LABELS = ['SAP', 'Salesforce', 'Workday', 'NetSuite', 'Snowflake', 'Slack', 'ServiceNow', 'HubSpot', 'Teams', 'Shopify', 'SQL Server', 'ADP', 'Jira', 'Dynamics', 'Spring Boot', 'Python', 'MuleSoft'];
const N = 240;
const TEAL = new THREE.Color('#0e7c73');
const TEAL_LIGHT = new THREE.Color('#4fd1c5');
const AMBER = new THREE.Color('#f0a93b');
const INK = new THREE.Color('#14213d');

function buildMesh() {
  const golden = Math.PI * (3 - Math.sqrt(5));
  const pts = [];
  for (let i = 0; i < N; i += 1) {
    const y = 1 - (i / (N - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const th = i * golden;
    pts.push({ v: new THREE.Vector3(Math.cos(th) * r, y, Math.sin(th) * r), label: null });
  }
  const edges = [];
  const seen = new Set();
  pts.forEach((p, i) => {
    pts.map((q, j) => ({ j, d: p.v.distanceToSquared(q.v) }))
      .filter((o) => o.j !== i).sort((a, b) => a.d - b.d).slice(0, 3)
      .forEach(({ j }) => {
        const key = i < j ? `${i}-${j}` : `${j}-${i}`;
        if (!seen.has(key)) { seen.add(key); edges.push([i, j]); }
      });
  });
  const adj = pts.map(() => []);
  edges.forEach(([a, b], k) => { adj[a].push(k); adj[b].push(k); });
  LABELS.forEach((l, k) => { pts[Math.floor(((k + 0.5) / LABELS.length) * N * 0.94) + 6].label = l; });
  return { pts, edges, adj };
}

function glowTexture(color, size = 128) {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const g = c.getContext('2d');
  const grd = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  grd.addColorStop(0, `rgba(${color},1)`);
  grd.addColorStop(0.25, `rgba(${color},.55)`);
  grd.addColorStop(1, `rgba(${color},0)`);
  g.fillStyle = grd;
  g.fillRect(0, 0, size, size);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function coreTexture() {
  const c = document.createElement('canvas');
  c.width = 512; c.height = 512;
  const g = c.getContext('2d');
  g.fillStyle = '#f0a93b';
  g.beginPath(); g.roundRect(96, 136, 320, 240, 64); g.fill();
  g.fillStyle = '#14213d';
  g.font = "800 150px 'Bricolage Grotesque', system-ui, sans-serif";
  g.textAlign = 'center'; g.textBaseline = 'middle';
  g.fillText('{Ai}', 256, 262);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

export function mountGlobe(host, { onReady } = {}) {
  const width = () => host.clientWidth || 1;
  const height = () => host.clientHeight || 1;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(width(), height());
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.domElement.className = 'globe-gl';
  host.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog('#f2f3f1', 3.4, 5.6);
  const camera = new THREE.PerspectiveCamera(34, width() / height(), 0.1, 50);
  camera.position.set(0, 0, 4.4);

  const globe = new THREE.Group();
  globe.rotation.x = -0.25;
  scene.add(globe);

  const { pts, edges, adj } = buildMesh();

  // Links: brighter on the near side thanks to the fog.
  const linkPos = new Float32Array(edges.length * 6);
  edges.forEach(([a, b], k) => { pts[a].v.toArray(linkPos, k * 6); pts[b].v.toArray(linkPos, k * 6 + 3); });
  const linkGeo = new THREE.BufferGeometry();
  linkGeo.setAttribute('position', new THREE.BufferAttribute(linkPos, 3));
  globe.add(new THREE.LineSegments(linkGeo, new THREE.LineBasicMaterial({ color: TEAL, transparent: true, opacity: 0.55 })));

  // Nodes: small spheres, named systems larger and teal.
  const nodeGeo = new THREE.SphereGeometry(1, 12, 12);
  const nodes = new THREE.InstancedMesh(nodeGeo, new THREE.MeshBasicMaterial({ color: '#ffffff' }), N);
  const m = new THREE.Matrix4();
  pts.forEach((p, i) => {
    const s = p.label ? 0.026 : 0.012;
    m.makeScale(s, s, s).setPosition(p.v);
    nodes.setMatrixAt(i, m);
    nodes.setColorAt(i, p.label ? TEAL : (i % 9 === 0 ? AMBER : INK));
  });
  globe.add(nodes);

  // Rim light: a faint teal edge on the globe's silhouette, clear in the middle.
  const rim = new THREE.Mesh(
    new THREE.SphereGeometry(1.03, 48, 48),
    new THREE.ShaderMaterial({
      transparent: true, depthWrite: false,
      uniforms: { color: { value: TEAL_LIGHT } },
      vertexShader: 'varying vec3 vN; varying vec3 vV; void main(){ vec4 mv = modelViewMatrix * vec4(position,1.0); vN = normalize(normalMatrix * normal); vV = normalize(-mv.xyz); gl_Position = projectionMatrix * mv; }',
      fragmentShader: 'uniform vec3 color; varying vec3 vN; varying vec3 vV; void main(){ float f = pow(1.0 - max(dot(vN, vV), 0.0), 3.0); gl_FragColor = vec4(color, f * 0.45); }',
    }),
  );
  scene.add(rim);

  // Orbit rings around the core.
  const ringMat = new THREE.MeshBasicMaterial({ color: AMBER, transparent: true, opacity: 0.35 });
  const ring1 = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.003, 8, 160), ringMat);
  const ring2 = new THREE.Mesh(new THREE.TorusGeometry(0.55, 0.002, 8, 160), ringMat.clone());
  ring2.material.opacity = 0.2;
  ring1.rotation.x = 1.2; ring2.rotation.x = 1.0; ring2.rotation.y = 0.6;
  scene.add(ring1, ring2);

  // The {Ai} core and its glow always face the camera.
  const amberGlow = glowTexture('240,169,59');
  const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: amberGlow, transparent: true, opacity: 0.55, depthWrite: false }));
  halo.scale.set(1.4, 1.4, 1);
  const core = new THREE.Sprite(new THREE.SpriteMaterial({ map: coreTexture(), transparent: true, depthWrite: false }));
  core.scale.set(0.62, 0.62, 1);
  // The core always draws on top of the mesh, so {Ai} stays readable.
  [halo, core].forEach((o, k) => { o.material.depthTest = false; o.material.fog = false; o.renderOrder = 10 + k; });
  scene.add(halo, core);

  // Spokes from the core to each named system.
  const named = pts.map((p, i) => (p.label ? i : -1)).filter((i) => i >= 0);
  const spokePos = new Float32Array(named.length * 6);
  named.forEach((i, k) => { spokePos.set([0, 0, 0], k * 6); pts[i].v.toArray(spokePos, k * 6 + 3); });
  const spokeGeo = new THREE.BufferGeometry();
  spokeGeo.setAttribute('position', new THREE.BufferAttribute(spokePos, 3));
  const spokes = new THREE.LineSegments(spokeGeo, new THREE.LineDashedMaterial({ color: AMBER, dashSize: 0.03, gapSize: 0.05, transparent: true, opacity: 0.45 }));
  spokes.computeLineDistances();
  globe.add(spokes);

  // Packets: glowing sprites that walk the links.
  const tealGlow = glowTexture('79,209,197');
  const packets = Array.from({ length: 26 }, (_, i) => {
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: i % 3 ? tealGlow : amberGlow, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
    s.scale.set(0.09, 0.09, 1);
    globe.add(s);
    return { s, edge: (i * 41) % edges.length, t: Math.random(), dir: 1, speed: 0.35 + Math.random() * 0.4 };
  });
  const pulses = [];
  const pulseGeo = new THREE.RingGeometry(0.9, 1, 32);

  // Labels: HTML pills positioned from the projected node.
  const labelLayer = document.createElement('div');
  labelLayer.className = 'globe-labels';
  host.appendChild(labelLayer);
  const labels = named.map((i) => {
    const el = document.createElement('span');
    el.className = 'globe-label';
    el.textContent = pts[i].label;
    labelLayer.appendChild(el);
    return { i, el };
  });

  let rotY = 0.6; let leanX = 0; let leanY = 0; let px = 0; let py = 0; let inside = false;
  const onPointer = (e) => {
    const r = host.getBoundingClientRect();
    px = ((e.clientX - r.left) / r.width) * 2 - 1;
    py = ((e.clientY - r.top) / r.height) * 2 - 1;
    inside = Math.abs(px) <= 1.3 && Math.abs(py) <= 1.3;
  };
  window.addEventListener('pointermove', onPointer, { passive: true });

  const tmp = new THREE.Vector3();
  const world = new THREE.Vector3();
  // Frame timing (THREE.Clock is deprecated): seconds since the last frame and since mount.
  let lastT = performance.now(); let elapsed = 0;
  const clock = { getDelta() { const now = performance.now(); const d = (now - lastT) / 1000; lastT = now; elapsed += Math.min(d, 0.05); return d; }, get elapsedTime() { return elapsed; } };
  let raf = 0; let visible = true; let first = true;

  const frame = () => {
    const dt = Math.min(clock.getDelta(), 0.05);
    const t = clock.elapsedTime;
    rotY += dt * 0.12;
    leanX += ((inside ? py * 0.3 : 0) - leanX) * 0.04;
    leanY += ((inside ? px * 0.45 : 0) - leanY) * 0.04;
    globe.rotation.y = rotY + leanY;
    globe.rotation.x = -0.25 + leanX;
    ring1.rotation.z = t * 0.35; ring2.rotation.z = -t * 0.22;
    const beat = (Math.sin(t * 2) + 1) / 2;
    halo.material.opacity = 0.4 + beat * 0.25;
    halo.scale.setScalar(1.3 + beat * 0.12);
    spokes.material.dashSize = 0.03; spokes.material.gapSize = 0.05;

    packets.forEach((k) => {
      k.t += dt * k.speed;
      if (k.t >= 1) {
        const [a, b] = edges[k.edge];
        const end = k.dir > 0 ? b : a;
        if (pts[end].label && pulses.length < 8) {
          const ring = new THREE.Mesh(pulseGeo, new THREE.MeshBasicMaterial({ color: AMBER, transparent: true, side: THREE.DoubleSide, depthWrite: false }));
          ring.position.copy(pts[end].v);
          ring.lookAt(pts[end].v.clone().multiplyScalar(2));
          globe.add(ring);
          pulses.push({ ring, life: 1 });
        }
        const options = adj[end].filter((e) => e !== k.edge);
        k.edge = options[Math.floor(Math.random() * options.length)] ?? k.edge;
        k.dir = edges[k.edge][0] === end ? 1 : -1;
        k.t = 0;
      }
      const [a, b] = edges[k.edge];
      const p = k.dir > 0 ? pts[a].v : pts[b].v;
      const q = k.dir > 0 ? pts[b].v : pts[a].v;
      k.s.position.lerpVectors(p, q, k.t);
    });
    for (let i = pulses.length - 1; i >= 0; i -= 1) {
      const pu = pulses[i];
      pu.life -= dt * 1.1;
      if (pu.life <= 0) { globe.remove(pu.ring); pu.ring.material.dispose(); pulses.splice(i, 1); continue; }
      const s = 0.02 + (1 - pu.life) * 0.12;
      pu.ring.scale.set(s, s, s);
      pu.ring.material.opacity = pu.life * 0.9;
    }

    renderer.render(scene, camera);

    // Labels on the near side only, fading in as they come round.
    const w = width(); const h = height();
    labels.forEach(({ i, el }) => {
      world.copy(pts[i].v).applyMatrix4(globe.matrixWorld);
      const facing = world.z;
      tmp.copy(world).project(camera);
      const a = Math.max(0, Math.min(1, (facing - 0.25) * 3));
      el.style.opacity = a.toFixed(2);
      el.style.transform = `translate(${((tmp.x + 1) / 2) * w + 8}px, ${((1 - tmp.y) / 2) * h - 11}px)`;
    });

    if (first) { first = false; onReady?.(); }
    raf = visible && !document.hidden ? requestAnimationFrame(frame) : 0;
  };

  const start = () => { if (!raf && visible && !document.hidden) { clock.getDelta(); raf = requestAnimationFrame(frame); } };
  const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; start(); });
  io.observe(host);
  const onVis = () => start();
  document.addEventListener('visibilitychange', onVis);
  const ro = new ResizeObserver(() => {
    renderer.setSize(width(), height());
    camera.aspect = width() / height();
    camera.updateProjectionMatrix();
  });
  ro.observe(host);
  start();

  return () => {
    cancelAnimationFrame(raf);
    io.disconnect(); ro.disconnect();
    window.removeEventListener('pointermove', onPointer);
    document.removeEventListener('visibilitychange', onVis);
    scene.traverse((o) => { o.geometry?.dispose(); if (o.material) [].concat(o.material).forEach((mt) => { mt.map?.dispose(); mt.dispose(); }); });
    renderer.dispose();
    renderer.domElement.remove();
    labelLayer.remove();
  };
}
