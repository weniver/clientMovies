import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import server from "../apis/server.js";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import SearchIMDB from "../components/SearchIMDB.js";
import TextInput from "../components/TextInput.js";
import LemonRatings from "../components/LemonRatings.js";
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
    <div className="container-lg">
      <div className="col-12 col-lg-10 mx-auto">
        <h1 className="my-3">{onEditPage ? "Edit a movie" : "Add a movie:"}</h1>
        <form
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
              <div className="mb-3 col-12 col-md-6">
                <label className="form-label" htmlFor="watchedOn">
                  Watched On
                </label>
                <div>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    id="watchedOn"
                    autoOk
                    error={false}
                    disableFuture
                    disableToolbar
                    helperText={null}
                    format="d•M•yyyy"
                    value={formik.values.watchedOn}
                    onChange={(value) =>
                      formik.setFieldValue("watchedOn", value)
                    }
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </MuiPickersUtilsProvider>
                </div>
                <div className="form-text">
                  {formik.touched.watchedOn && formik.errors.watchedOn ? (
                    formik.errors.watchedOn
                  ) : (
                    <>&nbsp;</>
                  )}
                </div>
              </div>
              <div className="mb-3 col-12 col-md-6">
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
          <div className="col-12 col-md-4 mx-auto my-5">
            <button
              type="submit"
              className="btn btn-primary btn-block add-movie"
            >
              {onEditPage ? "EDIT MOVIE" : "ADD MOVIE"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default MovieFormScreen;
