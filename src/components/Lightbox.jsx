import { useEffect, useRef } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { useMobile } from '../hooks/useMobile';
import { COLORS, FONT } from '../styles/theme';
import { hoverColor } from '../hooks/useHover';

const getImageSrc = (item) =>
  item.image.startsWith('http') ? item.image : `/gallery/${item.image}`;

const isYouTube = (url) =>
  url && (url.includes('youtube.com') || url.includes('youtu.be'));

const getYouTubeId = (url) => {
  const match = url.match(/(?:v=|youtu\.be\/)([^&]+)/);
  return match ? match[1] : null;
};

const isInstagram = (url) =>
  url && url.includes('instagram.com');

const getInstagramEmbedUrl = (url) => {
  const clean = url.split('?')[0].replace(/\/$/, '');
  return `${clean}/embed`;
};

const isVimeo = (url) => url && url.includes('vimeo.com');

const getVimeoId = (url) => {
  const match = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  return match ? match[1] : null;
};

const Lightbox = ({ item, onClose, onPrev, onNext }) => {
  const { lang } = useLanguage();
  const { isMobile } = useMobile();
  const closeRef = useRef(null);

  useEffect(() => {
    closeRef.current?.focus();

    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose, onNext, onPrev]);

  return (
    <div
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={item.title[lang]}
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.92)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isMobile ? '16px' : '40px',
        cursor: 'pointer',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          maxWidth: '900px',
          width: '100%',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          cursor: 'default',
        }}
      >
        <button
          ref={closeRef}
          onClick={onClose}
          aria-label="Close"
          style={{
            alignSelf: 'flex-end',
            fontSize: '24px',
            color: COLORS.white,
            marginBottom: '8px',
            fontFamily: FONT,
          }}
        >
          {'\u2715'}
        </button>

        {item.video ? (
          isYouTube(item.video) ? (
            <div style={{
              position: 'relative',
              width: '100%',
              paddingBottom: '56.25%',
              marginBottom: '16px',
            }}>
              <iframe
                src={`https://www.youtube.com/embed/${getYouTubeId(item.video)}?autoplay=1`}
                title={item.title[lang]}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  position: 'absolute',
                  top: 0, left: 0,
                  width: '100%', height: '100%',
                  border: 'none',
                }}
              />
            </div>
          ) : isVimeo(item.video) ? (
            <div style={{
              position: 'relative',
              width: '100%',
              paddingBottom: '56.25%',
              marginBottom: '16px',
            }}>
              <iframe
                src={`https://player.vimeo.com/video/${getVimeoId(item.video)}?autoplay=1`}
                title={item.title[lang]}
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                style={{
                  position: 'absolute',
                  top: 0, left: 0,
                  width: '100%', height: '100%',
                  border: 'none',
                }}
              />
            </div>
          ) : isInstagram(item.video) ? (
            <div style={{
              position: 'relative',
              width: '100%',
              maxWidth: '400px',
              margin: '0 auto',
              paddingBottom: '75%',
              marginBottom: '16px',
            }}>
              <iframe
                src={getInstagramEmbedUrl(item.video)}
                title={item.title[lang]}
                allowFullScreen
                style={{
                  position: 'absolute',
                  top: 0, left: 0,
                  width: '100%', height: '100%',
                  border: 'none',
                }}
              />
            </div>
          ) : (
            <video
              src={item.video}
              controls
              autoPlay
              style={{
                width: '100%',
                maxHeight: '65vh',
                objectFit: 'contain',
                marginBottom: '16px',
                backgroundColor: '#000',
              }}
            />
          )
        ) : (
          <img
            src={getImageSrc(item)}
            alt={item.title[lang]}
            style={{
              width: '100%',
              maxHeight: '65vh',
              objectFit: 'contain',
              marginBottom: '16px',
            }}
          />
        )}

        <div style={{ textAlign: 'center' }}>
          <h3 style={{
            fontSize: isMobile ? '18px' : '22px',
            color: COLORS.white,
            fontFamily: FONT,
            margin: '0 0 4px 0',
          }}>
            {item.title[lang]}
          </h3>
          <div style={{
            fontSize: '13px',
            color: COLORS.red,
            fontFamily: FONT,
            marginBottom: '8px',
          }}>
            {item.category[lang]} — {item.year}
          </div>
          {item.desc && (
            <p style={{
              fontSize: isMobile ? '13px' : '15px',
              color: COLORS.text,
              fontFamily: FONT,
              lineHeight: '1.6',
              maxWidth: '600px',
              margin: '0 auto',
            }}>
              {item.desc[lang]}
            </p>
          )}
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '24px',
          marginTop: '16px',
        }}>
          <button
            onClick={onPrev}
            aria-label="Previous"
            style={{
              fontSize: '20px',
              color: COLORS.textLight,
              fontFamily: FONT,
              padding: '8px 16px',
              transition: 'color 0.2s',
            }}
            {...hoverColor(COLORS.red, COLORS.textLight)}
          >
            {'\u2190'} Prev
          </button>
          <button
            onClick={onNext}
            aria-label="Next"
            style={{
              fontSize: '20px',
              color: COLORS.textLight,
              fontFamily: FONT,
              padding: '8px 16px',
              transition: 'color 0.2s',
            }}
            {...hoverColor(COLORS.red, COLORS.textLight)}
          >
            Next {'\u2192'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Lightbox;
