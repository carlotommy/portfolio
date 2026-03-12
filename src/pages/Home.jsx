import { Helmet } from 'react-helmet-async';
import Hero  from '../components/Hero';
import About from '../components/About';
import useScrollReveal from '../hooks/useScrollReveal';

export default function Home() {
  useScrollReveal('section');

  return (
    <>
      <Helmet>
        <title>ASSE ZERO | Home</title>
        <meta name="description" content="ASSE ZERO – Studio di produzione creativa. Advertising, Short Films, Music Videos, Sound Design." />
      </Helmet>

      <Hero />
      <About />
    </>
  );
}
