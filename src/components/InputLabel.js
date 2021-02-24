import React from "react";
import styles from "./InputLabel.module.scss";

const InputLabel = ({ label }) => {
  return (
    <label className={`form-label ${styles.label}`} htmlFor="title">
      {label}
    </label>
  );
};
export default InputLabel;
