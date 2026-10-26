import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import api, { errorMessage } from '../../api/client.js';
import { ContactArt } from '../../components/Graphics.jsx';

const INTERESTS = ['Custom applications', 'Systems integration', 'New project brief', 'AI-native delivery', 'AI adoption', 'Product development', 'Products', 'Something else'];

export default function Contact() {
  const [params] = useSearchParams();
  const [form, setForm] = useState({
    name: '', email: '', company: '', interest: params.get('interest') || INTERESTS[0], message: '',
  });
  const [state, setState] = useState({ sending: false, error: '', done: false });
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setState({ sending: true, error: '', done: false });
    try {
      await api.post('/public/contact', form);
      setState({ sending: false, error: '', done: true });
    } catch (err) {
      setState({ sending: false, error: errorMessage(err), done: false });
    }
  };

  return (
    <>
      <section className="page-hero has-art">
        <div className="wrap">
          <div>
            <h1>Contact us</h1>
            <p>Tell us what you are working on. A senior consultant replies within one business day.</p>
          </div>
          <div className="hero-art"><ContactArt /></div>
        </div>
      </section>
      <section className="section">
        <div className="wrap split">
          <div>
            <h2>Talk to us</h2>
            <dl className="details">
              <dt>Email</dt><dd><a href="mailto:hello@caid.com">hello@caid.com</a></dd>
              <dt>Phone</dt><dd><a href="tel:+14045550100">+1 (404) 555-0100</a></dd>
              <dt>Office</dt><dd>Atlanta, Georgia</dd>
              <dt>Hours</dt><dd>Monday to Friday, 9 am to 6 pm ET</dd>
            </dl>
            <div className="next-steps">
              <h3>Planning a new project?</h3>
              <p className="muted small">
                Our project brief takes five minutes and helps us come to the first call prepared. You can also see
                every stage from first conversation to launch.
              </p>
              <Link to="/process#brief">Send a project brief →</Link>
            </div>
          </div>
          <div className="panel">
            {state.done ? (
              <div className="alert alert-ok" style={{ margin: 0 }}>
                Message sent. We will reply to {form.email} within one business day.
              </div>
            ) : (
              <form className="form-grid" onSubmit={submit}>
                {state.error && <div className="alert alert-error full">{state.error}</div>}
                <label className="field"><span>Name *</span><input required value={form.name} onChange={set('name')} /></label>
                <label className="field"><span>Work email *</span><input type="email" required value={form.email} onChange={set('email')} /></label>
                <label className="field"><span>Company</span><input value={form.company} onChange={set('company')} /></label>
                <label className="field"><span>Interested in</span>
                  <select value={form.interest} onChange={set('interest')}>
                    {INTERESTS.map((i) => <option key={i}>{i}</option>)}
                  </select>
                </label>
                <label className="field full"><span>How can we help? *</span><textarea required value={form.message} onChange={set('message')} /></label>
                <div className="full"><button className="btn btn-primary" disabled={state.sending}>{state.sending ? 'Sending…' : 'Send message'}</button></div>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
