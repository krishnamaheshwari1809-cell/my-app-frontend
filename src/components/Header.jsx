import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

function Header() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact Us', path: '/contact' },
  ];

  return (
    <header style={styles.header}>
      <div className="container" style={styles.wrap}>
        <Link to="/" style={styles.logo}>Krishna<span style={{ color: '#8b5cf6' }}>.</span></Link>

        <nav style={{ ...styles.nav, display: menuOpen ? 'flex' : undefined }}>
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              style={{
                ...styles.navLink,
                color: location.pathname === link.path ? '#8b5cf6' : '#f1f1f5',
                marginRight: '32px',
              }}
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <button style={styles.menuBtn} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>
    </header>
  );
}

const styles = {
  header: {
    position: 'sticky',
    top: 0,
    zIndex: 100,
    background: 'rgba(13,13,21,0.9)',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid rgba(255,255,255,0.08)',
  },
  wrap: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '72px',
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 800,
  },
  nav: {
    display: 'flex',
    gap: '32px',
    alignItems: 'center',
  },
  navLink: {
    fontWeight: 500,
    fontSize: '0.95rem',
    transition: 'color 0.2s',
    padding: '4px 0',
  },
  menuBtn: {
    display: 'none',
    background: 'none',
    border: 'none',
    color: '#fff',
    fontSize: '1.5rem',
    cursor: 'pointer',
  },
};

export default Header;