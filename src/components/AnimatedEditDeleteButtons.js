import React, { useState } from "react";
import {
  useSpring,
  animated,
  interpolate,
  useTransition,
  config,
} from "react-spring";
import styles from "./AnimatedEditDeleteButtons.module.scss";


const AnimatedEditDeleteButtons = () => {
  // const [items, setItems] = useState([1, 2, 3]);
  // const listTransitions = useTransition(items, (item) => item, {
  //   config: { duration: 800 },
  //   from: { overflow: "hidden", height: "0%", opacity: 0 },
  //   enter: {
  //     height: "100%",
  //     opacity: 1,
  //     background: "#28d79f",
  //   },
  //   update: { height: "100%", opacity: 1, background: "#28d79f" },
  //   leave: { height: "0%", opacity: 0, background: "#c23369" },
  // });
  // const defaultStyles = {
  //   overflow: "hidden",
  //   width: "100%",
  //   color: "white",
  //   display: "flex",
  //   justifyContent: "center",
  //   alignItems: "center",
  //   fontSize: "2em",
  //   fontFamily: "'Kanit', sans-serif",
  //   textTransform: "uppercase",
  //   padding: "1rem",
  // };
  //
  // return (
  //   <div
  //     style={{
  //       width: "100%",
  //       display: "flex",
  //       alignItems: "center",
  //       flexDirection: "column",
  //     }}
  //   >
  //     {listTransitions.map(({ item, props }) => {
  //       return (
  //         <animated.div
  //           onClick={() => {
  //             setItems((prev) => {
  //               return prev.filter((num) => num !== item);
  //             });
  //           }}
  //           style={{ ...defaultStyles, ...props }}
  //         >
  //           <CustomH1>{item}</CustomH1>
  //         </animated.div>
  //       );
  //     })}
  //
  //     <div
  //       style={{
  //         width: "100%",
  //         display: "flex",
  //         alignItems: "center",
  //         flexDirection: "row",
  //         justifyContent: "center",
  //       }}
  //     >
  //       <div
  //         style={{
  //           margin: "1rem",
  //           padding: "1rem",
  //           backgroundColor: "lightGreen",
  //         }}
  //         onClick={() => {
  //           setItems((prev) => {
  //             if (prev.length === 0) return [1];
  //             let last = prev[prev.length - 1];
  //             return [...prev, last + 1];
  //           });
  //         }}
  //       >
  //         <h1>Add</h1>
  //       </div>
  //
  //       <div
  //         style={{ padding: "1rem", margin: "1rem", backgroundColor: "tomato" }}
  //         onClick={() => {
  //           setItems((prev) => {
  //             let newState = [...prev];
  //             newState.pop();
  //             return newState;
  //           });
  //         }}
  //       >
  //         <h1>Remove</h1>
  //       </div>
  //     </div>
  //   </div>
  // );
  return(<div className={`${styles["container"]}}></div>)
};

export default AnimatedEditDeleteButtons;
