import { useState } from 'react';
import { COLORS, FONT } from '../../styles/theme';

const input = {
  width: '100%',
  padding: '10px 14px',
  fontSize: '14px',
  fontFamily: FONT,
  backgroundColor: COLORS.bgCard,
  color: COLORS.text,
  border: `1px solid ${COLORS.bgLight}`,
  boxSizing: 'border-box',
};

const AdminLogin = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');
      localStorage.setItem('admin_token', data.token);
      onLogin(data.token);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: COLORS.bg }}>
      <form onSubmit={handleSubmit} style={{ width: '300px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <h1 style={{ color: COLORS.white, fontFamily: FONT, fontSize: '24px', textAlign: 'center', letterSpacing: '2px' }}>Admin</h1>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={input}
          autoFocus
        />
        {error && <p style={{ color: COLORS.red, fontSize: '13px', margin: 0, fontFamily: FONT }}>{error}</p>}
        <button type="submit" style={{
          padding: '10px',
          fontSize: '14px',
          fontFamily: FONT,
          backgroundColor: COLORS.red,
          color: COLORS.white,
          border: 'none',
          cursor: 'pointer',
        }}>
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
