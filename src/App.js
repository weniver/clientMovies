import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import MoviesScreen from "./screens/MoviesScreen.js";
import AddMovieScreen from "./screens/AddMovieScreen.js";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <MoviesScreen />
        </Route>
        <Route exact path="/add/movie">
          <AddMovieScreen />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
