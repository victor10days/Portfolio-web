import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './hooks/useLanguage';
import { COLORS, FONT } from './styles/theme';

const Home = lazy(() => import('./pages/Home.jsx'));
const Admin = lazy(() => import('./pages/Admin.jsx'));

const Loading = () => (
  <div style={{
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.bg,
    fontFamily: FONT,
    color: COLORS.text,
    fontSize: '16px',
  }}>
    Loading...
  </div>
);

const App = () => {
  return (
    <LanguageProvider>
      <Router>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </Suspense>
      </Router>
    </LanguageProvider>
  );
};

export default App;
