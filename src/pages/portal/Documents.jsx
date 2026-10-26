import { useCallback, useEffect, useRef, useState } from 'react';
import api, { errorMessage } from '../../api/client.js';
import { useAuth } from '../../context/AuthContext.jsx';
import { bytes, date, enumOptions, label } from '../../utils/format.js';

const CATEGORIES = enumOptions(['ID_PROOF', 'OFFER_LETTER', 'CONTRACT', 'CERTIFICATE', 'TAX_FORM', 'PAYSLIP', 'OTHER']);

export default function Documents() {
  const { user, can } = useAuth();
  // Whoever may manage everyone's documents sees all of them; everyone else sees only their own.
  const isHr = can('DOCUMENT_MANAGE_ALL');
  const [docs, setDocs] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [filter, setFilter] = useState(''); // employee id for HR view; '' = all
  const [target, setTarget] = useState(String(user.id));
  const [category, setCategory] = useState('OTHER');
  const [file, setFile] = useState(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState(null);
  const fileInput = useRef(null);

  const load = useCallback(async () => {
    try {
      const url = isHr ? '/documents' : '/documents/me';
      const { data } = await api.get(url, { params: isHr && filter ? { employeeId: filter } : undefined });
      setDocs(data);
    } catch (e) {
      setMsg({ ok: false, text: errorMessage(e) });
    }
  }, [isHr, filter]);

  useEffect(() => { load(); }, [load]);
  useEffect(() => {
    if (isHr) api.get('/employees').then((r) => setEmployees(r.data)).catch(() => {});
  }, [isHr]);

  const upload = async (e) => {
    e.preventDefault();
    if (!file) return setMsg({ ok: false, text: 'Choose a file to upload.' });
    const body = new FormData();
    body.append('file', file);
    body.append('category', category);
    if (isHr) body.append('employeeId', target);
    setBusy(true);
    try {
      await api.post('/documents', body);
      setMsg({ ok: true, text: `${file.name} uploaded.` });
      setFile(null);
      if (fileInput.current) fileInput.current.value = '';
      load();
    } catch (err) {
      setMsg({ ok: false, text: errorMessage(err) });
    } finally {
      setBusy(false);
    }
  };

  const download = async (doc) => {
    try {
      const res = await api.get(`/documents/${doc.id}/download`, { responseType: 'blob' });
      const url = URL.createObjectURL(res.data);
      const a = document.createElement('a');
      a.href = url;
      a.download = doc.fileName;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      setMsg({ ok: false, text: errorMessage(err) });
    }
  };

  const remove = async (doc) => {
    if (!window.confirm(`Delete ${doc.fileName}? This cannot be undone.`)) return;
    try {
      await api.delete(`/documents/${doc.id}`);
      load();
    } catch (err) {
      setMsg({ ok: false, text: errorMessage(err) });
    }
  };

  return (
    <>
      <div className="page-title">
        <div>
          <h1>Documents</h1>
          <p>{isHr ? 'Employee records: IDs, contracts, certificates and tax forms.' : 'Your personal records. Only you and HR can see them.'}</p>
        </div>
      </div>

      {msg && <div className={`alert ${msg.ok ? 'alert-ok' : 'alert-error'}`}>{msg.text}</div>}

      <section className="panel" style={{ marginBottom: '1.25rem' }}>
        <h2>Upload a document</h2>
        <form className="form-grid" onSubmit={upload}>
          {isHr && (
            <label className="field"><span>Employee</span>
              <select value={target} onChange={(e) => setTarget(e.target.value)}>
                {employees.map((e) => <option key={e.id} value={e.id}>{e.fullName}</option>)}
              </select>
            </label>
          )}
          <label className="field"><span>Category</span>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              {CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
          </label>
          <label className="field full"><span>File <span className="hint">PDF, Word, Excel, CSV, TXT or image, up to 10 MB</span></span>
            <input ref={fileInput} type="file" accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.txt,.xlsx,.csv"
              onChange={(e) => setFile(e.target.files[0] || null)} />
          </label>
          <div className="full"><button className="btn btn-primary" disabled={busy}>{busy ? 'Uploading…' : 'Upload document'}</button></div>
        </form>
      </section>

      {isHr && (
        <div className="toolbar">
          <label className="small" htmlFor="doc-filter">Show documents for</label>
          <select id="doc-filter" className="input" style={{ maxWidth: 260 }} value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="">All employees</option>
            {employees.map((e) => <option key={e.id} value={e.id}>{e.fullName}</option>)}
          </select>
        </div>
      )}

      <div className="table-wrap">
        <table className="data">
          <thead>
            <tr>
              <th>File</th>
              {isHr && <th>Employee</th>}
              <th>Category</th><th>Size</th><th>Uploaded</th><th>By</th>
              <th><span className="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody>
            {docs.length === 0 && (
              <tr><td colSpan={7} className="empty">No documents yet. Upload one above.</td></tr>
            )}
            {docs.map((d) => (
              <tr key={d.id}>
                <td><b>{d.fileName}</b></td>
                {isHr && <td>{d.employee?.fullName}</td>}
                <td>{label(d.category)}</td>
                <td>{bytes(d.sizeBytes)}</td>
                <td>{date(d.uploadedAt)}</td>
                <td>{d.uploadedBy}</td>
                <td className="actions">
                  <button className="btn btn-ghost btn-sm" onClick={() => download(d)}>Download</button>
                  <button className="btn btn-danger btn-sm" onClick={() => remove(d)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
