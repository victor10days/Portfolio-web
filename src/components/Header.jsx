import { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { useMobile } from '../hooks/useMobile';
import { COLORS, FONT } from '../styles/theme';
import { t } from '../content/translations';
import { hoverColor, hoverProps } from '../hooks/useHover';

const Header = () => {
  const { lang, toggleLang } = useLanguage();
  const { isMobile } = useMobile();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = ['about', 'skills', 'projects', 'gallery', 'experience', 'education', 'contact'];

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMenuOpen(false);
  };

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      zIndex: 100,
      backgroundColor: COLORS.bgTranslucent,
      backdropFilter: 'blur(8px)',
      borderBottom: `1px solid ${COLORS.bgLight}`,
      fontFamily: FONT,
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: isMobile ? '10px 16px' : '12px 40px',
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        <button
          onClick={() => scrollTo('hero')}
          aria-label="Scroll to top"
          style={{
            fontSize: isMobile ? '16px' : '20px',
            fontWeight: 'bold',
            color: COLORS.white,
            fontFamily: FONT,
          }}
        >
          V<span style={{ color: COLORS.red }}>.</span>10
        </button>

        {!isMobile && (
          <nav style={{ display: 'flex', gap: '28px', alignItems: 'center' }}>
            {navItems.map(item => (
              <button
                key={item}
                onClick={() => scrollTo(item)}
                style={{
                  fontSize: '14px',
                  color: COLORS.textLight,
                  fontFamily: FONT,
                  transition: 'color 0.2s',
                }}
                {...hoverColor(COLORS.red, COLORS.textLight)}
              >
                {t(`nav.${item}`, lang)}
              </button>
            ))}
            <button
              onClick={toggleLang}
              aria-label={`Switch to ${lang === 'en' ? 'Spanish' : 'English'}`}
              style={{
                fontSize: '12px',
                padding: '4px 10px',
                border: `1px solid ${COLORS.textLight}`,
                color: COLORS.textLight,
                fontFamily: FONT,
                transition: 'all 0.2s',
              }}
              {...hoverProps(
                { backgroundColor: COLORS.red, borderColor: COLORS.red, color: COLORS.white },
                { backgroundColor: 'transparent', borderColor: COLORS.textLight, color: COLORS.textLight }
              )}
            >
              {lang === 'en' ? 'ES' : 'EN'}
            </button>
          </nav>
        )}

        {isMobile && (
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <button
              onClick={toggleLang}
              aria-label={`Switch to ${lang === 'en' ? 'Spanish' : 'English'}`}
              style={{
                fontSize: '12px',
                padding: '4px 8px',
                border: `1px solid ${COLORS.textLight}`,
                color: COLORS.textLight,
                fontFamily: FONT,
              }}
            >
              {lang === 'en' ? 'ES' : 'EN'}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              style={{ fontSize: '22px', color: COLORS.white, lineHeight: 1 }}
            >
              {menuOpen ? '\u2715' : '\u2630'}
            </button>
          </div>
        )}
      </div>

      {isMobile && menuOpen && (
        <nav style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '8px 16px 16px',
          gap: '12px',
          backgroundColor: COLORS.bgTranslucent,
          borderTop: `1px solid ${COLORS.bgLight}`,
        }}>
          {navItems.map(item => (
            <button
              key={item}
              onClick={() => scrollTo(item)}
              style={{
                fontSize: '14px',
                color: COLORS.textLight,
                fontFamily: FONT,
                textAlign: 'left',
              }}
            >
              {t(`nav.${item}`, lang)}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Header;
