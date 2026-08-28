import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Admin.css';

const BASE_URL = 'https://my-app-backend-bh6j.onrender.com';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [password, setPassword] = useState('');
  const [formData, setFormData] = useState({
    hero: { badge: '', title: '', subtitle: '' },
    stats: [],
    services: [],
    whyChoose: [],
    testimonials: [],
    about: { heading: '', paragraph1: '', paragraph2: '', skills: [] },
    contact: { email: '', phone: '' },
  });
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const contentRes = await axios.get(`${BASE_URL}/api/content`);
        const parsedData = contentRes.data;
        setFormData({
          hero: parsedData?.hero || { badge: '', title: '', subtitle: '' },
          stats: parsedData?.stats || [],
          services: parsedData?.services || [],
          whyChoose: parsedData?.whyChoose || [],
          testimonials: parsedData?.testimonials || [],
          about: parsedData?.about || { heading: '', paragraph1: '', paragraph2: '', skills: [] },
          contact: parsedData?.contact || { email: '', phone: '' },
        });

        const postsRes = await axios.get(`${BASE_URL}/api/posts`);
        setPosts(Array.isArray(postsRes.data) ? postsRes.data : []);

        setLoading(false);
      } catch (err) {
        console.error('Error fetching admin data:', err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleHeroChange = (field, value) => {
    setFormData((prev) => ({ ...prev, hero: { ...(prev?.hero || {}), [field]: value } }));
  };

  const handleAboutChange = (field, value) => {
    setFormData((prev) => ({ ...prev, about: { ...(prev?.about || {}), [field]: value } }));
  };

  const handleContactChange = (field, value) => {
    setFormData((prev) => ({ ...prev, contact: { ...(prev?.contact || {}), [field]: value } }));
  };

  const handleArrayChange = (arrayName, index, field, value) => {
    const updatedArray = [...(formData[arrayName] || [])];
    updatedArray[index] = { ...updatedArray[index], [field]: value };
    setFormData((prev) => ({ ...prev, [arrayName]: updatedArray }));
  };

  const handleAddItem = (arrayName, newItemTemplate) => {
    setFormData((prev) => ({ ...prev, [arrayName]: [...(prev[arrayName] || []), newItemTemplate] }));
  };

  const handleRemoveItem = (arrayName, index) => {
    const updatedArray = (formData[arrayName] || []).filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, [arrayName]: updatedArray }));
  };

  const handleSkillsChange = (value) => {
    const skills = value.split(',').map((s) => s.trim()).filter(Boolean);
    handleAboutChange('skills', skills);
  };

  const handleSave = async () => {
    if (!password) {
      alert('Enter admin password first');
      return;
    }
    try {
      await axios.put(`${BASE_URL}/api/content`, formData, {
        headers: { 'x-admin-password': password },
      });
      alert('Content saved successfully!');
    } catch (err) {
      console.error('Save failed:', err);
      alert('Failed to save. Check password or backend console.');
    }
  };

  if (loading) {
    return (
      <div className="admin-layout">
        <p style={{ padding: 40, color: '#94a3b8' }}>Loading site data...</p>
      </div>
    );
  }

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <h3>Admin Dashboard</h3>
        </div>

        <div className="form-group" style={{ padding: '0 12px', marginBottom: 20 }}>
          <label>Admin Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Required to save"
          />
        </div>

        <nav className="sidebar-nav">
          <button className={`nav-item ${activeTab === 'home' ? 'active' : ''}`} onClick={() => setActiveTab('home')}>
            <span>🏠</span> Home Page
          </button>
          <button className={`nav-item ${activeTab === 'services' ? 'active' : ''}`} onClick={() => setActiveTab('services')}>
            <span>🛠️</span> Services
          </button>
          <button className={`nav-item ${activeTab === 'about' ? 'active' : ''}`} onClick={() => setActiveTab('about')}>
            <span>👤</span> About Us
          </button>
          <button className={`nav-item ${activeTab === 'blogs' ? 'active' : ''}`} onClick={() => setActiveTab('blogs')}>
            <span>✍️</span> Blogs
          </button>
          <button className={`nav-item ${activeTab === 'contact' ? 'active' : ''}`} onClick={() => setActiveTab('contact')}>
            <span>📞</span> Contact
          </button>
        </nav>
      </aside>

      <main className="admin-main">
        {activeTab === 'home' && (
          <section className="tab-section">
            <h2 className="page-title">Home Page Management</h2>

            <div className="card-box">
              <h3 className="card-title">Hero Section</h3>
              <div className="form-group">
                <label>Badge</label>
                <input type="text" value={formData?.hero?.badge || ''} onChange={(e) => handleHeroChange('badge', e.target.value)} />
              </div>
              <div className="form-group">
                <label>Title</label>
                <input type="text" value={formData?.hero?.title || ''} onChange={(e) => handleHeroChange('title', e.target.value)} />
              </div>
              <div className="form-group">
                <label>Subtitle</label>
                <textarea rows="3" value={formData?.hero?.subtitle || ''} onChange={(e) => handleHeroChange('subtitle', e.target.value)} />
              </div>
            </div>

            <div className="card-box">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h3 className="card-title" style={{ margin: 0 }}>Stats</h3>
                <button type="button" onClick={() => handleAddItem('stats', { number: '', label: '' })} className="add-btn">+ Add Stat</button>
              </div>
              {formData?.stats?.map((stat, idx) => (
                <div key={idx} className="stats-row" style={{ marginBottom: 12 }}>
                  <div className="form-group" style={{ flex: 1 }}>
                    <label>Number</label>
                    <input type="text" value={stat.number || ''} onChange={(e) => handleArrayChange('stats', idx, 'number', e.target.value)} />
                  </div>
                  <div className="form-group" style={{ flex: 2 }}>
                    <label>Label</label>
                    <input type="text" value={stat.label || ''} onChange={(e) => handleArrayChange('stats', idx, 'label', e.target.value)} />
                  </div>
                  <button type="button" className="delete-btn" onClick={() => handleRemoveItem('stats', idx)}>✕</button>
                </div>
              ))}
            </div>

            <div className="card-box">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h3 className="card-title" style={{ margin: 0 }}>Why Choose Me</h3>
                <button type="button" onClick={() => handleAddItem('whyChoose', { icon: '', title: '', desc: '' })} className="add-btn">+ Add Item</button>
              </div>
              {formData?.whyChoose?.map((item, idx) => (
                <div key={idx} style={{ borderBottom: '1px solid #1e293b', paddingBottom: 16, marginBottom: 16 }}>
                  <div style={{ display: 'flex', gap: 12 }}>
                    <div className="form-group" style={{ width: 80 }}>
                      <label>Icon</label>
                      <input type="text" value={item.icon || ''} onChange={(e) => handleArrayChange('whyChoose', idx, 'icon', e.target.value)} />
                    </div>
                    <div className="form-group" style={{ flex: 1 }}>
                      <label>Title</label>
                      <input type="text" value={item.title || ''} onChange={(e) => handleArrayChange('whyChoose', idx, 'title', e.target.value)} />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea rows="2" value={item.desc || ''} onChange={(e) => handleArrayChange('whyChoose', idx, 'desc', e.target.value)} />
                  </div>
                  <button type="button" className="delete-btn-text" onClick={() => handleRemoveItem('whyChoose', idx)}>Remove</button>
                </div>
              ))}
            </div>

            <div className="card-box">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h3 className="card-title" style={{ margin: 0 }}>Testimonials</h3>
                <button type="button" onClick={() => handleAddItem('testimonials', { text: '', name: '', role: '' })} className="add-btn">+ Add Testimonial</button>
              </div>
              {formData?.testimonials?.map((item, idx) => (
                <div key={idx} style={{ borderBottom: '1px solid #1e293b', paddingBottom: 16, marginBottom: 16 }}>
                  <div className="form-group">
                    <label>Text</label>
                    <textarea rows="2" value={item.text || ''} onChange={(e) => handleArrayChange('testimonials', idx, 'text', e.target.value)} />
                  </div>
                  <div style={{ display: 'flex', gap: 12 }}>
                    <div className="form-group" style={{ flex: 1 }}>
                      <label>Name</label>
                      <input type="text" value={item.name || ''} onChange={(e) => handleArrayChange('testimonials', idx, 'name', e.target.value)} />
                    </div>
                    <div className="form-group" style={{ flex: 1 }}>
                      <label>Role</label>
                      <input type="text" value={item.role || ''} onChange={(e) => handleArrayChange('testimonials', idx, 'role', e.target.value)} />
                    </div>
                  </div>
                  <button type="button" className="delete-btn-text" onClick={() => handleRemoveItem('testimonials', idx)}>Remove</button>
                </div>
              ))}
            </div>

            <button className="save-btn" onClick={handleSave}>Save Home Page</button>
          </section>
        )}

        {activeTab === 'services' && (
          <section className="tab-section">
            <h2 className="page-title">Services Management</h2>
            <div className="card-box">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h3 className="card-title" style={{ margin: 0 }}>Services List</h3>
                <button type="button" onClick={() => handleAddItem('services', { icon: '', title: '', desc: '' })} className="add-btn">+ Add Service</button>
              </div>

              {formData?.services?.map((service, idx) => (
                <div key={idx} style={{ borderBottom: '1px solid #1e293b', paddingBottom: 16, marginBottom: 16 }}>
                  <div style={{ display: 'flex', gap: 12 }}>
                    <div className="form-group" style={{ width: 80 }}>
                      <label>Icon</label>
                      <input type="text" value={service.icon || ''} onChange={(e) => handleArrayChange('services', idx, 'icon', e.target.value)} />
                    </div>
                    <div className="form-group" style={{ flex: 1 }}>
                      <label>Title</label>
                      <input type="text" value={service.title || ''} onChange={(e) => handleArrayChange('services', idx, 'title', e.target.value)} />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea rows="2" value={service.desc || ''} onChange={(e) => handleArrayChange('services', idx, 'desc', e.target.value)} />
                  </div>
                  <button type="button" className="delete-btn-text" onClick={() => handleRemoveItem('services', idx)}>Remove Service</button>
                </div>
              ))}
            </div>
            <button className="save-btn" onClick={handleSave}>Save Services</button>
          </section>
        )}

        {activeTab === 'about' && (
          <section className="tab-section">
            <h2 className="page-title">About Us Management</h2>
            <div className="card-box">
              <h3 className="card-title">About Content</h3>
              <div className="form-group">
                <label>Heading</label>
                <input type="text" value={formData?.about?.heading || ''} onChange={(e) => handleAboutChange('heading', e.target.value)} />
              </div>
              <div className="form-group">
                <label>Paragraph 1</label>
                <textarea rows="3" value={formData?.about?.paragraph1 || ''} onChange={(e) => handleAboutChange('paragraph1', e.target.value)} />
              </div>
              <div className="form-group">
                <label>Paragraph 2</label>
                <textarea rows="3" value={formData?.about?.paragraph2 || ''} onChange={(e) => handleAboutChange('paragraph2', e.target.value)} />
              </div>
              <div className="form-group">
                <label>Skills (comma separated)</label>
                <input type="text" value={(formData?.about?.skills || []).join(', ')} onChange={(e) => handleSkillsChange(e.target.value)} />
              </div>
            </div>
            <button className="save-btn" onClick={handleSave}>Save About</button>
          </section>
        )}

        {activeTab === 'blogs' && (
          <section className="tab-section">
            <h2 className="page-title">Blog Posts Management</h2>
            <div className="card-box">
              <h3 className="card-title">Existing Posts ({posts.length})</h3>
              {posts.map((post) => (
                <div key={post._id} style={{ padding: '10px 0', borderBottom: '1px solid #1e293b' }}>
                  <p style={{ fontWeight: 600, margin: 0 }}>{post.title}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'contact' && (
          <section className="tab-section">
            <h2 className="page-title">Contact Settings</h2>
            <div className="card-box">
              <h3 className="card-title">Contact Information</h3>
              <div className="form-group">
                <label>Email</label>
                <input type="text" value={formData?.contact?.email || ''} onChange={(e) => handleContactChange('email', e.target.value)} />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input type="text" value={formData?.contact?.phone || ''} onChange={(e) => handleContactChange('phone', e.target.value)} />
              </div>
            </div>
            <button className="save-btn" onClick={handleSave}>Save Contact</button>
          </section>
        )}
      </main>
    </div>
  );
};

export default Admin;