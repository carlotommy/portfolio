import { Helmet } from 'react-helmet-async';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Photos from './components/Photos';
import Videos from './components/Videos';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LightRays from './components/LightRays';
import useScrollReveal from './hooks/useScrollReveal';

export default function App() {
  useScrollReveal('section');

  return (
    <>
      <Helmet>
        <title>Portfolio | Gerardo Romani</title>
        <meta name="description" content="Portfolio creativo di Gerardo Romani" />
      </Helmet>

      {/* WebGL Light Rays – fixed full-screen background, replaces grid-background */}
      {/*
        LightRays come unica fonte di luce su fondo nero assoluto.
        - lightSpread basso (0.7) = fascio stretto e teatrale
        - rayLength alto (3.5) = raggi lunghi che attraversano tutta la pagina
        - fadeDistance alto (2.0) = la luce si dissolve lentamente nel buio
        - pulsating = respiro organico della luce
        - noiseAmount leggero = effetto "particelle di polvere" nella luce
        - mouseInfluence alto (0.3) = l'utente muove la fonte di luce
      */}
      <LightRays
        raysOrigin="top-center"
        raysColor="#92c8d3"
        raysSpeed={0.4}
        lightSpread={0.7}
        rayLength={1.2}
        followMouse={true}
        mouseInfluence={0.1}
        noiseAmount={0}
        distortion={0}
        className="custom-rays"
        pulsating={false}
        fadeDistance={1}
        saturation={1.7}
      />

      {/* Grid rimosso: su nero puro disturberebbe l'effetto stanza buia */}

      <Navigation/>
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
