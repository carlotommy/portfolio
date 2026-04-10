import { createContext, useContext, useRef, useCallback } from 'react';
import { gsap } from 'gsap';

const TransitionCtx = createContext(null);

export const usePageTransition = () => useContext(TransitionCtx);

export function TransitionProvider({ children }) {
  const panelRef = useRef(null);

  const transit = useCallback((callback) => {
    const panel = panelRef.current;
    if (!panel) { callback?.(); return; }

    gsap.timeline()
      .set(panel, { visibility: 'visible', scaleX: 0, transformOrigin: 'left center' })
      .to(panel,  { scaleX: 1, duration: 0.55, ease: 'expo.inOut' })
      .call(() => callback?.())
      .to({},     { duration: 0.08 })
      .set(panel, { transformOrigin: 'right center' })
      .to(panel,  { scaleX: 0, duration: 0.55, ease: 'expo.inOut' })
      .set(panel, { visibility: 'hidden' });
  }, []);

  return (
    <TransitionCtx.Provider value={transit}>
      {children}
      <div
        ref={panelRef}
        aria-hidden="true"
        style={{
          position:        'fixed',
          inset:           0,
          background:      'var(--teal-600)',
          zIndex:          9998,
          visibility:      'hidden',
          pointerEvents:   'none',
          transformOrigin: 'left center',
        }}
      />
    </TransitionCtx.Provider>
  );
}
