import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function PostGrid({ grid }) {
  const [favoriteBlogs, setFavoriteBlogs] = useState([]);

  // Fetch initial favorite blogs
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favoriteStatuses = await Promise.all(
          grid.map((blog) =>
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
  }, [grid]);

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

  const gridBlogs = grid.map((blog) => (
    <div className="col-lg-3 col-sm-6" key={blog.id}>
      <div className="single-post-wrap style-overlay" style={{ position: "relative" }}>
        <div className="thumb">
          <img
            src={blog.image}
            alt="img"
            style={{ height: "266px", width: "100%" }}
            className="img-fluid"
          />
          <a className="tag-base tag-purple" href="#">
            {blog.category_id}
          </a>
          <HeartIcon
            isFavorited={favoriteBlogs.includes(blog.id)}
            size="20px"
            onClick={() => toggleFavorite(blog.id)}
          />
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
  ));

  return (
    <div className="pd-top-80 pd-bottom-50" id="grid">
      <div className="container">
        <div className="row">{gridBlogs}</div>
      </div>
    </div>
  );
}
