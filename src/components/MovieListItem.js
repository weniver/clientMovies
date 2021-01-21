import React from "react";
import "./MovieListItem.scss";

const MovieListItem = ({
  title,
  rating,
  year,
  country,
  director,
  watchedOn,
  Poster,
}) => {
  return (
    <div className="movie-container row">
      <div className="col-10">
        <div className="row">
          <h3>Título</h3>
        </div>
        <div className="row">
          <p>Director</p>
          <p>, País</p>
          <p>, Año</p>
        </div>
      </div>
      <div className="col-2">
        <div className="row">
          <p>⭐ ⭐ ⭐ ⭐ ⭐</p>
        </div>
        <div className="row">
          <p>Fecha</p>
        </div>
      </div>
    </div>
  );
};

export default MovieListItem;
