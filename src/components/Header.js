import React from "react";
import { Link } from "react-router-dom";
import "./Header.scss";

const Header = () => {
  return (
    <div className="header-container">
      <Link
        className="header-link"
        to="/"
      >
        <i className="fas fa-lg fa-lemon"></i>
      </Link>
      <Link
        className="header-link"
        to="/add/movie"
      >
        <p>+</p>
      </Link>
    </div>
  );
};

export default Header;
