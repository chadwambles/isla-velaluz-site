import PageHero from '@/components/PageHero';
import MaybeLink from '@/components/MaybeLink';
import { hotels, href, year, titleCase } from '@/lib/content';
import s from '@/styles/resort.module.css';

export const metadata = { title: 'Hotels', description: 'The four hotels of Isla Velaluz, from value to luxury.' };

export default function HotelsIndex() {
  return (
    <>
      <PageHero title="Places to stay" pitch="Four hotels on the island, from a big family value hotel to 120 rooms on the Gulf."
        motif="harbor-hotel" crumbs={[{ label: 'Isla Velaluz', href: '/' }]} artLabel="Illustration of a harbor-side hotel at dusk." />
      <div className={`wrap ${s.body}`}>
        {hotels.map((h) => (
          <section key={h.slug} className={s.block}>
            <h2 className={s.h2}><MaybeLink to={href.hotel(h)} when={h.published} className={s.h2link}>{h.hotel_name}</MaybeLink></h2>
            <p>{h.pitch}</p>
            <p className={s.itemMeta}>{titleCase(h.tier)}. {h.rooms} rooms. Open since {year(h.opened_date)}.</p>
            <ul className={s.inline}>{h.room_types.map((r) => <li key={r.name}>{r.name} (sleeps {r.sleeps})</li>)}</ul>
          </section>
        ))}
      </div>
    </>
  );
}
