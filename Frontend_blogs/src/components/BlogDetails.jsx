import  { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function BlogDetails() {
  const { id } = useParams(); // Blog ID
  const [blog, setBlog] = useState(null); // Blog details
  const [comments, setComments] = useState([]); // Blog comments
  const [newComment, setNewComment] = useState(""); // New comment input
  const [name, setName] = useState(""); // User's name for the comment
  const [email, setEmail] = useState(""); // Optional email
  const [error, setError] = useState(null);

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
        // Improved error handling
        if (error.response) {
          // Server responded with an error status
          alert(`Error: ${error.response.data.message || "Something went wrong."}`);
        } else if (error.request) {
          // Request was made but no response received
          alert("Error: No response from the server. Please try again later.");
        } else {
          // General error
          alert(`Error: ${error.message}`);
        }
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
                <div className="float-left">
                  {blog.categories}
                </div>
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
              <p>{blog.article}</p>
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
      required
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

         {/* Start Blog Post Siddebar */}
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
      {/* End Blog Post Siddebar */}
          </div>
        
      
    </section>
  );
}
