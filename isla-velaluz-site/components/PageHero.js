import Link from 'next/link';
import Vignette from './art/Vignette';
import styles from './PageHero.module.css';

// Header band for resort pages: breadcrumb, title and pitch over a dusk illustration.
export default function PageHero({ crumbs = [], title, pitch, motif, artLabel }) {
  return (
    <header className={styles.hero}>
      <div className={styles.art}><Vignette motif={motif} label={artLabel} /></div>
      <div className={`wrap ${styles.copy}`}>
        {crumbs.length > 0 && (
          <nav aria-label="Breadcrumb">
            <ol className={styles.crumbs}>
              {crumbs.map((c) => (
                <li key={c.label}>{c.href ? <Link href={c.href}>{c.label}</Link> : <span>{c.label}</span>}</li>
              ))}
            </ol>
          </nav>
        )}
        <h1 className={styles.title}>{title}</h1>
        {pitch && <p className={styles.pitch}>{pitch}</p>}
      </div>
    </header>
  );
}
