import React, { useState, useEffect } from "react";
import imdb from "../apis/imdb.js";
import MovieSearchResult from "./MovieSearchResult.js";
import ClickOutsideWrapper from "./ClickOutsideWrapper.js";
import TextInput from "../components/TextInput.js";

const SearchIMDB = ({
  label,
  id,
  name,
  formik,
  onBlurHandler,
  onChangeHandler,
  value,
  touched,
  errors,
  number,
  onClickHandler,
}) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState("");
  const [openSuggestions, setOpenSuggestions] = useState(false);

  useEffect(() => {
    const fetchData = async (q) => {
      try {
        let response = await imdb.get("", {
          params: {
            apikey: "ea28638c",
            s: `${query}`,
            page: 1,
            r: "json",
          },
        });
        //If there are to many results, no data returns so we close suggestions
        //and empty previous data
        if (response.data.Response === "False") {
          setSuggestions([]);
          setOpenSuggestions(false);
        } else {
          let data = response.data.Search;
          if (number) data.splice(number);
          setSuggestions(data);
          setOpenSuggestions(true);
        }
      } catch (e) {
        console.log(e);
      }
    };
    if (query !== "") fetchData(query);
  }, [query, number]);

  const fetchDataIMDBid = async (i) => {
    try {
      let response = await imdb.get("", {
        params: {
          apikey: "ea28638c",
          i: i,
          r: "json",
        },
      });
      return response.data;
    } catch (e) {
      console.log(e);
    }
  };

  const yearRangeToStartYear = (string) => {
    if (string.includes("–")) {
      return string.split("–")[0];
    }
    return string;
  };

  const renderResults = (results) => {
    return results.map(({ Title, Type, Year, Poster, imdbID }) => {
      return (
        <div className="col-12" key={imdbID}>
          <MovieSearchResult
            year={yearRangeToStartYear(Year)}
            img={Poster}
            title={Title}
            type={Type}
            key={imdbID}
            onClickHandler={async () => {
              try {
                setOpenSuggestions(false);
                let data = await fetchDataIMDBid(imdbID);

                let formData = {
                  director: data.Director,
                  year: yearRangeToStartYear(data.Year),
                  title: data.Title,
                  country: data.Country,
                  poster: data.Poster,
                  imdbID: data.imdbID,
                };
                for (let key in formData) {
                  if (formData.hasOwnProperty(key)) {
                    if (formData[key] === "N/A") formData[key] = "";
                    onClickHandler(key, formData[key]);
                  }
                }
              } catch (e) {
                console.log(e);
              }
            }}
          />
        </div>
      );
    });
  };

  const closeSuggestionsKeyHandler = (e) => {
    if (e.key === "Escape" || e.key === "Tab") setOpenSuggestions(false);
  };

  return (
    <ClickOutsideWrapper
      handler={() => {
        setOpenSuggestions(false);
      }}
    >
      <TextInput
        id={id}
        name={name}
        label={label || "Search Movie"}
        onChangeHandler={onChangeHandler}
        value={value}
        touched={touched}
        errors={errors}
        onKeyDownHandler={(e) => {
          closeSuggestionsKeyHandler(e);
        }}
        onFocusHandler={() => {
          if (suggestions.length !== 0) setOpenSuggestions(true);
        }}
        onChangeHandler={(e) => {
          onClickHandler(id, e.target.value);
          setQuery(e.target.value);
        }}
      />
      {suggestions && openSuggestions && (
        <div className="row suggestions-container">
          {renderResults(suggestions)}
        </div>
      )}
    </ClickOutsideWrapper>
  );
};

export default SearchIMDB;
