import CrudPage from '../../components/CrudPage.jsx';
import StatusPill from '../../components/StatusPill.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { date, enumOptions } from '../../utils/format.js';

export default function Clients() {
  const { can } = useAuth();

  const columns = [
    { key: 'name', label: 'Client', render: (c) => (
      <span><b>{c.name}</b><br /><span className="muted small">{c.industry || '—'}</span></span>
    ), text: (c) => `${c.name} ${c.industry || ''}` },
    { key: 'contactPerson', label: 'Contact', text: (c) => `${c.contactPerson || ''} ${c.email || ''}`, render: (c) => (
      <span>{c.contactPerson || '—'}<br />{c.email && <a className="small" href={`mailto:${c.email}`}>{c.email}</a>}</span>
    ) },
    { key: 'phone', label: 'Phone' },
    { key: 'website', label: 'Website', render: (c) => c.website ? <a href={c.website} target="_blank" rel="noreferrer">{c.website.replace(/^https?:\/\//, '')}</a> : '—' },
    { key: 'since', label: 'Client since', render: (c) => date(c.since) },
    { key: 'status', label: 'Status', render: (c) => <StatusPill value={c.status} /> },
  ];

  const fields = [
    { name: 'name', label: 'Company name', required: true },
    { name: 'industry', label: 'Industry' },
    { name: 'contactPerson', label: 'Contact person' },
    { name: 'email', label: 'Contact email', type: 'email' },
    { name: 'phone', label: 'Phone', type: 'tel' },
    { name: 'website', label: 'Website', type: 'url' },
    { name: 'status', label: 'Status', type: 'select', required: true, defaultValue: 'ACTIVE', options: enumOptions(['PROSPECT', 'ACTIVE', 'INACTIVE']) },
    { name: 'since', label: 'Client since', type: 'date' },
    { name: 'address', label: 'Address', full: true },
    { name: 'notes', label: 'Notes', type: 'textarea' },
  ];

  return (
    <CrudPage title="Clients" intro="Client accounts and primary contacts." endpoint="/clients"
      singular="client" columns={columns} fields={fields}
      canCreate={can('CLIENT_WRITE')} canEdit={can('CLIENT_WRITE')} canDelete={can('CLIENT_DELETE')} />
  );
}
