import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactForm from './ContactForm';

export default function ContactUs() {
  return (
    <div className="wrapper">
      <Header />
      <div className="breadcrumb-section">
        <div className="container">
          <ul>
            <li><a href="/">Home</a></li>
            <li>contact us</li>
          </ul>
        </div>
      </div>

      <section className="inner-banner-section">
        <div className="image-area">
          <img src="/assets/images/about-banner.jpg" alt="" />
        </div>
        <div className="container">
          <h1>contact us</h1>
        </div>
      </section>

      <section className="sponsorship-section contactus-section section-padding">
        <div className="container">
          <div className="row gy-4 gx-5">
            <div className="col-lg-6">
              <div className="contact-area-wrap">
                <div className="contact-area">
                  <h2>contact info</h2>
                  <ul>
                    <li><span><i className="fa-solid fa-phone"></i></span> <a href="tel:8553524411">855 - 3524 - 411</a></li>
                    <li><span><i className="fa-solid fa-envelope"></i></span> <a href="mailto:mzimmerman@xflagfootball.com">mzimmerman@xflagfootball.com</a></li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
