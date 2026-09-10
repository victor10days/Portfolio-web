import { useLanguage } from '../hooks/useLanguage';
import { t } from '../content/translations';

// Marquee hero: the name fills the fold over the Saturn sketch, left-biased, one line beneath,
// no button. The thick rule closes the fold; the page becomes a document below it.
const Hero = () => {
  const { lang } = useLanguage();

  return (
    <section id="hero" className="hero wrap" aria-label="Víctor E. Díaz Diez">
      <h1 className="hero__name">
        V<i>í</i>ctor E. D<i>í</i>az Diez
      </h1>
      <p className="hero__line">{t('hero.line', lang)}</p>
      <hr className="hero__rule" aria-hidden="true" />
    </section>
  );
};

export default Hero;
