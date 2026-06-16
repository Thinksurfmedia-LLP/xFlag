
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function AboutUs() {
  return (
    <div className="wrapper">
      <Header />
      <div className="breadcrumb-section">
            <div className="container">
                <ul>
                    <li><Link href="/">Home</Link></li>
                    <li>About Us</li>
                </ul>
            </div>
        </div>


        <section className="inner-banner-section">
            <div className="image-area">
                <img src="/assets/images/about-banner.jpg" alt="" />
            </div>
            <div className="container">
                <h1>About Us</h1>
            </div>
        </section>



        <section className="section-padding bg-white text-dark about-page-content">
            <div className="container">
                <div className="row content-area g-4">
                    <div className="col-lg-6 col-xl-7">
                        {/* <h2>XFLAGFOOTBALL was Founded</h2> */}
                        <p>XFLAGFOOTBALL was Founded in the summer of 2007 by 5 experienced flag football players, making it the longest running flag football league in the US. The Founders played in different adult flag leagues in Southern California for many years. After realizing that many leagues were putting profits first and not the players, XFLAGFOOTBALL’s Founders decided to make a change and start XFLAGFOOTBALL - a league for the Players, by the Players.</p>
                        <p>XFLAGFOOTBALL is committed to providing the best possible experience for its players, friends, and family. XFLAGFOOTBALL’s mission is to provide a safe, competitive, and family orientated environment. We provide our players a means to exercise, stay in shape, and meet others with similar interests.  We strive to promote health, fitness, recreation, sportsmanship, camaraderie, and friendly competition. XFLAGFOOTBALL believes in giving back to the community via fundraisers, charitable donations, and partnering with local schools to manage their off season passing leagues.</p>
                    </div>
                    <div className="col-lg-6 col-xl-5">
                        <div className="image-border-radius">
                            <img src="/assets/images/about-img1.jpg" alt="" />
                        </div>
                    </div>
                    <div className="col-12">
                        <p>Michael Zimmerman was one of the 5 Founders of XFLAGFOOTBALL, and today he is the CEO of the company. Michael has played over 60 seasons of flag football. He has been a lifetime athlete and has devoted his life to sports. He played football, baseball, and basketball in High school. He then went onto play Division 1 College Football. As the CEO of XFLAGFOOTBALL, he is very proud to offer multiple sports to Youth and Adults Nationwide. He is passionate about sharing his knowledge and love of sports. Michael is still an active player in the league with multiple high level teams through out XFLAGFOOTBALL. It should also be noted that Michael has competed on multiple reality television shows, having won 2 of them: Pros v Joes and Estate of Panic. He brings his competitive and winning attitude to the running, expansion, and continuing excellence of XFLAGFOOTBALL.</p>
                        <p>Michael can be contacted at <a href="mailto:mzimmerman@xflagfootball.com">mzimmerman@xflagfootball.com</a></p>
                    </div>
                </div>
            </div>
        </section>
      <Footer />
    </div>
  );
}
