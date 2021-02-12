import React from "react";
import styles from "./SimpleCard.module.scss";

const SimpleCard = ({ customSyle, children }) => {
  return (
    <div className={styles.card}>
      {children}
    </div>
  );
};
export default SimpleCard;
