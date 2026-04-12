import { useState, useEffect, useRef } from 'react';
import { VIDEOS as videos } from '@data/constants';
import styles from './VideosMobile.module.css';

const N = videos.length;

export default function VideosMobile() {
  const [scrollPos, setScrollPos] = useState(0);
  const sectionRef   = useRef(null);
  const targetScroll = useRef(0);
  const animFrame    = useRef(null);

  // 1. Sync Section Scroll to Gallery Progress
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const { top, height } = sectionRef.current.getBoundingClientRect();
      const viewportH = window.innerHeight;
      
      const maxTravel = height - viewportH;
      if (maxTravel <= 0) return;

      const progress = Math.max(0, Math.min(1, -top / maxTravel));
      targetScroll.current = progress * (N - 1);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // 2. Smooth Lerp Loop per un'animazione burrosa del rullo
  useEffect(() => {
    const animate = () => {
      setScrollPos(prev => {
        const diff = targetScroll.current - prev;
        if (Math.abs(diff) < 0.001) return targetScroll.current;
        return prev + diff * 0.12; 
      });
      animFrame.current = requestAnimationFrame(animate);
    };
    animFrame.current = requestAnimationFrame(animate);
    return () => { if (animFrame.current) cancelAnimationFrame(animFrame.current); };
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className={styles.mobileSection} 
      data-no-snap="true"
      // Diamo spazio per permettere all'utente di "girare" la ruota scrollando giù
      style={{ height: `calc(100vh + ${N * 50}vh)` }} 
    >
      <div className={styles.stickyWrapper}>
        <div className={styles.header}>
          <h2 className="section-title">VIDEO GALLERIA</h2>
        </div>

        <div className={styles.stage}>
          {videos.map((vid, i) => {
            const rawOffset = i - scrollPos;
            
            // Ottimizzazione: non renderizziamo le card troppo lontane dalla vista
            if (rawOffset < -2 || rawOffset > 2) return null;

            const absOffset = Math.abs(rawOffset);

            // LOGICA RUOTA FISSA ESTERNA:
            // L'elemento si sposta in Y in base all'offset per creare spazio verticale.
            const y = rawOffset * 150; // distanza in px sull'asse Y tra una card e l'altra

            // Inclinazione: se è sotto il centro (rawOffset > 0), si piega mostrando la sua sommità verso di noi (angolo positivo, la base fugge = ruota esterna).
            // Se è sopra il centro (rawOffset < 0), angolo negativo.
            const rotateX = rawOffset * 45; // gradi effettivi calcolati proporzionalmente
            
            // Spinta in profondità 3D man mano che si allontanano dal centro
            const z = absOffset * -250; 
            
            // Scala e Opacità per aggiungere profondità "cinematografica" 
            const scale = Math.max(0.6, 1 - (absOffset * 0.15)); 
            const opacity = Math.max(0, 1 - (absOffset * 0.8));

            // Z-index garantisce che la card centrale sia sempre sovrapposta
            const zIndex = Math.round((2 - absOffset) * 10);

            return (
              <div 
                key={vid.id} 
                className={styles.slide}
                style={{
                  transform: `translate(-50%, -50%) translateY(${y}px) translateZ(${z}px) rotateX(${rotateX}deg) scale(${scale})`,
                  opacity,
                  zIndex
                }}
              >
                <div className={styles.playerWrapper}>
                  <a 
                    href={vid.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={styles.displayArea}
                  >
                    <img 
                      src={`/images/video${vid.id}-thumb.jpg`} 
                      alt={vid.label} 
                      loading="lazy" 
                    />
                    <div className={styles.playBtnBig}>
                      <svg viewBox="0 0 24 24" fill="none">
                        <path d="M8 5v14l11-7z" fill="currentColor" />
                      </svg>
                    </div>
                  </a>
                </div>

                <div className={styles.infoWrapper}>
                  <span className={styles.label}>PROGETTO SELEZIONATO</span>
                  <h3 className={styles.title}>{vid.label}</h3>
                  <p className={styles.description}>{vid.desc}</p>
                  <span className={styles.date}>{vid.date}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
