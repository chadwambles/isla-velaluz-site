import styles from './Thrill.module.css';

const WORDS = ['', 'Gentle', 'Mild', 'Moderate', 'Thrilling', 'Intense'];

// Thrill level as five lanterns, with the word alongside so it never relies on the picture alone.
export default function Thrill({ level }) {
  return (
    <span className={styles.thrill}>
      <span className={styles.pips} aria-hidden="true">
        {[1, 2, 3, 4, 5].map((n) => (
          <span key={n} className={n <= level ? styles.on : styles.off} />
        ))}
      </span>
      <span>{WORDS[level]} ({level} of 5)</span>
    </span>
  );
}
