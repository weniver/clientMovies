import React from "react";
import "./MovieSearchResult.scss";

const MovieSearchResult = ({ title, year, img, type }) => {
  return (
    <div className="col-6">
      <div className="row">
        <div className="col-2 poster">
          <img src={img} className="img-fluid" alt={title} />
        </div>
        <div className="col-10" style={{ padding: 0 }}>
          <h4 className="info-item">{title}</h4>
          <p className="info-item">{type}</p>
          <p className="info-item">{year}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieSearchResult;
