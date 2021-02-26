import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MoviesScreen from "./screens/MoviesScreen.js";
import MovieFormScreen from "./screens/MovieFormScreen.js";
import Error404Screen from "./screens/Error404Screen.js";
import Header from "./components/Header.js";

import styled, { ThemeProvider } from "styled-components";

const theme = {
  colors: {
    main: "tomato",
    dark: "#06B49A",
    lightBlue: "#AFDBD2",
    onyx: "#36313D",
  },
  fonts: ["sans-serif", "Roboto"],
  fontSizes: {
    small: "1em",
    medium: "2em",
    large: "3em",
  },
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <MoviesScreen />
          </Route>
          <Route exact path={["/add/movie", "/edit/movie/:id"]}>
            <MovieFormScreen />
          </Route>
          <Route path="*">
            <Error404Screen />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
