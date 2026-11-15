import { SITE_URL } from '@/components/links';

export const dynamic = 'force-static';

export default function robots() {
  return {
    // The answers gate is kept out of search with a noindex tag on the page itself, so crawlers must be able to read it.
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
