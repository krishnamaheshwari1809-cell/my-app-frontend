import { Link } from 'react-router-dom';

function Services() {
  const services = [
    {
      icon: '🔍',
      title: 'SEO (Search Engine Optimization)',
      desc: 'I implement on-page, off-page, and technical SEO strategies to help your website rank higher on Google, driving organic traffic and visibility.',
    },
    {
      icon: '📱',
      title: 'SMM (Social Media Marketing)',
      desc: "I build your brand's presence on Instagram, Facebook, and LinkedIn — creating content strategy, posting, and engagement to connect with your audience.",
    },
    {
      icon: '🎯',
      title: 'SEM (Search Engine Marketing)',
      desc: 'I manage Google Ads and paid search campaigns to bring targeted, high-intent traffic to your website and increase conversions.',
    },
    {
      icon: '📢',
      title: 'Meta Ads',
      desc: 'I run precisely targeted campaigns on Facebook and Instagram Ads — reaching the right audience to generate leads and drive sales.',
    },
    {
      icon: '💻',
      title: 'Web Development',
      desc: 'I build modern, fast, and mobile-friendly websites (using latest technologies like React and Node.js) designed around your business goals.',
    },
  ];

  return (
    <div className="section">
      <div className="container">
        <h2 className="section-title">My Services</h2>
        <p className="section-subtitle">Complete digital solutions to grow your business online</p>

        <div style={styles.list}>
          {services.map((s) => (
            <div key={s.title} style={styles.row}>
              <div style={styles.iconBox}>{s.icon}</div>
              <div>
                <h3 style={{ marginBottom: '8px' }}>{s.title}</h3>
                <p style={{ color: '#a1a1aa', lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <Link to="/contact" className="btn">Let's Work Together</Link>
        </div>
      </div>
    </div>
  );
}

const styles = {
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  row: {
    display: 'flex',
    gap: '24px',
    alignItems: 'flex-start',
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '16px',
    padding: '28px',
  },
  iconBox: {
    fontSize: '2rem',
    background: 'rgba(139,92,246,0.15)',
    minWidth: '64px',
    height: '64px',
    borderRadius: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default Services;