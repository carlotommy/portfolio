/**
 * useChapterSnap.js
 * ─────────────────────────────────────────────────────────────
 * Magnetic Snapping with Smart Locking
 *
 * Behavior:
 * - LOCKED: Capitolo centrato (dist < STABLE_ZONE) → pausa totale, no re-snap
 * - DRIFTING: Fuori dal centro → aspetta 0.350s di inattività, poi riaccentra una volta
 * - USER ACTIVE: Scroll/wheel/touch in corso → cancella tutto, resetta
 *
 * Benefits: No infinite re-snapping, smooth recovery when drifting, immediate unlock on input
 */
import { useEffect, useRef } from 'react';
import { easeOutStrong } from '@utils/math';

/* ── Configurazione ────────────────────────────────────────────── */
const DRIFT_TIMEOUT_MS      = 350;  // Attesa prima di riaccentrare (ms)
const SNAP_DURATION         = 650;  // Durata animazione (ms)
const STABLE_ZONE           = 100;  // Raggio "bloccato" attorno al centro (px)
const EDGE_GUARD            = 60;   // Margine di sicurezza ai bordi (px)
const VELOCITY_THRESHOLD    = 15;   // Soglia velocità per bloccare snap (px/frame)
const ACTIVE_SCROLL_THRESHOLD = 5;  // Soglia per considerare "active scroll" (px)

