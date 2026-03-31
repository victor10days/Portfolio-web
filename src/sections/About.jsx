import { useLanguage } from '../hooks/useLanguage';
import { useMobile } from '../hooks/useMobile';
import { COLORS, sectionBase } from '../styles/theme';
import { t } from '../content/translations';

const About = () => {
  const { lang } = useLanguage();
  const { isMobile } = useMobile();

  const contentCardStyle = {
    maxWidth: '700px',
    width: isMobile ? '92%' : '80%',
    padding: isMobile ? '20px' : '40px',
    backgroundColor: COLORS.bgTranslucent,
    border: `1px solid ${COLORS.bgLight}`,
    boxSizing: 'border-box',
  };

  return (
    <section id="about" aria-label="about" style={{ ...sectionBase, zIndex: 1 }}>
      <div style={{
        position: 'absolute',
        top: 0, left: 0, width: '100%', height: '100%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 1,
      }}>
        <div style={{
          ...contentCardStyle,
          maxWidth: '900px',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: 'center',
          gap: isMobile ? '20px' : '32px',
        }}>
          <div style={{
            flexShrink: 0,
            width: isMobile ? '180px' : '240px',
            height: isMobile ? '240px' : '320px',
            overflow: 'hidden',
            border: `1px solid ${COLORS.red}`,
          }}>
            <img
              src="/images/profile.jpg"
              alt="Víctor E. Díaz Diez"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center top',
              }}
            />
          </div>

          <div style={{ flex: 1 }}>
            <h2 style={{
              fontSize: isMobile ? '24px' : '36px',
              marginBottom: isMobile ? '12px' : '20px',
              textAlign: isMobile ? 'center' : 'left',
              color: COLORS.white,
            }}>
              {t('about.title', lang)}
            </h2>
            <p style={{
              fontSize: isMobile ? '13px' : '16px',
              lineHeight: '1.8',
              color: COLORS.text,
              textAlign: isMobile ? 'center' : 'left',
              margin: 0,
            }}>
              {t('about.bio', lang)}
            </p>
            <p style={{
              fontSize: '13px',
              color: COLORS.textLight,
              textAlign: isMobile ? 'center' : 'left',
              marginTop: '16px',
              fontStyle: 'italic',
            }}>
              {t('about.location', lang)}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
