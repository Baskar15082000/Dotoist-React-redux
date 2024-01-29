import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "../features/projectSlice.js";
import favoriteReducer from "../features/favoriteListSlice.js";
import projectTaskReducer from "../features/projectTaskSlice.js";

const store = configureStore({
  reducer: {
    project: projectReducer,
    favorite: favoriteReducer,
    projectTask: projectTaskReducer,
  },
});

export default store;
