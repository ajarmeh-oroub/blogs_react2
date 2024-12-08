import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function BannerArea({ data, loading, error}) {
  const [favoriteBlogs, setFavoriteBlogs] = useState([]);

  // Fetch initial favorite blogs
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favoriteStatuses = await Promise.all(
          data.map((blog) =>
            axios.get(`http://127.0.0.1:8000/api/favorites/1/${blog.id}`).then((res) => ({
              blogId: blog.id,
              isFavorited: res.data.isFavorited,
            }))
          )
        );
        setFavoriteBlogs(
          favoriteStatuses
            .filter((status) => status.isFavorited)
            .map((status) => status.blogId)
        );
      } catch (err) {
        console.error("Error fetching favorites:", err);
      }
    };
    fetchFavorites();
  }, [data]);

  // Toggle favorite status
  const toggleFavorite = async (blogId) => {
    try {
      if (favoriteBlogs.includes(blogId)) {
        await axios.delete(`http://127.0.0.1:8000/api/favorites/1/${blogId}`);
        setFavoriteBlogs((prev) => prev.filter((id) => id !== blogId));
      } else {
        await axios.post(`http://127.0.0.1:8000/api/favorites/1/${blogId}`);
        setFavoriteBlogs((prev) => [...prev, blogId]);
      }
    } catch (err) {
      console.error("Error toggling favorite:", err);
    }
  };

  // Heart Icon Component
  const HeartIcon = ({ isFavorited, size, onClick, customStyle }) => (
    <i
      className={`fa fa-heart${isFavorited ? "" : "-o"}`}
      style={{
        fontSize: size,
        color: isFavorited ? "red" : "white",
        position: "absolute",
        top: "10px",
        right: "10px",
        cursor: "pointer",
        zIndex: 99,
        ...customStyle,
      }}
      onClick={onClick}
    ></i>
  );

  // Main banner blog (big image)
  const bannerBlogs = data.map((blog) => (
    <div className="row" key={blog.id}>
      <div className="col-lg-6">
        <div className="thumb after-left-top" style={{ position: "relative" }}>
          <img
            src={blog.image}
            alt="img"
            style={{ height: "400px", width: "900px" }}
          />
          <HeartIcon
            isFavorited={favoriteBlogs.includes(blog.id)}
            size="30px"
            onClick={() => toggleFavorite(blog.id)}
          />
        </div>
      </div>
      <div className="col-lg-6 align-self-center">
        <div className="banner-details mt-4 mt-lg-0">
          <div className="post-meta-single">
            <ul>
              <li>
                <a className="tag-base tag-blue" href="#">
                  {blog.category_id}
                </a>
              </li>
              <li className="date">
                <i className="fa fa-clock-o" />
                {blog.created_at}
              </li>
            </ul>
          </div>
          <h2>{blog.title}</h2>
          <p>{blog.article}</p>
          <Link to={`/blog/${blog.id}`} className="btn btn-blue">
            Read More
          </Link>
        </div>
      </div>
    </div>
  ));

  // Sub banner blogs (small images)
  const sub = data.slice(1, 5);
  const subBannerBlogs = sub.map((blog) => (
    <div className="col-lg-3 col-sm-6" key={blog.id}>
      <div className="single-post-wrap style-white" style={{ position: "relative" }}>
        <div className="thumb">
          <img
            src={blog.image}
            alt="img"
            style={{ height: "200px", width: "450px" }}
          />
          <a className="tag-base tag-blue" href="#">
            {blog.category_id}
          </a>
          <HeartIcon
            isFavorited={favoriteBlogs.includes(blog.id)}
            size="20px"
            onClick={() => toggleFavorite(blog.id)}
          />
        </div>
        <div className="details">
          <h6 className="title">
            <Link to={`/blog/${blog.id}`}>
              <a href="#">{blog.title}</a>
            </Link>
          </h6>
          <div className="post-meta-single mt-3">
            <ul>
              <li>
                <i className="fa fa-clock-o" />
                {blog.created_at}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  ));

  return (
    <>
      {/* banner area start */}
      <div className="banner-area banner-inner-1 bg-black" id="banner">
        <div className="banner-inner pt-5">
          <div className="container">{bannerBlogs[0]}</div>
        </div>
        <div className="container">
          <div className="row">{subBannerBlogs}</div>
        </div>
      </div>
      {/* banner area end */}
    </>
  );
}
