import { useEffect, useState } from 'react';
import api, { errorMessage } from '../../api/client.js';
import CrudPage from '../../components/CrudPage.jsx';
import Modal from '../../components/Modal.jsx';
import StatusPill from '../../components/StatusPill.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { MONTHS, date, enumOptions, money } from '../../utils/format.js';

const period = (p) => `${MONTHS[p.month - 1]} ${p.year}`;

function Payslip({ p, onClose }) {
  const rows = [
    ['Basic pay', p.basicPay], ['Housing allowance', p.housingAllowance],
    ['Other allowances', p.otherAllowances], ['Bonus', p.bonus],
  ];
  const deductions = [['Tax', p.tax], ['Other deductions', p.otherDeductions]];
  return (
    <Modal title={`Payslip, ${period(p)}`} onClose={onClose}
      footer={<><button className="btn btn-ghost" onClick={onClose}>Close</button><button className="btn btn-primary" onClick={() => window.print()}>Print or save as PDF</button></>}>
      <div className="payslip">
        <div className="head">
          <div>
            <span className="wordmark">c<span className="brace" aria-hidden="true">{'{'}</span><span className="ai">Ai</span><span className="brace" aria-hidden="true">{'}'}</span>d</span>
            <div className="muted small">Custom Application and Integration Development<br />Atlanta, Georgia</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <b>Payslip</b><br />{period(p)}<br /><StatusPill value={p.status} />
          </div>
        </div>
        <dl className="details" style={{ marginBottom: '1rem' }}>
          <dt>Employee</dt><dd>{p.employee.fullName} ({p.employee.employeeCode})</dd>
          <dt>Designation</dt><dd>{p.employee.designation || '—'}</dd>
          <dt>Department</dt><dd>{p.employee.department || '—'}</dd>
          <dt>Paid on</dt><dd>{date(p.paidDate)}</dd>
        </dl>
        <table>
          <tbody>
            <tr><td colSpan={2} className="section"><b>Earnings</b></td></tr>
            {rows.map(([k, v]) => <tr key={k}><td>{k}</td><td>{money(v)}</td></tr>)}
            <tr><td><b>Gross pay</b></td><td><b>{money(p.grossPay)}</b></td></tr>
            <tr><td colSpan={2} className="section"><b>Deductions</b></td></tr>
            {deductions.map(([k, v]) => <tr key={k}><td>{k}</td><td>−{money(v)}</td></tr>)}
            <tr className="total"><td>Net pay</td><td>{money(p.netPay)}</td></tr>
          </tbody>
        </table>
      </div>
    </Modal>
  );
}

