import { Router } from 'express';
import db from '../db.js';
import { mailStatus, sendViaResend, sendViaGmail } from '../mail.js';

const router = Router();

const insertContact = db.prepare(
  `INSERT INTO contacts (name, email, subject, message, ip) VALUES (?, ?, ?, ?, ?)`
);

// Simple rate limiting: 1 message per IP per 60 seconds
const recentSenders = new Map();
const COOLDOWN_MS = 60_000;

router.post('/', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  // Rate limit. req.ip is the real client IP because index.js sets trust proxy.
  const ip = req.ip;
  const lastSent = recentSenders.get(ip);
  if (lastSent && Date.now() - lastSent < COOLDOWN_MS) {
    return res.status(429).json({ error: 'Please wait before sending another message' });
  }

  // Persist first, so a submission is never lost even if every email fails.
  let saved = false;
  try {
    insertContact.run(name, email, subject, message, ip);
    saved = true;
    // Throttle on a successful save (not on email success) so retries are
    // limited even when delivery fails.
    recentSenders.set(ip, Date.now());
  } catch (dbErr) {
    console.error('[contact] Failed to save submission:', dbErr.message);
  }

  // Notify, best-effort and per-channel. Resend is primary; Gmail is a fallback
  // used only when Resend is unconfigured or fails.
  const status = mailStatus();
  const payload = { name, email, subject, message };
  let delivered = false;
  let via = null;

  if (status.resendConfigured) {
    try {
      await sendViaResend(payload);
      delivered = true;
      via = 'resend';
    } catch (err) {
      console.error('[contact] Resend send failed:', err?.message);
    }
  }

  if (!delivered && status.gmailConfigured) {
    try {
      await sendViaGmail(payload);
      delivered = true;
      via = 'gmail';
    } catch (err) {
      console.error('[contact] Gmail fallback failed:', err?.message);
    }
  }

  if (!delivered) {
    console.warn(
      `[contact] Message ${saved ? 'saved to DB but NOT emailed' : 'NEITHER saved NOR emailed'} ` +
      `(resendConfigured=${status.resendConfigured}, gmailConfigured=${status.gmailConfigured}).` +
      (saved ? ' Recoverable via the admin Messages tab / GET /api/contacts.' : '')
    );
  }

  // The message is safe as long as it was saved (recoverable) or emailed. Only
  // report failure when it was neither, so a saved message never shows an error.
  if (saved || delivered) {
    return res.json({ success: true, delivered, via });
  }

  return res.status(500).json({ error: 'Failed to send message' });
});

export default router;
