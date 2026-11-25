import DotTerrain from '../../../components/fx/DotTerrain.jsx';
import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { certById, RESOURCE_TYPES, RESOURCES, TOPICS } from '../../../content/academy.js';
import { CertLink, CONTACT_ACADEMY, FilterChips } from './shared.jsx';

const ALL = 'All';

function Prepares({ certs }) {
  if (!certs || certs.length === 0) return null;
  if (certs.includes('*')) return <p className="res-prepares">Prepares for every certification</p>;
  return (
    <div className="res-prepares">
      <span>Prepares for</span>
      <div className="cert-links">{certs.map((id) => <CertLink key={id} id={id} />)}</div>
    </div>
  );
}

export default function Resources() {
  const [params, setParams] = useSearchParams();
  const [type, setType] = useState(ALL);
  const [topic, setTopic] = useState(ALL);
  const [query, setQuery] = useState(params.get('q') || '');
  const [freeOnly, setFreeOnly] = useState(false);
  const cert = certById(params.get('cert') || '');

  const q = query.trim().toLowerCase();
  const shown = RESOURCES.filter((r) =>
    (type === ALL || r.type === type)
    && (topic === ALL || r.topic === topic)
    && (!freeOnly || r.free)
    && (!cert || (r.certs && (r.certs.includes(cert.id) || r.certs.includes('*'))))
    && (!q || `${r.title} ${r.text} ${r.source || ''}`.toLowerCase().includes(q)));
  const clearCert = () => setParams({}, { replace: true });
  const reset = () => { setType(ALL); setTopic(ALL); setQuery(''); setFreeOnly(false); clearCert(); };
  const free = RESOURCES.filter((r) => r.free).length;
  const open = RESOURCES.filter((r) => r.href).length;

  return (
    <>
      <section className="page-hero academy-hero">
        <DotTerrain />
        <div className="wrap">
          <span className="eyebrow">Resources</span>
          <h1>Courses, labs, guides, exam prep and open reading</h1>
          <p>
            Everything in the Academy catalog in one place: {free} of {RESOURCES.length} resources are free, including
            all exam prep and {open} standards and specifications we teach from. Courses and labs marked "with
            enrollment" come with a path enrollment or team training.
          </p>
        </div>
      </section>

      <section className="section academy-list">
        <div className="wrap">
          <h2 className="sr-only">Browse resources</h2>
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
            <FilterChips label="Topic" options={[ALL, ...TOPICS]} value={topic} onChange={setTopic} />
            {cert && (
              <div className="filter-row">
                <span className="filter-label">Exam</span>
                <button type="button" className="filter-chip on" onClick={clearCert} aria-label={`Stop showing only prep for ${cert.name}`}>
                  {cert.name} <span aria-hidden="true">×</span>
                </button>
              </div>
            )}
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
                <article key={r.title} className={`resource-card${r.href ? ' is-open' : ''}`}>
                  <div className="resource-top">
                    <span className={`res-type rt-${RESOURCE_TYPES.indexOf(r.type)}`}>{r.type}</span>
                    <span className={`pill ${r.free ? 'good' : 'info'}`}>{r.free ? 'Free' : 'With enrollment'}</span>
                  </div>
                  <h3>
                    {r.href
                      ? <a href={r.href} target="_blank" rel="noopener noreferrer">{r.title}<span className="sr-only"> (opens in a new tab)</span></a>
                      : r.title}
                  </h3>
                  <p>{r.text}</p>
                  <Prepares certs={r.certs} />
                  <span className="resource-meta">
                    {r.topic} · {r.level} · {r.time}{r.source && <> · <span className="res-source">{r.source} ↗</span></>}
                  </span>
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
              Free resources and every certification exam are open to everyone. Courses and labs marked "with
              enrollment" come with an individual path enrollment, a private team cohort, or a CAID engagement or
              partner agreement.
            </p>
          </div>
          <div className="access-list">
            <div><b>Individuals</b><span>Enroll in a path and get every course and lab. Certification exams are always free.</span></div>
            <div><b>Teams</b><span>Private cohorts on your schedule, with free certification for each learner.</span></div>
            <div><b>Clients and partners</b><span>Course seats bundled into engagements and partner agreements.</span></div>
            <div><b>Suggest a resource</b><span>Know a standard or open project our learners should read? Tell us and we will review it.</span></div>
            <Link className="btn btn-primary" to={CONTACT_ACADEMY}>Ask about access</Link>
          </div>
        </div>
      </section>
    </>
  );
}
