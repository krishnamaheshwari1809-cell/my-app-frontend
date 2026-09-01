import { Link } from 'react-router-dom';
import ValuesWheel from '../components/ValuesWheel';
import aboutBanner from '../assets/aboutbanner.png';
import './About.css';

function About() {
  const values = [
    { num: '01', color: '#2563eb', title: 'Client-First Approach', desc: 'Every strategy starts with understanding your business, not applying a template.' },
    { num: '02', color: '#0d9488', title: 'Result-Driven Work', desc: 'Success is measured in traffic, leads, and conversions — not just deliverables.' },
    { num: '03', color: '#f59e0b', title: 'Direct Communication', desc: 'You work with me directly. No account managers, no delays, no confusion.' },
    { num: '04', color: '#7c3aed', title: 'Continuous Learning', desc: 'Digital marketing and web tech move fast — I stay updated so your strategy does too.' },
    { num: '05', color: '#16a34a', title: 'Transparency', desc: "You'll always know what's being done, why, and what results to expect." },
    { num: '06', color: '#ea580c', title: 'Quality Over Quantity', desc: 'I take on projects I can genuinely deliver well, not as many as possible.' },
  ];

  return (
    <div>
      <section className="about-banner-section">
        <img src={aboutBanner} alt="About Us" className="about-banner-bg" />
        <div className="about-banner-overlay">
          <div className="container about-banner-content">
            {/* <p className="badge">About Me</p>
            <h1 className="about-hero-title">Turning Digital Strategy Into Real Business Growth</h1>
            <p className="about-hero-subtitle">
              A one-stop freelance partner for SEO, social media, paid ads, and web development —
              built around businesses that want results, not just reports.
            </p> */}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container about-story-centered">
          <div>
            <p className="eyebrow">The Approach</p>
            <h2 className="story-title">One Partner, Every Piece of Your Growth</h2>
            <p className="story-para">
              Most businesses end up juggling separate people for marketing and separate
              people for their website — and the two rarely talk to each other. The result
              is traffic that lands on a site that isn't built to convert, or a great
              website that nobody ever finds.
            </p>
            <p className="story-para">
              I work across both sides of that equation: SEO, SMM, SEM, SMO, Meta Ads, and
              Google Ads to get the right people to your business, and web development to
              make sure they stay, trust what they see, and take action once they're there.
            </p>
            <p className="story-para">
              No jargon-heavy reports, no guesswork dressed up as strategy — just a clear
              plan built around your business, and the follow-through to see it out.
            </p>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: '#0a0e17' }}>
        <div className="container">
          <ValuesWheel
            values={values}
            eyebrow="Core Values"
            title="What Drives My Work"
            subtitle="The principles behind every project I take on"
          />
        </div>
      </section>

      <section className="section">
        <div className="container mv-grid">
          <div className="mv-card">
            <p className="eyebrow">Mission</p>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '12px' }}>Practical Growth, Not Just Marketing</h3>
            <p style={{ color: '#71717a', lineHeight: 1.7 }}>
              To help businesses grow online through strategies that are practical, measurable,
              and built around their actual goals — not generic best practices.
            </p>
          </div>
          <div className="mv-card">
            <p className="eyebrow">Vision</p>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '12px' }}>A Trusted Long-Term Partner</h3>
            <p style={{ color: '#71717a', lineHeight: 1.7 }}>
              To become the go-to freelance partner businesses rely on for both their online
              visibility and the website that turns that visibility into revenue.
            </p>
          </div>
        </div>
      </section>

      <section className="about-cta">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '12px', color: '#fff' }}>Want to See Where Your Business Stands Online?</h2>
          <p style={{ color: '#d4d4d8', marginBottom: '28px' }}>
            Let's talk through your goals and figure out the right strategy together.
          </p>
          <Link to="/contact" className="btn-white">Get in Touch</Link>
        </div>
      </section>
    </div>
  );
}

export default About;