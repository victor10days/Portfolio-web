import { useLanguage } from '../hooks/useLanguage';
import { t } from '../content/translations';
import Section from '../components/Section';
import ProjectCard from '../components/ProjectCard';
import { useApi } from '../hooks/useApi';
import { scrollToElement } from '../lib/scroll';

const CATEGORY_ORDER = ['Interactive', 'Audio', 'Audio Software', 'Full-Stack Development'];

const Projects = () => {
  const { lang } = useLanguage();
  const { data: projectsData, loading, error } = useApi('/api/projects');

  // The Section renders in every state. On a cold start the API can take tens
  // of seconds, and if #projects does not exist yet, Header.go() optional-
  // chains past the missing element and the nav link silently does nothing.
  if (loading) {
    return <Section id="projects" title={t('projects.title', lang)} className="section--work" />;
  }

  if (error || !projectsData) {
    return (
      <Section id="projects" title={t('projects.title', lang)} className="section--work">
        <p className="note">{t('errors.list', lang)}</p>
      </Section>
    );
  }

  const grouped = {};
  for (const cat of CATEGORY_ORDER) {
    grouped[cat] = projectsData.filter((p) => p.category?.en === cat);
  }

  const handleProjectClick = (galleryId) => {
    if (galleryId == null) return;
    const galleryEl = document.getElementById('gallery');
    if (galleryEl) {
      scrollToElement(galleryEl);
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('open-gallery-item', { detail: { galleryId } }));
      }, 500);
    }
  };

  return (
    <Section id="projects" title={t('projects.title', lang)} className="section--work">
      {CATEGORY_ORDER.map((cat) => {
        const items = grouped[cat];
        if (!items || items.length === 0) return null;
        const categoryLabel = items[0].category[lang] || cat;
        return (
          <div key={cat} className="work__group">
            <h3 className="work__cat">{categoryLabel}</h3>
            {items.map((project, i) => (
              <ProjectCard
                key={project.id || i}
                {...project}
                onClick={project.gallery_id != null ? () => handleProjectClick(project.gallery_id) : undefined}
              />
            ))}
          </div>
        );
      })}
    </Section>
  );
};

export default Projects;
