import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';

export default function ResortLayout({ children }) {
  return (
    <div className="theme-lantern">
      <SiteHeader theme="lantern" />
      <main id="main">{children}</main>
      <SiteFooter theme="lantern" />
    </div>
  );
}
