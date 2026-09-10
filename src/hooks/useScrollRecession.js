import { useEffect } from 'react';
import { recessionT } from '../lib/recession';

// Writes --sketch-t on <html> as the page scrolls; .sketch in index.css turns
// it into the canvas container's opacity. The span and the floor are tokens:
// JS knows where the reader is, tokens.css knows what to do about it. One rAF
// per scroll burst, passive, and the only layout read is scrollY.
export function useScrollRecession() {
  useEffect(() => {
    const root = document.documentElement;
    const span = parseFloat(getComputedStyle(root).getPropertyValue('--sketch-span')) || 1;
    let frame = 0;

    const write = () => {
      frame = 0;
      root.style.setProperty('--sketch-t', recessionT(window.scrollY, window.innerHeight, span).toFixed(3));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(write);
    };

    write();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      root.style.removeProperty('--sketch-t');
    };
  }, []);
}
