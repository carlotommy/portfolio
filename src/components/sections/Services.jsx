import { useRef, useCallback } from 'react';
import styles from './Services.module.css';
import SimpleBlurText from '@ui/SimpleBlurText';
import { SERVICES_VIDEO, SERVICES_SOCIAL } from '@data/constants';

/* ── SVG decorative graphics ───────────────────────────────────────── */
function GraphicAdv() {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.svgGraphic}>
      <rect x="10" y="10" width="180" height="180" rx="4" stroke="#DC0D00" strokeWidth="1.5" strokeDasharray="8 4" />
      <text x="100" y="115" textAnchor="middle" fontSize="72" fontWeight="900" fill="#DC0D00" opacity="0.10" fontFamily="serif">ADV</text>
      <line x1="10" y1="50"  x2="190" y2="50"  stroke="#DC0D00" strokeWidth="0.8" opacity="0.35" />
      <line x1="10" y1="160" x2="190" y2="160" stroke="#DC0D00" strokeWidth="0.8" opacity="0.35" />
      <circle cx="30"  cy="30"  r="5" fill="#DC0D00" opacity="0.5" />
      <circle cx="170" cy="30"  r="5" fill="#DC0D00" opacity="0.5" />
      <circle cx="30"  cy="170" r="5" fill="#DC0D00" opacity="0.5" />
      <circle cx="170" cy="170" r="5" fill="#DC0D00" opacity="0.5" />
    </svg>
  );
}

function GraphicFilm() {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.svgGraphic}>
      {[0,1,2,3].map((i) => (
        <g key={i}>
          <rect x={i * 50 + 5} y="20" width="12" height="16" rx="2" fill="#A21B00" opacity="0.35" />
          <rect x={i * 50 + 5} y="164" width="12" height="16" rx="2" fill="#A21B00" opacity="0.35" />
        </g>
      ))}
      <rect x="20" y="50" width="160" height="100" rx="2" stroke="#A21B00" strokeWidth="0.8" strokeOpacity="0.3" fill="#A21B00" fillOpacity="0.04" />
      <circle cx="100" cy="100" r="35" stroke="#A21B00" strokeWidth="0.6" opacity="0.2" />
      <circle cx="100" cy="100" r="18" stroke="#A21B00" strokeWidth="0.6" opacity="0.2" />
      <text x="100" y="107" textAnchor="middle" fontSize="9" fill="#A21B00" opacity="0.5" fontFamily="monospace" letterSpacing="3">FILM</text>
    </svg>
  );
}

function GraphicMusic() {
  const bars = [14, 28, 44, 56, 32, 68, 48, 36, 72, 52, 24, 60, 40, 70, 34];
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.svgGraphic}>
      {bars.map((h, i) => (
        <rect key={i} x={i * 13 + 4} y={100 - h} width="8" height={h * 2} rx="4"
          fill="#6FD1D1" opacity={0.12 + (i % 3) * 0.08} />
      ))}
      <circle cx="100" cy="100" r="60" stroke="#6FD1D1" strokeWidth="0.8" opacity="0.18" strokeDasharray="4 6" />
      <circle cx="100" cy="100" r="35" stroke="#6FD1D1" strokeWidth="0.6" opacity="0.12" />
    </svg>
  );
}

function GraphicSound() {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.svgGraphic}>
      <path d="M0 100 Q25 60 50 100 Q75 140 100 100 Q125 60 150 100 Q175 140 200 100"
        stroke="#000" strokeWidth="1.5" opacity="0.25" fill="none" />
      {[15, 30, 50, 75, 95].map((r, i) => (
        <circle key={i} cx="100" cy="100" r={r}
          stroke="#000" strokeWidth="0.5" opacity={0.18 - i * 0.02} />
      ))}
      <circle cx="100" cy="100" r="5" fill="#000" opacity="0.5" />
    </svg>
  );
}

