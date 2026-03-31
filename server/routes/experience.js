import { Router } from 'express';
import db from '../db.js';
import auth from '../middleware/auth.js';

const router = Router();

function formatRow(row) {
  return {
    id: row.id,
    role: { en: row.role_en, es: row.role_es },
    company: { en: row.company_en, es: row.company_es },
    date: { en: row.date_en, es: row.date_es },
    desc: { en: row.desc_en, es: row.desc_es },
    sort_order: row.sort_order,
  };
}

router.get('/', (_req, res) => {
  const rows = db.prepare('SELECT * FROM experience ORDER BY sort_order, id').all();
  res.json(rows.map(formatRow));
});

router.post('/', auth, (req, res) => {
  const { role_en, role_es, company_en, company_es, date_en, date_es, desc_en, desc_es } = req.body;
  const result = db.prepare(
    `INSERT INTO experience (role_en, role_es, company_en, company_es, date_en, date_es, desc_en, desc_es)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(role_en, role_es, company_en, company_es, date_en, date_es, desc_en, desc_es);
  res.json(formatRow(db.prepare('SELECT * FROM experience WHERE id = ?').get(result.lastInsertRowid)));
});

router.put('/:id', auth, (req, res) => {
  const { role_en, role_es, company_en, company_es, date_en, date_es, desc_en, desc_es, sort_order } = req.body;
  db.prepare(
    `UPDATE experience SET role_en=?, role_es=?, company_en=?, company_es=?, date_en=?, date_es=?, desc_en=?, desc_es=?, sort_order=?
     WHERE id=?`
  ).run(role_en, role_es, company_en, company_es, date_en, date_es, desc_en, desc_es, sort_order ?? 0, req.params.id);
  const row = db.prepare('SELECT * FROM experience WHERE id = ?').get(req.params.id);
  if (!row) return res.status(404).json({ error: 'Not found' });
  res.json(formatRow(row));
});

router.delete('/:id', auth, (req, res) => {
  const result = db.prepare('DELETE FROM experience WHERE id = ?').run(req.params.id);
  if (result.changes === 0) return res.status(404).json({ error: 'Not found' });
  res.json({ success: true });
});

export default router;
