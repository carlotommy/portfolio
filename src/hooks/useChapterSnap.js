/**
 * useChapterSnap.js
 * ─────────────────────────────────────────────────────────────
 * Total Restoration - Authoritative Zone-Based Magnetic Snapping.
 *
 * Logic: 
 * - Sextic Ease-Out (L-Shape) for instant dash.
 * - Reactive 200ms debounce.
 * - Direct handover: starts even if drifting (velocity < 15).
 */
import { useEffect, useRef } from 'react';
import { easeOutStrong } from '@utils/math';

const DEBOUNCE_MS   = 180;    
const STABLE_ZONE   = 100;     // Center silent zone (increased for firm locking)
const SNAP_DURATION = 650;    // Zip towards target
const EDGE_GUARD    = 60;     

export default function useChapterSnap() {
  const timer           = useRef(null);
  const isSnapping      = useRef(false);
  const userActive      = useRef(false);
  const animFrame       = useRef(null);
  const chaptersRef     = useRef([]);
  const lastScrollY     = useRef(0);
  const scrollVelocity  = useRef(0);

  // Cache chapters
  useEffect(() => {
    const refreshChapters = () => {
      // Find all chapters but filter out those marked as data-no-snap
      const all = Array.from(document.querySelectorAll('[data-chapter]'));
      chaptersRef.current = all.filter(el => el.getAttribute('data-no-snap') !== 'true');
    };
    refreshChapters();
    window.addEventListener('resize', refreshChapters);
    const t = setInterval(refreshChapters, 2000);
    return () => {
      window.removeEventListener('resize', refreshChapters);
      clearInterval(t);
    };
  }, []);

  useEffect(() => {
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

    const smoothScrollTo = (targetY) => {
      const startY = window.scrollY;
      const distance = targetY - startY;
      let startTime = null;

      const animation = (currentTime) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const rawProgress = Math.min(timeElapsed / SNAP_DURATION, 1);
        
        // Sextic curve for the instant "L" start
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

    const snapLogic = () => {
      if (userActive.current || isSnapping.current) return;
      if (Math.abs(scrollVelocity.current) > 15) return;

      const target = getNearest();
      if (!target) return;

      // 1. Tall section logic (Priority for Desktop Galleries)
      if (target.rect.height > window.innerHeight * 1.5) {
        // LOCK TO TOP: If top border is close to the top, it snaps to its position
        // This is key for the "Integration" on desktop.
        if (Math.abs(target.rect.top) < window.innerHeight * 0.45) {
          smoothScrollTo(window.scrollY + target.rect.top);
          return;
        }
      }

      // 2. Zone Stability Check
      if (target.dist < STABLE_ZONE) return;

      // 3. Edge Guard
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scrollY = window.scrollY;
      if (scrollY < EDGE_GUARD || scrollY > maxScroll - EDGE_GUARD) return;

      // 4. Center-Point Snap
      const viewCenter = window.innerHeight / 2;
      const elCenter = target.rect.top + target.rect.height / 2;
      smoothScrollTo(window.scrollY + (elCenter - viewCenter));
    };

    const onScroll = () => {
      const currentY = window.scrollY;
      scrollVelocity.current = currentY - lastScrollY.current;
      lastScrollY.current = currentY;

      if (isSnapping.current) return;
      clearTimeout(timer.current);
      timer.current = setTimeout(snapLogic, DEBOUNCE_MS);
    };

    const cancelSnap = () => {
      userActive.current = true;
      clearTimeout(timer.current);
      if (animFrame.current) {
        cancelAnimationFrame(animFrame.current);
        isSnapping.current = false;
      }
    };

    const onWheelStart  = () => cancelSnap();
    const onWheelEnd    = () => {
      userActive.current = false;
      clearTimeout(timer.current);
      timer.current = setTimeout(snapLogic, DEBOUNCE_MS);
    };

    let wheelEndTimer = null;
    const onWheel = () => {
      onWheelStart();
      clearTimeout(wheelEndTimer);
      wheelEndTimer = setTimeout(onWheelEnd, 100);
    };

    const onTouchStart = () => cancelSnap();
    const onTouchEnd   = () => {
      userActive.current = false;
      clearTimeout(timer.current);
      timer.current = setTimeout(snapLogic, DEBOUNCE_MS + 50);
    };

    window.addEventListener('scroll',     onScroll,     { passive: true });
    window.addEventListener('wheel',      onWheel,      { passive: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend',   onTouchEnd,   { passive: true });

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
