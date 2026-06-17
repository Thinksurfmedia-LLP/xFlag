
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ContactUs() {
  return (
    <div className="wrapper">
      <Header />
      <div className="breadcrumb-section">
            <div className="container">
                <ul>
                    <li><a href="index.html">Home</a></li>
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
                        <div className="form-area">
                            <div className="heading-area">
                                <h2>Get in touch</h2>
                                <p>Fill out the form below to let us know what interest you may have and we will reach out to set up an official meeting shortly.</p>
                            </div>
                            <form action="#">
                                <div className="row">
                                    <div className="col-6">
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="First Name" required />
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="Last Name" required />
                                        </div>
                                    </div>

                                    <div className="col-6">
                                        <div className="form-group">
                                            <input type="email" className="form-control" placeholder="Email" required />
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="form-group">
                                            <input type="tel" className="form-control" placeholder="Phone Number" required />
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="Company Name" />
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="Message" />
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
