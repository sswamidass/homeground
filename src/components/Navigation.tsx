import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

interface NavigationProps {
  isTransparent?: boolean;
}

function Navigation({ isTransparent = false }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className={`navigation ${isTransparent ? 'transparent' : ''}`}>
      <div className="nav-container">
        <Link to="/" className="logo" onClick={closeMenu}>
          <img src="/logo.png" alt="Homeground Coffee" style={{ height: '60px', width: 'auto' }} />
        </Link>

        <button
          className={`menu-toggle ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <li><Link to="/about" className={isActive('/about') ? 'active' : ''} onClick={closeMenu}>About</Link></li>
          <li><Link to="/monthly-box" className={isActive('/monthly-box') ? 'active' : ''} onClick={closeMenu}>Monthly Box</Link></li>
          <li><Link to="/books" className={isActive('/books') ? 'active' : ''} onClick={closeMenu}>Books</Link></li>
          <li><Link to="/coffee" className={isActive('/coffee') ? 'active' : ''} onClick={closeMenu}>Coffee</Link></li>
          <li><Link to="/faq" className={isActive('/faq') ? 'active' : ''} onClick={closeMenu}>FAQ</Link></li>
          <li><Link to="/contact" className={isActive('/contact') ? 'active' : ''} onClick={closeMenu}>Contact</Link></li>
          <li className="nav-cta">
            <Link to="/subscription" className="btn btn-primary" onClick={closeMenu}>Subscribe</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
