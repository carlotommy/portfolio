import styles from './Services.module.css';

const services = [
  {
    id: 1,
    title: 'Pubblicità',
    description: "Spot pubblicitari e campagne visive per brand di ogni dimensione. Dall'ideazione alla distribuzione, creiamo contenuti che parlano al pubblico giusto.",
    features: ['Spot TV & Web', 'Campagne Social', 'Brand Storytelling'],
    icon: (
      <svg className={styles.icon} viewBox="0 0 24 24" fill="none">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 2,
    title: 'Cortometraggi',
    description: "Regia e produzione di cortometraggi con approccio cinematografico. Narrativa visiva potente, dall'idea al master da festival.",
    features: ['Sviluppo Script', 'Direzione Artistica', 'Post-Produzione Completa'],
    icon: (
      <svg className={styles.icon} viewBox="0 0 24 24" fill="none">
        <rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M8 21h8M12 17v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 3,
    title: 'Video Musicali',
    description: "Videoclip che amplificano la musica con immagini. Ogni video è progettato attorno al suono, costruendo un'identità visiva per l'artista.",
    features: ['Concept & Regia', 'Coreografia Visiva', 'Color Grading Avanzato'],
    icon: (
      <svg className={styles.icon} viewBox="0 0 24 24" fill="none">
        <path d="M9 18V5l12-2v13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="6" cy="18" r="3" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="18" cy="16" r="3" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    id: 4,
    title: 'Sound Design',
    description: "Composizione musicale, sound design e mixing professionale. Il suono non è un'aggiunta — è metà della storia. Produciamo e masteriziamo in-house.",
    features: ['Composizione Originale', 'Mixing & Mastering', 'Foley & Ambienti'],
    icon: (
      <svg className={styles.icon} viewBox="0 0 24 24" fill="none">
        <path d="M3 18v-6a9 9 0 0 1 18 0v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
  },
];

export default function Services() {
  return (
    <section id="services" className={styles.section}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">SERVIZI</h2>
          <p className={styles.subtitle}>Trasformo idee creative in contenuti di impatto</p>
        </div>

        <div className={styles.grid}>
          {services.map((s) => (
            <div key={s.id} className={styles.card}>
              <div className={styles.cardTop}>
                <div className={styles.iconWrap}>{s.icon}</div>
                <span className={styles.num}>0{s.id}</span>
              </div>
              <h3 className={styles.title}>{s.title}</h3>
              <div className={styles.details}>
                <p className={styles.desc}>{s.description}</p>
                <ul className={styles.features}>
                  {s.features.map((f) => (
                    <li key={f}>
                      <svg viewBox="0 0 24 24" fill="none">
                        <polyline points="20 6 9 17 4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={styles.hoverLine} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
