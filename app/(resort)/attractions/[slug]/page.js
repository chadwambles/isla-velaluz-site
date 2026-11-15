import { notFound } from 'next/navigation';
import PageHero from '@/components/PageHero';
import Thrill from '@/components/Thrill';
import { parks, lands, attractions, bySlug, published, href, longDate, titleCase } from '@/lib/content';
import s from '@/styles/resort.module.css';

export const dynamicParams = false;
export const generateStaticParams = () => published(attractions).map((a) => ({ slug: a.slug }));

export async function generateMetadata({ params }) {
  const a = bySlug(attractions, (await params).slug);
  return a ? { title: a.attraction_name, description: a.pitch } : {};
}

export default async function AttractionPage({ params }) {
  const a = bySlug(attractions, (await params).slug);
  if (!a?.published) notFound();
  const land = bySlug(lands, a.land_slug);
  const park = bySlug(parks, a.park_slug);

  return (
    <>
      <PageHero title={a.attraction_name} pitch={a.pitch} motif={land.art || park.art}
        crumbs={[
          { label: 'Isla Velaluz', href: '/' },
          { label: park.park_name, href: park.published ? href.park(park) : undefined },
          { label: land.land_name, href: land.published ? href.land(land) : undefined },
        ]}
        artLabel={`Illustration of ${land.land_name}, home of ${a.attraction_name}.`} />
      <div className={`wrap ${s.body}`}>
        <div className={s.cols}>
          <div>
            <div className={s.prose}>{a.description.map((p) => <p key={p}>{p}</p>)}</div>
            {a.tips && (
              <section className={s.section}>
                <h2 className={s.h2}>Good to know</h2>
                <ul className={s.tips}>{a.tips.map((t) => <li key={t}>{t}</li>)}</ul>
              </section>
            )}
          </div>
          <aside className={s.facts}>
            <h2>At a glance</h2>
            <dl>
              <dt>Type</dt><dd>{titleCase(a.attraction_type)}</dd>
              <dt>Thrill</dt><dd><Thrill level={a.thrill_level} /></dd>
              <dt>Height</dt><dd>{a.min_height_in ? `${a.min_height_in} inches or taller` : 'No height requirement'}</dd>
              <dt>Length</dt><dd>About {a.ride_minutes} minutes</dd>
              <dt>Setting</dt><dd>{a.is_indoor ? 'Indoors' : 'Outdoors'}</dd>
              <dt>Storms</dt><dd>{a.is_weather_sensitive ? 'Closes when lightning is nearby' : 'Stays open in most weather'}</dd>
              <dt>Paso Rapido</dt><dd>{a.express_eligible ? 'Skip-the-line entry available' : 'Not included'}</dd>
              <dt>Opened</dt><dd>{longDate(a.opened_date)}</dd>
            </dl>
          </aside>
        </div>
      </div>
    </>
  );
}
