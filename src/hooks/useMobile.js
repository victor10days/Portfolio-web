import { useState, useEffect } from 'react';
import { BREAKPOINTS } from '../styles/theme';

export const useMobile = () => {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    isMobile: dimensions.width <= BREAKPOINTS.mobile,
    isTablet: dimensions.width <= BREAKPOINTS.tablet,
    width: dimensions.width,
    height: dimensions.height,
  };
};
