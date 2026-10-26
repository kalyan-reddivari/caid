import api from '../../api/client.js';
import CrudPage from '../../components/CrudPage.jsx';
import { date } from '../../utils/format.js';

export default function Inquiries() {
  return (
    <CrudPage
      title="Inquiries"
      intro="Messages sent from the website contact form."
      endpoint="/inquiries"
      singular="inquiry"
      canCreate={false}
      canEdit={false}
      canDelete={false}
      emptyText="No inquiries yet. Messages from the Contact page appear here."
      columns={[
        { key: 'name', label: 'From', text: (q) => `${q.name} ${q.email} ${q.company || ''}`, render: (q) => (
          <span><b>{q.name}</b>{q.company && <span className="muted">, {q.company}</span>}<br /><a className="small" href={`mailto:${q.email}`}>{q.email}</a></span>
        ) },
        { key: 'interest', label: 'Interest' },
        { key: 'message', label: 'Message', render: (q) => <span className="small" style={{ display: 'block', maxWidth: '44ch', whiteSpace: 'pre-line' }}>{q.message}</span> },
        { key: 'createdAt', label: 'Received', render: (q) => date(q.createdAt) },
        { key: 'resolved', label: 'Status', text: (q) => (q.resolved ? 'resolved' : 'open'), render: (q) => <span className={`pill ${q.resolved ? 'good' : 'warn'}`}>{q.resolved ? 'Resolved' : 'Open'}</span> },
      ]}
      rowActions={(q, reload) => (
        <button className="btn btn-ghost btn-sm"
          onClick={() => api.patch(`/inquiries/${q.id}/resolve`, null, { params: { resolved: !q.resolved } }).then(reload)}>
          {q.resolved ? 'Reopen' : 'Mark resolved'}
        </button>
      )}
    />
  );
}
