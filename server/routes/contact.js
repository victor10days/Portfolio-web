import { Router } from 'express';
import nodemailer from 'nodemailer';

const router = Router();

// Simple rate limiting: 1 message per IP per 60 seconds
const recentSenders = new Map();
const COOLDOWN_MS = 60_000;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

router.post('/', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  // Rate limit
  const ip = req.ip;
  const lastSent = recentSenders.get(ip);
  if (lastSent && Date.now() - lastSent < COOLDOWN_MS) {
    return res.status(429).json({ error: 'Please wait before sending another message' });
  }

  try {
    await transporter.sendMail({
      from: `"${name}" <${process.env.GMAIL_USER}>`,
      replyTo: email,
      to: process.env.GMAIL_USER,
      subject: `Portfolio Contact: ${subject}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      html: `
        <p><strong>From:</strong> ${name} &lt;${email}&gt;</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <hr/>
        <p>${message.replace(/\n/g, '<br/>')}</p>
      `,
    });

    recentSenders.set(ip, Date.now());
    res.json({ success: true });
  } catch (err) {
    console.error('Contact email failed:', err.message);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

export default router;
