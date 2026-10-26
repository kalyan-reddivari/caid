// Renders one form control from a field config.
// Supported types: text, email, password, number, date, url, tel, textarea, select, ref, refs.
export default function FormField({ field, value, onChange, options = [] }) {
  const { name, label, type = 'text', required, hint, full } = field;
  const id = `f-${name}`;
  const className = `field${full || type === 'textarea' || type === 'refs' ? ' full' : ''}`;

  let control;
  if (type === 'textarea') {
    control = <textarea id={id} value={value ?? ''} required={required} onChange={(e) => onChange(e.target.value)} />;
  } else if (type === 'select') {
    const opts = (field.options || []).map((o) => (typeof o === 'string' ? { value: o, label: o } : o));
    control = (
      <select id={id} value={value ?? ''} required={required} onChange={(e) => onChange(e.target.value)}>
        {!required && <option value="">Not set</option>}
        {opts.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    );
  } else if (type === 'ref') {
    control = (
      <select id={id} value={value ?? ''} required={required} onChange={(e) => onChange(e.target.value)}>
        <option value="">{required ? 'Choose…' : 'None'}</option>
        {options.map((o) => <option key={o.id} value={o.id}>{field.optionLabel(o)}</option>)}
      </select>
    );
  } else if (type === 'refs') {
    const selected = new Set((value || []).map(String));
    const toggle = (idVal) => {
      const next = new Set(selected);
      next.has(idVal) ? next.delete(idVal) : next.add(idVal);
      onChange([...next]);
    };
    return (
      <fieldset className={className} style={{ border: 0, padding: 0, margin: 0 }}>
        <span style={{ fontSize: 'var(--t-sm)', fontWeight: 600 }}>{label} <span className="hint">({selected.size} selected)</span></span>
        <div className="check-grid">
          {options.length === 0 && <span className="muted small">Nothing to choose from yet.</span>}
          {options.map((o) => (
            <label key={o.id} className="check">
              <input type="checkbox" checked={selected.has(String(o.id))} onChange={() => toggle(String(o.id))} />
              {field.optionLabel(o)}
            </label>
          ))}
        </div>
      </fieldset>
    );
  } else {
    control = (
      <input id={id} type={type} value={value ?? ''} required={required}
        step={type === 'number' ? field.step || 'any' : undefined}
        min={field.min} max={field.max}
        onChange={(e) => onChange(e.target.value)} />
    );
  }

  return (
    <label className={className} htmlFor={id}>
      <span>{label}{required && ' *'} {hint && <span className="hint">{hint}</span>}</span>
      {control}
    </label>
  );
}
