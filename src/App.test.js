import React from "react";
import { shallow, mount } from "enzyme";
import App from "./App";
import Header from "./components/Header.js";
import MovieListItem from "./components/MovieListItem.js";
import {render, fireEvent, cleanup} from '@testing-library/react';
import { Provider } from "react-redux";
import store from "./redux/store";

afterEach(cleanup)

const movies = [
  {
    rating: 5,
    _id: "603987cada923d3b2c9e909e",
    title: "Being John Malkovich",
    year: "1999",
    director: "Spike Jonze",
    country: "USA",
    watchedOn: "2021-02-26T23:43:07.987Z",
    poster:
      "https://m.media-amazon.com/images/M/MV5BYmUxY2MyOTQtYjRlMi00ZWEwLTkzODctZDMxNDcyNTFhYjNjXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SX300.jpg",
    imdbID: "tt0120601",
    createdAt: "2021-02-26T23:44:10.284Z",
    updatedAt: "2021-02-26T23:44:10.284Z",
    __v: 0,
  },
  {
    rating: 5,
    _id: "603984763986c2b024fbf6c8",
    title: "Perfect Blue",
    year: "1997",
    director: "Satoshi Kon",
    country: "Japan",
    watchedOn: "2021-02-26T23:29:50.617Z",
    poster:
      "https://m.media-amazon.com/images/M/MV5BMmMzOWNhNTYtYmY0My00OGJiLWIzNDUtZWRhNGY0NWFjNzFmXkEyXkFqcGdeQXVyNjUxMDQ0MTg@._V1_SX300.jpg",
    imdbID: "tt0156887",
    createdAt: "2021-02-26T23:29:58.317Z",
    updatedAt: "2021-02-26T23:29:58.317Z",
    __v: 0,
  },
  {
    rating: 5,
    _id: "60341e07694f651c248f88d8",
    title: "Tekkonkinkreet",
    year: "2006",
    director: "Michael Arias",
    country: "Japan",
    watchedOn: "2021-02-22T21:08:22.879Z",
    poster:
      "https://m.media-amazon.com/images/M/MV5BMmJhZTM5NTAtOWMyOS00MDczLThkMjMtMGU0ZjdiODhlMGFlXkEyXkFqcGdeQXVyMzQ4NDEyNzM@._V1_SX300.jpg",
    imdbID: "tt0831888",
    createdAt: "2021-02-22T21:11:35.087Z",
    updatedAt: "2021-03-03T01:13:45.565Z",
    __v: 0,
  },
];

it("renders without crashing", () => {
  shallow(<App />);
});

it("renders header", () => {
  const wrapper = shallow(<App />);
  expect(wrapper.contains(<Header />)).toEqual(true);
});

describe("Movie List Item", () => {
  it("accepts movie data as props", () => {
    const wrapper = mount(
      <Provider store={store}>
        <MovieListItem key={movies[0]._id} movie={movies[0]} />
      </Provider>
    );
    expect(wrapper.children().props().movie).toEqual(movies[0]);
  });
  it("contains movie title", () => {
    const wrapper = mount(
      <Provider store={store}>
        <MovieListItem key={movies[0]._id} movie={movies[0]} />
      </Provider>
    );
    const value = wrapper.find("h2.title").text();
    expect(value).toEqual("Being John Malkovich");
    wrapper.unmount();
  });
  it("contains formated date", () => {
    const wrapper = mount(
      <Provider store={store}>
        <MovieListItem key={movies[0]._id} movie={movies[0]} />
      </Provider>
    );
    const value = wrapper.find("h2.watched-on").text();
    expect(value).toEqual("26•2•2021");
    wrapper.unmount();
  });
});
