import React from "react";
import "./MovieListItem.scss";

const MovieListItem = ({
  title,
  rating,
  year,
  country,
  director,
  watchedOn,
  poster,
}) => {
  const renderRating = (n) => {
    let rating = "";
    for (let i = 0; i < n; i++) {
      rating += " 🍆";
    }
    return rating;
  };

  return (
    <div className="movie-container row">
      <div className="col-3">
        <img src={poster} className="poster" alt={title} />
      </div>
      <div className="col-9">
        <div className="row card-info align-items-center">
          <div className="col-10">
            <div className="row">
              <h3 className="title">{title}</h3>
            </div>
            <div className="row">
              <p>{director}</p>
              <p>, {country}</p>
              <p>, {year}</p>
            </div>
          </div>
          <div className="col-2">
            <div className="row">
              <p>{renderRating(rating)}</p>
            </div>
            <div className="row">
              <p>{watchedOn}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieListItem;
