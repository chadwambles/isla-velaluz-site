import Link from 'next/link';
import PageHero from '@/components/PageHero';
import { KAGGLE_URL, AUTHOR_URL } from '@/components/links';
import s from '@/styles/resort.module.css';

export const metadata = { title: 'About this site', description: 'Isla Velaluz is a fictional resort, built as the setting for a free synthetic dataset.' };

export default function About() {
  return (
    <>
      <PageHero title="None of this is real" pitch="Isla Velaluz is an invented resort. It exists so that analysts have a believable company to practice on."
        motif="park-skyline" crumbs={[{ label: 'Isla Velaluz', href: '/' }]} artLabel="Illustration of the Isla Velaluz skyline at dusk." />
      <div className={`wrap ${s.body}`}>
        <div className={s.prose}>
          <h2 className={s.h2}>What you are looking at</h2>
          <p>There is no island, no lighthouse and no Keeper&apos;s Table. The parks, hotels, restaurants, guests and staff on this site were made up, and nothing here can be visited, booked or bought. The trip planner is a demonstration that ends by saying so.</p>
          <p>What is real is the dataset behind it. Isla Velaluz is the setting for eight years of simulated company records: 64 connected tables covering bookings, park entries, rides, sales, staffing, maintenance, marketing and the general ledger. It is free for anyone to use.</p>
        </div>
        <section className={s.section}>
          <h2 className={s.h2}>Why it was made</h2>
          <div className={s.prose}>
            <p>People learning business analysis and data analysis need projects that look like real work, and most free datasets are a single tidy table. Real companies are dozens of tables that have to be joined, with questions that do not announce their own answers.</p>
            <p>So this one was built by simulating a company day by day. Every page on the resort side of this site is generated from that same data, which is why a ride&apos;s height requirement or a cafe&apos;s menu here matches what you will find in the tables.</p>
          </div>
        </section>
        <section className={s.section}>
          <h2 className={s.h2}>Who made it</h2>
          <div className={s.prose}>
            <p>Isla Velaluz was created by <a href={AUTHOR_URL}>Chad Wambles</a>, a business analyst and product owner in Florida. More of his work is at <a href={AUTHOR_URL}>chadtheanalyst.com</a>.</p>
            <p>Any resemblance to a real resort, business or person is unintended. The names were checked against existing hotels and trademarks, and the artwork is original.</p>
          </div>
        </section>
        <section className={s.section}>
          <h2 className={s.h2}>Using the data</h2>
          <div className={s.prose}>
            <p>The dataset is published under CC BY 4.0. Use it for portfolio pieces, teaching, tutorials or anything else, with credit. Start at the <Link href="/data/">Data Center</Link>, or go straight to the <a href={KAGGLE_URL}>download on Kaggle</a>.</p>
          </div>
        </section>
      </div>
    </>
  );
}
