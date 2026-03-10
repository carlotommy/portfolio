import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './PillNav.css';

/**
 * PillNav – versione adattata per sito single-page con anchor link.
 * Nessuna dipendenza da react-router-dom: tutto viene gestito con <a> e
 * smooth-scroll via JavaScript per i link che iniziano con "#".
 */
const PillNav = ({
  logo,
  logoAlt = 'Logo',
  items,
  activeHref,
  className = '',
  ease = 'power3.easeOut',
  baseColor = '#fff',
  pillColor = '#060010',
  hoveredPillTextColor = '#060010',
  pillTextColor,
  onMobileMenuClick,
  initialLoadAnimation = true,
}) => {
  const resolvedPillTextColor = pillTextColor ?? baseColor;

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const circleRefs      = useRef([]);
  const tlRefs          = useRef([]);
  const activeTweenRefs = useRef([]);
  const logoImgRef      = useRef(null);
  const logoTweenRef    = useRef(null);
  const hamburgerRef    = useRef(null);
  const mobileMenuRef   = useRef(null);
  const navItemsRef     = useRef(null);
  const logoRef         = useRef(null);

  /* ── Layout + animazioni GSAP ───────────────────────────────────────── */
  useEffect(() => {
    const layout = () => {
      circleRefs.current.forEach(circle => {
        if (!circle?.parentElement) return;

        const pill = circle.parentElement;
        const { width: w, height: h } = pill.getBoundingClientRect();

        // Geometria del cerchio che "esplode" dal basso della pill
        const R      = ((w * w) / 4 + h * h) / (2 * h);
        const D      = Math.ceil(2 * R) + 2;
        const delta  = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
        const originY = D - delta;

        circle.style.width  = `${D}px`;
        circle.style.height = `${D}px`;
        circle.style.bottom = `-${delta}px`;

        gsap.set(circle, {
          xPercent: -50,
          scale: 0,
          transformOrigin: `50% ${originY}px`,
        });

        const label = pill.querySelector('.pill-label');
        const white = pill.querySelector('.pill-label-hover');
        if (label) gsap.set(label, { y: 0 });
        if (white) gsap.set(white, { y: h + 12, opacity: 0 });

        const index = circleRefs.current.indexOf(circle);
        if (index === -1) return;

        tlRefs.current[index]?.kill();
        const tl = gsap.timeline({ paused: true });

        tl.to(circle, { scale: 1.2, xPercent: -50, duration: 2, ease, overwrite: 'auto' }, 0);
        if (label) tl.to(label, { y: -(h + 8), duration: 2, ease, overwrite: 'auto' }, 0);
        if (white) {
          gsap.set(white, { y: Math.ceil(h + 100), opacity: 0 });
          tl.to(white, { y: 0, opacity: 1, duration: 2, ease, overwrite: 'auto' }, 0);
        }

        tlRefs.current[index] = tl;
      });
    };

    layout();
    window.addEventListener('resize', layout);
    document.fonts?.ready?.then(layout).catch(() => {});

    // Nascondi il menu mobile all'avvio
    const menu = mobileMenuRef.current;
    if (menu) gsap.set(menu, { visibility: 'hidden', opacity: 0 });

    // Animazione di entrata iniziale
    if (initialLoadAnimation) {
      const logoEl    = logoRef.current;
      const navItemsEl = navItemsRef.current;
      if (logoEl) {
        gsap.set(logoEl, { scale: 0 });
        gsap.to(logoEl, { scale: 1, duration: 0.6, ease });
      }
      if (navItemsEl) {
        gsap.set(navItemsEl, { width: 0, overflow: 'hidden' });
        gsap.to(navItemsEl, { width: 'auto', duration: 0.6, ease });
      }
    }

    return () => window.removeEventListener('resize', layout);
  }, [items, ease, initialLoadAnimation]);

  /* ── Hover handlers ─────────────────────────────────────────────────── */
  const handleEnter = i => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(tl.duration(), {
      duration: 0.3, ease, overwrite: 'auto',
    });
  };

  const handleLeave = i => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(0, {
      duration: 0.2, ease, overwrite: 'auto',
    });
  };

  /* ── Logo hover (rotazione) ─────────────────────────────────────────── */
  const handleLogoEnter = () => {
    const img = logoImgRef.current;
    if (!img) return;
    logoTweenRef.current?.kill();
    gsap.set(img, { rotate: 0 });
    logoTweenRef.current = gsap.to(img, { rotate: 360, duration: 0.4, ease, overwrite: 'auto' });
  };

  /* ── Smooth scroll per anchor ───────────────────────────────────────── */
  const handleAnchorClick = (e, href) => {
    if (!href.startsWith('#')) return;     // link esterni: comportamento nativo
    e.preventDefault();
    closeMobileMenu();
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  /* ── Mobile menu ────────────────────────────────────────────────────── */
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    const hamburger = hamburgerRef.current;
    const menu      = mobileMenuRef.current;
    if (hamburger) {
      const lines = hamburger.querySelectorAll('.hamburger-line');
      gsap.to(lines[0], { rotation: 0, y: 0, duration: 0.3, ease });
      gsap.to(lines[1], { rotation: 0, y: 0, duration: 0.3, ease });
    }
    if (menu) {
      gsap.to(menu, {
        opacity: 0, y: 10, duration: 0.2, ease,
        onComplete: () => gsap.set(menu, { visibility: 'hidden' }),
      });
    }
  };

  const toggleMobileMenu = () => {
    const newState  = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);
    const hamburger = hamburgerRef.current;
    const menu      = mobileMenuRef.current;

    if (hamburger) {
      const lines = hamburger.querySelectorAll('.hamburger-line');
      if (newState) {
        gsap.to(lines[0], { rotation: 45,  y:  3, duration: 0.3, ease });
        gsap.to(lines[1], { rotation: -45, y: -3, duration: 0.3, ease });
      } else {
        gsap.to(lines[0], { rotation: 0, y: 0, duration: 0.3, ease });
        gsap.to(lines[1], { rotation: 0, y: 0, duration: 0.3, ease });
      }
    }

    if (menu) {
      if (newState) {
        gsap.set(menu, { visibility: 'visible' });
        gsap.fromTo(menu,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.3, ease, transformOrigin: 'top center' },
        );
      } else {
        gsap.to(menu, {
          opacity: 0, y: 10, duration: 0.2, ease, transformOrigin: 'top center',
          onComplete: () => gsap.set(menu, { visibility: 'hidden' }),
        });
      }
    }

    onMobileMenuClick?.();
  };

  /* ── CSS custom properties passate inline ───────────────────────────── */
  const cssVars = {
    '--base':       baseColor,
    '--pill-bg':    pillColor,
    '--hover-text': hoveredPillTextColor,
    '--pill-text':  resolvedPillTextColor,
  };

  return (
    <div className="pill-nav-container">
      <nav className={`pill-nav ${className}`} aria-label="Primary" style={cssVars}>

        {/* ── Logo ── */}
        <a
          className="pill-logo"
          href="#hero"
          aria-label="Home"
          onMouseEnter={handleLogoEnter}
          onClick={e => handleAnchorClick(e, '#hero')}
          ref={logoRef}
        >
          <img src={logo} alt={logoAlt} ref={logoImgRef} />
        </a>

        {/* ── Link desktop ── */}
        <div className="pill-nav-items desktop-only" ref={navItemsRef}>
          <ul className="pill-list" role="menubar">
            {items.map((item, i) => (
              <li key={item.href || `item-${i}`} role="none">
                <a
                  role="menuitem"
                  href={item.href}
                  className={`pill${activeHref === item.href ? ' is-active' : ''}`}
                  aria-label={item.ariaLabel || item.label}
                  onMouseEnter={() => handleEnter(i)}
                  onMouseLeave={() => handleLeave(i)}
                  onClick={e => handleAnchorClick(e, item.href)}
                >
                  <span
                    className="hover-circle"
                    aria-hidden="true"
                    ref={el => { circleRefs.current[i] = el; }}
                  />
                  <span className="label-stack">
                    <span className="pill-label">{item.label}</span>
                    <span className="pill-label-hover" aria-hidden="true">{item.label}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Hamburger mobile ── */}
        <button
          className="mobile-menu-button mobile-only"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
          ref={hamburgerRef}
        >
          <span className="hamburger-line" />
          <span className="hamburger-line" />
        </button>
      </nav>

      {/* ── Dropdown mobile ── */}
      <div className="mobile-menu-popover mobile-only" ref={mobileMenuRef} style={cssVars}>
        <ul className="mobile-menu-list">
          {items.map((item, i) => (
            <li key={item.href || `mobile-item-${i}`}>
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
};

export default PillNav;
