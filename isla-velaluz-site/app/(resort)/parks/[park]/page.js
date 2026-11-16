import { notFound } from 'next/navigation';
import PageHero from '@/components/PageHero';
import MaybeLink from '@/components/MaybeLink';
import { parks, lands, attractions, venues, bySlug, published, href, year, longDate } from '@/lib/content';
import s from '@/styles/resort.module.css';

export const dynamicParams = false;
export const generateStaticParams = () => published(parks).map((p) => ({ park: p.slug }));

export async function generateMetadata({ params }) {
  const park = bySlug(parks, (await params).park);
  return park ? { title: park.park_name, description: park.pitch } : {};
}

export default async function ParkPage({ params }) {
  const park = bySlug(parks, (await params).park);
  if (!park?.published) notFound();
  const parkLands = lands.filter((l) => l.park_code === park.park_code);
  const rides = attractions.filter((a) => a.park_slug === park.slug);
  const places = venues.filter((v) => v.park_slug === park.slug);

  return (
    <>
      <PageHero title={park.park_name} pitch={park.pitch} motif={park.art}
        crumbs={[{ label: 'Isla Velaluz', href: '/' }, { label: 'Parks' }]}
        artLabel={`Illustration of ${park.park_name} at dusk.`} />
      <div className={`wrap ${s.body}`}>
        <div className={s.cols}>
          <div className={s.prose}>
            {park.description.map((p) => <p key={p}>{p}</p>)}
          </div>
          <aside className={s.facts}>
            <h2>Know before you go</h2>
            <dl>
              <dt>Hours</dt><dd>Most days {park.usual_open} to {park.usual_close}, as late as {park.latest_close} on busy nights</dd>
              <dt>Kind of park</dt><dd>{park.park_type === 'water' ? 'Water park' : 'Theme park'}</dd>
              <dt>Opened</dt><dd>{longDate(park.opened_date)}</dd>
              <dt>Inside</dt><dd>{parkLands.length} lands, {rides.length} attractions, {places.length} places to eat and shop</dd>
            </dl>
          </aside>
        </div>

        <section className={s.section}>
          <h2 className={s.h2}>The lands of {park.park_name}</h2>
          <ul className={s.list}>
            {parkLands.map((l) => (
              <li key={l.slug} className={s.item}>
                <MaybeLink to={href.land(l)} when={l.published} className={s.itemName}>{l.land_name}</MaybeLink>
                <p className={s.itemMeta}>
                  {l.attractions.length} attractions. {year(l.opened_date) === year(park.opened_date) ? 'Here since opening day.' : `Added in ${year(l.opened_date)}.`}
                </p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
