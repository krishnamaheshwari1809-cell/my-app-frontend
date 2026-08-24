import { Link } from 'react-router-dom';
import { servicesData } from '../data/servicesData';
import Reveal from '../components/Reveal';
import LogoMarquee from '../components/LogoMarquee';
import FAQAccordion from '../components/FAQAccordion';
import './Services.css';

function Services() {
  const process = [
    { step: '01', title: 'Discovery Call', desc: 'We discuss your business, goals, and current challenges.' },
    { step: '02', title: 'Strategy', desc: 'A custom plan is built around your specific needs and budget.' },
    { step: '03', title: 'Execution', desc: "Work begins with regular updates so you always know what's happening." },
    { step: '04', title: 'Results & Reporting', desc: "Clear reports show what's working and where we go next." },
  ];

  const trustBadges = [
    'SEO Optimized', '7+ Years Experience', 'Google Ads Certified', 'Meta Ads Expert',
    'Web Development', 'Content Marketing', '100+ Projects Delivered', 'Data-Driven Strategy',
  ];

  const faqs = [
    { q: 'Which service should I start with?', a: 'It depends on your goals. If you need visibility, start with SEO. If you need traffic fast, paid ads work quicker. A free consultation can help figure out the right starting point.' },
    { q: 'Can I combine multiple services together?', a: 'Yes, most clients combine SEO, ads, and web development for the best results — they work better together than in isolation.' },
    { q: 'Do you offer monthly or one-time packages?', a: 'Both. SEO and marketing services work best as ongoing monthly plans, while web development is usually a one-time project with optional maintenance.' },
    { q: 'How do you measure success for each service?', a: 'Every service has clear KPIs — traffic, rankings, leads, conversions, or ad ROI — and you get regular reports showing exactly where things stand.' },
  ];

  return (
    <div>
      <section className="services-hero">
        <div className="container" style={{ textAlign: 'center' }}>
          <p className="badge">What I Offer</p>
          <h1 className="services-hero-title">Complete Digital Growth Services</h1>
          <p className="services-hero-subtitle">
            From getting found online to converting that traffic into customers —
            every service works together toward one goal: your business growing.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: '0', paddingBottom: '40px' }}>
        <div className="container">
          <LogoMarquee items={trustBadges} />
        </div>
      </section>

      <section className="section" style={{ paddingTop: '0' }}>
        <div className="container">
          <div className="services-detail-grid">
            {servicesData.map((s, i) => (
              <Reveal key={s.slug} delay={i * 0.08}>
                <Link to={`/services/${s.slug}`} className="service-detail-card">
                  <div className="service-detail-icon">{s.icon}</div>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '2px' }}>{s.title}</h3>
                  <p style={{ color: '#8b5cf6', fontSize: '0.8rem', marginBottom: '12px' }}>{s.full}</p>
                  <p style={{ color: '#a1a1aa', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '16px' }}>{s.tagline}</p>
                  <span className="learn-more">Learn More →</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'rgba(255,255,255,0.02)' }}>
        <div className="container">
          <p className="eyebrow" style={{ textAlign: 'center' }}>How It Works</p>
          <h2 className="section-title">A Simple, Transparent Process</h2>
          <p className="section-subtitle">No confusion, no surprises — just clear steps from start to results</p>
          <div className="process-grid">
            {process.map((p, i) => (
              <Reveal key={p.step} delay={i * 0.1}>
                <div className="process-card">
                  <span className="process-num">{p.step}</span>
                  <h3 style={{ margin: '12px 0 8px', fontSize: '1.05rem' }}>{p.title}</h3>
                  <p style={{ color: '#a1a1aa', fontSize: '0.88rem', lineHeight: 1.6 }}>{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="eyebrow" style={{ textAlign: 'center' }}>FAQs</p>
          <h2 className="section-title">Common Questions</h2>
          <p className="section-subtitle">Quick answers about how these services work</p>
          <FAQAccordion items={faqs} />
        </div>
      </section>

      <section className="services-cta">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '12px' }}>Not Sure Which Service You Need?</h2>
          <p style={{ color: '#d4c9f9', marginBottom: '28px' }}>
            Let's talk about your business and figure out the right combination together — no pressure, no obligation.
          </p>
          <Link to="/contact" className="btn-white">Book a Free Consultation</Link>
        </div>
      </section>
    </div>
  );
}

export default Services;