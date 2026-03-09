import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section id="hero" className={styles.heroSection}>
      <div className={styles.heroContent}>
        <div className={styles.quoteWrapper}>
          <h1 className={styles.heroTitle}>
            La creatività è l'intelligenza che si diverte
          </h1>
          <p className={styles.heroAuthor}>— Albert Einstein —</p>
        </div>

        <div className={styles.scrollIndicator}>
          <div className={styles.scrollLine} />
          <span className={styles.scrollText}>SCROLL</span>
        </div>
      </div>
    </section>
  );
}
