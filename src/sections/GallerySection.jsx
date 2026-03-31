import { useLanguage } from '../hooks/useLanguage';
import { useMobile } from '../hooks/useMobile';
import { COLORS, sectionHeading } from '../styles/theme';
import { t } from '../content/translations';
import Section from '../components/Section';
import Gallery from '../components/Gallery';

const GallerySection = () => {
  const { lang } = useLanguage();
  const { isMobile } = useMobile();

  return (
    <Section id="gallery">
      <h2 style={sectionHeading(isMobile)}>
        {t('nav.gallery', lang)}
      </h2>
      <Gallery />
    </Section>
  );
};

export default GallerySection;
