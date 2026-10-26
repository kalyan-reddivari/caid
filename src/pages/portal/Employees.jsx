import CrudPage from '../../components/CrudPage.jsx';
import StatusPill from '../../components/StatusPill.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { enumOptions, initials, label } from '../../utils/format.js';

export default function Employees() {
  const { user, can, assignableRoles } = useAuth();
  const canManage = can('EMPLOYEE_WRITE');
  // The server only lets you manage accounts at or below your own level, so only offer those rows and roles.
  const manageable = (e) => canManage && assignableRoles.includes(e.role);

  const columns = [
    { key: 'employeeCode', label: 'ID', nowrap: true },
    {
      key: 'name', label: 'Name', nowrap: true, text: (e) => `${e.fullName} ${e.email}`,
      render: (e) => (
        <span style={{ display: 'flex', gap: '.6rem', alignItems: 'center' }}>
          <span className="avatar">{initials(e)}</span>
          <span><b>{e.fullName}</b><br /><span className="muted small">{e.email}</span></span>
        </span>
      ),
    },
    { key: 'designation', label: 'Designation' },
    { key: 'department', label: 'Department' },
    {
      key: 'skills', label: 'Skills', text: (e) => e.skills.map((s) => s.name).join(' '),
      render: (e) => (
        <div className="chips">
          {e.skills.slice(0, 3).map((s) => <span className="chip" key={s.id}>{s.name}</span>)}
          {e.skills.length > 3 && <span className="chip">+{e.skills.length - 3}</span>}
        </div>
      ),
    },
    { key: 'role', label: 'Role', text: (e) => e.role, render: (e) => label(e.role) },
    { key: 'status', label: 'Status', render: (e) => <StatusPill value={e.status} /> },
  ];

  const fields = [
    { name: 'firstName', label: 'First name', required: true },
    { name: 'lastName', label: 'Last name' },
    { name: 'email', label: 'Work email', type: 'email', required: true },
    { name: 'password', label: 'Password', type: 'password', hint: 'Blank = Welcome@123 for new, unchanged when editing' },
    { name: 'employeeCode', label: 'Employee ID', hint: 'Auto-generated if blank' },
    { name: 'role', label: 'Role', type: 'select', required: true, defaultValue: 'EMPLOYEE', options: enumOptions(assignableRoles) },
    { name: 'client', label: 'Client organisation', type: 'ref', optionsEndpoint: '/clients', optionLabel: (c) => c.name,
      hint: 'Required for client accounts', visibleWhen: (form) => form.role === 'CLIENT' },
    { name: 'designation', label: 'Designation' },
    { name: 'department', label: 'Department' },
    { name: 'phone', label: 'Phone', type: 'tel' },
    { name: 'location', label: 'Location' },
    { name: 'dateOfJoining', label: 'Date of joining', type: 'date' },
    { name: 'status', label: 'Status', type: 'select', required: true, defaultValue: 'ACTIVE', options: enumOptions(['ACTIVE', 'ON_LEAVE', 'INACTIVE']) },
    { name: 'skills', label: 'Skills', type: 'refs', optionsEndpoint: '/skills', optionLabel: (s) => s.name },
    { name: 'bio', label: 'Bio', type: 'textarea' },
  ];

  return (
    <CrudPage
      title="Employees"
      intro={canManage ? 'Add team members, set roles and keep records up to date.' : 'Team directory with skills for project staffing.'}
      endpoint="/employees"
      singular="employee"
      columns={columns}
      fields={fields}
      canCreate={canManage}
      canEdit={manageable}
      canDelete={(e) => can('EMPLOYEE_DELETE') && manageable(e) && e.id !== user.id}
    />
  );
}
