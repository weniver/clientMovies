import React from "react";
import styles from "./FontAwesomeButton.module.scss";

const FontAwesomeButton = ({ fontSize, onClickHandler, fontAwesomeClasses,style }) => {
  return (
    <div style={{ fontSize: `${fontSize || "2rem"}` }}>
      <div
        onClick={() => {
          onClickHandler();
        }}
        style={{ ...style }}
        className={styles["button-wrapper"]}
      >
        <i
          className={`${styles["icon"]} ${
            fontAwesomeClasses ? fontAwesomeClasses : "far fa-question-circle"
          }`}
        ></i>
      </div>
    </div>
  );
};
export default FontAwesomeButton;
