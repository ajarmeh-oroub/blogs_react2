import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from "axios";

export default function Header() {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  // Function to generate dynamic page title based on the current route
  const getPageTitle = () => {
    switch (location.pathname) {
      case "/":
        return "Home";
      case "/blogdetails":
        return "Blog Details";
      case "/favorite":
        return "Favorite Products";
      case "/blog":
        return "Blogs";
      case "/user":
        return "User Dashboard";
      case "/contact":
        return "Contact";
      case "/about":
        return "About Us";
      case '/contact':
        return "Contact";
      default:
        return "Page Not Found";
    }
  };

  // Function to handle input change and fetch results
  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 2) {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/search?query=${query}`
        );
        setSearchResults(response.data || []);
        console.log(response.data);
        setShowResults(true);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setSearchResults([]);
        setShowResults(false);
      }
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  };

  // Function to hide search results when clicking outside or clearing input
  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setShowResults(false);
  };

  return (
    <>
      <Helmet>
        <title>{getPageTitle()}</title>
      </Helmet>
      {/* header start */}
      <div className="navbar-area">
        <nav className="navbar navbar-expand-lg">
          <div className="container nav-container">
            <div className="responsive-mobile-menu">
              <div className="col-xl-6 col-lg-5 align-self-center">
                <div className="logo text-md-left text-center">
                  <a className="main-logo" href="index.html">
                    <img src="assets/img/logo.png" alt="img" />
                  </a>
                </div>
              </div>

              <button
                className="menu toggle-btn d-block d-lg-none"
                data-target="#nextpage_main_menu"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="icon-left" />
                <span className="icon-right" />
              </button>
            </div>
            <div className="nav-right-part nav-right-part-mobile">
              <a className="search header-search" href="#">
                <i className="fa fa-search" />
              </a>
            </div>
            <div className="collapse navbar-collapse" id="nextpage_main_menu">
              <ul className="navbar-nav menu-open">
                <li className="current-menu-item">
                  <Link to="/">Home </Link>
                </li>
                <li className="current-menu-item">
                  <Link to="blog"> Blogs</Link>
                </li>
                <li className="current-menu-item">
                  <Link to="contact"> contact</Link>
                </li>
                <li className="current-menu-item">
                  <Link to="/about"> About Us </Link>
                </li>

               
            
               
              
              </ul>
            </div>
            <div className="nav-right-part nav-right-part-desktop" style={{ display: 'flex', alignItems: 'center' }}>
              <div className="menu-search-inner">
                <input
                  type="text"
                  placeholder="Search For"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onFocus={() => setShowResults(true)}
                />
                <button type="submit" className="submit-btn">
                  <i className="fa fa-search" />
                </button>
                {showResults && (
                  <div
                    className="search-results"
                    style={{
                      position: "absolute",
                      backgroundColor: "#fff",
                      border: "1px solid #ccc",
                      maxWidth: "inherit",
                      maxHeight: "200px",
                      overflowY: "auto",
                      zIndex: 10,
                    }}
                  >
                    {searchQuery.length > 0 ? ( // Check if the user has typed at least one character
                      searchResults.length > 0 ? (
                        searchResults.map((result, index) => (
                          <div
                            key={index}
                            className="search-result-item"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              padding: "10px",
                              borderBottom: "1px solid #eee",
                              cursor: "pointer",
                            }}
                            onClick={clearSearch}
                          >
                            {/* Display Image */}
                            {result.image && (
                              <a href={`/blog/${result.id}`}>
                                <img
                                  src={result.image}
                                  alt={result.title || "No title"}
                                  style={{
                                    width: "40px",
                                    height: "40px",
                                    marginRight: "10px",
                                    objectFit: "cover",
                                    borderRadius: "5px",
                                  }}
                                />
                              </a>
                            )}
                            {/* Display Title */}
                            <a href={`/blog/${result.id}`}>
                              <span>{result.title || "No title"}</span>
                            </a>
                          </div>
                        ))
                      ) : (
                        <div className="search-no-results" style={{ padding: "10px" }}>
                          No results found.
                        </div>
                      )
                    ) : null /* Do not show anything if query is empty */}
                  </div>
                )}
              </div>
              <div className="icon-container">
                <Link to="/favorite" className="favorite-icon">
                  <i
                    className="fa fa-heart text-white"
                    style={{ marginLeft: "20px" }}
                  ></i>
                </Link>
                <Link to="/user" className="profile-icon">
                  <i
                    className="fa fa-user text-white"
                    style={{ marginLeft: "20px" }}
                  ></i>
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </div>
      {/* Breadcrumb section will only be displayed if we are not on the Home page */}
      {location.pathname !== "/" && (
        <div
          className="breadcrumb-section"
          style={{ backgroundColor: "#E6F2FD", height: "100px" }}
        >
          <div className="container">
            <div className="breadcrumb-content">
              <h2>{getPageTitle()}</h2> {/* Dynamic title here */}
              <ul className="breadcrumb-list">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>{getPageTitle()}</li> {/* Display dynamic page title */}
              </ul>
            </div>
          </div>
        </div>
      )}
      {/* Breadcrumb section end */}
    </>
  );
}
