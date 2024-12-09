// Footer.jsx
import React from "react";

export default function Footer() {
  return (
    <div className="footer-area bg-black pd-top-95">
      <div className="container">
        <div className="row">
          {/* About Us Section */}
          <div className="col-lg-4 col-sm-6">
            <div className="widget">
              <h5 className="widget-title">ABOUT US</h5>
              <div className="widget_about">
                <p>
                  We are a team dedicated to providing value through informative content, sharing knowledge, and making an impact in our community.
                </p>
                <ul className="social-area social-area-2 mt-4">
                  <li style={{color:"white"}}>
                    <a className="facebook-icon" href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                      <i className="fa fa-facebook" />
                    </a>
                  </li>
                  <li style={{color:"white"}}>
                    <a className="twitter-icon" href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                      <i className="fa fa-twitter" />
                    </a>
                  </li>
                  <li style={{color:"white"}}>
                    <a className="youtube-icon" href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                      <i className="fa fa-youtube-play" />
                    </a>
                  </li>
                  <li style={{color:"white"}}>
                    <a className="instagram-icon" href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                      <i className="fa fa-instagram" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="col-lg-4 col-sm-6">
            <div className="widget">
              <h5 className="widget-title">CONTACT US</h5>
              <ul className="contact_info_list">
                <li>
                  <i className="fa fa-map-marker" /> 123 Main Street, Cityville, State, 12345
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

          {/* Resources Section */}
          <div className="col-lg-4 col-sm-6">
            <div className="widget">
              <h5 className="widget-title">RESOURCES</h5>
              <ul className="resources_list">
                <li>Free online guides and tutorials</li>
                <li>Upcoming community events</li>
                <li>Blog posts and articles</li>
                <li>How-to videos on various topics</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom text-center">
          <p>
            Copyright ©2024 <span>NextPage</span>. All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
