import Link from 'next/link';
import styles from './data.module.css';
import c from './chart.module.css';
import { KAGGLE_URL, AUTHOR_URL } from '@/components/links';
import { tables, AREAS } from '@/lib/content';

export const metadata = { title: { absolute: 'Isla Velaluz Data Center' } };

const DOORS = [
  ['/data/tables/', 'Tables', 'All 64 tables with their columns, how they connect and their first five rows.'],
  ['/data/questions/', 'Questions', 'Thirty business questions with real answers in the data, and twelve open projects.'],
  ['/data/downloads/', 'Downloads', 'Three sizes, Parquet or CSV, with the few lines of code that load them.'],
];

export default function DataHome() {
  return (
    <div className={`wrap ${styles.page}`}>
      <h1 className={styles.title}>Eight years of a company that never existed</h1>
      <p className={styles.lede}>
        The Isla Velaluz dataset is a synthetic resort operator, simulated day by day from 2018 through 2025. It has
        64 tables that all connect, and 30 business questions with real answers hidden in the data.
      </p>
      <p className={styles.actions}>
        <a className={styles.primary} href={KAGGLE_URL}>Download from Kaggle</a>
      </p>

      <ul className={styles.doors}>
        {DOORS.map(([to, name, text]) => (
          <li key={to}>
            <Link href={to} className={styles.door}>
              <span className={styles.doorName}>{name}</span>
              <span>{text}</span>
            </Link>
          </li>
        ))}
      </ul>

      <h2 className={styles.h2}>Why it is useful for a portfolio</h2>
      <div className={styles.cols}>
        <p>
          It was made by simulating the company, not by filling tables with random values. A guest who rides a coaster
          was in that park, on that day, with a valid ticket. The cashier who sold them lunch was on shift at that venue.
          The ingredients came off a purchase order and out of that day&apos;s inventory, and the sale is in the general ledger.
        </p>
        <p>
          That means joins work, totals reconcile, and the questions have answers that are not obvious from a single table.
          It looks like real work because it behaves like a real company.
        </p>
      </div>

      <h2 className={styles.h2}>What is inside</h2>
      <div className={c.scroll} tabIndex={0} role="region" aria-label="Business areas">
        <table className={c.table}>
          <thead><tr><th scope="col">Area</th><th scope="col" className={c.right}>Tables</th><th scope="col">Includes</th></tr></thead>
          <tbody>
            {AREAS.map((a) => {
              const list = tables.filter((t) => t.area === a);
              return (
                <tr key={a}>
                  <th scope="row"><Link href={`/data/tables/#${a.toLowerCase().replace(/[^a-z]+/g, '-')}`}>{a}</Link></th>
                  <td className={`${c.num} ${c.right}`}>{list.length}</td>
                  <td className={c.code}>{list.slice(0, 5).map((t) => t.name).join(', ')}{list.length > 5 ? ` and ${list.length - 5} more` : ''}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className={styles.by}>
        Built by <a href={AUTHOR_URL}>Chad Wambles</a>, a business analyst who wanted a practice company with real joins
        and real answers. The resort it describes has its own website: <Link href="/">take a look around</Link>.
      </p>
    </div>
  );
}
