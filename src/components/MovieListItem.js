import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";

import ColorThief from "colorthief";
import FontAwesomeButton from "./FontAwesomeButton.js";
import DateFnsAdapter from "@date-io/date-fns";

import ModalFullScreen from "../components/ModalFullScreen.js";
import SimpleCard from "./SimpleCard.js";

import "./MovieListItem.scss";

import { deleteMovie } from "../redux/moviesSlice.js";
import { useDispatch } from "react-redux";

import AnimatedEditDeleteButtons from "./AnimatedEditDeleteButtons.js";

const MovieListItem = ({ movie }) => {
  //Redux
  const dispatch = useDispatch();
  //States
  const [backgroundColorRGB, setBackgroundColorRGB] = useState({
    red: 251,
    green: 192,
    blue: 45,
  });

  const [contrastingColor, setContrastingColor] = useState("#ffffff");
  const [showButtons, setShowButtons] = useState(false);

  //Navigation
  let history = useHistory();

  //Dates
  let dateFns = new DateFnsAdapter();

  const formatDate = (date) => {
    return dateFns.format(dateFns.date(date), "d•M•yyyy");
  };

  // const createDateArray = (date) => {
  //   let dateFns = dateFns.date(date);
  //   return [dateFns.getDay, dateFns.getMonth, dateFns.getYear];
  // };

  //Info Format

  const handleEdit = (movieData) => {
    history.push(`/edit/movie/${movieData._id}`, movieData);
  };

  const removeEmptyStrings = (array) => {
    return array.filter((string) => string !== "");
  };

  const joinArrayWithComa = (stringData) => {
    return stringData.join(", ");
  };

  const formatMovieInfo = (...data) => {
    return joinArrayWithComa(removeEmptyStrings(data));
  };

  //Main Color Poster
  const imgRef = useRef(null);

  const getImgMainColorRGBUsingRef = async (ref) => {
    try {
      let colorThief = new ColorThief();
      let img = ref.current;
      let color = await colorThief.getColor(img, 50);
      return { red: color[0], green: color[1], blue: color[2] };
    } catch (e) {
      console.log(e);
      //return default color if error
    }
  };

  const getConstrastingColor = async (backgroundColorRGB) => {
    let lumPrimaryColors = {};
    for (var primaryColor in backgroundColorRGB) {
      let pColorValue = backgroundColorRGB[primaryColor];
      pColorValue = pColorValue / 255;
      if (pColorValue <= 0.03928) {
        pColorValue = pColorValue / 12.92;
      } else {
        pColorValue = Math.pow((pColorValue + 0.055) / 1.055, 2.4);
        lumPrimaryColors[primaryColor] = pColorValue;
      }
    }
    var colorLum =
      0.2126 * lumPrimaryColors.red +
      0.7152 * lumPrimaryColors.green +
      0.0722 * lumPrimaryColors.blue;

    return colorLum > 0.179 ? "#0F0F0F" : "#ffffff";
  };

  //Render Helpers
  const renderRating = (n) => {
    let items = [];
    for (let i = 0; i < n; i++) {
      items.push(<i key={i} className="fas fa-lemon rating-lemons"></i>);
    }
    return items;
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteMovie(id));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div
      onMouseEnter={() => setShowButtons(true)}
      onMouseLeave={() => setShowButtons(false)}
      style={{
        backgroundColor: `rgb(${backgroundColorRGB.red},${backgroundColorRGB.green},${backgroundColorRGB.blue})`,
        color: contrastingColor,
        backgroundImage: `linear-gradient(to right,
          rgb(${backgroundColorRGB.red},${backgroundColorRGB.green},${
          backgroundColorRGB.blue
        }),
          rgb(${backgroundColorRGB.red + 5},${backgroundColorRGB.green + 5},${
          backgroundColorRGB.blue + 5
        }),
          rgb(${backgroundColorRGB.red + 10},${backgroundColorRGB.green + 10},${
          backgroundColorRGB.blue + 10
        }))`,
      }}
      className="movie-container row"
    >
      <div
        style={{ overflow: "hidden" }}
        className="col-3 col-lg-2 d-flex justify-content-center align-items-center"
      >
        {movie.poster ? (
          <img
            crossOrigin="anonymous"
            src={movie.poster}
            ref={imgRef}
            onLoad={async () => {
              try {
                let colorRGB = await getImgMainColorRGBUsingRef(imgRef);
                setBackgroundColorRGB(colorRGB);
                let color = await getConstrastingColor(colorRGB);
                setContrastingColor(color);
              } catch (e) {
                console.log(e);
              }
            }}
            className="poster-movies"
            alt={movie.title}
          />
        ) : (
          <i className="fas fa-lemon fa-3x"></i>
        )}
      </div>
      <div className="col-9 col-lg-10 p-0">
        <div className="row card-info align-items-center justify-content-between">
          <div className="col-12 col-md-8 col-lg-9">
            {renderRating(movie.rating)}
            <h2 className="no-wrap-ellipsis title">{movie.title}</h2>
            <h4 className="no-wrap-ellipsis">
              {formatMovieInfo(movie.director, movie.country, movie.year)}
            </h4>
          </div>
          <div className="col-12 col-md-4 col-lg-3">
            <h2 className="watched-on">{formatDate(movie.watchedOn)}</h2>
          </div>
        </div>
        {showButtons && (
          <div className="buttons-container">
            <AnimatedEditDeleteButtons
              handleEdit={() => {
                handleEdit(movie);
              }}
              handleDelete={() => {
                handleDelete(movie._id);
              }}
              contrastingColor={contrastingColor}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieListItem;
