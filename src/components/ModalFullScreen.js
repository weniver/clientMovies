import React, { useEffect } from "react";
import ClickOutsideWrapper from "./ClickOutsideWrapper.js";
import styles from "./ModalFullScreen.module.scss";

const ModalFullScreen = ({ clickOutsideHandler, children, style }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div style={{ ...style }} className={styles.modal}>
      <ClickOutsideWrapper
        handler={() => {
          clickOutsideHandler();
        }}
      >
        {children}
      </ClickOutsideWrapper>
    </div>
  );
};

export default ModalFullScreen;
