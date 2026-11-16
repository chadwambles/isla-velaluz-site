import Link from 'next/link';
import styles from './SiteFooter.module.css';
import { KAGGLE_URL, AUTHOR_URL } from './links';

export default function SiteFooter({ theme }) {
  return (
    <footer className={`${styles.footer} ${theme === 'chart' ? styles.chart : styles.lantern}`}>
      <div className={`wrap ${styles.grid}`}>
        <p className={styles.notice}>
          Isla Velaluz is not a real place. The resort, its parks, hotels, guests and staff are invented, and
          nothing here can be booked or bought. The site exists to give analysts a realistic company to study.
        </p>
        <ul className={styles.links}>
          <li><Link href="/about/">About this site</Link></li>
          <li><Link href="/data/">Data Center</Link></li>
          <li><a href={KAGGLE_URL}>Get the dataset on Kaggle</a></li>
          <li><a href={AUTHOR_URL}>Made by Chad Wambles</a></li>
          {theme === 'chart' && <li><Link href="/data/answers/" rel="nofollow">Answer key (spoilers)</Link></li>}
        </ul>
      </div>
    </footer>
  );
}
