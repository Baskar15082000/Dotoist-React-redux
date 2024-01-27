import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "../features/projectSlice.js";
import favoriteReducer from "../features/favoriteListSlice.js";

const store = configureStore({
  reducer: {
    project: projectReducer,
    favorite: favoriteReducer,
  },
});

export default store;
