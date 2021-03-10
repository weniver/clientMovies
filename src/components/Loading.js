import React from "react";
import styled from "styled-components";

const StyledDiv = styled.div`
  color: ${(props) => props.theme.colors.main};
  width: 100%;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;
const Spinner = styled.div`
  color: ${(props) => props.theme.colors.main};
  width: 0.8rem;
  height: 0.8rem;
  margin: 0 0.2rem;
`;

const Loading = () => {
  return (
    <StyledDiv>
      <h2>Loading</h2>
      <Spinner className="spinner-grow" role="status">
        <span className="sr-only"></span>
      </Spinner>
      <Spinner className="spinner-grow" role="status">
        <span className="sr-only"></span>
      </Spinner>
      <Spinner className="spinner-grow" role="status">
        <span className="sr-only"></span>
      </Spinner>
    </StyledDiv>
  );
};

export default Loading;
