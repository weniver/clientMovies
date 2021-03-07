import { createSlice } from "@reduxjs/toolkit";
import server from "../apis/server.js";

export const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    data: [],
    count: 0,
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
        state.data = action.payload.movieData;
        state.count = action.payload.count;
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
      state.count = state.count - 1;
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
      throw new Error("Error deleting movie. Please try again");
    }
  };
};

export const postMovie = (values) => {
  return async (dispatch) => {
    try {
      const response = await server.post(`add/movie`, values);
      dispatch(addMovie(response.data));
    } catch (e) {
      throw new Error("Error saving movie. Please try again");
    }
  };
};

export const patchMovie = (values) => {
  return async (dispatch) => {
    try {
      console.log(values);
      const response = await server.post(
        `/movie/${values._id}?_method=PATCH`,
        values
      );
      dispatch(editMovie(response.data));
    } catch (e) {
      throw new Error("Error editing movie. Please try again");
    }
  };
};

export default moviesSlice.reducer;
