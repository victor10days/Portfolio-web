import { Router } from 'express';
import nodemailer from 'nodemailer';
import db from '../db.js';

const router = Router();

const insertContact = db.prepare(
  `INSERT INTO contacts (name, email, subject, message, ip) VALUES (?, ?, ?, ?, ?)`
);

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

  // Save to database (before email, so we never lose a submission)
  try {
    insertContact.run(name, email, subject, message, ip);
  } catch (dbErr) {
    console.error('Failed to save contact:', dbErr.message);
  }

  try {
    await transporter.sendMail({
      from: `"${name}" <${process.env.GMAIL_USER}>`,
      replyTo: email,
      to: process.env.GMAIL_USER,
      subject: `Portfolio Contact: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`,
      html: [
        '<div style="font-family:sans-serif;max-width:600px">',
        '<h3 style="margin:0 0 12px">New message from your portfolio</h3>',
        `<p style="margin:4px 0"><strong>Name:</strong> ${name}</p>`,
        `<p style="margin:4px 0"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>`,
        `<p style="margin:4px 0"><strong>Subject:</strong> ${subject}</p>`,
        '<hr style="margin:16px 0"/>',
        `<p>${message.replace(/\n/g, '<br/>')}</p>`,
        '</div>',
      ].join('\n'),
    });

    recentSenders.set(ip, Date.now());
    res.json({ success: true });
  } catch (err) {
    console.error('Contact email failed:', err.message);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

export default router;
