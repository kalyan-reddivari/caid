import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import api from '../../../api/client.js';
import DotTerrain from '../../../components/fx/DotTerrain.jsx';
import { certById } from '../../../content/academy.js';
import { formatDate, linkedInUrl, sampleCredential } from '../../../content/credentials.js';
import { Badge } from './Credential.jsx';

const STATUS = {
  active: { label: 'Valid', tone: 'good', text: 'This credential was issued by CAID and is current.' },
  expired: { label: 'Expired', tone: 'warn', text: 'This credential was issued by CAID but has passed its expiry date.' },
  revoked: { label: 'Revoked', tone: 'bad', text: 'CAID has revoked this credential. It is no longer valid.' },
};

function Result({ cred }) {
  const cert = certById(cred.certId);
  const status = STATUS[cred.status] || STATUS.active;
  return (
    <article className="verify-result" aria-live="polite">
      {cert && <Badge cert={cert} />}
      <div>
        <span className={`pill ${status.tone}`}>{status.label}</span>
        {cred.sample && <span className="pill warn">Sample</span>}
        <h2>{cert ? cert.name : cred.certName}</h2>
        <p className="muted">
          {cred.sample
            ? 'This is a sample credential that shows what a check looks like. It was not issued to anyone.'
            : status.text}
        </p>
        <dl className="exam-facts">
          <div><dt>Issued to</dt><dd>{cred.holderName}</dd></div>
          <div><dt>Credential ID</dt><dd className="mono">{cred.id}</dd></div>
          <div><dt>Issued</dt><dd>{formatDate(cred.issuedAt)}</dd></div>
          <div><dt>{cred.status === 'expired' ? 'Expired' : 'Valid until'}</dt><dd>{cred.expiresAt ? formatDate(cred.expiresAt) : 'No expiry'}</dd></div>
        </dl>
        <div className="cert-actions">
          {cred.status === 'active' && !cred.sample && (
            <a className="btn btn-primary" href={linkedInUrl(cred)} target="_blank" rel="noopener noreferrer">Add to LinkedIn</a>
          )}
          {cred.credentialUrl && (
            <a className="btn btn-ghost" href={cred.credentialUrl} download>Download signed credential</a>
          )}
          {cert && <Link className="btn btn-ghost" to={`/ai-academy/certifications#${cert.id}`}>About this certification</Link>}
        </div>
      </div>
    </article>
  );
}

export default function Verify() {
  const [params, setParams] = useSearchParams();
  const id = (params.get('id') || '').trim();
  const [input, setInput] = useState(id);
  const [state, setState] = useState({ status: 'idle' });

  useEffect(() => {
    setInput(id);
    if (!id) { setState({ status: 'idle' }); return undefined; }
    const sample = sampleCredential(id);
    if (sample) { setState({ status: 'found', cred: sample }); return undefined; }
    let live = true;
    setState({ status: 'loading' });
    api.get(`/public/credentials/${encodeURIComponent(id)}`)
      .then((res) => live && setState({ status: 'found', cred: res.data }))
      .catch((err) => live && setState({ status: err.response?.status === 404 ? 'missing' : 'error' }));
    return () => { live = false; };
  }, [id]);

  const submit = (e) => {
    e.preventDefault();
    const next = input.trim();
    setParams(next ? { id: next } : {});
  };

  return (
    <>
      <section className="page-hero academy-hero">
        <DotTerrain />
        <div className="wrap">
          <span className="eyebrow">Verify a credential</span>
          <h1>Check a CAID certification</h1>
          <p>
            Enter the credential ID from a certificate, badge or LinkedIn profile to confirm who holds it,
            when it was issued and whether it is still valid.
          </p>
        </div>
      </section>

      <section className="section academy-list">
        <div className="wrap">
          <form className="verify-form" onSubmit={submit}>
            <label htmlFor="cred-id">Credential ID</label>
            <div className="verify-row">
              <input id="cred-id" className="mono" value={input} onChange={(e) => setInput(e.target.value)}
                placeholder="CAID-XXXX-XXXX-XXXX" autoComplete="off" spellCheck="false" />
              <button className="btn btn-primary" type="submit">Verify</button>
            </div>
          </form>

          {state.status === 'loading' && <p className="muted" aria-live="polite">Checking…</p>}
          {state.status === 'missing' && (
            <div className="empty-note" role="alert">
              No CAID credential has the ID <span className="mono">{id}</span>. Check it for typos, or ask the holder for their verification link.
            </div>
          )}
          {state.status === 'error' && (
            <div className="empty-note" role="alert">
              The verification service could not be reached just now. Try again in a minute, or <Link to="/contact?interest=Academy%20and%20certification">contact us</Link> to confirm a credential.
            </div>
          )}
          {state.status === 'found' && <Result cred={state.cred} />}

          <div className="verify-notes">
            <div>
              <h3>Open standard</h3>
              <p>Every credential is a signed Open Badges 3.0 credential, so any compliant wallet or verifier can check it, not only this page.</p>
            </div>
            <div>
              <h3>Holders stay in control</h3>
              <p>This page shows only the holder's name, the certification and its dates. Nothing else about them is shared.</p>
            </div>
            <div>
              <h3>Free for everyone</h3>
              <p>Earning, sharing and checking a CAID credential costs nothing.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
