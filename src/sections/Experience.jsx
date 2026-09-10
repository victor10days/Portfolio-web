import { useLanguage } from '../hooks/useLanguage';
import { t } from '../content/translations';
import Section from '../components/Section';
import { useApi } from '../hooks/useApi';

// A sequence: the dates in the margin, hairlines between entries, nothing italic, no rail.
const Experience = () => {
  const { lang } = useLanguage();
  const { data, loading } = useApi('/api/experience');

  if (loading || !data) return null;

  return (
    <Section id="experience" title={t('experience.title', lang)}>
      <ol className="seq">
        {data.map((item, i) => (
          <li key={item.id ?? i} className="seq__item">
            <span className="seq__date">{item.date[lang]}</span>
            <span>
              <span className="seq__role">{item.role[lang]}</span>
              <div className="seq__org">{item.company[lang]}</div>
              {item.desc?.[lang] && <p className="seq__desc">{item.desc[lang]}</p>}
            </span>
          </li>
        ))}
      </ol>
    </Section>
  );
};

export default Experience;
