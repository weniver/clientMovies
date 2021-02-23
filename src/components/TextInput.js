import React from "react";
import styles from "./TextInput.module.scss";

const TextInput = ({
  label,
  id,
  name,
  formik,
  onBlurHandler,
  onChangeHandler,
  value,
  touched,
  errors,
  onKeyDownHandler,
}) => {
  return (
    <>
      {label && (
        <label className={`form-label ${styles.label}`} htmlFor="title">
          {label}
        </label>
      )}
      <input
        className={`form-control ${styles.input}`}
        id={id}
        name={name}
        type="text"
        onChange={
          onChangeHandler &&
          ((e) => {
            onChangeHandler(e);
          })
        }
        value={value}
        onKeyDown={
          onKeyDownHandler &&
          ((e) => {
            onKeyDownHandler(e);
          })
        }
      />
      <div className={`form-text ${styles.error}`}>
        {touched && errors ? errors : <>&nbsp;</>}
      </div>
    </>
  );
};
export default TextInput;
