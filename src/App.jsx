import { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import { TransitionProvider } from '@context/TransitionContext';
import LoadingScreen    from '@ui/LoadingScreen';
import Navigation       from '@layout/Navigation';
import Footer           from '@layout/Footer';
import ClickSpark       from '@ui/ClickSpark';
import ScrollProgress   from '@ui/ScrollProgress';
import DotGrid          from '@ui/DotGrid';
import useChapterSnap   from '@hooks/useChapterSnap';

const Home    = lazy(() => import('./pages/Home'));
const Work    = lazy(() => import('./pages/Work'));
const Servizi = lazy(() => import('./pages/Servizi'));
const About   = lazy(() => import('./pages/About'));

function FixedTitle() {
  const navigate = useNavigate();
  
  const goHome = () => {
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={goHome}
      style={{
        position: 'fixed',
        top: 'max(1.5rem, env(safe-area-inset-top))',
        left: '2rem',
        zIndex: 1000,
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: 0,
        fontFamily: "'Roboto Condensed', Arial, sans-serif",
        fontSize: 'clamp(1rem, 2vw, 1.5rem)',
        fontWeight: 700,
        color: 'var(--text-primary)',
        letterSpacing: '-0.01em',
        transition: 'transform 0.3s ease, opacity 0.3s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.05)';
        e.currentTarget.style.opacity = '0.9';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.opacity = '1';
      }}
      aria-label="Torna alla home"
    >
      ASSE ZERO
    </button>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  // Magnetic chapter snapping — runs globally
  useChapterSnap();

  return (
    <TransitionProvider>
      <Helmet>
        <title>ASSE ZERO | Home</title>
        <meta name="description" content="Studio di produzione creativa. Advertising, Short Films, Music Videos, Sound Design." />
      </Helmet>

      <DotGrid />
      <FixedTitle />
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      <ClickSpark />
      <ScrollProgress />
      
      <main>
        <Navigation />
        <Suspense fallback={null}>
          <Routes>
            <Route path="/"        element={<Home />} />
            <Route path="/work"    element={<Work />} />
            <Route path="/servizi" element={<Servizi />} />
            <Route path="/about"   element={<About />} />
            <Route path="*"        element={<Home />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
    </TransitionProvider>
  );
}