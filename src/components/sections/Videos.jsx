import { useRef }          from 'react';
import useDragScroll       from '@hooks/useDragScroll';
import useAutoScroll       from '@hooks/useAutoScroll';
import FilmFrame           from '@components/ui/FilmFrame';
import { VIDEOS }          from '@data/constants';
import styles              from './Videos.module.css';

export default function Videos() {
  const containerRef = useRef(null);
  useDragScroll(containerRef, 'y', 1.5);
  useAutoScroll(containerRef, 'y', 0.6);

  return (
    <section id="videos" className={styles.videosSection}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">I MIEI VIDEO</h2>
        </div>
        <FilmFrame variant="v" speed="12s" className={styles.frameOuter}>
          <div className={styles.scrollArea} ref={containerRef} data-cursor="drag">
            <div className={styles.grid}>
              {VIDEOS.map((video) => (
                <a key={video.id} href={video.url} target="_blank" rel="noopener noreferrer" data-cursor="view" className={styles.card}>
                  <div className={styles.cardInner}>
                    <img src={`/images/video${video.id}-thumb.jpg`} alt={`Video ${video.id}`} loading="eager" decoding="async" width="405" height="720" />
                    <div className={styles.cardOverlay}>
                      <div className={styles.play}>
                        <svg viewBox="0 0 24 24" fill="none"><path d="M8 5v14l11-7z" fill="currentColor" /></svg>
                      </div>
                      <div className={styles.info}>
                        <span className={styles.label}>{video.label}</span>
                        <span className={styles.date}>{video.date}</span>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </FilmFrame>
      </div>
    </section>
  );
}
