import { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { t } from '../content/translations';
import { scrollToElement } from '../lib/scroll';

// N5 floating pill: the wordmark, three destinations, the language switch. Under 40 rem the pill
// spans the top with a menu button that opens the full list of sections.
const PILL_LINKS = ['about', 'work', 'contact'];
const ALL_LINKS = ['about', 'skills', 'projects', 'gallery', 'experience', 'education', 'contact'];
const TARGET = { work: 'projects' };

const Header = () => {
  const { lang, toggleLang } = useLanguage();
  const [open, setOpen] = useState(false);

  const go = (id) => {
    scrollToElement(document.getElementById(TARGET[id] || id));
    setOpen(false);
  };

  return (
    <>
      <nav className="nav" aria-label={t('a11y.nav', lang)}>
        <button type="button" className="nav__mark" onClick={() => go('hero')} aria-label={`V.10 ${t('a11y.top', lang)}`}>
          V<i>.</i>10
        </button>
        <ul className="nav__links">
          {PILL_LINKS.map((id) => (
            <li key={id}>
              <button type="button" className="nav__link" onClick={() => go(id)}>
                {t(`nav.${id}`, lang)}
              </button>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="nav__lang"
          onClick={toggleLang}
          aria-label={lang === 'en' ? 'Cambiar a español' : 'Switch to English'}
        >
          {lang === 'en' ? 'ES' : 'EN'}
        </button>
        <button
          type="button"
          className="nav__menu"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? t('a11y.menuClose', lang) : t('a11y.menuOpen', lang)}
          aria-expanded={open}
          aria-controls="nav-sheet"
        >
          {open ? '✕' : '☰'}
        </button>
      </nav>
      {open && (
        <div className="nav__sheet" id="nav-sheet">
          {ALL_LINKS.map((id) => (
            <button type="button" key={id} className="nav__link" onClick={() => go(id)}>
              {t(`nav.${id}`, lang)}
            </button>
          ))}
        </div>
      )}
    </>
  );
};

export default Header;
