export const hoverColor = (hoverCol, defaultCol) => ({
  onMouseEnter: (e) => { e.currentTarget.style.color = hoverCol; },
  onMouseLeave: (e) => { e.currentTarget.style.color = defaultCol; },
});

export const hoverProps = (enterStyles, leaveStyles) => ({
  onMouseEnter: (e) => { Object.assign(e.currentTarget.style, enterStyles); },
  onMouseLeave: (e) => { Object.assign(e.currentTarget.style, leaveStyles); },
});
