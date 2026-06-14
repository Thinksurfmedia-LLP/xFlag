
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { getLiveVenues } from '@/lib/flagmag';
import { readCmsData } from '@/lib/cms';

export default async function Locations() {
  const [venues, cmsData] = await Promise.all([getLiveVenues(), readCmsData()]);

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

      <div className="breadcrumb-section">
        <div className="container">
          <ul>
            <li><Link href="/">Home</Link></li>
            <li>Locations</li>
          </ul>
        </div>
      </div>

      <section className="inner-banner-section">
        <div className="image-area">
          <img src="/assets/images/about-banner.jpg" alt="" />
        </div>
        <div className="container">
          <h1>LOCATIONS</h1>
        </div>
      </section>


      <section className="xflag-location section-padding">
        <div className="container">
          <h2>XFLAG LOCATIONS</h2>
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
                    <Link href={`/locations/${venue._id}`}>Details</Link>
                  </div>
                </div>
              </div>
            )) : (
              <div className="col-12 text-center text-muted py-5">No locations found.</div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
