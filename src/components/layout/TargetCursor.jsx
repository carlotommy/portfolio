import { useEffect, useRef, useCallback, useMemo } from 'react';
import { gsap } from 'gsap';
import './TargetCursor.css';

const TargetCursor = ({
  targetSelector = '.cursor-target',
  spinDuration = 2,
  hideDefaultCursor = true,
  hoverDuration = 0.2,
  parallaxOn = true
}) => {
  const cursorRef = useRef(null);
  const cornersRef = useRef(null);
  const spinTl = useRef(null);
  const dotRef = useRef(null);

  const isActiveRef = useRef(false);
  const targetCornerPositionsRef = useRef(null);
  const tickerFnRef = useRef(null);
  const activeStrengthRef = useRef(0);

  const isMobile = useMemo(() => {
    if (typeof window === 'undefined') return false;
    const hasTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isSmallScreen = window.innerWidth <= 768;
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
    const isMobileUserAgent = mobileRegex.test(userAgent.toLowerCase());
    return (hasTouchScreen && isSmallScreen) || isMobileUserAgent;
  }, []);

  const constants = useMemo(
    () => ({
      borderWidth: 3,
      cornerSize: 12,
      padding: 6
    }),
    []
  );

  const moveCursor = useCallback((x, y) => {
    if (!cursorRef.current) return;
    gsap.to(cursorRef.current, {
      x,
      y,
      duration: 0.1,
      ease: 'power3.out'
    });
  }, []);

  useEffect(() => {
    if (isMobile || !cursorRef.current) return;

    const originalCursor = document.body.style.cursor;
    if (hideDefaultCursor) {
      document.body.style.cursor = 'none';
      document.body.classList.add('custom-cursor-active');
    }

    const cursor = cursorRef.current;
    cornersRef.current = cursor.querySelectorAll('.target-cursor-corner');

    gsap.set(cursor, {
      xPercent: -50,
      yPercent: -50,
      x: window.innerWidth / 2,
      y: window.innerHeight / 2
    });

    const createSpinTimeline = () => {
      if (spinTl.current) {
        spinTl.current.kill();
      }
      spinTl.current = gsap
        .timeline({ repeat: -1 })
        .to(cursor, { rotation: '+=360', duration: spinDuration, ease: 'none' });
    };

    createSpinTimeline();

    // ─────────────────────────────────────────────────────────
    // Ticker Logic (Runs continuously when strength > 0)
    // ─────────────────────────────────────────────────────────
    const tickerFn = () => {
      if (!targetCornerPositionsRef.current || !cursorRef.current || !cornersRef.current) {
        return;
      }

      const strength = activeStrengthRef.current;
      if (strength === 0) return;

      const cursorX = gsap.getProperty(cursorRef.current, 'x');
      const cursorY = gsap.getProperty(cursorRef.current, 'y');

      const corners = Array.from(cornersRef.current);
      corners.forEach((corner, i) => {
        const currentX = gsap.getProperty(corner, 'x');
        const currentY = gsap.getProperty(corner, 'y');

        const targetX = targetCornerPositionsRef.current[i].x - cursorX;
        const targetY = targetCornerPositionsRef.current[i].y - cursorY;

        const finalX = currentX + (targetX - currentX) * strength;
        const finalY = currentY + (targetY - currentY) * strength;

        const duration = strength >= 0.99 ? (parallaxOn ? 0.2 : 0) : 0.05;

        gsap.to(corner, {
          x: finalX,
          y: finalY,
          duration: duration,
          ease: duration === 0 ? 'none' : 'power1.out',
          overwrite: 'auto'
        });
      });
    };

    tickerFnRef.current = tickerFn;
    let resumeTimeout = null;

    // ─────────────────────────────────────────────────────────
    // Scanner: Trova rettangoli dinamicamente sotto il mouse
    // ─────────────────────────────────────────────────────────
    const scanForTarget = (mx, my) => {
      if (mx <= 0 || my <= 0 || mx >= window.innerWidth || my >= window.innerHeight) return null;

      const el = document.elementFromPoint(mx, my);
      if (!el) return null;

      // 1. Target Esplicito (.cursor-target) -> Priorità Massima e Assoluta
      const explicit = el.closest(targetSelector);
      if (explicit) {
          const er = explicit.getBoundingClientRect();
          // Solo un piccolo anti-fail, se la larghezza è > 4 procedi libero
          if (er.width > 4) return er; 
      }

      // 2. Elementi grafici e moduli strutturali
      const block = el.closest('img, video, [data-cursor="view"]');
      if (block) return block.getBoundingClientRect();

      // 3. Blocchi testuali Semantici -> Garantisce presa dell'intera stringa (es. Menu)
      const fullTextContainer = el.closest('[aria-label], h1, h2, h3, h4, h5, h6, p, blockquote, li');
      if (fullTextContainer) {
        const rc = fullTextContainer.getBoundingClientRect();
        if (rc.width >= 4 && rc.width < 1200 && rc.height >= 4 && rc.height < 400) {
          return rc;
        }
      }

      // 4. Link e bottoni di fallback
      const interactive = el.closest('a, button, [role="button"]');
      if (interactive) {
          const r = interactive.getBoundingClientRect();
          if (r.width < 900) return r;
      }

      // 5. Caduta Libera: Nodo di testo rilevato nativamente dal mouse
      try {
        let node = null;
        if (document.caretRangeFromPoint) {
           const range = document.caretRangeFromPoint(mx, my);
           if (range) node = range.startContainer;
        } else if (document.caretPositionFromPoint) {
           const pos = document.caretPositionFromPoint(mx, my);
           if (pos) node = pos.offsetNode;
        }

        if (node && node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 1) {
          const tr = document.createRange();
          tr.selectNodeContents(node.parentElement); 
          const rect = tr.getBoundingClientRect();
          if (rect.width >= 4 && rect.width < 900 && rect.height >= 4 && rect.height < 400) {
            return rect;
          }
        }
      } catch (e) {}

      return null;
    };

    // ─────────────────────────────────────────────────────────
    // Gestione transizioni di stato (Animazioni Reactbit)
    // ─────────────────────────────────────────────────────────
    const applyTargetRect = (rect) => {
      if (!rect) {
        // PERDITA TARGET (Ritorna a rotazione)
        if (isActiveRef.current) {
          isActiveRef.current = false;
          gsap.ticker.remove(tickerFnRef.current);
          targetCornerPositionsRef.current = null;
          gsap.set(activeStrengthRef, { current: 0, overwrite: true });

          const corners = Array.from(cornersRef.current);
          gsap.killTweensOf(corners);
          
          const { cornerSize } = constants;
          const positions = [
            { x: -cornerSize * 1.5, y: -cornerSize * 1.5 },
            { x: cornerSize * 0.5,  y: -cornerSize * 1.5 },
            { x: cornerSize * 0.5,  y: cornerSize * 0.5 },
            { x: -cornerSize * 1.5, y: cornerSize * 0.5 }
          ];

          const tl = gsap.timeline();
          corners.forEach((corner, idx) => {
            tl.to(corner, { x: positions[idx].x, y: positions[idx].y, duration: 0.3, ease: 'power3.out' }, 0);
          });

          // Ripresa rotazione fluida
          if (resumeTimeout) clearTimeout(resumeTimeout);
          resumeTimeout = setTimeout(() => {
            if (!isActiveRef.current && cursorRef.current && spinTl.current) {
              const currentRotation = gsap.getProperty(cursorRef.current, 'rotation');
              const normalizedRotation = currentRotation % 360;
              spinTl.current.kill();
              spinTl.current = gsap
                .timeline({ repeat: -1 })
                .to(cursorRef.current, { rotation: '+=360', duration: spinDuration, ease: 'none' });

              gsap.to(cursorRef.current, {
                rotation: normalizedRotation + 360,
                duration: spinDuration * (1 - normalizedRotation / 360),
                ease: 'none',
                onComplete: () => spinTl.current?.restart()
              });
            }
          }, 50);
        }
        return;
      }

      // TROVATO TARGET O AGGIORNAMENTO POSIZIONE DURANTE LO SCROLL
      const { borderWidth, cornerSize, padding } = constants;
      targetCornerPositionsRef.current = [
        { x: rect.left - borderWidth - padding, y: rect.top - borderWidth - padding },
        { x: rect.right + borderWidth - cornerSize + padding, y: rect.top - borderWidth - padding },
        { x: rect.right + borderWidth - cornerSize + padding, y: rect.bottom + borderWidth - cornerSize + padding },
        { x: rect.left - borderWidth - padding, y: rect.bottom + borderWidth - cornerSize + padding }
      ];

      if (!isActiveRef.current) {
        // ENTRATA SUL TARGET (Lock In)
        isActiveRef.current = true;
        if (resumeTimeout) clearTimeout(resumeTimeout);
        
        const corners = Array.from(cornersRef.current);
        corners.forEach(corner => gsap.killTweensOf(corner));
        
        gsap.killTweensOf(cursorRef.current, 'rotation');
        spinTl.current?.pause();
        gsap.set(cursorRef.current, { rotation: 0 });

        gsap.ticker.add(tickerFnRef.current);
        gsap.to(activeStrengthRef, { current: 1, duration: hoverDuration, ease: 'power2.out' });

        const cursorX = gsap.getProperty(cursorRef.current, 'x');
        const cursorY = gsap.getProperty(cursorRef.current, 'y');
        
        corners.forEach((corner, i) => {
          gsap.to(corner, {
            x: targetCornerPositionsRef.current[i].x - cursorX,
            y: targetCornerPositionsRef.current[i].y - cursorY,
            duration: 0.2, ease: 'power2.out'
          });
        });
      }
    };

    // ─────────────────────────────────────────────────────────
    // Event Listeners (Mouse & Scroll unificati)
    // ─────────────────────────────────────────────────────────
    let lastX = window.innerWidth / 2;
    let lastY = window.innerHeight / 2;

    const pointerHandler = (e) => {
      lastX = e.clientX;
      lastY = e.clientY;
      moveCursor(lastX, lastY);
      applyTargetRect(scanForTarget(lastX, lastY));
    };

    const scrollHandler = () => {
      // Aggiorna istantaneamente il rect su scroll per evitare che
      // il cursore si sganci o diventi "sfasato" (Bug dello scroll)
      applyTargetRect(scanForTarget(lastX, lastY));
    };

    const mouseDownHandler = () => {
      if (!dotRef.current) return;
      gsap.to(dotRef.current, { scale: 0.7, duration: 0.3 });
      gsap.to(cursorRef.current, { scale: 0.9, duration: 0.2 });
    };

    const mouseUpHandler = () => {
      if (!dotRef.current) return;
      gsap.to(dotRef.current, { scale: 1, duration: 0.3 });
      gsap.to(cursorRef.current, { scale: 1, duration: 0.2 });
    };

    window.addEventListener('mousemove', pointerHandler);
    window.addEventListener('scroll', scrollHandler, { passive: true });
    window.addEventListener('mousedown', mouseDownHandler);
    window.addEventListener('mouseup', mouseUpHandler);

    return () => {
      if (tickerFnRef.current) gsap.ticker.remove(tickerFnRef.current);
      if (resumeTimeout) clearTimeout(resumeTimeout);

      window.removeEventListener('mousemove', pointerHandler);
      window.removeEventListener('scroll', scrollHandler);
      window.removeEventListener('mousedown', mouseDownHandler);
      window.removeEventListener('mouseup', mouseUpHandler);

      spinTl.current?.kill();
      document.body.style.cursor = originalCursor;
      document.body.classList.remove('custom-cursor-active');

      isActiveRef.current = false;
      targetCornerPositionsRef.current = null;
      activeStrengthRef.current = 0;
    };
  }, [targetSelector, spinDuration, moveCursor, constants, hideDefaultCursor, isMobile, hoverDuration, parallaxOn]);

  useEffect(() => {
    if (isMobile || !cursorRef.current || !spinTl.current) return;
    if (spinTl.current.isActive()) {
      spinTl.current.kill();
      spinTl.current = gsap
        .timeline({ repeat: -1 })
        .to(cursorRef.current, { rotation: '+=360', duration: spinDuration, ease: 'none' });
    }
  }, [spinDuration, isMobile]);

  if (isMobile) {
    return null;
  }

  return (
    <div ref={cursorRef} className="target-cursor-wrapper">
      <div ref={dotRef} className="target-cursor-dot" />
      <div className="target-cursor-corner corner-tl" />
      <div className="target-cursor-corner corner-tr" />
      <div className="target-cursor-corner corner-br" />
      <div className="target-cursor-corner corner-bl" />
    </div>
  );
};

export default TargetCursor;
