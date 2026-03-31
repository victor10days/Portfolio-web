import { useLanguage } from '../hooks/useLanguage';
import { useMobile } from '../hooks/useMobile';
import { COLORS, FONT, sectionHeading } from '../styles/theme';
import { t } from '../content/translations';
import Section from '../components/Section';
import ProjectCard from '../components/ProjectCard';
import { useApi } from '../hooks/useApi';

const CATEGORY_ORDER = ['Interactive', 'Audio', 'Full-Stack Development'];

const Projects = () => {
  const { lang } = useLanguage();
  const { isMobile, isTablet } = useMobile();
  const { data: projectsData, loading } = useApi('/api/projects');

  if (loading || !projectsData) return null;

  // Group projects by category (EN key)
  const grouped = {};
  for (const cat of CATEGORY_ORDER) {
    grouped[cat] = projectsData.filter(p => p.category?.en === cat);
  }

  const handleProjectClick = (galleryId) => {
    if (galleryId == null) return;
    const galleryEl = document.getElementById('gallery');
    if (galleryEl) {
      galleryEl.scrollIntoView({ behavior: 'smooth' });
      // Dispatch event after scroll settles
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('open-gallery-item', { detail: { galleryId } }));
      }, 500);
    }
  };

  return (
    <Section id="projects">
      <h2 style={sectionHeading(isMobile)}>
        {t('projects.title', lang)}
      </h2>
      <div style={{ maxWidth: '900px', width: '100%' }}>
        {CATEGORY_ORDER.map(cat => {
          const items = grouped[cat];
          if (!items || items.length === 0) return null;
          // Get localized category name from first item
          const categoryLabel = items[0].category[lang] || cat;
          return (
            <div key={cat} style={{ marginBottom: isMobile ? '32px' : '40px' }}>
              <h3 style={{
                fontSize: isMobile ? '18px' : '22px',
                color: COLORS.red,
                fontFamily: FONT,
                letterSpacing: '2px',
                marginBottom: isMobile ? '12px' : '16px',
                textTransform: 'uppercase',
              }}>
                {categoryLabel}
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: isTablet ? '1fr' : '1fr 1fr',
                gap: isMobile ? '16px' : '24px',
              }}>
                {items.map((project, i) => (
                  <ProjectCard
                    key={project.id || i}
                    {...project}
                    onClick={project.gallery_id != null ? () => handleProjectClick(project.gallery_id) : undefined}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
};

export default Projects;
