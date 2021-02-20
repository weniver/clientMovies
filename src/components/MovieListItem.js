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
  let dateFns = new DateFnsAdapter();
  let watchedOnFns = dateFns.date(movie.watchedOn);
  let formatedWatchedOn = dateFns.format(watchedOnFns, "d•M•yyyy");

  const imgRef = useRef(null);
  const [mainColor, setMainColor] = useState("rgb(251,192,45)");
  const [showButtons, setShowButtons] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
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
      await server.post(`/movie/${id}?_method=DELETE`);
      setModalOpen(false);
      history.go(0);
    } catch (e) {
      console.log(e);
    }
  };

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

  const getImgMainColorRGBUsingRef = async (ref) => {
    try {
      let colorThief = new ColorThief();
      let img = ref.current;
      let color = await colorThief.getColor(img, 50);
      let red = color[0] > 225 ? 225 : color[0];
      let green = color[1] > 225 ? 225 : color[1];
      let blue = color[2] > 225 ? 225 : color[2];
      return { red, green, blue };
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div
      onMouseEnter={() => setShowButtons(true)}
      onMouseLeave={() => setShowButtons(false)}
      style={{
        backgroundColor: mainColor,
      }}
      className="movie-container row"
    >
      <div className="col-2 d-flex justify-content-center align-items-center">
        {movie.poster ? (
          <img
            crossOrigin="anonymous"
            src={movie.poster}
            ref={imgRef}
            onLoad={async () => {
              let colorRGB = await getImgMainColorRGBUsingRef(imgRef);
              setMainColor(
                `rgb(${colorRGB.red},${colorRGB.green},${colorRGB.blue})`
              );
            }}
            className="poster-movies"
            alt={movie.title}
          />
        ) : (
          <i className="fas fa-lemon fa-3x"></i>
        )}
      </div>
      <div className="col-10">
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
          <div className="col-8">
            <div className="row">
              <h3 style={{ color: "white" }} className="title">
                {movie.title}
              </h3>
            </div>
            <div className="row">
              <p style={{ color: "white", opacity: "0.9" }}>
                {formatMovieInfo(movie.director, movie.country, movie.year)}
              </p>
              <div className="ml-3">{renderRating(movie.rating)}</div>
            </div>
          </div>
          <div className="col-3">
            <div className="row">
              <p className="watchedOn">{formatedWatchedOn}</p>
            </div>
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
