import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

export default function Header() {
  return (
    <>
      {/* search popup start*/}
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
      {/* search popup end*/}
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
              <div className="logo d-lg-none d-block">
                <a className="main-logo" href="index.html">
                  <img src="assets/img/logo.png" alt="img" />
                </a>
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
                  <Link to='/'>Home </Link>
                 </li>
                <li className="current-menu-item">
                <Link to='/blogdetails'> blog details </Link>

                </li>
                <li className="current-menu-item">
                 <Link to='/favorite'> Favorite </Link>
                </li>
                <li className="current-menu-item">
                 <Link to='contact'> Contact  </Link>
                 </li>
                <li className="current-menu-item">
                  <a target="_blank" href="#">
                    About us
                  </a>
                </li>
              </ul>
            </div>
            <div className="nav-right-part nav-right-part-desktop w-50">
              {/* <div className="menu-search-inner">
                <input type="text" placeholder="Search For" />
                <button type="submit" className="submit-btn">
                  <i className="fa fa-search" />
                </button>
              </div> */}
              <SearchBar/>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
