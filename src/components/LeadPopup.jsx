import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const API_URL = 'https://my-app-backend-bh6j.onrender.com';

function LeadPopup() {
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [status, setStatus] = useState('idle');
  const triggered = useRef(false);

  useEffect(() => {
    const alreadySeen = sessionStorage.getItem('lead_popup_seen');
    if (alreadySeen) return;

    const handleScroll = () => {
      if (triggered.current) return;
      const scrollPercent =
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      if (scrollPercent >= 50) {
        triggered.current = true;
        setShow(true);
        sessionStorage.setItem('lead_popup_seen', 'true');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const close = () => setShow(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await axios.post(`${API_URL}/api/contact`, {
        name: form.name,
        email: form.email,
        message: `Quick popup lead. Phone: ${form.phone}`,
      });
      setStatus('done');
      setTimeout(() => setShow(false), 2000);
    } catch (err) {
      setStatus('error');
    }
  };

  if (!show) return null;

  return (
    <div className="lp-overlay" onClick={close}>
      <div className="lp-modal" onClick={(e) => e.stopPropagation()}>
        <button className="lp-close" onClick={close} aria-label="Close">×</button>

        {status === 'done' ? (
          <div className="lp-success">
            <p style={{ fontSize: '2rem', marginBottom: '10px' }}>✅</p>
            <h3>Thanks! I'll get back to you shortly.</h3>
          </div>
        ) : (
          <>
            <h3 className="lp-title">Get a Free Consultation</h3>
            <p className="lp-subtitle">Leave your details, no obligation, no spam.</p>
            <form onSubmit={handleSubmit} className="lp-form">
              <input
                type="text"
                placeholder="Your Name"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <input
                type="email"
                placeholder="Your Email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <input
                type="tel"
                placeholder="Phone Number"
                required
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
              <button type="submit" className="btn" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending...' : 'Get Free Consultation'}
              </button>
              {status === 'error' && <p className="lp-error">Something went wrong. Try again.</p>}
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default LeadPopup;