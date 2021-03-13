import React, { useState } from "react";

export const InteractingContext = React.createContext(false);

export const withInteraction = (Component) => {
  return ({ onClickHandler, ...rest }) => {
    return (
      <Interacting onClickHandler={onClickHandler}>
        <Component {...rest} />
      </Interacting>
    );
  };
};

const Interacting = ({ onClickHandler, children }) => {
  const [interacting, setInteracting] = useState(false);
  return (
    <InteractingContext.Provider value={interacting}>
      <div
        onTouchStart={() => {
          setInteracting(true);
          onClickHandler();
        }}
        onTouchEnd={(e) => {
          e.preventDefault();
          setInteracting(false);
        }}
        onMouseEnter={() => {
          setInteracting(true);
        }}
        onMouseLeave={(e) => {
          setInteracting(false);
        }}
        onClick={onClickHandler}
        style={{ width: "fit-content", cursor: "pointer" }}
      >
        {children}
      </div>
    </InteractingContext.Provider>
  );
};

export default Interacting;
