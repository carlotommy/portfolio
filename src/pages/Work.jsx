import { Helmet } from 'react-helmet-async';
import Photos from '@sections/Photos';
import Videos from '@sections/Videos';
import { SEO }  from '@data/seoData';

export default function Work() {
  return (
    <>
      <Helmet>
        <title>{SEO.work.title}</title>
        <meta name="description" content={SEO.work.description} />
      </Helmet>

      <Photos />
      
      {/* Separatore Cinematico */}
      <div style={{ height: '20vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-surface)' }}>
        <div style={{ width: '1px', height: '60px', background: 'linear-gradient(to bottom, transparent, var(--teal-300), transparent)', opacity: 0.4 }}></div>
      </div>

      <Videos />
    </>
  );
}
