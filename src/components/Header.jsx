import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import logo from '../assets/logo.png';

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
<<<<<<< HEAD
          <img src={logo} alt="TechBuds" className="logo-img" />
=======
          TechBuds<span style={{ color: '#8b5cf6' }}>.</span>
>>>>>>> 62b5e4c3341d445a222f6fa0eb34f7ce2e0c02e8
        </Link>

        <nav className={`main-nav ${menuOpen ? 'open' : ''}`}>
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="nav-link"
style={{
  color: location.pathname === link.path ? '#2463B5' : '#12345B',
  fontWeight: location.pathname === link.path ? 700 : 500,
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