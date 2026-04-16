import { useEffect, useRef } from 'react';
import { easeOutStrong } from '@utils/math';

function getViewportHeight() {
  const raw = getComputedStyle(document.documentElement).getPropertyValue('--viewport-height').trim();
  const parsed = Number.parseFloat(raw);
  return Number.isFinite(parsed) ? parsed : window.innerHeight;
}

function getViewportFocusY() {
  const raw = getComputedStyle(document.documentElement).getPropertyValue('--viewport-focus-y').trim();
  const parsed = Number.parseFloat(raw);
  return Number.isFinite(parsed) ? parsed : getViewportHeight() * 0.58;
}

function clampScrollY(targetY) {
  const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  return Math.min(Math.max(0, targetY), maxScroll);
}

function canAnimateCentering() {
  const reduced =
    document.documentElement.dataset.motion === 'reduce' ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // Se l’utente richiede meno motion, lo rispettiamo sempre.
  // Evitiamo ulteriori condizioni (coarse pointer / breakpoint) per non disabilitare
  // involontariamente l’effetto su desktop “strani”.
  return !reduced;
}

function hasInteractiveFocus() {
  const active = document.activeElement;
  return !!active && active.matches('input, textarea, select, button, [contenteditable="true"]');
}

function easeDurationMs(distancePx) {
  // Mappatura semplice: più sei lontano, più dura; cap per restare “preciso e fluido”.
  return Math.round(Math.min(520, 180 + Math.abs(distancePx) * 0.22));
}

export default function useAccentramento() {
  const timerRef = useRef(null);
  const animFrameRef = useRef(null);
  const isCenteringRef = useRef(false);
  const lastScrollAtRef = useRef(0);

  useEffect(() => {
    if (!canAnimateCentering()) return;

    const clearTimer = () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };

    const stopAnimation = () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }
      isCenteringRef.current = false;
    };

    const getTargetEl = (candidateEl) => {
      const inner = candidateEl.querySelector('[data-center-target="true"]');
      return inner ?? candidateEl;
    };

    const getOffsetPx = (candidateEl, targetEl) => {
      const raw =
        targetEl.getAttribute('data-center-offset') ??
        candidateEl.getAttribute('data-center-offset') ??
        '0';
      const parsed = Number.parseFloat(raw);
      return Number.isFinite(parsed) ? parsed : 0;
    };

    const getNearestCandidate = () => {
      const focusY = getViewportFocusY();

      const candidates = Array.from(document.querySelectorAll('[data-center]')).filter((el) => {
        // Manteniamo la semantica del vecchio snap: disabilitiamo solo se l’elemento candidato
        // ha direttamente data-no-center="true" (non i suoi antenati).
        return el.getAttribute('data-no-center') !== 'true';
      });

      let best = null;
      let bestDist = Infinity;

      for (const candidateEl of candidates) {
        const targetEl = getTargetEl(candidateEl);
        const rect = targetEl.getBoundingClientRect();
        const offsetPx = getOffsetPx(candidateEl, targetEl);
        const centerY = rect.top + rect.height / 2 + offsetPx;

        const dist = Math.abs(centerY - focusY);
        if (dist < bestDist) {
          bestDist = dist;
          best = { candidateEl, targetEl, centerY, dist };
        }
      }

      return best;
    };

    const smoothScrollTo = (targetScrollY) => {
      const startY = window.scrollY;
      const distance = targetScrollY - startY;
      if (Math.abs(distance) < 1) return;

      stopAnimation();
      isCenteringRef.current = true;

      const durationMs = easeDurationMs(distance);
      const finalY = clampScrollY(targetScrollY);

      let startTime = null;
      const frame = (now) => {
        if (startTime === null) startTime = now;
        const progress = Math.min((now - startTime) / durationMs, 1);
        const eased = easeOutStrong(progress);

        window.scrollTo(0, clampScrollY(startY + Math.round(distance * eased)));

        if (progress < 1) {
          animFrameRef.current = requestAnimationFrame(frame);
        } else {
          stopAnimation();
          window.scrollTo(0, finalY);
        }
      };

      animFrameRef.current = requestAnimationFrame(frame);
    };

    const settle = () => {
      if (!canAnimateCentering()) return;
      if (isCenteringRef.current) return;
      if (hasInteractiveFocus()) return;

      const nearest = getNearestCandidate();
      if (!nearest) return;

      const focusY = getViewportFocusY();
      const targetScrollY = window.scrollY + (nearest.centerY - focusY);

      // Evita micro-movimenti inutili.
      if (Math.abs(targetScrollY - window.scrollY) < 10) return;

      smoothScrollTo(targetScrollY);
    };

    const scheduleSettle = () => {
      clearTimer();
      timerRef.current = setTimeout(settle, 160);
    };

    const onScroll = () => {
      lastScrollAtRef.current = Date.now();
      if (isCenteringRef.current) return;
      scheduleSettle();
    };

    const cancelOnUserInput = () => {
      clearTimer();
      stopAnimation();
    };

    const onPointerDown = (event) => {
      if (event.target.closest('[data-no-center-during-interaction="true"]') || hasInteractiveFocus()) {
        cancelOnUserInput();
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    window.addEventListener('focusin', cancelOnUserInput);

    return () => {
      clearTimer();
      stopAnimation();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('focusin', cancelOnUserInput);
    };
  }, []);
}

