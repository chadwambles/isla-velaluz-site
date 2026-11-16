import Link from 'next/link';
import DuskScene from '@/components/DuskScene';
import MaybeLink from '@/components/MaybeLink';
import { parks, hotels, lands, attractions, href, year, titleCase } from '@/lib/content';
import styles from './home.module.css';
import s from '@/styles/resort.module.css';

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
          <p className={styles.heroCta}><Link href="/plan/" className={styles.cta}>Plan a visit</Link></p>
        </div>
      </section>

      <section className={styles.band}>
        <div className="wrap">
          <h2 className={styles.h2}><Link href="/parks/" className={s.h2link}>Three parks, one island</Link></h2>
          <ul className={s.list}>
            {parks.map((p) => {
              const nLands = lands.filter((l) => l.park_code === p.park_code).length;
              const nRides = attractions.filter((a) => a.park_slug === p.slug).length;
              return (
                <li key={p.slug} className={s.item}>
                  <MaybeLink to={href.park(p)} when={p.published} className={s.itemName}>{p.park_name}</MaybeLink>
                  <p className={s.itemMeta}>{p.pitch}</p>
                  <p className={s.itemMeta}>{nLands} lands and {nRides} attractions. Open since {year(p.opened_date)}.</p>
                </li>
              );
            })}
          </ul>

          <div className={styles.split}>
            <div>
              <h2 className={styles.h2}><Link href="/hotels/" className={s.h2link}>Four places to stay</Link></h2>
              <ul className={`${s.list} ${styles.hotels}`}>
                {hotels.map((h) => (
                  <li key={h.slug} className={s.item}>
                    <MaybeLink to={href.hotel(h)} when={h.published} className={s.itemName}>{h.hotel_name}</MaybeLink>
                    <p className={s.itemMeta}>{titleCase(h.tier)}, {h.rooms} rooms</p>
                  </li>
                ))}
              </ul>
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
        </div>
      </section>
    </>
  );
}
