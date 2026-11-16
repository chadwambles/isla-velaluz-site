import PageHero from '@/components/PageHero';
import MaybeLink from '@/components/MaybeLink';
import { venues, parks, hotels, href, titleCase } from '@/lib/content';
import s from '@/styles/resort.module.css';

// Dining and shopping index: every venue of one kind, grouped by where it is.
export default function VenueIndex({ kind, title, pitch, motif }) {
  const mine = venues.filter((v) => v.kind === kind);
  const groups = [
    ...parks.map((p) => ({ name: p.park_name, link: href.park(p), list: mine.filter((v) => v.park_slug === p.slug) })),
    { name: 'Paseo Velaluz', link: '/paseo/', list: mine.filter((v) => !v.park_slug && !v.hotel_slug) },
    ...hotels.map((h) => ({ name: h.hotel_name, link: href.hotel(h), list: mine.filter((v) => v.hotel_slug === h.slug) })),
  ].filter((g) => g.list.length);

  return (
    <>
      <PageHero title={title} pitch={pitch} motif={motif} crumbs={[{ label: 'Isla Velaluz', href: '/' }]}
        artLabel="Illustration of Paseo Velaluz at night." />
      <div className={`wrap ${s.body}`}>
        {groups.map((g) => (
          <section key={g.name} className={s.block}>
            <h2 className={s.h2}><MaybeLink to={g.link} when className={s.h2link}>{g.name}</MaybeLink></h2>
            <ul className={s.list}>
              {g.list.map((v) => (
                <li key={v.slug} className={s.item}>
                  <MaybeLink to={href.venue(v)} when={v.published} className={s.itemName}>{v.venue_name}</MaybeLink>
                  <p className={s.itemMeta}>{titleCase(v.venue_type)}{v.land_name ? `, ${v.land_name}` : ''}</p>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}
