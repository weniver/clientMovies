import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import styles from "./AnimatedEditDeleteButtons.module.scss";
import styled from "styled-components";

const StyledSpan = styled(animated.span)`
  margin: 0 0.3rem;
  font-size: 1.3rem;
  font-weight: bold;
  color: ${(props) => props.theme.colors.main};
  margin: 0 0.3rem;
  @media (min-width: 768px) {
    font-size: 1.4rem;
  }
`;
const StyledH4 = styled(animated.span)`
  margin-left: 0.4rem;
  font-size: 1.7rem;
  line-height: 1.4rem;
  text-transform: lowercase;
  font-variant: small-caps;
  @media (min-width: 768px) {
    line-height: 1.6rem;
    font-size: 2rem;
  }
`;

const MovieCounter = () => {
  const animation = useSpring({
    config: { duration: 2000 },
    number: 120,
    from: { number: 0 },
  });

  return (
    <div>
      <StyledH4>
        You have watched
        <StyledSpan>
          {animation.number.interpolate((number) => Math.round(number))}
        </StyledSpan>
        movies
      </StyledH4>
    </div>
  );
};

export default MovieCounter;
