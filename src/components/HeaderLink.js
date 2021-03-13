import React, { useContext } from "react";
import styled from "styled-components";
import Interacting, {
  InteractingContext,
  withInteraction,
} from "./Interacting.js";

const Icon = styled.i`
  font-size: 0.6em;
  transition: all 0.3s cubic-bezier(0.33, 1, 0.68, 1);
  color: ${(props) =>
    props.interacting ? props.theme.colors.black : props.theme.colors.main};
`;
const Size = styled.div`
  font-size: ${({ size }) => size || "1rem"};
`;

const ButtonContainer = styled.div`
  width: 1em;
  height: 1em;
  font-size: 1em;
  background-color: ${(props) => (props.interacting ? "rgba(50, 50, 50, 0.05)" : "transparent")};
  border-radius: 50%;
  display: flex;
  margin: 0;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.33, 1, 0.68, 1);
`;

const HeaderLink = ({ size, onClickHandler, fontAwesome }) => {
  const interacting = useContext(InteractingContext);
  return (
    <Size size={size}>
      <ButtonContainer interacting={interacting}>
        <Icon
          interacting={interacting}
          className={`${fontAwesome ? fontAwesome : "far fa-question-circle"}`}
        ></Icon>
      </ButtonContainer>
    </Size>
  );
};

export default withInteraction(HeaderLink);
