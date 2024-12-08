import { deleteblog, getBlogsUser, getUserData } from '../../Services/Api';
import { useEffect, useState } from 'react';
import ProfileEdit from './ProfileEdit';
import ProfileCreateBlog from './ProfileCreateBlog';
import EditBlog from './EditBlog';
import { Link } from 'react-router-dom';

export default function ProfileIndex() {
  const [isEditing, setIsEditing] = useState(false);
  const [isCreatingBlog, setIsCreatingBlog] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [errorBlog, setErrorBlog] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [isBlogEdit, setIsBlogEdit] = useState('');
  const [selectedBlog, setSelectedBlog] = useState('');
  const [showAll, setShowAll] = useState(false); // State to track display mode

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userdata = await getUserData();
        setUser(userdata);
        setError(null);
      } catch (error) {
        console.error('Error:', error);
        setError('Failed to get user');
      }
    };
    fetchUser();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleBlogEditClick = (blog) => {
    setSelectedBlog(blog);
    setIsBlogEdit(true);
  };

  const handleCreateClick = () => {
    setIsCreatingBlog(true);
  };

  useEffect(() => {
    const Blogs = async () => {
      try {
        const getblogs = await getBlogsUser();
        setBlogs(getblogs);
        setErrorBlog(null);
      } catch (err) {
        console.error("Error:", err);
        setErrorBlog("Something went wrong");
      }
    };
    Blogs();
  }, []);

  const toggleShowAll = () => {
    setShowAll(prevShowAll => !prevShowAll);
  };

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  const displayedBlogs = showAll ? blogs : blogs.slice(0, 8); // Determine which blogs to display

  return (
    <div className="row py-5 px-col-4">
      <div className="col-md-11 mx-auto">
        <div className="bg-white shadow rounded overflow-hidden">
          <div className="px-4 pt-0 pb-4 cover">
            <div className="media align-items-end profile-head">
              <div className="profile mr-3">
                <img
                  src="/assets/img/user.jpg"
                  alt="User Avatar"
                  width={130}
                  className="rounded mb-2 img-thumbnail"
                />
                <button onClick={handleEditClick} className="btn btn-base btn-block">
                  Edit Profile
                </button>
              </div>
              <div className="media-body mb-5 text-white">
                <h4 className="mt-0 mb-0 text-white">
                  {user ? `${user.name} ` : 'Loading...'}
                </h4>
                <p className="small mb-0 text-white">
                  <i className="fas fa-map-marker-alt mr-2" />
                  {user ? user.email : 'Loading email...'}
                </p>
                <p className="small mb-4 text-white">
                  <i className="fas fa-map-marker-alt mr-2" />
                  {user ? user.address : 'Loading address...'}
                </p>
              </div>
            </div>
          </div>

          {isEditing ? (
            <ProfileEdit user={user} setIsEditing={setIsEditing} />
          ) : (
            <div className="bg-light p-4 d-flex justify-content-end text-center">
              <ul className="list-inline mb-0">
                <li className="list-inline-item">
                  <h5 className="font-weight-bold mb-0 d-block">
                    {user && user.blog_count ? user.blog_count : 'Loading...'}
                  </h5>
                  <small className="text-muted">
                    <i className="fas fa-pencil-alt mr-1"></i> Your Articles
                  </small>
                </li>
              </ul>
            </div>
          )}

          <div className="px-4 py-3">
            <h5 className="mb-0">About</h5>
            <div className="p-4 rounded shadow-sm bg-light">
              <p className="font-italic mb-0">
                {user ? user.about : 'Loading about section...'}
              </p>
            </div>
          </div>

          <div className="py-4 px-4">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <h5 className="mb-0">Recent Articles By You</h5>
              <div>
                <button onClick={handleCreateClick} className="btn btn-outline-primary btn-sm mr-2">
                  Create New Article
                </button>
                <a href="#" onClick={toggleShowAll} className="btn btn-link text-muted">
                  {showAll ? 'Show Less' : 'Show All'}
                </a>
              </div>
            </div>
            {isBlogEdit ? (
              <EditBlog setIsBlogEdit={setIsBlogEdit} user={user} selectedBlog={selectedBlog} />
            ) : isCreatingBlog ? (
              <ProfileCreateBlog setIsCreatingBlog={setIsCreatingBlog} user={user} />
            ) : (
              <div className="row">
                {displayedBlogs.map((blog) => (
                  <div key={blog.id} className="col-lg-3 col-md-4 col-sm-6">
                    <div className="single-post-wrap style-box">
                      <div className="thumb">
                        <img
                          className="card-img rounded-0 img-fluid"
                          style={{
                            height: "180px",
                            width: "100%",
                            objectFit: "cover",
                          }}
                          src={`${blog.image}`}
                          alt={blog.title || "Blog Thumbnail"}
                        />
                      </div>
                      <div className="details" style={{ padding: "10px" }}>
                        <div className="post-meta-single mb-3 pt-1">
                          <ul>
                            <li>
                              <a className="tag-base tag-light-blue" href="#">
                                {blog.category ? blog.category.name : "Uncategorized"}
                              </a>
                            </li>
                            <li>
                              <i className="fa fa-user" />
                              {user.name}
                            </li>
                          </ul>
                        </div>
                        <h6 className="title" style={{ fontSize: "1rem" }}>
                          <Link to={`/blog/${blog.id}`}>{blog.title}</Link>
                        </h6>
                        <p style={{ fontSize: "0.9rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", width: "100%" }}>
                          {blog.short_description ? blog.short_description : "There is no description"}
                        </p>
                        <div className="d-flex">
                          <Link to={`/blog/${blog.id}`} className="btn btn-base mt-3 mx-1 btn-blue px-2">
                            Read More
                          </Link>
                          <button
                            className="btn btn-base mt-3 mx-1 btn-blue px-2"
                            onClick={() => handleBlogEditClick(blog)}
                          >
                            Edit Article
                          </button>
                          <button
                            type="button"
                            className="btn btn-outline-danger mt-3 px-2"
                            onClick={() => {
                              const confirmed = window.confirm("Are you sure you want to delete this blog?");
                              if (confirmed) {
                                deleteblog(blog.id);
                              }
                            }}
                          >
                            <i className="fas fa-trash-alt"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
