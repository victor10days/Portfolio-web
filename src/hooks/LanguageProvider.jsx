import { useState, useCallback, useEffect, useMemo } from 'react';
import { LanguageContext } from './useLanguage';

const STORAGE_KEY = 'lang';

// Read once at module scope, before React renders. Doing this inside a lazy
// useState initialiser would run during render, and reading localStorage is
// not a pure operation — react-hooks/purity flags exactly that.
const readInitialLang = () => {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === 'en' || saved === 'es') return saved;
  } catch {
    // Safari private browsing throws on any localStorage access.
  }
  return window.navigator.language?.toLowerCase().startsWith('es') ? 'es' : 'en';
};

const initialLang = readInitialLang();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(initialLang);

  const toggleLang = useCallback(() => {
    setLang((prev) => (prev === 'en' ? 'es' : 'en'));
  }, []);

  // Sync the document language and persist the choice. Both are external
  // systems, so this is what an effect is for; no setState here.
  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Storage unavailable — the language still works for this session.
    }
  }, [lang]);

  const value = useMemo(() => ({ lang, toggleLang }), [lang, toggleLang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};
