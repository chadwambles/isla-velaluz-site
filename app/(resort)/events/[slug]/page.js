import { notFound } from 'next/navigation';
import PageHero from '@/components/PageHero';
import { events, bySlug, published, shortDate, titleCase } from '@/lib/content';
import s from '@/styles/resort.module.css';

export const dynamicParams = false;
export const generateStaticParams = () => published(events).map((e) => ({ slug: e.slug }));

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const e = bySlug(events, slug);
  return e ? { title: e.name, description: e.pitch } : {};
}

export default async function EventPage({ params }) {
  const { slug } = await params;
  const e = bySlug(events, slug);
  if (!e?.published) notFound();
  const runs = [...e.runs].reverse();

  return (
    <>
      <PageHero title={e.name} pitch={e.pitch} motif={e.art}
        crumbs={[{ label: 'Isla Velaluz', href: '/' }, { label: 'Events', href: '/events/' }]}
        artLabel={`Illustration for ${e.name}.`} />
      <div className={`wrap ${s.body}`}>
        <div className={s.cols}>
          <div>
            <div className={s.prose}>{e.description.map((p) => <p key={p}>{p}</p>)}</div>
            <section className={s.section}>
              <h2 className={s.h2}>When it has run</h2>
              <ul className={s.menu}>
                {runs.map((r) => (
                  <li key={r.label}>
                    <span>{r.label}</span>
                    <span className={s.price}>{shortDate(r.first_date)} to {shortDate(r.last_date)}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
          <aside className={s.facts}>
            <h2>At a glance</h2>
            <dl>
              <dt>What</dt><dd>{titleCase(e.event_type)}</dd>
              <dt>Where</dt><dd>{e.location}</dd>
              <dt>Entry</dt><dd>{e.registration_required ? 'Free, register in advance' : e.location === 'Paseo Velaluz' ? 'Open to everyone' : 'Included with park admission'}</dd>
            </dl>
          </aside>
        </div>
      </div>
    </>
  );
}
