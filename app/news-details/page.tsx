
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function NewsDetails() {
  return (
    <div className="wrapper">
      <Header />
      <div className="breadcrumb-section">
            <div className="container">
                <ul>
                    <li><a href="index.html">Home</a></li>
                    <li>news</li>
                </ul>
            </div>
        </div>


        <section className="inner-banner-section">
            <div className="image-area">
                <img src="/assets/images/about-banner.jpg" alt="" />
            </div>
            <div className="container">
                <h1>news</h1>
            </div>
        </section>





        <section className="news-details-section">
            <div className="container">
                <div className="featured-image-area">
                    <img src="/assets/images/news1-big.jpg" alt="" />
                </div>

                <div className="content-area">
                    <div className="date">
                        <h6>Sep 19, 2025 | by XFLAGFOOTBALL</h6>
                    </div>
                    <h2>MENS LEAGUE CASH COUNTIES XXI!</h2>
                    <p>CASH COUNTIES XXI! Come join the longest running flag league in the US! 10 Stated Games! Custom Championship Gear! Top Statistical Leader Award Shirts! Most Locations to Choose From! Join us for our Fall 2025 Season! We start in September! Contact us ASAP to get your team signed up or sign up as a free agent!</p>
                    <p> CASH COUNTIES XXI! Come join the longest running flag league in the US! 10 Stated Games! Custom Championship Gear! Top Statistical Leader Award Shirts! Most Locations to Choose From! Join us for our Fall 2025 Season! We start in September! Contact us ASAP to get your team signed up or sign up as a free agent! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris. Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit. Donec et mollis dolor. Praesent et diam eget libero egestas mattis sit amet vitae augue. Nam tincidunt congue enim, ut porta lorem lacinia consectetur. Donec ut libero sed arcu vehicula ultricies a non tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut gravida lorem. Ut turpis felis, pulvinar a semper sed, adipiscing id dolor.</p>

                    <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris. Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit. Donec et mollis dolor. Praesent et diam eget libero egestas mattis sit amet vitae augue. Nam tincidunt congue enim, ut porta lorem lacinia consectetur. Donec ut libero sed arcu vehicula ultricies a non tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut gravida lorem. Ut turpis felis, pulvinar a semper sed, adipiscing id dolor. </p>


                </div>

            </div>
        </section>

        <section className="related-news-section section-padding">
            <div className="container">
                <div className="top-part">
                    <h2>Latest news</h2>
                    <a href="#" className="btn btn-primary d-none d-md-block">See More</a>
                </div>

                <div className="row g-4">
                    <div className="col-sm-6 col-md-4 col-xl-3">
                        <div className="news-area">
                            <div className="image-area">
                                <img src="/assets/images/news1.jpg" alt="" />
                            </div>
                            <div className="content-area">
                                <h3><a href="#">Mens league - cash counties XXI!</a></h3>
                                <p>sep 19, 2025</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-4 col-xl-3">
                        <div className="news-area">
                            <div className="image-area">
                                <img src="/assets/images/news2.jpg" alt="" />
                            </div>
                            <div className="content-area">
                                <h3><a href="#">SD Womens</a></h3>
                                <p>sep 19, 2025</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-4 col-xl-3">
                        <div className="news-area">
                            <div className="image-area">
                                <img src="/assets/images/news3.jpg" alt="" />
                            </div>
                            <div className="content-area">
                                <h3><a href="#">Mens league - cash counties XXI!</a></h3>
                                <p>sep 19, 2025</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-4 col-xl-3">
                        <div className="news-area">
                            <div className="image-area">
                                <img src="/assets/images/news4.jpg" alt="" />
                            </div>
                            <div className="content-area">
                                <h3><a href="#">SD Womens</a></h3>
                                <p>sep 19, 2025</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="text-center d-md-none mt-4">
                    <a href="#" className="btn btn-primary">See More</a>
                </div>

            </div>
        </section>
      <Footer />
    </div>
  );
}
