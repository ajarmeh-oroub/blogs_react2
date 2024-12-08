import React, { useEffect, useState } from 'react';
import { getBlogs, getCatigories } from '../Services/Api';
import { fetchFavorites, toggleFavorite } from '../Services/Api';
import { Link } from 'react-router-dom';

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [dateRange, setDateRange] = useState('');
  const [favorites, setFavorites] = useState(new Set());
  const [loading, setLoading] = useState(true);

  const userId = 1; // Replace with the actual logged-in user ID

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await getCatigories();
        setCategories(categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Fetch blogs based on filters
  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const filters = { categoryId: selectedCategory, dateRange };
        const fetchedBlogs = await getBlogs(filters);
        setBlogs(fetchedBlogs || []);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, [selectedCategory, dateRange]);

  // Fetch user's favorite blogs on mount
  useEffect(() => {
    const fetchUserFavorites = async () => {
      try {
        const userFavorites = await fetchFavorites(userId);
        setFavorites(userFavorites);
      } catch (error) {
        console.error("Error fetching user favorites:", error);
      }
    };
    fetchUserFavorites();
  }, [userId]);

  // Handle toggling of favorite blogs
  const handleToggleFavorite = async (blogId) => {
    const isFavorite = favorites.has(blogId);
    try {
      await toggleFavorite(userId, blogId, isFavorite);
      setFavorites((prevFavorites) => {
        const updatedFavorites = new Set(prevFavorites);
        if (isFavorite) {
          updatedFavorites.delete(blogId);
        } else {
          updatedFavorites.add(blogId);
        }
        return updatedFavorites;
      });
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  return (
    <section className="blog-post-area section-margin">
      <div className="container">
        <div className="row">
          {/* Main content */}
          <div className="col-lg-8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <div className="row">
                {blogs.map((blog) => (
                  <div key={blog.id} className="col-lg-6 col-md-6 col-sm-12 mb-4">
                    <div className="single-post-wrap style-box border rounded-lg overflow-hidden shadow-lg">
                      <div className="thumb">
                        <img
                          className="card-img rounded-0 img-fluid"
                          style={{
                            height: "250px",
                            width: "100%",
                            objectFit: "cover",
                          }}
                          src={`${blog.image}`}
                          alt={blog.title || "Blog Thumbnail"}
                        />
                        <i
                          className={`fa fa-heart`}
                          style={{
                            color: favorites.has(blog.id) ? "red" : "white",
                            cursor: "pointer",
                            marginLeft: "10px",
                            fontSize: "24px",
                            position: "absolute",
                            top:"10px",
                            right:"10px",
                            zIndex:3

                          }}
                          onClick={() => handleToggleFavorite(blog.id)}
                        />
                      </div>

                      <div className="details p-4">
                        {/* Post Meta */}
                        <div className="post-meta-single mb-3">
                          <ul className="d-flex list-unstyled">
                            <li className="me-3">
                              <i className="fa fa-user" />
                              {blog.user
                                ? `${blog.user.first_name} ${blog.user.last_name}`
                                : "Anonymous"}
                            </li>
                            <li className="me-3">
                              <i className="fa fa-calendar" />
                              {new Date(blog.created_at).toLocaleDateString()}
                            </li>
                            <li>
                              <i className="fa fa-comments" />
                              Comments ({blog.comments ? blog.comments.length : "0"})
                            </li>
                          </ul>
                        </div>

                        {/* Title */}
                        <h5 className="title mb-3" style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", width: "100%" }}>
                          <Link to={`/blog/${blog.id}`} style={{ color: "#2d3e50", fontWeight: "bold" }}>
                            {blog.title}
                          </Link>
                        </h5>

                        {/* Excerpt */}
                        <p className="mb-3" style={{ fontSize: "0.9rem", color: "#6c757d" }}>
                          {blog.short_description ? blog.short_description : "Short description not available."}
                        </p>

                        {/* Read More Button */}
                        <Link to={`/blog/${blog.id}`} className="btn btn-blue me-2">Read More</Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="col-lg-4 sidebar-widgets">
            <div className="widget-wrap" style={{ padding: '20px', backgroundColor: '#ffffff', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
              <div className="single-sidebar-widget post-category-widget" style={{ marginBottom: '30px' }}>
                <h4 className="single-sidebar-widget__title" style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e2229', borderBottom: '2px solid #007BFF', paddingBottom: '10px' }}>
                  Category
                </h4>
                <ul className="cat-list mt-20" style={{ listStyle: 'none', padding: 0, color: '#555' }}>
                  {categories.map((category) => (
                    <li key={category.id} style={{ marginBottom: '10px' }}>
                      <a href="#" className="d-flex justify-content-between" style={{ textDecoration: 'none', color: '#1e2229', fontWeight: '500', transition: 'color 0.3s' }}>
                        <p>{category.name}</p>
                        <p>{category.post_count}</p>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
