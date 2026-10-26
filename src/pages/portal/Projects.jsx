import CrudPage from '../../components/CrudPage.jsx';
import StatusPill from '../../components/StatusPill.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { date, enumOptions, label, money } from '../../utils/format.js';

export default function Projects() {
  const { can } = useAuth();
  const canManage = can('PROJECT_WRITE');
  const seesAll = can('PROJECT_READ_ALL');
  const clientOnly = !seesAll && can('PROJECT_READ_CLIENT');

  const columns = [
    { key: 'code', label: 'Code', nowrap: true },
    {
      key: 'name', label: 'Project', minWidth: 200, text: (p) => `${p.name} ${p.techStack || ''}`,
      render: (p) => (
        <span><b>{p.name}</b><br /><span className="muted small">{p.techStack || label(p.type)}</span></span>
      ),
    },
    ...(clientOnly ? [] : [{ key: 'client', label: 'Client', minWidth: 120, text: (p) => p.client?.name, render: (p) => p.client?.name || <span className="muted">Internal</span> }]),
    { key: 'type', label: 'Type', text: (p) => p.type, render: (p) => label(p.type) },
    { key: 'manager', label: 'Manager', text: (p) => p.manager?.fullName, render: (p) => p.manager?.fullName || '—' },
    { key: 'team', label: 'Team', nowrap: true, render: (p) => `${p.members.length} ${p.members.length === 1 ? 'person' : 'people'}`, text: (p) => p.members.map((m) => m.fullName).join(' ') },
    { key: 'dates', label: 'Timeline', nowrap: true, render: (p) => <span className="small">{date(p.startDate)}<br />to {p.endDate ? date(p.endDate) : 'ongoing'}</span> },
    ...(seesAll ? [{ key: 'budget', label: 'Budget', nowrap: true, render: (p) => money(p.budget, 0) }] : []),
    {
      key: 'status', label: 'Status', text: (p) => p.status,
      render: (p) => (
        <span>
          <StatusPill value={p.status} />
          <div className="progress" style={{ marginTop: '.35rem' }} title={`${p.progress || 0}% complete`}><i style={{ width: `${p.progress || 0}%` }} /></div>
        </span>
      ),
    },
  ];

  const fields = [
    { name: 'name', label: 'Project name', required: true },
    { name: 'code', label: 'Code', hint: 'Auto-generated if blank' },
    { name: 'client', label: 'Client', type: 'ref', optionsEndpoint: '/clients', optionLabel: (c) => c.name },
    { name: 'manager', label: 'Project manager', type: 'ref', optionsEndpoint: '/employees', optionLabel: (e) => e.fullName },
    { name: 'type', label: 'Type', type: 'select', required: true, defaultValue: 'CUSTOM_APPLICATION',
      options: enumOptions(['CONSULTING', 'CUSTOM_APPLICATION', 'INTEGRATION', 'AI_ADOPTION', 'PRODUCT']) },
    { name: 'status', label: 'Status', type: 'select', required: true, defaultValue: 'PLANNED',
      options: enumOptions(['PLANNED', 'IN_PROGRESS', 'ON_HOLD', 'COMPLETED']) },
    { name: 'startDate', label: 'Start date', type: 'date' },
    { name: 'endDate', label: 'End date', type: 'date' },
    { name: 'budget', label: 'Budget', type: 'number', min: 0 },
    { name: 'progress', label: 'Progress (%)', type: 'number', min: 0, max: 100, step: 1, defaultValue: 0 },
    { name: 'techStack', label: 'Tech stack', full: true, hint: 'Comma-separated' },
    { name: 'members', label: 'Team members', type: 'refs', optionsEndpoint: '/employees', optionLabel: (e) => `${e.fullName} (${e.designation || label(e.role)})` },
    { name: 'description', label: 'Description', type: 'textarea' },
  ];

  return (
    <CrudPage
      title="Projects"
      intro={canManage ? 'Plan, staff and track every client and product project.'
        : seesAll ? 'Every client and product project.'
        : clientOnly ? 'Progress on your projects with CAID.' : 'Projects you are working on.'}
      endpoint="/projects"
      singular="project"
      columns={columns}
      fields={fields}
      canCreate={canManage}
      canEdit={canManage}
      canDelete={can('PROJECT_DELETE')}
      emptyText={canManage ? 'No projects yet. Add the first one.'
        : clientOnly ? 'No projects are linked to your organisation yet.' : 'You are not assigned to any projects yet.'}
    />
  );
}
