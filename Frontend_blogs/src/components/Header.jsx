import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Header() {
  const location = useLocation();

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

      default:
        return "My Website"; // Default title for any unrecognized route
    }
  };

  return (
    <>
      <Helmet>
        <title>{getPageTitle()}</title>
      </Helmet>
      {/* search popup start */}
      <div className="td-search-popup" id="td-search-popup">
        <form action="index.html" className="search-form">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search....."
            />
          </div>
          <button type="submit" className="submit-btn">
            <i className="fa fa-search" />
          </button>
        </form>
      </div>
      {/* search popup end */}
      <div className="body-overlay" id="body-overlay" />
      {/* header start */}
      <div className="navbar-area">
        {/* navbar start */}
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
                <input type="text" placeholder="Search For" />
                <button type="submit" className="submit-btn">
                  <i className="fa fa-search" />
                </button>
              </div>
           
              <div className="icon-container">
                <Link to="/favorite" className="favorite-icon">
                  <i className="fa fa-heart text-white" style={{ marginLeft: '20px' }}></i>
                </Link>
                <Link to="/user" className="profile-icon">
                  <i className="fa fa-user text-white" style={{ marginLeft: '20px' }}></i>
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
