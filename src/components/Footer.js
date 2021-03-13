import React from "react";
import styled from "styled-components";

const Container = styled.div`
  color: ${(props) => props.theme.colors.main};
  display: flex;
  align-items: center;
  justify-content: center;
  height: 11rem;
`;

const FooterLogoH1 = styled.h1`
  color: ${(props) => props.theme.colors.main};
  font-size: 1rem;
`;

const Footer = () => {
  return (
    <Container>
      <FooterLogoH1>
        <i className="fas fa-lg fa-lemon"></i> Lemon Ratings
      </FooterLogoH1>
    </Container>
  );
};

export default Footer;
