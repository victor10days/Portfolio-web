import { useEffect, useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { t } from '../content/translations';

// The Saturn sketch owns the animation and the audio; these own the buttons.
// They talk through events so that changing language never rebuilds the p5
// instance, which would restart the animation and kill the audio context.
const SketchControls = () => {
  const { lang } = useLanguage();
  const [audioOn, setAudioOn] = useState(false);
  const [motionOn, setMotionOn] = useState(
    () => !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    const onAudio = (e) => setAudioOn(Boolean(e.detail?.on));
    const onMotion = (e) => setMotionOn(Boolean(e.detail?.on));
    window.addEventListener('saturn-audio-state', onAudio);
    window.addEventListener('saturn-motion-state', onMotion);
    return () => {
      window.removeEventListener('saturn-audio-state', onAudio);
      window.removeEventListener('saturn-motion-state', onMotion);
    };
  }, []);

  const send = (name) => () => window.dispatchEvent(new CustomEvent(name));

  return (
    <div className="controls">
      {/* The visible ON/OFF is repeated in the accessible name so that speech
          input ("click motion off") matches what is on screen. */}
      <button
        type="button"
        className="controls__btn"
        aria-pressed={motionOn}
        aria-label={`${t('a11y.motion', lang)} ${motionOn ? 'ON' : 'OFF'}`}
        onClick={send('saturn-motion-toggle')}
      >
        {'✳'} {motionOn ? 'ON' : 'OFF'}
      </button>
      <button
        type="button"
        className="controls__btn"
        aria-pressed={audioOn}
        aria-label={`${t('a11y.sound', lang)} ${audioOn ? 'ON' : 'OFF'}`}
        onClick={send('saturn-audio-toggle')}
      >
        {'♫'} {audioOn ? 'ON' : 'OFF'}
      </button>
    </div>
  );
};

export default SketchControls;
