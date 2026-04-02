import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { usePageTransition } from './TransitionContext';
import styles from './HomeStory.module.css';

const SERVICES = [
  { num: '01', title: 'Advertising',  sub: 'Brand · Spot TV · Campaigns',  img: '/photos/f1.jpeg' },
  { num: '02', title: 'Short Films',  sub: 'Cinema · Festival · Narrative', img: '/photos/f2.jpeg' },
  { num: '03', title: 'Music Videos', sub: 'Artists · Labels · Concerts',   img: '/photos/f3.jpeg' },
  { num: '04', title: 'Sound Design', sub: 'Score · Mix · Mastering',       img: '/photos/f4.jpeg' },
];

const revealVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
      delay: i * 0.1,
    },
  }),
};

const wordVariants = {
  hidden: { y: '110%', opacity: 0 },
  visible: (i) => ({
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1],
      delay: 0.25 + i * 0.13,
    },
  }),
};

export default function HomeStory() {
  const navigate = useNavigate();
  const transit = usePageTransition();

  const goTo = (path) => transit(() => navigate(path));

  return (
    <div id="story" className={styles.story}>
      {/* 01 — MANIFESTO */}
      <section className={styles.manifestoWrap} aria-label="Manifesto">
        <motion.div
          className={styles.manifestoInner}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10% 0px' }}
        >
          <motion.span variants={revealVariants} className={styles.chip}>
            Studio di Produzione · Roma
          </motion.span>

          <h2 className={styles.manifestoHeading} aria-label="Ogni frame racconta qualcosa.">
            {['Ogni', 'frame', 'racconta', 'qualcosa.'].map((word, i) => (
              <span key={i} className={styles.wordMask}>
                <motion.span
                  custom={i}
                  variants={wordVariants}
                  className={styles.wordInner}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h2>

          <motion.p
            variants={revealVariants}
            custom={10} /* Delay it after heading */
            className={styles.manifestoBody}
          >
            Advertising. Cortometraggi. Video musicali. Sound design.
            Quattro modi di dire la stessa cosa: ogni storia merita
            di essere raccontata con intenzione.
          </motion.p>
        </motion.div>

        <div className={styles.manifestoSide} aria-hidden="true">
          <span>ASSE ZERO</span>
          <span>PRODUCTION</span>
          <span>ROMA · MMXXVI</span>
        </div>
      </section>

      {/* 02 — SERVICES */}
      <section className={styles.servicesWrap} aria-label="Servizi">
        <motion.div
          className={styles.servicesHeader}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={revealVariants}
        >
          <span className={styles.chip}>// Cosa facciamo</span>
          <p className={styles.servicesTagline}>Quattro discipline. Un'unica visione.</p>
        </motion.div>

        <div className={styles.servicesGrid}>
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.num}
              className={styles.card}
              initial={{ clipPath: 'inset(0 0 100% 0)' }}
              whileInView={{ clipPath: 'inset(0 0 0% 0)' }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: i * 0.15 }}
              data-cursor="view"
              onClick={() => goTo('/servizi')}
              role="button"
              tabIndex={0}
              aria-label={`${s.title} — ${s.sub}`}
            >
              <div className={styles.cardBg} style={{ backgroundImage: `url(${s.img})` }} />
              <div className={styles.cardVeil} />
              <div className={styles.cardBody}>
                <span className={styles.cardNum}>{s.num}</span>
                <h3 className={styles.cardTitle}>{s.title}</h3>
                <p className={styles.cardSub}>{s.sub}</p>
              </div>
              <span className={styles.cardArrow} aria-hidden="true">↗</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 03 — DIPTYCH */}
      <section className={styles.diptych} aria-label="Dichiarazione">
        <motion.div
          className={styles.diptychPhoto}
          initial={{ clipPath: 'inset(0 100% 0 0)' }}
          whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          data-cursor="view"
        >
          <img src="/photos/f2.jpg" alt="Produzione cinematografica" />
          <span className={styles.photoCaption} aria-hidden="true">Behind the Frame</span>
        </motion.div>

        <motion.div
          className={styles.diptychText}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={revealVariants}
        >
          <span className={styles.chip}>// Il linguaggio visivo</span>
          <h2 className={styles.diptychHeading}>
            L'immagine ha <em>una grammatica.</em><br />
            Noi la <em>scriviamo.</em>
          </h2>
          <p className={styles.diptychBody}>
            Ogni inquadratura è una scelta. Ogni taglio, un ritmo.
            Dal set alle suite di post, il controllo creativo non cambia mai mano.
          </p>
          <button className={styles.ghostBtn} onClick={() => goTo('/about')}>
            Chi siamo <span aria-hidden="true">↗</span>
          </button>
        </motion.div>
      </section>
    </div>
  );
}
