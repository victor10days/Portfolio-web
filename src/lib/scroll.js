// scrollIntoView takes its behavior from the argument, so the CSS
// prefers-reduced-motion block that sets scroll-behavior: auto has no effect on
// any of the page's JS-driven scrolls. This checks the same preference.
export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function scrollToElement(el, block = 'start') {
  if (!el) return false;
  el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block });
  return true;
}
