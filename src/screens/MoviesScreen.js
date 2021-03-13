import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllMovies } from "../redux/moviesSlice.js";
import { useTransition, animated } from "react-spring";

import MovieListItem from "../components/MovieListItem.js";
import TitleBanner from "../components/TitleBanner.js";
import Loading from "../components/Loading.js";
import NoMovies from "../components/NoMovies.js";
import Content from "../components/Content.js";
import Error from "../components/Error.js";

const MoviesScreen = () => {
  const { data: movies, status, error, count } = useSelector(
    (state) => state.movies
  );
  const dispatch = useDispatch();

  //FETCH DATA REDUX ACTIONS
  useEffect(() => {
    dispatch(fetchAllMovies());
  }, [dispatch]);

  const transitions = useTransition(movies, (movie) => movie._id, {
    from: { transform: "translate3d(-100vw,0,0)", opacity: 0, height: 192 },
    trail: 150,
    enter: {
      transform: "translate3d(0,0,0)",
      opacity: 1,
      height: 192,
    },
    leave: {
      transform: "translate3d(100vw,0,0)",
      opacity: 0,
      height: 0,
      overflow: "hidden",
    },
  });

  const _renderSpecialCases = (error, count, status) => {
    let content;
    if (error) {
      content = <Error message={error} />;
    } else if (status === "loading") {
      content = <Loading />;
    } else if (count === 0 && status === "succeeded") {
      content = <NoMovies />;
    }
    return content && <Content direction="column">{content}</Content>;
  };

  return (
    <div style={{ overflowY: "hidden", minHeight: "94vh" }}>
      <div className="container-lg p-0">
        <TitleBanner />

        {_renderSpecialCases(error, count, status)}

        {transitions.map(({ item: movie, key, props: animation }) => {
          return (
            <animated.div key={key} style={{ ...animation }}>
              <MovieListItem movie={movie} />
            </animated.div>
          );
        })}
      </div>
    </div>
  );
};
export default MoviesScreen;
