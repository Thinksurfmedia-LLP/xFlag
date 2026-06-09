
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function News() {
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





        <section className="newspage-section section-padding">
            <div className="container">
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

                <div className="pagination-area">
                    <ul className="pagination">
                        <li className="page-item"><a className="page-link" href="#"><i className="fa-solid fa-angles-left"></i></a></li>
                        <li className="page-item active"><a className="page-link" href="#">1</a></li>
                        <li className="page-item"><a className="page-link" href="#">2</a></li>
                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                        <li className="page-item"><a className="page-link" href="#"><i className="fa-solid fa-angles-right"></i></a></li>
                    </ul>
                </div>
            </div>
        </section>
      <Footer />
    </div>
  );
}
