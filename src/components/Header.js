import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import HeaderLink from "./HeaderLink.js";

const Container = styled.div`
  height: 6rem;
  @media (max-width: 991.98px) {
    height: 4rem;
  }
`;

const Header = () => {
  let history = useHistory();
  return (
    <Container className="container-lg">
      <div className="row align-items-center h-100">
        <div className="col p-0">
          <HeaderLink
            size="5"
            fontAwesome="fas fa-lemon"
            onClickHandler={() => {
              history.push("/");
            }}
          />
        </div>

        <div className="col-auto">
          <HeaderLink
            size="5"
            fontAwesome="far fa-plus-square"
            onClickHandler={() => {
              history.push("/add/movie");
            }}
          />
        </div>
      </div>
    </Container>
  );
};

export default Header;
