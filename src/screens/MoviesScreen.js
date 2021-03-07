import React, { useEffect, useState } from "react";
import MovieListItem from "../components/MovieListItem.js";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllMovies } from "../redux/moviesSlice.js";
import { useTransition, animated } from "react-spring";
import TitleBanner from "../components/TitleBanner.js";

const MoviesScreen = () => {
  const movies = useSelector((state) => state.movies.data);
  const dispatch = useDispatch();
  //FETCH DATA REDUX ACTIONS
  useEffect(() => {
    dispatch(fetchAllMovies());
  }, [dispatch]);

  // const renderMovies = (data) => {
  //   return data.map((movie) => {
  //     return <MovieListItem key={movie._id} movie={movie} />;
  //   });
  // };

  //FETCH FROM COMPONENT
  // const [data, setData] = useState([]);
  //
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await server.get(`/movies`);
  //       setData(response.data);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };
  //   fetchData();
  // }, []);

  const transitions = useTransition(movies, (movie) => movie._id, {
    from: { transform: "translate3d(-100vw,0,0)", opacity: 0 },
    enter: {
      transform: "translate3d(0,0,0)",
      opacity: 1,
    },
    leave: {
      transform: "translate3d(100vw,0,0)",
      opacity: 0,
    },
  });

  // return (
  //   <div>
  //     <button onClick={addToList}>add</button>
  //     <button onClick={removeFromList}>remove</button>
  //
  //     {transitions.map((hola) => {
  //       return (
  //         <animated.div key={hola.key} style={hola.props}>
  //           <MovieListItem key={hola.item._id} movie={hola.item} />
  //         </animated.div>
  //       );
  //     })}
  //   </div>
  // );

  return (
    <div>
      <div className="container-lg p-0">
        <TitleBanner />
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
