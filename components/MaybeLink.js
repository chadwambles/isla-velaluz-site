import Link from 'next/link';

// Links to a page when it exists, and shows plain text when it does not yet.
export default function MaybeLink({ to, when, children, className }) {
  if (!when) return <span className={className}>{children}</span>;
  return <Link href={to} className={className}>{children}</Link>;
}
