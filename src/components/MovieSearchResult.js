import React from "react";
import "./MovieSearchResult.scss";

const MovieSearchResult = ({ onClickHandler, title, year, img, type }) => {
  return (
    <div onClick={onClickHandler} className="movie-search-result row">
      <div className="col-2 poster-container">
        {img === "N/A" ? (
          <div className="no-image">
            <i className="fas fa-ticket-alt"></i>
          </div>
        ) : (
          <img src={img} className="img-fluid poster-img" alt={title} />
        )}
      </div>
      <div className="col-10 info-items">
        <h4 className="info-item">{title}</h4>
        <p className="info-item">{type}</p>
        <p className="info-item">{year}</p>
      </div>
    </div>
  );
};

export default MovieSearchResult;
