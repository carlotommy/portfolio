/**
 * Home.jsx
 * ─────────────────────────────────────────────────────────────
 * Assembles the home page:
 *   1. <Hero />
 *   2. <HomeStory />
 */

import { Helmet }        from 'react-helmet-async';
import Hero              from '@sections/Hero';
import HomeStory         from '@sections/HomeStory';
import { SEO }           from '@data/seoData';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>{SEO.home.title}</title>
        <meta name="description" content={SEO.home.description} />
      </Helmet>

      {/* Full-viewport animated title */}
      <Hero />

      {/* Scroll-driven narrative — builds itself as you scroll */}
      <HomeStory />
    </>
  );
}
