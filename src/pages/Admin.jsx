import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Admin.css';

// Agar Home.jsx me koi config import thi toh wo path bhi use ho jayega
const BASE_URL = 
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_URL) ||
  'http://localhost:5000';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [formData, setFormData] = useState({
    hero: { badge: '', title: '', subtitle: '' },
    stats: [],
    services: []
  });
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Exact data fetching with array/object normalizer
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Fetch Content
        const contentRes = await axios.get(`${BASE_URL}/api/content`).catch(() => {
          // Fallback agar direct relative endpoint ho
          return axios.get('/api/content');
        });

        if (contentRes && contentRes.data) {
          const rawData = contentRes.data;
          // Agar database se array return ho raha ho
          const parsedData = Array.isArray(rawData) ? rawData[0] : rawData;
          
          setFormData({
            hero: parsedData?.hero || { badge: '', title: '', subtitle: '' },
            stats: parsedData?.stats || [],
            services: parsedData?.services || [],
            ...parsedData
          });
        }

        // 2. Fetch Posts
        const postsRes = await axios.get(`${BASE_URL}/api/posts`).catch(() => {
          return axios.get('/api/posts');
        });
        if (postsRes && postsRes.data) {
          setPosts(Array.isArray(postsRes.data) ? postsRes.data : []);
        }

        setLoading(false);
      } catch (err) {
        console.error('Error fetching admin data:', err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Hero Field Updater
  const handleHeroChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      hero: {
        ...(prev?.hero || {}),
        [field]: value
      }
    }));
  };

  // Generic Array Handler (Stats & Services)
  const handleArrayChange = (arrayName, index, field, value) => {
    const updatedArray = [...(formData[arrayName] || [])];
    updatedArray[index] = {
      ...updatedArray[index],
      [field]: value
    };
    setFormData((prev) => ({ ...prev, [arrayName]: updatedArray }));
  };

  const handleAddItem = (arrayName, newItemTemplate) => {
    setFormData((prev) => ({
      ...prev,
      [arrayName]: [...(prev[arrayName] || []), newItemTemplate]
    }));
  };

  const handleRemoveItem = (arrayName, index) => {
    const updatedArray = (formData[arrayName] || []).filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, [arrayName]: updatedArray }));
  };

  // Save to DB
  const handleSave = async () => {
    try {
      await axios.put(`${BASE_URL}/api/content`, formData).catch(() => {
        return axios.post(`${BASE_URL}/api/content`, formData);
      });
      alert('Content saved successfully!');
    } catch (err) {
      console.error('Save failed:', err);
      alert('Failed to save data. Check backend console.');
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
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <h3>Admin Dashboard</h3>
        </div>
        <nav className="sidebar-nav">
          <button 
            className={`nav-item ${activeTab === 'home' ? 'active' : ''}`}
            onClick={() => setActiveTab('home')}
          >
            <span>🏠</span> Home Page
          </button>
          
          <button 
            className={`nav-item ${activeTab === 'services' ? 'active' : ''}`}
            onClick={() => setActiveTab('services')}
          >
            <span>🛠️</span> Services
          </button>
          
          <button 
            className={`nav-item ${activeTab === 'about' ? 'active' : ''}`}
            onClick={() => setActiveTab('about')}
          >
            <span>👤</span> About Us
          </button>
          
          <button 
            className={`nav-item ${activeTab === 'blogs' ? 'active' : ''}`}
            onClick={() => setActiveTab('blogs')}
          >
            <span>✍️</span> Blogs
          </button>
          
          <button 
            className={`nav-item ${activeTab === 'contact' ? 'active' : ''}`}
            onClick={() => setActiveTab('contact')}
          >
            <span>📞</span> Contact
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        
        {/* --- HOME TAB --- */}
        {activeTab === 'home' && (
          <section className="tab-section">
            <h2 className="page-title">Home Page Management</h2>
            
            {/* Hero Section */}
            <div className="card-box">
              <h3 className="card-title">Hero Section</h3>
              <div className="form-group">
                <label>Badge</label>
                <input 
                  type="text" 
                  value={formData?.hero?.badge || ''} 
                  onChange={(e) => handleHeroChange('badge', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Title</label>
                <input 
                  type="text" 
                  value={formData?.hero?.title || ''} 
                  onChange={(e) => handleHeroChange('title', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Subtitle</label>
                <textarea 
                  rows="3" 
                  value={formData?.hero?.subtitle || ''} 
                  onChange={(e) => handleHeroChange('subtitle', e.target.value)}
                />
              </div>
            </div>

            {/* Stats Section */}
            <div className="card-box">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h3 className="card-title" style={{ margin: 0 }}>Stats</h3>
                <button 
                  type="button" 
                  onClick={() => handleAddItem('stats', { number: '', label: '' })}
                  className="add-btn"
                >
                  + Add Stat
                </button>
              </div>

              {formData?.stats?.map((stat, idx) => (
                <div key={idx} className="stats-row" style={{ marginBottom: 12 }}>
                  <div className="form-group" style={{ flex: 1 }}>
                    <label>Number</label>
                    <input 
                      type="text" 
                      value={stat.number || ''} 
                      onChange={(e) => handleArrayChange('stats', idx, 'number', e.target.value)}
                    />
                  </div>
                  <div className="form-group" style={{ flex: 2 }}>
                    <label>Label</label>
                    <input 
                      type="text" 
                      value={stat.label || ''} 
                      onChange={(e) => handleArrayChange('stats', idx, 'label', e.target.value)}
                    />
                  </div>
                  <button 
                    type="button"
                    className="delete-btn"
                    onClick={() => handleRemoveItem('stats', idx)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <button className="save-btn" onClick={handleSave}>Save Home Page</button>
          </section>
        )}

        {/* --- SERVICES TAB --- */}
        {activeTab === 'services' && (
          <section className="tab-section">
            <h2 className="page-title">Services Management</h2>
            <div className="card-box">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h3 className="card-title" style={{ margin: 0 }}>Services List</h3>
                <button 
                  type="button" 
                  onClick={() => handleAddItem('services', { icon: '', title: '', description: '' })}
                  className="add-btn"
                >
                  + Add Service
                </button>
              </div>

              {formData?.services?.map((service, idx) => (
                <div key={idx} style={{ borderBottom: '1px solid #1e293b', paddingBottom: 16, marginBottom: 16 }}>
                  <div style={{ display: 'flex', gap: 12 }}>
                    <div className="form-group" style={{ width: 80 }}>
                      <label>Icon</label>
                      <input 
                        type="text" 
                        value={service.icon || ''} 
                        onChange={(e) => handleArrayChange('services', idx, 'icon', e.target.value)}
                      />
                    </div>
                    <div className="form-group" style={{ flex: 1 }}>
                      <label>Title</label>
                      <input 
                        type="text" 
                        value={service.title || ''} 
                        onChange={(e) => handleArrayChange('services', idx, 'title', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea 
                      rows="2"
                      value={service.description || ''} 
                      onChange={(e) => handleArrayChange('services', idx, 'description', e.target.value)}
                    />
                  </div>
                  <button 
                    type="button" 
                    className="delete-btn-text" 
                    onClick={() => handleRemoveItem('services', idx)}
                  >
                    Remove Service
                  </button>
                </div>
              ))}
            </div>

            <button className="save-btn" onClick={handleSave}>Save Services</button>
          </section>
        )}

        {/* --- ABOUT TAB --- */}
        {activeTab === 'about' && (
          <section className="tab-section">
            <h2 className="page-title">About Us Management</h2>
            <div className="card-box">
              <h3 className="card-title">About Content</h3>
              <p style={{ color: '#94a3b8' }}>About page section inputs</p>
            </div>
          </section>
        )}

        {/* --- BLOGS TAB --- */}
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

        {/* --- CONTACT TAB --- */}
        {activeTab === 'contact' && (
          <section className="tab-section">
            <h2 className="page-title">Contact Settings</h2>
            <div className="card-box">
              <h3 className="card-title">Contact Information</h3>
              <p style={{ color: '#94a3b8' }}>Contact section inputs</p>
            </div>
          </section>
        )}

      </main>
    </div>
  );
};

export default Admin;