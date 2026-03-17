import { useState, useCallback, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import LoadingScreen from './components/LoadingScreen';
import Navigation    from './components/Navigation';
import Footer        from './components/Footer';
import LightRays     from './components/LightRays';
import ClickSpark    from './components/ClickSpark';

import Home    from './pages/Home';
import Work    from './pages/Work';
import Servizi from './pages/Servizi';

export default function App() {
  const [loading, setLoading] = useState(true);
  const done = useCallback(() => setLoading(false), []);
  const { pathname } = useLocation();

  /* Scroll to top on page change */
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return (
    <>
      {/* LoadingScreen must receive onComplete so it can call back when
          the exit animation finishes; without this prop the panels stay
          fixed on top of everything (z-index 9999) and swallow all events */}
      {loading && <LoadingScreen onComplete={done} />}
      <ClickSpark />
      <LightRays/>
      <main>
        <Navigation />
        <Routes>
          <Route path="/"        element={<Home />} />
          <Route path="/work"    element={<Work />} />
          <Route path="/servizi" element={<Servizi />} />
          {/* Fallback */}
          <Route path="*"        element={<Home />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}