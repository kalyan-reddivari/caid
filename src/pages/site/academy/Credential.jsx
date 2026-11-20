import { Link } from 'react-router-dom';
import { TIERS } from '../../../content/academy.js';
import { sampleId, VERIFY_PATH } from '../../../content/credentials.js';

// What a learner receives on passing: a digital badge and a certificate with a verification link.
// Both are drawn from the selected certification, so the preview changes as visitors pick one.

// Ribbon color and its text for each tier, in the order of TIERS (the badge itself is navy).
const RIBBON = ['var(--teal-wash)', 'var(--teal)', 'var(--amber)', '#fff'];
const RIBBON_INK = ['var(--teal-deep)', '#fff', 'var(--ink)', 'var(--ink)'];

// The badge already says CERTIFIED and shows the tier, so both come out of the title.
export const shortName = (name) => name.replace(/^(CAID )?Certified /, '').replace(/ Certified /, ' ').replace(/, (Associate|Professional)$/, '');

function Mark() {
  return (
    <span className="wordmark cred-mark" aria-hidden="true">
      c<span className="brace">{'{'}</span><span className="ai">Ai</span><span className="brace">{'}'}</span>d
    </span>
  );
}

export function Badge({ cert }) {
  const i = TIERS.indexOf(cert.tier);
  const words = shortName(cert.name).split(' ');
  // Two balanced lines for the title on the badge.
  const cut = Math.ceil(words.length / 2);
  const lines = words.length > 2 ? [words.slice(0, cut).join(' '), words.slice(cut).join(' ')] : [words.join(' ')];
  return (
    <svg className="cred-badge" viewBox="0 0 240 270" role="img" aria-label={`${cert.name} digital badge`}>
      <polygon points="120,6 232,70 232,200 120,264 8,200 8,70" fill="var(--ink)" />
      <polygon points="120,22 218,78 218,192 120,248 22,192 22,78" fill="none" stroke={RIBBON[i]} strokeWidth="3" />
      <text x="120" y="78" textAnchor="middle" className="cred-badge-brand">
        c<tspan fill="#4fd1c5">{'{'}</tspan><tspan fill="var(--amber)">Ai</tspan><tspan fill="#4fd1c5">{'}'}</tspan>d
      </text>
      <text x="120" y="98" textAnchor="middle" className="cred-badge-small">CERTIFIED</text>
      {lines.map((l, n) => (
        <text key={l} x="120" y={lines.length > 1 ? 136 + n * 24 : 148} textAnchor="middle" className="cred-badge-title">{l}</text>
      ))}
      <rect x="36" y="180" width="168" height="28" rx="14" fill={RIBBON[i]} />
      <text x="120" y="198" textAnchor="middle" className="cred-badge-tier" fill={RIBBON_INK[i]}>{cert.tier.toUpperCase()}</text>
    </svg>
  );
}

export default function Credential({ cert }) {
  const id = sampleId(cert);
  return (
    <div className="cred">
      <figure className="cred-badge-wrap">
        <Badge cert={cert} />
        <figcaption>Digital badge, added to LinkedIn in one click from your verification page</figcaption>
      </figure>
      <figure className="cred-cert">
        <div className="cred-cert-inner">
          <div className="cred-cert-top">
            <Mark />
            <span className="cred-sample">Sample</span>
          </div>
          <span className="cred-label">This certifies that</span>
          <span className="cred-holder">Your Name</span>
          <span className="cred-label">has passed the exam for</span>
          <span className="cred-title">{cert.name}</span>
          <dl className="cred-meta">
            <div><dt>Issued</dt><dd>The day you pass</dd></div>
            <div><dt>Valid for</dt><dd>{cert.validity}</dd></div>
            <div><dt>Credential ID</dt><dd className="mono">{id}</dd></div>
          </dl>
          <div className="cred-verify">
            <span className="cred-seal" aria-hidden="true">✓</span>
            <span>Anyone can check it on the <Link to={`${VERIFY_PATH}?id=${id}`}>CAID verification page</Link> with the credential ID</span>
          </div>
        </div>
        <figcaption>Certificate as a PDF, plus a signed Open Badges 3.0 credential for any wallet</figcaption>
      </figure>
    </div>
  );
}
