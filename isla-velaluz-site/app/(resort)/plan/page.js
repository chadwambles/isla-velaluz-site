import PageHero from '@/components/PageHero';
import TripPlanner from '@/components/TripPlanner';
import s from '@/styles/resort.module.css';

export const metadata = { title: 'Plan a visit', description: 'Try planning a trip to Isla Velaluz. It is a practice run: the resort is fictional and nothing is booked.' };

export default function Plan() {
  return (
    <>
      <PageHero title="Plan a visit" pitch="Pick your dates, a place to stay and your park days, and see what a trip would come to."
        motif="harbor-hotel" crumbs={[{ label: 'Isla Velaluz', href: '/' }]} artLabel="Illustration of a harbor-side hotel at dusk." />
      <div className={`wrap ${s.body}`}>
        <TripPlanner />
      </div>
    </>
  );
}
