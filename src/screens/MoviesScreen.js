import React, { useEffect } from "react";
import MovieListItem from "../components/MovieListItem.js";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllMovies } from "../redux/moviesSlice.js";
import AnimatedEditDeleteButtons from "../components/AnimatedEditDeleteButtons.js";

const MoviesScreen = () => {
  const movies = useSelector((state) => state.movies.data);
  const dispatch = useDispatch();
  //FETCH DATA REDUX ACTIONS
  useEffect(() => {
    dispatch(fetchAllMovies());
  }, [dispatch]);

  const renderMovies = (data) => {
    return data.map((movie) => {
      return <MovieListItem key={movie._id} movie={movie} />;
    });
  };

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

  return (
    <div>
      <div className="container-lg p-0">
        {renderMovies(movies)}
      </div>
    </div>
  );
};

export default MoviesScreen;
