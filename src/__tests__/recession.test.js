import { describe, it, expect } from 'vitest';
import { recessionT } from '../lib/recession';

// The sketch's recession is a pure mapping from scroll position to a 0..1
// progress; useScrollRecession only feeds it scrollY and innerHeight.
describe('recessionT', () => {
  it('holds at 0 at the top and reaches 1 once the span has scrolled past', () => {
    expect(recessionT(0, 900, 0.8)).toBe(0);
    expect(recessionT(720, 900, 0.8)).toBe(1);
    expect(recessionT(5000, 900, 0.8)).toBe(1);
  });

  it('passes through the midpoint at exactly half, easing in and out', () => {
    expect(recessionT(360, 900, 0.8)).toBeCloseTo(0.5, 10);
    // Smoothstep: a quarter of the way in has moved less than a quarter of the way.
    expect(recessionT(180, 900, 0.8)).toBeLessThan(0.25);
    expect(recessionT(540, 900, 0.8)).toBeGreaterThan(0.75);
  });

  it('never decreases as the reader scrolls down', () => {
    let last = -1;
    for (let y = 0; y <= 720; y += 45) {
      const t = recessionT(y, 900, 0.8);
      expect(t).toBeGreaterThanOrEqual(last);
      last = t;
    }
  });

  it('stays inside [0, 1] for iOS overscroll and degenerate sizes', () => {
    expect(recessionT(-40, 900, 0.8)).toBe(0);
    expect(recessionT(100, 0, 0.8)).toBe(0);
    expect(recessionT(100, 900, 0)).toBe(0);
    expect(recessionT(100, NaN, 0.8)).toBe(0);
  });
});
