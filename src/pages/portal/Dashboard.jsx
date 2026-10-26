import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api, { errorMessage } from '../../api/client.js';
import { useAuth } from '../../context/AuthContext.jsx';
import StatusPill from '../../components/StatusPill.jsx';
import { MONTHS, label, money } from '../../utils/format.js';

export default function Dashboard() {
  const { user, can } = useAuth();
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/dashboard').then((r) => setData(r.data)).catch((e) => setError(errorMessage(e)));
  }, []);

  if (error) return <div className="alert alert-error">{error}</div>;
  if (!data) return <p className="muted">Loading dashboard…</p>;

  const org = data.organization;
  const pay = data.latestPayslip;
  const hasWorkspace = can('SELF_WORKSPACE');
  const isClient = !hasWorkspace && can('PROJECT_READ_CLIENT');
  const projects = data.myProjects || [];

  const myProjectsPanel = (
    <section className="panel">
      <h2>{isClient ? 'Your projects' : 'My projects'}</h2>
      {projects.length === 0 ? (
        <p className="muted">
          {isClient
            ? 'No projects are linked to your organisation yet.'
            : 'You are not assigned to a project yet. Your manager will add you when staffing is confirmed.'}
        </p>
      ) : (
        <ul className="list-plain">
          {projects.map((p) => (
            <li key={p.id}>
              <span>
                <b>{p.name}</b><br />
                <span className="muted small">{p.client?.name || 'Internal product'} · {label(p.type)}</span>
              </span>
              <span style={{ textAlign: 'right' }}>
                <StatusPill value={p.status} />
                <div className="progress" style={{ marginTop: '.4rem' }}><i style={{ width: `${p.progress || 0}%` }} /></div>
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );

  return (
    <>
      <div className="page-title">
        <div>
          <h1>Welcome back, {user.firstName}</h1>
          <p>{user.designation || label(user.role)}{user.department ? `, ${user.department}` : ''}</p>
        </div>
      </div>

      {/* Each number is only present when the server says this role may see it. */}
      {org && (
        <div className="stats">
          {org.activeEmployees !== undefined && (
            <Link className="stat" to="/portal/employees"><b>{org.activeEmployees}</b><span>Active employees</span></Link>
          )}
          {org.projectsInProgress !== undefined && (
            <Link className="stat" to="/portal/projects"><b>{org.projectsInProgress}</b><span>Projects in progress</span></Link>
          )}
          {org.activeClients !== undefined && (
            <Link className="stat" to="/portal/clients"><b>{org.activeClients}</b><span>Active clients</span></Link>
          )}
          {org.openJobs !== undefined && (
            <Link className="stat" to="/portal/jobs"><b>{org.openJobs}</b><span>Open roles{org.newApplications !== undefined ? `, ${org.newApplications} new applicants` : ''}</span></Link>
          )}
          {org.openJobs === undefined && org.newApplications !== undefined && (
            <Link className="stat" to="/portal/jobs"><b>{org.newApplications}</b><span>New applicants</span></Link>
          )}
          {org.openInquiries !== undefined && (
            <Link className="stat" to="/portal/inquiries"><b>{org.openInquiries}</b><span>Open website inquiries</span></Link>
          )}
        </div>
      )}

      {hasWorkspace ? (
        <div className="grid-2">
          {myProjectsPanel}
          <div>
            <section className="panel">
              <h2>Latest payslip</h2>
              {pay ? (
                <>
                  <p style={{ margin: 0 }}><b style={{ fontSize: 'var(--t-lg)', fontFamily: 'var(--font-display)' }}>{money(pay.netPay)}</b></p>
                  <p className="muted small">Net pay for {MONTHS[pay.month - 1]} {pay.year} <StatusPill value={pay.status} /></p>
                  <Link to="/portal/payroll">View all payslips</Link>
                </>
              ) : <p className="muted">No payslips yet.</p>}
            </section>
            <section className="panel">
              <h2>My records</h2>
              <ul className="list-plain">
                <li><span>Skills on profile</span><Link to="/portal/profile">{data.mySkillCount}</Link></li>
                <li><span>Documents</span><Link to="/portal/documents">{data.myDocumentCount}</Link></li>
              </ul>
            </section>
          </div>
        </div>
      ) : isClient ? (
        myProjectsPanel
      ) : (
        <section className="panel">
          <h2>Read-only access</h2>
          <p className="muted">This account can look around but cannot change anything. Use the menu to browse the areas your role can see.</p>
        </section>
      )}

      {org?.projectsByStatus && (
        <section className="panel" style={{ marginTop: '1.25rem' }}>
          <h2>Projects by status</h2>
          <div className="stats" style={{ margin: 0 }}>
            {Object.entries(org.projectsByStatus).map(([k, v]) => (
              <div key={k} className="stat"><b>{v}</b><span>{label(k)}</span></div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
