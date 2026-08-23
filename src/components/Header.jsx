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
    <header className="site-header">
      <div className="container header-wrap">
        <Link to="/" className="logo" onClick={() => setMenuOpen(false)}>
          Krishna<span style={{ color: '#8b5cf6' }}>.</span>
        </Link>

        <nav className={`main-nav ${menuOpen ? 'open' : ''}`}>
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="nav-link"
              style={{
                color: location.pathname === link.path ? '#8b5cf6' : '#f1f1f5',
              }}
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>
    </header>
  );
}

export default Header;