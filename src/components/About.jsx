import { useEffect, useRef } from 'react';
import styles from './About.module.css';

const disciplines = [
  { label: 'REGIA', sub: 'Direction' },
  { label: 'PUBBLICITÀ', sub: 'Advertising' },
  { label: 'CORTI', sub: 'Short Films' },
  { label: 'VIDEOCLIP', sub: 'Music Videos' },
  { label: 'SOUND DESIGN', sub: 'Audio' },
  { label: 'COLOR GRADING', sub: 'Post-Production' },
];

const stats = [
  { value: '50+', label: 'Progetti' },
  { value: '8+', label: 'Anni' },
  { value: '30+', label: 'Clienti' },
  { value: '12+', label: 'Awards' },
];

export default function About() {
  const counterRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.inView);
          }
        });
      },
      { threshold: 0.15 }
    );

    counterRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className={styles.aboutSection}>
      {/* Film-strip top decoration */}
      <div className={styles.filmStrip}>
        {Array.from({ length: 20 }).map((_, i) => (
          <span key={i} className={styles.filmHole} />
        ))}
      </div>

      <div className={`container ${styles.innerContainer}`}>

        {/* ── Header ─────────────────────────────────────────────────── */}
        <div className={styles.header}>
          <span className={styles.labelTag}>// 001 — CHI SIAMO</span>
          <h2 className={styles.mainTitle}>
            VISIONE.<br />
            <em>Tecnica.</em><br />
            IMPATTO.
          </h2>
        </div>

        {/* ── Manifesto + Image ──────────────────────────────────────── */}
        <div className={styles.manifestoRow}>
          <div className={styles.manifestoLeft}>
            <div className={styles.directorCard}>
              <div className={styles.imageWrapper}>
                <img
                  src="/photos/profilo.jpeg"
                  alt="Gerardo Romani"
                  className={styles.directorImage}
                />
                <div className={styles.imageOverlay} />
                <div className={styles.frameBracketTL} />
                <div className={styles.frameBracketBR} />
              </div>
              <div className={styles.directorMeta}>
                <span className={styles.directorName}>Gerardo Romani</span>
                <span className={styles.directorRole}>Director · Sound Designer</span>
              </div>
            </div>
          </div>

          <div className={styles.manifestoRight}>
            <p className={styles.manifesto}>
              Ogni fotogramma è una decisione. Ogni suono, un'intenzione.
              Creo contenuti visivi che non si limitano a comunicare —
              <strong> costruiscono un'esperienza</strong>.
            </p>
            <p className={styles.manifestoSub}>
              Dalla pre-produzione al master finale, lavoro con brand, artisti e
              registi per trasformare idee in immagini che restano impresse.
              Pubblicità, corti, videoclip musicali, sound design: ogni progetto
              è trattato con la stessa cura di un film.
            </p>

            <div className={styles.ctaRow}>
              <a href="#services" className={styles.ctaPrimary}>
                Scopri i servizi
              </a>
              <a href="#contact" className={styles.ctaSecondary}>
                Inizia un progetto →
              </a>
            </div>
          </div>
        </div>

        {/* ── Stats ─────────────────────────────────────────────────── */}
        <div className={styles.statsRow}>
          {stats.map((s, i) => (
            <div
              key={i}
              className={styles.statBlock}
              ref={(el) => (counterRefs.current[i] = el)}
            >
              <span className={styles.statValue}>{s.value}</span>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </div>

        {/* ── Discipline Grid ────────────────────────────────────────── */}
        <div className={styles.disciplineSection}>
          <span className={styles.disciplineTag}>// DISCIPLINE</span>
          <div className={styles.disciplineGrid}>
            {disciplines.map((d, i) => (
              <div key={i} className={styles.disciplineItem}>
                <span className={styles.disciplineIndex}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className={styles.disciplineText}>
                  <span className={styles.disciplineLabel}>{d.label}</span>
                  <span className={styles.disciplineSub}>{d.sub}</span>
                </div>
                <div className={styles.disciplineLine} />
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Film-strip bottom decoration */}
      <div className={`${styles.filmStrip} ${styles.filmStripBottom}`}>
        {Array.from({ length: 20 }).map((_, i) => (
          <span key={i} className={styles.filmHole} />
        ))}
      </div>
    </section>
  );
}