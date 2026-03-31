import { useLanguage } from '../hooks/useLanguage';
import { useMobile } from '../hooks/useMobile';
import { COLORS, FONT, sectionHeading } from '../styles/theme';
import { t } from '../content/translations';
import translations from '../content/translations';
import Section from '../components/Section';

const Education = () => {
  const { lang } = useLanguage();
  const { isMobile } = useMobile();

  return (
    <Section id="education">
      <h2 style={sectionHeading(isMobile)}>
        {t('education.title', lang)}
      </h2>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: isMobile ? '16px' : '24px',
        maxWidth: '700px',
        width: '100%',
      }}>
        {translations.education.items.map((item, i) => (
          <div key={i} style={{
            padding: isMobile ? '20px' : '28px',
            backgroundColor: COLORS.bgCard,
            border: `1px solid ${COLORS.bgLight}`,
          }}>
            <h3 style={{
              fontSize: isMobile ? '17px' : '20px',
              color: COLORS.white,
              margin: '0 0 4px 0',
              fontFamily: FONT,
            }}>
              {item.school[lang]}
            </h3>
            <p style={{
              fontSize: isMobile ? '14px' : '16px',
              color: COLORS.text,
              margin: '0 0 4px 0',
              fontFamily: FONT,
            }}>
              {item.degree[lang]}
            </p>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '4px',
            }}>
              <span style={{ fontSize: '13px', color: COLORS.red, fontFamily: FONT }}>
                {item.date[lang]}
              </span>
              <span style={{ fontSize: '13px', color: COLORS.textLight, fontFamily: FONT }}>
                {item.location[lang]}
              </span>
            </div>
            {item.note && (
              <p style={{
                fontSize: '12px',
                color: COLORS.textLight,
                fontStyle: 'italic',
                marginTop: '6px',
                fontFamily: FONT,
              }}>
                {item.note[lang]}
              </p>
            )}
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Education;
