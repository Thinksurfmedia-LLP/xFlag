import Link from 'next/link';

export default function Header() {
  return (
    <header className="header">
      <div className="top-header">
          <div className="container-fluid">
              <div className="row justify-content-between align-items-center">
                  <div className="col-auto logo">
                      <Link href="/">
                          <img src="/assets/images/logo1.png" alt="Logo" />
                          <img src="/assets/images/logo2.png" alt="Logo" />
                      </Link>
                  </div>

                  <div className="col right-area">
                      <div className="header-btn-col">
                          <Link href="#" className="btn btn-primary book-btn">National Tournament</Link>
                          <Link href="#" className="btn btn-info-primary">youth flag football</Link>
                          <Link href="#" className="btn btn-primary book-btn">MY-ACCOUNT</Link>
                      </div>

                      {/* FOR MOBILE */}
                      <ul className="hdr-mob-area">
                          <li><Link href="#" data-bs-toggle="modal" data-bs-target="#searchModal"><i className="fas fa-search"></i></Link></li>
                          <li><Link href="#"><i className="fas fa-user"></i></Link></li>
                          <li>
                              <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#mobileMenu" aria-controls="mobileMenu">
                                  <i className="fa-solid fa-bars-staggered"></i>
                              </button>
                          </li>
                      </ul>
                  </div>
              </div>
          </div>
      </div>
      <div className="nav-area-main">
          <div className="container-fluid">
              <div className="row">
                  <nav className="navbar navbar-expand-lg">
                      {/* Normal Menu (Desktop) */}
                      <div className="collapse navbar-collapse d-none d-lg-flex">
                          <ul className="navbar-nav">
                              <li className="nav-item"><Link className="nav-link" href="/">Home</Link></li>
                              <li className="nav-item dropdown">
                                  <Link className="nav-link dropdown-toggle" href="/about-us" data-bs-toggle="dropdown">About</Link>
                                  <ul className="dropdown-menu">
                                      <li><Link className="dropdown-item" href="/about-us">Our Team</Link></li>
                                      <li><Link className="dropdown-item" href="/about-us">Our Story</Link></li>
                                  </ul>
                              </li>
                              <li className="nav-item"><Link className="nav-link" href="/locations">Locations</Link></li>
                              <li className="nav-item"><Link className="nav-link" href="/schedules">Schedules</Link></li>
                              <li className="nav-item"><Link className="nav-link" href="/xstats">XStats</Link></li>
                              <li className="nav-item"><Link className="nav-link" href="#">Shop Now</Link></li>
                              <li className="nav-item"><Link className="nav-link" href="/resources">Resources</Link></li>
                          </ul>
                      </div>
                      {/* Offcanvas (Mobile) */}
                      <div className="offcanvas offcanvas-end d-lg-none" tabIndex={-1} id="mobileMenu">
                          <div className="offcanvas-header">
                              <div className="offcanvas-logo"><img src="/assets/images/logo2.png" alt="" /></div>
                              <button type="button" className="btn-close" data-bs-dismiss="offcanvas"></button>
                          </div>
                          <div className="offcanvas-body">
                              <ul className="navbar-nav">
                                  <li className="nav-item"><Link className="nav-link" href="/">Home</Link></li>
                                  <li className="nav-item dropdown">
                                      <Link className="nav-link dropdown-toggle" href="/about-us" data-bs-toggle="dropdown">About</Link>
                                      <ul className="dropdown-menu">
                                          <li><Link className="dropdown-item" href="/about-us">Our Team</Link></li>
                                          <li><Link className="dropdown-item" href="/about-us">Our Story</Link></li>
                                      </ul>
                                  </li>
                                  <li className="nav-item"><Link className="nav-link" href="/locations">Locations</Link></li>
                                  <li className="nav-item"><Link className="nav-link" href="/schedules">Schedules</Link></li>
                                  <li className="nav-item"><Link className="nav-link" href="/xstats">XStats</Link></li>
                                  <li className="nav-item"><Link className="nav-link" href="#">Shop Now</Link></li>
                                  <li className="nav-item"><Link className="nav-link" href="/resources">Resources</Link></li>
                              </ul>

                              <div className="header-btn-col for-mobile">
                                  <Link href="#" className="btn btn-info-primary">National Tournament</Link>
                                  <Link href="#" className="btn btn-info-primary">youth flag football</Link>
                                  <Link href="#" className="btn btn-info-primary">MY-ACCOUNT</Link>
                                  <Link href="#"><img src="/assets/images/mob-xflag-btn.png" alt="" /></Link>
                              </div>

                              <div className="social">
                                  <h5>Follow Us on</h5>
                                  <ul>
                                      <li><Link href="#"><i className="fa-brands fa-facebook-f"></i></Link></li>
                                      <li><Link href="#"><i className="fa-brands fa-twitter"></i></Link></li>
                                      <li><Link href="#"><i className="fa-brands fa-instagram"></i></Link></li>
                                  </ul>
                              </div>
                          </div>
                      </div>
                  </nav>

                  <div className="right-part">
                      {/* Social Icons */}
                      <ul className="social-icon">
                          <li><Link href="#"><i className="fa-brands fa-facebook-f"></i></Link></li>
                          <li><Link href="#"><i className="fa-brands fa-twitter"></i></Link></li>
                          <li><Link href="#"><i className="fa-brands fa-instagram"></i></Link></li>
                          <li><Link href="#"><i className="fa-brands fa-youtube"></i></Link></li>
                      </ul>

                      {/* Search Bar */}
                      <div className="search-bar">
                          <div className="input-group">
                              <input type="text" className="form-control" placeholder="Search..." aria-label="Search" aria-describedby="search-addon" />
                              <button className="" type="button" id="search-addon">
                                  <i className="fas fa-search"></i>
                              </button>
                          </div>
                      </div>

                      <div className="flagmag-button">
                          <Link href="#"><img src="/assets/images/flagmag-btn.png" alt="" /></Link>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </header>
  );
}
