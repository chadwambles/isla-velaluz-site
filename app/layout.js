import '@fontsource/gloock/400.css';
import '@fontsource-variable/albert-sans';
import '@fontsource/azeret-mono/400.css';
import '@fontsource/azeret-mono/500.css';
import '@/styles/globals.css';
import { SITE_URL } from '@/components/links';

const DESCRIPTION =
  'Isla Velaluz is a fictional island resort and the home of a free synthetic dataset for analyst portfolio projects.';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: 'Isla Velaluz Resort', template: '%s | Isla Velaluz Resort' },
  description: DESCRIPTION,
  openGraph: { siteName: 'Isla Velaluz', type: 'website', images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Isla Velaluz: an island at dusk with a lighthouse, a coaster and lanterns along the shore.' }] },
  twitter: { card: 'summary_large_image', images: ['/og.png'] },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
