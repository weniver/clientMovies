import React from "react";
import styled from "styled-components";
import MovieCounter from "./MovieCounter.js";

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media (max-width: 991.98px) {
    padding:0 0 0.5rem 0.5rem;
  }
`;
const Title = styled.h1`
  text-transform: uppercase;
  margin: 0;
  line-height: 5rem;
  font-size: 5rem;
  @media (max-width: 991.98px) {
    font-size: 3.5rem;
    line-height: 3.5rem;
  }
`;

const TitleBanner = () => {
  return (
    <Box>
      <Title>Lemon</Title>
      <Title>Ratings</Title>
      <MovieCounter />
    </Box>
  );
};

export default TitleBanner;
