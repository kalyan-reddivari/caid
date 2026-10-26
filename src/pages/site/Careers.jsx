import { useEffect, useState } from 'react';
import api, { errorMessage } from '../../api/client.js';
import Modal from '../../components/Modal.jsx';
import { Link } from 'react-router-dom';
import { CareersArt } from '../../components/Graphics.jsx';
import { LearnMiniArt } from '../../components/AIGraphics.jsx';
import { date, label } from '../../utils/format.js';

const EMPTY = { fullName: '', email: '', phone: '', profileUrl: '', coverLetter: '' };

export default function Careers() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [viewing, setViewing] = useState(null);
  const [applying, setApplying] = useState(false);
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState({ sending: false, error: '', done: false });

  useEffect(() => {
    api.get('/public/jobs')
      .then((r) => setJobs(r.data))
      .catch((e) => setError(errorMessage(e)))
      .finally(() => setLoading(false));
  }, []);

  const close = () => {
    setViewing(null);
    setApplying(false);
    setForm(EMPTY);
    setStatus({ sending: false, error: '', done: false });
  };

  const submit = async (e) => {
    e.preventDefault();
    setStatus({ sending: true, error: '', done: false });
    try {
      await api.post(`/public/jobs/${viewing.id}/apply`, form);
      setStatus({ sending: false, error: '', done: true });
    } catch (err) {
      setStatus({ sending: false, error: errorMessage(err), done: false });
    }
  };

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  return (
    <>
      <section className="page-hero has-art">
        <div className="wrap">
          <div>
            <h1>Careers at CAID</h1>
            <p>Work on real client systems, learn from senior engineers, and help teams adopt AI responsibly.</p>
          </div>
          <CareersArt />
        </div>
      </section>

      <section className="section section-alt">
        <div className="wrap">
          <div className="academy-band">
            <LearnMiniArt />
            <div>
              <h2>You will be trained to work with AI, whatever your role</h2>
              <p>Every hire joins the CAID AI Academy: a four-level path with labs, mentors and paid certification time.</p>
            </div>
            <Link className="btn btn-ink" to="/ai-academy">See the Academy</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <h2>Open roles</h2>
          {loading && <p className="muted">Loading roles…</p>}
          {error && <div className="alert alert-error">{error}</div>}
          {!loading && !error && jobs.length === 0 && (
            <p className="muted">No roles are open right now. Send your profile to careers@caid.com and we will keep it on file.</p>
          )}
          <div>
            {jobs.map((j) => (
              <div className="job-row" key={j.id}>
                <div>
                  <h3>{j.title}</h3>
                  <div className="job-meta">
                    <span>{j.department}</span>
                    <span>{j.location}</span>
                    <span>{label(j.employmentType)}</span>
                    {j.experience && <span>{j.experience}</span>}
                    <span>Posted {date(j.postedDate)}</span>
                  </div>
                </div>
                <button className="btn btn-ghost" onClick={() => setViewing(j)}>View role</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {viewing && (
        <Modal
          title={applying ? `Apply: ${viewing.title}` : viewing.title}
          onClose={close}
          footer={
            status.done ? <button className="btn btn-primary" onClick={close}>Done</button>
              : applying ? (
                <>
                  <button className="btn btn-ghost" onClick={() => setApplying(false)}>Back to role</button>
                  <button className="btn btn-primary" type="submit" form="apply-form" disabled={status.sending}>
                    {status.sending ? 'Sending…' : 'Send application'}
                  </button>
                </>
              ) : <button className="btn btn-primary" onClick={() => setApplying(true)}>Apply for this role</button>
          }
        >
          {status.done ? (
            <div className="alert alert-ok">Application sent. Our team reviews every application and replies within five working days.</div>
          ) : applying ? (
            <form id="apply-form" className="form-grid" onSubmit={submit}>
              {status.error && <div className="alert alert-error full">{status.error}</div>}
              <label className="field"><span>Full name *</span><input required value={form.fullName} onChange={set('fullName')} /></label>
              <label className="field"><span>Email *</span><input type="email" required value={form.email} onChange={set('email')} /></label>
              <label className="field"><span>Phone</span><input type="tel" value={form.phone} onChange={set('phone')} /></label>
              <label className="field"><span>Resume or LinkedIn link</span><input type="url" placeholder="https://" value={form.profileUrl} onChange={set('profileUrl')} /></label>
              <label className="field full"><span>Why this role?</span><textarea value={form.coverLetter} onChange={set('coverLetter')} /></label>
            </form>
          ) : (
            <>
              <div className="job-meta" style={{ marginBottom: '1rem' }}>
                <span>{viewing.department}</span><span>{viewing.location}</span>
                <span>{label(viewing.employmentType)}</span>{viewing.experience && <span>{viewing.experience}</span>}
              </div>
              <p>{viewing.description}</p>
              {viewing.requirements && (
                <>
                  <h3>What you bring</h3>
                  <ul>{viewing.requirements.split('\n').filter(Boolean).map((r) => <li key={r}>{r}</li>)}</ul>
                </>
              )}
            </>
          )}
        </Modal>
      )}
    </>
  );
}
