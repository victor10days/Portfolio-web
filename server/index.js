import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import authRoutes from './routes/auth.js';
import galleryRoutes from './routes/gallery.js';
import projectsRoutes from './routes/projects.js';
import uploadRoutes from './routes/upload.js';
import experienceRoutes from './routes/experience.js';
import contactRoutes from './routes/contact.js';
import contactsRoutes from './routes/contacts.js';
import { mailStatus, verifyTransports } from './mail.js';

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3001;

// Behind Render's proxy, so req.ip reads the real client from X-Forwarded-For
// (one hop). Without this the rate limiter buckets every visitor together.
app.set('trust proxy', 1);

app.use(cors());
app.use(express.json());

// No helmet: a full CSP would have to be tuned around Google Fonts and the p5
// canvas, and getting that wrong takes the site down. These three are the ones
// that carry weight here and none of them can break a working page.
app.use((_req, res, next) => {
  // Stops a stored file being sniffed into something executable.
  res.set('X-Content-Type-Options', 'nosniff');
  res.set('X-Frame-Options', 'SAMEORIGIN');
  res.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

// Uploads are user-supplied bytes served from our own origin, so they are
// never presented as something the browser should run or render inline.
app.use(
  '/uploads',
  express.static(join(__dirname, 'uploads'), {
    setHeaders: (res) => {
      res.set('X-Content-Type-Options', 'nosniff');
      res.set('Content-Security-Policy', "default-src 'none'; sandbox");
    },
  })
);

app.use('/api/auth', authRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/experience', experienceRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/contacts', contactsRoutes);

// Production: serve Vite build
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(join(__dirname, '..', 'dist')));
  app.get('*splat', (_req, res) => {
    res.sendFile(join(__dirname, '..', 'dist', 'index.html'));
  });
}

// Health check endpoint for self-ping
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

// Last resort. Express only hides stack traces when NODE_ENV is production, so
// without this the response body depends on an environment variable being set
// correctly on the host. The client always gets the same generic message; the
// detail stays in the server log.
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);

  // Surface email configuration at boot so a misconfiguration is visible.
  const mail = mailStatus();
  console.log(
    `[mail] Resend: ${mail.resendConfigured ? 'configured' : 'MISSING (set RESEND_API_KEY + MAIL_FROM + MAIL_TO)'} | ` +
    `Gmail fallback: ${mail.gmailConfigured ? 'configured' : 'off'} | ` +
    `from=${mail.mailFrom || '(unset)'} to=${mail.mailTo || '(unset)'}`
  );
  if (!mail.resendConfigured && !mail.gmailConfigured) {
    console.warn('[mail] No email channel configured — messages will save to DB only (recoverable via the admin Messages tab).');
  }
  verifyTransports();

  // Self-ping every 14 minutes to keep Render service awake
  if (process.env.RENDER_EXTERNAL_URL) {
    const url = `${process.env.RENDER_EXTERNAL_URL}/api/health`;
    setInterval(() => {
      fetch(url).catch(() => {});
    }, 14 * 60 * 1000);
  }
});
