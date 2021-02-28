import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
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
    deleteMovie: (state, action) => {
      let id = action.payload;
      state.data = state.data.filter((movie) => movie._id !== id);
    },
  },
});

export const {
  moviesLoading,
  moviesReceived,
  moviesError,
  deleteMovie,
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

export default moviesSlice.reducer;
