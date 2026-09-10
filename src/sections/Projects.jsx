import { useLanguage } from '../hooks/useLanguage';
import { t } from '../content/translations';
import Section from '../components/Section';
import ProjectCard from '../components/ProjectCard';
import { useApi } from '../hooks/useApi';

const CATEGORY_ORDER = ['Interactive', 'Audio', 'Audio Software', 'Full-Stack Development'];

const Projects = () => {
  const { lang } = useLanguage();
  const { data: projectsData, loading } = useApi('/api/projects');

  if (loading || !projectsData) return null;

  const grouped = {};
  for (const cat of CATEGORY_ORDER) {
    grouped[cat] = projectsData.filter((p) => p.category?.en === cat);
  }

  const handleProjectClick = (galleryId) => {
    if (galleryId == null) return;
    const galleryEl = document.getElementById('gallery');
    if (galleryEl) {
      galleryEl.scrollIntoView({ behavior: 'smooth' });
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
