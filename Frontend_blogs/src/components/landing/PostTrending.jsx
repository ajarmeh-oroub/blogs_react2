import React from "react";
import { Link } from "react-router-dom";

export default function PostTrending({ trends, latest }) {


  const trendings = trends.map(function (trend) {
    return (
      <div className="single-post-wrap style-overlay" key={trend.id}>
        <div className="thumb">
          <img src={trend.image} alt="img" />
        </div>
        <div className="details">
          <div className="post-meta-single">
            <p>
              <i className="fa fa-clock-o" />
              {trend.created_at}
            </p>
          </div>
          <h6 className="title">
            <Link to={`/blog/${trend.id}`}>
              <a href="#">{trend.title}</a>
            </Link>
          </h6>
        </div>
      </div>
    );
  });



  const latests = latest.map(function (blog) {
    return (
      <div className="single-post-list-wrap" key={blog.id}>
      <div className="media">
        <div className="media-left">
          <img src="assets/img/post/list/1.png" alt="img" />
        </div>
        <div className="media-body">
          <div className="details">
            <div className="post-meta-single">
              <ul>
                <li>
                  <i className="fa fa-clock-o" />
                  {blog.created_at}
                </li>
              </ul>
            </div>
            <h6 className="title">
              
              <a href="#">
                <Link to={`/blog/${blog.id}`}>
                  <a href="#">{blog.title}</a>
                </Link>
              </a>
            </h6>
          </div>
        </div>
      </div>
    </div>
    );
  });



  return (
    <div className="post-area pd-top-75 pd-bottom-50" id="trending">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-6">
            <div className="section-title">
              <h6 className="title">Trending News</h6>
            </div>
            <div className="post-slider owl-carousel">
              <div className="item">
                <div className="trending-post">{trendings}</div>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="section-title">
              <h6 className="title">Latest News</h6>
            </div>
            <div className="post-slider owl-carousel">
              <div className="item">latests</div>
            </div>
          </div>

          
          <div className="col-lg-3 col-md-6">
            <div className="section-title">
              <h6 className="title">What’s new</h6>
            </div>
            <div className="post-slider owl-carousel">
              <div className="item">
                <div className="single-post-wrap">
                  <div className="thumb">
                    <img src="assets/img/post/8.png" alt="img" />
                  </div>
                  <div className="details">
                    <div className="post-meta-single mb-4 pt-1">
                      <ul>
                        <li>
                          <a className="tag-base tag-blue" href="#">
                            Tech
                          </a>
                        </li>
                        <li>
                          <i className="fa fa-clock-o" />
                          08.22.2020
                        </li>
                      </ul>
                    </div>
                    <h6 className="title">
                      <a href="#">
                        Uttarakhand’s Hemkund Sahib yatra to start from
                        September 4
                      </a>
                    </h6>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipi sicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.{" "}
                    </p>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="single-post-wrap">
                  <div className="thumb">
                    <img src="assets/img/post/8.png" alt="img" />
                  </div>
                  <div className="details">
                    <div className="post-meta-single mb-4 pt-1">
                      <ul>
                        <li>
                          <a className="tag-base tag-blue" href="#">
                            Tech
                          </a>
                        </li>
                        <li>
                          <i className="fa fa-clock-o" />
                          08.22.2020
                        </li>
                      </ul>
                    </div>
                    <h6 className="title">
                      <a href="#">
                        Uttarakhand’s Hemkund Sahib yatra to start from
                        September 4
                      </a>
                    </h6>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipi sicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.{" "}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="section-title">
              <h6 className="title">Join With Us</h6>
            </div>
            <div className="social-area-list mb-4">
              <ul>
                <li>
                  <a className="facebook" href="#">
                    <i className="fa fa-facebook social-icon" />
                    <span>12,300</span>
                    <span>Like</span> <i className="fa fa-plus" />
                  </a>
                </li>
                <li>
                  <a className="twitter" href="#">
                    <i className="fa fa-twitter social-icon" />
                    <span>12,600</span>
                    <span>Followers</span> <i className="fa fa-plus" />
                  </a>
                </li>
                <li>
                  <a className="youtube" href="#">
                    <i className="fa fa-youtube-play social-icon" />
                    <span>1,300</span>
                    <span>Subscribers</span> <i className="fa fa-plus" />
                  </a>
                </li>
                <li>
                  <a className="instagram" href="#">
                    <i className="fa fa-instagram social-icon" />
                    <span>52,400</span>
                    <span>Followers</span> <i className="fa fa-plus" />
                  </a>
                </li>
                <li>
                  <a className="google-plus" href="#">
                    <i className="fa fa-google social-icon" />
                    <span>19,101</span>
                    <span>Subscribers</span> <i className="fa fa-plus" />
                  </a>
                </li>
              </ul>
            </div>
            <div className="add-area">
              <a href="#">
                <img className="w-100" src="assets/img/add/6.png" alt="img" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
