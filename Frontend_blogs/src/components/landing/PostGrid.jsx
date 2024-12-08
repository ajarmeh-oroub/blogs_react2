import React from "react";
import { Link } from "react-router-dom";

export default function PostGrid({ grid }) {
  const gridBlogs = grid.map(function (blog) {
    return (
      <div className="col-lg-3 col-sm-6" key={blog.id}>
      <div className="single-post-wrap style-overlay">
        <div className="thumb">
          <img src={blog.image} alt="img" style={{height: "266px", width: "100%"}}
          className="img-fluid"/>
          <a className="tag-base tag-purple" href="#">{blog.category_id}</a>
        </div>
        <div className="details">
          <div className="post-meta-single">
            <p>
              <i className="fa fa-clock-o" />
              {blog.created_at}
            </p>
          </div>
          <h6 className="title">
            <Link to={`/blog/${blog.id}`}>
              <a href="#">{blog.title}</a>
            </Link>
          </h6>
        </div>
      </div>
    </div>
    );
  });

  return (
    <div className="pd-top-80 pd-bottom-50" id="grid">
      <div className="container">
        <div className="row">{gridBlogs}</div>
      </div>
    </div>
  );
}
