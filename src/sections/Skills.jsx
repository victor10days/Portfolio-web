import { useLanguage } from '../hooks/useLanguage';
import { t } from '../content/translations';
import Section from '../components/Section';
import skillsData from '../content/skills';

// A spec sheet: one row per field, the tools written out, no chips.
const Skills = () => {
  const { lang } = useLanguage();

  return (
    <Section id="skills" title={t('skills.title', lang)} className="section--tight">
      <dl className="spec">
        {Object.entries(skillsData).map(([category, items]) => (
          <div className="spec__row" key={category}>
            <dt className="spec__k">{t(`skills.${category}`, lang)}</dt>
            <dd className="spec__v">{items.join(' · ')}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
};

export default Skills;
