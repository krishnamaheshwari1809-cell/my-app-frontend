import { Link } from 'react-router-dom';

function Home() {
  const services = [
    { icon: '🔍', title: 'SEO', desc: 'Search Engine Optimization se apni website ko Google pe top pe layein.' },
    { icon: '📱', title: 'SMM', desc: 'Social Media Marketing se apne brand ki online presence badhayein.' },
    { icon: '🎯', title: 'SEM', desc: 'Search Engine Marketing se targeted traffic aur leads generate karein.' },
    { icon: '📢', title: 'Meta Ads', desc: 'Facebook & Instagram Ads se apna business audience tak pahunchayein.' },
    { icon: '💻', title: 'Web Development', desc: 'Modern, fast aur responsive websites banate hain business ke liye.' },
  ];

  return (
    <div>
      <section style={styles.hero}>
        <div className="container" style={{ textAlign: 'center' }}>
          <p style={styles.badge}>👋 Welcome to my portfolio</p>
          <h1 style={styles.heroTitle}>
            Hi, I'm <span style={{ color: '#8b5cf6' }}>Krishna</span>
          </h1>
          <p style={styles.heroSubtitle}>
            Digital Marketing & Web Development Specialist — helping businesses grow online through SEO, SMM, SEM, Meta Ads and modern websites.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn">Get in Touch</Link>
            <Link to="/services" style={styles.secondaryBtn}>View Services</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">What I Do</h2>
          <p className="section-subtitle">Services that help your business grow online</p>
          <div style={styles.grid}>
            {services.map((s) => (
              <div key={s.title} style={styles.card}>
                <div style={{ fontSize: '2rem', marginBottom: '12px' }}>{s.icon}</div>
                <h3 style={{ marginBottom: '8px' }}>{s.title}</h3>
                <p style={{ color: '#a1a1aa', fontSize: '0.9rem' }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

const styles = {
  hero: {
    padding: '100px 0 80px',
    background: 'radial-gradient(circle at 50% 0%, rgba(139,92,246,0.15), transparent 60%)',
  },
  badge: {
    display: 'inline-block',
    background: 'rgba(139,92,246,0.15)',
    color: '#c4b5fd',
    padding: '6px 16px',
    borderRadius: '20px',
    fontSize: '0.85rem',
    marginBottom: '24px',
  },
  heroTitle: {
    fontSize: '3.2rem',
    fontWeight: 800,
    marginBottom: '20px',
  },
  heroSubtitle: {
    fontSize: '1.1rem',
    color: '#a1a1aa',
    maxWidth: '600px',
    margin: '0 auto 36px',
    lineHeight: 1.6,
  },
  secondaryBtn: {
    padding: '12px 28px',
    borderRadius: '30px',
    border: '1px solid rgba(255,255,255,0.2)',
    fontWeight: 600,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '24px',
  },
  card: {
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '16px',
    padding: '28px',
    transition: 'transform 0.2s, border-color 0.2s',
  },
};

export default Home;