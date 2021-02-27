import axios from "axios";

export default axios.create({
  baseURL: "https://www.omdbapi.com/",
  params: {
    r: "json",
    apikey: process.env.REACT_APP_OMDB_KEY ?? "ea28638c",
  },
});
