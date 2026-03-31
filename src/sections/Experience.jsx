import { useLanguage } from '../hooks/useLanguage';
import { useMobile } from '../hooks/useMobile';
import { COLORS, FONT, sectionHeading } from '../styles/theme';
import { t } from '../content/translations';
import Section from '../components/Section';
import { useApi } from '../hooks/useApi';

const Experience = () => {
  const { lang } = useLanguage();
  const { isMobile } = useMobile();
  const { data, loading } = useApi('/api/experience');

  if (loading || !data) return null;

  return (
    <Section id="experience">
      <h2 style={sectionHeading(isMobile)}>
        {t('experience.title', lang)}
      </h2>
      <div style={{
        maxWidth: '700px',
        width: '100%',
        position: 'relative',
        paddingLeft: isMobile ? '20px' : '30px',
      }}>
        <div style={{
          position: 'absolute',
          left: isMobile ? '6px' : '10px',
          top: 0,
          bottom: 0,
          width: '2px',
          backgroundColor: COLORS.red,
        }} />

        {data.map((item, i) => (
          <div key={item.id ?? i} style={{
            position: 'relative',
            marginBottom: isMobile ? '24px' : '32px',
            paddingLeft: isMobile ? '16px' : '20px',
          }}>
            <div style={{
              position: 'absolute',
              left: isMobile ? '-18px' : '-24px',
              top: '6px',
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: COLORS.red,
              border: `2px solid ${COLORS.bg}`,
            }} />
            <div style={{
              fontSize: '12px',
              color: COLORS.red,
              marginBottom: '4px',
              fontFamily: FONT,
            }}>
              {item.date[lang]}
            </div>
            <h3 style={{
              fontSize: isMobile ? '16px' : '19px',
              color: COLORS.white,
              margin: '0 0 2px 0',
              fontFamily: FONT,
            }}>
              {item.role[lang]}
            </h3>
            <div style={{
              fontSize: isMobile ? '13px' : '15px',
              color: COLORS.textLight,
              fontStyle: 'italic',
              marginBottom: '6px',
              fontFamily: FONT,
            }}>
              {item.company[lang]}
            </div>
            <p style={{
              fontSize: isMobile ? '12px' : '14px',
              color: COLORS.text,
              lineHeight: '1.6',
              margin: 0,
              fontFamily: FONT,
            }}>
              {item.desc[lang]}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Experience;
