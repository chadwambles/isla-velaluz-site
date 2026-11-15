import PageHero from '@/components/PageHero';
import { tickets, titleCase, dollars } from '@/lib/content';
import s from '@/styles/resort.module.css';

export const metadata = { title: 'Tickets and passes', description: 'How one-day tickets, Paso Rapido and annual passes work at Isla Velaluz.' };

const TIER_NOTE = { value: 'The quietest dates', regular: 'Most days of the year', peak: 'Holiday periods and the busiest weekends' };

export default function Tickets() {
  return (
    <>
      <PageHero title="Tickets and passes" pitch="One-day prices depend on the date. Passes come in three levels, and the difference is which days you can use them."
        motif="lighthouse-plaza" crumbs={[{ label: 'Isla Velaluz', href: '/' }]} artLabel="Illustration of the park entrance plaza at dusk." />
      <div className={`wrap ${s.body}`}>
        <section>
          <h2 className={s.h2}>One-day tickets</h2>
          <div className={s.prose}>
            <p>An adult one-day ticket is priced by the day you visit. Every date falls into one of three tiers, and the calendar shows which before you buy. Multi-day tickets cost less per day, and the water park can be added to any ticket.</p>
          </div>
          <ul className={`${s.menu} ${s.wide}`}>
            {tickets.one_day_prices.map((t) => (
              <li key={t.tier}>
                <span><strong>{titleCase(t.tier)}</strong>. {TIER_NOTE[t.tier]}.</span>
                <span className={s.price}>{dollars(t.low)} to {dollars(t.high)}</span>
              </li>
            ))}
          </ul>
          <p className={s.note}>Adult prices for one park, one day, before tax.</p>
        </section>

        <section className={s.section}>
          <h2 className={s.h2}>Paso Rapido</h2>
          <div className={s.prose}>
            <p>Paso Rapido is the paid skip-the-line pass. You buy it per person for one park on one day, and it gets you into a shorter entrance at the rides that offer it. The price varies by date.</p>
            <p>Each attraction page says whether Paso Rapido is available there.</p>
          </div>
        </section>

        <section className={s.section}>
          <h2 className={s.h2}>Annual passes</h2>
          <ul className={s.list}>
            {tickets.passes.map((p) => (
              <li key={p.pass_name} className={s.item}>
                <span className={s.itemName}>{p.pass_name}</span>
                <p className={s.itemMeta}>
                  {dollars(p.price)} a year. {p.blocked_dates === 'none' ? 'Good every day the parks are open.' : `Not valid on ${p.blocked_dates}.`}{' '}
                  {p.includes_water_park ? 'Includes Playa Zambulla.' : 'Theme parks only.'}
                </p>
              </li>
            ))}
          </ul>
          <p className={s.note}>A pass is for one person and runs for a year from the day it starts.</p>
        </section>
      </div>
    </>
  );
}
