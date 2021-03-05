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

  // const [deleting, setDeleting] = useState(false);
  // const [ref, { width }] = useMeasure();
  //
  // const color = useSpring({
  //   config: { duration: 200 },
  //   color: deleting ? "tomato" : "white",
  // });
  // const grow = useSpring({
  //   config: { duration: 1000 },
  //   overflow: "hidden",
  //   width: deleting ? "auto" : 0,
  //   height: deleting ? "auto" : 0,
  // });
  // //
  // // const resize = useSpring({ width: width });
  //
  // return (
  //   <div className={`${styles["wrapper"]}`}>
  //     <animated.div className={`${styles["animated"]}`}>
  //       <div ref={ref} className={`${styles["container"]}`}>
  //         <animated.div style={grow}>
  //           <p className={`${styles["text"]}`}>Are you sure?</p>
  //         </animated.div>
  //         {deleting ? (
  //           <>
  //             <FontAwesomeButton
  //               style={{ color: "white" }}
  //               fontAwesomeClasses="fas fa-undo"
  //             />
  //           </>
  //         ) : (
  //           <FontAwesomeButton
  //             style={{ color: "white" }}
  //             fontAwesomeClasses="fas fa-pencil-alt"
  //           />
  //         )}
  //         <animated.div style={color}>
  //           <FontAwesomeButton
  //             fontAwesomeClasses="fas fa-trash-alt"
  //             onClickHandler={() => {
  //               console.log(width);
  //               setDeleting((prev) => !prev);
  //             }}
  //           />
  //         </animated.div>
  //       </div>
  //     </animated.div>
  //   </div>
  // );
  //
  // const text = <p className={`${styles["text"]}`}>Are you sure?</p>;
  //
  // const deleteButton = (
  //   <FontAwesomeButton
  //     fontAwesomeClasses="fas fa-trash-alt"
  //     onClickHandler={() => {}}
  //   />
  // );
  //
  // const editButton = (
  //   <FontAwesomeButton
  //     style={{ color: "white" }}
  //     fontAwesomeClasses="fas fa-pencil-alt"
  //   />
  // );
  //
  // const [elements, setElements] = useState([text, editButton, deleteButton]);
  //
  // return (
  //   <div
  //     style={{
  //       display: "flex",
  //       flexDirection: "row",
  //       justifyContent: "flex-end",
  //       alignItems: "center",
  //       backgroundColor: "Pink"
  //     }}
  //   >
  //     {elements.map((ele) => {
  //       return ele;
  //     })}
  //   </div>
  // );
  const [ref, { width }] = useMeasure();
  const [deleting, setDeleting] = useState(false);
  const resize = useSpring({
    config: { duration: 200 },
    width: deleting ? width : 0,
  });
  const fadeOut = useSpring({
    config: { duration: 400 },
    opacity: deleting ? 0 : 1,
  });
  const fadeIn = useSpring({
    config: { duration: 400 },
    opacity: deleting ? 1 : 0,
  });
  const color = useSpring({
    config: { duration: 200 },
    color: deleting ? "tomato" : "black",
  });

  const background = useSpring({
    config: { duration: 500 },
    backgroundColor: deleting ? "rgba(251,192,45,1)" : "rgba(251,192,45,0)",
  });

  return (
    <div className={`${styles["wrapper"]}`}>
      <animated.div style={background} className={`${styles["container"]}`}>
        <animated.div
          style={{ ...resize, whiteSpace: "nowrap", overflow: "hidden" }}
        >
          <div ref={ref} className={`${styles["text-wrapper"]}`}>
            <p className={`${styles["text"]}`}>Are you sure?</p>
          </div>
        </animated.div>
        {deleting ? (
          <animated.div style={fadeIn}>
            <FontAwesomeButton fontAwesomeClasses="fas fa-undo" />
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
              console.log(width);
              setDeleting((prev) => !prev);
            }}
          />
        </animated.div>
      </animated.div>
    </div>
  );
};

export default AnimatedEditDeleteButtons;
