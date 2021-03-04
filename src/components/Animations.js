import React, { useState } from "react";
import {
  useSpring,
  animated,
  interpolate,
  useTransition,
  config,
} from "react-spring";

const CustomH1 = ({ children }) => {
  return <h1 style={{ fontSize: "3rem", color: "lightCoral" }}>{children}</h1>;
};
const AnimatedH1 = animated(CustomH1);
const AnimateArray = () => {
  const [items, setItems] = useState([1, 2, 3]);
  const listTransitions = useTransition(items, (item) => item, {
    config: { duration: 600 },
    from: {
      opacity: 0,
      transform: "translate3d(-5000%, 0px, 0px)",
    },
    enter: { opacity: 1, transform: "translate3d(0%, 0px, 0px)" },
    leave: { opacity: 0, transform: "translate3d(5000%, 0px, 0px)" },
  });

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {listTransitions.map(({ item, props }) => {
        return (
          <animated.div style={props}>
            <CustomH1>{item}</CustomH1>
          </animated.div>
        );
      })}
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            margin: "1rem",
            padding: "1rem",
            backgroundColor: "lightGreen",
          }}
          onClick={() => {
            setItems((prev) => {
              if (prev.length === 0) return [1];
              let last = prev[prev.length - 1];
              return [...prev, last + 1];
            });
          }}
        >
          <h1>Add</h1>
        </div>

        <div
          style={{ padding: "1rem", margin: "1rem", backgroundColor: "tomato" }}
          onClick={() => {
            setItems((prev) => {
              let newState = [...prev];
              newState.pop();
              return newState;
            });
          }}
        >
          <h1>Remove</h1>
        </div>
      </div>
    </div>
  );
};

export default AnimateArray;
