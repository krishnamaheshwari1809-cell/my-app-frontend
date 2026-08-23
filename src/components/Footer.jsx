function Footer() {
  return (
    <footer style={styles.footer}>
      <div className="container" style={styles.wrap}>
        <div>
          <h3 style={{ marginBottom: '8px' }}>Krishna<span style={{ color: '#8b5cf6' }}>.</span></h3>
          <p style={{ color: '#a1a1aa', fontSize: '0.9rem' }}>
            Web Development, SEO & Digital Marketing Specialist
          </p>
        </div>

        <div style={styles.contactBlock}>
          <a href="mailto:krishnamaheshwari597@gmail.com" style={styles.contactLink}>
            📧 krishnamaheshwari597@gmail.com
          </a>
          <a href="tel:+919953792977" style={styles.contactLink}>
            📞 +91 9953792977
          </a>
        </div>
      </div>
      <p style={styles.copyright}>© {new Date().getFullYear()} Krishna Maheshwari. All rights reserved.</p>
    </footer>
  );
}

const styles = {
  footer: {
    borderTop: '1px solid rgba(255,255,255,0.08)',
    padding: '40px 0 20px',
    marginTop: '60px',
  },
  wrap: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '20px',
  },
  contactBlock: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '8px',
  },
  contactLink: {
    color: '#a1a1aa',
    fontSize: '0.9rem',
    transition: 'color 0.2s',
  },
  copyright: {
    textAlign: 'center',
    color: '#71717a',
    fontSize: '0.85rem',
    marginTop: '30px',
  },
};

export default Footer;