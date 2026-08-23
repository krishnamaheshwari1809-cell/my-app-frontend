import { useState } from 'react';
import axios from 'axios';

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await axios.post('https://my-app-backend-bh6j.onrender.com/api/contact', form);
      setStatus('sent');
      setForm({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error sending message:', error);
      setStatus('error');
    }
  };

  return (
    <div className="section">
      <div className="container">
        <h2 className="section-title">Contact Us</h2>
        <p className="section-subtitle">Have a project in mind? Let's talk!</p>

        <div style={styles.wrap}>
          <div style={styles.infoBox}>
            <h3 style={{ marginBottom: '20px' }}>Get in Touch</h3>

            <a href="mailto:krishnamaheshwari597@gmail.com" style={styles.infoRow}>
              <span style={styles.icon}>📧</span>
              <div>
                <p style={{ color: '#a1a1aa', fontSize: '0.85rem' }}>Email</p>
                <p>krishnamaheshwari597@gmail.com</p>
              </div>
            </a>

            <a href="tel:+919953792977" style={styles.infoRow}>
              <span style={styles.icon}>📞</span>
              <div>
                <p style={{ color: '#a1a1aa', fontSize: '0.85rem' }}>Phone</p>
                <p>+91 9953792977</p>
              </div>
            </a>
          </div>

          <form style={styles.form} onSubmit={handleSubmit}>
            <input
              style={styles.input}
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              style={styles.input}
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <textarea
              style={{ ...styles.input, minHeight: '140px', resize: 'vertical' }}
              name="message"
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange}
              required
            />
            <button type="submit" className="btn" style={{ width: '100%' }} disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending...' : 'Send Message'}
            </button>
            {status === 'sent' && (
              <p style={{ color: '#4ade80', marginTop: '12px', textAlign: 'center' }}>
                Message sent! I'll get back to you soon. ✅
              </p>
            )}
            {status === 'error' && (
              <p style={{ color: '#f87171', marginTop: '12px', textAlign: 'center' }}>
                Something went wrong. Please try again or email me directly. ❌
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

const styles = {
  wrap: {
    display: 'grid',
    gridTemplateColumns: '1fr 1.3fr',
    gap: '48px',
  },
  infoBox: {
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '16px',
    padding: '32px',
    height: 'fit-content',
  },
  infoRow: {
    display: 'flex',
    gap: '16px',
    alignItems: 'center',
    marginBottom: '20px',
    padding: '8px',
    borderRadius: '10px',
    transition: 'background 0.2s',
  },
  icon: {
    fontSize: '1.5rem',
    background: 'rgba(139,92,246,0.15)',
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  input: {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: '10px',
    padding: '14px 16px',
    color: '#f1f1f5',
    fontSize: '0.95rem',
    fontFamily: 'inherit',
    outline: 'none',
  },
};

export default Contact;