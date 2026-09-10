import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useLanguage } from '../hooks/useLanguage';
import { t } from '../content/translations';

// Must stay in step with Gallery's copy: an admin upload comes back as an
// absolute /uploads/... path, and prefixing /gallery/ onto it 404s.
const getImageSrc = (item) => {
  if (item.image.startsWith('http')) return item.image;
  if (item.image.startsWith('/')) return item.image;
  return `/gallery/${item.image}`;
};

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
  const closeRef = useRef(null);
  // Captured during render of the first commit, before focus moves to the
  // close button, so it still holds the tile that opened the dialog.
  const openerRef = useRef(typeof document !== 'undefined' ? document.activeElement : null);

  useEffect(() => {
    const opener = openerRef.current;
    closeRef.current?.focus();

    // aria-modal only claims the rest of the page is inert. inert makes it
    // true: without it Tab walks out of the dialog into the nav and the form,
    // which the screen reader has been told are hidden, and whose focus ring
    // is painted underneath the scrim.
    const root = document.getElementById('root');
    root?.setAttribute('inert', '');

    const handleKey = (e) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      // A focused <video> uses the arrows to seek. Without this, seeking also
      // advances the gallery and destroys the element mid-playback.
      if (e.target?.closest?.('video, audio, input, textarea, select')) return;
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
      root?.removeAttribute('inert');
      // Put the user back where they were instead of dropping them at the top
      // of the document.
      opener?.focus?.();
    };
  }, [onClose, onNext, onPrev]);

  const media = item.video ? (
    isYouTube(item.video) ? (
      <div className="lb__media">
        <iframe
          className="lb__frame"
          src={`https://www.youtube.com/embed/${getYouTubeId(item.video)}?autoplay=1`}
          title={item.title[lang]}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    ) : isVimeo(item.video) ? (
      <div className="lb__media">
        <iframe
          className="lb__frame"
          src={`https://player.vimeo.com/video/${getVimeoId(item.video)}?autoplay=1`}
          title={item.title[lang]}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      </div>
    ) : isInstagram(item.video) ? (
      <div className="lb__media lb__media--portrait">
        <iframe
          className="lb__frame"
          src={getInstagramEmbedUrl(item.video)}
          title={item.title[lang]}
          allowFullScreen
        />
      </div>
    ) : (
      <video className="lb__video" src={item.video} controls autoPlay />
    )
  ) : (
    <img className="lb__img" src={getImageSrc(item)} alt={item.title[lang]} />
  );

  // Rendered into <body>: main.page is position:relative with a z-index, which
  // creates a stacking context the modal would otherwise be trapped inside,
  // painting underneath anything fixed outside it however high its z-index.
  return createPortal(
    <div
      className="lb"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={item.title[lang]}
    >
      <div className="lb__panel" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          ref={closeRef}
          className="lb__close"
          onClick={onClose}
          aria-label={t('lightbox.close', lang)}
        >
          {'✕'}
        </button>

        {media}

        <div className="lb__caption">
          <h3 className="lb__title">{item.title[lang]}</h3>
          <div className="lb__cat">
            {item.category[lang]} · {item.year}
          </div>
          {item.desc && <p className="lb__desc">{item.desc[lang]}</p>}
        </div>

        <div className="lb__nav">
          <button type="button" className="lb__step" onClick={onPrev} aria-label={t('lightbox.prev', lang)}>
            {'←'} {t('lightbox.prev', lang)}
          </button>
          <button type="button" className="lb__step" onClick={onNext} aria-label={t('lightbox.next', lang)}>
            {t('lightbox.next', lang)} {'→'}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Lightbox;
