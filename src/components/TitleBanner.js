import React from "react";
import styles from "./TitleBanner.module.scss";
import styled from "styled-components";
import MovieCounter from "./MovieCounter.js";

const Box = styled.div`
  color: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media (max-width: 991.98px) {
    padding: 0.5rem;
  }
`;
const Title = styled.h1`
  text-transform: uppercase;
  margin: 0;
  line-height: 3.4rem;
  font-size: 3.8rem;
  @media (min-width: 768px) {
    line-height: 4.5rem;
    font-size: 5rem;
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
