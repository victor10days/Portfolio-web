import { useLanguage } from '../hooks/useLanguage';
import { useMobile } from '../hooks/useMobile';
import { COLORS, FONT } from '../styles/theme';
import { t } from '../content/translations';
import { hoverColor } from '../hooks/useHover';

const Footer = () => {
  const { lang } = useLanguage();
  const { isMobile } = useMobile();

  return (
    <footer id="contact" style={{
      backgroundColor: 'transparent',
      color: COLORS.white,
      padding: isMobile ? '40px 20px' : '60px 40px',
      textAlign: 'center',
      width: '100%',
      boxSizing: 'border-box',
      position: 'relative',
      zIndex: 1,
    }}>
      <h2 style={{
        fontSize: isMobile ? '24px' : '32px',
        marginBottom: '20px',
        fontFamily: FONT,
        fontWeight: 'normal',
        letterSpacing: '3px',
      }}>
        {t('nav.contact', lang)}
      </h2>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        alignItems: 'center',
        marginBottom: '30px',
      }}>
        <a
          href="mailto:victor10days@gmail.com"
          style={{
            color: COLORS.text,
            fontSize: isMobile ? '14px' : '16px',
            fontFamily: FONT,
            transition: 'color 0.2s',
          }}
          {...hoverColor(COLORS.red, COLORS.text)}
        >
          victor10days@gmail.com
        </a>
        <a
          href="https://github.com/victor10days"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: COLORS.text,
            fontSize: isMobile ? '14px' : '16px',
            fontFamily: FONT,
            transition: 'color 0.2s',
          }}
          {...hoverColor(COLORS.red, COLORS.text)}
        >
          github.com/victor10days
        </a>
      </div>
      <p style={{
        margin: 0,
        fontSize: '13px',
        color: COLORS.textLight,
        fontFamily: FONT,
      }}>
        {t('footer.copyright', lang)}
      </p>
    </footer>
  );
};

export default Footer;
