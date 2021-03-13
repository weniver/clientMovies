import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";


const StyledSpan = styled.span`
  color: ${(props) => props.theme.colors.main};
  font-size: 0.7rem;
  margin: 0 0.2rem;
`;

const StyledA = styled.a`
  color: ${(props) => props.theme.colors.black};
  text-decoration: underline;

  &:hover {
    color: ${(props) => props.theme.colors.main};
  }
`;

const NoMovies = () => {
  let history = useHistory();
  return (
    <>
      <h4>You haven't rated any movies yet.</h4>
      <h4>
        <StyledA onClick={() => history.push("/add/movie")}>
          Lets add one
          <StyledSpan>
            <i className="fas fa-lg fa-lemon"></i>
          </StyledSpan>
        </StyledA>
      </h4>
    </>
  );
};

export default NoMovies;
