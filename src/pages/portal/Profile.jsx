import { useEffect, useState } from 'react';
import api, { errorMessage } from '../../api/client.js';
import { useAuth } from '../../context/AuthContext.jsx';
import { date, initials, label } from '../../utils/format.js';

export default function Profile() {
  const { user, setUser, can } = useAuth();
  const canEditSelf = can('SELF_EDIT');
  const hasWorkspace = can('SELF_WORKSPACE');
  const canSeeSkills = can('SKILL_READ');
  const [me, setMe] = useState(user);
  const [edit, setEdit] = useState({ phone: '', location: '', bio: '' });
  const [allSkills, setAllSkills] = useState([]);
  const [mySkills, setMySkills] = useState(new Set());
  const [pw, setPw] = useState({ currentPassword: '', newPassword: '', confirm: '' });
  const [msg, setMsg] = useState({});

  useEffect(() => {
    Promise.all([api.get('/employees/me'), canSeeSkills ? api.get('/skills') : Promise.resolve({ data: [] })]).then(([a, b]) => {
      setMe(a.data);
      setUser(a.data);
      setEdit({ phone: a.data.phone || '', location: a.data.location || '', bio: a.data.bio || '' });
      setMySkills(new Set(a.data.skills.map((s) => s.id)));
      setAllSkills(b.data);
    }).catch((e) => setMsg({ page: errorMessage(e) }));
  }, [setUser, canSeeSkills]);

  const flash = (key, text, ok = true) => setMsg({ [key]: { text, ok } });

  const saveProfile = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.put('/employees/me', edit);
      setMe(data); setUser(data);
      flash('profile', 'Profile saved.');
    } catch (err) { flash('profile', errorMessage(err), false); }
  };

  const saveSkills = async () => {
    try {
      const { data } = await api.put('/employees/me/skills', [...mySkills]);
      setMe(data); setUser(data);
      flash('skills', 'Skills saved.');
    } catch (err) { flash('skills', errorMessage(err), false); }
  };

  const changePassword = async (e) => {
    e.preventDefault();
    if (pw.newPassword !== pw.confirm) return flash('pw', 'New passwords do not match.', false);
    if (pw.newPassword.length < 8) return flash('pw', 'Use at least 8 characters.', false);
    try {
      await api.put('/employees/me/password', { currentPassword: pw.currentPassword, newPassword: pw.newPassword });
      setPw({ currentPassword: '', newPassword: '', confirm: '' });
      flash('pw', 'Password changed.');
    } catch (err) { flash('pw', errorMessage(err), false); }
  };

  const toggle = (id) => {
    const next = new Set(mySkills);
    next.has(id) ? next.delete(id) : next.add(id);
    setMySkills(next);
  };

  const Note = ({ k }) => msg[k] ? <div className={`alert ${msg[k].ok ? 'alert-ok' : 'alert-error'}`}>{msg[k].text}</div> : null;

  const grouped = allSkills.reduce((acc, s) => {
    (acc[s.category || 'Other'] ||= []).push(s);
    return acc;
  }, {});

  return (
    <>
      <div className="page-title"><div><h1>My profile</h1><p>{hasWorkspace ? 'Keep your contact details and skills current so managers can staff projects well.' : 'Your account details.'}</p></div></div>
      {msg.page && <div className="alert alert-error">{msg.page}</div>}

      <div className="grid-2">
        <div>
          <section className="panel">
            <div className="profile-head">
              <span className="avatar lg">{initials(me)}</span>
              <div>
                <h2>{me.fullName}</h2>
                <span className="muted">{me.designation}{me.department ? `, ${me.department}` : ''}</span>
              </div>
            </div>
            <dl className="details">
              <dt>Employee ID</dt><dd>{me.employeeCode || '—'}</dd>
              <dt>Email</dt><dd>{me.email}</dd>
              <dt>Role</dt><dd>{label(me.role)}</dd>
              <dt>Joined</dt><dd>{date(me.dateOfJoining)}</dd>
              <dt>Status</dt><dd>{label(me.status)}</dd>
            </dl>
            <p className="muted small" style={{ marginTop: '1rem' }}>{canEditSelf ? 'To change your name, role or department, contact your administrator.' : 'This is a read-only account. Nothing on it can be changed.'}</p>
          </section>

          {canEditSelf && (
          <section className="panel">
            <h2>Contact details</h2>
            <Note k="profile" />
            <form className="form-grid" onSubmit={saveProfile}>
              <label className="field"><span>Phone</span><input value={edit.phone} onChange={(e) => setEdit({ ...edit, phone: e.target.value })} /></label>
              <label className="field"><span>Location</span><input value={edit.location} onChange={(e) => setEdit({ ...edit, location: e.target.value })} /></label>
              <label className="field full"><span>About me</span><textarea maxLength={2000} value={edit.bio} onChange={(e) => setEdit({ ...edit, bio: e.target.value })} /></label>
              <div className="full"><button className="btn btn-primary">Save profile</button></div>
            </form>
          </section>
          )}
        </div>

        <div>
          {hasWorkspace && (
          <section className="panel">
            <h2>My skills</h2>
            <Note k="skills" />
            {Object.entries(grouped).map(([cat, list]) => (
              <div key={cat} style={{ marginBottom: '1rem' }}>
                <div className="small muted" style={{ fontWeight: 600, marginBottom: '.3rem' }}>{cat}</div>
                <div className="chips">
                  {list.map((s) => (
                    <label key={s.id} className="chip check" style={mySkills.has(s.id) ? { borderColor: 'var(--teal)', background: 'var(--teal-wash)' } : undefined}>
                      <input type="checkbox" checked={mySkills.has(s.id)} onChange={() => toggle(s.id)} />
                      {s.name}
                    </label>
                  ))}
                </div>
              </div>
            ))}
            <button className="btn btn-primary" onClick={saveSkills}>Save skills</button>
          </section>
          )}

          {canEditSelf && (
          <section className="panel">
            <h2>Change password</h2>
            <Note k="pw" />
            <form style={{ display: 'grid', gap: '.8rem' }} onSubmit={changePassword}>
              <label className="field"><span>Current password</span><input type="password" autoComplete="current-password" required value={pw.currentPassword} onChange={(e) => setPw({ ...pw, currentPassword: e.target.value })} /></label>
              <label className="field"><span>New password <span className="hint">8+ characters</span></span><input type="password" autoComplete="new-password" required value={pw.newPassword} onChange={(e) => setPw({ ...pw, newPassword: e.target.value })} /></label>
              <label className="field"><span>Confirm new password</span><input type="password" autoComplete="new-password" required value={pw.confirm} onChange={(e) => setPw({ ...pw, confirm: e.target.value })} /></label>
              <div><button className="btn btn-ink">Change password</button></div>
            </form>
          </section>
          )}
        </div>
      </div>
    </>
  );
}
