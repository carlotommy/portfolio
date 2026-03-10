import styles from './FilmFrame.module.css';

/**
 * FilmFrame v4 — real punch-through sprocket holes via CSS isolation.
 *
 * The strip uses `isolation: isolate`. Each hole is split into two layers:
 *  1. holePunch  — white fill + mix-blend-mode: destination-out  → cuts the hole
 *  2. holeRim    — transparent bg + visible border rendered ON TOP → frames it
 *
 * variant  'h'  → top + bottom strips   (Photos)
 *          'v'  → left + right strips   (Videos)
 * speed    animation duration — default '14s'
 */
const CELLS = 60;

function SprocketTrack({ axis, speed }) {
  const cells = Array.from({ length: CELLS });
  return (
    <div
      className={`${styles.track} ${axis === 'x' ? styles.trackX : styles.trackY}`}
      style={{ '--spd': speed }}
      aria-hidden="true"
    >
      {[0, 1].map((copy) => (
        <div
          key={copy}
          className={`${styles.inner} ${axis === 'x' ? styles.innerX : styles.innerY}`}
          aria-hidden={copy === 1 ? 'true' : undefined}
        >
          {cells.map((_, i) => (
            <span key={i} className={styles.cell}>
              <span className={styles.holeGroup}>
                {/* layer 1 — punch the hole (destination-out erases strip bg) */}
                <span className={styles.holePunch} />
                {/* layer 2 — rim + glint rendered on top of the void */}
                <span className={styles.holeRim}>
                  <span className={styles.holeGlint} />
                </span>
              </span>
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

function Strip({ pos, speed }) {
  const isH = pos === 'top' || pos === 'bot';
  return (
    <div className={`${styles.strip} ${styles[pos]}`} aria-hidden="true">
      {/* outer raised edge */}
      <div className={styles.edgeA} />
      {/* sprocket channel */}
      <div className={styles.channel}>
        <SprocketTrack axis={isH ? 'x' : 'y'} speed={speed} />
      </div>
      {/* inner edge — glows toward content */}
      <div className={styles.edgeB} />
      {/* acetate scratch grain */}
      <div className={styles.acetate} />
      {/* central highlight sheen */}
      <div className={styles.sheen} />
    </div>
  );
}

export default function FilmFrame({ children, variant = 'h', speed = '14s', className = '' }) {
  const isH = variant === 'h';
  const isV = variant === 'v';
  return (
    <div className={`${styles.frame} ${styles['var_' + variant]} ${className}`}>
      {isH && <Strip pos="top" speed={speed} />}
      {isV && <Strip pos="left"  speed={speed} />}

      <div className={styles.slot}>{children}</div>

      {isH && <Strip pos="bot" speed={speed} />}
      {isV && <Strip pos="right" speed={speed} />}
    </div>
  );
}
