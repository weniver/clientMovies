import React from "react";
import styles from "./TextInput.module.scss";
import InputLabel from "./InputLabel.js";
import InputError from "./InputError.js";

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
      {label && <InputLabel label={label} />}
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
      <InputError touched={touched} errors={errors} />
    </>
  );
};
export default TextInput;
