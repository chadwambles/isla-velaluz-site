import '@fontsource/gloock/400.css';
import '@fontsource-variable/albert-sans';
import '@fontsource/azeret-mono/400.css';
import '@fontsource/azeret-mono/500.css';
import '@/styles/globals.css';

export const metadata = {
  title: { default: 'Isla Velaluz Resort', template: '%s | Isla Velaluz Resort' },
  description:
    'Isla Velaluz is a fictional island resort and the home of a free synthetic dataset for analyst portfolio projects.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
