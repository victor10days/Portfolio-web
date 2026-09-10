import { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { t } from '../content/translations';

// Ft5 statement: one sentence closes the page, then the form is the way to answer it.
const Footer = () => {
  const { lang } = useLanguage();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState(null); // 'sending' | 'success' | 'error'

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error);
      }
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.error('Contact submit failed:', err);
      setStatus('error');
    }
  };

  const sending = status === 'sending';
  const statusClass = status === 'error' ? 'form__status is-error' : status === 'success' ? 'form__status is-ok' : 'form__status';
  const statusText = status === 'success' ? t('contact.success', lang) : status === 'error' ? t('contact.error', lang) : '';

  return (
    <footer id="contact" className="foot wrap" aria-labelledby="contact-title">
      <h2 id="contact-title" className="foot__line">
        {t('footer.statement', lang)}
      </h2>

      <form className="form" onSubmit={handleSubmit} noValidate={false}>
        <div className="form__row">
          <div className="field">
            <label htmlFor="contact-name">{t('contact.name', lang)}</label>
            <input id="contact-name" className="input" value={form.name} onChange={set('name')} required autoComplete="name" />
          </div>
          <div className="field">
            <label htmlFor="contact-email">{t('contact.email', lang)}</label>
            <input
              id="contact-email"
              className="input"
              type="email"
              value={form.email}
              onChange={set('email')}
              required
              autoComplete="email"
            />
          </div>
        </div>
        <div className="field">
          <label htmlFor="contact-subject">{t('contact.subject', lang)}</label>
          <input id="contact-subject" className="input" value={form.subject} onChange={set('subject')} required />
        </div>
        <div className="field">
          <label htmlFor="contact-message">{t('contact.message', lang)}</label>
          <textarea id="contact-message" className="input" value={form.message} onChange={set('message')} required rows={5} />
        </div>
        <button type="submit" className="btn" disabled={sending} aria-disabled={sending}>
          {sending ? t('contact.sending', lang) : t('contact.send', lang)}
        </button>
        <p className={statusClass} role="status" aria-live="polite">
          {statusText}
        </p>
      </form>

      <div className="foot__meta">
        <span>{t('footer.copyright', lang)}</span>
        <a href="https://github.com/victor10days" target="_blank" rel="noopener noreferrer">
          github.com/victor10days
        </a>
      </div>
    </footer>
  );
};

export default Footer;
