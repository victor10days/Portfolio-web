import { Router } from 'express';
import multer from 'multer';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import auth from '../middleware/auth.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const storage = multer.diskStorage({
  destination: join(__dirname, '..', 'uploads'),
  filename(_req, file, cb) {
    const clean = file.originalname.replace(/\s+/g, '-');
    cb(null, `${Date.now()}-${clean}`);
  },
});

const upload = multer({ storage, limits: { fileSize: 20 * 1024 * 1024 } });

const router = Router();

router.post('/', auth, upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  res.json({ filename: req.file.filename });
});

export default router;
