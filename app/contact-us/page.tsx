import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InnerPageBanner from '@/components/InnerPageBanner';
import { readPageData } from '@/lib/cms/pageStore';
import ContactForm from './ContactForm';

// Saves revalidate instantly; this only bounds how long a DB-outage
// fallback render can stay cached.
export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await readPageData('contact');
  return { title: seo.metaTitle, description: seo.metaDescription };
}

export default async function ContactUs() {
  const { banner, contactInfo, form } = await readPageData('contact');
  const showBoth = contactInfo.enabled && form.enabled;

  return (
    <div className="wrapper">
      <Header />
      <InnerPageBanner banner={banner} />

      {(contactInfo.enabled || form.enabled) && (
        <section className="sponsorship-section contactus-section section-padding">
          <div className="container">
            <div className="row gy-4 gx-5">
              {contactInfo.enabled && (
                <div className={showBoth ? 'col-lg-6' : 'col-12'}>
                  <div className="contact-area-wrap">
                    <div className="contact-area">
                      {contactInfo.heading && <h2>{contactInfo.heading}</h2>}
                      <ul>
                        {contactInfo.phoneDisplay && (
                          <li><span><i className="fa-solid fa-phone"></i></span> <a href={`tel:${contactInfo.phone.replace(/[^\d+]/g, '')}`}>{contactInfo.phoneDisplay}</a></li>
                        )}
                        {contactInfo.email && (
                          <li><span><i className="fa-solid fa-envelope"></i></span> <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a></li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {form.enabled && (
                <div className={showBoth ? 'col-lg-6' : 'col-12'}>
                  <ContactForm heading={form.heading} description={form.description} />
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
