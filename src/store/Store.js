import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "../features/projectSlice.js";

const store = configureStore({
  reducer: {
    project: projectReducer,
  },
});

export default store;
