import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Home.css';

const API_URL = 'https://my-app-backend-bh6j.onrender.com';

function Home() {
  const [content, setContent] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/api/content`).then((res) => setContent(res.data));
    axios.get(`${API_URL}/api/posts`).then((res) => setPosts(res.data.slice(0, 3)));
  }, []);

  if (!content) {
    return <div style={{ padding: '100px', textAlign: 'center' }}>Loading...</div>;
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
            <Link to="/contact" className="btn">Get in Touch</Link>
            <Link to="/services" className="btn-outline">View Services</Link>
          </div>
        </div>
      </section>

      <section className="stats-section">
        <div className="container stats-grid">
          {content.stats?.map((s, i) => (
            <div key={i} className="stat-card">
              <h3 className="stat-number">{s.number}</h3>
              <p className="stat-label">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">What I Do</h2>
          <p className="section-subtitle">Services that help your business grow online</p>
          <div className="services-grid">
            {content.services?.map((s, i) => (
              <div key={i} className="service-card">
                <div style={{ fontSize: '2rem', marginBottom: '12px' }}>{s.icon}</div>
                <h3 style={{ marginBottom: '8px' }}>{s.title}</h3>
                <p style={{ color: '#a1a1aa', fontSize: '0.9rem' }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'rgba(255,255,255,0.02)' }}>
        <div className="container">
          <h2 className="section-title">Why Choose Me</h2>
          <p className="section-subtitle">What makes working together easy</p>
          <div className="why-grid">
            {content.whyChoose?.map((w, i) => (
              <div key={i} className="why-card">
                <div className="why-icon">{w.icon}</div>
                <div>
                  <h3 style={{ marginBottom: '6px', fontSize: '1.05rem' }}>{w.title}</h3>
                  <p style={{ color: '#a1a1aa', fontSize: '0.88rem', lineHeight: 1.6 }}>{w.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">What People Say</h2>
          <p className="section-subtitle">Feedback from clients I've worked with</p>
          <div className="testimonial-grid">
            {content.testimonials?.map((t, i) => (
              <div key={i} className="testimonial-card">
                <p style={{ fontSize: '1.5rem', color: '#8b5cf6', lineHeight: 1 }}>"</p>
                <p style={{ color: '#c4c4cc', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '20px' }}>
                  {t.text}
                </p>
                <p style={{ fontWeight: 700 }}>{t.name}</p>
                <p style={{ color: '#71717a', fontSize: '0.85rem' }}>{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {posts.length > 0 && (
        <section className="section" style={{ background: 'rgba(255,255,255,0.02)' }}>
          <div className="container">
            <h2 className="section-title">Latest from the Blog</h2>
            <p className="section-subtitle">Fresh insights on marketing and web development</p>
            <div className="blog-preview-grid">
              {posts.map((post) => (
                <div key={post._id} className="blog-preview-card">
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
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: '36px' }}>
              <Link to="/blog" className="btn-outline">View All Posts</Link>
            </div>
          </div>
        </section>
      )}

      <section className="cta-banner">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '12px' }}>Ready to Grow Your Business?</h2>
          <p style={{ color: '#d4c9f9', marginBottom: '28px', fontSize: '1.05rem' }}>
            Let's talk about how SEO, marketing, and a great website can work together for you.
          </p>
          <Link to="/contact" className="btn-white">Start a Conversation</Link>
        </div>
      </section>
    </div>
  );
}

export default Home;