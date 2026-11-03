import { Link } from 'react-router-dom';
import { certById, TIERS } from '../../../content/academy.js';

export const CONTACT_ACADEMY = '/contact?interest=Academy%20and%20certification';

// Small hexagon in the tier's color, echoing the level badges used elsewhere on the site.
export function TierMark({ tier }) {
  return <span className={`tier-mark t${TIERS.indexOf(tier)}`} aria-hidden="true" />;
}

export function CertLink({ id }) {
  const c = certById(id);
  return (
    <Link className="cert-link" to={`/ai-academy/certifications#${c.id}`}>
      <TierMark tier={c.tier} />
      {c.name}
    </Link>
  );
}

export function FilterChips({ label, options, value, onChange }) {
  return (
    <div className="filter-row" role="group" aria-label={label}>
      <span className="filter-label">{label}</span>
      {options.map((o) => (
        <button key={o} type="button" className={`filter-chip${value === o ? ' on' : ''}`} aria-pressed={value === o} onClick={() => onChange(o)}>
          {o}
        </button>
      ))}
    </div>
  );
}
