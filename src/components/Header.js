import React, { useEffect, useState, useCallback } from 'react';
import { useLocation, Link } from 'react-router-dom';

const Header = () => {
  const [show, setShow] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const location = useLocation();
  const currentPath = location.pathname;

  // Gunakan useCallback agar handleScroll stabil dan bisa dipakai di dependency useEffect
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    setIsScrolled(currentScrollY > 0);
    setShow(currentScrollY < lastScrollY);
    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]); // dependency array pakai handleScroll

  const navItems = [
    { name: 'Work', path: '/work' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Ideas', path: '/ideas' },
    { name: 'Careers', path: '/careers' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header
      className={`main-header ${isScrolled ? 'scrolled' : ''}`}
      style={{ top: show ? '0' : '-80px' }}
    >
      <div className="nav">
        <div className="left">
          <Link to="/" className="logo">
            <img src="/suitmediaicon.png" alt="Suitmedia Logo" />
          </Link>
        </div>
        <div className="right">
          <nav>
            {navItems.map(({ name, path }) => (
              <Link
                key={name}
                to={path}
                className={currentPath === path ? 'active' : ''}
              >
                {name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
