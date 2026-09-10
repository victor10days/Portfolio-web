import { useState, useCallback, useEffect, useMemo } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { t } from '../content/translations';
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
  const { data: gallery, loading, error } = useApi('/api/gallery');

  // The open item is held as a gallery id, not an index, and the index is
  // derived. A project row can ask for an item before /api/gallery has
  // answered, and on a cold start it often does; keeping the id means the
  // request resolves itself when the data lands instead of being dropped.
  const [selectedId, setSelectedId] = useState(null);
  const selected = useMemo(() => {
    if (selectedId == null || !gallery) return null;
    const idx = gallery.findIndex((item) => item.id === selectedId);
    return idx === -1 ? null : idx;
  }, [selectedId, gallery]);

  const handleClose = useCallback(() => setSelectedId(null), []);
  const step = useCallback(
    (delta) => {
      if (!gallery?.length) return;
      setSelectedId((currentId) => {
        const idx = gallery.findIndex((item) => item.id === currentId);
        if (idx === -1) return currentId;
        return gallery[(idx + delta + gallery.length) % gallery.length].id;
      });
    },
    [gallery]
  );
  const handlePrev = useCallback(() => step(-1), [step]);
  const handleNext = useCallback(() => step(1), [step]);

  useEffect(() => {
    const handleOpenItem = (e) => setSelectedId(e.detail?.galleryId ?? null);
    window.addEventListener('open-gallery-item', handleOpenItem);
    return () => window.removeEventListener('open-gallery-item', handleOpenItem);
  }, []);

  if (loading) return null;
  if (error || !gallery) return <p className="note">{t('errors.list', lang)}</p>;

  return (
    <>
      <div className="gallery">
        {gallery.map((item, i) => (
          <button type="button" key={i} className="tile" onClick={() => setSelectedId(item.id)} aria-label={item.title[lang]}>
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
