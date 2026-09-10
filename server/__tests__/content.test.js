import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { gallery, projects, experience } from '../data.js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..');

// Projects.jsx groups by an exact string match against this list. A project
// whose category is not in it renders nowhere, with no error anywhere.
const categoryOrder = (() => {
  const src = readFileSync(join(root, 'src/sections/Projects.jsx'), 'utf8');
  const match = src.match(/const CATEGORY_ORDER = \[([^\]]+)\]/);
  if (!match) throw new Error('CATEGORY_ORDER not found in Projects.jsx');
  return match[1].split(',').map((s) => s.trim().replace(/^'|'$/g, '')).filter(Boolean);
})();

const bilingual = (item, field) => {
  expect(item[`${field}_en`], `${field}_en on ${item.name_en ?? item.title_en ?? item.role_en}`).toBeTruthy();
  expect(item[`${field}_es`], `${field}_es on ${item.name_en ?? item.title_en ?? item.role_en}`).toBeTruthy();
};

describe('projects', () => {
  it('every category is one the page actually renders', () => {
    for (const p of projects) {
      expect(categoryOrder, `"${p.name_en}" has category "${p.category_en}"`).toContain(p.category_en);
    }
  });

  it('every gallery_id points at a real gallery item', () => {
    // Seed resets sqlite_sequence, so ids are always 1..gallery.length.
    for (const p of projects) {
      if (p.gallery_id == null) continue;
      expect(p.gallery_id, `"${p.name_en}" gallery_id`).toBeGreaterThanOrEqual(1);
      expect(p.gallery_id, `"${p.name_en}" gallery_id`).toBeLessThanOrEqual(gallery.length);
    }
  });

  it('every link is http(s) — ProjectCard drops anything else', () => {
    for (const p of projects) {
      if (p.link == null) continue;
      expect(p.link, `"${p.name_en}" link`).toMatch(/^https?:\/\//);
    }
  });

  it('is bilingual throughout', () => {
    for (const p of projects) {
      bilingual(p, 'name');
      bilingual(p, 'desc');
      bilingual(p, 'status');
      bilingual(p, 'category');
    }
  });

  it('stack is JSON that parses to a non-empty array', () => {
    for (const p of projects) {
      const parsed = JSON.parse(p.stack);
      expect(Array.isArray(parsed), `"${p.name_en}" stack`).toBe(true);
      expect(parsed.length, `"${p.name_en}" stack`).toBeGreaterThan(0);
    }
  });
});

describe('experience', () => {
  it('is bilingual throughout', () => {
    for (const e of experience) {
      bilingual(e, 'role');
      bilingual(e, 'company');
      bilingual(e, 'date');
      bilingual(e, 'desc');
    }
  });

  it('keeps the Ama Earth Group contract as a closed three-month role', () => {
    const ama = experience.find((e) => e.company_en === 'Ama Earth Group');
    expect(ama).toBeDefined();
    expect(ama.role_en).toBe('Jr. Software Engineer');
    expect(ama.date_en).not.toMatch(/present/i);
    expect(ama.date_es).not.toMatch(/presente/i);
  });
});

describe('gallery', () => {
  it('is bilingual and has media for every item', () => {
    for (const g of gallery) {
      bilingual(g, 'title');
      bilingual(g, 'category');
      expect(g.image, `"${g.title_en}" image`).toBeTruthy();
      expect(g.year, `"${g.title_en}" year`).toBeTruthy();
    }
  });
});

describe('translations', () => {
  it('has a label for every skills row, or the page prints the raw key', async () => {
    const skills = (await import('../../src/content/skills.js')).default;
    const translations = (await import('../../src/content/translations.js')).default;
    for (const key of Object.keys(skills)) {
      const label = translations.skills[key];
      expect(label, `translations.skills.${key}`).toBeDefined();
      expect(label.en, `translations.skills.${key}.en`).toBeTruthy();
      expect(label.es, `translations.skills.${key}.es`).toBeTruthy();
    }
  });

  it('has both languages on every education entry', async () => {
    const translations = (await import('../../src/content/translations.js')).default;
    for (const item of translations.education.items) {
      for (const field of ['school', 'degree', 'date', 'location']) {
        expect(item[field]?.en, `education ${field}.en`).toBeTruthy();
        expect(item[field]?.es, `education ${field}.es`).toBeTruthy();
      }
    }
  });
});
