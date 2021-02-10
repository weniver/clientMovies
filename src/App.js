import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import MoviesScreen from "./screens/MoviesScreen.js";
import AddMovieScreen from "./screens/AddMovieScreen.js";
import Error404Screen from "./screens/Error404Screen.js";
import Header from "./components/Header.js";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <MoviesScreen />
        </Route>
        <Route exact path={["/add/movie", "/edit/movie/:id"]}>
          <AddMovieScreen />
        </Route>
        <Route path="*">
          <Error404Screen />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
