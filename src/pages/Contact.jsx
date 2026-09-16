import { useState } from 'react';
import axios from 'axios';
import Seo from '../components/Seo';
import { countryStateData, countryList } from '../data/countryStateData';

const nameRegex = /^[A-Za-z]+(?:\s[A-Za-z]+)+$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[6-9]\d{9}$/;

function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    state: '',
    company: '',
    address: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('idle');

  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Full name is required';
        if (!nameRegex.test(value.trim())) return 'Enter your full name (first and last name, letters only)';
        return '';
      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!emailRegex.test(value.trim())) return 'Enter a valid email address';
        return '';
      case 'phone':
        if (!value.trim()) return 'Phone number is required';
        if (!phoneRegex.test(value.trim())) return 'Enter a valid 10-digit phone number';
        return '';
      case 'country':
        if (!value) return 'Please select a country';
        return '';
      case 'state':
        if (!value) return 'Please select a state';
        return '';
      case 'company':
        if (!value.trim()) return 'Company name is required';
        if (value.trim().length < 2) return 'Enter a valid company name';
        return '';
      case 'address':
        if (!value.trim()) return 'Address is required';
        if (value.trim().length < 10) return 'Please enter a complete address (min 10 characters)';
        return '';
      case 'message':
        if (!value.trim()) return 'Message is required';
        if (value.trim().length < 10) return 'Message should be at least 10 characters';
        return '';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'phone') {
      const digitsOnly = value.replace(/\D/g, '').slice(0, 10);
      setForm((prev) => ({ ...prev, phone: digitsOnly }));
      if (touched.phone) setErrors((prev) => ({ ...prev, phone: validateField('phone', digitsOnly) }));
      return;
    }

    if (name === 'name') {
      const lettersOnly = value.replace(/[^A-Za-z\s]/g, '');
      setForm((prev) => ({ ...prev, name: lettersOnly }));
      if (touched.name) setErrors((prev) => ({ ...prev, name: validateField('name', lettersOnly) }));
      return;
    }

    if (name === 'country') {
      // Reset state when country changes
      setForm((prev) => ({ ...prev, country: value, state: '' }));
      setTouched((prev) => ({ ...prev, country: true, state: false }));
      setErrors((prev) => ({ ...prev, country: validateField('country', value), state: '' }));
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.keys(form).forEach((key) => {
      newErrors[key] = validateField(key, form[key]);
    });
    setErrors(newErrors);
    setTouched({
      name: true, email: true, phone: true, country: true,
      state: true, company: true, address: true, message: true,
    });

    const hasErrors = Object.values(newErrors).some((err) => err);
    if (hasErrors) return;

    setStatus('sending');
    try {
      await axios.post('https://my-app-backend-bh6j.onrender.com/api/contact', form);
      setStatus('sent');
      setForm({ name: '', email: '', phone: '', country: '', state: '', company: '', address: '', message: '' });
      setTouched({});
      setErrors({});
    } catch (error) {
      console.error('Error sending message:', error);
      setStatus('error');
    }
  };

  const fieldError = (name) => touched[name] && errors[name];
  const availableStates = form.country ? countryStateData[form.country] || [] : [];

  return (
    <div className="section">
      <Seo page="contact" />
      <div className="container">
        <h2 className="section-title">Contact Us</h2>
        <p className="section-subtitle">Have a project in mind? Let's talk!</p>

        <div style={styles.wrap}>
          <div style={styles.infoBox}>
            <h3 style={{ marginBottom: '20px' }}>Get in Touch</h3>

            <a href="mailto:hello.techbuds@gmail.com" style={styles.infoRow}>
              <span style={styles.icon}>📧</span>
              <div>
                <p style={{ color: '#a1a1aa', fontSize: '0.85rem' }}>Email</p>
                <p>hello.techbuds@gmail.com</p>
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

          <form style={styles.form} onSubmit={handleSubmit} noValidate>
            <div style={styles.fieldGroup}>
              <input
                style={{ ...styles.input, ...(fieldError('name') ? styles.inputError : {}) }}
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {fieldError('name') && <p style={styles.errorText}>{errors.name}</p>}
            </div>

            <div style={styles.row}>
              <div style={styles.fieldGroup}>
                <input
                  style={{ ...styles.input, ...(fieldError('email') ? styles.inputError : {}) }}
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {fieldError('email') && <p style={styles.errorText}>{errors.email}</p>}
              </div>

              <div style={styles.fieldGroup}>
                <input
                  style={{ ...styles.input, ...(fieldError('phone') ? styles.inputError : {}) }}
                  type="tel"
                  name="phone"
                  placeholder="Phone Number (10 digits)"
                  value={form.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  maxLength={10}
                />
                {fieldError('phone') && <p style={styles.errorText}>{errors.phone}</p>}
              </div>
            </div>

            <div style={styles.row}>
              <div style={styles.fieldGroup}>
                <select
                  style={{ ...styles.input, ...(fieldError('country') ? styles.inputError : {}) }}
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="" style={styles.option}>Select Country</option>
                  {countryList.map((c) => (
                    <option key={c} value={c} style={styles.option}>{c}</option>
                  ))}
                </select>
                {fieldError('country') && <p style={styles.errorText}>{errors.country}</p>}
              </div>

              <div style={styles.fieldGroup}>
                <select
                  style={{ ...styles.input, ...(fieldError('state') ? styles.inputError : {}) }}
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={!form.country}
                >
                  <option value="" style={styles.option}>{form.country ? 'Select State' : 'Select country first'}</option>
                  {availableStates.map((s) => (
                    <option key={s} value={s} style={styles.option}>{s}</option>
                  ))}
                </select>
                {fieldError('state') && <p style={styles.errorText}>{errors.state}</p>}
              </div>
            </div>

            <div style={styles.fieldGroup}>
              <input
                style={{ ...styles.input, ...(fieldError('company') ? styles.inputError : {}) }}
                type="text"
                name="company"
                placeholder="Company Name"
                value={form.company}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {fieldError('company') && <p style={styles.errorText}>{errors.company}</p>}
            </div>

            <div style={styles.fieldGroup}>
              <textarea
                style={{ ...styles.input, minHeight: '80px', resize: 'vertical', ...(fieldError('address') ? styles.inputError : {}) }}
                name="address"
                placeholder="Full Address"
                value={form.address}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {fieldError('address') && <p style={styles.errorText}>{errors.address}</p>}
            </div>

            <div style={styles.fieldGroup}>
              <textarea
                style={{ ...styles.input, minHeight: '120px', resize: 'vertical', ...(fieldError('message') ? styles.inputError : {}) }}
                name="message"
                placeholder="Your Message"
                value={form.message}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {fieldError('message') && <p style={styles.errorText}>{errors.message}</p>}
            </div>

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
    gap: '4px',
  },
  row: {
    display: 'flex',
    gap: '16px',
  },
  fieldGroup: {
    flex: 1,
    marginBottom: '12px',
  },
  input: {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: '10px',
    padding: '14px 16px',
    color: '#ece5e5',
    fontSize: '0.95rem',
    fontFamily: 'inherit',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
    cursor: 'pointer',
    colorScheme: 'dark',
  },
  option: {
    background: '#1a1a1a',
    color: '#f1f1f5',
  },
  inputError: {
    borderColor: '#f87171',
  },
  errorText: {
    color: '#f87171',
    fontSize: '0.8rem',
    marginTop: '6px',
    marginBottom: 0,
  },
};

export default Contact;