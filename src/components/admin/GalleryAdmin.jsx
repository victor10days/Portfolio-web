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
  image: '', video: '', title_en: '', title_es: '', category_en: '', category_es: '', year: '', desc_en: '', desc_es: '',
};

const GalleryAdmin = ({ token }) => {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null); // null | 'new' | id
  const [form, setForm] = useState(emptyItem);
  const [uploading, setUploading] = useState(false);

  const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };

  const load = () => fetch('/api/gallery').then(r => r.json()).then(setItems);
  useEffect(() => { load(); }, []);

  const startEdit = (item) => {
    setEditing(item.id);
    setForm({
      image: item.image, video: item.video || '', title_en: item.title.en, title_es: item.title.es,
      category_en: item.category.en, category_es: item.category.es, year: item.year,
      desc_en: item.desc?.en || '', desc_es: item.desc?.es || '',
    });
  };

  const startNew = () => { setEditing('new'); setForm(emptyItem); };

  const save = async () => {
    const method = editing === 'new' ? 'POST' : 'PUT';
    const url = editing === 'new' ? '/api/gallery' : `/api/gallery/${editing}`;
    await fetch(url, { method, headers, body: JSON.stringify(form) });
    setEditing(null);
    load();
  };

  const remove = async (id) => {
    if (!confirm('Delete this item?')) return;
    await fetch(`/api/gallery/${id}`, { method: 'DELETE', headers });
    load();
  };

  const uploadFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append('file', file);
    const res = await fetch('/api/upload', { method: 'POST', headers: { Authorization: `Bearer ${token}` }, body: fd });
    const data = await res.json();
    setForm(f => ({ ...f, image: `/uploads/${data.filename}` }));
    setUploading(false);
  };

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }));

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h2 style={{ color: COLORS.white, fontFamily: FONT, fontSize: '18px', margin: 0 }}>Gallery</h2>
        <button onClick={startNew} style={{ ...btnStyle, backgroundColor: COLORS.red }}>+ Add Item</button>
      </div>

      {editing !== null && (
        <div style={{ backgroundColor: COLORS.bgCard, padding: '16px', marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <input placeholder="Title (EN)" value={form.title_en} onChange={set('title_en')} style={inputStyle} />
            <input placeholder="Title (ES)" value={form.title_es} onChange={set('title_es')} style={inputStyle} />
            <input placeholder="Category (EN)" value={form.category_en} onChange={set('category_en')} style={inputStyle} />
            <input placeholder="Category (ES)" value={form.category_es} onChange={set('category_es')} style={inputStyle} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
            <input placeholder="Year" value={form.year} onChange={set('year')} style={inputStyle} />
            <input placeholder="Image URL or path" value={form.image} onChange={set('image')} style={inputStyle} />
            <div>
              <input type="file" accept="image/*" onChange={uploadFile} style={{ fontSize: '12px', color: COLORS.text }} />
              {uploading && <span style={{ fontSize: '11px', color: COLORS.textLight }}>Uploading...</span>}
            </div>
          </div>
          <input placeholder="Video URL (optional)" value={form.video} onChange={set('video')} style={inputStyle} />
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
              <span style={{ color: COLORS.white, fontFamily: FONT, fontSize: '13px' }}>{item.title.en}</span>
              <span style={{ color: COLORS.textLight, fontSize: '11px', marginLeft: '8px' }}>{item.category.en} — {item.year}</span>
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

export default GalleryAdmin;
