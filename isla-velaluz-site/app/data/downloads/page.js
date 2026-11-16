import Link from 'next/link';
import { KAGGLE_URL } from '@/components/links';
import c from '../chart.module.css';

export const metadata = { title: 'Downloads', description: 'Get the Isla Velaluz dataset in three sizes, as Parquet or CSV, and load it in a few lines.' };

// File sizes of the published dataset.
const SIZES = [
  { name: 'Sample', share: '1% of households', rows: '11.9 million', parquet: '45 MB', csv: '684 MB', folders: 'sample/ and sample_csv/', use: 'Trying the data out, spreadsheets, a laptop notebook' },
  { name: 'Standard', share: '10% of households', rows: '35.1 million', parquet: '203 MB', csv: '2.3 GB', folders: 'standard/ and standard_csv/', use: 'Most SQL and dashboard projects' },
  { name: 'Full', share: 'Every household', rows: '266.9 million', parquet: '2.0 GB', csv: 'Not provided', folders: 'full/', use: 'DuckDB, a warehouse, or anything that must add up to the ledger' },
];

const DUCKDB = `import duckdb
con = duckdb.connect()
con.sql("select trip_type, count(*) from 'standard/bookings.parquet' group by 1").show()

# in the full size, the six largest tables are folders of yearly files
con.sql("select year(ride_date), count(*) from 'full/ride_events/*.parquet' group by 1 order by 1").show()`;

const PANDAS = `import pandas as pd
bookings = pd.read_parquet("sample/bookings.parquet")
# or, from the CSV version
bookings = pd.read_csv("sample_csv/bookings.csv")`;

export default function Downloads() {
  return (
    <div className={`wrap ${c.page}`}>
      <nav aria-label="Breadcrumb"><ol className={c.crumbs}><li><Link href="/data/">Data Center</Link></li><li>Downloads</li></ol></nav>
      <h1 className={c.title}>Get the data</h1>
      <p className={c.lede}>
        The dataset is hosted on Kaggle and is free to use under a CC BY 4.0 license. Pick a size, download that folder,
        and you can be running queries in a few minutes.
      </p>
      <p className={c.actions}><a className={c.primary} href={KAGGLE_URL}>Download from Kaggle</a></p>

      <h2 className={c.h2}>Three sizes</h2>
      <div className={c.scroll} tabIndex={0} role="region" aria-label="Dataset sizes">
        <table className={c.table}>
          <thead>
            <tr><th scope="col">Size</th><th scope="col">Guests included</th><th scope="col" className={c.right}>Rows</th><th scope="col" className={c.right}>Parquet</th><th scope="col" className={c.right}>CSV</th><th scope="col">Folders</th><th scope="col">Good for</th></tr>
          </thead>
          <tbody>
            {SIZES.map((s) => (
              <tr key={s.name}>
                <th scope="row">{s.name}</th><td>{s.share}</td>
                <td className={`${c.num} ${c.right}`}>{s.rows}</td><td className={`${c.num} ${c.right}`}>{s.parquet}</td><td className={`${c.num} ${c.right}`}>{s.csv}</td>
                <td className={c.code}>{s.folders}</td><td>{s.use}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className={c.small}>
        All three sizes hold the same 64 tables with the same columns. Standard keeps households whose id ends in 7, and
        Sample keeps those ending in 07, so a household in Sample is also in Standard and Full.
      </p>

      <h2 className={c.h2}>Which size do I need?</h2>
      <ul className={c.projects}>
        <li><strong>Start with Sample.</strong> Most of the 30 questions can be answered in it, and it opens in anything.</li>
        <li><strong>Move to Standard</strong> when a question compares small groups of guests and Sample is too thin. The <Link href="/data/questions/">questions page</Link> says which ones.</li>
        <li><strong>Use Full</strong> when guest activity has to reconcile with company totals. Company tables (the ledger, payroll, inventory, staffing) describe the whole resort in every size, while guest tables in Sample and Standard hold only a share of it.</li>
      </ul>

      <h2 className={c.h2}>Loading it</h2>
      <h3 className={c.h3}>DuckDB</h3>
      <pre className={c.pre} tabIndex={0}><code>{DUCKDB}</code></pre>
      <h3 className={c.h3}>pandas</h3>
      <pre className={c.pre} tabIndex={0}><code>{PANDAS}</code></pre>
      <p className={c.small}>
        Excel, Power BI and Tableau can open the CSV folders directly. In the Full size, park_entries, ride_events, shifts,
        transaction_lines, transactions and wait_snapshots are folders with one file per year.
      </p>

      <h2 className={c.h2}>Also in the download</h2>
      <ul className={c.projects}>
        <li><span className={c.code}>DATA_DICTIONARY.md</span> and <span className={c.code}>data_dictionary.csv</span>: every table and column. The same content is on the <Link href="/data/tables/">tables pages</Link>.</li>
        <li><span className={c.code}>QUESTIONS.md</span>: the 30 questions and 12 open projects, also on the <Link href="/data/questions/">questions page</Link>.</li>
      </ul>

      <h2 className={c.h2}>Good to know before you start</h2>
      <ul className={c.projects}>
        <li>Everything is synthetic. No real person, company, place or event is in the data.</li>
        <li>The data covers January 1, 2018 to December 31, 2025. A few trips begin just before or end just after.</li>
        <li>The resort was closed for a hurricane from September 27 to October 2, 2022. The water park also closes each winter and on cold days.</li>
        <li>About half of register sales have no household. Those are walk-up visitors to Paseo Velaluz and guests who paid without identifying themselves.</li>
        <li>Two register systems recorded sales, switching on April 17, 2023, and they used different category codes. The <Link href="/data/tables/category_code_map/" className={c.code}>category_code_map</Link> table translates between them.</li>
        <li>Isla Velaluz is boutique-sized: three small parks and about 2,400 employees. Volumes are sized to that.</li>
      </ul>
    </div>
  );
}
