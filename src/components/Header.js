import React from "react";
import { Link } from "react-router-dom";
import "./Header.scss";

const Header = () => {
  return (
    <div className="header-container">
      <Link
        style={{
          transition: "all .2s cubic-bezier(0.33, 1, 0.68, 1)",
          WebkitTransition: "all .2s cubic-bezier(0.33, 1, 0.68, 1)",
          MozTransition: "all .2s cubic-bezier(0.33, 1, 0.68, 1)",
        }}
        className="header-link"
        to="/"
      >
        <i className="fas fa-lg fa-lemon"></i>
      </Link>
      <Link
        style={{
          transition: "all .2s cubic-bezier(0.33, 1, 0.68, 1)",
          WebkitTransition: "all .2s cubic-bezier(0.33, 1, 0.68, 1)",
          MozTransition: "all .2s cubic-bezier(0.33, 1, 0.68, 1)",
        }}
        className="header-link"
        to="/add/movie"
      >
        <p>+</p>
      </Link>
    </div>
  );
};

export default Header;
