import React, { useState, useEffect } from "react";
import imdb from "../apis/imdb.js";
import MovieSearchResult from "./MovieSearchResult.js";

const SeachIMDB = () => {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");

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

        setResponse(response.data.Search);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData(query);
  }, [query]);

  const renderResults = (results) => {
    return results.map(({ Title, Type, Year, Poster, imdbID }) => (
      <MovieSearchResult
        year={Year}
        img={Poster}
        title={Title}
        type={Type}
        key={imdbID}
      />
    ));
  };

  return (
    <div className="row">
      <label className="col-12">
        Name:
        <input
          className="col"
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
      </label>
      {response && <div className="row">{renderResults(response)}</div>}
    </div>
  );
};

export default SeachIMDB;
