import { useMobile } from '../hooks/useMobile';
import { sectionBase, sectionPadding } from '../styles/theme';

const Section = ({ id, bg, children, style }) => {
  const { isMobile } = useMobile();

  return (
    <section
      id={id}
      aria-label={id}
      style={{
        ...sectionBase,
        ...sectionPadding(isMobile),
        backgroundColor: bg,
        zIndex: 1,
        ...style,
      }}
    >
      {children}
    </section>
  );
};

export default Section;
