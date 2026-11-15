// Loads the generated JSON and merges in the hand-written copy.
// An entry is "published" (gets its own page) once it has copy.
import parksData from '@/content/parks.json';
import landsData from '@/content/lands.json';
import attractionsData from '@/content/attractions.json';
import hotelsData from '@/content/hotels.json';
import venuesData from '@/content/venues.json';
import tablesData from '@/content/tables.json';
import parksCopy from '@/content/copy/parks.json';
import landsCopy from '@/content/copy/lands.json';
import attractionsCopy from '@/content/copy/attractions.json';
import hotelsCopy from '@/content/copy/hotels.json';
import venuesCopy from '@/content/copy/venues.json';

const merge = (rows, copy) => rows.map((r) => ({ ...r, ...(copy[r.slug] || {}), published: Boolean(copy[r.slug]) }));

export const parks = merge(parksData, parksCopy);
export const lands = merge(landsData, landsCopy);
export const attractions = merge(attractionsData, attractionsCopy);
export const hotels = merge(hotelsData, hotelsCopy);
export const venues = merge(venuesData, venuesCopy);
export const tables = tablesData;

export const bySlug = (list, slug) => list.find((x) => x.slug === slug);
export const published = (list) => list.filter((x) => x.published);

export const href = {
  park: (p) => `/parks/${p.slug}/`,
  land: (l) => `/parks/${l.park_slug}/${l.slug}/`,
  attraction: (a) => `/attractions/${a.slug}/`,
  venue: (v) => `/${v.kind}/${v.slug}/`,
  hotel: (h) => `/hotels/${h.slug}/`,
  table: (name) => `/data/tables/${name}/`,
};

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export const year = (iso) => iso.slice(0, 4);
export const longDate = (iso) => {
  const [y, m, d] = iso.slice(0, 10).split('-').map(Number);
  return `${MONTHS[m - 1]} ${d}, ${y}`;
};
export const money = (n) => `$${n.toFixed(2)}`;
export const titleCase = (s) => s.replace(/\b\w/g, (c) => c.toUpperCase());
