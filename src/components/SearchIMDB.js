import React, { useState, useEffect } from "react";
import imdb from "../apis/imdb.js";
import MovieSearchResult from "./MovieSearchResult.js";
import ClickOutsideWrapper from "./ClickOutsideWrapper.js";


const SearchIMDB = (props) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState("");
  const [openSuggestions, setOpenSuggestions] = useState("false");

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
          if (props.number) data.splice(props.number);
          setSuggestions(data);
          setOpenSuggestions(true);
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchData(query);
  }, [query, props.number]);

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

  const renderResults = (results) => {
    return results.map(({ Title, Type, Year, Poster, imdbID }) => (
      <div className="col-12" key={imdbID}>
        <MovieSearchResult
          year={Year}
          img={Poster}
          title={Title}
          type={Type}
          key={imdbID}
          onClickHandler={async () => {
            try {

              setOpenSuggestions(false)
              let data = await fetchDataIMDBid(imdbID);

              let formData = {
                director: data.Director,
                year: data.Year,
                title: data.Title,
                country: data.Country,
                poster: data.Poster,
                imdbID: data.imdbID,
              };
              for (let key in formData) {
                if (formData.hasOwnProperty(key)) {
                  props.onClickHandler(key, formData[key]);
                }
              }
            } catch (e) {
              console.log(e);
            }
          }}
        />
      </div>
    ));
  };

  return (
    <ClickOutsideWrapper
      handler={() => {
        setOpenSuggestions(false);
      }}
    >
      <div className="row">
        <label className="form-label" htmlFor="title">
          IMDB
        </label>
        <input
          className="form-control"
          id="title"
          name="title"
          type="text"
          autoComplete="off"
          value={query}
          onFocus={() => {
            if (suggestions.length !== 0) setOpenSuggestions(true);
          }}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
      </div>
      {suggestions && openSuggestions && (
        <div className="row suggestions-container">
          {renderResults(suggestions)}
        </div>
      )}
      <div className="form-text">
        <>&nbsp;</>
      </div>
    </ClickOutsideWrapper>
  );
};

export default SearchIMDB;
