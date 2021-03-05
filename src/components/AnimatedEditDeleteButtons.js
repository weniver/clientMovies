import React, { useState } from "react";
import {
  useSpring,
  animated,
  interpolate,
  useTransition,
  config,
} from "react-spring";
import styles from "./AnimatedEditDeleteButtons.module.scss";
import FontAwesomeButton from "./FontAwesomeButton.js";
import { useMeasure } from "react-use";
import { withTheme } from "styled-components";
import { convertHexToRGBA } from "../utilities/color.js";

const AnimatedEditDeleteButtons = ({ fontColor, theme }) => {
  const [ref, { width }] = useMeasure();
  const [deleting, setDeleting] = useState(false);

  const resize = useSpring({
    config: { duration: 200 },
    width: deleting ? width : 0,
  });
  const fadeOut = useSpring({
    config: { duration: 200 },
    opacity: deleting ? 0 : 1,
  });
  const fadeIn = useSpring({
    config: { duration: 200 },
    opacity: deleting ? 1 : 0,
  });

  const color = useSpring({
    config: { duration: 200 },
    color: deleting ? theme.colors.warning : fontColor,
  });

  const background = useSpring({
    config: { duration: 200 },
    backgroundColor: deleting
      ? fontColor == "#0F0F0F"
        ? convertHexToRGBA(theme.colors.black, 0.05)
        : convertHexToRGBA(theme.colors.white, 0.05)
      : convertHexToRGBA(theme.colors.white, 0),
  });

  return (
    <div className={`${styles["wrapper"]}`}>
      <animated.div style={background} className={`${styles["container"]}`}>
        <animated.div
          style={{
            ...resize,
            whiteSpace: "nowrap",
            overflow: "hidden",
          }}
        >
          <div ref={ref} className={`${styles["text-wrapper"]}`}>
            <p
              style={{
                color: fontColor,
              }}
              className={`${styles["text"]}`}
            >
              Are you sure?
            </p>
          </div>
        </animated.div>
        {deleting ? (
          <animated.div style={fadeIn}>
            <FontAwesomeButton
              fontAwesomeClasses="fas fa-undo"
              onClickHandler={() => {
                setDeleting((prev) => !prev);
              }}
            />
          </animated.div>
        ) : (
          <animated.div style={fadeOut}>
            <FontAwesomeButton fontAwesomeClasses="fas fa-pencil-alt" />
          </animated.div>
        )}
        <animated.div style={color}>
          <FontAwesomeButton
            fontAwesomeClasses="fas fa-trash-alt"
            onClickHandler={() => {
              setDeleting((prev) => !prev);
            }}
          />
        </animated.div>
      </animated.div>
    </div>
  );
};

export default withTheme(AnimatedEditDeleteButtons);
