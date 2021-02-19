import React, { useRef, useState } from "react";
import ColorThief from "colorthief";
import "./MovieListItem.scss";
import server from "../apis/server.js";
import { useHistory } from "react-router-dom";
import DateFnsAdapter from "@date-io/date-fns";
import ModalFullScreen from "../components/ModalFullScreen.js";
import SimpleCard from "./SimpleCard.js";
import FontAwesomeButton from "./FontAwesomeButton.js";

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

  return (
    <div
      onMouseEnter={() => setShowButtons(true)}
      onMouseLeave={() => setShowButtons(false)}
      style={{
        backgroundColor: mainColor,
      }}
      className="movie-container row"
    >
      <div className="col-2">
        <img
          crossOrigin="anonymous"
          src={movie.poster}
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
          alt={movie.title}
        />
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
                {movie.director}, {movie.country}, {movie.year}
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
