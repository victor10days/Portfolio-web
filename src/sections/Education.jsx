import { useLanguage } from '../hooks/useLanguage';
import { t } from '../content/translations';
import translations from '../content/translations';
import Section from '../components/Section';

const Education = () => {
  const { lang } = useLanguage();

  return (
    <Section id="education" title={t('education.title', lang)} className="section--tight">
      <ol className="seq">
        {translations.education.items.map((item, i) => (
          <li key={i} className="seq__item">
            <span className="seq__date">{item.date[lang]}</span>
            <span>
              <span className="seq__role">{item.school[lang]}</span>
              <div className="seq__org">{item.degree[lang]}</div>
              <p className="seq__desc">
                {item.location[lang]}
                {item.note && ` · ${item.note[lang]}`}
              </p>
            </span>
          </li>
        ))}
      </ol>
    </Section>
  );
};

export default Education;
