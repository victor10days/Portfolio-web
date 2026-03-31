import { COLORS, FONT } from '../styles/theme';
import { useLanguage } from '../hooks/useLanguage';
import { useMobile } from '../hooks/useMobile';
import { hoverProps } from '../hooks/useHover';

const ProjectCard = ({ name, desc, stack, status, onClick }) => {
  const { lang } = useLanguage();
  const { isMobile } = useMobile();

  return (
    <div
      style={{
        padding: isMobile ? '20px' : '28px',
        backgroundColor: COLORS.bgCard,
        border: `1px solid ${COLORS.bgLight}`,
        transition: 'transform 0.2s, border-color 0.2s',
        cursor: onClick ? 'pointer' : 'default',
      }}
      onClick={onClick}
      {...hoverProps(
        { transform: 'translateY(-2px)', borderColor: COLORS.red },
        { transform: 'translateY(0)', borderColor: COLORS.bgLight }
      )}
    >
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginBottom: '10px',
        flexWrap: 'wrap',
        gap: '8px',
      }}>
        <h3 style={{
          fontSize: isMobile ? '18px' : '22px',
          color: COLORS.white,
          fontFamily: FONT,
        }}>
          {name[lang] || name.en}
        </h3>
        <span style={{
          fontSize: '12px',
          color: COLORS.red,
          fontFamily: FONT,
          fontStyle: 'italic',
        }}>
          {status[lang] || status.en}
        </span>
      </div>
      <p style={{
        fontSize: isMobile ? '13px' : '15px',
        color: COLORS.text,
        lineHeight: '1.6',
        marginBottom: '14px',
        fontFamily: FONT,
      }}>
        {desc[lang] || desc.en}
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
        {stack.map(tech => (
          <span key={tech} style={{
            fontSize: '11px',
            padding: '3px 8px',
            backgroundColor: 'rgba(232, 85, 58, 0.15)',
            color: COLORS.red,
            fontFamily: FONT,
          }}>
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProjectCard;
