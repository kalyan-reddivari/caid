import DotTerrain from '../../../components/fx/DotTerrain.jsx';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IconTile } from '../../../components/Icons.jsx';
import { FORMATS, formatMins, LEVELS, PATHS, ROLES } from '../../../content/academy.js';
import { CertLink, CONTACT_ACADEMY, FilterChips } from './shared.jsx';

const ALL = 'All';

export default function Paths() {
  const [role, setRole] = useState(ALL);
  const [level, setLevel] = useState(ALL);
  const shown = PATHS.filter((p) => (role === ALL || p.role === role) && (level === ALL || p.level === level));

  return (
    <>
      <section className="page-hero academy-hero">
        <DotTerrain />
        <div className="wrap">
          <span className="eyebrow">Learning paths</span>
          <h1>From first prompt to production, by role</h1>
          <p>
            Pick the path for the work you do. Each one is an ordered set of self-paced courses, live sessions
            and labs, and ends with the certification that proves it.
          </p>
        </div>
      </section>

      <section className="section academy-list">
        <div className="wrap">
          <div className="filters">
            <FilterChips label="Role" options={[ALL, ...ROLES]} value={role} onChange={setRole} />
            <FilterChips label="Level" options={[ALL, ...LEVELS]} value={level} onChange={setLevel} />
          </div>
          <p className="small muted" aria-live="polite">{shown.length} of {PATHS.length} paths</p>

          {shown.length === 0 && (
            <div className="empty-note">
              No path matches both filters yet.{' '}
              <button type="button" className="link-btn" onClick={() => { setRole(ALL); setLevel(ALL); }}>Clear filters</button>
            </div>
          )}

          <div className="path-list">
            {shown.map((p) => (
              <article key={p.id} id={p.id} className="path-card">
                <div className="path-main">
                  <div className="path-head">
                    <IconTile name={p.icon} tone="ink" />
                    <div>
                      <span className="path-meta">{p.role} · {p.level} · {p.hours} hours</span>
                      <h2>{p.title}</h2>
                    </div>
                  </div>
                  <p>{p.summary}</p>
                  <h3 className="mini-head">You will be able to</h3>
                  <ul className="outcomes">
                    {p.outcomes.map((o) => <li key={o}>{o}</li>)}
                  </ul>
                  <h3 className="mini-head">Leads to</h3>
                  <div className="cert-links">
                    {p.certs.map((id) => <CertLink key={id} id={id} />)}
                  </div>
                </div>
                <ol className="course-list" aria-label={`${p.title} courses`}>
                  {p.courses.map((c) => (
                    <li key={c.title}>
                      <span className="course-title">{c.title}</span>
                      <span className={`format f-${c.format}`}>{FORMATS[c.format]}</span>
                      <span className="course-time">{formatMins(c.mins)}</span>
                    </li>
                  ))}
                </ol>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="wrap">
          <h2>Need a path for a whole team? We tailor paths and run them as private cohorts.</h2>
          <Link className="btn" to={CONTACT_ACADEMY}>Plan team training</Link>
        </div>
      </section>
    </>
  );
}
