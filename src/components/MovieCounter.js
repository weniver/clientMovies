import React  from "react";
import { useSpring, animated } from "react-spring";
import styled from "styled-components";

import { useSelector } from "react-redux";

const StyledSpan = styled(animated.span)`
  margin: 0 0.2rem;
  font-weight: bold;
  color: ${(props) => props.theme.colors.main};
`;
const StyledH4 = styled.h4`
  margin:0 0 0 0.4rem;
  font-size: 1.5rem;
  line-height: 2rem;
  color: ${(props) => props.theme.colors.black};
  text-transform: uppercase;
  @media (max-width: 991.98px) {
    line-height: 1.5rem;
    font-size: 1rem;
  }
`;

const MovieCounter = () => {
  const count = useSelector((state) => state.movies.count);
  const animation = useSpring({
    config: { duration: 1500 },
    number: count,
    from: { number: 0 },
  });

  return (
    <>
      <StyledH4>
        You have watched
        <StyledSpan>
          {animation.number.interpolate((number) => Math.round(number))}
        </StyledSpan>
        {count === 1 ? "movie" : "movies"}
      </StyledH4>
    </>
  );
};

export default MovieCounter;
