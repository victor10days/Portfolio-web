import { useLanguage } from '../hooks/useLanguage';
import { t } from '../content/translations';
import Section from '../components/Section';

const About = () => {
  const { lang } = useLanguage();

  return (
    <Section id="about" title={t('about.title', lang)}>
      <div className="about">
        <img
          className="about__photo"
          src="/images/profile.jpg"
          alt="Víctor E. Díaz Diez"
          width="320"
          height="427"
          loading="lazy"
        />
        <div className="about__text">
          <p>{t('about.bio', lang)}</p>
          <p>{t('about.aka', lang)}</p>
          <div className="about__meta">{t('about.location', lang)}</div>
        </div>
      </div>
    </Section>
  );
};

export default About;
