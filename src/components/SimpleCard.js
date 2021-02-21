import React from "react";
import styles from "./SimpleCard.module.scss";

const SimpleCard = ({ style, children }) => {
  return (
    <div style={{ ...style }} className={styles["card"]}>
      {children}
    </div>
  );
};
export default SimpleCard;
