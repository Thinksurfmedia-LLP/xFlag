
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Schedules() {
  return (
    <div className="wrapper">
      <Header />
      <div className="breadcrumb-section">
            <div className="container">
                <ul>
                    <li><a href="index.html">Home</a></li>
                    <li>schedules</li>
                </ul>
            </div>
        </div>


        <section className="inner-banner-section">
            <div className="image-area">
                <img src="/assets/images/about-banner.jpg" alt="" />
            </div>
            <div className="container">
                <h1>Schedules</h1>
            </div>
        </section>



        <section className="schedules-section section-padding">
            <div className="container">
                <div className="top-part">
                    <select name="state" id="state-select" className="form-select" defaultValue="">
                        <option value="" disabled>States</option>
                        <option value="national">National Tournament</option>
                        <option value="youth">Youth Flag Football</option>
                    </select>
                    <select name="league" id="league-select" className="form-select" defaultValue="">
                        <option value="" disabled>Leagues</option>
                        <option value="national">National Tournament</option>
                        <option value="youth">Youth Flag Football</option>
                    </select>
                    <select name="team" id="team-select" className="form-select" defaultValue="">
                        <option value="" disabled>All teams</option>
                        <option value="national">National Tournament</option>
                        <option value="youth">Youth Flag Football</option>
                    </select>

                    {/* Search Bar */}
                    <div className="search-bar">
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Search..." aria-label="Search" aria-describedby="search-addon" />
                            <button className="" type="button" id="search-addon">
                                <i className="fas fa-search"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="schedule-body">
                    <div className="left-side">
                        <ul>
                            <li><a href="#">week 1</a></li>
                            <li><a href="#">week 2</a></li>
                            <li><a href="#">week 3</a></li>
                            <li><a href="#">week 4</a></li>
                            <li><a href="#">week 5</a></li>
                            <li><a href="#">week 6</a></li>
                            <li><a href="#">week 7</a></li>
                        </ul>
                    </div>

                    <div className="right-side">
                        <div className="state-carousel-area">
                            <div className="owl-carousel state-carousel">
                                <div className="item"><a href="#">ROBB FIELD</a></div>
                                <div className="item"><a href="#">4S POWAY</a></div>
                                <div className="item"><a href="#">NORTH PARK</a></div>
                                <div className="item"><a href="#">ROBB FIELD</a></div>
                                <div className="item"><a href="#">4S POWAY</a></div>
                                <div className="item"><a href="#">NORTH PARK</a></div>
                            </div>
                        </div>

                        <table className="table">
                            <thead>
                                <tr>
                                    <th>date/time</th>
                                    <th>field 1</th>
                                    <th>field 2</th>
                                    <th>field 3</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>07:10 PM <br />09-25-2025</td>
                                    <td>
                                        <div className="main">
                                            <div className="a">
                                                <img src="/assets/images/team1.png" alt="" />
                                                <span>D1 #2 Blue Grass F25</span>
                                            </div>
                                            <div className="b">
                                                <span className="vs">vs</span>
                                            </div>
                                            <div className="a">
                                                <img src="/assets/images/team1.png" alt="" />
                                                <span>D1 #2 Blue Grass F25</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="main">
                                            <div className="a">
                                                <img src="/assets/images/team1.png" alt="" />
                                                <span>D1 #2 Blue Grass F25</span>
                                            </div>
                                            <div className="b">
                                                <span className="vs">vs</span>
                                            </div>
                                            <div className="a">
                                                <img src="/assets/images/team1.png" alt="" />
                                                <span>D1 #2 Blue Grass F25</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="main">
                                            <div className="a">
                                                <img src="/assets/images/team1.png" alt="" />
                                                <span>D1 #2 Blue Grass F25</span>
                                            </div>
                                            <div className="b">
                                                <span className="vs">vs</span>
                                            </div>
                                            <div className="a">
                                                <img src="/assets/images/team1.png" alt="" />
                                                <span>D1 #2 Blue Grass F25</span>
                                            </div>
                                        </div>
                                    </td>
                                </tr>

                                <tr>
                                    <td>07:10 PM <br />09-25-2025</td>
                                    <td>
                                        <div className="main">
                                            <div className="a">
                                                <img src="/assets/images/team1.png" alt="" />
                                                <span>D1 #2 Blue Grass F25</span>
                                            </div>
                                            <div className="b">
                                                <span className="vs">vs</span>
                                            </div>
                                            <div className="a">
                                                <img src="/assets/images/team1.png" alt="" />
                                                <span>D1 #2 Blue Grass F25</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="main">
                                            <div className="a">
                                                <img src="/assets/images/team1.png" alt="" />
                                                <span>D1 #2 Blue Grass F25</span>
                                            </div>
                                            <div className="b">
                                                <span className="vs">vs</span>
                                            </div>
                                            <div className="a">
                                                <img src="/assets/images/team1.png" alt="" />
                                                <span>D1 #2 Blue Grass F25</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="main">
                                            <div className="a">
                                                <img src="/assets/images/team1.png" alt="" />
                                                <span>D1 #2 Blue Grass F25</span>
                                            </div>
                                            <div className="b">
                                                <span className="vs">vs</span>
                                            </div>
                                            <div className="a">
                                                <img src="/assets/images/team1.png" alt="" />
                                                <span>D1 #2 Blue Grass F25</span>
                                            </div>
                                        </div>
                                    </td>
                                </tr>

                                <tr>
                                    <td>07:10 PM <br />09-25-2025</td>
                                    <td>
                                        <div className="main">
                                            <div className="a">
                                                <img src="/assets/images/team1.png" alt="" />
                                                <span>D1 #2 Blue Grass F25</span>
                                            </div>
                                            <div className="b">
                                                <span className="vs">vs</span>
                                            </div>
                                            <div className="a">
                                                <img src="/assets/images/team1.png" alt="" />
                                                <span>D1 #2 Blue Grass F25</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="main">
                                            <div className="a">
                                                <img src="/assets/images/team1.png" alt="" />
                                                <span>D1 #2 Blue Grass F25</span>
                                            </div>
                                            <div className="b">
                                                <span className="vs">vs</span>
                                            </div>
                                            <div className="a">
                                                <img src="/assets/images/team1.png" alt="" />
                                                <span>D1 #2 Blue Grass F25</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="main">
                                            <div className="a">
                                                <img src="/assets/images/team1.png" alt="" />
                                                <span>D1 #2 Blue Grass F25</span>
                                            </div>
                                            <div className="b">
                                                <span className="vs">vs</span>
                                            </div>
                                            <div className="a">
                                                <img src="/assets/images/team1.png" alt="" />
                                                <span>D1 #2 Blue Grass F25</span>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                  
                </div>
            </div>
        </section>
      <Footer />
    </div>
  );
}
