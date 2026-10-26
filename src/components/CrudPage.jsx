import { useCallback, useEffect, useMemo, useState } from 'react';
import api, { errorMessage } from '../api/client.js';
import Modal from './Modal.jsx';
import FormField from './FormField.jsx';

/**
 * Generic list + create/edit/delete screen driven by config.
 *
 * columns: [{ key, label, render?(item), text?(item) }]
 * fields:  [{ name, label, type, required, options, optionsEndpoint, optionLabel, createOnly, defaultValue,
 *             visibleWhen?(form) }]
 *
 * canCreate / canEdit / canDelete are true/false, or (for edit and delete) a function of the row, so a screen can
 * offer Edit only on the rows the current user is allowed to change.
 */
export default function CrudPage({
  title, intro, endpoint, listEndpoint, columns, fields = [],
  singular = 'record', canCreate = true, canEdit = true, canDelete = true,
  rowActions, reloadKey = 0, emptyText,
}) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [editing, setEditing] = useState(null); // null = closed, {} = new, object = existing
  const [form, setForm] = useState({});
  const [formError, setFormError] = useState('');
  const [saving, setSaving] = useState(false);
  const [options, setOptions] = useState({});

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get(listEndpoint || endpoint);
      setItems(data);
      setError('');
    } catch (e) {
      setError(errorMessage(e));
    } finally {
      setLoading(false);
    }
  }, [endpoint, listEndpoint]);

  useEffect(() => { load(); }, [load, reloadKey]);

  const openForm = async (item) => {
    const initial = {};
    fields.forEach((f) => {
      const v = item[f.name];
      if (f.type === 'ref') initial[f.name] = v?.id ?? '';
      else if (f.type === 'refs') initial[f.name] = (v || []).map((x) => String(x.id));
      else if (f.type === 'password') initial[f.name] = '';
      else initial[f.name] = v ?? (item.id ? '' : f.defaultValue ?? '');
    });
    setForm(initial);
    setFormError('');
    setEditing(item);
    // Load dropdown options for relation fields.
    const needed = fields.filter((f) => f.optionsEndpoint);
    const loaded = await Promise.all(needed.map((f) => api.get(f.optionsEndpoint).then((r) => r.data).catch(() => [])));
    const next = {};
    needed.forEach((f, i) => { next[f.name] = loaded[i]; });
    setOptions(next);
  };

  const buildPayload = () => {
    const payload = { ...editing };
    fields.forEach((f) => {
      const v = form[f.name];
      if (f.type === 'ref') payload[f.name] = v ? { id: Number(v) } : null;
      else if (f.type === 'refs') payload[f.name] = (v || []).map((id) => ({ id: Number(id) }));
      else if (f.type === 'number') payload[f.name] = v === '' || v === null ? null : Number(v);
      else if (f.type === 'password') { if (v) payload[f.name] = v; else delete payload[f.name]; }
      else payload[f.name] = v === '' ? null : v;
    });
    return payload;
  };

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    setFormError('');
    try {
      const payload = buildPayload();
      if (editing.id) await api.put(`${endpoint}/${editing.id}`, payload);
      else await api.post(endpoint, payload);
      setEditing(null);
      load();
    } catch (err) {
      setFormError(errorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  const remove = async (item) => {
    if (!window.confirm(`Delete this ${singular}? This cannot be undone.`)) return;
    try {
      await api.delete(`${endpoint}/${item.id}`);
      load();
    } catch (err) {
      setError(errorMessage(err));
    }
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((item) =>
      columns.some((c) => {
        const t = c.text ? c.text(item) : item[c.key];
        return t !== null && t !== undefined && String(t).toLowerCase().includes(q);
      })
    );
  }, [items, query, columns]);

  const visibleFields = fields.filter((f) => !(f.createOnly && editing?.id) && (!f.visibleWhen || f.visibleWhen(form)));
  const allowed = (flag, item) => (typeof flag === 'function' ? flag(item) : !!flag);

  return (
    <>
      <div className="page-title">
        <div>
          <h1>{title}</h1>
          {intro && <p>{intro}</p>}
        </div>
        {canCreate && <button className="btn btn-primary" onClick={() => openForm({})}>Add {singular}</button>}
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="toolbar">
        <input className="input" type="search" placeholder={`Search ${title.toLowerCase()}`}
          value={query} onChange={(e) => setQuery(e.target.value)} aria-label="Search" />
        <span className="muted small">{filtered.length} of {items.length}</span>
      </div>

      <div className="table-wrap">
        <table className="data">
          <thead>
            <tr>
              {columns.map((c) => <th key={c.key}>{c.label}</th>)}
              {(canEdit || canDelete || rowActions) && <th><span className="sr-only">Actions</span></th>}
            </tr>
          </thead>
          <tbody>
            {loading && <tr><td colSpan={columns.length + 1} className="empty">Loading…</td></tr>}
            {!loading && filtered.length === 0 && (
              <tr><td colSpan={columns.length + 1} className="empty">
                {query ? 'No matches. Try a different search.' : emptyText || `No ${title.toLowerCase()} yet.`}
              </td></tr>
            )}
            {!loading && filtered.map((item) => (
              <tr key={item.id}>
                {columns.map((c) => (
                  <td key={c.key} className={c.nowrap ? 'nowrap' : undefined} style={c.minWidth ? { minWidth: c.minWidth } : undefined}>
                    {c.render ? c.render(item) : item[c.key] ?? '—'}
                  </td>
                ))}
                {(canEdit || canDelete || rowActions) && (
                  <td className="actions">
                    {rowActions && rowActions(item, load)}
                    {allowed(canEdit, item) && <button className="btn btn-ghost btn-sm" onClick={() => openForm(item)}>Edit</button>}
                    {allowed(canDelete, item) && <button className="btn btn-danger btn-sm" onClick={() => remove(item)}>Delete</button>}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editing && (
        <Modal
          title={editing.id ? `Edit ${singular}` : `Add ${singular}`}
          onClose={() => setEditing(null)}
          footer={
            <>
              <button className="btn btn-ghost" onClick={() => setEditing(null)}>Cancel</button>
              <button className="btn btn-primary" form="crud-form" type="submit" disabled={saving}>
                {saving ? 'Saving…' : editing.id ? 'Save changes' : `Add ${singular}`}
              </button>
            </>
          }
        >
          {formError && <div className="alert alert-error">{formError}</div>}
          <form id="crud-form" className="form-grid" onSubmit={save}>
            {visibleFields.map((f) => (
              <FormField key={f.name} field={f} value={form[f.name]} options={options[f.name]}
                onChange={(v) => setForm((prev) => ({ ...prev, [f.name]: v }))} />
            ))}
          </form>
        </Modal>
      )}
    </>
  );
}
