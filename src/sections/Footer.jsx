import { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { useMobile } from '../hooks/useMobile';
import { COLORS, FONT } from '../styles/theme';
import { t } from '../content/translations';
import { hoverColor } from '../hooks/useHover';

const inputStyle = {
  width: '100%',
  padding: '10px 14px',
  fontSize: '14px',
  fontFamily: FONT,
  backgroundColor: COLORS.bgCard,
  color: COLORS.text,
  border: `1px solid ${COLORS.bgLight}`,
  boxSizing: 'border-box',
  outline: 'none',
};

const Footer = () => {
  const { lang } = useLanguage();
  const { isMobile } = useMobile();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState(null); // 'sending' | 'success' | 'error'

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }));

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
      setTimeout(() => setStatus(null), 4000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus(null), 4000);
    }
  };

  return (
    <footer id="contact" style={{
      backgroundColor: 'transparent',
      color: COLORS.white,
      padding: isMobile ? '40px 20px' : '60px 40px',
      textAlign: 'center',
      width: '100%',
      boxSizing: 'border-box',
      position: 'relative',
      zIndex: 1,
    }}>
      <h2 style={{
        fontSize: isMobile ? '24px' : '32px',
        marginBottom: '20px',
        fontFamily: FONT,
        fontWeight: 'normal',
        letterSpacing: '3px',
      }}>
        {t('nav.contact', lang)}
      </h2>

      {/* Contact form */}
      <form onSubmit={handleSubmit} style={{
        maxWidth: '500px',
        margin: '0 auto 30px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        textAlign: 'left',
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '10px' }}>
          <input
            placeholder={t('contact.name', lang)}
            value={form.name}
            onChange={set('name')}
            required
            style={inputStyle}
          />
          <input
            type="email"
            placeholder={t('contact.email', lang)}
            value={form.email}
            onChange={set('email')}
            required
            style={inputStyle}
          />
        </div>
        <input
          placeholder={t('contact.subject', lang)}
          value={form.subject}
          onChange={set('subject')}
          required
          style={inputStyle}
        />
        <textarea
          placeholder={t('contact.message', lang)}
          value={form.message}
          onChange={set('message')}
          required
          rows={5}
          style={{ ...inputStyle, resize: 'vertical' }}
        />
        <button
          type="submit"
          disabled={status === 'sending'}
          style={{
            padding: '10px',
            fontSize: '14px',
            fontFamily: FONT,
            backgroundColor: COLORS.red,
            color: COLORS.white,
            border: 'none',
            cursor: status === 'sending' ? 'default' : 'pointer',
            opacity: status === 'sending' ? 0.6 : 1,
            transition: 'opacity 0.2s',
          }}
        >
          {status === 'sending' ? t('contact.sending', lang) : t('contact.send', lang)}
        </button>
        {status === 'success' && (
          <p style={{ color: '#4CAF50', fontSize: '13px', margin: 0, fontFamily: FONT, textAlign: 'center' }}>
            {t('contact.success', lang)}
          </p>
        )}
        {status === 'error' && (
          <p style={{ color: COLORS.red, fontSize: '13px', margin: 0, fontFamily: FONT, textAlign: 'center' }}>
            {t('contact.error', lang)}
          </p>
        )}
      </form>

      {/* Links */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        alignItems: 'center',
        marginBottom: '30px',
      }}>
        <a
          href="https://github.com/victor10days"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: COLORS.text,
            fontSize: isMobile ? '14px' : '16px',
            fontFamily: FONT,
            transition: 'color 0.2s',
          }}
          {...hoverColor(COLORS.red, COLORS.text)}
        >
          github.com/victor10days
        </a>
      </div>
      <p style={{
        margin: 0,
        fontSize: '13px',
        color: COLORS.textLight,
        fontFamily: FONT,
      }}>
        {t('footer.copyright', lang)}
      </p>
    </footer>
  );
};

export default Footer;
