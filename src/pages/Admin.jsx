import { useState, useEffect } from 'react';
import axios from 'axios';

const API = 'https://my-app-backend-bh6j.onrender.com/api';

const inputStyle = {
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.12)',
  borderRadius: '10px',
  padding: '12px 14px',
  color: '#f1f1f5',
  fontSize: '0.9rem',
  fontFamily: 'inherit',
  outline: 'none',
  width: '100%',
};

const labelStyle = { fontSize: '0.8rem', color: '#a1a1aa', marginBottom: '4px', display: 'block' };
const cardStyle = { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '20px', marginBottom: '16px' };
const smallBtn = { padding: '8px 14px', fontSize: '0.85rem' };

function Field({ label, value, onChange, textarea }) {
  return (
    <div style={{ marginBottom: '14px' }}>
      <label style={labelStyle}>{label}</label>
      {textarea ? (
        <textarea rows={3} value={value || ''} onChange={(e) => onChange(e.target.value)} style={{ ...inputStyle, resize: 'vertical' }} />
      ) : (
        <input type="text" value={value || ''} onChange={(e) => onChange(e.target.value)} style={inputStyle} />
      )}
    </div>
  );
}

function Admin() {
  const [password, setPassword] = useState(sessionStorage.getItem('admin_pw') || '');
  const [authed, setAuthed] = useState(!!sessionStorage.getItem('admin_pw'));
  const [loginInput, setLoginInput] = useState('');
  const [loginError, setLoginError] = useState('');

  const [tab, setTab] = useState('content');
  const [content, setContent] = useState(null);
  const [posts, setPosts] = useState([]);
  const [saveStatus, setSaveStatus] = useState('');

  const headers = { 'x-admin-password': password };

  useEffect(() => {
    if (authed) {
      loadContent();
      loadPosts();
    }
  }, [authed]);

  const loadContent = async () => {
    const res = await axios.get(`${API}/content`);
    setContent(res.data);
  };

  const loadPosts = async () => {
    const res = await axios.get(`${API}/posts`);
    setPosts(res.data);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // quick verify by attempting a harmless authed call
      await axios.put(`${API}/content`, {}, { headers: { 'x-admin-password': loginInput } });
      sessionStorage.setItem('admin_pw', loginInput);
      setPassword(loginInput);
      setAuthed(true);
      setLoginError('');
    } catch (err) {
      setLoginError('Galat password');
    }
  };

  const saveContent = async () => {
    setSaveStatus('saving');
    try {
      await axios.put(`${API}/content`, content, { headers });
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus(''), 2000);
    } catch (err) {
      setSaveStatus('error');
    }
  };

  const updateField = (path, value) => {
    setContent((prev) => {
      const copy = JSON.parse(JSON.stringify(prev));
      let obj = copy;
      for (let i = 0; i < path.length - 1; i++) obj = obj[path[i]];
      obj[path[path.length - 1]] = value;
      return copy;
    });
  };

  const addArrayItem = (key, emptyItem) => {
    setContent((prev) => ({ ...prev, [key]: [...(prev[key] || []), emptyItem] }));
  };

  const removeArrayItem = (key, index) => {
    setContent((prev) => ({ ...prev, [key]: prev[key].filter((_, i) => i !== index) }));
  };

  const updateArrayItem = (key, index, field, value) => {
    setContent((prev) => {
      const arr = [...prev[key]];
      arr[index] = { ...arr[index], [field]: value };
      return { ...prev, [key]: arr };
    });
  };

  const updateSkill = (index, value) => {
    setContent((prev) => {
      const skills = [...(prev.about?.skills || [])];
      skills[index] = value;
      return { ...prev, about: { ...prev.about, skills } };
    });
  };

  const addSkill = () => {
    setContent((prev) => ({ ...prev, about: { ...prev.about, skills: [...(prev.about?.skills || []), ''] } }));
  };

  const removeSkill = (index) => {
    setContent((prev) => ({ ...prev, about: { ...prev.about, skills: prev.about.skills.filter((_, i) => i !== index) } }));
  };

  // ---------- LOGIN SCREEN ----------
  if (!authed) {
    return (
      <div className="section">
        <div className="container" style={{ maxWidth: '400px' }}>
          <h2 className="section-title">Admin Login</h2>
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '20px' }}>
            <input
              type="password"
              placeholder="Admin Password"
              value={loginInput}
              onChange={(e) => setLoginInput(e.target.value)}
              style={inputStyle}
              required
            />
            <button type="submit" className="btn">Login</button>
            {loginError && <p style={{ color: '#f87171' }}>{loginError}</p>}
          </form>
        </div>
      </div>
    );
  }

  if (!content) {
    return <div className="section"><div className="container">Loading...</div></div>;
  }

  return (
    <div className="section">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
          <h2 className="section-title" style={{ margin: 0 }}>Admin Panel</h2>
          <button
            className="btn"
            style={smallBtn}
            onClick={() => { sessionStorage.removeItem('admin_pw'); setAuthed(false); }}
          >
            Logout
          </button>
        </div>

        {/* TABS */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', flexWrap: 'wrap' }}>
          {['content', 'blog', 'upload'].map((t) => (
            <button
              key={t}
              className="btn"
              style={{ ...smallBtn, opacity: tab === t ? 1 : 0.5 }}
              onClick={() => setTab(t)}
            >
              {t === 'content' ? 'Site Content' : t === 'blog' ? 'Blog Posts' : 'Image Upload'}
            </button>
          ))}
        </div>

        {tab === 'content' && (
          <>
            <div style={cardStyle}>
              <h3>Hero Section</h3>
              <Field label="Badge" value={content.hero?.badge} onChange={(v) => updateField(['hero', 'badge'], v)} />
              <Field label="Title" value={content.hero?.title} onChange={(v) => updateField(['hero', 'title'], v)} />
              <Field label="Subtitle" value={content.hero?.subtitle} onChange={(v) => updateField(['hero', 'subtitle'], v)} textarea />
            </div>

            <div style={cardStyle}>
              <h3>Stats</h3>
              {(content.stats || []).map((s, i) => (
                <div key={i} style={{ display: 'flex', gap: '10px', marginBottom: '10px', alignItems: 'flex-end' }}>
                  <div style={{ flex: 1 }}>
                    <label style={labelStyle}>Number</label>
                    <input style={inputStyle} value={s.number || ''} onChange={(e) => updateArrayItem('stats', i, 'number', e.target.value)} />
                  </div>
                  <div style={{ flex: 2 }}>
                    <label style={labelStyle}>Label</label>
                    <input style={inputStyle} value={s.label || ''} onChange={(e) => updateArrayItem('stats', i, 'label', e.target.value)} />
                  </div>
                  <button className="btn" style={smallBtn} onClick={() => removeArrayItem('stats', i)}>✕</button>
                </div>
              ))}
              <button className="btn" style={smallBtn} onClick={() => addArrayItem('stats', { number: '', label: '' })}>+ Add Stat</button>
            </div>

            <div style={cardStyle}>
              <h3>Services</h3>
              {(content.services || []).map((s, i) => (
                <div key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '14px', marginBottom: '14px' }}>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <div style={{ flex: 1 }}>
                      <label style={labelStyle}>Icon</label>
                      <input style={inputStyle} value={s.icon || ''} onChange={(e) => updateArrayItem('services', i, 'icon', e.target.value)} />
                    </div>
                    <div style={{ flex: 2 }}>
                      <label style={labelStyle}>Title</label>
                      <input style={inputStyle} value={s.title || ''} onChange={(e) => updateArrayItem('services', i, 'title', e.target.value)} />
                    </div>
                  </div>
                  <label style={labelStyle}>Description</label>
                  <textarea rows={2} style={{ ...inputStyle, resize: 'vertical' }} value={s.desc || ''} onChange={(e) => updateArrayItem('services', i, 'desc', e.target.value)} />
                  <button className="btn" style={{ ...smallBtn, marginTop: '8px' }} onClick={() => removeArrayItem('services', i)}>Remove Service</button>
                </div>
              ))}
              <button className="btn" style={smallBtn} onClick={() => addArrayItem('services', { icon: '', title: '', desc: '' })}>+ Add Service</button>
            </div>

            <div style={cardStyle}>
              <h3>Why Choose Us</h3>
              {(content.whyChoose || []).map((s, i) => (
                <div key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '14px', marginBottom: '14px' }}>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <div style={{ flex: 1 }}>
                      <label style={labelStyle}>Icon</label>
                      <input style={inputStyle} value={s.icon || ''} onChange={(e) => updateArrayItem('whyChoose', i, 'icon', e.target.value)} />
                    </div>
                    <div style={{ flex: 2 }}>
                      <label style={labelStyle}>Title</label>
                      <input style={inputStyle} value={s.title || ''} onChange={(e) => updateArrayItem('whyChoose', i, 'title', e.target.value)} />
                    </div>
                  </div>
                  <label style={labelStyle}>Description</label>
                  <textarea rows={2} style={{ ...inputStyle, resize: 'vertical' }} value={s.desc || ''} onChange={(e) => updateArrayItem('whyChoose', i, 'desc', e.target.value)} />
                  <button className="btn" style={{ ...smallBtn, marginTop: '8px' }} onClick={() => removeArrayItem('whyChoose', i)}>Remove Item</button>
                </div>
              ))}
              <button className="btn" style={smallBtn} onClick={() => addArrayItem('whyChoose', { icon: '', title: '', desc: '' })}>+ Add Item</button>
            </div>

            <div style={cardStyle}>
              <h3>Testimonials</h3>
              {(content.testimonials || []).map((s, i) => (
                <div key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '14px', marginBottom: '14px' }}>
                  <label style={labelStyle}>Text</label>
                  <textarea rows={2} style={{ ...inputStyle, resize: 'vertical' }} value={s.text || ''} onChange={(e) => updateArrayItem('testimonials', i, 'text', e.target.value)} />
                  <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                    <div style={{ flex: 1 }}>
                      <label style={labelStyle}>Name</label>
                      <input style={inputStyle} value={s.name || ''} onChange={(e) => updateArrayItem('testimonials', i, 'name', e.target.value)} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label style={labelStyle}>Role</label>
                      <input style={inputStyle} value={s.role || ''} onChange={(e) => updateArrayItem('testimonials', i, 'role', e.target.value)} />
                    </div>
                  </div>
                  <button className="btn" style={{ ...smallBtn, marginTop: '8px' }} onClick={() => removeArrayItem('testimonials', i)}>Remove Testimonial</button>
                </div>
              ))}
              <button className="btn" style={smallBtn} onClick={() => addArrayItem('testimonials', { text: '', name: '', role: '' })}>+ Add Testimonial</button>
            </div>

            <div style={cardStyle}>
              <h3>About</h3>
              <Field label="Heading" value={content.about?.heading} onChange={(v) => updateField(['about', 'heading'], v)} />
              <Field label="Paragraph 1" value={content.about?.paragraph1} onChange={(v) => updateField(['about', 'paragraph1'], v)} textarea />
              <Field label="Paragraph 2" value={content.about?.paragraph2} onChange={(v) => updateField(['about', 'paragraph2'], v)} textarea />
              <label style={labelStyle}>Skills</label>
              {(content.about?.skills || []).map((s, i) => (
                <div key={i} style={{ display: 'flex', gap: '10px', marginBottom: '8px' }}>
                  <input style={inputStyle} value={s} onChange={(e) => updateSkill(i, e.target.value)} />
                  <button className="btn" style={smallBtn} onClick={() => removeSkill(i)}>✕</button>
                </div>
              ))}
              <button className="btn" style={smallBtn} onClick={addSkill}>+ Add Skill</button>
            </div>

            <div style={cardStyle}>
              <h3>Contact</h3>
              <Field label="Email" value={content.contact?.email} onChange={(v) => updateField(['contact', 'email'], v)} />
              <Field label="Phone" value={content.contact?.phone} onChange={(v) => updateField(['contact', 'phone'], v)} />
            </div>

            <button className="btn" onClick={saveContent} disabled={saveStatus === 'saving'}>
              {saveStatus === 'saving' ? 'Saving...' : 'Save All Content'}
            </button>
            {saveStatus === 'saved' && <p style={{ color: '#4ade80', marginTop: '10px' }}>✅ Saved!</p>}
            {saveStatus === 'error' && <p style={{ color: '#f87171', marginTop: '10px' }}>❌ Save failed</p>}
          </>
        )}

        {tab === 'blog' && <BlogManager posts={posts} headers={headers} reload={loadPosts} />}
        {tab === 'upload' && <ImageUpload headers={headers} />}
      </div>
    </div>
  );
}

