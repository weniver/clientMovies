import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";

import ColorThief from "colorthief";
import FontAwesomeButton from "./FontAwesomeButton.js";
import DateFnsAdapter from "@date-io/date-fns";

import server from "../apis/server.js";
import ModalFullScreen from "../components/ModalFullScreen.js";
import SimpleCard from "./SimpleCard.js";

import "./MovieListItem.scss";

const MovieListItem = ({ movie }) => {
  //States
  const [backgroundColorRGB, setBackgroundColorRGB] = useState({
    red: 251,
    green: 192,
    blue: 45,
  });
  const [fontColor, setFontColor] = useState("#ffffff");
  const [showButtons, setShowButtons] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  //Navigation
  let history = useHistory();

  //Dates
  let dateFns = new DateFnsAdapter();

  const formatDate = (date) => {
    return dateFns.format(dateFns.date(date), "d•M•yyyy");
  };

  const createDateArray = (date) => {
    let dateFns = dateFns.date(date);
    return [dateFns.getDay, dateFns.getMonth, dateFns.getYear];
  };

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

  const fontColorForBackgroundColor = (backgroundColorRGB) => {
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

  //Handlers
  const handleDelete = async (id) => {
    try {
      await server.post(`/movie/${id}?_method=DELETE`);
      setModalOpen(false);
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
        backgroundColor: `rgb(${backgroundColorRGB.red},${backgroundColorRGB.green},${backgroundColorRGB.blue})`,
        color: fontColor,
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
        style={{ overflow: "hidden"}}
        className="col-2 col-sm-2 col-lg-2 d-flex justify-content-center align-items-center"
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
                let fontColor = fontColorForBackgroundColor(colorRGB);
                setFontColor(fontColor);
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
      <div className="col-10 col-sm-10 col-lg-10 p-0">
        {showButtons && (
          <div className="buttons-container">
            <div
              className="button"
              onClick={() => {
                handleEdit(movie);
              }}
            >
              <i className="fas fa-pencil-alt"></i>
            </div>
            <div
              className="button"
              onClick={() => {
                setModalOpen(true);
              }}
            >
              <i className="fas fa-trash-alt"></i>
            </div>
          </div>
        )}
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
      </div>
      {modalOpen && (
        <ModalFullScreen
          clickOutsideHandler={() => {
            setModalOpen(false);
          }}
        >
          <SimpleCard>
            <div className="col-12">
              <h2 style={{ color: "black", marginBottom: "2rem" }}>
                ¿Are you sure you want to delete the movie?
              </h2>
            </div>
            <div className="col-4 ml-auto">
              <div className="row justify-content-end">
                <FontAwesomeButton
                  onClickHandler={() => {
                    setModalOpen(false);
                  }}
                  style={{ color: "tomato" }}
                  fontAwesomeClasses="far fa-times-circle button"
                />
                <FontAwesomeButton
                  onClickHandler={() => {
                    handleDelete(movie._id);
                  }}
                  style={{ color: "limegreen" }}
                  fontAwesomeClasses="far fa-check-circle button"
                />
              </div>
            </div>
          </SimpleCard>
        </ModalFullScreen>
      )}
    </div>
  );
};

export default MovieListItem;
