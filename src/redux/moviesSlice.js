import { createSlice } from "@reduxjs/toolkit";
import server from "../apis/server.js";

export const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    data: [],
    status: "idle",
    error: "",
  },
  reducers: {
    moviesLoading: (state, action) => {
      if (state.status === "idle") {
        state.status = "loading";
      }
    },
    moviesReceived: (state, action) => {
      if (state.status === "loading") {
        state.status = "idle";
        state.data = action.payload;
      }
    },
    moviesError: (state, action) => {
      if (state.status === "loading") {
        state.status = "idle";
        state.error = action.payload;
      }
    },
    removeMovie: (state, action) => {
      let id = action.payload;
      state.data = state.data.filter((movie) => movie._id !== id);
    },
    addMovie: (state, action) => {
      let movieData = action.payload;
      state.data = [movieData, ...state.data];
    },
    editMovie: (state, action) => {
      let movieData = action.payload;
      state.data = state.data.map((movie) => {
        if (movieData._id === movie._id) return movieData;
        return movie;
      });
    },
  },
});

export const {
  moviesLoading,
  moviesReceived,
  moviesError,
  removeMovie,
  addMovie,
  editMovie,
} = moviesSlice.actions;

export const fetchAllMovies = () => {
  return async (dispatch) => {
    dispatch(moviesLoading());
    try {
      const response = await server.get(`/movies`);
      dispatch(moviesReceived(response.data));
    } catch (e) {
      dispatch(moviesError(JSON.stringify(e)));
    }
  };
};

export const deleteMovie = (id) => {
  return async (dispatch) => {
    try {
      await server.post(`/movie/${id}?_method=DELETE`);
      dispatch(removeMovie(id));
    } catch (e) {
      throw "Error deleting movie. Please try again";
    }
  };
};

export const postMovie = (values) => {
  return async (dispatch) => {
    try {
      await server.post(`add/movie`, values);
      dispatch(addMovie(values));
    } catch (e) {
      throw "Error saving movie. Please try again";
    }
  };
};

export const patchMovie = (values) => {
  return async (dispatch) => {
    try {
      await server.post(`/movie/${values._id}?_method=PATCH`, values);
      dispatch(editMovie(values));
    } catch (e) {
      throw "Error editing movie. Please try again";
    }
  };
};

export default moviesSlice.reducer;
