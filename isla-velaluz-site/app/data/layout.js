import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';

export const metadata = {
  title: { default: 'Data Center', template: '%s | Isla Velaluz Data Center' },
};

export default function DataLayout({ children }) {
  return (
    <div className="theme-chart">
      <SiteHeader theme="chart" />
      <main id="main">{children}</main>
      <SiteFooter theme="chart" />
    </div>
  );
}
