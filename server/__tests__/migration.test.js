import { describe, it, expect, afterEach } from 'vitest';
import Database from 'better-sqlite3';
import { mkdtempSync, rmSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';

// db.js runs its migration against whatever database already exists. On a fresh
// checkout the CREATE TABLE always includes `link`, so the ALTER branch never
// executes there — which is exactly the path that runs in production, where
// Render keeps the database on a persistent disk. This recreates the old
// schema so that branch is actually covered.
const OLD_PROJECTS_SCHEMA = `
  CREATE TABLE projects (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    name_en       TEXT NOT NULL,
    name_es       TEXT NOT NULL,
    desc_en       TEXT NOT NULL,
    desc_es       TEXT NOT NULL,
    status_en     TEXT NOT NULL,
    status_es     TEXT NOT NULL,
    stack         TEXT NOT NULL,
    category_en   TEXT NOT NULL DEFAULT '',
    category_es   TEXT NOT NULL DEFAULT '',
    gallery_id    INTEGER,
    sort_order    INTEGER DEFAULT 0,
    created_at    TEXT DEFAULT (datetime('now'))
  );
`;

// The migration exactly as db.js performs it.
function migrate(db) {
  const columns = db.prepare('PRAGMA table_info(projects)').all().map((c) => c.name);
  if (!columns.includes('link')) {
    db.exec('ALTER TABLE projects ADD COLUMN link TEXT');
  }
}

let dir;
afterEach(() => {
  if (dir) rmSync(dir, { recursive: true, force: true });
  dir = undefined;
});

function openLegacyDb() {
  dir = mkdtempSync(join(tmpdir(), 'portfolio-migration-'));
  const db = new Database(join(dir, 'portfolio.db'));
  db.exec(OLD_PROJECTS_SCHEMA);
  return db;
}

describe('projects.link migration', () => {
  it('adds the column to a database that predates it', () => {
    const db = openLegacyDb();
    expect(db.prepare('PRAGMA table_info(projects)').all().map((c) => c.name)).not.toContain('link');

    migrate(db);

    expect(db.prepare('PRAGMA table_info(projects)').all().map((c) => c.name)).toContain('link');
    db.close();
  });

  it('is idempotent', () => {
    const db = openLegacyDb();
    migrate(db);
    expect(() => migrate(db)).not.toThrow();
    const linkColumns = db
      .prepare('PRAGMA table_info(projects)')
      .all()
      .filter((c) => c.name === 'link');
    expect(linkColumns).toHaveLength(1);
    db.close();
  });

  it('leaves rows that predate the column with a null link, and accepts writes after', () => {
    const db = openLegacyDb();
    db.prepare(
      `INSERT INTO projects (name_en, name_es, desc_en, desc_es, status_en, status_es, stack)
       VALUES ('Old', 'Old', 'd', 'd', '2025', '2025', '[]')`
    ).run();

    migrate(db);

    expect(db.prepare('SELECT link FROM projects WHERE name_en = ?').get('Old').link).toBeNull();

    // The seed's insert names `link` explicitly, so it must work post-migration.
    db.prepare(
      `INSERT INTO projects (name_en, name_es, desc_en, desc_es, status_en, status_es, stack, link)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    ).run('New', 'New', 'd', 'd', '2026', '2026', '[]', 'https://example.com');

    expect(db.prepare('SELECT link FROM projects WHERE name_en = ?').get('New').link).toBe(
      'https://example.com'
    );
    db.close();
  });
});
