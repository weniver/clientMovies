import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <div className={`container-lg ${styles.header}`}>
      <div className="row align-items-center h-100">
        <div className="col">
          <Link className={`${styles["header-link"]} ${styles["logo"]}`} to="/">
            <i className="fas fa-lg fa-lemon"></i>
          </Link>
        </div>
        <div className="col text-right">
          <Link className={`${styles["header-link"]} ${styles["plus"]}`} to="/add/movie">
            <i className="fas fa-plus-circle"></i>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
