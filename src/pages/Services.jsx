import { Link } from 'react-router-dom';
import { servicesData } from '../data/servicesData';
import Reveal from '../components/Reveal';
import Seo from '../components/Seo';
import { useSeoData } from '../context/SeoContext';
import './Services.css';

function Services() {
  const { content } = useSeoData();

  const heroBadge = content?.servicesPageHero?.badge || 'What I Offer';
  const heroTitle = content?.servicesPageHero?.title || 'Complete Digital Growth Services';
  const heroSubtitle = content?.servicesPageHero?.subtitle ||
    "From getting found online to converting that traffic into customers — every service works together toward one goal: your business growing.";

  const activeServices = (content?.servicesList && content.servicesList.length > 0)
    ? content.servicesList
    : servicesData;

  const process = [
    { step: '01', title: 'Discovery Call', desc: 'We discuss your business, goals, and current challenges.' },
    { step: '02', title: 'Strategy', desc: 'A custom plan is built around your specific needs and budget.' },
    { step: '03', title: 'Execution', desc: "Work begins with regular updates so you always know what's happening." },
    { step: '04', title: 'Results & Reporting', desc: "Clear reports show what's working and where we go next." },
  ];

  return (
    <div>
      <Seo page="services" />

      <section className="services-hero">
        <div className="container" style={{ textAlign: 'center' }}>
          <p className="badge">{heroBadge}</p>
          <h1 className="services-hero-title">{heroTitle}</h1>
          <p className="services-hero-subtitle">{heroSubtitle}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="services-detail-grid">
            {activeServices.map((s, i) => (
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