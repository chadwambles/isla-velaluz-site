import Link from 'next/link';
import styles from './SiteHeader.module.css';

const RESORT = [
  ['Parks', '/parks/'],
  ['Hotels', '/hotels/'],
  ['Dining', '/dining/'],
  ['Shopping', '/shopping/'],
  ['Events', '/events/'],
  ['Tickets', '/tickets/'],
];

export default function SiteHeader({ theme }) {
  const inData = theme === 'chart';
  return (
    <header className={`${styles.header} ${inData ? styles.chart : styles.lantern}`}>
      <a className={styles.skip} href="#main">Skip to content</a>
      <div className={`wrap ${styles.bar}`}>
        <Link href="/" className={styles.brand} aria-label="Isla Velaluz Resort, home">
          <svg className={styles.mark} viewBox="0 0 32 32" aria-hidden="true">
            <path d="M16 3 12.5 9h7z" fill="currentColor" />
            <rect x="12" y="10" width="8" height="12" rx="2.5" fill="var(--accent)" />
            <path d="M11 23h10l-1.5 4h-7z" fill="currentColor" />
            <path d="M16 12v8M13.5 16h5" stroke="currentColor" strokeWidth="1.2" opacity=".55" />
          </svg>
          <span className={styles.name}>Isla Velaluz</span>
        </Link>
        <nav aria-label="Main">
          <ul className={styles.nav}>
            {RESORT.map(([label, to]) => (
              <li key={to} className={inData ? styles.quiet : undefined}><Link href={to}>{label}</Link></li>
            ))}
            <li className={styles.data}>
              <Link href="/data/" aria-current={inData ? 'page' : undefined}>Data Center</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
