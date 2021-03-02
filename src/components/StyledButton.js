import React, { useState } from "react";
import styled from "styled-components";

const Button = styled.button`
  cursor: pointer;
  font-size: 1.2rem;
  border-radius: 3px;
  text-transform: lowercase;
  font-variant: small-caps;
  font-weight: 500;
  background-color: ${(props) => (props.primary ? "#fbc02d" : "#fff")};
  color: ${(props) => (props.primary ? "#fff" : "#fbc02d")};
  border: 3px solid #fbc02d;
  padding: 0.25rem 1rem;
  transition: 0.2s all ease-out;
  width: 100%;

  &:focus {
    outline: none;
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      color: ${(props) => (props.primary ? "#fbc02d" : "#fff")};
      background-color: ${(props) => (props.primary ? "#fff" : "#fbc02d")};
    }
  }

  &.touching {
    color: ${(props) => (props.primary ? "#fbc02d" : "#fff")};
    background-color: ${(props) => (props.primary ? "#fff" : "#fbc02d")};
  }
`;

const StyledButton = ({ onClickHandler, children, style, ...rest }) => {
  const [touching, setTouching] = useState(false);
  return (
    <Button
      onTouchStart={() => {
        setTouching(true);
      }}
      onTouchEnd={() => {
        setTouching(false);
      }}
      className={`${touching && "touching"}`}
      {...rest}
      style={{ ...style }}
      onClick={onClickHandler}
    >
      {children}
    </Button>
  );
};

export default StyledButton;
