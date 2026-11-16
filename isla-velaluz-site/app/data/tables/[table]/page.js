import Link from 'next/link';
import { notFound } from 'next/navigation';
import { tables, href } from '@/lib/content';
import { KAGGLE_URL } from '@/components/links';
import c from '../../chart.module.css';

export const dynamicParams = false;
export const generateStaticParams = () => tables.map((t) => ({ table: t.name }));

export async function generateMetadata({ params }) {
  const { table } = await params;
  const t = tables.find((x) => x.name === table);
  return t ? { title: `${t.name} table`, description: t.description } : {};
}

const fmt = (n) => n.toLocaleString('en-US');
const cell = (v) => (v === null || v === undefined ? '' : String(v));

export default async function TablePage({ params }) {
  const { table } = await params;
  const t = tables.find((x) => x.name === table);
  if (!t) notFound();
  const cols = t.columns.map((col) => col.name);
  const sameEverywhere = t.rows.full === t.rows.sample;

  return (
    <div className={`wrap ${c.page}`}>
      <nav aria-label="Breadcrumb">
        <ol className={c.crumbs}>
          <li><Link href="/data/">Data Center</Link></li>
          <li><Link href={`/data/tables/#${t.area.toLowerCase().replace(/[^a-z]+/g, '-')}`}>{t.area}</Link></li>
        </ol>
      </nav>
      <h1 className={c.tableName}>{t.name}</h1>
      <p className={c.lede}>{t.description}</p>

      <dl className={c.stats}>
        <div><dt>One row is</dt><dd>{t.grain}</dd></div>
        <div><dt>Columns</dt><dd>{t.columns.length}</dd></div>
        <div><dt>Rows in Sample</dt><dd className={c.num}>{fmt(t.rows.sample)}</dd></div>
        <div><dt>Rows in Standard</dt><dd className={c.num}>{fmt(t.rows.standard)}</dd></div>
        <div><dt>Rows in Full</dt><dd className={c.num}>{fmt(t.rows.full)}</dd></div>
      </dl>
      {sameEverywhere && (
        <p className={c.small}>This table describes the company, not individual guests, so it is identical in all three sizes.</p>
      )}

      <h2 className={c.h2}>Columns</h2>
      <div className={c.scroll} tabIndex={0} role="region" aria-label="Columns">
        <table className={c.table}>
          <thead>
            <tr><th scope="col">Column</th><th scope="col">Type</th><th scope="col">What it holds</th><th scope="col">Values or range</th></tr>
          </thead>
          <tbody>
            {t.columns.map((col) => (
              <tr key={col.name}>
                <th scope="row" className={c.code}>
                  {col.name}
                  {col.key === 'primary key' && <span className={c.tag}>key</span>}
                </th>
                <td>{col.type}</td>
                <td>{col.description}{col.can_be_empty && !/Can be empty/i.test(col.description) ? ' Can be empty.' : ''}</td>
                <td className={c.values}>{col.values}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {(t.links_to.length > 0 || t.linked_from.length > 0) && (
        <>
          <h2 className={c.h2}>How it connects</h2>
          <div className={c.links}>
            {t.links_to.length > 0 && (
              <div>
                <h3 className={c.h3}>This table points to</h3>
                <ul>
                  {t.links_to.map((l) => (
                    <li key={l.column + l.table}>
                      <span className={c.code}>{l.column}</span> matches{' '}
                      <Link href={href.table(l.table)} className={c.code}>{l.table}.{l.target_column}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {t.linked_from.length > 0 && (
              <div>
                <h3 className={c.h3}>Tables that point here</h3>
                <ul>
                  {t.linked_from.map((l) => (
                    <li key={l.table + l.column}>
                      <Link href={href.table(l.table)} className={c.code}>{l.table}.{l.column}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </>
      )}

      <h2 className={c.h2}>First five rows</h2>
      <p className={c.small}>Taken from the Sample size, exactly as they appear in the file. Empty cells are empty in the data.</p>
      <div className={c.scroll} tabIndex={0} role="region" aria-label="First five rows">
        <table className={`${c.table} ${c.rows}`}>
          <thead><tr>{cols.map((n) => <th key={n} scope="col" className={c.code}>{n}</th>)}</tr></thead>
          <tbody>
            {t.sample_rows.map((r, i) => (
              <tr key={i}>{cols.map((n) => <td key={n}>{cell(r[n])}</td>)}</tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className={c.actions}><a className={c.primary} href={KAGGLE_URL}>Download from Kaggle</a></p>
    </div>
  );
}
