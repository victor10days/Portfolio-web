# Design: tendaysmusic.com

A locked design system for the portfolio. The home page reads this file; the
admin pages keep their own inline styles and are out of scope.

## Genre

atmospheric, with the p5 Saturn sketch as the canvas instead of radial blooms.
The page should feel like a studio after hours: dark, warm, quiet, one accent.

## Macrostructure

Marquee Hero. The name fills the fold over the sketch, left-biased, one line
beneath, no button; a thick rule closes the fold and the page becomes a
document: prose, a spec sheet, rows of work, a grid of captures, two sequences,
a closing sentence with the form.

- Nav: N5 floating pill (wordmark, Work, About, Contact, the language switch;
  a corner chip with a sheet under 40 rem).
- Footer: Ft5 statement with the contact form beneath (C2).

## Theme

Custom, tuned to the site's own red-orange. Tokens live in `tokens.css` at
the project root; `src/index.css` imports it and styles everything through
`var()`. No colour or font is written inline on the home page.

- `--color-paper`  oklch(15% 0.010 35)
- `--color-paper-2` oklch(19% 0.012 35)
- `--color-paper-3` oklch(24% 0.012 35)
- `--color-ink`    oklch(94% 0.008 60)
- `--color-ink-2`  oklch(82% 0.010 50)
- `--color-muted`  oklch(68% 0.012 40)
- `--color-rule`   oklch(30% 0.012 35)
- `--color-accent` oklch(66% 0.17 32), the existing #E8553A
- `--color-focus`  oklch(74% 0.20 32)

Axes: dark / roman-serif / warm.

## Typography

- Display: Fraunces, weight 500 roman, optical size 144 on the name. Headings,
  project and role names, the closing sentence, the wordmark.
- Body: Geist 400, 600 for the spec-sheet keys and the button.
- Mono: Geist Mono 400 in two slots only: dates in the sequences, stack lines
  under projects (and the repository path on a typographic gallery cover).
- Nothing italic in a heading or a label; italic is for body emphasis only.
- Scale 1.25 from 16 px; the name is `clamp(3rem, 9vw, 7.5rem)`.

## Spacing

4-point named scale in `tokens.css`. Sections are sized to their content and
their top padding varies (`--space-2xl` default, `--space-3xl` before the
work, `--space-xl` for the tight ones). No viewport-height sections, no
scroll snap.

## Motion

- `--ease-out` cubic-bezier(0.16, 1, 0.3, 1), `--ease-in` cubic-bezier(0.7, 0, 0.84, 0).
- Reveal pattern: none. The sketch moves; the page does not.
- Hover: one signal per element (a colour shift, or a 1 px lift on the button).
- Reduced motion: transitions collapse to 1 ms.

## Microinteractions stance

- Focus rings from `--color-focus`, instant, 2 px, offset 2 px; never removed.
- Inputs and the button share a 2.75 rem height; border width never changes
  between states; the status line reserves one line so nothing jumps.
- Disabled is three signals: opacity, `cursor: not-allowed`, the attribute.
- Silent success in the form status line; no toasts.

## CTA voice

One button on the page, the form's submit: accent fill, paper-coloured text,
pill shape, a verb ("Send"). Everything else is a typographic link or a row.

## What pages MUST share

The tokens, the three faces and their roles, the wordmark `V.10` with the
accent dot, hairline rules as the divider language, square corners on content
(the pill and the button are the only rounded things besides inputs).

## Exports

`tokens.css` at the project root is the export.
