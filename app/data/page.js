import styles from './data.module.css';
import { KAGGLE_URL } from '@/components/links';

export const metadata = { title: { absolute: 'Isla Velaluz Data Center' } };

const sizes = [
  ['Sample', '1% of households', '11.9M rows', 'Fits in Excel-sized tools and a laptop notebook'],
  ['Standard', '10% of households', '35.1M rows', 'Enough volume for real SQL and dashboard work'],
  ['Full', 'Every household', '266.9M rows', 'The whole company, for DuckDB or a warehouse'],
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

      <h2 className={styles.h2}>Three sizes, same tables</h2>
      <div className={styles.tableScroll}>
        <table className={styles.table}>
          <thead>
            <tr><th scope="col">Size</th><th scope="col">Guests included</th><th scope="col">Rows</th><th scope="col">Good for</th></tr>
          </thead>
          <tbody>
            {sizes.map(([name, share, rows, use]) => (
              <tr key={name}>
                <th scope="row">{name}</th><td>{share}</td><td className={styles.num}>{rows}</td><td>{use}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className={styles.note}>
        The table-by-table dictionary, the question list and loading instructions are being added to this section.
        Until then, all three are in the Kaggle download.
      </p>
    </div>
  );
}
