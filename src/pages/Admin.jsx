import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { servicesData } from '../data/servicesData';
import './Admin.css';

const BASE_URL = 'https://my-app-backend-bh6j.onrender.com';
const ADMIN_PASS = 'Krishna@123';
const authHeaders = { headers: { 'x-admin-password': ADMIN_PASS } };

const emptyPost = { title: '', excerpt: '', content: '', image: '' };
const emptySeo = {
  home: { title: '', description: '' },
  about: { title: '', description: '' },
  services: { title: '', description: '' },
  blog: { title: '', description: '' },
  contact: { title: '', description: '' },
};
const emptyServiceSeo = servicesData.map((s) => ({ slug: s.slug, title: '', description: '' }));
const emptyServiceItem = {
  slug: '', icon: '', title: '', full: '', tagline: '', overview: '',
  benefits: [], included: [], faqs: [],
};

const Admin = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [formData, setFormData] = useState({
    hero: { badge: '', title: '', subtitle: '' },
    stats: [],
    services: [],
    whyChoose: [],
    testimonials: [],
    about: { heading: '', paragraph1: '', paragraph2: '', skills: [] },
    contact: { email: '', phone: '', links: [] },
    seo: emptySeo,
    serviceSeo: emptyServiceSeo,
    servicesPageHero: { badge: '', title: '', subtitle: '' },
    servicesList: [],
  });
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [postForm, setPostForm] = useState(emptyPost);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
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
        contact: parsedData?.contact || { email: '', phone: '', links: [] },
        seo: parsedData?.seo || emptySeo,
        serviceSeo: (() => {
          const existing = parsedData?.serviceSeo || [];
          return servicesData.map((s) => {
            const found = existing.find((e) => e.slug === s.slug);
            return found || { slug: s.slug, title: '', description: '' };
          });
        })(),
        servicesPageHero: parsedData?.servicesPageHero || { badge: '', title: '', subtitle: '' },
        servicesList: (parsedData?.servicesList && parsedData.servicesList.length > 0)
          ? parsedData.servicesList
          : servicesData,
      });

      const postsRes = await axios.get(`${BASE_URL}/api/posts`);
      setPosts(Array.isArray(postsRes.data) ? postsRes.data : []);

      setLoading(false);
    } catch (err) {
      console.error('Error fetching admin data:', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
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

  const handleContactLinkChange = (index, field, value) => {
    const links = [...(formData.contact.links || [])];
    links[index] = { ...links[index], [field]: value };
    setFormData((prev) => ({ ...prev, contact: { ...prev.contact, links } }));
  };

  const addContactLink = () => {
    setFormData((prev) => ({
      ...prev,
      contact: { ...prev.contact, links: [...(prev.contact.links || []), { label: '', value: '' }] },
    }));
  };

  const removeContactLink = (index) => {
    const links = (formData.contact.links || []).filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, contact: { ...prev.contact, links } }));
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

  const handleSeoChange = (page, field, value) => {
    setFormData((prev) => ({
      ...prev,
      seo: { ...prev.seo, [page]: { ...(prev.seo?.[page] || {}), [field]: value } },
    }));
  };

  const handleServiceSeoChange = (slug, field, value) => {
    setFormData((prev) => ({
      ...prev,
      serviceSeo: prev.serviceSeo.map((s) => (s.slug === slug ? { ...s, [field]: value } : s)),
    }));
  };

  // ---------- SERVICES PAGE HANDLERS ----------
  const handleServicesPageHeroChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      servicesPageHero: { ...(prev?.servicesPageHero || {}), [field]: value },
    }));
  };

  const handleServiceListFieldChange = (idx, field, value) => {
    const updated = [...formData.servicesList];
    updated[idx] = { ...updated[idx], [field]: value };
    setFormData((prev) => ({ ...prev, servicesList: updated }));
  };

  const handleServiceStringArrayChange = (serviceIdx, arrayField, itemIdx, value) => {
    const updated = [...formData.servicesList];
    const arr = [...(updated[serviceIdx][arrayField] || [])];
    arr[itemIdx] = value;
    updated[serviceIdx] = { ...updated[serviceIdx], [arrayField]: arr };
    setFormData((prev) => ({ ...prev, servicesList: updated }));
  };

  const addServiceStringArrayItem = (serviceIdx, arrayField) => {
    const updated = [...formData.servicesList];
    const arr = [...(updated[serviceIdx][arrayField] || []), ''];
    updated[serviceIdx] = { ...updated[serviceIdx], [arrayField]: arr };
    setFormData((prev) => ({ ...prev, servicesList: updated }));
  };

  const removeServiceStringArrayItem = (serviceIdx, arrayField, itemIdx) => {
    const updated = [...formData.servicesList];
    const arr = (updated[serviceIdx][arrayField] || []).filter((_, i) => i !== itemIdx);
    updated[serviceIdx] = { ...updated[serviceIdx], [arrayField]: arr };
    setFormData((prev) => ({ ...prev, servicesList: updated }));
  };

  const handleServiceFaqChange = (serviceIdx, faqIdx, field, value) => {
    const updated = [...formData.servicesList];
    const faqs = [...(updated[serviceIdx].faqs || [])];
    faqs[faqIdx] = { ...faqs[faqIdx], [field]: value };
    updated[serviceIdx] = { ...updated[serviceIdx], faqs };
    setFormData((prev) => ({ ...prev, servicesList: updated }));
  };

  const addServiceFaq = (serviceIdx) => {
    const updated = [...formData.servicesList];
    updated[serviceIdx] = { ...updated[serviceIdx], faqs: [...(updated[serviceIdx].faqs || []), { q: '', a: '' }] };
    setFormData((prev) => ({ ...prev, servicesList: updated }));
  };

  const removeServiceFaq = (serviceIdx, faqIdx) => {
    const updated = [...formData.servicesList];
    updated[serviceIdx] = { ...updated[serviceIdx], faqs: (updated[serviceIdx].faqs || []).filter((_, i) => i !== faqIdx) };
    setFormData((prev) => ({ ...prev, servicesList: updated }));
  };

  const addNewServiceListItem = () => {
    setFormData((prev) => ({ ...prev, servicesList: [...prev.servicesList, { ...emptyServiceItem }] }));
  };

  const removeServiceListItem = (idx) => {
    if (!window.confirm('Remove this entire service permanently?')) return;
    setFormData((prev) => ({ ...prev, servicesList: prev.servicesList.filter((_, i) => i !== idx) }));
  };

  const handleSave = async () => {
    try {
      await axios.put(`${BASE_URL}/api/content`, formData, authHeaders);
      alert('Saved successfully!');
    } catch (err) {
      console.error('Save failed:', err);
      alert('Failed to save. Check backend console.');
    }
  };

  // ---------- BLOG HANDLERS ----------
  const startEditPost = (post) => {
    setEditingPost(post._id);
    setPostForm({ title: post.title, excerpt: post.excerpt, content: post.content || '', image: post.image || '' });
  };

  const startNewPost = () => {
    setEditingPost('new');
    setPostForm(emptyPost);
  };

  const cancelEditPost = () => {
    setEditingPost(null);
    setPostForm(emptyPost);
  };

  const savePost = async () => {
    try {
      if (editingPost === 'new') {
        await axios.post(`${BASE_URL}/api/posts`, postForm, authHeaders);
      } else {
        await axios.put(`${BASE_URL}/api/posts/${editingPost}`, postForm, authHeaders);
      }
      await loadData();
      cancelEditPost();
      alert('Post saved!');
    } catch (err) {
      console.error('Post save failed:', err);
      alert('Failed to save post.');
    }
  };

  const deletePost = async (id) => {
    if (!window.confirm('Delete this post?')) return;
    try {
      await axios.delete(`${BASE_URL}/api/posts/${id}`, authHeaders);
      await loadData();
    } catch (err) {
      console.error('Delete failed:', err);
      alert('Failed to delete post.');
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const uploadData = new FormData();
    uploadData.append('image', file);
    try {
      const res = await axios.post(`${BASE_URL}/api/upload`, uploadData, {
        headers: { 'x-admin-password': ADMIN_PASS, 'Content-Type': 'multipart/form-data' },
      });
      setPostForm((prev) => ({ ...prev, image: res.data.url }));
    } catch (err) {
      console.error('Image upload failed:', err);
      alert('Image upload failed.');
    }
    setUploading(false);
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

        <nav className="sidebar-nav">
          <button className={`nav-item ${activeTab === 'home' ? 'active' : ''}`} onClick={() => setActiveTab('home')}>
            <span>🏠</span> Home Page
          </button>
          <button className={`nav-item ${activeTab === 'services' ? 'active' : ''}`} onClick={() => setActiveTab('services')}>
            <span>🛠️</span> Services (Home Teaser)
          </button>
          <button className={`nav-item ${activeTab === 'servicesPage' ? 'active' : ''}`} onClick={() => setActiveTab('servicesPage')}>
            <span>📄</span> Services Page
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
          <button className={`nav-item ${activeTab === 'seo' ? 'active' : ''}`} onClick={() => setActiveTab('seo')}>
            <span>🔍</span> SEO
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
            <h2 className="page-title">Services Management (Home Page Teaser)</h2>
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

        {activeTab === 'servicesPage' && (
          <section className="tab-section">
            <h2 className="page-title">Services Page Management</h2>

            <div className="card-box">
              <h3 className="card-title">Services Page Hero</h3>
              <div className="form-group">
                <label>Badge</label>
                <input type="text" value={formData?.servicesPageHero?.badge || ''} onChange={(e) => handleServicesPageHeroChange('badge', e.target.value)} />
              </div>
              <div className="form-group">
                <label>Title</label>
                <input type="text" value={formData?.servicesPageHero?.title || ''} onChange={(e) => handleServicesPageHeroChange('title', e.target.value)} />
              </div>
              <div className="form-group">
                <label>Subtitle</label>
                <textarea rows="3" value={formData?.servicesPageHero?.subtitle || ''} onChange={(e) => handleServicesPageHeroChange('subtitle', e.target.value)} />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '32px 0 16px' }}>
              <h3 style={{ color: '#f8fafc', margin: 0 }}>Individual Services ({formData.servicesList.length})</h3>
              <button type="button" onClick={addNewServiceListItem} className="add-btn">+ Add New Service</button>
            </div>

            {formData.servicesList.map((service, idx) => (
              <div key={idx} className="card-box">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <h3 className="card-title" style={{ margin: 0 }}>{service.title || 'Untitled Service'}</h3>
                  <button type="button" className="delete-btn-text" onClick={() => removeServiceListItem(idx)}>Remove Service</button>
                </div>

                <div style={{ display: 'flex', gap: 12 }}>
                  <div className="form-group" style={{ width: 80 }}>
                    <label>Icon</label>
                    <input type="text" value={service.icon || ''} onChange={(e) => handleServiceListFieldChange(idx, 'icon', e.target.value)} />
                  </div>
                  <div className="form-group" style={{ flex: 1 }}>
                    <label>Slug (URL — no spaces, e.g. web-design)</label>
                    <input type="text" value={service.slug || ''} onChange={(e) => handleServiceListFieldChange(idx, 'slug', e.target.value)} />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 12 }}>
                  <div className="form-group" style={{ flex: 1 }}>
                    <label>Short Title (card pe dikhega)</label>
                    <input type="text" value={service.title || ''} onChange={(e) => handleServiceListFieldChange(idx, 'title', e.target.value)} />
                  </div>
                  <div className="form-group" style={{ flex: 1 }}>
                    <label>Full Title</label>
                    <input type="text" value={service.full || ''} onChange={(e) => handleServiceListFieldChange(idx, 'full', e.target.value)} />
                  </div>
                </div>

                <div className="form-group">
                  <label>Tagline (one line)</label>
                  <input type="text" value={service.tagline || ''} onChange={(e) => handleServiceListFieldChange(idx, 'tagline', e.target.value)} />
                </div>

                <div className="form-group">
                  <label>Overview (detail page paragraph)</label>
                  <textarea rows="4" value={service.overview || ''} onChange={(e) => handleServiceListFieldChange(idx, 'overview', e.target.value)} />
                </div>

                <div style={{ marginTop: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                    <label style={{ fontWeight: 600 }}>Key Benefits</label>
                    <button type="button" className="add-btn" onClick={() => addServiceStringArrayItem(idx, 'benefits')}>+ Add Benefit</button>
                  </div>
                  {(service.benefits || []).map((b, bIdx) => (
                    <div key={bIdx} className="stats-row" style={{ marginBottom: 8 }}>
                      <input
                        type="text"
                        style={{ flex: 1 }}
                        value={b}
                        onChange={(e) => handleServiceStringArrayChange(idx, 'benefits', bIdx, e.target.value)}
                      />
                      <button type="button" className="delete-btn" onClick={() => removeServiceStringArrayItem(idx, 'benefits', bIdx)}>✕</button>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                    <label style={{ fontWeight: 600 }}>What's Included</label>
                    <button type="button" className="add-btn" onClick={() => addServiceStringArrayItem(idx, 'included')}>+ Add Item</button>
                  </div>
                  {(service.included || []).map((inc, incIdx) => (
                    <div key={incIdx} className="stats-row" style={{ marginBottom: 8 }}>
                      <input
                        type="text"
                        style={{ flex: 1 }}
                        value={inc}
                        onChange={(e) => handleServiceStringArrayChange(idx, 'included', incIdx, e.target.value)}
                      />
                      <button type="button" className="delete-btn" onClick={() => removeServiceStringArrayItem(idx, 'included', incIdx)}>✕</button>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                    <label style={{ fontWeight: 600 }}>FAQs</label>
                    <button type="button" className="add-btn" onClick={() => addServiceFaq(idx)}>+ Add FAQ</button>
                  </div>
                  {(service.faqs || []).map((faq, faqIdx) => (
                    <div key={faqIdx} style={{ borderBottom: '1px solid #1e293b', paddingBottom: 12, marginBottom: 12 }}>
                      <div className="form-group">
                        <label>Question</label>
                        <input type="text" value={faq.q || ''} onChange={(e) => handleServiceFaqChange(idx, faqIdx, 'q', e.target.value)} />
                      </div>
                      <div className="form-group">
                        <label>Answer</label>
                        <textarea rows="2" value={faq.a || ''} onChange={(e) => handleServiceFaqChange(idx, faqIdx, 'a', e.target.value)} />
                      </div>
                      <button type="button" className="delete-btn-text" onClick={() => removeServiceFaq(idx, faqIdx)}>Remove FAQ</button>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <button className="save-btn" onClick={handleSave}>Save Services Page</button>
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

            {editingPost && (
              <div className="card-box">
                <h3 className="card-title">{editingPost === 'new' ? 'New Post' : 'Edit Post'}</h3>
                <div className="form-group">
                  <label>Title</label>
                  <input type="text" value={postForm.title} onChange={(e) => setPostForm({ ...postForm, title: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Excerpt</label>
                  <textarea rows="2" value={postForm.excerpt} onChange={(e) => setPostForm({ ...postForm, excerpt: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Content</label>
                  <textarea rows="6" value={postForm.content} onChange={(e) => setPostForm({ ...postForm, content: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Image</label>
                  <input type="file" accept="image/*" onChange={handleImageUpload} />
                  {uploading && <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Uploading...</p>}
                  {postForm.image && <img src={postForm.image} alt="preview" style={{ width: '100%', maxWidth: 240, borderRadius: 10, marginTop: 10 }} />}
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                  <button className="save-btn" onClick={savePost}>Save Post</button>
                  <button className="delete-btn-text" onClick={cancelEditPost}>Cancel</button>
                </div>
              </div>
            )}

            <div className="card-box">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h3 className="card-title" style={{ margin: 0 }}>Existing Posts ({posts.length})</h3>
                {!editingPost && <button type="button" onClick={startNewPost} className="add-btn">+ Add Post</button>}
              </div>
              {posts.map((post) => (
                <div key={post._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #1e293b' }}>
                  <p style={{ fontWeight: 600, margin: 0 }}>{post.title}</p>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <button className="delete-btn-text" style={{ color: '#60a5fa' }} onClick={() => startEditPost(post)}>Edit</button>
                    <button className="delete-btn-text" onClick={() => deletePost(post._id)}>Delete</button>
                  </div>
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

            <div className="card-box">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h3 className="card-title" style={{ margin: 0 }}>Additional Links</h3>
                <button type="button" onClick={addContactLink} className="add-btn">+ Add Link</button>
              </div>
              {(formData?.contact?.links || []).map((link, idx) => (
                <div key={idx} className="stats-row" style={{ marginBottom: 12 }}>
                  <div className="form-group" style={{ flex: 1 }}>
                    <label>Label</label>
                    <input type="text" placeholder="e.g. WhatsApp" value={link.label || ''} onChange={(e) => handleContactLinkChange(idx, 'label', e.target.value)} />
                  </div>
                  <div className="form-group" style={{ flex: 2 }}>
                    <label>Value</label>
                    <input type="text" placeholder="e.g. +91 9953792977" value={link.value || ''} onChange={(e) => handleContactLinkChange(idx, 'value', e.target.value)} />
                  </div>
                  <button type="button" className="delete-btn" onClick={() => removeContactLink(idx)}>✕</button>
                </div>
              ))}
            </div>

            <button className="save-btn" onClick={handleSave}>Save Contact</button>
          </section>
        )}

        {activeTab === 'seo' && (
          <section className="tab-section">
            <h2 className="page-title">SEO Settings</h2>
            {['home', 'about', 'services', 'blog', 'contact'].map((page) => (
              <div key={page} className="card-box">
                <h3 className="card-title" style={{ textTransform: 'capitalize' }}>{page} Page</h3>
                <div className="form-group">
                  <label>Meta Title</label>
                  <input
                    type="text"
                    value={formData?.seo?.[page]?.title || ''}
                    onChange={(e) => handleSeoChange(page, 'title', e.target.value)}
                    placeholder="e.g. Services | TechBuds"
                  />
                </div>
                <div className="form-group">
                  <label>Meta Description</label>
                  <textarea
                    rows="3"
                    value={formData?.seo?.[page]?.description || ''}
                    onChange={(e) => handleSeoChange(page, 'description', e.target.value)}
                    placeholder="150-160 characters recommended"
                  />
                </div>
              </div>
            ))}

            <h3 style={{ margin: '32px 0 16px', color: '#f8fafc' }}>Individual Service Pages</h3>
            {formData.serviceSeo.map((s) => {
              const info = servicesData.find((sd) => sd.slug === s.slug);
              return (
                <div key={s.slug} className="card-box">
                  <h3 className="card-title">{info?.title || s.slug}</h3>
                  <div className="form-group">
                    <label>Meta Title</label>
                    <input
                      type="text"
                      value={s.title || ''}
                      onChange={(e) => handleServiceSeoChange(s.slug, 'title', e.target.value)}
                      placeholder={`${info?.full || s.slug} | TechBuds`}
                    />
                  </div>
                  <div className="form-group">
                    <label>Meta Description</label>
                    <textarea
                      rows="3"
                      value={s.description || ''}
                      onChange={(e) => handleServiceSeoChange(s.slug, 'description', e.target.value)}
                      placeholder={info?.tagline || ''}
                    />
                  </div>
                </div>
              );
            })}

            <button className="save-btn" onClick={handleSave}>Save SEO Settings</button>
          </section>
        )}
      </main>
    </div>
  );
};

export default Admin;