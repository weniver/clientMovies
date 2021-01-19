import React, { useEffect, useState } from "react";
import server from "../apis/server.js";
import MovieListItem from "../components/MovieListItem.js";
import SearchIMDB from "../components/SearchIMDB.js";

const MoviesScreen = () => {
  const renderMovies = () => {
    return data.map((movie) => <MovieListItem key={movie.id} />);
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await server.get(`/movies`);
        setData(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container">
      <SearchIMDB />
      <h1>MoviesScreen</h1>
      {renderMovies()}
    </div>
  );
};

export default MoviesScreen;
