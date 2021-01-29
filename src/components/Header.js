import React from "react";
import { Link } from "react-router-dom";
import "./Header.scss";

const Header = () => {
  return (
    <div className="header-container">
      <Link
        style={{
          transition: "all .2s cubic-bezier(0.33, 1, 0.68, 1)",
          WebkitTransition: "all .2s cubic-bezier(0.33, 1, 0.68, 1)",
          MozTransition: "all .2s cubic-bezier(0.33, 1, 0.68, 1)",
        }}
        className="header-link"
        to="/"
      >
        <i class="fas fa-lg fa-lemon"></i>
      </Link>
      <Link
        style={{
          transition: "all .2s cubic-bezier(0.33, 1, 0.68, 1)",
          WebkitTransition: "all .2s cubic-bezier(0.33, 1, 0.68, 1)",
          MozTransition: "all .2s cubic-bezier(0.33, 1, 0.68, 1)",
        }}
        className="header-link"
        to="/add/movie"
      >
        <p>+</p>
      </Link>
    </div>
  );
};

let data = {
  Title: "Blade",
  Year: "1998",
  Rated: "R",
  Released: "21 Aug 1998",
  Runtime: "120 min",
  Genre: "Action, Horror, Sci-Fi",
  Director: "Stephen Norrington",
  Writer: "David S. Goyer",
  Actors: "Wesley Snipes, Stephen Dorff, Kris Kristofferson, N'Bushe Wright",
  Plot:
    "A half-vampire, half-mortal man becomes a protector of the mortal race, while slaying evil vampires.",
  Language: "English, Russian, Serbian",
  Country: "USA",
  Awards: "5 wins & 11 nominations.",
  Poster:
    "https://m.media-amazon.com/images/M/MV5BOTk2NDNjZWQtMGY0Mi00YTY2LWE5MzctMGRhZmNlYzljYTg5XkEyXkFqcGdeQXVyMTAyNjg4NjE0._V1_SX300.jpg",
  Ratings: [
    { Source: "Internet Movie Database", Value: "7.1/10" },
    { Source: "Rotten Tomatoes", Value: "56%" },
    { Source: "Metacritic", Value: "45/100" },
  ],
  Metascore: "45",
  imdbRating: "7.1",
  imdbVotes: "244,440",
  imdbID: "tt0120611",
  Type: "movie",
  DVD: "N/A",
  BoxOffice: "$70,087,718",
  Production: "New Line Cinema, Imaginary Forces, Amen Ra Films",
  Website: "N/A",
  Response: "True",
};

export default Header;
