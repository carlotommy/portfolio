import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './PillNav.css';

const NAV_ITEMS = [
  { href: '#about',    label: 'Biografia' },
  { href: '#photos',   label: 'Foto'      },
  { href: '#videos',   label: 'Video'     },
  { href: '#services', label: 'Servizi'   },
  { href: '#contact',  label: 'Contatti'  },
];

const BASE_COLOR       = '#6EB5D8';
const PILL_COLOR       = '#0D1E30';
const HOVER_TEXT_COLOR = '#0D1E30';
const EASE             = 'power3.easeOut';

export default function Navigation() {
  const [activeHref, setActiveHref]     = useState('');
  const [isMobileMenuOpen, setIsMobile] = useState(false);

  useEffect(() => {
    const onHashChange = () => setActiveHref(window.location.hash || '');
    window.addEventListener('hashchange', onHashChange);
    onHashChange();
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const circleRefs      = useRef([]);
  const tlRefs          = useRef([]);
  const activeTweenRefs = useRef([]);
  const logoTweenRef    = useRef(null);
  const hamburgerRef    = useRef(null);
  const mobileMenuRef   = useRef(null);
  const navItemsRef     = useRef(null);
  const logoRef         = useRef(null);

  useEffect(() => {
    const layout = () => {
      circleRefs.current.forEach((circle, index) => {
        if (!circle?.parentElement) return;
        const pill = circle.parentElement;
        const { width: w, height: h } = pill.getBoundingClientRect();
        const R       = ((w * w) / 4 + h * h) / (2 * h);
        const D       = Math.ceil(2 * R) + 2;
        const delta   = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
        const originY = D - delta;

        circle.style.width  = `${D}px`;
        circle.style.height = `${D}px`;
        circle.style.bottom = `-${delta}px`;

        gsap.set(circle, { xPercent: -50, scale: 0, transformOrigin: `50% ${originY}px` });

        const label = pill.querySelector('.pill-label');
        const white = pill.querySelector('.pill-label-hover');
        if (label) gsap.set(label, { y: 0 });
        if (white) gsap.set(white, { y: h + 12, opacity: 0 });

        tlRefs.current[index]?.kill();
        const tl = gsap.timeline({ paused: true });
        tl.to(circle, { scale: 1.2, xPercent: -50, duration: 2, ease: EASE, overwrite: 'auto' }, 0);
        if (label) tl.to(label, { y: -(h + 8), duration: 2, ease: EASE, overwrite: 'auto' }, 0);
        if (white) {
          gsap.set(white, { y: Math.ceil(h + 100), opacity: 0 });
          tl.to(white, { y: 0, opacity: 1, duration: 2, ease: EASE, overwrite: 'auto' }, 0);
        }
        tlRefs.current[index] = tl;
      });
    };

    layout();
    window.addEventListener('resize', layout);
    document.fonts?.ready?.then(layout).catch(() => {});

    const menu = mobileMenuRef.current;
    if (menu) gsap.set(menu, { visibility: 'hidden', opacity: 0 });

    const logoEl     = logoRef.current;
    const navItemsEl = navItemsRef.current;
    if (logoEl) {
      gsap.set(logoEl, { scale: 0 });
      gsap.to(logoEl, { scale: 1, duration: 0.6, ease: EASE });
    }
    if (navItemsEl) {
      gsap.set(navItemsEl, { width: 0, overflow: 'hidden' });
      gsap.to(navItemsEl, { width: 'auto', duration: 0.6, ease: EASE });
    }

    return () => window.removeEventListener('resize', layout);
  }, []);

  const handleEnter = i => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(tl.duration(), { duration: 0.3, ease: EASE, overwrite: 'auto' });
  };

  const handleLeave = i => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(0, { duration: 0.2, ease: EASE, overwrite: 'auto' });
  };

  const handleLogoEnter = () => {
    logoTweenRef.current?.kill();
    logoTweenRef.current = gsap.to(logoRef.current, { rotate: 360, duration: 0.4, ease: EASE, overwrite: 'auto' });
  };

  const handleAnchorClick = (e, href) => {
    if (!href.startsWith('#')) return;
    e.preventDefault();
    closeMobileMenu();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const closeMobileMenu = () => {
    setIsMobile(false);
    const lines = hamburgerRef.current?.querySelectorAll('.hamburger-line');
    if (lines) {
      gsap.to(lines[0], { rotation: 0, y: 0, duration: 0.3, ease: EASE });
      gsap.to(lines[1], { rotation: 0, y: 0, duration: 0.3, ease: EASE });
    }
    const menu = mobileMenuRef.current;
    if (menu) gsap.to(menu, { opacity: 0, y: 10, duration: 0.2, ease: EASE, onComplete: () => gsap.set(menu, { visibility: 'hidden' }) });
  };

  const toggleMobileMenu = () => {
    const newState = !isMobileMenuOpen;
    setIsMobile(newState);
    const lines = hamburgerRef.current?.querySelectorAll('.hamburger-line');
    const menu  = mobileMenuRef.current;

    if (lines) {
      if (newState) {
        gsap.to(lines[0], { rotation: 45,  y:  3, duration: 0.3, ease: EASE });
        gsap.to(lines[1], { rotation: -45, y: -3, duration: 0.3, ease: EASE });
      } else {
        gsap.to(lines[0], { rotation: 0, y: 0, duration: 0.3, ease: EASE });
        gsap.to(lines[1], { rotation: 0, y: 0, duration: 0.3, ease: EASE });
      }
    }

    if (menu) {
      if (newState) {
        gsap.set(menu, { visibility: 'visible' });
        gsap.fromTo(menu, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3, ease: EASE });
      } else {
        gsap.to(menu, { opacity: 0, y: 10, duration: 0.2, ease: EASE, onComplete: () => gsap.set(menu, { visibility: 'hidden' }) });
      }
    }
  };

  const cssVars = {
    '--base':       BASE_COLOR,
    '--pill-bg':    PILL_COLOR,
    '--hover-text': HOVER_TEXT_COLOR,
    '--pill-text':  BASE_COLOR,
  };

  return (
    <div className="pill-nav-container">
      <nav className="pill-nav" aria-label="Primary" style={cssVars}>

        <a
          className="pill-logo"
          href="#hero"
          aria-label="Home"
          onMouseEnter={handleLogoEnter}
          onClick={e => handleAnchorClick(e, '#hero')}
          ref={logoRef}
        />

        <div className="pill-nav-items desktop-only" ref={navItemsRef}>
          <ul className="pill-list" role="menubar">
            {NAV_ITEMS.map((item, i) => (
              <li key={item.href} role="none">
                <a
                  role="menuitem"
                  href={item.href}
                  className={`pill${activeHref === item.href ? ' is-active' : ''}`}
                  onMouseEnter={() => handleEnter(i)}
                  onMouseLeave={() => handleLeave(i)}
                  onClick={e => handleAnchorClick(e, item.href)}
                >
                  <span className="hover-circle" aria-hidden="true" ref={el => { circleRefs.current[i] = el; }} />
                  <span className="label-stack">
                    <span className="pill-label">{item.label}</span>
                    <span className="pill-label-hover" aria-hidden="true">{item.label}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <button className="mobile-menu-button mobile-only" onClick={toggleMobileMenu} aria-label="Toggle menu" ref={hamburgerRef}>
          <span className="hamburger-line" />
          <span className="hamburger-line" />
        </button>
      </nav>

      <div className="mobile-menu-popover mobile-only" ref={mobileMenuRef} style={cssVars}>
        <ul className="mobile-menu-list">
          {NAV_ITEMS.map(item => (
            <li key={`mob-${item.href}`}>
              <a
                href={item.href}
                className={`mobile-menu-link${activeHref === item.href ? ' is-active' : ''}`}
                onClick={e => handleAnchorClick(e, item.href)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}