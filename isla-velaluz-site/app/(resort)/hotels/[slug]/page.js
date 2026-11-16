import { notFound } from 'next/navigation';
import PageHero from '@/components/PageHero';
import Link from 'next/link';
import MaybeLink from '@/components/MaybeLink';
import { hotels, venues, bySlug, published, href, longDate, titleCase } from '@/lib/content';
import s from '@/styles/resort.module.css';

export const dynamicParams = false;
export const generateStaticParams = () => published(hotels).map((h) => ({ slug: h.slug }));

export async function generateMetadata({ params }) {
  const h = bySlug(hotels, (await params).slug);
  return h ? { title: h.hotel_name, description: h.pitch } : {};
}

export default async function HotelPage({ params }) {
  const h = bySlug(hotels, (await params).slug);
  if (!h?.published) notFound();
  const onSite = h.venues.map((x) => bySlug(venues, x.slug));

  return (
    <>
      <PageHero title={h.hotel_name} pitch={h.pitch} motif={h.art}
        crumbs={[{ label: 'Isla Velaluz', href: '/' }, { label: 'Hotels' }]}
        artLabel={`Illustration of ${h.hotel_name} at dusk.`} />
      <div className={`wrap ${s.body}`}>
        <div className={s.cols}>
          <div className={s.prose}>
            {h.description.map((p) => <p key={p}>{p}</p>)}
            <p><Link href="/plan/">Plan a stay at {h.hotel_name}</Link></p>
          </div>
          <aside className={s.facts}>
            <h2>At a glance</h2>
            <dl>
              <dt>Category</dt><dd>{titleCase(h.tier)}</dd>
              <dt>Rooms</dt><dd>{h.rooms}</dd>
              <dt>Opened</dt><dd>{longDate(h.opened_date)}</dd>
            </dl>
          </aside>
        </div>

        <section className={s.section}>
          <h2 className={s.h2}>Rooms</h2>
          <ul className={s.list}>
            {h.room_types.map((r) => (
              <li key={r.name} className={s.item}>
                <span className={s.itemName}>{r.name}</span>
                <p className={s.itemMeta}>Sleeps up to {r.sleeps}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className={s.section}>
          <h2 className={s.h2}>Eat, drink and shop at the hotel</h2>
          <ul className={s.list}>
            {onSite.map((v) => (
              <li key={v.slug} className={s.item}>
                <MaybeLink to={href.venue(v)} when={v.published} className={s.itemName}>{v.venue_name}</MaybeLink>
                <p className={s.itemMeta}>{titleCase(v.venue_type)}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
