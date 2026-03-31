import { Router } from 'express';
import db from '../db.js';
import auth from '../middleware/auth.js';

const router = Router();

function formatRow(row) {
  return {
    id: row.id,
    name: { en: row.name_en, es: row.name_es },
    desc: { en: row.desc_en, es: row.desc_es },
    status: { en: row.status_en, es: row.status_es },
    stack: JSON.parse(row.stack),
    category: { en: row.category_en, es: row.category_es },
    gallery_id: row.gallery_id || null,
    sort_order: row.sort_order,
  };
}

// Public: list all
router.get('/', (_req, res) => {
  const rows = db.prepare('SELECT * FROM projects ORDER BY sort_order, id DESC').all();
  res.json(rows.map(formatRow));
});

// Protected: create
router.post('/', auth, (req, res) => {
  const { name_en, name_es, desc_en, desc_es, status_en, status_es, stack, category_en, category_es, gallery_id } = req.body;
  const stackStr = typeof stack === 'string' ? stack : JSON.stringify(stack);
  const result = db.prepare(
    `INSERT INTO projects (name_en, name_es, desc_en, desc_es, status_en, status_es, stack, category_en, category_es, gallery_id)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(name_en, name_es, desc_en, desc_es, status_en, status_es, stackStr, category_en || '', category_es || '', gallery_id || null);
  res.json(formatRow(db.prepare('SELECT * FROM projects WHERE id = ?').get(result.lastInsertRowid)));
});

// Protected: update
router.put('/:id', auth, (req, res) => {
  const { name_en, name_es, desc_en, desc_es, status_en, status_es, stack, category_en, category_es, gallery_id, sort_order } = req.body;
  const stackStr = typeof stack === 'string' ? stack : JSON.stringify(stack);
  db.prepare(
    `UPDATE projects SET name_en=?, name_es=?, desc_en=?, desc_es=?, status_en=?, status_es=?, stack=?, category_en=?, category_es=?, gallery_id=?, sort_order=?
     WHERE id=?`
  ).run(name_en, name_es, desc_en, desc_es, status_en, status_es, stackStr, category_en || '', category_es || '', gallery_id || null, sort_order ?? 0, req.params.id);
  const row = db.prepare('SELECT * FROM projects WHERE id = ?').get(req.params.id);
  if (!row) return res.status(404).json({ error: 'Not found' });
  res.json(formatRow(row));
});

// Protected: delete
router.delete('/:id', auth, (req, res) => {
  const result = db.prepare('DELETE FROM projects WHERE id = ?').run(req.params.id);
  if (result.changes === 0) return res.status(404).json({ error: 'Not found' });
  res.json({ success: true });
});

export default router;
