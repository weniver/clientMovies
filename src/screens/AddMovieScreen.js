import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

const AddMovieScreen = () => {
  const formik = useFormik({
    initialValues: {
      title: "",
      year: "",
      director: "",
      country: "",
      rating: "",
      watchedOn: "",
      poster: "",
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
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <div className="col-8 mx-auto">
      <h1 className="my-3">Add a movie:</h1>
      <form className="row" onSubmit={formik.handleSubmit}>
        <div className="mb-3 col-12">
          <label className="form-label" htmlFor="title">
            Title
          </label>
          <input
            className="form-control"
            id="title"
            name="title"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
          />
          <div className="form-text">
            {formik.touched.title && formik.errors.title
              ? formik.errors.title
              : null}
          </div>
        </div>
        <div className="mb-3 col-6">
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
            {formik.touched.director && formik.errors.director
              ? formik.errors.director
              : null}
          </div>
        </div>
        <div className="mb-3 col-3">
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
            {formik.touched.year && formik.errors.year
              ? formik.errors.year
              : null}
          </div>
        </div>
        <div className="mb-3 col-3">
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
            {formik.touched.country && formik.errors.country
              ? formik.errors.country
              : null}
          </div>
        </div>
        <div className="mb-3 col-4">
          <label className="form-label" htmlFor="watchedOn">
            Watched On
          </label>
          <input
            className="form-control"
            id="watchedOn"
            name="watchedOn"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.watchedOn}
          />
          <div className="form-text">
            {formik.touched.watchedOn && formik.errors.watchedOn
              ? formik.errors.watchedOn
              : null}
          </div>
        </div>
        <div className="col-3 my-auto">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
export default AddMovieScreen;
