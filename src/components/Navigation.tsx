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
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 5C11.716 5 5 11.716 5 20C5 28.284 11.716 35 20 35C28.284 35 35 28.284 35 20C35 11.716 28.284 5 20 5Z" fill="#4a90c7"/>
            <path d="M20 10C14.477 10 10 14.477 10 20C10 25.523 14.477 30 20 30C25.523 30 30 25.523 30 20C30 14.477 25.523 10 20 10Z" fill="#7eb3d8"/>
            <path d="M25 17C25 14.791 23.209 13 21 13H19C16.791 13 15 14.791 15 17V23C15 25.209 16.791 27 19 27H21C23.209 27 25 25.209 25 23V17Z" fill="#1e5a7d"/>
          </svg>
          <span className="logo-text">Homeground</span>
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
