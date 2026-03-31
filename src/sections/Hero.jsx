import { useCallback } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { useMobile } from '../hooks/useMobile';
import { COLORS, FONT, sectionBase } from '../styles/theme';
import { t } from '../content/translations';
import { hoverProps } from '../hooks/useHover';

const Hero = () => {
  const { lang } = useLanguage();
  const { isMobile } = useMobile();

  const scrollTo = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <section id="hero" aria-label="hero" style={{ ...sectionBase, zIndex: 1 }}>
      <div style={{
        position: 'absolute',
        top: 0, left: 0, width: '100%', height: '100%',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        zIndex: 1,
        paddingTop: isMobile ? '50px' : '60px',
        boxSizing: 'border-box',
      }}>
        <div style={{ textAlign: 'center', padding: '0 20px' }}>
          <h1 style={{
            fontSize: isMobile ? '36px' : '72px',
            color: COLORS.white,
            margin: '0 0 4px 0',
            letterSpacing: '4px',
            fontWeight: 'normal',
          }}>
            V<span style={{ color: COLORS.red }}>Í</span>CTOR E. D<span style={{ color: COLORS.red }}>Í</span>AZ DIEZ
          </h1>
          <p style={{
            fontSize: isMobile ? '16px' : '22px',
            color: COLORS.textLight,
            fontStyle: 'italic',
            margin: '0 0 16px 0',
          }}>
            {t('hero.subtitle', lang)}
          </p>
          <p style={{
            fontSize: isMobile ? '11px' : '15px',
            color: COLORS.text,
            maxWidth: '600px',
            margin: '0 auto',
            letterSpacing: '1px',
            lineHeight: '1.8',
          }}>
            {t('hero.tagline1', lang)}<br />
            {t('hero.tagline2', lang)}
          </p>
        </div>
        <button
          onClick={() => scrollTo('about')}
          style={{
            position: 'absolute',
            bottom: '40px',
            left: '50%',
            transform: 'translateX(-50%)',
            padding: isMobile ? '8px 20px' : '10px 25px',
            fontSize: isMobile ? '12px' : '14px',
            backgroundColor: 'transparent',
            color: COLORS.textLight,
            border: `2px solid ${COLORS.textLight}`,
            cursor: 'pointer',
            transition: 'all 0.3s',
            fontFamily: FONT,
          }}
          {...hoverProps(
            { backgroundColor: COLORS.red, borderColor: COLORS.red, color: COLORS.white },
            { backgroundColor: 'transparent', borderColor: COLORS.textLight, color: COLORS.textLight }
          )}
        >
          {t('hero.cta', lang)}
        </button>
      </div>
    </section>
  );
};

export default Hero;
