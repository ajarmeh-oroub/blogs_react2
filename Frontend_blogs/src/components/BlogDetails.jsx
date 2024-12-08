import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { getCatigories } from "../Services/Api";
import BlogSummarizer from "./BlogSummary";

export default function BlogDetails() {
  const [isSummary, setSummary] = useState(true);
  const { id } = useParams(); // Blog ID
  const [blog, setBlog] = useState(null); // Blog details
  const [comments, setComments] = useState([]); // Blog comments
  const [newComment, setNewComment] = useState(""); // New comment input
  const [name, setName] = useState(""); // User's name for the comment
  const [email, setEmail] = useState(""); // Optional email
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]); // Blogs filtered by category
  const [selectedCategory, setSelectedCategory] = useState(""); // Selected category for filtering

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await getCatigories();
        setCategories(categories);
        setError(null);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError("Cannot fetch categories.");
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/blogs/${id}`);
        setBlog(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/blogs/${id}/comments`);
        setComments(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchBlogDetails();
    fetchComments();
  }, [id]);

  useEffect(() => {
    const fetchFilteredBlogs = async () => {
      if (selectedCategory) {
        try {
          const response = await axios.get(`http://localhost:8000/api/blogs?category=${selectedCategory}`);
          setFilteredBlogs(response.data);
        } catch (error) {
          console.error("Error fetching filtered blogs:", error);
        }
      } else {
        setFilteredBlogs([]);
      }
    };

    fetchFilteredBlogs();
  }, [selectedCategory]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();

    if (!newComment || !name) {
      alert("Please fill in both your name and comment.");
      return;
    }

    const payload = { comment: newComment, name: name, email: email || null };

    axios.post(`http://localhost:8000/api/blogs/${id}/comments`, payload)
      .then((response) => {
        setComments((prev) => [...prev, response.data]);
        setNewComment("");
        setName("");
        setEmail("");
      })
      .catch((error) => {
        alert("Error submitting comment. Please try again later.");
        console.error("Error submitting comment:", error);
      });
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  if (error) {
    return <div className="container">Error: {error}</div>;
  }

  if (!blog) {
    return <div className="container">Loading...</div>;
  }

  return (
    <section className="blog-post-area section-margin">
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div className="main_blog_details">
              <img className="img-fluid" src={blog.image} alt={blog.title} />
              <h4>{blog.title}</h4>
              <div className="user_details">
                <div className="float-left">{blog.categories}</div>
                <div className="float-right mt-sm-0 mt-3">
                  <div className="media">
                    <div className="media-body">
                      <h5>{blog.author}</h5>
                      <p>{new Date(blog.created_at).toLocaleString()}</p>
                    </div>
                    <div className="d-flex">
                      <img width={42} height={42}    src="/assets/img/user.jpg"  alt="user" />
                    </div>
                  </div>
                </div>
              </div>
              <p>{blog.article}</p>
              {isSummary && <div style={{ marginTop: "20px" }}><BlogSummarizer blogarticle={blog.article} /></div>}
            </div>

            <div className="comment-form">
              <h4>Leave a Comment</h4>
              <form onSubmit={handleCommentSubmit}>
                <input type="text" className="form-control" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} required />
                <input type="email" className="form-control mt-2" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <textarea className="form-control mt-2" rows="4" placeholder="Your Comment" value={newComment} onChange={(e) => setNewComment(e.target.value)} required></textarea>
                <button type="submit" className="btn btn-primary mt-2">Submit</button>
              </form>
            </div>

            <div className="comments-area">
              <h4>{comments.length} Comments</h4>
              {comments.length === 0 ? (
                <p>No comments yet. Be the first to comment!</p>
              ) : (
                comments.map((comment) => (
                  <div className="comment-list" key={comment.id}>
                    <div className="single-comment justify-content-between d-flex">
                      <div className="user">
                        <h5>{comment.name}</h5>
                        <p>{new Date(comment.created_at).toLocaleString()}</p>
                      </div>
                      <div className="desc">
                        <p>{comment.comment}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="col-lg-4 sidebar-widgets" style={{ position: 'relative' }}>
            <div className="widget-wrap" style={{ padding: '20px', backgroundColor: '#ffffff', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', position: 'sticky', left: '0', top: '0' }}>
              <div className="single-sidebar-widget post-category-widget" style={{ marginBottom: '30px' }}>
                <h4 className="single-sidebar-widget__title" style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e2229', borderBottom: '2px solid #007BFF', paddingBottom: '10px' }}>
                  Category
                </h4>
                <ul className="cat-list mt-20" style={{ listStyle: 'none', padding: 0, color: '#555' }}>
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
              {selectedCategory && filteredBlogs.length > 0 && (
                <div className="filtered-blogs">
                  <h4>Filtered Blogs</h4>
                  <ul>
                    {filteredBlogs.map((blog) => (
                      <li key={blog.id}>
                        <Link to={`/blog/${blog.id}`}>{blog.title}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
