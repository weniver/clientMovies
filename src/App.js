import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MoviesScreen from "./screens/MoviesScreen.js";
import MovieFormScreen from "./screens/MovieFormScreen.js";
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
          <MovieFormScreen />
        </Route>
        <Route path="*">
          <Error404Screen />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
