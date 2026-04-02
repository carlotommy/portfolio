import { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './Photos.module.css';

const photos = [
  { title: 'Campagna Autunnale',        category: 'Pubblicità',      date: 'Gennaio 2026',   src: '/photos/1.jpeg' },
  { title: 'Brand Identity Shoot',      category: 'Pubblicità',      date: 'Dicembre 2025',  src: '/photos/2.jpeg' },
  { title: 'Luce di Mezzogiorno',       category: 'Cortometraggio',  date: 'Novembre 2025',  src: '/photos/3.jpeg' },
  { title: 'Il Confine',                category: 'Cortometraggio',  date: 'Ottobre 2025',   src: '/photos/4.jpeg' },
  { title: 'Neon Nights',               category: 'Video Musicale',  date: 'Settembre 2025', src: '/photos/5.jpeg' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

function Card({ card, index, hovered, setHovered, onOpen }) {
  const isDimmed = hovered !== null && hovered !== index;
  const isActive = hovered === index;

  return (
    <motion.div
      variants={cardVariants}
      data-cursor="view"
      className={[
        styles.card,
        isDimmed ? styles.dimmed : '',
        isActive ? styles.active : '',
      ].join(' ')}
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      onClick={() => onOpen(card)}
    >
      <img
        src={card.src}
        alt={card.title}
        className={styles.cardImage}
        loading="lazy"
        decoding="async"
      />
      <div className={`${styles.overlay} ${isActive ? styles.overlayVisible : ''}`}>
        <span className={styles.category}>{card.category}</span>
        <span className={styles.title}>{card.title}</span>
        <span className={styles.date}>{card.date}</span>
      </div>
    </motion.div>
  );
}

export default function Photos() {
  const [hovered, setHovered] = useState(null);
  const [lightbox, setLightbox] = useState(null);

  return (
    <section id="photos" className={styles.section}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">LE MIE FOTO</h2>
          <p className={styles.subtitle}>
            Scatti dal set — pubblicità, cortometraggi, videoclip, sound design
          </p>
        </motion.div>

        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {photos.map((card, index) => (
            <Card
              key={index}
              card={card}
              index={index}
              hovered={hovered}
              setHovered={setHovered}
              onOpen={setLightbox}
            />
          ))}
        </motion.div>
      </div>

      {lightbox && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={styles.lightbox}
          onClick={() => setLightbox(null)}
        >
          <button
            className={styles.lbClose}
            aria-label="Chiudi"
            onClick={() => setLightbox(null)}
          >✕</button>
          <div className={styles.lbInner} onClick={(e) => e.stopPropagation()}>
            <img src={lightbox.src} alt={lightbox.title} />
            <span className={styles.lbMeta}>
              <span className={styles.lbCategory}>{lightbox.category}</span>
              {' — '}
              <span className={styles.lbTitle}>{lightbox.title}</span>
            </span>
          </div>
        </motion.div>
      )}
    </section>
  );
}
