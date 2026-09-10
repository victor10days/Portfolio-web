import { useLanguage } from '../hooks/useLanguage';
import { t } from '../content/translations';

// A project is a row: the year in the margin, the name in the display face, one line, the stack.
// Rows that have a gallery piece are real buttons, so the keyboard reaches them too.
const ProjectCard = ({ name, desc, stack, status, link, onClick }) => {
  const { lang } = useLanguage();
  const pick = (v) => (v && (v[lang] || v.en)) || '';

  // The link is admin-editable and goes straight into an href, so only http(s)
  // is allowed through; javascript: and data: URLs are dropped.
  const safeLink = typeof link === 'string' && /^https?:\/\//i.test(link) ? link : null;

  const inner = (
    <>
      <span className="work__year">{pick(status)}</span>
      <span>
        <span className="work__name">
          {pick(name)}
          {onClick && <span className="work__open">{t('projects.open', lang)}</span>}
        </span>
        <span className="work__desc">{pick(desc)}</span>
        {Array.isArray(stack) && stack.length > 0 && <span className="work__stack">{stack.join(' · ')}</span>}
        {safeLink && (
          // stopPropagation: a row with a gallery piece is a <button>, and a
          // nested anchor would otherwise also fire the scroll-to-gallery handler.
          <a
            className="work__link"
            href={safeLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
          >
            {safeLink.replace(/^https?:\/\//, '').replace(/\/$/, '')}
          </a>
        )}
      </span>
    </>
  );

  return onClick ? (
    <button type="button" className="work__row" onClick={onClick}>
      {inner}
    </button>
  ) : (
    <div className="work__row">{inner}</div>
  );
};

export default ProjectCard;
