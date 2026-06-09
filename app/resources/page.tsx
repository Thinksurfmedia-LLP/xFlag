
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function Resources() {
  return (
    <div className="wrapper">
      <Header />

      <div className="breadcrumb-section">
        <div className="container">
          <ul>
            <li><Link href="/">Home</Link></li>
            <li>resources</li>
          </ul>
        </div>
      </div>

      <section className="inner-banner-section">
        <div className="image-area">
          <img src="/assets/images/about-banner.jpg" alt="" />
        </div>
        <div className="container">
          <h1>Resources</h1>
        </div>
      </section>

      <section className="sponsor-page-logo-section">
        <div className="container">
          <div className="owl-carousel owl-theme sponsors-carousel">
            <div className="item">
              <div className="image-area"><img src="/assets/images/s5.jpg" alt="" /></div>
              <h5>Riddell</h5>
            </div>
            <div className="item">
              <div className="image-area"><img src="/assets/images/s1.jpg" alt="" /></div>
              <h5>Sweet&apos;N Low</h5>
            </div>
            <div className="item">
              <div className="image-area"><img src="/assets/images/s2.jpg" alt="" /></div>
              <h5>OSIDE Shop</h5>
            </div>
            <div className="item">
              <div className="image-area"><img src="/assets/images/s3.jpg" alt="" /></div>
              <h5>Waterwise Landscape Company</h5>
            </div>
            <div className="item">
              <div className="image-area"><img src="/assets/images/s4.jpg" alt="" /></div>
              <h5>Hooters</h5>
            </div>
          </div>
        </div>
      </section>

      <section className="sponsorship-section section-padding">
        <div className="container">
          <div className="row gy-4">
            <div className="col-lg-6">
              <div className="heading-area">
                <h2>SPONSORSHIP ASSETS</h2>
                <p>With a massive grass roots ecosystem complimented by a major digital following, we have unlimited sponsorship opportunities to match your brand goals!</p>
              </div>
              <ul className="list2">
                <li>Presenting & Title Opportunities</li>
                <li>Champions Stage & Signage</li>
                <li>Bracket Logo Sponsors</li>
                <li>Commercial Assets when Televised</li>
                <li>Local Food & Beverage Partners</li>
              </ul>

              <h6>Demographics</h6>
              <ul className="list2">
                <li>Presenting & Title Opportunities</li>
                <li>Champions Stage & Signage</li>
                <li>Bracket Logo Sponsors</li>
                <li>Commercial Assets when Televised</li>
                <li>Local Food & Beverage Partners</li>
                <li>Champions Stage & Signage</li>
              </ul>
            </div>

            <div className="col-lg-6">
              <div className="form-area">
                <div className="heading-area">
                  <h2>INTEREST FORM</h2>
                  <p>Fill out the form below to let us know what interest you may have and we will reach out to set up an official meeting shortly.</p>
                </div>
                <form action="#">
                  <div className="row">
                    <div className="col-6">
                      <div className="form-group">
                        <label htmlFor="firstName">First Name*</label>
                        <input type="text" id="firstName" className="form-control" placeholder="First Name" required />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group">
                        <label htmlFor="lastName">Last Name*</label>
                        <input type="text" id="lastName" className="form-control" placeholder="Last Name" required />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group">
                        <label htmlFor="email">Email*</label>
                        <input type="email" id="email" className="form-control" placeholder="Email" required />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group">
                        <label htmlFor="phone">Phone Number*</label>
                        <input type="tel" id="phone" className="form-control" placeholder="Phone Number" required />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group">
                        <label htmlFor="company">Company Name</label>
                        <input type="text" id="company" className="form-control" placeholder="Company Name" />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group">
                        <label htmlFor="budget">What type of budget range do you have at your disposal for sponsorable assets?</label>
                        <input type="text" id="budget" className="form-control" placeholder="Budget Range" />
                      </div>
                    </div>
                    <div className="col-12">
                      <input type="submit" className="btn btn-primary w-100" value="SEND" />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
