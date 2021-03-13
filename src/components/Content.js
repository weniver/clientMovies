import React from "react";
import styled from "styled-components";

const Box = styled.div`
  height: calc(100vh - 18rem);
  display: flex;
  flex-direction: ${(props) => props.direction || "column"};
  justify-content: center;
  align-items: center;
  @media (max-width: 991.98px) {
    height: calc(100vh - 13rem);
    padding: 2rem;
  }
`;

const Content = ({ children, ...rest }) => {
  return <Box {...rest}>{children}</Box>;
};

export default Content;
