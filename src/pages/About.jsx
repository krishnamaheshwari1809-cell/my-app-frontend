import { Link } from 'react-router-dom';
import './About.css';

function About() {
  const values = [
    { num: '01', title: 'Client-First Approach', desc: 'Every strategy starts with understanding your business, not applying a template.' },
    { num: '02', title: 'Result-Driven Work', desc: 'Success is measured in traffic, leads, and conversions — not just deliverables.' },
    { num: '03', title: 'Direct Communication', desc: 'You work with me directly. No account managers, no delays, no confusion.' },
    { num: '04', title: 'Continuous Learning', desc: 'Digital marketing and web tech move fast — I stay updated so your strategy does too.' },
    { num: '05', title: 'Transparency', desc: "You'll always know what's being done, why, and what results to expect." },
    { num: '06', title: 'Quality Over Quantity', desc: 'I take on projects I can genuinely deliver well, not as many as possible.' },
  ];

  return (
    <div>
      <section className="about-hero">
        <div className="container">
          <p className="badge">About Me</p>
          <h1 className="about-hero-title">Turning Digital Strategy Into Real Business Growth</h1>
          <p className="about-hero-subtitle">
            A one-stop freelance partner for SEO, social media, paid ads, and web development —
            built around businesses that want results, not just reports.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container about-story-grid">
          <div>
            <p className="eyebrow">My Journey</p>
            <h2 className="story-title">Why I Do This</h2>
            <p className="story-para">
              I started out learning digital marketing and web development separately —
              and quickly realized most businesses struggle because these two are treated
              as unrelated problems. A great website means little without traffic, and
              great traffic goes to waste on a website that doesn't convert.
            </p>
            <p className="story-para">
              That's why I work across both: SEO, SMM, SEM, SMO, Meta Ads, and Google Ads
              to bring the right people to your business, paired with modern web development
              to make sure that traffic actually turns into leads and sales.
            </p>
            <p className="story-para">
              Every project I take on is treated like my own business is on the line —
              because your growth is the only real measure of my work.
            </p>
            <div style={{ marginTop: '28px' }}>
              <Link to="/contact" className="btn">Let's Work Together</Link>
            </div>
          </div>
          <div className="about-highlight-card">
            <div className="highlight-avatar">K</div>
            <h3 style={{ marginBottom: '6px' }}>Krishna Maheshwari</h3>
            <p style={{ color: '#a1a1aa', fontSize: '0.9rem', marginBottom: '20px' }}>
              Digital Marketing & Web Development Specialist
            </p>
            <div className="highlight-tags">
              {['SEO', 'SMM', 'SEM', 'SMO', 'Meta Ads', 'Google Ads', 'Web Development'].map((s) => (
                <span key={s} className="highlight-tag">{s}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'rgba(255,255,255,0.02)' }}>
        <div className="container">
          <p className="eyebrow" style={{ textAlign: 'center' }}>Core Values</p>
          <h2 className="section-title">What Drives My Work</h2>
          <p className="section-subtitle">The principles behind every project I take on</p>
          <div className="values-grid">
            {values.map((v) => (
              <div key={v.num} className="value-card">
                <span className="value-num">{v.num}</span>
                <h3 style={{ margin: '12px 0 8px', fontSize: '1.05rem' }}>{v.title}</h3>
                <p style={{ color: '#a1a1aa', fontSize: '0.88rem', lineHeight: 1.6 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container mv-grid">
          <div className="mv-card">
            <p className="eyebrow">Mission</p>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '12px' }}>Practical Growth, Not Just Marketing</h3>
            <p style={{ color: '#a1a1aa', lineHeight: 1.7 }}>
              To help businesses grow online through strategies that are practical, measurable,
              and built around their actual goals — not generic best practices.
            </p>
          </div>
          <div className="mv-card">
            <p className="eyebrow">Vision</p>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '12px' }}>A Trusted Long-Term Partner</h3>
            <p style={{ color: '#a1a1aa', lineHeight: 1.7 }}>
              To become the go-to freelance partner businesses rely on for both their online
              visibility and the website that turns that visibility into revenue.
            </p>
          </div>
        </div>
      </section>

      <section className="about-cta">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '12px' }}>Want to See Where Your Business Stands Online?</h2>
          <p style={{ color: '#d4c9f9', marginBottom: '28px' }}>
            Let's talk through your goals and figure out the right strategy together.
          </p>
          <Link to="/contact" className="btn-white">Get in Touch</Link>
        </div>
      </section>
    </div>
  );
}

export default About;