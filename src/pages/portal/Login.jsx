import { useState } from 'react';
import { Navigate, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import Wordmark from '../../components/Wordmark.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { errorMessage } from '../../api/client.js';

const DEMO = [
  ['Super admin', 'superadmin@caid.com', 'SuperAdmin@123'],
  ['Admin', 'admin@caid.com', 'Admin@123'],
  ['HR', 'hr@caid.com', 'Hr@12345'],
  ['Manager', 'manager@caid.com', 'Manager@123'],
  ['Employee', 'employee@caid.com', 'Employee@123'],
  ['Support', 'support@caid.com', 'Support@123'],
  ['Marketing', 'marketing@caid.com', 'Marketing@123'],
  ['Finance', 'finance@caid.com', 'Finance@123'],
  ['Payroll', 'payroll@caid.com', 'Payroll@123'],
  ['Client', 'client@northwind.example', 'Client@123'],
  ['Demo', 'demo@caid.com', 'Demo@12345'],
];

export default function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [params] = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(params.get('expired') ? 'Your session ended. Sign in again to continue.' : '');
  const [busy, setBusy] = useState(false);

  if (user) return <Navigate to="/portal" replace />;

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      await login(email, password);
      navigate(location.state?.from || '/portal', { replace: true });
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-side">
        <Wordmark onDark />
        <div>
          <h2>Everything about your work at CAID, in one place.</h2>
          <p>Projects, skills, documents, payslips and hiring for the whole team.</p>
        </div>
        <span className="small">Need help? Contact hr@caid.com</span>
      </div>
      <div className="login-main">
        <div className="login-card">
          <h1 style={{ fontSize: 'var(--t-xl)' }}>Sign in</h1>
          <p className="muted">Use the email address your CAID account was created with.</p>
          {error && <div className="alert alert-error">{error}</div>}
          <form onSubmit={submit}>
            <label className="field"><span>Email</span>
              <input type="email" autoComplete="username" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label className="field"><span>Password</span>
              <input type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <button className="btn btn-primary" disabled={busy}>{busy ? 'Signing in…' : 'Sign in'}</button>
          </form>
          <div className="demo-accounts">
            Demo accounts (remove before going live):{' '}
            {DEMO.map(([name, em, pw], i) => (
              <span key={em}>
                <button type="button" onClick={() => { setEmail(em); setPassword(pw); }}>{name}</button>
                {i < DEMO.length - 1 ? ', ' : ''}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
