import { PHOTOS as photosData } from '@data/constants';
import styles from './PhotosMobile.module.css';

export default function PhotosMobile() {
  return (
    <div className={styles.mobileContainer}>
      <div className={styles.header}>
        <h2 className="section-title">LE MIE FOTO</h2>
        <p className={styles.subtitle}>
          Scatti dal set — pubblicità, cortometraggi, videoclip
        </p>
      </div>

      <div className={styles.scrollArea}>
        {photosData.map((photo, i) => (
          <section key={i} className={styles.slide} data-chapter="true">
            <div className={styles.imageWrapper}>
              <img 
                src={photo.src} 
                alt={photo.title} 
                loading="lazy" 
              />
            </div>
            
            <div className={styles.infoWrapper}>
              <span className={styles.category}>{photo.category}</span>
              <h3 className={styles.title}>{photo.title}</h3>
              <p className={styles.desc}>{photo.desc}</p>
              <span className={styles.date}>{photo.date}</span>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
