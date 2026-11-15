import Link from 'next/link';
import DuskScene from '@/components/DuskScene';
import styles from './home.module.css';

export const metadata = { title: { absolute: 'Isla Velaluz Resort' } };

export default function Home() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.art}><DuskScene /></div>
        <div className={`wrap ${styles.copy}`}>
          <h1 className={styles.title}>The island lights up at dusk</h1>
          <p className={styles.lede}>
            Two theme parks, a water park and four hotels on a Gulf barrier island, where every evening ends with
            the lanterns coming on along the shore.
          </p>
        </div>
      </section>

      <section className={styles.band}>
        <div className={`wrap ${styles.split}`}>
          <div>
            <h2 className={styles.h2}>The resort pages are on their way</h2>
            <p>
              Parks, rides, restaurants, hotels and event nights are being added here. Each one is built from the
              resort&apos;s own records, so what you read on a page matches what is in the data.
            </p>
          </div>
          <div className={styles.aside}>
            <h2 className={styles.h3}>Here for the dataset?</h2>
            <p>
              Isla Velaluz is fictional. Its eight years of records are free to use for portfolio projects: 64
              connected tables, from park entries to the general ledger.
            </p>
            <p><Link href="/data/" className={styles.cta}>Go to the Data Center</Link></p>
          </div>
        </div>
      </section>
    </>
  );
}
