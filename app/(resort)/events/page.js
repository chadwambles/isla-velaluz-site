import PageHero from '@/components/PageHero';
import MaybeLink from '@/components/MaybeLink';
import { events, href, shortDate } from '@/lib/content';
import s from '@/styles/resort.module.css';

export const metadata = { title: 'Events', description: 'Festivals and concert nights at Isla Velaluz through the year.' };

export default function EventsIndex() {
  const byMonth = [...events].sort((a, b) => a.runs.at(-1).first_date.slice(5).localeCompare(b.runs.at(-1).first_date.slice(5)));
  return (
    <>
      <PageHero title="Through the year" pitch="Two concert seasons and three festivals, in the order they come around."
        motif="paseo-night" crumbs={[{ label: 'Isla Velaluz', href: '/' }]} artLabel="Illustration of a concert night on Paseo Velaluz." />
      <div className={`wrap ${s.body}`}>
        {byMonth.map((e) => {
          const last = e.runs.at(-1);
          return (
            <section key={e.slug} className={s.block}>
              <h2 className={s.h2}><MaybeLink to={href.event(e)} when={e.published} className={s.h2link}>{e.name}</MaybeLink></h2>
              <p>{e.pitch}</p>
              <p className={s.itemMeta}>
                {e.location}. Most recently {shortDate(last.first_date)} to {shortDate(last.last_date)}, {last.first_date.slice(0, 4)}.{' '}
                {e.registration_required ? 'Registration required.' : 'No registration needed.'}
              </p>
            </section>
          );
        })}
      </div>
    </>
  );
}
