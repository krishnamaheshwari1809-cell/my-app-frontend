import { useParams, Link, Navigate } from 'react-router-dom';
import { servicesData } from '../data/servicesData';
import Reveal from '../components/Reveal';
import './ServiceDetail.css';

function ServiceDetail() {
  const { slug } = useParams();
  const service = servicesData.find((s) => s.slug === slug);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  return (
    <div>
      <section className="sd-hero">
        <div className="container">
          <Link to="/services" className="sd-back">← All Services</Link>
          <div className="sd-icon">{service.icon}</div>
          <h1 className="sd-title">{service.full}</h1>
          <p className="sd-tagline">{service.tagline}</p>
          <Link to="/contact" className="btn">Get Started</Link>
        </div>
      </section>

      <section className="section">
        <div className="container sd-grid">
          <Reveal>
            <div>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>Overview</h2>
              <p style={{ color: '#c4c4cc', lineHeight: 1.8, marginBottom: '32px' }}>{service.overview}</p>

              <h2 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>What's Included</h2>
              <ul className="sd-included-list">
                {service.included.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="sd-benefits-card">
              <h3 style={{ marginBottom: '18px' }}>Key Benefits</h3>
              {service.benefits.map((b) => (
                <div key={b} className="sd-benefit-row">
                  <span className="sd-check">✓</span>
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {service.faqs && (
        <section className="section" style={{ background: 'rgba(255,255,255,0.02)' }}>
          <div className="container" style={{ maxWidth: '700px' }}>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <div className="sd-faq-list">
              {service.faqs.map((f, i) => (
                <Reveal key={f.q} delay={i * 0.1}>
                  <div className="sd-faq-item">
                    <h3 style={{ fontSize: '1.05rem', marginBottom: '8px' }}>{f.q}</h3>
                    <p style={{ color: '#a1a1aa', fontSize: '0.9rem', lineHeight: 1.6 }}>{f.a}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="services-cta">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '12px' }}>Ready to Get Started with {service.title}?</h2>
          <p style={{ color: '#d4c9f9', marginBottom: '28px' }}>
            Let's discuss your goals and build a strategy that works for your business.
          </p>
          <Link to="/contact" className="btn-white">Book a Free Consultation</Link>
        </div>
      </section>
    </div>
  );
}

export default ServiceDetail;