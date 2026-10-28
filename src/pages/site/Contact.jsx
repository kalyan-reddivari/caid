import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import api, { errorMessage } from '../../api/client.js';
import CallButton from '../../components/CallButton.jsx';
import NextSteps from '../../components/NextSteps.jsx';
import SITE, { hasBooking } from '../../site.config.js';
import { track, trackStart } from '../../utils/track.js';

const INTERESTS = ['Discovery call', 'Custom applications', 'Systems integration', 'New project brief', 'AI-native delivery', 'AI adoption', 'Product development', 'Products', 'Something else'];
const EMPTY = { name: '', email: '', company: '', interest: INTERESTS[0], message: '' };
const onStart = trackStart('contact');

export default function Contact() {
  const [params] = useSearchParams();
  const [form, setForm] = useState(EMPTY);
  const [state, setState] = useState({ sending: false, error: '', done: false });
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  // Read ?interest= after the first render, so the prerendered page and the browser agree.
  useEffect(() => {
    const wanted = params.get('interest');
    if (wanted && INTERESTS.includes(wanted)) setForm((f) => ({ ...f, interest: wanted }));
  }, [params]);

  const wantsCall = form.interest === 'Discovery call';

  const submit = async (e) => {
    e.preventDefault();
    setState({ sending: true, error: '', done: false });
    try {
      await api.post('/public/contact', form);
      track('form_submit', { form: 'contact', interest: form.interest });
      setState({ sending: false, error: '', done: true });
    } catch (err) {
      setState({ sending: false, error: friendlyError(err), done: false });
    }
  };

  return (
    <>
      <section className="page-hero contact-hero">
        <div className="wrap">
          <span className="eyebrow">Contact</span>
          <h1>Talk to a senior consultant</h1>
          <p>Tell us what you are working on. You will hear from a consultant, not a salesperson, within one business day.</p>
        </div>
      </section>

      <section className="section contact-section" id="book">
        <div className="wrap contact-layout">
          <div className="panel contact-form-panel">
            {state.done ? (
              <div className="form-done" role="status">
                <h2>Thanks, {form.name.split(' ')[0] || 'we have it'}. Your message is with us.</h2>
                <NextSteps email={form.email} call={wantsCall} />
                {hasBooking() && (
                  <p className="small">Rather pick a time now? <CallButton className="link-btn" from="contact-done">Open the booking page</CallButton></p>
                )}
              </div>
            ) : (
              <form className="form-grid" onSubmit={submit} onFocus={onStart}>
                <div className="full">
                  <h2>{wantsCall ? 'Request a free 30-minute call' : 'Send us a message'}</h2>
                  <p className="muted small">
                    {wantsCall
                      ? 'Tell us a little about the problem and we will reply with times that suit you.'
                      : 'A few lines is enough. We will ask the rest on the call.'}
                  </p>
                </div>
                {state.error && <div className="alert alert-error full" role="alert">{state.error}</div>}
                <label className="field"><span>Name *</span><input required autoComplete="name" value={form.name} onChange={set('name')} /></label>
                <label className="field"><span>Work email *</span><input type="email" required autoComplete="email" value={form.email} onChange={set('email')} /></label>
                <label className="field"><span>Company</span><input autoComplete="organization" value={form.company} onChange={set('company')} /></label>
                <label className="field"><span>What would you like?</span>
                  <select value={form.interest} onChange={set('interest')}>
                    {INTERESTS.map((i) => <option key={i}>{i}</option>)}
                  </select>
                </label>
                <label className="field full"><span>How can we help? *</span>
                  <textarea required value={form.message} onChange={set('message')}
                    placeholder="What you are trying to fix or build, and which systems are involved." />
                </label>
                <div className="full form-foot">
                  <button className="btn btn-primary" disabled={state.sending}>
                    {state.sending ? 'Sending…' : wantsCall ? 'Request my call' : 'Send message'}
                  </button>
                  <span className="small muted">
                    We only use these details to reply to you. <Link to="/privacy">Privacy policy</Link>
                  </span>
                </div>
              </form>
            )}
          </div>

          <aside className="contact-side">
            {hasBooking() && (
              <div className="contact-option">
                <h2>Pick a time yourself</h2>
                <p className="muted small">Choose a 30-minute slot with a senior consultant. Free, no obligation.</p>
                <CallButton from="contact-side">Open the booking page</CallButton>
              </div>
            )}
            <div className="contact-option">
              <h2>Planning a new project?</h2>
              <p className="muted small">
                The five-minute project brief covers budget, timeline and systems, so the first call starts
                with answers instead of questions.
              </p>
              <Link className="btn btn-ghost" to="/process#brief" data-track="brief:contact">Send a project brief</Link>
            </div>
            <dl className="details">
              <dt>Email</dt><dd><a href={`mailto:${SITE.email}`}>{SITE.email}</a></dd>
              {SITE.phone && (<><dt>Phone</dt><dd><a href={`tel:${SITE.phone}`}>{SITE.phoneDisplay}</a></dd></>)}
              <dt>Office</dt><dd>{SITE.city}, {SITE.region}</dd>
              <dt>Hours</dt><dd>{SITE.hours}</dd>
            </dl>
          </aside>
        </div>
      </section>
    </>
  );
}

function friendlyError(err) {
  if (!err.response) return `We couldn't send your message just now. Please try again, or email ${SITE.email}.`;
  return errorMessage(err);
}