function GraphicStrategy() {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.svgGraphic}>
      <rect x="20" y="120" width="30" height="60" rx="3" fill="#DC0D00" opacity="0.18" />
      <rect x="65" y="90"  width="30" height="90" rx="3" fill="#DC0D00" opacity="0.24" />
      <rect x="110" y="60" width="30" height="120" rx="3" fill="#DC0D00" opacity="0.30" />
      <rect x="155" y="30" width="30" height="150" rx="3" fill="#DC0D00" opacity="0.38" />
      <path d="M35 118 L80 88 L125 58 L170 28" stroke="#DC0D00" strokeWidth="1.5" opacity="0.5" strokeLinecap="round" />
      <circle cx="35" cy="118" r="3" fill="#DC0D00" opacity="0.7" />
      <circle cx="80" cy="88"  r="3" fill="#DC0D00" opacity="0.7" />
      <circle cx="125" cy="58" r="3" fill="#DC0D00" opacity="0.7" />
      <circle cx="170" cy="28" r="3" fill="#DC0D00" opacity="0.7" />
    </svg>
  );
}

function GraphicContent() {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.svgGraphic}>
      {/* Phone outline */}
      <rect x="65" y="20" width="70" height="120" rx="10" stroke="#A21B00" strokeWidth="1.5" opacity="0.4" fill="#A21B00" fillOpacity="0.04" />
      <rect x="75" y="32" width="50" height="60" rx="4" fill="#A21B00" opacity="0.10" />
      {/* Play button */}
      <polygon points="96,52 96,76 116,64" fill="#A21B00" opacity="0.35" />
      {/* Like / comment icons */}
      <circle cx="82" cy="110" r="4" fill="#A21B00" opacity="0.25" />
      <rect x="91" y="107" width="30" height="2" rx="1" fill="#A21B00" opacity="0.20" />
      <rect x="91" y="112" width="20" height="2" rx="1" fill="#A21B00" opacity="0.15" />
      {/* Notification dot */}
      <circle cx="170" cy="40" r="8" fill="#A21B00" opacity="0.20" />
      <text x="170" y="45" textAnchor="middle" fontSize="9" fill="#A21B00" opacity="0.6">+9</text>
    </svg>
  );
}

function GraphicCommunity() {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.svgGraphic}>
      {/* Nodes */}
      <circle cx="100" cy="100" r="14" fill="#6FD1D1" opacity="0.25" />
      <circle cx="100" cy="100" r="6"  fill="#6FD1D1" opacity="0.55" />
      <circle cx="45"  cy="60"  r="9"  fill="#6FD1D1" opacity="0.20" />
      <circle cx="155" cy="60"  r="9"  fill="#6FD1D1" opacity="0.20" />
      <circle cx="40"  cy="148" r="7"  fill="#6FD1D1" opacity="0.18" />
      <circle cx="160" cy="148" r="7"  fill="#6FD1D1" opacity="0.18" />
      <circle cx="100" cy="170" r="8"  fill="#6FD1D1" opacity="0.18" />
      {/* Edges */}
      <line x1="100" y1="100" x2="45"  y2="60"  stroke="#6FD1D1" strokeWidth="0.8" opacity="0.22" />
      <line x1="100" y1="100" x2="155" y2="60"  stroke="#6FD1D1" strokeWidth="0.8" opacity="0.22" />
      <line x1="100" y1="100" x2="40"  y2="148" stroke="#6FD1D1" strokeWidth="0.8" opacity="0.22" />
      <line x1="100" y1="100" x2="160" y2="148" stroke="#6FD1D1" strokeWidth="0.8" opacity="0.22" />
      <line x1="100" y1="100" x2="100" y2="170" stroke="#6FD1D1" strokeWidth="0.8" opacity="0.22" />
      <line x1="45"  y1="60"  x2="155" y2="60"  stroke="#6FD1D1" strokeWidth="0.5" opacity="0.12" />
      <line x1="40"  y1="148" x2="160" y2="148" stroke="#6FD1D1" strokeWidth="0.5" opacity="0.12" />
    </svg>
  );
}

