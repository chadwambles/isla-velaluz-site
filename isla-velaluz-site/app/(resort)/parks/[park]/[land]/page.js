import { notFound } from 'next/navigation';
import PageHero from '@/components/PageHero';
import MaybeLink from '@/components/MaybeLink';
import Thrill from '@/components/Thrill';
import { parks, lands, attractions, venues, bySlug, published, href, year, titleCase } from '@/lib/content';
import s from '@/styles/resort.module.css';

export const dynamicParams = false;
export const generateStaticParams = () => published(lands).map((l) => ({ park: l.park_slug, land: l.slug }));

export async function generateMetadata({ params }) {
  const land = bySlug(lands, (await params).land);
  return land ? { title: `${land.land_name}, ${land.park_name}`, description: land.pitch } : {};
}

export default async function LandPage({ params }) {
  const { park: parkSlug, land: landSlug } = await params;
  const land = bySlug(lands, landSlug);
  if (!land?.published || land.park_slug !== parkSlug) notFound();
  const park = bySlug(parks, parkSlug);
  const rides = attractions.filter((a) => a.land_slug === land.slug);
  const places = venues.filter((v) => v.land_slug === land.slug);

  return (
    <>
      <PageHero title={land.land_name} pitch={land.pitch} motif={land.art}
        crumbs={[{ label: 'Isla Velaluz', href: '/' }, { label: park.park_name, href: park.published ? href.park(park) : undefined }]}
        artLabel={`Illustration of ${land.land_name} at dusk.`} />
      <div className={`wrap ${s.body}`}>
        <div className={s.prose}>
          {land.description.map((p) => <p key={p}>{p}</p>)}
        </div>

        <section className={s.section}>
          <h2 className={s.h2}>Things to do</h2>
          <ul className={s.list}>
            {rides.map((a) => (
              <li key={a.slug} className={s.item}>
                <MaybeLink to={href.attraction(a)} when={a.published} className={s.itemName}>{a.attraction_name}</MaybeLink>
                <p className={s.itemMeta}>
                  {titleCase(a.attraction_type)}, {a.is_indoor ? 'indoors' : 'outdoors'}.{' '}
                  {a.min_height_in ? `Riders must be ${a.min_height_in} inches or taller.` : 'Any height.'}
                </p>
                <p className={s.itemMeta}><Thrill level={a.thrill_level} /></p>
              </li>
            ))}
          </ul>
        </section>

        <section className={s.section}>
          <h2 className={s.h2}>Eat and shop</h2>
          <ul className={s.list}>
            {places.map((v) => (
              <li key={v.slug} className={s.item}>
                <MaybeLink to={href.venue(v)} when={v.published} className={s.itemName}>{v.venue_name}</MaybeLink>
                <p className={s.itemMeta}>{titleCase(v.venue_type)}</p>
              </li>
            ))}
          </ul>
          <p className={s.note}>{land.land_name} opened in {year(land.opened_date)}.</p>
        </section>
      </div>
    </>
  );
}
