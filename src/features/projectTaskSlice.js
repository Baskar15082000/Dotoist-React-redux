import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};
const projectTaskSlice = createSlice({
  name: "projectTask",
  initialState,
  reducers: {
    getProjectTask: (state, action) => {
      console.log(action.payload.res[0]);
      console.log(action.payload.res[0]?.labels);
      const task = action.payload.res.filter(
        (e) => e.project_id === action.payload.id
      );
      return { ...state, data: task };
    },
    addTask: (state, action) => {
      return { ...state, data: [...state.data, action.payload] };
    },
  },
});
export const { getProjectTask, addTask } = projectTaskSlice.actions;
export default projectTaskSlice.reducer;
