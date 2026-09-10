import { Router } from 'express';
import multer from 'multer';
import { dirname, join, extname } from 'path';
import { fileURLToPath } from 'url';
import { randomUUID } from 'crypto';
import auth from '../middleware/auth.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Only formats this site actually displays. Anything that the browser would
// execute in our own origin (.html, .svg, .js) stays out: uploads are served
// back from /uploads by express.static, which sets Content-Type by extension.
const ALLOWED_EXT = new Set(['.png', '.jpg', '.jpeg', '.webp', '.gif', '.avif', '.mp4', '.webm']);

const storage = multer.diskStorage({
  destination: join(__dirname, '..', 'uploads'),
  filename(_req, file, cb) {
    // Never build the path from originalname. It is whatever the client put in
    // the multipart filename field, and multer joins it onto the destination
    // with path.join, which resolves ".." instead of sandboxing: an
    // originalname of "../../../dist/index.html" writes outside uploads
    // entirely. The name is generated here instead and only the extension is
    // taken from the client, after checking it against the allowlist.
    const ext = extname(file.originalname).toLowerCase();
    if (!ALLOWED_EXT.has(ext)) {
      return cb(new Error(`Unsupported file type: ${ext || 'none'}`));
    }
    cb(null, `${Date.now()}-${randomUUID()}${ext}`);
  },
});

const upload = multer({ storage, limits: { fileSize: 20 * 1024 * 1024 } });

const router = Router();

router.post('/', auth, (req, res) => {
  upload.single('file')(req, res, (err) => {
    if (err) return res.status(400).json({ error: err.message });
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    res.json({ filename: req.file.filename });
  });
});

export default router;
