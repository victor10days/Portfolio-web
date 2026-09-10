// How far the sketch has receded: 0 at the top of the page, 1 once the reader
// has scrolled `spanViewports` viewports, eased (smoothstep) so the field holds
// while the name is still on screen. Pure, so vitest runs it without a DOM;
// useScrollRecession feeds it scrollY and innerHeight.
export function recessionT(scrollY, viewportH, spanViewports) {
  const span = viewportH * spanViewports;
  if (!(span > 0)) return 0;
  const t = Math.min(1, Math.max(0, scrollY / span));
  return t * t * (3 - 2 * t);
}
