import * as THREE from 'three';

// Page-hero backdrop in WebGL: a slow field of nodes drifting in depth, with links drawn between
// near neighbours and a few amber "agents" that hop from node to node. It leans with the pointer.

const COUNT = 140;
const LINK = 0.62; // link nodes closer than this

export function mountNodeField(host) {
  const width = () => host.clientWidth || 1;
  const height = () => host.clientHeight || 1;
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
  renderer.setSize(width(), height());
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.domElement.className = 'node-field-gl';
  host.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog('#f2f3f1', 3, 7.5);
  const camera = new THREE.PerspectiveCamera(50, width() / height(), 0.1, 30);
  camera.position.set(0, 0, 4);
  const group = new THREE.Group();
  scene.add(group);

  // Nodes spread over a wide, shallow box, denser to the right where the hero art sits.
  const nodes = Array.from({ length: COUNT }, (_, i) => {
    const bias = Math.random() ** 0.7;
    return {
      p: new THREE.Vector3((bias * 2 - 0.6) * 4.2, (Math.random() - 0.5) * 3, (Math.random() - 0.5) * 3 - 0.5),
      v: new THREE.Vector3((Math.random() - 0.5) * 0.04, (Math.random() - 0.5) * 0.04, (Math.random() - 0.5) * 0.02),
      amber: i % 11 === 0,
    };
  });
  const dotGeo = new THREE.SphereGeometry(1, 10, 10);
  const dots = new THREE.InstancedMesh(dotGeo, new THREE.MeshBasicMaterial({ color: '#ffffff' }), COUNT);
  nodes.forEach((n, i) => dots.setColorAt(i, new THREE.Color(n.amber ? '#f0a93b' : '#0e7c73')));
  group.add(dots);

  const maxLinks = COUNT * 6;
  const linkPos = new Float32Array(maxLinks * 6);
  const linkGeo = new THREE.BufferGeometry();
  linkGeo.setAttribute('position', new THREE.BufferAttribute(linkPos, 3));
  const links = new THREE.LineSegments(linkGeo, new THREE.LineBasicMaterial({ color: '#0e7c73', transparent: true, opacity: 0.22 }));
  group.add(links);

  // Agents: amber sparks that travel to a nearby node, then pick another.
  const c = document.createElement('canvas'); c.width = c.height = 64;
  const g = c.getContext('2d');
  const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grd.addColorStop(0, 'rgba(240,169,59,1)'); grd.addColorStop(0.3, 'rgba(240,169,59,.5)'); grd.addColorStop(1, 'rgba(240,169,59,0)');
  g.fillStyle = grd; g.fillRect(0, 0, 64, 64);
  const spark = new THREE.CanvasTexture(c);
  const agents = Array.from({ length: 7 }, (_, i) => {
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: spark, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
    s.scale.set(0.16, 0.16, 1);
    group.add(s);
    return { s, from: i * 13, to: i * 13 + 1, t: Math.random() };
  });
  const nearest = (i) => {
    let best = -1; let bd = Infinity;
    nodes.forEach((n, j) => {
      if (j === i) return;
      const d = n.p.distanceToSquared(nodes[i].p) + Math.random() * 0.15;
      if (d < bd && d < LINK * LINK * 1.6) { bd = d; best = j; }
    });
    return best >= 0 ? best : (i + 1) % COUNT;
  };

  let px = 0; let py = 0;
  const onPointer = (e) => { px = (e.clientX / window.innerWidth) * 2 - 1; py = (e.clientY / window.innerHeight) * 2 - 1; };
  window.addEventListener('pointermove', onPointer, { passive: true });

  const m = new THREE.Matrix4();
  // Frame timing (THREE.Clock is deprecated): seconds since the last frame and since mount.
  let lastT = performance.now(); let elapsed = 0;
  const clock = { getDelta() { const now = performance.now(); const d = (now - lastT) / 1000; lastT = now; elapsed += Math.min(d, 0.05); return d; }, get elapsedTime() { return elapsed; } };
  let raf = 0; let visible = true;
  const frame = () => {
    const dt = Math.min(clock.getDelta(), 0.05);
    const t = clock.elapsedTime;
    nodes.forEach((n, i) => {
      n.p.addScaledVector(n.v, dt);
      ['x', 'y', 'z'].forEach((k, a) => {
        const lim = [4.4, 1.7, 2][a];
        if (Math.abs(n.p[k]) > lim) n.v[k] *= -1;
      });
      const s = 0.018 + (n.amber ? 0.012 : 0) + Math.sin(t * 1.5 + i) * 0.003;
      m.makeScale(s, s, s).setPosition(n.p);
      dots.setMatrixAt(i, m);
    });
    dots.instanceMatrix.needsUpdate = true;

    let k = 0;
    for (let i = 0; i < COUNT && k < maxLinks; i += 1) {
      for (let j = i + 1; j < COUNT && k < maxLinks; j += 1) {
        if (nodes[i].p.distanceToSquared(nodes[j].p) < LINK * LINK) {
          nodes[i].p.toArray(linkPos, k * 6); nodes[j].p.toArray(linkPos, k * 6 + 3); k += 1;
        }
      }
    }
    linkGeo.setDrawRange(0, k * 2);
    linkGeo.attributes.position.needsUpdate = true;

    agents.forEach((a) => {
      a.t += dt * 0.8;
      if (a.t >= 1) { a.from = a.to; a.to = nearest(a.from); a.t = 0; }
      a.s.position.lerpVectors(nodes[a.from].p, nodes[a.to].p, a.t);
    });

    group.rotation.y += ((px * 0.18) - group.rotation.y) * 0.03;
    group.rotation.x += ((py * 0.1) - group.rotation.x) * 0.03;
    renderer.render(scene, camera);
    raf = visible && !document.hidden ? requestAnimationFrame(frame) : 0;
  };
  const start = () => { if (!raf && visible && !document.hidden) { clock.getDelta(); raf = requestAnimationFrame(frame); } };
  const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; start(); });
  io.observe(host);
  const onVis = () => start();
  document.addEventListener('visibilitychange', onVis);
  const ro = new ResizeObserver(() => { renderer.setSize(width(), height()); camera.aspect = width() / height(); camera.updateProjectionMatrix(); });
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
  };
}
