import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";

import { deleteMovie } from "../redux/moviesSlice.js";
import { useDispatch } from "react-redux";

import DateFnsAdapter from "@date-io/date-fns";

import AnimatedEditDeleteButtons from "./AnimatedEditDeleteButtons.js";
import { withTheme } from "styled-components";

import styles from "./MovieListItem.module.scss";

import {
  getConstrastingColorFromRGB,
  convertHexToRGB,
  getImgMainColorRGBUsingRefAsync,
  createGradientFromRGB,
} from "../utilities/color.js";

const MovieListItem = ({ movie, theme }) => {
  //Redux
  const dispatch = useDispatch();
  //States
  const [backgroundColorRGB, setBackgroundColorRGB] = useState(
    convertHexToRGB(theme.colors.main)
  );
  const [contrastingColor, setContrastingColor] = useState("#ffffff");
  const [showButtons, setShowButtons] = useState(false);
  //Navigation
  let history = useHistory();
  //Dates
  let dateFns = new DateFnsAdapter();

  const formatDate = (date) => {
    return dateFns.format(dateFns.date(date), "d•M•yyyy");
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
  //Render Helpers
  const renderRating = (n) => {
    let items = [];
    for (let i = 0; i < n; i++) {
      items.push(
        <i key={i} className={`fas fa-lemon ${styles["rating-lemons"]}`}></i>
      );
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
  // <div
  // onMouseEnter={() => setShowButtons(true)}
  // onMouseLeave={() => setShowButtons(false)}
  // style={{
  //   backgroundColor: backgroundColorRGB,
  //   color: contrastingColor,
  //   backgroundImage: createGradientFromRGB(backgroundColorRGB),
  // }}
  //   className={`${styles["movie-container"]} row justify-content-center align-items-center`}
  // >
  //   <div className={`${styles["poster-wrapper"]} col-3 col-lg-2`}>
  //     <div className="row">
  // {movie.poster ? (
  //   <img
  //     crossOrigin="anonymous"
  //     src={movie.poster}
  //     ref={imgRef}
  //     onLoad={async () => {
  //       try {
  //         let colorRGB = await getImgMainColorRGBUsingRefAsync(imgRef);
  //         setBackgroundColorRGB(colorRGB);
  //         let color = getConstrastingColorFromRGB(colorRGB);
  //         setContrastingColor(color);
  //       } catch (e) {
  //         console.log(e);
  //       }
  //     }}
  //     className={styles["poster-movies"]}
  //     alt={movie.title}
  //   />
  // ) : (
  //   <i className="fas fa-lemon fa-3x"></i>
  // )}
  //     </div>
  //   </div>
  //   <div className="col-9 col-lg-10 p-0">
  //     <div
  //       className={`row ${styles["card-info"]} align-items-center justify-content-between`}
  //     >
  // <div className="col-12 col-md-8 col-lg-9">
  //   {renderRating(movie.rating)}
  //   <h2 className={`${styles["no-wrap-ellipsis"]} ${styles.title}`}>
  //     {movie.title}
  //   </h2>
  //   <h4 className={styles["no-wrap-ellipsis"]}>
  //     {formatMovieInfo(movie.director, movie.country, movie.year)}
  //   </h4>
  // </div>
  // <div className="col-12 col-md-4 col-lg-3">
  //   <h2 className="watched-on">{formatDate(movie.watchedOn)}</h2>
  // </div>
  //     </div>
  //     {showButtons && (
  //       <div className={styles["buttons-container"]}>
  //         <AnimatedEditDeleteButtons
  //           handleEdit={() => {
  //             handleEdit(movie);
  //           }}
  //           handleDelete={() => {
  //             handleDelete(movie._id);
  //           }}
  //           contrastingColor={contrastingColor}
  //         />
  //       </div>
  //     )}
  //   </div>
  // </div>

  return (
    <div
      onMouseEnter={() => setShowButtons(true)}
      onMouseLeave={() => setShowButtons(false)}
      style={{
        backgroundColor: backgroundColorRGB,
        color: contrastingColor,
        backgroundImage: createGradientFromRGB(backgroundColorRGB),
      }}
      className={`${styles["movie-row"]} row`}
    >
      <div className={`${styles["poster-wrapper"]} col-3 col-lg-2 p-0`}>
        {movie.poster ? (
          <img
            className={`${styles["movie-poster"]}`}
            crossOrigin="anonymous"
            src={movie.poster}
            ref={imgRef}
            onLoad={async () => {
              try {
                let colorRGB = await getImgMainColorRGBUsingRefAsync(imgRef);
                setBackgroundColorRGB(colorRGB);
                let color = getConstrastingColorFromRGB(colorRGB);
                setContrastingColor(color);
              } catch (e) {
                console.log(e);
              }
            }}
            alt={movie.title}
          />
        ) : (
          <i className="fas fa-lemon fa-3x"></i>
        )}
      </div>
      <div className="col-9 col-lg-10 p-0">
        <div className={`${styles["movie-data"]} row`}>
          <div className="col-12 col-md-8 col-lg-9">
            {renderRating(movie.rating)}
            <h2 className={`${styles["no-wrap-ellipsis"]} ${styles.title}`}>
              {movie.title}
            </h2>
            <h4 className={styles["no-wrap-ellipsis"]}>
              {formatMovieInfo(movie.director, movie.country, movie.year)}
            </h4>
          </div>
          <div className="col-12 col-md-4 col-lg-3">
            <h2>{formatDate(movie.watchedOn)}</h2>
          </div>
        </div>
      </div>
      {showButtons && (
        <div className={styles["buttons-container"]}>
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
  );
};

export default withTheme(MovieListItem);
