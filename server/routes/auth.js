import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = Router();

// There is one password on this service and the endpoint is public, so without
// a throttle an attacker can guess forever, limited only by bcrypt's cost.
// Same shape as the contact-form limiter: in-memory, per IP (req.ip is the
// real client because index.js sets trust proxy), pruned as it goes.
const attempts = new Map();
const WINDOW_MS = 15 * 60_000;
const MAX_ATTEMPTS = 5;

function prune(now) {
  for (const [ip, record] of attempts) {
    if (now - record.first > WINDOW_MS) attempts.delete(ip);
  }
}

router.post('/login', async (req, res) => {
  const { password } = req.body;
  if (!password) return res.status(400).json({ error: 'Password required' });

  const now = Date.now();
  prune(now);

  const ip = req.ip;
  const record = attempts.get(ip);
  if (record && record.count >= MAX_ATTEMPTS) {
    const retryAfter = Math.ceil((record.first + WINDOW_MS - now) / 1000);
    res.set('Retry-After', String(retryAfter));
    return res.status(429).json({ error: 'Too many attempts. Try again later.' });
  }

  const match = await bcrypt.compare(password, process.env.ADMIN_HASH);

  if (!match) {
    if (record) {
      record.count += 1;
    } else {
      attempts.set(ip, { count: 1, first: now });
    }
    console.warn(`[auth] failed admin login from ${ip}`);
    return res.status(401).json({ error: 'Invalid password' });
  }

  attempts.delete(ip);
  const token = jwt.sign({ admin: true }, process.env.JWT_SECRET, { expiresIn: '24h' });
  res.json({ token });
});

export default router;
