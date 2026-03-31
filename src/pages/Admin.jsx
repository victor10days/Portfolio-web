import { useState } from 'react';
import { COLORS, FONT } from '../styles/theme';
import AdminLogin from '../components/admin/AdminLogin';
import GalleryAdmin from '../components/admin/GalleryAdmin';
import ProjectsAdmin from '../components/admin/ProjectsAdmin';
import ExperienceAdmin from '../components/admin/ExperienceAdmin';

const tabStyle = (active) => ({
  padding: '8px 20px',
  fontSize: '13px',
  fontFamily: FONT,
  backgroundColor: active ? COLORS.red : COLORS.bgLight,
  color: COLORS.white,
  border: 'none',
  cursor: 'pointer',
});

const Admin = () => {
  const [token, setToken] = useState(localStorage.getItem('admin_token'));
  const [tab, setTab] = useState('gallery');

  const logout = () => {
    localStorage.removeItem('admin_token');
    setToken(null);
  };

  if (!token) return <AdminLogin onLogin={setToken} />;

  return (
    <div style={{ backgroundColor: COLORS.bg, minHeight: '100vh', padding: '20px 40px', boxSizing: 'border-box' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div style={{ display: 'flex', gap: '4px' }}>
          <button onClick={() => setTab('gallery')} style={tabStyle(tab === 'gallery')}>Gallery</button>
          <button onClick={() => setTab('projects')} style={tabStyle(tab === 'projects')}>Projects</button>
          <button onClick={() => setTab('experience')} style={tabStyle(tab === 'experience')}>Experience</button>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <a href="/" style={{ color: COLORS.textLight, fontSize: '12px', fontFamily: FONT }}>View Site</a>
          <button onClick={logout} style={{ ...tabStyle(false), fontSize: '11px', padding: '6px 12px' }}>Logout</button>
        </div>
      </div>
      {tab === 'gallery' && <GalleryAdmin token={token} />}
      {tab === 'projects' && <ProjectsAdmin token={token} />}
      {tab === 'experience' && <ExperienceAdmin token={token} />}
    </div>
  );
};

export default Admin;
