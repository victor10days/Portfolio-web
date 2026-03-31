import { useState, useCallback, useEffect } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { useMobile } from '../hooks/useMobile';
import { COLORS, FONT } from '../styles/theme';
import { hoverProps } from '../hooks/useHover';
import { useApi } from '../hooks/useApi';
import Lightbox from './Lightbox';

const getImageSrc = (item) => {
  if (item.image.startsWith('http')) return item.image;
  if (item.image.startsWith('/')) return item.image;
  return `/gallery/${item.image}`;
};

const Gallery = () => {
  const { lang } = useLanguage();
  const { isMobile, isTablet } = useMobile();
  const [selected, setSelected] = useState(null);
  const { data: gallery, loading } = useApi('/api/gallery');

  const columns = isMobile ? 1 : isTablet ? 2 : 3;

  const handleClose = useCallback(() => setSelected(null), []);
  const handlePrev = useCallback(() => setSelected(prev => (prev - 1 + (gallery?.length || 0)) % (gallery?.length || 1)), [gallery]);
  const handleNext = useCallback(() => setSelected(prev => (prev + 1) % (gallery?.length || 1)), [gallery]);

  // Listen for project card clicks that want to open a specific gallery item
  useEffect(() => {
    const handleOpenItem = (e) => {
      const { galleryId } = e.detail;
      if (!gallery) return;
      const idx = gallery.findIndex(item => item.id === galleryId);
      if (idx !== -1) setSelected(idx);
    };
    window.addEventListener('open-gallery-item', handleOpenItem);
    return () => window.removeEventListener('open-gallery-item', handleOpenItem);
  }, [gallery]);

  if (loading || !gallery) return null;

  return (
    <>
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: isMobile ? '12px' : '16px',
        maxWidth: '1000px',
        width: '100%',
      }}>
        {gallery.map((item, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            aria-label={item.title[lang]}
            style={{
              position: 'relative',
              overflow: 'hidden',
              aspectRatio: '4/3',
              border: `1px solid ${COLORS.bgLight}`,
              cursor: 'pointer',
              padding: 0,
              backgroundColor: COLORS.bgCard,
              transition: 'border-color 0.2s',
            }}
            {...hoverProps(
              { borderColor: COLORS.red },
              { borderColor: COLORS.bgLight }
            )}
          >
            <img
              src={getImageSrc(item)}
              alt={item.title[lang]}
              loading="lazy"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                transition: 'transform 0.3s',
              }}
              {...hoverProps(
                { transform: 'scale(1.05)' },
                { transform: 'scale(1)' }
              )}
            />
            {item.video && (
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                pointerEvents: 'none',
              }}>
                <div style={{
                  width: 0,
                  height: 0,
                  borderTop: '10px solid transparent',
                  borderBottom: '10px solid transparent',
                  borderLeft: '16px solid white',
                  marginLeft: '3px',
                }} />
              </div>
            )}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: isMobile ? '8px 10px' : '10px 14px',
              background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
              textAlign: 'left',
            }}>
              <div style={{
                fontSize: isMobile ? '12px' : '14px',
                color: COLORS.white,
                fontFamily: FONT,
                fontWeight: 'bold',
              }}>
                {item.title[lang]}
              </div>
              <div style={{
                fontSize: '11px',
                color: COLORS.red,
                fontFamily: FONT,
              }}>
                {item.category[lang]} — {item.year}
              </div>
            </div>
          </button>
        ))}
      </div>

      {selected !== null && (
        <Lightbox
          item={gallery[selected]}
          onClose={handleClose}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
    </>
  );
};

export default Gallery;
