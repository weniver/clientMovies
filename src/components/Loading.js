import React from "react";
import styled from "styled-components";

const StyledDiv = styled.div`
  color: ${(props) => props.theme.colors.main};
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0;
`;
const Spinner = styled.div`
  color: ${(props) => props.theme.colors.main};
  width: 0.7rem;
  height: 0.7rem;
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
