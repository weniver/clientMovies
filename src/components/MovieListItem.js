import React, { useRef, useState } from "react";
import ColorThief from "colorthief";
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
  const imgRef = useRef(null);
  const [mainColor, setMainColor] = useState("rgb(0,0,0)");

  const renderRating = (n) => {
    let items = [];
    for (let i = 0; i < n; i++) {
      items.push(<i class="fas fa-lemon rating"></i>);
    }
    return items;
  };

  return (
    <div
      style={{
        backgroundColor: mainColor,
        transition: "all .6s cubic-bezier(0.33, 1, 0.68, 1)",
        WebkitTransition: "all .6s cubic-bezier(0.33, 1, 0.68, 1)",
        MozTransition: "all .6s cubic-bezier(0.33, 1, 0.68, 1)",
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
              let red = color[0] > 200 ? 200 : color[0];
              let green = color[1] > 200 ? 200 : color[1];
              let blue = color[2] > 200 ? 200 : color[2];
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
