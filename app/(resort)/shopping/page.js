import VenueIndex from '@/components/VenueIndex';

export const metadata = { title: 'Shopping', description: 'Every shop at Isla Velaluz, in the parks, the hotels and on Paseo Velaluz.' };

export default function ShoppingIndex() {
  return <VenueIndex kind="shopping" title="Shops" motif="paseo-night"
    pitch="Park shirts, plush, pins and the things you forgot to pack, in every park and along the Paseo." />;
}