const GRAPHICS = {
  adv: GraphicAdv, film: GraphicFilm, music: GraphicMusic, sound: GraphicSound,
  strategy: GraphicStrategy, content: GraphicContent, community: GraphicCommunity,
};

/* ── Effetto Tilt 3D (trep) ────────────────────────────────────── */
function useTilt(ref) {
  const onMouseMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    el.style.transform = `perspective(800px) rotateY(${x * 12}deg) rotateX(${-y * 10}deg) translateZ(8px)`;
  }, [ref]);

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) translateZ(0px)';
  }, [ref]);

  return { onMouseMove, onMouseLeave };
}

/* ── ServiceCard verticale ─────────────────────────────────────── */
function ServiceCard({ service, onContact }) {
  const cardRef = useRef(null);
  const { onMouseMove, onMouseLeave } = useTilt(cardRef);
  const Graphic = GRAPHICS[service.graphic];

  return (
    <div
      className={styles.card}
      ref={cardRef}
      style={{ '--accent': service.accent }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {/* Grafica decorativa */}
      <div className={styles.cardGraphic}>
        <Graphic />
        <div className={styles.cardAccentBar} style={{ background: service.accent }} />
      </div>

      {/* Header */}
      <div className={styles.cardHeader}>
        <span className={styles.cardIndex}>{service.index}</span>
        <div>
          <h3 className={styles.cardTitle}>{service.title}</h3>
          <span className={styles.cardSubtitle}>{service.subtitle}</span>
        </div>
      </div>

      {/* Descrizione */}
      <p className={styles.cardDesc}>{service.description}</p>

      {/* Tags */}
      <ul className={styles.cardTags}>
        {service.tags.map((tag) => (
          <li key={tag} className={styles.cardTag} style={{ borderColor: service.accent, color: service.accent }}>
            {tag}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button onClick={onContact} className={styles.cardCta} style={{ '--accent': service.accent }}>
        Scopri di più
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}

/* ── Category section ──────────────────────────────────────────── */
function CategorySection({ label, title, intro, services, onContact }) {
  return (
    <div className={styles.categorySection}>
      <div className={styles.categoryHeader}>
        <p className={styles.categoryLabel}>{label}</p>
        <h2 className={styles.categoryTitle}>{title}</h2>
        <p className={styles.categoryIntro}>{intro}</p>
      </div>
      <div className={styles.cardsGrid}>
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} onContact={onContact} />
        ))}
      </div>
    </div>
  );
}

/* ── Services (main export) ────────────────────────────────────── */
export default function Services() {
  const goToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className={styles.servicesSection}>
      {/* Hero header */}
      <div className={styles.sectionHeader} data-chapter="services-header">
        <p className={styles.sectionLabel}>— Cosa facciamo</p>
        <h1 className={styles.sectionTitle}>
          <SimpleBlurText as="span" text="I Nostri Servizi" />
        </h1>
        <p className={styles.sectionIntro}>
          Dalla strategia creativa alla post-produzione, ogni progetto è un viaggio
          verso qualcosa che nessuno ha mai visto prima.
        </p>
      </div>

      {/* Categoria 1: Produzione Video */}
      <div data-chapter="services-video">
        <CategorySection
          label="— 01 / Produzione"
          title="Produzione Video"
          intro="Spot pubblicitari, cortometraggi e videoclip musicali. Direzione artistica totale, dal concept al master."
          services={SERVICES_VIDEO}
          onContact={goToContact}
        />
      </div>

      {/* Divider */}
      <div className={styles.divider}>
        <span className={styles.dividerLine} />
        <span className={styles.dividerDot} />
        <span className={styles.dividerLine} />
      </div>

      {/* Categoria 2: Social Media Management */}
      <div data-chapter="services-social">
        <CategorySection
          label="— 02 / Digital"
          title="Social Media Management"
          intro="Strategia, content creation e community management per una presenza online che converte."
          services={SERVICES_SOCIAL}
          onContact={goToContact}
        />
      </div>
    </section>
  );
}
