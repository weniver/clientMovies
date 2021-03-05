import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import styles from "./AnimatedEditDeleteButtons.module.scss";
import FontAwesomeButton from "./FontAwesomeButton.js";
import { useMeasure } from "react-use";
import { withTheme } from "styled-components";
import { convertHexToRGBA } from "../utilities/color.js";

const AnimatedEditDeleteButtons = ({
  contrastingColor,
  theme,
  handleEdit,
  handleDelete,
}) => {
  const [ref, { width }] = useMeasure();
  const [deleting, setDeleting] = useState(false);

  const {
    fadeOut,
    fadeIn,
    resize,
    color,
    backgroundColor,
    ...rest
  } = useSpring({
    config: { duration: 300 },
    resize: deleting ? width : 0,
    fadeOut: deleting ? 0 : 1,
    fadeIn: deleting ? 1 : 0,
    color: deleting ? theme.colors.warning : contrastingColor,
    backgroundColor: deleting
      ? contrastingColor == "#0F0F0F"
        ? convertHexToRGBA(theme.colors.black, 0.05)
        : convertHexToRGBA(theme.colors.white, 0.05)
      : convertHexToRGBA(theme.colors.white, 0),
  });

  return (
    <div className={`${styles["wrapper"]}`}>
      <animated.div
        style={{ ...rest, backgroundColor }}
        className={`${styles["container"]}`}
      >
        <animated.div
          style={{
            ...rest,
            width: resize,
            whiteSpace: "nowrap",
            overflow: "hidden",
          }}
        >
          <div ref={ref} className={`${styles["text-wrapper"]}`}>
            <p
              style={{
                color: contrastingColor,
              }}
              className={`${styles["text"]}`}
            >
              Are you sure?
            </p>
          </div>
        </animated.div>
        {deleting ? (
          <animated.div style={{ ...rest, opacity: fadeIn }}>
            <FontAwesomeButton
              fontAwesomeClasses="fas fa-undo"
              onClickHandler={() => {
                setDeleting((prev) => !prev);
              }}
            />
          </animated.div>
        ) : (
          <animated.div style={{ ...rest, opacity: fadeOut }}>
            <FontAwesomeButton
              fontAwesomeClasses="fas fa-pencil-alt"
              onClickHandler={() => {
                handleEdit();
              }}
            />
          </animated.div>
        )}
        <animated.div style={{ ...rest, color }}>
          <FontAwesomeButton
            fontAwesomeClasses="fas fa-trash-alt"
            onClickHandler={() => {
              if (deleting) handleDelete();
              setDeleting((prev) => !prev);
            }}
          />
        </animated.div>
      </animated.div>
    </div>
  );
};

export default withTheme(AnimatedEditDeleteButtons);
