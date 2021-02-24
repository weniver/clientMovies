import React from "react";
import styles from "./InputError.module.scss";

const InputError = ({ touched, errors }) => {
  return (
    <div className={`form-text ${styles.error}`}>
      {touched && errors ? errors : <>&nbsp;</>}
    </div>
  );
};
export default InputError;