function MyPayslips() {
  const [rows, setRows] = useState([]);
  const [error, setError] = useState('');
  const [open, setOpen] = useState(null);
  useEffect(() => {
    api.get('/payroll/me').then((r) => setRows(r.data)).catch((e) => setError(errorMessage(e)));
  }, []);
  return (
    <>
      <div className="page-title"><div><h1>My payslips</h1><p>Monthly pay statements. Contact HR about any discrepancy.</p></div></div>
      {error && <div className="alert alert-error">{error}</div>}
      <div className="table-wrap">
        <table className="data">
          <thead><tr><th>Period</th><th>Gross</th><th>Deductions</th><th>Net pay</th><th>Status</th><th><span className="sr-only">Actions</span></th></tr></thead>
          <tbody>
            {rows.length === 0 && <tr><td colSpan={6} className="empty">No payslips yet. They appear here once HR processes payroll.</td></tr>}
            {rows.map((p) => (
              <tr key={p.id}>
                <td><b>{period(p)}</b></td>
                <td>{money(p.grossPay)}</td>
                <td>{money(Number(p.tax || 0) + Number(p.otherDeductions || 0))}</td>
                <td><b>{money(p.netPay)}</b></td>
                <td><StatusPill value={p.status} /></td>
                <td className="actions"><button className="btn btn-ghost btn-sm" onClick={() => setOpen(p)}>View payslip</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {open && <Payslip p={open} onClose={() => setOpen(null)} />}
    </>
  );
}

function PayrollAdmin({ canWrite }) {
  const [open, setOpen] = useState(null);
  const now = new Date();
  const monthOptions = MONTHS.map((m, i) => ({ value: i + 1, label: m }));

  return (
    <>
      <CrudPage
        title="Payroll"
        intro={canWrite ? 'Create monthly pay records. Gross and net pay are calculated automatically when you save.' : 'Pay records for every employee (view only).'}
        endpoint="/payroll"
        singular="payroll record"
        canCreate={canWrite}
        canEdit={canWrite}
        canDelete={canWrite}
        columns={[
          { key: 'employee', label: 'Employee', text: (p) => `${p.employee.fullName} ${p.employee.employeeCode}`, render: (p) => (
            <span><b>{p.employee.fullName}</b><br /><span className="muted small">{p.employee.employeeCode}</span></span>
          ) },
          { key: 'period', label: 'Period', nowrap: true, text: period, render: period },
          { key: 'grossPay', label: 'Gross', render: (p) => money(p.grossPay) },
          { key: 'netPay', label: 'Net pay', render: (p) => <b>{money(p.netPay)}</b> },
          { key: 'status', label: 'Status', render: (p) => <StatusPill value={p.status} /> },
          { key: 'paidDate', label: 'Paid on', render: (p) => date(p.paidDate) },
        ]}
        fields={[
          { name: 'employee', label: 'Employee', type: 'ref', required: true, optionsEndpoint: '/employees', optionLabel: (e) => `${e.fullName} (${e.employeeCode})` },
          { name: 'status', label: 'Status', type: 'select', required: true, defaultValue: 'DRAFT', options: enumOptions(['DRAFT', 'PROCESSED', 'PAID']) },
          { name: 'month', label: 'Month', type: 'select', required: true, defaultValue: now.getMonth() + 1, options: monthOptions },
          { name: 'year', label: 'Year', type: 'number', required: true, step: 1, defaultValue: now.getFullYear() },
          { name: 'basicPay', label: 'Basic pay', type: 'number', min: 0, defaultValue: 0 },
          { name: 'housingAllowance', label: 'Housing allowance', type: 'number', min: 0, defaultValue: 0 },
          { name: 'otherAllowances', label: 'Other allowances', type: 'number', min: 0, defaultValue: 0 },
          { name: 'bonus', label: 'Bonus', type: 'number', min: 0, defaultValue: 0 },
          { name: 'tax', label: 'Tax', type: 'number', min: 0, defaultValue: 0 },
          { name: 'otherDeductions', label: 'Other deductions', type: 'number', min: 0, defaultValue: 0 },
          { name: 'paidDate', label: 'Paid on', type: 'date', hint: 'Set automatically when marked paid' },
        ]}
        rowActions={(p, reload) => (
          <>
            <button className="btn btn-ghost btn-sm" onClick={() => setOpen(p)}>Payslip</button>{' '}
            {canWrite && p.status !== 'PAID' && (
              <button className="btn btn-ghost btn-sm" onClick={() => api.post(`/payroll/${p.id}/mark-paid`).then(reload)}>Mark paid</button>
            )}{' '}
          </>
        )}
      />
      {open && <Payslip p={open} onClose={() => setOpen(null)} />}
    </>
  );
}

export default function Payroll() {
  const { can } = useAuth();
  const seesAll = can('PAYROLL_READ_ALL');
  const hasOwn = can('SELF_WORKSPACE');
  const [view, setView] = useState('all');
  if (!seesAll) return <MyPayslips />;
  return (
    <>
      {hasOwn && (
        <div className="tabs" role="tablist">
          <button role="tab" aria-selected={view === 'all'} className={view === 'all' ? 'active' : ''} onClick={() => setView('all')}>All employees</button>
          <button role="tab" aria-selected={view === 'mine'} className={view === 'mine' ? 'active' : ''} onClick={() => setView('mine')}>My payslips</button>
        </div>
      )}
      {view === 'all' || !hasOwn ? <PayrollAdmin canWrite={can('PAYROLL_WRITE')} /> : <MyPayslips />}
    </>
  );
}
