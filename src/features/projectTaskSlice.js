import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};
const projectTaskSlice = createSlice({
  name: "projectTask",
  initialState,
  reducers: {
    getProjectTask: (state, action) => {
      const task = action.payload.res.filter(
        (e) => e.project_id === action.payload.id
      );
      return { ...state, data: task };
    },
    addTask: (state, action) => {
      return { ...state, data: [...state.data, action.payload] };
    },
    deleteTask: (state, action) => {
      const task = state.data.filter((e) => e.id !== action.payload);
      return { ...state, data: task };
    },
    editTask: (state, action) => {
      var task = [];
      state.data.map((e) => {
        if (e.id === action.payload.id) {
          task = [...task, action.payload];
        } else {
          task = [...task, e];
        }
      });

      return { ...state, data: task };
    },
    completeTask: (state, action) => {
      const task = state.data.filter((e) => e.id !== action.payload);
      return { ...state, data: task };
    },
  },
});
export const { getProjectTask, addTask, deleteTask, editTask, completeTask } =
  projectTaskSlice.actions;
export default projectTaskSlice.reducer;
