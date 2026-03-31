import { useLanguage } from '../hooks/useLanguage';
import { useMobile } from '../hooks/useMobile';
import { COLORS, FONT, sectionHeading } from '../styles/theme';
import { t } from '../content/translations';
import Section from '../components/Section';
import skillsData from '../content/skills';

const Skills = () => {
  const { lang } = useLanguage();
  const { isMobile, isTablet } = useMobile();

  return (
    <Section id="skills">
      <h2 style={sectionHeading(isMobile)}>
        {t('skills.title', lang)}
      </h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: isTablet ? '1fr' : '1fr 1fr',
        gap: isMobile ? '20px' : '30px',
        maxWidth: '800px',
        width: '100%',
      }}>
        {Object.entries(skillsData).map(([category, items]) => (
          <div key={category} style={{
            padding: isMobile ? '16px' : '24px',
            border: `1px solid ${COLORS.bgLight}`,
            backgroundColor: COLORS.bgCard,
          }}>
            <h3 style={{
              fontSize: isMobile ? '15px' : '18px',
              color: COLORS.red,
              marginBottom: '12px',
              fontFamily: FONT,
            }}>
              {t(`skills.${category}`, lang)}
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {items.map(skill => (
                <span key={skill} style={{
                  fontSize: '12px',
                  padding: '4px 10px',
                  backgroundColor: 'rgba(232, 85, 58, 0.1)',
                  color: COLORS.text,
                  fontFamily: FONT,
                }}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Skills;
