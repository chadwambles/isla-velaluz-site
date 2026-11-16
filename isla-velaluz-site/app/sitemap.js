import { parks, lands, attractions, venues, hotels, events, tables, published, href } from '@/lib/content';
import { SITE_URL } from '@/components/links';

export const dynamic = 'force-static';

// Every public page except the answers gate, which stays out of search engines on purpose.
export default function sitemap() {
  const paths = [
    '/', '/parks/', '/hotels/', '/dining/', '/shopping/', '/events/', '/paseo/', '/tickets/', '/plan/', '/about/',
    '/data/', '/data/tables/', '/data/questions/', '/data/downloads/',
    ...published(parks).map(href.park),
    ...published(lands).map(href.land),
    ...published(attractions).map(href.attraction),
    ...published(venues).map(href.venue),
    ...published(hotels).map(href.hotel),
    ...published(events).map(href.event),
    ...tables.map((t) => href.table(t.name)),
  ];
  return paths.map((p) => ({ url: SITE_URL + p }));
}
