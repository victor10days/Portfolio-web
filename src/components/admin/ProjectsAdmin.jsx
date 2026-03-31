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

const emptyItem = {
  name_en: '', name_es: '', desc_en: '', desc_es: '', status_en: '', status_es: '', stack: '',
  category_en: '', category_es: '', gallery_id: '',
};

const ProjectsAdmin = ({ token }) => {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyItem);

  const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };

  const load = () => fetch('/api/projects').then(r => r.json()).then(setItems);
  useEffect(() => { load(); }, []);

  const startEdit = (item) => {
    setEditing(item.id);
    setForm({
      name_en: item.name.en, name_es: item.name.es,
      desc_en: item.desc.en, desc_es: item.desc.es,
      status_en: item.status.en, status_es: item.status.es,
      stack: item.stack.join(', '),
      category_en: item.category?.en || '', category_es: item.category?.es || '',
      gallery_id: item.gallery_id ?? '',
    });
  };

  const startNew = () => { setEditing('new'); setForm(emptyItem); };

  const save = async () => {
    const body = {
      ...form,
      stack: form.stack.split(',').map(s => s.trim()).filter(Boolean),
      gallery_id: form.gallery_id !== '' ? Number(form.gallery_id) : null,
    };
    const method = editing === 'new' ? 'POST' : 'PUT';
    const url = editing === 'new' ? '/api/projects' : `/api/projects/${editing}`;
    await fetch(url, { method, headers, body: JSON.stringify(body) });
    setEditing(null);
    load();
  };

  const remove = async (id) => {
    if (!confirm('Delete this project?')) return;
    await fetch(`/api/projects/${id}`, { method: 'DELETE', headers });
    load();
  };

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }));

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h2 style={{ color: COLORS.white, fontFamily: FONT, fontSize: '18px', margin: 0 }}>Projects</h2>
        <button onClick={startNew} style={{ ...btnStyle, backgroundColor: COLORS.red }}>+ Add Project</button>
      </div>

      {editing !== null && (
        <div style={{ backgroundColor: COLORS.bgCard, padding: '16px', marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <input placeholder="Name (EN)" value={form.name_en} onChange={set('name_en')} style={inputStyle} />
            <input placeholder="Name (ES)" value={form.name_es} onChange={set('name_es')} style={inputStyle} />
            <input placeholder="Status (EN)" value={form.status_en} onChange={set('status_en')} style={inputStyle} />
            <input placeholder="Status (ES)" value={form.status_es} onChange={set('status_es')} style={inputStyle} />
          </div>
          <textarea placeholder="Description (EN)" value={form.desc_en} onChange={set('desc_en')} rows={2} style={{ ...inputStyle, resize: 'vertical' }} />
          <textarea placeholder="Description (ES)" value={form.desc_es} onChange={set('desc_es')} rows={2} style={{ ...inputStyle, resize: 'vertical' }} />
          <input placeholder="Stack (comma separated: React, Node, etc.)" value={form.stack} onChange={set('stack')} style={inputStyle} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
            <input placeholder="Category (EN)" value={form.category_en} onChange={set('category_en')} style={inputStyle} />
            <input placeholder="Category (ES)" value={form.category_es} onChange={set('category_es')} style={inputStyle} />
            <input placeholder="Gallery ID (number)" value={form.gallery_id} onChange={set('gallery_id')} style={inputStyle} type="number" />
          </div>
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
              <span style={{ color: COLORS.white, fontFamily: FONT, fontSize: '13px' }}>{item.name.en}</span>
              <span style={{ color: COLORS.textLight, fontSize: '11px', marginLeft: '8px' }}>{item.status.en}</span>
              <span style={{ color: COLORS.textLight, fontSize: '11px', marginLeft: '8px' }}>[{item.stack.join(', ')}]</span>
            </div>
            <div style={{ display: 'flex', gap: '6px' }}>
              <button onClick={() => startEdit(item)} style={{ ...btnStyle, backgroundColor: COLORS.bgLight, fontSize: '11px', padding: '4px 10px' }}>Edit</button>
              <button onClick={() => remove(item.id)} style={{ ...btnStyle, backgroundColor: '#8B0000', fontSize: '11px', padding: '4px 10px' }}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsAdmin;