function BlogManager({ posts, headers, reload }) {
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ title: '', excerpt: '', content: '', image: '' });
  const [status, setStatus] = useState('');

  const startNew = () => {
    setEditingId('new');
    setForm({ title: '', excerpt: '', content: '', image: '' });
  };

  const startEdit = (post) => {
    setEditingId(post._id);
    setForm({ title: post.title, excerpt: post.excerpt, content: post.content, image: post.image });
  };

  const save = async () => {
    setStatus('saving');
    try {
      if (editingId === 'new') {
        await axios.post(`${API}/posts`, form, { headers });
      } else {
        await axios.put(`${API}/posts/${editingId}`, form, { headers });
      }
      setEditingId(null);
      setStatus('');
      reload();
    } catch (err) {
      setStatus('error');
    }
  };

  const remove = async (id) => {
    if (!window.confirm('Delete this post?')) return;
    await axios.delete(`${API}/posts/${id}`, { headers });
    reload();
  };

  if (editingId) {
    return (
      <div style={cardStyle}>
        <h3>{editingId === 'new' ? 'New Post' : 'Edit Post'}</h3>
        <Field label="Title" value={form.title} onChange={(v) => setForm({ ...form, title: v })} />
        <Field label="Excerpt" value={form.excerpt} onChange={(v) => setForm({ ...form, excerpt: v })} textarea />
        <Field label="Content" value={form.content} onChange={(v) => setForm({ ...form, content: v })} textarea />
        <Field label="Image URL" value={form.image} onChange={(v) => setForm({ ...form, image: v })} />
        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          <button className="btn" onClick={save} disabled={status === 'saving'}>
            {status === 'saving' ? 'Saving...' : 'Save Post'}
          </button>
          <button className="btn" style={{ opacity: 0.6 }} onClick={() => setEditingId(null)}>Cancel</button>
        </div>
        {status === 'error' && <p style={{ color: '#f87171', marginTop: '10px' }}>❌ Save failed</p>}
      </div>
    );
  }

  return (
    <div>
      <button className="btn" style={{ marginBottom: '20px' }} onClick={startNew}>+ New Post</button>
      {posts.map((post) => (
        <div key={post._id} style={{ ...cardStyle, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <div>
            <strong>{post.title}</strong>
            <p style={{ color: '#a1a1aa', fontSize: '0.85rem', margin: '4px 0 0' }}>{post.excerpt}</p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="btn" style={smallBtn} onClick={() => startEdit(post)}>Edit</button>
            <button className="btn" style={smallBtn} onClick={() => remove(post._id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

function ImageUpload({ headers }) {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('idle');
  const [uploadedUrl, setUploadedUrl] = useState('');

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;
    setStatus('uploading');
    setUploadedUrl('');
    const formData = new FormData();
    formData.append('image', file);
    try {
      const res = await axios.post(`${API}/upload`, formData, {
        headers: { ...headers, 'Content-Type': 'multipart/form-data' },
      });
      setUploadedUrl(res.data.url);
      setStatus('done');
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div style={cardStyle}>
      <h3>Image Upload</h3>
      <p style={{ color: '#a1a1aa', fontSize: '0.85rem', marginBottom: '16px' }}>Auto converts to WebP & compresses. Copy URL and paste into content/blog fields.</p>
      <form onSubmit={handleUpload} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} style={inputStyle} required />
        <button type="submit" className="btn" disabled={status === 'uploading'}>
          {status === 'uploading' ? 'Uploading...' : 'Upload Image'}
        </button>
      </form>
      {status === 'done' && (
        <div style={{ marginTop: '20px' }}>
          <p style={{ color: '#4ade80', marginBottom: '10px' }}>✅ Uploaded successfully!</p>
          <img src={uploadedUrl} alt="uploaded" style={{ width: '100%', borderRadius: '12px', marginBottom: '10px' }} />
          <input type="text" readOnly value={uploadedUrl} style={inputStyle} onClick={(e) => e.target.select()} />
        </div>
      )}
      {status === 'error' && <p style={{ color: '#f87171', marginTop: '16px' }}>❌ Upload failed. Check password.</p>}
    </div>
  );
}

export default Admin;