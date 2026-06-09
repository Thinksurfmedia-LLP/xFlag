
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function Locations() {
  return (
    <div className="wrapper">
      <Header />

      <div className="breadcrumb-section">
        <div className="container">
          <ul>
            <li><Link href="/">Home</Link></li>
            <li>locations</li>
          </ul>
        </div>
      </div>

      <section className="inner-banner-section">
        <div className="image-area">
          <img src="/assets/images/about-banner.jpg" alt="" />
        </div>
        <div className="container">
          <h1>locations</h1>
        </div>
      </section>

      <section className="location-search-section">
        <div className="container">
          <div className="location-area">
            <h4>Select Location</h4>
            <div className="input-group">
              <input type="text" className="form-control" placeholder="Search..." aria-label="Search" aria-describedby="loc-search-addon" />
              <button className="btn btn-primary" type="button" id="loc-search-addon">
                Search <i className="fas fa-search"></i>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="xflag-location section-padding">
        <div className="container">
          <h2>Xflag Locations</h2>
          <div className="row g-4">
            {[0,1,2,3,4,5,6,7].map((i) => (
              <div key={i} className="col-sm-6 col-xl-3">
                <div className="location-box">
                  <div className="image-area">
                    <img src="/assets/images/location-img.jpg" alt="" />
                  </div>
                  <div className="content-area">
                    <h4>Robb Field</h4>
                    <p>2525 Bacon St San Diego</p>
                    <Link href="/location-details">details</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
