import Link from 'next/link';

export default function Footer() {
  return (
    <>
      <footer>
          <div className="top-footer">
              <div className="container">
                  <div className="row gy-4">
                      <div className="col-xl-4">
                          <div className="logo-area">
                              <img src="/assets/images/white-logo.png" alt="" />
                              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                              <ul className="social-icon">
                                  <li><Link href="#"> <i className="fa-brands fa-facebook-f"></i></Link></li>
                                  <li><Link href="#"> <i className="fa-brands fa-twitter"></i></Link></li>
                                  <li><Link href="#"> <i className="fa-brands fa-instagram"></i></Link></li>
                              </ul>
                          </div>
                      </div>
                      <div className="col-xl-8">
                          <div className="row gy-4">
                              <div className="col-xl-3 col-6">
                                  <div className="nav-area">
                                      <h4>Home</h4>
                                      <ul>
                                          <li><Link href="/xstats">Xstats</Link></li>
                                          <li><Link href="/locations">Locations</Link></li>
                                          <li><Link href="#">Store</Link></li>
                                          <li><Link href="#">Media</Link></li>
                                      </ul>
                                  </div>
                              </div>

                              <div className="col-xl-3 col-6">
                                  <div className="nav-area">
                                      <h4>About XFF</h4>
                                      <ul>
                                          <li><Link href="#">History</Link></li>
                                          <li><Link href="#">Testimonials</Link></li>
                                          <li><Link href="#">News Contact</Link></li>
                                          <li><Link href="#">XFF</Link></li>
                                      </ul>
                                  </div>
                              </div>

                              <div className="col-xl-3 col-6">
                                  <div className="nav-area">
                                      <h4>Info</h4>
                                      <ul>
                                          <li><Link href="#">Expansion Opps</Link></li>
                                          <li><Link href="#">Rules & Policies</Link></li>
                                          <li><Link href="#">Waivers</Link></li>
                                      </ul>
                                  </div>
                              </div>

                              <div className="col-xl-3 col-6 contact-column">
                                  <div className="nav-area contact">
                                      <h4>Contact</h4>
                                      <ul>
                                          <li><i><i className="fa-solid fa-phone"></i></i><Link href="#">91+ 920565214</Link></li>
                                          <li><i><i className="fa-solid fa-envelope"></i></i><Link href="#">xflag@mail.com</Link></li>
                                          <li><i><i className="fa-solid fa-location-dot"></i></i> 45, 1st Floor, New York, USA</li>
                                      </ul>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          
          <div className="copyright-area">
              <div className="container">
                  <div className="row align-items-center justify-content-between">
                      <div className="col-lg-auto mb-2 mb-lg-0">
                          <p>All Rights Reserved © 2026</p>
                      </div>
                      <div className="col-lg-auto">
                          <ul>
                              <li><Link href="#">privacy policy</Link></li>
                              <li><Link href="#">terms & conditions</Link></li>
                          </ul>
                      </div>
                  </div>
              </div>
          </div>
      </footer>

      {/* Search Modal */}
      <div className="modal fade search-modal-area" id="searchModal" tabIndex={-1} aria-hidden="true">
          <div className="modal-dialog">
              <div className="modal-content">
                  <div className="modal-header">
                      <h4 className="modal-title fs-5">Search</h4>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                      <div className="mob-search-bar">
                          <div className="input-group">
                              <input type="text" className="form-control" placeholder="Search..." aria-label="Search" aria-describedby="search-addon" />
                              <button className="btn btn-primary" type="button" id="search-addon">
                                  <i className="fas fa-search"></i>
                              </button>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </>
  );
}
