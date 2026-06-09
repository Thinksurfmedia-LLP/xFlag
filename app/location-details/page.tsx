
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function LocationDetails() {
  return (
    <div className="wrapper">
      <Header />

      <div className="breadcrumb-section">
        <div className="container">
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/locations">locations</Link></li>
            <li>Robb Field</li>
          </ul>
        </div>
      </div>

      <section className="inner-banner-section">
        <div className="image-area">
          <img src="/assets/images/about-banner.jpg" alt="" />
        </div>
        <div className="container">
          <h1>Robb Field</h1>
        </div>
      </section>

      <section className="location-gallery contactus-section section-padding">
        <div className="container">
          <div className="row g-4">
            <div className="col-12 mb-4">
              <div className="text-center">
                <h2 className="text-dark">Gallery</h2>
              </div>
            </div>
            {[0,1,2,3,4,5,6,7].map((i) => (
              <div key={i} className="col-sm-6 col-xl-3">
                <div className="gallery-box">
                  <a data-fancybox="gallery" href="/assets/images/gallery1.jpg">
                    <img src="/assets/images/gallery1.jpg" alt="" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="row g-4 mt-5">
            <div className="col-lg-6">
              <div className="contact-area-wrap">
                <div className="contact-area">
                  <h2>contact info</h2>
                  <ul>
                    <li><span><i className="fa-solid fa-map-location-dot"></i></span> <Link href="#">Directions</Link></li>
                    <li><span><i className="fa-solid fa-phone"></i></span> <Link href="#">0123-456-789</Link></li>
                    <li><span><i className="fa-solid fa-envelope"></i></span> <Link href="#">mzimmerman@xflagfootball.com</Link></li>
                    <li><span><i className="fa-solid fa-location-dot"></i></span> <span>123 Main St, City, Country</span></li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="contact-area-wrap">
                <div className="contact-area">
                  <h2>facilities</h2>
                  <ul>
                    <li><span>01</span> Athlete & Team Facilities</li>
                    <li><span>02</span> Spectator Amenities</li>
                    <li><span>03</span> Operational & Media Infrastructure</li>
                    <li><span>04</span> Safety & Technology</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
