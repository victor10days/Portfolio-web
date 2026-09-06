import { useState, useCallback, useEffect } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { useApi } from '../hooks/useApi';
import Lightbox from './Lightbox';

const getImageSrc = (item) => {
  if (item.image.startsWith('http')) return item.image;
  if (item.image.startsWith('/')) return item.image;
  return `/gallery/${item.image}`;
};

// A GitHub social card is a link preview, not a picture of the work: those pieces get a
// typographic cover with the repository path instead of a cropped screenshot of a link.
const isLinkCard = (item) => item.image.includes('opengraph.githubassets.com');
const repoPath = (item) => item.image.split('/').slice(-2).join('/');

const Gallery = () => {
  const { lang } = useLanguage();
  const [selected, setSelected] = useState(null);
  const { data: gallery, loading } = useApi('/api/gallery');

  const handleClose = useCallback(() => setSelected(null), []);
  const handlePrev = useCallback(
    () => setSelected((prev) => (prev - 1 + (gallery?.length || 0)) % (gallery?.length || 1)),
    [gallery]
  );
  const handleNext = useCallback(() => setSelected((prev) => (prev + 1) % (gallery?.length || 1)), [gallery]);

  useEffect(() => {
    const handleOpenItem = (e) => {
      const { galleryId } = e.detail;
      if (!gallery) return;
      const idx = gallery.findIndex((item) => item.id === galleryId);
      if (idx !== -1) setSelected(idx);
    };
    window.addEventListener('open-gallery-item', handleOpenItem);
    return () => window.removeEventListener('open-gallery-item', handleOpenItem);
  }, [gallery]);

  if (loading || !gallery) return null;

  return (
    <>
      <div className="gallery">
        {gallery.map((item, i) => (
          <button type="button" key={i} className="tile" onClick={() => setSelected(i)} aria-label={item.title[lang]}>
            {isLinkCard(item) ? (
              <span className="tile__cover">
                <b>{item.title[lang]}</b>
                <span>github.com/{repoPath(item)}</span>
              </span>
            ) : (
              <img className="tile__img" src={getImageSrc(item)} alt="" loading="lazy" />
            )}
            {item.video && <span className="tile__play" aria-hidden="true" />}
            {!isLinkCard(item) && (
              <span className="tile__cap">
                <b>{item.title[lang]}</b>
                <span>
                  {item.category[lang]} · {item.year}
                </span>
              </span>
            )}
          </button>
        ))}
      </div>

      {selected !== null && (
        <Lightbox item={gallery[selected]} onClose={handleClose} onPrev={handlePrev} onNext={handleNext} />
      )}
    </>
  );
};

export default Gallery;
