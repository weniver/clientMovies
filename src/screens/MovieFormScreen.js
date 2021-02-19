import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import server from "../apis/server.js";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import SearchIMDB from "../components/SearchIMDB.js";

import DateFnsUtils from "@date-io/date-fns";
import "./MovieFormScreen.scss";
import { useHistory, useLocation } from "react-router-dom";

const MovieFormScreen = (props) => {
  const history = useHistory();
  const location = useLocation();
  const [onEditPage, setOnEditPage] = useState(false);
  const [pathName, setPathName] = useState("");

  const formik = useFormik({
    initialValues: {
      title: "",
      year: "",
      director: "",
      country: "",
      rating: "",
      watchedOn: new Date(),
      poster: "",
      imdbID: "",
    },
    validationSchema: yup.object({
      title: yup
        .string()
        .max(50, "Must be 50 characters or less")
        .required("The movie needs a title."),
      year: yup
        .number()
        .typeError("Enter a valid year.")
        .min(1887, "Older than first movie.")
        .max(new Date().getFullYear(), "No future movies please.")
        .integer("Enter a valid year."),
      director: yup.string().max(50, "Must be 50 characters or less"),
      country: yup.string().max(74, "Only real countries."),
      watchedOn: yup
        .date()
        .min(new Date(1986, 9, 31), "Too old.")
        .max(new Date(), "No time travel."),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const resetForm = formik.resetForm;
  const setFieldValue = formik.setFieldValue;

  useEffect(() => {
    let pathName = location.pathname;
    setPathName(pathName);
    setOnEditPage(pathName.includes("/edit/movie"));
  }, [location.pathname]);

  useEffect(() => {
    if (onEditPage) {
      let stateData = location.state;
      for (let key in stateData) {
        if (stateData.hasOwnProperty(key)) {
          setFieldValue(key, stateData[key]);
        }
      }
    } else {
      resetForm();
    }
  }, [onEditPage, location.state, resetForm, setFieldValue]);

  const handleSubmit = async (values) => {
    try {
      let endPoint = pathName;
      if (onEditPage) endPoint = `/movie/${values._id}?_method=PATCH`;
      await server.post(endPoint, values);
      history.push("/");
    } catch (e) {
      console.log(e);
    }
  };

  const preventSubmitOnEnterKey = (e) => {
    if (e.key === "Enter") e.preventDefault();
  };

  return (
    <div className="col-8 mx-auto">
      <h1 className="my-3">{onEditPage ? "Edit a movie" : "Add a movie:"}</h1>
      <form
        onKeyPress={(e) => {
          preventSubmitOnEnterKey(e);
        }}
        className="row"
        autoComplete="off"
        onSubmit={formik.handleSubmit}
      >
        <div className="col-8">
          <div className="row">
            <div className="mb-3 col-12">
              <SearchIMDB
                label={"Title"}
                value={formik.values.title}
                onChangeHandler={formik.handleChange}
                number={4}
                closeSuggestionsEscKey
                onClickHandler={formik.setFieldValue}
              />
              <div className="form-text">
                {formik.touched.title && formik.errors.title ? (
                  formik.errors.title
                ) : (
                  <>&nbsp;</>
                )}
              </div>
            </div>
            <div className="mb-3 col-12">
              <label className="form-label" htmlFor="title">
                Director
              </label>
              <input
                className="form-control"
                id="director"
                name="director"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.director}
              />
              <div className="form-text">
                {formik.touched.director && formik.errors.director ? (
                  formik.errors.director
                ) : (
                  <>&nbsp;</>
                )}
              </div>
            </div>
            <div className="mb-3 col-6">
              <label className="form-label" htmlFor="year">
                Year
              </label>
              <input
                className="form-control"
                id="year"
                name="year"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.year}
              />
              <div className="form-text">
                {formik.touched.year && formik.errors.year ? (
                  formik.errors.year
                ) : (
                  <>&nbsp;</>
                )}
              </div>
            </div>
            <div className="mb-3 col-6">
              <label className="form-label" htmlFor="country">
                Country
              </label>
              <input
                className="form-control"
                id="country"
                name="country"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.country}
              />
              <div className="form-text">
                {formik.touched.country && formik.errors.country ? (
                  formik.errors.country
                ) : (
                  <>&nbsp;</>
                )}
              </div>
            </div>
            <div className="mb-3 col-6">
              <div className="col-12 p-0">
                <label className="form-label" htmlFor="country">
                  Watched On
                </label>
              </div>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  id="watchedOn"
                  autoOk
                  disableFuture
                  disableToolbar
                  format="dd/MM/yyyy"
                  value={formik.values.watchedOn}
                  onChange={(value) => formik.setFieldValue("watchedOn", value)}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </MuiPickersUtilsProvider>
            </div>
            <div className="mb-3 col-6">
              <label className="form-label" htmlFor="rating">
                Rating
              </label>
              <div className="row">
                <div className="form-check ml-3">
                  <label className="form-check-label">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="rating"
                      value={1}
                      checked={formik.values.rating === 1}
                      onChange={() => {
                        formik.setFieldValue("rating", 1);
                      }}
                    />
                    1
                  </label>
                </div>
                <div className="form-check ml-3">
                  <label className="form-check-label">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="rating"
                      value={2}
                      checked={formik.values.rating === 2}
                      onChange={() => {
                        formik.setFieldValue("rating", 2);
                      }}
                    />
                    2
                  </label>
                </div>
                <div className="form-check ml-3">
                  <label className="form-check-label">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="rating"
                      value={3}
                      checked={formik.values.rating === 3}
                      onChange={() => {
                        formik.setFieldValue("rating", 3);
                      }}
                    />
                    3
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-4">
          {formik.values.poster === "" || formik.values.poster === "N/A" ? (
            <div className="no-poster">
              <i className="fas fa-lg fa-ticket-alt"></i>
            </div>
          ) : (
            <>
              <div className="poster-wrapper">
                <img src={formik.values.poster} alt="" className="poster-img" />
              </div>
              <div
                onClick={() => {
                  formik.setFieldValue("poster", "");
                }}
                className="remove-wrapper"
              >
                <p className="remove-button">
                  remove <i className="fas fa-trash-alt"></i>
                </p>
              </div>
            </>
          )}
        </div>
        <div className="col-3 mx-auto my-5">
          <button type="submit" className="btn btn-primary btn-block add-movie">
            {onEditPage ? "EDIT MOVIE" : "ADD MOVIE"}
          </button>
        </div>
      </form>
    </div>
  );
};
export default MovieFormScreen;
