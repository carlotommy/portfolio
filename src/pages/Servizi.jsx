import { Helmet } from 'react-helmet-async';
import Services from '@sections/Services';
import Contact  from '@sections/Contact';
import { SEO }  from '@data/seoData';

export default function Servizi() {
  return (
    <>
      <Helmet>
        <title>{SEO.servizi.title}</title>
        <meta name="description" content={SEO.servizi.description} />
      </Helmet>

      <Services />
      <Contact />
    </>
  );
}
