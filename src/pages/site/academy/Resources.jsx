import DotTerrain from '../../../components/fx/DotTerrain.jsx';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { RESOURCE_TYPES, RESOURCES } from '../../../content/academy.js';
import { CONTACT_ACADEMY, FilterChips } from './shared.jsx';

const ALL = 'All';

export default function Resources() {
  const [type, setType] = useState(ALL);
  const [query, setQuery] = useState('');
  const [freeOnly, setFreeOnly] = useState(false);

  const q = query.trim().toLowerCase();
  const shown = RESOURCES.filter((r) =>
    (type === ALL || r.type === type)
    && (!freeOnly || r.free)
    && (!q || `${r.title} ${r.text}`.toLowerCase().includes(q)));
  const reset = () => { setType(ALL); setQuery(''); setFreeOnly(false); };

  return (
    <>
      <section className="page-hero academy-hero">
        <DotTerrain />
        <div className="wrap">
          <span className="eyebrow">Resources</span>
          <h1>Courses, labs, guides and exam prep</h1>
          <p>
            Everything in the Academy catalogue in one place. Most guides, templates, webinars and exam prep
            are free; courses and labs come with a path enrollment or team training.
          </p>
        </div>
      </section>

      <section className="section academy-list">
        <div className="wrap">
          <div className="filters">
            <div className="search-row">
              <label className="sr-only" htmlFor="res-search">Search resources</label>
              <input id="res-search" type="search" placeholder="Search resources" value={query} onChange={(e) => setQuery(e.target.value)} />
              <label className="free-toggle">
                <input type="checkbox" checked={freeOnly} onChange={(e) => setFreeOnly(e.target.checked)} />
                Free only
              </label>
            </div>
            <FilterChips label="Type" options={[ALL, ...RESOURCE_TYPES]} value={type} onChange={setType} />
          </div>
          <p className="small muted" aria-live="polite">{shown.length} of {RESOURCES.length} resources</p>

          {shown.length === 0 ? (
            <div className="empty-note">
              Nothing matches those filters.{' '}
              <button type="button" className="link-btn" onClick={reset}>Clear filters</button>
            </div>
          ) : (
            <div className="resource-grid">
              {shown.map((r) => (
                <article key={r.title} className="resource-card">
                  <div className="resource-top">
                    <span className={`res-type rt-${RESOURCE_TYPES.indexOf(r.type)}`}>{r.type}</span>
                    <span className={`pill ${r.free ? 'good' : 'info'}`}>{r.free ? 'Free' : 'With enrollment'}</span>
                  </div>
                  <h3>{r.title}</h3>
                  <p>{r.text}</p>
                  <span className="resource-meta">{r.level} · {r.time}</span>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="section section-alt">
        <div className="wrap split">
          <div>
            <h2>Getting access</h2>
            <p className="muted">
              Free resources are open to everyone. Paid courses and labs come with an individual path enrollment,
              a private team cohort, or as part of a CAID engagement or partner agreement.
            </p>
          </div>
          <div className="access-list">
            <div><b>Individuals</b><span>Enroll in a path and get every course, lab and one exam attempt.</span></div>
            <div><b>Teams</b><span>Private cohorts on your schedule, with exam vouchers for each learner.</span></div>
            <div><b>Clients and partners</b><span>Seats and vouchers bundled into engagements and partner agreements.</span></div>
            <Link className="btn btn-primary" to={CONTACT_ACADEMY}>Ask about access</Link>
          </div>
        </div>
      </section>
    </>
  );
}
