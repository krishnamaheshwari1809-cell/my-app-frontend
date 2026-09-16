import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/Loader';

const API_URL = 'https://my-app-backend-bh6j.onrender.com';

function BlogPost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/posts`)
      .then((res) => {
        const found = res.data.find((p) => p._id === id);
        setPost(found);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (!post) {
    return (
      <div className="section" style={{ paddingTop: '110px' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="section-title">Post Not Found</h2>
          <Link to="/blog" className="btn-outline">Back to Blog</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="section" style={{ paddingTop: '110px' }}>
      <div className="container" style={{ maxWidth: '760px' }}>
        <Link to="/blog" style={{ color: '#60a5fa', fontSize: '0.9rem', textDecoration: 'none' }}>
          ← Back to Blog
        </Link>

        <p style={{ color: '#8b5cf6', fontSize: '0.85rem', fontWeight: 600, marginTop: '20px' }}>
          {new Date(post.createdAt).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })}
        </p>

        <h1 style={{ fontSize: '2rem', margin: '10px 0 24px', color: '#f8fafc' }}>{post.title}</h1>

        {post.image && (
          <img
            src={post.image}
            alt={post.title}
            style={{ width: '100%', borderRadius: '16px', marginBottom: '28px', objectFit: 'cover' }}
          />
        )}

        <div
          style={{ color: '#cbd5e1', lineHeight: 1.8, fontSize: '1rem', whiteSpace: 'pre-wrap' }}
        >
          {post.content}
        </div>
      </div>
    </div>
  );
}

export default BlogPost;