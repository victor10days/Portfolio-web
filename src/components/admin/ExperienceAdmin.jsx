import { useState, useEffect } from 'react';
import { COLORS, FONT } from '../../styles/theme';

const inputStyle = {
  width: '100%',
  padding: '8px 10px',
  fontSize: '13px',
  fontFamily: FONT,
  backgroundColor: COLORS.bgCard,
  color: COLORS.text,
  border: `1px solid ${COLORS.bgLight}`,
  boxSizing: 'border-box',
};

const btnStyle = {
  padding: '6px 14px',
  fontSize: '12px',
  fontFamily: FONT,
  border: 'none',
  cursor: 'pointer',
  color: COLORS.white,
};

const empty = {
  role_en: '', role_es: '', company_en: '', company_es: '',
  date_en: '', date_es: '', desc_en: '', desc_es: '',
};

const ExperienceAdmin = ({ token }) => {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(empty);

  const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };

  const load = () => fetch('/api/experience').then(r => r.json()).then(setItems);
  useEffect(() => { load(); }, []);

  const startEdit = (item) => {
    setEditing(item.id);
    setForm({
      role_en: item.role.en, role_es: item.role.es,
      company_en: item.company.en, company_es: item.company.es,
      date_en: item.date.en, date_es: item.date.es,
      desc_en: item.desc.en, desc_es: item.desc.es,
    });
  };

  const startNew = () => { setEditing('new'); setForm(empty); };

  const save = async () => {
    const method = editing === 'new' ? 'POST' : 'PUT';
    const url = editing === 'new' ? '/api/experience' : `/api/experience/${editing}`;
    await fetch(url, { method, headers, body: JSON.stringify(form) });
    setEditing(null);
    load();
  };

  const remove = async (id) => {
    if (!confirm('Delete this job?')) return;
    await fetch(`/api/experience/${id}`, { method: 'DELETE', headers });
    load();
  };

  const move = async (index, dir) => {
    const next = [...items];
    const swapIndex = index + dir;
    if (swapIndex < 0 || swapIndex >= next.length) return;
    [next[index], next[swapIndex]] = [next[swapIndex], next[index]];
    await Promise.all(next.map((item, i) =>
      fetch(`/api/experience/${item.id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({
          role_en: item.role.en, role_es: item.role.es,
          company_en: item.company.en, company_es: item.company.es,
          date_en: item.date.en, date_es: item.date.es,
          desc_en: item.desc.en, desc_es: item.desc.es,
          sort_order: i,
        }),
      })
    ));
    load();
  };

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }));

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h2 style={{ color: COLORS.white, fontFamily: FONT, fontSize: '18px', margin: 0 }}>Experience</h2>
        <button onClick={startNew} style={{ ...btnStyle, backgroundColor: COLORS.red }}>+ Add Job</button>
      </div>

      {editing !== null && (
        <div style={{ backgroundColor: COLORS.bgCard, padding: '16px', marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <input placeholder="Role (EN)" value={form.role_en} onChange={set('role_en')} style={inputStyle} />
            <input placeholder="Role (ES)" value={form.role_es} onChange={set('role_es')} style={inputStyle} />
            <input placeholder="Company (EN)" value={form.company_en} onChange={set('company_en')} style={inputStyle} />
            <input placeholder="Company (ES)" value={form.company_es} onChange={set('company_es')} style={inputStyle} />
            <input placeholder="Date (EN) e.g. 2024 – Present" value={form.date_en} onChange={set('date_en')} style={inputStyle} />
            <input placeholder="Date (ES) e.g. 2024 – Presente" value={form.date_es} onChange={set('date_es')} style={inputStyle} />
          </div>
          <textarea placeholder="Description (EN)" value={form.desc_en} onChange={set('desc_en')} rows={2} style={{ ...inputStyle, resize: 'vertical' }} />
          <textarea placeholder="Description (ES)" value={form.desc_es} onChange={set('desc_es')} rows={2} style={{ ...inputStyle, resize: 'vertical' }} />
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={save} style={{ ...btnStyle, backgroundColor: COLORS.red }}>Save</button>
            <button onClick={() => setEditing(null)} style={{ ...btnStyle, backgroundColor: COLORS.bgLight }}>Cancel</button>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {items.map((item) => (
          <div key={item.id} style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '8px 12px', backgroundColor: COLORS.bg, border: `1px solid ${COLORS.bgLight}`,
          }}>
            <div>
              <span style={{ color: COLORS.white, fontFamily: FONT, fontSize: '13px' }}>{item.role.en}</span>
              <span style={{ color: COLORS.textLight, fontSize: '11px', marginLeft: '8px' }}>{item.company.en}</span>
              <span style={{ color: COLORS.red, fontSize: '11px', marginLeft: '8px' }}>{item.date.en}</span>
            </div>
            <div style={{ display: 'flex', gap: '6px' }}>
              <button onClick={() => move(items.indexOf(item), -1)} style={{ ...btnStyle, backgroundColor: COLORS.bgLight, fontSize: '11px', padding: '4px 8px' }}>↑</button>
              <button onClick={() => move(items.indexOf(item), 1)} style={{ ...btnStyle, backgroundColor: COLORS.bgLight, fontSize: '11px', padding: '4px 8px' }}>↓</button>
              <button onClick={() => startEdit(item)} style={{ ...btnStyle, backgroundColor: COLORS.bgLight, fontSize: '11px', padding: '4px 10px' }}>Edit</button>
              <button onClick={() => remove(item.id)} style={{ ...btnStyle, backgroundColor: '#8B0000', fontSize: '11px', padding: '4px 10px' }}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceAdmin;
