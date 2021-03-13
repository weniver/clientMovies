import React, { useEffect, useState, useRef } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

import SearchIMDB from "../components/SearchIMDB.js";
import TextInput from "../components/TextInput.js";
import LemonRatings from "../components/LemonRatings.js";
import "./MovieFormScreen.scss";
import { useHistory, useLocation } from "react-router-dom";
import DatePicker from "../components/DatePicker.js";
import StyledButton from "../components/StyledButton.js";

import { postMovie, patchMovie } from "../redux/moviesSlice.js";
import { useDispatch } from "react-redux";

const MovieFormScreen = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [onEditPage, setOnEditPage] = useState(false);

  const formRef = useRef();

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
        .max(100, "Must be 100 characters or less")
        .required("The movie needs a title."),
      year: yup
        .number()
        .typeError("Enter a valid year.")
        .min(1887, "Older than first movie.")
        .max(new Date().getFullYear(), "No future movies please.")
        .integer("Enter a valid year."),
      director: yup
        .string()
        .max(50, "Must be 50 characters or less")
        .typeError("Only real people."),
      country: yup
        .string()
        .max(74, "Only real countries.")
        .typeError("Only real countries."),
      watchedOn: yup
        .date()
        .required("You need a date.")
        .typeError("You need a date.")
        .min(new Date(1900, 9, 31), "Too old.")
        .max(new Date(), "No time travel."),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const resetForm = formik.resetForm;
  const setFieldValue = formik.setFieldValue;

  useEffect(() => {
    if (!formik.isValid) formRef.current.scrollIntoView({ behavior: "smooth" });
  }, [formik.isValid]);

  useEffect(() => {
    let pathName = location.pathname;
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
      if (onEditPage) {
        await dispatch(patchMovie(values));
      } else {
        await dispatch(postMovie(values));
      }
      history.push("/");
    } catch (e) {
      console.log(e);
    }
  };

  const preventSubmitOnEnterKey = (e) => {
    if (e.key === "Enter") e.preventDefault();
  };

  return (
    <div className="container-lg">
      <div className="col-12 col-lg-10 mx-auto">
        <h1 className="my-3">{onEditPage ? "Edit a movie" : "Add a movie:"}</h1>
        <form
          ref={formRef}
          onKeyPress={(e) => {
            preventSubmitOnEnterKey(e);
          }}
          className="row"
          autoComplete="off"
          onSubmit={formik.handleSubmit}
        >
          <div className="col-12 col-sm-8">
            <div className="row">
              <div className="mb-3 col-12">
                <SearchIMDB
                  label="title"
                  id="title"
                  name="title"
                  value={formik.values.title}
                  onChangeHandler={formik.handleChange}
                  number={4}
                  onClickHandler={formik.setFieldValue}
                  touched={formik.touched.title}
                  errors={formik.errors.title}
                />
              </div>
              <div className="mb-3 col-12">
                <TextInput
                  id="director"
                  name="director"
                  label="director"
                  onChangeHandler={formik.handleChange}
                  onBlurHandler={formik.handleBlur}
                  value={formik.values.director}
                  touched={formik.touched.director}
                  errors={formik.errors.director}
                />
              </div>
              <div className="mb-3 col-6">
                <TextInput
                  id="year"
                  name="year"
                  label="year"
                  onChangeHandler={formik.handleChange}
                  onBlurHandler={formik.handleBlur}
                  value={formik.values.year}
                  touched={formik.touched.year}
                  errors={formik.errors.year}
                />
              </div>
              <div className="mb-3 col-6">
                <TextInput
                  id="country"
                  name="country"
                  label="country"
                  onChangeHandler={formik.handleChange}
                  onBlurHandler={formik.handleBlur}
                  value={formik.values.country}
                  touched={formik.touched.country}
                  errors={formik.errors.country}
                />
              </div>
              <div className="mb-3 col-12 col-sm-6">
                <DatePicker
                  label="Watched On"
                  id="watchedOn"
                  onChangeHandler={(n) => {
                    formik.setFieldValue("watchedOn", n);
                  }}
                  value={formik.values.watchedOn}
                  errors={formik.errors.watchedOn}
                  touched={formik.touched.watchedOn}
                />
              </div>
              <div className="mb-3 col-12 col-sm-6">
                <LemonRatings
                  number={5}
                  value={formik.values.rating}
                  onClickHandler={(n) => {
                    formik.setFieldValue("rating", n);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-4 text-center">
            {formik.values.poster === "" || formik.values.poster === "N/A" ? (
              <div className="no-poster">
                <i className="no-poster-icon fas fa-lg fa-ticket-alt"></i>
              </div>
            ) : (
              <>
                <div>
                  <img
                    src={formik.values.poster}
                    alt=""
                    className="poster-img"
                  />
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
                </div>
              </>
            )}
          </div>
          <div className="col-12 col-md-4 mx-auto mt-5 mt-sm-0">
            <StyledButton primary type="submit">
              {onEditPage ? "EDIT MOVIE" : "ADD MOVIE"}
            </StyledButton>
          </div>
        </form>
      </div>
    </div>
  );
};
export default MovieFormScreen;
