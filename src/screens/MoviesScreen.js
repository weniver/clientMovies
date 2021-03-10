import React, { useEffect, useState } from "react";
import MovieListItem from "../components/MovieListItem.js";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllMovies } from "../redux/moviesSlice.js";
import { useTransition, animated } from "react-spring";
import TitleBanner from "../components/TitleBanner.js";
import Loading from "../components/Loading.js";

const MoviesScreen = () => {
  const [movies, status] = useSelector((state) => [
    state.movies.data,
    state.movies.status,
  ]);
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

  return (
    <div style={{ overflowY: "hidden" }}>
      <div className="container-lg p-0">
        <TitleBanner />
        {status === "loading" && <Loading />}
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
