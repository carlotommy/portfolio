import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { VIDEOS as videos } from '@data/constants';
import styles from './Videos.module.css';

export default function Videos() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const activeVideo = videos[activeIndex];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % videos.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? videos.length - 1 : prev - 1));
  };

  return (
    <section id="videos" className={styles.videosSection} ref={sectionRef}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">I MIEI VIDEO</h2>
        </motion.div>
      </div>

      <div className={styles.containerStyle} ref={contentRef}>
        
        {/* Sinistra: Miniature */}
        <div className={styles.thumbListWrapper}>
          <div className={styles.thumbList} data-cursor="drag">
            {videos.map((vid, idx) => (
              <div 
                key={vid.id} 
                className={`${styles.thumbItem} ${idx === activeIndex ? styles.activeThumb : ''}`}
                onClick={() => setActiveIndex(idx)}
                data-cursor="view"
              >
                <img 
                  src={`/images/video${vid.id}-thumb.jpg`} 
                  alt={`Thumbnail ${vid.id}`} 
                  loading="lazy" 
                />
              </div>
            ))}
          </div>
        </div>

        {/* Destra: Player Gigante */}
        <div className={styles.playerWrapper}>
          <a 
            href={activeVideo.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className={styles.displayArea}
            data-cursor="view"
          >
            <AnimatePresence mode="wait">
              <motion.img 
                key={activeVideo.id}
                src={`/images/video${activeVideo.id}-thumb.jpg`} 
                alt="Active Video Poster"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 0.8, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.4 }}
                loading="eager"
              />
            </AnimatePresence>
            <div className={styles.playBtnBig}>
              <svg viewBox="0 0 24 24" fill="none"><path d="M8 5v14l11-7z" fill="currentColor" /></svg>
            </div>
          </a>

          <div className={styles.playerBottom}>
            <div className={styles.infoBlock}>
              <AnimatePresence mode="wait">
                <motion.span 
                  key={`label-${activeVideo.id}`}
                  className={styles.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {activeVideo.label}
                </motion.span>
              </AnimatePresence>
              <h3 className={styles.title}>Project Alpha</h3> {/* Static title placeholder since data lacks one */}
              <AnimatePresence mode="wait">
                <motion.span 
                  key={`date-${activeVideo.id}`}
                  className={styles.date}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {activeVideo.date}
                </motion.span>
              </AnimatePresence>
            </div>

            <div className={styles.controls}>
              <button 
                className={styles.navBtn} 
                onClick={handlePrev} 
                aria-label="Previous Video"
                data-cursor="view"
              >
                PREV
              </button>
              <button 
                className={styles.navBtn} 
                onClick={handleNext} 
                aria-label="Next Video"
                data-cursor="view"
              >
                NEXT
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
