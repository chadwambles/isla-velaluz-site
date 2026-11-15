import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="theme-lantern">
      <main className="wrap" style={{ paddingBlock: '5rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>This path runs off the map</h1>
        <p>The page you asked for is not on the island. <Link href="/">Go back to the resort</Link> or <Link href="/data/">open the Data Center</Link>.</p>
      </main>
    </div>
  );
}
