import { Helmet } from 'react-helmet-async';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Photos from './components/Photos';
import Videos from './components/Videos';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import useScrollReveal from './hooks/useScrollReveal';

export default function App() {
  // Attach IntersectionObserver to all <section> elements for scroll reveal
  useScrollReveal('section');

  return (
    <>
      <Helmet>
        <title>Portfolio | Gerardo Romani</title>
        <meta name="description" content="Portfolio creativo di Gerardo Romani" />
      </Helmet>

      {/* Animated Background Grid */}
      <div className="grid-background" />

      <Navigation />
      <main>
        <Hero />
        <About />
        <Photos />
        <Videos />
        <Services />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
