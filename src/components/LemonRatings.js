import React, { useState, useEffect } from "react";
import styles from "./LemonRatings.module.scss";

const LemonRatings = ({touched, errors, label, htmlFor, number, value, onClickHandler }) => {
  const [hover, setHover] = useState(0);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    setRating(value);
  }, [value]);

  const renderLemons = (n) => {
    return [...Array(n)].map((_, i) => {
      return (
        <i
          onMouseEnter={() => {
            setHover(i + 1);
          }}
          onMouseLeave={() => {
            setHover(0);
          }}
          onClick={() => {
            if (i + 1 === rating) {
              onClickHandler(0);
              setRating(0);
            } else {
              onClickHandler(i + 1);
              setRating(i + 1);
            }
          }}
          className={`${
            i + 1 <= hover || i + 1 <= rating ? "fas" : "far"
          } fa-lemon ${styles["lemon"]}`}
        ></i>
      );
    });
  };

  return (
    <div>
      <label className="form-label" htmlFor={htmlFor}>
        {label || "Rating"}
      </label>
      <div className={`${styles["lemons-wrapper"]}`}>
        {renderLemons(number || 5)}
      </div>
      <div className="form-text">
        {touched && errors ? errors : <>&nbsp;</>}
      </div>
    </div>
  );
};
export default LemonRatings;
