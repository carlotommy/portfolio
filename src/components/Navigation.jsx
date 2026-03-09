import { useState, useEffect, useRef } from 'react';
import styles from './Navigation.module.css';

const links = [
  { href: '#about',    label: 'Biografia' },
  { href: '#photos',   label: 'Foto'      },
  { href: '#videos',   label: 'Video'     },
  { href: '#services', label: 'Servizi'   },
  { href: '#contact',  label: 'Contatti'  },
];

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef    = useRef(null);

  const closeMenu = () => setMenuOpen(false);

  // Close menu on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) closeMenu();
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  // Smooth scroll on anchor click
  const handleAnchor = (e, href) => {
    e.preventDefault();
    closeMenu();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav className={styles.mainNav} ref={navRef}>
      <div className={styles.navContainer}>
        <a
          href="#hero"
          className={styles.navLogo}
          onClick={(e) => handleAnchor(e, '#hero')}
        >
          GR
        </a>

        <div className={`${styles.navLinks} ${menuOpen ? styles.active : ''}`}>
          {links.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className={styles.navLink}
              onClick={(e) => handleAnchor(e, href)}
            >
              <span className={styles.navText}>{label}</span>
              <span className={styles.navLine} />
            </a>
          ))}
        </div>

        <button
          className={`${styles.navToggle} ${menuOpen ? styles.active : ''}`}
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </nav>
  );
}