export default function useChapterSnap() {
  /* ── Refs di stato ────────────────────────────────────────── */
  const timer              = useRef(null);
  const isSnapping         = useRef(false);
  const userActive         = useRef(false);
  const animFrame          = useRef(null);
  const chaptersRef        = useRef([]);
  const lastScrollY        = useRef(0);
  const scrollVelocity     = useRef(0);
  const lockedChapter      = useRef(null);     // Capitolo attualmente bloccato
  const lastMoveTime       = useRef(Date.now()); // Timestamp ultimo movimento utente

  /* ── Setup: Refresh chapters su resize ────────────────────── */
  useEffect(() => {
    const refreshChapters = () => {
      const all = Array.from(document.querySelectorAll('[data-chapter]'));
      chaptersRef.current = all.filter(el => el.getAttribute('data-no-snap') !== 'true');
    };
    
    refreshChapters();
    window.addEventListener('resize', refreshChapters);
    const cacheInterval = setInterval(refreshChapters, 2000);
    
    return () => {
      window.removeEventListener('resize', refreshChapters);
      clearInterval(cacheInterval);
    };
  }, []);

  /* ── Main snap engine ──────────────────────────────────────── */
  useEffect(() => {
    /* Trova il capitolo più vicino al centro della viewport */
    const getNearest = () => {
      const chapters = chaptersRef.current;
      if (!chapters.length) return null;

      const viewCenter = window.innerHeight / 2;
      let best = null;
      let bestDist = Infinity;

      for (const el of chapters) {
        const rect = el.getBoundingClientRect();
        const elCenter = rect.top + rect.height / 2;
        const dist = Math.abs(elCenter - viewCenter);

        if (dist < bestDist) {
          bestDist = dist;
          best = { el, dist, rect };
        }
      }
      return best;
    };

    /* Smooth scroll con sextic easing */
    const smoothScrollTo = (targetY) => {
      const startY = window.scrollY;
      const distance = targetY - startY;
      let startTime = null;

      const animation = (currentTime) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const rawProgress = Math.min(timeElapsed / SNAP_DURATION, 1);
        const easedProgress = easeOutStrong(rawProgress);
        
        window.scrollTo(0, startY + Math.round(distance * easedProgress));

        if (timeElapsed < SNAP_DURATION) {
          animFrame.current = requestAnimationFrame(animation);
        } else {
          isSnapping.current = false;
        }
      };

      isSnapping.current = true;
      if (animFrame.current) cancelAnimationFrame(animFrame.current);
      animFrame.current = requestAnimationFrame(animation);
    };

    /* Core snap logic */
    const snapLogic = () => {
      if (userActive.current || isSnapping.current) return;
      if (Math.abs(scrollVelocity.current) > VELOCITY_THRESHOLD) return;

      const target = getNearest();
      if (!target) return;

      // Step 1: Se il capitolo è nel STABLE_ZONE → LOCK, stop snapping
      if (target.dist < STABLE_ZONE) {
        lockedChapter.current = target.el;
        return;
      }

      // Step 2: Se il capitolo target è diverso da quello locked → unlock
      if (lockedChapter.current && lockedChapter.current !== target.el) {
        lockedChapter.current = null;
      }

      // Step 3: Controlla timeout di inattività
      const timeSinceLastMove = Date.now() - lastMoveTime.current;
      if (timeSinceLastMove < DRIFT_TIMEOUT_MS) {
        return; // Aspetta ancora
      }

      // Step 4: Tall section logic (desktop galleries e hero)
      if (target.rect.height > window.innerHeight * 1.5) {
        if (Math.abs(target.rect.top) < window.innerHeight * 0.45) {
          smoothScrollTo(window.scrollY + target.rect.top);
          lockedChapter.current = target.el;
          return;
        }
      }

      // Step 5: Edge guard (non snap ai margini)
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scrollY = window.scrollY;
      if (scrollY < EDGE_GUARD || scrollY > maxScroll - EDGE_GUARD) return;

      // Step 6: Center-point snap
      const viewCenter = window.innerHeight / 2;
      const elCenter = target.rect.top + target.rect.height / 2;
      smoothScrollTo(window.scrollY + (elCenter - viewCenter));
      lockedChapter.current = target.el;
    };

    /* ── Event handlers ────────────────────────────────────── */
    const onScroll = () => {
      const currentY = window.scrollY;
      scrollVelocity.current = currentY - lastScrollY.current;
      lastScrollY.current = currentY;
      lastMoveTime.current = Date.now();

      if (isSnapping.current) return;

      // Unlock se lo scroll è attivo
      if (Math.abs(scrollVelocity.current) > ACTIVE_SCROLL_THRESHOLD) {
        lockedChapter.current = null;
      }

      clearTimeout(timer.current);
      timer.current = setTimeout(snapLogic, DRIFT_TIMEOUT_MS);
    };

    const cancelSnap = () => {
      userActive.current = true;
      lockedChapter.current = null;
      clearTimeout(timer.current);
      if (animFrame.current) {
        cancelAnimationFrame(animFrame.current);
        isSnapping.current = false;
      }
    };

    const onWheelStart = () => cancelSnap();

    const onWheelEnd = () => {
      userActive.current = false;
      lastMoveTime.current = Date.now();
      clearTimeout(timer.current);
      timer.current = setTimeout(snapLogic, DRIFT_TIMEOUT_MS);
    };

    let wheelEndTimer = null;
    const onWheel = () => {
      onWheelStart();
      clearTimeout(wheelEndTimer);
      wheelEndTimer = setTimeout(onWheelEnd, 100);
    };

    const onTouchStart = () => cancelSnap();

    const onTouchEnd = () => {
      userActive.current = false;
      lastMoveTime.current = Date.now();
      clearTimeout(timer.current);
      timer.current = setTimeout(snapLogic, DRIFT_TIMEOUT_MS);
    };

    /* ── Attach listeners ──────────────────────────────────── */
    window.addEventListener('scroll',     onScroll,     { passive: true });
    window.addEventListener('wheel',      onWheel,      { passive: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend',   onTouchEnd,   { passive: true });

    /* ── Cleanup ──────────────────────────────────────────── */
    return () => {
      clearTimeout(timer.current);
      clearTimeout(wheelEndTimer);
      if (animFrame.current) cancelAnimationFrame(animFrame.current);
      window.removeEventListener('scroll',     onScroll);
      window.removeEventListener('wheel',      onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend',   onTouchEnd);
    };
  }, []);
}
