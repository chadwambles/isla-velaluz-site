import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';

export const metadata = { title: 'Page not found' };

export default function NotFound() {
  return (
    <div className="theme-lantern">
      <SiteHeader theme="lantern" />
      <main id="main" className="wrap" style={{ paddingBlock: '5rem' }}>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.25rem)', marginBottom: '1rem' }}>This path runs off the map</h1>
        <p>
          The page you asked for is not on the island. <Link href="/">Go back to the resort</Link>, see{' '}
          <Link href="/parks/">the parks</Link>, or open the <Link href="/data/">Data Center</Link>.
        </p>
      </main>
      <SiteFooter theme="lantern" />
    </div>
  );
}
