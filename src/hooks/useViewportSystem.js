import { useEffect } from 'react';

function getViewportSize() {
  const vv = window.visualViewport;
  return {
    width: Math.round(vv?.width ?? window.innerWidth),
    height: Math.round(vv?.height ?? window.innerHeight),
  };
}

function getRootPxVar(root, name, fallback) {
  const raw = getComputedStyle(root).getPropertyValue(name).trim();
  const parsed = Number.parseFloat(raw);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export default function useViewportSystem() {
  useEffect(() => {
    const root = document.documentElement;
    const coarseQuery = window.matchMedia('(pointer: coarse)');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let rafId = null;

    const sync = () => {
      const { width, height } = getViewportSize();
      const isMobile = width < 900;
      const focusRatio = isMobile ? 0.5 : 0.535;

      root.style.setProperty('--viewport-width', `${width}px`);
      root.style.setProperty('--viewport-height', `${height}px`);
      root.style.setProperty('--viewport-focus-ratio', `${focusRatio}`);

      const stickyTop = getRootPxVar(root, '--viewport-sticky-top', 0);
      const usableTop = isMobile ? 0 : stickyTop;
      const usableHeight = Math.max(height - usableTop, height * 0.72);
      const focusY = Math.round(usableTop + usableHeight * focusRatio);

      root.style.setProperty('--viewport-focus-y', `${focusY}px`);
      root.dataset.pointer = coarseQuery.matches ? 'coarse' : 'fine';
      root.dataset.motion = motionQuery.matches ? 'reduce' : 'full';
    };

    const scheduleSync = () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        rafId = null;
        sync();
      });
    };

    sync();

    const vv = window.visualViewport;
    window.addEventListener('resize', scheduleSync);
    window.addEventListener('orientationchange', scheduleSync);
    vv?.addEventListener('resize', scheduleSync);
    vv?.addEventListener('scroll', scheduleSync);
    coarseQuery.addEventListener?.('change', scheduleSync);
    motionQuery.addEventListener?.('change', scheduleSync);

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener('resize', scheduleSync);
      window.removeEventListener('orientationchange', scheduleSync);
      vv?.removeEventListener('resize', scheduleSync);
      vv?.removeEventListener('scroll', scheduleSync);
      coarseQuery.removeEventListener?.('change', scheduleSync);
      motionQuery.removeEventListener?.('change', scheduleSync);
    };
  }, []);
}
