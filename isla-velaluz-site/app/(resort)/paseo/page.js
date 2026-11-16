import PageHero from '@/components/PageHero';
import MaybeLink from '@/components/MaybeLink';
import { venues, events, href, titleCase } from '@/lib/content';
import s from '@/styles/resort.module.css';

export const metadata = { title: 'Paseo Velaluz', description: 'The dining, shopping and concert promenade at Isla Velaluz. No ticket needed.' };

export default function Paseo() {
  const here = venues.filter((v) => !v.park_slug && !v.hotel_slug);
  const happening = events.filter((e) => e.location === 'Paseo Velaluz');
  return (
    <>
      <PageHero title="Paseo Velaluz" pitch="The waterfront promenade of restaurants, shops and concert nights. There is no gate and no ticket."
        motif="paseo-night" crumbs={[{ label: 'Isla Velaluz', href: '/' }]} artLabel="Illustration of the Paseo Velaluz promenade at night." />
      <div className={`wrap ${s.body}`}>
        <div className={s.prose}>
          <p>Paseo Velaluz runs along the water between the parks and the hotels. It is where the island goes after the parks close: five full restaurants, two bars, a row of shops and a stage at the end of the dock.</p>
          <p>Anyone can walk in. You do not need a park ticket or a hotel room, and plenty of people come only for dinner.</p>
        </div>
        <section className={s.section}>
          <h2 className={s.h2}>Eat and drink</h2>
          <ul className={s.list}>
            {here.filter((v) => v.kind === 'dining').map((v) => (
              <li key={v.slug} className={s.item}>
                <MaybeLink to={href.venue(v)} when={v.published} className={s.itemName}>{v.venue_name}</MaybeLink>
                <p className={s.itemMeta}>{titleCase(v.venue_type)}</p>
              </li>
            ))}
          </ul>
        </section>
        <section className={s.section}>
          <h2 className={s.h2}>Shop</h2>
          <ul className={s.list}>
            {here.filter((v) => v.kind === 'shopping').map((v) => (
              <li key={v.slug} className={s.item}>
                <MaybeLink to={href.venue(v)} when={v.published} className={s.itemName}>{v.venue_name}</MaybeLink>
                <p className={s.itemMeta}>{v.pitch}</p>
              </li>
            ))}
          </ul>
        </section>
        <section className={s.section}>
          <h2 className={s.h2}>On the Paseo this year</h2>
          <ul className={s.list}>
            {happening.map((e) => (
              <li key={e.slug} className={s.item}>
                <MaybeLink to={href.event(e)} when={e.published} className={s.itemName}>{e.name}</MaybeLink>
                <p className={s.itemMeta}>{e.pitch}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
