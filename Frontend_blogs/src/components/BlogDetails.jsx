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
    // Fetch blog details
    axios
      .get(`http://localhost:8000/api/blogs/${id}`)
      .then((response) => setBlog(response.data))
      .catch((error) => setError(error.message));

    // Fetch comments related to the blog
    axios
      .get(`http://localhost:8000/api/blogs/${id}/comments`)
      .then((response) => setComments(response.data))
      .catch((error) => setError(error.message));
  }, [id]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();

    // Validate form inputs
    if (!newComment || !name) {
      alert("Please fill in both your name and comment.");
      return;
    }

    // Construct the request payload
    const payload = {
      comment: newComment,
      name: name,
      email: email || null, // Optional email
    };

    // Send new comment to the API using Axios
    axios
      .post(`http://localhost:8000/api/blogs/${id}/comments`, payload)
      .then((response) => {
        // Update comments list
        setComments((prev) => [...prev, response.data]);

        // Reset form inputs
        setNewComment("");
        setName("");
        setEmail("");
      })
      .catch((error) => {
        alert("Error submitting comment. Please try again later.");
        console.error("Error submitting comment:", error);
      });
  };

  // Conditional rendering for error or loading states
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
          {/* Blog Details */}
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
                      <img
                        width={42}
                        height={42}
                        src="img/blog/user-img.png"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
              <p>
        {blog.article}
      </p>
 
      {isSummary && (
        <div style={{ marginTop: "20px" }}>
          <BlogSummarizer blogarticle={blog.article} />
        </div>
      )}
    </div>

            {/* Add Comment Form */}
            <div className="comment-form">
              <h4>Leave a Comment</h4>
              <form onSubmit={handleCommentSubmit}>
                {/* Name Input */}
                <input
                  type="text"
                  className="form-control"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />

                {/* Email Input */}
                <input
                  type="email"
                  className="form-control mt-2"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                {/* Comment Textarea */}
                <textarea
                  className="form-control mt-2"
                  rows="4"
                  placeholder="Your Comment"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  required
                ></textarea>

                {/* Submit Button */}
                <button type="submit" className="btn btn-primary mt-2">
                  Submit
                </button>
              </form>
            </div>

            {/* Comments Section */}
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

          {/* Start Blog Post Sidebar */}
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
