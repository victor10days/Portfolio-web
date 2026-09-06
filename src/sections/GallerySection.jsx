import { useLanguage } from '../hooks/useLanguage';
import { t } from '../content/translations';
import Section from '../components/Section';
import Gallery from '../components/Gallery';

const GallerySection = () => {
  const { lang } = useLanguage();

  return (
    <Section id="gallery" title={t('nav.gallery', lang)}>
      <Gallery />
    </Section>
  );
};

export default GallerySection;
