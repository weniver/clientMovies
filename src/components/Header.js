import React from "react";
import { Link } from "react-router-dom";
import "./Header.scss";

const Header = () => {
  return (
    <div className="header-container">
    <Link className="header-link" to="/">Home</Link>
    <Link className="header-link" to="/add/movie">Add Movie</Link>
    </div>
  );
};

export default Header;
