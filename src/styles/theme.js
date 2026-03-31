export const COLORS = {
  bg: '#1A1A1A',
  bgLight: '#242424',
  bgCard: '#2A2A2A',
  red: '#E8553A',
  white: '#FFFFFF',
  text: '#E0E0E0',
  textLight: '#999999',
  bgTranslucent: 'rgba(26, 26, 26, 0.92)',
  bgSemi: 'rgba(26, 26, 26, 0.85)',
  bgLightSemi: 'rgba(36, 36, 36, 0.85)',
};

export const FONT = 'Georgia, serif';

export const BREAKPOINTS = {
  mobile: 500,
  tablet: 768,
};

export const sectionBase = {
  minHeight: '100dvh',
  width: '100%',
  position: 'relative',
  overflow: 'hidden',
  scrollSnapAlign: 'start',
  boxSizing: 'border-box',
};

export const sectionPadding = (isMobile) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: isMobile ? '80px 16px 40px' : '80px 40px 40px',
});

export const sectionHeading = (isMobile) => ({
  fontSize: isMobile ? '28px' : '36px',
  color: COLORS.white,
  marginBottom: isMobile ? '24px' : '40px',
  textAlign: 'center',
  letterSpacing: '3px',
});
