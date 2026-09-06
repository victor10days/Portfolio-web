import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './hooks/useLanguage';
import Home from './pages/Home.jsx';

// The home page is the site; it loads with the bundle. Only the admin waits for its own chunk.
const Admin = lazy(() => import('./pages/Admin.jsx'));

const Loading = () => (
  <div className="wrap" style={{ paddingTop: 'var(--space-3xl)', color: 'var(--color-muted)' }}>
    Loading…
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
