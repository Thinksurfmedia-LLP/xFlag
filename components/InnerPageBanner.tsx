import Link from 'next/link';
import type { BannerSection } from '@/lib/cms/pageTypes';

interface InnerPageBannerProps {
  banner: BannerSection;
}

// Breadcrumb + title banner shared by every CMS-driven inner page.
// The breadcrumb always renders; the image banner can be hidden in the CMS.
export default function InnerPageBanner({ banner }: InnerPageBannerProps) {
  return (
    <>
      <div className="breadcrumb-section">
        <div className="container">
          <ul>
            <li><Link href="/">Home</Link></li>
            <li>{banner.breadcrumbLabel || banner.title}</li>
          </ul>
        </div>
      </div>

      {banner.enabled && (
        <section className="inner-banner-section">
          <div className="image-area">
            <img src={banner.image || '/assets/images/about-banner.jpg'} alt="" />
          </div>
          <div className="container">
            <h1>{banner.title}</h1>
          </div>
        </section>
      )}
    </>
  );
}
