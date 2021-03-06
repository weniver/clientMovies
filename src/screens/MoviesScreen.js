import React, { useEffect } from "react";
import MovieListItem from "../components/MovieListItem.js";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllMovies } from "../redux/moviesSlice.js";

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
// <div>
//   <div className="container-lg p-0">
//     <div
//       style={{ backgroundColor: "tomato", minHeight: "5rem" }}
//       className="row"
//     >
//       <div
//         style={{ backgroundColor: "lightgreen" }}
//         className="col-2"
//       ></div>
//       <div style={{ backgroundColor: "lightblue" }} className="col">
//         <div style={{ backgroundColor: "tomato", height: "100%"}} className="row">
//
//         </div>
//       </div>
//     </div>
//   </div>
// </div>
export default MoviesScreen;
