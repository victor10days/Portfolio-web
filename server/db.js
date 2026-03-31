import Database from 'better-sqlite3';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { mkdirSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, 'data');
mkdirSync(DATA_DIR, { recursive: true });

const db = new Database(join(DATA_DIR, 'portfolio.db'));
db.pragma('journal_mode = WAL');

db.exec(`
  CREATE TABLE IF NOT EXISTS gallery (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    image       TEXT NOT NULL,
    video       TEXT,
    title_en    TEXT NOT NULL,
    title_es    TEXT NOT NULL,
    category_en TEXT NOT NULL,
    category_es TEXT NOT NULL,
    year        TEXT NOT NULL,
    desc_en     TEXT,
    desc_es     TEXT,
    sort_order  INTEGER DEFAULT 0,
    created_at  TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS projects (
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
    created_at    TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (gallery_id) REFERENCES gallery(id) ON DELETE SET NULL
  );

  CREATE TABLE IF NOT EXISTS contacts (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    name       TEXT NOT NULL,
    email      TEXT NOT NULL,
    subject    TEXT NOT NULL,
    message    TEXT NOT NULL,
    ip         TEXT,
    created_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS experience (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    role_en    TEXT NOT NULL,
    role_es    TEXT NOT NULL,
    company_en TEXT NOT NULL,
    company_es TEXT NOT NULL,
    date_en    TEXT NOT NULL,
    date_es    TEXT NOT NULL,
    desc_en    TEXT NOT NULL,
    desc_es    TEXT NOT NULL,
    sort_order INTEGER DEFAULT 0,
    created_at TEXT DEFAULT (datetime('now'))
  );
`);

export default db;
