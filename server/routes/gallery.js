import { Router } from 'express';
import db from '../db.js';
import auth from '../middleware/auth.js';

const router = Router();

function formatRow(row) {
  return {
    id: row.id,
    image: row.image,
    video: row.video || undefined,
    title: { en: row.title_en, es: row.title_es },
    category: { en: row.category_en, es: row.category_es },
    year: row.year,
    desc: row.desc_en ? { en: row.desc_en, es: row.desc_es } : undefined,
    sort_order: row.sort_order,
  };
}

// Public: list all
router.get('/', (_req, res) => {
  const rows = db.prepare('SELECT * FROM gallery ORDER BY sort_order, id DESC').all();
  res.json(rows.map(formatRow));
});

// Protected: create
router.post('/', auth, (req, res) => {
  const { image, video, title_en, title_es, category_en, category_es, year, desc_en, desc_es } = req.body;
  const result = db.prepare(
    `INSERT INTO gallery (image, video, title_en, title_es, category_en, category_es, year, desc_en, desc_es)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(image, video || null, title_en, title_es, category_en, category_es, year, desc_en || null, desc_es || null);
  res.json(formatRow(db.prepare('SELECT * FROM gallery WHERE id = ?').get(result.lastInsertRowid)));
});

// Protected: update
router.put('/:id', auth, (req, res) => {
  const { image, video, title_en, title_es, category_en, category_es, year, desc_en, desc_es, sort_order } = req.body;
  db.prepare(
    `UPDATE gallery SET image=?, video=?, title_en=?, title_es=?, category_en=?, category_es=?, year=?, desc_en=?, desc_es=?, sort_order=?
     WHERE id=?`
  ).run(image, video || null, title_en, title_es, category_en, category_es, year, desc_en || null, desc_es || null, sort_order ?? 0, req.params.id);
  const row = db.prepare('SELECT * FROM gallery WHERE id = ?').get(req.params.id);
  if (!row) return res.status(404).json({ error: 'Not found' });
  res.json(formatRow(row));
});

// Protected: delete
router.delete('/:id', auth, (req, res) => {
  const result = db.prepare('DELETE FROM gallery WHERE id = ?').run(req.params.id);
  if (result.changes === 0) return res.status(404).json({ error: 'Not found' });
  res.json({ success: true });
});

export default router;
