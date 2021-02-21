import React from "react";
import styles from "./FontAwesomeButton.module.scss";

const FontAwesomeButton = ({ onClickHandler, fontAwesomeClasses, style }) => {
  return (
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
  );
};
export default FontAwesomeButton;
