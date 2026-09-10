import nodemailer from 'nodemailer';
import { Resend } from 'resend';

const {
  RESEND_API_KEY,
  MAIL_FROM,
  MAIL_TO,
  GMAIL_USER,
  GMAIL_APP_PASSWORD,
} = process.env;

// Primary sender. Null when unconfigured, so a missing key degrades gracefully
// instead of throwing at import time.
const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

// Optional Gmail fallback. Built only when both credentials are present.
const gmailTransporter = (GMAIL_USER && GMAIL_APP_PASSWORD)
  ? nodemailer.createTransport({
      service: 'gmail',
      auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD },
    })
  : null;

// Where notifications are delivered. Prefer MAIL_TO; fall back to the Gmail
// account so an existing Gmail-only setup keeps working.
const recipient = MAIL_TO || GMAIL_USER || null;

export const mailStatus = () => ({
  resendConfigured: Boolean(resend && MAIL_FROM && recipient),
  gmailConfigured: Boolean(gmailTransporter && recipient),
  mailFrom: MAIL_FROM || null,
  mailTo: recipient,
});

export const escapeHtml = (str = '') =>
  String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

// Shared text + HTML bodies. Every visitor-supplied value is HTML-escaped, so a
// message body can never inject markup into the notification email.
const buildBodies = ({ name, email, subject, message }) => {
  const text = `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`;
  const html = [
    '<div style="font-family:sans-serif;max-width:600px">',
    '<h3 style="margin:0 0 12px">New message from your portfolio</h3>',
    `<p style="margin:4px 0"><strong>Name:</strong> ${escapeHtml(name)}</p>`,
    `<p style="margin:4px 0"><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>`,
    `<p style="margin:4px 0"><strong>Subject:</strong> ${escapeHtml(subject)}</p>`,
    '<hr style="margin:16px 0"/>',
    `<p>${escapeHtml(message).replace(/\n/g, '<br/>')}</p>`,
    '</div>',
  ].join('\n');
  return { text, html };
};

// Send via Resend. Throws on any misconfiguration or API error so the caller
// can catch and try the fallback.
export const sendViaResend = async ({ name, email, subject, message }) => {
  if (!resend) throw new Error('Resend not configured (RESEND_API_KEY missing)');
  if (!MAIL_FROM) throw new Error('MAIL_FROM not set');
  if (!recipient) throw new Error('MAIL_TO not set');
  const { text, html } = buildBodies({ name, email, subject, message });
  const { data, error } = await resend.emails.send({
    from: MAIL_FROM,
    to: recipient,
    replyTo: email,
    subject: `Portfolio Contact: ${subject}`,
    text,
    html,
  });
  if (error) throw new Error(error.message || JSON.stringify(error));
  return data;
};

// Send via the Gmail transporter. The From is the authenticated Gmail account
// with a static display name (Gmail rejects arbitrary From addresses, and a
// static name avoids header injection via the visitor's name); the visitor's
// address is the Reply-To.
export const sendViaGmail = async ({ name, email, subject, message }) => {
  if (!gmailTransporter) throw new Error('Gmail not configured');
  if (!recipient) throw new Error('No recipient configured');
  const { text, html } = buildBodies({ name, email, subject, message });
  return gmailTransporter.sendMail({
    from: `Portfolio Contact <${GMAIL_USER}>`,
    replyTo: email,
    to: recipient,
    subject: `Portfolio Contact: ${subject}`,
    text,
    html,
  });
};

// Best-effort startup check. Logs whether the Gmail transporter can authenticate
// so a broken credential is visible at boot. Never throws.
export const verifyTransports = async () => {
  if (!gmailTransporter) return;
  try {
    await gmailTransporter.verify();
    console.log('[mail] Gmail transporter verified OK');
  } catch (err) {
    console.warn('[mail] Gmail transporter verify failed:', err?.message);
  }
};
