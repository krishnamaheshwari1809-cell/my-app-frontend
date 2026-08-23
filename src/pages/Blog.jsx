function Blog() {
  const posts = [
    {
      title: '5 Basic SEO Tips Every Business Should Follow',
      date: 'Coming Soon',
      excerpt: 'Simple yet effective SEO practices to improve your website ranking...',
    },
    {
      title: 'How to Grow Your Brand with Social Media Marketing',
      date: 'Coming Soon',
      excerpt: 'Proven strategies to boost organic reach on Instagram and Facebook...',
    },
    {
      title: 'Meta Ads vs Google Ads — Which is Better for Your Business?',
      date: 'Coming Soon',
      excerpt: 'The pros, cons, and when to use each platform...',
    },
  ];

  return (
    <div className="section">
      <div className="container">
        <h2 className="section-title">Blog</h2>
        <p className="section-subtitle">Latest insights on digital marketing and web development</p>

        <div style={styles.grid}>
          {posts.map((post) => (
            <div key={post.title} style={styles.card}>
              <div style={styles.imgPlaceholder}>📝</div>
              <div style={{ padding: '20px' }}>
                <p style={styles.date}>{post.date}</p>
                <h3 style={{ margin: '8px 0 12px', fontSize: '1.1rem' }}>{post.title}</h3>
                <p style={{ color: '#a1a1aa', fontSize: '0.9rem', lineHeight: 1.6 }}>{post.excerpt}</p>
              </div>
            </div>
          ))}
        </div>

        <p style={{ textAlign: 'center', color: '#71717a', marginTop: '40px' }}>
          New blog posts coming soon — stay tuned! ✨
        </p>
      </div>
    </div>
  );
}

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '28px',
  },
  card: {
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '16px',
    overflow: 'hidden',
  },
  imgPlaceholder: {
    height: '160px',
    background: 'linear-gradient(135deg, rgba(139,92,246,0.25), rgba(109,40,217,0.15))',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '2.5rem',
  },
  date: {
    color: '#8b5cf6',
    fontSize: '0.8rem',
    fontWeight: 600,
  },
};

export default Blog;