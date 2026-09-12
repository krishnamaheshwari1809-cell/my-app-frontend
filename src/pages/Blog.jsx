import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Seo from '../components/Seo';

const API_URL = 'https://my-app-backend-bh6j.onrender.com';

function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API_URL}/api/posts`)
      .then((res) => {
        setPosts(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="section">
      <Seo page="blog" />
      <div className="container">
        <h2 className="section-title">Blog</h2>
        <p className="section-subtitle">Latest insights on digital marketing and web development</p>

        {loading ? (
          <p style={{ textAlign: 'center', color: '#94a3b8' }}>Loading posts...</p>
        ) : posts.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#94a3b8' }}>No posts yet — coming soon! ✨</p>
        ) : (
          <div style={styles.grid}>
            {posts.map((post) => (
              <Link
                key={post._id}
                to={`/blog/${post._id}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div style={styles.card}>
                  {post.image ? (
                    <img src={post.image} alt={post.title} style={styles.img} />
                  ) : (
                    <div style={styles.imgPlaceholder}>📝</div>
                  )}
                  <div style={{ padding: '20px' }}>
                    <p style={styles.date}>
                      {new Date(post.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric', month: 'long', year: 'numeric',
                      })}
                    </p>
                    <h3 style={{ margin: '8px 0 12px', fontSize: '1.1rem' }}>{post.title}</h3>
                    <p style={{ color: '#a1a1aa', fontSize: '0.9rem', lineHeight: 1.6 }}>{post.excerpt}</p>
                  </div>
                </div>
              </Link>
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
    transition: 'transform 0.25s, border-color 0.25s',
    cursor: 'pointer',
  },
  img: {
    width: '100%',
    height: '180px',
    objectFit: 'cover',
  },
  imgPlaceholder: {
    height: '160px',
    background: 'linear-gradient(135deg, rgba(59,130,246,0.25), rgba(29,78,216,0.15))',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '2.5rem',
  },
  date: {
    color: '#60a5fa',
    fontSize: '0.8rem',
    fontWeight: 600,
  },
};

export default Blog;