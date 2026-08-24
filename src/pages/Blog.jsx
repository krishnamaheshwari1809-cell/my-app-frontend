import { useState, useEffect } from 'react';
import axios from 'axios';
import Reveal from '../components/Reveal';
import Loader from '../components/Loader';

const API_URL = 'https://my-app-backend-bh6j.onrender.com';

function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/posts`)
      .then((res) => setPosts(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="section">
      <div className="container">
        <h2 className="section-title">Blog</h2>
        <p className="section-subtitle">Latest insights on digital marketing and web development</p>

        {posts.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#71717a', marginTop: '20px' }}>
            New blog posts coming soon — stay tuned! ✨
          </p>
        ) : (
          <div style={styles.grid}>
            {posts.map((post, i) => (
              <Reveal key={post._id} delay={i * 0.06}>
                <div style={styles.card} className="blog-card-hover">
                  {post.image ? (
                    <img src={post.image} alt={post.title} style={styles.img} />
                  ) : (
                    <div style={styles.imgPlaceholder}>📝</div>
                  )}
                  <div style={{ padding: '20px' }}>
                    <p style={styles.date}>
                      {new Date(post.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </p>
                    <h3 style={{ margin: '8px 0 12px', fontSize: '1.1rem' }}>{post.title}</h3>
                    <p style={{ color: '#a1a1aa', fontSize: '0.9rem', lineHeight: 1.6 }}>{post.excerpt}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        )}
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
  img: {
    width: '100%',
    height: '160px',
    objectFit: 'cover',
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