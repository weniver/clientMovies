import React from "react";
import styled from "styled-components";

const Message = styled.p`
  color: ${(props) => props.theme.colors.warning};
`;

const Error = ({ message }) => {
  return <Message>{message}</Message>;
};

export default Error;
