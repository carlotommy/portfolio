import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import { TransitionProvider } from './components/TransitionContext';
import LoadingScreen    from './components/LoadingScreen';
import Navigation       from './components/Navigation';
import Footer           from './components/Footer';
import LightRays        from './components/LightRays';
import ClickSpark       from './components/ClickSpark';

import Home    from './pages/Home';
import Work    from './pages/Work';
import Servizi from './pages/Servizi';
import About   from './pages/About';

export default function App() {
  const [loading, setLoading] = useState(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return (
    <TransitionProvider>
      <Helmet>
        <title>ASSE ZERO | Home</title>
        <meta name="description" content="Studio di produzione creativa. Advertising, Short Films, Music Videos, Sound Design." />
      </Helmet>

      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      <ClickSpark />
      <LightRays />
      
      <main>
        <Navigation />
        <Routes>
          <Route path="/"        element={<Home />} />
          <Route path="/work"    element={<Work />} />
          <Route path="/servizi" element={<Servizi />} />
          <Route path="/about"   element={<About />} />
          <Route path="*"        element={<Home />} />
        </Routes>
      </main>

      <Footer />
    </TransitionProvider>
  );
}