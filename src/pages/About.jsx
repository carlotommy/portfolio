import { Helmet } from 'react-helmet-async';
import About          from '@sections/About';
import { SEO }           from '@data/seoData';

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>{SEO.about.title}</title>
        <meta name="description" content={SEO.about.description} />
      </Helmet>
      <About />
    </>
  );
}
