import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InnerPageBanner from '@/components/InnerPageBanner';
import { readPageData } from '@/lib/cms/pageStore';
import { renderInline } from '@/lib/cms/inline';

// Saves revalidate instantly; this only bounds how long a DB-outage
// fallback render can stay cached.
export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await readPageData('about-us');
  return { title: seo.metaTitle, description: seo.metaDescription };
}

export default async function AboutUs() {
  const { banner, content } = await readPageData('about-us');

  return (
    <div className="wrapper">
      <Header />
      <InnerPageBanner banner={banner} />

      {content.enabled && (
        <section className="section-padding bg-white text-dark about-page-content">
          <div className="container">
            <div className="row content-area g-4">
              <div className={content.image ? 'col-lg-6 col-xl-7' : 'col-12'}>
                {content.introParagraphs.map((p, i) => <p key={i}>{renderInline(p)}</p>)}
              </div>
              {content.image && (
                <div className="col-lg-6 col-xl-5">
                  <div className="image-border-radius">
                    <img src={content.image} alt="" />
                  </div>
                </div>
              )}
              {content.bodyParagraphs.length > 0 && (
                <div className="col-12">
                  {content.bodyParagraphs.map((p, i) => <p key={i}>{renderInline(p)}</p>)}
                </div>
              )}
            </div>
          </div>
        </section>
      )}
      <Footer />
    </div>
  );
}
