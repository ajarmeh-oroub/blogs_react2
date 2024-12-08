import React, { useEffect, useState } from 'react';

const FavoriteBlogs = () => {
  const [favoriteBlogs, setFavoriteBlogs] = useState([]);

  useEffect(() => {
    // Fetch favorite blogs using the userID (Example API endpoint)
    fetch(`http://127.0.0.1:8000/api/user/1/favorites`)
      .then(response => response.json())
      .then(data => {
        // Ensure that the data is an array
        if (Array.isArray(data.favoriteBlogs)) {
          setFavoriteBlogs(data.favoriteBlogs);
        } else {
          console.error('Expected an array of blogs, but got:', data);
        }
      })
      .catch(error => console.error('Error fetching favorite blogs:', error));
  });

  return (
    <section className="blog-post-area section-margin">
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div className="row">
              {/* Map over the favorite blogs and display each one */}
              {favoriteBlogs.length > 0 ? (
                favoriteBlogs.map((blog) => (
                  <div className="col-md-6" key={blog.id}>
                    <div className="single-recent-blog-post card-view">
                      <div className="thumb">
                        <img
                          className="card-img rounded-0"
                          src={blog.image || "img/blog/thumb/thumb-card8.png"}
                          alt={blog.title}
                        />
                        {/* <ul className="thumb-info">
                          <li>
                            <a href="#"><i className="ti-user"></i>{blog.user.first_name} {blog.user.last_name}</a>
                          </li>
                          <li>
                            <a href="#"><i className="ti-themify-favicon"></i>{blog.commentsCount} Comments</a>
                          </li>
                        </ul> */}
                      </div>
                      <div className="details mt-20">
                        <a href={`/blog/${blog.id}`}><h3>{blog.title}</h3></a>
                        <p>{blog.description}</p>
                        <a className="btn btn-blue" href={`/blog/${blog.id}`}>
                          Read More <i className="ti-arrow-right"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No favorite blogs available</p>
              )}
            </div>
          </div>

          {/* Sidebar (optional) */}
          <div className="col-lg-4 sidebar-widgets">
          <div className="widget-wrap">
        
            <div className="single-sidebar-widget post-category-widget">
              <h4 className="single-sidebar-widget__title">Catgory</h4>
              <ul className="cat-list mt-20">
                <li>
                  <a href="#" className="d-flex justify-content-between">
                    <p>Technology</p>
                    <p>(03)</p>
                  </a>
                </li>
                <li>
                  <a href="#" className="d-flex justify-content-between">
                    <p>Software</p>
                    <p>(09)</p>
                  </a>
                </li>
                <li>
                  <a href="#" className="d-flex justify-content-between">
                    <p>Lifestyle</p>
                    <p>(12)</p>
                  </a>
                </li>
                <li>
                  <a href="#" className="d-flex justify-content-between">
                    <p>Shopping</p>
                    <p>(02)</p>
                  </a>
                </li>
                <li>
                  <a href="#" className="d-flex justify-content-between">
                    <p>Food</p>
                    <p>(10)</p>
                  </a>
                </li>
              </ul>
            </div>
            <div className="single-sidebar-widget popular-post-widget">
              <h4 className="single-sidebar-widget__title">Popular Post</h4>
              <div className="popular-post-list">
                <div className="single-post-list">
                  <div className="thumb">
                    <img
                      className="card-img rounded-0"
                      src="img/blog/thumb/thumb1.png"
                      alt=""
                    />
                    <ul className="thumb-info">
                      <li>
                        <a href="#">Adam Colinge</a>
                      </li>
                      <li>
                        <a href="#">Dec 15</a>
                      </li>
                    </ul>
                  </div>
                  <div className="details mt-20">
                    <a href="blog-single.html">
                      <h6>
                        Accused of assaulting flight attendant miktake alaways
                      </h6>
                    </a>
                  </div>
                </div>
                <div className="single-post-list">
                  <div className="thumb">
                    <img
                      className="card-img rounded-0"
                      src="img/blog/thumb/thumb2.png"
                      alt=""
                    />
                    <ul className="thumb-info">
                      <li>
                        <a href="#">Adam Colinge</a>
                      </li>
                      <li>
                        <a href="#">Dec 15</a>
                      </li>
                    </ul>
                  </div>
                  <div className="details mt-20">
                    <a href="blog-single.html">
                      <h6>Tennessee outback steakhouse the worker diagnosed</h6>
                    </a>
                  </div>
                </div>
                <div className="single-post-list">
                  <div className="thumb">
                    <img
                      className="card-img rounded-0"
                      src="img/blog/thumb/thumb3.png"
                      alt=""
                    />
                    <ul className="thumb-info">
                      <li>
                        <a href="#">Adam Colinge</a>
                      </li>
                      <li>
                        <a href="#">Dec 15</a>
                      </li>
                    </ul>
                  </div>
                  <div className="details mt-20">
                    <a href="blog-single.html">
                      <h6>Tennessee outback steakhouse the worker diagnosed</h6>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="single-sidebar-widget tag_cloud_widget">
              <h4 className="single-sidebar-widget__title">Popular Post</h4>
              <ul className="list">
                <li>
                  <a href="#">project</a>
                </li>
                <li>
                  <a href="#">love</a>
                </li>
                <li>
                  <a href="#">technology</a>
                </li>
                <li>
                  <a href="#">travel</a>
                </li>
                <li>
                  <a href="#">software</a>
                </li>
                <li>
                  <a href="#">life style</a>
                </li>
                <li>
                  <a href="#">design</a>
                </li>
                <li>
                  <a href="#">illustration</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
};

export default FavoriteBlogs;
