import { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import { TransitionProvider } from '@context/TransitionContext';
import LoadingScreen    from '@ui/LoadingScreen';
import Navigation       from '@layout/Navigation';
import Footer           from '@layout/Footer';
import LightRays        from '@ui/LightRays';
import ClickSpark       from '@ui/ClickSpark';
import ScrollProgress   from '@ui/ScrollProgress';
import useChapterSnap   from '@hooks/useChapterSnap';

const Home    = lazy(() => import('./pages/Home'));
const Work    = lazy(() => import('./pages/Work'));
const Servizi = lazy(() => import('./pages/Servizi'));
const About   = lazy(() => import('./pages/About'));

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

      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      <ClickSpark />
      <ScrollProgress />
      <LightRays />
      
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