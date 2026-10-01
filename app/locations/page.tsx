import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InnerPageBanner from '@/components/InnerPageBanner';
import PageIntro from '@/components/PageIntro';
import { readPageData } from '@/lib/cms/pageStore';
import { getLiveVenues } from '@/lib/flagmag';
import { readCmsData } from '@/lib/cms';

// Saves revalidate instantly; this only bounds how long a DB-outage
// fallback render can stay cached.
export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await readPageData('locations');
  return { title: seo.metaTitle, description: seo.metaDescription };
}

export default async function Locations() {
  const [venues, cmsData, page] = await Promise.all([getLiveVenues(), readCmsData(), readPageData('locations')]);

  // Build lookup map: venue name (lowercase) → CMS entry (for images)
  const cmsMap = new Map(
    (cmsData.homepage?.featuredLocations.locations || [])
      .filter((l: any) => l.locationName)
      .map((l: any) => [l.locationName.toLowerCase().trim(), l])
  );
  const getLocationImage = (venue: any) => {
    const key = (venue.name || '').toLowerCase().trim();
    return (cmsMap.get(key) as any)?.image || '/assets/images/location-img.jpg';
  };

  return (
    <div className="wrapper">
      <Header />

      <InnerPageBanner banner={page.banner} />
      <PageIntro intro={page.intro} />


      <section className="xflag-location section-padding">
        <div className="container">
          {page.listing.heading && <h2>{page.listing.heading}</h2>}
          <div className="row g-4">
            {venues.length > 0 ? venues.map((venue: any, i: number) => (
              <div key={i} className="col-sm-6 col-xl-3">
                <div className="location-box">
                  <div className="image-area">
                    <img src={getLocationImage(venue)} alt={venue.name} />
                  </div>
                  <div className="content-area">
                    <h4>{venue.name.toUpperCase()}</h4>
                    <p>{venue.cityName}, {venue.stateAbbr}</p>
                    {/* <Link href={`/locations/${venue._id}`}>Details</Link> */}
                  </div>
                </div>
              </div>
            )) : (
              <div className="col-12 text-center text-muted py-5">{page.listing.emptyText}</div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
