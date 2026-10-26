import { useState } from 'react';
import api, { errorMessage } from '../../api/client.js';
import CrudPage from '../../components/CrudPage.jsx';
import StatusPill from '../../components/StatusPill.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { date, enumOptions, label } from '../../utils/format.js';

const APP_STATUSES = ['NEW', 'SCREENING', 'INTERVIEW', 'OFFERED', 'HIRED', 'REJECTED'];

function StatusSelect({ app, onChanged }) {
  const [error, setError] = useState('');
  const change = async (e) => {
    try {
      await api.patch(`/jobs/applications/${app.id}/status`, null, { params: { status: e.target.value } });
      onChanged();
    } catch (err) {
      setError(errorMessage(err));
    }
  };
  return (
    <>
      <select className="input" style={{ width: 'auto', padding: '.35rem .5rem' }} value={app.status} onChange={change} aria-label="Application status">
        {APP_STATUSES.map((s) => <option key={s} value={s}>{label(s)}</option>)}
      </select>
      {error && <div className="small" style={{ color: 'var(--danger)' }}>{error}</div>}
    </>
  );
}

export default function Jobs() {
  const { can } = useAuth();
  const canPostings = can('JOB_READ');
  const canApplications = can('APPLICATION_MANAGE');
  const canWrite = can('JOB_WRITE');
  const [tab, setTab] = useState(canPostings ? 'postings' : 'applications');

  return (
    <>
      {canPostings && canApplications && (
        <div className="tabs" role="tablist">
          <button role="tab" aria-selected={tab === 'postings'} className={tab === 'postings' ? 'active' : ''} onClick={() => setTab('postings')}>Job postings</button>
          <button role="tab" aria-selected={tab === 'applications'} className={tab === 'applications' ? 'active' : ''} onClick={() => setTab('applications')}>Applications</button>
        </div>
      )}

      {tab === 'postings' ? (
        <CrudPage
          title="Job postings"
          intro="Open roles appear on the public Careers page automatically."
          endpoint="/jobs"
          singular="job posting"
          canCreate={canWrite}
          canEdit={canWrite}
          canDelete={canWrite}
          columns={[
            { key: 'title', label: 'Role', render: (j) => <span><b>{j.title}</b><br /><span className="muted small">{j.department}</span></span>, text: (j) => `${j.title} ${j.department}` },
            { key: 'location', label: 'Location' },
            { key: 'employmentType', label: 'Type', render: (j) => label(j.employmentType) },
            { key: 'experience', label: 'Experience' },
            { key: 'postedDate', label: 'Posted', render: (j) => date(j.postedDate) },
            { key: 'status', label: 'Status', render: (j) => <StatusPill value={j.status} /> },
          ]}
          fields={[
            { name: 'title', label: 'Job title', required: true },
            { name: 'department', label: 'Department' },
            { name: 'location', label: 'Location', hint: 'e.g. Atlanta, GA (Hybrid)' },
            { name: 'employmentType', label: 'Employment type', type: 'select', required: true, defaultValue: 'FULL_TIME',
              options: enumOptions(['FULL_TIME', 'PART_TIME', 'CONTRACT', 'INTERNSHIP']) },
            { name: 'experience', label: 'Experience', hint: 'e.g. 3-5 years' },
            { name: 'status', label: 'Status', type: 'select', required: true, defaultValue: 'OPEN', options: enumOptions(['OPEN', 'CLOSED']) },
            { name: 'description', label: 'Role description', type: 'textarea' },
            { name: 'requirements', label: 'Requirements', type: 'textarea', hint: 'One per line' },
          ]}
        />
      ) : (
        <CrudPage
          title="Applications"
          intro="Candidates who applied through the Careers page."
          endpoint="/jobs/applications"
          singular="application"
          canCreate={false}
          canEdit={false}
          canDelete={false}
          emptyText="No applications yet. They appear here when candidates apply on the Careers page."
          columns={[
            { key: 'fullName', label: 'Candidate', text: (a) => `${a.fullName} ${a.email}`, render: (a) => (
              <span><b>{a.fullName}</b><br /><a className="small" href={`mailto:${a.email}`}>{a.email}</a>{a.phone && <span className="small muted"> · {a.phone}</span>}</span>
            ) },
            { key: 'job', label: 'Role', text: (a) => a.job?.title, render: (a) => a.job?.title },
            { key: 'profileUrl', label: 'Profile', render: (a) => a.profileUrl ? <a href={a.profileUrl} target="_blank" rel="noreferrer">Open link</a> : '—' },
            { key: 'coverLetter', label: 'Note', render: (a) => <span className="small" title={a.coverLetter}>{a.coverLetter ? `${a.coverLetter.slice(0, 80)}${a.coverLetter.length > 80 ? '…' : ''}` : '—'}</span> },
            { key: 'appliedAt', label: 'Applied', render: (a) => date(a.appliedAt) },
            { key: 'status', label: 'Stage', text: (a) => a.status, render: (a) => <StatusPill value={a.status} /> },
          ]}
          rowActions={(a, reload) => <StatusSelect app={a} onChanged={reload} />}
        />
      )}
    </>
  );
}
