import PageHero from '@/components/PageHero';
import { parks, lands, hotels, bySlug, href, money, titleCase } from '@/lib/content';
import s from '@/styles/resort.module.css';

// One template for restaurants, bars, cafes, stands and shops.
export default function VenuePage({ venue: v }) {
  const land = v.land_slug ? bySlug(lands, v.land_slug) : null;
  const park = v.park_slug ? bySlug(parks, v.park_slug) : null;
  const hotel = v.hotel_slug ? bySlug(hotels, v.hotel_slug) : null;
  const dining = v.kind === 'dining';
  const where = land ? `${land.land_name}, ${park.park_name}` : hotel ? hotel.hotel_name : 'Paseo Velaluz';

  const crumbs = [{ label: 'Isla Velaluz', href: '/' }];
  if (park) crumbs.push({ label: park.park_name, href: park.published ? href.park(park) : undefined });
  if (land) crumbs.push({ label: land.land_name, href: land.published ? href.land(land) : undefined });
  if (hotel) crumbs.push({ label: hotel.hotel_name, href: hotel.published ? href.hotel(hotel) : undefined });
  if (!park && !hotel) crumbs.push({ label: 'Paseo Velaluz' });

  return (
    <>
      <PageHero title={v.venue_name} pitch={v.pitch} motif={land?.art || hotel?.art || park?.art} crumbs={crumbs}
        artLabel={`Illustration of ${where} at dusk.`} />
      <div className={`wrap ${s.body}`}>
        <div className={s.cols}>
          <div>
            <div className={s.prose}>{v.description.map((p) => <p key={p}>{p}</p>)}</div>
            <section className={s.section}>
              <h2 className={s.h2}>{dining ? 'On the menu' : 'On the shelves'}</h2>
              {v.offerings.map((g) => (
                <div key={g.category} className={s.menuGroup}>
                  <h3>{g.category}</h3>
                  <ul className={s.menu}>
                    {(dining ? g.items : g.items.slice(0, 8)).map((i) => (
                      <li key={i.name}><span>{i.name}</span><span className={s.price}>{money(i.price)}</span></li>
                    ))}
                  </ul>
                  {!dining && g.items.length > 8 && <p className={s.note}>And {g.items.length - 8} more in the shop.</p>}
                </div>
              ))}
              <p className={s.note}>Prices are before tax.</p>
            </section>
          </div>
          <aside className={s.facts}>
            <h2>At a glance</h2>
            <dl>
              <dt>What it is</dt><dd>{titleCase(v.venue_type)}</dd>
              <dt>Where</dt><dd>{where}</dd>
              {dining && <><dt>Service</dt><dd>{v.venue_type === 'table service restaurant' ? 'Seated, reservations recommended' : 'Order at the counter'}</dd></>}
            </dl>
          </aside>
        </div>
      </div>
    </>
  );
}
