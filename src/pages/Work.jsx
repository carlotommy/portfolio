import { Helmet } from 'react-helmet-async';
import Photos from '@sections/Photos';
import Videos from '@sections/Videos';
import { SEO }  from '@data/seoData';
import ChapterSeparator from '@ui/ChapterSeparator';

export default function Work() {
  return (
    <>
      <Helmet>
        <title>{SEO.work.title}</title>
        <meta name="description" content={SEO.work.description} />
      </Helmet>

      <Photos />
      
      <ChapterSeparator height="30svh" />

      <Videos />
    </>
  );
}
