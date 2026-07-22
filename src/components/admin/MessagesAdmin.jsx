import { useState, useEffect } from 'react';
import { COLORS, FONT } from '../../styles/theme';

const btnStyle = {
  padding: '6px 14px',
  fontSize: '12px',
  fontFamily: FONT,
  border: 'none',
  cursor: 'pointer',
  color: COLORS.white,
};

const MessagesAdmin = ({ token }) => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    setError('');
    // Unlike the other admin GETs, /api/contacts is auth-protected, so the
    // Bearer token must be sent.
    fetch('/api/contacts', { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => {
        if (!r.ok) {
          throw new Error(r.status === 401 ? 'Session expired — log in again.' : 'Failed to load messages.');
        }
        return r.json();
      })
      .then((rows) => setItems(rows))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h2 style={{ color: COLORS.white, fontFamily: FONT, fontSize: '18px', margin: 0 }}>
          Messages{items.length > 0 && (
            <span style={{ color: COLORS.textLight, fontSize: '13px', marginLeft: '8px' }}>({items.length})</span>
          )}
        </h2>
        <button onClick={load} style={{ ...btnStyle, backgroundColor: COLORS.bgLight }}>Refresh</button>
      </div>

      {error && <p style={{ color: COLORS.red, fontFamily: FONT, fontSize: '13px' }}>{error}</p>}
      {loading && <p style={{ color: COLORS.textLight, fontFamily: FONT, fontSize: '13px' }}>Loading…</p>}
      {!loading && !error && items.length === 0 && (
        <p style={{ color: COLORS.textLight, fontFamily: FONT, fontSize: '13px' }}>No messages yet.</p>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {items.map((m) => (
          <div key={m.id} style={{
            backgroundColor: COLORS.bgCard,
            border: `1px solid ${COLORS.bgLight}`,
            padding: '12px 14px',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{ color: COLORS.white, fontFamily: FONT, fontSize: '14px', fontWeight: 'bold' }}>
                {m.subject}
              </span>
              <span style={{ color: COLORS.textLight, fontFamily: FONT, fontSize: '11px' }}>
                {m.created_at ? `${m.created_at} UTC` : ''}
              </span>
            </div>
            <div style={{ color: COLORS.textLight, fontFamily: FONT, fontSize: '12px', margin: '4px 0 8px' }}>
              {m.name}{' · '}
              <a
                href={`mailto:${m.email}?subject=Re: ${encodeURIComponent(m.subject)}`}
                style={{ color: COLORS.red }}
              >
                {m.email}
              </a>
            </div>
            <p style={{
              color: COLORS.text,
              fontFamily: FONT,
              fontSize: '13px',
              lineHeight: 1.6,
              margin: 0,
              whiteSpace: 'pre-wrap',
            }}>
              {m.message}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessagesAdmin;
