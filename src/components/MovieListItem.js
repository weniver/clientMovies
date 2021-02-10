import React, { useRef, useState } from "react";
import ColorThief from "colorthief";
import "./MovieListItem.scss";
import server from "../apis/server.js";
import { useHistory } from "react-router-dom";

const MovieListItem = ({
  title,
  rating,
  year,
  country,
  director,
  watchedOn,
  poster,
  id,
}) => {
  const imgRef = useRef(null);
  const [mainColor, setMainColor] = useState("rgb(251,192,45)");
  const [showButtons, setShowButtons] = useState(false);
  let history = useHistory();

  const renderRating = (n) => {
    let items = [];
    for (let i = 0; i < n; i++) {
      items.push(<i key={i} className="fas fa-lemon rating"></i>);
    }
    return items;
  };

  const handleDelete = async (id) => {
    try {
      let response = await server.post(`/movie/${id}?_method=DELETE`);
      history.go(0);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div
      onMouseEnter={() => setShowButtons(true)}
      onMouseLeave={() => setShowButtons(false)}
      style={{
        backgroundColor: mainColor
      }}
      className="movie-container row"
    >
      <div className="col-2">
        <img
          crossOrigin="anonymous"
          src={poster}
          ref={imgRef}
          onLoad={async () => {
            try {
              let colorThief = new ColorThief();
              let img = imgRef.current;
              let color = await colorThief.getColor(img, 50);
              let red = color[0] > 220 ? 220 : color[0];
              let green = color[1] > 220 ? 220 : color[1];
              let blue = color[2] > 220 ? 220 : color[2];
              setMainColor(`rgb(${red},${green},${blue})`);
            } catch (e) {
              console.log(e);
            }
          }}
          className="poster-movies"
          alt={title}
        />
      </div>
      <div className="col-10">
        {showButtons && (
          <div className="buttons-container">
            <div
              className="button"
              onClick={() => {
                handleDelete(id);
              }}
            >
              <i className="fas fa-trash-alt"></i>
            </div>
          </div>
        )}
        <div className="row card-info align-items-center justify-content-between">
          <div className="col-8">
            <div className="row">
              <h3 style={{ color: "white" }} className="title">
                {title}
              </h3>
            </div>
            <div className="row">
              <p style={{ color: "white", opacity: "0.9" }}>
                {director}, {country}, {year}
              </p>
              <div className="ml-3">{renderRating(rating)}</div>
            </div>
          </div>
          <div className="col-3">
            <div className="row">
              <p className="watchedOn">{watchedOn}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieListItem;
