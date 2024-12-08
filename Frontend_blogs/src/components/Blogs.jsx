import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
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
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6; // Number of blogs per page

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

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const filters = { category: selectedCategory }; // Updated filter parameter
        const fetchedBlogs = await getBlogs(filters);
        setBlogs(fetchedBlogs || []);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, [selectedCategory]);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    setCurrentPage(0); // Reset to the first page when filter changes
  };

  const offset = currentPage * itemsPerPage;
  const currentItems = blogs.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(blogs.length / itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };
  if (loading) return (
    <div className="preloader" id="preloader">
        <div className="preloader-inner">
            <div className="spinner">
                <div className="dot1"></div>
                <div className="dot2"></div>
            </div>
        </div>
    </div>
  );
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
          <div className="col-lg-8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <div>
                <div className="row">
                  {currentItems.map((blog) => (
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
                        </div>
                        <div className="details p-4">
                          <div className="post-meta-single mb-3">
                            <ul className="d-flex list-unstyled">
                              <li className="me-3">
                                <i className="fa fa-user" />
                                {blog.user ? `${blog.user.first_name} ${blog.user.last_name}` : "Anonymous"}
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
                          <h5 className="title mb-3" style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", width: "100%" }}>
                            <Link to={`/blog/${blog.id}`} style={{ color: "#2d3e50", fontWeight: "bold" }}>
                              {blog.title}
                            </Link>
                          </h5>
                          <p className="mb-3" style={{ fontSize: "0.9rem", color: "#6c757d" }}>
                            {blog.short_description ? blog.short_description : "Short description not available."}
                          </p>
                          <Link to={`/blog/${blog.id}`} className="btn btn-blue">Read More</Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <ReactPaginate
    previousLabel={"previous"}
    nextLabel={"next"}
    breakLabel={"..."}
    pageCount={pageCount}
    marginPagesDisplayed={2}
    pageRangeDisplayed={5}
    onPageChange={handlePageClick}
    containerClassName={"pagination pagination-margin"}
    activeClassName={"active"}
/>

              </div>
            )}
          </div>
          <div className="col-lg-4 sidebar-widgets" style={{ position: 'relative' }}>
            <div className="widget-wrap" style={{ padding: '20px', backgroundColor: '#ffffff', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', position: 'sticky', left: '0', top: '0' }}>
              <div className="single-sidebar-widget post-category-widget" style={{ marginBottom: '30px' }}>
                <h4 className="single-sidebar-widget__title" style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e2229', borderBottom: '2px solid #007BFF', paddingBottom: '10px' }}>
                  Category
                </h4>
                <ul className="cat-list mt-20" style={{ listStyle: 'none', padding: 0, color: '#555' }}>
                <li >
                      <button onClick={() => handleCategoryClick('')} className="d-flex justify-content-between" style={{ textDecoration: 'none', color: '#1e2229', fontWeight: '500', transition: 'color 0.3s', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                        <p>All Articles</p>
                     
                      </button>
                    </li>
                  {categories.map((category) => (
                    <li key={category.id} style={{ marginBottom: '10px' }}>
                      <button onClick={() => handleCategoryClick(category.id)} className="d-flex justify-content-between" style={{ textDecoration: 'none', color: '#1e2229', fontWeight: '500', transition: 'color 0.3s', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                        <p>{category.name}</p>
                        <p>{category.post_count}</p>
                      </button>
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
