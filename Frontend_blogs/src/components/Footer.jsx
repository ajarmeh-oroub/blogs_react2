import React from 'react'

export default function Footer() {
  return (
    <>
      <div className="footer-area bg-black pd-top-95">
        <div className="container">
          <div className="row">
            {/* About Us Section */}
            <div className="col-lg-4 col-sm-6">
              <div className="widget">
                <h5 className="widget-title">ABOUT US</h5>
                <div className="widget_about">
                  <p>
                    We are a passionate company dedicated to bringing the best
                    products and services to our customers. Our goal is to provide
                    top-quality items with excellent customer service.
                  </p>
                  <ul className="social-area social-area-2 mt-4">
                    <li>
                      <a className="facebook-icon" href="https://www.facebook.com">
                        <i className="fa fa-facebook" />
                      </a>
                    </li>
                    <li>
                      <a className="twitter-icon" href="https://www.twitter.com">
                        <i className="fa fa-twitter" />
                      </a>
                    </li>
                    <li>
                      <a className="youtube-icon" href="https://www.youtube.com">
                        <i className="fa fa-youtube-play" />
                      </a>
                    </li>
                    <li>
                      <a className="instagram-icon" href="https://www.instagram.com">
                        <i className="fa fa-instagram" />
                      </a>
                    </li>
                    <li>
                      <a className="google-icon" href="https://plus.google.com">
                        <i className="fa fa-google-plus" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Tags Section */}
            <div className="col-lg-4 col-sm-6">
              <div className="widget widget_tag_cloud">
                <h5 className="widget-title">CATEGORIES</h5>
                <div className="tagcloud">
                  <a href="#">Technology</a>
                  <a href="#">Innovation</a>
                  <a href="#">Health</a>
                  <a href="#">Travel</a>
                  <a href="#">Gaming</a>
                  <a href="#">Education</a>
                  <a href="#">Design</a>
                  <a href="#">Lifestyle</a>
                </div>
              </div>
            </div>

            {/* Contacts Section */}
            <div className="col-lg-4 col-sm-6">
              <div className="widget">
                <h5 className="widget-title">CONTACTS</h5>
                <ul className="contact_info_list">
                  <li>
                    <i className="fa fa-map-marker" /> 123 Main Street, Cityville, 
                    State, 12345
                  </li>
                  <li>
                    <i className="fa fa-phone" /> +1 (800) 123-4567
                  </li>
                  <li>
                    <i className="fa fa-envelope-o" /> support@company.com
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="footer-bottom text-center">
            <ul className="widget_nav_menu">
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Terms &amp; Conditions</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
            </ul>
            <p>
              Copyright ©2024 <a href="https://www.companywebsite.com">NextPage</a>
            </p>
          </div>
        </div>
      </div>

      {/* back to top area start */}
      <div className="back-to-top">
        <span className="back-top">
          <i className="fa fa-angle-up" />
        </span>
      </div>
      {/* back to top area end */}
    </>
  )
}
