import { notFound } from 'next/navigation';
import VenuePage from '@/components/VenuePage';
import { venues, bySlug, published } from '@/lib/content';

const KIND = 'dining';
const mine = () => published(venues).filter((v) => v.kind === KIND);

export const dynamicParams = false;
export const generateStaticParams = () => mine().map((v) => ({ slug: v.slug }));

export async function generateMetadata({ params }) {
  const v = bySlug(mine(), (await params).slug);
  return v ? { title: v.venue_name, description: v.pitch } : {};
}

export default async function Page({ params }) {
  const v = bySlug(mine(), (await params).slug);
  if (!v) notFound();
  return <VenuePage venue={v} />;
}
