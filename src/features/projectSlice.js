import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    getProjects: (state, action) => {
      action.payload.shift();
      return { ...state, data: action.payload };
    },
    addNewProject: (state, action) => {
      return { ...state, data: [...state.data, action.payload] };
    },
    deleteProject: (state, action) => {
      console.log(action.payload);
      const up = state.data.filter((e) => e.id !== action.payload);
      return { ...state, data: up };
    },
  },
});
export const { getProjects, addNewProject, deleteProject } =
  projectSlice.actions;
export default projectSlice.reducer;
