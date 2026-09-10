import { useEffect, useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { t } from '../content/translations';

// The Saturn sketch owns the audio; this owns the button. They talk through
// two events so that changing language never rebuilds the p5 instance (which
// would restart the animation and kill the audio context mid-note).
const AudioToggle = () => {
  const { lang } = useLanguage();
  const [on, setOn] = useState(false);

  useEffect(() => {
    const handleState = (e) => setOn(Boolean(e.detail?.on));
    window.addEventListener('saturn-audio-state', handleState);
    return () => window.removeEventListener('saturn-audio-state', handleState);
  }, []);

  return (
    <button
      type="button"
      className="audio"
      aria-pressed={on}
      aria-label={t('a11y.sound', lang)}
      onClick={() => window.dispatchEvent(new CustomEvent('saturn-audio-toggle'))}
    >
      {'♫'} {on ? 'ON' : 'OFF'}
    </button>
  );
};

export default AudioToggle;
