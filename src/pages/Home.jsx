import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { servicesData } from '../data/servicesData';
import Reveal from '../components/Reveal';
import CountUp from '../components/CountUp';
import FAQAccordion from '../components/FAQAccordion';
import LogoMarquee from '../components/LogoMarquee';
import TestimonialSlider from '../components/TestimonialSlider';
import Loader from '../components/Loader';
import './Home.css';

const API_URL = 'https://my-app-backend-bh6j.onrender.com';

function Home() {
  const [content, setContent] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/api/content`).then((res) => setContent(res.data));
    axios.get(`${API_URL}/api/posts`).then((res) => setPosts(res.data.slice(0, 3)));
  }, []);

  const process = [
    { step: '01', title: 'Discovery Call', desc: 'We discuss your business, goals, and current challenges.' },
    { step: '02', title: 'Strategy', desc: 'A custom plan is built around your specific needs and budget.' },
    { step: '03', title: 'Execution', desc: "Work begins with regular updates on progress." },
    { step: '04', title: 'Results', desc: 'Clear reports show what\'s working and what\'s next.' },
  ];

  const faqs = [
    { q: 'What services do you offer?', a: 'I offer SEO, social media marketing, paid ads (Google & Meta), and complete web development — as a single point of contact for your digital growth.' },
    { q: 'How long before I see results?', a: 'Paid ads can bring traffic within days. SEO and content typically show meaningful results in 3-6 months, depending on competition and starting point.' },
    { q: 'Do you work with small businesses?', a: 'Yes — I work with startups, small businesses, and growing companies, tailoring the strategy and budget to what makes sense for your size.' },
    { q: 'Will I get regular updates and reports?', a: 'Absolutely. You will get clear, regular reports on what has been done, what is working, and what the next steps are — no guessing games.' },
    { q: 'Do you also build websites, or just marketing?', a: 'Both. I handle SEO/marketing and web development together, so the traffic I bring in lands on a site actually built to convert it.' },
  ];

  const trustBadges = [
    'SEO Optimized', '7+ Years Experience', 'Google Ads Certified', 'Meta Ads Expert',
    'Web Development', 'Content Marketing', '100+ Projects Delivered', 'Data-Driven Strategy',
  ];

  if (!content) {
    return <Loader />;
  }

  return (
    <div>
      <section className="hero">
        <div className="hero-blob blob-1"></div>
        <div className="hero-blob blob-2"></div>
        <div className="container hero-content">
          <p className="badge">{content.hero?.badge}</p>
          <h1 className="hero-title">{content.hero?.title}</h1>
          <p className="hero-subtitle">{content.hero?.subtitle}</p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn">Book a Free Consultation</Link>
            <Link to="/services" className="btn-outline">Explore Services</Link>
          </div>
        </div>
      </section>

      <section className="stats-section">
        <div className="container stats-grid">
          {content.stats?.map((s, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="stat-card">
                <h3 className="stat-number"><CountUp value={s.number} /></h3>
                <p className="stat-label">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section" style={{ paddingTop: '30px', paddingBottom: '30px' }}>
        <div className="container">
          <LogoMarquee items={trustBadges} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="eyebrow" style={{ textAlign: 'center' }}>What I Offer</p>
          <h2 className="section-title">Services Built to Grow Your Business</h2>
          <p className="section-subtitle">Every service works toward one goal — measurable growth</p>
          <div className="services-grid">
            {servicesData.slice(0, 6).map((s, i) => (
              <Reveal key={s.slug} delay={i * 0.06}>
                <Link to={`/services/${s.slug}`} className="service-card">
                  <div style={{ fontSize: '2rem', marginBottom: '12px' }}>{s.icon}</div>
                  <h3 style={{ marginBottom: '8px' }}>{s.title}</h3>
                  <p style={{ color: '#a1a1aa', fontSize: '0.9rem' }}>{s.tagline}</p>
                </Link>
              </Reveal>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '36px' }}>
            <Link to="/services" className="btn-outline">View All Services</Link>
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
          <p className="eyebrow" style={{ textAlign: 'center' }}>Why Me</p>
          <h2 className="section-title">Why Choose Me</h2>
          <p className="section-subtitle">What makes working together easy</p>
          <div className="why-grid">
            {content.whyChoose?.map((w, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="why-card">
                  <div className="why-icon">{w.icon}</div>
                  <div>
                    <h3 style={{ marginBottom: '6px', fontSize: '1.05rem' }}>{w.title}</h3>
                    <p style={{ color: '#a1a1aa', fontSize: '0.88rem', lineHeight: 1.6 }}>{w.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'rgba(255,255,255,0.02)' }}>
        <div className="container">
          <p className="eyebrow" style={{ textAlign: 'center' }}>Testimonials</p>
          <h2 className="section-title">What People Say</h2>
          <p className="section-subtitle">Feedback from clients I've worked with</p>
          <TestimonialSlider testimonials={content.testimonials} />
        </div>
      </section>

      {posts.length > 0 && (
        <section className="section">
          <div className="container">
            <p className="eyebrow" style={{ textAlign: 'center' }}>From the Blog</p>
            <h2 className="section-title">Latest Insights</h2>
            <p className="section-subtitle">Fresh thinking on marketing and web development</p>
            <div className="blog-preview-grid">
              {posts.map((post, i) => (
                <Reveal key={post._id} delay={i * 0.1}>
                  <div className="blog-preview-card">
                    {post.image ? (
                      <img src={post.image} alt={post.title} className="blog-preview-img" />
                    ) : (
                      <div className="blog-preview-thumb">📝</div>
                    )}
                    <div style={{ padding: '20px' }}>
                      <h3 style={{ fontSize: '1.05rem', marginBottom: '10px' }}>{post.title}</h3>
                      <p style={{ color: '#a1a1aa', fontSize: '0.88rem', lineHeight: 1.6 }}>{post.excerpt}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: '36px' }}>
              <Link to="/blog" className="btn-outline">View All Posts</Link>
            </div>
          </div>
        </section>
      )}

      <section className="section">
        <div className="container">
          <p className="eyebrow" style={{ textAlign: 'center' }}>FAQs</p>
          <h2 className="section-title">Got Questions?</h2>
          <p className="section-subtitle">Answers to what people usually ask before we start working together</p>
          <FAQAccordion items={faqs} />
        </div>
      </section>

      <section className="cta-banner">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '12px' }}>Ready to Grow Your Business?</h2>
          <p style={{ color: '#d4c9f9', marginBottom: '28px', fontSize: '1.05rem' }}>
            Let's talk about how the right strategy and a great website can work together for you.
          </p>
          <Link to="/contact" className="btn-white">Start a Conversation</Link>
        </div>
      </section>
    </div>
  );
}

export default Home;