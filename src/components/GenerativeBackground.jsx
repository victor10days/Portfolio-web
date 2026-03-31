import { useRef, useEffect, memo } from 'react';
import p5 from 'p5';

const GenerativeBackground = memo(({ sketch, style }) => {
  const containerRef = useRef(null);
  const p5Ref = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    p5Ref.current = new p5(sketch, containerRef.current);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (p5Ref.current) {
          entry.isIntersecting ? p5Ref.current.loop() : p5Ref.current.noLoop();
        }
      },
      { threshold: 0 }
    );
    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
      if (p5Ref.current) {
        p5Ref.current.remove();
        p5Ref.current = null;
      }
    };
  }, [sketch]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        ...style,
      }}
    />
  );
});

GenerativeBackground.displayName = 'GenerativeBackground';

export default GenerativeBackground;
