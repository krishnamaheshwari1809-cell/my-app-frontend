import { Link } from 'react-router-dom';

function About() {
  const skills = ['SEO', 'SMM', 'SEM', 'Meta Ads', 'Web Development'];

  const stats = [
    { number: '5+', label: 'Services Offered' },
    { number: '100%', label: 'Client-Focused' },
    { number: '24/7', label: 'Support & Communication' },
  ];

  return (
    <div>
      <div className="section">
        <div className="container">
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle">Digital strategy meets clean development</p>

          <div style={styles.wrap}>
            <div style={styles.avatarBox}>
              <div style={styles.avatar}>K</div>
            </div>

            <div>
              <h3 style={{ marginBottom: '16px', fontSize: '1.4rem' }}>Krishna Maheshwari</h3>
              <p style={styles.para}>
                I help businesses grow their online presence through a combination of performance
                marketing and modern web development. Instead of treating marketing and websites as
                separate problems, I approach them together — a site that's fast and well-built
                converts the traffic that SEO, SEM, and social campaigns bring in.
              </p>
              <p style={styles.para}>
                My work spans SEO, Social Media Marketing, Search Engine Marketing, and Meta Ads —
                paired with the ability to design and build the websites those strategies point
                traffic to. The goal on every project is simple: measurable results, not just
                deliverables.
              </p>

              <h4 style={{ margin: '28px 0 16px' }}>Core Skills</h4>
              <div style={styles.skillsWrap}>
                {skills.map((skill) => (
                  <span key={skill} style={styles.skillTag}>{skill}</span>
                ))}
              </div>

              <div style={{ marginTop: '32px' }}>
                <Link to="/contact" className="btn">Let's Work Together</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={styles.statsSection}>
        <div className="container" style={styles.statsGrid}>
          {stats.map((s) => (
            <div key={s.label} style={styles.statCard}>
              <h3 style={styles.statNumber}>{s.number}</h3>
              <p style={styles.statLabel}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  wrap: {
    display: 'grid',
    gridTemplateColumns: '250px 1fr',
    gap: '48px',
    alignItems: 'start',
  },
  avatarBox: {
    display: 'flex',
    justifyContent: 'center',
  },
  avatar: {
    width: '220px',
    height: '220px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '5rem',
    fontWeight: 800,
    color: '#fff',
  },
  para: {
    color: '#c4c4cc',
    lineHeight: 1.8,
    marginBottom: '16px',
  },
  skillsWrap: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
  },
  skillTag: {
    background: 'rgba(139,92,246,0.15)',
    color: '#c4b5fd',
    padding: '8px 18px',
    borderRadius: '20px',
    fontSize: '0.9rem',
    fontWeight: 600,
  },
  statsSection: {
    borderTop: '1px solid rgba(255,255,255,0.08)',
    borderBottom: '1px solid rgba(255,255,255,0.08)',
    padding: '48px 0',
    background: 'rgba(139,92,246,0.04)',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
    gap: '24px',
    textAlign: 'center',
  },
  statCard: {
    padding: '16px',
  },
  statNumber: {
    fontSize: '2.2rem',
    fontWeight: 800,
    color: '#8b5cf6',
    marginBottom: '8px',
  },
  statLabel: {
    color: '#a1a1aa',
    fontSize: '0.9rem',
  },
};

export default About;