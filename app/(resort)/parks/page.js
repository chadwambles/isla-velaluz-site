import PageHero from '@/components/PageHero';
import MaybeLink from '@/components/MaybeLink';
import { parks, lands, attractions, href, year } from '@/lib/content';
import s from '@/styles/resort.module.css';

export const metadata = { title: 'Parks', description: 'The three parks of Isla Velaluz: Costa Encandela, Punta Tormenta and Playa Zambulla.' };

export default function ParksIndex() {
  return (
    <>
      <PageHero title="The parks" pitch="Two theme parks and a water park, each a short ride from every hotel on the island."
        motif="park-skyline" crumbs={[{ label: 'Isla Velaluz', href: '/' }]} artLabel="Illustration of the Isla Velaluz parks at dusk." />
      <div className={`wrap ${s.body}`}>
        {parks.map((p) => {
          const parkLands = lands.filter((l) => l.park_code === p.park_code);
          const rides = attractions.filter((a) => a.park_slug === p.slug);
          return (
            <section key={p.slug} className={s.block}>
              <h2 className={s.h2}><MaybeLink to={href.park(p)} when={p.published} className={s.h2link}>{p.park_name}</MaybeLink></h2>
              <p>{p.pitch}</p>
              <p className={s.itemMeta}>
                {p.park_type === 'water' ? 'Water park' : 'Theme park'}, open since {year(p.opened_date)}. {rides.length} attractions.
                Most days {p.usual_open} to {p.usual_close}.
              </p>
              <ul className={s.inline}>
                {parkLands.map((l) => (
                  <li key={l.slug}><MaybeLink to={href.land(l)} when={l.published}>{l.land_name}</MaybeLink></li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </>
  );
}
