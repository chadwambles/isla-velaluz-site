import Link from 'next/link';
import { tables, AREAS, href } from '@/lib/content';
import c from '../chart.module.css';

export const metadata = { title: 'Tables', description: 'Every table in the Isla Velaluz dataset, grouped by business area.' };

const fmt = (n) => n.toLocaleString('en-US');

export default function TablesIndex() {
  return (
    <div className={`wrap ${c.page}`}>
      <nav aria-label="Breadcrumb"><ol className={c.crumbs}><li><Link href="/data/">Data Center</Link></li><li>Tables</li></ol></nav>
      <h1 className={c.title}>{tables.length} tables, {AREAS.length} business areas</h1>
      <p className={c.lede}>
        Every table links to at least one other. Guest tables shrink with the dataset size. Company tables, such as the
        ledger and the staff schedule, are the same in all three.
      </p>
      <ul className={c.jump}>
        {AREAS.map((a) => <li key={a}><a href={`#${a.toLowerCase().replace(/[^a-z]+/g, '-')}`}>{a}</a></li>)}
      </ul>

      {AREAS.map((a) => {
        const list = tables.filter((t) => t.area === a);
        return (
          <section key={a} id={a.toLowerCase().replace(/[^a-z]+/g, '-')}>
            <h2 className={c.h2}>{a}</h2>
            <div className={c.scroll} tabIndex={0} role="region" aria-label={`${a} tables`}>
              <table className={c.table}>
                <thead>
                  <tr><th scope="col">Table</th><th scope="col">One row is</th><th scope="col" className={c.right}>Columns</th><th scope="col" className={c.right}>Rows in Full</th><th scope="col" className={c.right}>Rows in Sample</th></tr>
                </thead>
                <tbody>
                  {list.map((t) => (
                    <tr key={t.name}>
                      <th scope="row"><Link href={href.table(t.name)} className={c.code}>{t.name}</Link></th>
                      <td>{t.grain}</td>
                      <td className={`${c.num} ${c.right}`}>{t.columns.length}</td>
                      <td className={`${c.num} ${c.right}`}>{fmt(t.rows.full)}</td>
                      <td className={`${c.num} ${c.right}`}>{fmt(t.rows.sample)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        );
      })}
    </div>
  );
}
