import VenueIndex from '@/components/VenueIndex';

export const metadata = { title: 'Dining', description: 'Every restaurant, cafe, bar and snack stand at Isla Velaluz.' };

export default function DiningIndex() {
  return <VenueIndex kind="dining" title="Places to eat" motif="paseo-night"
    pitch="From a churro on the plaza to the dining room at the Grand. Table service restaurants take reservations." />;
}
