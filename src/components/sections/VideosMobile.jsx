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

  const [feedback, setFeedback] = useState(false);
  const lastIndex = useRef(0);

  // 2. Smooth Lerp Loop per un'animazione burrosa del rullo
  useEffect(() => {
    const animate = () => {
      setScrollPos(prev => {
        const diff = targetScroll.current - prev;
        if (Math.abs(diff) < 0.0003) {
          // Quando siamo molto vicini al target, fermiamo l'animazione per risparmiare CPU
          if (animFrame.current) {
            cancelAnimationFrame(animFrame.current);
            animFrame.current = null;
          }
          return targetScroll.current;
        }
        return prev + diff * 0.12; 
      });
      animFrame.current = requestAnimationFrame(animate);
    };

    const handleScroll = () => {
      // Se l'animazione non è già in esecuzione, avviala
      if (!animFrame.current) {
        animFrame.current = requestAnimationFrame(animate);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Avvio iniziale
    animFrame.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animFrame.current) cancelAnimationFrame(animFrame.current);
    };
  }, []);

  // 3. Simulo Feedback Aptico (Visivo) allo snap
  const activeIndex = Math.max(0, Math.min(N - 1, Math.round(scrollPos)));
  useEffect(() => {
    if (activeIndex !== lastIndex.current) {
      setFeedback(true);
      const tt = setTimeout(() => setFeedback(false), 300);
      lastIndex.current = activeIndex;
      return () => clearTimeout(tt);
    }
  }, [activeIndex]);

  return (
    <section 
      ref={sectionRef} 
      className={styles.mobileSection} 
      data-no-snap="true"
      // Diamo spazio per permettere all'utente di "girare" la ruota scrollando giù
      style={{ height: `calc(100vh + ${N * 50}vh)` }} 
    >
      <div className={styles.stickyWrapper}>
        <div 
          className={styles.header}
          style={{ 
            opacity: Math.max(0, 1 - scrollPos * 8), 
            transform: `translateY(${scrollPos * -40}px)`,
            pointerEvents: scrollPos > 0.1 ? 'none' : 'auto',
            transition: 'opacity 0.4s ease, transform 0.4s ease'
          }}
        >
          <h2 className="section-title">VIDEO GALLERIA</h2>
        </div>

        <div className={styles.stage}>
          {videos.map((vid, i) => {
            const rawOffset = i - scrollPos;
            
            // Ottimizzazione: non renderizziamo le card troppo lontane dalla vista
            if (rawOffset < -2 || rawOffset > 2) return null;

            const absOffset = Math.abs(rawOffset);

            // LOGICA RUOTA FISSA ESTERNA (RAFFINATA):
            // L'elemento si sposta in Y in base all'altezza del viewport per evitare sovrapposizioni.
            const y = rawOffset * (window.innerHeight * 0.22); 

            // Inclinazione ridotta (30deg) per preservare la leggibilità del testo.
            const rotateX = rawOffset * 30; 
            
            // Spinta in profondità 3D più marcata per il background.
            const z = absOffset * -300; 
            
            // RUOTA RAFFINATA: Trasparenza esponenziale e filtri dinamici
            // L'opacità svanisce molto più "cinematicamente" man mano che si allontana dal centro.
            const opacity = Math.pow(Math.max(0, 1 - absOffset * 0.7), 2.5);
            const scale   = Math.max(0.6, 1 - (absOffset * 0.18)); 

            // Filtri dinamici: più è lontano, più è sfocato e scuro.
            const blur = absOffset * 3; 
            const brightness = Math.max(0.4, 1 - absOffset * 0.5);

            // Z-index dinamico.
            const zIndex = Math.round((5 - absOffset) * 10);
            const isCenter = absOffset < 0.45;

            return (
              <div 
                key={vid.id} 
                className={`${styles.slide} ${isCenter ? styles.activeSlide : ''} ${feedback && absOffset < 0.1 ? styles.hapticPulse : ''}`}
                style={{
                  transform: `translate3d(0, ${y}px, ${z}px) rotateX(${rotateX}deg) scale(${scale})`,
                  opacity,
                  filter: `blur(${blur}px) brightness(${brightness})`,
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
                      decoding="async"
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
